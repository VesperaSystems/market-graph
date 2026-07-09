import mammoth from "mammoth";
import { z } from "zod";
import { createChatCompletionsClient, getAIProviderConfig } from "@/lib/ai/provider";

export const legalIssueSchema = z.object({
  id: z.string(),
  type: z.string(),
  original_text: z.string(),
  recommended_text: z.string(),
  comment: z.string(),
  severity: z.enum(["low", "medium", "high"]).default("medium"),
});

export const legalAnalysisSchema = z.object({
  document: z.string(),
  issues: z.array(legalIssueSchema),
  metadata: z.object({
    fileName: z.string(),
    fileType: z.string(),
    charactersAnalyzed: z.number(),
    analysisTimestamp: z.string(),
    analysisType: z.literal("legal"),
    issuesFound: z.number(),
  }),
});

export type LegalAnalysis = z.infer<typeof legalAnalysisSchema>;

export async function extractDocumentText(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const lowerName = file.name.toLowerCase();

  if (file.type === "text/plain" || lowerName.endsWith(".txt")) return buffer.toString("utf8");
  if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || lowerName.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  if (file.type === "application/pdf" || lowerName.endsWith(".pdf")) {
    throw new Error("PDF parsing is planned after DOCX/TXT review is stable. Please upload DOCX or TXT for this MVP.");
  }
  throw new Error("Unsupported file type. Upload DOCX or TXT for legal review.");
}

function fallbackAnalysis(file: File, text: string): LegalAnalysis {
  const ambiguous = /reasonable|best efforts|material|as soon as possible|from time to time/i.exec(text);
  const issues = ambiguous ? [{
    id: "issue-1",
    type: "ambiguous_language",
    original_text: ambiguous[0],
    recommended_text: `specific ${ambiguous[0].toLowerCase()} standard tied to dates, thresholds, or objective criteria`,
    comment: "This term can create interpretive drift unless the agreement defines an objective standard.",
    severity: "medium" as const,
  }] : [];

  return {
    document: file.name.replace(/\.[^.]+$/, ""),
    issues,
    metadata: {
      fileName: file.name,
      fileType: file.type || "application/octet-stream",
      charactersAnalyzed: text.length,
      analysisTimestamp: new Date().toISOString(),
      analysisType: "legal",
      issuesFound: issues.length,
    },
  };
}

export async function analyzeLegalDocument(file: File, context = "") {
  const text = (await extractDocumentText(file)).replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!text) throw new Error("No text content could be extracted from this document.");
  const config = getAIProviderConfig();
  if (!config) return fallbackAnalysis(file, text);

  const client = createChatCompletionsClient(config);
  const schema = {
    type: "object",
    properties: {
      document: { type: "string" },
      issues: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            type: { type: "string" },
            original_text: { type: "string" },
            recommended_text: { type: "string" },
            comment: { type: "string" },
            severity: { type: "string", enum: ["low", "medium", "high"] },
          },
          required: ["id", "type", "original_text", "recommended_text", "comment", "severity"],
          additionalProperties: false,
        },
      },
    },
    required: ["document", "issues"],
    additionalProperties: false,
  };

  const response = await client.chat.completions.create({
    model: config.model,
    temperature: 0.1,
    ...(config.provider === "openai"
      ? { response_format: { type: "json_schema" as const, json_schema: { name: "LegalAnalysis", schema } } }
      : {}),
    messages: [
      {
        role: "system",
        content:
          "Analyze only the supplied contract text. Return concise structured legal issues. Do not invent clauses. This is analysis support, not legal advice. Return only valid JSON with this shape: {\"document\":\"string\",\"issues\":[{\"id\":\"string\",\"type\":\"string\",\"original_text\":\"string\",\"recommended_text\":\"string\",\"comment\":\"string\",\"severity\":\"low|medium|high\"}]}",
      },
      { role: "user", content: `Document: ${file.name}\nContext: ${context || "None"}\n\nText:\n${text.slice(0, 50000)}` },
    ],
  });

  const content = response.choices[0]?.message.content || "{}";
  const parsed = JSON.parse(extractJsonObject(content));
  return legalAnalysisSchema.parse({
    ...parsed,
    metadata: {
      fileName: file.name,
      fileType: file.type || "application/octet-stream",
      charactersAnalyzed: text.length,
      analysisTimestamp: new Date().toISOString(),
      analysisType: "legal",
      issuesFound: parsed.issues?.length || 0,
    },
  });
}

function extractJsonObject(content: string) {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/i.exec(content);
  if (fenced?.[1]) return fenced[1].trim();

  const first = content.indexOf("{");
  const last = content.lastIndexOf("}");
  if (first >= 0 && last > first) return content.slice(first, last + 1);

  return content;
}

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";
import { getTenantSystemPrompt } from "@/lib/ai/tenant-prompts";

const bodySchema = z.object({
  message: z.string().min(1),
  tenantType: z.enum(["quant", "legal", "finance", "enterprise"]).default("enterprise"),
  workspace: z.string().default("demo"),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid chat request." }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ text: `MVP offline response for ${parsed.data.workspace}: I would investigate the graph around the relevant entities, separate signal from narrative, list assumptions, and return a concise desk brief. Configure OPENAI_API_KEY to activate live analysis.` });
  }
  const result = await generateText({ model: openai("gpt-4o"), system: getTenantSystemPrompt(parsed.data.tenantType), prompt: parsed.data.message });
  return Response.json({ text: result.text });
}

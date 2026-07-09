import { generateText } from "ai";
import { z } from "zod";
import { getTenantSystemPrompt } from "@/lib/ai/tenant-prompts";
import {
  createAISDKModel,
  getAIProviderConfig,
  missingAIProviderMessage,
} from "@/lib/ai/provider";

const bodySchema = z.object({
  message: z.string().min(1),
  tenantType: z.enum(["quant", "legal", "finance", "enterprise"]).default("enterprise"),
  workspace: z.string().default("demo"),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid chat request." }, { status: 400 });
  const config = getAIProviderConfig();
  if (!config) {
    return Response.json({ text: missingAIProviderMessage(parsed.data.workspace) });
  }
  const result = await generateText({
    model: createAISDKModel(config),
    system: getTenantSystemPrompt(parsed.data.tenantType),
    prompt: parsed.data.message,
  });
  return Response.json({ text: result.text });
}

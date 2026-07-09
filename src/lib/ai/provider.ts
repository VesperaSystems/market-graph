import { createOpenAI } from "@ai-sdk/openai";
import { OpenAI } from "openai";

type AIProvider = "nebius" | "openai";

interface AIProviderConfig {
  provider: AIProvider;
  apiKey: string;
  baseURL?: string;
  model: string;
}

const NEBIUS_BASE_URL = "https://api.studio.nebius.com/v1/";
const NEBIUS_DEFAULT_MODEL = "deepseek-ai/DeepSeek-R1-0528";
const OPENAI_DEFAULT_MODEL = "gpt-4o";

function requestedProvider(): AIProvider | null {
  const value = process.env.AI_PROVIDER?.toLowerCase();
  if (value === "nebius" || value === "openai") return value;
  return null;
}

export function getAIProviderConfig(): AIProviderConfig | null {
  const provider = requestedProvider();

  if ((provider === "nebius" || !provider) && process.env.NEBIUS_API_KEY) {
    return {
      provider: "nebius",
      apiKey: process.env.NEBIUS_API_KEY,
      baseURL: process.env.NEBIUS_BASE_URL || NEBIUS_BASE_URL,
      model: process.env.NEBIUS_MODEL || NEBIUS_DEFAULT_MODEL,
    };
  }

  if ((provider === "openai" || !provider) && process.env.OPENAI_API_KEY) {
    return {
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || OPENAI_DEFAULT_MODEL,
    };
  }

  return null;
}

export function createAISDKModel(config: AIProviderConfig) {
  return createOpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    compatibility: config.provider === "openai" ? "strict" : "compatible",
    name: config.provider,
  })(config.model);
}

export function createChatCompletionsClient(config: AIProviderConfig) {
  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
  });
}

export function missingAIProviderMessage(workspace: string) {
  return `MVP offline response for ${workspace}: I would investigate the graph around the relevant entities, separate signal from narrative, list assumptions, and return a concise desk brief. Configure NEBIUS_API_KEY or OPENAI_API_KEY to activate live analysis.`;
}


import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server";

const schema = z.object({
  url: z.string().trim().url().max(300),
  goals: z.string().trim().min(3).max(1000),
});

const INSTRUCTIONS = `You are a senior SEO consultant at RJ SEO Digital Tool India.
Given a website URL and the owner's business goals, produce a prioritized SEO audit in Markdown.
You cannot browse the site: base recommendations on the URL, domain, likely industry and stated goals, and say what to verify.
Structure:
## Snapshot (2-3 sentences)
## Priority 1 — Quick wins (high impact, low effort)
## Priority 2 — Core improvements
## Priority 3 — Long-term growth
Under each priority give 2-4 numbered items with **bold title**, why it matters, and concrete steps. Tag each item with (Impact: High/Med/Low · Effort: High/Med/Low).
## 30-day action plan (bullet list)
Be specific to the goals and Indian market where relevant. No filler.`;

export async function handleAudit(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please enter a valid URL and describe your goals." }, { status: 400 });
  }
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions: INSTRUCTIONS,
    messages: [{ role: "user", content: `Website: ${parsed.data.url}\nBusiness goals: ${parsed.data.goals}` }],
    abortSignal: request.signal,
    maxRetries: 0,
    onError: ({ error }) => console.error("audit error", error),
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  } as Parameters<typeof streamText>[0]);

  return withLovableAiGatewayRunIdHeader(result.toTextStreamResponse(), runIdFetch);
}

import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayRunIdFetch } from "./ai-gateway.server";

const REASONING = {
  openai: {
    forceReasoning: true,
    reasoningEffort: "low",
    reasoningSummary: "auto",
    store: false,
    include: ["reasoning.encrypted_content"],
  },
} as const;

function getModel() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const lovable = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey: key,
    headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  return lovable.responses("openai/gpt-6-astra");
}

const EmailInput = z.object({
  purpose: z.string().min(3).max(4000),
  tone: z.enum(["formal", "friendly", "persuasive"]),
  recipient: z.string().max(200).optional(),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => {
    const result = streamText({
      model: getModel(),
      system: [
        "You are an expert workplace communication assistant writing business emails for professionals.",
        "Write a complete, ready-to-send email based on the user's brief.",
        "Output format (plain text, no markdown, no commentary):",
        "Subject: <concise subject line>",
        "",
        "<greeting>",
        "<body paragraphs, concise and well structured>",
        "<sign-off and placeholder name such as [Your Name]>",
        "Never invent specific facts, figures, dates or names that were not provided; use clear square-bracket placeholders instead.",
      ].join("\n"),
      prompt: [
        `Tone: ${data.tone}.`,
        data.recipient ? `Recipient: ${data.recipient}.` : "",
        `Purpose and content of the email: ${data.purpose}`,
      ]
        .filter(Boolean)
        .join("\n"),
      providerOptions: REASONING,
    });

    return { text: await result.text };
  });

const PlanInput = z.object({
  tasks: z.string().min(3).max(6000),
  horizon: z.enum(["day", "week"]),
  hours: z.string().max(200).optional(),
});

export const generatePlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => PlanInput.parse(input))
  .handler(async ({ data }) => {
    const result = streamText({
      model: getModel(),
      system: [
        "You are a professional productivity planner. You organise, prioritise and schedule workplace tasks.",
        "Prioritise using both urgency and importance (Eisenhower-style reasoning) and keep the schedule realistic, with focus blocks, breaks and buffer time.",
        "Output plain readable text with clear headings and time slots. Start with a short 'Priorities' list (ranked, each labelled High/Medium/Low with a one-line reason), then the schedule, then a short 'Notes & risks' section.",
        "Do not invent tasks the user did not mention; you may group or split their tasks when it helps.",
      ].join("\n"),
      prompt: [
        `Planning horizon: ${data.horizon === "day" ? "a single working day" : "a full working week"}.`,
        data.hours ? `Working hours / constraints: ${data.hours}.` : "",
        `Tasks provided by the user:\n${data.tasks}`,
      ]
        .filter(Boolean)
        .join("\n"),
      providerOptions: REASONING,
    });

    return { text: await result.text };
  });

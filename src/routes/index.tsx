import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, CalendarCheck, MessageSquare, ArrowRight, Sparkle } from "lucide-react";

import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verdant — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Draft professional emails, plan and prioritise your tasks, and get workplace help from an AI assistant — all in your browser, nothing saved.",
      },
      { property: "og:title", content: "Verdant — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "AI email writing, task planning and a workplace chat assistant in one calm, private dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email" as const,
    icon: Mail,
    title: "Smart Email Generator",
    body: "Describe what you need to say, pick a tone, and get a complete email you can edit and copy.",
  },
  {
    to: "/planner" as const,
    icon: CalendarCheck,
    title: "AI Task Planner",
    body: "Paste your tasks and get them prioritised by urgency and importance in a realistic schedule.",
  },
  {
    to: "/chat" as const,
    icon: MessageSquare,
    title: "AI Workplace Chatbot",
    body: "Ask anything about communication, organisation, planning, brainstorming or professional writing.",
  },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          <Sparkle className="size-3.5" aria-hidden /> Works entirely in your session
        </span>
        <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">
          Do your workday's writing, planning and thinking with AI.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Verdant is a lightweight assistant for professionals. Every email, schedule and answer is
          generated live from what you type — there are no accounts and nothing is stored.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ to, icon: Icon, title, body }) => (
            <Link
              key={to}
              to={to}
              className="card-soft group flex flex-col gap-4 p-6 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold">{title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                  {body}
                </span>
              </span>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open tool
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="card-soft mt-10 grid gap-6 p-6 sm:grid-cols-3">
          {[
            ["1. Describe", "Type your brief, your tasks or your question in plain language."],
            ["2. Generate", "The AI writes a structured, workplace-ready response."],
            ["3. Edit & use", "Tweak the result in place, then copy it wherever you need it."],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="font-display text-base font-semibold text-primary">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell, ResponsibleAiNotice } from "@/components/AppShell";
import { OutputPanel } from "@/components/OutputPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generatePlan } from "@/lib/ai.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Verdant" },
      {
        name: "description",
        content:
          "Paste your tasks and get an AI-prioritised, realistic daily or weekly schedule you can edit in place.",
      },
      { property: "og:title", content: "AI Task Planner — Verdant" },
      {
        property: "og:description",
        content: "Turn a messy task list into a prioritised day or week plan, ranked by urgency and importance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPage,
});

type Horizon = "day" | "week";

function PlannerPage() {
  const run = useServerFn(generatePlan);
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("");
  const [horizon, setHorizon] = useState<Horizon>("day");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (tasks.trim().length < 3) {
      toast.error("List a few tasks first.");
      return;
    }
    setLoading(true);
    try {
      const result = await run({
        data: {
          tasks: tasks.trim(),
          horizon,
          ...(hours.trim() ? { hours: hours.trim() } : {}),
        },
      });
      setOutput(result.text.trim());
    } catch (error) {
      console.error(error);
      toast.error("The assistant couldn't build that plan. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          <CalendarCheck className="size-3.5" aria-hidden /> AI Task Planner
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl">Turn your list into a realistic plan</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Drop in your tasks however they come out of your head. The assistant prioritises by urgency
          and importance, then builds a schedule with focus blocks and buffer time.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="card-soft flex flex-col gap-5 p-6">
            <div className="grid gap-2">
              <Label htmlFor="tasks">Your tasks</Label>
              <Textarea
                id="tasks"
                rows={10}
                placeholder={
                  "Finish Q3 report (due tomorrow)\nPrep client demo for Thursday\nReview two pull requests\nCall supplier about delayed invoice\n1:1 with Sam"
                }
                value={tasks}
                onChange={(event) => setTasks(event.target.value)}
                className="min-h-48 resize-y"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="horizon">Plan for</Label>
                <Select value={horizon} onValueChange={(value) => setHorizon(value as Horizon)}>
                  <SelectTrigger id="horizon">
                    <SelectValue placeholder="Choose a horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">A single day</SelectItem>
                    <SelectItem value="week">A full week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hours">Working hours (optional)</Label>
                <Input
                  id="hours"
                  placeholder="08:30–17:00, no meetings after 15:00"
                  value={hours}
                  onChange={(event) => setHours(event.target.value)}
                />
              </div>
            </div>

            <Button type="button" onClick={generate} disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CalendarCheck className="size-4" />
              )}
              {loading ? "Planning…" : output ? "Plan again" : "Generate schedule"}
            </Button>

            <ResponsibleAiNotice />
          </section>

          <OutputPanel
            title="Your schedule"
            hint="Edit times, reorder priorities or add notes — it's yours to adjust."
            value={output}
            onChange={setOutput}
            onRegenerate={generate}
            loading={loading}
            empty={
              loading
                ? "Prioritising and scheduling your tasks…"
                : "Your prioritised plan will appear here, ready to edit and copy."
            }
          />
        </div>
      </div>
    </AppShell>
  );
}

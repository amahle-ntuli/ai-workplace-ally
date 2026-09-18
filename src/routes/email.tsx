import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Mail } from "lucide-react";
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
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Verdant" },
      {
        name: "description",
        content:
          "Describe your message, choose a formal, friendly or persuasive tone, and get a complete editable email written by AI.",
      },
      { property: "og:title", content: "Smart Email Generator — Verdant" },
      {
        property: "og:description",
        content: "AI-written workplace emails in the tone you choose, fully editable before you send.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

type Tone = "formal" | "friendly" | "persuasive";

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (purpose.trim().length < 3) {
      toast.error("Tell the assistant what the email should say first.");
      return;
    }
    setLoading(true);
    try {
      const result = await run({
        data: {
          purpose: purpose.trim(),
          tone,
          ...(recipient.trim() ? { recipient: recipient.trim() } : {}),
        },
      });
      setOutput(result.text.trim());
    } catch (error) {
      console.error(error);
      toast.error("The assistant couldn't write that email. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          <Mail className="size-3.5" aria-hidden /> Smart Email Generator
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl">Write the email in seconds</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Describe the purpose and any details to include. The assistant writes a complete email you
          can edit before sending.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="card-soft flex flex-col gap-5 p-6">
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient / context (optional)</Label>
              <Input
                id="recipient"
                placeholder="My manager, a client, the whole team…"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="purpose">What should the email say?</Label>
              <Textarea
                id="purpose"
                rows={9}
                placeholder="Ask for a two-day deadline extension on the Q3 report, explain that supplier data arrived late, and propose Friday as the new date."
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                className="min-h-40 resize-y"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={(value) => setTone(value as Tone)}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Choose a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="button" onClick={generate} disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
              {loading ? "Writing…" : output ? "Generate again" : "Generate email"}
            </Button>

            <ResponsibleAiNotice />
          </section>

          <OutputPanel
            title="Your email"
            hint="Fully editable — change anything before you copy it."
            value={output}
            onChange={setOutput}
            onRegenerate={generate}
            loading={loading}
            empty={
              loading
                ? "Writing your email…"
                : "Your generated email will appear here, ready to edit and copy."
            }
          />
        </div>
      </div>
    </AppShell>
  );
}

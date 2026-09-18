import { Copy, RefreshCw, Check } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function OutputPanel({
  title,
  hint,
  value,
  onChange,
  onRegenerate,
  loading,
  rows = 18,
  empty,
}: {
  title: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  onRegenerate: () => void;
  loading: boolean;
  rows?: number;
  empty: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="card-soft flex flex-col p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
        </div>
        {value ? (
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={copy}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onRegenerate}
              disabled={loading}
            >
              <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
              Regenerate
            </Button>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex-1">
        {value ? (
          <Textarea
            value={value}
            rows={rows}
            onChange={(event) => onChange(event.target.value)}
            aria-label={`${title} — editable output`}
            className="min-h-[22rem] resize-y bg-background/60 font-sans text-sm leading-relaxed"
          />
        ) : (
          <div className="flex min-h-[22rem] items-center justify-center rounded-xl border border-dashed border-border bg-background/40 p-8 text-center text-sm text-muted-foreground">
            {empty}
          </div>
        )}
      </div>
    </section>
  );
}

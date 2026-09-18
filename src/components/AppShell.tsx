import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Mail, CalendarCheck, MessageSquare, Leaf, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/planner", label: "Task Planner", icon: CalendarCheck },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
        >
          <Icon className="size-4 shrink-0" aria-hidden />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <Leaf className="size-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-semibold">Quick Assist</span>
        <span className="block text-xs text-muted-foreground">Workplace AI Assistant</span>
      </span>
    </div>
  );
}

export function ResponsibleAiNotice({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "rounded-xl border border-border bg-secondary/60 px-3 py-2 text-xs leading-relaxed text-brown",
        className,
      )}
    >
      <span className="font-semibold">Responsible AI:</span> AI-generated content can be inaccurate
      or incomplete. Review everything for accuracy, tone, confidentiality and appropriateness before
      using it professionally. Nothing you enter is saved.
    </p>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden w-72 shrink-0 flex-col justify-between border-r border-sidebar-border bg-sidebar px-5 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="flex flex-col gap-8">
          <Brand />
          <NavLinks />
        </div>
        <ResponsibleAiNotice />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-sidebar-border bg-sidebar/95 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground"
        >
          {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col justify-between bg-sidebar px-5 py-6">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <Brand />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="flex size-9 items-center justify-center rounded-xl border border-border"
                >
                  <X className="size-4" />
                </button>
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
            <ResponsibleAiNotice />
          </div>
        </div>
      ) : null}

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">{children}</main>
    </div>
  );
}

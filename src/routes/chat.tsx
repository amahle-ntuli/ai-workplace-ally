import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";

import { AppShell, ResponsibleAiNotice } from "@/components/AppShell";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import assistantMark from "@/assets/assistant-mark.png";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chat — Verdant" },
      {
        name: "description",
        content:
          "Chat with an AI assistant about workplace communication, organisation, productivity, planning, brainstorming and professional writing.",
      },
      { property: "og:title", content: "AI Workplace Chat — Verdant" },
      {
        property: "og:description",
        content: "A live AI assistant for workplace questions, planning and professional writing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Help me give constructive feedback to a teammate who missed a deadline.",
  "Brainstorm five agenda items for a 30-minute project kickoff.",
  "How do I politely decline a meeting invite without losing goodwill?",
];

function ChatPage() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (error) => {
      console.error(error);
      toast.error("The assistant couldn't reply. Please try again in a moment.");
    },
  });

  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    void sendMessage({ text: text.trim() });
  };

  return (
    <AppShell>
      <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-3xl flex-col lg:h-[calc(100vh-4rem)]">
        <div>
          <h1 className="text-3xl sm:text-4xl">AI Workplace Chat</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Ask about communication, organisation, productivity, planning, brainstorming or
            professional writing. This conversation lives only in this browser tab.
          </p>
        </div>

        <div className="card-soft mt-6 flex min-h-0 flex-1 flex-col overflow-hidden">
          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="gap-6">
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={
                    <img
                      src={assistantMark}
                      alt=""
                      className="size-14 rounded-2xl"
                      aria-hidden
                    />
                  }
                  title="How can I help with your work today?"
                  description="Start with one of these, or type your own question."
                >
                  <div className="mt-4 flex flex-col gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <Button
                        key={suggestion}
                        type="button"
                        variant="outline"
                        className="h-auto whitespace-normal py-2.5 text-left text-sm"
                        onClick={() => send(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </ConversationEmptyState>
              ) : null}

              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  <MessageContent>
                    {message.parts.map((part, index) =>
                      part.type === "text" ? (
                        <MessageResponse key={index}>{part.text}</MessageResponse>
                      ) : null,
                    )}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" ? <Shimmer>Thinking…</Shimmer> : null}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border px-3 py-2.5">
            <PromptInput
              onSubmit={(message) => {
                send(message.text ?? "");
              }}
            >
              <PromptInputTextarea
                placeholder="Ask about an email, a plan, a tricky conversation…"
                className="min-h-10 max-h-28"
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} disabled={busy} />
              </PromptInputFooter>
            </PromptInput>
            <ResponsibleAiNotice className="mt-2" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

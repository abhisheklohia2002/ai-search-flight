import { Sparkles } from "lucide-react";
import type { ChatMessageItem } from "@/types/chat";

export function MobileConversation({ messages }: { messages: ChatMessageItem[] }) {
  if (!messages.length) return null;

  return (
    <section className="space-y-4" aria-label="Conversation">
      {messages.map((message) => {
        const isUser = message.role === "user";
        if (isUser) {
          return (
            <div key={message.id} className="flex justify-end">
              <div className="max-w-[88%] rounded-[22px] rounded-br-md bg-slate-100 px-4 py-3 text-sm font-semibold leading-6 text-slate-800">
                {message.content}
              </div>
            </div>
          );
        }

        return (
          <div key={message.id} className="flex items-start gap-2.5">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-950 text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <p
              className={`max-w-[88%] pt-1 text-sm font-medium leading-6 ${
                message.type === "ERROR" ? "text-rose-700" : "text-slate-700"
              }`}
            >
              {message.content}
            </p>
          </div>
        );
      })}
    </section>
  );
}

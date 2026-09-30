import { Sparkles } from "lucide-react";
import type { ChatMessageItem } from "@/types/chat";

export function ChatMessage({ message }: { message: ChatMessageItem }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[88%] rounded-[22px] rounded-br-md bg-slate-100 px-4 py-3 text-sm font-medium leading-6 text-slate-800 sm:max-w-[72%] sm:px-5 sm:text-[15px]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-950 text-white">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      <div
        className={`max-w-[92%] pt-1 text-sm leading-6 sm:text-[15px] ${
          message.type === "ERROR" ? "text-rose-700" : "text-slate-700"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

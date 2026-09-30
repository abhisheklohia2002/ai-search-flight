import type { ChatMessageItem } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { ThinkingIndicator } from "./ThinkingIndicator";

interface ConversationProps {
  messages: ChatMessageItem[];
  loading: boolean;
}

export function Conversation({ messages, loading }: ConversationProps) {
  if (!messages.length && !loading) {
    return null;
  }

  return (
    <section className="space-y-4" aria-label="Conversation">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {loading && <ThinkingIndicator />}
    </section>
  );
}

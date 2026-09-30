"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import { ArrowUp, LoaderCircle, Mic } from "lucide-react";

interface MobileSearchComposerProps {
  loading: boolean;
  onSubmit: (message: string) => Promise<void> | void;
  variant?: "hero" | "sticky";
}

export function MobileSearchComposer({
  loading,
  onSubmit,
  variant = "hero",
}: MobileSearchComposerProps) {
  const [query, setQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  async function submitMessage() {
    const message = query.trim();
    if (!message || loading) return;
    setQuery("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await onSubmit(message);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage();
    }
  }

  function handleChange(value: string) {
    setQuery(value);
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 112)}px`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-[24px] border bg-white p-2 shadow-lg transition focus-within:border-cyan-300 focus-within:ring-4 focus-within:ring-cyan-100/60 ${
        variant === "sticky" ? "border-slate-200" : "border-white/60"
      }`}
    >
      <div className="flex items-end gap-2 pl-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Ask Flight360 about your trip..."
          aria-label="Ask Flight360 about your trip"
          className="max-h-28 min-h-12 min-w-0 flex-1 resize-none bg-transparent py-3 text-[15px] font-semibold leading-6 text-slate-950 outline-none placeholder:font-medium placeholder:text-slate-400"
        />
        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-slate-500"
          aria-label="Voice search"
        >
          <Mic className="h-5 w-5" />
        </button>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white shadow-md disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={loading ? "Searching" : "Send search"}
        >
          {loading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <ArrowUp className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
}

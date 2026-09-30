"use client";

import {
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";

import {
  ArrowUp,
  LoaderCircle,
  Mic,
} from "lucide-react";

interface AISearchBarProps {
  loading: boolean;

  onSubmit: (
    message: string
  ) => Promise<void> | void;

  compact?: boolean;
}

export function AISearchBar({
  loading,
  onSubmit,
  compact = false,
}: AISearchBarProps) {
  const [query, setQuery] =
    useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement | null>(
      null
    );

  async function submitMessage() {
    const message =
      query.trim();

    if (
      !message ||
      loading
    ) {
      return;
    }

    setQuery("");

    if (
      textareaRef.current
    ) {
      textareaRef.current.style.height =
        "auto";
    }

    await onSubmit(message);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await submitMessage();
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      void submitMessage();
    }
  }

  function handleChange(
    value: string
  ) {
    setQuery(value);

    const element =
      textareaRef.current;

    if (!element) {
      return;
    }

    element.style.height =
      "auto";
    element.style.height =
      `${Math.min(
        element.scrollHeight,
        128
      )}px`;
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className={`
        w-full
        rounded-[28px]
        border
        p-2
        transition-all
        duration-200

        focus-within:border-cyan-300
        focus-within:ring-4
        focus-within:ring-cyan-100/70

        ${
          compact
            ? `
              max-w-4xl
              border-slate-200/80
              bg-white/95
              shadow-[0_12px_45px_rgba(15,23,42,0.13)]
              backdrop-blur-xl
            `
            : `
              max-w-[760px]
              border-white/80
              bg-white/95
              shadow-[0_18px_55px_rgba(15,23,42,0.16)]
              backdrop-blur-xl
            `
        }
      `}
    >
      <div
        className="
          flex
          items-end
          gap-2
          pl-2
          sm:gap-3
          sm:pl-3
        "
      >
        {/* Input */}
        <textarea
          ref={
            textareaRef
          }
          rows={1}
          value={
            query
          }
          onChange={(
            event
          ) =>
            handleChange(
              event.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          placeholder="Ask Flight360 where you want to fly..."
          aria-label="Ask Flight360 about your trip"
          disabled={
            loading
          }
          className="
            max-h-32
            min-h-[48px]
            min-w-0
            flex-1
            resize-none
            bg-transparent
            px-1
            py-3
            text-[15px]
            font-medium
            leading-6
            text-slate-900
            outline-none

            placeholder:font-medium
            placeholder:text-slate-400

            disabled:cursor-not-allowed
            disabled:opacity-70

            sm:text-base
          "
        />

        {/* Voice button */}
        <button
          type="button"
          aria-label="Voice search"
          title="Voice search"
          className="
            hidden
            h-11
            w-11
            shrink-0
            place-items-center
            rounded-full
            text-slate-500
            transition-all

            hover:bg-slate-100
            hover:text-slate-900

            active:scale-95

            sm:grid
          "
        >
          <Mic
            className="
              h-5
              w-5
            "
          />
        </button>

        {/* Send button */}
       <button
  type="submit"
  disabled={loading || !query.trim()}
  aria-label={loading ? "Searching" : "Send search"}
  className="
    mb-0.5
    grid
    h-10
    w-10
    shrink-0
    place-items-center
    rounded-full
    bg-slate-950
    text-white
    shadow-sm
    transition-all
    duration-200
    hover:bg-cyan-900
    active:scale-95
    disabled:cursor-not-allowed
    disabled:opacity-35
    sm:h-11
    sm:w-11
  "
>
  {loading ? (
    <LoaderCircle className="h-4 w-4 animate-spin" />
  ) : (
    <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
  )}
</button>
      </div>

      {/* Desktop hint */}
      <div
        className="
          hidden
          px-3
          pb-1
          pt-1
          text-left
          text-[11px]
          font-medium
          text-slate-400
          sm:block
        "
      >
        Press Enter to send
        {" · "}
        Shift + Enter for a new line
      </div>
    </form>
  );
}
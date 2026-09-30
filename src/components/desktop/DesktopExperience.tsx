"use client";

import { Sparkles } from "lucide-react";
import { HeroSection } from "@/components/hero/HeroSection";
import { SearchWorkspace } from "@/components/chat/SearchWorkspace";
import type {
  CalendarFareResult,
  ChatMessageItem,
  FlightOption,
  FlightSearchSummary,
} from "@/types/chat";

interface DesktopExperienceProps {
  loading: boolean;
  hasConversation: boolean;
  messages: ChatMessageItem[];
  flights: FlightOption[];
  calendarFares: CalendarFareResult[];
  search?: FlightSearchSummary;
  error: string | null;
  origin: string;
  onOriginChange: (value: string) => void;
  onSubmit: (message: string) => Promise<void> | void;
  onRetry: () => void;
}

export function DesktopExperience({
  loading,
  hasConversation,
  messages,
  flights,
  calendarFares,
  search,
  error,
  origin,
  onOriginChange,
  onSubmit,
  onRetry,
}: DesktopExperienceProps) {
  return (
    <div className="hidden md:block">
      <HeroSection
        loading={loading}
        hasConversation={hasConversation}
        origin={origin}
        onOriginChange={onOriginChange}
        onSubmit={onSubmit}
      />

      {hasConversation ? (
        <SearchWorkspace
          loading={loading}
          messages={messages}
          flights={flights}
          calendarFares={calendarFares}
          search={search}
          error={error}
          onSubmit={onSubmit}
          onRetry={onRetry}
        />
      ) : (
        <section
          id="help"
          className="mx-auto grid w-full max-w-5xl gap-4 px-6 py-16 sm:grid-cols-3 lg:px-8"
        >
          {[
            [
              "Natural language",
              "Search like you talk: routes, dates, budgets and airline preferences.",
            ],
            [
              "One conversation",
              "Use follow-up messages instead of starting your search again.",
            ],
            [
              "Fast comparison",
              "Compare flights and flexible-date fares in one focused experience.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Sparkles className="h-5 w-5 text-cyan-700" />
              <h2 className="mt-4 font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

"use client";

import { Sparkles } from "lucide-react";
import type {
  CalendarFareResult,
  ChatMessageItem,
  FlightOption,
  FlightSearchSummary,
} from "@/types/chat";
import { MobileHero } from "./MobileHero";
import { MobileSearchWorkspace } from "./MobileSearchWorkspace";

interface MobileExperienceProps {
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

export function MobileExperience({
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
}: MobileExperienceProps) {
  return (
    <div className="md:hidden">
      <MobileHero
        loading={loading}
        hasConversation={hasConversation}
        origin={origin}
        onOriginChange={onOriginChange}
        onSubmit={onSubmit}
      />

      {hasConversation ? (
        <MobileSearchWorkspace
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
        <section id="mobile-help" className="space-y-3 px-4 py-10">
          {[
            ["Natural language", "Search routes, dates, budgets and airline preferences naturally."],
            ["One conversation", "Refine the same trip without restarting your search."],
            ["Fast comparison", "See live matching flights and flexible-date fares clearly."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm">
              <Sparkles className="h-4 w-4 text-cyan-700" />
              <h2 className="mt-3 text-sm font-black text-slate-950">{title}</h2>
              <p className="mt-1.5 text-sm font-medium leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

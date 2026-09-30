"use client";

import { Sparkles } from "lucide-react";
import { ErrorState } from "@/components/common/ErrorState";
import { FlightSearchSkeleton } from "@/components/flights/FlightSearchSkeleton";
import type {
  CalendarFareResult,
  ChatMessageItem,
  FlightOption,
  FlightSearchSummary,
} from "@/types/chat";
import { MobileCalendarFareResults } from "./MobileCalendarFareResults";
import { MobileConversation } from "./MobileConversation";
import { MobileFlightResults } from "./MobileFlightResults";
import { MobileSearchComposer } from "./MobileSearchComposer";

interface MobileSearchWorkspaceProps {
  loading: boolean;
  messages: ChatMessageItem[];
  flights: FlightOption[];
  calendarFares: CalendarFareResult[];
  search?: FlightSearchSummary;
  error: string | null;
  onSubmit: (message: string) => Promise<void> | void;
  onRetry: () => void;
}

export function MobileSearchWorkspace({
  loading,
  messages,
  flights,
  calendarFares,
  search,
  error,
  onSubmit,
  onRetry,
}: MobileSearchWorkspaceProps) {
  return (
    <>
      <section
        id="mobile-flight-workspace"
        className="relative z-20 -mt-8 px-3 pb-[calc(10.5rem+env(safe-area-inset-bottom))]"
      >
        <div className="rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.13)]">
          <div className="border-b border-slate-100 px-4 py-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-cyan-700" />
              Flight360 AI
            </div>
          </div>

          <div className="space-y-7 px-4 py-5">
            <MobileConversation messages={messages} />

            {loading && <FlightSearchSkeleton />}

            {error && !loading && (
              <ErrorState message={error} onRetry={onRetry} />
            )}

            {!loading && calendarFares.length > 0 && (
              <MobileCalendarFareResults results={calendarFares} />
            )}

            {!loading && flights.length > 0 && (
              <MobileFlightResults flights={flights} search={search} />
            )}

            <div className="h-8" aria-hidden="true" />
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/70 bg-white/[0.92] shadow-[0_-10px_35px_rgba(15,23,42,0.07)] backdrop-blur-xl">
        <div className="mx-auto w-full px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <MobileSearchComposer loading={loading} onSubmit={onSubmit} variant="sticky" />
        </div>
      </div>
    </>
  );
}

"use client";

import { Sparkles } from "lucide-react";

import { AISearchBar } from "@/components/hero/AISearchBar";
import { Conversation } from "@/components/chat/Conversation";
import { ErrorState } from "@/components/common/ErrorState";
import { CalendarFareResults } from "@/components/calendar/CalendarFareResults";
import { FlightResults } from "@/components/flights/FlightResults";
import { FlightSearchSkeleton } from "@/components/flights/FlightSearchSkeleton";

import type {
  CalendarFareResult,
  ChatMessageItem,
  FlightOption,
  FlightSearchSummary,
} from "@/types/chat";

interface SearchWorkspaceProps {
  loading: boolean;
  messages: ChatMessageItem[];
  flights: FlightOption[];
  calendarFares: CalendarFareResult[];
  search?: FlightSearchSummary;
  error: string | null;

  onSubmit: (
    message: string
  ) => Promise<void> | void;

  onRetry: () => void;
}

export function SearchWorkspace({
  loading,
  messages,
  flights,
  calendarFares,
  search,
  error,
  onSubmit,
  onRetry,
}: SearchWorkspaceProps) {
  return (
    <section
      id="desktop-flight-workspace"
      className="
        relative
        z-20
        mx-auto
        -mt-16
        hidden
        w-full
        max-w-6xl
        scroll-mt-4
        px-6
        pb-16
        md:block
        lg:px-8
      "
    >
      <div
        className="
          overflow-visible
          rounded-[30px]
          border
          border-slate-200/80
          bg-white
          shadow-[0_24px_80px_rgba(15,23,42,0.14)]
        "
      >
        {/* Workspace header */}
        <div
          className="
            border-b
            border-slate-100
            px-7
            py-5
          "
        >
          <div className="mx-auto max-w-5xl">
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-700" />

              Flight360 AI Search
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          className="
            mx-auto
            max-w-5xl
            space-y-8
            px-7
            pb-10
            pt-8
          "
        >
          <Conversation
            messages={messages}
            loading={false}
          />

          {loading && (
            <div className="pt-2">
              <FlightSearchSkeleton />
            </div>
          )}

          {error && !loading && (
            <ErrorState
              message={error}
              onRetry={onRetry}
            />
          )}

          {!loading &&
            calendarFares.length > 0 && (
              <CalendarFareResults
                results={calendarFares}
              />
            )}

          {!loading &&
            flights.length > 0 && (
              <FlightResults
                flights={flights}
                search={search}
              />
            )}
        </div>

        {/* Sticky composer area */}
        <div
          className="
            sticky
            bottom-0
            z-40
            mt-8
            bg-gradient-to-t
            from-white
            via-white/95
            to-transparent
            px-7
            pb-6
            pt-10
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-4xl
            "
          >
            <div
              className="
                mb-2
                flex
                items-center
                gap-2
                px-3
                text-[11px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-700" />

              Continue your search
            </div>

            <AISearchBar
              loading={loading}
              onSubmit={onSubmit}
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
}
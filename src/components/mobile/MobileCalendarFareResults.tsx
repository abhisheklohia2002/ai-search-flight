"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { CalendarFareResult } from "@/types/chat";

export function MobileCalendarFareResults({ results }: { results: CalendarFareResult[] }) {
  const fares = useMemo(
    () => results.flatMap((result) => result.fares).sort((a, b) => a.departureDate.localeCompare(b.departureDate)),
    [results],
  );
  const [selected, setSelected] = useState<string | null>(null);

  if (!fares.length) return null;
  const cheapest = Math.min(...fares.map((item) => item.fare));

  return (
    <section className="space-y-3" aria-labelledby="mobile-calendar-heading">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-100 text-cyan-900">
          <CalendarDays className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.13em] text-cyan-700">Flexible dates</p>
          <h2 id="mobile-calendar-heading" className="text-xl font-black text-slate-950">Calendar fares</h2>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2.5">
          {fares.map((item) => {
            const date = new Date(`${item.departureDate}T00:00:00`);
            const weekday = new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(date);
            const day = new Intl.DateTimeFormat("en-IN", { day: "numeric" }).format(date);
            const isSelected = selected === item.departureDate;
            const isCheapest = item.fare === cheapest || item.isLowestFareOfMonth;

            return (
              <button
                key={`${item.departureDate}-${item.airlineCode}`}
                type="button"
                onClick={() => setSelected(item.departureDate)}
                className={`min-w-[104px] rounded-3xl border px-3 py-3 text-left ${
                  isSelected
                    ? "border-slate-950 bg-slate-950 text-white"
                    : isCheapest
                      ? "border-cyan-300 bg-cyan-50 text-slate-950"
                      : "border-slate-200 bg-white text-slate-950"
                }`}
                aria-pressed={isSelected}
              >
                <p className={`text-[10px] font-black uppercase tracking-wide ${isSelected ? "text-white/70" : "text-slate-400"}`}>{weekday}</p>
                <p className="mt-1 text-xl font-black">{day}</p>
                <p className={`mt-2 text-xs font-black ${isSelected ? "text-white" : isCheapest ? "text-cyan-800" : "text-slate-700"}`}>
                  {formatCurrency(item.fare, item.currency)}
                </p>
                {isCheapest && <p className={`mt-1 text-[9px] font-black uppercase ${isSelected ? "text-cyan-200" : "text-cyan-700"}`}>Best fare</p>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

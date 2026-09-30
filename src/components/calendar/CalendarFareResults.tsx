"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { CalendarFareOption, CalendarFareResult } from "@/types/chat";

export function CalendarFareResults({ results }: { results: CalendarFareResult[] }) {
  const fares = useMemo(
    () => results.flatMap((result) => result.fares).sort((a, b) => a.departureDate.localeCompare(b.departureDate)),
    [results],
  );
  const [selected, setSelected] = useState<string | null>(null);

  if (!fares.length) {
    return null;
  }

  const cheapest = Math.min(...fares.map((item) => item.fare));

  return (
    <section className="space-y-4" aria-labelledby="calendar-fares-heading">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-900">
          <CalendarDays className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-700">Flexible dates</p>
          <h2 id="calendar-fares-heading" className="text-2xl font-black text-slate-950">Calendar fares</h2>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-3">
          {fares.map((item) => (
            <CalendarFareCard
              key={`${item.departureDate}-${item.airlineCode}`}
              item={item}
              cheapest={item.fare === cheapest || item.isLowestFareOfMonth}
              selected={selected === item.departureDate}
              onSelect={() => setSelected(item.departureDate)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CalendarFareCard({
  item,
  cheapest,
  selected,
  onSelect,
}: {
  item: CalendarFareOption;
  cheapest: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const date = new Date(`${item.departureDate}T00:00:00`);
  const weekday = new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en-IN", { day: "numeric" }).format(date);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`min-w-[116px] rounded-3xl border px-4 py-4 text-left transition ${
        selected
          ? "border-slate-950 bg-slate-950 text-white shadow-lg"
          : cheapest
            ? "border-cyan-300 bg-cyan-50 text-slate-950"
            : "border-slate-200 bg-white text-slate-950"
      }`}
      aria-pressed={selected}
    >
      <p className={`text-xs font-extrabold uppercase tracking-wide ${selected ? "text-white/70" : "text-slate-400"}`}>{weekday}</p>
      <p className="mt-1 text-2xl font-black">{day}</p>
      <p className={`mt-3 text-sm font-black ${selected ? "text-white" : cheapest ? "text-cyan-800" : "text-slate-700"}`}>
        {formatCurrency(item.fare, item.currency)}
      </p>
      {cheapest && <p className={`mt-1 text-[10px] font-extrabold uppercase ${selected ? "text-cyan-200" : "text-cyan-700"}`}>Best fare</p>}
    </button>
  );
}

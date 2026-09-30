"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { useMemo, useState } from "react";

const AIRPORTS = [
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International" },
  { code: "IXB", city: "Bagdogra", name: "Bagdogra Airport" },
  { code: "GOI", city: "Goa", name: "Goa International" },
];

interface AirportSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function AirportSelector({ value, onChange }: AirportSelectorProps) {
  const [query, setQuery] = useState("");
  const selected = AIRPORTS.find((airport) => airport.code === value) ?? AIRPORTS[0];
  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return AIRPORTS;
    return AIRPORTS.filter((airport) =>
      `${airport.city} ${airport.code} ${airport.name}`.toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <Combobox
      value={selected}
      onChange={(airport) => {
        if (airport) onChange(airport.code);
      }}
      immediate
    >
      <div className="relative w-full max-w-[420px]">
        <div className="flex h-[52px] items-center gap-3 rounded-2xl border border-white/40 bg-white/95 px-4 shadow-soft">
          <MapPin className="h-5 w-5 text-slate-500" />
          <ComboboxInput
            aria-label="Origin airport"
            displayValue={(airport: typeof selected) =>
              airport ? `From: ${airport.city} · ${airport.code}` : ""
            }
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none sm:text-base"
          />
          <ComboboxButton className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-500">
            <ChevronDown className="h-5 w-5" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          className="z-[90] mt-2 w-[var(--input-width)] max-h-72 rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl [--anchor-gap:8px] empty:invisible"
        >
          {filtered.map((airport) => (
            <ComboboxOption
              key={airport.code}
              value={airport}
              className="group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 data-[focus]:bg-slate-100"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-xs font-black text-cyan-800">
                {airport.code}
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate text-sm font-black text-slate-950">{airport.city}</span>
                <span className="block truncate text-xs font-medium text-slate-500">{airport.name}</span>
              </span>
              <Check className="hidden h-4 w-4 text-cyan-700 group-data-[selected]:block" />
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

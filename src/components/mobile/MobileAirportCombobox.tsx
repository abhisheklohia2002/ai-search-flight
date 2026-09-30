"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { MOBILE_AIRPORTS } from "./mobile-data";

interface MobileAirportComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function MobileAirportCombobox({
  value,
  onChange,
}: MobileAirportComboboxProps) {
  const [query, setQuery] = useState("");
  const selected = MOBILE_AIRPORTS.find((airport) => airport.code === value) ?? MOBILE_AIRPORTS[0];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return MOBILE_AIRPORTS;
    return MOBILE_AIRPORTS.filter((airport) =>
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
      <div className="relative w-full">
        <div className="flex h-14 items-center gap-3 rounded-[22px] border border-white/35 bg-white/95 px-4 shadow-lg">
          <MapPin className="h-5 w-5 shrink-0 text-cyan-700" />
          <ComboboxInput
            aria-label="Origin airport"
            displayValue={(airport: typeof selected) =>
              airport ? `${airport.city} · ${airport.code}` : ""
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Choose origin airport"
            className="min-w-0 flex-1 bg-transparent text-[15px] font-bold text-slate-950 outline-none placeholder:text-slate-400"
          />
          <ComboboxButton className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-500">
            <ChevronDown className="h-5 w-5" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          className="z-[90] mt-2 w-[var(--input-width)] max-h-72 rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl [--anchor-gap:8px] empty:invisible"
        >
          {filtered.length === 0 ? (
            <div className="flex items-center gap-2 px-4 py-5 text-sm font-semibold text-slate-500">
              <Search className="h-4 w-4" />
              No airport found
            </div>
          ) : (
            filtered.map((airport) => (
              <ComboboxOption
                key={airport.code}
                value={airport}
                className="group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left data-[focus]:bg-slate-100"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-xs font-black text-cyan-800">
                  {airport.code}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-black text-slate-950">
                    {airport.city}
                  </span>
                  <span className="block truncate text-xs font-medium text-slate-500">
                    {airport.name}
                  </span>
                </span>
                <Check className="hidden h-4 w-4 text-cyan-700 group-data-[selected]:block" />
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

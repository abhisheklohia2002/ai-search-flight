"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown, ListFilter, Plane, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { FlightOption, FlightSearchSummary } from "@/types/chat";
import { MobileFlightCard } from "./MobileFlightCard";

interface MobileFlightResultsProps {
  flights: FlightOption[];
  search?: FlightSearchSummary;
}

export function MobileFlightResults({ flights, search }: MobileFlightResultsProps) {
  const [nonstopOnly, setNonstopOnly] = useState(false);
  const [airline, setAirline] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const airlines = useMemo(
    () => [...new Set(flights.map((flight) => flight.airline.name))].sort(),
    [flights],
  );

  const visibleFlights = useMemo(() => {
    const cap = maxPrice ? Number(maxPrice) : null;
    return flights.filter((flight) => {
      if (nonstopOnly && flight.stops !== 0) return false;
      if (airline && flight.airline.name !== airline) return false;
      if (cap !== null && flight.price.amount > cap) return false;
      return true;
    });
  }, [airline, flights, maxPrice, nonstopOnly]);

  if (!flights.length) return null;

  return (
    <section id="mobile-results" className="space-y-4" aria-labelledby="mobile-flight-results-heading">
      <div className="flex items-end justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.13em] text-cyan-700">
            <Plane className="h-3.5 w-3.5" />
            Flight results
          </div>
          <h2 id="mobile-flight-results-heading" className="mt-1 truncate text-2xl font-black tracking-tight text-slate-950">
            {search?.origin && search?.destination
              ? `${search.origin} → ${search.destination}`
              : "Best matches"}
          </h2>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {[search?.departureDate, search?.cabinClass?.replaceAll("_", " ")]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-2 text-[11px] font-extrabold text-slate-600">
          <ListFilter className="h-3.5 w-3.5" />
          {visibleFlights.length}/{flights.length}
        </div>
      </div>

      <Disclosure>
        {({ open }) => (
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <DisclosureButton className="flex min-h-12 w-full items-center justify-between px-4 text-sm font-black text-slate-800">
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                Filters
              </span>
              <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
            </DisclosureButton>
            <DisclosurePanel className="space-y-3 border-t border-slate-100 p-4">
              <label className="flex min-h-12 items-center gap-3 rounded-2xl bg-slate-50 px-4 text-sm font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={nonstopOnly}
                  onChange={(event) => setNonstopOnly(event.target.checked)}
                  className="h-4 w-4 accent-slate-950"
                />
                Direct only
              </label>
              <select
                value={airline}
                onChange={(event) => setAirline(event.target.value)}
                className="h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Filter by airline"
              >
                <option value="">All airlines</option>
                {airlines.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <label className="flex h-12 items-center gap-2 rounded-2xl bg-slate-50 px-4 text-sm font-semibold text-slate-500">
                Up to ₹
                <input
                  inputMode="numeric"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value.replace(/\D/g, ""))}
                  placeholder="Any price"
                  className="min-w-0 flex-1 bg-transparent font-bold text-slate-800 outline-none placeholder:text-slate-400"
                />
              </label>
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>

      <div className="space-y-3">
        {visibleFlights.map((flight) => (
          <div key={flight.id} className="content-auto">
            <MobileFlightCard flight={flight} />
          </div>
        ))}
      </div>

      {!visibleFlights.length && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
          No flights match these filters.
        </div>
      )}
    </section>
  );
}

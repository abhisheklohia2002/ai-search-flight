"use client";

import { SlidersHorizontal } from "lucide-react";

export interface FlightFilterState {
  nonstopOnly: boolean;
  maxPrice: string;
  airline: string;
}

interface FlightFiltersProps {
  filters: FlightFilterState;
  airlines: string[];
  onChange: (next: FlightFilterState) => void;
}

export function FlightFilters({ filters, airlines, onChange }: FlightFiltersProps) {
  return (
    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
      <label className="flex h-12 items-center gap-3 rounded-2xl bg-slate-50 px-4 text-sm font-bold text-slate-700">
        <SlidersHorizontal className="h-4 w-4 text-slate-500" />
        <input
          type="checkbox"
          checked={filters.nonstopOnly}
          onChange={(event) => onChange({ ...filters, nonstopOnly: event.target.checked })}
          className="h-4 w-4 accent-slate-950"
        />
        Direct only
      </label>

      <label className="sr-only" htmlFor="airline-filter">Airline</label>
      <select
        id="airline-filter"
        value={filters.airline}
        onChange={(event) => onChange({ ...filters, airline: event.target.value })}
        className="h-12 rounded-2xl border-0 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value="">All airlines</option>
        {airlines.map((airline) => (
          <option key={airline} value={airline}>{airline}</option>
        ))}
      </select>

      <label className="flex h-12 items-center gap-2 rounded-2xl bg-slate-50 px-4 text-sm font-semibold text-slate-500">
        Up to ₹
        <input
          inputMode="numeric"
          value={filters.maxPrice}
          onChange={(event) => onChange({ ...filters, maxPrice: event.target.value.replace(/\D/g, "") })}
          placeholder="Any price"
          className="min-w-0 flex-1 bg-transparent font-bold text-slate-800 outline-none placeholder:text-slate-400"
        />
      </label>
    </div>
  );
}

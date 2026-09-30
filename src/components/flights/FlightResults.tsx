"use client";

import { useMemo, useState } from "react";
import { ListFilter, Plane } from "lucide-react";

import type { FlightOption, FlightSearchSummary } from "@/types/chat";

import { FlightCard } from "./FlightCard";

import { FlightFilters, type FlightFilterState } from "./FlightFilters";

interface FlightResultsProps {
  flights: FlightOption[];
  search?: FlightSearchSummary;
}

const INITIAL_FILTERS: FlightFilterState = {
  nonstopOnly: false,
  maxPrice: "",
  airline: "",
};

export function FlightResults({ flights, search }: FlightResultsProps) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const airlines = useMemo(
    () => [...new Set(flights.map((flight) => flight.airline.name))].sort(),
    [flights],
  );

  const visibleFlights = useMemo(() => {
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;

    return flights.filter((flight) => {
      if (filters.nonstopOnly && flight.stops !== 0) {
        return false;
      }

      if (filters.airline && flight.airline.name !== filters.airline) {
        return false;
      }

      if (maxPrice !== null && flight.price.amount > maxPrice) {
        return false;
      }

      return true;
    });
  }, [filters, flights]);

  if (!flights.length) {
    return null;
  }

  return (
    <section
      id="results"
      className="
        scroll-mt-28
        space-y-4
      "
      aria-labelledby="flight-results-heading"
    >
      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-100
          pb-5
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-extrabold
              uppercase
              tracking-[0.14em]
              text-cyan-700
            "
          >
            <Plane className="h-4 w-4" />
            Flight results
          </div>

          <h2
            id="flight-results-heading"
            className="
              mt-2
              text-2xl
              font-black
              tracking-tight
              text-slate-950
              sm:text-3xl
            "
          >
            {search?.origin && search?.destination
              ? `${search.origin} → ${search.destination}`
              : "Best matching flights"}
          </h2>

          <div
            className="
              mt-2
              flex
              flex-wrap
              gap-x-3
              gap-y-1
              text-sm
              font-medium
              text-slate-500
            "
          >
            {search?.departureDate && <span>{search.departureDate}</span>}

            {typeof search?.adults === "number" && (
              <span>
                · {search.adults} adult
                {search.adults === 1 ? "" : "s"}
              </span>
            )}

            {search?.cabinClass && (
              <span>· {search.cabinClass.replaceAll("_", " ")}</span>
            )}
          </div>
        </div>

        <div
          className="
            inline-flex
            items-center
            gap-2
            self-start
            rounded-full
            bg-slate-100
            px-3
            py-2
            text-xs
            font-bold
            text-slate-600
            sm:self-auto
          "
        >
          <ListFilter
            className="
              h-3.5
              w-3.5
            "
          />

          {visibleFlights.length}
          {" of "}
          {flights.length}
        </div>
      </div>

      <FlightFilters
        filters={filters}
        airlines={airlines}
        onChange={setFilters}
      />
      <div
        className="
    grid
    grid-cols-1
    gap-4
    md:grid-cols-2
  "
      >
        {visibleFlights.map((flight) => (
          <div
            key={flight.id}
            className="
        content-auto
        min-w-0
      "
          >
            <FlightCard flight={flight} search={search} />
          </div>
        ))}
      </div>

      {!visibleFlights.length && (
        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-slate-300
            bg-slate-50
            p-8
            text-center
            text-sm
            font-semibold
            text-slate-500
          "
        >
          No flights match the current filters. Try clearing one of the filters
          above.
        </div>
      )}
    </section>
  );
}

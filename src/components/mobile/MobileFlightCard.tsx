import { ArrowRight, CheckCircle2, PlaneTakeoff, UsersRound } from "lucide-react";
import { formatClock, formatCurrency, formatDuration } from "@/lib/format";
import type { FlightOption } from "@/types/chat";

export function MobileFlightCard({ flight }: { flight: FlightOption }) {
  const stopLabel = flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`;

  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200">
            {flight.airline.logo ? (
              <img
                src={flight.airline.logo}
                alt={`${flight.airline.name} logo`}
                width={40}
                height={40}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <PlaneTakeoff className="h-4 w-4 text-slate-600" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-black text-slate-950">{flight.airline.name}</h3>
            <p className="text-xs font-semibold text-slate-500">{flight.flightNumber}</p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-lg font-black tracking-tight text-slate-950">
            {formatCurrency(flight.price.amount, flight.price.currency)}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">total fare</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <div>
          <p className="text-xl font-black text-slate-950">{formatClock(flight.departureTime)}</p>
          <p className="text-xs font-extrabold text-slate-500">{flight.origin}</p>
        </div>

        <div className="min-w-0 text-center">
          <p className="mb-2 text-[10px] font-bold text-slate-500">{formatDuration(flight.durationMinutes)}</p>
          <div className="flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
            <span className="h-px flex-1 border-t border-dashed border-slate-300" />
            <ArrowRight className="h-3.5 w-3.5 text-cyan-700" />
          </div>
          <p className="mt-2 text-[10px] font-extrabold text-cyan-800">{stopLabel}</p>
        </div>

        <div className="text-right">
          <p className="text-xl font-black text-slate-950">{formatClock(flight.arrivalTime)}</p>
          <p className="text-xs font-extrabold text-slate-500">{flight.destination}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3 text-[11px] font-bold">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 ${flight.refundable ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          {flight.refundable ? "Refundable" : "Non-refundable"}
        </span>
        {typeof flight.seatsLeft === "number" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1.5 text-amber-800">
            <UsersRound className="h-3.5 w-3.5" />
            {flight.seatsLeft} left
          </span>
        )}
      </div>
    </article>
  );
}

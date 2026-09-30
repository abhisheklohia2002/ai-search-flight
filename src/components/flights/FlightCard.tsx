import {
  ArrowRight,
  CheckCircle2,
  PlaneTakeoff,
  UsersRound,
} from "lucide-react";

import {
  formatClock,
  formatCurrency,
  formatDuration,
} from "@/lib/format";

import {
  buildFlightSearchUrl,
} from "@/lib/build-flight-search-url";

import type {
  FlightOption,
  FlightSearchSummary,
} from "@/types/chat";

interface FlightCardProps {
  flight: FlightOption;
  search?: FlightSearchSummary;
}

export function FlightCard({
  flight,
  search,
}: FlightCardProps) {
  const searchUrl = search
    ? buildFlightSearchUrl(search)
    : null;

  const stopLabel =
    flight.stops === 0
      ? "Direct"
      : `${flight.stops} stop${
          flight.stops > 1 ? "s" : ""
        }`;

  const content = (
    <article
      className="
        group
        cursor-pointer
        rounded-[24px]
        border
        border-slate-200
        bg-white
        p-4
        shadow-[0_6px_24px_rgba(15,23,42,0.05)]
        transition
        duration-200
        hover:-translate-y-0.5
        hover:border-cyan-300
        hover:shadow-[0_14px_36px_rgba(15,23,42,0.10)]
        sm:p-5
      "
    >
      {/* Airline + price */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              grid
              h-11
              w-11
              shrink-0
              place-items-center
              overflow-hidden
              rounded-2xl
              bg-slate-50
              ring-1
              ring-slate-200
            "
          >
            {flight.airline.logo ? (
              <img
                src={flight.airline.logo}
                alt={`${flight.airline.name} logo`}
                width={44}
                height={44}
                className="h-9 w-9 object-contain"
              />
            ) : (
              <PlaneTakeoff
                className="h-5 w-5 text-slate-600"
              />
            )}
          </div>

          <div className="min-w-0">
            <h3
              className="
                truncate
                font-extrabold
                text-slate-950
              "
            >
              {flight.airline.name}
            </h3>

            <p
              className="
                text-sm
                font-medium
                text-slate-500
              "
            >
              {flight.flightNumber}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p
            className="
              text-xl
              font-black
              tracking-tight
              text-slate-950
              sm:text-2xl
            "
          >
            {formatCurrency(
              flight.price.amount,
              flight.price.currency
            )}
          </p>

          <p
            className="
              text-[11px]
              font-semibold
              text-slate-400
            "
          >
            total fare
          </p>
        </div>
      </div>

      {/* Flight timings */}
      <div
        className="
          mt-5
          grid
          grid-cols-[auto_1fr_auto]
          items-center
          gap-3
          sm:gap-5
        "
      >
        {/* Departure */}
        <div>
          <p
            className="
              text-xl
              font-black
              text-slate-950
              sm:text-2xl
            "
          >
            {formatClock(
              flight.departureTime
            )}
          </p>

          <p
            className="
              mt-0.5
              text-sm
              font-bold
              text-slate-500
            "
          >
            {flight.origin}
          </p>
        </div>

        {/* Journey */}
        <div className="min-w-0 text-center">
          <p
            className="
              mb-2
              text-[11px]
              font-semibold
              text-slate-500
              sm:text-xs
            "
          >
            {formatDuration(
              flight.durationMinutes
            )}
          </p>

          <div className="flex items-center">
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-600
              "
            />

            <span
              className="
                h-px
                flex-1
                border-t
                border-dashed
                border-slate-300
              "
            />

            <ArrowRight
              className="
                h-4
                w-4
                text-cyan-700
              "
            />
          </div>

          <p
            className="
              mt-2
              text-[11px]
              font-bold
              text-cyan-800
              sm:text-xs
            "
          >
            {stopLabel}
          </p>
        </div>

        {/* Arrival */}
        <div className="text-right">
          <p
            className="
              text-xl
              font-black
              text-slate-950
              sm:text-2xl
            "
          >
            {formatClock(
              flight.arrivalTime
            )}
          </p>

          <p
            className="
              mt-0.5
              text-sm
              font-bold
              text-slate-500
            "
          >
            {flight.destination}
          </p>
        </div>
      </div>

      {/* Fare information */}
      <div
        className="
          mt-5
          flex
          flex-wrap
          items-center
          gap-2
          border-t
          border-slate-100
          pt-4
          text-xs
          font-semibold
        "
      >
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-3
            py-1.5
            ${
              flight.refundable
                ? "bg-emerald-50 text-emerald-800"
                : "bg-slate-100 text-slate-600"
            }
          `}
        >
          <CheckCircle2
            className="h-3.5 w-3.5"
          />

          {flight.refundable
            ? "Refundable"
            : "Non-refundable"}
        </span>

        {typeof flight.seatsLeft ===
          "number" && (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-amber-50
              px-3
              py-1.5
              text-amber-800
            "
          >
            <UsersRound
              className="h-3.5 w-3.5"
            />

            {flight.seatsLeft} seat
            {flight.seatsLeft === 1
              ? ""
              : "s"}{" "}
            left
          </span>
        )}

        {searchUrl && (
          <span
            className="
              ml-auto
              inline-flex
              items-center
              gap-1
              font-bold
              text-cyan-700
            "
          >
            View flights
            <ArrowRight
              className="h-3.5 w-3.5"
            />
          </span>
        )}
      </div>

      <div
  className="
    mt-4
    flex
    items-center
    justify-between
    gap-3
    border-t
    border-slate-100
    pt-4
  "
>
  {searchUrl ? (
    <a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        items-center
        gap-1.5
        text-sm
        font-bold
        text-slate-500
        transition
        hover:text-cyan-800
      "
    >
      View search

      <ArrowRight className="h-4 w-4" />
    </a>
  ) : (
    <span />
  )}

  {flight.reviewUrl && (
    <a
      href={flight.reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        min-h-11
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-slate-950
        px-5
        text-sm
        font-bold
        text-white
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:bg-cyan-900
        hover:shadow-md
        active:scale-[0.98]
      "
    >
      Book now

      <ArrowRight className="h-4 w-4" />
    </a>
  )}
</div>
    </article>
  );

  if (!searchUrl) {
    return content;
  }

  return (
    <a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        block
        rounded-[24px]
        outline-none
        focus-visible:ring-4
        focus-visible:ring-cyan-200
      "
      aria-label={`Open flight search from ${
        search?.origin ?? flight.origin
      } to ${
        search?.destination ??
        flight.destination
      }`}
    >
      {content}
    </a>
  );
}
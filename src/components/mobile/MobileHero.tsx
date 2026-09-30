"use client";

import Image from "next/image";
import {
  MapPinned,
  Sparkles,
} from "lucide-react";

import { MobileHeader } from "./MobileHeader";
import { MobileAirportCombobox } from "./MobileAirportCombobox";
import { MobileSearchComposer } from "./MobileSearchComposer";

interface MobileHeroProps {
  loading: boolean;
  hasConversation: boolean;
  origin: string;
  onOriginChange: (value: string) => void;
  onSubmit: (
    message: string
  ) => Promise<void> | void;
}

export function MobileHero({
  loading,
  hasConversation,
  origin,
  onOriginChange,
  onSubmit,
}: MobileHeroProps) {
  return (
    <section
      className={`
        relative
        isolate
        overflow-hidden
        bg-[#fff9f5]
        transition-[min-height]
        duration-500
        ${
          hasConversation
            ? "min-h-[280px]"
            : "min-h-[100svh]"
        }
      `}
    >
      {/* Header stays light in both states */}
      <MobileHeader variant="light" />

      {/* Same background before and after search */}
      <Image
        src="/assets/home-fare-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="
          -z-20
          object-cover
          object-[48%_top]
        "
      />

      {/* Soft overlay */}
      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-b
          from-white/5
          via-white/10
          to-white/60
        "
      />

      {/* Content */}
      <div
        className={`
          flex
          min-h-[inherit]
          flex-col
          justify-center
          px-4
          text-center
          ${
            hasConversation
              ? "pb-14 pt-24"
              : "pb-10 pt-24"
          }
        `}
      >
        {/* Badge */}
        <div
          className="
            mx-auto
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-cyan-200/80
            bg-white/75
            px-3
            py-2
            text-xs
            font-bold
            text-cyan-900
            shadow-sm
            backdrop-blur-md
          "
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Flight Search
        </div>

        {/* Heading */}
        <h1
          className={`
            mx-auto
            mt-4
            max-w-[360px]
            text-balance
            font-black
            leading-[1.03]
            tracking-[-0.045em]
            text-slate-950
            ${
              hasConversation
                ? "text-[32px]"
                : "text-[38px]"
            }
          `}
        >
          {hasConversation ? (
            "Plan, refine, and compare with Flight360"
          ) : (
            <>
              Book flights with clarity,
              <br />
              <span className="text-cyan-900">
                comfort and confidence.
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p
          className="
            mx-auto
            mt-4
            max-w-[350px]
            text-sm
            font-medium
            leading-6
            text-slate-600
          "
        >
          {hasConversation
            ? "Keep chatting naturally — Flight360 will preserve your trip context."
            : "Tell Flight360 where you want to go, when you want to travel, or what budget you have."}
        </p>

        {/* Initial search only */}
        {!hasConversation && (
          <div className="mt-7 space-y-3">
            <MobileAirportCombobox
              value={origin}
              onChange={onOriginChange}
            />

            <MobileSearchComposer
              loading={loading}
              onSubmit={onSubmit}
            />
          </div>
        )}

        {/* Helper pill */}
        {!hasConversation && (
          <div
            className="
              mx-auto
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/70
              bg-white/65
              px-3
              py-2
              text-xs
              font-semibold
              text-slate-700
              shadow-sm
              backdrop-blur-md
            "
          >
            <MapPinned className="h-3.5 w-3.5 text-cyan-800" />
            Smart routes · Flexible dates
          </div>
        )}
      </div>
    </section>
  );
}
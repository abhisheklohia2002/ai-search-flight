"use client";

import Image from "next/image";
import {
  MapPinned,
  Sparkles,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import { AISearchBar } from "./AISearchBar";
import { AirportSelector } from "./AirportSelector";

interface HeroSectionProps {
  loading: boolean;
  hasConversation: boolean;
  origin: string;
  onOriginChange: (value: string) => void;
  onSubmit: (
    message: string
  ) => Promise<void> | void;
}

export function HeroSection({
  loading,
  hasConversation,
  origin,
  onOriginChange,
  onSubmit,
}: HeroSectionProps) {
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
            ? "min-h-[350px] sm:min-h-[390px]"
            : "min-h-[100svh]"
        }
      `}
    >
      {/* Header stays light in both states */}
      <Header variant="light" />

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
          md:object-top
        "
      />

      {/* Soft overlay for text readability */}
      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-b
          from-white/5
          via-white/10
          to-white/55
        "
      />

      {/* Hero content */}
      <div
        className={`
          mx-auto
          flex
          min-h-[inherit]
          w-full
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-4
          text-center
          sm:px-6
          lg:px-8
          ${
            hasConversation
              ? "pb-20 pt-28"
              : "pb-16 pt-24 sm:pt-28"
          }
        `}
      >
        {/* AI badge */}
        <div
          className="
            mb-4
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-cyan-200/80
            bg-white/75
            px-4
            py-2
            text-sm
            font-semibold
            text-cyan-900
            shadow-sm
            backdrop-blur-md
          "
        >
          <Sparkles className="h-4 w-4" />
          AI Flight Search
        </div>

        {/* Heading */}
        <h1
          className={`
            max-w-5xl
            text-balance
            font-black
            tracking-[-0.045em]
            text-slate-950
            ${
              hasConversation
                ? "text-3xl sm:text-5xl"
                : "text-[42px] leading-[1.02] sm:text-6xl lg:text-7xl"
            }
          `}
        >
          {hasConversation ? (
            "Plan, refine, and compare with Flight360"
          ) : (
            <>
              Book flights with clarity,
              <br className="hidden sm:block" />
              <span className="text-cyan-900">
                comfort and confidence.
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-5
            max-w-2xl
            text-balance
            text-sm
            font-medium
            leading-7
            text-slate-600
            sm:text-base
            md:text-lg
          "
        >
          {hasConversation
            ? "Keep chatting naturally — Flight360 will preserve your trip context."
            : "Tell Flight360 where you want to go, when you want to travel, or simply describe your trip."}
        </p>

        {/* Initial search only */}
        {!hasConversation && (
          <div
            className="
              mt-8
              flex
              w-full
              flex-col
              items-center
              gap-4
              sm:mt-10
            "
          >
            <AirportSelector
              value={origin}
              onChange={onOriginChange}
            />

            <AISearchBar
              loading={loading}
              onSubmit={onSubmit}
            />
          </div>
        )}

        {/* Initial helper pill */}
        {!hasConversation && (
          <div
            className="
              mt-9
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/70
              bg-white/65
              px-4
              py-2
              text-xs
              font-bold
              text-slate-700
              shadow-sm
              backdrop-blur-md
              sm:mt-12
              sm:text-sm
            "
          >
            <MapPinned className="h-4 w-4 text-cyan-800" />
            Smart routes · Flexible dates · Natural language
          </div>
        )}
      </div>
    </section>
  );
}
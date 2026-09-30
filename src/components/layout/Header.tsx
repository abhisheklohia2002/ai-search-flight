"use client";

import Image from "next/image";
import {
  CircleHelp,
  Heart,
  Menu,
  UserRound,
} from "lucide-react";

interface HeaderProps {
  variant?: "light" | "dark";
}

export function Header({
  variant = "dark",
}: HeaderProps) {
  const isLight =
    variant === "light";

  return (
    <header
      className="
        absolute
        inset-x-0
        top-0
        z-30
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-full
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Flight360 logo */}
        <a
          href="#"
          className="
            flex
            items-center
            rounded-xl
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-cyan-500
          "
          aria-label="Flight360 home"
        >
          <Image
            src="/assets/flight360-logo.svg"
            alt="Flight360"
            width={180}
            height={48}
            priority
            className="
              h-9
              w-auto
              object-contain
              sm:h-10
            "
          />
        </a>

        {/* Desktop navigation */}
        <nav
          className={`
            hidden
            items-center
            gap-1
            text-sm
            font-semibold
            md:flex

            ${
              isLight
                ? "text-slate-800"
                : "text-white"
            }
          `}
          aria-label="Primary navigation"
        >
          <a
            href="#results"
            className={`
              rounded-xl
              px-4
              py-3
              transition

              ${
                isLight
                  ? "hover:bg-white/60"
                  : "hover:bg-white/10"
              }
            `}
          >
            Explore
          </a>

          <a
            href="#help"
            className={`
              flex
              items-center
              gap-2
              rounded-xl
              px-4
              py-3
              transition

              ${
                isLight
                  ? "hover:bg-white/60"
                  : "hover:bg-white/10"
              }
            `}
          >
            <CircleHelp
              className="h-4 w-4"
              aria-hidden="true"
            />

            Help
          </a>

          <button
            type="button"
            className={`
              rounded-xl
              px-4
              py-3
              transition

              ${
                isLight
                  ? "hover:bg-white/60"
                  : "hover:bg-white/10"
              }
            `}
          >
            India · INR
          </button>

          <button
            type="button"
            aria-label="Saved trips"
            className={`
              grid
              h-11
              w-11
              place-items-center
              rounded-xl
              transition

              ${
                isLight
                  ? "hover:bg-white/60"
                  : "hover:bg-white/10"
              }
            `}
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* Login */}
          <button
            type="button"
            className={`
              ml-2
              flex
              h-11
              items-center
              gap-2
              rounded-xl
              px-5
              font-bold
              shadow-md
              transition

              ${
                isLight
                  ? `
                    bg-slate-950
                    text-white
                    hover:bg-slate-800
                  `
                  : `
                    bg-white
                    text-slate-950
                    hover:bg-slate-100
                  `
              }
            `}
          >
            <UserRound className="h-4 w-4" />

            Log in
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Open navigation"
          className={`
            grid
            h-11
            w-11
            place-items-center
            rounded-xl
            backdrop-blur-md
            md:hidden

            ${
              isLight
                ? `
                  bg-white/70
                  text-slate-900
                  ring-1
                  ring-slate-200
                `
                : `
                  bg-white/[0.12]
                  text-white
                  ring-1
                  ring-white/20
                `
            }
          `}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
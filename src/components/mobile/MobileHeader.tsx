"use client";

import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import {
  CircleHelp,
  Menu,
  UserRound,
  X,
} from "lucide-react";

import { useState } from "react";

interface MobileHeaderProps {
  variant?: "light" | "dark";
}

export function MobileHeader({
  variant = "dark",
}: MobileHeaderProps) {
  const [open, setOpen] =
    useState(false);

  const isLight =
    variant === "light";

  return (
    <>
      <header
        className="
          absolute
          inset-x-0
          top-0
          z-40
          px-4
          pt-[max(1rem,env(safe-area-inset-top))]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          {/* Flight360 Logo */}
          <a
            href="#"
            aria-label="Flight360 home"
            className="
              rounded-2xl
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-500
            "
          >
            <div
              className={`
                rounded-2xl
                px-2.5
                py-2
                backdrop-blur-md
                transition

                ${
                  isLight
                    ? `
                      bg-white/75
                      shadow-sm
                      ring-1
                      ring-white/70
                    `
                    : `
                      bg-white/90
                      shadow-md
                      ring-1
                      ring-white/40
                    `
                }
              `}
            >
              <Image
                src="/assets/flight360-logo.svg"
                alt="Flight360"
                width={150}
                height={40}
                priority
                className="
                  h-8
                  w-auto
                  object-contain
                "
              />
            </div>
          </a>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() =>
              setOpen(true)
            }
            aria-label="Open menu"
            className={`
              grid
              h-11
              w-11
              place-items-center
              rounded-2xl
              backdrop-blur-md
              transition
              active:scale-95

              ${
                isLight
                  ? `
                    bg-white/75
                    text-slate-900
                    shadow-sm
                    ring-1
                    ring-slate-200/80
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

      {/* Mobile Drawer */}
      <Dialog
        open={open}
        onClose={setOpen}
        className="
          relative
          z-[80]
          md:hidden
        "
      >
        {/* Overlay */}
        <div
          className="
            fixed
            inset-0
            bg-slate-950/55
            backdrop-blur-sm
          "
          aria-hidden="true"
        />

        <div
          className="
            fixed
            inset-0
            flex
            justify-end
          "
        >
          <DialogPanel
            className="
              h-full
              w-[86%]
              max-w-sm
              overflow-y-auto
              bg-white
              p-5
              shadow-2xl
            "
          >
            {/* Drawer Header */}
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <DialogTitle
                className="
                  flex
                  items-center
                "
              >
                <Image
                  src="/assets/flight360-logo.svg"
                  alt="Flight360"
                  width={145}
                  height={40}
                  className="
                    h-8
                    w-auto
                    object-contain
                  "
                />
              </DialogTitle>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                aria-label="Close menu"
                className="
                  grid
                  h-11
                  w-11
                  place-items-center
                  rounded-2xl
                  bg-slate-100
                  text-slate-700
                  transition
                  hover:bg-slate-200
                  active:scale-95
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav
              className="
                mt-8
                space-y-2
              "
              aria-label="Mobile navigation"
            >
              <a
                href="#mobile-results"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  flex
                  min-h-12
                  items-center
                  rounded-2xl
                  px-4
                  font-bold
                  text-slate-800
                  transition
                  hover:bg-slate-100
                "
              >
                Explore flights
              </a>

              <a
                href="#mobile-help"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  flex
                  min-h-12
                  items-center
                  gap-3
                  rounded-2xl
                  px-4
                  font-bold
                  text-slate-800
                  transition
                  hover:bg-slate-100
                "
              >
                <CircleHelp
                  className="h-5 w-5"
                />

                Help
              </a>

              <button
                type="button"
                className="
                  flex
                  min-h-12
                  w-full
                  items-center
                  rounded-2xl
                  px-4
                  text-left
                  font-bold
                  text-slate-800
                  transition
                  hover:bg-slate-100
                "
              >
                India · INR
              </button>

              <button
                type="button"
                className="
                  mt-4
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-slate-950
                  px-4
                  font-bold
                  text-white
                  transition
                  hover:bg-slate-800
                  active:scale-[0.99]
                "
              >
                <UserRound
                  className="h-4 w-4"
                />

                Log in
              </button>
            </nav>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
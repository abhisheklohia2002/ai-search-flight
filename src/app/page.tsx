"use client";

import { useEffect, useRef, useState } from "react";
import { DesktopExperience } from "@/components/desktop/DesktopExperience";
import { MobileExperience } from "@/components/mobile/MobileExperience";
import { useFlightChat } from "@/hooks/useFlightChat";

export default function HomePage() {
  const [origin, setOrigin] = useState("DEL");
  const chat = useFlightChat();
  const hasScrolledToWorkspace = useRef(false);

  useEffect(() => {
    if (!chat.hasConversation) {
      hasScrolledToWorkspace.current = false;
      return;
    }

    if (!hasScrolledToWorkspace.current) {
      hasScrolledToWorkspace.current = true;
      window.requestAnimationFrame(() => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const workspaceId = isMobile
          ? "mobile-flight-workspace"
          : "desktop-flight-workspace";

        document
          .getElementById(workspaceId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [chat.hasConversation]);

  const sharedProps = {
    loading: chat.loading,
    hasConversation: chat.hasConversation,
    messages: chat.messages,
    flights: chat.flights,
    calendarFares: chat.calendarFares,
    search: chat.search,
    error: chat.error,
    origin,
    onOriginChange: setOrigin,
    onSubmit: chat.submit,
    onRetry: chat.retry,
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <MobileExperience {...sharedProps} />
      <DesktopExperience {...sharedProps} />
    </main>
  );
}

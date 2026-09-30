"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sendChatMessage } from "@/lib/api/chat";
import { getOrCreateSessionId } from "@/lib/session";
import type {
  CalendarFareResult,
  ChatMessageItem,
  ChatResponse,
  FlightOption,
  FlightSearchSummary,
} from "@/types/chat";

function makeMessageId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useFlightChat() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [flights, setFlights] = useState<FlightOption[]>([]);
  const [calendarFares, setCalendarFares] = useState<CalendarFareResult[]>([]);
  const [search, setSearch] = useState<FlightSearchSummary | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState("");
  const activeController = useRef<AbortController | null>(null);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
    return () => activeController.current?.abort();
  }, []);

  const applyResponse = useCallback((response: ChatResponse) => {
    const assistantMessage: ChatMessageItem = {
      id: makeMessageId("assistant"),
      role: "assistant",
      content: response.message,
      type: response.type,
    };

    setMessages((current) => [...current, assistantMessage]);

    if (response.type === "FLIGHT_RESULTS") {
      setFlights(response.data?.flights ?? []);
      setSearch(response.data?.search);
      setCalendarFares([]);
    }

    if (response.type === "CALENDAR_RESULTS") {
      setCalendarFares(response.data?.calendarFares ?? []);
      setFlights([]);
    }

    if (response.type === "ERROR") {
      setError(response.message);
    }
  }, []);

  const submit = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim();
      if (!message || loading) {
        return;
      }

      const currentSession = sessionId || getOrCreateSessionId();
      if (!sessionId) {
        setSessionId(currentSession);
      }

      setLastQuery(message);
      setError(null);
      setLoading(true);

      setMessages((current) => [
        ...current,
        {
          id: makeMessageId("user"),
          role: "user",
          content: message,
        },
      ]);

      activeController.current?.abort();
      const controller = new AbortController();
      activeController.current = controller;

      try {
        const response = await sendChatMessage(
          {
            sessionId: currentSession,
            message,
          },
          controller.signal,
        );
        applyResponse(response);
      } catch (caught) {
        if (controller.signal.aborted) {
          return;
        }

        const messageText =
          caught instanceof Error
            ? caught.message
            : "I couldn't retrieve flights right now. Please try again.";

        setError(messageText);
        setMessages((current) => [
          ...current,
          {
            id: makeMessageId("assistant"),
            role: "assistant",
            content: messageText,
            type: "ERROR",
          },
        ]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [applyResponse, loading, sessionId],
  );

  const retry = useCallback(() => {
    if (lastQuery) {
      void submit(lastQuery);
    }
  }, [lastQuery, submit]);

  return {
    sessionId,
    messages,
    flights,
    calendarFares,
    search,
    loading,
    error,
    hasConversation: messages.length > 0,
    submit,
    retry,
  };
}

import type { ChatRequest, ChatResponse } from "@/types/chat";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:5000";

export async function sendChatMessage(
  payload: ChatRequest,
  signal?: AbortSignal,
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  const data = (await response.json().catch(() => null)) as ChatResponse | null;

  if (!response.ok) {
    throw new Error(data?.message ?? `Request failed with status ${response.status}`);
  }

  if (!data) {
    throw new Error("The server returned an empty response.");
  }

  return data;
}

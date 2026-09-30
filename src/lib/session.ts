const SESSION_KEY = "flight360-session-id";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }

  const next = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_KEY, next);
  return next;
}

import { v4 as uuidv4 } from "uuid";

const SESSION_KEY = "flight360-session-id";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const existingSessionId =
    sessionStorage.getItem(SESSION_KEY);

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = uuidv4();

  sessionStorage.setItem(
    SESSION_KEY,
    newSessionId
  );

  return newSessionId;
}
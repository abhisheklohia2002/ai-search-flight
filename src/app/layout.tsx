import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flight360 — AI Flight Search",
  description: "Search and compare flights with a conversational AI assistant.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

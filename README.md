# Flight360 Frontend — Headless UI + Dedicated Mobile View

This version keeps the existing desktop experience and adds a dedicated mobile UI under `src/components/mobile/`. At widths below `768px`, only the mobile experience is visible. At `md` and above, only the desktop experience is visible.

## Stack

- Next.js 15 + App Router
- React 19 + TypeScript
- Tailwind CSS
- Headless UI (`@headlessui/react`)
- Lucide React

## Responsive split

```text
src/components/
├── desktop/
│   └── DesktopExperience.tsx
└── mobile/
    ├── MobileExperience.tsx
    ├── MobileHeader.tsx
    ├── MobileHero.tsx
    ├── MobileAirportCombobox.tsx
    ├── MobileSearchComposer.tsx
    ├── MobileSearchWorkspace.tsx
    ├── MobileConversation.tsx
    ├── MobileFlightResults.tsx
    ├── MobileFlightCard.tsx
    ├── MobileCalendarFareResults.tsx
    └── mobile-data.ts
```

`src/app/page.tsx` owns the single `useFlightChat()` state and passes the same backend/chat state to both layouts. Tailwind controls which layout is visible:

- mobile: `md:hidden`
- desktop: `hidden md:block`

This avoids separate sessions or duplicated chat state when resizing.

## Headless UI usage

- `Dialog` for the mobile navigation drawer
- `Combobox` for airport selection on desktop and mobile
- `Disclosure` for mobile flight filters

## Sticky ChatGPT-style mobile input

The mobile composer is fixed at the bottom. The results workspace includes bottom padding using `env(safe-area-inset-bottom)` so the final flight card always scrolls above the composer on iPhones and Android devices.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

`.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Backend endpoint expected:

```http
POST /api/chat
```

## Build check

```bash
npm run build
```

## Mobile sizes to verify

- 320px
- 375px
- 390px
- 430px
- 768px boundary

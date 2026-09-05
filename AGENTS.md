<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Forest Hills Garden (FHG) — Project Guidelines

## Overview
Enterprise landscape architecture & commercial contracting platform for Forest Hills Garden.
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Runtime / UI**: React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), Framer Motion, Lenis Smooth Scroll
- **Icons**: Lucide React

## Development Commands
- `npm run dev` — Start Next.js development server
- `npm run build` — Build production bundle (`next build`)
- `npm run lint` — Run ESLint check
- `python scripts/make_favicons.py` — Generate favicons and web badges from `public/images/logo.png`

## Architecture & Conventions
- `src/app/` — Route handlers, metadata, error/loading boundaries (`loading.tsx` per route)
- `src/components/` — Shared UI components
  - `profile/` — Split sub-components for Company Profile Hub
  - `rfp/` — RFP calculation logic, recommendation engine, and dispatch modals
- `src/data/` — Static data stores and unified schemas (`documents.ts`, etc.)
- `src/hooks/` — Custom React hooks:
  - `useLenisScrollLock` — Safely halts Lenis smooth scroll without altering `overflow` destructively
  - `useActiveSection` — Tracks viewport intersection for navigation tabs
- `public/` — Static assets (production logo at `public/images/logo.png`, document PDF downloads)

## Rules & Standards
1. **No `any` types**: Always declare explicit TypeScript types or interfaces.
2. **Modal & Drawer Scrolling**: Always use `useLenisScrollLock(isOpen)` to lock/unlock Lenis smooth scroll.
3. **Next.js Images**: Always supply descriptive `alt` and responsive `sizes` props (e.g. `sizes="100vw"`, `sizes="(max-width: 768px) 100vw, 50vw"`).
4. **SVG Collision**: Generate unique SVG pattern IDs with React `useId()` to prevent cross-DOM pattern collisions.
5. **Route Loading**: Every subroute directory (`/services`, `/projects`, `/nurseries`, `/contact`) must maintain a matching `loading.tsx` boundary.


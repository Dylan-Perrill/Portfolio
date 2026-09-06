import { img } from "./images";
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "entreprenewer",
    number: "01",
    title: "entrepreNewer",
    year: "2026",
    pitch: "A living journal for business ideas — AI scores each one, then keeps re-scoring as the news changes.",
    description: [
      "entrepreNewer is a notebook for half-formed business ideas that refuses to let them go stale. You capture an idea by voice or text; the AI distills it into a card, fleshes it out, and scores it 0–100 with sources. From then on the system watches the news, links relevant articles back to your active cards, and recomputes the score as the world changes. Every score is written to a history table, so an idea's standing is a trend you can watch, not a one-time verdict.",
      "I built it end to end: the Fastify API, the Prisma schema on Postgres + pgvector, the Expo app that runs on iOS, Android and the web from one codebase, and the production setup that serves it. The web app is a static export on Vercel; the API runs on a Raspberry Pi 5 in my room, published through a Cloudflare Tunnel, with deploys driven by a GitHub Actions runner that lives on the Pi.",
    ],
    stack: [
      "TypeScript",
      "Fastify 5",
      "Postgres + pgvector (Supabase)",
      "Raspberry Pi 5",
      "Cloudflare Tunnel",
      "Prisma 6",
      "Expo / React Native",
      "GitHub Actions",
    ],
    links: { live: "https://neurship.dev", sourceNote: "Source on request" },
    images: {
      hero: img(
        "work/entreprenewer/landing.webp",
        "entrepreNewer landing page — the headline “Turn scattered ideas into a ranked, actionable portfolio” beside a phone showing scored idea cards",
      ),
      gallery: [
        img("work/entreprenewer/features.webp", "The features section of the entrepreNewer landing page"),
        img("work/entreprenewer/landing-mobile.webp", "The entrepreNewer landing page on a phone"),
      ],
    },
    architecture: [
      "Monorepo: apps/server (Fastify 5 + Prisma 6), apps/app (Expo SDK 56 with Expo Router), packages/shared (the typed API client the app uses).",
      "Auth is Supabase. The API verifies each JWT locally against the project's JWKS (ES256 via jose) — no round-trip to Supabase per request — and provisions the user row the first time it sees a new subject.",
      "Semantic matching uses OpenAI text-embedding-3-small vectors in pgvector with HNSW cosine indexes; Claude Sonnet handles coaching and scoring, Haiku handles nudges.",
      "News ingestion sits behind a NewsSource interface: keyless RSS by default (curated feeds plus Google News queries derived from each card's sector and tags), NewsData.io optional.",
      "Production: Expo web static export → Vercel. API → Raspberry Pi 5 behind a Cloudflare Tunnel. A push to main runs tests, build, prisma migrate deploy, restart and a health poll on the Pi's self-hosted runner; a failed step leaves the previous build running.",
    ],
    highlights: [
      "Persistence is the product: every AI score lands in a history table and the matching loop re-runs on a schedule, so a score is a trend rather than a snapshot.",
      "Hardened for a public API: explicit CORS allowlist, 100 requests/min per IP globally with a stricter 10/min bucket on AI routes, job endpoints gated by a token, and dev-only auth seams hard-disabled in production.",
      "Diagnosed intermittent 530s on the live API down to campus Wi-Fi silently dropping UDP — cloudflared's QUIC transport and Tailscale's WireGuard died at the same instant — and fixed it by pinning the tunnel to HTTP/2 over TCP.",
      "Prisma can't run migrations against Supabase's managed extensions, so the schema evolves through diff-generated SQL migrations reviewed by hand; the vector indexes Prisma can't express live in their own SQL file.",
      "143 commits over three months, with the specs, plans and ops runbooks in the repo next to the code.",
    ],
    next: [
      "Turn on Google sign-in — the client code exists; the provider isn't enabled yet.",
      "Move scheduling from node-cron to a queue so re-scoring survives restarts.",
      "Push notifications — email digests ship today; push is stubbed behind a flag.",
    ],
  },
  {
    slug: "disc-mayhem",
    number: "02",
    title: "Disc Mayhem",
    year: "2026",
    pitch: "Cartoon 3D disc golf with real flick throws, a procedural 18-hole course, and 8-player online rounds.",
    description: [
      "Disc Mayhem is a browser game: hold the mouse, flick, and the disc flies. Flick speed is power, and a curved flick bends the shot — hyzer or anhyzer — the way a real disc does. Every hole of the 18-hole course is generated from a seed, so a daily seed means everyone plays the same course that day. Rounds are simultaneous race golf: lowest strokes wins, and ties go to the clock.",
      "Power discs keep it from being a simulator. A Blade flies flat and fast and “poofs” any opponent it hits — they respawn at their lie with a penalty stroke. A Bomb flattens nearby trees for twelve seconds to open new sightlines. Up to eight players share a room with a four-letter code; it also runs as a desktop app through Electron, and on a phone with one-finger flicks and pinch zoom.",
    ],
    stack: ["JavaScript (ES modules, no build step)", "Three.js", "WebSocket (ws)", "Node", "Electron"],
    links: { source: "https://github.com/Dylan-Perrill/disc-mayhem-" },
    images: {
      hero: img(
        "work/disc-mayhem/final.webp",
        "Hole 1 from the tee: a low-poly fairway rolls toward a basket between cartoon trees; the HUD shows par, strokes, wind and the disc selector",
      ),
      gallery: [
        img("work/disc-mayhem/hole.webp", "Hole 4, par 5, 180 m: the golfer stands on a sand tee pad in a clearing, with the course seed shown in the corner"),
        img("work/disc-mayhem/bomb.webp", "After a Bomb throw: flattened tree canopies lie on the fairway, opening a sightline to the basket"),
        img("work/disc-mayhem/lobby.webp", "The game lobby: enter a name, play solo, host a room, or join with a four-letter code"),
      ],
    },
    architecture: [
      "Plain ES modules with an import map — no bundler, no TypeScript, no asset files. Every tree, character, disc and particle is procedural geometry with toon materials.",
      "Disc flight uses real disc-golf flight numbers (speed, glide, turn, fade) per disc type; wind is rolled per hole; water and trees are collision checks against the generated course.",
      "shared/ holds the seeded RNG, constants and wire protocol with zero imports, so the same files load in the browser and in Node. The server is a static file server plus WebSocket rooms that relay validated messages.",
      "The game loop, HUD, scorecard, lobby and menus are vanilla DOM; the Electron wrapper is the path to a Steam build.",
    ],
    highlights: [
      "Flick-to-throw maps a 2D mouse gesture to a 3D launch vector with spin, tuned until a hyzer flick fades the way a real driver does.",
      "Deterministic course generation from a 32-bit seed: the daily course is reproduced on every client without sending geometry over the wire.",
      "Networked rounds with host authority — the relay validates message shapes and room state, so a misbehaving client can't corrupt a round.",
      "Touch controls were added without forking the input code: one gesture model serves mouse and finger.",
      "51 commits, physics first, then course generation, netcode and polish — each module's contract was written in DESIGN.md before its code.",
    ],
    next: [
      "Host the relay on a small VPS so public lobbies work anywhere.",
      "Package with electron-builder and integrate Steamworks for achievements.",
      "Practice bots exist; teach them to use power discs.",
    ],
  },
  {
    slug: "meridian",
    number: "03",
    title: "Meridian",
    year: "2026",
    pitch: "A personal-finance app in the Rocket Money mold: Plaid-linked accounts, budgets, net worth, and an AI advisor that only advises.",
    description: [
      "Meridian pulls accounts, transactions, balances, liabilities and investment holdings through Plaid and turns them into one calm view: net worth over time, spending by category, budgets with live spend, recurring charges and subscriptions, credit health, and portfolio performance. An AI advisor layered on top writes spending and portfolio reviews. It recommends — and by design has no path to place a trade.",
      "It started as a backend — 25 JSON endpoints behind Supabase Auth with Row-Level Security, so a request can only ever touch its own rows — and grew a full UI with a sample-data mode, so anyone can explore the product without linking a bank.",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Supabase (Auth, Postgres, RLS)",
      "Plaid",
      "Vercel AI SDK + Anthropic",
      "Upstash Redis",
    ],
    links: { live: "https://finance-app-flax-five.vercel.app", sourceNote: "Source on request" },
    images: {
      hero: img(
        "work/meridian/overview.webp",
        "Meridian overview: net worth of $128,402 with a six-month chart, linked accounts, spending by category, budgets and an AI spending review",
      ),
      gallery: [
        img("work/meridian/transactions.webp", "The Meridian transactions list with category filters and search"),
        img("work/meridian/overview-mobile.webp", "The Meridian overview on a phone with a bottom tab bar"),
      ],
    },
    architecture: [
      "Next.js 16 App Router with API routes. Every user route resolves the Supabase access token to a user-scoped client, so Postgres RLS enforces isolation instead of application code.",
      "Plaid access tokens are encrypted at rest with AES-256-GCM and never returned to the client. Sync, cron and webhook paths use a service-role client filtered by an explicit user id.",
      "Per-user rate limiting on the Plaid and AI routes through Upstash; a daily cron refreshes data and snapshots net worth for the history chart.",
      "The AI advisor reuses a research → structured-output engine: it gathers the user's data, reasons over it, and returns typed insights the UI renders as cards.",
    ],
    highlights: [
      "Security decisions are structural: RLS for isolation, encryption for bank tokens, verified Plaid webhooks, and an advisor that cannot execute anything.",
      "Sample-data mode renders the entire product — overview, transactions, budgets, recurring, investments — with realistic fixtures, which made it demoable and testable without a live bank link.",
      "Adapters, formatters, pricing and webhook guards are covered by unit tests that run with no network.",
      "Responsive down to a phone, including a bottom tab bar for the main sections.",
    ],
    next: [
      "A real credit-bureau provider — Plaid's standard products don't return a FICO score, so credit health is derived from utilization and payment history today.",
      "Cancellation flows for recurring charges beyond marking a subscription cancelled.",
    ],
  },
  {
    slug: "sora-2-tool",
    number: "04",
    title: "Sora 2 Tool",
    year: "2025",
    pitch: "A front end for OpenAI's Sora 2 video API that tracks every job to completion and keeps the results.",
    description: [
      "Sora 2 Tool takes a prompt, an optional starting image, a model, a resolution and a duration, launches a video-generation job against OpenAI's Sora 2 API, and then does the unglamorous part: it polls the job, reconciles its status into Supabase, downloads the finished MP4 into a storage bucket under a deterministic name, and plays it back in a history view that survives reloads.",
      "A second screen is an operator console — a four-step test suite (OpenAI connectivity, Supabase connectivity, schema validation, a minimal smoke generation) with a timestamped log you can paste into a bug report. Your API key never leaves the browser: it lives in localStorage and requests go straight from your machine to OpenAI.",
    ],
    stack: ["TypeScript", "React 18", "Vite", "Tailwind CSS", "Supabase (Postgres, Storage)", "OpenAI Sora 2 API"],
    links: { live: "https://sora2-tool-pi.vercel.app", source: "https://github.com/Dylan-Perrill/Sora2_Tool" },
    images: {
      hero: img(
        "work/sora-2-tool/generator.webp",
        "The Sora 2 generator: a prompt field, example chips, an optional starting-image upload, and model, resolution and duration selectors",
      ),
      gallery: [
        img("work/sora-2-tool/test-console.webp", "The operator test console: a four-step test suite for API, database, schema and generation, beside an empty debug log panel"),
        img("work/sora-2-tool/generator-mobile.webp", "The Sora 2 generator on a phone"),
      ],
    },
    architecture: [
      "Vite + React + TypeScript single-page app with Tailwind. VideoService orchestrates Supabase records and the SoraAPI wrapper; a background poll flips pending jobs to completed or failed without user action.",
      "Supabase migrations define the video_generations table, its triggers and indexes, plus the video_files and image_files storage buckets.",
      "Starting images are uploaded to storage first and the public URL is persisted with the job, so image-to-video runs are reproducible.",
    ],
    highlights: [
      "Status reconciliation is idempotent: re-checking a job updates metadata and uploads the MP4 once, under a name derived from the job id.",
      "The test console turned debugging from guesswork into a checklist — it's how the image-to-video failure path was isolated.",
      "Deployed on Vercel with only Supabase environment variables; the OpenAI key is supplied per browser by the user.",
    ],
    next: [
      "Per-user rows and locked-down storage policies before it's more than a single-user tool.",
      "Automatic cleanup of MP4s and images when a generation is deleted.",
    ],
  },
];

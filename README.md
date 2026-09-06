# dylanperrill.com

Dylan Perrill's portfolio — a recruiter-first site with four case studies. Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Deployed on Vercel; `main` is production.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # next typegen + tsc
npm run lint
npm test             # Vitest unit tests (also runs before every build)
npm run build && npm run test:e2e   # Playwright smoke tests against `next start` on :3100
```

`prebuild` runs Vitest, so the build needs devDependencies installed — that is Vercel's default; do not set `NPM_CONFIG_PRODUCTION`.

## How content works

All copy lives in `content/`, not in components:

- `content/site.ts` — name, headline, email, links, the health endpoint for the status line.
- `content/projects.ts` — the featured projects, in order. Each has a slug, pitch, description, stack, links, images, architecture, highlights and next steps.
- `content/about.ts`, `content/mountain.ts` — the About page and the easter egg.
- `content/image-manifest.json` — generated dimensions for every image; never edit by hand.

`lib/validate-content.ts` checks the projects (unique slugs, https links, every image exists, alt text describes the screen, ≥3 highlights). It runs in `npm test`, which runs as `prebuild`, so invalid content fails the build.

### Adding a project

1. Capture screens: add targets to `scripts/capture.mjs`, run `npm run capture` (PNGs land in `.capture/`, gitignored). Not everything can be crawled — the four Disc Mayhem frames were captured by hand from the running game and have no `capture.mjs` target, so their PNGs only exist on the machine that made them.
2. `npm run optimize` — converts whatever is in `.capture/` to `public/work/<slug>/*.webp`, then rebuilds the manifest from the committed images (never from `.capture/`). Safe to run at any time, on any clone: with no captures it just re-reads what is already in `public/`, and the output is byte-identical.
3. Append an object to `content/projects.ts` with the next number. Use `img("work/<slug>/<name>.webp", "what the screen shows")`.
4. `npm test` — the validator tells you what's missing.

`npm run optimize:gallery` additionally re-encodes `public/gallery/*.jpg` in place, and only when a photo's long edge is still over 1600px. It is opt-in because re-encoding an already-sized JPEG costs generation loss for nothing.

### Headshot

Drop `public/about/headshot.jpg` (portrait, ~1200×1500) in place and the About page uses it; until then a monogram renders.

## Status line

The homepage fetches `https://api.neurship.dev/health` server-side (3 s timeout, revalidated every 5 minutes) and shows "api.neurship.dev · online" only on `{"status":"ok"}`. Any failure renders nothing.

## Design

Swiss: white, black, one blue, Archivo throughout. Tokens are in `app/globals.css` under `@theme`. Spec: `docs/superpowers/specs/2026-09-05-portfolio-redesign-design.md`.

# Portfolio redesign — design spec

**Date:** 2026-09-05
**Site:** https://www.dylanperrill.com (repo `Dylan-Perrill/Portfolio`, deployed on Vercel)
**Status:** approved in brainstorming; awaiting implementation plan

## 1. Purpose and success criteria

The site's one job is to **land interviews** for new-grad software engineering roles
(Dylan graduates May 2027). A recruiter should, in 30 seconds without clicking:

1. read who Dylan is and what he builds (headline + one line),
2. see proof — real screenshots of shipped work — above the fold,
3. find the résumé, GitHub, LinkedIn, and email.

Depth (case studies) exists for the reader who clicks through.

**Positioning:** *full-stack + AI builder who also runs the infrastructure.*
Headline: `BUILDS AI PRODUCTS. RUNS THEM TOO.`

**Non-goals:** freelance/client positioning, a blog, a contact form, dark mode,
CMS integration, analytics beyond what Vercel provides by default.

## 2. Content

### 2.1 Featured projects (in order)

Only projects Dylan can discuss in depth in an interview are included.

| # | Project | Live | Source | Notes |
|---|---|---|---|---|
| 01 | **entrepreNewer** | https://neurship.dev | private → "Source on request" | Flagship. AI "living journal" for business ideas; Fastify 5 + Prisma + Supabase (Postgres + pgvector); Expo universal app; API self-hosted on a Raspberry Pi 5 behind a Cloudflare Tunnel with a GitHub Actions runner on the Pi. |
| 02 | **Disc Mayhem** | — | https://github.com/Dylan-Perrill/disc-mayhem- | Three.js cartoon disc golf: mouse-flick physics, procedural 18-hole course, 8-player online multiplayer over WebSocket, Electron build, touch controls. Also a Unity 6 port in progress (mention, don't feature). |
| 03 | **Meridian** | https://finance-app-flax-five.vercel.app | private → "Source on request" | Personal-finance app: Plaid aggregation, Supabase Auth + RLS, AI advisor (insights only, never trades), Upstash rate limiting. Next.js 16. |
| 04 | **Sora 2 Tool** | https://sora2-tool-pi.vercel.app | https://github.com/Dylan-Perrill/Sora2_Tool | Vite + React app orchestrating OpenAI Sora 2 video jobs with state persisted in Supabase; includes an operator test console. |

**Credential (not a project card):** Sterns Bank Hackathon, CSB/SJU — 1st place,
April 2024 (accessibility features + AI support assistant).

Source visibility is Dylan's decision; the content model supports `live`, `source`,
or `sourceNote` per project, so flipping a repo public later is a one-line change.
All four private repos were audited for committed secrets on 2026-09-05 and are
clean; entrepreNewer stays private because its tracked docs describe production
infrastructure in detail.

### 2.2 Explicitly excluded

AI Portfolio Showdown, Wood Engraving Configurator, AI Generation Studio, TripWeave,
Fifth Fleet, Chokepoint, nightstand, TravelTripApp, all coursework and work (WAND)
repos. Reason: Dylan does not remember them well enough to defend in an interview,
or they were never finished. Not a quality judgment; do not resurface them.

### 2.3 About page content

- Bio, three short paragraphs: who / what he builds and likes (full-stack, AI
  integration, running his own infrastructure) / personal (Plymouth, MN; disc golf;
  climbed the Grand Teton → link to `/mountain`).
- **Availability line:** "Graduating May 2027 — open to new-grad software
  engineering roles."
- **Experience** (from the résumé dated 2026-09-04, which supersedes the 2024
  PDF): HTML Developer & Content Deployment Specialist, WAND Digital (May 2025 –
  present; full-time summers, part-time remote in term); Classroom & A/V Support
  Technician, CSB/SJU (Aug 2023 – present); Finance Intern, Perrill (May–Aug
  2024).
- **Leadership & awards:** Treasurer, Computer Science Club (2026 – present);
  co-led the "AI & Automation" session in Ethical Issues in Computing (Fall
  2025); Stearns Bank Hackathon, 1st place (April 2024).
- **Education:** Saint John's University, Collegeville, MN — B.A. Computer
  Science, minor in Finance, expected May 2027. Certifications: Anthropic —
  Claude Code in Action (Aug 2026); Claude Code 101 and Claude 101 (Jun 2026).
- **Skills** in four groups: AI & agentic (Claude Code skills/rules/subagents,
  context engineering, agent-assisted workflows, LLM APIs) · Languages
  (TypeScript, JavaScript, Python, Java, SQL) · Frameworks (React, Next.js,
  React Native/Expo, Vite, Node, Fastify, Three.js, Prisma, Tailwind) · Infra &
  tools (Supabase/Postgres, Vercel, Raspberry Pi, Cloudflare Tunnel, GitHub
  Actions, Vitest, JUnit, Git, Linux).
- **Headshot:** a slot for `public/about/headshot.jpg`. Until Dylan supplies one, a
  typographic monogram block renders in its place. Never a broken image.

### 2.4 Contact

Email `dperrill001@csbsju.edu` (matches the résumé; a single constant in
`content/site.ts` to change later), GitHub `Dylan-Perrill`, LinkedIn
`dylan-perrill-455789294`, Résumé `/Resume.pdf` (existing 2024 PDF; updating it is a
separate task).

## 3. Site map

| Route | Purpose | Rendering |
|---|---|---|
| `/` | Hero, status line, four poster blocks, credential strip, about teaser, contact footer | ISR, revalidate 300s (for the status line) |
| `/work/[slug]` | Case study per featured project | Static |
| `/about` | Bio, experience, education, skills, headshot | Static |
| `/mountain` | Easter egg: Grand Teton quiz + photo gallery, restyled. Linked only from `/about` | Static (Quiz is a client component) |
| `/not-found` | Designed 404 | Static |
| `/opengraph-image` | Generated Swiss-style OG image (name + headline) | Static |
| `/sitemap.xml`, `/robots.txt` | Standard | Static |
| `/Resume.pdf` | Existing file in `public/` | Static asset |

### 3.1 Home page, top to bottom

1. **Header:** `Dylan Perrill` left; `Work · About · Résumé · Contact` right.
   Résumé opens the PDF in a new tab; Contact anchors to the footer. Sticky? No.
2. **Hero:** headline (two lines, second line's verb phrase in blue), the one-line
   sub, then the status line `● api.neurship.dev · online` when healthy.
3. **Selected work:** kicker `Selected work — 2025 → 2026`, then four poster blocks
   separated by 2px rules, image side alternating left/right. Each block: number,
   status label (`Live` / `Source`), title (display size), two-sentence pitch,
   stack line, `Open project ↗` (to `/work/[slug]`), and direct `Live ↗` /
   `Source ↗` links where available.
4. **Credential strip:** one rule-bounded line for the hackathon win.
5. **About teaser:** two lines + `More about me →`.
6. **Footer (every page):** email set large, GitHub, LinkedIn, Résumé, copyright.

### 3.2 Case-study page skeleton (identical for all four)

1. Header: number, title, pitch, meta table — *Role* (Solo), *Year*, *Stack*,
   *Links* (Live / Source / "Source on request").
2. Hero screenshot in a black frame.
3. **What it is** — 2–3 paragraphs.
4. **How it's built** — architecture bullets. For entrepreNewer, a small inline SVG
   diagram: Expo web on Vercel → API on Raspberry Pi 5 via Cloudflare Tunnel →
   Supabase (Auth, Postgres + pgvector) → AI provider; GitHub Actions runner on the
   Pi for deploys.
5. **Highlights** — 3–5 concrete bullets, each verifiable in the code.
6. **What I'd do next** — 2–3 bullets.
7. Gallery of 2–4 additional screenshots.
8. Prev / next project navigation.

All copy is drafted by Claude from the repos' READMEs, commit history, and code, and
**reviewed by Dylan before ship** (checkpoint 1).

## 4. Visual system ("Swiss bold")

- **Typeface:** Archivo (variable: weight 400–800, width 75–125), self-hosted via
  `next/font`. One family for everything.
  - Display: 800 weight, 90% width, uppercase, letter-spacing −0.03em,
    line-height 0.96, size `clamp(3rem, 8vw, 7.5rem)`.
  - Section titles: 800, uppercase, `clamp(2rem, 4vw, 3.25rem)`.
  - Body: 400, 17px, line-height 1.55, max measure 60ch.
  - Meta: 500, 12px, uppercase, letter-spacing 0.08em.
- **Color tokens:** `--ink #0A0A0A`, `--paper #FFFFFF`, `--blue #1F3BFF`,
  `--ink-2 #444444` (secondary text), `--ink-3 #666666` (meta), `--rule-light
  #E9E9E9`. Contrast: blue on white ≈ 5.6:1 (AA for all text sizes); ink-3 on
  white ≈ 5.7:1. No other colors, no gradients, no shadows, no border radius.
- **Layout:** max-width 1280px, 12-column grid, gutters 24px (mobile) / 40px.
  Sections divided by 2px `--ink` rules; lighter 1px rules inside lists.
  Everything numbered `01`–`04`. Images sit in 1.5px `--ink` frames.
- **Motion:** page-load stagger on headline lines (translateY 8px → 0, opacity,
  300ms, 60ms stagger). Project-block hover: a solid `--blue` block slides to a
  10px/10px offset behind the image (transform, 180ms) and the title turns blue.
  Links draw an underline on hover. Everything off under `prefers-reduced-motion`.
- **Responsive:** below 800px, single column; blocks stack image-then-text; the
  header collapses to name + two links (`Work`, `About`) with Résumé/Contact in the
  footer.
- **Single look.** No dark mode: `color-scheme: light` is declared and colors are
  painted explicitly.

## 5. Technical architecture

### 5.1 Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 (tokens in
one `@theme` block in `app/globals.css`) · ESLint · Vitest · Playwright · Node 22.
Rebuilt from a fresh `create-next-app` in this repo on branch `redesign`; the old
`app/` and `components/` are removed. Next 16 conventions (async `params`,
`proxy.ts` instead of `middleware.ts`, bundled docs under
`node_modules/next/dist/docs/`) are followed, not assumed from memory.

### 5.2 Content model

```ts
// content/projects.ts
export type ProjectLinks = {
  live?: string;            // https URL
  source?: string;          // https URL
  sourceNote?: string;      // e.g. "Source on request" — used when `source` is absent
};

export type Project = {
  slug: string;             // unique, URL-safe
  number: string;           // "01".."04"
  title: string;
  year: string;             // "2026"
  pitch: string;            // one sentence, used on home + case-study header
  description: string[];    // "What it is" paragraphs
  stack: string[];
  links: ProjectLinks;
  images: {
    hero: { src: string; alt: string; width: number; height: number };
    gallery: { src: string; alt: string; width: number; height: number }[];
  };
  architecture: string[];   // "How it's built" bullets
  highlights: string[];
  next: string[];           // "What I'd do next"
};

export const projects: Project[]; // ordered by `number`
```

`content/site.ts`: `name`, `headline` (two lines), `sub`, `email`, `github`,
`linkedin`, `resumePath`, `statusEndpoint`. `content/about.ts`: `bio: string[]`,
`availability`, `experience[]`, `education[]`, `skills: Record<group, string[]>`.

A **content validator** (`lib/validate-content.ts`, run by Vitest and at build via
a small script) asserts: unique slugs, numbers `01..0N` contiguous, every
`images.*.src` exists under `public/`, every link is `https://`, each project has
≥1 gallery image, ≥3 highlights. Failure fails the build.

### 5.3 Components

`SiteHeader`, `SiteFooter`, `Hero`, `StatusLine`, `ProjectBlock` (home),
`ProjectHeader`, `ArchitectureDiagram` (entrepreNewer only, inline SVG),
`Figure`, `Gallery`, `Quiz` (`"use client"`, restyled port of the current one),
`Section`, `Rule`, `Monogram` (headshot fallback). All server components except
`Quiz`.

### 5.4 Status line

`StatusLine` is a server component. It calls `fetch(site.statusEndpoint, { next:
{ revalidate: 300 }, signal: AbortSignal.timeout(3000) })`. It renders
`● api.neurship.dev · online` **only** when the response is 200 and the JSON is
`{ status: "ok" }`; on timeout, non-200, parse error, or any other body it renders
`null`. It never renders an "offline" state. The parse/decision logic lives in a
pure function `lib/status.ts` (`parseHealth(status: number, body: unknown):
boolean`) so it is unit-testable.

### 5.5 Images

- Screenshots captured with Playwright at 1440×900 (and one 390×844 mobile capture
  per web app for the gallery) from neurship.dev, Meridian, and Sora 2. Disc Mayhem
  uses the existing captures in `C:\Users\Dylan\DiscGolf\cr-*.png` (lobby, hole,
  bomb, final).
- Stored at `public/work/<slug>/<name>.{png,jpg}`, compressed to ≤ 300KB each,
  served through `next/image` with explicit `width`/`height` from the content
  file. The existing `public/gallery/mountain*.jpg` are kept for `/mountain`.
- OG image generated by `app/opengraph-image.tsx` with `next/og` (1200×630,
  name + headline, blue rule).

### 5.6 Deployment and repo housekeeping

- Work on branch `redesign`; push gives a Vercel preview URL (checkpoint 2).
  Merge to `main` deploys to dylanperrill.com. No Vercel CLI/MCP required.
- Same PR: `package.json` name → `dylanperrill.com`; new README describing the
  site, content model, and how to add a project; `metadata` in `app/layout.tsx`
  uses the real domain (`metadataBase`), title `Dylan Perrill`, description from
  `content/site.ts`; `.superpowers/` gitignored (done); set the GitHub repo
  homepage to `https://www.dylanperrill.com` via `gh repo edit`.
- A minimal GitHub Actions workflow (`.github/workflows/ci.yml`) runs
  `npm ci`, `tsc --noEmit`, `next lint`, `vitest run`, `next build` on pull
  requests and pushes to `main`.

## 6. Quality

### 6.1 Failure modes (designed in)

| Situation | Behavior |
|---|---|
| Health endpoint slow / down / wrong body | Status line omitted. No error, no "offline". |
| Headshot file absent | `Monogram` renders. No broken image. |
| Project missing hero image, link not https, duplicate slug | **Build fails** via validator + types. |
| Unknown `/work/<slug>` | Designed 404. |
| JS disabled | Everything but the quiz works (all server-rendered). |

### 6.2 Accessibility

Landmarks (`header`, `main`, `nav`, `footer`), skip-to-content link, visible
`:focus-visible` (2px blue outline, 2px offset), meaningful `alt` on every
screenshot (what the screen shows, not "screenshot"), contrast verified by a small
script in the test suite, `prefers-reduced-motion` honored, quiz fully
keyboard-operable with `aria-live` feedback, headings in order, external links
marked with `↗` and `rel="noopener noreferrer"`.

### 6.3 Performance

Target Lighthouse ≥ 95 in all four categories on `/` and one case study. Fonts via
`next/font` (no CLS), images sized, no client JavaScript on `/` (the status line is
server-rendered), `Quiz` is the only client bundle and only on `/mountain`.

### 6.4 Testing

- **Vitest (TDD):** `lib/status.ts` (`parseHealth` — ok/non-ok/malformed/non-200),
  `lib/validate-content.ts` (each rule, with fixture projects), contrast check of
  the token pairs in §4.
- **Playwright smoke** (`tests/e2e`): every route in §3 returns 200, has no console
  errors, contains its key text (headline on `/`, each project title on its page),
  `/opengraph-image` returns an image, the quiz can be completed by keyboard.
- **CI:** the workflow in §5.6.
- **Manual visual QA before handover:** Claude screenshots every page at 1440 and
  390 wide and reviews them against §4 before asking Dylan to look.

### 6.5 Checkpoints (Claude stops and waits)

1. **Copy review** — all case-study and about text, before it is wired into pages.
2. **Preview review** — the Vercel preview URL, before merging to `main`.

## 7. Decisions recorded

- Visual direction: Swiss bold (chosen over warm editorial and dark instrument).
- Homepage: poster blocks (chosen over typographic index and sticky split).
- Stack: Next 16 + TS + Tailwind v4 (chosen over Next 14 in place and Astro).
- entrepreNewer and Meridian remain private; "Source on request".
- No headshot yet; monogram fallback until supplied.
- Email: school address for now.
- Availability wording: "Graduating May 2027 — open to new-grad software
  engineering roles."

## 8. Out of scope (possible follow-ups)

Updating `Resume.pdf`; making day-trader / finance-app public; a public mirror of
entrepreNewer; adding more projects; analytics; a blog.

// Captures live-site screenshots into .capture/<slug>/<name>.png (gitignored).
// Desktop: 1440×900 @2x. Mobile: 390×844 @2x. Run `npm run optimize` afterwards.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const MOBILE = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};

const MERIDIAN = "https://finance-app-flax-five.vercel.app";
const SORA = "https://sora2-tool-pi.vercel.app";
const NEURSHIP = "https://neurship.dev";

// Sora 2 gates on an API key kept in localStorage; any value reveals the UI (no request is made until you generate).
const seedSoraKey = (ctx) =>
  ctx.addInitScript(() => localStorage.setItem("openai_api_key", "sk-portfolio-capture"));

const meridianSample = async (page) => {
  await page.getByText(/explore with sample data/i).first().click();
  await page.waitForTimeout(2500);
};

const settle = (ms) => async (page) => page.waitForTimeout(ms);

// The Sora tool's video-history fetch intermittently fails with a fake API key,
// surfacing a "Failed to load video history" error toast. Try its close button,
// then fall back to reloading, until it clears.
const dismissSoraError = async (page, tries = 5) => {
  for (let i = 0; i < tries; i++) {
    const toast = page.getByText(/failed to load video history/i);
    if ((await toast.count()) === 0) return;
    const closeBtn = toast.locator("xpath=ancestor::div[1]//button").first();
    if (await closeBtn.count()) {
      await closeBtn.click({ timeout: 1000 }).catch(() => {});
    }
    await page.waitForTimeout(1000);
    if ((await page.getByText(/failed to load video history/i).count()) === 0) return;
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(1500);
  }
};

const targets = [
  { slug: "entreprenewer", name: "landing", url: NEURSHIP, device: DESKTOP, after: settle(2500) },
  {
    slug: "entreprenewer", name: "features", url: NEURSHIP, device: DESKTOP,
    after: async (page) => {
      await page.getByRole("link", { name: "Features" }).first().click();
      await page.waitForTimeout(2000);
    },
  },
  { slug: "entreprenewer", name: "landing-mobile", url: NEURSHIP, device: MOBILE, after: settle(2500) },

  { slug: "meridian", name: "overview", url: MERIDIAN, device: DESKTOP, after: meridianSample },
  {
    slug: "meridian", name: "transactions", url: MERIDIAN, device: DESKTOP,
    after: async (page) => {
      await meridianSample(page);
      await page.getByText("Transactions", { exact: true }).first().click();
      await page.waitForTimeout(2000);
    },
  },
  { slug: "meridian", name: "overview-mobile", url: MERIDIAN, device: MOBILE, after: meridianSample },

  {
    slug: "sora-2-tool", name: "generator", url: SORA, device: DESKTOP, init: seedSoraKey,
    after: async (page) => {
      await page.waitForTimeout(2500);
      await dismissSoraError(page);
    },
  },
  {
    slug: "sora-2-tool", name: "test-console", url: SORA, device: DESKTOP, init: seedSoraKey,
    after: async (page) => {
      await page.waitForTimeout(1500);
      await dismissSoraError(page);
      await page.getByText("Test Page").first().click();
      await page.waitForTimeout(2000);
      await dismissSoraError(page);
      // The Debug Logs panel shows "Error loading videos: Failed to fetch" from the
      // fake seeded API key. Clear it right before the shot so the recruiter-facing
      // frame doesn't show an error line.
      let clearBtn = page.getByRole("button", { name: /clear/i }).first();
      if ((await clearBtn.count()) === 0) {
        clearBtn = page.getByText(/^clear$/i).first();
      }
      if (await clearBtn.count()) {
        await clearBtn.click({ timeout: 1000 }).catch(() => {});
        await page.waitForTimeout(800);
      }
    },
  },
  {
    slug: "sora-2-tool", name: "generator-mobile", url: SORA, device: MOBILE, init: seedSoraKey,
    after: async (page) => {
      await page.waitForTimeout(2500);
      await dismissSoraError(page);
    },
  },
];

const browser = await chromium.launch();
let failures = 0;
for (const t of targets) {
  const ctx = await browser.newContext(t.device);
  try {
    if (t.init) await t.init(ctx);
    const page = await ctx.newPage();
    await page.goto(t.url, { waitUntil: "load", timeout: 45_000 });
    if (t.after) await t.after(page);
    const dir = path.join(".capture", t.slug);
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${t.name}.png`);
    await page.screenshot({ path: file });
    console.log(`captured ${file}`);
  } catch (err) {
    failures += 1;
    console.error(`FAILED ${t.slug}/${t.name}: ${err.message}`);
  } finally {
    await ctx.close();
  }
}
await browser.close();
if (failures) {
  console.error(`${failures} capture(s) failed`);
  process.exit(1);
}

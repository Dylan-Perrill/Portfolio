import { test, expect, type Page } from "@playwright/test";

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

test("home: shell renders with header, headline and contact footer", async ({ page }) => {
  const errors = await collectConsoleErrors(page);
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("banner").getByRole("link", { name: "Dylan Perrill" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Builds AI products.");
  await expect(page.getByRole("contentinfo")).toContainText("dperrill001@csbsju.edu");
  expect(errors).toEqual([]);
});

test("home: four project blocks with hero images and links", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  await expect(work.getByRole("article")).toHaveCount(4);
  for (const title of ["entrepreNewer", "Disc Mayhem", "Meridian", "Sora 2 Tool"]) {
    await expect(work.getByRole("heading", { level: 2, name: title })).toBeVisible();
  }
  await expect(work.getByRole("link", { name: "Open entrepreNewer" })).toHaveAttribute("href", "/work/entreprenewer");
  const heroImg = work.getByRole("article").first().getByRole("img");
  await expect(heroImg).toHaveAttribute("alt", /entrepreNewer landing page/);
  await expect(page.getByText("Stearns Bank Hackathon — 1st place")).toBeVisible();
});

for (const [slug, title] of [
  ["entreprenewer", "entrepreNewer"],
  ["disc-mayhem", "Disc Mayhem"],
  ["meridian", "Meridian"],
  ["sora-2-tool", "Sora 2 Tool"],
] as const) {
  test(`case study /work/${slug} renders`, async ({ page }) => {
    const errors = await collectConsoleErrors(page);
    const res = await page.goto(`/work/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    for (const h of ["What it is", "How it's built", "Highlights", "What I'd do next", "More screens"]) {
      await expect(page.getByRole("heading", { level: 2, name: h })).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

test("entrepreNewer shows the architecture diagram; others do not", async ({ page }) => {
  await page.goto("/work/entreprenewer");
  await expect(page.getByRole("img", { name: /Expo web on Vercel/ })).toBeVisible();
  await page.goto("/work/meridian");
  await expect(page.getByRole("img", { name: /Expo web on Vercel/ })).toHaveCount(0);
});

test("unknown project slug is a 404", async ({ page }) => {
  const res = await page.goto("/work/does-not-exist");
  expect(res?.status()).toBe(404);
});

test("about: availability, experience, skills and the mountain link", async ({ page }) => {
  const errors = await collectConsoleErrors(page);
  const res = await page.goto("/about");
  expect(res?.status()).toBe(200);
  await expect(page.getByText("Graduating May 2027 — open to new-grad software engineering roles.")).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();
  // Scoped to the Experience section: the bio also mentions "WAND Digital" in prose,
  // so an unscoped getByText match is ambiguous (Playwright strict-mode violation).
  const experience = page.locator("section", { has: page.locator("#experience") });
  await expect(experience.getByText("WAND Digital")).toBeVisible();
  await expect(page.getByRole("link", { name: "Guess the mountain →" })).toHaveAttribute("href", "/mountain");
  // Headshot absent → monogram; present → image. Either is fine, but exactly one must render.
  const monogram = page.getByRole("img", { name: /Monogram placeholder/ });
  const photo = page.getByRole("img", { name: "Dylan Perrill", exact: true });
  expect((await monogram.count()) + (await photo.count())).toBe(1);
  expect(errors).toEqual([]);
});

test("mountain: quiz is completable by keyboard and photos render", async ({ page }) => {
  const errors = await collectConsoleErrors(page);
  await page.goto("/mountain");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Guess the Mountain");
  await expect(page.getByRole("figure")).toHaveCount(6);

  // Answer all three by keyboard: focus the correct choice and press Enter, then Next/Finish.
  for (const answer of ["The Grand Teton", "Wyoming", "13,775 ft"]) {
    await page.getByRole("button", { name: answer, exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText("Correct.")).toBeVisible();
    await page.getByRole("button", { name: /Next|Finish/ }).focus();
    await page.keyboard.press("Enter");
  }
  await expect(page.getByText("3 / 3")).toBeVisible();
  expect(errors).toEqual([]);
});

test("metadata routes: OG image, icon, sitemap, robots", async ({ page, request }) => {
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  expect((await og.body()).length).toBeGreaterThan(10_000);

  const projectOg = await request.get("/work/entreprenewer/opengraph-image");
  expect(projectOg.status()).toBe(200);
  expect(projectOg.headers()["content-type"]).toContain("image/png");
  expect((await projectOg.body()).length).toBeGreaterThan(10_000);

  const icon = await request.get("/icon.svg");
  expect(icon.status()).toBe(200);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const path of ["/about", "/work/entreprenewer", "/work/sora-2-tool", "/mountain"]) {
    expect(xml).toContain(`https://www.dylanperrill.com${path}`);
  }

  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap: https://www.dylanperrill.com/sitemap.xml");

  // The case study points at its own generated card and still inherits the shared OG fields.
  await page.goto("/work/entreprenewer");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/work\/entreprenewer\/opengraph-image/,
  );
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Dylan Perrill");
});

test("404 page is designed and links home", async ({ page }) => {
  const res = await page.goto("/nope");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Nothing");
  await expect(page.getByRole("link", { name: /Back to the front page/ })).toHaveAttribute("href", "/");
});

test("home page carries OG tags pointing at the generated image", async ({ page }) => {
  await page.goto("/");
  const og = page.locator('meta[property="og:image"]');
  await expect(og).toHaveAttribute("content", /opengraph-image/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Dylan Perrill");
});

test("reduced motion disables the headline animation", async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", baseURL: baseURL ?? undefined });
  const page = await ctx.newPage();
  await page.goto("/");
  const anim = await page.locator(".hero-line").first().evaluate((el) => getComputedStyle(el).animationName);
  expect(anim).toBe("none");
  await ctx.close();
});

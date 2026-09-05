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

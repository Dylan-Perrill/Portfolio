import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getProjects } from "@/content";
import { mountain } from "@/content/mountain";
import { validateProjects } from "@/lib/validate-content";

const fileExists = (publicPath: string) => existsSync(join(process.cwd(), "public", publicPath));

describe("real content", () => {
  it("has exactly four featured projects in spec order", () => {
    expect(getProjects().map((p) => p.slug)).toEqual(["entreprenewer", "disc-mayhem", "meridian", "sora-2-tool"]);
  });

  it("passes the validator against the files in public/", () => {
    expect(validateProjects(getProjects(), fileExists)).toEqual([]);
  });

  it("mountain photos exist and have dimensions", () => {
    for (const p of mountain.photos) {
      expect(fileExists(p.src), p.src).toBe(true);
      expect(p.width, p.src).toBeGreaterThan(0);
      expect(p.height, p.src).toBeGreaterThan(0);
      expect(p.alt).not.toMatch(/screenshot/i);
    }
  });
});

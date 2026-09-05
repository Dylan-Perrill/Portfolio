import { describe, expect, it } from "vitest";
import type { Project } from "@/content/types";
import { validateProjects } from "@/lib/validate-content";

function project(overrides: Partial<Project> = {}): Project {
  return {
    slug: "alpha",
    number: "01",
    title: "Alpha",
    year: "2026",
    pitch: "A pitch.",
    description: ["Para."],
    stack: ["TypeScript"],
    links: { live: "https://alpha.example", sourceNote: "Source on request" },
    images: {
      hero: { src: "/work/alpha/hero.webp", alt: "The alpha dashboard", width: 1920, height: 1200 },
      gallery: [{ src: "/work/alpha/g1.webp", alt: "The alpha settings page", width: 780, height: 1688 }],
    },
    architecture: ["Bullet."],
    highlights: ["One.", "Two.", "Three."],
    next: ["Later."],
    ...overrides,
  };
}

const allExist = () => true;

describe("validateProjects", () => {
  it("accepts a valid project", () => {
    expect(validateProjects([project()], allExist)).toEqual([]);
  });

  it("requires contiguous numbers starting at 01", () => {
    const issues = validateProjects([project(), project({ slug: "beta", number: "03" })], allExist);
    expect(issues).toContainEqual(expect.stringContaining('beta: number "03" should be "02"'));
  });

  it("rejects duplicate and malformed slugs", () => {
    expect(validateProjects([project(), project({ number: "02" })], allExist)).toContainEqual(
      expect.stringContaining("duplicate slug"),
    );
    expect(validateProjects([project({ slug: "Bad Slug" })], allExist)).toContainEqual(
      expect.stringContaining("slug must be"),
    );
  });

  it("requires https links", () => {
    expect(validateProjects([project({ links: { live: "http://x", source: "https://y" } })], allExist)).toContainEqual(
      expect.stringContaining("links.live must be https"),
    );
  });

  it("requires either a source link or a source note", () => {
    expect(validateProjects([project({ links: { live: "https://x" } })], allExist)).toContainEqual(
      expect.stringContaining("needs links.source or links.sourceNote"),
    );
  });

  it("requires every image file to exist under public/", () => {
    const exists = (p: string) => p !== "/work/alpha/g1.webp";
    expect(validateProjects([project()], exists)).toContainEqual(
      expect.stringContaining("gallery image missing: /work/alpha/g1.webp"),
    );
  });

  it("requires positive dimensions and descriptive alt text", () => {
    const p = project();
    p.images.hero = { ...p.images.hero, width: 0 };
    p.images.gallery[0] = { ...p.images.gallery[0], alt: "Screenshot of settings" };
    const issues = validateProjects([p], allExist);
    expect(issues).toContainEqual(expect.stringContaining("missing dimensions"));
    expect(issues).toContainEqual(expect.stringContaining('alt text must describe the screen'));
  });

  it("requires at least one gallery image and three highlights", () => {
    const p = project({ highlights: ["Only one."] });
    p.images.gallery = [];
    const issues = validateProjects([p], allExist);
    expect(issues).toContainEqual(expect.stringContaining("at least one gallery image"));
    expect(issues).toContainEqual(expect.stringContaining("at least 3 highlights"));
  });
});

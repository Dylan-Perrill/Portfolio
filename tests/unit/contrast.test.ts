import { describe, expect, it } from "vitest";
import { contrastRatio } from "@/lib/contrast";

// Token values copied verbatim from app/globals.css @theme.
const paper = "#ffffff";
const ink = "#0a0a0a";
const ink2 = "#444444";
const ink3 = "#666666";
const blue = "#1f3bff";

describe("Swiss palette meets WCAG AA (4.5:1) for text", () => {
  it.each([
    ["ink on paper", ink, paper],
    ["ink-2 on paper", ink2, paper],
    ["ink-3 on paper (meta text)", ink3, paper],
    ["blue on paper (accent text)", blue, paper],
    ["paper on blue (selection, buttons)", paper, blue],
    ["paper on ink (buttons, monogram)", paper, ink],
  ])("%s ≥ 4.5", (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("computes the canonical black/white ratio", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
  });
});

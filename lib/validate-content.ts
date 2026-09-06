import type { ImageRef, Project } from "@/content/types";

const SLUG = /^[a-z0-9-]+$/;

function checkImage(slug: string, kind: string, img: ImageRef, fileExists: (p: string) => boolean, out: string[]) {
  if (!fileExists(img.src)) out.push(`${slug}: ${kind} image missing: ${img.src}`);
  if (!(img.width > 0 && img.height > 0)) out.push(`${slug}: missing dimensions for ${img.src} (run npm run optimize)`);
  if (!img.alt.trim() || /screenshot/i.test(img.alt)) {
    out.push(`${slug}: alt text must describe the screen, not say "screenshot": ${img.src}`);
  }
}

/** Returns a list of human-readable problems. Empty array means the content is valid. */
export function validateProjects(
  projects: readonly Project[],
  fileExists: (publicPath: string) => boolean,
): string[] {
  const issues: string[] = [];
  const seen = new Set<string>();

  projects.forEach((p, i) => {
    const expected = String(i + 1).padStart(2, "0");
    if (p.number !== expected) issues.push(`${p.slug}: number "${p.number}" should be "${expected}"`);
    if (!SLUG.test(p.slug)) issues.push(`${p.slug}: slug must be lowercase letters, digits and hyphens`);
    if (seen.has(p.slug)) issues.push(`${p.slug}: duplicate slug`);
    seen.add(p.slug);

    for (const key of ["live", "source"] as const) {
      const v = p.links[key];
      if (v !== undefined && !v.startsWith("https://")) issues.push(`${p.slug}: links.${key} must be https`);
    }
    if (!p.links.source && !p.links.sourceNote) issues.push(`${p.slug}: needs links.source or links.sourceNote`);

    if (!p.title.trim()) issues.push(`${p.slug}: title is empty`);
    if (!p.pitch.trim()) issues.push(`${p.slug}: pitch is empty`);
    if (p.description.length < 1) issues.push(`${p.slug}: needs at least one description paragraph`);
    if (p.stack.length < 1) issues.push(`${p.slug}: needs at least one stack entry`);
    if (p.architecture.length < 1) issues.push(`${p.slug}: needs at least one architecture bullet`);
    if (p.highlights.length < 3) issues.push(`${p.slug}: needs at least 3 highlights`);

    checkImage(p.slug, "hero", p.images.hero, fileExists, issues);
    if (p.images.gallery.length < 1) issues.push(`${p.slug}: needs at least one gallery image`);
    p.images.gallery.forEach((g) => checkImage(p.slug, "gallery", g, fileExists, issues));
  });

  return issues;
}

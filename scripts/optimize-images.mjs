// Image pipeline. Three steps, each independent:
//
// 1. convert (default)   .capture/<slug>/<name>.png → public/work/<slug>/<name>.webp
//                        (max 1920 wide; *-mobile max 780 wide). Skipped when
//                        .capture/ is absent — it is gitignored, so a fresh clone
//                        simply has nothing to convert.
// 2. gallery (--gallery) public/gallery/*.jpg re-encoded in place, but only when the
//                        long edge is still over 1600px. Re-encoding an already-sized
//                        JPEG only costs generation loss, so it is opt-in.
// 3. manifest (always)   scans the committed tree (public/work/**/*.webp and
//                        public/gallery/*.jpg) and writes content/image-manifest.json.
//                        Never reads .capture/, so the manifest is identical on a fresh
//                        clone and `npm run optimize` is safe to run at any time.
//
// The 300KB budget applies to the captured work screenshots only: gallery photos are
// served through next/image, which re-encodes per device, so a larger source only
// costs repo weight, not shipped bytes. Gallery files are exempt from the WARN check
// (their size is still printed).
import sharp from "sharp";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// On Windows, libvips keeps a memory-mapped handle on a source file until sharp's
// operation cache is flushed, which makes an immediate write-back to that same
// path fail with EBUSY/UNKNOWN. Disabling the cache releases the handle right away.
sharp.cache(false);

const MAX_BYTES = 300 * 1024;
const MAX_GALLERY_EDGE = 1600;
const WORK_DIR = path.join("public", "work");
const GALLERY_DIR = path.join("public", "gallery");

async function convertCaptures() {
  if (!existsSync(".capture")) return;
  // Only the per-slug directories: .capture/ is scratch space and may hold loose files.
  for (const entry of await readdir(".capture", { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const inDir = path.join(".capture", slug);
    const outDir = path.join(WORK_DIR, slug);
    await mkdir(outDir, { recursive: true });
    for (const file of (await readdir(inDir)).filter((f) => f.endsWith(".png"))) {
      const name = file.replace(/\.png$/, "");
      const width = name.endsWith("-mobile") ? 780 : 1920;
      const out = path.join(outDir, `${name}.webp`);
      await sharp(path.join(inDir, file))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(out);
      console.log(`convert  ${out}`);
    }
  }
}

async function reencodeGallery() {
  for (const file of (await readdir(GALLERY_DIR)).filter((f) => /\.jpe?g$/i.test(f))) {
    const src = path.join(GALLERY_DIR, file);
    const meta = await sharp(src).metadata();
    if (Math.max(meta.width, meta.height) <= MAX_GALLERY_EDGE) {
      console.log(`gallery  ${src}  skip (already ≤${MAX_GALLERY_EDGE})`);
      continue;
    }
    const buf = await sharp(src)
      .rotate()
      .resize({ width: MAX_GALLERY_EDGE, height: MAX_GALLERY_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    await writeFile(src, buf);
    console.log(`gallery  ${src}  re-encoded`);
  }
}

async function listFiles(dir, match) {
  if (!existsSync(dir)) return [];
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await listFiles(full, match)));
    else if (match.test(entry.name)) found.push(full);
  }
  return found;
}

async function writeManifest() {
  const manifest = {};
  const work = await listFiles(WORK_DIR, /\.webp$/i);
  const gallery = await listFiles(GALLERY_DIR, /\.jpe?g$/i);
  for (const file of [...work, ...gallery]) {
    const key = path.relative("public", file).split(path.sep).join("/");
    const meta = await sharp(file).metadata();
    manifest[key] = { width: meta.width, height: meta.height };
    report(file, (await stat(file)).size, { exemptFromCap: key.startsWith("gallery/") });
  }
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(path.join("content", "image-manifest.json"), JSON.stringify(sorted, null, 2) + "\n");
  console.log(`manifest: ${Object.keys(sorted).length} images`);
}

function report(file, bytes, { exemptFromCap = false } = {}) {
  const kb = Math.round(bytes / 1024);
  const status = exemptFromCap ? "ok" : bytes > MAX_BYTES ? "WARN >300KB" : "ok";
  console.log(`${status}  ${kb}KB  ${file}`);
}

await convertCaptures();
if (process.argv.includes("--gallery")) await reencodeGallery();
await writeManifest();

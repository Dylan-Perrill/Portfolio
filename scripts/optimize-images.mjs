// .capture/<slug>/<name>.png → public/work/<slug>/<name>.webp (max 1920 wide; *-mobile max 780 wide).
// public/gallery/*.jpg → re-encoded in place (max 1000px on the long edge, EXIF-rotated).
// Narrowed from the original 1600-wide spec: three of the six source photos are
// portrait-oriented, so a width-only cap barely shrank them and they stayed over the
// 300KB budget even at 1400 wide / quality 82. Bounding both dimensions at 1000px
// fixes that while keeping quality at the spec's 82.
// Writes content/image-manifest.json with every output's dimensions.
import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// On Windows, libvips keeps a memory-mapped handle on a source file until sharp's
// operation cache is flushed, which makes an immediate write-back to that same
// path fail with EBUSY/UNKNOWN. Disabling the cache releases the handle right away.
sharp.cache(false);

const MAX_BYTES = 300 * 1024;
const manifest = {};

async function processWork() {
  if (!existsSync(".capture")) return;
  for (const slug of await readdir(".capture")) {
    const inDir = path.join(".capture", slug);
    const outDir = path.join("public", "work", slug);
    await mkdir(outDir, { recursive: true });
    for (const file of (await readdir(inDir)).filter((f) => f.endsWith(".png"))) {
      const name = file.replace(/\.png$/, "");
      const width = name.endsWith("-mobile") ? 780 : 1920;
      const out = path.join(outDir, `${name}.webp`);
      const info = await sharp(path.join(inDir, file))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(out);
      manifest[`work/${slug}/${name}.webp`] = { width: info.width, height: info.height };
      report(out, info.size);
    }
  }
}

async function processGallery() {
  const dir = path.join("public", "gallery");
  for (const file of (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f))) {
    const src = path.join(dir, file);
    const buf = await sharp(src).rotate().resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    await writeFile(src, buf);
    const meta = await sharp(buf).metadata();
    manifest[`gallery/${file}`] = { width: meta.width, height: meta.height };
    report(src, buf.length);
  }
}

function report(file, bytes) {
  const kb = Math.round(bytes / 1024);
  console.log(`${bytes > MAX_BYTES ? "WARN >300KB" : "ok"}  ${kb}KB  ${file}`);
}

await processWork();
await processGallery();
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(path.join("content", "image-manifest.json"), JSON.stringify(sorted, null, 2) + "\n");
console.log(`manifest: ${Object.keys(sorted).length} images`);

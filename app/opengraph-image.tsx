import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.headline.line1} ${site.headline.line2Accent} ${site.headline.line2Rest}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const archivo = await readFile(join(process.cwd(), "assets/fonts/ArchivoSemiCondensed-ExtraBold.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0a0a0a",
          padding: 64,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 3,
            textTransform: "uppercase",
            borderBottom: "5px solid #0a0a0a",
            paddingBottom: 18,
          }}
        >
          <span>{site.name}</span>
          <span>dylanperrill.com</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 132,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: -5,
          }}
        >
          <span>{site.headline.line1}</span>
          <span style={{ display: "flex" }}>
            <span style={{ color: "#1f3bff" }}>{site.headline.line2Accent}</span>
            <span>&nbsp;{site.headline.line2Rest}</span>
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] },
  );
}

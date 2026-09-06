import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProject, projectSlugs } from "@/content";
import { site } from "@/content/site";

export const alt = "Dylan Perrill — project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
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
        {project ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, letterSpacing: 3, textTransform: "uppercase", color: "#1f3bff" }}>
              {project.number}
            </span>
            <span
              style={{
                marginTop: 14,
                fontSize: project.title.length <= 10 ? 128 : 96,
                lineHeight: 0.95,
                letterSpacing: -4,
                textTransform: "uppercase",
              }}
            >
              {project.title}
            </span>
            <span
              style={{
                marginTop: 30,
                fontSize: 34,
                lineHeight: 1.25,
                color: "#444444",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {project.pitch}
            </span>
          </div>
        ) : (
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
        )}
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] },
  );
}

"use client";
import Image from "next/image";

export default function Gallery({ photos = [], columns = 3 }) {
  return (
    <div
      style={{
        display: "grid",
        marginTop: "1rem",
        gap: "0.75rem",
        gridTemplateColumns: `repeat(auto-fill,minmax(${Math.floor(
          100 / columns
        )}%,1fr))`
      }}
    >
      {photos.map((p, i) => (
        <figure
          key={i}
          style={{
            margin: 0,
            border: "1px solid var(--border,#333)",
            borderRadius: "8px",
            overflow: "hidden",
            background: "var(--card-bg,#111)"
          }}
        >
          <Image
            src={p.src}
            alt={p.alt || ""}
            width={p.width || 800}
            height={p.height || 600}
            style={{ width: "100%", height: "auto", display: "block" }}
            loading="lazy"
          />
          {p.caption && (
            <figcaption
              style={{
                fontSize: "0.75rem",
                padding: "0.4rem 0.6rem",
                opacity: 0.75
              }}
            >
              {p.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
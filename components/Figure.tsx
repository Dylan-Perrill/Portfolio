import Image from "next/image";
import type { ImageRef } from "@/content/types";

export function Figure({
  image,
  caption,
  priority = false,
  sizes = "(min-width: 800px) 1200px, 100vw",
}: {
  image: ImageRef;
  caption?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="m-0">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full border-[1.5px] border-ink"
      />
      {caption && <figcaption className="mt-2 text-meta uppercase text-ink-3">{caption}</figcaption>}
    </figure>
  );
}

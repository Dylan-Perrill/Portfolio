import { Figure } from "@/components/Figure";
import type { ImageRef } from "@/content/types";

export function Gallery({ images }: { images: readonly (ImageRef & { caption?: string })[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {images.map((image) => (
        <Figure key={image.src} image={image} caption={image.caption} sizes="(min-width: 800px) 600px, 100vw" />
      ))}
    </div>
  );
}

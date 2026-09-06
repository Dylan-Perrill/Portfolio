import manifest from "./image-manifest.json";
import type { ImageRef } from "./types";

type Manifest = Record<string, { width: number; height: number }>;

/** Look up dimensions from the generated manifest. Unknown paths get 0×0, which the validator rejects. */
export function img(path: string, alt: string): ImageRef {
  const m = (manifest as Manifest)[path];
  return { src: `/${path}`, alt, width: m?.width ?? 0, height: m?.height ?? 0 };
}

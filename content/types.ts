export type ImageRef = {
  /** Public URL path, e.g. "/work/meridian/overview.webp". */
  src: string;
  /** Describes what the screen shows. Never the word "screenshot". */
  alt: string;
  width: number;
  height: number;
};

export type ProjectLinks = {
  live?: string;
  source?: string;
  /** Shown in place of a source link, e.g. "Source on request". */
  sourceNote?: string;
};

export type Project = {
  /** URL segment: lowercase letters, digits, hyphens. */
  slug: string;
  /** "01", "02", … in display order. */
  number: string;
  title: string;
  year: string;
  /** One sentence. Home block + case-study header. */
  pitch: string;
  /** "What it is" paragraphs. */
  description: string[];
  stack: string[];
  links: ProjectLinks;
  images: { hero: ImageRef; gallery: ImageRef[] };
  /** "How it's built" bullets. */
  architecture: string[];
  /** Concrete, verifiable-in-code bullets. */
  highlights: string[];
  /** "What I'd do next" bullets. */
  next: string[];
};

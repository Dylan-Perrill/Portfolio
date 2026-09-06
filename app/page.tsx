import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectBlock } from "@/components/ProjectBlock";
import { getProjects } from "@/content";
import { about } from "@/content/about";

// ISR so the status line refreshes without a redeploy (spec §3).
export const revalidate = 300;

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <Hero />

      <section id="work" className="container-x scroll-mt-6" aria-labelledby="work-heading">
        <h2 id="work-heading" className="pb-3 text-meta uppercase text-ink-3">
          Selected work — 2025 → 2026
        </h2>
        {projects.map((p, i) => (
          <ProjectBlock key={p.slug} project={p} index={i} />
        ))}
      </section>

      <section className="container-x mt-6" aria-label="Credential">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-y-2 border-ink py-5">
          <p className="type-title-sm">{about.credential.label}</p>
          <p className="text-meta uppercase text-ink-3">
            {about.credential.when} · {about.credential.note}
          </p>
        </div>
      </section>

      <section className="container-x mt-16" aria-labelledby="about-teaser-heading">
        <h2 id="about-teaser-heading" className="text-meta uppercase text-ink-3">
          About
        </h2>
        <p className="mt-3 max-w-[60ch] text-ink-2">{about.bio[0]}</p>
        <p className="mt-3">
          <Link href="/about" className="link-draw text-meta font-extrabold uppercase">
            More about me →
          </Link>
        </p>
      </section>
    </>
  );
}

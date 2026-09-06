import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Figure } from "@/components/Figure";
import { Gallery } from "@/components/Gallery";
import { ProjectHeader } from "@/components/ProjectHeader";
import { getProject, getProjects, projectSlugs } from "@/content";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.pitch,
    openGraph: { title: project.title, description: project.pitch, images: [project.images.hero.src] },
  };
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="container-x mt-16">
      <div className="grid gap-4 border-t-2 border-ink pt-6 md:grid-cols-12 md:gap-10">
        <h2 id={id} className="text-meta uppercase text-ink-3 md:col-span-3">
          {title}
        </h2>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const i = all.findIndex((p) => p.slug === project.slug);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];

  return (
    <article>
      <ProjectHeader project={project} />

      <div className="container-x mt-10">
        <Figure image={project.images.hero} priority />
      </div>

      <Section id="what" title="What it is">
        <div className="max-w-[62ch] space-y-5 text-ink-2">
          {project.description.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
      </Section>

      <Section id="how" title="How it's built">
        {project.slug === "entreprenewer" && (
          <div className="mb-8">
            <ArchitectureDiagram />
          </div>
        )}
        <ul className="max-w-[62ch] space-y-3 text-ink-2">
          {project.architecture.map((b) => (
            <li key={b.slice(0, 40)} className="border-l-2 border-blue pl-4">
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="highlights" title="Highlights">
        <ol className="max-w-[62ch] space-y-4">
          {project.highlights.map((h, n) => (
            <li key={h.slice(0, 40)} className="grid grid-cols-[2.5rem_1fr] gap-2">
              <span className="text-meta font-extrabold uppercase text-blue">{String(n + 1).padStart(2, "0")}</span>
              <span className="text-ink-2">{h}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="next" title="What I'd do next">
        <ul className="max-w-[62ch] space-y-3 text-ink-2">
          {project.next.map((b) => (
            <li key={b.slice(0, 40)} className="border-l-2 border-rule-light pl-4">
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="more" title="More screens">
        <Gallery images={project.images.gallery} />
      </Section>

      <nav aria-label="Other projects" className="container-x mt-20">
        <div className="grid gap-4 border-t-2 border-ink pt-6 text-meta font-extrabold uppercase md:grid-cols-2">
          <Link href={`/work/${prev.slug}`} className="link-draw justify-self-start">
            ← {prev.number} {prev.title}
          </Link>
          <Link href={`/work/${next.slug}`} className="link-draw md:justify-self-end">
            {next.number} {next.title} →
          </Link>
        </div>
      </nav>
    </article>
  );
}

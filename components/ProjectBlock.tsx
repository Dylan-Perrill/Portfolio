import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";

export function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const href = `/work/${project.slug}`;
  const status = project.links.live ? "Live" : "Source";

  return (
    <article className="group grid gap-6 border-t-2 border-ink py-8 md:grid-cols-12 md:items-center md:gap-10 md:py-14">
      <Link
        href={href}
        aria-label={`Open ${project.title}`}
        tabIndex={-1}
        className={`relative block md:col-span-7 ${reverse ? "md:order-2" : ""}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-blue transition-transform duration-[180ms] ease-out group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-focus-within:translate-x-2.5 group-focus-within:translate-y-2.5"
        />
        <Image
          src={project.images.hero.src}
          alt={project.images.hero.alt}
          width={project.images.hero.width}
          height={project.images.hero.height}
          sizes="(min-width: 800px) 58vw, 100vw"
          priority={index === 0}
          className="relative block h-auto w-full border-[1.5px] border-ink"
        />
      </Link>

      <div className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
        <p className="text-meta uppercase text-ink-3">
          <span className="font-extrabold text-blue">{project.number}</span> — {status}
        </p>
        <h2 className="type-title mt-3">
          <Link href={href} className="group-hover:text-blue">
            {project.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-[40ch] text-ink-2">{project.pitch}</p>
        <p className="mt-4 text-meta uppercase text-ink-3">{project.stack.slice(0, 5).join(" · ")}</p>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-meta font-extrabold uppercase">
          <Link href={href} className="link-draw">
            Open project →
          </Link>
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="link-draw">
              Live
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
          {project.links.source && (
            <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="link-draw">
              Source
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </p>
      </div>
    </article>
  );
}

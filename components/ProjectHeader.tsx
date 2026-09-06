import type { Project } from "@/content/types";

export function ProjectHeader({ project }: { project: Project }) {
  const { links } = project;
  return (
    <header className="container-x pt-10 md:pt-16">
      <p className="text-meta uppercase text-ink-3">
        <span className="font-extrabold text-blue">{project.number}</span> — {project.year}
      </p>
      <h1 className="type-display-sm mt-3">{project.title}</h1>
      <p className="mt-6 max-w-[52ch] text-ink-2">{project.pitch}</p>

      <dl className="mt-8 grid gap-x-8 gap-y-4 border-y-2 border-ink py-5 text-meta uppercase md:grid-cols-4">
        <div>
          <dt className="text-ink-3">Role</dt>
          <dd className="mt-1 font-extrabold">Solo — design, build, ship</dd>
        </div>
        <div>
          <dt className="text-ink-3">Year</dt>
          <dd className="mt-1 font-extrabold">{project.year}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Stack</dt>
          <dd className="mt-1 font-extrabold">{project.stack.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Links</dt>
          <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1 font-extrabold">
            {links.live && (
              <a href={links.live} target="_blank" rel="noopener noreferrer" className="link-draw">
                Live
                <span aria-hidden="true"> ↗</span>
              </a>
            )}
            {links.source ? (
              <a href={links.source} target="_blank" rel="noopener noreferrer" className="link-draw">
                Source
                <span aria-hidden="true"> ↗</span>
              </a>
            ) : (
              <span className="text-ink-3">{links.sourceNote}</span>
            )}
          </dd>
        </div>
      </dl>
    </header>
  );
}

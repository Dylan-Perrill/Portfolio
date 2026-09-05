import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer id="contact" className="container-x mt-24 mb-10">
      <div className="border-t-2 border-ink pt-8">
        <p className="text-meta uppercase text-ink-3">Contact</p>
        <a
          href={`mailto:${site.email}`}
          className="type-title mt-3 inline-block break-all hover:text-blue"
        >
          {site.email}
        </a>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-meta uppercase">
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="link-draw">
              GitHub ↗
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-draw">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={site.resumePath} target="_blank" rel="noopener noreferrer" className="link-draw">
              Résumé (PDF) ↗
            </a>
          </li>
        </ul>
        <p className="mt-10 text-meta uppercase text-ink-3">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}

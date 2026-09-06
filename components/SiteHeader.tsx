import Link from "next/link";
import { site } from "@/content/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: site.resumePath, label: "Résumé", external: true, hideOnMobile: true },
  { href: "/#contact", label: "Contact", hideOnMobile: true },
] as const;

export function SiteHeader() {
  return (
    <header className="container-x pt-6">
      <nav
        aria-label="Primary"
        className="flex items-baseline justify-between border-b-2 border-ink pb-3"
      >
        <Link href="/" className="text-meta font-semibold uppercase">
          {site.name}
        </Link>
        <ul className="flex gap-6">
          {links.map((l) => (
            <li
              key={l.label}
              className={"hideOnMobile" in l && l.hideOnMobile ? "hidden md:block" : undefined}
            >
              {"external" in l && l.external ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-meta uppercase"
                >
                  {l.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ) : (
                <Link href={l.href} className="link-draw text-meta uppercase">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

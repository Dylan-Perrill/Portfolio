import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Monogram } from "@/components/Monogram";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: about.availability,
};

function hasHeadshot(): boolean {
  return existsSync(join(process.cwd(), "public", about.headshot.src));
}

export default function AboutPage() {
  const headshot = hasHeadshot();
  return (
    <article className="container-x pt-10 md:pt-16">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          {headshot ? (
            <Image
              src={about.headshot.src}
              alt={about.headshot.alt}
              width={1200}
              height={1500}
              sizes="(min-width: 800px) 40vw, 100vw"
              priority
              className="block h-auto w-full border-[1.5px] border-ink grayscale"
            />
          ) : (
            <Monogram />
          )}
        </div>
        <div className="md:col-span-7">
          <p className="text-meta uppercase text-ink-3">About</p>
          <h1 className="type-title mt-3">Dylan Perrill</h1>
          <p className="mt-6 text-meta font-extrabold uppercase text-blue">{about.availability}</p>
          <div className="mt-6 max-w-[60ch] space-y-5 text-ink-2">
            {about.bio.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          <p className="mt-4">
            <Link href={about.mountainLink.href} className="link-draw text-meta font-extrabold uppercase">
              {about.mountainLink.label}
            </Link>
          </p>
        </div>
      </div>

      <section aria-labelledby="experience" className="mt-16">
        <div className="grid gap-4 border-t-2 border-ink pt-6 md:grid-cols-12 md:gap-10">
          <h2 id="experience" className="text-meta uppercase text-ink-3 md:col-span-3">
            Experience
          </h2>
          <ol className="md:col-span-9">
            {about.experience.map((e) => (
              <li key={`${e.org}-${e.role}`} className="grid gap-2 border-b border-rule-light py-5 md:grid-cols-[10rem_1fr]">
                <p className="text-meta uppercase text-ink-3">{e.when}</p>
                <div>
                  <p className="font-extrabold">
                    {e.role} · {e.org}
                  </p>
                  <p className="text-meta uppercase text-ink-3">{e.place}</p>
                  <p className="mt-2 max-w-[60ch] text-ink-2">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="education" className="mt-16">
        <div className="grid gap-4 border-t-2 border-ink pt-6 md:grid-cols-12 md:gap-10">
          <h2 id="education" className="text-meta uppercase text-ink-3 md:col-span-3">
            Education
          </h2>
          <div className="md:col-span-9">
            <p className="font-extrabold">{about.education.school}</p>
            <p className="text-ink-2">{about.education.degree}</p>
            <p className="text-meta uppercase text-ink-3">{about.education.when}</p>
            <p className="mt-2 max-w-[60ch] text-ink-2">{about.education.note}</p>
            <p className="mt-6 text-meta uppercase text-ink-3">Certifications</p>
            <ul className="mt-2 space-y-1">
              {about.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="leadership" className="mt-16">
        <div className="grid gap-4 border-t-2 border-ink pt-6 md:grid-cols-12 md:gap-10">
          <h2 id="leadership" className="text-meta uppercase text-ink-3 md:col-span-3">
            Leadership &amp; awards
          </h2>
          <ol className="md:col-span-9">
            {about.leadership.map((e) => (
              <li key={`${e.org}-${e.role}`} className="grid gap-2 border-b border-rule-light py-5 md:grid-cols-[10rem_1fr]">
                <p className="text-meta uppercase text-ink-3">{e.when}</p>
                <div>
                  <p className="font-extrabold">{e.role}</p>
                  <p className="text-meta uppercase text-ink-3">{e.org}</p>
                  <p className="mt-2 max-w-[60ch] text-ink-2">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="skills" className="mt-16">
        <div className="grid gap-4 border-t-2 border-ink pt-6 md:grid-cols-12 md:gap-10">
          <h2 id="skills" className="text-meta uppercase text-ink-3 md:col-span-3">
            Skills
          </h2>
          <dl className="grid gap-6 md:col-span-9 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(about.skills).map(([group, items]) => (
              <div key={group}>
                <dt className="text-meta uppercase text-ink-3">{group}</dt>
                <dd className="mt-2 space-y-1">
                  {items.map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </article>
  );
}

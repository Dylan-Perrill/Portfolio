import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { Quiz } from "@/components/Quiz";
import { mountain } from "@/content/mountain";

export const metadata: Metadata = {
  title: mountain.title,
  description: "A small quiz about the one mountain Dylan has climbed.",
};

export default function MountainPage() {
  return (
    <article className="container-x pt-10 md:pt-16">
      <p className="text-meta uppercase text-ink-3">Easter egg</p>
      <h1 className="type-display-sm mt-3">{mountain.title}</h1>
      <p className="mt-6 max-w-[60ch] text-ink-2">{mountain.intro}</p>

      <div className="mt-10 max-w-3xl">
        <Quiz title="Three questions" items={mountain.quiz} />
      </div>

      <section aria-labelledby="photos" className="mt-16">
        <h2 id="photos" className="border-t-2 border-ink pt-6 text-meta uppercase text-ink-3">
          Photos
        </h2>
        <div className="mt-6">
          <Gallery images={mountain.photos} />
        </div>
      </section>
    </article>
  );
}

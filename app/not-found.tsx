import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x pt-14 md:pt-24">
      <p className="text-meta uppercase text-ink-3">404</p>
      <h1 className="type-display mt-3">
        Nothing <span className="text-blue">here.</span>
      </h1>
      <p className="mt-8 max-w-[52ch] text-ink-2">{"That page doesn't exist. The work does."}</p>
      <p className="mt-6">
        <Link href="/" className="link-draw text-meta font-extrabold uppercase">
          ← Back to the front page
        </Link>
      </p>
    </section>
  );
}

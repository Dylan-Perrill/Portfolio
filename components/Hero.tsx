import { site } from "@/content/site";
import { StatusLine } from "@/components/StatusLine";

export function Hero() {
  return (
    <section className="container-x pt-14 pb-16 md:pt-24 md:pb-24" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="type-display">
        <span className="hero-line block">{site.headline.line1}</span>
        <span className="hero-line block" style={{ animationDelay: "60ms" }}>
          <span className="text-blue">{site.headline.line2Accent}</span> {site.headline.line2Rest}
        </span>
      </h1>
      <p className="mt-8 max-w-[52ch] text-ink-2">{site.sub}</p>
      <div className="mt-5 min-h-4">
        <StatusLine />
      </div>
    </section>
  );
}

import { site } from "@/content/site";

export default function Home() {
  return (
    <section className="container-x pt-14 md:pt-24">
      <h1 className="type-display">
        <span className="hero-line block">{site.headline.line1}</span>
        <span className="hero-line block" style={{ animationDelay: "60ms" }}>
          <span className="text-blue">{site.headline.line2Accent}</span> {site.headline.line2Rest}
        </span>
      </h1>
    </section>
  );
}

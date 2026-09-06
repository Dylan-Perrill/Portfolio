/** Production topology of entrepreNewer. Inline SVG so it inherits the page font and prints crisp. */
export function ArchitectureDiagram() {
  const box = "fill-paper stroke-ink";
  const label = "fill-ink text-[15px] font-extrabold uppercase";
  const small = "fill-ink-3 text-[12px] uppercase";
  const arrow = "stroke-blue";
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 880 340"
        role="img"
        aria-labelledby="arch-title"
        className="block w-full border-[1.5px] border-ink"
        style={{ fontFamily: "inherit", letterSpacing: "0.04em" }}
      >
        <title id="arch-title">
          Expo web on Vercel talks to a Fastify API on a Raspberry Pi through a Cloudflare Tunnel; the API uses Supabase
          for auth and Postgres with pgvector, calls Anthropic and OpenAI, and is deployed by a GitHub Actions runner on
          the Pi.
        </title>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="fill-blue" />
          </marker>
        </defs>

        {/* Web */}
        <rect x="30" y="40" width="200" height="90" strokeWidth="2" className={box} />
        <text x="50" y="76" className={label}>Expo web</text>
        <text x="50" y="100" className={small}>static export · Vercel</text>

        {/* Tunnel */}
        <rect x="300" y="55" width="150" height="60" strokeWidth="2" strokeDasharray="6 4" className={box} />
        <text x="318" y="82" className={label}>Tunnel</text>
        <text x="318" y="102" className={small}>Cloudflare</text>

        {/* API */}
        <rect x="520" y="40" width="330" height="90" strokeWidth="2" className={box} />
        <text x="540" y="76" className={label}>API · Fastify 5 + Prisma</text>
        <text x="540" y="100" className={small}>Raspberry Pi 5 · api.neurship.dev</text>

        {/* Supabase */}
        <rect x="520" y="200" width="160" height="100" strokeWidth="2" className={box} />
        <text x="538" y="234" className={label}>Supabase</text>
        <text x="538" y="256" className={small}>Auth · Postgres</text>
        <text x="538" y="276" className={small}>pgvector · HNSW</text>

        {/* AI */}
        <rect x="710" y="200" width="140" height="100" strokeWidth="2" className={box} />
        <text x="728" y="234" className={label}>AI</text>
        <text x="728" y="256" className={small}>Anthropic</text>
        <text x="728" y="276" className={small}>OpenAI embeddings</text>

        {/* Runner */}
        <rect x="300" y="200" width="150" height="100" strokeWidth="2" className={box} />
        <text x="318" y="234" className={label}>Deploys</text>
        <text x="318" y="256" className={small}>GitHub Actions</text>
        <text x="318" y="276" className={small}>runner on the Pi</text>

        {/* Arrows */}
        <line x1="230" y1="85" x2="298" y2="85" strokeWidth="2.5" markerEnd="url(#arrow)" className={arrow} />
        <line x1="450" y1="85" x2="518" y2="85" strokeWidth="2.5" markerEnd="url(#arrow)" className={arrow} />
        <line x1="600" y1="130" x2="600" y2="198" strokeWidth="2.5" markerEnd="url(#arrow)" className={arrow} />
        <line x1="780" y1="130" x2="780" y2="198" strokeWidth="2.5" markerEnd="url(#arrow)" className={arrow} />
        <line x1="450" y1="215" x2="518" y2="135" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#arrow)" className={arrow} />
        <text x="300" y="185" className={small}>push to main</text>
      </svg>
      <figcaption className="mt-2 text-meta uppercase text-ink-3">Production topology</figcaption>
    </figure>
  );
}

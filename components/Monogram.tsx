/** Renders in place of the headshot until public/about/headshot.jpg exists. */
export function Monogram() {
  return (
    <div
      role="img"
      aria-label="Monogram placeholder for Dylan Perrill's photo"
      className="flex aspect-[4/5] w-full items-end border-[1.5px] border-ink bg-ink p-6"
    >
      <span className="type-display text-paper">DP</span>
    </div>
  );
}

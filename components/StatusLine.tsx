import { site } from "@/content/site";
import { fetchHealth } from "@/lib/status";

/** Server component. Renders the "API online" line only when the health check passes. */
export async function StatusLine() {
  const ok = await fetchHealth(site.status.endpoint);
  if (!ok) return null;
  return (
    <p className="flex items-center gap-2 text-meta uppercase text-ink-3">
      <span aria-hidden="true" className="inline-block size-1.5 bg-blue" />
      <span>
        {site.status.label} · online
      </span>
    </p>
  );
}

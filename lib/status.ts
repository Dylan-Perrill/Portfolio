/**
 * Health-check logic for the homepage status line.
 * The line renders only on a 200 + {status:"ok"}; every other outcome is "say nothing".
 */
export const HEALTH_TIMEOUT_MS = 3000;
export const HEALTH_REVALIDATE_SECONDS = 300;

export function parseHealth(status: number, body: unknown): boolean {
  if (status !== 200) return false;
  if (typeof body !== "object" || body === null) return false;
  return (body as { status?: unknown }).status === "ok";
}

export async function fetchHealth(
  endpoint: string,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  try {
    const res = await fetchImpl(endpoint, {
      signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS),
      next: { revalidate: HEALTH_REVALIDATE_SECONDS },
    });
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      return false;
    }
    return parseHealth(res.status, body);
  } catch {
    return false;
  }
}

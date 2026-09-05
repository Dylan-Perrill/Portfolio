import { describe, expect, it } from "vitest";
import { fetchHealth, parseHealth } from "@/lib/status";

describe("parseHealth", () => {
  it("is true only for 200 + {status:'ok'}", () => {
    expect(parseHealth(200, { status: "ok" })).toBe(true);
  });
  it("rejects non-200", () => {
    expect(parseHealth(500, { status: "ok" })).toBe(false);
    expect(parseHealth(301, { status: "ok" })).toBe(false);
  });
  it("rejects other statuses and malformed bodies", () => {
    expect(parseHealth(200, { status: "degraded" })).toBe(false);
    expect(parseHealth(200, { ok: true })).toBe(false);
    expect(parseHealth(200, null)).toBe(false);
    expect(parseHealth(200, "ok")).toBe(false);
  });
});

function fakeFetch(status: number, body: unknown, opts: { throwOnJson?: boolean; reject?: boolean } = {}) {
  const impl = async () => {
    if (opts.reject) throw new Error("network down");
    return {
      status,
      json: async () => {
        if (opts.throwOnJson) throw new SyntaxError("not json");
        return body;
      },
    } as unknown as Response;
  };
  return impl as unknown as typeof fetch;
}

describe("fetchHealth", () => {
  const url = "https://example.test/health";
  it("returns true for a healthy response", async () => {
    expect(await fetchHealth(url, fakeFetch(200, { status: "ok" }))).toBe(true);
  });
  it("returns false for non-200", async () => {
    expect(await fetchHealth(url, fakeFetch(503, { status: "ok" }))).toBe(false);
  });
  it("returns false when the body is not JSON", async () => {
    expect(await fetchHealth(url, fakeFetch(200, null, { throwOnJson: true }))).toBe(false);
  });
  it("returns false when fetch throws (timeout, DNS, refused)", async () => {
    expect(await fetchHealth(url, fakeFetch(200, null, { reject: true }))).toBe(false);
  });
  it("passes a 3s timeout signal and a 300s revalidate hint", async () => {
    let seen: RequestInit | undefined;
    const spy = (async (_url: RequestInfo | URL, init?: RequestInit) => {
      seen = init;
      return { status: 200, json: async () => ({ status: "ok" }) } as unknown as Response;
    }) as unknown as typeof fetch;
    await fetchHealth(url, spy);
    expect(seen?.signal).toBeInstanceOf(AbortSignal);
    expect((seen as { next?: { revalidate?: number } } | undefined)?.next?.revalidate).toBe(300);
  });
});

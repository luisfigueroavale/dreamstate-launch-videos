export const fmtInt = (n: number | null | undefined) => (n === null || n === undefined ? "Not captured" : n.toLocaleString("en-US"));

export function fmtCompact(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1)}K`;
  return String(n);
}

export const fmtRate = (r: number | null | undefined) => (r === null || r === undefined ? "n/a" : `${(r * 100).toFixed(2)}%`);

export function fmtDuration(s: number | null | undefined): string {
  if (s === null || s === undefined) return "n/a";
  const t = Math.round(s);
  const m = Math.floor(t / 60);
  return m ? `${m}:${String(t % 60).padStart(2, "0")}` : `0:${String(t).padStart(2, "0")}`;
}

export function fmtDate(d: string | null | undefined): string {
  if (!d) return "Date not listed";
  const [y, m, day] = d.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export const SCOPE_LABEL: Record<string, string> = {
  "individual-post": "Per post",
  "listing-snapshot": "Gallery listing",
  "owner-analytics": "Owner analytics",
};

export const SOURCE_LABEL: Record<string, string> = {
  "x-public-counts": "Public X counts",
  "public-gallery-listing": "Public gallery listing",
  "x-read-tool": "X read tool",
  "dreamstate-analytics": "Dreamstate analytics",
};

export const VIEW_BANDS = [
  { id: "10m", label: "10M and up", min: 1e7, max: Infinity },
  { id: "1m", label: "1M to 10M", min: 1e6, max: 1e7 },
  { id: "100k", label: "100K to 1M", min: 1e5, max: 1e6 },
  { id: "lt100k", label: "Under 100K", min: 0, max: 1e5 },
  { id: "none", label: "No count", min: -1, max: -1 },
] as const;

/** A stable two-stop gradient per company, from the two brand blues and nearby tints. */
export function tileHue(seed: string): number {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 4;
}

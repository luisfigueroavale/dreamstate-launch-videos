import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type Snapshot = {
  retrieved_on: string;
  scope: "individual-post" | "listing-snapshot" | "owner-analytics";
  source: string;
  views: number | null;
  likes: number | null;
  reposts: number | null;
  replies: number | null;
  bookmarks: number | null;
};

export type Launch = {
  id: string;
  /** File name without .json, also the page path: <company-slug>-<id>. */
  slug: string;
  company: string | null;
  product: string | null;
  title: string;
  posted_by: string;
  owner: "third-party" | "dreamstate";
  category: string;
  kind: "launch" | "raise" | "feature" | "demo";
  kind_basis: string;
  post_url: string;
  post_date: string | null;
  duration_seconds: number | null;
  excerpt: string | null;
  hook_family: string;
  hook_basis: string;
  scene_cuts: { start: number; end: number }[];
  structure?: { start: number; end: number; beat: string; note?: string }[];
  snapshots: Snapshot[];
  transcript_status: string;
  rights: string;
  analysis: string;
};

export type HookFamily = { id: string; name: string; summary: string; watch_for: string; count: number };
export type Category = { id: string; name: string; count: number };
export type Structure = {
  id: string;
  seconds: number;
  name: string;
  min: number;
  max: number;
  beats: { start: number; end: number; beat: string }[];
};

/** The slim shape the gallery ships to the browser. like_rate is computed, never stored. */
export type Card = {
  id: string;
  slug: string;
  company: string | null;
  product: string | null;
  postedBy: string;
  title: string;
  category: string;
  kind: Launch["kind"];
  hook: string;
  date: string | null;
  year: string | null;
  duration: number | null;
  views: number | null;
  likes: number | null;
  likeRate: number | null;
  scope: Snapshot["scope"] | null;
  excerpt: string | null;
};

const dataDir = join(process.cwd(), "data");
const readJson = <T,>(p: string): T => JSON.parse(readFileSync(join(dataDir, p), "utf8")) as T;

let cache: Launch[] | null = null;
export function getLaunches(): Launch[] {
  if (!cache) {
    cache = readdirSync(join(dataDir, "launches"))
      .filter((f) => f.endsWith(".json"))
      .map((f) => ({ ...readJson<Launch>(join("launches", f)), slug: f.replace(/\.json$/, "") }));
  }
  return cache;
}
export const getLaunch = (slug: string) => getLaunches().find((l) => l.slug === slug);
export const companyLabel = (l: { company: string | null }) => l.company ?? "Company not named";
export const getHooks = () => readJson<{ basis: string; families: HookFamily[] }>("hooks.json");
export const getCategories = () => readJson<{ categories: Category[] }>("categories.json").categories;
export const getStructures = () => readJson<{ note: string; structures: Structure[] }>("structures.json");

/** Prefer the per-post count over a listing snapshot. Never mix scopes. */
export function primarySnapshot(l: Launch): Snapshot | null {
  return l.snapshots.find((s) => s.scope === "individual-post") ?? l.snapshots[0] ?? null;
}

export function likeRate(s: Snapshot | null): number | null {
  if (!s || !s.views || s.likes === null) return null;
  return s.likes / s.views;
}

export function toCard(l: Launch): Card {
  const s = primarySnapshot(l);
  return {
    id: l.id,
    slug: l.slug,
    company: l.company,
    product: l.product,
    postedBy: l.posted_by,
    title: l.title,
    category: l.category,
    kind: l.kind,
    hook: l.hook_family,
    date: l.post_date,
    year: l.post_date ? l.post_date.slice(0, 4) : null,
    duration: l.duration_seconds,
    views: s?.views ?? null,
    likes: s?.likes ?? null,
    likeRate: likeRate(s),
    scope: s?.scope ?? null,
    excerpt: l.excerpt,
  };
}

export function lastRetrieved(): string {
  return getLaunches()
    .flatMap((l) => l.snapshots.map((s) => s.retrieved_on))
    .sort()
    .at(-1) ?? "unknown";
}

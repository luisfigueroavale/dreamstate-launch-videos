"use client";
import { useMemo, useState } from "react";
import type { Card, Category, HookFamily } from "@/lib/data";
import { VIEW_BANDS } from "@/lib/format";
import LaunchCard from "./LaunchCard";

type Sort = "views" | "likes" | "likeRate" | "date" | "company";
const SORTS: { id: Sort; label: string }[] = [
  { id: "views", label: "Most views" },
  { id: "likes", label: "Most likes" },
  { id: "likeRate", label: "Highest like rate" },
  { id: "date", label: "Newest" },
  { id: "company", label: "Company A to Z" },
];
const KINDS = ["launch", "raise", "feature", "demo"] as const;

export default function Gallery({ cards, hooks, categories }: { cards: Card[]; hooks: HookFamily[]; categories: Category[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [hook, setHook] = useState("all");
  const [band, setBand] = useState("all");
  const [year, setYear] = useState("all");
  const [kind, setKind] = useState("all");
  const [sort, setSort] = useState<Sort>("views");

  const years = useMemo(() => [...new Set(cards.map((c) => c.year).filter(Boolean) as string[])].sort().reverse(), [cards]);
  const hookName = useMemo(() => Object.fromEntries(hooks.map((h) => [h.id, h.name])), [hooks]);
  const catName = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.name])), [categories]);
  const kindsPresent = KINDS.filter((k) => cards.some((c) => c.kind === k));

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const b = VIEW_BANDS.find((x) => x.id === band);
    const list = cards.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (hook !== "all" && c.hook !== hook) return false;
      if (year !== "all" && c.year !== year) return false;
      if (kind !== "all" && c.kind !== kind) return false;
      if (b) {
        if (b.id === "none") {
          if (c.views !== null) return false;
        } else if (c.views === null || c.views < b.min || c.views >= b.max) return false;
      }
      if (needle && !`${c.company ?? ""} ${c.product ?? ""} ${c.postedBy} ${c.title} ${c.excerpt ?? ""}`.toLowerCase().includes(needle)) return false;
      return true;
    });
    // Nulls always sort last. A missing number is not zero.
    if (sort === "company")
      return list.sort((a, z) => {
        if (a.company === null || z.company === null) return a.company === null ? (z.company === null ? 0 : 1) : -1;
        return a.company.localeCompare(z.company, "en", { sensitivity: "base" });
      });
    const key = (c: Card): number | null => (sort === "date" ? (c.date ? Date.parse(c.date) : null) : c[sort]);
    return list.sort((a, z) => {
      const x = key(a), y = key(z);
      if (x === null && y === null) return (a.company ?? "").localeCompare(z.company ?? "");
      if (x === null) return 1;
      if (y === null) return -1;
      return y - x;
    });
  }, [cards, q, category, hook, band, year, kind, sort]);

  const reset = () => {
    setQ(""); setCategory("all"); setHook("all"); setBand("all"); setYear("all"); setKind("all"); setSort("views");
  };

  return (
    <section className="wrap">
      <div className="panel">
        <div className="filters">
          <div className="field">
            <label htmlFor="q">Search</label>
            <input id="q" placeholder="Company, product, handle, or words from the post" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="cat">Category</label>
            <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.count})</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="hook">Hook family</label>
            <select id="hook" value={hook} onChange={(e) => setHook(e.target.value)}>
              <option value="all">All</option>
              {hooks.map((h) => (
                <option key={h.id} value={h.id}>{h.name} ({h.count})</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="band">Views</label>
            <select id="band" value={band} onChange={(e) => setBand(e.target.value)}>
              <option value="all">Any</option>
              {VIEW_BANDS.map((b) => (
                <option key={b.id} value={b.id}>{b.label}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="year">Year</label>
            <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="all">Any</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="kind">Kind</label>
            <select id="kind" value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="all">Any</option>
              {kindsPresent.map((k) => (
                <option key={k} value={k}>{k[0].toUpperCase() + k.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="result-bar">
          <span>
            Showing <b>{shown.length}</b> of {cards.length} launches. Like rate is likes divided by views, computed here.
          </span>
          <button className="reset" onClick={reset}>Reset filters</button>
        </div>
      </div>
      <div className="grid">
        {shown.map((c) => (
          <LaunchCard key={c.id} c={c} hookName={hookName[c.hook] ?? c.hook} categoryName={catName[c.category] ?? c.category} />
        ))}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getLaunches, getStructures, primarySnapshot, companyLabel } from "@/lib/data";
import { fmtCompact, fmtDuration } from "@/lib/format";

export const metadata: Metadata = { title: "Structures" };

const SHADES = ["#12b2f8", "#2f9af8", "#4382f8", "#4e63f9", "#3f50d6", "#6a7cff"];

export default function StructuresPage() {
  const { note, structures } = getStructures();
  const launches = getLaunches();
  return (
    <>
      <section className="hero" style={{ paddingBottom: 8 }}>
        <div className="wrap">
          <span className="kicker">Timed structures</span>
          <h1>
            Beat maps for <span className="grad">15 to 120 seconds</span>
          </h1>
          <p className="lede">{note}</p>
        </div>
      </section>
      <section className="wrap" style={{ display: "grid", gap: 18, margin: "28px auto 64px" }}>
        {structures.map((s) => {
          const inBand = launches
            .filter((l) => l.duration_seconds !== null && l.duration_seconds > s.min && l.duration_seconds <= s.max)
            .map((l) => ({ l, v: primarySnapshot(l)?.views ?? null }))
            .sort((a, b) => (b.v ?? -1) - (a.v ?? -1));
          const cutLaunches = inBand.filter(({ l }) => l.scene_cuts.length > 1);
          const avgShot = cutLaunches.length
            ? cutLaunches.reduce((n, { l }) => n + (l.duration_seconds ?? 0) / l.scene_cuts.length, 0) / cutLaunches.length
            : null;
          return (
            <article className="box" id={`s${s.id}`} key={s.id} style={{ marginTop: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "baseline" }}>
                <h2 style={{ fontSize: 26 }}>{s.name}</h2>
                <span className="kicker">
                  {inBand.length} launches between {s.min} and {s.max} seconds
                  {avgShot !== null && <> · avg shot {avgShot.toFixed(1)}s in {cutLaunches.length} scanned</>}
                </span>
              </div>
              <div className="beats">
                {s.beats.map((b, i) => (
                  <div key={i} style={{ flex: b.end - b.start, background: SHADES[i % SHADES.length] }} title={`${b.start} to ${b.end}s: ${b.beat}`}>
                    {b.end - b.start >= s.seconds / 9 ? b.beat : ""}
                  </div>
                ))}
              </div>
              <table>
                <thead>
                  <tr><th>Seconds</th><th>Beat</th></tr>
                </thead>
                <tbody>
                  {s.beats.map((b, i) => (
                    <tr key={i}><td className="num mono">{b.start} to {b.end}</td><td>{b.beat}</td></tr>
                  ))}
                </tbody>
              </table>
              {inBand.length > 0 && (
                <div className="mini-list" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", display: "grid" }}>
                  {inBand.slice(0, 6).map(({ l, v }) => (
                    <Link key={l.id} href={`/launches/${l.slug}/`}>
                      <span>{companyLabel(l)}</span>
                      <span>{fmtDuration(l.duration_seconds)} · {fmtCompact(v)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </>
  );
}

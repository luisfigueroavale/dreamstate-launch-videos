import type { Metadata } from "next";
import Link from "next/link";
import { getHooks, getLaunches, primarySnapshot, likeRate } from "@/lib/data";
import { fmtCompact, fmtRate } from "@/lib/format";

export const metadata: Metadata = { title: "Hooks" };

export default function HooksPage() {
  const { basis, families } = getHooks();
  const launches = getLaunches();
  const max = Math.max(...families.map((f) => f.count));
  return (
    <>
      <section className="hero" style={{ paddingBottom: 8 }}>
        <div className="wrap">
          <span className="kicker">Hook families</span>
          <h1>
            The first five seconds, <span className="grad">sorted</span>
          </h1>
          <p className="lede">
            Each launch is tagged with the family its opening belongs to. {basis} Treat them as leads to watch, not as proof that a hook caused
            the views.
          </p>
        </div>
      </section>
      <section className="wrap cols">
        {families.map((f) => {
          const rows = launches
            .filter((l) => l.hook_family === f.id)
            .map((l) => ({ l, s: primarySnapshot(l) }))
            .filter((x) => x.s?.views)
            .sort((a, b) => (b.s!.views ?? 0) - (a.s!.views ?? 0));
          const rates = rows.map((r) => likeRate(r.s)).filter((x): x is number => x !== null).sort((a, b) => a - b);
          const median = rates.length ? rates[Math.floor(rates.length / 2)] : null;
          return (
            <article className="box" id={f.id} key={f.id} style={{ marginTop: 0 }}>
              <span className="kicker">{f.count} launches</span>
              <h2 style={{ fontSize: 24, margin: "10px 0 8px" }}>{f.name}</h2>
              <p style={{ margin: 0 }}>{f.summary}</p>
              <div className="bar"><i style={{ width: `${(f.count / max) * 100}%` }} /></div>
              <p className="note" style={{ marginTop: 6 }}>
                <b>Watch for:</b> {f.watch_for} Median like rate in this family: {fmtRate(median)}.
              </p>
              <div className="mini-list">
                {rows.slice(0, 5).map(({ l, s }) => (
                  <Link key={l.id} href={`/launches/${l.slug}/`}>
                    <span>{l.company ?? l.product ?? l.posted_by}</span>
                    <span>{fmtCompact(s!.views)} views</span>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}

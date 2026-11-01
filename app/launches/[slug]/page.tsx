import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import XEmbed from "@/components/XEmbed";
import { companyLabel, getCategories, getHooks, getLaunch, getLaunches, getStructures, likeRate } from "@/lib/data";
import { fmtDate, fmtDuration, fmtInt, fmtRate, SCOPE_LABEL, SOURCE_LABEL } from "@/lib/format";

export const dynamicParams = false;
export function generateStaticParams() {
  return getLaunches().map((l) => ({ slug: l.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getLaunch((await params).slug);
  return { title: l ? `${companyLabel(l)}: ${l.title}` : "Launch" };
}

const BASIS: Record<string, string> = {
  "inferred-from-post": "Inferred from the post text",
  "observed-in-video": "Observed in the video",
  "not-labeled": "Not labeled yet",
  "owner-supplied": "Supplied by the owner",
};

export default async function LaunchPage({ params }: Props) {
  const l = getLaunch((await params).slug);
  if (!l) notFound();
  const hook = getHooks().families.find((h) => h.id === l.hook_family);
  const cat = getCategories().find((c) => c.id === l.category);
  const structure = getStructures().structures.find((s) => l.duration_seconds !== null && l.duration_seconds > s.min && l.duration_seconds <= s.max);
  const dur = l.duration_seconds ?? 0;

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link href="/">Gallery</Link> / {companyLabel(l)}
      </div>
      <section className="detail-head">
        <span className="kicker">{cat?.name ?? l.category} · {l.kind}</span>
        <h1 style={{ fontSize: "clamp(32px, 4.4vw, 52px)" }}>
          {l.company ?? "Company not named"} <span className="grad">{l.kind === "raise" ? "raise" : "launch"}</span>
        </h1>
        <p className="lede" style={{ margin: 0 }}>
          {l.title}
          {l.product && <> · Product: <b>{l.product}</b></>} · Posted by{" "}
          <a href={`https://x.com/${l.posted_by.slice(1)}`} target="_blank" rel="noopener noreferrer">{l.posted_by}</a>
        </p>
        <div className="btn-row">
          <a className="btn primary" href={l.post_url} target="_blank" rel="noopener noreferrer">Watch on X</a>
          {hook && <Link className="btn" href={`/hooks/#${hook.id}`}>Hook: {hook.name}</Link>}
          {structure && <Link className="btn" href={`/structures/#s${structure.id}`}>{structure.name}</Link>}
        </div>
      </section>

      <div className="detail">
        <div>
          {l.excerpt && (
            <div className="box">
              <h3>From the post</h3>
              <blockquote className="quote">&ldquo;{l.excerpt}&rdquo;</blockquote>
              <p className="note">A short excerpt of the public post, 18 words at most. Read the full post on X.</p>
            </div>
          )}
          <div className="box">
            <h3>Our analysis</h3>
            <p style={{ margin: 0 }}>{l.analysis}</p>
          </div>
          <div className="box">
            <h3>Watch</h3>
            <XEmbed url={l.post_url} />
          </div>
          {l.scene_cuts.length > 1 && dur > 0 && (
            <div className="box">
              <h3>Shot rhythm</h3>
              <div className="timeline" aria-label={`${l.scene_cuts.length} shots`}>
                {l.scene_cuts.map((c, i) => (
                  <i
                    key={i}
                    style={{
                      left: `${(c.start / dur) * 100}%`,
                      width: `${((c.end - c.start) / dur) * 100}%`,
                      background: i % 2 ? "rgba(78,99,249,0.75)" : "rgba(18,178,248,0.75)",
                    }}
                  />
                ))}
              </div>
              <p className="note">
                {l.scene_cuts.length} shots across {fmtDuration(dur)}, from automated scene detection. Each block is one shot.
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="box">
            <h3>Metrics</h3>
            {l.snapshots.length === 0 ? (
              <p className="muted" style={{ margin: 0 }}>No public counts were captured for this post.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Scope</th>
                    <th>Views</th>
                    <th>Likes</th>
                    <th>Like rate</th>
                  </tr>
                </thead>
                <tbody>
                  {l.snapshots.map((s, i) => (
                    <tr key={i}>
                      <td>
                        {SCOPE_LABEL[s.scope] ?? s.scope}
                        <div className="note" style={{ margin: 0 }}>{SOURCE_LABEL[s.source] ?? s.source}, read {s.retrieved_on}</div>
                      </td>
                      <td className="num">{fmtInt(s.views)}</td>
                      <td className="num">{fmtInt(s.likes)}</td>
                      <td className="num">{fmtRate(likeRate(s))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {l.snapshots.length > 0 && (
              <table style={{ marginTop: 14 }}>
                <thead>
                  <tr>
                    <th>Scope</th>
                    <th>Reposts</th>
                    <th>Replies</th>
                    <th>Bookmarks</th>
                  </tr>
                </thead>
                <tbody>
                  {l.snapshots.map((s, i) => (
                    <tr key={i}>
                      <td>{SCOPE_LABEL[s.scope] ?? s.scope}</td>
                      <td className="num">{fmtInt(s.reposts)}</td>
                      <td className="num">{fmtInt(s.replies)}</td>
                      <td className="num">{fmtInt(s.bookmarks)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <p className="note">
              Reported public counts, not verified reach. Per post and listing numbers come from different reads, so they differ a little. They are
              never added together.
            </p>
          </div>
          <div className="box">
            <h3>Record</h3>
            <dl className="facts">
              <div><dt>Company</dt><dd>{companyLabel(l)}</dd></div>
              <div><dt>Product</dt><dd>{l.product ?? "Same as company"}</dd></div>
              <div><dt>Posted by</dt><dd>{l.posted_by}</dd></div>
              <div><dt>Posted</dt><dd>{fmtDate(l.post_date)}</dd></div>
              <div><dt>Length</dt><dd>{fmtDuration(l.duration_seconds)}</dd></div>
              <div><dt>Hook</dt><dd>{hook?.name ?? l.hook_family}</dd></div>
              <div><dt>Hook basis</dt><dd>{BASIS[l.hook_basis] ?? l.hook_basis}</dd></div>
              <div><dt>Kind basis</dt><dd>{BASIS[l.kind_basis] ?? l.kind_basis}</dd></div>
              <div><dt>Transcript</dt><dd>{l.transcript_status === "none" ? "Not published here" : l.transcript_status}</dd></div>
              <div><dt>Rights</dt><dd>Link and short excerpt only</dd></div>
              <div><dt>Record id</dt><dd className="mono" style={{ fontSize: 12 }}>{l.id}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Card } from "@/lib/data";
import { fmtCompact, fmtDuration, fmtRate, tileHue } from "@/lib/format";

export default function LaunchCard({ c, hookName, categoryName }: { c: Card; hookName: string; categoryName: string }) {
  return (
    <Link href={`/launches/${c.slug}/`} className="card">
      <div className={`tile h${tileHue(c.company ?? c.id)}`}>
        <div className="tile-top">
          <span className="chip">{c.kind}</span>
          <span className="chip">{fmtDuration(c.duration)}</span>
        </div>
        <div>
          <div className="tile-label">Company</div>
          <div className={`tile-name${c.company ? "" : " unknown"}`}>{c.company ?? "Not named"}</div>
          {c.product && <div className="tile-product">{c.product}</div>}
        </div>
      </div>
      <div className="card-body">
        <div className="tags">
          <span className="tag blue">{hookName}</span>
          <span className="tag">{categoryName}</span>
          {c.year && <span className="tag">{c.year}</span>}
        </div>
        <div className="card-title">{c.title}</div>
        <div className="card-by">Posted by {c.postedBy}</div>
        {c.excerpt && <div className="card-ex">&ldquo;{c.excerpt}&rdquo;</div>}
        <div className="metrics">
          <div>
            <b>{fmtCompact(c.views)}</b>
            <span>views</span>
          </div>
          <div>
            <b>{fmtCompact(c.likes)}</b>
            <span>likes</span>
          </div>
          <div>
            <b>{fmtRate(c.likeRate)}</b>
            <span>like rate</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

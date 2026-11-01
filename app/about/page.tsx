import type { Metadata } from "next";
import { getLaunches, lastRetrieved } from "@/lib/data";

export const metadata: Metadata = { title: "Data notes" };

export default function AboutPage() {
  const n = getLaunches().length;
  return (
    <>
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <span className="kicker">Data notes</span>
          <h1>
            How to read <span className="grad">these numbers</span>
          </h1>
        </div>
      </section>
      <section className="wrap">
        <div className="prose">
          <p>
            This library holds {n} public launch videos posted on X. Each record links to the original post, quotes at most 18 words of it, and
            adds our own analysis. We do not host or hotlink any video file, and we do not publish transcripts or full post text.
          </p>
          <h2>Metrics</h2>
          <ul>
            <li>Every number is a reported public count, read on the date shown (latest read: {lastRetrieved()}). Counts keep moving after that.</li>
            <li>Per post counts come from the post itself. Listing counts come from a public gallery listing read the same day. They are separate reads and are never added together.</li>
            <li>A missing number stays missing. It is never shown as zero and never estimated.</li>
            <li>Like rate is likes divided by views, computed in the page. It is a rough signal of how much a video moved the people who saw it.</li>
            <li>There is no retention, watch time, click, or signup data for any video here.</li>
          </ul>
          <h2>Labels</h2>
          <ul>
            <li>Category, kind, and hook family are inferred from the post text, not from watching the video. Each record says which.</li>
            <li>Shot counts come from automated scene detection and only exist for a subset of launches.</li>
            <li>A hook label next to a big view count is a lead to study, not proof the hook caused the views.</li>
          </ul>
          <h2>Corrections</h2>
          <p>
            If a record is wrong or you own a video and want it removed, open an issue on the repository. New records go through the
            add-launch-record skill and the validator.
          </p>
        </div>
      </section>
    </>
  );
}

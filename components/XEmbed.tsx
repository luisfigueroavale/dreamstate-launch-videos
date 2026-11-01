"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    twttr?: { widgets?: { load: (el?: HTMLElement) => void } };
  }
}

/** Loads the X embed only when the reader asks. No video file is hotlinked. */
export default function XEmbed({ url }: { url: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!on || !ref.current) return;
    const el = ref.current;
    el.innerHTML = "";
    const bq = document.createElement("blockquote");
    bq.className = "twitter-tweet";
    bq.setAttribute("data-dnt", "true");
    const a = document.createElement("a");
    a.href = url.replace("https://x.com/", "https://twitter.com/");
    bq.appendChild(a);
    el.appendChild(bq);
    if (window.twttr?.widgets) window.twttr.widgets.load(el);
    else {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, [on, url]);

  return (
    <div className="embed-slot">
      {!on && (
        <div>
          <p className="muted" style={{ margin: "0 0 12px", fontSize: 14 }}>
            The video plays on X. Loading the embed contacts X.
          </p>
          <button className="btn" onClick={() => setOn(true)}>Load the X embed</button>
        </div>
      )}
      <div ref={ref} style={{ width: "100%", display: on ? "block" : "none" }} />
    </div>
  );
}

import Gallery from "@/components/Gallery";
import { getCategories, getHooks, getLaunches, lastRetrieved, toCard } from "@/lib/data";

export default function Home() {
  const launches = getLaunches();
  const cards = launches.map(toCard);
  const hooks = getHooks().families;
  const categories = getCategories();
  const counted = cards.filter((c) => c.views !== null);
  const million = counted.filter((c) => (c.views ?? 0) >= 1e6).length;
  const perPost = cards.filter((c) => c.scope === "individual-post").length;
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="kicker">Launch video library</span>
          <h1>
            What makes a startup <span className="grad">launch video</span> work
          </h1>
          <p className="lede">
            {launches.length} public launch videos with dated view and like counts, the hook each one opens with, and timed structures you can
            plan your own launch from. Every number shows where and when it was read.
          </p>
          <div className="stats">
            <div className="stat"><b>{launches.length}</b><span>launches</span></div>
            <div className="stat"><b>{million}</b><span>with 1M+ views</span></div>
            <div className="stat"><b>{perPost}</b><span>with per post counts</span></div>
            <div className="stat"><b>{lastRetrieved()}</b><span>counts read on</span></div>
          </div>
        </div>
      </section>
      <Gallery cards={cards} hooks={hooks} categories={categories} />
    </>
  );
}

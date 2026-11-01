# Dreamstate launch videos

A public library of launch videos from startups, with dated public metrics, hook and structure notes, and three agent skills for planning your own launch. Built by Dreamstate.

- **Gallery:** 282 launches posted on X. Filter by category, hook family, views, year, and kind. Sort by views, likes, like rate, or date.
- **Launch pages:** a link to the post (and an X embed you load on demand), a metrics table with the read date and scope, shot rhythm where we scanned it, and our analysis.
- **Hooks and structures:** the hook families the openings fall into, and timed beat maps for 15, 30, 60, 90, and 120 second cuts, each linked to real examples.

## Read the numbers carefully

- Every metric is a **reported public count** read on the date shown. Most were read on 2026-10-27. Counts keep moving after that.
- Two scopes exist. **Per post** counts come from the X post itself. **Listing** counts come from a public gallery listing read the same day. They are separate reads, shown side by side, and never added together.
- A missing number is `null` and shows as "Not captured". Nothing is estimated.
- **Like rate** is likes divided by views. It is computed in the page and not stored.
- There is no retention, watch time, click, or signup data for any video.
- Category, kind, and hook family are **inferred from the post text**, not from watching the video. Every record says how its labels were made.
- No Dreamstate launch is in the library yet. Ours will be added with counts read by a tool, marked `owner: dreamstate`.

## What is not here

- No video files. We link to the post. Nothing is hotlinked or rehosted.
- No thumbnails. Cards are typographic until we have rights to an image.
- No transcripts and no full post text. Each record quotes 18 words at most.

## Run it

```bash
npm install
npm run validate   # schema, writing rules, and banned content scan
npm run build      # static export to out/
npm run dev        # local preview at http://localhost:3000
```

Requires Node 20.9 or newer. CI runs validate and build on every pull request. It does not deploy.

## Data

```text
data/
  schema.json          JSON Schema for one launch record
  launches/<id>.json   one file per launch
  hooks.json           hook families with counts
  categories.json      categories with counts
  structures.json      timed beat maps
```

Record rules: a missing number is `null`, never 0. Snapshots are dated and keep their scope. A record with `owner: dreamstate` needs a snapshot that came from a tool.

## Skills

Plain markdown skills an agent can follow. Each one reads `docs/skill-frame.md`.

| Skill | What it does |
|---|---|
| `skills/plan-launch-video` | Brief, proof ledger, scored hooks, timed beats, capture list, and audit for a launch video. Same skill as in `dreamstate-linkedin-funnel`. |
| `skills/study-launch-videos` | Finds up to five library records that match a brief and returns their patterns in our own words. |
| `skills/add-launch-record` | Adds one launch from a public X link, or adds a new dated snapshot, then runs the validator. |

To use them with an agent, point it at the skill folder, for example: "Follow skills/plan-launch-video for our launch next week." `plan-launch-video` hands its beats to `write-video-script` and `make-launch-clip`, which live in `dreamstate-linkedin-funnel`.

## Corrections and removals

If a record is wrong, or you own a video and want it out, open an issue. We will fix or remove it.

## License

Code is MIT. See `LICENSE` for the data note.

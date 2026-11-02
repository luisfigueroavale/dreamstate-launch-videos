---
name: study-launch-videos
description: "Query the dreamstate-launch-videos library for launches comparable to one brief and return hook, structure, and proof patterns with their reported numbers, scope, and retrieval date. Also drafts a Dreamstate launch record after a post goes live. Use from plan-launch-video. It does not watch, download, rank by cause, or commit."
---
# Study launch videos

Find comparable launches in the library for one brief, and keep Dreamstate's own launch records honest.
Follow `docs/skill-frame.md`.

## Use when

- `plan-launch-video` asks for comparable launches by product type, proof type, and length.

- The owner posted a Dreamstate launch video and wants its record drafted for the library.

- Not for copying another company's script, and not for watching or downloading videos.

## Steps

1. Find the library checkout, or read it through GitHub read-only for comparables only, and report pending when it is missing (`references/library.md`).

2. Read the product type, proof type, and length from the brief (`references/match.md`).

3. Filter `data/launches/*.json` on those fields and keep at most five records (`references/match.md`).

4. Read each kept record and copy its snapshot numbers with value, scope, and retrieval date (`references/metrics.md`).

5. Write each pattern in your own words with its hook family and beat timing (`references/notes.md`).

6. Return the comparables block for the proof ledger, or say there are none (`references/notes.md`).

7. Draft a Dreamstate launch record in `data/launches/` only after the owner posted it, and only in a local checkout. Through GitHub alone, stop and ask for one (`references/record.md`).

8. Run the library validator and build, and hand the draft record to the owner (`references/record.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 7 | `visibility.analytics_query` | read | no |

X counts for a Dreamstate record come from the X read tool `get_posts_by_ids`, read-only.

## Stop rules

- Library missing means say `launch video library pending` and stop. Never fill in from memory.

- A missing number is null and reads as unknown. Never write it as zero.

- Never add a per-post number to an agency or campaign total, and never sum across records.

- A hook family is a label. Never say a hook, a length, or a structure caused a result.

- A Dreamstate record needs numbers from a tool read. Funding is not a metric and not proof.

- Return patterns, never copied narration or post text.

- A reported number is reported, not verified reach.

- Never name a library company in a draft meant for posting.

- Never refresh analytics, and never commit, push, or open a pull request. A drafted record waits for the owner's yes.

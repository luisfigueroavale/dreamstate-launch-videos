---
name: add-launch-record
description: "Add one launch video to the library, or refresh its counts, from a public X post link. Writes data/launches/<id>.json and runs the validator. It never invents a number, never copies a transcript, and never commits or pushes without the owner's yes."
---
# Add a launch record

Turn one public launch post into a schema valid record with a dated snapshot.
Follow `docs/skill-frame.md`.

## Use when

- The owner shares an X post link for a launch video, or asks to refresh the counts on an existing record.

- A Dreamstate launch went live and its numbers can be read with a tool.

- Not for downloading or hosting the video, and not for scraping a gallery in bulk.

## Steps

1. Normalize the link to `https://x.com/<handle>/status/<id>` and set the record id to `x-<id>` (`references/fields.md`).

2. If the record exists, add a new snapshot and change nothing else unless the owner asks (`references/snapshots.md`).

3. Read the post with a read tool the owner has connected. Capture the date, the video length, and the public counts (`references/snapshots.md`).

4. Fill company, title, category, kind, and hook family, and mark each label's basis honestly (`references/fields.md`).

5. Quote at most 18 words from the post as the excerpt, cut before any dash (`references/fields.md`).

6. Write the analysis in our own words from what you actually read or watched (`references/analysis.md`).

7. Run `npm run validate` and fix every error. Then run `npm run build`.

8. Show the owner the new file and stop. Committing, opening a pull request, and pushing each wait for the owner's yes.

## Dreamstate tools

None required. An X read tool, when connected, gives the counts.

## Stop rules

- Follow the skill-frame writing rules.

- A number you did not read today is `null`. Never 0, never an estimate, never a rounded figure from a third party's marketing page.

- Never store a full post, a transcript, or a video file URL. Link to the post only.

- A record with `owner: dreamstate` needs a snapshot from a tool (`x-read-tool` or `dreamstate-analytics`).

- Never name or credit a source the owner has asked to leave out.

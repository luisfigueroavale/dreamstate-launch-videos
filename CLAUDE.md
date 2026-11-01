# Agent contract

This repo is a public launch video library. Read `docs/skill-frame.md` before any skill.

- Run `npm run validate` and `npm run build` before you hand work back. Both must pass.
- One launch is one file, `data/launches/<company-slug>-<id>.json`, valid against `data/schema.json`.
- `company` is the business that launched, never the poster's personal name. Unknown is `null`.
- Start with `docs/start-here.md`. Field rules are in `docs/data-model.md`.
- Never invent a number. Missing is `null`.
- Never store full post text, transcripts, video file URLs, or images you have no rights to.
- Quote at most 18 words from a post.
- No em dash, en dash, or double hyphen in records or docs.
- Dreamstate branding only. Do not name or credit outside sources the owner has asked to leave out. The validator holds the list.
- Committing, pushing, opening a pull request, and deploying each need the owner's yes.

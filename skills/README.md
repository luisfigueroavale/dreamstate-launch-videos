# Skills

Plain markdown procedures an agent follows. Each skill is one folder with a `SKILL.md` and a `references/` folder. Every skill reads [`docs/skill-frame.md`](../docs/skill-frame.md) first.

| Skill | Use it to | Reads | Writes |
|---|---|---|---|
| [`plan-launch-video`](plan-launch-video/SKILL.md) | Plan a launch video from brief to audit | Your brief, `study-launch-videos` output | A plan in `drafts/launch-video/` of the funnel checkout, never in this repo |
| [`study-launch-videos`](study-launch-videos/SKILL.md) | Pull matching patterns from this library for one brief | `data/` | A short list in chat, or a draft Dreamstate record in `data/launches/` after the owner posted, never committed without a yes |
| [`add-launch-record`](add-launch-record/SKILL.md) | Add or refresh one record from a public X link | The post, `data/schema.json` | `data/launches/<company-slug>-<id>.json` |

## Naming

- Skill folders are lowercase verb first names: `plan-`, `study-`, `add-`.
- Reference files are lowercase nouns: `fields.md`, `snapshots.md`, `analysis.md`.
- Record files are `<company-slug>-<id>.json`.

`plan-launch-video` writes the launch read itself and hands the beats, the spoken lines, and the capture files to `make-launch-clip`, which lives in `dreamstate-linkedin-funnel`. `plan-launch-video` and `study-launch-videos` here are copies of the funnel versions. The funnel is the source, so change them there first.

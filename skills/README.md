# Skills

Plain markdown procedures an agent follows. Each skill is one folder with a `SKILL.md` and a `references/` folder. Every skill reads [`docs/skill-frame.md`](../docs/skill-frame.md) first.

| Skill | Use it to | Reads | Writes |
|---|---|---|---|
| [`plan-launch-video`](plan-launch-video/SKILL.md) | Plan a launch video from brief to audit | Your brief, `study-launch-videos` output | A plan in chat, nothing in the repo |
| [`study-launch-videos`](study-launch-videos/SKILL.md) | Pull matching patterns from this library for one brief | `data/` | A short list in chat |
| [`add-launch-record`](add-launch-record/SKILL.md) | Add or refresh one record from a public X link | The post, `data/schema.json` | `data/launches/<company-slug>-<id>.json` |

## Naming

- Skill folders are lowercase verb first names: `plan-`, `study-`, `add-`.
- Reference files are lowercase nouns: `fields.md`, `snapshots.md`, `analysis.md`.
- Record files are `<company-slug>-<id>.json`.

`plan-launch-video` hands its beats to `write-video-script` and `make-launch-clip`, which live in `dreamstate-linkedin-funnel`.

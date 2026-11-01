# Fields

See `data/schema.json` for types. Notes on the ones that need judgment:

| Field | Rule |
|---|---|
| `id` | `x-` plus the status id. A Dreamstate launch without an X post uses `ds-<slug>`. |
| `owner` | `dreamstate` only for our own launches. Everything else is `third-party`. |
| `category` | One id from `data/categories.json`. Use `unlabeled` when unsure. |
| `kind` | `launch`, `raise`, `feature`, or `demo`. A funding announcement is `raise` even if it shows a product. |
| `kind_basis`, `hook_basis` | `inferred-from-post` unless you watched the video (`observed-in-video`). Use `not-labeled` for a hook you could not judge. |
| `hook_family` | One id from `data/hooks.json`. Use `unclear` rather than guess. |
| `excerpt` | 18 words or fewer, verbatim from the post, no links. Cut at the first em dash, en dash, or double hyphen. `null` if nothing short fits. |
| `scene_cuts` | Only from an automated scene detection run on a file you are allowed to process. Otherwise an empty list. |
| `structure` | Optional. Only after watching, in our own words. |
| `transcript_status` | `none`. Transcripts are not published here. |
| `rights` | `link-and-excerpt-only` for third-party, `owned` for ours. |

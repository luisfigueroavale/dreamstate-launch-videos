# Data model

Every launch is one file: `data/launches/<company-slug>-<id>.json`. The schema is [`data/schema.json`](../data/schema.json). The validator rejects any file that does not match it.

## File name

| Part | Rule | Example |
|---|---|---|
| `company-slug` | The company in lowercase. Every run of other characters becomes one hyphen. `unknown` when company is `null`. | `nous-research` |
| `id` | `x-` plus the X status id. A Dreamstate launch without an X post uses `ds-<slug>`. | `x-2063035137953038584` |

The page for a record lives at `/launches/<company-slug>-<id>/`.

## Fields

| Field | Type | Meaning |
|---|---|---|
| `id` | string | Stable id, `x-<status id>`. |
| `company` | string or `null` | The business that launched. Never the poster's personal name. `null` when the source does not name one. |
| `product` | string or `null` | The product or feature, when it differs from the company name. |
| `title` | string | Short title that starts with the company, or the product when company is `null`. |
| `posted_by` | string | The X handle that posted, with `@`. Must match `post_url`. |
| `owner` | `third-party` or `dreamstate` | Ours are marked `dreamstate`. |
| `category` | id | From `data/categories.json`. `unlabeled` shows as "Not categorized". |
| `kind` | `launch`, `raise`, `feature`, `demo` | What the post announces. |
| `kind_basis`, `hook_basis` | string | How the label was made, usually `inferred-from-post`. |
| `post_url` | string | The public X post. |
| `post_date` | date or `null` | When it was posted. |
| `duration_seconds` | number or `null` | Video length, when read. |
| `excerpt` | string or `null` | At most 18 words, verbatim, no links, cut before any dash. |
| `hook_family` | id | From `data/hooks.json`. |
| `scene_cuts` | list | From an automated scene detection run. Empty when not scanned. |
| `snapshots` | list | Dated counts. See below. |
| `transcript_status` | `none` | Transcripts are not published. |
| `rights` | string | `link-and-excerpt-only` for third party. |
| `analysis` | object | Our own notes, in our own words. |

## Snapshots

| Field | Meaning |
|---|---|
| `retrieved` | The date the counts were read. |
| `scope` | `individual-post` (from the X post) or `listing-snapshot` (from a public gallery listing). |
| `source` | `x-public-counts`, `public-gallery-listing`, `x-read-tool`, or `dreamstate-analytics`. |
| `views`, `likes`, `reposts`, `replies`, `bookmarks` | Numbers or `null`. Never 0 for unknown. |

Snapshots with different scopes are shown side by side and never added together. Like rate is computed in the page from one snapshot and never stored.

## How company names were set

The company comes from the source data only: the post, the listing, the record notes, or the official account. Where a listing title started with a person's name, the title was rewritten to start with the company. Where a listing put the product in the company field, the company moved to `company` and the product to `product`. When the source does not name the company, it stays `null`. Today that is four records: two Y Combinator panel clips with no single launching company, one game demo whose studio the source does not name, and one launch post that names no company.

## Shared lists

| File | Holds |
|---|---|
| `data/hooks.json` | Hook families, with a one line description and a count. |
| `data/categories.json` | Categories, with a count. |
| `data/structures.json` | Timed beat maps for 15, 30, 60, 90, and 120 second cuts. |

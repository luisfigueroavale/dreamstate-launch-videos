# Library

The library is the public repo `luisfigueroavale/dreamstate-launch-videos`, branch `main`. The owner keeps it. This skill never creates or changes the repo itself. Because the repo is public, a record holds only a public post link, a short excerpt, public counts, and patterns in our own words: no video file, no transcript, no private footage, no contact.

One launch is one file, `data/launches/<company-slug>-<id>.json`. The company slug is the `company` field in lowercase, with every run of other characters turned into one hyphen, or `unknown` when `company` is null. The id is `x-` plus the X status id. Each record names the launching `company`, the `product` when it differs, and `posted_by`, the X handle from `post_url`. The schema requires an X `post_url`, so every record has an X handle. The record's public page is `/launches/<company-slug>-<id>/`.

The field list is `data/schema.json`, explained in `docs/data-model.md`. Hook families are in `data/hooks.json`, categories in `data/categories.json`, and timed structures in `data/structures.json`. The machine check is `npm run validate` (`scripts/validate-data.mjs`).

Look in this order: a local checkout path the owner gave, then the GitHub connector, read-only, on branch `main`. Never create the repo.

If neither exists, return only:

```text
launch video library pending
```

If the repo exists but `data/launches/` has no record that passes the check, return:

```text
no comparable launches in the library
```

When records were skipped because they failed the check, list each skipped file and its error under that line.

# Library

The library is this repository. Records live in `data/launches/<company-slug>-<id>.json` and follow `data/schema.json`. Hook families are in `data/hooks.json`, categories in `data/categories.json`, and timed structures in `data/structures.json`.

Check, in order: this checkout, a local checkout path the owner gave, then the GitHub connector for `dreamstate-launch-videos` on branch main. If none exists, return:

```text
launch video library pending
```

and nothing else.

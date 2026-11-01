# Adding a launch

The fastest path is to ask an agent: "Follow skills/add-launch-record for https://x.com/handle/status/123." The steps below are what that skill does, so you can also do it by hand.

## Steps

1. **Normalize the link** to `https://x.com/<handle>/status/<id>`. The record id is `x-<id>`. `posted_by` is `@<handle>`.
2. **Check it is new.** Search `data/launches/` for the id. If it exists, add a new snapshot to that file and stop.
3. **Name the company.** Use the company the post, its product page, or its official account names. Not the poster's personal name. If nothing names it, use `null`. Put the product in `product` when it differs.
4. **Name the file** `data/launches/<company-slug>-<id>.json`. The slug is the company in lowercase with runs of other characters turned into one hyphen, or `unknown` when company is `null`.
5. **Read the counts** with a read tool and write one snapshot with today's date, `scope`, and `source`. A count you did not read is `null`.
6. **Label it.** Category, kind, and hook family, each with an honest basis. Use `unlabeled` or `unclear` rather than guess.
7. **Quote** at most 18 words from the post as `excerpt`.
8. **Write the analysis** in your own words, from what you actually read or watched.
9. **Run** `npm run validate` and `npm run build`. Fix every error.
10. **Open a pull request** once the owner says yes. CI runs the same two checks.

## Example

```json
{
  "id": "x-2063035137953038584",
  "company": "10x.app",
  "product": null,
  "title": "10x.app launch",
  "posted_by": "@EvanYadegari",
  "owner": "third-party",
  "category": "developer-tools",
  "kind": "launch"
}
```

The example is cut short. See [data-model.md](data-model.md) for every field.

## What the validator rejects

- A file name that does not equal `<company-slug>-<id>.json`.
- A `posted_by` that does not match the handle in `post_url`.
- An excerpt over 18 words.
- An unknown hook family or category.
- A snapshot where every count is `null`.
- An em dash, an en dash, a double hyphen in prose, an email address, a phone number, a local file path, or a hotlinked video file anywhere in the repo.

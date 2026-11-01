# Contributing

Thanks for helping. Corrections and removals come first.

## Report a problem

Open an issue with the record's page link and what is wrong: the wrong company, a broken link, a count that looks off, or a request to remove your video. We fix or remove it.

## Add or fix a record

1. Read [docs/adding-a-launch.md](docs/adding-a-launch.md) and [docs/data-model.md](docs/data-model.md).
2. Make one branch per change, named for what it does, such as `data/add-acme-launch` or `docs/fix-typo`.
3. Run `npm run validate` and `npm run build`. Both must pass.
4. Open a pull request. Say where each number came from and the date it was read.

## Rules

- A number nobody read is `null`. Never 0, never an estimate.
- The company is the business that launched, never the poster's personal name. Unknown is `null`.
- Quote at most 18 words. No transcripts, no full post text, no video files, no hotlinked media.
- No em dashes, en dashes, or double hyphens in prose.
- No email addresses, phone numbers, or local file paths.

## Naming

| Thing | Pattern |
|---|---|
| Record file | `data/launches/<company-slug>-<id>.json` |
| Record page | `/launches/<company-slug>-<id>/` |
| Skill folder | `skills/<verb>-<noun>/` |
| Doc | `docs/<topic>.md`, lowercase with hyphens |
| Branch | `data/<change>`, `docs/<change>`, `ui/<change>` |

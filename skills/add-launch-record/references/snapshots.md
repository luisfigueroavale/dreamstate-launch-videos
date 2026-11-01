# Snapshots

A snapshot is one read of public counts on one date.

```json
{ "retrieved_on": "2026-11-01", "scope": "individual-post", "source": "x-read-tool",
  "views": 12345, "likes": 210, "reposts": 18, "replies": 9, "bookmarks": null }
```

- `retrieved_on` is the day you read it, in the owner's time zone.
- `scope` is `individual-post` for counts on the post itself, `listing-snapshot` for a public listing page, and `owner-analytics` for our own dashboards.
- Keep every older snapshot. Add the new one first. Never edit an old number.
- A snapshot with every number null is not a snapshot. Leave it out.
- Never add numbers from different scopes or different posts together.

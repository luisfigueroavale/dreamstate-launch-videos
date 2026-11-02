# Package

The spoken lines in the script and storyboard are the final read. This skill owns them. Hand the beat sheet, the spoken lines, and the capture files to `make-launch-clip`. Captions go to `render-captioned-video`, and the file goes to `check-short-export`.

## Launch post and reply bank

Copy `references/templates/post-and-replies.md`. Every product claim comes from a `verified` ledger line. The action and the destination come from the brief. Price or access comes from the brief only when the owner confirmed it. Measurements come only from a tool read the seat made and passed in: the X read tool `get_posts_by_ids`, or `visibility.analytics_query`. This skill makes no tool calls itself.

- Launch post: the first line matches the video's opening promise, then the product and its plain use, one proof detail, and one action.
- Reply bank: what it does, who it is for, how it differs, price or access only if confirmed, its limits, and how to try it. Each reply points at a real screenshot or output.
- Follow-ups for days two to seven: a deeper proof, a common objection answered, a real use case. Results in week two only when they are real and permitted.
- Measurement: the numbers those reads actually returned, each with its scope and retrieval date. Unknown stays unknown.

All of it is a draft. Posting, scheduling, paying, and outreach each need the owner's yes on that exact item.

## Save

Save the brief, ledger, hooks, script and storyboard, capture list, post and replies, and audit to `drafts/launch-video/<date>-<product>.md`. After the owner posts it, the Launch Video seat may add a library record with `study-launch-videos` rules. That record is a draft until the owner says yes to the commit.

# Use this library with an agent

The prompt below works in Claude Code, Codex, or a Grok Bot with the GitHub connector. Read the files from branch `main`, through the connector or a raw URL. Nothing here needs an API key, and nothing in this repo sends, posts, or spends.

## Prompt

Paste this into the agent's chat.

```text
Use luisfigueroavale/dreamstate-launch-videos, branch main, as a reference
library for launch videos. Read README.md, docs/start-here.md,
docs/data-model.md, docs/skill-frame.md, and skills/README.md first.

Rules:
- Follow docs/skill-frame.md for every skill.
- A number nobody read is null. Never invent a metric, customer, or quote.
- Quote at most 18 words from any post. Never copy a transcript or full post.
- The company is the business that launched, never the poster's name.
- Do not commit, push, open a pull request, deploy, post, or send without my
  yes on that exact item.

Then ask me which one I want:
1. Plan a launch video (skills/plan-launch-video, which uses
   skills/study-launch-videos for examples).
2. Find examples in the library for a brief (skills/study-launch-videos).
3. Add or refresh one launch from an X link (skills/add-launch-record).
```

## What you get

| Choice | Output |
|---|---|
| Plan a launch video | A brief, a proof ledger, about twelve hooks with the top three, timed beats, a capture list, and an audit checklist. |
| Find examples | Up to five matching records with their company, link, counts with dates, and the pattern in our own words. |
| Add a launch | One new or updated file in `data/launches/`, validated, shown to you before any commit. |

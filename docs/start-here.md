# Start here

This page is for anyone opening the repo for the first time. You do not need any background.

## What this is

A library of launch videos that startups posted on X. Each launch is one small file that names the company that launched, the product when it differs, the account that posted it, a link to the post, a short quote of 18 words or fewer, and public counts with the date they were read. A static website turns those files into a gallery you can filter and sort.

Three skills sit next to the data. A skill is a plain markdown procedure an agent (Claude Code, Codex, or a Grok Bot) follows step by step.

## Words used here

- **Record:** one launch, one JSON file in `data/launches/`.
- **Snapshot:** one dated read of the counts, with its scope and source.
- **Scope:** where a count came from. Per post means the X post. Listing means a public gallery listing.
- **Hook family:** the kind of opening line, from `data/hooks.json`.
- **Structure:** a timed beat map, from `data/structures.json`.
- **Validator:** `scripts/validate-data.mjs`. CI runs it on every pull request.

## Three things you can do

1. **Browse.** Run `npm install` then `npm run dev`, and open http://localhost:3000. Or use the live site once it is deployed (the link goes in the README).
2. **Plan your own launch video.** Ask an agent to follow `skills/plan-launch-video`. It reads `skills/study-launch-videos` to pull matching examples from this library.
3. **Add a launch.** Follow [adding-a-launch.md](adding-a-launch.md), or ask an agent to follow `skills/add-launch-record` with a public X link.

## Where to read next

| If you want to | Read |
|---|---|
| Understand every field in a record | [data-model.md](data-model.md) |
| Add or refresh a launch | [adding-a-launch.md](adding-a-launch.md) |
| See the rules every skill follows | [skill-frame.md](skill-frame.md) |
| Point an agent at this repo | [../setup-prompt.md](../setup-prompt.md) |
| Open a pull request | [../CONTRIBUTING.md](../CONTRIBUTING.md) |

## Rules that never change

- A number nobody read is `null`. Never 0, never an estimate.
- No video files, transcripts, or full post text are stored.
- Committing, pushing, opening a pull request, and deploying each wait for the owner's yes.

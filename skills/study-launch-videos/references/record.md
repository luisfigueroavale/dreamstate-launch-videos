# Dreamstate launch record

Only after the owner posted the video. Follow the library's own `skills/add-launch-record` and `docs/data-model.md`. Save the record in the local checkout as `data/launches/<company-slug>-<id>.json`: company `Dreamstate`, so the slug is `dreamstate`, and the id is `x-<status id>`. The schema requires an X `post_url` and a matching `posted_by`, so with no X post, stop and tell the owner the record cannot pass the check yet. Set `owner` to `dreamstate`, `posted_by` to the handle in `post_url`, and `product` to the product or feature launched.

Fill `hook_family`, `category`, `kind`, and `duration_seconds` from the saved plan in `drafts/launch-video/`, using the library's ids. `hook_family` is the library id saved next to the chosen hook. If the posted video opens on a different hook than the plan, use the id for what it opens on and set `hook_basis` to `observed-in-video`. Set `hook_basis` and `kind_basis` to `owner-supplied` or `observed-in-video` only when that is true.

Numbers come from a tool read only. Each read is its own snapshot, added first in `snapshots`. Never merge two reads, two channels, or two scopes into one snapshot:

- X: `get_posts_by_ids` with the post id, read-only. Map `public_metrics`: `impression_count` to `views`, `like_count` to `likes`, `retweet_count` to `reposts`, `reply_count` to `replies`, `bookmark_count` to `bookmarks`. A field the read did not return stays null. Source `x-read-tool`, scope `individual-post`.
- LinkedIn, YouTube, and other channels in Dreamstate: `visibility.analytics_query`, a free read of a stored snapshot. It does not refresh. Source `dreamstate-analytics`, scope `owner-analytics`. Never call `visibility.analytics_refresh` from this skill.

Set `retrieved_on` to the date of the read in the owner's time zone. A number the tool did not return stays null. A snapshot with every number null is left out. Funding, a raise, a waitlist claim, or a press mention never goes in a snapshot.

Run `npm run validate` in the library checkout. Hand the owner the file path, the check result, and the numbers with their scope and date. Do not commit. The owner says yes to the commit.

# Metrics

Numbers live in the record's `snapshots` list. Copy each snapshot exactly as stored: `views`, `likes`, `reposts`, `replies`, and `bookmarks`, with its `retrieved_on` date, its `scope`, and its `source`. A null value is written as unknown. Never write it as zero, and never estimate it.

`scope` is `individual-post` for counts on the post itself, `listing-snapshot` for a public gallery listing, and `owner-analytics` for our own dashboards. Show snapshots with different scopes side by side. Never add one to another, never sum across records, and never average across records with different scopes or dates.

A number read on a different date than another is a different number. Show both dates. A listing snapshot is reported, not verified reach. A like rate is likes divided by views from one snapshot, computed in the output and never stored. Compute it only when both are known and views is above zero. When either is null, the rate is unknown. When views is a known zero, the rate is not computed, and say so.

Never write that a hook family, a length, or a structure made a launch do well. Write what the record shows and stop there.

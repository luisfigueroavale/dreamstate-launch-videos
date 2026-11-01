# Match

Take four fields from the plan: viewer, product type, proof type (output, live demo, before and after, measured result), and length.

Map them to record fields: product type to `category`, proof type to `hook_family` (`input-output` for output and live demo, `comparison` for before and after, `measurable-stakes` for a measured result), and length to `duration_seconds` against the bands in `data/structures.json`.

Match on proof type and viewer first, length second. Views alone are not a match. Prefer records with `scene_cuts` and an `individual-post` snapshot, since they carry the most evidence.

Rank inside a match by like rate (likes divided by views, computed, never stored), not by raw views. Skip records whose snapshot has no views.

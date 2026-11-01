// Validates every launch record and scans the repo for words and characters that must not ship.
// Run: npm run validate
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import Ajv from "ajv";

const root = new URL("..", import.meta.url).pathname;
const errors = [];
const fail = (file, msg) => errors.push(`${relative(root, file)}: ${msg}`);

// Names that must never appear anywhere in this repo. This file is the only exception.
const BANNED = [
  /\binfluence\b/i,
  /\boxygen\b/i,
  /\blogan\b/i,
  /\bmitchell\b/i,
  /shown\s?media/i,
  /startup\s?launch\s?videos/i,
  /startuplaunchvideos/i,
  /shownmedia/i,
];
const PRIVATE = [
  [/\/Users\/[A-Za-z]/, "absolute local path"],
  [/video\.twimg\.com/, "hotlinked video file"],
  [/amazonaws\.com/, "hotlinked storage file"],
  [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, "email address"],
  [/(?:\+?\d{1,2}[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/, "phone number"],
];
const DASHES = [
  [/\u2014/, "em dash"],
  [/\u2013/, "en dash"],
];

// 1. Schema and record rules.
const companySlug = (c) => (c ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "unknown";
const schema = JSON.parse(readFileSync(join(root, "data/schema.json"), "utf8"));
const ajv = new Ajv({ allErrors: true, strict: false });
const check = ajv.compile(schema);
const hooks = new Set(JSON.parse(readFileSync(join(root, "data/hooks.json"), "utf8")).families.map((h) => h.id));
const cats = new Set(JSON.parse(readFileSync(join(root, "data/categories.json"), "utf8")).categories.map((c) => c.id));
const dir = join(root, "data/launches");
const ids = new Set();
let count = 0;
for (const name of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const file = join(dir, name);
  let rec;
  try {
    rec = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    fail(file, `invalid JSON: ${e.message}`);
    continue;
  }
  count++;
  if (!check(rec)) for (const e of check.errors) fail(file, `${e.instancePath || "/"} ${e.message}`);
  const expected = `${companySlug(rec.company)}-${rec.id}.json`;
  if (name !== expected) fail(file, `file name must be ${expected}`);
  if (rec.post_url && rec.posted_by !== `@${rec.post_url.split("/")[3]}`) fail(file, "posted_by must match the handle in post_url");
  if (ids.has(rec.id)) fail(file, "duplicate id");
  ids.add(rec.id);
  if (rec.excerpt && rec.excerpt.trim().split(/\s+/).length > 18) fail(file, "excerpt is longer than 18 words");
  if (!hooks.has(rec.hook_family)) fail(file, `unknown hook_family ${rec.hook_family}`);
  if (!cats.has(rec.category)) fail(file, `unknown category ${rec.category}`);
  if (rec.owner === "dreamstate" && !rec.snapshots?.some((s) => ["x-read-tool", "dreamstate-analytics"].includes(s.source)))
    fail(file, "a dreamstate record needs a snapshot that came from a tool");
  for (const s of rec.snapshots ?? []) {
    if (["views", "likes", "reposts", "replies", "bookmarks"].every((k) => s[k] === null)) fail(file, "snapshot has no numbers; drop it");
  }
  for (const c of rec.scene_cuts ?? []) if (c.end < c.start) fail(file, "scene cut ends before it starts");
  // Prose rule: no em dash, en dash, or double hyphen in any string.
  const walk = (v, path) => {
    if (typeof v === "string") {
      if (/^https?:\/\//.test(v)) return;
      for (const [re, label] of DASHES) if (re.test(v)) fail(file, `${path} has an ${label}`);
      if (/--/.test(v)) fail(file, `${path} has a double hyphen`);
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
  };
  walk(rec, "");
}

// 2. Repo text scan.
const SKIP_DIRS = new Set(["node_modules", ".next", "out", ".git"]);
const TEXT = new Set([".md", ".json", ".mjs", ".js", ".ts", ".tsx", ".css", ".yml", ".yaml", ".txt", ""]);
const SELF = join(root, "scripts/validate-data.mjs");
function* files(d) {
  for (const n of readdirSync(d)) {
    if (SKIP_DIRS.has(n)) continue;
    const p = join(d, n);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (TEXT.has(extname(n)) && !n.endsWith("package-lock.json") && !n.endsWith(".tsbuildinfo")) yield p;
  }
}
for (const file of files(root)) {
  if (file === SELF) continue;
  const text = readFileSync(file, "utf8");
  for (const re of BANNED) if (re.test(text)) fail(file, `banned name matches ${re}`);
  for (const [re, label] of PRIVATE) if (re.test(text)) fail(file, `contains ${label}`);
  for (const [re, label] of DASHES) if (re.test(text)) fail(file, `contains an ${label}`);
  if (extname(file) === ".md") {
    let fence = false;
    text.split("\n").forEach((line, i) => {
      if (/^\s*```/.test(line)) fence = !fence;
      if (fence || /^\s*\|?[\s:|-]+\|?\s*$/.test(line) || /^---\s*$/.test(line)) return;
      if (/--/.test(line.replace(/`[^`]*`/g, ""))) fail(file, `line ${i + 1} has a double hyphen`);
    });
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\nvalidate: ${errors.length} problem(s) in ${count} records`);
  process.exit(1);
}
console.log(`validate: ${count} records ok, repo scan clean`);

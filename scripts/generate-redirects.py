#!/usr/bin/env python3
"""
Generate public/_redirects for the Document360 -> VitePress/Netlify migration.

Inputs:
  - redirect-rule-list (19).csv : Document360 redirect export (legacy URL -> D360 URL)
  - the hub content trees (*.md files) : ground truth for new site paths

Logic:
  1. Build slug -> new-path map per hub from the actual .md files.
  2. Load D360 rules, normalize paths, flatten redirect chains (loop-safe).
  3. Map every final destination to a new VitePress path.
  4. Add a rule for every currently-live D360 article URL (/{hub}/docs/{slug}).
  5. Emit public/_redirects (301s) + reports/redirect-unmapped.csv for anything
     that could not be resolved.

Run from repo root:  python3 scripts/generate-redirects.py
"""

import csv
import os
import re
import sys
from collections import defaultdict

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RULES_CSV = os.path.join(REPO, "redirect-rule-list (19).csv")
OUT_REDIRECTS = os.path.join(REPO, "public", "_redirects")
OUT_UNMAPPED = os.path.join(REPO, "reports", "redirect-unmapped.csv")
OUT_MAP = os.path.join(REPO, "reports", "redirect-map.csv")
DEAD_WORKLIST = os.path.join(REPO, "reports", "dead-destinations.csv")

HUBS = ["account-hub", "marketer-hub", "developer-hub", "apidocs"]
# aliases seen in D360 source/destination paths -> canonical hub dir
HUB_ALIASES = {
    "developers-hub": "developer-hub",
    "developer-hub": "developer-hub",
    "marketer-hub": "marketer-hub",
    "account-hub": "account-hub",
    "apidocs": "apidocs",
}
OWN_HOSTS = ("https://help.branch.io", "http://help.branch.io", "https://help.branch.io:443")


def build_slug_map():
    """slug -> new path, per hub and globally (only when globally unique)."""
    per_hub = defaultdict(dict)          # hub -> slug -> path
    global_slugs = defaultdict(list)     # slug -> [paths]
    for hub in HUBS:
        root_dir = os.path.join(REPO, hub)
        for root, _dirs, files in os.walk(root_dir):
            for f in files:
                if not f.endswith(".md"):
                    continue
                slug = f[:-3]
                rel = os.path.relpath(os.path.join(root, f), REPO)[:-3]
                path = "/" + rel.replace(os.sep, "/")
                if slug == "index":
                    path = path[: -len("index")]  # /hub/dir/index -> /hub/dir/
                    per_hub[hub].setdefault("index:" + path, path)
                    continue
                if slug in per_hub[hub]:
                    print(f"WARN: duplicate slug in {hub}: {slug}", file=sys.stderr)
                per_hub[hub][slug] = path
                global_slugs[slug].append(path)
    global_unique = {s: p[0] for s, p in global_slugs.items() if len(p) == 1}
    return per_hub, global_unique


def norm_path(p):
    """Normalize a D360 source/destination into a root-relative path (+fragment)."""
    p = p.strip().strip('"').strip()
    if not p:
        return ""
    for host in OWN_HOSTS:
        if p.lower().startswith(host):
            p = p[len(host):]
            break
    if p.startswith("http://") or p.startswith("https://"):
        return p  # external URL, keep as-is
    if not p.startswith("/"):
        p = "/" + p
    # collapse multiple slashes, strip trailing slash (except root)
    frag = ""
    if "#" in p:
        p, frag = p.split("#", 1)
        frag = "#" + frag
    p = re.sub(r"/{2,}", "/", p)
    if len(p) > 1 and p.endswith("/"):
        p = p[:-1]
    return p + frag


def split_frag(p):
    if "#" in p:
        a, b = p.split("#", 1)
        return a, "#" + b
    return p, ""


def load_rules():
    rules = {}
    with open(RULES_CSV, encoding="utf-8-sig") as fh:
        reader = csv.reader(fh)
        next(reader)  # header
        for row in reader:
            if len(row) < 2:
                continue
            src, dst = norm_path(row[0]), norm_path(row[1])
            if not src or not dst or src == dst:
                continue
            key = split_frag(src)[0].lower()
            if key in rules and rules[key] != dst:
                print(f"WARN: conflicting rule for {key}: {rules[key]} vs {dst}", file=sys.stderr)
            rules[key] = dst
    return rules


def flatten(rules):
    """Follow chains src -> dst -> dst2 ... until no rule matches (loop-safe)."""
    flat = {}
    for src in rules:
        seen = {src}
        dst = rules[src]
        for _ in range(20):
            base, frag = split_frag(dst)
            nxt = rules.get(base.lower())
            if nxt is None:
                break
            if split_frag(nxt)[0].lower() in seen:
                print(f"WARN: redirect loop involving {src}", file=sys.stderr)
                break
            seen.add(split_frag(nxt)[0].lower())
            # preserve the outermost fragment if the next hop has none
            nbase, nfrag = split_frag(nxt)
            dst = nbase + (nfrag or frag)
        flat[src] = dst
    return flat


def slug_variants(slug):
    """Ordered lookup variants for a D360 slug (conservative renames only)."""
    out = [slug]
    if slug.endswith("-index"):
        out.append(slug[: -len("-index")])
    for s in list(out):
        out.append(s + "-overview")
        if s.endswith("-new"):
            out.append(s[: -len("-new")])
        else:
            out.append(s + "-new")
    m = re.match(r"^(.*)-\d+$", slug)
    if m:
        out.append(m.group(1))
    # dedupe, preserve order
    seen, uniq = set(), []
    for s in out:
        if s not in seen:
            seen.add(s)
            uniq.append(s)
    return uniq


def lookup(slug, hubs_in_order, per_hub, global_unique):
    for v in slug_variants(slug):
        for hub in hubs_in_order:
            hit = per_hub[hub].get(v)
            if hit:
                return hit
        hit = global_unique.get(v)
        if hit:
            return hit
    return None


def hub_hint(src):
    """Preferred hub order based on the legacy source path."""
    first = src.lstrip("/").split("/", 1)[0].lower()
    if first in ("developers-hub", "developer-hub", "apidocs"):
        return ["developer-hub", "apidocs", "marketer-hub", "account-hub"]
    if first in ("using-branch", "faq", "partners-portal"):
        return ["marketer-hub", "account-hub", "developer-hub", "apidocs"]
    if first in HUB_ALIASES:
        h = HUB_ALIASES[first]
        return [h] + [x for x in HUBS if x != h]
    return ["marketer-hub", "account-hub", "developer-hub", "apidocs"]


def map_to_new(dst, per_hub, global_unique, src=""):
    """Map a (flattened) D360 destination to a new VitePress path. None if unknown."""
    if dst.startswith("http"):
        return dst  # external
    base, frag = split_frag(dst)
    segs = [s for s in base.split("/") if s]
    if not segs:
        return "/"
    # /{hub}/docs/{slug}  or  /{hub}/{slug}
    first = HUB_ALIASES.get(segs[0].lower())
    if first:
        hub = first
        rest = segs[1:]
        if rest and rest[0].lower() in ("docs", "v1", "page"):
            rest = rest[1:]
        if not rest:
            return f"/{hub}/" + frag
        slug = rest[-1].lower()
        order = [hub] + [x for x in HUBS if x != hub]
        hit = lookup(slug, order, per_hub, global_unique)
        if hit:
            return hit + frag
        # apidocs: path may already be the real nested path
        if hub == "apidocs":
            candidate = "/" + "/".join([hub] + [s.lower() for s in rest])
            if os.path.isfile(os.path.join(REPO, candidate.lstrip("/") + ".md")) or \
               os.path.isfile(os.path.join(REPO, candidate.lstrip("/"), "index.md")):
                return candidate + frag
        return None
    # /docs/{slug} or /v1/docs/{slug} or bare /{slug}
    rest = [s for s in segs if s.lower() not in ("docs", "v1", "page", "faq", "using-branch", "partners-portal")]
    if rest:
        slug = rest[-1].lower()
        hit = lookup(slug, hub_hint(src), per_hub, global_unique)
        if hit:
            return hit + frag
    return None


def load_overrides():
    """Manual targets filled into reports/dead-destinations.csv (column: target).

    Keyed by flattened destination — filling one row rescues every legacy
    source that pointed at that destination.
    """
    overrides = {}
    if not os.path.exists(DEAD_WORKLIST):
        return overrides
    with open(DEAD_WORKLIST, encoding="utf-8-sig") as fh:
        for row in csv.DictReader(fh):
            tgt = (row.get("target") or "").strip()
            if tgt:
                overrides[row["flattened_destination"].strip().lower()] = norm_path(tgt)
    return overrides


def main():
    per_hub, global_unique = build_slug_map()
    n_pages = sum(len(v) for v in per_hub.values())
    print(f"content pages found: {n_pages}")

    rules = load_rules()
    print(f"legacy rules loaded: {len(rules)}")
    flat = flatten(rules)
    overrides = load_overrides()
    if overrides:
        print(f"manual overrides loaded: {len(overrides)}")

    final = {}      # source path -> new target
    unmapped = []   # (source, flattened dest, reason)

    for src, dst in flat.items():
        ov = overrides.get(split_frag(dst)[0].lower())
        tgt = ov if ov else map_to_new(dst, per_hub, global_unique, src)
        if tgt is None:
            unmapped.append((src, dst, "destination slug not found in new site"))
        else:
            final[src] = tgt

    # live-article layer: /{hub}/docs/{slug} -> new path, for every current page
    live_added = 0
    for hub in ("account-hub", "marketer-hub", "developer-hub"):
        for slug, path in per_hub[hub].items():
            if slug.startswith("index:"):
                continue
            live_src = f"/{hub}/docs/{slug}".lower()
            if live_src not in final:
                final[live_src] = path
                live_added += 1
    print(f"live-article rules added: {live_added}")

    # drop no-op rules (source == target)
    final = {s: t for s, t in final.items() if s != t.lower()}

    os.makedirs(os.path.dirname(OUT_UNMAPPED), exist_ok=True)
    os.makedirs(os.path.dirname(OUT_REDIRECTS), exist_ok=True)

    with open(OUT_REDIRECTS, "w", encoding="utf-8") as fh:
        fh.write("# Generated by scripts/generate-redirects.py — do not edit by hand.\n")
        fh.write(f"# {len(final)} rules: Document360 legacy + live article URLs -> new site paths.\n\n")
        for src in sorted(final):
            fh.write(f"{src}\t{final[src]}\t301\n")

    with open(OUT_MAP, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["source", "target"])
        for src in sorted(final):
            w.writerow([src, final[src]])

    with open(OUT_UNMAPPED, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["source", "flattened_destination", "reason"])
        for row in sorted(unmapped):
            w.writerow(row)

    # fix-later worklist: one row per dead destination; fill `target` and rerun
    # this script to rescue every legacy source pointing at it. Existing manual
    # targets are preserved across reruns.
    existing = {}
    if os.path.exists(DEAD_WORKLIST):
        with open(DEAD_WORKLIST, encoding="utf-8-sig") as fh:
            for row in csv.DictReader(fh):
                existing[row["flattened_destination"].strip().lower()] = row.get("target", "")
    grouped = defaultdict(list)
    for src, dst, _ in unmapped:
        grouped[dst].append(src)
    with open(DEAD_WORKLIST, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["flattened_destination", "inbound_rules", "example_sources", "target"])
        for dst in sorted(grouped, key=lambda d: -len(grouped[d])):
            w.writerow([
                dst,
                len(grouped[dst]),
                " | ".join(sorted(grouped[dst])[:3]),
                existing.get(dst.lower(), ""),
            ])

    print(f"rules written: {len(final)} -> public/_redirects")
    print(f"unmapped: {len(unmapped)} -> reports/redirect-unmapped.csv")
    print(f"fix-later worklist: {len(grouped)} destinations -> reports/dead-destinations.csv")


if __name__ == "__main__":
    main()

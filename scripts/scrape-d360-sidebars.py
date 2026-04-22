#!/usr/bin/env python3
"""
Scrape help.branch.io's server-rendered nav state to build VitePress
sidebars that match D360's actual curated ordering.

The live D360 site ships the full category tree as JSON inside
  <script id="serverApp-state" type="application/json">
on every article page. We grab one article per hub, extract
ARTICLE_BODY_TRANSFER_KEY.result.categories, walk it recursively,
and emit a TypeScript file with three sidebar constants.

Usage:
  python3 scripts/scrape-d360-sidebars.py           # dry-run: print trees + stats
  python3 scripts/scrape-d360-sidebars.py --write   # write .vitepress/sidebar-hubs.ts

No credentials required.
"""

import json
import re
import sys
import urllib.request
from pathlib import Path
from collections import OrderedDict

OUT_PATH = Path(".vitepress/sidebar-hubs.ts")

HUBS = OrderedDict([
    # A known-stable article URL per hub. Picking "glossary" because every hub has it.
    ("Account Hub",    ("account-hub",   "https://help.branch.io/account-hub/docs/glossary")),
    ("Marketer Hub",   ("marketer-hub",  "https://help.branch.io/marketer-hub/docs/glossary")),
    ("Developer Hub",  ("developer-hub", "https://help.branch.io/developer-hub/docs/glossary")),
])

EXPORT_NAMES = {
    "account-hub": "accountHubSidebar",
    "marketer-hub": "marketerHubSidebar",
    "developer-hub": "developerHubSidebar",
}

STATE_RE = re.compile(
    r'<script id="serverApp-state" type="application/json">(.+?)</script>',
    re.DOTALL,
)

# Frontmatter slug parser (for building slug -> repo filepath map)
SLUG_RE = re.compile(r'^\s*slug\s*:\s*"?([^"\n]+?)"?\s*$', re.MULTILINE)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "sidebar-sync-script/1.0"})
    with urllib.request.urlopen(req) as resp:
        return resp.read().decode("utf-8")


def extract_tree(html: str):
    """Return the root categories dict from the SSR blob."""
    m = STATE_RE.search(html)
    if not m:
        raise RuntimeError("serverApp-state script not found in HTML")
    blob = json.loads(m.group(1))
    try:
        return blob["ARTICLE_BODY_TRANSFER_KEY"]["result"]["categories"]
    except KeyError as e:
        raise RuntimeError(f"ARTICLE_BODY_TRANSFER_KEY.result.categories missing: {e}")


def parse_frontmatter_slug(path: Path):
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return None
    if not text.startswith("---"):
        return None
    end = text.find("\n---", 3)
    if end < 0:
        return None
    block = text[3:end]
    m = SLUG_RE.search(block)
    return m.group(1).strip() if m else None


def build_disk_index(hub_dir: str):
    slug_to_path = {}
    root = Path(hub_dir)
    for p in sorted(root.rglob("*.md")):
        slug = parse_frontmatter_slug(p)
        if not slug:
            continue
        if slug in slug_to_path:
            print(
                f"WARN: duplicate slug {slug!r} in {hub_dir}: "
                f"{slug_to_path[slug]} vs {p}",
                file=sys.stderr,
            )
        slug_to_path[slug] = p
    return slug_to_path


def link_for_path(md_path: Path) -> str:
    s = "/" + str(md_path).removesuffix(".md")
    if s.endswith("/index"):
        s = s[:-len("index")]
    return s


def is_article(node):
    # categoryType 0 = article (leaf); 2 = folder/category.
    # documentationType 1 also indicates an article.
    return node.get("categoryType", 0) == 0 or node.get("documentationType", 0) == 1


def walk_node(node, depth, slug_to_path, stats, hub_dir):
    """Convert one D360 tree node into a VitePress sidebar item (or None to skip)."""
    slug = (node.get("slug") or "").strip()
    title = (node.get("title") or "").strip()
    raw_children = node.get("children") or []

    # Sort children by D360's `order` field (defensive - usually already ordered).
    children_sorted = sorted(raw_children, key=lambda c: c.get("order") or 0)

    if is_article(node):
        md_path = slug_to_path.get(slug)
        if md_path is None:
            stats["missing_on_disk"].append((hub_dir, title, slug))
            return None  # article exists in D360 but not in repo - skip
        stats["matched"].add(slug)
        return {"text": title, "link": link_for_path(md_path)}

    # Category node: walk children.
    items = []
    for child in children_sorted:
        rendered = walk_node(child, depth + 1, slug_to_path, stats, hub_dir)
        if rendered is not None:
            items.append(rendered)

    if not items:
        return None  # empty category - omit

    return {
        "text": title,
        "collapsed": depth >= 1,  # top-level expanded, nested collapsed by default
        "items": items,
    }


def build_sidebar_for_hub(hub_label, hub_dir, url, slug_to_path):
    print(f"\n>>> Fetching {url}")
    html = fetch(url)
    root = extract_tree(html)

    stats = {"matched": set(), "missing_on_disk": []}
    children_sorted = sorted(
        root.get("children") or [], key=lambda c: c.get("order") or 0
    )
    top_items = []
    for child in children_sorted:
        rendered = walk_node(child, 0, slug_to_path, stats, hub_dir)
        if rendered is not None:
            top_items.append(rendered)

    disk_slugs = set(slug_to_path.keys())
    orphans = sorted(disk_slugs - stats["matched"])

    print(f"\n  Categories rendered:     {len(top_items)}")
    print(f"  Articles matched to file: {len(stats['matched'])}")
    print(f"  D360 articles with no repo file (skipped): {len(stats['missing_on_disk'])}")
    print(f"  Repo files not in D360 tree (orphans):    {len(orphans)}")
    if stats["missing_on_disk"]:
        print(f"\n  Missing on disk (up to 8):")
        for _, title, slug in stats["missing_on_disk"][:8]:
            print(f"    - {title!r}  (slug={slug})")
    if orphans:
        print(f"\n  Orphans in repo (up to 8):")
        for s in orphans[:8]:
            print(f"    - {slug_to_path[s]}  (slug={s})")

    return top_items, stats, orphans


def render_ts(name: str, items: list) -> str:
    return f"export const {name} = {render_items(items, 0)}\n"


def render_items(items, depth):
    pad = "  " * depth
    inner_pad = "  " * (depth + 1)
    if not items:
        return "[]"
    lines = ["["]
    for idx, it in enumerate(items):
        line = inner_pad + render_item(it, depth + 1)
        if idx < len(items) - 1:
            line += ","
        lines.append(line)
    lines.append(pad + "]")
    return "\n".join(lines)


def render_item(item, depth):
    parts = []
    parts.append(f'text: {json_string(item["text"])}')
    if "link" in item:
        parts.append(f'link: {json_string(item["link"])}')
    if "collapsed" in item:
        parts.append(f'collapsed: {"true" if item["collapsed"] else "false"}')
    if "items" in item:
        rendered = render_items(item["items"], depth)
        parts.append(f'items: {rendered}')
    inner_pad = "  " * (depth + 1)
    body = (",\n" + inner_pad).join(parts)
    return "{ " + body + " }"


def json_string(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def preview_tree(items, depth=0, max_depth=3):
    for it in items:
        pad = "  " * depth
        if "items" in it:
            print(f"{pad}- {it['text']}  ({len(it['items'])} items)")
            if depth < max_depth:
                preview_tree(it["items"], depth + 1, max_depth)
        else:
            print(f"{pad}  \u00b7 {it['text']}  \u2192 {it.get('link','')}")


def main():
    write = "--write" in sys.argv

    exports = []
    all_stats = []

    for hub_label, (hub_dir, url) in HUBS.items():
        print(f"\n{'='*72}\n{hub_label}  ({hub_dir}/)\n{'='*72}")
        slug_to_path = build_disk_index(hub_dir)
        print(f"  Disk files indexed:  {len(slug_to_path)}")

        items, stats, orphans = build_sidebar_for_hub(hub_label, hub_dir, url, slug_to_path)
        all_stats.append((hub_label, items, stats, orphans))

        exports.append(render_ts(EXPORT_NAMES[hub_dir], items))

        print(f"\n  Sidebar preview (depth \u2264 3):")
        preview_tree(items, depth=1, max_depth=3)

    output = (
        "// Auto-generated by scripts/scrape-d360-sidebars.py.\n"
        "// Source: help.branch.io server-rendered nav JSON.\n"
        "// Do not hand-edit - regenerate by running the script.\n\n"
        + "\n".join(exports)
    )

    print("\n\n" + "=" * 72)
    print("SUMMARY")
    print("=" * 72)
    for label, items, stats, orphans in all_stats:
        print(f"  {label}:  {count_categories(items)} categories, {count_articles(items)} articles")
        if stats["missing_on_disk"] or orphans:
            print(f"    missing-on-disk={len(stats['missing_on_disk'])}  orphans={len(orphans)}")

    if write:
        OUT_PATH.write_text(output, encoding="utf-8")
        print(f"\nWrote {OUT_PATH} ({len(output)} bytes)")
    else:
        print("\nRe-run with --write to emit the file.")


def count_articles(items):
    n = 0
    for it in items:
        if "items" in it:
            n += count_articles(it["items"])
        else:
            n += 1
    return n


def count_categories(items):
    n = 0
    for it in items:
        if "items" in it:
            n += 1 + count_categories(it["items"])
    return n


if __name__ == "__main__":
    main()

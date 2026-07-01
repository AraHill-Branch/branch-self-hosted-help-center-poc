#!/usr/bin/env python3
"""
Verify deployed redirects against reports/redirect-map.csv.

For every rule it checks:
  1. GET <base><source> returns 301 (no redirect following)
  2. the Location header matches the expected target
  3. GET <base><target> returns 200 (each unique target checked once)

It also samples sources from reports/redirect-unmapped.csv (the intentional
dead URLs) and asserts they return a real HTTP 404.

Usage:
  python3 scripts/verify-redirects.py https://deploy-preview-12--boisterous-tanuki-75d338.netlify.app
  python3 scripts/verify-redirects.py https://boisterous-tanuki-75d338.netlify.app --limit 100
  python3 scripts/verify-redirects.py http://localhost:8888 --workers 4

Options:
  --limit N        only check the first N redirect rules (default: all)
  --dead-sample N  how many dead URLs to check for 404 (default: 25, 0 to skip)
  --workers N      concurrent requests (default: 16; use 4 for netlify dev)

Failures are written to reports/redirect-verification-failures.csv.
Exit code 0 = all passed, 1 = failures found.
"""

import argparse
import csv
import os
import random
import sys
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlsplit, quote

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAP_CSV = os.path.join(REPO, "reports", "redirect-map.csv")
UNMAPPED_CSV = os.path.join(REPO, "reports", "redirect-unmapped.csv")
FAIL_CSV = os.path.join(REPO, "reports", "redirect-verification-failures.csv")

TIMEOUT = 15
UA = {"User-Agent": "redirect-verifier/1.0"}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None  # don't follow


OPENER_NOFOLLOW = urllib.request.build_opener(NoRedirect)
OPENER_FOLLOW = urllib.request.build_opener()


def fetch(url, follow):
    """Return (status, location_header) — retries once on network error."""
    opener = OPENER_FOLLOW if follow else OPENER_NOFOLLOW
    req = urllib.request.Request(url, headers=UA)
    for attempt in (1, 2):
        try:
            with opener.open(req, timeout=TIMEOUT) as resp:
                return resp.status, resp.headers.get("Location", "")
        except urllib.error.HTTPError as e:
            return e.code, e.headers.get("Location", "")
        except Exception as e:
            if attempt == 2:
                return None, str(e)
    return None, "unreachable"


def norm_loc(loc, base):
    """Normalize a Location header to a root-relative path for comparison."""
    if not loc:
        return ""
    if loc.startswith("http"):
        s = urlsplit(loc)
        b = urlsplit(base)
        if s.netloc != b.netloc:
            return loc  # external — compare full URL
        loc = s.path + (("#" + s.fragment) if s.fragment else "")
    return loc.rstrip("/") or "/"


def strip_frag(p):
    return p.split("#", 1)[0]


def enc(path):
    base, frag = (path.split("#", 1) + [""])[:2]
    return quote(base, safe="/:") + (("#" + frag) if frag else "")


def check_rule(base, src, tgt):
    """Returns None if OK, else (src, expected, problem)."""
    status, loc = fetch(base + enc(strip_frag(src)), follow=False)
    if status is None:
        return (src, tgt, f"network error: {loc}")
    if status not in (301, 308):
        return (src, tgt, f"expected 301, got {status}")
    if tgt.startswith("http"):
        expected = tgt
        got = loc
    else:
        expected = tgt.rstrip("/") or "/"
        got = norm_loc(loc, base)
    if strip_frag(got) != strip_frag(expected):
        return (src, tgt, f"wrong Location: {loc}")
    return None


def check_target(base, tgt):
    if tgt.startswith("http"):
        return None  # skip external targets
    status, info = fetch(base + enc(strip_frag(tgt)), follow=True)
    if status != 200:
        return (tgt, tgt, f"target returned {status if status is not None else info}")
    return None


def check_dead(base, src):
    status, info = fetch(base + enc(strip_frag(src)), follow=True)
    if status != 404:
        return (src, "(should 404)", f"expected 404, got {status if status is not None else info}")
    return None


def run(jobs, workers, label):
    failures = []
    done = 0
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(fn, *args) for fn, *args in jobs]
        for fut in as_completed(futures):
            r = fut.result()
            if r:
                failures.append(r)
            done += 1
            if done % 200 == 0:
                print(f"  {label}: {done}/{len(jobs)} checked, {len(failures)} failures so far")
    return failures


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("base", help="site to test, e.g. a Netlify deploy-preview URL")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--dead-sample", type=int, default=25)
    ap.add_argument("--workers", type=int, default=16)
    args = ap.parse_args()
    base = args.base.rstrip("/")

    with open(MAP_CSV, encoding="utf-8-sig") as fh:
        rules = [(r["source"], r["target"]) for r in csv.DictReader(fh)]
    if args.limit:
        rules = rules[: args.limit]
    targets = sorted({t for _, t in rules})
    print(f"checking {len(rules)} redirects + {len(targets)} unique targets against {base}")

    failures = run([(check_rule, base, s, t) for s, t in rules], args.workers, "redirects")
    failures += run([(check_target, base, t) for t in targets], args.workers, "targets")

    if args.dead_sample and os.path.exists(UNMAPPED_CSV):
        with open(UNMAPPED_CSV, encoding="utf-8-sig") as fh:
            dead = [r["source"] for r in csv.DictReader(fh)]
        random.seed(0)  # deterministic sample
        sample = random.sample(dead, min(args.dead_sample, len(dead)))
        print(f"checking {len(sample)} intentionally-dead URLs return 404")
        failures += run([(check_dead, base, s) for s in sample], args.workers, "dead URLs")

    if failures:
        with open(FAIL_CSV, "w", newline="", encoding="utf-8") as fh:
            w = csv.writer(fh)
            w.writerow(["url", "expected", "problem"])
            w.writerows(sorted(failures))
        print(f"\nFAIL: {len(failures)} problems -> reports/redirect-verification-failures.csv")
        for f in sorted(failures)[:10]:
            print("  ", f)
        sys.exit(1)
    print("\nPASS: all redirects, targets, and 404s behave as expected")


if __name__ == "__main__":
    main()

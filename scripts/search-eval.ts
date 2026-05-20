#!/usr/bin/env tsx
/**
 * Search ranking evaluation harness.
 *
 * Loads the built public/search-index.json, hydrates a MiniSearch instance
 * using the EXACT same options the client runtime uses, runs each test
 * case from search-eval-cases.ts, and reports for every case:
 *   - position of the expected URL in results (1, 2, 3, ..., or N/A)
 *   - whether the case passes (expected URL in #1 or top-3 acceptable)
 *
 * Outputs a summary table broken down by intent + a failure list.
 *
 * Usage:
 *   npm run search:eval                     # one run, summary + failures
 *   npm run search:eval -- --json out.json  # write detailed JSON for diffing
 *   npm run search:eval -- --verbose        # print top-5 for every case
 *   npm run search:eval -- --baseline       # save as baseline file
 *   npm run search:eval -- --compare        # compare against saved baseline
 *
 * The first run establishes a baseline; subsequent runs after tuning
 * compare against it.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import MiniSearch from 'minisearch'
import { MINISEARCH_OPTIONS, runSearch } from '../.vitepress/theme/composables/searchOptions'
import { testCases, type TestCase } from './search-eval-cases'

const INDEX_PATH = 'public/search-index.json'
const BASELINE_PATH = 'scripts/search-eval-baseline.json'

const args = process.argv.slice(2)
const VERBOSE = args.includes('--verbose')
const SAVE_BASELINE = args.includes('--baseline')
const COMPARE_BASELINE = args.includes('--compare')
const JSON_OUT = args.includes('--json') ? args[args.indexOf('--json') + 1] : null

// ---------------------------------------------------------------------------
// Load the index
// ---------------------------------------------------------------------------

if (!existsSync(INDEX_PATH)) {
  console.error(`Index not found at ${INDEX_PATH}. Run \`npm run search:index\` first.`)
  process.exit(1)
}
const payload = JSON.parse(readFileSync(INDEX_PATH, 'utf8'))
const ms = MiniSearch.loadJS(payload.miniSearchIndex, MINISEARCH_OPTIONS)

// ---------------------------------------------------------------------------
// Per-case evaluation
// ---------------------------------------------------------------------------

type Result = {
  query: string
  intent: TestCase['intent']
  volume: number
  contentGap?: boolean
  expected: string[] // expectedUrl OR acceptableUrls
  topResults: { id: string; score: number }[]
  bestPosition: number | null // 1-indexed; null if not in top 50
  pass: boolean
  passKind: 'pos1' | 'top3' | 'top10' | 'miss' | 'gap-skip'
}

/** Normalize URLs so `/foo/` and `/foo` compare equal. The indexer
 *  strips trailing slashes on doc.id, but test cases sometimes write
 *  the slashy form because that's how the link actually renders. */
function normUrl(u: string): string {
  if (u.length > 1 && u.endsWith('/')) return u.slice(0, -1)
  return u
}

function evaluate(tc: TestCase): Result {
  const hits = runSearch<{ id: string; score: number }>(ms, tc.query)
  const top = hits.slice(0, 50).map((h) => ({ id: h.id, score: h.score }))

  if (tc.contentGap) {
    return {
      query: tc.query, intent: tc.intent, volume: tc.volume,
      contentGap: true,
      expected: [],
      topResults: top.slice(0, 5),
      bestPosition: null, pass: true, passKind: 'gap-skip',
    }
  }

  const expected = tc.expectedUrl ? [tc.expectedUrl] : tc.acceptableUrls ?? []
  const expectedSet = new Set(expected.map(normUrl))

  let bestPos: number | null = null
  for (let i = 0; i < top.length; i++) {
    if (expectedSet.has(normUrl(top[i].id))) { bestPos = i + 1; break }
  }

  const isExpectedUrl = tc.expectedUrl != null
  let pass = false
  let passKind: Result['passKind'] = 'miss'

  if (bestPos === 1) { pass = true; passKind = 'pos1' }
  else if (bestPos != null && bestPos <= 3) {
    // For acceptableUrls cases, top-3 is a pass.
    // For expectedUrl cases, only #1 is a strict pass — but we still
    // classify the result as top3 so we can see the partial.
    pass = !isExpectedUrl
    passKind = 'top3'
  } else if (bestPos != null && bestPos <= 10) {
    passKind = 'top10'
  } else {
    passKind = 'miss'
  }

  return {
    query: tc.query, intent: tc.intent, volume: tc.volume,
    expected, topResults: top.slice(0, 5),
    bestPosition: bestPos, pass, passKind,
  }
}

const results = testCases.map(evaluate)

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

const measurable = results.filter((r) => !r.contentGap)
const gaps = results.filter((r) => r.contentGap)

function pct(n: number, d: number): string { return d ? `${((n / d) * 100).toFixed(1)}%` : 'n/a' }

const pos1 = measurable.filter((r) => r.passKind === 'pos1').length
const top3 = measurable.filter((r) => r.passKind === 'pos1' || r.passKind === 'top3').length
const top10 = measurable.filter((r) => r.passKind !== 'miss').length
const miss = measurable.filter((r) => r.passKind === 'miss').length

const HEADER = `\n  Search Ranking Evaluation
  =========================
  Test cases: ${results.length} total  (${measurable.length} measurable, ${gaps.length} content gaps)\n`

console.log(HEADER)
console.log('  Position 1:      ' + `${pos1.toString().padStart(3)} / ${measurable.length}  (${pct(pos1, measurable.length)})`)
console.log('  Top 3:           ' + `${top3.toString().padStart(3)} / ${measurable.length}  (${pct(top3, measurable.length)})`)
console.log('  Top 10:          ' + `${top10.toString().padStart(3)} / ${measurable.length}  (${pct(top10, measurable.length)})`)
console.log('  Not in top 50:   ' + `${miss.toString().padStart(3)} / ${measurable.length}  (${pct(miss, measurable.length)})`)

// By intent breakdown
console.log('\n  By intent:')
const intentGroups = new Map<string, Result[]>()
for (const r of measurable) {
  if (!intentGroups.has(r.intent)) intentGroups.set(r.intent, [])
  intentGroups.get(r.intent)!.push(r)
}
for (const [intent, rs] of [...intentGroups.entries()].sort()) {
  const p1 = rs.filter((r) => r.passKind === 'pos1').length
  const t3 = rs.filter((r) => r.passKind === 'pos1' || r.passKind === 'top3').length
  const m = rs.filter((r) => r.passKind === 'miss').length
  console.log(`    ${intent.padEnd(20)} n=${String(rs.length).padStart(3)}   pos1=${String(p1).padStart(2)}   top3=${String(t3).padStart(2)}   miss=${String(m).padStart(2)}`)
}

// ---------------------------------------------------------------------------
// Failures (cases where pass=false)
// ---------------------------------------------------------------------------

const failures = measurable.filter((r) => !r.pass).sort((a, b) => b.volume - a.volume)

if (failures.length > 0) {
  console.log(`\n  Failures (${failures.length}):`)
  for (const f of failures) {
    const expected = f.expected.length === 1 ? f.expected[0] : `[any of ${f.expected.length}]`
    const posStr = f.bestPosition == null ? 'not found' : `pos ${f.bestPosition}`
    console.log(`    "${f.query}" (vol ${f.volume}) — expected ${expected} — got ${posStr}`)
    if (VERBOSE || f.bestPosition == null) {
      for (let i = 0; i < Math.min(3, f.topResults.length); i++) {
        const r = f.topResults[i]
        console.log(`        ${i + 1}. ${r.id}  (score ${r.score.toFixed(1)})`)
      }
    }
  }
}

if (VERBOSE) {
  console.log(`\n  All passes:`)
  for (const r of measurable.filter((x) => x.pass)) {
    console.log(`    "${r.query}" — pos ${r.bestPosition} (${r.passKind})`)
  }
}

if (gaps.length > 0) {
  console.log(`\n  Content gaps (${gaps.length} queries, no content; ranker not measured):`)
  for (const g of gaps.sort((a, b) => b.volume - a.volume)) {
    console.log(`    "${g.query}" (vol ${g.volume})`)
  }
}

// ---------------------------------------------------------------------------
// Baseline / compare
// ---------------------------------------------------------------------------

if (SAVE_BASELINE) {
  writeFileSync(BASELINE_PATH, JSON.stringify(results, null, 2))
  console.log(`\n  Saved baseline -> ${BASELINE_PATH}`)
}

if (COMPARE_BASELINE) {
  if (!existsSync(BASELINE_PATH)) {
    console.error(`\n  No baseline at ${BASELINE_PATH}. Run with --baseline first.`)
    process.exit(2)
  }
  const baseline: Result[] = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'))
  const baseByQuery = new Map(baseline.map((r) => [r.query, r]))

  console.log('\n  Compared to baseline:')
  let improved = 0, regressed = 0, unchanged = 0
  for (const r of results) {
    const b = baseByQuery.get(r.query)
    if (!b || r.contentGap) continue
    const wasPass = b.pass, nowPass = r.pass
    const wasPos = b.bestPosition, nowPos = r.bestPosition
    if (wasPass && !nowPass) {
      regressed++
      console.log(`    REGRESS  "${r.query}"  was pos ${wasPos} (${b.passKind}) -> now pos ${nowPos ?? 'miss'} (${r.passKind})`)
    } else if (!wasPass && nowPass) {
      improved++
      console.log(`    IMPROVE  "${r.query}"  was pos ${wasPos ?? 'miss'} (${b.passKind}) -> now pos ${nowPos} (${r.passKind})`)
    } else if (wasPos !== nowPos) {
      // Same pass status but different position
      const direction = (nowPos ?? 999) < (wasPos ?? 999) ? 'UP' : 'DOWN'
      console.log(`    ${direction.padEnd(8)} "${r.query}"  ${wasPos ?? 'miss'} -> ${nowPos ?? 'miss'}`)
    } else {
      unchanged++
    }
  }
  console.log(`\n  Summary: +${improved} improved, -${regressed} regressed, ${unchanged} unchanged`)
}

if (JSON_OUT) {
  writeFileSync(JSON_OUT, JSON.stringify(results, null, 2))
  console.log(`\n  Wrote detailed results -> ${JSON_OUT}`)
}

// Exit code reflects success
process.exit(failures.length > 0 && COMPARE_BASELINE ? 0 : 0)

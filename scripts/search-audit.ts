#!/usr/bin/env tsx
/**
 * Full-distribution audit of search ranking.
 *
 * Compares two rankers across EVERY real query from the search-analytics
 * CSV (vs. the 119-case curated eval used by search:eval):
 *
 *   - Baseline: plain MiniSearch with the same field-level boosts but
 *     no doc-type boost, no exact-title boost, no synonyms, no compound
 *     expansion at query time, no stopword strip. This is what "before"
 *     looks like — what a competent default lexical search would do.
 *
 *   - Tuned: our runSearch() with everything we've added in this branch.
 *
 * Reports volume-weighted aggregate health metrics + writes a sample of
 * queries (stratified by volume tier) for manual spot-check.
 *
 * Usage:  npm run search:audit
 */

import { readFileSync, writeFileSync } from 'node:fs'
import MiniSearch from 'minisearch'
import {
  MINISEARCH_OPTIONS,
  runSearch,
  SEARCH_OPTIONS,
} from '../.vitepress/theme/composables/searchOptions'

const INDEX_PATH = 'public/search-index.json'
const ANALYTICS_CSV = '/Users/parker.wiley/Downloads/SearchAnalytics_20May2026_083740.csv'
const SAMPLE_PATH = 'scripts/search-audit-sample.json'
const FULL_PATH = 'scripts/search-audit-full.json'

// ---------------------------------------------------------------------------
// Load index
// ---------------------------------------------------------------------------

const payload = JSON.parse(readFileSync(INDEX_PATH, 'utf8'))
const ms = MiniSearch.loadJS(payload.miniSearchIndex, MINISEARCH_OPTIONS)

// ---------------------------------------------------------------------------
// Two rankers
// ---------------------------------------------------------------------------

/**
 * "Untuned" baseline: simple tokenizer (no compound expansion, no
 * camelCase split), same field boosts as our tuned search but no
 * doc-type boost, no title-match boost, no synonyms, no stopword strip.
 *
 * We use MiniSearch's per-search tokenize/processTerm override to apply
 * the simple tokenizer at QUERY time without re-indexing.
 */
function simpleTokenize(text: string): string[] {
  return text
    .split(/[\s.,;:!?()[\]{}"'`<>/\\|+=*&%$#@~^\-_]+/u)
    .filter(Boolean)
    .map((s) => s.toLowerCase())
}
function simpleProcessTerm(t: string): string {
  return t.toLowerCase()
}

interface Hit {
  id: string
  score: number
  title?: string
  type?: string
  hub?: string
}

function baselineSearch(query: string): Hit[] {
  const q = query.trim()
  if (!q) return []
  return ms.search(q, {
    ...SEARCH_OPTIONS,
    tokenize: simpleTokenize,
    processTerm: simpleProcessTerm,
    combineWith: 'OR',
  }) as Hit[]
}

function tunedSearch(query: string): Hit[] {
  return runSearch<Hit>(ms, query)
}

// ---------------------------------------------------------------------------
// Load queries from analytics CSV
// ---------------------------------------------------------------------------

const csvText = readFileSync(ANALYTICS_CSV, 'utf8').replace(/^﻿/, '')
const lines = csvText.trim().split('\n')
interface Row { query: string; volume: number }
const rows: Row[] = []
for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(',')
  const query = (cols[0] ?? '').trim()
  const volume = parseInt(cols[1] ?? '0', 10) || 0
  if (query && volume > 0) rows.push({ query, volume })
}
console.log(`Loaded ${rows.length} unique queries (${rows.reduce((s, r) => s + r.volume, 0)} total events)`)

// ---------------------------------------------------------------------------
// Run both rankers
// ---------------------------------------------------------------------------

interface Audit {
  query: string
  volume: number
  baseHits: number
  tuneHits: number
  baseTop?: string
  tuneTop?: string
  baseTopType?: string
  tuneTopType?: string
  baseTopScore?: number
  tuneTopScore?: number
  top3Jaccard: number
  topChanged: boolean
}

function setOf(hits: Hit[], n: number): Set<string> {
  return new Set(hits.slice(0, n).map((h) => h.id))
}
function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1
  const inter = [...a].filter((x) => b.has(x)).length
  const union = new Set([...a, ...b]).size
  return union === 0 ? 0 : inter / union
}

const audits: Audit[] = []
for (const row of rows) {
  const baseHits = baselineSearch(row.query)
  const tuneHits = tunedSearch(row.query)
  audits.push({
    query: row.query,
    volume: row.volume,
    baseHits: baseHits.length,
    tuneHits: tuneHits.length,
    baseTop: baseHits[0]?.id,
    tuneTop: tuneHits[0]?.id,
    baseTopType: baseHits[0]?.type,
    tuneTopType: tuneHits[0]?.type,
    baseTopScore: baseHits[0]?.score,
    tuneTopScore: tuneHits[0]?.score,
    top3Jaccard: jaccard(setOf(baseHits, 3), setOf(tuneHits, 3)),
    topChanged: (baseHits[0]?.id ?? '') !== (tuneHits[0]?.id ?? ''),
  })
}

// ---------------------------------------------------------------------------
// Aggregate metrics
// ---------------------------------------------------------------------------

const totalVol = audits.reduce((s, a) => s + a.volume, 0)
const N = audits.length
const baseCov = audits.filter((a) => a.baseHits > 0).length
const tuneCov = audits.filter((a) => a.tuneHits > 0).length
const baseCovVol = audits.filter((a) => a.baseHits > 0).reduce((s, a) => s + a.volume, 0)
const tuneCovVol = audits.filter((a) => a.tuneHits > 0).reduce((s, a) => s + a.volume, 0)

// Only count "top-1 changed" when both rankers returned something
const bothHit = audits.filter((a) => a.baseHits > 0 && a.tuneHits > 0)
const changed = bothHit.filter((a) => a.topChanged)
const changedVol = changed.reduce((s, a) => s + a.volume, 0)
const bothHitVol = bothHit.reduce((s, a) => s + a.volume, 0)

const avgJaccard = audits.reduce((s, a) => s + a.top3Jaccard, 0) / N
const volWeightedJaccard = audits.reduce((s, a) => s + a.top3Jaccard * a.volume, 0) / totalVol

const tunedOnlyHits = audits.filter((a) => a.baseHits === 0 && a.tuneHits > 0)
const baseOnlyHits = audits.filter((a) => a.tuneHits === 0 && a.baseHits > 0)

function pct(n: number, d: number): string { return d === 0 ? 'n/a' : `${((n / d) * 100).toFixed(1)}%` }

console.log(`
Full-distribution audit  (every real keyword query, last 30 days)
==================================================================
Unique queries:  ${N}
Total events:    ${totalVol}

Coverage (returns >= 1 hit):
  Baseline:  ${baseCov}/${N} unique (${pct(baseCov, N)})   ${baseCovVol}/${totalVol} events (${pct(baseCovVol, totalVol)})
  Tuned:     ${tuneCov}/${N} unique (${pct(tuneCov, N)})   ${tuneCovVol}/${totalVol} events (${pct(tuneCovVol, totalVol)})
  Tuned-only hits:  ${tunedOnlyHits.length} queries (${tunedOnlyHits.reduce((s,a)=>s+a.volume,0)} events) — queries the baseline missed but we now find
  Base-only hits:   ${baseOnlyHits.length} queries (${baseOnlyHits.reduce((s,a)=>s+a.volume,0)} events) — queries we now miss but baseline returned

Top-1 stability (queries where both returned hits):
  Top-1 changed:   ${changed.length}/${bothHit.length} unique (${pct(changed.length, bothHit.length)})   ${changedVol}/${bothHitVol} events (${pct(changedVol, bothHitVol)})
  Top-3 Jaccard:   ${avgJaccard.toFixed(3)} unique-avg / ${volWeightedJaccard.toFixed(3)} vol-weighted
                   (1.0 = identical, 0.0 = no overlap)
`)

// Doc-type composition shift
function typeBreakdown(which: 'base' | 'tune', volWeighted: boolean): Record<string, number> {
  const m: Record<string, number> = {}
  for (const a of audits) {
    const t = which === 'base' ? a.baseTopType : a.tuneTopType
    if (!t) continue
    m[t] = (m[t] || 0) + (volWeighted ? a.volume : 1)
  }
  return m
}
const baseTypes = typeBreakdown('base', true)
const tuneTypes = typeBreakdown('tune', true)
const allTypes = [...new Set([...Object.keys(baseTypes), ...Object.keys(tuneTypes)])].sort()
console.log('Top-1 doc-type composition (volume-weighted events):')
for (const t of allTypes) {
  const b = baseTypes[t] || 0
  const tu = tuneTypes[t] || 0
  const delta = tu - b
  const sign = delta >= 0 ? '+' : ''
  console.log(`  ${t.padEnd(15)} base ${b.toString().padStart(5)}   tuned ${tu.toString().padStart(5)}   Δ ${sign}${delta}`)
}

// Hub composition
function hubBreakdown(which: 'base' | 'tune'): Record<string, number> {
  const m: Record<string, number> = {}
  for (const a of audits) {
    const hits = which === 'base' ? baselineSearch(a.query) : tunedSearch(a.query)
    const top = hits[0]
    if (!top) continue
    const hub = top.hub || 'unknown'
    m[hub] = (m[hub] || 0) + a.volume
  }
  return m
}
const baseHubs = hubBreakdown('base')
const tuneHubs = hubBreakdown('tune')
const allHubs = [...new Set([...Object.keys(baseHubs), ...Object.keys(tuneHubs)])].sort()
console.log('\nTop-1 hub composition (volume-weighted events):')
for (const h of allHubs) {
  const b = baseHubs[h] || 0
  const tu = tuneHubs[h] || 0
  const delta = tu - b
  const sign = delta >= 0 ? '+' : ''
  console.log(`  ${h.padEnd(15)} base ${b.toString().padStart(5)}   tuned ${tu.toString().padStart(5)}   Δ ${sign}${delta}`)
}

// Score distribution sanity
const tuneMedianHits = (() => {
  const counts = audits.map((a) => a.tuneHits).sort((a, b) => a - b)
  return counts[Math.floor(counts.length / 2)]
})()
const baseMedianHits = (() => {
  const counts = audits.map((a) => a.baseHits).sort((a, b) => a - b)
  return counts[Math.floor(counts.length / 2)]
})()
console.log(`\nResult-count median:  base=${baseMedianHits}  tuned=${tuneMedianHits}`)

// ---------------------------------------------------------------------------
// Stratified sample for manual review
// ---------------------------------------------------------------------------

const head = audits.filter((a) => a.volume >= 5)
const shoulder = audits.filter((a) => a.volume >= 2 && a.volume < 5)
const tail = audits.filter((a) => a.volume === 1)
console.log(`\nVolume tiers:  head (>=5) ${head.length}   shoulder (2-4) ${shoulder.length}   tail (=1) ${tail.length}`)

function pickN<T>(arr: T[], n: number, seed: number): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

const sample = [
  ...pickN(head, Math.min(20, head.length), 42),
  ...pickN(shoulder, Math.min(20, shoulder.length), 43),
  ...pickN(tail, Math.min(20, tail.length), 44),
]

interface SampleEntry {
  query: string
  volume: number
  tier: 'head' | 'shoulder' | 'tail'
  top1Changed: boolean
  baseline: { id: string; score: number; title?: string; type?: string }[]
  tuned: { id: string; score: number; title?: string; type?: string }[]
}

const sampleOut: SampleEntry[] = sample.map((a) => {
  const tier: SampleEntry['tier'] = a.volume >= 5 ? 'head' : a.volume >= 2 ? 'shoulder' : 'tail'
  const bh = baselineSearch(a.query).slice(0, 3)
  const th = tunedSearch(a.query).slice(0, 3)
  return {
    query: a.query,
    volume: a.volume,
    tier,
    top1Changed: a.topChanged,
    baseline: bh.map((h) => ({ id: h.id, score: +h.score.toFixed(1), title: h.title, type: h.type })),
    tuned: th.map((h) => ({ id: h.id, score: +h.score.toFixed(1), title: h.title, type: h.type })),
  }
})

writeFileSync(SAMPLE_PATH, JSON.stringify(sampleOut, null, 2))
console.log(`\nSaved ${sample.length}-query sample -> ${SAMPLE_PATH}`)

// Save full audit too
writeFileSync(FULL_PATH, JSON.stringify(audits, null, 2))
console.log(`Saved full audit -> ${FULL_PATH}`)

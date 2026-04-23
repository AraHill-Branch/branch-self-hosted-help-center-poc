#!/usr/bin/env tsx
/**
 * Build a miniSearch index over every indexable page on the Help Center
 * and emit it as a single static JSON asset at public/search-index.json.
 *
 * Runs before `vitepress build` / `vitepress dev` (wired in package.json).
 *
 * What gets indexed (one document per page):
 *   id         - URL path without the trailing /index (e.g. /marketer-hub/links/qr-codes/create-qr-codes)
 *   title      - from frontmatter `title:` or H1
 *   headings   - h1..h6 text joined, used for `titles` boost
 *   body       - stripped markdown -> plain text
 *   breadcrumb - resolved from sidebar-hubs.ts + apidocs directory scan
 *                ("Marketer Hub > Links > QR Codes")
 *   hub        - 'account' | 'marketer' | 'developer' | 'apidocs'
 *   type       - 'article' | 'api-endpoint' | 'api-overview' | 'category' | 'release-note'
 *
 * Skip rules:
 *   - homepage (index.md at repo root)
 *   - frontmatter `search: false`
 *   - pages not reachable from any sidebar (orphans)
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import yaml from 'js-yaml'
import MiniSearch from 'minisearch'
import {
  accountHubSidebar,
  marketerHubSidebar,
  developerHubSidebar,
} from '../.vitepress/sidebar-hubs'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Hub = 'account' | 'marketer' | 'developer' | 'apidocs'
type DocType = 'article' | 'api-endpoint' | 'api-overview' | 'category' | 'release-note'

type IndexedDoc = {
  id: string
  title: string
  headings: string
  body: string
  breadcrumb: string
  hub: Hub
  type: DocType
}

type SidebarItem = {
  text: string
  link?: string
  items?: SidebarItem[]
}

// ---------------------------------------------------------------------------
// Breadcrumb map
// Walks every provided sidebar tree, recording link -> breadcrumb string for
// everything that has a link. Also reconstructs the apidocs sidebar from disk
// so /apidocs/* pages get proper breadcrumbs.
// ---------------------------------------------------------------------------

const HUB_ROOT_LABEL: Record<Hub, string> = {
  account: 'Account Hub',
  marketer: 'Marketer Hub',
  developer: 'Developer Hub',
  apidocs: 'API Documentation',
}

const linkToBreadcrumb = new Map<string, string>()

function walkSidebar(items: SidebarItem[], trail: string[]): void {
  for (const item of items) {
    const here = item.text ? [...trail, item.text] : trail
    if (item.link) {
      const key = normaliseUrl(item.link)
      linkToBreadcrumb.set(key, here.join(' \u203A '))
    }
    if (item.items) walkSidebar(item.items, here)
  }
}

function normaliseUrl(url: string): string {
  // Strip trailing slash except for root-like paths; collapse /index if present.
  let u = url.replace(/\/index$/, '/')
  if (u.length > 1 && u.endsWith('/')) u = u.slice(0, -1)
  return u
}

walkSidebar(accountHubSidebar as SidebarItem[], [HUB_ROOT_LABEL.account])
walkSidebar(marketerHubSidebar as SidebarItem[], [HUB_ROOT_LABEL.marketer])
walkSidebar(developerHubSidebar as SidebarItem[], [HUB_ROOT_LABEL.developer])

// apidocs sidebar: reconstruct from disk since it's not in sidebar-hubs.ts
for (const dirName of safeReaddir('apidocs')) {
  const dir = join('apidocs', dirName)
  if (!isDir(dir)) continue
  const specPath = join(dir, 'openapi.yaml')
  if (!existsSync(specPath)) continue
  let spec: any
  try { spec = yaml.load(readFileSync(specPath, 'utf8')) } catch { continue }
  const apiTitle: string = spec?.info?.title ?? dirName
  linkToBreadcrumb.set(normaliseUrl(`/apidocs/${dirName}/`), `${HUB_ROOT_LABEL.apidocs} \u203A ${apiTitle} \u203A Overview`)
  for (const verbs of Object.values<any>(spec?.paths ?? {})) {
    for (const op of Object.values<any>(verbs ?? {})) {
      if (!op?.operationId) continue
      const summary = op.summary ?? op.operationId
      linkToBreadcrumb.set(
        normaliseUrl(`/apidocs/${dirName}/operations/${op.operationId}`),
        `${HUB_ROOT_LABEL.apidocs} \u203A ${apiTitle} \u203A ${summary}`
      )
    }
  }
}
linkToBreadcrumb.set(normaliseUrl('/apidocs/'), `${HUB_ROOT_LABEL.apidocs}`)

// ---------------------------------------------------------------------------
// File walking + classification
// ---------------------------------------------------------------------------

const HUB_DIRS: Array<[Hub, string]> = [
  ['account', 'account-hub'],
  ['marketer', 'marketer-hub'],
  ['developer', 'developer-hub'],
  ['apidocs', 'apidocs'],
]

function safeReaddir(dir: string): string[] {
  try { return readdirSync(dir) } catch { return [] }
}

function isDir(p: string): boolean {
  try { return statSync(p).isDirectory() } catch { return false }
}

function* walkMd(dir: string): Generator<string> {
  for (const entry of safeReaddir(dir)) {
    const p = join(dir, entry)
    if (isDir(p)) yield* walkMd(p)
    else if (entry.endsWith('.md')) yield p
  }
}

function urlFromFilePath(filePath: string): string {
  // account-hub/get-started/products.md -> /account-hub/get-started/products
  // account-hub/index.md                 -> /account-hub/
  let url = '/' + filePath.replace(/\\/g, '/')
  url = url.replace(/\.md$/, '')
  if (url.endsWith('/index')) url = url.slice(0, -'index'.length)
  return url
}

function classifyType(filePath: string, hub: Hub): DocType {
  const url = urlFromFilePath(filePath)
  if (hub === 'apidocs') {
    if (/\/apidocs\/[^/]+\/operations\/[^/]+$/.test(url)) return 'api-endpoint'
    return 'api-overview'
  }
  if (/\/release-notes\//.test(url)) return 'release-note'
  // Top-level hub landing / section index pages are "category"-ish.
  const rel = url.replace(/^\/[^/]+\//, '')
  if (!rel || rel === '' || rel.endsWith('/')) return 'category'
  return 'article'
}

// ---------------------------------------------------------------------------
// Content extraction
// ---------------------------------------------------------------------------

type Parsed = { frontmatter: Record<string, any>; body: string }

function parseFrontmatter(text: string): Parsed {
  if (!text.startsWith('---')) return { frontmatter: {}, body: text }
  const end = text.indexOf('\n---', 3)
  if (end < 0) return { frontmatter: {}, body: text }
  const raw = text.slice(3, end)
  const body = text.slice(end + 4).replace(/^\s*\n/, '')
  let fm: any = {}
  try { fm = yaml.load(raw) ?? {} } catch { fm = {} }
  return { frontmatter: fm, body }
}

function extractHeadings(body: string): string {
  const headings: string[] = []
  const re = /^(#{1,6})\s+(.+?)\s*$/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(body)) !== null) {
    headings.push(m[2].replace(/[`*_]/g, '').trim())
  }
  return headings.join(' \u00b7 ')
}

function stripToPlainText(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`\n]*`/g, ' ')       // inline code
    .replace(/<!--[\s\S]*?-->/g, ' ') // html comments
    .replace(/<\/?[a-zA-Z][^>]*>/g, ' ') // html/vue tags
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images -> alt
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')  // links -> text
    .replace(/^#{1,6}\s+/gm, '')      // heading marks
    .replace(/[*_>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function firstH1(body: string): string | undefined {
  const m = body.match(/^#\s+(.+?)\s*$/m)
  return m ? m[1].replace(/[`*_]/g, '').trim() : undefined
}

// ---------------------------------------------------------------------------
// Build pass
// ---------------------------------------------------------------------------

const docs: IndexedDoc[] = []
let skippedOrphans = 0
let skippedExplicit = 0

for (const [hub, rootDir] of HUB_DIRS) {
  for (const filePath of walkMd(rootDir)) {
    const abs = filePath
    const text = readFileSync(abs, 'utf8')
    const { frontmatter, body } = parseFrontmatter(text)
    if (frontmatter?.search === false) { skippedExplicit++; continue }

    const url = urlFromFilePath(relative('.', filePath).replace(/^\.\//, ''))
    const normalised = normaliseUrl(url)
    const breadcrumb = linkToBreadcrumb.get(normalised)

    if (!breadcrumb) {
      // Not reachable from any sidebar -> orphan. Skip per product decision.
      skippedOrphans++
      continue
    }

    const title = String(frontmatter?.title ?? firstH1(body) ?? '').trim() || normalised
    const headings = extractHeadings(body)
    const bodyText = stripToPlainText(body)

    docs.push({
      id: normalised,
      title,
      headings,
      body: bodyText,
      breadcrumb,
      hub,
      type: classifyType(relative('.', filePath).replace(/^\.\//, ''), hub),
    })
  }
}

// ---------------------------------------------------------------------------
// miniSearch index
// ---------------------------------------------------------------------------

// Trim body for each doc before indexing: we need enough context for an
// excerpt around the match (~80 chars) but shipping every page's full text
// in the index is wasteful. 1200 chars gives room for 2-3 excerpt windows.
for (const d of docs) {
  if (d.body.length > 1200) d.body = d.body.slice(0, 1200)
}

const miniSearch = new MiniSearch<IndexedDoc>({
  fields: ['title', 'headings', 'body', 'breadcrumb'],
  storeFields: ['id', 'title', 'breadcrumb', 'hub', 'type', 'body'],
  // Keep technical identifiers (center_logo_url, api-key) intact AND emit the
  // sub-parts (center, logo, url) so both "logo" and "center_logo_url" hit.
  tokenize: (text) => {
    const base = text.split(/[\s.,;:!?()[\]{}"'`<>/\\|+=*&%$#@~^]+/u).filter(Boolean)
    const extras: string[] = []
    for (const t of base) {
      if (t.includes('_')) extras.push(...t.split('_').filter(Boolean))
      if (t.includes('-')) extras.push(...t.split('-').filter(Boolean))
      if (/[a-z][A-Z]/.test(t)) {
        extras.push(...t.split(/(?<=[a-z])(?=[A-Z])/).filter(Boolean))
      }
    }
    return [...base, ...extras].map((s) => s.toLowerCase())
  },
  processTerm: (t) => t.toLowerCase(),
  searchOptions: {
    fuzzy: 0.2,
    prefix: true,
    maxFuzzy: 2,
    boost: { title: 8, headings: 4, breadcrumb: 3, body: 1 },
  },
})
miniSearch.addAll(docs)

// miniSearch's storeFields carries every stored field (id, title,
// breadcrumb, hub, type, body) through to client-side results. No need
// to ship a separate `docs` array.
const payload = {
  version: 1,
  generatedAt: new Date().toISOString(),
  miniSearchIndex: miniSearch.toJSON(),
}

const outPath = 'public/search-index.json'
writeFileSync(outPath, JSON.stringify(payload))

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const byHub = docs.reduce<Record<string, number>>((acc, d) => {
  acc[d.hub] = (acc[d.hub] ?? 0) + 1
  return acc
}, {})
const byType = docs.reduce<Record<string, number>>((acc, d) => {
  acc[d.type] = (acc[d.type] ?? 0) + 1
  return acc
}, {})
const sizeKb = Math.round(JSON.stringify(payload).length / 1024)

console.log(`Indexed ${docs.length} documents -> ${outPath} (${sizeKb} KB)`)
console.log(`  by hub:  ${JSON.stringify(byHub)}`)
console.log(`  by type: ${JSON.stringify(byType)}`)
console.log(`  skipped orphans: ${skippedOrphans}, search:false: ${skippedExplicit}`)

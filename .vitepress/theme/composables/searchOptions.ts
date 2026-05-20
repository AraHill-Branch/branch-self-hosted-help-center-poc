/**
 * Shared MiniSearch options. Single source of truth for:
 *   - scripts/build-search-index.ts   (indexing time, Node)
 *   - composables/useSearchIndex.ts   (runtime, browser)
 *   - scripts/search-eval.ts          (evaluation harness, Node)
 *
 * Changing tokenization, boosts, or fuzzy settings here updates all
 * three call sites. If indexer and runtime drift, hydrating the index
 * silently mis-tokenizes queries and search quality collapses.
 */

export const SEARCH_FIELDS = ['title', 'headings', 'slug', 'body', 'breadcrumb'] as const
export const SEARCH_STORE_FIELDS = ['id', 'title', 'breadcrumb', 'hub', 'type', 'body'] as const

/**
 * Branch-specific compound decompositions. Users routinely squish
 * multi-word product names into single tokens ("deeplink", "quicklink",
 * "deepview") but our docs always render them with a space. Without
 * expansion the index has no token that matches the squished form, so
 * the query returns nothing — even though the page clearly exists.
 *
 * Applied symmetrically at index and query time via tokenize(): the
 * original token is kept AND the split form is emitted as extras.
 *
 * Keep this list to terms we've actually seen in search analytics. A
 * generic "compound splitter" would over-fire and corrupt unrelated
 * tokens.
 */
const COMPOUND_EXPANSIONS: Record<string, string[]> = {
  deeplink: ['deep', 'link'],
  deeplinks: ['deep', 'link'],
  deeplinking: ['deep', 'linking'],
  quicklink: ['quick', 'link'],
  quicklinks: ['quick', 'link'],
  longlink: ['long', 'link'],
  longlinks: ['long', 'link'],
  nativelink: ['native', 'link'],
  deepview: ['deep', 'view'],
  deepviews: ['deep', 'view'],
  smartbanner: ['smart', 'banner'],
  smartbanners: ['smart', 'banner'],
  appstore: ['app', 'store'],
  playstore: ['play', 'store'],
  webtoapp: ['web', 'to', 'app'],
}

/**
 * Tokenizer: keep technical identifiers (center_logo_url, api-key) as
 * single tokens AND emit their sub-parts (center, logo, url) so both
 * the full identifier and any component word can match.
 *
 * Splits on: whitespace + common prose punctuation but NOT _, -, .
 * (so identifiers survive). Then emits extras by splitting _, -, and
 * camelCase boundaries.
 */
export function tokenize(text: string): string[] {
  const base = text.split(/[\s.,;:!?()[\]{}"'`<>/\\|+=*&%$#@~^]+/u).filter(Boolean)
  const extras: string[] = []
  for (const t of base) {
    if (t.includes('_')) extras.push(...t.split('_').filter(Boolean))
    if (t.includes('-')) extras.push(...t.split('-').filter(Boolean))
    if (/[a-z][A-Z]/.test(t)) {
      extras.push(...t.split(/(?<=[a-z])(?=[A-Z])/).filter(Boolean))
    }
    const lower = t.toLowerCase()
    if (COMPOUND_EXPANSIONS[lower]) extras.push(...COMPOUND_EXPANSIONS[lower])
  }
  return [...base, ...extras].map((s) => s.toLowerCase())
}

export function processTerm(t: string): string | false {
  return t.toLowerCase()
}

/**
 * Default search options at query time. Boosts here are the active
 * tuning lever. Order of magnitude reflects how strongly each field
 * influences relevance:
 *   title       — most important (page identity)
 *   headings    — strong (H2/H3 context)
 *   slug        — moderate (URL identity; catches technical terms like
 *                "cpp" that appear in slug but not title)
 *   breadcrumb  — moderate (hub/section context)
 *   body        — baseline
 */
export const SEARCH_OPTIONS = {
  fuzzy: 0.2,
  prefix: true,
  maxFuzzy: 2,
  boost: { title: 8, headings: 4, breadcrumb: 3, slug: 2, body: 1 },
} as const

/**
 * Light stemmer for exact-title comparison only. Drops common English
 * inflections so queries and titles match across plural/gerund forms:
 *   "apis"  -> "api"    (api ↔ apis)
 *   "links" -> "link"   (long link ↔ long links)
 *   "linking" -> "link" (deep link ↔ deep linking)
 *   "categories" -> "category"
 *
 * Guards: skip words <=3 chars (avoids "ads"/"ad" collision), skip -ss
 * endings (avoids "process" -> "proces"). This is intentionally crude;
 * it only governs whether the exact-title boost fires, not which docs
 * are retrieved.
 */
function stemTitleToken(t: string): string {
  if (t.length <= 3) return t
  if (t.endsWith('ies') && t.length > 4) return t.slice(0, -3) + 'y'
  if (t.endsWith('ing') && t.length > 4) return t.slice(0, -3)
  if (t.endsWith('es') && !t.endsWith('sses') && t.length > 4) return t.slice(0, -2)
  if (t.endsWith('s') && !t.endsWith('ss')) return t.slice(0, -1)
  return t
}

/**
 * Normalize a string for exact-title matching: lowercase, trim,
 * collapse whitespace, strip "landing-page" suffix words, and stem
 * each remaining word. Branch's convention is to title overview pages
 * "<Topic> Overview" / "<Topic> Guide" / etc., but users type the
 * topic alone ("fraud", "engagement builder", "google ads"). Stripping
 * these suffixes on BOTH sides lets the exact-title boost fire.
 *
 * We do NOT strip "API" because there's real ambiguity — "Quick Link
 * API" vs "Quick Link" are different pages and a user typing "quick
 * link api" specifically wants the API one.
 */
const TITLE_SUFFIX_RE = /\s+(overview|guide|reference|introduction)$/i
function normalizeForTitleMatch(s: string): string {
  const cleaned = s.toLowerCase().trim().replace(/\s+/g, ' ').replace(TITLE_SUFFIX_RE, '')
  return cleaned.split(' ').map(stemTitleToken).join(' ')
}

/**
 * Compact form: stems, then drops spaces. Catches single-word compound
 * queries that match multi-word titles ("deepview" ↔ "Deepviews",
 * "deeplink" ↔ "Deep Linking"). Used as a fallback when the spaced
 * normalized form doesn't match.
 */
function compactForTitleMatch(s: string): string {
  return normalizeForTitleMatch(s).replace(/\s+/g, '')
}

/**
 * Per-query search options. Wraps the static SEARCH_OPTIONS with a
 * boostDocument that applies an exact-title super-boost: if a doc's
 * title equals the entire query (case/whitespace insensitive), its
 * relevance is multiplied by EXACT_TITLE_BOOST.
 *
 * This fixes the most common failure mode where an overview page
 * gets out-ranked by a more-specific sub-page that happens to repeat
 * the term in its body. e.g. searching "fraud" should land
 * /marketer-hub/ads/fraud/fraud (title "Fraud"), not /fraud-analytics.
 */
export const EXACT_TITLE_BOOST = 12

/**
 * Phrase-substring boost: the entire stemmed query appears as a
 * contiguous substring inside the stemmed title. Stronger signal than
 * unordered token coverage. Example: "universal email" ↔ "Universal
 * Email Link Debugger", "ad partner" ↔ "Ad Partner Integration Guide".
 */
export const PHRASE_TITLE_BOOST = 6

/**
 * Softer title boost: every stemmed query token appears in the
 * stemmed title (in any order). Bridges title-vs-query phrasing
 * differences like "event tracking" ↔ "Track Branch Events".
 *
 * Only fires on multi-word queries — for single words, every doc
 * whose title contains the word would over-boost. Skipped when a
 * stronger boost (exact or phrase) already applies.
 */
export const PARTIAL_TITLE_BOOST = 3

/**
 * Per-doc-type multipliers. Picked from analytics — for broad single-word
 * queries like "fraud" or "email", users want the section overview, not
 * a deep sub-page. Release notes get demoted because they accumulate
 * keyword frequency on every minor release but are rarely the right
 * destination for a Help-Center search.
 */
const TYPE_BOOST: Record<string, number> = {
  overview: 2.0,
  category: 1.8,
  'api-overview': 1.6,
  'api-endpoint': 1.2,
  article: 1.0,
  'release-note': 0.4,
}

export function searchOptionsForQuery(query: string) {
  const target = normalizeForTitleMatch(query)
  const targetCompact = compactForTitleMatch(query)
  // Pre-tokenize the stemmed query for the partial-title check.
  const targetTokens = target.split(/\s+/).filter((t) => t.length > 1)
  const multiWord = targetTokens.length >= 2
  // For single-word queries the user almost always wants the section
  // landing ("fraud" -> Fraud overview, "link" -> Deep Linking
  // overview). Push overview/category pages harder in that case.
  const singleWordOverviewExtra = multiWord ? 1 : 1.5
  return {
    ...SEARCH_OPTIONS,
    boostDocument: (
      _docId: string,
      _term: string,
      storedFields?: Record<string, unknown>,
    ): number => {
      const rawTitle = typeof storedFields?.title === 'string' ? storedFields.title : ''
      const title = rawTitle ? normalizeForTitleMatch(rawTitle) : ''
      const titleCompact = rawTitle ? compactForTitleMatch(rawTitle) : ''
      const docType = typeof storedFields?.type === 'string' ? storedFields.type : 'article'

      let boost = TYPE_BOOST[docType] ?? 1
      if (docType === 'overview' || docType === 'category' || docType === 'api-overview') {
        boost *= singleWordOverviewExtra
      }
      const titleMatched =
        (title && title === target) ||
        (titleCompact && titleCompact === targetCompact)
      if (titleMatched) {
        boost *= EXACT_TITLE_BOOST
      } else if (multiWord && title) {
        // Phrase substring is the strongest non-exact signal.
        const phraseMatched = title.includes(target)
        if (phraseMatched) {
          boost *= PHRASE_TITLE_BOOST
        } else {
          // Soft partial: every query token must be present in the title.
          const titleSet = new Set(title.split(/\s+/))
          const allIn = targetTokens.every((t) => titleSet.has(t))
          if (allIn) boost *= PARTIAL_TITLE_BOOST
        }
      }
      return boost
    },
  }
}

/**
 * Run a query against a MiniSearch index using the full Help-Center
 * search strategy:
 *
 *   1. Search with OR combiner so docs missing one term still surface
 *      (avoids zero-result pages when a user phrases something slightly
 *      off — e.g. "quick link" should still find articles that say
 *      "create app links").
 *   2. Re-rank the OR results: docs containing EVERY query token (in
 *      any stored field — title, body, breadcrumb) get a multiplier.
 *      This is a softer alternative to a pure AND combiner: it rewards
 *      all-words-match without excluding partial-match pages entirely.
 *
 * Single-term queries skip the re-rank (nothing to re-balance).
 *
 * All call sites (composable, harness, anywhere we add search later)
 * go through this function — keeps the ranking strategy in one place.
 */
const ALL_TERMS_BOOST = 2.5

type StoredHit = {
  id: string
  score: number
  title?: string
  body?: string
  breadcrumb?: string
}

/**
 * Strip leading interrogative prefix from natural-language queries.
 * "how to implement branch sdk" -> "implement branch sdk"
 * "what is a deep link" -> "deep link"
 * Leaves single-word queries and identifier-style queries alone.
 *
 * We pass the cleaned query to MiniSearch for retrieval but keep the
 * ORIGINAL query for the exact-title match comparison — that way
 * something like "how to" doesn't accidentally win an exact-title boost.
 */
const QUESTION_PREFIX_RE =
  /^(how (do i|do you|to|can i|can you)|what (is|are|does|do)|where (is|are|do i)|why (is|are|does|do)|when (is|do|to)|can (i|you)|should (i|you))\s+/i
const STOPWORDS_AFTER_STRIP = new Set([
  'a', 'an', 'the', 'is', 'are', 'do', 'i', 'you', 'me', 'my',
])

function cleanQueryForRetrieval(q: string): string {
  let s = q.trim().replace(QUESTION_PREFIX_RE, '')
  if (s !== q) {
    s = s.split(/\s+/).filter((w) => !STOPWORDS_AFTER_STRIP.has(w.toLowerCase())).join(' ')
  }
  return s || q  // never return empty; fall back to original
}

/**
 * Small, hand-curated synonym dictionary. Bridges the gap between
 * user vocabulary (from search analytics) and Branch's documented
 * product names. Applied as ADDITIVE expansion at retrieval time —
 * the original query tokens are kept, synonyms are appended. With OR
 * combiner this widens the candidate set without losing precision.
 *
 * Keep this list TIGHT: only synonyms grounded in real search-analytics
 * patterns where the user's term and our doc term are reliably distinct.
 * Bad synonyms here will silently corrupt results for unrelated queries.
 *
 * The all-terms-boost re-rank uses the ORIGINAL (pre-expansion) tokens,
 * so synonyms widen retrieval but don't change which docs are deemed
 * "full coverage".
 */
const QUERY_SYNONYMS: Record<string, string> = {
  // Smart banners → Journeys product. Long-standing terminology shift.
  'smart banner': 'journey journeys banner',
  'smart banners': 'journeys banner',
  // Branch deprecated "Quick Link" naming; current docs use App/Web Link.
  'quick link': 'app link web link short link',
  'quick links': 'app links web links short links',
  // "Long link" → docs say "Long URL".
  'long link': 'long url additional configuration',
  'long links': 'long url additional configuration',
  // "Change email" → only documented on profile management pages.
  'change email': 'profile user account manage',
  // "Test mode" is enabled per-device in Branch — the canonical
  // page is "Add Test Devices".
  'test mode': 'test devices add test',
  'test devices': 'test mode add',
}

function expandQuerySynonyms(q: string): string {
  const key = q.toLowerCase().trim().replace(/\s+/g, ' ')
  const extra = QUERY_SYNONYMS[key]
  return extra ? `${q} ${extra}` : q
}

export function runSearch<T extends StoredHit>(
  miniSearch: { search: (q: string, opts?: any) => any[] },
  query: string,
): T[] {
  const q = query.trim()
  if (!q) return []
  const cleanedQuery = cleanQueryForRetrieval(q)
  const retrievalQuery = expandQuerySynonyms(cleanedQuery)
  // Title-match boost still uses the original normalized query — if a
  // user types literally "How To" as a page title, we should respect
  // that. Stopword-stripping only affects retrieval, not boost.
  const opts = searchOptionsForQuery(q)
  const hits = miniSearch.search(retrievalQuery, { ...opts, combineWith: 'OR' }) as T[]

  // Only meaningful tokens (drop stopword-like 1-char fragments). Use
  // the cleaned (pre-synonym) query so the all-terms re-rank measures
  // coverage of what the USER typed, not the broadened synonym set.
  const tokens = tokenize(cleanedQuery).filter((t) => t.length > 1)
  if (tokens.length < 2) return hits

  const rescored = hits.map((h) => {
    const haystack = (
      (h.title ?? '') + ' ' +
      (h.body ?? '') + ' ' +
      (h.breadcrumb ?? '')
    ).toLowerCase()
    const matched = tokens.filter((t) => haystack.includes(t)).length
    let factor = 1
    if (matched === tokens.length) factor = ALL_TERMS_BOOST
    else if (matched > 0) factor = 1 + (matched / tokens.length) * 0.4
    return { ...h, score: h.score * factor }
  })
  rescored.sort((a, b) => b.score - a.score)
  return rescored
}

/** Combined options object suitable for `new MiniSearch(...)`. */
export const MINISEARCH_OPTIONS = {
  fields: [...SEARCH_FIELDS],
  storeFields: [...SEARCH_STORE_FIELDS],
  tokenize,
  processTerm,
  searchOptions: { ...SEARCH_OPTIONS },
}

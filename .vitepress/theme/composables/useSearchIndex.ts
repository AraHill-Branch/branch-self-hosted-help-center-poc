// Lazy-load and query the precomputed miniSearch index at
// /search-index.json (built by scripts/build-search-index.ts).
//
// Fetches once on first call, hydrates a MiniSearch instance, caches it
// across invocations. All queries return results with stored fields
// (id, title, breadcrumb, hub, type, body) ready to render.

import { ref, shallowRef, readonly } from 'vue'
import MiniSearch, { type SearchResult } from 'minisearch'
import { MINISEARCH_OPTIONS, runSearch } from './searchOptions'

export type SearchHit = SearchResult & {
  id: string
  title: string
  breadcrumb: string
  hub: 'account' | 'marketer' | 'developer' | 'apidocs'
  type: 'article' | 'api-endpoint' | 'api-overview' | 'category' | 'release-note'
  body: string
}

type IndexState = 'idle' | 'loading' | 'ready' | 'error'

const state = ref<IndexState>('idle')
const error = ref<string | null>(null)
const miniSearch = shallowRef<MiniSearch | null>(null)

let loadPromise: Promise<void> | null = null

async function load(): Promise<void> {
  if (miniSearch.value) return
  if (loadPromise) return loadPromise
  state.value = 'loading'
  loadPromise = (async () => {
    try {
      const res = await fetch('/search-index.json')
      if (!res.ok) throw new Error(`HTTP ${res.status} loading /search-index.json`)
      const payload = await res.json()
      // Hydrate with the same options the indexer used. Drift between
      // build-time tokenize/options and runtime here would silently
      // corrupt the index.
      miniSearch.value = MiniSearch.loadJS(payload.miniSearchIndex, MINISEARCH_OPTIONS)
      state.value = 'ready'
    } catch (e: any) {
      error.value = e?.message ?? String(e)
      state.value = 'error'
    } finally {
      loadPromise = null
    }
  })()
  return loadPromise
}

function search(query: string): SearchHit[] {
  if (!miniSearch.value) return []
  // runSearch handles the full ranking strategy: exact-title boost,
  // doc-type boost, AND-then-OR fallback for multi-word queries.
  return runSearch<SearchHit>(miniSearch.value, query)
}

export function useSearchIndex() {
  return {
    state: readonly(state),
    error: readonly(error),
    load,
    search,
  }
}

// Lazy-load and query the precomputed miniSearch index at
// /search-index.json (built by scripts/build-search-index.ts).
//
// Fetches once on first call, hydrates a MiniSearch instance, caches it
// across invocations. All queries return results with stored fields
// (id, title, breadcrumb, hub, type, body) ready to render.

import { ref, shallowRef, readonly } from 'vue'
import MiniSearch, { type SearchResult } from 'minisearch'

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
      miniSearch.value = MiniSearch.loadJS(payload.miniSearchIndex, {
        fields: ['title', 'headings', 'body', 'breadcrumb'],
        storeFields: ['id', 'title', 'breadcrumb', 'hub', 'type', 'body'],
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
  const q = query.trim()
  if (!q) return []
  return miniSearch.value.search(q) as unknown as SearchHit[]
}

export function useSearchIndex() {
  return {
    state: readonly(state),
    error: readonly(error),
    load,
    search,
  }
}

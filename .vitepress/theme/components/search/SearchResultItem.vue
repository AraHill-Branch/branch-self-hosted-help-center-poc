<script setup lang="ts">
import { computed } from 'vue'
import type { SearchHit } from '../../composables/useSearchIndex'

const props = defineProps<{
  hit: SearchHit
  query: string
  active?: boolean
}>()

// Tokenize the query into the same words miniSearch matched against, so we
// can highlight them in the title + excerpt. Strip punctuation, keep tokens
// >= 2 chars to avoid highlighting every "a" and "i".
const queryTerms = computed<string[]>(() => {
  const raw = props.query.trim().toLowerCase()
  if (!raw) return []
  return raw
    .split(/[\s.,;:!?()[\]{}"'`<>/\\|+=*&%$#@~^]+/u)
    .filter((t) => t.length >= 2)
})

// Highlight matches. Returns an array of { text, match } segments so we can
// render <mark> only where appropriate. Case-insensitive.
function highlight(text: string, terms: string[]): { text: string; match: boolean }[] {
  if (!text || terms.length === 0) return [{ text, match: false }]
  const pattern = new RegExp(`(${terms.map(escapeRe).join('|')})`, 'gi')
  const parts: { text: string; match: boolean }[] = []
  let last = 0
  for (const m of text.matchAll(pattern)) {
    const start = m.index ?? 0
    if (start > last) parts.push({ text: text.slice(last, start), match: false })
    parts.push({ text: m[0], match: true })
    last = start + m[0].length
  }
  if (last < text.length) parts.push({ text: text.slice(last), match: false })
  return parts
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Build a compact excerpt: find the earliest match in body, take ±90 chars
// around it. If no match (e.g. title-only hit), first 160 chars of body.
const excerpt = computed(() => {
  const body = props.hit.body || ''
  if (!body) return ''
  const terms = queryTerms.value
  if (terms.length === 0) return body.slice(0, 160)
  const re = new RegExp(terms.map(escapeRe).join('|'), 'i')
  const m = re.exec(body)
  if (!m) return body.slice(0, 160)
  const start = Math.max(0, (m.index ?? 0) - 90)
  const end = Math.min(body.length, (m.index ?? 0) + 110)
  const prefix = start > 0 ? '\u2026 ' : ''
  const suffix = end < body.length ? ' \u2026' : ''
  return prefix + body.slice(start, end) + suffix
})

const titleSegments = computed(() => highlight(props.hit.title, queryTerms.value))
const excerptSegments = computed(() => highlight(excerpt.value, queryTerms.value))

// Icon per content type.
const iconName = computed(() => {
  switch (props.hit.type) {
    case 'api-endpoint': return 'endpoint'
    case 'api-overview': return 'api'
    case 'category': return 'folder'
    case 'release-note': return 'tag'
    default: return 'doc'
  }
})
</script>

<template>
  <button
    type="button"
    class="search-result"
    :class="{ active }"
    role="option"
    :aria-selected="active"
    @click="$emit('click')"
  >
    <span class="search-result-icon" :data-icon="iconName" aria-hidden="true">
      <!-- doc -->
      <svg v-if="iconName === 'doc'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
      <!-- folder / category -->
      <svg v-else-if="iconName === 'folder'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
      <!-- api endpoint: braces -->
      <svg v-else-if="iconName === 'endpoint' || iconName === 'api'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 3H6a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h2" />
        <path d="M16 21h2a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-2" />
      </svg>
      <!-- release-note: tag -->
      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.59 13.41 12 22l-8-8V4h10z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </svg>
    </span>

    <div class="search-result-body">
      <div class="search-result-breadcrumb">{{ hit.breadcrumb }}</div>
      <div class="search-result-title">
        <template v-for="(seg, i) in titleSegments" :key="i">
          <mark v-if="seg.match">{{ seg.text }}</mark>
          <template v-else>{{ seg.text }}</template>
        </template>
      </div>
      <div v-if="excerpt" class="search-result-excerpt">
        <template v-for="(seg, i) in excerptSegments" :key="i">
          <mark v-if="seg.match">{{ seg.text }}</mark>
          <template v-else>{{ seg.text }}</template>
        </template>
      </div>
    </div>

    <span class="search-result-arrow" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.search-result {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  margin: 0;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  text-align: left;
  cursor: pointer;
  font-family: var(--vp-font-family-base);
  transition: background-color 120ms cubic-bezier(0.22, 0.61, 0.36, 1),
              border-color 120ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.search-result:hover,
.search-result.active {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.dark .search-result:hover,
.dark .search-result.active {
  background: rgba(101, 27, 200, 0.14);
}

.search-result-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}

.search-result.active .search-result-icon,
.search-result:hover .search-result-icon {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.search-result-icon[data-icon="endpoint"],
.search-result-icon[data-icon="api"] {
  color: #48BC7D;
}

.search-result-body {
  flex: 1;
  min-width: 0;
}

.search-result-breadcrumb {
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  letter-spacing: 0.01em;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-result-title {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.35;
}

.search-result-excerpt {
  margin-top: 4px;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

mark {
  color: var(--vp-c-brand-1);
  background: transparent;
  font-weight: 600;
  padding: 0;
}

.dark mark {
  color: #9241FF;
}

.search-result-arrow {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 120ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 120ms cubic-bezier(0.22, 0.61, 0.36, 1);
  align-self: center;
  flex-shrink: 0;
}

.search-result:hover .search-result-arrow,
.search-result.active .search-result-arrow {
  opacity: 1;
  color: var(--vp-c-brand-1);
  transform: translateX(2px);
}
</style>

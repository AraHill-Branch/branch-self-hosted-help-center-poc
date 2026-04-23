<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import SearchResultItem from './SearchResultItem.vue'
import type { SearchHit } from '../../composables/useSearchIndex'

const props = defineProps<{
  query: string
  hits: SearchHit[]
  state: 'idle' | 'loading' | 'ready' | 'error'
}>()

const emit = defineEmits<{
  select: [hit: SearchHit]
}>()

const active = ref(0)
const listRef = ref<HTMLElement | null>(null)

// Always reset to the first hit whenever the query or hits change.
watch(() => props.hits, () => { active.value = 0 })
watch(() => props.query, () => { active.value = 0 })

function onKeyDown(e: KeyboardEvent) {
  if (!props.hits.length) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = (active.value + 1) % props.hits.length
    scrollActiveIntoView()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = (active.value - 1 + props.hits.length) % props.hits.length
    scrollActiveIntoView()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const hit = props.hits[active.value]
    if (hit) emit('select', hit)
  }
}

function scrollActiveIntoView() {
  nextTick(() => {
    const el = listRef.value?.querySelector<HTMLElement>(`[data-idx="${active.value}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  })
}

onMounted(() => window.addEventListener('keydown', onKeyDown, true))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown, true))

const showEmpty = computed(() =>
  props.state === 'ready' && props.query.trim().length > 0 && props.hits.length === 0
)
const showIdle = computed(() =>
  props.query.trim().length === 0
)
</script>

<template>
  <div ref="listRef" class="search-results" role="listbox">
    <template v-if="hits.length > 0">
      <SearchResultItem
        v-for="(hit, i) in hits"
        :key="hit.id"
        :hit="hit"
        :query="query"
        :active="i === active"
        :data-idx="i"
        @mouseenter="active = i"
        @click="$emit('select', hit)"
      />
    </template>
    <div v-else-if="showEmpty" class="search-empty">
      <div class="search-empty-title">Nothing found for &ldquo;{{ query }}&rdquo;</div>
      <div class="search-empty-hint">Try different keywords or check the spelling.</div>
    </div>
    <div v-else-if="showIdle" class="search-idle">
      <div class="search-idle-title">Search the Help Center</div>
      <div class="search-idle-hint">Find articles, API references, and release notes across all three hubs.</div>
    </div>
    <div v-else-if="state === 'loading'" class="search-loading">
      Loading index\u2026
    </div>
    <div v-else-if="state === 'error'" class="search-error">
      Couldn\u2019t load the search index. Try refreshing the page.
    </div>
  </div>
</template>

<style scoped>
.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.search-empty,
.search-idle,
.search-loading,
.search-error {
  padding: 40px 24px;
  text-align: center;
  font-family: var(--vp-font-family-base);
}

.search-empty-title,
.search-idle-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.search-empty-hint,
.search-idle-hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
  max-width: 360px;
  margin: 0 auto;
  line-height: 1.5;
}

.search-loading,
.search-error {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.search-error {
  color: var(--vp-c-danger-1, #FF2056);
}
</style>

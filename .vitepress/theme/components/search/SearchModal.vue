<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vitepress'
import { useSearchIndex, type SearchHit } from '../../composables/useSearchIndex'
import SearchInput from './SearchInput.vue'
import SearchFilters, { type Filter } from './SearchFilters.vue'
import SearchResults from './SearchResults.vue'

const open = ref(false)
const query = ref('')
const activeFilter = ref<Filter>('all')
const inputEl = ref<InstanceType<typeof SearchInput> | null>(null)

const { state, load, search } = useSearchIndex()
const router = useRouter()

// Raw results (unfiltered), recomputed whenever query changes or the
// index finishes loading.
const rawHits = computed<SearchHit[]>(() => {
  if (state.value !== 'ready') return []
  return search(query.value)
})

// Counts for the filter tabs — always reflect the full (unfiltered) set.
const counts = computed(() => {
  const c: Record<Filter, number> = {
    all: rawHits.value.length,
    account: 0,
    marketer: 0,
    developer: 0,
    apidocs: 0,
  }
  for (const h of rawHits.value) c[h.hub] = (c[h.hub] ?? 0) + 1
  return c
})

// Filtered results by active tab.
const hits = computed<SearchHit[]>(() => {
  if (activeFilter.value === 'all') return rawHits.value
  return rawHits.value.filter((h) => h.hub === activeFilter.value)
})

function openModal() {
  if (open.value) return
  open.value = true
  load()
  nextTick(() => inputEl.value?.focus())
}

function closeModal() {
  open.value = false
  // Keep the query across opens — feels more like a recent-search affordance.
}

function onKeyDown(e: KeyboardEvent) {
  // Open: Cmd/Ctrl+K, or "/" when not typing into another input.
  const metaOrCtrl = e.metaKey || e.ctrlKey
  if (metaOrCtrl && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    openModal()
    return
  }
  if (e.key === '/' && !isEditable(e.target)) {
    e.preventDefault()
    openModal()
    return
  }
  if (open.value && e.key === 'Escape') {
    e.preventDefault()
    closeModal()
  }
}

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable
}

function onResultSelect(hit: SearchHit) {
  closeModal()
  router.go(hit.id)
}

// Reset filter when results collapse below the active filter's tab.
watch(hits, (current) => {
  if (current.length === 0 && activeFilter.value !== 'all' && rawHits.value.length > 0) {
    activeFilter.value = 'all'
  }
})

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  // Allow the hero search button (and any other element) to open us by
  // dispatching a synthetic Cmd+K — same event shape, handled above.
})
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

// Expose for debugging and for programmatic open from outside.
defineExpose({ open: openModal, close: closeModal })
</script>

<template>
  <Teleport to="body">
    <Transition name="search-modal">
      <div
        v-if="open"
        class="search-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Search the Help Center"
        @click.self="closeModal"
      >
        <div class="search-panel" @click.stop>
          <SearchInput
            ref="inputEl"
            v-model="query"
            :loading="state === 'loading'"
            @close="closeModal"
          />
          <SearchFilters
            v-if="rawHits.length > 0"
            v-model="activeFilter"
            :counts="counts"
          />
          <SearchResults
            :query="query"
            :hits="hits"
            :state="state"
            @select="onResultSelect"
          />
          <footer class="search-footer">
            <span><kbd>\u2191</kbd><kbd>\u2193</kbd> to navigate</span>
            <span><kbd>\u21B5</kbd> to select</span>
            <span><kbd>esc</kbd> to close</span>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(9, 1, 19, 0.72);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10vh 24px 24px;
  overflow-y: auto;
}

.search-panel {
  width: 100%;
  max-width: 720px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  font-family: var(--vp-font-family-base);
  display: flex;
  flex-direction: column;
  max-height: 80vh;
}

.dark .search-panel {
  background: rgba(15, 2, 31, 0.98);
  border-color: rgba(101, 27, 200, 0.35);
  border-radius: 0;
}

.search-footer {
  display: flex;
  gap: 20px;
  padding: 10px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.search-footer span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.search-footer kbd {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  padding: 2px 6px;
  min-width: 18px;
  text-align: center;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  line-height: 1;
}

.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 180ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.search-modal-enter-active .search-panel,
.search-modal-leave-active .search-panel {
  transition: transform 180ms cubic-bezier(0.22, 0.61, 0.36, 1),
              opacity 180ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}
.search-modal-enter-from .search-panel,
.search-modal-leave-to .search-panel {
  transform: translateY(-8px) scale(0.98);
  opacity: 0;
}
</style>

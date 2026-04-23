<script setup lang="ts">
export type Filter = 'all' | 'account' | 'marketer' | 'developer' | 'apidocs'

defineProps<{
  modelValue: Filter
  counts: Record<Filter, number>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Filter]
}>()

const tabs: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'account', label: 'Account Hub' },
  { id: 'marketer', label: 'Marketer Hub' },
  { id: 'developer', label: 'Developer Hub' },
  { id: 'apidocs', label: 'API Docs' },
]

function select(id: Filter) { emit('update:modelValue', id) }
</script>

<template>
  <div class="search-filters" role="tablist" aria-label="Filter results">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      role="tab"
      type="button"
      class="search-filter"
      :class="{ active: modelValue === tab.id }"
      :aria-selected="modelValue === tab.id"
      :aria-disabled="tab.id !== 'all' && counts[tab.id] === 0"
      @click="select(tab.id)"
    >
      <span class="search-filter-label">{{ tab.label }}</span>
      <span class="search-filter-count">{{ counts[tab.id] ?? 0 }}</span>
    </button>
  </div>
</template>

<style scoped>
.search-filters {
  display: flex;
  gap: 4px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.search-filters::-webkit-scrollbar { display: none; }

.search-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  font-family: var(--vp-font-family-base);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: color 140ms cubic-bezier(0.22, 0.61, 0.36, 1),
              background-color 140ms cubic-bezier(0.22, 0.61, 0.36, 1),
              border-color 140ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.search-filter:hover {
  color: var(--vp-c-text-1);
}

.search-filter.active {
  color: var(--vp-c-text-1);
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

.search-filter[aria-disabled="true"] {
  opacity: 0.5;
  cursor: default;
}

.search-filter-count {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-weight: 600;
  padding: 1px 5px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.search-filter.active .search-filter-count {
  color: var(--vp-c-brand-1);
}
</style>

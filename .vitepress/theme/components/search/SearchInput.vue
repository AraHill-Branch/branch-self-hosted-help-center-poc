<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  close: []
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function focus() { inputRef.value?.focus() }
defineExpose({ focus })

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function clear() {
  emit('update:modelValue', '')
  focus()
}
</script>

<template>
  <div class="search-input">
    <span class="search-input-icon" aria-hidden="true">
      <svg v-if="!loading" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span v-else class="search-input-spinner" />
    </span>
    <input
      ref="inputRef"
      type="text"
      :value="modelValue"
      @input="onInput"
      placeholder="Search the Help Center"
      aria-label="Search the Help Center"
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
    />
    <button
      v-if="modelValue"
      type="button"
      class="search-input-clear"
      aria-label="Clear search"
      @click="clear"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.search-input-icon {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.search-input-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: search-spin 700ms linear infinite;
}

@keyframes search-spin {
  to { transform: rotate(360deg); }
}

input {
  flex: 1;
  min-width: 0;
  padding: 0;
  font-family: var(--vp-font-family-base);
  font-size: 16px;
  font-weight: 400;
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  outline: none;
}

input::placeholder {
  color: var(--vp-c-text-3);
}

.search-input-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: color 140ms cubic-bezier(0.22, 0.61, 0.36, 1),
              background-color 140ms cubic-bezier(0.22, 0.61, 0.36, 1);
  flex-shrink: 0;
}

.search-input-clear:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}
</style>

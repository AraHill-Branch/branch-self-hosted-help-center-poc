<script setup lang="ts">
import { onMounted, ref } from 'vue'

const metaKey = ref('\u2318')
onMounted(() => {
  if (typeof navigator !== 'undefined') {
    const isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
    metaKey.value = isMac ? '\u2318' : 'Ctrl'
  }
})

// Dispatch the same keyboard event our SearchModal listens for.
function openSearch() {
  const isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
  window.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    metaKey: isMac,
    ctrlKey: !isMac,
    bubbles: true,
  }))
}
</script>

<template>
  <button
    type="button"
    class="nav-search-button"
    aria-label="Search the Help Center"
    @click.stop.prevent="openSearch"
  >
    <span class="nav-search-icon" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </span>
    <span class="nav-search-label">Search</span>
    <span class="nav-search-kbd">
      <kbd>{{ metaKey }}</kbd><kbd>K</kbd>
    </span>
  </button>
</template>

<style scoped>
.nav-search-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 140ms cubic-bezier(0.22, 0.61, 0.36, 1),
              background-color 140ms cubic-bezier(0.22, 0.61, 0.36, 1),
              color 140ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.nav-search-button:hover,
.nav-search-button:focus-visible {
  outline: none;
  color: #fff;
  border-color: rgba(101, 27, 200, 0.6);
  background: rgba(101, 27, 200, 0.2);
}

.nav-search-icon {
  display: inline-flex;
  align-items: center;
  color: currentColor;
}

.nav-search-label {
  font-weight: 500;
  color: currentColor;
}

.nav-search-kbd {
  display: inline-flex;
  gap: 2px;
  margin-left: 4px;
}

.nav-search-kbd kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 10.5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  line-height: 1;
}

/* Hide the kbd hint on narrow viewports */
@media (max-width: 768px) {
  .nav-search-kbd { display: none; }
  .nav-search-label { display: none; }
}
</style>

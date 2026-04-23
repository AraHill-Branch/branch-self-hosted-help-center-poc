<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

// Display the correct OS modifier key ("⌘" vs "Ctrl") in the kbd chip.
const metaKey = ref('\u2318')
onMounted(() => {
  if (typeof navigator !== 'undefined') {
    const isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
    metaKey.value = isMac ? '\u2318' : 'Ctrl'
  }
})

// Open VitePress's built-in local search modal by dispatching the same
// Cmd+K / Ctrl+K keyboard event it listens for natively.
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
  <div class="hp-hero-container">
    <div class="hp-hero-left">
      <div class="hp-hero-content">
        <h1 class="name">
          <span class="clip">{{ frontmatter.hero?.name }}</span>
        </h1>
        <p v-if="frontmatter.hero?.tagline" class="tagline">
          {{ frontmatter.hero.tagline }}
        </p>
      </div>
      <div class="hp-hero-search">
        <button
          type="button"
          class="search-button"
          @click="openSearch"
          aria-label="Search the Help Center"
        >
          <span class="search-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <span class="search-placeholder">Search the Help Center</span>
          <span class="search-kbd">
            <kbd>{{ metaKey }}</kbd><kbd>K</kbd>
          </span>
        </button>
      </div>
    </div>
    <div class="hp-hero-right">
      <img src="/banner_img_v2.png" alt="Branch Help Center" class="hero-banner" />
    </div>
  </div>
</template>

<style scoped>
.hp-hero-container {
  max-width: 1158px;
  margin: 10px auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  align-items: center;
}

.hp-hero-left {
  display: flex;
  flex-direction: column;
}

.hp-hero-content {
  text-align: left;
  margin-bottom: 0;
}

.hp-hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-banner {
  width: 100%;
  height: auto;
  animation: vp-enter var(--t-entrance) var(--ease-out-expo) 300ms both;
}

.name {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 16px;
  animation: vp-enter var(--t-entrance) var(--ease-out-expo) 60ms both;
}

.name .clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

.tagline {
  font-size: 24px;
  font-weight: 400;
  color: white;
  line-height: 1.5;
  margin: 0 0 48px;
  animation: vp-enter var(--t-entrance) var(--ease-out-expo) 140ms both;
}

.hp-hero-search {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 60px 0 140px;
  animation: vp-enter var(--t-entrance) var(--ease-out-expo) 220ms both;
}

.search-button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  font-family: var(--vp-font-family-base);
  font-size: 14px;
  color: var(--vp-c-text-2);
  background: rgba(15, 2, 31, 0.8);
  border: 1px solid rgba(101, 27, 200, 0.3);
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: border-color var(--t-base) var(--ease),
              background-color var(--t-base) var(--ease),
              box-shadow var(--t-base) var(--ease);
}

.search-button:hover,
.search-button:focus-visible {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.search-icon {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.search-placeholder {
  flex: 1;
  color: var(--vp-c-text-3);
  font-size: 14px;
  line-height: 1;
}

.search-kbd {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  pointer-events: none;
}

.search-kbd kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: rgba(19, 3, 38, 0.6);
  border: 1px solid rgba(101, 27, 200, 0.25);
  border-radius: 3px;
  line-height: 1;
}

@keyframes vp-enter {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hp-hero-container {
    padding: 60px 24px 40px;
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hp-hero-right {
    order: -1;
  }

  .hero-banner {
    max-width: 300px;
  }

  .name {
    font-size: 48px;
  }

  .tagline {
    font-size: 18px;
  }
}
</style>

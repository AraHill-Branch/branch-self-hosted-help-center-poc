<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="hp-hero-container">
    <div class="hp-hero-content">
      <h1 class="name">
        <span class="clip">{{ frontmatter.hero?.name }}</span>
      </h1>
      <p v-if="frontmatter.hero?.tagline" class="tagline">
        {{ frontmatter.hero.tagline }}
      </p>
    </div>
    <div class="hp-hero-search">
      <div class="search-wrapper">
        <input type="text" placeholder="Search" class="hp-search-input">
        <span class="hp-search-kbd">CMD + K</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hp-hero-container {
  max-width: 1152px;
  margin: 80px auto;
  padding: 0;
  position: relative;
  z-index: 1;
}

.hp-hero-content {
  text-align: left;
  margin-bottom: 0;
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
  margin: 60px 0px 140px 0px;
  animation: vp-enter var(--t-entrance) var(--ease-out-expo) 220ms both;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.hp-search-kbd {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  pointer-events: none;
}

@keyframes vp-enter {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hp-hero-container {
    padding: 60px 24px 40px;
  }

  .name {
    font-size: 48px;
  }

  .tagline {
    font-size: 18px;
  }
}
</style>

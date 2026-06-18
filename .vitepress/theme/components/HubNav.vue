<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed, ref } from 'vue'

const route = useRoute()
const isOpen = ref(false)

const hubName = computed(() => {
  if (route.path.startsWith('/account-hub/')) return 'Account Hub'
  if (route.path.startsWith('/marketer-hub/')) return 'Marketer Hub'
  if (route.path.startsWith('/developer-hub/')) return 'Developer Hub'
  if (route.path.startsWith('/apidocs/')) return 'API Reference'
  return 'Knowledge Hubs'
})

const hubs = [
  { text: 'Account Hub', link: '/account-hub/' },
  { text: 'Marketer Hub', link: '/marketer-hub/' },
  { text: 'Developer Hub', link: '/developer-hub/' },
  { text: 'API Reference', link: '/apidocs/' }
]

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="hub-nav-dropdown" :class="{ open: isOpen }">
    <button class="hub-nav-button" type="button" @click="toggleMenu">
      <span class="hub-nav-text">{{ hubName }}</span>
      <svg class="hub-nav-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="hub-nav-menu">
      <a
        v-for="hub in hubs"
        :key="hub.link"
        :href="hub.link"
        class="hub-nav-item"
        :class="{ active: route.path.startsWith(hub.link) }"
      >
        {{ hub.text }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.hub-nav-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
}

.hub-nav-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  line-height: var(--vp-nav-height);
  color: rgba(255, 255, 255, 0.87);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.25s;
  white-space: nowrap;
}

.hub-nav-button:hover {
  color: #48BC7D;
}

.hub-nav-icon {
  transition: transform 0.25s;
  flex-shrink: 0;
}

.hub-nav-dropdown:hover .hub-nav-icon {
  transform: rotate(180deg);
}

.hub-nav-menu {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  min-width: 160px;
  padding: 8px 0;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.25s, transform 0.25s, visibility 0.25s;
  z-index: 100;
}

.hub-nav-dropdown:hover .hub-nav-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.hub-nav-item {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
  transition: color 0.25s, background-color 0.25s;
  white-space: nowrap;
}

.dark .hub-nav-item {
  color: rgba(255, 255, 255, 0.87);
}

.hub-nav-item:hover {
  color: #48BC7D;
  background: rgba(72, 188, 125, 0.1);
}

.hub-nav-item.active {
  color: #48BC7D;
  font-weight: 600;
}
</style>

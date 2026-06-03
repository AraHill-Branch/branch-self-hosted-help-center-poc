<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isHomePage = () => frontmatter.value?.layout === 'home'
</script>

<template>
  <a
    href="https://support.branch.io"
    class="get-help-btn"
    target="_blank"
    rel="noopener noreferrer"
  >
    Get Help
  </a>
</template>

<style scoped>
.get-help-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-base);
  color: #fff !important;
  background: transparent;
  border: 1.5px solid transparent;
  border-radius: 0;
  background-image: linear-gradient(#130326, #130326),
                    linear-gradient(90deg, #EF690D, #7B27AD);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  text-decoration: none !important;
  white-space: nowrap;
  transition: background var(--t-base) var(--ease),
              transform var(--t-base) var(--ease),
              box-shadow var(--t-slow) var(--ease);
}

.get-help-btn:hover {
  box-shadow: 0 0 20px rgba(239, 105, 13, 0.4),
              0 0 30px rgba(123, 39, 173, 0.3);
  transform: translateY(-1px);
}

.get-help-btn:active {
  transform: translateY(0);
  transition-duration: var(--t-fast);
}

.get-help-btn:focus-visible {
  outline: 2px solid var(--vp-c-focus-ring);
  outline-offset: 2px;
}
</style>

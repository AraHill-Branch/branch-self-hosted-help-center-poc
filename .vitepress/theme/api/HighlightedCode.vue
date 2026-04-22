<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { highlight } from './highlight'

const props = defineProps<{
  code: string
  lang: string
}>()

const html = ref<string>('')
const ready = ref(false)

watchEffect(async () => {
  try {
    html.value = await highlight(props.code, props.lang)
    ready.value = true
  } catch {
    // Fall back to plain rendering if Shiki chokes on a language.
    ready.value = false
  }
})
</script>

<template>
  <div v-if="ready" class="hl" v-html="html" />
  <pre v-else class="hl-fallback"><code>{{ code }}</code></pre>
</template>

<style scoped>
.hl :deep(pre.shiki) {
  margin: 0;
  padding: 14px 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  line-height: 1.55;
  background-color: #0d1117 !important;
}

.hl :deep(pre.shiki code) {
  background: transparent;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  display: block;
}

.hl-fallback {
  margin: 0;
  padding: 14px 16px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--vp-c-text-1);
}
</style>

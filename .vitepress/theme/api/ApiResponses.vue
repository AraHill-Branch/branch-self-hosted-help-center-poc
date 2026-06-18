<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ApiSchemaTable from './ApiSchemaTable.vue'
import HighlightedCode from './HighlightedCode.vue'
import ApiIcon from './ApiIcon.vue'
import { buildExample } from './codegen'

const props = defineProps<{
  responses: Record<string, { description?: string; content?: Record<string, { schema?: any; examples?: any }> }>
}>()

const statusCodes = computed(() => Object.keys(props.responses))
// Default the active tab to the FIRST 2xx response when present; otherwise
// fall back to the first listed.
const defaultStatus = computed(() => {
  const codes = statusCodes.value
  const ok = codes.find((c) => /^2/.test(c))
  return ok ?? codes[0] ?? ''
})
const active = ref(defaultStatus.value)
watch(defaultStatus, (v) => { if (!props.responses[active.value]) active.value = v })

function setActive(code: string) { active.value = code }

function statusClass(code: string) {
  const n = parseInt(code, 10)
  if (n >= 200 && n < 300) return 'ok'
  if (n >= 300 && n < 400) return 'redirect'
  if (n >= 400 && n < 500) return 'client-err'
  if (n >= 500) return 'server-err'
  return ''
}

const activeResponse = computed(() => props.responses[active.value])
const activeContent = computed(() => {
  const c = activeResponse.value?.content
  if (!c) return null
  return c['application/json'] ?? Object.values(c)[0] ?? null
})
const activeSchema = computed(() => activeContent.value?.schema ?? null)

// Has the spec author provided an explicit `examples:` block? If so we
// prefer that (real, realistic data). If not, we synthesise one from the
// schema — but ONLY when the result has some non-trivial signal. Pure
// skeletons ({ id: "", object: "" }) are worse than no example.
const explicitExample = computed<string | null>(() => {
  const ex = activeContent.value?.examples
  if (!ex) return null
  const first = Object.values(ex)[0] as any
  if (first?.value === undefined) return null
  if (typeof first.value === 'string') return first.value
  return JSON.stringify(first.value, null, 2)
})

const synthesizedExample = computed<any>(() => {
  if (!activeSchema.value) return null
  return buildExample(activeSchema.value)
})

function isMeaningful(value: any): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.length > 0
  if (typeof value === 'number' || typeof value === 'boolean') return true
  if (Array.isArray(value)) return value.some(isMeaningful)
  if (typeof value === 'object') return Object.values(value).some(isMeaningful)
  return false
}

const activeExampleString = computed<string | null>(() => {
  if (explicitExample.value !== null) return explicitExample.value
  const synth = synthesizedExample.value
  if (synth === null || synth === undefined) return null
  if (!isMeaningful(synth)) return null  // Don't show all-empty skeletons.
  return typeof synth === 'string' ? synth : JSON.stringify(synth, null, 2)
})

const activeExampleLang = computed(() => {
  const c = activeResponse.value?.content
  if (!c) return 'txt'
  if ('application/json' in c) return 'json'
  return 'txt'
})

const activeIsBinary = computed(() => {
  const c = activeResponse.value?.content
  if (!c) return false
  return Object.keys(c).some(mime =>
    mime.startsWith('image/') || mime.startsWith('audio/') || mime.startsWith('video/') || mime === 'application/octet-stream',
  )
})
</script>

<template>
  <div class="api-responses">
    <div class="api-responses-tabs" role="tablist">
      <button
        v-for="code in statusCodes"
        :key="code"
        role="tab"
        class="api-responses-tab"
        :class="[statusClass(code), { active: active === code }]"
        :aria-selected="active === code"
        @click="setActive(code)"
      >
        <span class="api-responses-dot" />
        <span class="api-responses-code">{{ code }}</span>
        <span v-if="responses[code].description" class="api-responses-desc">{{ responses[code].description }}</span>
      </button>
    </div>

    <div class="api-responses-body">
      <div v-if="activeIsBinary" class="api-responses-binary">
        <span class="api-responses-binary-icon"><ApiIcon name="image" :size="20" /></span>
        <div>
          <div class="api-responses-binary-title">Binary response</div>
          <div class="api-responses-binary-desc">This endpoint returns image data. Write the response body to a file to view it.</div>
        </div>
      </div>

      <div v-if="activeSchema && (activeSchema.properties || activeSchema.oneOf || activeSchema.anyOf || activeSchema.allOf)" class="api-responses-schema">
        <div class="api-responses-label">Schema</div>
        <ApiSchemaTable :schema="activeSchema" />
      </div>

      <div v-if="activeExampleString" class="api-responses-example">
        <div class="api-responses-label">Example</div>
        <HighlightedCode :code="activeExampleString" :lang="activeExampleLang" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.api-responses {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.api-responses-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0 4px;
  flex-wrap: wrap;
}

.api-responses-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 140ms ease, border-color 140ms ease;
  margin-bottom: -1px;
}

.api-responses-tab:hover { color: var(--vp-c-text-1); }

.api-responses-tab.active {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.api-responses-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  flex-shrink: 0;
}

.api-responses-tab.ok .api-responses-dot { background: #22c55e; }
.api-responses-tab.redirect .api-responses-dot { background: #3b82f6; }
.api-responses-tab.client-err .api-responses-dot { background: #f59e0b; }
.api-responses-tab.server-err .api-responses-dot { background: #ef4444; }

.api-responses-code {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  font-size: 13px;
}

.api-responses-desc {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}

.api-responses-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.api-responses-binary {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
}

.api-responses-binary-icon { display: inline-flex; align-items: center; color: var(--vp-c-text-2); }
.api-responses-binary-title { font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); }
.api-responses-binary-desc { font-size: 12.5px; color: var(--vp-c-text-2); margin-top: 2px; }

.api-responses-label {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.api-responses-example pre {
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

.dark .api-responses-example pre {
  background: var(--vp-c-bg-soft);
}

.api-responses-example code {
  background: transparent;
  padding: 0;
  font-family: inherit;
}
</style>

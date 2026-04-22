<script setup lang="ts">
import { computed, ref } from 'vue'
import ApiSchemaTable from './ApiSchemaTable.vue'

const props = defineProps<{
  responses: Record<string, { description?: string; content?: Record<string, { schema?: any; examples?: any }> }>
}>()

const statusCodes = computed(() => Object.keys(props.responses))
const active = ref(statusCodes.value[0] ?? '')

function setActive(code: string) {
  active.value = code
}

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
const activeExample = computed(() => {
  const ex = activeContent.value?.examples
  if (ex) {
    const first = Object.values(ex)[0] as any
    if (first?.value !== undefined) {
      return typeof first.value === 'string' ? first.value : JSON.stringify(first.value, null, 2)
    }
  }
  // Auto-generate a minimal example from schema.
  if (activeSchema.value) return buildExample(activeSchema.value)
  return null
})

function buildExample(schema: any, seen = new Set<any>()): any {
  if (!schema || typeof schema !== 'object') return null
  if (seen.has(schema)) return null
  seen.add(schema)
  if (schema.example !== undefined) return schema.example
  if (schema.type === 'object' && schema.properties) {
    const out: Record<string, any> = {}
    for (const [k, v] of Object.entries<any>(schema.properties)) {
      out[k] = buildExample(v, seen)
    }
    return out
  }
  if (schema.type === 'array') return schema.items ? [buildExample(schema.items, seen)] : []
  if (schema.enum) return schema.enum[0]
  switch (schema.type) {
    case 'string': return ''
    case 'integer':
    case 'number': return 0
    case 'boolean': return false
    default: return null
  }
}

const activeExampleString = computed(() => {
  const ex = activeExample.value
  if (ex === null || ex === undefined) return null
  if (typeof ex === 'string') return ex
  try {
    return JSON.stringify(ex, null, 2)
  } catch {
    return String(ex)
  }
})

const activeIsBinary = computed(() => {
  const c = activeResponse.value?.content
  if (!c) return false
  return Object.keys(c).some(mime => mime.startsWith('image/') || mime.startsWith('audio/') || mime.startsWith('video/') || mime === 'application/octet-stream')
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
        <span class="api-responses-binary-icon">🖼</span>
        <div>
          <div class="api-responses-binary-title">Binary response</div>
          <div class="api-responses-binary-desc">This endpoint returns image data. Write the response body to a file to view it.</div>
        </div>
      </div>

      <div v-if="activeSchema && activeSchema.properties" class="api-responses-schema">
        <div class="api-responses-label">Schema</div>
        <ApiSchemaTable :schema="activeSchema" />
      </div>

      <div v-if="activeExampleString" class="api-responses-example">
        <div class="api-responses-label">Example</div>
        <pre><code>{{ activeExampleString }}</code></pre>
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

.api-responses-binary-icon { font-size: 22px; }
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

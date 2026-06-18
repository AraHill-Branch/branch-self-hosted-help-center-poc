<script setup lang="ts">
import { computed } from 'vue'
import { specs, HTTP_VERBS } from './spec'

// Lists every operation of one API as verb-tagged links — dropped into the
// API overview pages so the overview surfaces ALL endpoints and links into
// the operation reference (not just the one endpoint the prose mentions).
const props = defineProps<{ api: string }>()

const ops = computed(() => {
  const spec = specs[props.api]
  if (!spec) return []
  const out: { verb: string; summary: string; path: string; link: string }[] = []
  for (const [path, item] of Object.entries(spec.paths ?? {})) {
    if (!item || typeof item !== 'object') continue
    for (const [verb, op] of Object.entries<any>(item)) {
      if (!HTTP_VERBS.has(verb.toLowerCase())) continue
      if (!op?.operationId) continue
      out.push({
        verb: verb.toUpperCase(),
        summary: op.summary ?? op.operationId,
        path,
        link: `/apidocs/${props.api}/operations/${op.operationId}`,
      })
    }
  }
  const w: Record<string, number> = { GET: 0, POST: 1, PUT: 2, PATCH: 3, DELETE: 4 }
  out.sort((a, b) => (w[a.verb] ?? 9) - (w[b.verb] ?? 9) || a.summary.localeCompare(b.summary))
  return out
})
</script>

<template>
  <ul v-if="ops.length" class="api-endpoint-list">
    <li v-for="o in ops" :key="o.link" class="api-endpoint-item">
      <a :href="o.link" class="api-endpoint-link">
        <span class="api-endpoint-verb" :data-verb="o.verb">{{ o.verb }}</span>
        <span class="api-endpoint-summary">{{ o.summary }}</span>
        <code class="api-endpoint-path">{{ o.path }}</code>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.api-endpoint-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}
.api-endpoint-item { border-top: 1px solid var(--vp-c-divider); }
.api-endpoint-item:first-child { border-top: none; }

.api-endpoint-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: background-color 140ms ease;
}
.api-endpoint-link:hover { background: var(--vp-c-bg-soft); }

.api-endpoint-verb {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  padding: 3px 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
  background: #4b5563;
  border-radius: 4px;
  flex-shrink: 0;
}
/* AA-contrast verb shades, matching the operation header. */
.api-endpoint-verb[data-verb="GET"]    { background: #15803d; }
.api-endpoint-verb[data-verb="POST"]   { background: #1d4ed8; }
.api-endpoint-verb[data-verb="PUT"]    { background: #b45309; }
.api-endpoint-verb[data-verb="PATCH"]  { background: #be185d; }
.api-endpoint-verb[data-verb="DELETE"] { background: #b91c1c; }

.api-endpoint-summary { font-weight: 500; }
.api-endpoint-path {
  margin-left: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  background: transparent;
  padding: 0;
}

@media (max-width: 640px) {
  .api-endpoint-path { display: none; }
}
</style>

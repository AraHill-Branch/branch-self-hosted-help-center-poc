<script setup lang="ts">
import type { OpenApiOperation } from './spec'

defineProps<{
  operation: OpenApiOperation
  endpointUrl: string
}>()
</script>

<template>
  <header class="api-header">
    <div class="api-header-meta">
      <span class="api-verb" :data-verb="operation._verb">{{ operation._verb }}</span>
      <code class="api-path">{{ operation._path }}</code>
    </div>

    <h1 class="api-title">{{ operation.summary || operation.operationId }}</h1>

    <p v-if="operation.description" class="api-description">{{ operation.description }}</p>

    <div class="api-endpoint-url">
      <span class="api-endpoint-label">Endpoint</span>
      <code>{{ endpointUrl }}</code>
    </div>
  </header>
</template>

<style scoped>
.api-header {
  padding-bottom: 8px;
}

.api-header-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.api-verb {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
  background: #6b7280;
  border-radius: 4px;
  line-height: 1;
}

.api-verb[data-verb="GET"]    { background: #16a34a; }
.api-verb[data-verb="POST"]   { background: #2563eb; }
.api-verb[data-verb="PUT"]    { background: #d97706; }
.api-verb[data-verb="PATCH"]  { background: #db2777; }
.api-verb[data-verb="DELETE"] { background: #dc2626; }

.api-path {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 3px 8px;
  border-radius: 4px;
}

.api-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  padding: 0;
  border: none;
  line-height: 1.2;
}

.api-description {
  font-size: 15px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  margin: 0 0 20px;
  max-width: 72ch;
}

.api-endpoint-url {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 13px;
}

.api-endpoint-label {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.api-endpoint-url code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: transparent;
  padding: 0;
}
</style>

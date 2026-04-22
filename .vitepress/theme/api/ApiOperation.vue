<script setup lang="ts">
import { computed } from 'vue'
import { getOperation } from './spec'
import ApiHeader from './ApiHeader.vue'
import ApiSchemaTable from './ApiSchemaTable.vue'
import ApiResponses from './ApiResponses.vue'
import ApiCodePanel from './ApiCodePanel.vue'

const props = defineProps<{ operationId: string }>()

const data = computed(() => getOperation(props.operationId))
const operation = computed(() => data.value?.operation)
const bodySchema = computed(() => {
  const content = operation.value?.requestBody?.content
  if (!content) return null
  // Prefer application/json; fall back to any schema present.
  return content['application/json']?.schema ?? Object.values(content)[0]?.schema ?? null
})
const endpointUrl = computed(() => {
  if (!operation.value) return ''
  return `${operation.value._serverUrl ?? ''}${operation.value._path ?? ''}`
})
</script>

<template>
  <div v-if="operation" class="api-op">
    <div class="api-op-main">
      <ApiHeader :operation="operation" :endpoint-url="endpointUrl" />

      <section v-if="bodySchema" class="api-op-section">
        <h2 class="api-op-h2">Body parameters</h2>
        <ApiSchemaTable :schema="bodySchema" />
      </section>

      <section class="api-op-section">
        <h2 class="api-op-h2">Responses</h2>
        <ApiResponses :responses="operation.responses" />
      </section>
    </div>

    <aside class="api-op-aside">
      <ApiCodePanel
        :operation="operation"
        :endpoint-url="endpointUrl"
        :body-schema="bodySchema"
      />
    </aside>
  </div>

  <div v-else class="api-op-missing">
    <p>Operation <code>{{ operationId }}</code> not found in any registered spec.</p>
  </div>
</template>

<style scoped>
.api-op {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 440px);
  gap: 48px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px 96px;
  align-items: start;
}

.api-op-main {
  min-width: 0;
}

.api-op-aside {
  position: sticky;
  top: calc(var(--vp-nav-height, 64px) + 24px);
  align-self: start;
}

.api-op-section {
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.api-op-section:first-of-type {
  border-top: none;
  padding-top: 0;
}

.api-op-h2 {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 20px;
  padding: 0;
  border: none;
}

.api-op-missing {
  max-width: 640px;
  margin: 48px auto;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
}

/* Responsive: collapse to single column below 1100px. The code panel moves inline above the tables so it's still reachable. */
@media (max-width: 1100px) {
  .api-op {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .api-op-aside {
    position: static;
    order: -1;
    margin-top: 24px;
  }
}
</style>

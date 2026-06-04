<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { getOperation, type OpenApiParameter } from './spec'
import ApiHeader from './ApiHeader.vue'
import ApiSchemaTable from './ApiSchemaTable.vue'
import ApiParametersTable from './ApiParametersTable.vue'
import ApiResponses from './ApiResponses.vue'
import ApiCodePanel from './ApiCodePanel.vue'
import BranchCredentialsBar from './BranchCredentialsBar.vue'

const props = defineProps<{ operationId: string }>()

// Scope the lookup to the API folder we're currently inside. Without this,
// two specs sharing an operationId silently resolve to whichever was loaded
// first. The route gives us the folder: /apidocs/<apiKey>/operations/<id>.
const route = useRoute()
const apiKey = computed(() => {
  const m = route.path.match(/^\/apidocs\/([^/]+)\//)
  return m?.[1]
})

const data = computed(() => getOperation(props.operationId, apiKey.value))
const operation = computed(() => data.value?.operation)

const bodySchema = computed(() => {
  const content = operation.value?.requestBody?.content
  if (!content) return null
  return content['application/json']?.schema ?? Object.values(content)[0]?.schema ?? null
})

const endpointUrl = computed(() => {
  if (!operation.value) return ''
  return `${operation.value._serverUrl ?? ''}${operation.value._path ?? ''}`
})

// Combine operation-level + path-level parameters, then bucket by `in`.
// Path-level parameters are inherited unless an operation-level parameter
// with the same name+in shadows them. (OpenAPI 3.0 §4.7.8)
const allParameters = computed<OpenApiParameter[]>(() => {
  if (!operation.value) return []
  const opParams = operation.value.parameters ?? []
  const pathParams = operation.value._pathParameters ?? []
  const seen = new Set(opParams.map((p) => `${p.in}:${p.name}`))
  const merged = [...opParams]
  for (const p of pathParams) {
    if (!seen.has(`${p.in}:${p.name}`)) merged.push(p)
  }
  return merged
})

const pathParams = computed(() => allParameters.value.filter((p) => p.in === 'path'))
const queryParams = computed(() => allParameters.value.filter((p) => p.in === 'query'))
const headerParams = computed(() => allParameters.value.filter((p) => p.in === 'header'))
</script>

<template>
  <div v-if="operation" class="api-op">
    <div class="api-op-main">
      <BranchCredentialsBar />

      <ApiHeader :operation="operation" :endpoint-url="endpointUrl" />

      <section v-if="pathParams.length" class="api-op-section">
        <h2 class="api-op-h2">Path parameters</h2>
        <ApiParametersTable :parameters="pathParams" />
      </section>

      <section v-if="queryParams.length" class="api-op-section">
        <h2 class="api-op-h2">Query parameters</h2>
        <ApiParametersTable :parameters="queryParams" />
      </section>

      <section v-if="headerParams.length" class="api-op-section">
        <h2 class="api-op-h2">Header parameters</h2>
        <ApiParametersTable :parameters="headerParams" />
      </section>

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
        :path-params="pathParams"
        :query-params="queryParams"
        :header-params="headerParams"
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
  grid-template-columns: minmax(0, 1fr) minmax(340px, 420px);
  gap: 48px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px 96px;
  width: 100%;
  overflow-x: visible;
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

/* Tighter responsive breakpoint — common laptops (1280×) keep the split
   layout. The aside collapses inline below 980px. */
@media (max-width: 980px) {
  .api-op {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 24px 16px 48px;
  }

  .api-op-aside {
    position: static;
    order: -1;
    margin-top: 24px;
    width: 100%;
    max-width: 100%;
  }
}

/* Mobile: force everything to fit */
@media (max-width: 767px) {
  .api-op {
    padding: 16px 12px 32px;
    overflow-x: visible;
  }

  .api-op-main,
  .api-op-aside {
    min-width: 0;
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>

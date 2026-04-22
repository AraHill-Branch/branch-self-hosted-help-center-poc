<script setup lang="ts">
import { computed } from 'vue'
import type { OpenApiSchema } from './spec'
import ApiSchemaRow from './ApiSchemaRow.vue'

const props = defineProps<{
  schema: OpenApiSchema
  depth?: number
}>()

const rows = computed(() => {
  if (!props.schema.properties) return []
  const required = new Set(props.schema.required ?? [])
  return Object.entries(props.schema.properties).map(([name, prop]) => ({
    name,
    schema: prop,
    isRequired: required.has(name),
  }))
})
</script>

<template>
  <div class="api-schema-table">
    <ApiSchemaRow
      v-for="row in rows"
      :key="row.name"
      :name="row.name"
      :schema="row.schema"
      :is-required="row.isRequired"
      :depth="depth ?? 0"
    />
    <div v-if="!rows.length" class="api-schema-empty">No parameters.</div>
  </div>
</template>

<style scoped>
.api-schema-table {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.api-schema-empty {
  padding: 16px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}
</style>

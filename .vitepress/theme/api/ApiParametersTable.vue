<script setup lang="ts">
import type { OpenApiParameter } from './spec'
import ApiSchemaRow from './ApiSchemaRow.vue'

defineProps<{
  parameters: OpenApiParameter[]
}>()
</script>

<template>
  <div class="api-params-table">
    <ApiSchemaRow
      v-for="p in parameters"
      :key="`${p.in}-${p.name}`"
      :name="p.name"
      :schema="{
        ...(p.schema ?? {}),
        description: p.description ?? p.schema?.description,
        example: p.example ?? p.schema?.example,
        deprecated: p.deprecated ?? p.schema?.deprecated,
      }"
      :is-required="!!p.required"
      :depth="0"
    />
  </div>
</template>

<style scoped>
.api-params-table {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
</style>

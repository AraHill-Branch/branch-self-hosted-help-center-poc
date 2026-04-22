<script setup lang="ts">
import { computed, ref } from 'vue'
import type { OpenApiSchema } from './spec'
import ApiSchemaTable from './ApiSchemaTable.vue'

const props = defineProps<{
  name: string
  schema: OpenApiSchema
  isRequired: boolean
  depth: number
}>()

const isObject = computed(() => props.schema.type === 'object' && !!props.schema.properties)
const isArrayOfObjects = computed(() =>
  props.schema.type === 'array' && props.schema.items?.type === 'object'
)
const hasChildren = computed(() => isObject.value || isArrayOfObjects.value)
const expanded = ref(false)

function toggle() {
  if (hasChildren.value) expanded.value = !expanded.value
}

const typeLabel = computed(() => {
  const s = props.schema
  if (s.type === 'array') {
    const itemType = s.items?.type ?? 'object'
    return `array of ${itemType}`
  }
  if (s.enum) return `enum`
  return s.type ?? 'string'
})

const childSchema = computed(() => {
  if (isObject.value) return props.schema
  if (isArrayOfObjects.value) return props.schema.items!
  return null
})

const fieldId = computed(() => `field-${props.name.replace(/[^\w-]/g, '-')}`)
</script>

<template>
  <div class="api-row" :class="{ 'has-children': hasChildren, 'is-expanded': expanded }" :style="{ '--depth': depth }">
    <div class="api-row-header" @click="toggle" :role="hasChildren ? 'button' : undefined" :tabindex="hasChildren ? 0 : undefined" @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle">
      <div class="api-row-left">
        <span v-if="hasChildren" class="api-row-caret" :class="{ open: expanded }">▸</span>
        <span v-else class="api-row-caret-placeholder" />
        <a :href="`#${fieldId}`" :id="fieldId" class="api-row-anchor" @click.stop>#</a>
        <code class="api-row-name">{{ name }}</code>
        <span class="api-row-type">{{ typeLabel }}</span>
        <span v-if="isRequired" class="api-row-required">required</span>
      </div>
    </div>

    <div v-if="schema.description || schema.enum || schema.default !== undefined || schema.minimum !== undefined || schema.maximum !== undefined || schema.example !== undefined" class="api-row-body">
      <p v-if="schema.description" class="api-row-desc">{{ schema.description }}</p>
      <div class="api-row-meta">
        <span v-if="schema.enum" class="api-row-meta-item">
          <span class="api-row-meta-label">Enum</span>
          <code v-for="(v, i) in schema.enum" :key="i">{{ JSON.stringify(v) }}</code>
        </span>
        <span v-if="schema.default !== undefined" class="api-row-meta-item">
          <span class="api-row-meta-label">Default</span>
          <code>{{ JSON.stringify(schema.default) }}</code>
        </span>
        <span v-if="schema.minimum !== undefined || schema.maximum !== undefined" class="api-row-meta-item">
          <span class="api-row-meta-label">Range</span>
          <code>
            <template v-if="schema.minimum !== undefined && schema.maximum !== undefined">{{ schema.minimum }}–{{ schema.maximum }}</template>
            <template v-else-if="schema.minimum !== undefined">≥ {{ schema.minimum }}</template>
            <template v-else>≤ {{ schema.maximum }}</template>
          </code>
        </span>
      </div>
    </div>

    <div v-if="expanded && childSchema" class="api-row-children">
      <ApiSchemaTable :schema="childSchema" :depth="depth + 1" />
    </div>
  </div>
</template>

<style scoped>
.api-row {
  border-top: 1px solid var(--vp-c-divider);
}

.api-row:first-child { border-top: none; }

.api-row-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  padding-left: calc(16px + var(--depth, 0) * 20px);
  user-select: none;
  transition: background-color 140ms ease;
}

.api-row.has-children > .api-row-header { cursor: pointer; }
.api-row.has-children > .api-row-header:hover { background: var(--vp-c-bg-soft); }

.api-row-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex-wrap: wrap;
}

.api-row-caret {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  transition: transform 160ms ease;
  flex-shrink: 0;
}

.api-row-caret.open { transform: rotate(90deg); color: var(--vp-c-brand-1); }

.api-row-caret-placeholder {
  display: inline-block;
  width: 14px;
  flex-shrink: 0;
}

.api-row-anchor {
  display: inline-block;
  width: 18px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  opacity: 0;
  text-decoration: none;
  transition: opacity 140ms ease, color 140ms ease;
  flex-shrink: 0;
}

.api-row-header:hover .api-row-anchor { opacity: 1; }
.api-row-anchor:hover { color: var(--vp-c-brand-1); }

.api-row-name {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: transparent;
  padding: 0;
}

.api-row-type {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.api-row-required {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #dc2626;
  padding: 2px 6px;
  background: rgba(220, 38, 38, 0.08);
  border-radius: 3px;
}

.dark .api-row-required {
  color: #fda4af;
  background: rgba(220, 38, 38, 0.18);
}

.api-row-body {
  padding: 0 16px 14px;
  padding-left: calc(48px + var(--depth, 0) * 20px);
}

.api-row-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 8px;
  max-width: 68ch;
}

.api-row-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12px;
}

.api-row-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.api-row-meta-label {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.api-row-meta-item code {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 1px 6px;
  border-radius: 3px;
}

.api-row-children {
  padding: 0 12px 12px;
  padding-left: calc(32px + var(--depth, 0) * 20px);
}

.api-row-children > :deep(.api-schema-table) {
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
}

.dark .api-row-children > :deep(.api-schema-table) {
  background: var(--vp-c-bg-soft);
}
</style>

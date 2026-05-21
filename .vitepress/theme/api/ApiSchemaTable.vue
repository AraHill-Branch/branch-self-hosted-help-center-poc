<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import type { OpenApiSchema } from './spec'
import ApiSchemaRow from './ApiSchemaRow.vue'

const props = defineProps<{
  schema: OpenApiSchema
  depth?: number
}>()

const depth = computed(() => props.depth ?? 0)
const isRoot = computed(() => depth.value === 0)

/**
 * "Show all" / "Hide all" expansion control.
 * The root table owns a reactive "expandAllToken" that bumps when the
 * user clicks the toggle; nested ApiSchemaRow instances watch it via
 * inject() and update their own expanded state.
 */
const expandAllToken = ref(0)
const expandedAllState = ref<'mixed' | 'all' | 'none'>('none')
// Only the root table publishes the expand-all signal; nested tables
// must NOT re-provide or they'd shadow the root signal and break the
// child watchers further down the tree.
if (isRoot.value) {
  provide('apiSchemaExpandAllToken', expandAllToken)
  provide('apiSchemaExpandAllTarget', expandedAllState)
}

function toggleExpandAll() {
  expandedAllState.value = expandedAllState.value === 'all' ? 'none' : 'all'
  expandAllToken.value++
}

/**
 * Flatten an allOf composition into a single property/required set by
 * merging every branch. Sub-schemas that aren't `object`-typed are folded
 * into the merged set as best-effort: properties from each branch are
 * unioned; required arrays are concatenated.
 */
function mergeAllOf(schema: OpenApiSchema): OpenApiSchema {
  if (!schema.allOf?.length) return schema
  const merged: OpenApiSchema = {
    type: 'object',
    properties: { ...(schema.properties ?? {}) },
    required: [...(schema.required ?? [])],
    description: schema.description,
  }
  for (const branch of schema.allOf) {
    const m = mergeAllOf(branch)
    if (m.properties) merged.properties = { ...merged.properties, ...m.properties }
    if (m.required) merged.required = Array.from(new Set([...(merged.required ?? []), ...m.required]))
  }
  return merged
}

const effectiveSchema = computed(() => mergeAllOf(props.schema))

// oneOf / anyOf branches are presented as tabs so users can pick a variant.
const variants = computed<{ schema: OpenApiSchema; label: string }[] | null>(() => {
  const s = props.schema
  const branches = s.oneOf || s.anyOf
  if (!branches?.length) return null
  return branches.map((b, i) => ({
    schema: b,
    // Use $ref tail or title for the label; otherwise "Option 1", "Option 2".
    label: (b as any).title || (b.$ref?.split('/').pop()) || `Option ${i + 1}`,
  }))
})

const activeVariant = ref(0)
const activeVariantSchema = computed(() =>
  variants.value ? variants.value[activeVariant.value].schema : null,
)

const rows = computed(() => {
  const s = activeVariantSchema.value ?? effectiveSchema.value
  if (!s.properties) return []
  const required = new Set<string>(s.required ?? [])
  return Object.entries(s.properties).map(([name, prop]) => ({
    name,
    schema: prop,
    isRequired: required.has(name),
  }))
})

// "Additional properties" — if the schema declares an additionalProperties
// SCHEMA (not bool), render it as a synthetic row so it's discoverable.
const additionalRow = computed(() => {
  const s = activeVariantSchema.value ?? effectiveSchema.value
  if (typeof s.additionalProperties === 'object') {
    return {
      name: '<additional key>',
      schema: s.additionalProperties as OpenApiSchema,
      isRequired: false,
    }
  }
  return null
})

const showEmpty = computed(
  () => !rows.value.length && !additionalRow.value && !variants.value,
)
</script>

<template>
  <div class="api-schema-table">
    <div v-if="isRoot && rows.length >= 5" class="api-schema-toolbar">
      <button
        type="button"
        class="api-schema-toggle-all"
        @click="toggleExpandAll"
      >
        <span v-if="expandedAllState === 'all'">Hide all</span>
        <span v-else>Show all properties</span>
      </button>
    </div>

    <div v-if="variants && variants.length > 1" class="api-schema-variants" role="tablist">
      <button
        v-for="(v, i) in variants"
        :key="i"
        role="tab"
        class="api-schema-variant"
        :class="{ active: activeVariant === i }"
        :aria-selected="activeVariant === i"
        @click="activeVariant = i"
      >{{ v.label }}</button>
    </div>

    <ApiSchemaRow
      v-for="row in rows"
      :key="row.name"
      :name="row.name"
      :schema="row.schema"
      :is-required="row.isRequired"
      :depth="depth"
    />
    <ApiSchemaRow
      v-if="additionalRow"
      :name="additionalRow.name"
      :schema="additionalRow.schema"
      :is-required="false"
      :depth="depth"
    />
    <div v-if="showEmpty" class="api-schema-empty">No parameters.</div>
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

.api-schema-toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.api-schema-toggle-all {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  padding: 3px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: color 140ms ease, border-color 140ms ease;
}

.api-schema-toggle-all:hover,
.api-schema-toggle-all:focus-visible {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.api-schema-variants {
  display: flex;
  gap: 4px;
  padding: 8px 8px 0;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.api-schema-variant {
  padding: 6px 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  background: transparent;
  border: none;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  transition: color 140ms ease, background 140ms ease;
}

.api-schema-variant:hover { color: var(--vp-c-text-1); }
.api-schema-variant.active {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  box-shadow: 0 -1px 0 0 var(--vp-c-divider), -1px 0 0 0 var(--vp-c-divider), 1px 0 0 0 var(--vp-c-divider);
}
</style>

<script setup lang="ts">
import { computed, inject, ref, watch, type Ref } from 'vue'
import type { OpenApiSchema } from './spec'
import ApiSchemaTable from './ApiSchemaTable.vue'
import { renderInlineMarkdown } from './markdown'

const props = defineProps<{
  name: string
  schema: OpenApiSchema
  isRequired: boolean
  depth: number
}>()

// "Has children" means there's a deeper schema worth letting the user
// expand into. Objects with properties qualify. Arrays of objects qualify.
// oneOf / anyOf / additionalProperties (when typed as a schema, not bool)
// also qualify — handled by ApiSchemaTable.
const isObject = computed(() => props.schema.type === 'object' && !!props.schema.properties)
// An array whose items are themselves expandable: an object with properties,
// OR a composition (oneOf/anyOf/allOf). The latter was previously dropped, so
// array-of-oneOf schemas (e.g. filter operators) showed no expandable detail.
const isArrayOfExpandable = computed(() => {
  const items = props.schema.items
  if (props.schema.type !== 'array' || !items) return false
  return (
    (items.type === 'object' && !!items.properties) ||
    !!(items.oneOf?.length || items.anyOf?.length || items.allOf?.length)
  )
})
const hasComposition = computed(
  () => !!(props.schema.oneOf?.length || props.schema.anyOf?.length || props.schema.allOf?.length),
)
const hasAddlPropsSchema = computed(
  () => typeof props.schema.additionalProperties === 'object',
)
const hasChildren = computed(
  () => isObject.value || isArrayOfExpandable.value || hasComposition.value || hasAddlPropsSchema.value,
)
const expanded = ref(false)

// "Show all" / "Hide all" control: the root ApiSchemaTable provides a
// reactive token + target state via inject. When the token bumps, every
// row syncs its expanded state to the target.
const expandAllToken = inject<Ref<number> | null>('apiSchemaExpandAllToken', null)
const expandAllTarget = inject<Ref<'all' | 'none' | 'mixed'> | null>('apiSchemaExpandAllTarget', null)
if (expandAllToken && expandAllTarget) {
  watch(expandAllToken, () => {
    if (!hasChildren.value) return
    expanded.value = expandAllTarget.value === 'all'
  })
}

function toggle() {
  if (hasChildren.value) expanded.value = !expanded.value
}

const typeLabel = computed(() => {
  const s = props.schema
  const baseType = s.type ?? (s.$ref ? 'object' : 'string')
  let label = baseType
  if (s.type === 'array') {
    const itemType = s.items?.type ?? 'object'
    label = `array of ${itemType}`
  } else if (s.enum) {
    // Keep the base type so the user knows whether to send `1` or `"1"`.
    label = `${baseType} · enum`
  } else if (s.format) {
    // Show the format inline next to the type when present.
    label = `${baseType} · ${s.format}`
  }
  if (s.nullable) label += ' · nullable'
  return label
})

const childSchema = computed<OpenApiSchema | null>(() => {
  if (isObject.value) return props.schema
  if (isArrayOfExpandable.value) return props.schema.items as OpenApiSchema
  if (hasComposition.value) return props.schema
  if (hasAddlPropsSchema.value) {
    return {
      type: 'object',
      properties: {
        '<key>': props.schema.additionalProperties as OpenApiSchema,
      },
      description: 'Any additional key beyond the named properties above.',
    }
  }
  return null
})

// Anchor id lives on the row container itself; the `#` link is purely a
// "copy a link to this field" affordance.
const fieldId = computed(() => `field-${props.name.replace(/[^\w-]/g, '-')}`)
const anchorHref = computed(() => `#${fieldId.value}`)

const constraintBits = computed(() => {
  const s = props.schema
  const bits: { label: string; value: string }[] = []
  if (s.enum?.length) {
    bits.push({ label: 'Enum', value: s.enum.map((v) => JSON.stringify(v)).join(', ') })
  }
  if (s.default !== undefined) {
    bits.push({ label: 'Default', value: JSON.stringify(s.default) })
  }
  if (s.minimum !== undefined || s.maximum !== undefined) {
    if (s.minimum !== undefined && s.maximum !== undefined) {
      bits.push({ label: 'Range', value: `${s.minimum}–${s.maximum}` })
    } else if (s.minimum !== undefined) {
      bits.push({ label: 'Min', value: String(s.minimum) })
    } else {
      bits.push({ label: 'Max', value: String(s.maximum) })
    }
  }
  if (s.minLength !== undefined || s.maxLength !== undefined) {
    if (s.minLength !== undefined && s.maxLength !== undefined) {
      bits.push({ label: 'Length', value: `${s.minLength}–${s.maxLength}` })
    } else if (s.minLength !== undefined) {
      bits.push({ label: 'Min length', value: String(s.minLength) })
    } else {
      bits.push({ label: 'Max length', value: String(s.maxLength) })
    }
  }
  if (s.minItems !== undefined || s.maxItems !== undefined) {
    if (s.minItems !== undefined && s.maxItems !== undefined) {
      bits.push({ label: 'Items', value: `${s.minItems}–${s.maxItems}` })
    }
  }
  if (s.pattern) {
    bits.push({ label: 'Pattern', value: s.pattern })
  }
  if (s.example !== undefined && s.example !== null) {
    const v = typeof s.example === 'object' ? JSON.stringify(s.example) : String(s.example)
    bits.push({ label: 'Example', value: v })
  }
  return bits
})

const showBody = computed(() => Boolean(props.schema.description) || constraintBits.value.length > 0)
const isDeprecated = computed(() => props.schema.deprecated === true)
const descriptionHtml = computed(() => renderInlineMarkdown(props.schema.description))
</script>

<template>
  <div
    :id="fieldId"
    class="api-row"
    :class="{ 'has-children': hasChildren, 'is-expanded': expanded, 'is-deprecated': isDeprecated }"
    :style="{ '--depth': depth }"
  >
    <div
      class="api-row-header"
      :role="hasChildren ? 'button' : undefined"
      :tabindex="hasChildren ? 0 : undefined"
      :aria-expanded="hasChildren ? expanded : undefined"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <div class="api-row-left">
        <span v-if="hasChildren" class="api-row-caret" :class="{ open: expanded }" aria-hidden="true">▸</span>
        <span v-else class="api-row-caret-placeholder" aria-hidden="true" />
        <a
          :href="anchorHref"
          class="api-row-anchor"
          :aria-label="`Permalink to ${name}`"
          @click.stop
        >#</a>
        <code class="api-row-name">{{ name }}</code>
        <span class="api-row-type">{{ typeLabel }}</span>
        <span v-if="isRequired" class="api-row-required" title="This field is required.">required</span>
        <span v-if="isDeprecated" class="api-row-deprecated" title="This field is deprecated.">deprecated</span>
      </div>
    </div>

    <div v-if="showBody" class="api-row-body">
      <p v-if="schema.description" class="api-row-desc" v-html="descriptionHtml" />
      <div v-if="constraintBits.length" class="api-row-meta">
        <span
          v-for="bit in constraintBits"
          :key="bit.label"
          class="api-row-meta-item"
        >
          <span class="api-row-meta-label">{{ bit.label }}</span>
          <code>{{ bit.value }}</code>
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
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 16px);
}

.api-row:first-child { border-top: none; }

.api-row.is-deprecated > .api-row-header .api-row-name {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

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
.api-row.has-children > .api-row-header:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

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
  /* No longer hidden by default — keyboard + touch users can reach it now. */
  opacity: 0.4;
  text-decoration: none;
  transition: opacity 140ms ease, color 140ms ease;
  flex-shrink: 0;
}

.api-row-header:hover .api-row-anchor,
.api-row-anchor:focus-visible { opacity: 1; }
.api-row-anchor:hover { color: var(--vp-c-brand-1); }
.api-row-anchor:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

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
  color: var(--vp-c-text-2);
}

.api-row-required {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  /* WCAG AA: bumped from #dc2626 to #b91c1c for >=4.5:1 against the chip background. */
  color: #b91c1c;
  padding: 2px 6px;
  background: rgba(220, 38, 38, 0.1);
  border-radius: 3px;
}

.dark .api-row-required {
  color: #fda4af;
  background: rgba(220, 38, 38, 0.22);
}

.api-row-deprecated {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #92400e;
  padding: 2px 6px;
  background: rgba(245, 158, 11, 0.18);
  border-radius: 3px;
}

.dark .api-row-deprecated {
  color: #fcd34d;
  background: rgba(245, 158, 11, 0.22);
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

/* Inline markdown rendered into description via v-html. */
.api-row-desc :deep(code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.92em;
  background: var(--vp-c-bg-soft);
  padding: 1px 5px;
  border-radius: 3px;
}
.api-row-desc :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-decoration-color: var(--vp-c-divider);
}
.api-row-desc :deep(a:hover) { text-decoration-color: var(--vp-c-brand-1); }

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
  word-break: break-word;
  max-width: 60ch;
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

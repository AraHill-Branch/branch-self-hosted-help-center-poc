<script setup lang="ts">
import { computed, ref } from 'vue'
import type { OpenApiOperation } from './spec'
import { specs } from './spec'
import { renderInlineMarkdown } from './markdown'

const props = defineProps<{
  operation: OpenApiOperation
  endpointUrl: string
}>()

// Resolve the security requirements that apply to this operation.
// Operation-level security overrides spec-level when present (OpenAPI 3.0).
const apiKey = computed(() => props.operation._apiKey)
const spec = computed(() => (apiKey.value ? specs[apiKey.value] : null))

const effectiveSecurity = computed(() => {
  const opSec = props.operation.security
  if (opSec) return opSec
  return spec.value?.security ?? []
})

// Surface a single short label per scheme (e.g. "Branch Key", "Access Token")
// using the spec's named securitySchemes. Body-auth (branch_key in JSON
// body) isn't formally a security scheme in OpenAPI 3.0, so we look at
// the request schema for a `branch_key` property and surface it too.
const authBadges = computed(() => {
  const schemes = spec.value?.components?.securitySchemes ?? {}
  const seen = new Set<string>()
  const badges: { label: string; detail: string }[] = []

  for (const req of effectiveSecurity.value) {
    for (const name of Object.keys(req)) {
      if (seen.has(name)) continue
      seen.add(name)
      const def = schemes[name]
      if (!def) {
        badges.push({ label: name, detail: 'API key' })
        continue
      }
      // Friendly labels for the schemes Branch actually uses.
      let label = def.name ?? name
      let detail = `${def.in ?? 'header'} apiKey`
      if (name === 'accessToken' || /access[-_]?token/i.test(label)) {
        label = 'Access Token'
        detail = `${def.in ?? 'header'}: ${def.name ?? 'Access-Token'}`
      } else if (name === 'appId' || /app[-_]?id/i.test(label)) {
        label = 'App ID'
        detail = `${def.in ?? 'query'}: ${def.name ?? 'app_id'}`
      } else if (name === 'orgId' || /org/i.test(label)) {
        label = 'Organization ID'
        detail = `${def.in ?? 'query'}: ${def.name ?? 'organization_id'}`
      }
      badges.push({ label, detail })
    }
  }

  // Detect body-level Branch Key authentication when the request schema
  // declares `branch_key` (Branch's convention for the functional APIs).
  const bodyContent = props.operation.requestBody?.content?.['application/json']
  const bodyProps = bodyContent?.schema?.properties
  if (bodyProps) {
    if ('branch_key' in bodyProps && !seen.has('branch_key')) {
      badges.push({ label: 'Branch Key', detail: 'body: branch_key' })
      seen.add('branch_key')
    }
    if ('branch_secret' in bodyProps && !seen.has('branch_secret')) {
      badges.push({ label: 'Branch Secret', detail: 'body: branch_secret' })
      seen.add('branch_secret')
    }
  }

  // Detect Access-Token / app_id / branch_key as plain operation parameters
  // — common in older specs where the auth is documented as a header or
  // query param rather than a formal `securityScheme`.
  const allParams = [
    ...(props.operation.parameters ?? []),
    ...(props.operation._pathParameters ?? []),
  ]
  for (const p of allParams) {
    const lower = p.name.toLowerCase()
    if ((lower === 'access-token' || lower === 'access_token') && !seen.has('accessToken')) {
      badges.push({ label: 'Access Token', detail: `${p.in}: ${p.name}` })
      seen.add('accessToken')
    } else if (lower === 'app_id' && !seen.has('appId')) {
      badges.push({ label: 'App ID', detail: `${p.in}: ${p.name}` })
      seen.add('appId')
    } else if (lower === 'branch_key' && !seen.has('branch_key_param')) {
      badges.push({ label: 'Branch Key', detail: `${p.in}: ${p.name}` })
      seen.add('branch_key_param')
    }
  }

  return badges
})

const isDeprecated = computed(() => props.operation.deprecated === true)
const descriptionHtml = computed(() => renderInlineMarkdown(props.operation.description))

const urlCopied = ref(false)
async function copyEndpoint() {
  try {
    await navigator.clipboard.writeText(props.endpointUrl)
    urlCopied.value = true
    setTimeout(() => (urlCopied.value = false), 1200)
  } catch { /* no-op */ }
}
</script>

<template>
  <header class="api-header">
    <div class="api-header-meta">
      <span class="api-verb" :data-verb="operation._verb">{{ operation._verb }}</span>
      <code class="api-path">{{ operation._path }}</code>
      <span v-if="isDeprecated" class="api-header-deprecated" title="This operation is deprecated.">Deprecated</span>
    </div>

    <h1 class="api-title">{{ operation.summary || operation.operationId }}</h1>

    <p v-if="operation.description" class="api-description" v-html="descriptionHtml" />

    <div class="api-endpoint-url">
      <span class="api-endpoint-label">Endpoint</span>
      <code class="api-endpoint-code">{{ endpointUrl }}</code>
      <button
        class="api-endpoint-copy"
        @click="copyEndpoint"
        :aria-label="urlCopied ? 'Copied' : 'Copy endpoint URL'"
        type="button"
      >
        <span v-if="!urlCopied">Copy</span>
        <span v-else>Copied</span>
      </button>
    </div>

    <div v-if="authBadges.length" class="api-auth-row">
      <span class="api-auth-label">Authentication</span>
      <span
        v-for="badge in authBadges"
        :key="badge.label"
        class="api-auth-badge"
        :title="badge.detail"
      >
        <span class="api-auth-badge-key">{{ badge.label }}</span>
        <span class="api-auth-badge-detail">{{ badge.detail }}</span>
      </span>
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
  flex-wrap: wrap;
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
  background: #4b5563;
  border-radius: 4px;
  line-height: 1;
}

.api-verb[data-verb="GET"]    { background: #15803d; }
.api-verb[data-verb="POST"]   { background: #1d4ed8; }
.api-verb[data-verb="PUT"]    { background: #b45309; }
.api-verb[data-verb="PATCH"]  { background: #be185d; }
.api-verb[data-verb="DELETE"] { background: #b91c1c; }

.api-path {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 3px 8px;
  border-radius: 4px;
}

.api-header-deprecated {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #92400e;
  background: rgba(245, 158, 11, 0.18);
  padding: 3px 8px;
  border-radius: 4px;
}

.dark .api-header-deprecated {
  color: #fcd34d;
  background: rgba(245, 158, 11, 0.22);
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

/* Inline-markdown elements rendered inside .api-description via v-html. */
.api-description :deep(code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.92em;
  background: var(--vp-c-bg-soft);
  padding: 1px 5px;
  border-radius: 3px;
}
.api-description :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-decoration-color: var(--vp-c-divider);
}
.api-description :deep(a:hover) { text-decoration-color: var(--vp-c-brand-1); }

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

.api-endpoint-code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: transparent;
  padding: 0;
  flex: 1 1 auto;
  overflow-x: auto;
  white-space: nowrap;
}

.api-endpoint-copy {
  padding: 3px 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: color 140ms ease, border-color 140ms ease;
  flex-shrink: 0;
}

.api-endpoint-copy:hover,
.api-endpoint-copy:focus-visible {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.api-endpoint-copy:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.api-auth-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.api-auth-label {
  font-family: var(--vp-font-family-mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.api-auth-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: var(--vp-c-brand-soft);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  border-radius: 999px;
  font-size: 12px;
  cursor: help;
}

.dark .api-auth-badge {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 38%, transparent);
}

.api-auth-badge-key {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.api-auth-badge-detail {
  font-family: var(--vp-font-family-mono);
  font-size: 10.5px;
  color: var(--vp-c-text-3);
}

/* Mobile responsive */
@media (max-width: 767px) {
  .api-header {
    max-width: 100%;
    overflow-x: hidden;
  }

  .api-title {
    font-size: 24px;
  }

  .api-path {
    font-size: 12px;
    max-width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
  }

  .api-endpoint-url {
    display: block;
    overflow-x: auto;
  }

  .api-endpoint-label {
    display: block;
    margin-bottom: 8px;
  }

  .api-endpoint-code {
    display: block;
    width: 100%;
    min-width: 0;
    overflow-x: auto;
    margin-bottom: 8px;
  }

  .api-endpoint-copy {
    display: inline-block;
  }
}
</style>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { OpenApiOperation, OpenApiParameter, OpenApiSchema } from './spec'
import { buildExample, generateSample, SAMPLE_LANGS, shikiLangFor, type SampleLang } from './codegen'
import { useBranchCredentials, applyCredentials, applyCredentialsToValue } from './useBranchCredentials'
import HighlightedCode from './HighlightedCode.vue'

const credentials = useBranchCredentials()

const props = defineProps<{
  operation: OpenApiOperation
  endpointUrl: string
  bodySchema: OpenApiSchema | null
  pathParams?: OpenApiParameter[]
  queryParams?: OpenApiParameter[]
  headerParams?: OpenApiParameter[]
}>()

const tabs: { id: 'try' | 'samples'; label: string }[] = [
  { id: 'try', label: 'Try it' },
  { id: 'samples', label: 'Code samples' },
]
const activeTab = ref<'try' | 'samples'>('try')
const activeLang = ref<SampleLang>('curl')

// ---------------------------------------------------------------------------
// Parameter input state — path / query / header
// Stored in three reactive records keyed by `<in>:<name>`. Default values
// come from spec `example` -> schema `example` -> schema `default` -> empty.
// ---------------------------------------------------------------------------

function defaultValue(p: OpenApiParameter): string {
  if (p.example !== undefined && p.example !== null) return String(p.example)
  if (p.schema?.example !== undefined && p.schema.example !== null) return String(p.schema.example)
  if (p.schema?.default !== undefined && p.schema.default !== null) return String(p.schema.default)
  return ''
}

function initInputs(params?: OpenApiParameter[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const p of params ?? []) out[p.name] = defaultValue(p)
  return out
}

/**
 * Map a parameter to a stored credential, when one applies. This lets us
 * pre-fill `app_id` from the credentials bar even when the spec doesn't
 * declare it as a securityScheme. Returns the stored value or null.
 */
function storedCredentialFor(p: OpenApiParameter): string | null {
  if (/^app[-_]?id$/i.test(p.name) && credentials.value.appId) return credentials.value.appId
  if (/^access[-_]?token$/i.test(p.name) && credentials.value.accessToken) return credentials.value.accessToken
  if (/^branch[-_]?key$/i.test(p.name) && credentials.value.branchKey) return credentials.value.branchKey
  return null
}

function effectiveInput(p: OpenApiParameter, inputs: Record<string, string>): string {
  const stored = storedCredentialFor(p)
  if (stored) return stored
  return inputs[p.name] ?? ''
}

const pathInputs = ref<Record<string, string>>(initInputs(props.pathParams))
const queryInputs = ref<Record<string, string>>(initInputs(props.queryParams))
const headerInputs = ref<Record<string, string>>(initInputs(props.headerParams))

watch(() => props.operation.operationId, () => {
  pathInputs.value = initInputs(props.pathParams)
  queryInputs.value = initInputs(props.queryParams)
  headerInputs.value = initInputs(props.headerParams)
})

// ---------------------------------------------------------------------------
// Body editor
// ---------------------------------------------------------------------------

const initialBody = computed(() => (props.bodySchema ? buildExample(props.bodySchema) : null))
const bodyText = ref(initialBody.value ? JSON.stringify(initialBody.value, null, 2) : '')
watch(() => props.operation.operationId, () => {
  bodyText.value = initialBody.value ? JSON.stringify(initialBody.value, null, 2) : ''
})

const parsedBody = computed(() => {
  if (!bodyText.value.trim()) return undefined
  try { return JSON.parse(bodyText.value) } catch { return undefined }
})

// ---------------------------------------------------------------------------
// Accept header — best-guess from the spec's first non-JSON response
// content-type. Used for both display and the actual fetch.
// ---------------------------------------------------------------------------

const acceptHeader = computed(() => {
  const res = props.operation.responses
  for (const c of Object.keys(res)) {
    const content = res[c]?.content
    if (!content) continue
    const mime = Object.keys(content)[0]
    if (mime && mime !== 'application/json') return mime
  }
  return 'application/json'
})

// ---------------------------------------------------------------------------
// Compose the request URL (path-param substitution + query string)
// ---------------------------------------------------------------------------

// Substitute stored credentials into each path/query input value BEFORE
// composing the URL, so an operation like `POST /url/bulk/{branch_key}`
// hits the real API with the user's key rather than a literal placeholder.
function withCreds(v: string): string {
  return applyCredentials(v, credentials.value)
}

const composedUrl = computed(() => {
  let url = props.endpointUrl
  for (const p of props.pathParams ?? []) {
    const v = withCreds(effectiveInput(p, pathInputs.value))
    url = url.replace(`{${p.name}}`, encodeURIComponent(v))
  }
  const qs: string[] = []
  for (const p of props.queryParams ?? []) {
    const v = withCreds(effectiveInput(p, queryInputs.value))
    if (v !== '') qs.push(`${encodeURIComponent(p.name)}=${encodeURIComponent(v)}`)
  }
  return qs.length ? `${url}?${qs.join('&')}` : url
})

const extraHeaders = computed<Record<string, string>>(() => {
  const out: Record<string, string> = {}
  for (const p of props.headerParams ?? []) {
    const v = effectiveInput(p, headerInputs.value)
    if (v) out[p.name] = v
  }
  // Auto-inject Access-Token from the credentials store when this op
  // uses Access-Token header auth (e.g. data/export APIs).
  const accessTokenHeaderName = (props.headerParams ?? []).find(
    (p) => /access[-_]?token/i.test(p.name),
  )?.name
  if (credentials.value.accessToken && accessTokenHeaderName && !out[accessTokenHeaderName]) {
    out[accessTokenHeaderName] = credentials.value.accessToken
  }
  // Run every header value through credential substitution so placeholder
  // values the user left in still benefit from the stored credentials.
  for (const k of Object.keys(out)) out[k] = withCreds(out[k])
  return out
})

// ---------------------------------------------------------------------------
// Code samples — switch language, copy
// ---------------------------------------------------------------------------

const currentSample = computed(() => {
  // Substitute the user's stored credentials into the body before code
  // generation so the rendered sample matches what they'd actually send.
  const substitutedBody = parsedBody.value !== undefined
    ? applyCredentialsToValue(parsedBody.value, credentials.value)
    : undefined
  const raw = generateSample(activeLang.value, {
    verb: props.operation._verb!,
    url: composedUrl.value,
    body: substitutedBody,
    acceptHeader: acceptHeader.value,
    extraHeaders: extraHeaders.value,
  })
  // One final pass over the string handles any placeholders that live
  // outside the JSON body (e.g. URLs that embed a key).
  return applyCredentials(raw, credentials.value)
})

const copied = ref(false)
async function copySample() {
  try {
    await navigator.clipboard.writeText(currentSample.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch { /* no-op */ }
}

// ---------------------------------------------------------------------------
// Try-it state
// All response fields reset together via resetResponse() so a previous send
// can't leave stale statusText / isJson values around.
// ---------------------------------------------------------------------------

const sending = ref(false)
const responseStatus = ref<number | null>(null)
const responseStatusText = ref<string>('')
const responseBody = ref<string>('')
const responseImageUrl = ref<string | null>(null)
const responseIsJson = ref(false)
const responseError = ref<string | null>(null)
const responseTime = ref<number | null>(null)

function resetResponse() {
  // Revoke any previously-allocated blob URL before dropping the reference.
  // Without this, calling Try-it multiple times leaks one blob per send.
  if (responseImageUrl.value) URL.revokeObjectURL(responseImageUrl.value)
  responseStatus.value = null
  responseStatusText.value = ''
  responseBody.value = ''
  responseImageUrl.value = null
  responseIsJson.value = false
  responseError.value = null
  responseTime.value = null
}

onBeforeUnmount(() => {
  if (responseImageUrl.value) URL.revokeObjectURL(responseImageUrl.value)
})

async function sendRequest() {
  if (sending.value) return
  sending.value = true
  resetResponse()

  let parsed: any
  try {
    parsed = bodyText.value.trim() ? JSON.parse(bodyText.value) : undefined
  } catch (e: any) {
    responseError.value = `Invalid JSON in request body: ${e.message}`
    sending.value = false
    return
  }
  // Substitute stored credentials into the outgoing body so the
  // user's pasted Branch Key actually reaches the API (without forcing
  // them to edit each JSON field by hand).
  if (parsed !== undefined) {
    parsed = applyCredentialsToValue(parsed, credentials.value)
  }

  // Real headers sent to the API. Mirrors what codegen.ts puts in samples
  // so what the user sees and what we send line up.
  const headers: Record<string, string> = { Accept: acceptHeader.value }
  if (parsed !== undefined) headers['Content-Type'] = 'application/json'
  for (const [k, v] of Object.entries(extraHeaders.value)) headers[k] = v

  const started = performance.now()
  try {
    const res = await fetch(composedUrl.value, {
      method: props.operation._verb,
      headers,
      body: parsed !== undefined ? JSON.stringify(parsed) : undefined,
    })
    responseStatus.value = res.status
    responseStatusText.value = res.statusText
    responseTime.value = Math.round(performance.now() - started)

    const contentType = res.headers.get('content-type') ?? ''
    if (contentType.startsWith('image/')) {
      const blob = await res.blob()
      responseImageUrl.value = URL.createObjectURL(blob)
    } else if (contentType.includes('application/json')) {
      const json = await res.json()
      responseBody.value = JSON.stringify(json, null, 2)
      responseIsJson.value = true
    } else {
      responseBody.value = await res.text()
      responseIsJson.value = false
    }
  } catch (e: any) {
    responseError.value = e.message || String(e)
    responseTime.value = Math.round(performance.now() - started)
  } finally {
    sending.value = false
  }
}

function statusClass(code: number | null) {
  if (code === null) return ''
  if (code >= 200 && code < 300) return 'ok'
  if (code >= 400 && code < 500) return 'client-err'
  if (code >= 500) return 'server-err'
  return ''
}

const showRequestBodyEditor = computed(() => Boolean(props.bodySchema))
const showParamsSection = computed(
  () => Boolean(props.pathParams?.length || props.queryParams?.length || props.headerParams?.length),
)
</script>

<template>
  <div class="api-panel">
    <div class="api-panel-tabs" role="tablist">
      <button
        v-for="t in tabs"
        :key="t.id"
        role="tab"
        class="api-panel-tab"
        :class="{ active: activeTab === t.id }"
        :aria-selected="activeTab === t.id"
        @click="activeTab = t.id"
      >{{ t.label }}</button>
    </div>

    <!-- TRY IT -->
    <div v-show="activeTab === 'try'" class="api-panel-body">
      <div class="api-panel-request-header">
        <span class="api-panel-verb" :data-verb="operation._verb">{{ operation._verb }}</span>
        <code class="api-panel-url">{{ composedUrl }}</code>
      </div>

      <div v-if="showParamsSection" class="api-panel-section">
        <div v-if="pathParams?.length" class="api-panel-param-group">
          <div class="api-panel-label">Path</div>
          <label v-for="p in pathParams" :key="`p-${p.name}`" class="api-panel-input-row">
            <span class="api-panel-input-name">{{ p.name }}</span>
            <input
              v-model="pathInputs[p.name]"
              :placeholder="p.example ?? p.schema?.example ?? ''"
              spellcheck="false"
              class="api-panel-input"
            />
          </label>
        </div>
        <div v-if="queryParams?.length" class="api-panel-param-group">
          <div class="api-panel-label">Query</div>
          <label v-for="p in queryParams" :key="`q-${p.name}`" class="api-panel-input-row">
            <span class="api-panel-input-name">{{ p.name }}</span>
            <select
              v-if="p.schema?.enum?.length"
              v-model="queryInputs[p.name]"
              class="api-panel-input"
            >
              <option v-for="opt in p.schema.enum" :key="String(opt)" :value="String(opt)">{{ opt }}</option>
            </select>
            <input
              v-else-if="p.schema?.type === 'integer' || p.schema?.type === 'number'"
              v-model="queryInputs[p.name]"
              type="number"
              :min="p.schema?.minimum"
              :max="p.schema?.maximum"
              :placeholder="String(p.schema?.default ?? p.example ?? p.schema?.example ?? '')"
              class="api-panel-input"
            />
            <input
              v-else
              v-model="queryInputs[p.name]"
              :placeholder="String(p.schema?.default ?? p.example ?? p.schema?.example ?? '')"
              spellcheck="false"
              class="api-panel-input"
            />
          </label>
        </div>
        <div v-if="headerParams?.length" class="api-panel-param-group">
          <div class="api-panel-label">Headers</div>
          <label v-for="p in headerParams" :key="`h-${p.name}`" class="api-panel-input-row">
            <span class="api-panel-input-name">{{ p.name }}</span>
            <input
              v-model="headerInputs[p.name]"
              :placeholder="String(p.example ?? p.schema?.example ?? '')"
              spellcheck="false"
              class="api-panel-input"
            />
          </label>
        </div>
      </div>

      <div v-if="showRequestBodyEditor" class="api-panel-section">
        <div class="api-panel-label">Request body</div>
        <textarea
          v-model="bodyText"
          class="api-panel-body-editor"
          spellcheck="false"
          :rows="Math.min(16, Math.max(6, bodyText.split('\n').length))"
        />
      </div>

      <button class="api-panel-send" :disabled="sending" @click="sendRequest">
        <span v-if="!sending">Send request</span>
        <span v-else>Sending…</span>
      </button>

      <div class="api-panel-note">
        Try it sends a real request to the Branch API. Replace any
        <code>key_live_xxxx</code> / placeholder values with your own credentials before sending. CORS may block the request from the docs origin; if you see a network error, copy the cURL sample and run it from your shell.
      </div>

      <div v-if="responseError" class="api-panel-section api-panel-error">
        <div class="api-panel-label">Error</div>
        <pre><code>{{ responseError }}</code></pre>
      </div>

      <div v-if="responseStatus !== null" class="api-panel-section">
        <div class="api-panel-response-header">
          <span class="api-panel-status" :class="statusClass(responseStatus)">
            <span class="api-panel-dot" />
            <strong>{{ responseStatus }}</strong>
            <span>{{ responseStatusText }}</span>
          </span>
          <span v-if="responseTime !== null" class="api-panel-time">{{ responseTime }} ms</span>
        </div>

        <div v-if="responseImageUrl" class="api-panel-image-response">
          <img :src="responseImageUrl" alt="Binary response from API" />
        </div>
        <HighlightedCode
          v-else-if="responseBody"
          :code="responseBody"
          :lang="responseIsJson ? 'json' : 'txt'"
        />
        <div v-else class="api-panel-empty-body">
          No response body.
        </div>
      </div>
    </div>

    <!-- CODE SAMPLES -->
    <div v-show="activeTab === 'samples'" class="api-panel-body">
      <div class="api-panel-lang-tabs" role="tablist">
        <button
          v-for="l in SAMPLE_LANGS"
          :key="l.id"
          role="tab"
          class="api-panel-lang-tab"
          :class="{ active: activeLang === l.id }"
          :aria-selected="activeLang === l.id"
          @click="activeLang = l.id"
        >{{ l.label }}</button>
      </div>

      <div class="api-panel-sample-wrap">
        <button
          class="api-panel-copy"
          @click="copySample"
          :aria-label="copied ? 'Copied' : 'Copy code sample'"
        >
          <span v-if="!copied">Copy</span>
          <span v-else>Copied</span>
        </button>
        <HighlightedCode
          :code="currentSample"
          :lang="shikiLangFor(activeLang)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.api-panel {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.api-panel-tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.api-panel-tab {
  flex: 1;
  padding: 12px 14px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 140ms ease, border-color 140ms ease;
  margin-bottom: -1px;
}

.api-panel-tab:hover { color: var(--vp-c-text-1); }

.api-panel-tab.active {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.api-panel-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.api-panel-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.api-panel-label {
  font-family: var(--vp-font-family-mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.api-panel-request-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.api-panel-verb {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
  background: #4b5563;
  border-radius: 3px;
  line-height: 1;
}

.api-panel-verb[data-verb="GET"]    { background: #15803d; }
.api-panel-verb[data-verb="POST"]   { background: #1d4ed8; }
.api-panel-verb[data-verb="PUT"]    { background: #b45309; }
.api-panel-verb[data-verb="PATCH"]  { background: #be185d; }
.api-panel-verb[data-verb="DELETE"] { background: #b91c1c; }

.api-panel-url {
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  background: transparent;
  padding: 0;
  overflow-x: auto;
  white-space: nowrap;
  min-width: 0;
}

.api-panel-param-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.api-panel-input-row {
  display: grid;
  grid-template-columns: minmax(100px, 1fr) 2fr;
  align-items: center;
  gap: 8px;
}

.api-panel-input-name {
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.api-panel-input {
  width: 100%;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  padding: 6px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.dark .api-panel-input { background: var(--vp-c-bg-soft); }

.api-panel-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-focus-ring);
}

.api-panel-body-editor {
  width: 100%;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.55;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  resize: vertical;
  min-height: 140px;
}

.dark .api-panel-body-editor {
  background: var(--vp-c-bg-soft);
}

.api-panel-body-editor:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-focus-ring);
}

.api-panel-send {
  width: 100%;
  padding: 10px 14px;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 140ms ease, transform 140ms ease;
}

.api-panel-send:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.api-panel-send:active:not(:disabled) {
  transform: translateY(0);
}

.api-panel-send:disabled {
  opacity: 0.6;
  cursor: wait;
}

.api-panel-note {
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  padding: 8px 10px;
  background: var(--vp-c-bg-soft);
  border-left: 3px solid #f59e0b;
  border-radius: 3px;
}

.api-panel-note code {
  font-size: 11px;
  background: var(--vp-c-bg-alt);
  padding: 0 3px;
  border-radius: 2px;
}

.dark .api-panel-note code { background: var(--vp-c-bg); }

.api-panel-error pre {
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #991b1b;
}

.dark .api-panel-error pre {
  background: rgba(220, 38, 38, 0.15);
  color: #fca5a5;
}

.api-panel-response-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.api-panel-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.api-panel-status strong { font-weight: 700; }

.api-panel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
}

.api-panel-status.ok .api-panel-dot { background: #22c55e; }
.api-panel-status.client-err .api-panel-dot { background: #f59e0b; }
.api-panel-status.server-err .api-panel-dot { background: #ef4444; }

.api-panel-time {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.api-panel-image-response {
  padding: 12px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.api-panel-image-response img {
  max-width: 100%;
  height: auto;
  display: block;
}

.api-panel-empty-body {
  padding: 12px;
  background: var(--vp-c-bg-alt);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  text-align: center;
}

.api-panel-body pre {
  margin: 0;
  padding: 12px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.55;
  color: var(--vp-c-text-1);
}

.dark .api-panel-body pre { background: var(--vp-c-bg-soft); }

.api-panel-body code {
  background: transparent;
  padding: 0;
  font-family: inherit;
}

.api-panel-lang-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 3px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.api-panel-lang-tab {
  padding: 6px 8px;
  font-family: var(--vp-font-family-base);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease;
}

.api-panel-lang-tab:hover { color: var(--vp-c-text-1); }

.api-panel-lang-tab.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.dark .api-panel-lang-tab.active {
  background: var(--vp-c-bg-alt);
}

.api-panel-sample-wrap {
  position: relative;
}

.api-panel-copy {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  cursor: pointer;
  /* Always visible — fixes a discoverability + a11y miss on hover-only. */
  opacity: 0.85;
  transition: opacity 140ms ease, color 140ms ease, border-color 140ms ease;
  z-index: 1;
}

.api-panel-sample-wrap:hover .api-panel-copy,
.api-panel-copy:focus-visible { opacity: 1; }

.api-panel-copy:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.api-panel-copy:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* Mobile responsive */
@media (max-width: 767px) {
  .api-panel {
    max-width: 100%;
    overflow-x: auto;
  }

  .api-panel-input,
  .api-panel-body,
  .api-panel-sample-wrap {
    max-width: 100%;
  }

  .api-panel-input input,
  .api-panel-input textarea {
    font-size: 14px;
  }

  .api-panel-lang-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .api-panel-lang-tab {
    flex-shrink: 0;
  }
}
</style>

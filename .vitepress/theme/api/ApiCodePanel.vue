<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { OpenApiOperation, OpenApiSchema } from './spec'
import { buildExample, generateSample, type SampleLang } from './codegen'
import HighlightedCode from './HighlightedCode.vue'

const sampleLangToShikiLang: Record<SampleLang, string> = {
  curl: 'bash',
  javascript: 'javascript',
  python: 'python',
  php: 'php',
}

const props = defineProps<{
  operation: OpenApiOperation
  endpointUrl: string
  bodySchema: OpenApiSchema | null
}>()

const tabs: { id: 'try' | 'samples'; label: string }[] = [
  { id: 'try', label: 'Try it' },
  { id: 'samples', label: 'Code samples' },
]
const activeTab = ref<'try' | 'samples'>('try')

const langs: { id: SampleLang; label: string }[] = [
  { id: 'curl', label: 'cURL' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'php', label: 'PHP' },
]
const activeLang = ref<SampleLang>('curl')

// Build initial body from the schema and keep it editable for try-it.
const initialBody = computed(() => (props.bodySchema ? buildExample(props.bodySchema) : null))
const bodyText = ref(initialBody.value ? JSON.stringify(initialBody.value, null, 2) : '')
watch(() => props.operation.operationId, () => {
  bodyText.value = initialBody.value ? JSON.stringify(initialBody.value, null, 2) : ''
})

const acceptHeader = computed(() => {
  const res = props.operation.responses
  const codes = Object.keys(res)
  for (const c of codes) {
    const content = res[c]?.content
    if (!content) continue
    const mime = Object.keys(content)[0]
    if (mime && mime !== 'application/json') return mime
  }
  return 'application/json'
})

// Body for code samples — follow edits the user makes in the try-it pane.
const parsedBody = computed(() => {
  if (!bodyText.value.trim()) return undefined
  try { return JSON.parse(bodyText.value) } catch { return undefined }
})

const currentSample = computed(() =>
  generateSample(activeLang.value, {
    verb: props.operation._verb!,
    url: props.endpointUrl,
    body: parsedBody.value,
    acceptHeader: acceptHeader.value,
  })
)

// Try-it state
const sending = ref(false)
const responseStatus = ref<number | null>(null)
const responseStatusText = ref<string>('')
const responseBody = ref<string>('')
const responseImageUrl = ref<string | null>(null)
const responseIsJson = ref(false)
const responseError = ref<string | null>(null)
const responseTime = ref<number | null>(null)

async function sendRequest() {
  if (sending.value) return
  sending.value = true
  responseStatus.value = null
  responseBody.value = ''
  responseError.value = null
  responseImageUrl.value = null
  responseTime.value = null

  let parsed: any
  try {
    parsed = bodyText.value.trim() ? JSON.parse(bodyText.value) : undefined
  } catch (e: any) {
    responseError.value = `Invalid JSON in request body: ${e.message}`
    sending.value = false
    return
  }

  const started = performance.now()
  try {
    const headers: Record<string, string> = {}
    if (parsed !== undefined) headers['Content-Type'] = 'application/json'
    const res = await fetch(props.endpointUrl, {
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

async function copySample() {
  try {
    await navigator.clipboard.writeText(currentSample.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch {
    // no-op
  }
}
const copied = ref(false)

function statusClass(code: number | null) {
  if (code === null) return ''
  if (code >= 200 && code < 300) return 'ok'
  if (code >= 400 && code < 500) return 'client-err'
  if (code >= 500) return 'server-err'
  return ''
}
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
        <code class="api-panel-url">{{ endpointUrl }}</code>
      </div>

      <div v-if="bodySchema" class="api-panel-section">
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
        This sends a real request to the live Branch API. Replace <code>key_live_xxxx</code> with your own Branch Key to get a successful response.
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
      </div>
    </div>

    <!-- CODE SAMPLES -->
    <div v-show="activeTab === 'samples'" class="api-panel-body">
      <div class="api-panel-lang-tabs" role="tablist">
        <button
          v-for="l in langs"
          :key="l.id"
          role="tab"
          class="api-panel-lang-tab"
          :class="{ active: activeLang === l.id }"
          :aria-selected="activeLang === l.id"
          @click="activeLang = l.id"
        >{{ l.label }}</button>
      </div>

      <div class="api-panel-sample-wrap">
        <button class="api-panel-copy" @click="copySample" :aria-label="copied ? 'Copied' : 'Copy to clipboard'">
          <span v-if="!copied">Copy</span>
          <span v-else>Copied</span>
        </button>
        <HighlightedCode
          :code="currentSample"
          :lang="sampleLangToShikiLang[activeLang]"
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
  background: #6b7280;
  border-radius: 3px;
  line-height: 1;
}

.api-panel-verb[data-verb="GET"]    { background: #16a34a; }
.api-panel-verb[data-verb="POST"]   { background: #2563eb; }
.api-panel-verb[data-verb="PUT"]    { background: #d97706; }
.api-panel-verb[data-verb="PATCH"]  { background: #db2777; }
.api-panel-verb[data-verb="DELETE"] { background: #dc2626; }

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
  gap: 2px;
  padding: 3px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.api-panel-lang-tab {
  flex: 1;
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
  opacity: 0;
  transition: opacity 140ms ease, color 140ms ease, border-color 140ms ease;
}

.api-panel-sample-wrap:hover .api-panel-copy { opacity: 1; }

.api-panel-copy:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>

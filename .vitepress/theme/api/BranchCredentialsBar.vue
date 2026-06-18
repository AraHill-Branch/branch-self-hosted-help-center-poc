<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBranchCredentials } from './useBranchCredentials'
import ApiIcon from './ApiIcon.vue'

const credentials = useBranchCredentials()
const expanded = ref(false)
const branchKeyInput = ref(credentials.value.branchKey ?? '')
const branchSecretInput = ref(credentials.value.branchSecret ?? '')
const accessTokenInput = ref(credentials.value.accessToken ?? '')
const appIdInput = ref(credentials.value.appId ?? '')

const hasAny = computed(
  () =>
    Boolean(
      credentials.value.branchKey
        || credentials.value.branchSecret
        || credentials.value.accessToken
        || credentials.value.appId,
    ),
)

function save() {
  credentials.value = {
    branchKey: branchKeyInput.value.trim() || undefined,
    branchSecret: branchSecretInput.value.trim() || undefined,
    accessToken: accessTokenInput.value.trim() || undefined,
    appId: appIdInput.value.trim() || undefined,
  }
  expanded.value = false
}

function clear() {
  credentials.value = {}
  branchKeyInput.value = ''
  branchSecretInput.value = ''
  accessTokenInput.value = ''
  appIdInput.value = ''
}

function maskValue(v: string | undefined): string {
  if (!v) return 'not set'
  if (v.length <= 8) return v[0] + '••••'
  return `${v.slice(0, 8)}••••${v.slice(-2)}`
}
</script>

<template>
  <div class="branch-creds" :class="{ active: hasAny }">
    <button
      class="branch-creds-trigger"
      :class="{ active: hasAny }"
      @click="expanded = !expanded"
      type="button"
      :aria-expanded="expanded"
    >
      <span class="branch-creds-icon"><ApiIcon name="key" :size="18" /></span>
      <span class="branch-creds-summary">
        <span class="branch-creds-summary-label">Your credentials</span>
        <span class="branch-creds-summary-state">
          <span>Branch Key: <code>{{ maskValue(credentials.branchKey) }}</code></span>
          <span>Branch Secret: <code>{{ maskValue(credentials.branchSecret) }}</code></span>
          <span>Access Token: <code>{{ maskValue(credentials.accessToken) }}</code></span>
          <span>App ID: <code>{{ maskValue(credentials.appId) }}</code></span>
        </span>
      </span>
      <span class="branch-creds-chevron" :class="{ open: expanded }"><ApiIcon name="chevron" :size="16" /></span>
    </button>

    <div v-if="expanded" class="branch-creds-panel">
      <p class="branch-creds-note">
        Paste your credentials below and every code sample and Try-it on this
        page will use them. Values stay in your browser and are never sent
        anywhere except the real API request you trigger from Try-it. Your
        Branch Key and App ID persist locally; your <strong>Branch Secret and
        Access Token are kept only for this session</strong> and cleared when
        you close the tab.
      </p>

      <label class="branch-creds-field">
        <span class="branch-creds-field-label">Branch Key</span>
        <input
          v-model="branchKeyInput"
          type="text"
          placeholder="key_live_xxxxxxxxxxxxxxxxxxxx"
          spellcheck="false"
          autocomplete="off"
          class="branch-creds-input"
        />
        <span class="branch-creds-field-hint">
          Found in <strong>Configuration → Security &amp; Access → Credentials</strong>.
        </span>
      </label>

      <label class="branch-creds-field">
        <span class="branch-creds-field-label">Branch Secret</span>
        <input
          v-model="branchSecretInput"
          type="text"
          placeholder="secret_live_xxxxxxxxxxxxxxxxxxxx"
          spellcheck="false"
          autocomplete="off"
          class="branch-creds-input"
        />
        <span class="branch-creds-field-hint">
          Required by a handful of legacy v1 endpoints (Attribution, App, Daily Exports). Same dashboard location as the Branch Key.
        </span>
      </label>

      <label class="branch-creds-field">
        <span class="branch-creds-field-label">Access Token</span>
        <input
          v-model="accessTokenInput"
          type="text"
          placeholder="api_app_xxxxxxxxxxxxxxxxxxxx"
          spellcheck="false"
          autocomplete="off"
          class="branch-creds-input"
        />
        <span class="branch-creds-field-hint">
          Required for export and data APIs. Sent as the <code>Access-Token</code> header.
        </span>
      </label>

      <label class="branch-creds-field">
        <span class="branch-creds-field-label">App ID</span>
        <input
          v-model="appIdInput"
          type="text"
          placeholder="123456789012345678"
          spellcheck="false"
          autocomplete="off"
          class="branch-creds-input"
        />
        <span class="branch-creds-field-hint">
          Numeric Branch App ID. Auto-fills the <code>app_id</code> query parameter on data APIs.
        </span>
      </label>

      <div class="branch-creds-actions">
        <button type="button" class="branch-creds-clear" @click="clear">Clear</button>
        <button type="button" class="branch-creds-save" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.branch-creds {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  margin: 0 0 24px;
  overflow: hidden;
}

.branch-creds.active {
  border-color: rgba(37, 99, 235, 0.3);
}

.branch-creds-trigger {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 140ms ease;
}

.branch-creds-trigger:hover {
  background: var(--vp-c-bg-soft);
}

.branch-creds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
}

.branch-creds-summary {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.branch-creds-summary-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.branch-creds-summary-state {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  flex-wrap: wrap;
}

.branch-creds-summary-state code {
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  background: var(--vp-c-bg-soft);
  padding: 1px 6px;
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.branch-creds-chevron {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-3);
  transition: transform 160ms ease;
  flex-shrink: 0;
}

.branch-creds-chevron.open { transform: rotate(180deg); }

.branch-creds-panel {
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.branch-creds-note {
  margin: 14px 0 0;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  max-width: 76ch;
}

.branch-creds-note code {
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  background: var(--vp-c-bg-soft);
  padding: 0 4px;
  border-radius: 2px;
}

.branch-creds-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.branch-creds-field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.branch-creds-input {
  width: 100%;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.dark .branch-creds-input { background: var(--vp-c-bg-soft); }

.branch-creds-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-focus-ring);
}

.branch-creds-field-hint {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

.branch-creds-field-hint code {
  font-family: var(--vp-font-family-mono);
  background: var(--vp-c-bg-soft);
  padding: 0 4px;
  border-radius: 2px;
}

.branch-creds-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.branch-creds-clear,
.branch-creds-save {
  padding: 6px 14px;
  font-family: var(--vp-font-family-base);
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
}

.branch-creds-clear {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.branch-creds-clear:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-3);
}

.branch-creds-save {
  background: var(--vp-c-brand-1);
  color: #fff;
  border: 1px solid var(--vp-c-brand-1);
}

.branch-creds-save:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}
</style>

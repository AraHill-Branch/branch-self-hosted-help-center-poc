import { ref, watch } from 'vue'

/**
 * Site-wide Branch credentials store. The user pastes their Branch Key
 * and Access Token once at the top of the API docs, and every code
 * sample and Try-it on the site picks them up automatically.
 *
 * Storage: localStorage under `branch-apidocs-credentials`. The values
 * never leave the user's browser — they're substituted into rendered
 * samples client-side.
 *
 * Placeholders we replace:
 *   key_live_xxxx               -> branchKey
 *   key_test_xxxx               -> branchKey
 *   <YOUR_BRANCH_KEY>           -> branchKey
 *   YOUR_ACCESS_TOKEN           -> accessToken
 *   <YOUR_ACCESS_TOKEN>         -> accessToken
 *   api_app_xxxx                -> accessToken
 *
 * Substitution is best-effort string replace at sample-generation time,
 * so the sample shown == the request sent (no hidden state).
 */

const STORAGE_KEY = 'branch-apidocs-credentials'

export interface BranchCredentials {
  branchKey?: string
  branchSecret?: string
  accessToken?: string
  appId?: string
}

function readInitial(): BranchCredentials {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return {
      branchKey: typeof parsed?.branchKey === 'string' ? parsed.branchKey : undefined,
      branchSecret: typeof parsed?.branchSecret === 'string' ? parsed.branchSecret : undefined,
      accessToken: typeof parsed?.accessToken === 'string' ? parsed.accessToken : undefined,
      appId: typeof parsed?.appId === 'string' ? parsed.appId : undefined,
    }
  } catch {
    return {}
  }
}

// Shared singleton across all <BranchCredentialsBar> and <ApiCodePanel>
// instances on the page.
const credentials = ref<BranchCredentials>(readInitial())

if (typeof window !== 'undefined') {
  watch(credentials, (v) => {
    try {
      const anySet = v.branchKey || v.branchSecret || v.accessToken || v.appId
      if (!anySet) {
        window.localStorage.removeItem(STORAGE_KEY)
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
      }
    } catch { /* quota / private mode */ }
  }, { deep: true })

  // Sync across tabs.
  window.addEventListener('storage', (e) => {
    if (e.key !== STORAGE_KEY) return
    credentials.value = readInitial()
  })
}

export function useBranchCredentials() {
  return credentials
}

/**
 * Apply the stored credentials to a string by replacing every known
 * placeholder with the matching value. If a credential isn't set, that
 * placeholder is left untouched (so the user still sees what they need
 * to fill in).
 *
 * Used by code-sample generation AND by Try-it body/header substitution
 * so the displayed sample exactly matches the outgoing request.
 */
export function applyCredentials(input: string, creds: BranchCredentials): string {
  let out = input
  if (creds.branchKey) {
    out = out
      .replace(/key_live_xxxx/g, creds.branchKey)
      .replace(/key_test_xxxx/g, creds.branchKey)
      .replace(/<YOUR_BRANCH_KEY>/g, creds.branchKey)
  }
  if (creds.branchSecret) {
    out = out
      .replace(/secret_live_xxxx/g, creds.branchSecret)
      .replace(/<YOUR_BRANCH_SECRET>/g, creds.branchSecret)
  }
  if (creds.accessToken) {
    out = out
      .replace(/api_app_xxxx/g, creds.accessToken)
      .replace(/<YOUR_ACCESS_TOKEN>/g, creds.accessToken)
      .replace(/YOUR_ACCESS_TOKEN/g, creds.accessToken)
  }
  if (creds.appId) {
    out = out
      .replace(/<YOUR_APP_ID>/g, creds.appId)
      .replace(/YOUR_APP_ID/g, creds.appId)
  }
  return out
}

/**
 * Recursively walk a JSON-like value and apply credential substitution
 * to every string. Used for the Try-it body before it's sent so the
 * user's pasted branch_key actually goes out on the wire.
 */
export function applyCredentialsToValue<T>(value: T, creds: BranchCredentials): T {
  if (typeof value === 'string') {
    return applyCredentials(value, creds) as unknown as T
  }
  if (Array.isArray(value)) {
    return value.map((v) => applyCredentialsToValue(v, creds)) as unknown as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = applyCredentialsToValue(v, creds)
    }
    return out as unknown as T
  }
  return value
}

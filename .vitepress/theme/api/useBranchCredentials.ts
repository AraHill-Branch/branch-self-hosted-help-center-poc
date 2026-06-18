import { ref, watch } from 'vue'

/**
 * Site-wide Branch credentials store. The user pastes their Branch Key
 * and Access Token once at the top of the API docs, and every code
 * sample and Try-it on the site picks them up automatically.
 *
 * Storage posture (deliberate): the values never leave the user's browser
 * (they're substituted into rendered samples client-side), but secrets and
 * identifiers are stored differently:
 *   - Identifiers (branchKey, appId): localStorage — persist across sessions
 *     for convenience; low sensitivity.
 *   - Secrets (branchSecret, accessToken): sessionStorage — cleared when the
 *     tab closes, so live secrets are NOT persisted indefinitely on a public
 *     docs origin.
 *
 * Placeholders we replace:
 *   key_live_xxxx / key_test_xxxx / <YOUR_BRANCH_KEY>  -> branchKey
 *   secret_live_xxxx / <YOUR_BRANCH_SECRET>            -> branchSecret
 *   api_app_xxxx / YOUR_ACCESS_TOKEN / <YOUR_...>      -> accessToken
 *   <YOUR_APP_ID>                                      -> appId
 *
 * Substitution is best-effort string replace at sample-generation time,
 * so the sample shown == the request sent (no hidden state).
 */

const ID_KEY = 'branch-apidocs-id'        // localStorage: identifiers
const SECRET_KEY = 'branch-apidocs-secret' // sessionStorage: secrets

export interface BranchCredentials {
  branchKey?: string
  branchSecret?: string
  accessToken?: string
  appId?: string
}

function readStore(store: Storage | undefined, key: string): Record<string, unknown> {
  if (!store) return {}
  try {
    const raw = store.getItem(key)
    return raw ? (JSON.parse(raw) ?? {}) : {}
  } catch {
    return {}
  }
}

function readInitial(): BranchCredentials {
  if (typeof window === 'undefined') return {}
  const ids = readStore(window.localStorage, ID_KEY)
  const secrets = readStore(window.sessionStorage, SECRET_KEY)
  const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
  return {
    branchKey: str(ids.branchKey),
    appId: str(ids.appId),
    branchSecret: str(secrets.branchSecret),
    accessToken: str(secrets.accessToken),
  }
}

// Shared singleton across all <BranchCredentialsBar> and <ApiCodePanel>
// instances on the page.
const credentials = ref<BranchCredentials>(readInitial())

function persist(store: Storage, key: string, obj: Record<string, string | undefined>) {
  const kept = Object.fromEntries(Object.entries(obj).filter(([, v]) => v))
  try {
    if (Object.keys(kept).length) store.setItem(key, JSON.stringify(kept))
    else store.removeItem(key)
  } catch { /* quota / private mode */ }
}

if (typeof window !== 'undefined') {
  watch(credentials, (v) => {
    persist(window.localStorage, ID_KEY, { branchKey: v.branchKey, appId: v.appId })
    persist(window.sessionStorage, SECRET_KEY, { branchSecret: v.branchSecret, accessToken: v.accessToken })
  }, { deep: true })

  // Sync identifiers across tabs (sessionStorage isn't shared across tabs).
  window.addEventListener('storage', (e) => {
    if (e.key !== ID_KEY) return
    const ids = readStore(window.localStorage, ID_KEY)
    credentials.value = {
      ...credentials.value,
      branchKey: typeof ids.branchKey === 'string' ? ids.branchKey : undefined,
      appId: typeof ids.appId === 'string' ? ids.appId : undefined,
    }
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

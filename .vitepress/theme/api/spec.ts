// Auto-load every openapi.yaml under apidocs/*/. Vite resolves this glob at
// build time via @rollup/plugin-yaml, so each spec arrives as a parsed object.
// Drop a new folder in under apidocs/ with an openapi.yaml and it shows up
// here with no code changes.
const rawSpecs = import.meta.glob('../../../apidocs/*/openapi.yaml', {
  eager: true,
  import: 'default',
}) as Record<string, OpenApiSpec>

// The set of HTTP method keys allowed at the path-item level. OpenAPI also
// permits other keys here (`summary`, `description`, `parameters`, `servers`),
// so we must explicitly filter when iterating verbs — otherwise we'd treat
// "parameters" as if it were an operation.
const HTTP_VERBS = new Set(['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace'])

export type OpenApiSpec = {
  openapi: string
  info: { title: string; description?: string; version?: string }
  servers?: { url: string; description?: string }[]
  paths: Record<string, OpenApiPathItem>
  components?: {
    schemas?: Record<string, OpenApiSchema>
    securitySchemes?: Record<string, OpenApiSecurityScheme>
    [k: string]: any
  }
  security?: OpenApiSecurityRequirement[]
  tags?: { name: string; description?: string }[]
}

export type OpenApiPathItem = {
  summary?: string
  description?: string
  parameters?: OpenApiParameter[]
  servers?: { url: string }[]
  // Plus one entry per HTTP verb — keyed dynamically. The lookups are filtered
  // via HTTP_VERBS so we never iterate path-level keys as operations.
  [verb: string]: any
}

export type OpenApiOperation = {
  operationId: string
  summary?: string
  description?: string
  tags?: string[]
  parameters?: OpenApiParameter[]
  requestBody?: {
    description?: string
    required?: boolean
    content: Record<string, { schema: OpenApiSchema; examples?: any }>
  }
  responses: Record<string, {
    description?: string
    content?: Record<string, { schema?: OpenApiSchema; examples?: any }>
  }>
  security?: OpenApiSecurityRequirement[]
  deprecated?: boolean
  // Enrichment populated by enrichOperations() — visible to consumers but
  // never present on the raw spec.
  _path?: string
  _verb?: string
  _serverUrl?: string
  _apiKey?: string
  _pathParameters?: OpenApiParameter[]
}

export type OpenApiParameter = {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  description?: string
  required?: boolean
  schema?: OpenApiSchema
  example?: any
  deprecated?: boolean
}

export type OpenApiSchema = {
  type?: string
  description?: string
  properties?: Record<string, OpenApiSchema>
  items?: OpenApiSchema
  required?: string[]
  enum?: any[]
  example?: any
  default?: any
  minimum?: number
  maximum?: number
  minLength?: number
  maxLength?: number
  minItems?: number
  maxItems?: number
  pattern?: string
  format?: string
  nullable?: boolean
  deprecated?: boolean
  readOnly?: boolean
  writeOnly?: boolean
  additionalProperties?: boolean | OpenApiSchema
  oneOf?: OpenApiSchema[]
  anyOf?: OpenApiSchema[]
  allOf?: OpenApiSchema[]
  discriminator?: { propertyName: string; mapping?: Record<string, string> }
  $ref?: string
}

export type OpenApiSecurityScheme = {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect' | string
  name?: string
  in?: 'header' | 'query' | 'cookie'
  scheme?: string
  description?: string
}

export type OpenApiSecurityRequirement = Record<string, string[]>

/**
 * Resolve internal `#/`-prefixed JSON references recursively. Uses a WeakMap
 * cache to (a) avoid re-resolving the same node and (b) short-circuit cycles.
 *
 * If a `$ref` doesn't resolve, we log a warning during dev so the broken ref
 * is visible instead of silently producing a hole in the rendered schema.
 */
function deref(node: any, root: any, seen = new WeakMap()): any {
  if (!node || typeof node !== 'object') return node
  if (seen.has(node)) return seen.get(node)
  if (Array.isArray(node)) {
    const out: any[] = []
    seen.set(node, out)
    for (const item of node) out.push(deref(item, root, seen))
    return out
  }
  if (typeof node.$ref === 'string' && node.$ref.startsWith('#/')) {
    const ref = node.$ref
    const segments = ref.slice(2).split('/')
    let target: any = root
    for (const seg of segments) {
      const key = seg.replace(/~1/g, '/').replace(/~0/g, '~')
      target = target?.[key]
    }
    if (target === undefined) {
      if (typeof console !== 'undefined' && import.meta.env?.DEV) {
        console.warn(`[apidocs] unresolved $ref: ${ref}`)
      }
      // Return a visible placeholder rather than undefined so the schema
      // table can surface the bad ref instead of dropping the property.
      return { __unresolved_ref__: ref, type: 'string', description: `Unresolved $ref: ${ref}` }
    }
    return deref(target, root, seen)
  }
  const out: Record<string, any> = {}
  seen.set(node, out)
  for (const [k, v] of Object.entries(node)) out[k] = deref(v, root, seen)
  return out
}

/**
 * Walk every path-item, then every HTTP-verb operation under it. Stamp
 * `_path` / `_verb` / `_serverUrl` / `_apiKey` / `_pathParameters` onto each
 * operation so consumers don't have to re-derive them.
 *
 * Path-level keys that ARE NOT HTTP verbs (`summary`, `description`,
 * `parameters`, `servers`) are skipped — iterating them as if they were
 * operations would corrupt them with verb metadata. Path-level `parameters`
 * are still surfaced to operations via `_pathParameters` so we can render
 * inherited path/query params.
 */
function enrichOperations(spec: OpenApiSpec, apiKey: string): OpenApiSpec {
  const serverUrl = spec.servers?.[0]?.url
  for (const [path, pathItem] of Object.entries(spec.paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue
    const pathLevelParams = Array.isArray((pathItem as OpenApiPathItem).parameters)
      ? (pathItem as OpenApiPathItem).parameters
      : undefined

    for (const [verb, op] of Object.entries(pathItem)) {
      if (!HTTP_VERBS.has(verb.toLowerCase())) continue
      if (!op || typeof op !== 'object') continue
      const o = op as OpenApiOperation
      o._path = path
      o._verb = verb.toUpperCase()
      o._serverUrl = serverUrl
      o._apiKey = apiKey
      if (pathLevelParams) o._pathParameters = pathLevelParams
    }
  }
  return spec
}

// Folder name (e.g. "qr-code") becomes the spec key.
const specs: Record<string, OpenApiSpec> = Object.fromEntries(
  Object.entries(rawSpecs).map(([path, raw]) => {
    const folderMatch = path.match(/\/apidocs\/([^/]+)\/openapi\.yaml$/)
    const key = folderMatch?.[1] ?? path
    return [key, enrichOperations(deref(raw, raw), key)]
  })
)

/**
 * Resolve an operation by its operationId. Scopes the lookup to a specific
 * API folder when `apiKey` is provided so two specs that share an
 * operationId (rare but possible) can be disambiguated by the URL the user
 * is on. Without the apiKey, returns the first global match — useful only
 * for fallback / legacy callers.
 */
export function getOperation(
  operationId: string,
  apiKey?: string,
): { spec: OpenApiSpec; operation: OpenApiOperation; apiKey: string } | null {
  if (apiKey && specs[apiKey]) {
    const spec = specs[apiKey]
    for (const pathItem of Object.values(spec.paths)) {
      if (!pathItem || typeof pathItem !== 'object') continue
      for (const [verb, op] of Object.entries(pathItem)) {
        if (!HTTP_VERBS.has(verb.toLowerCase())) continue
        if (op && (op as OpenApiOperation).operationId === operationId) {
          return { spec, operation: op as OpenApiOperation, apiKey }
        }
      }
    }
    return null
  }
  // Fallback: scan every spec. Returns first match.
  for (const [key, spec] of Object.entries(specs)) {
    for (const pathItem of Object.values(spec.paths)) {
      if (!pathItem || typeof pathItem !== 'object') continue
      for (const [verb, op] of Object.entries(pathItem)) {
        if (!HTTP_VERBS.has(verb.toLowerCase())) continue
        if (op && (op as OpenApiOperation).operationId === operationId) {
          return { spec, operation: op as OpenApiOperation, apiKey: key }
        }
      }
    }
  }
  return null
}

export { specs, HTTP_VERBS }

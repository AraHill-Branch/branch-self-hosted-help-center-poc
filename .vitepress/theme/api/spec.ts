// Auto-load every openapi.yaml under apidocs/*/. Vite resolves this glob at
// build time via @rollup/plugin-yaml, so each spec arrives as a parsed object.
// Drop a new folder in under apidocs/ with an openapi.yaml and it shows up
// here with no code changes.
const rawSpecs = import.meta.glob('../../../apidocs/*/openapi.yaml', {
  eager: true,
  import: 'default',
}) as Record<string, OpenApiSpec>

export type OpenApiSpec = {
  openapi: string
  info: { title: string; description?: string; version?: string }
  servers?: { url: string; description?: string }[]
  paths: Record<string, Record<string, OpenApiOperation>>
  components?: any
  tags?: { name: string; description?: string }[]
}

export type OpenApiOperation = {
  operationId: string
  summary?: string
  description?: string
  tags?: string[]
  requestBody?: {
    content: Record<string, { schema: OpenApiSchema; examples?: any }>
  }
  responses: Record<string, {
    description?: string
    content?: Record<string, { schema?: OpenApiSchema; examples?: any }>
  }>
  parameters?: any[]
  _path?: string
  _verb?: string
  _serverUrl?: string
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
  format?: string
  $ref?: string
}

// Recursively resolve internal `#/` JSON references.
// Uses a WeakMap cache to avoid re-resolving the same node and to short-circuit cycles.
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
    const segments = node.$ref.slice(2).split('/')
    let target: any = root
    for (const seg of segments) target = target?.[seg.replace(/~1/g, '/').replace(/~0/g, '~')]
    return deref(target, root, seen)
  }
  const out: Record<string, any> = {}
  seen.set(node, out)
  for (const [k, v] of Object.entries(node)) out[k] = deref(v, root, seen)
  return out
}

function enrichOperations(spec: OpenApiSpec): OpenApiSpec {
  const serverUrl = spec.servers?.[0]?.url
  for (const [path, verbs] of Object.entries(spec.paths)) {
    for (const [verb, op] of Object.entries(verbs)) {
      op._path = path
      op._verb = verb.toUpperCase()
      op._serverUrl = serverUrl
    }
  }
  return spec
}

// Folder name (e.g. "qr-code") becomes the spec key.
const specs: Record<string, OpenApiSpec> = Object.fromEntries(
  Object.entries(rawSpecs).map(([path, raw]) => {
    const folderMatch = path.match(/\/apidocs\/([^/]+)\/openapi\.yaml$/)
    const key = folderMatch?.[1] ?? path
    return [key, enrichOperations(deref(raw, raw))]
  })
)

export function getOperation(operationId: string): { spec: OpenApiSpec; operation: OpenApiOperation } | null {
  for (const spec of Object.values(specs)) {
    for (const verbs of Object.values(spec.paths)) {
      for (const op of Object.values(verbs)) {
        if (op.operationId === operationId) return { spec, operation: op }
      }
    }
  }
  return null
}

export { specs }

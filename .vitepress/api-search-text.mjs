// Build a plain-text string of every searchable term for an OpenAPI
// operation: operationId, summary, description, path/query/header
// parameter names + their descriptions/examples, request-body schema
// property names + paths (including nested like
// qr_code_settings.center_logo_url), property descriptions, and
// response descriptions.
//
// Used by scripts/generate-api-pages.mjs to emit a hidden `.api-search-only`
// div per operation page so MiniSearch indexes every field name, not
// just the page title.

function collectSchemaText(schema, prefix = '') {
  if (!schema || typeof schema !== 'object') return []
  const out = []
  if (schema.$ref) return out
  if (schema.description) out.push(schema.description)
  if (schema.properties) {
    for (const [name, sub] of Object.entries(schema.properties)) {
      out.push(name)
      if (prefix) out.push(`${prefix}.${name}`)
      out.push(...collectSchemaText(sub, prefix ? `${prefix}.${name}` : name))
    }
  }
  if (schema.items) out.push(...collectSchemaText(schema.items, prefix))
  return out
}

function resolveSchema(schema, spec) {
  if (schema?.$ref) {
    const refName = String(schema.$ref).split('/').pop()
    return refName ? spec.components?.schemas?.[refName] : null
  }
  return schema
}

/**
 * Walk an array of OpenAPI parameter objects and emit every searchable
 * token: the parameter name (e.g. "subscription_id"), its `in` location
 * ("path", "query"), any description text, example value, and the schema
 * tokens (so `enum` values like "csv"/"json" land in the index too).
 */
function collectParameterText(parameters, spec) {
  if (!Array.isArray(parameters)) return []
  const out = []
  for (const p of parameters) {
    if (!p || typeof p !== 'object') continue
    if (p.name) out.push(p.name)
    if (p.in) out.push(p.in)
    if (p.description) out.push(p.description)
    if (p.example != null) out.push(String(p.example))
    const schema = resolveSchema(p.schema, spec)
    if (schema) {
      if (schema.example != null) out.push(String(schema.example))
      if (Array.isArray(schema.enum)) out.push(...schema.enum.map((v) => String(v)))
      out.push(...collectSchemaText(schema, p.name))
    }
  }
  return out
}

export function buildApiSearchText(spec, operation, pathLevelParameters) {
  if (!spec || !operation) return ''
  const terms = []
  terms.push(spec.info?.title ?? '', operation.operationId ?? '')
  if (operation.summary) terms.push(operation.summary)
  if (operation.description) terms.push(operation.description)
  if (Array.isArray(operation.tags)) terms.push(...operation.tags)

  // Path/query/header parameters (operation-level + inherited path-level).
  terms.push(...collectParameterText(operation.parameters, spec))
  terms.push(...collectParameterText(pathLevelParameters, spec))

  for (const { schema } of Object.values(operation.requestBody?.content ?? {})) {
    terms.push(...collectSchemaText(resolveSchema(schema, spec)))
  }
  for (const response of Object.values(operation.responses ?? {})) {
    if (response?.description) terms.push(response.description)
    for (const { schema } of Object.values(response?.content ?? {})) {
      terms.push(...collectSchemaText(resolveSchema(schema, spec)))
    }
  }

  return terms.filter(Boolean).join(' ')
}

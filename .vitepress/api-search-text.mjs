// Build a plain-text string of every searchable term for an OpenAPI
// operation: operationId, summary, description, parameter names + paths
// (including nested like qr_code_settings.center_logo_url), parameter
// descriptions, and response descriptions.
//
// Used by each API's [operationId].paths.js to inject content into
// dynamic-route pages so VitePress's local search indexer sees them.

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

export function buildApiSearchText(spec, operation) {
  if (!spec || !operation) return ''
  const terms = []
  terms.push(spec.info?.title ?? '', operation.operationId ?? '')
  if (operation.summary) terms.push(operation.summary)
  if (operation.description) terms.push(operation.description)

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

// Build an example request body from a JSON schema. Uses schema examples when present,
// otherwise synthesises a minimal valid-looking payload.
export function buildExample(schema: any, seen = new Set<any>()): any {
  if (!schema || typeof schema !== 'object') return null
  if (seen.has(schema)) return null
  seen.add(schema)
  if (schema.example !== undefined) return schema.example
  if (schema.type === 'object' && schema.properties) {
    const out: Record<string, any> = {}
    const required = new Set<string>(schema.required ?? [])
    for (const [k, v] of Object.entries<any>(schema.properties)) {
      // For unrequired nested objects with only scalar children, fill sparsely.
      if (!required.has(k) && v.type === 'object') continue
      out[k] = buildExample(v, seen)
    }
    return out
  }
  if (schema.type === 'array') return schema.items ? [buildExample(schema.items, seen)] : []
  if (schema.enum) return schema.enum[0]
  switch (schema.type) {
    case 'string': return schema.format === 'date-time' ? new Date().toISOString() : ''
    case 'integer':
    case 'number': return 0
    case 'boolean': return false
    default: return null
  }
}

function j(v: any): string {
  return JSON.stringify(v, null, 2)
}

function indent(s: string, n = 2): string {
  const pad = ' '.repeat(n)
  return s.split('\n').map((l, i) => (i === 0 ? l : pad + l)).join('\n')
}

export type SampleLang = 'curl' | 'javascript' | 'python' | 'php'

export function generateSample(lang: SampleLang, opts: {
  verb: string
  url: string
  body?: any
  acceptHeader?: string
}): string {
  const { verb, url, body, acceptHeader } = opts
  const hasBody = body !== undefined && body !== null && verb !== 'GET'

  switch (lang) {
    case 'curl':
      return [
        `curl --request ${verb} \\`,
        `  --url ${url} \\`,
        acceptHeader ? `  --header 'accept: ${acceptHeader}' \\` : null,
        hasBody ? `  --header 'content-type: application/json' \\` : null,
        hasBody ? `  --data '${j(body)}'` : null,
        acceptHeader?.startsWith('image/') ? `  --output response.png` : null,
      ].filter(Boolean).join('\n')

    case 'javascript':
      return [
        `const response = await fetch('${url}', {`,
        `  method: '${verb}',`,
        hasBody ? `  headers: { 'Content-Type': 'application/json' },` : null,
        hasBody ? `  body: JSON.stringify(${indent(j(body), 2)}),` : null,
        `})`,
        acceptHeader?.startsWith('image/')
          ? `const blob = await response.blob() // image data`
          : `const data = await response.json()`,
      ].filter(Boolean).join('\n')

    case 'python':
      return [
        `import requests`,
        ``,
        hasBody ? `payload = ${indent(j(body).replace(/"/g, '"'), 0)}` : null,
        ``,
        `response = requests.${verb.toLowerCase()}(`,
        `    '${url}',`,
        hasBody ? `    json=payload,` : null,
        `)`,
        acceptHeader?.startsWith('image/')
          ? `\nwith open('response.png', 'wb') as f:\n    f.write(response.content)`
          : `\ndata = response.json()`,
      ].filter(x => x !== null).join('\n')

    case 'php':
      return [
        `<?php`,
        `$ch = curl_init('${url}');`,
        `curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${verb}');`,
        `curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);`,
        hasBody ? `curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);` : null,
        hasBody ? `curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${phpArray(body)}));` : null,
        `$response = curl_exec($ch);`,
        `curl_close($ch);`,
      ].filter(Boolean).join('\n')
  }
}

function phpArray(obj: any): string {
  if (obj === null) return 'null'
  if (typeof obj === 'string') return `'${obj.replace(/'/g, "\\'")}'`
  if (typeof obj === 'boolean') return obj ? 'true' : 'false'
  if (typeof obj === 'number') return String(obj)
  if (Array.isArray(obj)) return `[${obj.map(phpArray).join(', ')}]`
  if (typeof obj === 'object') {
    const entries = Object.entries(obj).map(([k, v]) => `'${k}' => ${phpArray(v)}`)
    return `[${entries.join(', ')}]`
  }
  return 'null'
}

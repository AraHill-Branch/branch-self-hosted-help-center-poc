import type { OpenApiSchema } from './spec'

/**
 * Build an example value from a JSON schema. Uses schema.example when present
 * (skipping `null` placeholders, which produce a wall of nulls in Try-it
 * bodies), otherwise synthesises a minimal valid-looking payload.
 *
 * Behaviour:
 *   - `example: null`           -> ignored (treated as "no example provided")
 *   - missing example, scalar   -> a default value based on `type`
 *   - object with properties    -> recurse; if `requiredOnly` is true, only
 *                                  include required keys
 *   - oneOf/anyOf               -> use the first branch
 *   - allOf                     -> merged property set (handled by deref + parents)
 *
 * The same function is used by ApiCodePanel (Try-it body) and ApiResponses
 * (response-shape preview), so the two stay in sync.
 */
export function buildExample(
  schema: OpenApiSchema | undefined | null,
  opts: { requiredOnly?: boolean } = {},
  seen = new Set<OpenApiSchema>(),
): any {
  if (!schema || typeof schema !== 'object') return null
  if (seen.has(schema)) return null
  seen.add(schema)

  if (schema.example !== undefined && schema.example !== null) return schema.example

  // Composition: prefer first branch of oneOf/anyOf.
  if (schema.oneOf?.length) return buildExample(schema.oneOf[0], opts, seen)
  if (schema.anyOf?.length) return buildExample(schema.anyOf[0], opts, seen)
  // allOf: merge property sets so the example reflects every constraint.
  if (schema.allOf?.length) {
    const merged: Record<string, any> = {}
    for (const branch of schema.allOf) {
      const e = buildExample(branch, opts, seen)
      if (e && typeof e === 'object' && !Array.isArray(e)) Object.assign(merged, e)
    }
    if (Object.keys(merged).length) return merged
  }

  if (schema.type === 'object' && schema.properties) {
    const out: Record<string, any> = {}
    const required = new Set<string>(schema.required ?? [])
    for (const [k, v] of Object.entries(schema.properties)) {
      if (opts.requiredOnly && !required.has(k)) continue
      const val = buildExample(v, opts, seen)
      // For OPTIONAL properties, omit anything that computed to an "empty"
      // value (null, '', {}, []). Otherwise a schema like QR Code's `data`
      // — ~60 optional $-prefixed string fields with no example — fills the
      // Try-it body with a wall of empty keys. Required fields and fields
      // carrying an explicit example are always kept.
      if (!required.has(k) && isEmptyExample(val)) continue
      out[k] = val
    }
    return out
  }
  if (schema.type === 'array') {
    return schema.items ? [buildExample(schema.items, opts, seen)] : []
  }
  if (schema.enum?.length) return schema.enum[0]
  switch (schema.type) {
    case 'string':
      if (schema.format === 'date-time') return new Date().toISOString()
      if (schema.format === 'date') return new Date().toISOString().slice(0, 10)
      if (schema.format === 'uuid') return '00000000-0000-0000-0000-000000000000'
      if (schema.format === 'email') return 'user@example.com'
      return ''
    case 'integer':
    case 'number':
      return schema.minimum ?? 0
    case 'boolean':
      return schema.default ?? false
    default:
      return null
  }
}

// "Empty" for the purpose of trimming optional fields from a synthesized
// example body: null/undefined, empty string, empty object, empty array.
function isEmptyExample(v: any): boolean {
  if (v === null || v === undefined || v === '') return true
  if (Array.isArray(v)) return v.length === 0
  if (typeof v === 'object') return Object.keys(v).length === 0
  return false
}

function j(v: any): string {
  return JSON.stringify(v, null, 2)
}

function indent(s: string, n = 2): string {
  const pad = ' '.repeat(n)
  return s.split('\n').map((l, i) => (i === 0 ? l : pad + l)).join('\n')
}

// Escape a string for a single-quoted POSIX shell argument (close, escaped
// quote, reopen). Keeps cURL samples valid when a value contains an apostrophe.
const shq = (s: string) => s.replace(/'/g, "'\\''")
// Escape a string for a single-quoted source-string literal (JS/Python/Ruby/PHP).
const sq = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

export type SampleLang =
  | 'curl' | 'javascript' | 'python' | 'php'
  | 'ruby' | 'go' | 'java' | 'csharp'

export const SAMPLE_LANGS: { id: SampleLang; label: string; shiki: string }[] = [
  { id: 'curl',       label: 'cURL',       shiki: 'bash' },
  { id: 'javascript', label: 'JavaScript', shiki: 'javascript' },
  { id: 'python',     label: 'Python',     shiki: 'python' },
  { id: 'ruby',       label: 'Ruby',       shiki: 'ruby' },
  { id: 'go',         label: 'Go',         shiki: 'go' },
  { id: 'java',       label: 'Java',       shiki: 'java' },
  { id: 'csharp',     label: '.NET',       shiki: 'csharp' },
  { id: 'php',        label: 'PHP',        shiki: 'php' },
]

export function shikiLangFor(lang: SampleLang): string {
  return SAMPLE_LANGS.find((l) => l.id === lang)?.shiki ?? 'plaintext'
}

export interface GenerateSampleOpts {
  verb: string
  url: string
  body?: any
  acceptHeader?: string
  /** Headers to include verbatim (e.g. Authorization). Keys are case-sensitive. */
  extraHeaders?: Record<string, string>
}

export function generateSample(lang: SampleLang, opts: GenerateSampleOpts): string {
  const { verb, url, body, acceptHeader, extraHeaders } = opts
  const hasBody = body !== undefined && body !== null && verb !== 'GET'
  const expectsBinary = acceptHeader?.startsWith('image/')

  // All headers, in stable order, for code-sample generation.
  const allHeaders: [string, string][] = []
  if (acceptHeader) allHeaders.push(['Accept', acceptHeader])
  if (hasBody) allHeaders.push(['Content-Type', 'application/json'])
  if (extraHeaders) {
    for (const [k, v] of Object.entries(extraHeaders)) allHeaders.push([k, v])
  }

  switch (lang) {
    case 'curl': {
      const lines: (string | null)[] = [`curl --request ${verb} \\`, `  --url ${url} \\`]
      for (const [k, v] of allHeaders) lines.push(`  --header '${shq(`${k}: ${v}`)}' \\`)
      if (hasBody) lines.push(`  --data '${shq(j(body))}' \\`)
      if (expectsBinary) lines.push(`  --output response.png`)
      // Strip trailing backslash from the final non-null entry.
      const out = lines.filter((l): l is string => Boolean(l))
      out[out.length - 1] = out[out.length - 1].replace(/\s\\$/, '')
      return out.join('\n')
    }

    case 'javascript': {
      const headersObj = allHeaders.length
        ? `{ ${allHeaders.map(([k, v]) => `'${sq(k)}': '${sq(v)}'`).join(', ')} }`
        : null
      return [
        `const response = await fetch('${url}', {`,
        `  method: '${verb}',`,
        headersObj ? `  headers: ${headersObj},` : null,
        hasBody ? `  body: JSON.stringify(${indent(j(body), 2)}),` : null,
        `})`,
        expectsBinary
          ? `const blob = await response.blob() // image bytes`
          : `const data = await response.json()`,
      ].filter((l): l is string => l !== null).join('\n')
    }

    case 'python': {
      const headersDict = allHeaders.length
        ? `{ ${allHeaders.map(([k, v]) => `'${sq(k)}': '${sq(v)}'`).join(', ')} }`
        : null
      return [
        `import requests`,
        ``,
        hasBody ? `payload = ${j(body)}` : null,
        ``,
        `response = requests.${verb.toLowerCase()}(`,
        `    '${url}',`,
        headersDict ? `    headers=${headersDict},` : null,
        hasBody ? `    json=payload,` : null,
        `)`,
        expectsBinary
          ? `\nwith open('response.png', 'wb') as f:\n    f.write(response.content)`
          : `\ndata = response.json()`,
      ].filter((l): l is string => l !== null).join('\n')
    }

    case 'ruby': {
      const headerLines = allHeaders.map(([k, v]) => `request['${sq(k)}'] = '${sq(v)}'`).join('\n  ')
      return [
        `require 'net/http'`,
        `require 'json'`,
        ``,
        `uri = URI('${url}')`,
        `request = Net::HTTP::${verb.charAt(0)}${verb.slice(1).toLowerCase()}.new(uri)`,
        headerLines ? `  ${headerLines}` : null,
        hasBody ? `request.body = ${JSON.stringify(j(body))}` : null,
        ``,
        `response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|`,
        `  http.request(request)`,
        `end`,
        ``,
        expectsBinary
          ? `File.write('response.png', response.body)`
          : `data = JSON.parse(response.body)`,
      ].filter((l): l is string => l !== null).join('\n')
    }

    case 'go': {
      const headerSets = allHeaders.map(([k, v]) => `\treq.Header.Set("${k}", "${v}")`).join('\n')
      // Raw string literal is cleanest for JSON, but breaks if the body
      // contains a backtick — fall back to a quoted Go string then.
      const goBodyJson = hasBody ? j(body) : ''
      const goBodyLiteral = goBodyJson.includes('`') ? JSON.stringify(goBodyJson) : `\`${goBodyJson}\``
      return [
        `package main`,
        ``,
        `import (`,
        `\t"bytes"`,
        `\t"io"`,
        `\t"net/http"`,
        `)`,
        ``,
        `func main() {`,
        hasBody ? `\tpayload := bytes.NewBufferString(${goBodyLiteral})` : null,
        hasBody
          ? `\treq, _ := http.NewRequest("${verb}", "${url}", payload)`
          : `\treq, _ := http.NewRequest("${verb}", "${url}", nil)`,
        headerSets || null,
        `\tres, _ := http.DefaultClient.Do(req)`,
        `\tdefer res.Body.Close()`,
        `\tbody, _ := io.ReadAll(res.Body)`,
        `\t_ = body`,
        `}`,
      ].filter((l): l is string => l !== null).join('\n')
    }

    case 'java': {
      const headerCalls = allHeaders.map(([k, v]) => `        .header("${k}", "${v}")`).join('\n')
      return [
        `import java.net.URI;`,
        `import java.net.http.HttpClient;`,
        `import java.net.http.HttpRequest;`,
        `import java.net.http.HttpResponse;`,
        ``,
        `var client = HttpClient.newHttpClient();`,
        `var request = HttpRequest.newBuilder()`,
        `        .uri(URI.create("${url}"))`,
        headerCalls || null,
        // HttpRequest.Builder has GET/POST/PUT/DELETE methods but no PATCH —
        // PATCH must go through .method(). Route it correctly.
        verb === 'PATCH'
          ? `        .method("PATCH", ${hasBody ? `HttpRequest.BodyPublishers.ofString(${JSON.stringify(j(body))})` : 'HttpRequest.BodyPublishers.noBody()'})`
          : hasBody
            ? `        .${verb}(HttpRequest.BodyPublishers.ofString(${JSON.stringify(j(body))}))`
            : `        .${verb}()`,
        `        .build();`,
        ``,
        `var response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
      ].filter((l): l is string => l !== null).join('\n')
    }

    case 'csharp': {
      const headerCalls = allHeaders.map(([k, v]) => `request.Headers.Add("${k}", "${v}");`).join('\n')
      return [
        `using System.Net.Http;`,
        `using System.Text;`,
        ``,
        `var client = new HttpClient();`,
        `var request = new HttpRequestMessage(HttpMethod.${verb.charAt(0)}${verb.slice(1).toLowerCase()}, "${url}");`,
        headerCalls || null,
        hasBody
          ? `request.Content = new StringContent(${JSON.stringify(j(body))}, Encoding.UTF8, "application/json");`
          : null,
        `var response = await client.SendAsync(request);`,
        `var body = await response.Content.ReadAsStringAsync();`,
      ].filter((l): l is string => l !== null).join('\n')
    }

    case 'php': {
      const headerLines = allHeaders.length
        ? `curl_setopt($ch, CURLOPT_HTTPHEADER, [${allHeaders.map(([k, v]) => `'${sq(`${k}: ${v}`)}'`).join(', ')}]);`
        : null
      return [
        `<?php`,
        `$ch = curl_init('${url}');`,
        `curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${verb}');`,
        `curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);`,
        headerLines,
        hasBody ? `curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${phpArray(body)}));` : null,
        `$response = curl_exec($ch);`,
        `curl_close($ch);`,
      ].filter((l): l is string => l !== null).join('\n')
    }
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

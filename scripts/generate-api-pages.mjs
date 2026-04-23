#!/usr/bin/env node
/**
 * Generate one real .md file per OpenAPI operation across every API under apidocs/.
 *
 * Why: VitePress's local search (miniSearch) does NOT index dynamic-route
 * pages. Our old setup used a single [operationId].md template + paths.js
 * pair per API, which made every endpoint page invisible to search. By
 * converting these into real markdown files, each endpoint becomes a
 * first-class indexed page — parameter names like `center_logo_url` now
 * resolve to the right page in search.
 *
 * What it writes (per operation):
 *   apidocs/<api>/operations/<operationId>.md
 *
 * Each file:
 *   - Has the same layout/frontmatter the dynamic-route template had
 *   - Renders <ApiOperation :operationId="..."> just like before
 *   - Appends a hidden <div> with the spec's searchable text so
 *     miniSearch picks up parameter names + descriptions + response fields
 *
 * URL pattern is unchanged (/apidocs/<api>/operations/<operationId>),
 * so the sidebar in sidebar-hubs.ts and any cross-links keep working.
 *
 * Idempotent — re-run any time a spec changes.
 *
 * Usage:
 *   node scripts/generate-api-pages.mjs
 */

import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'js-yaml'
import { buildApiSearchText } from '../.vitepress/api-search-text.mjs'

const ROOT = 'apidocs'

function listApiFolders() {
  return readdirSync(ROOT)
    .filter(name => {
      const p = join(ROOT, name)
      try { return statSync(p).isDirectory() } catch { return false }
    })
    .filter(name => existsSync(join(ROOT, name, 'openapi.yaml')))
}

function loadSpec(apiFolder) {
  const p = join(ROOT, apiFolder, 'openapi.yaml')
  return yaml.load(readFileSync(p, 'utf8'))
}

function pageFor(apiFolder, spec, operation) {
  const apiTitle = spec.info?.title ?? apiFolder
  const summary = operation.summary ?? operation.operationId
  const pageTitle = `${summary} - ${apiTitle}`
  const searchText = buildApiSearchText(spec, operation)

  // Structure:
  // - H1 is required so VitePress's search indexer picks up the page at
  //   all (pages with no headings are skipped). Hidden via .api-operation-page
  //   CSS since <ApiOperation> renders its own title.
  // - <ApiOperation> renders the visible UI.
  // - The .api-search-only block is hidden by CSS. Blank lines around it
  //   tell markdown-it to parse the inner text as a regular paragraph,
  //   so miniSearch indexes it as normal body text. That's how parameter
  //   names like `center_logo_url` end up searchable.
  return `---
aside: false
outline: false
pageClass: api-operation-page
title: ${JSON.stringify(pageTitle)}
---

# ${summary}

<ApiOperation operationId="${operation.operationId}" />

<div class="api-search-only">

${searchText}

</div>
`
}

function main() {
  const folders = listApiFolders()
  let totalWritten = 0
  for (const apiFolder of folders) {
    const spec = loadSpec(apiFolder)
    const opsDir = join(ROOT, apiFolder, 'operations')
    if (!existsSync(opsDir)) continue

    let written = 0
    for (const verbs of Object.values(spec.paths ?? {})) {
      for (const operation of Object.values(verbs ?? {})) {
        if (!operation?.operationId) continue
        const outPath = join(opsDir, `${operation.operationId}.md`)
        writeFileSync(outPath, pageFor(apiFolder, spec, operation), 'utf8')
        written++
      }
    }
    console.log(`  ${apiFolder}: wrote ${written} operation page(s)`)
    totalWritten += written
  }
  console.log(`\nTotal: ${totalWritten} files written across ${folders.length} API folder(s).`)
}

main()

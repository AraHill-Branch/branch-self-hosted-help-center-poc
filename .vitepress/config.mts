import { defineConfig } from 'vitepress'
import yamlPlugin from '@rollup/plugin-yaml'
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'js-yaml'
import {
  accountHubSidebar,
  marketerHubSidebar,
  developerHubSidebar,
} from './sidebar-hubs'

// Build the /apidocs/ sidebar from the filesystem at config-load time.
// Each folder under apidocs/ with an openapi.yaml becomes a collapsible
// section with one entry per operation.
// Set of HTTP-verb keys that OpenAPI allows at the path-item level.
// We must explicitly filter when iterating verbs — otherwise we'd treat
// `parameters`, `summary`, etc. as operations.
const HTTP_VERBS = new Set(['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace'])

// Canonical ordering of API folders in the sidebar. Mirrors the Data vs.
// Functional split shown on /apidocs/. Folders not listed here are
// appended alphabetically at the end so a freshly added spec is still
// discoverable even before this list is updated.
const APIDOCS_ORDER: string[] = [
  // Data
  'daily-exports',
  'custom-exports',
  'scheduled-log-exports',
  'cross-events-export',
  'aggregate',
  'cohort',
  'query',
  // Functional
  'deep-linking',
  'quick-links',
  'qr-code',
  'events',
  'attribution',
  'app',
  'data-subject-request',
]

function buildApidocsSidebar() {
  const root = 'apidocs'
  const sections: any[] = []

  let entries: string[]
  try {
    entries = readdirSync(root)
  } catch {
    return sections
  }

  // Apply the canonical order; append unknown folders alphabetically.
  const known = new Set(APIDOCS_ORDER)
  const ordered = [
    ...APIDOCS_ORDER.filter((e) => entries.includes(e)),
    ...entries.filter((e) => !known.has(e)).sort(),
  ]

  for (const entry of ordered) {
    const dir = join(root, entry)
    try {
      if (!statSync(dir).isDirectory()) continue
    } catch {
      continue
    }

    const yamlPath = join(dir, 'openapi.yaml')
    if (!existsSync(yamlPath)) continue
    let spec: any
    try {
      spec = yaml.load(readFileSync(yamlPath, 'utf8'))
    } catch (e) {
      // Surface malformed YAML during config load instead of silently
      // omitting the section. Without this, a bad spec just disappears.
      console.warn(`[apidocs] skipping ${entry}: ${(e as Error).message}`)
      continue
    }

    const apiTitle = spec?.info?.title ?? entry
    const items: any[] = [{ text: 'Overview', link: `/apidocs/${entry}/` }]

    // Walk path -> verb -> op. Filter to actual HTTP verbs so path-level
    // keys (`summary`, `description`, `parameters`, `servers`) don't get
    // iterated as operations.
    const ops: { verb: string; path: string; op: any }[] = []
    for (const [path, pathItem] of Object.entries<any>(spec?.paths ?? {})) {
      if (!pathItem || typeof pathItem !== 'object') continue
      for (const [verb, op] of Object.entries<any>(pathItem)) {
        if (!HTTP_VERBS.has(verb.toLowerCase())) continue
        if (!op?.operationId) continue
        ops.push({ verb: verb.toUpperCase(), path, op })
      }
    }

    // Order: GET, POST, PUT, PATCH, DELETE, then anything else; within
    // each verb-class, alphabetize by summary so the sidebar is stable
    // across spec re-orderings.
    const verbWeight: Record<string, number> = {
      GET: 0, POST: 1, PUT: 2, PATCH: 3, DELETE: 4, OPTIONS: 5, HEAD: 6, TRACE: 7,
    }
    ops.sort((a, b) => {
      const wa = verbWeight[a.verb] ?? 99
      const wb = verbWeight[b.verb] ?? 99
      if (wa !== wb) return wa - wb
      const sa = (a.op.summary ?? a.op.operationId).toLowerCase()
      const sb = (b.op.summary ?? b.op.operationId).toLowerCase()
      return sa.localeCompare(sb)
    })

    for (const { op } of ops) {
      // Verb pills next to each operation are a Phase 3 visual polish
      // (custom sidebar item component). Until that ships, render plain
      // text rather than a literal "[POST] ..." prefix in the sidebar.
      items.push({
        text: op.summary ?? op.operationId,
        link: `/apidocs/${entry}/operations/${op.operationId}`,
      })
    }

    sections.push({
      text: apiTitle,
      collapsed: true,
      items,
    })
  }

  return sections
}

const sidebar = {
  '/account-hub/': accountHubSidebar,
  '/marketer-hub/': marketerHubSidebar,
  '/developer-hub/': developerHubSidebar,
  '/apidocs/': buildApidocsSidebar(),
}


export default defineConfig({
  title: "Branch Help Center",
  description: "Product Documentation",
  ignoreDeadLinks: true,
  head: [
    ['link', {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href: '/fonts/TT_Hoves_Pro_Regular.woff2',
      crossorigin: ''
    }]
  ],
  markdown: {
    config: (md) => {
      const defaultImageRule = md.renderer.rules.image
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.attrIndex('loading') < 0) token.attrPush(['loading', 'lazy'])
        if (token.attrIndex('decoding') < 0) token.attrPush(['decoding', 'async'])
        return defaultImageRule
          ? defaultImageRule(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }
    }
  },
  vite: {
    plugins: [yamlPlugin()],
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.message?.includes('/img/')) return
          warn(warning)
        }
      }
    }
  },
  appearance: 'dark',
  themeConfig: {
    logo: '/branch-logo-white.png',
    siteTitle: false,
    nav: [
      {
        text: 'Account Hub',
        items: [
          { text: 'Account Hub', link: '/account-hub/' },
          { text: 'Marketer Hub', link: '/marketer-hub/' },
          { text: 'Developer Hub', link: '/developer-hub/' }
        ]
      },
      { text: 'API Documentation', link: '/apidocs/' },
      { text: 'Branch', link: 'https://app.branch.io' }
    ],
    sidebar,
    // Built-in search is disabled; we render a custom search modal via
    // Layout.vue that loads public/search-index.json (built by
    // scripts/build-search-index.ts). Leaves VitePress's navbar without
    // a default search button \u2014 we provide our own via the
    // nav-bar-search-before slot.
    editLink: {
      pattern: 'https://github.com/AraHill-Branch/branch-self-hosted-help-center-poc/edit/main/:path',
      text: 'Suggest an edit'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AraHill-Branch/branch-self-hosted-help-center-poc' }
    ]
  }
})

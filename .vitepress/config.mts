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

// API folders grouped to mirror the Data vs. Functional split shown on
// /apidocs/. Folders not listed in either group are surfaced under "Other
// APIs" so a freshly added spec is still discoverable before this list is
// updated.
const DATA_APIS: string[] = [
  'daily-exports',
  'custom-exports',
  'scheduled-log-exports',
  'cross-events-export',
  'aggregate',
  'cohort',
  'query',
]
const FUNCTIONAL_APIS: string[] = [
  'deep-linking',
  'quick-links',
  'qr-code',
  'events',
  'attribution',
  'app',
  'data-subject-request',
]

// Build one collapsible section (Overview + ordered operations) for a single
// API folder. Returns null if the folder has no readable spec.
function buildApiSection(entry: string): any | null {
  const dir = join('apidocs', entry)
  try {
    if (!statSync(dir).isDirectory()) return null
  } catch {
    return null
  }
  const yamlPath = join(dir, 'openapi.yaml')
  if (!existsSync(yamlPath)) return null
  let spec: any
  try {
    spec = yaml.load(readFileSync(yamlPath, 'utf8'))
  } catch (e) {
    // Surface malformed YAML during config load instead of silently omitting.
    console.warn(`[apidocs] skipping ${entry}: ${(e as Error).message}`)
    return null
  }

  const apiTitle = spec?.info?.title ?? entry
  const items: any[] = [{ text: 'Overview', link: `/apidocs/${entry}/` }]

  // Walk path -> verb -> op, filtering to real HTTP verbs so path-level keys
  // (`summary`, `description`, `parameters`, `servers`) aren't treated as ops.
  const ops: { verb: string; path: string; op: any }[] = []
  for (const [path, pathItem] of Object.entries<any>(spec?.paths ?? {})) {
    if (!pathItem || typeof pathItem !== 'object') continue
    for (const [verb, op] of Object.entries<any>(pathItem)) {
      if (!HTTP_VERBS.has(verb.toLowerCase())) continue
      if (!op?.operationId) continue
      ops.push({ verb: verb.toUpperCase(), path, op })
    }
  }

  // Order GET < POST < PUT < PATCH < DELETE, then alpha by summary within
  // each verb-class so the sidebar is stable across spec re-orderings.
  const verbWeight: Record<string, number> = {
    GET: 0, POST: 1, PUT: 2, PATCH: 3, DELETE: 4, OPTIONS: 5, HEAD: 6, TRACE: 7,
  }
  ops.sort((a, b) => {
    const wa = verbWeight[a.verb] ?? 99
    const wb = verbWeight[b.verb] ?? 99
    if (wa !== wb) return wa - wb
    return (a.op.summary ?? a.op.operationId).toLowerCase()
      .localeCompare((b.op.summary ?? b.op.operationId).toLowerCase())
  })

  for (const { op } of ops) {
    items.push({
      text: op.summary ?? op.operationId,
      link: `/apidocs/${entry}/operations/${op.operationId}`,
    })
  }

  return { text: apiTitle, collapsed: true, items }
}

function buildApidocsSidebar() {
  const root = 'apidocs'
  let entries: string[]
  try {
    entries = readdirSync(root)
  } catch {
    return []
  }

  const sections: any[] = [{ text: 'API reference', link: '/apidocs/' }]

  const dataSections = DATA_APIS.filter((e) => entries.includes(e)).map(buildApiSection).filter(Boolean)
  const funcSections = FUNCTIONAL_APIS.filter((e) => entries.includes(e)).map(buildApiSection).filter(Boolean)

  // Any spec folder not assigned to a group, so new specs stay discoverable.
  const known = new Set([...DATA_APIS, ...FUNCTIONAL_APIS])
  const otherSections = entries
    .filter((e) => !known.has(e) && existsSync(join(root, e, 'openapi.yaml')))
    .sort()
    .map(buildApiSection)
    .filter(Boolean)

  if (dataSections.length) sections.push({ text: 'Data APIs', collapsed: false, items: dataSections })
  if (funcSections.length) sections.push({ text: 'Functional APIs', collapsed: false, items: funcSections })
  if (otherSections.length) sections.push({ text: 'Other APIs', collapsed: false, items: otherSections })

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
  sitemap: {
    hostname: 'https://boisterous-tanuki-75d338.netlify.app'
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/branch-gylph-violet800-180px.png' }],
    ['link', {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href: '/fonts/TT_Hoves_Pro_Regular.woff2',
      crossorigin: ''
    }]
  ],
  // Emit per-page social/share metadata (Open Graph + Twitter) from each
  // page's title + description. Without this, every page shares the generic
  // global description and previews/SEO are uniform and weak.
  transformPageData(pageData) {
    const fm = pageData.frontmatter || (pageData.frontmatter = {})
    const title = pageData.title || fm.title
    const description = pageData.description || fm.description
    fm.head ??= []
    if (title) fm.head.push(['meta', { property: 'og:title', content: String(title) }])
    if (description) {
      fm.head.push(['meta', { property: 'og:description', content: String(description) }])
      fm.head.push(['meta', { name: 'twitter:description', content: String(description) }])
    }
    fm.head.push(['meta', { property: 'og:type', content: 'website' }])
    fm.head.push(['meta', { name: 'twitter:card', content: 'summary' }])
  },
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

import { defineConfig } from 'vitepress'
import yamlPlugin from '@rollup/plugin-yaml'
import { readdirSync, readFileSync, statSync } from 'node:fs'
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
function buildApidocsSidebar() {
  const root = 'apidocs'
  const sections: any[] = []

  let entries: string[]
  try { entries = readdirSync(root).sort() }
  catch { return sections }

  for (const entry of entries) {
    const dir = join(root, entry)
    try { if (!statSync(dir).isDirectory()) continue }
    catch { continue }

    const yamlPath = join(dir, 'openapi.yaml')
    let spec: any
    try { spec = yaml.load(readFileSync(yamlPath, 'utf8')) }
    catch { continue }

    const apiTitle = spec?.info?.title ?? entry
    const items: any[] = [
      { text: 'Overview', link: `/apidocs/${entry}/` }
    ]

    for (const verbs of Object.values<any>(spec?.paths ?? {})) {
      for (const op of Object.values<any>(verbs ?? {})) {
        if (!op?.operationId) continue
        items.push({
          text: op.summary ?? op.operationId,
          link: `/apidocs/${entry}/operations/${op.operationId}`,
        })
      }
    }

    sections.push({
      text: apiTitle,
      collapsed: false,
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

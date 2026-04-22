import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import yamlPlugin from '@rollup/plugin-yaml'

const sidebar = generateSidebar([
  {
    documentRootPath: '/',
    scanStartPath: 'account-hub',
    resolvePath: '/account-hub/',
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: 'title',
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    hyphenToSpace: true,
    underscoreToSpace: true,
    capitalizeFirst: true,
    capitalizeEachWords: true,
    collapsed: false,
    collapseDepth: 2,
    excludeByGlobPattern: ['**/\\[*\\].md'],
    rootGroupText: 'Account Hub'
  },
  {
    documentRootPath: '/',
    scanStartPath: 'marketer-hub',
    resolvePath: '/marketer-hub/',
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: 'title',
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    hyphenToSpace: true,
    underscoreToSpace: true,
    capitalizeFirst: true,
    capitalizeEachWords: true,
    collapsed: false,
    collapseDepth: 2,
    excludeByGlobPattern: ['**/\\[*\\].md'],
    rootGroupText: 'Marketer Hub'
  },
  {
    documentRootPath: '/',
    scanStartPath: 'developer-hub',
    resolvePath: '/developer-hub/',
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: 'title',
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    hyphenToSpace: true,
    underscoreToSpace: true,
    capitalizeFirst: true,
    capitalizeEachWords: true,
    collapsed: false,
    collapseDepth: 2,
    excludeByGlobPattern: ['**/\\[*\\].md'],
    rootGroupText: 'Developer Hub'
  }
])

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
  appearance: 'force-dark',
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
    editLink: {
      pattern: 'https://github.com/AraHill-Branch/branch-self-hosted-help-center-poc/edit/main/:path',
      text: 'Suggest an edit'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AraHill-Branch/branch-self-hosted-help-center-poc' }
    ]
  }
})

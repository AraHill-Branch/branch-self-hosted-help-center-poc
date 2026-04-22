import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

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
    rootGroupText: 'Developer Hub'
  }
])

export default defineConfig({
  title: "Branch Help Center",
  description: "Product Documentation",
  ignoreDeadLinks: true,
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.message?.includes('/img/')) return
          warn(warning)
        }
      }
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
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
    search: {
      provider: 'local'
    },
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

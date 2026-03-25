import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Branch Self-Hosted Help Center POC",
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
      { text: 'Account Hub', link: '/account-hub/' },
      { text: 'Marketer Hub', link: '/marketer-hub/' },
      { text: 'Developer Hub', link: '/developer-hub/' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AraHill-Branch/branch-self-hosted-help-center-poc' }
    ]
  }
})

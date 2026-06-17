import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import ApiOperation from './api/ApiOperation.vue'
import BranchCredentialsBar from './api/BranchCredentialsBar.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ApiOperation', ApiOperation)
    // Global so the credentials bar can be dropped into the /apidocs/
    // landing + overview markdown pages, not just operation pages.
    app.component('BranchCredentialsBar', BranchCredentialsBar)
  }
} satisfies Theme

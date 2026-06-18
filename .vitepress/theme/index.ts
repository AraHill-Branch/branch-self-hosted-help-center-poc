import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import ApiOperation from './api/ApiOperation.vue'
import BranchCredentialsBar from './api/BranchCredentialsBar.vue'
import ApiEndpointList from './api/ApiEndpointList.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ApiOperation', ApiOperation)
    // Global so these can be dropped into the /apidocs/ landing + overview
    // markdown pages, not just operation pages.
    app.component('BranchCredentialsBar', BranchCredentialsBar)
    app.component('ApiEndpointList', ApiEndpointList)
  }
} satisfies Theme

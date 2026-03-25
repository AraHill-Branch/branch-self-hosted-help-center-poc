import { defineConfig } from 'vitepress'

// Manual sidebar configuration for Account Hub (custom order)
const accountHubSidebar = [
  {
    text: 'Account Hub',
    link: '/account-hub/',
    items: [
      // GET STARTED - First section
      {
        text: 'Get Started',
        collapsed: true,
        items: [
          { text: 'Products', link: '/account-hub/get-started/products' },
          { text: 'Glossary', link: '/account-hub/get-started/glossary' },
          { text: 'Branch University', link: '/account-hub/get-started/branch-university' },
          {
            text: 'Onboarding',
            collapsed: true,
            items: [
              { text: 'Onboarding Guide', link: '/account-hub/get-started/onboarding/onboarding-guide' },
              { text: 'Activation Onboarding Guide', link: '/account-hub/get-started/onboarding/activation-onboarding-guide' },
              { text: 'MMP Migration Guide', link: '/account-hub/get-started/onboarding/mmp-migration-guide' }
            ]
          }
        ]
      },

      // NEW BRANCH - Second section as requested
      {
        text: 'New Branch',
        collapsed: true,
        items: [
          { text: 'Home Page (New)', link: '/account-hub/new-branch/home-page' },
          { text: 'New Branch Overview', link: '/account-hub/new-branch/new-branch-overview' },
          {
            text: 'Account (New)',
            collapsed: true,
            items: [
              { text: 'Profile (New)', link: '/account-hub/new-branch/account-new/profile-new' },
              {
                text: 'Billing (New)',
                collapsed: true,
                items: [
                  { text: 'Manage Billing (New)', link: '/account-hub/new-branch/account-new/billing-new/billing-manage-new' },
                  { text: 'Manage Invoices (New)', link: '/account-hub/new-branch/account-new/billing-new/billing-invoices-new' },
                  { text: 'Manage Payments (New)', link: '/account-hub/new-branch/account-new/billing-new/billing-payments-new' },
                  { text: 'Usage (New)', link: '/account-hub/new-branch/account-new/billing-new/billing-usage-new' }
                ]
              }
            ]
          },
          {
            text: 'Configuration (New)',
            collapsed: true,
            items: [
              {
                text: 'App Settings (New)',
                collapsed: true,
                items: [
                  { text: 'General (New)', link: '/account-hub/new-branch/configuration-new/app-settings-new/general-new' }
                ]
              },
              {
                text: 'Attribution (New)',
                collapsed: true,
                items: [
                  { text: 'Attribution (New)', link: '/account-hub/new-branch/configuration-new/attribution-new/attribution-page-new' }
                ]
              },
              {
                text: 'Link Controls (New)',
                collapsed: true,
                items: [
                  { text: 'Link Appearance (New)', link: '/account-hub/new-branch/configuration-new/link-controls-new/link-appearance-new' },
                  { text: 'Link Routing Rules (New)', link: '/account-hub/new-branch/configuration-new/link-controls-new/link-routing-rules-new' }
                ]
              },
              {
                text: 'Security and Access (New)',
                collapsed: true,
                items: [
                  { text: 'Credentials (New)', link: '/account-hub/new-branch/configuration-new/security-and-access-new/credentials-new' },
                  { text: 'SSO (New)', link: '/account-hub/new-branch/configuration-new/security-and-access-new/sso-new' },
                  { text: 'Team (New)', link: '/account-hub/new-branch/configuration-new/security-and-access-new/team-new' }
                ]
              },
              {
                text: 'Testing and Monitoring (New)',
                collapsed: true,
                items: [
                  { text: 'Add and Manage Test Devices (New)', link: '/account-hub/new-branch/configuration-new/testing-and-monitoring-new/add-and-manage-test-devices-new' },
                  { text: 'Alert Notifications (New)', link: '/account-hub/new-branch/configuration-new/testing-and-monitoring-new/alert-notifications-new' },
                  { text: 'Liveview (New)', link: '/account-hub/new-branch/configuration-new/testing-and-monitoring-new/liveview-new' },
                  { text: 'Recent Activity (New)', link: '/account-hub/new-branch/configuration-new/testing-and-monitoring-new/recent-activity-new' }
                ]
              }
            ]
          }
        ]
      },

      {
        text: 'User Accounts and Permissions',
        collapsed: true,
        items: [
          { text: 'Add & Manage Users', link: '/account-hub/user-accounts-and-permissions/add-manage-users' },
          { text: 'Default Access Levels, Users Roles & Permissions', link: '/account-hub/user-accounts-and-permissions/default-access-levels-users-roles-permissions' },
          { text: 'Entity Views, Roles & Access Levels Overview', link: '/account-hub/user-accounts-and-permissions/entity-views-roles-access-levels-overview' },
          { text: 'Manage Account Profile', link: '/account-hub/user-accounts-and-permissions/profile-settings' },
          { text: 'Manage User Profile', link: '/account-hub/user-accounts-and-permissions/manage-user-profile' },
          {
            text: 'Agency Users',
            collapsed: true,
            items: [
              { text: 'Add & Manage Agency Users', link: '/account-hub/user-accounts-and-permissions/agency-users/add-agency-users' },
              { text: 'Grant an Agency Access', link: '/account-hub/user-accounts-and-permissions/agency-users/grant-an-agency-access' },
              { text: 'Manage Agency Profile', link: '/account-hub/user-accounts-and-permissions/agency-users/agency-profile' },
              { text: 'Manage Agency User Profile', link: '/account-hub/user-accounts-and-permissions/agency-users/agency-user-profile' }
            ]
          }
        ]
      },

      {
        text: 'SSO',
        collapsed: true,
        items: [
          { text: 'Configure SSO (General SAML)', link: '/account-hub/sso/configure-sso' },
          { text: 'Configure SSO With Azure', link: '/account-hub/sso/configure-sso-with-azure' },
          { text: 'Configure SSO With Google', link: '/account-hub/sso/configure-sso-with-google' },
          { text: 'Configure SSO With Okta', link: '/account-hub/sso/configure-sso-with-okta' }
        ]
      },

      {
        text: 'App Settings',
        collapsed: true,
        items: [
          { text: 'Add Additional Apps', link: '/account-hub/app-settings/add-additional-apps' },
          { text: 'Attribution Windows', link: '/account-hub/app-settings/attribution-windows' }
        ]
      },

      {
        text: 'Link Settings',
        collapsed: true,
        items: [
          { text: 'Basic Link Configuration', link: '/account-hub/link-settings/basic-link-configuration' },
          { text: 'Advanced Link Configuration', link: '/account-hub/link-settings/advanced-link-configuration' },
          { text: 'Additional Link Configuration', link: '/account-hub/link-settings/additional-link-configuration' },
          { text: 'Link Configuration FAQ', link: '/account-hub/link-settings/link-configuration-faq' },
          { text: 'Troubleshooting Link Formatting Errors', link: '/account-hub/link-settings/troubleshooting-link-formatting-errors' }
        ]
      },

      // TESTING & MONITORING - Operations
      {
        text: 'Testing and Monitoring',
        collapsed: true,
        items: [
          { text: 'Add and Manage Test Devices', link: '/account-hub/testing-and-monitoring/add-test-devices' },
          { text: 'Find your Device IDs', link: '/account-hub/testing-and-monitoring/how-do-i-find-my-device-ids' },
          { text: 'Liveview', link: '/account-hub/testing-and-monitoring/liveview' },
          { text: 'Notification & Alerting System', link: '/account-hub/testing-and-monitoring/notification-alerting-system' },
          { text: 'Recent Activity', link: '/account-hub/testing-and-monitoring/recent-activity' }
        ]
      },

      // DATA PRIVACY - Compliance
      {
        text: 'Data Privacy',
        collapsed: true,
        items: [
          { text: 'Best Practices to Minimize Data Sent to Branch', link: '/account-hub/data-privacy/best-practices-to-minimize-data-sent-to-branch' },
          { text: 'Data Retention Policy', link: '/account-hub/data-privacy/data-retention-policy' },
          { text: 'Obscured Data', link: '/account-hub/data-privacy/obscured-data' },
          { text: 'SDK Privacy Controls', link: '/account-hub/data-privacy/sdk-privacy-controls' },
          { text: 'Shared Responsibility', link: '/account-hub/data-privacy/shared-responsibility' },
          { text: 'Third Party Integrations and PII', link: '/account-hub/data-privacy/third-party-integrations-and-pii' }
        ]
      },

      // BILLING - Business
      {
        text: 'Billing',
        collapsed: true,
        items: [
          { text: 'Billing Overview', link: '/account-hub/billing/billing-overview' },
          { text: 'Manage Billing', link: '/account-hub/billing/manage-billing' },
          { text: 'Manage Invoices', link: '/account-hub/billing/manage-invoices' },
          { text: 'Manage Payments', link: '/account-hub/billing/manage-payments' },
          { text: 'Request W9', link: '/account-hub/billing/request-w9' },
          { text: 'Usage', link: '/account-hub/billing/usage' }
        ]
      },

      // ADDITIONAL RESOURCES - Support
      {
        text: 'Additional Resources',
        collapsed: true,
        items: [
          { text: 'Professional Services', link: '/account-hub/additional-resources/professional-services' },
          { text: 'Submit a Ticket', link: '/account-hub/additional-resources/submit-a-ticket' },
          { text: 'Support Guide', link: '/account-hub/additional-resources/support-guide' }
        ]
      }
    ]
  }
]

// Combined sidebar configuration
const sidebar = {
  '/account-hub/': accountHubSidebar,
  '/marketer-hub/': [
    {
      text: 'Marketer Hub',
      link: '/marketer-hub/',
      items: [
        // TODO: Add manual Marketer Hub configuration
      ]
    }
  ],
  '/developer-hub/': [
    {
      text: 'Developer Hub',
      link: '/developer-hub/',
      items: [
        // TODO: Add manual Developer Hub configuration
      ]
    }
  ]
}

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
      { text: 'Account Hub', link: '/account-hub/' },
      { text: 'Marketer Hub', link: '/marketer-hub/' },
      { text: 'Developer Hub', link: '/developer-hub/' }
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AraHill-Branch/branch-self-hosted-help-center-poc' }
    ]
  }
})

// Manual sidebar configuration based on current file structure
// This gives you complete control over ordering

export const sidebar = {
  '/account-hub/': [
    {
      text: 'Account Hub',
      link: '/account-hub/',
      items: [
        // GET STARTED - Most logical first section
        {
          text: 'Get Started',
          collapsed: false,
          items: [
            // Put overview content from CSV here once you decide the order you want
          ]
        },

        // APP SETTINGS - Core configuration
        {
          text: 'App Settings',
          collapsed: false,
          items: [
            { text: 'Add Additional Apps', link: '/account-hub/app-settings/add-additional-apps' },
            { text: 'Attribution Windows', link: '/account-hub/app-settings/attribution-windows' }
          ]
        },

        // LINK SETTINGS - Core configuration
        {
          text: 'Link Settings',
          collapsed: false,
          items: [
            { text: 'Basic Link Configuration', link: '/account-hub/link-settings/basic-link-configuration' },
            { text: 'Advanced Link Configuration', link: '/account-hub/link-settings/advanced-link-configuration' },
            { text: 'Additional Link Configuration', link: '/account-hub/link-settings/additional-link-configuration' },
            { text: 'Link Configuration FAQ', link: '/account-hub/link-settings/link-configuration-faq' },
            { text: 'Troubleshooting Link Formatting Errors', link: '/account-hub/link-settings/troubleshooting-link-formatting-errors' }
          ]
        },

        // USER ACCOUNTS - Team management
        {
          text: 'User Accounts and Permissions',
          collapsed: false,
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

        // SSO - Security
        {
          text: 'Single Sign-On (SSO)',
          collapsed: false,
          items: [
            { text: 'Configure SSO (General SAML)', link: '/account-hub/sso/configure-sso' },
            { text: 'Configure SSO With Azure', link: '/account-hub/sso/configure-sso-with-azure' },
            { text: 'Configure SSO With Google', link: '/account-hub/sso/configure-sso-with-google' },
            { text: 'Configure SSO With Okta', link: '/account-hub/sso/configure-sso-with-okta' }
          ]
        },

        // TESTING & MONITORING - Operations
        {
          text: 'Testing and Monitoring',
          collapsed: false,
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
          collapsed: false,
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
          collapsed: false,
          items: [
            { text: 'Billing Overview', link: '/account-hub/billing/billing-overview' },
            { text: 'Manage Billing', link: '/account-hub/billing/manage-billing' },
            { text: 'Manage Invoices', link: '/account-hub/billing/manage-invoices' },
            { text: 'Manage Payments', link: '/account-hub/billing/manage-payments' },
            { text: 'Request W9', link: '/account-hub/billing/request-w9' },
            { text: 'Usage', link: '/account-hub/billing/usage' }
          ]
        },

        // NEW BRANCH - Beta features
        {
          text: 'New Branch (Beta)',
          collapsed: true,
          items: [
            { text: 'Home Page (New)', link: '/account-hub/new-branch/home-page' },
            { text: 'New Branch Overview', link: '/account-hub/new-branch/new-branch-overview' },
            // Add all the nested new-branch items here if you want them expanded
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

  // Add marketer-hub and developer-hub configurations here
}
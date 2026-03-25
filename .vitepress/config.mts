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
        // GET STARTED - First section
        {
          text: 'Get Started',
          collapsed: true,
          items: [
            { text: 'Products', link: '/marketer-hub/get-started/products' },
            { text: 'Glossary', link: '/marketer-hub/get-started/glossary' },
            { text: 'Branch University', link: '/marketer-hub/get-started/branch-university' },
            {
              text: 'Onboarding',
              collapsed: true,
              items: [
                { text: 'Onboarding Guide', link: '/marketer-hub/get-started/onboarding/onboarding-guide' },
                { text: 'Activation Onboarding Guide', link: '/marketer-hub/get-started/onboarding/activation-onboarding-guide' },
                { text: 'MMP Migration Guide', link: '/marketer-hub/get-started/onboarding/mmp-migration-guide' }
              ]
            }
          ]
        },

        // NEW BRANCH - Platform updates
        {
          text: 'New Branch',
          collapsed: true,
          items: [
            {
              text: 'Analysis (New)',
              collapsed: true,
              items: [
                { text: 'Analysis Data Sources (New)', link: '/marketer-hub/new-branch/analysis-new/analysis-data-sources-new' },
                {
                  text: 'Dashboards (New)',
                  collapsed: true,
                  items: [
                    { text: 'Analysis Dashboards Overview (New)', link: '/marketer-hub/new-branch/analysis-new/dashboards-new/analysis-dashboards-overview-new' },
                    { text: 'Cohorts (New)', link: '/marketer-hub/new-branch/analysis-new/dashboards-new/cohorts-new' }
                  ]
                }
              ]
            },
            {
              text: 'Campaigns (New)',
              collapsed: true,
              items: [
                {
                  text: 'Links (New)',
                  collapsed: true,
                  items: [
                    {
                      text: 'Create Links (New)',
                      collapsed: true,
                      items: [
                        { text: 'Create App Links (New)', link: '/marketer-hub/new-branch/campaigns-new/links-new/create-links-new/create-app-links-new' },
                        { text: 'Create Web Links (New)', link: '/marketer-hub/new-branch/campaigns-new/links-new/create-links-new/create-web-links-new' },
                        { text: 'Create Links with Ivy (New)', link: '/marketer-hub/new-branch/campaigns-new/links-new/create-links-new/create-links-with-ivy-new' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },

        // LINKS - Core linking functionality
        {
          text: 'Links',
          collapsed: true,
          items: [
            { text: 'Deep Linking Overview', link: '/marketer-hub/links/deep-linking' },
            { text: 'Deep Link Reference', link: '/marketer-hub/links/deep-link-reference' },
            {
              text: 'Create Links',
              collapsed: true,
              items: [
                {
                  text: 'Short Links',
                  collapsed: true,
                  items: [
                    { text: 'Create App Links', link: '/marketer-hub/links/create-links/short-links/create-app-links' },
                    { text: 'Create Web Links', link: '/marketer-hub/links/create-links/short-links/create-web-links' },
                    { text: 'Branch Slack App', link: '/marketer-hub/links/create-links/short-links/branch-slack-app' }
                  ]
                },
                {
                  text: 'Ad Links',
                  collapsed: true,
                  items: [
                    { text: 'Ad Links Overview', link: '/marketer-hub/links/create-links/ad-links/ad-links' }
                  ]
                }
              ]
            },
            {
              text: 'QR Codes',
              collapsed: true,
              items: [
                { text: 'Create QR Codes', link: '/marketer-hub/links/qr-codes/create-qr-codes' },
                { text: 'Analyze QR Code Performance', link: '/marketer-hub/links/qr-codes/analyze-qr-code-performance' }
              ]
            },
            {
              text: 'Verify Links',
              collapsed: true,
              items: [
                {
                  text: 'Troubleshooting',
                  collapsed: true,
                  items: [
                    { text: 'Android Web Only Link Opens App', link: '/marketer-hub/links/verify-links/troubleshooting/android-web-only-link-opens-app' }
                  ]
                }
              ]
            }
          ]
        },

        // JOURNEYS - Web experiences and banners
        {
          text: 'Journeys',
          collapsed: true,
          items: [
            { text: 'Creatives Manager', link: '/marketer-hub/journeys/creatives-manager' },
            { text: 'Creatives Optimization', link: '/marketer-hub/journeys/creatives-optimization' },
            {
              text: 'Create Journeys',
              collapsed: true,
              items: [
                { text: 'Create Journey Banner or Interstitial', link: '/marketer-hub/journeys/create-journeys/create-journey-banner-or-interstitial' },
                { text: 'Desktop Journeys', link: '/marketer-hub/journeys/create-journeys/desktop-journeys' },
                { text: 'Advanced Journeys Configuration', link: '/marketer-hub/journeys/create-journeys/advanced-journeys-configuration' },
                { text: 'Example Journeys', link: '/marketer-hub/journeys/create-journeys/example-journeys' }
              ]
            },
            {
              text: 'Journeys Use Cases',
              collapsed: true,
              items: [
                { text: 'Email to App', link: '/marketer-hub/journeys/journeys-use-cases/email-to-app' }
              ]
            }
          ]
        },

        // ADS - Attribution and advertising
        {
          text: 'Ads',
          collapsed: true,
          items: [
            { text: 'Ads Overview', link: '/marketer-hub/ads/ads-overview' },
            {
              text: 'Self-Attributing Networks (SANs)',
              collapsed: true,
              items: [
                { text: 'Ads SAN FAQ', link: '/marketer-hub/ads/sans/ads-sans-faq' },
                { text: 'Common Sources of SAN Reporting Discrepancies', link: '/marketer-hub/ads/sans/common-sources-of-san-reporting-discrepancies' },
                { text: 'Configuring Events for Self-Attributing Networks', link: '/marketer-hub/ads/sans/configuring-events-for-self-attributing-networks' },
                { text: 'DMA Compliance for SANs', link: '/marketer-hub/ads/sans/dma-compliance-for-sans' },
                {
                  text: 'SAN Integration Guides',
                  collapsed: true,
                  items: [
                    { text: 'Amazon SAN', link: '/marketer-hub/ads/sans/san-integration-guides/amazon-san' },
                    {
                      text: 'Apple Ads',
                      collapsed: true,
                      items: [
                        { text: 'Apple Ads Overview', link: '/marketer-hub/ads/sans/san-integration-guides/apple-ads/apple-ads' },
                        { text: 'Enable Apple Ads', link: '/marketer-hub/ads/sans/san-integration-guides/apple-ads/enable-apple-ads' },
                        { text: 'Apple Ads Data Reporting', link: '/marketer-hub/ads/sans/san-integration-guides/apple-ads/apple-ads-data-reporting' }
                      ]
                    },
                    {
                      text: 'Facebook Ads',
                      collapsed: true,
                      items: [
                        { text: 'Facebook Ads FAQ', link: '/marketer-hub/ads/sans/san-integration-guides/facebook-ads/facebook-ads-faq' },
                        { text: 'Facebook Ads Deferred Deep Linking', link: '/marketer-hub/ads/sans/san-integration-guides/facebook-ads/facebook-ads-deferred-deep-linking' },
                        { text: 'Enable App Aggregated Event Measurement Support', link: '/marketer-hub/ads/sans/san-integration-guides/facebook-ads/enable-app-aggregated-event-measurement-support' }
                      ]
                    },
                    {
                      text: 'Google Ads',
                      collapsed: true,
                      items: [
                        { text: 'Enable Google App Campaigns', link: '/marketer-hub/ads/sans/san-integration-guides/google-ads/enable-google-app-campaigns' },
                        { text: 'Enable Google Web-based Campaigns', link: '/marketer-hub/ads/sans/san-integration-guides/google-ads/enable-google-web-based-campaigns' }
                      ]
                    },
                    {
                      text: 'Google Marketing Platform',
                      collapsed: true,
                      items: [
                        { text: 'Enable Google Marketing Platform', link: '/marketer-hub/ads/sans/san-integration-guides/google-marketing-platform/enable-google-marketing-platform' },
                        { text: 'DoubleClick Legacy', link: '/marketer-hub/ads/sans/san-integration-guides/google-marketing-platform/doubleclick-legacy' }
                      ]
                    },
                    {
                      text: 'TikTok for Business',
                      collapsed: true,
                      items: [
                        { text: 'Enable TikTok for Business', link: '/marketer-hub/ads/sans/san-integration-guides/tiktok-for-business/enable-tiktok-for-business' },
                        { text: 'Enable TikTok Advanced SAN', link: '/marketer-hub/ads/sans/san-integration-guides/tiktok-for-business/enable-tiktok-advanced-san' }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: 'Non-SAN Partners',
              collapsed: true,
              items: [
                { text: 'Ad Partner Integration Guide', link: '/marketer-hub/ads/non-sans/ad-partner-integration-guide' },
                { text: 'Adding Custom Partners', link: '/marketer-hub/ads/non-sans/adding-custom-partners' },
                { text: 'Ads Non-SAN FAQ', link: '/marketer-hub/ads/non-sans/ads-non-sans-faq' },
                {
                  text: 'Postbacks',
                  collapsed: true,
                  items: [
                    { text: 'Basic Postback Configuration', link: '/marketer-hub/ads/non-sans/postbacks/basic-postback-configuration' }
                  ]
                }
              ]
            },
            {
              text: 'Ads Reporting',
              collapsed: true,
              items: [
                { text: 'Ads Reporting FAQ', link: '/marketer-hub/ads/ads-reporting/ads-reporting-faq' },
                { text: 'Cohort Analytics', link: '/marketer-hub/ads/ads-reporting/cohort-analytics' }
              ]
            },
            {
              text: 'ROI Hub',
              collapsed: true,
              items: [
                { text: 'Cost Data Reporting Analytics', link: '/marketer-hub/ads/roi-hub/cost-data-reporting-analytics' },
                {
                  text: 'Share Cost Data with Branch',
                  collapsed: true,
                  items: [
                    { text: 'Cost Data via API Connection', link: '/marketer-hub/ads/roi-hub/share-cost-data-with-branch/cost-data-via-api-connection' },
                    { text: 'Cost Data via Email Import', link: '/marketer-hub/ads/roi-hub/share-cost-data-with-branch/cost-data-via-email-import' },
                    { text: 'Cost Data via File Upload', link: '/marketer-hub/ads/roi-hub/share-cost-data-with-branch/cost-data-via-file-upload' }
                  ]
                }
              ]
            },
            {
              text: 'Engagement Builder',
              collapsed: true,
              items: [
                { text: 'Engagement Builder Overview', link: '/marketer-hub/ads/engagement-builder/engagement-builder' },
                { text: 'Enable Engagement Builder', link: '/marketer-hub/ads/engagement-builder/enable-engagement-builder' }
              ]
            },
            {
              text: 'Testing',
              collapsed: true,
              items: [
                { text: 'Ad Partner Integration Testing', link: '/marketer-hub/ads/testing/ad-partner-integration-testing' }
              ]
            },
            {
              text: 'Additional Configuration',
              collapsed: true,
              items: [
                { text: 'Ads Advanced Configuration', link: '/marketer-hub/ads/additional-configuration/ads-advanced-configuration' },
                { text: 'Creating Branch Links for Product Feeds', link: '/marketer-hub/ads/additional-configuration/creating-branch-links-for-product-feeds' }
              ]
            }
          ]
        },

        // ATTRIBUTION METHODOLOGY - How attribution works
        {
          text: 'Attribution Methodology',
          collapsed: true,
          items: [
            { text: 'Branch Methodology Overview', link: '/marketer-hub/attribution-methodology/branch-methodology-overview' },
            { text: 'Branch Attribution Explained', link: '/marketer-hub/attribution-methodology/branch-attribution-explained' },
            { text: 'Branch Attribution Logic Settings', link: '/marketer-hub/attribution-methodology/branch-attribution-logic-settings' },
            { text: 'Advertising Identifiers for Attribution', link: '/marketer-hub/attribution-methodology/advertising-identifiers-for-attribution' },
            { text: 'Comparing Installs to Apple iTunes and Google Play', link: '/marketer-hub/attribution-methodology/comparing-installs-to-apple-itunes-and-google-play' }
          ]
        },

        // REPORTS AND EXPORTS - Analytics and data
        {
          text: 'Reports and Exports',
          collapsed: true,
          items: [
            { text: 'Dashboard Reports', link: '/marketer-hub/reports-and-exports/dashboard-reports' },
            { text: 'Dashboard Exports', link: '/marketer-hub/reports-and-exports/dashboard-exports' },
            { text: 'Dashboard Custom Exports', link: '/marketer-hub/reports-and-exports/dashboard-custom-exports' },
            { text: 'Dashboard Daily Exports', link: '/marketer-hub/reports-and-exports/dashboard-daily-exports' },
            { text: 'Branch Funnel', link: '/marketer-hub/reports-and-exports/branch-funnel' },
            { text: 'Branch Summary Page', link: '/marketer-hub/reports-and-exports/branch-summary-page' }
          ]
        },

        // SKADNETWORK AND IOS - iOS 14+ privacy
        {
          text: 'SKAdNetwork and iOS',
          collapsed: true,
          items: [
            {
              text: 'SKAdNetwork',
              collapsed: true,
              items: [
                { text: 'Enable SKAdNetwork', link: '/marketer-hub/skadnetwork-and-ios/skadnetwork/enable-skadnetwork' }
              ]
            },
            {
              text: 'iOS 14 FAQs',
              collapsed: true,
              items: [
                { text: 'Apple Ads iOS 14 FAQ', link: '/marketer-hub/skadnetwork-and-ios/ios-14-faqs/apple-ads-ios-14-faq' },
                { text: 'AppTrackingTransparency FAQ', link: '/marketer-hub/skadnetwork-and-ios/ios-14-faqs/apptrackingtransparency-faq' }
              ]
            }
          ]
        },

        // EMAIL AND SMS - Email marketing integration
        {
          text: 'Email and SMS',
          collapsed: true,
          items: [
            { text: 'Email Overview', link: '/marketer-hub/email-and-sms/email-overview' }
          ]
        },

        // DEEPVIEWS - Fallback web pages
        {
          text: 'Deepviews',
          collapsed: true,
          items: [
            { text: 'Deepviews Overview', link: '/marketer-hub/deepviews/deepviews' },
            { text: 'Enable Deepviews', link: '/marketer-hub/deepviews/enable-deepviews' },
            { text: 'Deepview Analytics', link: '/marketer-hub/deepviews/deepview-analytics' }
          ]
        },

        // DATA FEEDS - Data integrations
        {
          text: 'Data Feeds',
          collapsed: true,
          items: [
            { text: 'Data Integration Implementation Guide', link: '/marketer-hub/data-feeds/data-integration-implementation-guide' }
          ]
        },

        // LIVEVIEW - Real-time monitoring
        {
          text: 'Liveview',
          collapsed: true,
          items: [
            // Add liveview items when available
          ]
        },

        // SEO AND AIO - Search optimization
        {
          text: 'SEO and AIO',
          collapsed: true,
          items: [
            // Add SEO/AIO items when available
          ]
        },

        // CUSTOM PAGES - Miscellaneous resources
        {
          text: 'Custom Pages',
          collapsed: true,
          items: [
            {
              text: 'Miscellaneous',
              collapsed: true,
              items: [
                { text: 'Branch Dashboard Overview', link: '/marketer-hub/custom-pages/miscellaneous/branch-dashboard-overview' },
                { text: 'Activation Guide', link: '/marketer-hub/custom-pages/miscellaneous/activation-guide' },
                { text: 'Activation Migration Guide', link: '/marketer-hub/custom-pages/miscellaneous/activation-migration-guide' }
              ]
            }
          ]
        }
      ]
    }
  ],
  '/developer-hub/': [
    {
      text: 'Developer Hub',
      link: '/developer-hub/',
      items: [
        // GET STARTED - First section
        {
          text: 'Get Started',
          collapsed: true,
          items: [
            { text: 'Products', link: '/developer-hub/get-started/products' },
            { text: 'Glossary', link: '/developer-hub/get-started/glossary' },
            { text: 'Branch University', link: '/developer-hub/get-started/branch-university' },
            {
              text: 'Onboarding',
              collapsed: true,
              items: [
                { text: 'Onboarding Guide', link: '/developer-hub/get-started/onboarding/onboarding-guide' },
                { text: 'Activation Onboarding Guide', link: '/developer-hub/get-started/onboarding/activation-onboarding-guide' },
                { text: 'MMP Migration Guide', link: '/developer-hub/get-started/onboarding/mmp-migration-guide' },
                { text: 'Migrating Firebase Dynamic Links to Branch Links', link: '/developer-hub/get-started/onboarding/migrating-firebase-dynamic-links-to-branch-links' }
              ]
            }
          ]
        },

        // BRANCH SDKs - Core integration
        {
          text: 'Branch SDKs',
          collapsed: true,
          items: [
            { text: 'Native SDKs Overview', link: '/developer-hub/branch-sdks/native-sdks-overview' },
            { text: 'Plugins Overview', link: '/developer-hub/branch-sdks/plugins-overview' },
            { text: 'SDK Integration Tracker', link: '/developer-hub/branch-sdks/sdk-integration-tracker' },
            { text: 'Importing Historical User Data', link: '/developer-hub/branch-sdks/importing-historical-user-data' },
            {
              text: 'Native SDKs',
              collapsed: true,
              items: [
                {
                  text: 'Android SDK',
                  collapsed: true,
                  items: [
                    { text: 'Android SDK Overview', link: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-sdk-overview' },
                    { text: 'Android Basic Integration', link: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-basic-integration' },
                    { text: 'Android Advanced Features', link: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-advanced-features' },
                    { text: 'Android Full Reference', link: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-full-reference' },
                    { text: 'Android Testing', link: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-testing' },
                    { text: 'Android Troubleshooting', link: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-troubleshooting' },
                    { text: 'Android Instant Apps', link: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-instant-apps' },
                    { text: 'Android Version History', link: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-version-history' }
                  ]
                },
                {
                  text: 'iOS SDK',
                  collapsed: true,
                  items: [
                    { text: 'iOS SDK Overview', link: '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-sdk-overview' },
                    { text: 'iOS Basic Integration', link: '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-basic-integration' },
                    { text: 'iOS Advanced Features', link: '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-advanced-features' },
                    { text: 'iOS Full Reference', link: '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-full-reference' },
                    { text: 'iOS Testing', link: '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-testing' },
                    { text: 'iOS Troubleshooting', link: '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-troubleshooting' },
                    { text: 'iMessage Apps', link: '/developer-hub/branch-sdks/native-sdks/ios-sdk/imessage-apps' },
                    { text: 'iOS Version History', link: '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-version-history' }
                  ]
                },
                {
                  text: 'Web SDK',
                  collapsed: true,
                  items: [
                    { text: 'Web SDK Overview', link: '/developer-hub/branch-sdks/native-sdks/web-sdk/web-sdk-overview' },
                    { text: 'Web Basic Integration', link: '/developer-hub/branch-sdks/native-sdks/web-sdk/web-basic-integration' },
                    { text: 'Web Advanced Features', link: '/developer-hub/branch-sdks/native-sdks/web-sdk/web-advanced-features' },
                    { text: 'Web Full Reference', link: '/developer-hub/branch-sdks/native-sdks/web-sdk/web-full-reference' },
                    { text: 'Web Testing', link: '/developer-hub/branch-sdks/native-sdks/web-sdk/web-testing' },
                    { text: 'Web Troubleshooting', link: '/developer-hub/branch-sdks/native-sdks/web-sdk/web-troubleshooting' },
                    { text: 'Web Version History', link: '/developer-hub/branch-sdks/native-sdks/web-sdk/web-version-history' }
                  ]
                },
                {
                  text: 'Connected SDK',
                  collapsed: true,
                  items: [
                    { text: 'Connected SDK Overview', link: '/developer-hub/branch-sdks/native-sdks/connected-sdk/connected-sdk' },
                    { text: 'Connected Basic Integration', link: '/developer-hub/branch-sdks/native-sdks/connected-sdk/connected-basic-integration' },
                    { text: 'Connected Advanced Features', link: '/developer-hub/branch-sdks/native-sdks/connected-sdk/connected-advanced-features' },
                    { text: 'Connected Full Reference', link: '/developer-hub/branch-sdks/native-sdks/connected-sdk/connected-full-reference' },
                    { text: 'Connected Testing', link: '/developer-hub/branch-sdks/native-sdks/connected-sdk/connected-testing' },
                    { text: 'Connected Troubleshooting', link: '/developer-hub/branch-sdks/native-sdks/connected-sdk/connected-troubleshooting' }
                  ]
                },
                {
                  text: 'macOS SDK',
                  collapsed: true,
                  items: [
                    { text: 'macOS SDK Overview', link: '/developer-hub/branch-sdks/native-sdks/macos-sdk/macos-sdk-overview' },
                    { text: 'macOS Basic Integration', link: '/developer-hub/branch-sdks/native-sdks/macos-sdk/mac-os-basic-integration' },
                    { text: 'macOS Advanced Features', link: '/developer-hub/branch-sdks/native-sdks/macos-sdk/mac-os-advanced-features' },
                    { text: 'macOS Testing', link: '/developer-hub/branch-sdks/native-sdks/macos-sdk/mac-os-testing' },
                    { text: 'macOS Version History', link: '/developer-hub/branch-sdks/native-sdks/macos-sdk/mac-os-version-history' }
                  ]
                },
                {
                  text: 'tvOS SDK',
                  collapsed: true,
                  items: [
                    { text: 'tvOS SDK Overview', link: '/developer-hub/branch-sdks/native-sdks/tvos-sdk/tvos-sdk-overview' },
                    { text: 'tvOS Basic Integration', link: '/developer-hub/branch-sdks/native-sdks/tvos-sdk/tvos-basic-integration' }
                  ]
                },
                {
                  text: 'Roku SDK',
                  collapsed: true,
                  items: [
                    { text: 'Roku SDK Overview', link: '/developer-hub/branch-sdks/native-sdks/roku-sdk/sdk-roku-overview' },
                    { text: 'Roku Basic Integration', link: '/developer-hub/branch-sdks/native-sdks/roku-sdk/sdk-roku-basic-integration' },
                    { text: 'Roku Full Reference', link: '/developer-hub/branch-sdks/native-sdks/roku-sdk/sdk-roku-full-reference' },
                    { text: 'Roku Testing', link: '/developer-hub/branch-sdks/native-sdks/roku-sdk/sdk-roku-testing' }
                  ]
                },
                {
                  text: 'Windows SDK',
                  collapsed: true,
                  items: [
                    { text: 'Windows C++ SDK Overview', link: '/developer-hub/branch-sdks/native-sdks/windows-sdk/windows-cpp-sdk-overview' },
                    { text: 'Windows C++ Basic Integration', link: '/developer-hub/branch-sdks/native-sdks/windows-sdk/windows-cpp-basic-integration' },
                    { text: 'Windows C++ Advanced Features', link: '/developer-hub/branch-sdks/native-sdks/windows-sdk/windows-cpp-advanced-features' },
                    { text: 'Windows C++ Testing', link: '/developer-hub/branch-sdks/native-sdks/windows-sdk/windows-cpp-testing' },
                    { text: 'Windows C++ Version History', link: '/developer-hub/branch-sdks/native-sdks/windows-sdk/windows-cpp-version-history' }
                  ]
                }
              ]
            },
            {
              text: 'Plugins and SDK Wrappers',
              collapsed: true,
              items: [
                {
                  text: 'React Native SDK',
                  collapsed: true,
                  items: [
                    { text: 'React Native SDK Overview', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/react-native-sdk/react-native' },
                    { text: 'React Native Basic Integration', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/react-native-sdk/react-native-basic-integration' },
                    { text: 'React Native Advanced Features', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/react-native-sdk/react-native-advanced-features' },
                    { text: 'React Native Full Reference', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/react-native-sdk/react-native-full-reference' },
                    { text: 'React Native Expo Integration', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/react-native-sdk/react-native-expo-integration' }
                  ]
                },
                {
                  text: 'Flutter SDK',
                  collapsed: true,
                  items: [
                    { text: 'Flutter SDK Overview', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/flutter-sdk/flutter-sdk' },
                    { text: 'Flutter Basic Integration', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/flutter-sdk/flutter-sdk-basic-integration' },
                    { text: 'Flutter Full Reference', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/flutter-sdk/flutter-sdk-full-reference' }
                  ]
                },
                {
                  text: 'Xamarin and MAUI',
                  collapsed: true,
                  items: [
                    { text: 'Xamarin MAUI SDK Overview', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/xamarin-and-maui/xamarin-maui-sdk-overview' },
                    { text: 'Xamarin Configuration', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/xamarin-and-maui/xamarin-configuration' },
                    { text: 'MAUI Configuration', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/xamarin-and-maui/maui-configuration' },
                    { text: '.NET Feature Implementation', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/xamarin-and-maui/dotnet-feature-implementation' }
                  ]
                },
                { text: 'Cordova PhoneGap Ionic', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/cordova-phonegap-ionic' },
                { text: 'Unity', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/unity' },
                { text: 'Capacitor', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/capacitor' },
                { text: 'mParticle Android', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/mparticle-android' },
                { text: 'mParticle iOS', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/mparticle-ios' },
                { text: 'Adobe Launch Android SDK', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/adobe-launch-android-sdk' },
                { text: 'Adobe Launch iOS SDK', link: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/adobe-launch-ios-sdk' }
              ]
            }
          ]
        },

        // BRANCH APIs - Server integration (moved up)
        {
          text: 'Branch APIs',
          collapsed: true,
          items: [
            { text: 'APIs Overview', link: '/developer-hub/branch-apis/apis-overview' }
          ]
        },

        // METHODOLOGY - Best practices (moved up)
        {
          text: 'Methodology',
          collapsed: true,
          items: [
            { text: 'Implement Attribution Methods', link: '/developer-hub/methodology/implement-attribution-methods' },
            { text: 'Deduplicate Second Installs with APIs', link: '/developer-hub/methodology/deduplicate-second-installs-with-apis' }
          ]
        },

        // TRACKING - Analytics and events (moved up)
        {
          text: 'Tracking',
          collapsed: true,
          items: [
            {
              text: 'Events',
              collapsed: true,
              items: [
                { text: 'Branch Event Ontology', link: '/developer-hub/tracking/events/branch-event-ontology' },
                { text: 'Create Branch Objects and Events', link: '/developer-hub/tracking/events/create-branch-objects-and-events' }
              ]
            },
            {
              text: 'Google Tag Manager',
              collapsed: true,
              items: [
                { text: 'Google Tag Manager Overview', link: '/developer-hub/tracking/google-tag-manager/google-tag-manager' },
                { text: 'GTM Android', link: '/developer-hub/tracking/google-tag-manager/gtm-android' },
                { text: 'GTM iOS', link: '/developer-hub/tracking/google-tag-manager/gtm-ios' },
                { text: 'GTM Web', link: '/developer-hub/tracking/google-tag-manager/gtm-web' }
              ]
            }
          ]
        },

        // DEEP LINKING - Core functionality (moved up)
        {
          text: 'Deep Linking',
          collapsed: true,
          items: [
            { text: 'iOS Universal Links', link: '/developer-hub/deep-linking/ios-universal-links' },
            { text: 'Android App Links', link: '/developer-hub/deep-linking/android-app-links' },
            { text: 'In-App Routing', link: '/developer-hub/deep-linking/in-app-routing' }
          ]
        },

        // ADS - Attribution and integrations (moved up)
        {
          text: 'Ads',
          collapsed: true,
          items: [
            {
              text: 'SAN (Self-Attributing Networks)',
              collapsed: true,
              items: [
                {
                  text: 'Apple Ads',
                  collapsed: true,
                  items: [
                    { text: 'Configure Apple Ads Token', link: '/developer-hub/ads/sans/apple-ads/configure-apple-ads-token' }
                  ]
                },
                {
                  text: 'Facebook Ads',
                  collapsed: true,
                  items: [
                    { text: 'Facebook Install Referrer', link: '/developer-hub/ads/sans/facebook-ads/facebook-install-referrer' },
                    { text: 'Meta AEM Technical Setup', link: '/developer-hub/ads/sans/facebook-ads/meta-aem-technical-setup' }
                  ]
                },
                {
                  text: 'Google Ads',
                  collapsed: true,
                  items: [
                    { text: 'Google ICM', link: '/developer-hub/ads/sans/google-ads/google-icm' }
                  ]
                }
              ]
            },
            {
              text: 'Non-SAN Partners',
              collapsed: true,
              items: [
                { text: 'Criteo Advanced', link: '/developer-hub/ads/non-sans/custom-ad-partner-technical-guides/criteo-advanced' }
              ]
            },
            {
              text: 'Postbacks',
              collapsed: true,
              items: [
                { text: 'Advanced Postback Configuration', link: '/developer-hub/ads/postbacks/advanced-postback-configuration' },
                { text: 'Conversion Value Mapping Partner API', link: '/developer-hub/ads/postbacks/conversion-value-mapping-partner-api' },
                { text: 'Conversion Value Mapping Partner API Spec', link: '/developer-hub/ads/postbacks/conversion-value-mapping-partner-api-spec' }
              ]
            }
          ]
        },

        // JOURNEYS - Web experiences
        {
          text: 'Journeys',
          collapsed: true,
          items: [
            { text: 'Advanced Journeys Technical Configuration', link: '/developer-hub/journeys/advanced-journeys-technical-configuration' },
            { text: 'Advanced Journeys UI HTML CSS', link: '/developer-hub/journeys/advanced-journeys-ui-html-css' },
            { text: 'Implement Journeys Assist', link: '/developer-hub/journeys/implement-journeys-assist' },
            { text: 'Journeys via AMP', link: '/developer-hub/journeys/journeys-via-amp' }
          ]
        },

        // EMAIL - Integration guides
        {
          text: 'Email',
          collapsed: true,
          items: [
            { text: 'Email Integration for Developers', link: '/developer-hub/email/email-integration-for-developers' }
          ]
        },

        // DATA FEEDS - Integrations
        {
          text: 'Data Feeds',
          collapsed: true,
          items: [
            { text: 'Data Integration Steps for Developers', link: '/developer-hub/data-feeds/data-integration-steps-for-developers' },
            { text: 'Data Integration Webhooks for Developers', link: '/developer-hub/data-feeds/data-integration-webhooks-for-developers' }
          ]
        },

        // ADDITIONAL USE CASES - Advanced scenarios
        {
          text: 'Additional Use Cases',
          collapsed: true,
          items: [
            { text: 'Advanced Deepview Configurations', link: '/developer-hub/additional-use-cases/advanced-deepview-configurations' }
          ]
        },

        // DATA PRIVACY - Compliance (moved to bottom)
        {
          text: 'Data Privacy',
          collapsed: true,
          items: [
            { text: 'Advanced Compliance', link: '/developer-hub/data-privacy/advanced-compliance' },
            { text: 'Consumer Protection Preferences', link: '/developer-hub/data-privacy/consumer-protection-preferences' },
            { text: 'Filtering Ad Network Data', link: '/developer-hub/data-privacy/filtering-ad-network-data' },
            { text: 'Honoring Opt-out of Processing Requests', link: '/developer-hub/data-privacy/honoring-opt-out-of-processing-requests' },
            { text: 'Implement Content Security Protocol CSP', link: '/developer-hub/data-privacy/implement-content-security-protocol-csp' },
            {
              text: 'Apple Privacy',
              collapsed: true,
              items: [
                { text: 'iOS 17 Privacy Overview', link: '/developer-hub/data-privacy/apple/ios-17-privacy-overview' },
                { text: 'Advanced SKAdNetwork SDK Configuration', link: '/developer-hub/data-privacy/apple/advanced-skadnetwork-sdk-configuration' },
                { text: 'Answering the App Store Connect Privacy Questions', link: '/developer-hub/data-privacy/apple/answering-the-app-store-connect-privacy-questions' }
              ]
            },
            {
              text: 'Google Privacy',
              collapsed: true,
              items: [
                { text: 'Answering the Google Play Store Privacy Questions', link: '/developer-hub/data-privacy/google/answering-the-google-play-store-privacy-questions' }
              ]
            }
          ]
        }
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

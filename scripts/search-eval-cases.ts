/**
 * Test cases for the search ranking harness.
 *
 * Sources:
 *   - SearchAnalytics_20May2026 (keyword search panel, ~5k events)
 *   - EddySearches_*_19May2026 (AI search panel, ~5k conversations)
 *
 * Selection: top ~100 queries by combined volume across BOTH channels
 * (because users type into the same input regardless of which engine
 * picks it up). Noise filtered: SQL injection probes, scanner traffic,
 * the 559-times-repeated "What does the letter 'e' refer to?" attack.
 *
 * Expected URLs were chosen by:
 *   1. Heuristic match against slug/title/folder
 *   2. Manual review against the repo's actual content
 *   3. Cross-checking with the AI search topics column
 *
 * Categories:
 *   - "should-rank": we have content; ranker is judged on result position
 *   - "content-gap": no article exists for this query; flagged for the
 *     content team, NOT counted against ranker metrics
 *   - "ambiguous": multiple reasonable answers; pass if ANY acceptable
 *     URL appears in top 3
 */

export type TestCase = {
  query: string
  /** Real-world volume across both search channels combined. */
  volume: number
  /** If set: this exact URL should be #1 for the query to pass. */
  expectedUrl?: string
  /** If set: ANY of these URLs in top 3 counts as a pass. */
  acceptableUrls?: string[]
  /** If true: we know the article doesn't exist; ranker is not measured. */
  contentGap?: boolean
  /** Human-readable note (why we chose this expectation). */
  note?: string
  /** Tag for grouping in reports. */
  intent:
    | 'brand'             // partner / integration name
    | 'sdk-platform'      // iOS/Android/Flutter/etc.
    | 'feature'           // NativeLink, Journeys, etc.
    | 'acronym'           // API, SDK, SSO, SKAN
    | 'api-identifier'    // setIdentity, branch_key
    | 'navigational'      // "api", "sdk" wanting hub overview
    | 'natural-language'  // "how to implement branch SDK"
    | 'ambiguous'
}

export const testCases: TestCase[] = [
  // ============== SDK platforms ==============
  { query: 'web sdk', volume: 46, intent: 'sdk-platform',
    expectedUrl: '/developer-hub/branch-sdks/native-sdks/web-sdk/web-sdk-overview',
    note: 'Web SDK overview page is the canonical landing.' },
  { query: 'ios sdk', volume: 39, intent: 'sdk-platform',
    expectedUrl: '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-sdk-overview' },
  { query: 'android sdk', volume: 17, intent: 'sdk-platform',
    expectedUrl: '/developer-hub/branch-sdks/native-sdks/android-sdk/android-sdk-overview' },
  { query: 'flutter', volume: 16, intent: 'sdk-platform',
    acceptableUrls: [
      '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/flutter-sdk/flutter-sdk',
      '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/flutter-sdk/flutter-sdk-full-reference',
    ] },
  { query: 'react native', volume: 31, intent: 'sdk-platform',
    expectedUrl: '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/react-native-sdk/react-native' },
  { query: 'react', volume: 11, intent: 'sdk-platform',
    acceptableUrls: [
      '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/react-native-sdk/react-native',
    ] },
  { query: 'android', volume: 13, intent: 'sdk-platform',
    acceptableUrls: [
      '/developer-hub/branch-sdks/native-sdks/android-sdk/android-sdk-overview',
      '/developer-hub/branch-sdks/native-sdks/android-sdk/android-troubleshooting',
    ] },
  { query: 'ios', volume: 21, intent: 'sdk-platform',
    acceptableUrls: [
      '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-sdk-overview',
      '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-troubleshooting',
    ] },
  { query: 'web', volume: 9, intent: 'sdk-platform',
    acceptableUrls: [
      '/developer-hub/branch-sdks/native-sdks/web-sdk/web-sdk-overview',
      '/developer-hub/branch-sdks/native-sdks/web-sdk/web-basic-integration',
    ] },
  { query: 'cpp', volume: 9, intent: 'sdk-platform',
    acceptableUrls: [
      '/developer-hub/branch-sdks/native-sdks/windows-sdk/windows-cpp-sdk-overview',
      '/developer-hub/branch-sdks/native-sdks/windows-sdk/windows-cpp-basic-integration',
    ] },

  // ============== Acronyms / navigational ==============
  { query: 'api', volume: 42, intent: 'acronym',
    expectedUrl: '/apidocs/',
    note: 'Should land the API documentation hub.' },
  { query: 'apis', volume: 8, intent: 'acronym',
    expectedUrl: '/apidocs/' },
  { query: 'sdk', volume: 19, intent: 'acronym',
    expectedUrl: '/developer-hub/branch-sdks/native-sdks-overview' },
  { query: 'sso', volume: 14, intent: 'acronym',
    acceptableUrls: [
      '/account-hub/sso/configure-sso',
      '/account-hub/new-branch/configuration-new/security-and-access-new/sso-new',
    ] },
  { query: 'skan', volume: 22, intent: 'acronym',
    acceptableUrls: [
      '/developer-hub/ads/postbacks/skan-postback-api-spec',
      '/developer-hub/data-privacy/apple/supporting-skan-device-level-in-parallel',
    ] },
  { query: 'seo', volume: 14, intent: 'acronym',
    expectedUrl: '/marketer-hub/seo-and-aio/seo-app-attribution' },
  { query: 'aem', volume: 7, intent: 'acronym',
    expectedUrl: '/developer-hub/ads/sans/facebook-ads/meta-aem-technical-setup' },
  { query: 'icm', volume: 16, intent: 'acronym',
    expectedUrl: '/developer-hub/ads/sans/google-ads/google-icm' },
  { query: 'pii', volume: 9, intent: 'acronym',
    acceptableUrls: [
      '/account-hub/data-privacy/third-party-integrations-and-pii',
      '/marketer-hub/custom-pages/miscellaneous/third-party-integrations-and-pii',
    ] },
  { query: 'san', volume: 8, intent: 'acronym',
    acceptableUrls: [
      '/marketer-hub/ads/sans/san-web-tracking',
      '/developer-hub/deep-linking/san-deferred-deep-linking',
    ] },
  { query: 's2s', volume: 7, intent: 'acronym', contentGap: true,
    note: 'No dedicated S2S (server-to-server) page exists.' },

  // ============== Brand / partner integrations ==============
  { query: 'tiktok', volume: 31, intent: 'brand',
    expectedUrl: '/marketer-hub/ads/sans/san-integration-guides/tiktok-for-business/tiktok-for-business',
    note: 'TikTok for Business is the canonical TikTok landing.' },
  { query: 'braze', volume: 23, intent: 'brand',
    acceptableUrls: [
      '/developer-hub/data-feeds/custom-export-provider-technical-guides/braze-configuration',
      '/developer-hub/email/custom-email-partner-technical-guides/braze/braze-sendgrid-configuration',
    ],
    note: 'No single Braze overview; data-feeds Braze config is closest.' },
  { query: 'google', volume: 20, intent: 'brand',
    acceptableUrls: [
      '/marketer-hub/ads/sans/san-integration-guides/google-ads/google-ads',
      '/marketer-hub/ads/sans/san-integration-guides/google-marketing-platform/google-marketing-platform',
    ] },
  { query: 'google ads', volume: 16, intent: 'brand',
    expectedUrl: '/marketer-hub/ads/sans/san-integration-guides/google-ads/google-ads' },
  { query: 'facebook', volume: 17, intent: 'brand',
    expectedUrl: '/marketer-hub/ads/sans/san-integration-guides/facebook-ads/facebook-ads-overview' },
  { query: 'mparticle', volume: 14, intent: 'brand',
    acceptableUrls: [
      '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/mparticle-android',
      '/developer-hub/branch-sdks/plugins-and-sdk-wrappers/mparticle-ios',
      '/developer-hub/data-feeds/custom-export-provider-technical-guides/mparticle-export-configuration',
    ] },
  { query: 'snap', volume: 9, intent: 'brand',
    expectedUrl: '/marketer-hub/ads/sans/san-integration-guides/snap/snap' },
  { query: 'segment', volume: 7, intent: 'brand',
    acceptableUrls: [
      '/developer-hub/data-feeds/custom-export-provider-technical-guides/segment-export-configuration',
      '/developer-hub/data-feeds/custom-import-provider-technical-guides/segment-import-configuration',
    ] },
  { query: 'impact', volume: 7, intent: 'brand',
    expectedUrl: '/marketer-hub/ads/non-sans/custom-ad-partner-integration-guides/impact' },
  { query: 'reddit', volume: 6, intent: 'brand',
    expectedUrl: '/marketer-hub/ads/non-sans/custom-ad-partner-integration-guides/reddit' },
  { query: 'the trade desk', volume: 11, intent: 'brand',
    expectedUrl: '/marketer-hub/ads/non-sans/custom-ad-partner-integration-guides/the-trade-desk' },
  { query: 'trade desk', volume: 9, intent: 'brand',
    expectedUrl: '/marketer-hub/ads/non-sans/custom-ad-partner-integration-guides/the-trade-desk' },
  { query: 'moengage', volume: 8, intent: 'brand',
    expectedUrl: '/developer-hub/data-feeds/custom-export-provider-technical-guides/moengage-configuration' },
  { query: 'sparkpost', volume: 8, intent: 'brand',
    expectedUrl: '/developer-hub/email/custom-email-partner-technical-guides/braze/braze-sparkpost-configuration' },
  { query: 'vibe', volume: 6, intent: 'brand',
    expectedUrl: '/developer-hub/email/custom-sms-partner-technical-guides/vibes-configuration' },
  { query: 'auth0', volume: 6, intent: 'brand',
    acceptableUrls: [
      '/account-hub/sso/configure-sso',
      '/account-hub/new-branch/configuration-new/security-and-access-new/sso-new',
    ],
    note: 'Both SSO pages open with "Branch uses Auth0 to enable single sign-on..."' },

  // ============== Feature names ==============
  { query: 'pam', volume: 23, intent: 'feature',
    expectedUrl: '/marketer-hub/attribution-methodology/predictive-aggregate-measurement/predictive-aggregate-measurement',
    note: 'PAM = Predictive Aggregate Measurement.' },
  { query: 'pam for publishers', volume: 8, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/attribution-methodology/predictive-aggregate-measurement/predictive-aggregate-measurement',
      '/marketer-hub/attribution-methodology/predictive-aggregate-measurement/predictive-aggregate-measurement-data-reference',
    ] },
  { query: 'nativelink', volume: 12, intent: 'feature',
    expectedUrl: '/developer-hub/deep-linking/nativelink-deferred-deep-linking' },
  { query: 'deepview', volume: 13, intent: 'feature',
    expectedUrl: '/marketer-hub/deepviews/deepviews' },
  { query: 'deep view', volume: 7, intent: 'feature',
    expectedUrl: '/marketer-hub/deepviews/deepviews' },
  { query: 'qr code', volume: 15, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/links/qr-codes/qr-codes-overview',
      '/apidocs/qr-code/',
    ] },
  { query: 'qr codes', volume: 8, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/links/qr-codes/qr-codes-overview',
      '/marketer-hub/links/qr-codes/create-qr-codes',
    ] },
  { query: 'qr code api', volume: 11, intent: 'feature',
    expectedUrl: '/apidocs/qr-code/' },
  { query: 'fraud', volume: 11, intent: 'feature',
    expectedUrl: '/marketer-hub/ads/fraud/fraud' },
  { query: 'funnel', volume: 12, intent: 'feature',
    expectedUrl: '/marketer-hub/reports-and-exports/branch-funnel' },
  { query: 'engagement builder', volume: 12, intent: 'feature',
    expectedUrl: '/marketer-hub/ads/engagement-builder/engagement-builder' },
  { query: 'ivy', volume: 7, intent: 'feature',
    expectedUrl: '/marketer-hub/new-branch/campaigns-new/links-new/create-links-new/create-links-with-ivy-new' },
  { query: 'roi hub', volume: 7, intent: 'feature',
    expectedUrl: '/marketer-hub/ads/roi-hub/roi-hub' },
  { query: 'webhook', volume: 13, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/data-feeds/webhooks',
      '/developer-hub/data-feeds/data-integration-webhooks-for-developers',
    ] },
  { query: 'deeplink', volume: 12, intent: 'feature',
    expectedUrl: '/marketer-hub/links/deep-linking',
    note: 'Single-word version of "deep link".' },
  { query: 'deep link', volume: 11, intent: 'feature',
    expectedUrl: '/marketer-hub/links/deep-linking' },
  { query: 'deep link api', volume: 7, intent: 'feature',
    expectedUrl: '/apidocs/deep-linking/',
    note: 'API landing page, not the single createDeepLink operation.' },
  { query: 'deferred deep linking', volume: 10, intent: 'feature',
    acceptableUrls: [
      '/developer-hub/deep-linking/nativelink-deferred-deep-linking',
      '/marketer-hub/ads/sans/san-integration-guides/facebook-ads/facebook-ads-deferred-deep-linking',
    ] },
  { query: 'universal links', volume: 10, intent: 'feature',
    expectedUrl: '/developer-hub/deep-linking/ios-universal-links' },
  { query: 'universal link', volume: 8, intent: 'feature',
    expectedUrl: '/developer-hub/deep-linking/ios-universal-links' },
  { query: 'install referrer', volume: 10, intent: 'feature',
    expectedUrl: '/developer-hub/ads/sans/facebook-ads/facebook-install-referrer' },
  { query: 'journeys', volume: 8, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/journeys/journeys-assist',
      '/marketer-hub/journeys/manage-journeys',
    ] },
  { query: 'journey', volume: 7, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/journeys/journeys-assist',
      '/marketer-hub/journeys/manage-journeys',
    ] },
  { query: 'journeys assist', volume: 7, intent: 'feature',
    expectedUrl: '/marketer-hub/journeys/journeys-assist' },
  { query: 'postback', volume: 12, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/ads/non-sans/postbacks/basic-postback-configuration',
      '/developer-hub/ads/postbacks/postback-macros-functions',
    ] },
  { query: 'link templates', volume: 8, intent: 'feature',
    expectedUrl: '/marketer-hub/links/manage-links/link-templates' },
  { query: 'unified analytics', volume: 7, intent: 'feature',
    expectedUrl: '/marketer-hub/ads/ads-reporting/unified-analytics' },
  { query: 'attribution', volume: 14, intent: 'feature',
    acceptableUrls: [
      '/account-hub/app-settings/attribution-windows',
      '/account-hub/new-branch/configuration-new/attribution-new/attribution-page-new',
    ] },
  { query: 'data retention', volume: 14, intent: 'feature',
    expectedUrl: '/account-hub/data-privacy/data-retention-policy' },
  { query: 'ctv', volume: 19, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/ads/household-measurement/household-measurement',
      '/marketer-hub/ads/sans/san-integration-guides/roku',
    ],
    note: 'household-measurement.md opens with "Users are spending more time with their connected TVs (CTVs)..."' },

  // ============== Events ==============
  { query: 'event', volume: 16, intent: 'feature',
    acceptableUrls: [
      '/developer-hub/tracking/events/branch-event-ontology',
      '/developer-hub/tracking/events/track-branch-events',
    ] },
  { query: 'events', volume: 11, intent: 'feature',
    acceptableUrls: [
      '/developer-hub/tracking/events/track-branch-events',
      '/developer-hub/tracking/events/branch-event-ontology',
    ] },
  { query: 'event tracking', volume: 8, intent: 'feature',
    expectedUrl: '/developer-hub/tracking/events/track-branch-events' },
  { query: 'track events', volume: 11, intent: 'feature',
    expectedUrl: '/developer-hub/tracking/events/track-branch-events' },
  { query: 'track branch events', volume: 11, intent: 'feature',
    expectedUrl: '/developer-hub/tracking/events/track-branch-events' },
  { query: 'track', volume: 10, intent: 'feature',
    acceptableUrls: [
      '/developer-hub/tracking/events/track-branch-events',
      '/marketer-hub/ads/sans/san-web-tracking',
    ] },
  { query: 'events api', volume: 7, intent: 'api-identifier', contentGap: true,
    note: 'Events API spec not yet in /apidocs/.' },

  // ============== API identifiers / parameter-style queries ==============
  { query: 'setidentity', volume: 16, intent: 'api-identifier',
    acceptableUrls: [
      '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-advanced-features',
      '/developer-hub/branch-sdks/native-sdks/ios-sdk/ios-full-reference',
      '/developer-hub/branch-sdks/native-sdks/android-sdk/android-advanced-features',
      '/developer-hub/branch-sdks/native-sdks/android-sdk/android-full-reference',
    ],
    note: 'setIdentity is documented on advanced-features and full-reference pages, not the SDK overviews.' },
  { query: 'branch key', volume: 12, intent: 'api-identifier',
    acceptableUrls: [
      '/account-hub/new-branch/configuration-new/security-and-access-new/credentials-new',
      '/account-hub/user-accounts-and-permissions/profile-settings',
    ] },
  { query: 'branch app id', volume: 10, intent: 'api-identifier',
    acceptableUrls: [
      '/account-hub/new-branch/configuration-new/security-and-access-new/credentials-new',
      '/account-hub/app-settings/add-additional-apps',
    ] },
  { query: 'branch_force_new_session', volume: 6, intent: 'api-identifier', contentGap: true,
    note: 'Specific deep-link param; appears in body text only.' },
  { query: 'attribution api', volume: 7, intent: 'api-identifier', contentGap: true },
  { query: 'quick link api', volume: 13, intent: 'api-identifier', contentGap: true,
    note: 'Quick Links API spec not yet in /apidocs/.' },
  { query: 'query api', volume: 12, intent: 'api-identifier', contentGap: true },
  { query: 'custom export api', volume: 10, intent: 'api-identifier', contentGap: true },
  { query: 'custom exports api', volume: 5, intent: 'api-identifier', contentGap: true },
  { query: 'export api', volume: 9, intent: 'api-identifier', contentGap: true },
  { query: 'customer event alias', volume: 13, intent: 'api-identifier', contentGap: true,
    note: 'Param appears in Facebook Aggregate Event Measurement context only.' },

  // ============== Reports / exports / data feeds ==============
  { query: 'data feeds', volume: 21, intent: 'navigational',
    acceptableUrls: [
      '/marketer-hub/data-feeds/data-integration-implementation-guide',
      '/developer-hub/data-feeds/data-integration-steps-for-developers',
    ],
    note: 'Branch markets this as "Data Integrations"; folder is data-feeds. Implementation guides serve as landings.' },
  { query: 'advanced data feeds', volume: 7, intent: 'navigational', contentGap: true },
  { query: 'custom exports', volume: 8, intent: 'feature',
    expectedUrl: '/marketer-hub/reports-and-exports/dashboard-custom-exports' },
  { query: 'daily export', volume: 8, intent: 'feature',
    expectedUrl: '/marketer-hub/reports-and-exports/dashboard-daily-exports' },
  { query: 'scheduled log exports', volume: 13, intent: 'feature', contentGap: true,
    note: 'Scheduled Log Exports API exists per apis-overview but spec not migrated.' },
  { query: 'export', volume: 8, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/reports-and-exports/dashboard-exports',
      '/marketer-hub/reports-and-exports/dashboard-custom-exports',
      '/marketer-hub/reports-and-exports/dashboard-daily-exports',
    ],
    note: 'Dashboard Exports is the section landing; custom/daily are sub-pages.' },
  { query: 'data export', volume: 8, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/reports-and-exports/dashboard-exports',
      '/marketer-hub/reports-and-exports/dashboard-custom-exports',
      '/marketer-hub/reports-and-exports/dashboard-daily-exports',
    ] },

  // ============== Links / settings ==============
  { query: 'custom domain', volume: 41, intent: 'feature',
    acceptableUrls: [
      '/account-hub/link-settings/basic-link-configuration',
      '/account-hub/new-branch/configuration-new/link-controls-new/link-appearance-new',
    ],
    note: 'No standalone article, but basic-link-configuration has a substantial custom-domain section. Worth a dedicated page eventually (vol 41).' },
  { query: 'link domain', volume: 7, intent: 'feature',
    acceptableUrls: [
      '/account-hub/link-settings/basic-link-configuration',
      '/account-hub/new-branch/configuration-new/link-controls-new/link-appearance-new',
    ] },
  { query: 'long link', volume: 9, intent: 'feature',
    acceptableUrls: [
      '/account-hub/link-settings/additional-link-configuration',
      '/account-hub/link-settings/troubleshooting-link-formatting-errors',
    ] },
  { query: 'long links', volume: 7, intent: 'feature',
    acceptableUrls: [
      '/account-hub/link-settings/additional-link-configuration',
      '/account-hub/link-settings/troubleshooting-link-formatting-errors',
    ] },
  { query: 'quick link', volume: 16, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/links/create-links/short-links/create-app-links',
      '/marketer-hub/links/create-links/short-links/create-web-links',
    ],
    note: 'No dedicated Quick Links article; closest are create-app-links/create-web-links.' },
  { query: 'link', volume: 7, intent: 'navigational',
    acceptableUrls: [
      '/marketer-hub/links/deep-linking',
      '/account-hub/link-settings/link-configuration-faq',
    ] },

  // ============== Ad partners (generic) ==============
  { query: 'custom ad partner', volume: 12, intent: 'feature',
    expectedUrl: '/marketer-hub/ads/non-sans/ad-partner-integration-guide' },
  { query: 'ad partner', volume: 9, intent: 'feature',
    expectedUrl: '/marketer-hub/ads/non-sans/ad-partner-integration-guide' },
  { query: 'ad partners', volume: 10, intent: 'feature',
    expectedUrl: '/marketer-hub/ads/non-sans/ad-partner-integration-guide' },
  { query: 'ad', volume: 6, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/ads/non-sans/ad-partner-integration-guide',
      '/marketer-hub/ads/ads-overview',
    ] },

  // ============== Users / agencies / accounts ==============
  { query: 'agency', volume: 11, intent: 'feature',
    acceptableUrls: [
      '/account-hub/user-accounts-and-permissions/agency-users/add-agency-users',
      '/account-hub/user-accounts-and-permissions/agency-users/grant-an-agency-access',
      '/account-hub/user-accounts-and-permissions/agency-users/agency-profile',
    ] },
  { query: 'privacy', volume: 7, intent: 'navigational',
    acceptableUrls: [
      '/account-hub/data-privacy/sdk-privacy-controls',
      '/account-hub/data-privacy/best-practices-to-minimize-data-sent-to-branch',
    ] },
  { query: 'test mode', volume: 7, intent: 'feature',
    acceptableUrls: [
      '/account-hub/testing-and-monitoring/add-test-devices',
      '/account-hub/new-branch/configuration-new/testing-and-monitoring-new/add-and-manage-test-devices-new',
    ] },

  // ============== Email / SMS ==============
  { query: 'email', volume: 8, intent: 'navigational',
    expectedUrl: '/marketer-hub/email-and-sms/email-overview' },
  { query: 'universal email', volume: 7, intent: 'feature',
    expectedUrl: '/marketer-hub/email-and-sms/universal-email-link-debugger' },

  // ============== Natural-language questions ==============
  { query: 'how to implement branch sdk', volume: 7, intent: 'natural-language',
    expectedUrl: '/developer-hub/branch-sdks/native-sdks-overview',
    note: 'Stopword filter must reduce this to "implement branch sdk".' },

  // ============== Cost / ROI ==============
  { query: 'cost', volume: 8, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/ads/roi-hub/templates-for-cost-data',
      '/marketer-hub/ads/roi-hub/share-cost-data-with-branch/cost-data-via-email-import',
    ] },

  // ============== Round 2 additions (caught by Opus audit) ==============
  { query: 'link data', volume: 14, intent: 'ambiguous',
    acceptableUrls: [
      '/developer-hub/deep-linking/technical-deep-linking-for-developers',
      '/developer-hub/deep-linking/in-app-routing',
      '/marketer-hub/links/deep-link-reference',
    ],
    note: 'Spans many pages; any in top-3 acceptable.' },
  { query: 'san ddl', volume: 10, intent: 'feature',
    expectedUrl: '/developer-hub/deep-linking/san-deferred-deep-linking',
    note: 'SAN Deferred Deep Linking — direct one-to-one.' },
  { query: 'change email', volume: 9, intent: 'feature',
    expectedUrl: '/account-hub/user-accounts-and-permissions/manage-user-profile',
    note: 'User profile management page handles email changes.' },
  { query: 'facebook data', volume: 8, intent: 'brand',
    acceptableUrls: [
      '/marketer-hub/ads/sans/san-integration-guides/facebook-ads/facebook-ads-overview',
      '/marketer-hub/ads/sans/san-integration-guides/facebook-ads/facebook-ads-data-reporting',
    ] },
  { query: 'predictive aggregate measurement', volume: 6, intent: 'feature',
    expectedUrl: '/marketer-hub/attribution-methodology/predictive-aggregate-measurement/predictive-aggregate-measurement',
    note: 'Same target as "pam"; tests whether full-phrase queries work as well as the acronym.' },
  { query: 'smart banner', volume: 5, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/journeys/journeys-overview',
      '/marketer-hub/journeys/journeys-assist',
      '/marketer-hub/journeys/manage-journeys',
      '/marketer-hub/journeys/create-journeys/create-journey-banner-or-interstitial',
    ],
    note: '"Smart banners" is a common synonym for Journeys; the section overview is a valid landing.' },
  { query: 'att prompt', volume: 5, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/skadnetwork-and-ios/ios-14-faqs/apptrackingtransparency-faq',
      '/marketer-hub/skadnetwork-and-ios/ios-attribution-best-practices',
    ] },
  { query: 'web to app', volume: 6, intent: 'feature',
    expectedUrl: '/marketer-hub/journeys/journeys-use-cases/web-to-app' },
  { query: 'skan conversion center', volume: 8, intent: 'feature',
    acceptableUrls: [
      '/marketer-hub/ads/sans/san-integration-guides/tiktok-for-business/tiktok-skadnetwork',
      '/developer-hub/data-privacy/apple/supporting-skan-device-level-in-parallel',
    ] },
  { query: 'redirect allowlist', volume: 5, intent: 'feature',
    acceptableUrls: [
      '/account-hub/link-settings/advanced-link-configuration',
      '/account-hub/new-branch/configuration-new/link-controls-new/link-routing-rules-new',
    ] },
]

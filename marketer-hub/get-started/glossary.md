---
title: "Glossary"
slug: glossary
---

Use this glossary to learn about terms commonly used in Branch. To submit a term to be added, submit feedback at the bottom of the article.

## Deep linking

| Term | Related Terms | Definition |
| --- | --- | --- |
| **Universal Resource Identifier (URI)** |  | A unique address that apps register with the operating system to handle specific link formats (like http:// or custom schemes). When a user clicks a link with a registered URI, the OS opens the associated app. If no app is registered for that URI, the OS displays an error message. |
| **Deep Linking** |  | Links that direct users to specific content within a mobile app rather than just opening the app's home screen. When users click a deep link and have the app installed, they're taken directly to the relevant content shown in the link. |
| **Universal Links** |  | Apple's iOS deep linking technology that opens apps seamlessly without showing a permission dialog. If the app isn't installed, users are redirected to a web browser. This technology works primarily in Apple platforms like Safari and iMessage. |
|  | Apple App Site Association (AASA) | A JSON file that websites must host to enable Universal Links. The AASA file tells iOS which app should open when users click links from that domain. |
| **Android App Links** |  | Android's deep linking technology that opens apps directly without showing the app selection dialog. If the app isn't installed, users are redirected to a web browser. |
|  | Digital Asset Links (DAL) | A JSON file that websites must host to enable Android App Links. The DAL file tells Android which app should open when users click links from that domain. |
| **Facebook App Links** |  | Facebook's deep linking standard that uses special HTML meta tags on web pages to open apps through URI schemes when links are clicked within Facebook. |
| **Chrome Intents** |  | A deep linking method for Android Chrome browsers that uses special HTML code embedded in web pages to open apps directly. |
| **Deferred Deep Link** |  | A deep link that works even when users don't have the app installed. After clicking the link, users are taken to download the app, then automatically directed to the intended content on first launch. |
| **App Indexing** |  | Google's legacy system that creates a 1:1 mapping between website URLs and app content. No longer recommended by Google. |

## Matching and attribution

| Term | Related Terms | Definition |
| --- | --- | --- |
| **Browser Cookie** |  | A small data file stored by web browsers to track user identity and behavior. Cookies are isolated to each browser and cannot be accessed by other browsers or apps, limiting their use for cross-platform attribution. |
| **Query Parameter** |  | Data appended to the end of a URL after a question mark to pass information about the link source. For example, in "https://www.espn.com/?utm\_medium=email", the query parameter "utm\_medium=email" indicates the link came from an email campaign. |
| **Device ID** |  | A unique identifier provided by iOS and Android that lets app developers track individual devices. Device IDs are only accessible within apps, not from web browsers. |
|  | IDFA | Apple's Identifier for Advertisers. A device-level identifier that works across all apps on iOS devices, allowing ad networks to track users and show targeted ads. Users can reset their IDFA or opt out of tracking at any time. |
|  | IDFV | Apple's Identifier for Vendor. A persistent identifier that remains the same for all apps from the same developer (like Facebook and Facebook Messenger) but differs for apps from different developers. Used as a fallback when IDFA is unavailable. |
| **Attribution** |  | The practice of identifying which marketing campaigns drive specific user actions, allowing marketers to measure campaign effectiveness and ROI. Attribution can track web-only, app-only, or cross-platform user behavior. |
| **Biased Attribution** |  | Attribution data from platforms that have a financial interest in claiming credit for conversions (like ad networks reporting on their own ad performance). Third-party attribution providers offer more objective measurement. |
| **Attribution Window** |  | The time period during which a conversion (like an app install) can be credited to a marketing touchpoint (like a link click). For example, a 7-day attribution window means installs within 7 days of a click are attributed to that click. |
| **People-Based Attribution** |  | Attribution that tracks individual users across devices and platforms, preventing the same person from being counted multiple times when they switch between mobile and web. |
| **Last-Touch Attribution** |  | An attribution model that gives 100% credit to the most recent marketing touchpoint before a conversion. |
| **Multi-Touch Attribution** |  | An attribution model that distributes credit across all marketing touchpoints that contributed to a conversion. |
| **View-Through Attribution** |  | Attribution that credits conversions to ad impressions even when users didn't click the ad, measuring the impact of simply seeing an advertisement. |
| **Monthly Active Users (MAU)** |  | The number of unique users who engaged with an app at least once during a calendar month, measured at the device level. |

## Branch platform terms

| Term | Related Terms | Definition |
| --- | --- | --- |
| **SDK** |  | Software Development Kit. A package of tools and code that developers integrate into their apps to add specific functionality. Branch provides SDKs for iOS, Android, web, and other platforms to enable deep linking and attribution. |
| **API** |  | Application Programming Interface. A set of protocols that allows different software systems to communicate with each other. SDKs typically include APIs but also provide additional tools and documentation to make integration easier. |
| **Branch Dashboard** |  | The web interface where users manage their Branch account, view analytics, create links and banners, configure integrations, manage team members, and export data. |
|  | Liveview | A real-time dashboard showing event data as it happens. |
|  | Short Link | A Branch link created directly in the dashboard interface. |
| **App Link** |  | Branch's default link domain provided to all customers. App links direct users to apps or specific app content and require an active website to function properly. |
| **Short Link** |  | A Branch link with a custom alias added to the end of the domain for easy sharing and recognition. For example, in "https://espn.app.link/sms", "sms" is the alias. |
| **Dynamic Long Link** |  | A Branch link that includes multiple query parameters to pass data directly in the URL. For example, "https://espn.app.link?example=one&~campaign=test" sends key-value pairs into the app without requiring dashboard configuration. |
| **3p Link** |  | Third-party link. A Branch link formatted to meet the specific requirements of external platforms like ad networks or SMS providers. |

## Branch analytics

| Term | Definition |
| --- | --- |
| **Event Ontology (EO)** | Branch's standardized event taxonomy for consistent analytics tracking across platforms. |
| **Pageview** | Measured each time a webpage loads with the Branch Web SDK initialized. |
| **Branch CTA View (View)** | Counted when a Branch banner or Deepview loads and displays in a user's browser. |
| **Web Session Start** | Measured when a webpage with the Branch Web SDK opens in a new tab or when a user arrives via a Branch link. |
| **Impression** | Counted when a paid advertisement displays on a user's screen, tracked through Branch's Mobile Measurement Partner (MMP) API or Branch Links. |
| **Click** | Counted each time a user clicks a Branch link. |
| **Install** | Measured the first time a user opens an app after downloading it to a device. |
| **Open** | Counted each time a user opens an app after the initial install. |
| **Reinstall** | Measured when a user downloads and opens an app they previously uninstalled. |
| **Unique** | Events deduplicated at the user level. For example, if the same user clicks a link twice, it counts as one unique click. |
| **Click-to-Install (CTI)** | The percentage of link clicks that result in app installs, calculated as installs divided by clicks. |
| **Click-Through Rate (CTR)** | The percentage of ad impressions or views that result in clicks, calculated as clicks divided by impressions. |
| **Click-to-Open (CTO)** | The percentage of link clicks that result in app opens, calculated as opens divided by clicks. |

## Branch product-specific terminology

| Term | Related Terms | Definition |
| --- | --- | --- |
| **In-App Sharing** |  | Using Branch SDKs to let users share deep links from within your app or website to drive conversions. |
|  | Referrals | Branch's reward tracking system that works with in-app sharing to reward users when their shared links drive conversions. |
| **App-to-App** |  | Using Branch Links within one app to route users to content in a different app. |
| **Event Tracking** |  | Using Branch SDKs to track custom user actions (like purchases or signups) and connect them to marketing campaigns through Branch's attribution engine. |
|  | Cohort Analysis | Grouping users by shared characteristics or behaviors within a time period (like "users who signed up last week") to compare both engagement volume and quality across campaigns. |
| **Web-to-App** |  | Branch products that drive traffic from websites into mobile apps. |
|  | Journeys | Branch's smart banners that display on web pages to encourage users to install or open your app. |
|  | Accelerated Mobile Pages (AMPs) | Google's framework for building fast-loading mobile web pages. While AMP pages load quickly and rank well in search, standard links within AMP content redirect to search results rather than deeper content. |
|  | Text Me the App (TMTA) | A Branch Web SDK feature for desktop websites that lets users text themselves a download link to get your app on their phone. |
|  | Deepviews | Dynamically generated web pages that preview app content before users install or open the app, built automatically from data in Branch Links. |
| **Data Feeds** |  | Branch features that enable advanced data export capabilities. |
|  | Webhooks | Real-time server notifications triggered when specific events occur, also called "postbacks." |
|  | Data Integration | Sending Branch event data to third-party analytics platforms through automated webhooks. Event Ingestion is the reverse: importing events from third parties into Branch. |
|  | Export API | An API endpoint that lets you download user-level data as CSV files for any day within the past week. |
|  | Query API | An API endpoint to retrieve the same campaign-level analytics data shown in the Branch dashboard. |
| **Ads** |  | Branch's advertising product that enables deep linking in ads and provides last-touch attribution across all ad networks and platforms. |
|  | Publisher | A website or app that sells advertising space on their platform. |
|  | Advertiser | A company that buys advertising space to promote their products or services. |
|  | Ad Networks | Companies that connect advertisers with publishers who want to display ads. |
|  | Supply-Side Platform (SSP) | A platform that helps publishers manage, sell, and optimize their ad inventory by listing it and collecting bids from advertisers. |
|  | Demand-Side Platform (DSP) | A platform that lets advertisers manage ad purchases across multiple ad networks and publishers through a single interface. |
|  | SAN, non-SAN | Self-Attributing Networks are ad platforms (like Facebook or Google) that track and attribute conversions within their own ecosystems. Non-SANs rely on third-party attribution providers like Branch. |
|  | MMP | Mobile Measurement Partner. A designation used by Self-Attributing Networks to identify approved third parties that can access their private APIs. |
|  | Fraud | Malicious activity that artificially generates ad engagement to steal advertising budgets. Branch provides fraud detection to identify suspicious activity patterns. |
|  | Cost Ingestion | Branch's ability to import ad spend data from select ad networks and display it alongside campaign performance metrics in the dashboard. |
| **Email** |  | Branch's email product that tracks Branch link usage in marketing emails and sends click data back to email service providers for reporting. |
|  | ESP | Email Service Provider. Marketing platforms like Salesforce that send large-scale email campaigns. |
|  | CTD | Click Tracking Domain. A redirect applied to email links to track clicks, typically by email service providers. Redirects can prevent iOS Universal Links from working properly. |
|  | Simplified Integration | A Branch email integration method that uses a CNAME pointing to Branch to automate setup. Includes Auto-Branchify, which automatically converts standard web links to Branch Links in emails. |

## Other related terminology

| Term | Definition |
| --- | --- |
| **Ad Stacking** | A fraud technique where multiple ads are layered in one placement, with only the top ad visible. Advertisers are charged for all ads in the stack despite users seeing only one. |
| **Click Hijacking** | Fraud where malware embedded in legitimate apps detects real ad clicks and immediately generates fake clicks, stealing credit for the conversion. |
| **Click Injection** | Similar to click hijacking. Malicious apps detect when users download legitimate apps and report fake clicks to claim credit for those installs. |
| **Click Flooding** | Fraud where bots generate massive numbers of clicks across many device IDs, aiming to claim credit for organic installs by being the last recorded click before installation. |
| **Device ID Reset Fraud** | Fraud exploiting Apple's IDFA reset feature to repeatedly install, use, and uninstall apps, generating multiple install events from a single device. |
| **Mobile Ad Fraud** | Any fraudulent activity designed to steal advertising budgets, typically by falsely claiming credit for conversions that would have happened organically. |
| **Emulated Devices** | Mobile operating systems running on non-mobile hardware, useful for app testing but also exploitable for fraud through scripted interactions. |
| **Phone Farm** | Operations using multiple physical devices simultaneously to artificially generate app activity or engagement at scale. |
| **Cookie Stuffing** | Illegal practice where third-party cookies from unrelated websites are placed in users' browsers without their knowledge to falsely claim affiliate commissions. |
| **ARPU** | Average Revenue Per User. Total revenue divided by number of users over a time period (typically monthly or annually), used to assess app profitability. |
| **CPA** | Cost Per Action. Total campaign cost divided by the number of user actions (like purchases or signups), measuring the cost of acquiring each conversion. |
| **CPC** | Cost Per Click. Total ad cost divided by total clicks, measuring what advertisers pay for each click on their ads. |
| **CPI** | Cost Per Install. Total ad spend divided by number of app installs, measuring how much it costs to acquire each new app user. |
| **LTV** | Lifetime Value. The total revenue a user is expected to generate over their entire relationship with your app or business. |
| **Retention Rate** | The percentage of users who continue using an app after installation, calculated by dividing active users by total installs over a time period. |
| **KPI** | Key Performance Indicator. Metrics used to measure progress toward business objectives, typically focused on cost reduction, revenue growth, customer satisfaction, or process improvement. |
| **K-Factor** | A measure of app virality showing how many new users each existing user brings in through sharing, calculated as: (install→activation rate) × (activation→share rate) × (share→new install rate). |
| **Matching Accuracy** | The confidence level (expressed as a percentage) that an attribution provider has in correctly linking user behavior across web and mobile app platforms. |
| **Conversion Rate** | The percentage of users who complete a desired action, calculated as conversions divided by total users or sessions. |
| **Fragmentation** | The challenge of deep linking across platforms, where each major platform (iOS, Android, Facebook, etc.) has different standards and requirements. |
| **Retargeting** | Showing targeted ads to users based on their previous interactions with your app or website, enabled by people-based attribution that identifies users across sessions. |
| **Dormant User** | Users who were previously active but haven't engaged with your app or website for an extended period. |
| **User Agent** | Information sent by browsers identifying the device type and operating system, used by servers to optimize content delivery and by attribution systems for device matching. |
| **Hosted Deep Links** | Deep links managed through a platform that handles all the different deep linking standards and technologies across platforms. |
| **Mobile Banners and Interstitials** | Web-based call-to-action messages encouraging users to open or install an app. Banners occupy a small portion of the screen, while interstitials cover most or all of it. Smart banners automatically display "Open" or "Install" based on app installation status. |
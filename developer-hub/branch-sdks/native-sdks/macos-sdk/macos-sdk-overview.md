---
title: "macOS SDK Overview"
slug: macos-sdk-overview
---

::: tip SDK Stats
**Open Source Github Repo**: <https://github.com/BranchMetrics/mac-branch-deep-linking>

**Minimum XCode version**: 12+

**Minimum OS version**: macOS 10.15+
:::

### Basic Integration

**Click below for the Basic Integration Guide implementing the Branch macOS SDK.**

[INTEGRATE BRANCH SDK](mac-os-basic-integration.md)

### Advanced Integration

**Click below for the Advanced Integration Guide implementing the Branch macOS SDK.**

[IMPLEMENT ADVANCED FEATURES](mac-os-advanced-features.md)

### Branch Demo App

**Want to take our technology for a test drive before implementing it?**

[VIEW BRANCH TESTBED GITHUB](https://github.com/BranchMetrics/mac-branch-deep-linking/tree/master/Examples/TestBed-macOS)

### Testing Implementation

**Test your Branch integration before your app goes live.**

[TEST THE INTEGRATION](mac-os-testing.md)

### Version History

**View past versions of the Branch SDK for macOS including changes.**

[VIEW VERSION HISTORY](mac-os-version-history.md)

### SDK Functionality

| Functionality | Description | Supported |
| --- | --- | --- |
| Deep Linking | **What:** Branch’s deep links store contextual information about where a user wants to go, where the link was clicked, who originally shared the link, and an almost unlimited amount of custom data. **Why:** This empowers you to build powerful personalization features to provide users better experiences and happier, stickier users. | ✅ |
| Deferred Deep Linking | **What:** Deep link users to relevant content immediately after first install. **Why:** Deferred deep linking allows a user to click on a link, install an app associated with the link, and then visit the content associated with that link in the newly installed app. **Deferred deep linking is inherently included in Branch's deep linking capabilities. There is no additional setup!** | ✅ |
| Intelligent Fallback Logic | **What:** Branch routes users based on the link behaviors you specify in your account. This includes redirects for android (phone + tablet), ios (phone + tablet), desktop (Mac + Windows), and social media previews. **Why:** Ensure no matter what platform the user is currently using, your Branch Link routes them to the best experience possible. Doing so also reduces user drop-off, thereby increasing your conversion rates. | ✅ |
| Send to Desktop App Store When App Not Installed | **What:** At this time, Branch will route users without your native desktop app to your Default Desktop URL instead of the Desktop App Store. The option to route users to the Desktop App Store instead of your Default Desktop URL is on the product roadmap. | ❌ |
| Universal Links | **What:** Universal Links serve as standard web links (i.e., [www.branch.io](http://www.branch.io)), but point to a website page and content in the app. This standard was invented to provide developers with a graceful fallback if the app was not installed on a user's phone, and to remove URI schemes from the mobile ecosystem. **Why:** Branch makes using Universal Links simple while greatly improving on them by offering full attribution, supporting edge cases where Universal Links fail, and allowing you to deep link when the user doesn't have your app installed. | ✅ |
| Branch Universal Objects (BUO) | **What:** The Branch Universal Object represents content to be shared or indexed with Branch. It acts as a container upon which all metadata and link properties are passed in and carried to your application. Use the BUO to create, share or index links and register events related to that content. **Why:**  The BUO is an easy, powerful way to catalog the content in your application, and its proper usage provides you with clear-cut analytics about how your users are interacting with that content. At the same time, its easy link generation capabilities empower your users to bring more readers, shoppers, or subscribers directly into the app. These users are going to be much more engaged because they were invited by a friend and were able to see the content they wanted to see immediately after installing the app. | ✅ |
| Branch Standard Events | **What:** Branch macOS SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box). However, Branch supports 25 standard events covering commerce, content and lifestyle events that you can measure. **Why:** By measuring a wide variety of events, you can more efficiently optimize both the functionality of your app and your advertising strategies. Measuring events and understanding how your users interact with your app directly impacts your ability to build effective and ROI positive advertising campaigns by enabling you to compare retention, engagement and LTV to your costs. | ✅ |
| Branch Custom Events | **What:** Custom events are simply events at are unique to your app and therefore require custom implementation to accurately capture. **Why:** By measuring a wide variety of events, you can more efficiently optimize both the functionality of your app and your advertising strategies. Measuring events and understanding how your users interact with your app directly impacts your ability to build effective and ROI positive advertising campaigns by enabling you to compare retention, engagement and LTV to your costs. | ✅ |
| Set Request Metadata | **What:** Before the Branch SDK initializes a session, it can retrieve metadata to be included in the session measurement process. **Why:** Certain Data Integration Partners require you to pass through the specific identifiers to the Branch SDKs before session initialization to ensure Branch measured events can be correctly correlated in the Data Integration Partner's platform. | ✅ |
| Dedicated Redirect Parameters | **What:** In addition to the default redirects you have in place at the app-level, you can also use a dedicated redirect parameter at the link-level. When this platform-specific parameter is manually added to a link, Branch routes any user who clicks on it to the destination URL you provide; overriding the default redirect settings at the app-level. **Why:**  Give yourself the flexibility to control where your users are sent to when you want a different experience than the default landing page you've specified at the app-level. Particularly useful when running campaigns targeting a non-standard use case as you don't have to change your global redirect settings. | ✅ |
| Persist User Identities | **What:** Often, you might have your own user IDs, or want referral and event data to persist across platforms or the uninstall/reinstall of your app. **Why:** Persisting a user's identity can be very helpful to asses if your users access your service from different devices, thereby providing a more complete story of your user. | ✅ |
| Disable User Tracking | **What:** If a user indicates that they want to limit collection of their data on your app or website, or if you otherwise determine that a particular end user’s data should not be collected or otherwise processed, you can continue to make use of the Branch’s SDK (e.g. for creating and sharing Branch Links) while not tracking that end user. **Why:** We collect limited device information to power our deep linking technology and to provide attribution and analytics services. However, we understand that some end-users would like to opt out of this data processing; and, in other cases, the law (or Branch’s policies) do not permit that certain types of personal data for certain end users be provided to Branch (for example, data relating to children under the age of 13). | ✅ |
| Short Links | **What:** Short Links are the most common deep link and are highly customizeable. You can customize the subdomain of `example.app.link`,change to your own personal domain `links.yoursite.com`, or tailor the appearance of the Short Link to a custom alias during creation (e.g. `https://example.app.link/october-sale`). **Why:** Short Links allow you to present branded, short and to the point links that are visually easy to digest. | ✅ |
| Push Notifications | **What:** Deep link into specific app content directly from a push notification on the user's device. | ❌ |
| Last Attributed Touch Data (LATD) | **What:** Last attributed touch data contains the information associated with that user's last viewed impression or clicked link. | ❌ |
| SDK Logging | **What:** The Branch SDK for macOS is instrumented with a built-in logger so you can log API calls you make with the SDK. **Why:** Turning the logger on allows you to surface request and response bodies, that are JSON formatted. | ✅ |
---
title: "Windows SDK Overview"
slug: windows-cpp-sdk-overview
---

### SDK Stats

**Open Source Github Repo**: <https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution>

**Minimum Visual Studio** version 2019+

### Branch Demo App

**Want to take our technology for a test drive before implementing it?**

[VIEW BRANCH TESTBED GITHUB](https://github.com/BranchMetrics/cpp-branch-deep-linking-attribution/tree/master/BranchSDK-Samples/TestBed)

### Basic Integration

For steps on how to integrate the Branch Web SDK and validate your integration, visit our Basic Integration guide.

[INTEGRATE THE BRANCH SDK](https://help.branch.io/developers-hub/docs/windows-cpp-basic-integration)

### Testing Implementation

**Test your Branch integration before your app goes live.**

[TEST THE INTEGRATION](windows-cpp-testing.md)

### Version History

**View past versions of the Branch SDK for Win32 C++ including changes.**

[VIEW VERSION HISTORY](windows-cpp-version-history.md)

### SDK Functionality

| Functionality | Description | Supported |
| --- | --- | --- |
| Deep Linking | **What:** Branch’s deep links store contextual information about where a user wants to go, where the link was clicked, who originally shared the link, and an almost unlimited amount of custom data. **Why:** This empowers you to build powerful personalization features to provide users better experiences and happier, stickier users. | ✅ |
| Deferred Deep Linking | **What:** Deep link users to relevant content immediately after first install. **Why:** Deferred deep linking allows a user to click on a link, install an app associated with the link, and then visit the content associated with that link in the newly installed app. **Deferred deep linking is inherently included in Branch's deep linking capabilities. There is no additional setup!** | ✅ |
| Intelligent Fallback Logic | **What:** Branch routes users based on the link behaviors you specify in your account. This includes redirects for android (phone + tablet), ios (phone + tablet), desktop (Mac + Windows), and social media previews. **Why:** Branch's behavior for desktop link redirects is under development pending user testing. Currently, if the URI scheme provided does not load, the end user will experience a blank page. | ❌ |
| Send to Desktop App Store When App Not Installed | **What:** At this time, Branch will route users without your native desktop app to your Default Desktop URL instead of the Desktop App Store. The option to route users to the Desktop App Store instead of your Default Desktop URL is on the product roadmap. | ❌ |
| Universal Links | **What:** Universal Links serve as standard web links (i.e., [www.branch.io](http://www.branch.io)), but point to a website page and content in the app. This standard was invented to provide developers with a graceful fallback if the app was not installed on a user's phone, and to remove URI schemes from the mobile ecosystem. | ❌ |
| Branch Universal Objects (BUO) | **What:** The Branch Universal Object represents content to be shared or indexed with Branch. It acts as a container upon which all metadata and link properties are passed in and carried to your application. | ❌ |
| Branch Standard Events | **What:** Branch Win32 C++ SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box). However, Branch supports 25 standard events covering commerce, content and lifestyle events that you can measure. **Why:** By measuring a wide variety of events, you can more efficiently optimize both the functionality of your app and your advertising strategies. Measuring events and understanding how your users interact with your app directly impacts your ability to build effective and ROI positive advertising campaigns by enabling you to compare retention, engagement and LTV to your costs. | ✅ |
| Branch Custom Events | **What:** Custom events are simply events at are unique to your app and therefore require custom implementation to accurately capture. **Why:** By measuring a wide variety of events, you can more efficiently optimize both the functionality of your app and your advertising strategies. Measuring events and understanding how your users interact with your app directly impacts your ability to build effective and ROI positive advertising campaigns by enabling you to compare retention, engagement and LTV to your costs. | ✅ |
| Dedicated Redirect Parameters | **What:** In addition to the default redirects you have in place at the app-level, you can also use a dedciated redirect parameter at the link-level. When this platform-specific parameter is manually added to a link, Branch routes any user who clicks on it to the destination URL you provide; overriding the default redirect settings at the app-level. **Why:** Give yourself the flexibility to control where your users are sent to when you want a different experience than the default landing page you've specified at the app-level. Particularly useful when running campaigns targeting a non-standard use case as you don't have to change your global redirect settings. | ✅ |
| Persist User Identities | **What:** Often, you might have your own user IDs, or want referral and event data to persist across platforms or the uninstall/reinstall of your app. **Why:** Persisting a user's identity can be very helpful to asses if your users access your service from different devices, thereby providing a more complete story of your user. | ✅ |
| Disable User Tracking | **What:** If a user indicates that they want to limit collection of their data on your app or website, or if you otherwise determine that a particular end user’s data should not be collected or otherwise processed, you can continue to make use of the Branch’s SDK (e.g. for creating and sharing Branch Links) while not tracking that end user. **Why:** We collect limited device information to power our deep linking technology and to provide attribution and analytics services. However, we understand that some end-users would like to opt out of this data processing; and, in other cases, the law (or Branch’s policies) do not permit that certain types of personal data for certain end users be provided to Branch (for example, data relating to children under the age of 13). | ✅ |
| Short Links | **What:** Short Links are the most common deep link and are highly customizeable. You can customize the subdomain of `example.app.link`,change to your own personal domain `links.yoursite.com`, or tailor the appearance of the Short Link to a custom alias during creation (e.g. `https://example.app.link/october-sale`). **Why:** Short Links allow you to present branded, short and to the point links that are visually easy to digest. | ✅ |
| Push Notifications | **What:** Deep link into specific app content directly from a push notification on the user's device. | ❌ |
| Last Attributed Touch Data (LATD) | **What:** Last attributed touch data contains the information associated with that user's last viewed impression or clicked link. | ❌ |
| SDK Logging | **What:** The Branch SDK for macOS is instrumented with a built-in logger so you can log API calls you make with the SDK. **Why:** Turning the logger on allows you to surface request and response bodies, that are JSON formatted. | ✅ |
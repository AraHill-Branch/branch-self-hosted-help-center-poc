---
title: "Preparing for iOS 14.5 Release FAQ"
slug: preparing-for-ios-14-release-faq
---

This article contains FAQs that are relevant to the iOS 14.5 release.

<details>
<summary>What actions do Branch customers need to take to prepare for iOS 14?</summary>

We recommend confirming the following three actions have been taken to complete your iOS 14 updates:

1. **Ensure SKAdNetwork (SKAN) implementation.** SKAdNetwork is Apple's attribution framework, facilitating ad measurement without device-level data. SKAdNetwork integration instructions are available [here](enable-skadnetwork-via-branch-sdk.md).
2. **Decide whether to show the App Tracking Transparency prompt, and integrate it if you decide to do so.** If you want to continue receiving device-level ad attribution data, your users will need to opt in via the new ATT permissions prompt. Technical implementation steps are available [here](ios-advanced-features.md#include-apples-attrackingmanager). We have also published [a blog post](https://blog.branch.io/best-practices-user-opt-in-ios-14/) with implementation best practices to optimize your opt-in rate.
3. **Engage with your ad networks to test SKAN-based attribution.** We recommend reaching out to your network partners to discuss any campaign configuration updates. For a list of ad networks that have completed SKAN setup, [click here](skadnetwork.md#ad-network-support).

For more information, please check out these additional resources:

- [**Branch iOS 14 Resource Hub**](https://branch.io/ios-14/)**.** Central location for everything related to iOS 14 from Branch.
- [**iOS 14 Readiness Checklist**](https://branch.io/ios-14-readiness-checklist/)**.** Interactive tool to help you check your readiness plans.
- [**iOS 14 FAQs**]( /faq/docs/ios-14-faqs)**.** Our full collection of iOS 14 FAQs.

</details>

<details>
<summary>What happens if I do not make any updates to prepare for iOS 14?</summary>

If you do not take any action to update your iOS configuration for iOS 14, you will lose *all* insight into your paid app acquisition campaigns for users on iOS 14.5 and above.

At minimum, you should plan to add support for SKAdNetwork. If you want to continue receiving device-level ad attribution data, your users will need to opt in via the new ATT permissions prompt. For more details on recommended steps, see this FAQ answer: [What actions do Branch customers need to take to prepare for iOS 14?](what-actions-do-branch-customers-need-to-take-before-the-ios-145-release.md)

</details>

<details>
<summary>Do I need to update the Branch SDK for iOS 14?</summary>

You will need to update your app to support Apple's SKAdNetwork. If you want to use the Branch SDK to automatically invoke the relevant methods (recommended), you will need to ensure you're using SDK v.0.35.0+. If you are integrating these methods yourself, or using another SDK to do so, no Branch SDK update is required.

Branch iOS SDK versions 1.39.2+ additionally capture ATT opt-in/opt-out events when users interact with the new AppTrackingTransparency prompt. This update is optional, but provides additional data to help you understand your user flows.

**Note for Cocoapods users:** if you have `platform :ios, '8.0'` in your podfile, you will need to update this to `'9.0'` to get the latest Branch SDK.

</details>
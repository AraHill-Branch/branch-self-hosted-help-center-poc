---
title: "Snap & iOS 14 FAQ"
slug: snap-ios-14-faq
---

<details>
<summary>What are Snap’s plan for iOS 14 changes?</summary>

Snap is using SKAdNetwork for iOS 14 measurement, and has completed testing with Branch. Here is a summary of the latest iOS 14 details from Snap:

**Snap is forwarding SKAdNetwork Postbacks directly to the Branch system.** This is unique among SAN networks (most are simply sharing aggregate totals with MMPs via API), and means Branch can process, validate, and share SKAdNetwork insights directly with our mutual customers rather than relying on pre-aggregated ad network numbers.

**Branch has set up an API endpoint for Snap to pull SKAdNetwork conversion-value mappings for mutual customers.** The conversion-value parameter is the only signal SKAdNetwork provides into post-install user activity, which makes it vital for campaign performance optimizations. Branch provides a dashboard tool that customers can use to map existing Branch events to SKAdNetwork conversion-values. Uniquely to the Snap integration, we additionally use the Snap-specific event mappings under Partner Management → Event Config to ensure Snap receives the correct Snap event types.

**Snap will show the AppTrackingTransparency prompt to users.** This means that device-level data will continue to be available in addition to SKAdNetwork data for users that opt in on both sides.

</details>

<details>
<summary>Will I need to change my campaign setup to maximize my performance on Snap?</summary>

Yes. The ATT-framework and other requirements are a significant transition in advertising your products. Snap will be recommending changes to your campaigns in order to achieve the best performance. Look out for product impact review and campaign requirements in purpose-built playbooks for Web, App, and Measurement coming over the next month.

</details>

<details>
<summary>What can I do today to prepare my Snap campaigns as I await more tactical campaign updates?</summary>

Until ATT frameworks are mandated, there is no disruption or change to your advertising on Snapchat. However, SKAdNetwork support is available as of February 18, and will become a requirement in future to access App Goal Based Bidding for iOS Campaigns on Snapchat.

For Ads with an **Install or Deep Link attachment**:

- Ensure you have configured a Snap App ID for each of your apps. Instructions [here](https://businesshelp.snapchat.com/s/article/snap-app-id?language=en_US).
- Follow the steps in [Branch’s SKAdNetwork setup guide](enable-skadnetwork-via-branch-sdk.md) and review [Snap’s setup guide for SKAdNetwork](https://businesshelp.snapchat.com/s/article/skadnetwork), which contains useful details on what to expect in Snapchat Ads Manager, and begin testing SKAdNetwork campaigns.
- For developer app privacy submissions within Apple's App Store Connect, you can review Snap's app privacy details in the business help article [here](https://businesshelp.snapchat.com/s/article/app-privacy-labels?language=en_US).

For Ads with a **Website attachment**:

- The Snap Pixel will continue to be supported for new and existing advertisers, and no configuration changes are needed at this time. While some Pixel features will be adversely impacted post-ATT, Snap still intends for this product to be fully compliant with Apple’s ATT policies.

</details>

<details>
<summary>Will Snap show the ATT prompt and provide device-level data for users that opt in?</summary>

Snap will show the AppTrackingTransparency prompt, and their existing MMP API endpoint will continue to return device-level data *in addition* to SKAdNetwork if the user opts in on both ends.

</details>

<details>
<summary>What event names will Snap receive from Branch via the Conversion Bit Schema API?</summary>

Branch will provide the event mapped in Event Config under Partner Management. This means there are two mappings in play:

1. The Branch event → SKAdNetwork conversion value mapping provided in the SKAdNetwork configuration tool.
2. The Branch event → Snap event name mapping provided in Event Config under Partner Management.

For example, if the Branch event `COMPLETE_REGISTRATION` is mapped to SKAN conversion value `10` and to Snap event `SIGN_UP` in the Branch dashboard, we will provide a mapping of `conversion-value 10 → SIGN_UP` to Snap via the Conversion Bit Schema API.

</details>

<details>
<summary>Why does Snap recommend not updating SKAdNetwork conversion-values after 24 hours?</summary>

Snap has informed MMPs that they don’t want to have any calls to `updateConversionValue()` beyond 24 hours post-install. While this is an *optional* best practice and comes with obvious tradeoffs, you may want to take it into account when designing your conversion-value strategy if Snap campaigns are a primary source for you.

Beginning with iOS SDK v1.39.0, we have updated our SDK defaults to reflect this 24-hour window. If you would like to customize the SDK's conversion value timeout, you can read more here: [How do I change the Branch SDK's default conversion-value update window?](how-do-i-change-the-branch-sdks-default-conversion-value-update-window.md)

</details>
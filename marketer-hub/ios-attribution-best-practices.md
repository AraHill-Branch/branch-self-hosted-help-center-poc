---
title: "iOS Attribution Best Practices"
slug: ios-attribution-best-practices
---

Measuring iOS campaigns effectively requires using the right combination of tools, and Branch’s [Predictive Aggregate Measurement (PAM)](predictive-aggregate-measurement.md) is what brings it all together.

When you activate PAM alongside aggregate measurement solutions like AEM and gBraid, and consistently use Ad Links across all your campaigns, you unlock the most complete attribution coverage possible for iOS.

This guide shares Branch's recommended best practices for iOS attribution, showing you how these tools work together with PAM to maximize your measurement while maintaining privacy-preserving practices. These practices take into account leading advertiser implementations and evolving partner integrations.

Whether you're launching your first iOS campaign or optimizing an existing setup, following these practices will help keep you from leaving attribution on the table.

## Activate PAM

PAM is your foundation for complete iOS attribution.

While SKAdNetwork (SKAN) provides some measurement, it's highly limited. PAM unlocks additional insights for users who would otherwise only show up in SKAN's aggregated reports, or be marked as "Unattributed" entirely.

PAM works alongside the other aggregate measurement solutions in this article to give you the most granular, actionable data possible, while helping safeguard privacy through techniques like data aggregation and thresholding.

**Enabling PAM does not require any engineering work** — you’ll just need to a flip a switch in Branch.

Learn how to turn on PAM in our [guide](predictive-aggregate-measurement.md#enable-pam-at-the-orglevel).

## Enable AEM

If you're running app campaigns on Facebook, Instagram, or Audience Network, enable Meta’s Aggregated Event Measurement (AEM). Without AEM enabled, your campaigns will be missing valuable Meta attribution data.

AEM is Meta's privacy-preserving attribution solution that lets them optimize your campaigns without relying on device-level identifiers like IDFA, and it's critical for making PAM work effectively on Meta traffic. PAM uses signals from AEM to attribute app events from opted-out iOS users. Learn more about AEM in Meta’s [documentation](https://www.facebook.com/business/help/721422165168355?id=1877298665783613).

To enable AEM, follow our [guide](enable-app-aggregated-event-measurement-support.md). Please note that this requires help from a developer.

When AEM is enabled, those attributed events will appear in your Branch reporting under the `aggregate_measurement` dimension, giving you visibility into campaign performance you'd otherwise miss.

The possible values for this field are:

- `true`: AEM was used to attribute the event.
- `false` or `unpopulated`: The event was not attributed through AEM, either because AEM signal was unavailable or AEM was not active for that campaign.

You can find more details on the `aggregate_measurement` dimension in our PAM [documentation](predictive-aggregate-measurement.md#dimensions).

## Leverage gBraid

For app engagement campaigns on Google Ads, ensure the [gBraid parameter](https://support.google.com/analytics/answer/11367152?hl=en) is enabled and correctly passed. This identifier is critical for attribution when device-level identifiers like IDFA are unavailable.

To confirm gBraid is properly integrated, we recommend working directly with your Google account team. You can also reference Google’s [documentation](https://support.google.com/google-ads/answer/10417364?sjid=17117638370167309787-NC) on iOS 14 campaign measurement for implementation guidance.

[To leverage gBraid](enable-google-app-campaigns.md#google-ads-conversion-reporting), your app needs to have the Branch iOS SDK integrated, and use it to track events. For this, you’ll need help from a developer.

PAM supports attribution using gBraid, allowing downstream events to be tied back to interactions with Google Ads. Those attributed events will appear in your Branch reporting under the `aggregate_measurement` dimension, giving you visibility into campaign performance you'd otherwise miss.

The possible values for this field are:

- `true`: The event was attributed using gBraid.
- `false` or `unpopulated`: The event was not attributed using gBraid, either because the identifier was unavailable or not active for that campaign.

You can find more detail on the `aggregate_measurement` dimension in our PAM [documentation](predictive-aggregate-measurement.md#dimensions).

## Turn on ICM

If you're running app campaigns on Google Ads, enable Google [Integrated Conversion Measurement (ICM)](https://support.google.com/google-ads/answer/16203286?hl=en).

ICM is Google’s privacy-preserving attribution framework that improves reporting accuracy when traditional identifiers like IDFA aren’t available. This includes when iOS users are operating within Apple’s App Tracking Transparency (ATT) framework.

ICM uses Google’s [On-device Conversion Measurement (ODM)](https://support.google.com/google-ads/answer/12119136). With ODM, conversion data is processed directly on users' devices rather than being sent to Google's servers, which helps safeguard the user’s privacy.

To get started with ICM, visit our [guide](google-icm.md#ios). Please note that enabling ICM requires help from a developer.

While ICM only works for Google traffic, PAM gives you the same privacy-preserving, modeled attribution across all your other channels. Used together, they complement each other to give you a broader view of your overall performance.

Learn more about ICM and the future of attribution in our [blog post](https://www.branch.io/resources/blog/googles-integrated-conversion-measurement-confirms-it-the-attribution-game-has-changed/).

::: tip Tip
Google ICM enhances attribution coverage across Android as well, which is helpful if the user is in the European Economic Area (EEA) or has opted-out of sharing device-level identifiers.
:::

## Use Ad Links

For ad platforms or placements that support third-party deep linking, click tracking, or redirects, [Branch Ad Links](ad-links.md) remain the recommended method for campaign measurement and routing.

PAM fully supports attribution through Ad Links, when they are used in eligible placements. This ensures accurate measurement while maintaining user privacy.

While Meta and Google have their own aggregate measurement systems, PAM provides the same privacy-preserving, aggregate attribution for any traffic coming through Ad Links. This means you get consistent, comparable measurement across all your channels—not just the platforms with proprietary solutions. Whether users are opted-in or opted-out, PAM ensures you're capturing attribution wherever you're using Ad Links.

## Consider ATT prompts

In addition to implementing the measurement solutions above, consider your approach to Apple’s App Tracking Transparency (ATT) prompt. When users opt in to tracking via ATT, it enable deterministic attribution using their IDFA, providing the most precise measurement possible.

However, your ATT prompt strategy should align with your app’s overall user experience and value proposition. The timing and context of when you present the prompt can significantly impact opt-in rates.

**Important**: Keep in mind that ATT is **off by default** at the system level in iOS Settings. Even if you implement an ATT prompt in your app, users who have turned off the “Allow Apps to Request to Track” setting in their device settings won’t see your prompt at any point. This means a portion of your users will always be opted-out, regardless of your in-app implementation.

This is why having robust aggregate measurement solutions like PAM, AEM, gBraid, and ICM is critical. These tools ensure you maintain optimal attribution coverage for opted-out users, while respecting privacy.
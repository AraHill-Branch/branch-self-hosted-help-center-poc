---
title: "Branch iOS 14 Product Details (General) FAQ"
slug: branch-ios-14-product-details-general-faq
---

<details>
<summary>Under Apple’s new policy, what attribution methods will Branch use, and when?</summary>

Branch has three main attribution methods available to us today: SKAN, Predictive Modeling, and IDFA-based attribution. The table below breaks down when we will use SKAdNetwork vs Device-Level attribution.

.png)

In cases where we are able to provide device-level attribution techniques (either via user opt-in, or an owned/earned channel where ATT doesn't apply), we will first try to use IDFA-based techniques to attribute a user. These techniques could be our existing ad network integrations, or our Link Graph.

If we’re not able to use one of those IDFA-based techniques (for example, to attribute a web-to-app conversion where IDFAs are not available), then we will look to attribute based on our Predictive Modeling engine.

</details>

<details>
<summary>What impact will this have on non-ads parts of the Branch Platform?</summary>

We expect the impact to be minor. Products like our deferred deep linking capabilities, Journeys smart banners, and deep linked email functionality already did not directly rely on IDFAs and do not fall under the scope of Apple's policy against tracking for ad attribution. These products did leverage IDFA-derived data for deterministic matching accuracy, but they will seamlessly fall back to predictive modeling when IDFAs are no longer available.

</details>

<details>
<summary>Can we still use deferred deep linking in ads?</summary>

This will depend on support from each ad network. If supported by the ad network, similar to the functionality we offer for GDPR compliance, Branch will be able to reference link data for deferred deep link behavior without performing ad 'tracking'. We believe this is fully compliant with Apple's ATT policy, since this policy deals specifically with tracking, attribution, and audience creation (core app UX functionality like deep linking is not in scope).

To put it another way, deep linking and deferred deep linking from ads is allowed regardless of ATT opt-in, so long as no tracking is performed.

That being said, certain networks like Facebook [have stated](https://developers.facebook.com/docs/marketing-api/reference/adgroup/) that they will not support deferred deep linking for SKAN campaigns. This is likely for technical reasons, as they've decided to rely exclusively on SKAdNetwork for attribution and have no mechanism in place to pass through the deep link data for any purpose.

</details>

<details>
<summary>Once a user opts-in to device-level tracking, can it be connected to that user’s previous activity before opt-in?</summary>

Branch will not be retroactively updating events that occur prior to opt-in. You may be able to analyze these events in your own BI systems by using other identifiers such as IDFVs.

For a full walkthrough of the device-level ads analytics changes Branch is making for iOS 14.5, please read [this blog post](https://blog.branch.io/ads-analytics-changes-ios-14-5/).

</details>

<details>
<summary>Can I still track conversions through Quick Links with iOS 14?</summary>

Yes, Short Links do not rely on IDFA today, and we do not expect a significant impact. This means you will still be able to track conversions for owned and organic channels through Short Links as usual.

**Please note:** Short Links are not intended for use in paid ad campaigns, and using them for this purpose may put you in violation of Apple's App Tracking Transparency policy. If you wish to use a Short Link to measure a paid campaign and need to ensure ATT-compliant behavior, please see [How do we configure a non-Ads link to use Branch's ATT-compliant behavior?](how-do-we-configure-a-non-ads-link-to-use-branchs-att-compliant-behavior.md)

</details>

<details>
<summary>What happens after users opt in via the AppTrackingTransparency modal?</summary>

- If you do not implement the modal, IDFAs will not be collected and device-level ad data will not be available.
- If you implement the modal, any events that occur before permission is granted will not have IDFA values attached and will be attributed as organic. When the user opts in, Branch will trigger a *second install* event with the correct ad attribution data, and subsequent events will be correctly attributed to the ad (however, events prior to the opt-in will not be updated).

For a full walkthrough of the device-level ads analytics changes Branch is making for iOS 14.5, please read [this blog post](https://blog.branch.io/ads-analytics-changes-ios-14-5/).

</details>

<details>
<summary>Do I need to change my Branch integration so that the Branch SDK only fires after the AppTrackingTransparency pop-up?</summary>

This is up to you. Our SDKs provide ways to delay tracking the install until after the user has seen the AppTrackingTransparency prompt, but this will also prevent deep linking and we'd only recommend using this delay if you intend to ask permission quickly.

For a full walkthrough of the device-level ads analytics changes Branch is making for iOS 14.5, please read [this blog post](https://blog.branch.io/ads-analytics-changes-ios-14-5/).

</details>

<details>
<summary>Does Branch still capture IDFV for long level exports, 3rd party SDK, BI tools, CCPA, or GDPR compliance?</summary>

Our SDKs will gather IDFV automatically if IDFA is not available. If an event is tracked with an IDFV, then this will be reflected in the log-level export without any additional changes to export required.

Regarding any regulatory compliance, our normal data hashing rules still apply to anything we store. We also do not send IDFV to any Self Attributing Network API endpoint.

</details>

<details>
<summary>Does the Branch SDK automatically trigger the AppTrackingTransparency prompt?</summary>

The Branch SDK *will not* automatically trigger the AppTrackingTransparency prompt. This is intentional, to provide you with full control over your user experience and the decision of if/when to ask your users for tracking permissions.

</details>

<details>
<summary>What happened to Predictive Modeling? In which situations is it still an advantage?</summary>

Predictive Modeling very much still exists, and will continue to power a number of critical use cases for our clients. These can be thought of as use cases that fall into two different buckets: paid ads and organic/owned links.

**1. Paid Ads.** When users have agreed to tracking via ATT in both the publisher and advertiser apps, the vast majority of device-level attribution will be done via IDFA. However, there will still be edge cases where this is not possible (such as the IDFA not populating in the tracking link). In these cases, Branch will be able to use Predictive Modeling to accurately attribute that user to the proper ad.

Additionally, since the IDFA is never accessible on mobile web, Predictive modeling will power all web-to-app ad attribution (so long as the user opts in via ATT in the destination app).

**2. Organic Channels.** Since Apple’s new guidelines apply to paid advertising, organic channels can still continue to function as they do today. Whether it be app-to-app links, links on a client’s site, links in an email, or non-paid links on another site, Predictive Modeling will power best-in-class attribution.

</details>

<details>
<summary>How is Branch’s Predictive Modeling different from what other MMPs offer?</summary>

Traditional MMPs are in the ads business. Predictive Modeling is possible because Branch is the top linking platform in the world, which allows us to build a sophisticated attribution model that includes truth signals from every channel and platform. These signals are device-level and privacy-safe, and no other MMP has them.

For example, we can see when they are accessing the device from common public networks like the home or office, as well as their private addresses when they are on cellular. With this, we can detect if a user switches from cellular to their home network between the click and the app session to match correctly where other simple technologies will fail. Importantly, we can use this insight to improve accuracy both when *making* an attribution, and when deciding *not to attribute*.

The best analogy is one based on statistics. When you’re running an experiment where there’s uncertainty, the sample size matters. You need enough samples to accurately determine the distribution. Traditional MMPs use one sample (the IP of the last click) to match the IP of the app session. Branch predictive modeling uses a huge number of samples, collected over the user’s anonymous profile, making it much more accurate than a single data point.

</details>

<details>
<summary>Is Branch’s SAN Deferred Deep Linking product impacted?</summary>

We want to share a quick update on the impact of iOS 14’s App Tracking Transparency (ATT) changes on Branch's [SAN Deferred Deep Linking functionality](san-deferred-deep-linking.md).

**In short, SAN Deferred Deep Linking will only work for users who have opted in, and it will be delayed *until* they opt in.** This feature relies on having IDFA on install in order to call out to Self-Attributing Networks (SANs) like Facebook, Google and Snap. Because IDFA will never be present on install, we cannot call out to SANs to retrieve ad information. Thus we have no information to return to the client app. Then, after the user opts in to tracking, we will be able to call out to SANs and retrieve any ad data. At that point we will return it to the app for deep linking.

Additionally, SAN networks have not (yet) built any functionality to support deferred deep linking in campaigns measured via SKAdNetwork.

**Android is not impacted.** Deep linking on Android is not impacted. Additionally, deep linking for non-paid use cases, such as email, Journeys and user-to-user referrals are not impacted. Direct deep linking -- deep links that are clicked with the app already installed -- are not impacted. In all of these cases, deep linking will continue functioning unchanged.

**What Branch is doing about it.** We have proactively made a change on our backend. We can no longer call out to SANs on the install event, which won’t have an IDFA. Instead, we will call out on the first request we get with an IDFA. We will return SAN data, if available, at that time.

**Impact.** Many users will never opt in to tracking. SANs will no longer be able to provide ad data for those users. This means we will no longer be able to provide the SAN Deferred Deep Linking product for those same users. We anticipate that a minority of users will opt in to tracking. We will continue to deliver SAN data for that minority of customers, after they have opted in.

**Guidance to you.** There is no action for you to take. Due to how the iOS advertising ecosystem is changing, the SAN Deferred Deep Linking product is changing. It will now only work for users who opt in to tracking. There is no available mechanism for this to work for other users.

</details>

<details>
<summary>What impact will this have on Branch’s deep linking accuracy?</summary>

In situations where the app is already installed, there will be no change to accuracy: Branch will still be able to offer deep links with deterministic (guaranteed) matches. However, we *won't* be able to offer deterministic matches on iOS for the *first install* in most scenarios, as this capability relies on IDFAs being available on initial app open.

There is no impact to Android, though this may change in future if Google places similar limitations on the GAID (which we believe is likely).

</details>

<details>
<summary>Will Branch still be able to offer deterministic deep link matching iOS?</summary>

We will no longer be able to deliver deterministic matches on iOS *for the first install*. Deterministic matching will continue working for deep links into an app that is already installed.

However, the Branch system uses an industry-unique, anonymous, probabilistic algorithm that incorporates historical attributions to deliver high accuracy data where there is no universal ID. This means you'll still get the highest accuracy available, which should be more than sufficient for anything outside of highly-secure use cases like auto-login.

</details>

<details>
<summary>How will iOS 14 affect our MAU count on Branch?</summary>

You should see no impact to your MAU count. The Branch platform already uses IDFVs to calculate MAUs in situations where IDFAs don't exist (for example, when Limit Ad Tracking is enabled). We'll be monitoring this as iOS 14 adoption grows, and encourage you to reach out if you notice anything unexpected.

Please note that Branch [pricing](packaging.md) is not based on MAU count, but instead on volume credits.

</details>

<details>
<summary>How do we handle GDPR compliance without IDFAs to request data deletion?</summary>

If you are using the Branch [Data Subject Request API](data-subject-request-branch-api.md) to send deletion requests associated with an IDFA, it will have lower efficacy since fewer users will allow tracking of the IDFA, which is the primary identifier for these requests. Instead, you’ll want to rely on IDFV where available, and consider shifting to using the SDK controls for disabling Branch functionality when a user requests an opt-out.

</details>

<details>
<summary>How will Branch determine whether or not the user has opted into ATT?</summary>

To provide continuity for all customers, we use the presence of IDFA to infer ATT opt in.

Additionally, Branch iOS SDK versions 1.39.2+ capture ATT opt-in/opt-out events when users interact with the new AppTrackingTransparency prompt. This update is optional, but provides additional data to help you understand your user flows.

</details>

<details>
<summary>Will Branch support PCM or AEM?</summary>

PCM (and AEM, Facebook's equivalent solution) are mostly useful for the big walled garden apps that want to attribute app-to-web user conversions for themselves. Branch not directly involved in those *on the walled garden's behalf* (we are involved sometimes for the advertiser — more below), so we don't believe there's any immediate benefit for Branch to adopt either technology.

To understand this fully, it's important to know that Apple doesn’t consider web activity alone to be in scope for ATT. That means if the advertiser is tracking only their own web activity, and no data derived from a third-party app (i.e., Facebook) is involved to make that happen, ATT does not apply. In this situation (advertiser's Branch Link leads directly to advertiser's own website) we don't need to rely on PCM.

The key difference here is that Facebook would be combining data across companies (the advertiser, and themselves) to measure this. However, since a Branch Link is acting on behalf of the advertiser (and not sharing that data back to the walled garden), it’s all the same company, all happening in a web context, and not subject to the ATT policy that requires Facebook to use AEM.

</details>

<details>
<summary>What will happen to reinstall tracking without IDFAs?</summary>

At a high-level, Branch's reinstall detection logic works by comparing IDFA and IDFV values:

- IDFAs were reset only when the user explicitly chose to do so in device settings.
- IDFVs would reset only when all apps from the same vendor were uninstalled from the device.

Historically, it would be extremely rare for these two values to reset at the same time, making it possible to detect when an app was reinstalled after being previously installed on the same device.

With iOS 14.5, we expect IDFAs to be available far less often, while it will still be possible for IDFVs to reset when all apps from a vendor are uninstalled. The bottom line is that it will be more difficult for Branch to detect `REINSTALL` events, and some of these are likely to be processed as simple `INSTALL` events.

Our team is investigating other approaches to increase reinstall detection accuracy in future.

</details>

<details>
<summary>If the user doesn’t opt in via ATT, is it still possible to show an install came from ‘paid advertising’ without any additional detail?</summary>

Unfortunately, this will not be possible. Until/unless your users opt in, events will appear as fully organic in every way.

The reason for this is that in order to indicate 'paid attribution' (even if all user-level details are redacted), it's necessary to perform the sort of tracking that is prohibited under Apple's policy.

</details>

<details>
<summary>Will Branch still send event postbacks to ad networks for users who don’t opt in under ATT?</summary>

Most network partners are configured to receive Postbacks only for events that are *attributed to them*. Since Branch will not perform device-level attribution unless the user is opted in, these networks will not receive postbacks for opted-out users by definition.

If you have configured a network to receive postbacks for *unattributed* events, you may want to review your settings to ensure you're not sending data that could be considered 'ad tracking' under Apple's policy.

</details>

<details>
<summary>After iOS 14.5, what is the expected Branch functionality by link type?</summary>

In compliance with Apple's policies, Branch only uses device-level matching for deep linking, and attribution on owned and organic channels (web banners, user-to-user invites links, email, QR codes, etc.). The table below details the attribution method by channel, as well as whether or not deep linking is enabled.



For more information please read:

- [Are owned channels under the scope of Apple's new policy?](are-owned-channels-under-the-scope-of-apples-new-policy.md)
- [Are organic/earned channels under the scope of Apple's new policy?](are-organic-channels-under-the-scope-of-apples-new-policy.md)

</details>

<details>
<summary>How do we track ATT opt-in/opt-out events with Branch?</summary>

To collect ATT opt-in and opt-out events with Branch iOS SDK v1.39.0+, see [this documentation page](ios-advanced-features.md#event-tracking).

</details>

<details>
<summary>How do we configure a non-Ads link to use Branch’s ATT-compliant behavior?</summary>

Links created via Branch's Ads feature will automatically implement ATT-compliant behavior on iOS. This means device-level attribution data will *only* be available after the user has opted in via the ATT modal.

Because links created via other methods (including Short Links) are not designed for ads measurement, these links do not automatically implement ATT-compliant behavior on iOS. However, you can enable this behavior on a case-by-case basis by manually including a `$3p` value, like so:

.png)

</details>

<details>
<summary>Does Branch’s ‘second install’ behavior on iOS require an SDK update, or will all the logic be handled server-side?</summary>

There is no required SDK update; 'second install' behavior will be automatically applied where relevant for users on iOS 14.5, regardless of Branch SDK version.

Branch iOS SDK versions 1.39.2+ additionally capture ATT opt-in/opt-out events when users interact with the new AppTrackingTransparency prompt. This update is optional, but provides additional data to help you understand your user flows.

For a full walkthrough of the device-level ads analytics changes Branch is making for iOS 14.5, please read [this blog post](https://blog.branch.io/ads-analytics-changes-ios-14-5/).

</details>

<details>
<summary>Why did Branch remove the Organic checkbox from some dashboard pages?</summary>

By default, most reports on the Branch dashboard show only attributed data. This makes sense, because if you’re looking at a report for something such as ad campaign performance, you usually want to see only conversions attributed to ad campaigns.

In the past, when the Organic checkbox was checked, the report would show a *separate* segment for unattributed (or ‘organic’) conversions:



This won’t work as expected after iOS 14.5, because that unattributed segment will also include paid ad conversions that have not yet been completed by the user opting in to ATT:

This means the Organic checkbox simply won’t be useful in as many reports, so we are removing it from some dashboard pages to avoid confusion.

Locations where the Organic checkbox will be removed include:

- Summary page

  - Journeys tab
  - Short Links tab
  - Branch Email tab
- Journeys → Activity tab
- Email → Activity tab

Locations where the Organic checkbox will still be available include:

- Summary page

  - All Data tab
  - Ads tab
- Ads Analytics → Activity tab

Most customers used the Organic checkbox as a way to compare their campaign performance against a non-campaign baseline.

As an alternative, we’ll be adding a new checkbox to dashboard reports called “Show Total App Traffic”. This will display an additional segment in the report for *all* traffic (both attributed and unattributed), which will provide a similar baseline for performance comparisons.



</details>
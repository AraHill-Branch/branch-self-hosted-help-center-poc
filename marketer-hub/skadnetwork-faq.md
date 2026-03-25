---
title: "SKAdNetwork FAQ"
slug: skadnetwork-faq
---

This article contains frequently-asked questions about SKAdNetwork.

<details>
<summary>Will users who opt in via AppTrackingTransparency also still be tracked via SKAdNetwork?</summary>

Yes, users opting into app tracking via ATT will be tracked via SKAdNetwork in parallel.

This means that you will always get aggregate data via SKAdNetwork, and additionally receive device-level data via tracking links for the same user if they opt in. Unfortunately, due to Apple's intentional SKAdNetwork design limitations, there is no way to deduplicate these two data sources. This is why we expect SKAdNetwork will quickly become the standard option for transactional purposes like billing, with the limited amount of device-level data still being useful for deeper insights and campaign optimization.

</details>

<details>
<summary>If a user already has the app, will I receive SKAdNetwork conversion data?</summary>

Currently, SKAdNetwork only supports App Installs. This means nothing will happen and no SKAdNetwork postback will be sent if the app is already installed.

</details>

<details>
<summary>What happens if the advertiser app integrates multiple SDKs that all support SKAdNetwork?</summary>

The first call to `registerAppForAdNetworkAttribution()` generates the notification if the device has attribution data for that app, and starts a 24-hour timer. Subsequent calls to this method have no effect, and there is no need to worry about duplicates.

However, it's critical to ensure only one source is managing `updateConversionValue(_:)` calls. If you have more than one party making these updates, your data will quickly become messy because each party will likely define the meaning of a given conversion value differently.

</details>

<details>
<summary>What happens if a user keeps doing in-app actions that extend the SKAdNetwork looping timer?</summary>

The Branch SDK sets a default "expiration" on `conversion-value` updates to avoid this issue. This means that after a set number of hours, we will stop calling updateConversonValue() even if the user continues to perform qualifying events. This is in order to prevent the scenario where the timer keeps looping, preventing a postback for conversion being sent.

For SDK versions v.0.35.0 → v1.38.0, this expiration is 72 hours. Beginning with SDK v1.39.0, the default timer is set to 24 hours, based on guidance from major networks including Google, Facebook, and Snap.

If you want to customize the default, see this FAQ item: [How do I change the Branch SDK's default conversion-value update window?](https://help.branch.io/faq/docs/how-do-i-change-the-branch-sdks-default-conversion-value-update-window)

</details>

<details>
<summary>Does SKAdNetwork provide any geographical information?</summary>

Unfortunately, there is no geographical data available through SKAdNetwork. This is by Apple's design.

If understanding the location of your downloads is important to you, we recommend that you run geo-targeted campaigns with your ad networks and utilize the campaign IDs to help identify which regions your installs are coming from.

</details>

<details>
<summary>Does SKAdNetwork require a value for the conversion-value parameter?</summary>

The `conversion-value` parameter is not required. This value is updated via the `updateConversionValue(_:)` method (if you are using Branch's built-in SKAdNetwork functionality, our SDK calls this method automatically on your behalf), and if this method is not called, the `conversion-value` value in the SKAdNetwork postback will simply not be set.

Note that the `conversion-value` parameter will only be provided in the SKAdNetwork postback if it passes Apple's secret privacy thresholds.

</details>

<details>
<summary>Does SKAdNetwork provide any attribution for owned and organic channels?</summary>

SKAdNetwork does not provide attribution for owned and organic installs. The SKAdNetwork attribution method is specifically for app install campaigns.

</details>

<details>
<summary>Am I limited to 100 campaign IDs per network or per app?</summary>

The SKAdNetwork `campaign-id` parameter is specified when the ad is shown inside a publisher app. This parameter is limited to a total of 100 values (the integers 1-100), the meaning of which is typically defined by the advertiser and ad network in collaboration.

This means that each advertiser is limited to a total of 100 values per ad network.

</details>

<details>
<summary>In the SKAdNetwork postback, what are “transaction-id” and “attribution-signature”?</summary>

`transaction-id`: A unique ID for the install/ conversion to help with deduplication and validation.

`attribution-signtature`: Apple’s own attribution signature in the postback, to be used for cryptographic verification of the postback.

For more information on the parameters in the SKAdNetwork postback, see [this Apple documentation page](https://developer.apple.com/documentation/storekit/skadnetwork/verifying_an_install_validation_postback).

</details>

<details>
<summary>If a customer installs and purchases, how many postbacks will the advertiser get from Apple?</summary>

Apple will only ever send one SKAdNetwork postback per install.

If an install is the furthest a customer goes through the conversion funnel within Apple's conversion timer windows, then you as the advertiser will received an install postback. If a customer also purchases within Apple's conversion timer windows and you decide to register this as a conversion event with a conversion value, the postback you receive will have the appropriate conversion value attached, and this can also be counted as an install.

Once a postback has been sent by Apple, no additional postbacks will be sent for post install conversions. Therefore, if a conversion does not happen within Apple's windows then you may never see a postback with that conversion information to be attributed to the campaign.

</details>

<details>
<summary>For ad networks that support tracking links and SKAdNetwork, which should we use? Are there risks of duplicate attribution?</summary>

SKAdNetwork data is completely separate from any device-level attribution data collected via tracking links. With the expected low rate of ATT opt-in, SKAdNetwork will be the only reliable data source for billing, etc.

However, there are still advantages tracking links, including device-level attribution data (for opted-in users) and deferred deep linking (regardless of user opt-in status), and many ad networks are supporting both attribution methods in parallel.

This means that you will always get aggregate data via SKAdNetwork, and additionally receive device-level data via tracking links for the same user if they opt in. Unfortunately, due to Apple's intentional SKAdNetwork design limitations, there is no way to deduplicate these two data sources. This is why we expect SKAdNetwork will quickly become the standard option for transactional purposes like billing, with the limited amount of device-level data still being useful for deeper insights and campaign optimization.

</details>

<details>
<summary>What attribution windows does SKAdNetwork use?</summary>

Apple has provided the following details about attribution windows on [this page](https://developer.apple.com/documentation/storekit/skadnetwork/receiving_ad_attributions). Note that none of these can be customized.

| Event | Time Window |
| --- | --- |
| Ad network presents a StoreKit-rendered ad | User has 30 days to install the app. |
| Ad network presents a view-through ad | User has 24 hours to install the app. |
| User installs the app. | User has 60 days to launch the app. |
| User launches the app and app calls `registerAppForNetworkAttribution()` | Device sends install-validation postback 0-24 hours after a 24-hour timer expires. |
| User launches the app and app calls `updateConversionValue(_:)` | Device sends install-validation postback 0-24 hours after a 24-hour timer expires following the final call to `updateConversionValue(_:)` |

</details>

<details>
<summary>Does SKANetwork support view-through attribution?</summary>

SKAdNetwork supports limited view-through attribution beginning with v2.2 in iOS 14.5.

For more information, please read [this blog post](https://blog.branch.io/skadnetwork-view-through-attribution-and-pcm-what-they-mean-for-mobile-marketers/?_gl=1*ybj42b*_ga*MTE0MjE4NTYxLjE3NDIyOTA2MTE.*_ga_KSDD8Y11CT*MTc0MjI5MDYxMC4xLjEuMTc0MjI5MjAzMy40My4wLjA.).

</details>

<details>
<summary>What are some best practices for our SKAdNetwork conversion-value strategy?</summary>

We have published a blog post with SKAdNetwork conversion-value best practices [here](https://blog.branch.io/guide-to-skadnetwork-conversion-values/?_gl=1*1kvz3n2*_ga*MTE0MjE4NTYxLjE3NDIyOTA2MTE.*_ga_KSDD8Y11CT*MTc0MjI5MDYxMC4xLjEuMTc0MjI5MjA4My41NC4wLjA.).

</details>

<details>
<summary>Can we use conversion-value 0 in SKAdNetwork?</summary>

No, you should not attempt to call `updateConversionValue(_:)` with a conversion value of 0.

While this is not clear from Apple's current documentation, we have confirmed with multiple sources that the 0 value is actually reserved by SKAN for install events.

</details>

<details>
<summary>With SKAdNetwork, how can I determine which creative is driving the most conversions?</summary>

To do this, you will need to use the 100 `campaign-id` values SKAdNetwork provides.

</details>

<details>
<summary>How does SKAdNetwork protect against fraud?</summary>

The future of ad fraud on iOS is unclear at this point, since SKAdNetwork adoption is still very low. Here are some early hints on what we expect:

- SKAdNetwork will make 'stupid fraud' (things like basic click spamming) go down significantly, because Apple will be vouching that every conversion happened on a legitimate device.
- More sophisticated techniques (device farms, etc.) will likely still be possible with SKAdNetwork. Unfortunately, due to how opaque the system is, we expect these techniques will be far more difficult to catch.

We're constantly monitoring the situation, and will be working on initiatives to detect and prevent fraud as we start to see real campaign data come in through the SKAdNetwork system.

</details>

<details>
<summary>Does the app need to be active in order for SKAdNetwork postbacks?</summary>

The SKAdNetwork postback is sent by iOS in the background, which means the app does not need to be active for the postback to be sent.

</details>

<details>
<summary>Does the app need to be active in for for SKAdNetwork to update conversion values?</summary>

Yes, the app must be active for `updateConversionValue(_:)` to fire. This means if the user doesn't open the app for over 24 hours, the SKAdNetwork looping timer will expire and the postback will be sent, even if the user opens the app at hour 26 and performs an event that would otherwise trigger a conversion value update.

</details>

<details>
<summary>How does Apple verify/deduplicate SKAdNetwork conversions?</summary>

Apple has not shared details about how they do this process. It's possible they are using some sort of validation based on unique device ID (accessible only to Apple) or valid iCloud account.

</details>

<details>
<summary>Why is SKAdNetwork data delayed? What are the looping timers?</summary>

SKAN involves two different timers:

- **Conversion window timer**. This timer starts at 24 hours when the app is launched for the first time. It resets back to 24 hours each time the conversion value is successfully updated. Once this timer expires, all data in the postback is final and cannot be updated.
- **Randomization delay**. This begins when the conversion window timer expires. Its length is up to 24 hours, arbitrarily chosen by iOS. At the end of this delay, the device sends the postback.

(Note: these terms are not official from Apple's documentation, but we find them useful to avoid confusion)

This means the earliest an ad network can possibly receive the SKAN postback is slightly over 24 hours after install, and that assumes no conversion-value updates are made. Many large networks are currently recommending that conversion value updates be limited to the first 24 hours after install.

</details>

<details>
<summary>What is the difference between networks forwarding individual SKAN postbacks to Branch, rather than providing data via an API? Is one option better?</summary>

There are two main ways ad networks are sharing SKAdNetwork data with MMPs:

- **Forwarding the raw SKAN Postbacks**. This is the most common flow, and involves the network resending the individual conversion reports that iOS devices send to them. When ad networks forward these postbacks directly, MMPs are able to process and cryptographically validate the individual reports (as recommended by Apple), filling their traditional role of independently verifying data and ensuring trust by all parties.
- **Providing pre-aggregated data via an API**. This approach is being used mostly by the largest walled garden networks (often referred to as SANs, or Self Attributing Networks). In this flow, the network collects individual SKAN postbacks, cryptographically validates them internally, and then provides only pre-generated results to MMPs via an API endpoint. This means that MMPs won't be able to 'check the homework' of networks using option 2. In addition, not every network sharing data via API is providing all the data dimensions reflected in the SKAdNetwork postbacks.

To see which method is being used by a given network, please refer to this list.

**Note**: While individual SKAdNetwork postbacks are not technically 'aggregate data' (because each one corresponds to a single install — for more about the difference, please see What's the difference between device-level and aggregate data?), the design of the SKAN system ensures that the data inside each postback is already at an aggregate level of detail.

</details>

<details>
<summary>With SKAdNetwork, are the install and conversion-value in the same postback or separate postbacks?</summary>

SKAdNetwork will send a single postback that includes both the app install and conversion-value (the conversion-value will only be included if it passes Apple's secret privacy threshold). This postback will be sent at least 24 hours after the app install is registered by the advertised app.

</details>

<details>
<summary>If we update our SKAdNetwork conversion value mapping, do we need to release a new version of our app?</summary>

This depends on how you have integrated SKAdNetwork.

- If you are using Branch to manage your conversion value mappings, you do not need to release a new version of your app.
- If you are managing your conversion values via custom in-app code, it will likely be necessary to release a new app version.

</details>

<details>
<summary>Why does SKAdNetwork limit view-through impressions to 15 per app? What does that mean?</summary>

On [this page](https://developer.apple.com/documentation/storekit/skadnetwork/receiving_ad_attributions), Apple mentions a limit of 15 view-through impressions per source app.

This means for a given source (publisher) app, iOS will only store 15 SKAdNetwork impressions at a time. That could mean 15 impressions for the same advertised app, or one each for 15 different advertised apps.

SKAdNetwork view-through impressions “expire” after 24 hours if they don’t lead to an install. But, the oldest one will expire before the 24 hours if the source app serves the user a 16th impression. This could present a problem for a high-density ad implementation (i.e., if a game shows view-through ads for 16 different apps over the course of a 1-hour play session, the first touch point will be discarded).

It's not clear why Apple chose this limit, other than perhaps for technical simplicity.

</details>

<details>
<summary>Do I need to be an Ads subscriber to access Branch’s SKAN functionality?</summary>

Access to Ads and SKAdNetwork reporting/configuration is available to customers of Branch's [Performance product](https://help.branch.io/using-branch/docs/packaging).

</details>

### Troubleshooting

<details>
<summary>How can I test SKAN once I have update the iOS SDK and Branch configuration?</summary>

For information on testing SKAdNetwork, please see [this documentation guide](https://help.branch.io/using-branch/docs/enable-skadnetwork).

</details>

<details>
<summary>Why don’t I see SKAdNetwork campaign data in my Branch Sources?</summary>

You cannot view SKAdNetwork data in the Branch Sources dashboard. SKAdNetwork data can only be viewed in the SKAdNetwork-specific reporting UI in Branch.

This is due to Apple's intentional SKAdNetwork design limitations: Apple only shares a [limited amount of attribution data](https://developer.apple.com/documentation/storekit/skadnetwork/verifying_an_install_validation_postback#3592477) with advertisers, and does not provide any device-level data (i.e., device ID, timestamps, geo, IP, etc.) that could be used to deduplicate against other sources that Branch tracks.

</details>

<details>
<summary>Why am I not seeing my event metadata in the Branch SKAdNetwork dashboard?</summary>

SKAdNetwork works differently from traditional app attribution systems, which means the data you see is more limited.

- **Traditional attribution.** Typically, when you track events via the Branch SDK, you can view contextual metadata (*i.e., Geo, Revenue, timestamp*) for those events in the Branch dashboard.
- **SKAdNetwork attribution.** SKAdNetwork only allows a single conversion value for down-funnel reporting, and Apple intentionally designed the system to [limit the contextual metadata available for that event](https://developer.apple.com/documentation/storekit/skadnetwork/verifying_an_install_validation_postback#3592477). This means you won't see event metadata like Geo, Revenue, or timestamp for SKAdNetwork events in the Branch dashboard.

</details>

<details>
<summary>Why don’t I see test data after updating my app for SKAdNetwork?</summary>

- Because SKAdNetwork is meant to prevent the ability for any party to tie attributions back to a user, Apple only confirms conversions to advertisers after an undetermined threshold of conversions happen for the publisher & campaign ID.
- SKAdNetwork does not attribute conversions in real-time. When the app is installed, a 24 hour rolling timer begins and only when that timer expires, can the install then be attributed after an additional 0-24 hours. Every time an additional conversion is reported with a conversion value greater than the previous value, the 24 hour rolling timer is reset and the install does not get attributed until that 24 hour timer is allowed to expire. Apple offers a developer profile [here](https://developer.apple.com/download/more/), that can reduce the timers for testing from 24 hours to 5 minutes.
- If your app uses [App Clips](https://developer.apple.com/app-clips/), any API calls to SKAdNetwork from an app clip’s code will have no effect, return empty strings, or return values that indicate unavailability. See disclaimer at the bottom of Apple's docs [here](https://developer.apple.com/documentation/storekit/skadnetwork).

</details>

<details>
<summary>Why am I seeing fewer conversions than expected after updating my app for SKAdNetwork?</summary>

When a conversion is reported to Apple from inside the app, it does not add that count to a running tally or immediately send a conversion postback. It only replaces the prior reported conversion value, as long as its value is a higher priority (63 is the highest priority, 0 is the lowest).

When the app is installed, a 24 hour rolling timer begins. If no additional conversion is reported before that 24 hour rolling timer expires, only an install will be attributed for that user. Any subsequent conversions sent to Apple for that user will not be attributed.

This means that for any user, Apple will at most, only report a single postback containing an Install or Reinstall and the highest priority conversion associated with that install session.

</details>

<details>
<summary>Can SKAdNetwork be tested via TestFlight?</summary>

If you're an advertiser asking this question, the answer is no. However, the situation is slightly more nuanced.

To receive an SKAdNetwork postback:

- The advertiser app (the app being advertised) must be live in the App Store, with SKAdNetwork implemented.
- The publisher app (the app showing the ad) can be installed via Xcode or TestFlight. However, note that the `source-app-id` parameter will always be 0 if the publisher app has not been installed via the App Store.
- You also need to be using a physical device, because the iOS Simulator cannot access the App Store

</details>

<details>
<summary>Why are my SKAN reinstall numbers so much higher than Branch usually shows?</summary>

SKAdNetwork reports reinstalls via the redownload postback parameter, which Apple defines this way: “A Boolean flag that indicates the customer redownloaded and reinstalled the app when the value is true.”

Similar to the [Redownload numbers provided by Apple Ads](https://searchads.apple.com/help/advanced/0027-mobile-measurement-providers/), this data is likely coming directly from Apple's internal records for that customer. That means it is different from (and more accurate than) anything a third-party like Branch could infer, even prior to iOS 14: depending on the situation, Branch would see these events as either re-opens or simple installs.

</details>
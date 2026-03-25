---
title: "Implement Attribution Methods"
slug: implement-attribution-methods
---

## Overview

Branch makes several mechanisms available for users to pass data through to the app and attribute app sessions back to the source (where users determine that such use is consistent with applicable law and relevant platform policies). We always use the method with the highest confidence rate. When we are 100% confident, the deep link data will contain the variable `+match_guaranteed=true`.

::: warning Caution
When implementing data-sensitive use cases (ie auto-login, PNR visualization), the mobile app logic should parse the flag `+match_guaranteed` from the SDK initialization callback and deep link users **only when its value is true**.

Post-iOS 14, `+match_guaranteed` will usually be false on install events, unless users opt-in to IDFA collection.
:::

## Key terms

## Methods with 100% accuracy

### Direct deep linking

If the app is currently installed on the phone, and you've configured your Branch Links with your app's URI scheme (`myapp://`) or to use Universal or App Links, we will open the app immediately and pass a click identifier through to our native library. This click identifier is then sent to the Branch servers to retrieve the dictionary of data associated with the link.

For example, we'd call `myapp://open?link_click_id=123456` to open the app immediately. The Branch native library parses out `link_click_id: 123456` and passes it back to the Branch API to retrieve the data dictionary associated with that link click.

### Deferred deep linking using iOS NativeLink™

With the introduction of iOS 15 & iCloud+ Private Relay, Branch released deferred deep linking through the iOS pasteboard. By enabling NativeLink™, you will be able to guarantee that deferred deep linking will work with 100% accuracy (`+match_guaranteed=true`). Users will be presented with a Deepview that enables users to continue their user experience in an app by clicking on the main call-to-action (CTA).![1530](/img/e85d059-nativelink_iphone12prographite_portrait(1).png "nativelink_iphone12prographite_portrait.png")

To implement iOS NativeLink™, follow the instructions in our [developer documentation](ios-advanced-features.md#nativelink-deferred-deep-linking).

### Install referrers

An Install Referrer is a mechanism to support deterministic matching/attribution on Android devices downloading apps in specific app stores.

::: tip Tip
In order to have support for Install Referrers, make sure your [Branch Android SDK](android-basic-integration.md) is updated to the latest version and is implementing the [required dependencies](android-basic-integration.md#3-add-dependencies).
:::

#### How install referrers work

![](/img/182b154-Install_Referrer(1).png "Install Referrer.png")

1. Advertiser integrates with App Stores (Google Play, Huawei, Samsung, & Xiaomi) and releases the app.
2. Advertiser delivers an app download ad with an install referrer on the specific App Store.
3. Publisher app requests and displays the ad.
4. User clicks the ad in the app and can choose to download and install the advertiser's app.
5. The App Store writes the install referrer to an API.
6. The Branch SDK initializes and collects the referrer from the App Store via API.
7. The app install event is reported in Branch's attribution system.

#### Supported install referrers

| Install Referrer | Compatibility |
| --- | --- |
| Google Play Store | - Google Play App v8.3.73+ |
| Huawei AppGallery | - EMUI v3.0+ - HMS Core v2.6.5+ |
| Samsung Galaxy Store | - Galaxy Store v4.5.20.1+ |
| Xiaomi GetApps | - GetApps v22.6.0.0+ |

### Device ID across the Branch Platform

As users engage with apps and websites where the Branch SDK is integrated, Branch's attribution engine algorithm is improved where it makes connections between browser cookies that are collected upon Branch link click and device identifiers collected upon the user's engagement with the app.

When a user clicks a Branch link to open an app that uses the Branch SDK, Branch is able to deterministically attribute that user if we've previously seen that user on our platform click a Branch link and we've already paired their Branch browser cookie to their device ID. This means when they install the app, and a device ID is available, we know with 100% certainty that they're the same user that just clicked a Branch link on that device's browser.

As hundreds of millions of users of apps that use Branch click Branch Links, and our platform continues to make more browser-app connections, you can benefit from improved attribution accuracy through our attribution engine that is optimized each time it connects end users between browser to app..

### Leveraging other techniques

We've built out custom deep linking mechanisms that are specific to each platform to ensure that deep linking is accurate. Here are some of those techniques we use:

| Method | Implementation Details |
| --- | --- |
| **Custom user logins** | Branch's mobile & web SDKs allow developers to assign their own custom user IDs to web & app events, which we can then use as an additional data point to attribute events back to the same user. Branch takes great care to educate all developers to never use [personal identifiers](best-practices-to-avoid-sending-pii-to-branch.md#developer-identity) in these fields, but when available, these allow us to augment our methodology with anonymous data specific to the app using them. |
| **Platform integrations** | Branch has direct integrations with [Apple, Facebook, Google, Twitter, and Snap](self-attributing-networks-sans.md), where the platforms will directly confirm if a specific user engaged with an ad on their platform. Branch is then able to compare these touch points against all other user interactions sourced by Branch Links, to enable a greater level of attribution accuracy across organic & paid platforms. |
| **SKAdNetwork** | Branch supports Apple's SKAdNetwork framework for campaign-level attribution. While this doesn't allow the ability to surface user-level insights, because all app store installs are verified at the campaign level by Apple, these numbers are guaranteed at 100% certainty. |

## Methods without 100% accuracy

### Predictive modeling engine across the Branch Platform

When a user clicks a Branch link to open an app that uses the Branch SDK, it's possible our attribution engine has paired their Branch browser cookie to their device ID to attribute the user deterministically. However, even if their device ID is unavailable, we're able to pair that browser cookie to other associated device metadata like IP addresses & User Agents to attribute the user probabilistically.

As hundreds of millions of users of apps using Branch click Branch Links, we can use these connections to power our predictive modeling engine that can provide greater attribution accuracy when connecting app behaviors back to browser touches.

### Browser to app snapshot comparison

Branch collects limited device-level information when a user is in the browser -- via a click on a Branch link -- and then after they open the app. This includes IP Address (including v6), OS, OS version, device model, user agent and other parameters described in our [Privacy Policy](https://branch.io/policies/privacy-policy/).

When no other mechanism is available, we compare the unique data collected in the app to the unique data collected in the browser, and if enough data points align within that specific moment in time, then we can say with a high probability that it's the same user.

### iOS 26 with Safari

Safari 26 on iOS/iPadOS/visionOS freezes the OS token in the UA string on iPhone OS 18\_6 (regardless of the actual OS being iOS 26). This means that the user agent OS token gets frozen at 18\_6. When this happens, Branch labels iOS 26 devices as iOS 18.6 devices due to the data provided in the user agent.

Branch has accounted for this on our end (no SDK update required) and we perform the following matching:

- If the `os_version` is present and the iOS version is 18.6 or higher, Branch will use the browser version for attribution.
- If the `os_version` is present but the `browser_version` is missing, Branch will fallback to using the `os_version`.

  - In this case a match would not be made and probabilistic attribution would not work.
- If the the `os_version` is not present, your matching will continue to perform like normal.

This impacts deferred deep linking, matching and attribution logic, and analytics reporting by OS version.

Branch accounts for this in cases where the `os_version` is provided by the DSP. For cases where os\_version is not available, we **strongly recommend** using [NativeLink™](https://help.branch.io/docs/nativelink-deferred-deep-linking).

## Customize criteria

If you are concerned that different users may be conflated by having the same anonymous metadata, you can choose to have Branch do nothing if two identical sets of metadata are under consideration.

On the Dashboard's [Link Settings](https://dashboard.branch.io/link-settings) page, under advanced options, you should set **Match Type** to `Unique`.

![image](/img/match-type-unique(1).png)

You can also modify the attribution windows for any integration by following [these instructions](self-attributing-networks-sans.md) in the dashboard. Attribution windows essentially define your acceptable timeframes for how long any downstream conversions can be attributed back to a corresponding link click or ad impression.

![](/img/7f7bf23-Screen_Shot_2020-08-16_at_9.34.37_AM(1).png "Screen Shot 2020-08-16 at 9.34.37 AM.png")

## Web SDK

The [Branch Web SDK](web-sdk-overview.md) is used for web-to-app use cases and attribution for conversions that happen on mobile web.

::: info Note
You must implement the Web SDK on multiple pages (homepage, product detail pages, etc.) to ensure proper user experience and measurement.
:::

#### How does it work?

When a user lands on a page with the Branch Web SDK initialized, the SDK makes a request to specific Branch endpoints (`v1/open` and `v1/pageview`). A cookie is stored in local storage with data that will be used to initialize a Journeys banner (if applicable). Full details on what is captured are outlined in Branch's [Privacy Policy](https://branch.io/policies/privacy-policy/).

Additionally, the Web SDK can utilize the same deterministic matching technique of [custom user login](branch-methodology-overview.md#leveraging-other-techniques) for matching.

##### Click to event matching

Using Branch's [Predictive Modeling (PREM)](predictive-modeling.md), the Web SDK can create a match between a link click and an event that happens on web. On link click, PREM observes characteristics like IP, User Agent, etc., in order to best match the click to the web session that contains the Branch Web SDK-captured characteristics like IP. Subsequent events tracked by the user on web will also be tied to what PREM is able to probabilistically match.

#### ITP impact

Branch's Web SDK uses *localstorage* and *sessionstorage* to store some data that are important to how we do attribution for Safari users. If this data gets wiped on a particular user's Safari browser Branch may be forced to create a new browser ID for that user, resulting in fragmentation. The impact of ITP is minimal because the Branch Link Graph is based on first-party interactions with deep links, and is able to reconnect these identity fragments in a privacy-friendly way as ITP creates them. Even with the most recent update, which blocks all third-party cookies and puts a 7-day cap on all script-writable storage, the impact is minimal.

## FAQ

<details>
<summary>How does Limit Ad Tracking impact Branch attribution?</summary>

A user's Limit Ad Tracking preference is passed through from Branch to ad networks. The ad network can then decide whether or not to target the user. The value of the flag does not explicitly affect attribution.

Having said that, when limit ad tracking is enabled on iOS, no IDFA is made available on the device. This means that for iOS users with limit ad tracking enabled, Branch will not make calls to self-attributing networks (e.g. Twitter, Facebook, Google, Snap) using the IDFA. However, Branch will use IDFV instead when available.

For more privacy tools, including the ability to opt users out of Branch attribution, please visit our docs page on [SDK Privacy Controls](https://help.branch.io/developers-hub/docs/sdk-privacy-controls).

</details>

<details>
<summary>When a user clicks a web-only email link on iOS and they get directed into the app before getting kicked out to web, does Branch still count as app open?</summary>

Yes, Branch will register an open if a web-only link is clicked, despite the app kicking the user back out to web.

</details>

<details>
<summary>Can Branch track impressions on desktop?</summary>

Impressions are recorded for both Desktop and mobile platforms. However, VTA (View through attribution) is only applicable for mobile as the device identifiers (AAID and IDFA) are mandatory for attribution. Any conversions recorded without the device identifiers are counted as Organic.

See [View Through Attribution Process](https://help.branch.io/partners-portal/docs/view-through-attribution-qa-process) for more information.

</details>

<details>
<summary>Can I track user data location through Branch?</summary>

Yes, Branch uses signals from SDK and users' IP addresses to determine user location. You can use 'Country', 'Geo' or 'region' to 'Compare by' on the Branch Dashboard.

You can also find this information from log level exports.

</details>
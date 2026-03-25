---
title: "Enable Apple Ads"
slug: enable-apple-ads
---

## Prerequisites

To enable Apple Ads, you first need to:

1. Create a [Branch Dashboard](https://dashboard.branch.io/).
2. Enable Ads for your Branch account. Contact your Branch account manager or visit <https://branch.io/pricing>.
3. Have a mobile developer prepared to implement the Apple Ads token.
4. Have admin access to your Apple Ads account.

## Enable Apple Ads

### 1. Configure token

You have to choose **one** of the following options for retrieving the Apple Ads Token to get started with enabling Apple Ads with Branch:

- via SDK **or**
- via Server-to-Server (S2S)

For more information on configuring the Apple Ads Token, please visit our [developer documentation](configure-apple-ads-token.md).

### 2. Connect Apple Ads in Branch

In the Branch Dashboard under **Ads > Partner Management**, find/search for Apple Ads or click [here](https://dashboard.branch.io/ads/partner-management/a_apple?tab=settings) to go there directly.

Click the **Sign in With Apple** button to complete authentication. You'll also be able to select your organization here.



Click the **Save & Enable** button after authentication.

Afterward, you should see a successful integration status:



### 3. Configure attribution windows

After authenticating your Apple Ads account with Branch, navigate to the [**Attribution Windows tab**](https://dashboard.branch.io/ads/partner-management/a_apple?tab=attribution_windows) to set windows by attribution type.

You have full freedom to choose your attribution windows; however, it may cause discrepancies between Branch and Apple Ads when comparing data if you don’t use the recommended windows.

| Attribution type | Apple’s recommended attribution window |
| --- | --- |
| click to session start | 1 day |
| click to install | 7 days |
| click to conversion event | 30 days |

### 4. Launch Apple Ads campaigns

You've now completed the setup steps! Now you can start running campaigns to see data flowing into Branch.

::: info Note
If an Agency manages your Apple Ads campaigns, please see [Agency-managed SAN Campaigns](what-is-a-self-attributing-network.md#agency-managed-san-campaigns).
:::

### 5. Verify data in Branch

You can go to the [**Ads Analytics page**](https://dashboard.branch.io/ads/analytics/activity) to view your Apple Ads performance in the Branch Dashboard.

All performance registered from Apple Ads will automatically be tagged with the `Channel: Apple App Store` and the `Ad Partner: Apple Ads`. The campaign will be set to the `Campaign Name` you've configured in the Apple Ads dashboard.



::: info Info
For more details on Apple Ads reporting and analytics, view our guide [here](apple-search-ads-data-reporting.md).
:::

## Apple privacy frameworks

### SKAdNetwork

Apple Ads supports SKAdNetwork (SKAN) attribution tracking for **SKAN versions 1.0, 2.0, and 3.0 only**.

Using Apple Ads with SKAN helps you better understand how users discover and download your iOS app through Apple's advertising platform.

If you enable SKAN attribution tracking with Apple Ads, you'll get better insights into how users find your app through:

- App Store search results
- App Store Today tab
- App Store Search tab
- App Store product pages

If you want to access this new attribution data, you first need to:

1. Enable SKAN direct postbacks.
2. Have your technical team implement a simple app update.

### Ad Attribution Kit

Ad Attribution Kit (AAK) is Apple’s attribution framework that succeeds SKAN. Branch supports AAK for Apple Ads campaigns.

#### Implementation

To use AAK with Branch for Apple Ads attribution, you must add AAK configuration to your app’s Info.plist file in addition to your existing SKAdNetwork entries. Follow [Apple’s AAK configuration guide](https://developer.apple.com/documentation/adattributionkit/configuring-an-advertised-app) for more details.

::: warning Caution
Apps without AAK configuration will **experience attribution interruption for Apple Ads as users upgrade to iOS versions 26.2+**.
:::

## Data mappings

The table in this section details how Branch maps Apple Ads fields to Branch fields.

Additional notes about the columns:

- `body_campaign_id`: Apple will only send Branch 4 possible values for this field.
- `last_attributed_touch_data_tilde_campaign`: Branch takes `body_campaign_id` and maps it to this field.
- **Touch type**: The value for this field will alway be “Taps” (clicks).
- `body_fidelity_type`: Branch reflects the touch type in this field, using the value 1 to indicate clicks.

| `body_campaign_id` | `last_attributed_touch_data_tilde_campaign` | Touch type | `body_fidelity_type` |
| --- | --- | --- | --- |
| 10 | APPSTORE\_SEARCH\_RESULTS | Taps | 1 |
| 20 | APPSTORE\_TODAY\_TAB | Taps | 1 |
| 30 | APPSTORE\_SEARCH\_TAB | Taps | 1 |
| 40 | APPSTORE\_PRODUCT\_PAGES\_BROWSE | Taps | 1 |

## Advanced steps and troubleshooting

<details>
<summary>Install discrepancies when compared with Apple Ads dashboard</summary>

There are a few possible causes of discrepancies with Apple Ads. Due to the low customizability of Apple Ads' attribution settings, discrepancies are often higher on Apple Ads than other platforms, even though performance may be solid and reporting may be working as expected. The best way to attempt reconciliation with Apple Ads installs and Branch is to look at 'New Download' counts, but subtract the percentage of LAT on users found by grouping LAT on/off in reporting. This will give an estimate of new downloads with LAT off, while Branch reports first opens from those downloads.

- **Time zones** - Ensure your Apple Ads time zone (in Settings > Overview > Account Information ) matches your Branch Dashboard time zone (visible under Account Settings).
- **Limit Ad Tracking (LAT) On** - Apple Ads doesn't report installs to third parties if the user has Limit Ad Tracking. However, the Apple Ads dashboard shows all installs by default, regardless of limit ad tracking state. If the newer framework is properly set up, attribution will still be provided for LAT-on or ATT opted-out users and this will not be a source of discrepancy, but if the new framework is not set up properly this may still cause a difference in numbers.
- **Attribution Windows** - Apple Ads attributes all installs within 30 days of an Apple Ads click to itself. Branch's default click to install attribution window is 7 days. You can modify Branch's click to install window. You can modify your Apple Ads attribution windows in Branch.
- **Last-click attribution** - Apple Ads attributes all installs within 30 days of an Apple Ads click to itself. Branch will attribute to the last click within its attribution windows, which can often be a different source than Apple Ads.
- **Reinstalls** - Apple Ads' dashboard shows reinstalls as conversions in its default view, but Branch calls these installs "REINSTALLS." In the Apple dashboard, select New Downloads or Redownloads in the column selector to align data.
- **Attribution API timeouts or delays** - Apple Ads Attribution API can be slow to respond. Although customers can edit the timeout, the default Branch timeout in the code above is just over 1 second. If Apple Ads responds after this timeout, Branch will not attribute the install to Apple Ads.
- **Opens vs. installs** - Branch considers the first open to be the install. Apple Ads considers the time that the user downloaded the app to be an install. This can cause discrepancies in counts and date of install.

</details>

<details>
<summary>Adding deep linking to Apple Ads</summary>

Since this integration doesn't utilize Branch Links, options for deep linking are limited. We'll pass back the value you use for `campaign` in the Apple Ads dashboard. Since this value is controlled by you, you can put anything there, but it will reflect on the Branch dashboard. We will track installs regularly.   
You can retrieve this parameter in the app to be used for [deep linking](ios-advanced-features.md#general-deep-linking).

</details>

<details>
<summary>Installs or conversion events appearing without keywords in Branch Dashboard</summary>

There are Keyword and Search Match match sources for Apple Ads. The Search Match feature automatically matches your ad to relevant user searches on the App Store, rather than a rubric of preassigned keywords. Installs attributed to Search Matches do not have keywords associated with them. Search Match can be enabled & disabled at the Ad Group level in the Apple Ads dashboard.

</details>

<details>
<summary>Using TestFlight app or Developer App</summary>

If you are using the new Apple Ads framework and are debugging or testing your app using the TestFlight app or developer app, Apple Ads returns dummy values of test campaign data with Campaign ID as `1234567890` which will be visible in the Branch Dashboard. Please ensure to filter it out when looking at your Apple Ads attributed campaign data in the Dashboard.

</details>

<details>
<summary>Re-Authentication</summary>

If you ever need to restart your integration with Apple Ads, you must do so by clicking the Reset Settings cog button in the Apple Ads settings in the [Branch Dashboard](https://dashboard.branch.io/ads/partner-management/a_apple?tab=settings). Clicking the Disable button at the bottom will not reset your integration.   


</details>
---
title: "SKAdNetwork Dashboard Reports"
slug: skadnetwork-dashboard-reports
---

::: info Attention
This article is related to Branch’s legacy SKAdNetwork (SKAN) dashboard reporting experience.  
  
Our new Branch Analysis tool offers customizable dashboards made up of flexible widgets to capture the data you need. Branch Analysis is being rolled out to customers in phases. While you're waiting for access, discover how to filter, share, and export campaign performance across different channels on our [Analysis Overview](https://help.branch.io/docs/branch-analysis) page.
:::

## Overview

SKAdNetwork (SKAN), once enabled, will give you enhanced reporting on all of your SKAN-related campaigns directly on the Branch Dashboard.

## What does it look like?

The Branch Dashboard shows you all the information about your SKAN campaigns in the **SKAdNetwork** [tab](https://dashboard.branch.io/ads/analytics/skadnetwork), which is found on the **Analytics** page under **Ads**.

.png "SKAN Analytics.png")

You'll be able to determine:

- Which ad networks drove the most downloads
- Which highest conversion events are being performed the most

  - You can identify the effectiveness of each conversion value tier as **low, medium, or high** (only available for SKAN 4.0)

::: info Branch SKAN Dashboard Availability
You are *only* able to view SKAN Data in the Branch in the following areas of the Branch Dashboard:

- **SKAN Activity**
- **SKAN Unified View**

You cannot view SKAN data in other areas of the Branch Dashboard (ex. [Sources](https://dashboard.branch.io/sources)) due to Apple's intentional SKAN design limitations: Apple only shares a [limited amount of attribution data with advertisers](https://developer.apple.com/documentation/storekit/skadnetwork/verifying_an_install_validation_postback#3592477) and does not provide any device-level data *(i.e., device ID, timestamps, geo, IP, etc.)* that could be used to deduplicate against other sources that Branch tracks.
:::

## SKAN Unified View

There is also a view in the Branch Dashboard that combines both your SKAN and non-SKAN attribution data in one unified view called **SKAN Unified View**.



For more details, please see our full SKAN Unified View guide [here](unified-analytics.md).

## SKAdNetwork Activity

::: tip SKAN 4.0+ Granularity
With SKAN 4.0+, additional attributed touch granularity will be available such as ad and creative. As ad networks expand their APIs to support these fields, Branch will retrieve all available data.
:::

Different from how other Branch Dashboard reports are configurable, SKAN reports are configured mainly through setting a specific metric to compare. These metrics can be found at the top of the page underneath the **Date Range** section:



Selecting your preferred metric will dynamically update the report generated on this page.

| Compare By Metric | Description |
| --- | --- |
| Ad Networks | Sets the **Compare by** parameters to:   - date - ad network |
| Campaigns | Sets the **Compare by** parameters to:   - date - ad network - campaign id |
| Source Apps | Sets the **Compare by** parameters to:   - date - source app id |
| Conversion Events | Sets the **Compare by** parameters to:   - date - conversion value |
| Downloads | Sets the **Compare by** parameters to:   - date - download type |
| Custom Report | With **Custom Report**, you'll be able to create your own report using your chosen compare by parameters. This is helpful for things generating customized reports to show specific data. For example, **Limit 2** additional parameters. |

For more details on general Branch Dashboard Reports can be found [here](dashboard-reports.md).

#### Dimensions



| Dimension | Description |
| --- | --- |
| Source App ID | This is the ID of the app that the ad was displayed in |
| Downloads | The total number of Postbacks that Branch receives for what you are filtering on.Downloads = Installs + Reinstalls |
| Installs | The total number of postbacks that Branch receives when redownload = `false` outside [second and third postback](skadnetwork-data.md#postback-data-tiers). measurement window. |
| Reinstalls | The total number of postbacks that Branch receives when redownload = `true` outside [second and third postback](skadnetwork-data.md#postback-data-tiers) measurement window. |
| Total Conversion Events | The total number of postbacks with a conversion value (conversion value is not null).For example, if Branch receives ten postbacks with conversion value 5 and seven postbacks with conversion value 6, Total Conversion Events would equal 17. |
| Mapped Conversion Value | Description of what the conversion value is mapped to. In most cases, this will be an event name. |
| Coarse Conversion Value - Low, Medium, or High | Available only for SKAN 4.0. An indicator for for the coarse conversion value if the app provides one. |
| Coarse Conversion Value - UNAVAILABLE | Google Ads responds 'UNAVAILABLE' for Crowd anonymity restrictions, if the postback contains a fine value, or v3 postbacks (coarse not supported) |
| Coarse Conversion Value - NONE | Advertiser coarse value configuration is missing for measurement window |
| Campaign ID | SKAdNetwork ID - Campaign ID from the Apple postback |
| Partner Campaign ID | Internal campaign ID from the ad partner. This is an optional field that ad partners can send to Branch and may not be available for all campaigns/ad partners. |
| Partner Campaign Name | Partner campaign name. This is an optional field that ad partners can send to Branch and may not be available for all campaigns/ad partners. |
| Download Type | Which type of download a row represents; this corresponds directly with the redownload value received in the postback. A "false" value indicates the data is for installs, and a "true" value indicates the data is for reinstalls. |
| Clicks | Number of times users tapped on the SKAN campaign. |
| Impressions | Number of times users saw the SKAN campaign. |
| Assists | The number of postbacks received by Apple that didn't win the final attribution but the user saw the ad. Up to five other ad networks can receive postbacks of non-winning attribution if their ad leads to an impression and is dependent on the ad partner providing that information to Branch.For example, if the user downloads the app from an ad click on Ad Network A, but saw the ad from Ad Networks, B, C, D, E, and F, the number of assists will be 5. |

#### Comparison Parameters

| Parameter | Description |
| --- | --- |
| Ad Network | The name of the ad network running the campaign. |
| Ad Set ID | Ad Set ID supplied by some ad partners. |
| Ad Set Name | Ad set name supplied by some ad partners. |
| Body Version | The version of the SKAdNetwork API being used by the publisher app. |
| Campaign ID | The Non-Apple Campaign ID supplied by some ad partners. |
| Conversion Value | Conversion value (0-63) which represents a post-install action. The highest conversion value that the end-user performed during the timer will be reflected. |
| Coarse Conversion Value - Low, Medium, or High | Available only for SKAN 4.0. An indicator for for the coarse conversion value if the app provides one. |
| Fidelity Type | If 1, this represents a Store-Kit rendered ad (App Store product page, rendered by Store Kit) If 0, this represents a "View-Through" ad (Custom, provided by ad network). |
| Mapped Alias | The annotated customer event alias. |
| Mapped Conversion Value | Mapped value of the conversion value received. |
| Mapped Lower Revenue | Mapped value of the lower revenue value received. |
| Mapped Upper Revenue | Mapped value of the upper revenue value received. |
| Partner Campaign ID | The ID of the SKAN campaign supplied by some ad partners. |
| Partner Campaign Name | The name of the SKAN campaign supplied by some ad partners. |
| Source App ID | App ID of publisher app. |

### SKAN 4

SKAN 4 introduced new data fields that Branch can use to enhance your reporting to help you understand campaign performance. A simple way to look at SKAN 4-only metrics is to apply the following filter to the activity chart and/or table:

| Filter | Operator | Value |
| --- | --- | --- |
| body version | equals | `4.0` |



#### Coarse Conversion Value

You can also generate reports to analyze your campaigns with respect to Tier 1+ postbacks for SKAN 4 campaigns. To do this, you can apply the following:

| Show | Compare by (Only for Custom Report) | Dimension |
| --- | --- | --- |
| - coarse conversion value - low   - coarse conversion value - medium  - coarse conversion value - high | - coarse conversion value | - coarse conversion value - low   - coarse conversion value - medium  - coarse conversion value - high |



## Troubleshooting

SKAdNetwork (SKAN) introduced a brand new type of attribution when it comes to mobile measurement. As such, there can rise many different types of issues related to integration, data, and reporting. This guide serves to help debug and troubleshoot anything SKAN-related.

#### Data is not Appearing in the Branch Dashboard

Because SKAdNetwork is meant to prevent the ability of any party to tie attributions back to a user, **Apple only confirms conversions to advertisers after an undetermined threshold of conversions happens** for the publisher & campaign ID.

**SKAdNetwork does not attribute conversions in real time.** When the app is installed, a 24-hour rolling timer begins, and only when that timer expires, can the install then be attributed after an additional 0-24 hours. Every time an additional conversion is reported with a conversion value greater than the previous value, the 24-hour rolling timer is reset and the install does not get attributed until that 24-hour timer is allowed to expire. **Apple offers a developer profile** [**here**](https://developer.apple.com/download/more/)**, that can reduce the timers for testing from 24 hours to 5 minutes.**



::: info App Clips
If your app uses [App Clips](https://developer.apple.com/app-clips/), any API calls to SKAdNetwork from an app clip’s code will have no effect, return empty strings, or return values that indicate unavailability. See the disclaimer at the bottom of Apple's docs [here](https://developer.apple.com/documentation/storekit/skadnetwork).
:::

#### Fewer conversions after updating my app for SKAdNetwork

When a conversion is reported to Apple from inside the app, it does not add that count to a running tally or immediately sends a conversion postback. It only replaces the prior reported conversion value, as long as its value is a higher priority (63 is the highest priority, 0 is the lowest).

When the app is installed, a 24-hour rolling timer begins. If no additional conversion is reported before that 24-hour rolling timer expires, only an install will be attributed to that user. Any subsequent conversions sent to Apple for that user will not be attributed.

This means that for any user, Apple will at most, only report a single postback containing an Install or Reinstall and the highest priority conversion associated with that install session.

#### I'm not seeing my event metadata in the Branch Dashboard

SKAdNetwork works differently from traditional app attribution systems, which means the data you see is more limited.

- **Traditional attribution**. Typically, when you track events via the Branch SDK, you can view contextual metadata (i.e., Geo, Revenue, timestamp) for those events in the Branch dashboard.
- **SKAdNetwork attribution**. SKAdNetwork only allows a single conversion value for down-funnel reporting, and Apple intentionally designed the system to [limit the contextual metadata available for that event](https://developer.apple.com/documentation/storekit/skadnetwork/verifying_an_install_validation_postback#3592477). This means you won't see event metadata like Geo, Revenue, or timestamp for SKAdNetwork events in the Branch dashboard.

#### SKAN Reinstall Numbers

SKAdNetwork reports reinstalls via the `redownload` postback parameter, which Apple defines this way:

> A Boolean flag that indicates the customer redownloaded and reinstalled the app when the value is true.

Similar to [the Redownload numbers provided by Apple Ads](https://searchads.apple.com/help/advanced/0027-mobile-measurement-providers/), this data is likely coming directly from Apple's internal records for that customer. That means it is different from (and more accurate than) anything a third-party like Branch could infer, even prior to iOS 14: depending on the situation, Branch would see these events as either re-opens or simple installs.
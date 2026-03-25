---
title: "TikTok For Business Overview"
slug: tiktok-for-business
---

![1211](/img/6ba357b-TikTok_Logo.png "TikTok Logo.png")

::: tip Branch Certified Partner
- [**Overview**](tiktok-for-business.md#overview) (this page)
- [Enable TikTok For Business](enable-tiktok-for-business.md)
- [TikTok SKAdNetwork](tiktok-skadnetwork.md)
- [TikTok Data & Reporting](tiktok-data-reporting.md)
:::

## Overview

::: info Different Integrations
Branch has two module integrations with TikTok For Business: one works with TikTok using trackers to capture attribution information, and the other works with TikTok as a self-attributing network (SAN). This article is about setting up the SAN integration.  
Inform your TikTok representative when you activate the SAN integration in Branch.

**IMPORTANT:** During the transition to the SAN integration, do not deactivate the [non-SAN module](tiktok-for-business.md)
:::

Brand new features are emerging in the industry, and TikTok For Business can now support attribution standards via an API endpoint and an Ad Link. As a Mobile Measurement Partner (MMP), Branch can connect with TikTok For Business through a back-end connection through set endpoints. By combining TikTok's self-attribution network (SAN) data with Branch's exclusive cross-channel Link Graph, you will uncover the true drivers of user activity across every ad network and channel. Additionally, you'll be able to compare your campaign performance directly on the Branch Dashboard.

**Note:** The legacy non-SAN integration will still be functional until all apps can transition to the new SAN integration.

## How does it work?

1. Branch connects with TikTok For Business through an MMP API Endpoint through account authentication in the Branch Dashboard.
2. Events are configured to send from Branch to TikTok For Business.
3. Once campaigns are launched, users see an ad to download your app through the different placements run by TikTok For Business.
4. User installs the app and performs in-app events (ex. PURCHASE)

   - The Branch SDK captures the app install and downstream events.
5. Branch communicates with TikTok For Business through the MMP API Endpoint and sends TikTok For Business data about the conversion.

   1. Branch will also send data from Ad Links for reporting; thus, maximizing attribution coverage
6. TikTok For Business claims conversions by sending the click/impression campaign data that sourced it to Branch.
7. The Branch Dashboard will update reports for you to be able to compare and measure ad campaigns across placements, ad type, etc.

## TikTok For Business Campaign Support

### Supported Placements

| Placement |
| --- |
| TikTok |
| News Feed App Series |
| Pangle |
| Helo |

## Limitations

## Data Sharing

::: warning Data Purge & Sharing
- Branch will purge the last-attributed data fields after 60 days
- TikTok For Business data is not shared with third parties

  - Data/analytics partners integrated with Branch will not receive TikTok For Business data (both click and view data)
:::

Branch keeps all of the event data that was sent from TikTok For Business on the event, such as mobile device ID. Branch wipes all data that we would not have without TikTok For Business sharing, such as campaign info.

### View-Through Data

You may access some view-through attributed conversion data through Branch's [Custom Exports API](custom-exports-api.md) and [Webhooks](webhooks.md) using the following fields:

| EO Field | Value |
| --- | --- |
| `last_attributed_touch_type` | IMPRESSION |
| `last_attributed_touch_data_dollar_3p` | a\_tiktok |

When conversions are attributed to TikTok ad campaigns, you exports/webhooks will populate the following fields:

| Field | Value |
| --- | --- |
| Ad Partner Name | TikTok For Business SAN |
| Ad Partner $3p | a\_tiktok |
| Channel | TikTok For Business SAN |
| Attribution Touch Type | IMPRESSION |
| Attribution Touch Timestamp | Unix Timestamp only day, month, and year. Hour, minute, and second are removed. |

Note: Any other attributed touch fields will still be reported as null.

When viewing impression-attributed data and reports in the Branch Dashboard, only aggregate data is available.

## iOS Attribution

| Ad Type | Platform Flow | App Installed | Publisher | Advertiser | | SKAN Availability | Direct Deep Linking | Deferred Deep Linking | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Opt-In | Opt-Out | Advertiser Opt-In | Advertiser Opt-Out |
| TikTok App Install | App to App | No | Opt-In | Device-level Attribution via [IDFA](advertising-identifiers-for-attribution.md#ios-identifiers) (SAN) | No Attribution | ✔ | N/A | ✔ | ✔ |
| Opt-Out | No Attribution | No Attribution | ✔ | N/A | ✔ | ✔ |
| TikTok App Engagement | Yes | Opt-In | Device-level Attribution via [IDFA](advertising-identifiers-for-attribution.md#ios-identifiers) (SAN) | No Attribution | ✘ | ✔\* | N/A | N/A |
| Opt-Out | No Attribution | No Attribution | ✘ | ✔\* | N/A | N/A |

**\*Deep Linking assumes the ad unit is using Branch** [**Ad Links**](ad-links.md)

For additional information on iOS 14 Impact on TikTok, visit the [iOS 14 FAQs](ios-14-faqs.md#other-networks-ios-14)
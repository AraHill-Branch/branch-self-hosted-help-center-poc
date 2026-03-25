---
title: "Snap Overview"
slug: snap
---



## Overview

Branch offers advanced ad attribution insights with integration for [Snap](https://forbusiness.snapchat.com/ad-products). Using Snap's self-attribution network (SAN) data and Branch's mobile measurement system, you can see how many installs and conversion events were attributed to Snap, allowing you to make informed decisions with your advertising dollars.

Branch and Snap supports mobile app conversion attribution for the following campaign objective and goal-based bidding objectives:

| Campaign Objective | Goal-Based Bidding Objective |
| --- | --- |
| Drive Traffic to App | Acquisition:   - Swipe Up - Install - App Purchase - Add to Cart - App Sign Up |
| Drive Traffic to App | Re-Engagement:   - Swipe Up - App Open (Re-Engagement) - App Purchase (Re-Engagement) |

#### Additional Campaign Identifiers

::: info Snap Advanced Conversions
To utilize additional campaign identifiers, [Snap Advanced Conversions](snap-advanced-conversions.md) need to be **enabled**.
:::

Snap appends a Click ID, known as the `ScCid` parameter, to deep links on iOS and Android devices for opt-in and opt-out users. Branch then parses the `ScCid` from events and provides them to Snap for attribution and campaign optimization.

## Prerequisites

Before you begin, be sure the following is confirmed.

- First, the Branch SDK must be integrated into your app, for both iOS and Android.
- You must also collect the IDFA on iOS, or the AAID on Android. For specifics, refer to the set up guide for [iOS](ios-sdk-overview.md) and [Android](android-sdk-overview.md) respectively.
- Make sure to track all necessary events through the SDKs.

In order to enable Snap, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/?_gl=1*15zk0r2*_ga*MTM3OTcwNTU1OC4xNjkzNTg5NjI0*_ga_KSDD8Y11CT*MTY5ODQxNzkzOS4xMi4xLjE2OTg0MjYyOTYuNjAuMC4w).
2. Enabled Ads for your Branch account.

   1. Contact your Branch account manager or visit <https://branch.io/pricing>
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   1. [Track events](track-branch-events.md)
4. Admin access to your Snap account.

## Enable Snap

### 1. Connect Snap in Branch

In the Branch Dashboard under **Ads >** [**Partner Management**](https://branch.dashboard.branch.io/ads/partner-management/), find/search for Google AdWords. If you're already logged into the Branch Dashboard, you can also click [here](https://branch.dashboard.branch.io/ads/partner-management/a_snap?tab=settings) to go there directly.

Click the **Log In With Snapchat** button to authenticate with your Snap account.



After connecting, Snap should be connected to Branch!

### 2. Add Snap App ID

Enter your **Snap App ID**. To use different IDs for your Android and iOS apps, check the **Use different iOS and Android IDs** box. To add multiple Snap App IDs, separate each value with a comma.

::: info Connecting Multiple Accounts
All SANs - including Snap - accept multiple accounts. However, only a single Branch user can authenticate the integration. This means that the single user must have access to all of the accounts you wish to connect.
:::



Click the **Save** button, and you can verify all of your Snap information:



## Viewing Snap Data

::: warning Data Purge
- Branch will purge last-attributed data after 60 days.
:::

### View Attribution on Dashboard

All attribution can be visible on the [Branch dashboard summary page](https://dashboard.branch.io/). All installs and opens registered from this channel will automatically be tagged with `Ad Partner`: `Snap`. Other analytics tags will reflect the campaign, ad squad and ad names you set up in the Snap Ads dashboard.

Note that these stats are **limited to the date range** at the top of the page. You can expand the range if you'd like.

### Data Mapping

#### Event Names

Branch supports sending [Standard and Custom Events](track-branch-events.md) to Snap.

Below are the mappings for Branch events to Snap events.

| Branch Event Name | Snap Event Name | Sent by Default |
| --- | --- | --- |
| `INSTALL` | `APP_INSTALL` | Yes |
| `VIEW_ITEM` | `VIEW_CONTENT` | Yes |
| `ADD_TO_CART` | `ADD_CART` | Yes |
| `INITIATE_PURCHASE` | `START_CHECKOUT` | Yes |
| `PURCHASE` | `PURCHASE` | Yes |
| `ADD_PAYMENT_INFO` | `ADD_BILLING` | Yes |
| `COMPLETE_REGISTRATION` | `SIGN_UP` | Yes |
| `SEARCH` | `SEARCH` | Yes |
| `ACHIEVE_LEVEL` | `LEVEL_COMPLETE` | Yes |
| `OPEN / REINSTALL` | `APP_OPEN` | Yes |
| `SUBSCRIBE` | `SUBSCRIBE` | Yes |
| `CLICK_AD` | `AD_CLICK` | Yes |
| `VIEW_AD` | `AD_VIEW` | Yes |
| `COMPLETE_TUTORIAL` | `COMPLETE_TUTORIAL` | Yes |
| `INVITE` | `INVITE` | Yes |
| `LOGIN` | `LOGIN` | Yes |
| `SHARE` | `SHARE` | Yes |
| `RESERVE` | `RESERVE` | Yes |
| `UNLOCK_ACHIEVEMENT` | `ACHIEVEMENT_UNLOCKED` | Yes |
| `ADD_TO_WISHLIST` | `ADD_TO_WISHLIST` | Yes |
| `SPEND_CREDITS` | `SPENT_CREDITS` | Yes |
| `RATE` | `RATE` | Yes |
| `START_TRIAL` | `START_TRIAL` | Yes |
| `VIEW_ITEMS` | `LIST_VIEW` | Yes |
| [Custom](track-branch-events.md#track-custom-events) Branch Event | `SAVE` | No |
| [Custom](track-branch-events.md#track-custom-events) Branch Event | `PAGE_VIEW` | No |

Snap also allows 5 slots for custom events. To use these slots, you can create a Branch [Event](track-branch-events.md) (either Standard or Custom), and that will get mapped to a Snap event that begins with `CUSTOM_EVENT_...`.

| Branch Event | Snap Event Name | Sent by Default |
| --- | --- | --- |
| Branch Event (Standard or Custom) | `CUSTOM_EVENT_1` | No |
| Branch Event (Standard or Custom) | `CUSTOM_EVENT_2` | No |
| Branch Event (Standard or Custom) | `CUSTOM_EVENT_3` | No |
| Branch Event (Standard or Custom) | `CUSTOM_EVENT_4` | No |
| Branch Event (Standard or Custom) | `CUSTOM_EVENT_5` | No |

#### Campaign Data

Branch maps the following data fields from Snap to Branch.

| Branch Data | Snap Data | Parameter in Deep Link URL |
| --- | --- | --- |
| `~campaign` | `campaign_name` | `cname` |
| `~campaign_id` | `campaign_id` | `cid` |
| `~ad_set_name` | `ad_squad_name` | `adsetname` |
| `~ad_set_id` | `ad_squad_id` | `adsetid` |
| `~ad_name` | `ad_name` | `adname` |
| `~ad_id` | `ad_id` | `adid` |
| `~ad_account_id` | `ad_account_id` | `adacctid` |

#### Metadata

| Branch metadata | Snap Metadata | Description |
| --- | --- | --- |
| SKU (list of) | `item_ids` | International Article Number (EAN) when applicable, or other product or category identifier. |
| `Quantity` | `number_items` | Number of items. |
| `revenue` | `price` | Monetary value of the conversion event in float format. Please do not include currency symbols or commas as part of the value. (ex. single value: price=34.24, multiple values: price=99.43,45.34;34.27) |
| `currency_code` | `currency` | Currency in standard ISO 4217 code (ex. EUR, USD, JPY). Required if price is included. |
| `transactionID` | `transaction_id` | Transaction ID. |
| `searchQuery` | `search_string` | The text string that was searched. |
| `custom_data.level` | `level` | Level in the game. |

#### Cost Data

- To view the cost metrics Branch provides, please see [SAN Cost Data](what-is-a-self-attributing-network.md#san-cost-data).
- If you're seeing discrepancies, please see [Common Sources of SAN Reporting Discrepancies](common-sources-of-san-reporting-discrepancies.md).

### Troubleshooting

#### Discrepancies

- Snap Ads Manager time zones are set at the time your ad account is created. You can see your Snap time zone in your Snap Ad Account Settings, but you cannot change it. You can change your Branch dashboard time zone in [Account Settings](https://dashboard.branch.io/account-settings/app) to match.
- Verify your Snap attribution windows match your Branch attribution windows. Ask your Snap account manager for your attribution windows. Your Branch windows are visible either in Link Settings (global windows) or in the [Attribution Windows](https://dashboard.branch.io/ads/partner-management/a_snap?tab=attribution_windows) section of the Snap entry in Ads Partner Manager. Snap windows can be configured under "Customize Columns" in the Snap UI.



- When deep linking, create a link via the Branch dashboard. If you are running an app campaign, please ensure your link has `%24deeplink_no_attribution=true` as a query parameter to remove that link's ability to claim attribution, otherwise the link may claim attribution over the SAN claim. The link will still deep link.
- Snap's reporting API does not provide any "compare by" functionality outside of the ads analytics tags. So, you cannot compare Snap click + impression data by platform, OS or country, for example.

#### Exporting Snap Data

::: warning Restrictions on Raw Data Exports
Snap is introducing upcoming restrictions for User-Level Raw Data Exports (‘Log-Level Restrictions’) that will impact all third party MMP platforms that work with Snap.

Branch customers will experience the effects of this change starting **January 3rd, 2024**.

**What does this change look like within Branch?**

For Branch customers, Snap's privacy-enhancing reporting changes will mean:

- Restrictions to log-level view-through conversion data, limiting certain fields such as campaign-level data and timestamp. This impacts the following Branch products:

  - The Daily Exports, Custom Exports, and Scheduled Log Exports APIs
  - Third-party Data Integrations
  - Webhooks
  - Ad Partner Postbacks
- Advertisers can still see Snap as the media source for view-through conversions; however, campaign-level breakdowns will be unavailable for raw data exports.
- Campaign-level aggregate data will continue to be provided through the Branch Dashboard and aggregate-level APIs, as well as through Snap’s own reporting interfaces and API.

**How will Branch de-identify data?**

For attribution reports that include view-through engagement, Branch will make the following adjustments to de-identify such data:

- The Media Source (PID) will be Snapchat, and will not otherwise be obfuscated or restricted.
- Snap campaign information will be removed, specifically:

  - Ad Account ID
  - Campaign ID
  - Ad Squad ID
  - Ad ID (and associated names)
- Attributed touch time will be reported as date only (dd/mm/yyyy)
- Deep link URI information will be removed

**Restricted Parameters**

| Snap Parameter | Branch Parameter |
| --- | --- |
| ad\_account\_id | ~advertising\_account\_id |
| ad\_id | ~ad\_id |
| ad\_name | ~ad\_name |
| country | ~country\_or\_region |
| request\_id | N/A |
| snap\_channel | ~secondary\_publisher |
| deep\_link\_url | external\_intent\_uri, universal\_link\_url, android\_app\_link\_url |
:::

You can see analytics on impressions, clicks, installs, opens and conversion events on various pages of the Branch Dashboard.

We cannot send device-level Snap attribution data to third parties. Thus, we cannot send events attributed to Snap via Data Integrations. Please instead consider analyzing this data in-house (using Webhooks, the Daily Export API, or CSV Exports), or using the Branch Dashboard for all of your analytics and attribution needs.

## Snap SKAdNetwork

Branch and Snap are integrated for SKAdNetwork! For customers using the Branch SDK, Branch will provide Snap your conversion value mapping for campaign optimization.

Snap requires that Snap event names be used in order to make use of that mapping. In order to accomodate, Branch will send the Snap event name for your conversion values as long as you have the correct events mapped under Partner Management --> Event Config.

To check if we will send Snap event names for your conversion value mapping:

1. Go to Ads --> Partner Management --> Snap --> Event Config
2. Add Branch MMP to Snap. Select Branch from the 'Please share postbacks with this MMP' drop down field in the **Snap App Details**



3. Ensure that the Branch events you are using for Conversion Values are mapped to corresponding Snap event names

## Advanced

### Snap App ID

Snap App IDs are generated by an advertiser in Snap’s Business Manager or when they register their app for Snap at <https://kit.snapchat.com/>and tied to the advertiser’s organization ID. Snap App IDs are associated to an advertiser’s organization in Snap’s ad platform. If the Snap App ID is generated in Snap Kit, it will need to be linked to their organization in Business Manager.

Advertisers will only be able to build mobile app custom audiences from their mobile measurement events inside Snap’s ad platform from postback events that have their Snap App ID(s).

Learn more about the [Snap App ID](https://businesshelp.snapchat.com/en-US/article/snap-app-id).

### Snap Audience Network

Snap Audience Network (SDK and RTB) is a network where advertisers can expand the reach of their campaigns beyond Snapchat. Conversion attribution will work the same as Snapchat conversion attribution and advertisers will have the ability to run a single campaign across both Snapchat and  
the Snap Audience Network (SAN).

Learn more about [Snap Custom Audiences](https://businesshelp.snapchat.com/en-US/a/custom-audiences).

### Deep link support for Snap Campaigns

Branch Links can be used for click & impression tracking, however, you cannot leverage Branch Links directly in the Deeplink field. Snap currently restrics any Universal Link or App Link or MMP redirect link in their paid media campaigns ([Snap documentation](https://businesshelp.snapchat.com/s/article/deeplink-specs?language=en_US#:~:text=Deep%20Link%20Specifications)). For SAN deferred deep linking support go [here](san-deferred-deep-linking.md).

Your app needs to be able to read the Deep link URI **AND** any additional data necessary for routing.

1. Ensure that your app is set up to read custom URI scheme key:value pairs for the purposes of deep link routing
2. Fetch your URI scheme from the Branch app configuration.
3. Combine your URI scheme with your required key:value pair (e.g. yourBranchappscheme://yourKeyValue).
4. Set up your Snap campaign, selecting **Drive Traffic to App**.



3. On the **Build Your Ads** page:

   1. Paste your Branch URI scheme into the **DEEPLINK URI** field.
   2. Select **Web Site** as the **FALLBACK TYPE** and add web URL to ensure routing for non-app users.



4. Finish building your Snap campaign.

::: warning Web Site as Fallback Required for Deferred Deep Linking
Please ensure you choose **Web Site** as the **FALLBACK TYPE** and inserting the same Branch Link into the provided field. If you choose **App Install** as the `FALLBACK TYPE`, users not properly routed will be sent to the App Store without the Branch Link and deferred deep linking will not occur.
:::

::: info Agency-Managed Campaigns
- If an Agency manages your Snap campaigns, please see [Agency-managed SAN Campaigns](what-is-a-self-attributing-network.md#agency-managed-san-campaigns).
:::
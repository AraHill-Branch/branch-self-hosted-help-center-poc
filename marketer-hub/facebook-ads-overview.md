---
title: "Facebook Ads Overview"
slug: facebook-ads-overview
---



## Overview

Branch Links can be used together with [Facebook](http://facebook.com/) ads, allowing you to track ad-driven installs on the Branch Dashboard and deep link those new users directly to the content the first time they open your app. Refer to [Facebook's Ad Guide](https://www.facebook.com/business/ads-guide) to learn more.

Facebook's Ad Platform supports numerous campaign types and a shared set of advertisement formats. This guide will help you navigate Facebook's Advertisement Platform and show you how to use Branch Links in all major Facebook ad types.

## Campaign support

This documentation supports the following Facebook Ad Campaigns:

| Facebook campaign category | Campaign type/objective | Link users to | Branch documentation link | Branch ad format |
| --- | --- | --- | --- | --- |
| Awareness | Brand Awareness | Web | [**link**](facebook-platform-ads.md#brand-awareness-campaign-setup) | Cross-platform Display |
| Awareness | Reach | Web | [**link**](facebook-platform-ads.md#reach-campaign-setup) | Cross-platform Display |
| Consideration | Traffic | Web or App | [**link**](facebook-traffic-and-conversion-ads.md#traffic-campaign-setup) | Cross-platform Display |
| Consideration | App Installs | App | [**link**](facebook-app-install-ads.md) | App Only: Installs |
| Consideration | Video Views | Web | [**link**](facebook-platform-ads.md#video-views-campaign-setup) | Cross-platform Display |
| Consideration | Lead Generation | Web x | [**link**](facebook-platform-ads.md#lead-generation-campaign-setup) | Cross-platform Display |
| Conversion | Conversions | Web or App | [**link**](facebook-traffic-and-conversion-ads.md#conversions-campaign-setup) | Cross-platform Display |

::: warning Warning
If you have **more than one app** using the same Facebook Account ID, SKAdNetwork data may only appear in one of those apps. Do not connect the same Facebook Account ID in multiple apps to avoid visualization issues.
:::

::: warning Warning
Facebook has confirmed that impression tracking links are **not supported in any ad placement**, and click tracking links are only available in a **subset of placements.**
:::

## Data mapping between Branch and Facebook

### Event names

::: info Note
Please follow the [Tracking Commerce, Content, Lifecycle and Custom Events](track-branch-events.md) guide when implementing event tracking in the Branch SDK.  
When tracking any of the Facebook events that are mapped to the Branch `custom` event, use the event name from the table below; e.g. `branch.logevent('AdClick')`.
:::

| **Facebook event name** | **Branch event name** |
| --- | --- |
| `AdClick` | `Custom` |
| `AdImpression` | `Custom` |
| `Contact` | `Custom` |
| `CustomizeProduct` | `Custom` |
| `Donate` | `Custom` |
| `fb_mobile_achievement_unlocked` | `UNLOCK_ACHIEVEMENT` |
| `MOBILE_APP_INSTALL` | `INSTALL` |
| `fb_mobile_activate_app` | `OPEN` |
| `fb_mobile_add_payment_info` | `ADD_PAYMENT_INFO` |
| `fb_mobile_add_to_cart` | `ADD_TO_CART` |
| `fb_mobile_add_to_wishlist` | `ADD_TO_WISHLIST` |
| `fb_mobile_complete_registration` | `COMPLETE_REGISTRATION` |
| `fb_mobile_content_view` | `VIEW_ITEM` |
| `fb_mobile_initiated_checkout` | `INITIATE_PURCHASE` |
| `fb_mobile_level_achieved` | `ACHIEVE_LEVEL` |
| `fb_mobile_purchase` | `PURCHASE` |
| `fb_mobile_rate` | `RATE` |
| `fb_mobile_search` | `SEARCH` |
| `fb_mobile_spent_credits` | `SPEND_CREDITS` |
| `fb_mobile_tutorial_completion` | `COMPLETE_TUTORIAL` |
| `FindLocation` | `Custom` |
| `Schedule` | `Custom` |
| `StartTrial` | `START_TRIAL` |
| `SubmitApplication` | `Custom` |
| `Subscribe` | `Custom` |

### Campaign and Ad Data

| **Branch data** | **Facebook data** |
| --- | --- |
| `last_attributed_touch_data_tilde_ad_set_name` | `campaign_name` |
| `last_attributed_touch_data_tilde_ad_set_id` | `campaign_id` |
| `last_attributed_touch_data_tilde_secondary_publisher` | `publisher_platform` |
| `last_attributed_touch_data_tilde_creative_name` | `creative_name` |
| `last_attributed_touch_data_tilde_creative_id` | `creative_id` |
| `last_attributed_touch_data_tilde_ad_name` | `adgroup_name` |
| `last_attributed_touch_data_tilde_ad_id` | `adgroup_id` |
| `last_attributed_touch_data_tilde_campaign` | `campaign_group_name` |
| `last_attributed_touch_data_tilde_campaign_id` | `campaign_group_id` |

::: warning Caution
The `creative_id` and `creative_name` fields are automatically set server-side on Facebook for Cost, Clicks, and Impressions sent to Branch.
:::

### Metadata

| **Branch key-value pair** | **Facebook MMP key-value pair** | **Facebook event(s) supported** |
| --- | --- | --- |
| `event_data.revenue` | `_valueToSum` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `event_data.currency` | `fb_currency` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_content_view` |
| `content_items(array).$quantity` | `fb_num_items` | `fb_mobile_initiated_checkout`, `fb_mobile_purchase` |
| `content_items (array)` | `fb_content (array)` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_tutorial_completion`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `content_items[i].$sku` | `fb_content_id` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_tutorial_completion`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `content_items[i].$product_category` | `fb_content (array)` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_search`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `content_items[i].$product_brand` | `fb_content (array)` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_search`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `content_items[i].$product_name` | `fb_content (array)` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_search`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `content_items[i].$price` | `fb_content (array)` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_search`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `content_items[i].$og_title` | `fb_content (array)` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_search`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `content_items[i].$keywords` | `fb_content (array)` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_search`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `content_items[i].$custom_fields` | `fb_content (array)` | `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_purchase`, `fb_mobile_rate`, `fb_mobile_search`, `fb_mobile_spent_credits`, `fb_mobile_content_view` |
| `event_data.search_query` | `fb_search_string` | `fb_mobile_search` |
| `custom_data.fb_payment_info_available` | `fb_payment_info_available` | `fb_mobile_initiated_checkout` |
| `custom_data.level` | `fb_level` | `fb_mobile_level_achieved` |
| `custom_data.fb_success` | `fb_success` | `fb_mobile_add_payment_info`, `fb_mobile_tutorial_completion`, `fb_mobile_search` |
| `custom_data.fb_registration_method` | `fb_registration_method` | `fb_mobile_complete_registration` |

Branch will send all content items tracked for an event, if supported.

Also, Branch will automatically map `"fb_content_type":"product"` for in-app events when the advertiser [tracks](create-branch-objects-and-events.md#buo-content-metadata-properties) `ContentMetadata` via a Branch SDK. Otherwise, Branch will not add the `fb_content_type` variable.

## Viewing Facebook data

You can see analytics on impressions, clicks, installs, opens and conversion events on various pages of the [Branch Dashboard](https://dashboard.branch.io).

::: info Note
If you're seeing discrepancies between Facebook and Branch data, please see [Common Sources of SAN Reporting Discrepancies](common-sources-of-san-reporting-discrepancies.md).
:::

### Data limitations

::: info Note
- Branch may redact specific metrics/events (ex. INSTALLS) through the Branch Dashboard or through Aggregate Exports of Facebook-attributed campaigns when aggregation levels are not high enough to prevent the potential de-anonymization of specific Facebook users or if it is non-aggregated view-through and click-through data.

  - In these cases, the Branch Dashboard will display "undisclosed" in reports and Aggregate Exports will show `null` in responses.
- Only for Android events, you can get the event detail but not "undisclosed" with [Facebook Install Referrer](facebook-install-referrer.md).
- We cannot send device-level Facebook attribution data to third parties, unless attribution results utilized the [Facebook Install Referrer](facebook-install-referrer.md) or [Aggregate Event Measurement](enable-app-aggregated-event-measurement-support.md).
- This data is also not returned in the deep link session initialization callback within the app. If you have analytics needs that are not met by the Branch Dashboard, please [contact us](submit-a-ticket.md) and include "Facebook MMP + Feature Request" in the subject.
- Branch will purge last-attributed data after 60 days.
:::

| **Branch feature** | **Facebook data included** |
| --- | --- |
| [Dashboard visualizations](https://dashboard.branch.io/) | Pre-aggregated analytics |
| [Query API](query-api.md) | Pre-aggregated analytics |
| [Liveview](https://dashboard.branch.io/liveview) | Pre-aggregated analytics |
| [Daily Export API](daily-exports-api.md) | Not supported |
| [CSV Exports](https://branch.dashboard.branch.io/data-import-export/csv-exports) | Pre-aggregated analytics |
| [Webhooks](webhooks.md) | Pre-aggregated analytics |
| [Data Integrations](data-integration-partners.md) | Not supported |

::: tip Tip
Looking for **Advanced Mobile Measurement**? Visit our dedicated [guide](meta-advanced-mobile-measurement.md).
:::

### Facebook Limited Data Use

On July 1st 2020, Facebook introduced a new [Limited Data Use (LDU)](https://www.facebook.com/business/help/1151133471911882) feature to support customer compliance with the California Consumer Privacy Act (CCPA). This feature enables you to limit how Facebook uses the data of users in states where Limited Data Use is available. This data could be collected by you or by third parties on your behalf.

If the Limited Data Use feature is enabled, Facebook will process data in accordance with its role as a service provider or processor with respect to flagged personal information from people in states where Limited Data Use is available. This means Facebook will limit use of that data subject to their [State-Specific Terms](https://www.facebook.com/legal/terms/state-specific).

To invoke Meta Limited Data Use for your users, please use any [Consumer Protection Preference](https://help.branch.io/developers-hub/docs/honoring-opt-out-of-processing-requests#configure-sdk-privacy-controls) other than [FULL](https://help.branch.io/developers-hub/docs/honoring-opt-out-of-processing-requests#using-sdk-privacy-controls).

## Troubleshooting

We also have a document with [FAQs and Advanced Options](facebook-faq-and-advanced-options.md) for Facebook Ads. We recommend starting with one of the guides above, then jumping into the FAQ and Advanced Options when you have questions or need to troubleshoot.
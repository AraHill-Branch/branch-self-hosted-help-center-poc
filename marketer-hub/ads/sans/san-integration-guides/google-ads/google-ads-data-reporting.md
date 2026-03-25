---
title: "Google Ads Data & Reporting"
slug: google-ads-data-reporting
---

## Overview

After connecting Google Ads to Branch, data will seamlessly flow between the two to measure your campaigns' performance. It is helpful to know what kinds of data are passed to each platform to properly compare campaigns and optimize future campaigns. The Branch Dashboard will also populate with helpful reports for campaign measurement.

## Mapping between Google Ads & Branch

#### Campaign data mapping

| Branch data | Google data | Definition | Possible values |
| --- | --- | --- | --- |
| `~campaign_id` | `campaign_id` | The numeric campaign ID of the campaign that produced the ad event. This value is guaranteed unique. | Google Ads Campaign ID |
| `~campaign` | `campaign_name` | The advertiser-defined campaign name of the campaign that produced the ad event. This value is not guaranteed unique. | Google Ads Campaign,  Name |
| `~ad_format` | `ad_type` | The type of ad that resulted in the ad event. This value can be used to distinguish between various types of inventory as follows. | ClickToDownload, AppDeepLink, AppDeepLinkContinue, Unknown |
| `~channel` | `network_type` | This field will identify the Google Ads advertising network the ad event occurred on. | Display,  GoogleTV,  Cross-network,  Search,  Youtube,  Unpopulated |
| `~country` | `country` | User’s country code. | 2-letter country code |
| `~secondary_publisher` | `network_subtype` | This field will identify the “subtype” of the Google Ads advertising network the ad event occurred on. The possible values vary by primary network type. | Display,  GoogleTV,  Cross-network,  GoogleSearch,  SearchPartners,  YouTubeVideos,  Unpopulated |
| `~tags` | `campaign_type` | This field will identify the type of campaign that produced the ad event. | UAC, UACe, Search, Display, Video, Shopping |
| `~ad_set_name` | `ad_group_name` | The advertiser-defined ad group name that produced the ad event. | Google Ads Ad Group Name |
| `~ad_set_id` | `ad_group_id` | The numeric ID of the ad group that produced with the ad event. | Google Ads Ad Group ID |
| `~ad_id` | `creative_id` | The numeric ID of the creative ad unit that produced the ad event. Only provided when campaign\_type is not UAC. | Google Ads Creative ID |
| `~keyword` | `keyword` | The search keyword associated with the ad event. Only provided when network\_type is Search and campaign\_type is not UAC. | Google Ads Keyword |

#### Event mapping

Once you begin tracking events through the Branch SDK, you can select which events to import in Google Ads. Google Ads has pre-defined events that map to pre-defined Branch events, listed below.

Regardless of campaign type, Branch will forward in-app events to Google Ads for campaign optimization. In addition, Branch will receive attribution data for rich analysis in the Branch Dashboard.

| Branch Event | Google Event |
| --- | --- |
| `INSTALL` | `first_open` |
| `OPEN` | `session_start` |
| `PURCHASE` | `in_app_purchase` |
| `VIEW_ITEM` | `view_item` |
| `VIEW_ITEMS` | `view_item_list` |
| `SEARCH` | `view_search_results` |
| `ADD_TO_CART` | `add_to_cart` |
| `PURCHASE` | `ecommerce_purchase` |
| 'REINSTALL' | ' reinstall\_open' |
| *custom* | `custom` |

#### Event Metadata Mapping

| Branch metadata | Google Ads metadata | Description |
| --- | --- | --- |
| `content_items[].$sku` | `item_id` | The ID of the item being referenced in an app event. Represented as it's SKU number; e,g, `SKU_12345` |
| `custom_data.end_date` | `end_date` | The date when the event ended. The value should be in YYYY-MM-DD format. |
| `custom_data.google_business_vertical` | `google_business_vertical` | The vertical ID associated with the [Google's list of verticals](https://developers.google.com/google-ads/api/reference/data/verticals?hl=en) used for targeting or excluding categories of placements. |
| `custom_data.item_location_id` | `item_location_id` | The location associated with the event. If possible, set to the Google Place ID that corresponds to the associated item; e.g. `L_12345` . Can also be overridden to a custom location ID string. |
| `custom_data.origin` | `origin` | The origin of the feed; possible values:   - UNSPECIFIED - UNKNOWN - USER - GOOGLE |
| `custom_data.search_term` | `search_term` | The term that was searched for; e.g. `t-shirts` |
| `custom_data.start_date` | `start_date` | The date when the event started. The value should be in YYYY-MM-DD format. |
| `event_data_currency` | `currency_code` | The three-character [ISO 4217 code](https://www.iso.org/iso-4217-currency-codes.html); e.g. `USD` for United States Dollar. |
| `revenue` | `value` | The monetary value of the conversion event in float format. |

## Branch Dashboard Reports

#### Available Dimensions to Compare by for UAC

| Dimension | Supported? |
| --- | --- |
| Clicks | ✅ Yes |
| Cost | ✅ Yes |
| Impressions | ✅ Yes |
| Feature | ✅ Yes |
| Channel | ✅ Yes |
| Campaign | ✅ Yes |
| Tags | ❌ No`*` |
| Stage | ❌ No |
| Ad Partner | ✅ Yes |
| OS | ✅ Yes |
| Platform | ✅ Yes`**` |
| Secondary Publisher | ✅ Yes |
| Ad Set Name | ✅ Yes |
| Ad Name | ❌ No |
| Creative Name | ❌ No |
| Keyword | ❌ No |
| Last Touch Type | ✅ Yes |
| Link ID | ❌ No |
| Country | ✅ Yes`**` |

`*`Used to identify the type of campaign, but not customizable. Ex. `ACI`/`ACE`  
`**`Not available on clicks or impressions, but available on attributed activity.

#### Cost Metrics Data

| Analytics tag | Description | Used for |
| --- | --- | --- |
| Cost | Total cost (spend) | Understanding the total amount spent for dimensions (analytics tags, user data, time range) |
| eCPI | cost / installs | Normalizing spend per install, to understand the average price of an install across networks or over time |
| eCPC | cost / clicks | Normalizing spend per click, to understand the average price of an click across networks or over tim |
| eCPM | cost / (impressions / 1000) | Normalizing spend per thousand impressions, to understand the average price of 1000 impressions across networks or over time |
| eCPA | cost / purchases [web and app] | Normalizing spend per purchase, to understand the average price of a purchase across networks or over time |
| Return On Investment (ROI) | (revenue-cost / cost) \* 100 | Deriving return on investment, to understand the percentage "profit" made on ad spend |
| Return On Ad Spend (ROAS) | (revenue / cost) \* 100 | Deriving return on investment by understanding the percentage revenue multiple for a given unit of spend |

#### Engagement Metrics

You can view data for click-through engagement ([Engaged View](https://support.google.com/google-ads/answer/10048752)) conversion metrics for Google Adwords through Dashboard Reports or exports:

| Report/Export | Parameter | Value |
| --- | --- | --- |
| Dashboard Report | `touch subtype` | `engaged_view` |
| Dashboard Custom Exports | Column | Touch Subtype |
| Custom Exports API | `fields` | `last_attributed_touch_data_tilde_touch_subtype` |
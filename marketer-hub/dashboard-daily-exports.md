---
title: "Dashboard Daily Exports"
slug: dashboard-daily-exports
---

## Overview

Granular Branch data is very valuable when it comes to understanding your campaign performance. There are a number of different ways to access your Branch data. One of these methods is using the Branch Daily Exports feature in the Branch Dashboard. Users with the correct permissions can access Daily Exports via the Branch Dashboard (this guide) or via the [Daily Export API](daily-exports-api.md).

Daily Exports through the Branch Dashboard will be outputted in CSV and accessed via an email with a link to the files.

::: info Daily Exports vs. Custom Exports
Branch's daily export is a very powerful tool to get **all of the data columns** associated with each of your clicks, pageviews, installs, opens, events etc. For more information about all of the columns available, take a look at the Daily Export fields below or visit [**Branch Event Ontology**](branch-event-ontology.md).

If you need only a small subset of these columns, need more flexibility around the timing of your data pull, or need to provide your Agencies access to your data, we recommend you use [Branch Custom Exports](dashboard-custom-exports.md).
:::

## Limitations

::: warning
**Apple requires users to opt in to sharing their device data through** [**Apple's AppTrackingTransparency framework**](https://developer.apple.com/app-store/user-privacy-and-data-use/)**. When an install is attributed to paid ads, a 2nd install event will fire post user opt-in.**

Opt-ins will affect your final install count. Our recommendation is to use a different identifier (ex. IDFV) to de-dupe install events on your internal systems.

For additional information on changes post iOS 14.5, visit our [FAQ Pages](ios-14-faqs.md).
:::

| Limitation | Details |
| --- | --- |
| Data Availability | Daily Export data is processed every 24 hours. The API retrieves downloadable files processed by job that runs at 4:00 UTC. Typically, the full day’s data is available by about 7:00 UTC. However, it may take until 20:00 UTC for your full day’s files to be available. Dashboard Daily Exports creates an export job. |
| Max number of days that can be queried at a time | 7 days. However, best practice is to query for 1 day at a time since these exports can be very large. |
| Max number of records per export | Each file will contain a max of 200K rows. If your export contains more than 200K rows, it will be delivered in multiple files. |
| Max lookback | 6 months |
| Test Environment | Not supported |
| Click data related to SANs (e.g. Google Ads) | Can be found at the campaign level rather than the device level. |
| Data Hashing | Many fields are hashed, including IP address and advertising identifiers after 7 days. See [Data Hashing](daily-exports-api.md#data-hashing) for further details. |
| Data Purge | Branch will purge last-attributed data after 60 days |

## Prerequisites

In order to access Dashboard Daily Exports, the following steps need to be completed:

1. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
2. Have [**Sensitive Data and Export access**](add-manage-users-roles-permissions-access.md).

::: danger Agency Access
To protect your sensitive data, we recommend providing your agencies access to your Branch Data via [Custom Exports](dashboard-custom-exports.md) or the [Custom Export API](custom-exports-api.md), as these export formats allow you to filter for exactly the data that your agency needs.
:::

## Request Daily Export

After logging into the Branch Dashboard, in the left-hand navigation, under the **Exports** section, click [**Daily Exports**](https://dashboard.branch.io/daily-exports)

![2332](/img/93ef92c-Daily_Exports.png "Daily Exports.png")

### Select Date Range and Export Topic

Select the date range that you would like to export. Then select the topic that you are looking to export or click on "Export All."

If you are looking for data on your events, be sure to select the topic that matches the events that you would like data on. See below for more information on which topic to select based on the event:

#### Topic Event Mappings:

|  |  |
| --- | --- |
| Commerce Events | - Add To Cart - Add To Wishlist - View Cart - Initiate Purchase - Add Payment Info - Click Ad - Purchase - Reserve - Spend Credits - View Ad |
| Content Events | - Search - View Item - View Items - Rate - Share - Initiate Stream - Complete Stream |
| User Lifecycle Events | - Complete Registration - Complete Tutorial - Achieve Level - Unlock Achievement - Invite - Login - Start Trial - Subscribe - Opt In - Opt Out |
| Custom Events | All other event names |

## Daily Export Fields

::: code-group

```plaintext [Core Data]
id
origin
name
timestamp
timestamp_iso
event_timestamp
store_install_begin_timestamp
referrer_click_timestamp
days_from_install_to_opt_in
days_from_last_attributed_touch_to_event
hours_from_last_attributed_touch_to_event
minutes_from_last_attributed_touch_to_event
seconds_from_last_attributed_touch_to_event
deep_linked
first_event_for_user
customer_event_alias
di_match_click_token
hash_version
request_id
match_guaranteed
custom_data
```

```plaintext [Last Attributed Touch Data]
last_attributed_touch_type
last_attributed_touch_timestamp
last_attributed_touch_timestamp_iso
last_attributed_touch_data_tilde_id
last_attributed_touch_data_tilde_campaign
last_attributed_touch_data_tilde_campaign_id
last_attributed_touch_data_tilde_channel
last_attributed_touch_data_tilde_feature
last_attributed_touch_data_tilde_stage
last_attributed_touch_data_tilde_tags
last_attributed_touch_data_tilde_advertising_partner_name
last_attributed_touch_data_tilde_secondary_publisher
last_attributed_touch_data_tilde_creative_name
last_attributed_touch_data_tilde_creative_id
last_attributed_touch_data_tilde_ad_set_name
last_attributed_touch_data_tilde_ad_set_id
last_attributed_touch_data_tilde_ad_name
last_attributed_touch_data_tilde_ad_id
last_attributed_touch_data_tilde_branch_ad_format
last_attributed_touch_data_tilde_technology_partner
last_attributed_touch_data_tilde_banner_dimensions
last_attributed_touch_data_tilde_placement
last_attributed_touch_data_tilde_keyword_id
last_attributed_touch_data_tilde_agency
last_attributed_touch_data_tilde_optimization_model
last_attributed_touch_data_tilde_secondary_ad_format
last_attributed_touch_data_tilde_journey_name
last_attributed_touch_data_tilde_journey_id
last_attributed_touch_data_tilde_view_name
last_attributed_touch_data_tilde_view_id
last_attributed_touch_data_plus_current_feature
last_attributed_touch_data_plus_via_features
last_attributed_touch_data_dollar_3p
last_attributed_touch_data_plus_web_format
last_attributed_touch_data_custom_fields
last_attributed_touch_data_tilde_keyword
last_attributed_touch_data_tilde_customer_campaign
last_attributed_touch_data_tilde_campaign_type
last_attributed_touch_data_tilde_agency_id
last_attributed_touch_data_plus_touch_id
last_attributed_touch_data_tilde_keyword_match_type
last_attributed_touch_data_tilde_organic_search_url
last_attributed_touch_data_dollar_marketing_title
```

```plaintext [Last CTA View Data]
last_cta_view_timestamp
last_cta_view_timestamp_iso
last_cta_view_data_tilde_id
last_cta_view_data_tilde_campaign
last_cta_view_data_tilde_campaign_id
last_cta_view_data_tilde_channel
last_cta_view_data_tilde_feature
last_cta_view_data_tilde_stage
last_cta_view_data_tilde_tags
last_cta_view_data_tilde_advertising_partner_name
last_cta_view_data_tilde_secondary_publisher
last_cta_view_data_tilde_creative_name
last_cta_view_data_tilde_creative_id
last_cta_view_data_tilde_ad_set_name
last_cta_view_data_tilde_ad_set_id
last_cta_view_data_tilde_ad_name
last_cta_view_data_tilde_ad_id
last_cta_view_data_tilde_branch_ad_format
last_cta_view_data_tilde_technology_partner
last_cta_view_data_tilde_banner_dimensions
last_cta_view_data_tilde_placement
last_cta_view_data_tilde_keyword_id
last_cta_view_data_tilde_agency
last_cta_view_data_tilde_optimization_model
last_cta_view_data_tilde_secondary_ad_format
last_cta_view_data_plus_via_features
last_cta_view_data_dollar_3p
last_cta_view_data_plus_web_format
last_cta_view_data_custom_fields
last_cta_view_data_plus_touch_id
last_cta_view_data_tilde_campaign_type
```

```plaintext [User Data]
user_data_os
user_data_os_version
user_data_model
user_data_browser
user_data_geo_country_code
user_data_app_version
user_data_sdk_version
user_data_geo_dma_code
user_data_environment
user_data_platform
user_data_aaid
user_data_idfa
user_data_idfv
user_data_android_id
user_data_limit_ad_tracking
user_data_user_agent
user_data_ip
user_data_developer_identity
user_data_language
user_data_brand
user_data_cross_platform_id
user_data_past_cross_platform_ids
user_data_prob_cross_platform_ids
user_data_os_version_android
user_data_geo_city_code
user_data_geo_city_en
user_data_http_referrer
user_data_installer_package_name
user_data_cpu_type
user_data_screen_width
user_data_screen_height
user_data_build
user_data_internet_connection_type
user_data_opted_in
user_data_opted_in_status
user_data_oaid
```

```plaintext [Event Data]
event_data_revenue_in_usd
event_data_exchange_rate
event_data_transaction_id
event_data_revenue
event_data_currency
event_data_shipping
event_data_tax
event_data_coupon
event_data_affiliation
event_data_search_query
event_data_description
```

:::
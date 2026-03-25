---
title: "Apple Ads Data & Reporting"
slug: apple-ads-data-reporting
---

## View attribution on Dashboard

All attribution is visible on the [Branch Dashboard summary page](https://dashboard.branch.io/).

All **installs**, **opens**, and **view-through conversions (VTCs)** registered from this channel will automatically be tagged with the `channel`: `Apple App Store` and the `Ad Partner`: `Apple Ads`. The `campaign` will be set to the Campaign Name you've configured in the Apple Ads dashboard.

Due to [Apple's attribution API limitations](https://searchads.apple.com/help/reporting/0028-apple-ads-attribution-api), it may take up to 30 days for full attribution of a device.

Note that these stats are **limited to the date range** at the top of the page. You can expand the range if you'd like.

::: info Note
- To view the cost metrics Branch provides, please see [SAN Cost Data](what-is-a-self-attributing-network.md#san-cost-data).
- If you're seeing discrepancies, please see [Common Sources of SAN Reporting Discrepancies](common-sources-of-san-reporting-discrepancies.md).
:::

### Incompatible dimensions

For some dimensions, you will see special callouts before adding them to your reports. Based on which dimensions are added, Branch will select the appropriate data source. If there is a clash between dimensions, we'll select a ["default" data source](paid-ads-analytics.md). Branch will also provide warning icons to describe the collision:



### Keyword ID

With the new framework, `keywordId` is also passed to Branch , and you may use that in your Compare Bys to measure your campaign performance.



This is also available in Branch's [Query API](https://help.branch.io/apidocs/query-api) in the `last_attributed_touch_data_tilde_keyword_id` field in all EO topics.

### Keyword name and ad set name

With the new framework, Branch is now able to retrieve keyword names and Ad set names for Apple Search Campaigns, and you may use that in your Compare Bys to measure your campaign performance.

## Data mapping and reporting

Branch fetches two [types of reports](https://developer.apple.com/documentation/apple_search_ads/reports) from the Apple Ads API: keyword-level and ad-level.

These reports are different, but they share some fields in common. The tables below outline which fields are exclusively in keyword-level reports, which fields are exclusively in ad-level reports, and which fields are in both (universal).

Additionally, the fields that Branch receives from the Apple API are mapped to Branch fields. These mappings are also included in the tables below.

### Keyword-level fields

The following fields are included **only** in keyword-level reports:

| Apple Ads Parameter | Branch Mapped Field |
| --- | --- |
| `keyword` | `last_attributed_touch_data_tilde_keyword` |
| `keywordId` | `last_attributed_touch_data_tilde_keyword_id` |

### Ad-level fields

The following fields are included **only** in ad-level reports:

| Apple Ads Parameter | Branch Mapped Field |
| --- | --- |
| `adName` | `last_attributed_touch_data_tilde_ad_name` |
| `adId` | `last_attributed_touch_data_tilde_ad_id` |
| `creativeName` | `last_attributed_touch_data_tilde_creative_name` |
| `creativeId` | `last_attributed_touch_data_tilde_creative_id` |

### Universal fields

The following fields are included in **both** keyword-level and ad-level reports:

| Apple Ads Parameter | Branch Mapped Field |
| --- | --- |
| `campaignName` | `last_attributed_touch_data_tilde_campaign` |
| `campaignId` | `last_attributed_touch_data_tilde_campaign_id` |
| `adGroupName` | `last_attributed_touch_data_tilde_ad_set_name` |
| `adGroupId` | `last_attributed_touch_data_tilde_ad_set_id` |
| `orgId` | `last_attributed_touch_data_tilde_advertising_account_name` |
| `countryOrRegion` | `last_attributed_touch_data_tilde_country_or_region` |

### Default behavior

Since some fields are included in both keyword-level and ad-level reports, Branch prevents duplication by setting a default data source to pull from when dimensions from both types of reports are requested.

**The default data source is keyword-level reports**.

This means:

- If only keyword-level (or keyword-level and universal) dimensions are pulled, then the keyword-level report is the data source.
- If only ad-level (or ad-level and universal) dimensions are pulled, then the ad-level report is the data source.
- If both keyword-level and ad-level (or keyword-level, ad-level, and universal) dimensions are pulled, then the keyword-level report is the data source.

### Recommendations

Branch recommends that you set up two reports: a keyword-level report and an ad-level report, to mirror the setup of the Apple API reporting structure.

For the keyword-level report, include as many keyword-level and universal dimensions as you are interested.

For the ad-level report, include as many ad-level and universal dimensions as you are interested in.

For simplicity, avoid including exclusively keyword-level and exclusively ad-level fields in the same report.
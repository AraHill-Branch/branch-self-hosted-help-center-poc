---
title: "Apple Ads Overview"
slug: apple-ads
---

## Overview

Branch can help track your **Apple Ads** campaigns by fetching the Apple Ads Attribution API. You can then use the parameters you've set in the Apple Ads dashboard, parameters such as the campaign name, and take special action in your app after an install, or simply track the effectiveness of a campaign in the Branch dashboard, along with your other Branch statistics, such as total installs, referrals, and app link statistics.

## How does it work?

1. Branch integrates with Apple Ads through the [Apple Ads Attribution API](https://searchads.apple.com/help/reporting/0028-apple-ads-attribution-api).
2. Once campaigns are launched, User see an ad to download the app.
3. User installs the app and performs in-app events (ex. PURCHASE)

   1. The Branch SDK captures the Apple Ads token for attribution or is set through a server-to-server implementation
4. Branch communicates with Apple Ads through the Attribution API and sends Apple data about the conversion.
5. Apple Ads claims conversions by sending the cost/click/impression data that sourced it to Branch.
6. The Branch Dashboard will update reports for you to be able to compare and measure ad campaigns across campaigns, keywords, etc.

## Limitations

#### Cost data and other dimensions

When selecting cost with `ad id/name` or `creative id/name`, but not including `keyword/keyword id`, cost will show up for both types of product pages. You may see specific columns/dimensions displayed as **Unpopulated** in your Dashboard reports. This is due to limitations from the Apple Ads and what dimensions they can send for the Cost Data.

::: info Cost Data Support
- To view the cost metrics Branch provides, please see [SAN Cost Data](what-is-a-self-attributing-network.md#san-cost-data).
- If you're seeing discrepancies, please see [Common Sources of SAN Reporting Discrepancies](common-sources-of-san-reporting-discrepancies.md).
:::

#### Deep linking

Since this integration doesn't utilize Branch Links, options for deep linking are limited. We'll pass back the value you use for `campaign` in the Apple Ads dashboard. Since this value is controlled by you, you can put anything there, but it will reflect on the Branch dashboard. We will track installs regularly.

You can retrieve this parameter in the app to be used for [deep linking](ios-advanced-features.md#general-deep-linking).

## FAQs

<details>
<summary>Why does CAMPAIGN or CAMPAIGN ID for Apple Ads in Branch Show CampaignName and 1234567890?</summary>

[Apple Ads](https://developer.apple.com/documentation/iad/setting_up_apple_search_ads_attribution) will pass dummy values of "CampaignName" and "1234567890" if distributing the builds in debug mode or a test version using TestFlight. To fix this, disable debug mode and/or release live version.

</details>
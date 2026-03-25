---
title: "TikTok Ads Legacy to SAN Migration"
slug: tiktok-legacy-to-san-migration
---

## Overview

With TikTok For Business's new SAN Integration, there are specific steps necessary to migrate from the ads legacy integration to help reduce the number of discrepancies and issues with your campaign performance.

#### Migration Benefits

The new SAN integration unlocks several benefits:

- Automated and streamlined way to measure attribution and support deep linking for your mobile apps
- Ability to map Branch Custom Events to any TikTok Standard Event to share the SKAdNetwork Conversion Value with TikTok For Business.
- Higher ROAS
- Increased accuracy in attribution for complex campaigns

## Prerequisites

In order to enable TikTok For Business, you need to have completed the following:

1. Admin access to both the Branch and TikTok For Business accounts.

2. Already have the [Legacy Ads TikTok Integration](https://help.branch.io/using-branch/page/tiktok-for-business) enabled.

3. Running TikTok For Business campaigns.

## Migrate to the SAN Integration

### 1. Connect TikTok For Business SAN in Branch

In the Branch Dashboard under **Ads** → [**Partner Management**](https://dashboard.branch.io/ads/partner-management) and search for **TikTok For Business SAN**. It will take you to TikTok’s ad partner configuration [settings](https://dashboard.branch.io/ads/partner-management/a_tiktok?tab=settings).

Then, click the **Log In With TikTok** button and follow the prompts to authenticate your TikTok For Business account

.png)

Be sure to read and agree to the permissions requested by Branch in order to properly authenticate.



Once enabled, Branch will automatically pull your iOS/Android App IDs from the ads legacy integration as well the set attribution windows..png)

### 2. Configure Events

After authenticating your TikTok For Business account to Branch, navigate to the [Events Config](https://dashboard.branch.io/ads/partner-management/a_tiktok?tab=event_config) tab to configure your events.

It is important to add your event mappings here for Branch to properly send event metadata to TikTok For Business for attribution. You should see the events you are tracking with the Branch SDK here when you **Add Event Mappings**. For more details on the TikTok For Business and Branch event and metadata mapping, see the specifications [here](https://dashboard.branch.io/ads/partner-management/a_tiktok?tab=event_config).

.png)

::: info Additional Event Details
If you plan to run TikTok SKAN campaigns and you are tracking Custom Branch Events, make sure you map your Custom Branch Event to TikTok’s Standard Event.
:::

Click the **Save** button to set your event mappings.

### 3. Continue Running Campaigns

New campaigns do not need to be created in TikTok Ads Manager. The existing campaigns should automatically transition to this new SAN integration after the TikTok Events Manager starts showing **App SAN Ready** for the app.

As campaigns run, TikTok For Business will begin sending Branch attribution claims (click-through or view-through) after receiving events (INSTALL, PURCHASE, etc.).

### 4. Verify Metrics in the TikTok Ads Manager

In the [TikTok Ads Manager](https://ads.tiktok.com/), you can verify the status of your campaigns to make sure metrics are populating correctly.

.png)

### 5. Verify Metrics in the Branch Dashboard

In the Branch Dashboard under **Ads** →[Analytics](https://dashboard.branch.io/ads/analytics/activity). Apply the following to the Events table:

| Events Setting | Value |
| --- | --- |
| Compare By | - ad partner (3p) - ad partner - campaign |
| Where | - last attributed touch type equals `CLICK` and `IMPRESSION` - ad partner (3p) equals `a_tiktok` |
| Table Columns | - cost - clicks - impressions - install - reinstalls - Custom Branch Events you are tracking |

.png)

Once you see metrics come in for `a_tiktok` then Branch is receiving attribution claims from TikTok for Business through the SAN integration. You may still see metrics for `a_tiktok_ads` from previous attribution claims. Any new claims should report to `a_tiktok`.

## FAQ

<details>
<summary>Will there be duplicate campaign data in the Branch Dashboard while having both integrations enabled?</summary>

TikTok performance will not be affected; however, there will be duplicate metrics in the Branch Dashboard for cost, click and impression data. Make sure you are filtering your data in the reports through the `ad partner (3p)` equals `a_tiktok` **NOT** `a_tiktok_ads`.

This will only occur during the transition period until TikTok disables their legacy non-SAN support.

</details>
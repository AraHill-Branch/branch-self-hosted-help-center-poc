---
title: "Unified Analytics"
slug: unified-analytics
---

::: info Attention
Unified Analytics is part of the legacy Branch experience.  
  
Our new Branch Analysis tool offers customizable dashboards made up of flexible widgets to capture the data you need. Branch Analysis is being rolled out to customers in phases. While you're waiting for access, discover how to filter, share, and export campaign performance across different channels on our [Analysis Overview](https://help.branch.io/docs/branch-analysis) page.
:::

## Overview

**Unified Analytics** is a [tab](https://branch.dashboard.branch.io/ads/analytics/unified) of the **Ads** section of the Branch Dashboard where campaign data from all attribution methods (SKAdNetwork, [PAM](predictive-aggregate-measurement.md), IDFA, IDFV, Apple Ads, and Android) are merged in a single view after removing duplicate SKAdNetwork data.

With Unified Analytics you will have an easier way to view data on a single report. Other features of Unified Analytics include:

- Corrected attribution for users who were flagged as organic who should have been attributed to non-organic media.
- Ability to flag duplicated SKAN installs with a toggle.

## Prerequisites

In order to enable Unified Analytics, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Enabled Ads for your Branch account.

   - Contact your Branch account manager or visit <https://branch.io/pricing>
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implemented SKAdNetwork](skadnetwork.md).

## Overview Table

![](/img/e1fe872b433e3b07bee82c0438b58c31792b376cd98b1de6f8dbb9fe02e81fa4-Screenshot_2024-11-19_at_10.57.47_AM.png)

The **Overview** [table](https://dashboard.branch.io/ads/analytics/unified) will be the main area for analyzing your campaign performance. Here you will be able to apply certain filters and add dimensions so you and your teams have a full understanding of your marketing efforts across mobile.

Note: Custom Events are **not** supported in Unified Analytics.

## Configuration

### Compare By & Filter

With Unified Analytics, you have the following dimensions to break your report out:

| Dimension | Description |
| --- | --- |
| ad partner | Ad partner of last touch – this is set automatically to be the name of the ad partner |
| ad partner (3p) | Ad partner (3p) of last touch – this is set automatically to be the 3p value of the ad partner |
| campaign | Campaign of last touch – this can be set as a custom analytics tag, or set automatically by ad networks like Facebook |
| campaign id | Campaign id of last touch – this is set automatically by ad networks like Facebook, or can be set with analytics tags on a link |
| platform | Platform (web vs app, desktop vs mobile) on which the event took place |
| attributed | Whether the event was attributed to any touch (click or impression) as opposed to unattributed (attributed: false). Unattributed data is the same as "organic" or "direct" data. |
| day | Break down metrics by day. |
| month | Break down metrics by month. |
| week | Break down metrics by week. |

### Toggles

![](/img/7bc5a6ab97f78e96c03b98b77ff6838129a9c04327ca1cbbb19848bdb3542400-Screenshot_2024-11-19_at_11.02.25_AM.png)

In the Overview table, you can toggle certain checkboxes to enable the following:

| Toggle | Description |
| --- | --- |
| Split SKAN Data | Enable this to view event counts from both SKAN and non-SKAN sources.    Your report will now split events by the following:   - **Non-SKAN** (de-duplicated from SKAN):    - Event counts attributed using Device ID matching   - Event counts attributed via [Predictive Aggregate Measurement (PAM)](predictive-aggregate-measurement.md), not using Device ID matching - **SKAN** (de-duplicated from non-SKAN):    - Event counts attributed only via SKAN methodology - **Total**: Arithmetic sum of SKAN and non-SKAN columns |
| Organic | When "Organic" is checked, unattributed data will show (attributed: false). This data is not attributed to any click or impression, and is the same as "organic" or "direct" data. |
| Unique | When "Unique" is checked, these are unique to a user. For example: if 1 user clicks 100 times, it will count as 1. There is no concept of "unique revenue"; "revenue" is always the sum of all purchase events. |

## FAQ

#### How does the deduplication work?

The deduplication method is handled by Branch's servers and it does not involve complex conversion value mapping to occur. Unified Analytics aggregates the aggregate SKAN data with the device-level attribution data that is captured from multiple sources:

- Valid SKAdNetwork messages
- Branch's Event Ontology topics
- Other internal topics

Branch uses these data points and deduplicates based on the device's app version and time lapsed between an install and an event.
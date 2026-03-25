---
title: "Enhanced Ad Engagement Type Metrics"
slug: enhanced-ad-engagement-type-metrics
---

We've added more engagement metrics support for a couple of partners! Get the details here 🎯

## Overview

Branch now supports **engagement** conversion metrics for ads on TikTok and Google Adwords. You'll now get more comprehensive insights and the ability to control the full range of available ad engagement touch types. Here is what this update brings:

- Touch subtype for TikTok for Business and Google Adwords is now available in the Branch Dashboard via [Ads Analytics](paid-ads-analytics.md).
- Touch subtype for TikTok for Business is now available in [Export APIs](apis-overview.md).

### Engagement Type Support

**Google Adwords**

| Engagement Type | Attribution Support |
| --- | --- |
| Engaged View | Click-Through |

**TikTok For Business**

| Engagement Type | Attribution Support |
| --- | --- |
| Engaged View | Click-Through |
| Engaged Click | Click-Through |
| Click to Store | Click-Through |
| View | View-Through |

## What does it look like?

### Dashboard Report

::: info Compare By
Use the `touch subtype` metric to view your engagement attribution
:::

![](/img/e7a7f0f-Touch_Subtype.png)

### Exports

Either through Dashboard Custom Exports or Data, utilize the following:

| Export Type | Parameter | Value |
| --- | --- | --- |
| Dashboard Custom Exports | Column | Touch Subtype |
| Custom Exports API | `fields` | `last_attributed_touch_data_tilde_touch_subtype` |

::: tip
Looking to learn more about TikTok For Business or Google Adwords? View our respective guides here:

- [TikTok For Business](tiktok-for-business.md)
- [Google Adwords](google-ads.md)
:::

## FAQ

#### What are the video ad view thresholds for each partner to be counted as an engaged view?

| Ad Partner | Definition |
| --- | --- |
| [TikTok for Business](https://ads.tiktok.com/help/article/about-engaged-view-through-attribution) | When someone watches a video ad for more than **six seconds** |
| [Google Adwords](https://support.google.com/google-ads/answer/10048752) | When someone watches a video ad for more than **ten seconds** |
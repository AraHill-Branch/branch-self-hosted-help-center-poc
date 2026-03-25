---
title: "Apple Ads & iOS 14 FAQ"
slug: apple-ads-ios-14-faq
---

<details>
<summary>When will the Branch SDK be updated to use the new AdServices API for Apple Ads?</summary>

Branch has updated to the new AdServices API. The new Apple Ads framework requires Branch iOS SDK [v1.39.0](ios-version-history.md).

As of February 1st, 2022 the Campaign Management API is deprecated which is used to pull cost, click, and impression data, and not the iAD framework used for attribution. If you are on this legacy iAd framework, you just need to authenticate your Apple Ads account in the Branch Dashboard to get clicks, cost and impression data reporting.

</details>

<details>
<summary>How will Apple Ads work on iOS 14? Will they use SKAdNetwork?</summary>

Unlike all other ad networks, Apple is not requiring Apple Ads to use the SKAdNetwork framework. However, they are moving to a new API called [AdServices](https://developer.apple.com/documentation/adservices), which will provide attribution with a similar degree of user privacy but slightly better data granularity.

Compared to the legacy iAd framework used by Apple Ads prior to iOS 14, the new AdServices API has the benefit of working for *all* users (previously, iAd would not return a result if the user had Limit Ad Tracking enabled), but offers less data granularity.

We are adjusting our integration to implement these changes, and we will share additional details as we learn more.

</details>

<details>
<summary>Will Branch still show keyword-level breakdowns of Apple Ads data?</summary>

The new [AdServices API](https://developer.apple.com/documentation/adservices/aaattribution/3697093-attributiontoken#3697463) returns a `keywordId` parameter, but does not return the exact keyword text like the old iAd API did.

Initially, `keywordId` data will be available via data exports. We hope to make additional Apple Ads keyword insights available again in future.

</details>
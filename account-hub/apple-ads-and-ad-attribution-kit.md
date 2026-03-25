---
title: "Apple Ads and Ad Attribution Kit"
slug: apple-ads-and-ad-attribution-kit
---

Branch now supports Ad Attribution Kit (AAK), Apple's successor to SKAdNetwork (SKAN), for Apple Ads campaigns.

AAK provides a modern attribution framework that will replace SKAdNetwork as iOS 26.2 rolls out to users. This is **expected to happen mid-December 2025**.

## What’s new?

Branch’s Apple Ads integration now includes:

- **AAK support**: Attribution tracking using Apple’s Ad Attribution Kit framework for Apple Ads campaigns.
- **Required configuration change**: You must add AAK to your Info.plist in addition to SKAdNetwork to prevent service disruption.

## Benefits

Adding AAK support enables you to maintain Apple Ads tracking when iOS 26.2 releases.

Also, SKAN will continue to function for users up to iOS 26.2, at which point SKAN postbacks will mirror AAK postbacks for iOS 26.2+ users.

## Access

To use AAK with Branch, your account needs to have [Ads](ads-overview.md) enabled, which is part of our [Performance product](products.md#performance).

For more information, please contact your Account Manager or [reach out to our Sales team](https://branchdocs.app.link/apple-ads-to-sales).

## Implementation

To set up this configuration, you will need to:

1. Include AAK in your Info.plist file in addition to SKAN. For more information, visit [Apple’s guide](https://developer.apple.com/documentation/adattributionkit/configuring-an-advertised-app).
2. Deploy the updated app before iOS 26.2 releases (mid-December 2025).

::: danger Warning
Without this update, **Apple Ads attribution will be interrupted** for users on iOS 26.2 and later.
:::

## Availability

AAK support is currently available for Apple Ads campaigns only. Support for additional ad partners is forthcoming.

## More information

For more information on SKAN setup, visit [Enable SKAdNetwork](enable-skadnetwork.md).

To learn more about Apple Ads, visit [Enable Apple Ads](enable-apple-ads.md).
---
title: "Advanced SKAdNetwork SDK Configuration"
slug: advanced-skadnetwork-sdk-configuration
---

## Overview

This guide provides technical implementation details for developers working with SKAdNetwork (SKAN). Use this documentation if you need to implement custom SKAN functionality, opt out of Branch SDK automatic handling, or troubleshoot your integration.

## Prerequisites

Ensure your app meets these technical requirements:

1. Implemented the latest version of the [Branch iOS SDK](ios-sdk-overview.md) into your mobile app.

   - [Apple's StoreKit Framework](https://developer.apple.com/documentation/storekit) is implemented into your iOS build.
   - [Track events](track-branch-events.md).
2. Your app is available in the Apple App Store with admin access to [App Store Connect](https://appstoreconnect.apple.com/).

## SDK opt-in/out considerations

By default, the Branch SDK is opted-in to automatically call the necessary Apple methods for SKAN to enable Postbacks to ad partners.

If you have a third-party library or custom SKAN integration, you should opt out of Branch SDK handling. When opted out, the Branch SDK will stop updating SKAN postback conversion values, and you will be responsible for calling Apple's methods directly.

::: info Opt-out requirements
If you are opting out for the Branch SDK to make calls on your behalf, you will need to follow Apple's documentation for calling the [updatePostbackConversionValue(\_:completionHandler:)](https://developer.apple.com/documentation/storekit/skadnetwork/3919928-updatepostbackconversionvalue) method when appropriate as well as define your conversion values as described in this document.
:::

## Verify integration

::: tip SKAN Data Availability & Reporting
SKAN does not attribute conversions in real-time. Postbacks sent/recieved abide by the [SKAdNetwork Event Flow](skadnetwork.md).

Additionally, you can view your full guide on all SKAdNetwork-related reporting [here](skadnetwork-dashboard-reports.md).
:::

1. Set up a test campaign with the [participating ad network](skadnetwork.md). Please note that your app will need to be in production and not in Testflight or any other testing platform.
2. Download an Apple SKAdNework Testing Profile to decrease the time in which the postback is sent from a test device from 24 hours to 5-10 minutes.

   - See Apple documentation [here](https://developer.apple.com/documentation/adattributionkit/testing-ad-attributions-with-a-downloaded-profile) for instructions.
3. Check the [SKAdNetwork Analytics page](https://dashboard.branch.io/ads/skadnetwork/activity) to verify SKAdNetwork data.

![](/img/a5c731a-SKAN_Analytics.png "SKAN Data Verification.png")

Additionally, you can verify with your Ad Network the data that they are receiving are proper postbacks for the SKAN campaigns.

## Defining conversion values for SDK opt-out

If you are opting out of the Branch SDK making your SKAN calls for you, you will need to define what each conversion value means for which events you want SKAdNetwork to be attributed. Branch will report the conversion value as it is received from the ad network.

**24 hours after INSTALL, stop calling** `updatePostbackConversionValue()` **to align with Branch's tracking methodology.** Every time `updatePostbackConversionValue()` is called with a value greater than the previous, this delays Apple's attribution of the original Install event by a rolling 24-hour timer.  
 - Note: If you change the conversion value for an event, there will be a transition period where users on the latest version of the app will report conversions with the new value, while users on older app versions will continue to report conversions with the older value (until they update their app).

::: info Apple does not have a server-side API to report conversions
SKAdNetwork prevents the ability to connect users to conversions, so integrations that track events [server-side](track-branch-events.md#track-commerce-events) must still tell the app to report the conversion to SKAdNetwork. Because the first conversion must occur within 24 hours of installation, there will be a chance the event is tracked server-side but the user does not re-open the app within the 24-hour window for it to be reported to Apple.

To mitigate this risk, always track a series of events in-app that typically lead up to the server-side event (i.e., an "add-to-cart" is an event that typically occurs before a "purchase"). These don't replace your server-side event, but can serve as an effective proxy when evaluating ad campaign performance, and can also delay Apple's 24-hour timer to increase the chance of the user reopening the app in time after your server-side event is tracked.
:::

## Test conversion values

You can verify whether the conversion values you've provided in the Branch Dashboard have been correctly set and the SDK is receiving them.

1. Download a proxy tool such as [Charles](https://www.charlesproxy.com/)
2. Enable SSL monitoring

   - Using Charles proxy, you need to follow their [documentation](https://www.charlesproxy.com/documentation/using-charles/ssl-certificates/) to enable SSL monitoring
3. Open the application and trigger events tied to conversion values.

   - For **INSTALLs**: Look for `invoke_register_app`
   - For **Other Conversions**: (Must be tied to a conversion value) Look for `update_conversion_value`

::: code-group

```json [Install]
{
                    "session_id" : "850166709486919576",
                    "data" : "{\"+clicked_branch_link\":false,\"+is_first_session\":false}",
                    "device_fingerprint_id" : "847563926187298061",
                    "identity_id" : "850166709481620778",
                    "invoke_register_app" : true,
                    "link" : "https:\/\/3mnv.app.link?%24identity_id=850166709481620778"
                    }
```

```json [Other Conversions]
{
                    "branch_view_enabled" : false,
                    "update_conversion_value" : 42
                    }
```

:::

## Changing the time window for SKAdNetwork callouts

You can modify the time window by using the following SDK method:

```
Branch.getInstance().setSKAdNetworkCalloutMaxTimeSinceInstall(3600.0 * 24.0)
```
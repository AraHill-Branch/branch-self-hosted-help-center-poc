---
title: "Google ICM"
slug: google-icm
---

## Overview

As an official Google [App Attribution Partner](https://support.google.com/google-ads/answer/12961402), Branch supports ICM to empower marketers and developers with improved insights while prioritizing user privacy.

## What is Google ICM?

Google's ICM is a forward-thinking solution designed to provide more reliable and privacy-centric mobile app conversion measurement.

By leveraging techniques like [on-device measurement](https://support.google.com/google-ads/answer/12119136), ICM aims to improve reporting accuracy for iOS and Android campaigns, especially in light of evolving privacy landscapes.

On-device measurement is a privacy-preserving technique where conversion data is processed directly on the user's device rather than being sent to a centralized server for aggregation before attribution. This method enhances user privacy while still allowing for accurate campaign measurement.

## Key benefits

Below are some of the key benefits you can expect from using Google’s ICM with Branch:

- **Enhanced reporting across iOS & Android**: Get real-time and event-level reporting of your campaign performance.

  - On iOS, gain improved reporting for app conversions from iOS 14+ users.
  - On Android, benefit from better reporting for app conversions from the European Economic Area (EEA) or when a user opts out of device-level permissions.
- **Privacy-preserving techniques**: ICM utilizes privacy-preserving technologies, ensuring no identifiable information leaves a user's device or is disclosed externally, including to Google.
- **Seamless integration**: As a Google App Attribution Partner, Branch directly integrates with Google ICM, enhancing reporting for advertisers whether you're using our SDK or server-to-server integrations.

## Getting started

Use the information in this section to understand the process for getting Google ICM data flowing for your app campaigns.

### iOS

To enable enhanced reporting for your iOS app campaigns with Google ICM through Branch, follow the steps below.

#### All integrations

For both automatic and manual integrations, you need to:

1. Confirm that you have an active iOS App campaign for installs with Google Ads
2. Upgrade to [Branch iOS SDK (v3.13.3 or higher)](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/releases)

   1. Use the Branch iOS SDK’s `setSDKWaitTimeForThirdPartyAPIs` [method](https://help.branch.io/developers-hub/docs/ios-full-reference#setsdkwaittimeforthirdpartyapis), and set the `waitTime` to at least 5 seconds.
3. Use this [Firebase tutorial](https://firebase.google.com/docs/tutorials/ads-ios-on-device-measurement-event-data/step-2) to link your app to the `GoogleAdsOnDeviceConversion` framework using one of the following methods:

   1. CocoaPods
   2. Swift Package Manager
   3. A manual integration using a downloaded version of the Firebase iOS SDK
4. In Xcode, add the `-ObjC` flag to **Other Linker Settings** in your app target's build settings.

   1. Please note that you must do this regardless of what method you used to integrate the `GoogleAdsOnDeviceConversion` framework.

At this point, you are fully set up to have Branch automatically fetch ODM info. No additional code is required. Branch will automatically handle ODM data fetching and reporting.

#### Manual integrations

If you want custom control over ODM data fetching, you can implement a manual integration.

1. First, complete all steps outlined in the “[All integrations](google-icm.md#all-integrations)” section.
2. Fetch ODM info using Google’s `GoogleAdsOnDeviceConversion` API, specifically the `fetchAggregateConversionInfoForInteraction` method.
3. Pass this ODM info to Branch using the Branch iOS SDK’s `setODMInfo` method:

::: code-group

```swift [Swift]
Branch.setODMInfo(odmInfo, andFirstOpenTimestamp: firstLaunchTime)
```

```objectivec [Objective-C]
[Branch setODMInfo:aggregateConversionInfo andFirstOpenTimestamp:firstLaunchTime];
```

:::

To learn more about this method, visit our [iOS Full Reference](https://help.branch.io/developers-hub/docs/ios-full-reference#setodminfo) guide.

### Android

There are no actions that you need to take in order to gain access to this solution for Android. Measurement improvements will automatically be applied as available.

## Additional resources

For more information about Google’s requirements for ICM, please refer to Google’s [Integration Guide](https://support.google.com/google-ads/answer/12119136?sjid=7730411304741579192-NC#:~:text=Implementation%20requirements%20to%20get%20started) and to your Google representative.

::: tip Tip
To analyze cross-channel attribution, considering coupling ICM with Branch’s [Predictive Aggregate Measurement (PAM)](predictive-aggregate-measurement.md). While ICM improves visibility into conversions under privacy constraints, PAM complements this by providing insights into previously unattributed conversions, offering a more comprehensive view of campaign performance.
:::
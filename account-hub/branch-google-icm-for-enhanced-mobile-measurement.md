---
title: "Branch Partners with Google on ICM for Enhanced Mobile Measurement"
slug: branch-google-icm-for-enhanced-mobile-measurement
---

## Overview

Branch is excited to announce our upcoming support for Google's [Integrated Conversion Measurement (ICM)](https://support.google.com/google-ads/answer/16203286?hl=en), a new solution designed to enhance your mobile campaign performance and provide more comprehensive reporting across iOS and Android.

As an official Google [App Attribution Partner](https://support.google.com/google-ads/answer/12961402), Branch is supporting ICM to empower marketers and developers with improved insights, while prioritizing user privacy.

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

To enable enhanced reporting for your iOS app campaigns with Google ICM through Branch, please confirm the following:

- You have an active iOS App campaign for installs with Google Ads.
- You have implemented [on-device conversion measurement using event data](https://support.google.com/google-ads/answer/12119136) within your app.

To benefit from ICM’s attribution coverage now, **upgrade your infrastructure to ensure compatibility with ICM and future measurement improvements.**

To do this, you can:

1. Upgrade to [Branch iOS SDK (v3.13.3 or higher)](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/releases) and integrate the standalone [On Device Conversion Measurement (ODM) SDK](https://github.com/googleads/google-ads-on-device-conversion-ios-sdk) from Google.
2. Upgrade to [Branch iOS SDK (v3.13.3 or higher)](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/releases) and upgrade your Firebase SDK to [v11.14.0](https://firebase.google.com/support/release-notes/ios#version_11140_-_june_3_2025), which includes the ODM SDK.
3. Use a server-to-server integration, where you will need to pass the on-device measurement `”odm_info”` string to Branch.

::: info Note
Google has reported that advertisers with a majority of logged-in users who implemented a similar solution with their first-party data saw a median 19% reduction in CPA on Google's owned inventory!
:::

### Android

There are no immediate actions that you need to take in order to gain access to this solution for Android. Measurement improvements will automatically be applied when available.

## Additional resources

To learn more about integrating Google Ads with Branch and leveraging its full capabilities, please refer to our [comprehensive documentation](https://help.branch.io/docs/google-ads-index).

For more information about Google’s requirements for ICM, please refer to Google’s [Integration Guide](https://support.google.com/google-ads/answer/12119136?sjid=7730411304741579192-NC#:~:text=Implementation%20requirements%20to%20get%20started) and to your Google representative.

::: tip Tip
To analyze cross-channel attribution, considering coupling ICM with Branch’s [Predictive Aggregate Measurement (PAM)](predictive-aggregate-measurement.md).

While ICM improves visibility into conversions under privacy constraints, PAM complements this by providing insights into previously unattributed conversions, offering a more comprehensive view of campaign performance.
:::
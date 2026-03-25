---
title: "SKAdNetwork Direct Postback"
slug: skadnetwork-direct-postback
---

## Overview

For iOS 15+ devices, advertiser apps can now receive the winning SKAdNetwork (SKAN) postback if they include [NSAdvertisingAttributionReportEndpoint](https://developer.apple.com/documentation/bundleresources/information_property_list/nsadvertisingattributionreportendpoint) in your app's Info.plist. This will allow you to send that postback to Branch.

Previously, Postbacks were only sent directly to ad networks who would then forward them to advertisers and/or MMPs. With Direct Postback, marketers will be able to validate if the received data from networks is complete when looking at the total. Branch offers an endpoint URL that marketers can use to send a copy of these postbacks to Branch that can then be exposed via the Custom Exports API.

### Benefits of Direct Postback

- Postbacks received will go through an additional validation process to ensure that the postback came from Apple.
- Postbacks contain the Conversion Value critical to advertisers that are used to measure user quality
- Gain access to all the winning postbacks, including those that were sent to Facebook and Google which only share aggregate numbers
- View redownload metrics

  - Some ad networks (Google, Facebook, Snap) don't share redownload data with Branch
- Full visibility into publisher level reporting
- View touch-type engagement & Conversion Value mapping

  - Lower and Upper revenue value mapping
  - Customer event alias mapping

## Prerequisites

In order to enable Direct Postback, you need to have completed the following:

1. [Implemented SKAdNetwork](enable-skadnetwork.md)
2. Running SKAdNetwork campaigns

## Enable Direct Postback

### 1. Add the Branch SKAdNetwork Endpoint

Have the iOS Development team use the `NSAdvertisingAttributionReportEndpoint` framework in your app's Info.plist adding the following Branch endpoint:

`https://branch-skan.com`

### 2. Export the Postbacks

Using Branch's [Custom Exports API](custom-exports-api.md), run an export to see postback data via the new topics:

- `skadnetwork_invalid_messages`
- `skadnetwork_valid_messages`

Additional details on the fields of the above topics can be found [here](custom-exports-api.md).

There is a new parameter called `advertiser_copy` in the Export API which will be 'true' when the corresponding SKAN data is received from the advertiser app directly for ease of filtering.

## FAQ

#### Will this cause duplicates in my reports?

No. The Branch Dashboard will filter the ad partner copies to avoid duplication, but exports will show the copies. Be sure to filter your export results using the `advertiser_copy` parameter.

#### Is there still value in postbacks from the ad network?

Yes. The advertiser will still depend on the ad network to decode some data. For example, only the ad network can map the SKAN Campaign ID to the Campaign Name. Additionally, ad networks can receive non-winning postbacks if they had a SKAN ad touch from a user that converted, providing some multi-touch data not available in Apple's direct postbacks.

#### Will postbacks be sent to devices < iOS 15?

No. Apple will only send additional postbacks for devices running iOS 15+.
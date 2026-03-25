---
title: "Google SKAdNetwork"
slug: google-skadnetwork
---

## Overview

The introduction of iOS 14.5 came with the rise of SKAdNetwork (SKAN) which had industry-wide impacts on the mobile measurement and attribution ecosystem. As such, Google will work differently from most non-self-attribution networks when it comes to SKAdNetwork campaigns.

Google will not be forwarding individual SKAdNetwork Postbacks to Branch. However, aggregate SKAN data will be passed back via Google's Ads API. In this flow, Google collects individual SKAN postbacks, cryptographically validates them internally, and then provides only pre-generated results to Branch via an API endpoint. Additionally, data shared via API may not include all data dimensions reflected in the SKAdNetwork postbacks.

## Google SKAN Support

### Supported Campaigns

| Google Campaign Type | SKAdNetwork Support for Branch |
| --- | --- |
| App Campaigns | ✅ Provides aggregate SKAN data to Branch via API |
| App campaigns for engagement | ❌ Does not support SKAN |
| ***All others*** | ❌ Does not support SKAN |

### Supported Data Dimensions via API

| Parameter | Data Support |
| --- | --- |
| Download/Install | ✅ |
| Reinstall | ✅ |
| Conversion Value | ✅ |
| Campaign Name | ✅ |
| Campaign ID | ✅ |
| SKAdNetwork Campaign ID | ❌ |
| Postback Sequence Index (SKAN 4.0+) | ✅ |
| Coarse Conversion Value (SKAN 4.0+) | ✅ |

## Implementation

Because Google is utilizing the existing Google API to send SKAN data, the implementation is to activate Google Ads as a self-attribution ad network. Please follow the comprehensive guide on [enabling Google Ads with Branch](enable-google-app-campaigns.md).

::: info Note
You must add all the accounts that you want to receive SKAN data for. If you only add one, you will only receive SKAN data for that account.
:::

## SKAN Reports

You can use the Branch Dashboard to view reporting on all of your SKAN-related campaigns. If you want to look at Google SKAN data, you can apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad network | equals | `a_google_adwords` |



::: info Additional resources
You can see more ways to view SKAN Reports with our [guide](skadnetwork-dashboard-reports.md).
:::

## Troubleshooting

#### Branch Dashboard Data Sync

If you feel the data that you see in the Branch Dashboard is not correct, we recommend waiting 24-48 hours after implementation. It has a similar delay to cost data displayed on traditional SAN app install campaigns. Google’s conversion date is by **ad interaction date (click)**, they have a system that matches an Apple postback to an ad interaction.
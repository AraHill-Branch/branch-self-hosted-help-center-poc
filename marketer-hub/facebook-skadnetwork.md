---
title: "Facebook SKAdNetwork"
slug: facebook-skadnetwork
---

## Overview

The introduction of iOS 14.5 came with the rise of SKAdNetwork (SKAN) that had industry-wide impacts on the mobile measurement and attribution ecosystem. As such, Facebook will work differently from most non-self-attribution networks when it comes to SKAdNetwork campaigns.

Facebook will not be forwarding individual SKAdNetwork Postbacks to Branch. However, aggregate SKAN data will be passed back via Facebook’s Ads Insights API. In this flow, Facebook collects individual SKAN postbacks, cryptographically validates them internally, and then provides only pre-generated results to Branch via an API endpoint. Additionally, data shared via API is may not include all data dimensions reflected in the SKAdNetwork postbacks.

## Facebook SKAN Support

### Supported Campaigns

| Facebook Campaign Type | SKAdNetwork Support for Branch |
| --- | --- |
| Mobile App Install (MAI) | ✅ Provides aggregate SKAN data to Branch via API |
| App Event Optimization (AEO) | ✅ Provides aggregate SKAN data to Branch via API |
| Value Optimization (VO) | ✅ Provides aggregate SKAN data to Branch via API |
| ***All others*** | ❌ Does not support SKAN |

### Supported Data Dimensions via API

| Parameter | Data Support |
| --- | --- |
| Download/Install | ✅ |
| Reinstall | ❌ |
| Conversion Value | ✅ |
| Campaign Name | ✅ |
| Campaign ID | ✅ |

#### Data Not Shared by Facebook

- Install vs. Reinstall

  - Facebook does not share this via the API; therefore, all data is considered download/install in Branch systems.

## Implementation via API

::: info Authentication
You must have authenticated Facebook within Branch for Branch to receive and report on SKAN data. Follow our guide [here](facebook-app-install-ads.md).
:::

::: danger Important notes about which customers should use this endpoint
The Conversion Bit Schema sync functionality is intended to support customers who are using the Branch SDK for SKAdNetwork support.

If you are:

- **Using the Facebook SDK for SKAdNetwork.** You should not use this endpoint. Facebook will automatically pull in their own `conversion-value` schema.
- **Calling SKAN methods natively in your app**. You *may* be able to use this endpoint:

  - Option 1: Facebook provides functionality within the Facebook Events Manager to specify your conversion value mapping. See [this Facebook guide](https://www.facebook.com/business/help/670955636925518) for more info. **This is the recommended option if you are calling SKAN methods natively,** and in this case, you should not use the endpoint.
  - Option 2: If your custom conversion value mapping exactly matches Branch SDK functionality (1 in-app event is mapped directly to 1 SKAN `conversion-value` value) *and* you have properly entered this by using custom SKAN event labels in Branch's dashboard mapping tool, you can use the endpoint above. However, the endpoint will **not** work as expected if you are using a more complex custom conversion value strategy, such as revenue buckets or event counts.
:::

To sync SKAdNetwork conversion value mappings with Facebook for campaign optimization, Branch provides an API endpoint that customers may paste into the Facebook Ads Manager UI.

The API endpoint follows this format, and can only be called by Facebook's services:

```
https://api2.branch.io/v3/partners/a_facebook/conversion-value-mappings?app_id={itunes_id}
```

**Note:** the `{itunes_id}` parameter must be replaced with the respective iTunes ID for your app (**not** your Branch app ID). Your iTunes ID is the series of numbers at the end of your app's App Store page URL.

For example: `https://apps.apple.com/us/app/branch-monster-factory/id917737838` would have an endpoint URL of `https://api2.branch.io/v3/partners/a_facebook/conversion-value-mappings?app_id=917737838`

#### 1. Navigate to Facebook in the Branch Dashboard's Ads Partner Management

a. Log in to your [Branch Dashboard](https://dashboard.branch.io)  
b. On the left-hand navigation bar navigate to Ads → Partner Management  
c. Search or scroll to find Facebook



**Note:** Conversion Value URL will only be visible for customers that have [opted into Branch SDK support on the SKAdNetwork Configurations](https://dashboard.branch.io/ads/skadnetwork/configuration/sdk-opt-in).

#### 2. Copy the URL

**Note**: When copied to your clipboard using the blue button, the `{itunes_id}` parameter will automatically be filled in with the correct iTunes ID.

#### 3. Go to Facebook Ads Manager and navigate to Events Manager

*[Image: 3208]*

#### 4. Go to "Settings" highlighted in the screenshot above and select "Set Up Events" under Configure App Events for SKAdNetwork

*[Image: 890]*

#### 5. Select "Import from Partner App"

#### 6. Paste the URL copied from step 2 and click "Connect"

*[Image: 2110]*

## SKAN Reports

You can use the Branch Dashboard to view reporting on all of your SKAN-related campaigns. If you want to look at just Facebook SKAN data, you can apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad network | equals | `a_facebook` |



::: info Additional Resources
You can see more ways to view SKAN Reports with our guide [here](skadnetwork-dashboard-reports.md).
:::

## Troubleshooting

#### Connection error when entering our Branch conversion schema URL

If you receive the following error when pasting the Branch conversion schema URL:

*[Image: 1216]*

Please ensure the following:

- You must have your app enabled for SKAdNetwork via the Branch dashboard (see [this page](enable-skadnetwork.md) for more).
- You must have at least one conversion value mapped using the Branch dashboard (otherwise Facebook will just get an empty response from Branch's API).

#### Branch Dashboard Data Sync

If you feel the data that you see in the Branch Dashboard is not correct, we recommend waiting 24-48 hours after implementation. Data on the Branch Dashboard is reflected by the Facebook conversion date and **not** the Branch ingestion date. It has a similar delay to cost data displayed on traditional SAN app install campaigns.
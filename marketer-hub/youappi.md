---
title: "YouAppi"
slug: youappi
---

![1328](/img/7403a42-YouAppi__branch(3).png "YouAppi + branch.png")

## Overview

[YouAppi](http://www.youappi.com/)  is a fully managed solution for premium mobile brands, providing one single point to streamline their mobile media buying. YouAppi's OneRun platform combines the power of machine learning with our proprietary predictive algorithms, and cohort technology, to analyze the mobile content consumption patterns of over 1.5B users, converting data into profitable users. YouAppi was founded in late 2011 with headquarters in San Francisco and offices in New York, Berlin, London, Beijing, Indonesia, Tokyo, Korea, Russia and Israel. For more information, please visit [www.YouAppi.com](http://www.youappi.com/).

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Contact support at YouAppi for more information. |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Retargeting Campaigns |
| Ad Formats | Contact support at YouAppi for more information. |
| Click Types | - Client-side click |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | via API (Beta) |
| Cost Time Zone | GMT |
| Cost Data Scheduling | [ 4, 9, 12, 18, 24, 36, 48, 72, 96, 120, 240, 360, 480, 720 ] in hours from midnight |
| Pricing Models | - CPI - CPC - CPA |

## Prerequisites

In order to enable YouAppi, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through YouAppi.

## Enable YouAppi

### 1. Enable YouAppi in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for YouAppi. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_youappi?tab=settings) to go there directly.

You'll need to input your **YouAppi Advertiser ID**. Please reach out to your YouAppi Account Manager for details.

Click the **Save & Enable** button.

![](/img/eb7da4e-youappi_enable(3).png "youappi enable.png")

### 2. Configure Postbacks

Enabling YouAppi will automatically enable the following postbacks:

- INSTALL

![](/img/4d3232d-youappi_postbacks(3).png "youappi postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_youappi?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to YouAppi.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

![](/img/c1b289e-Add_New_Postbacks(111).gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_youappi?tab=attribution_windows) tab to set windows by attribution type.

#### Recommended Attribution Windows

| Attribution Type | Window |
| --- | --- |
| click to session start | 90 days |
| click to install | 30 days |
| click to conversion event | 90 days |
| impression to session start | 1 day |
| impression to install | 1 day |
| impression to conversion event. | 1 day |

### 4. Set Up Cost Data

::: warning Beta for Non-SANs
Cost Data for Non-Self-Attributing Networks (Non-SANs) is a feature currently in Beta; be aware that there may be unexpected bugs/behaviors until the full release.
:::

To set up cost ingestion for YouAppi, you will need to authenticate using your API Key. Please reach out to your YouAppi account manager if you have trouble finding these values.

Enter your API Key, and click **Save Authentication**

![](/img/a4bec4f-Cost_YouAppi(3).png)

### 5. Create Branch Ad Link

Next, you'll need to create a Branch Ad Link for your YouAppi campaigns in order for Branch to properly attribute conversions.

[![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/a516deb-small-95b5d97-small-Vectorlogo_1(98).png)

![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/feddb04-Branch_badge_light_default-32x32.ico) help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your YouAppi campaign.

### 6. Verify Data in Branch

After launching your YouAppi campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to YouAppi. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_youappi` |

Once applied, data should flow through the Liveview, and you can see the data being sent to YouAppi from Branch.

#### Verifying Cost Data

To verify that cost data is flowing into Branch, you need to have the following:

- Completed all implementation steps above
- You need to already be live with campaigns running for the ad network
- Wait 24 hours for data to be pulled in
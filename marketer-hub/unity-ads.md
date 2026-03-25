---
title: "Unity Ads"
slug: unity-ads
---

*[Image: 1328]*.png "RTB House + branch.png")

## Overview

[Unity Ads Inc.](https://www.rtbhouse.com/) gives you the tools and analytics to help you achieve your app's goals. Whether you want to start creating in-app ads, IAPs (in-app purchases), or market your app to a potential audience, Unity Ads has the tools and expertise you need to succeed.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Contact support at Unity Ads for more information |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Retargeting campaigns |
| Ad Formats | - Banner - Video |
| Click Types | - Server-side click |
| Supported Platforms | - iOS - Android - Windows - Mac OS - Unix |
| Link Wrapping | Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | via API (Beta) |
| Cost Time Zone | GMT |
| Cost Data Scheduling | - 4 times/day for Days 0-1 - 1 time/day for Days 3-5 - 1 time/week for Days 8-14 |
| Pricing Models | - CPC - CPM - CPA |

## Prerequisites

In order to enable Unity Ads, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Created a [Unity Cloud account](https://cloud.unity.com), core organization ID, and a service account.
5. Running campaigns through Unity Ads.

## Enable Unity Ads

### 1. Enable Unity Ads in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Unity Ads. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_rtb_house_sa?tab=settings) to go there directly.

You'll need to input the following ad account information:

- Game ID: iOS
- Game ID: Android

Click the **Save & Enable** button.

.png "RTB House enable.png")

### 2. Configure Postbacks

Enabling Unity Ads will automatically enable the following postbacks:

- INSTALL
- OPEN
- PURCHASE

.png "rtb house postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_rtb_house_sa?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Unity Ads.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

.gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_rtb_house_sa?tab=attribution_windows) tab to set windows by attribution type.

#### Recommended Attribution Windows

| Attribution Type | Window |
| --- | --- |
| click to session start | 90 days |
| click to install | 30 days |
| click to conversion event | 90 days |
| impression to session start | 1 day |
| impression to install | 1 day |
| impression to conversion event. | 1 day |

### 4. Set up Cost Data

::: warning Beta for Non-SANs
Cost Data for Non-Self-Attributing Networks (Non-SANs) is a feature currently in Beta; be aware that there may be unexpected bugs/behaviors until the full release.
:::

To set up cost ingestion for Unity Ads, you will need to authenticate using your **Client Secret, Client ID, and Organization ID**.

#### Client Secret and Client ID

Under [Unity Cloud Grow](https://cloud.unity.com/acquire), there is an "API Management" section, which has a link to your service accounts.

.png)

From here, you can create a new service account, and you can also create a key for the service account to get your **Client ID and Client Secret**.

.png)

#### Organization ID

Add the "Advertise Stats API MMP Viewer'' role to the service account. The role can be  
 found under the "Grow" list.

From here, you can get your **Organization ID**.

.png)

Please reach out to your Unity Ads account manager if you have trouble finding these values.

Enter your **Client Secret, Client ID, and Organization ID**, and click **Save Authentication**

.png)

Note: If you'd like data to be as accurate as possible, be sure to match timezones between your Branch account and Unity Ads.

### 5. Create Branch Ad Link

Next, you'll need to create a Branch Ad Link for your Unity Ads campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Unity Ads campaign.

### 6. Verify Data in Branch

After launching your Unity Ads campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Unity Ads. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_unity` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Unity Ads from Branch.

#### Verifying Cost Data

To verify that cost data is flowing into Branch, you need to have the following:

- Completed all implementation steps above
- You need to already be live with campaigns running for the ad network
- Wait 24 hours for data to be pulled in
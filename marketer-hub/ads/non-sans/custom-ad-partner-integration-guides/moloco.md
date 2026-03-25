---
title: "MOLOCO"
slug: moloco
---

*[Image: 1328]*.png "Moloco + branch.png")

## Overview

[Moloco](https://www.moloco.com/) is the world's best-performing DSP. We deliver superior client satisfaction by focusing on post-install optimization, building machine-learning-based lookalike models for high-performing users, and strictly fighting ad fraud.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Contact support at MOLOCO for more information. |
| Deep Linking | Supported |
| Attribution | Supported |
| Ad Campaign Types | Contact support at MOLOCO for more information. |
| Ad Formats | Contact support at MOLOCO for more information. |
| Click Types | Contact support at MOLOCO for more information. |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | via API |
| Cost Time Zone | GMT |
| Cost Data Scheduling | [ 4, 9, 12, 18, 24, 36, 48, 72, 96, 120, 240, 360, 480, 720 ] in hours from midnight |
| Pricing Models | - CPI - CPC - CPM |

## Prerequisites

To enable Moloco, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Moloco.

## Enable MOLOCO

### 1. Enable Moloco in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for MOLOCO. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_moloco?tab=settings) to go there directly.

Click the **Save & Enable** button.

.png "moloco enable.png")

### 2. Configure Postbacks

Enabling Moloco will automatically enable the following postbacks:

- CLICK
- IMPRESSION
- INSTALL
- OPEN
- PURCHASE

.png "moloco postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_moloco?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Moloco.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

::: info Postbacks
For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)
:::

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_moloco?tab=attribution_windows) tab to set windows by attribution type.

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

To set up cost ingestion for Moloco, you will need to authenticate using your **Token** and **Account Id** (labelled as 3 in the screenshot). These can be located in your Ad Account Settings under the **Report Partner Integration tab**. If you haven't, you will need to create a new integration and select **Branch** to get a new Token ID.

.png)

Reach out to your Moloco account manager if you have trouble finding the credentials.

Enter your **Token** and **Account Id**, and click **Save Authentication**

.png)

> 📘
>
> Limitations
>
> Cost data will only be available from the date that the **Token** is created on the Moloco dashboard

### 5. Create Branch Ad Link

Next, you'll need to create a Branch Ad Link for your Moloco campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Moloco campaign.

### 6. Verify Data in Branch

After launching your Moloco campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Moloco. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_moloco` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Moloco from Branch.

#### Verifying Cost Data

To verify that cost data is flowing into Branch, you need to have the following:

- Completed all implementation steps above
- You need to already be live with campaigns running for the ad network
- Wait 24 hours for data to be pulled in
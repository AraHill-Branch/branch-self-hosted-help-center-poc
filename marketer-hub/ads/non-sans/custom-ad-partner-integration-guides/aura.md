---
title: "Aura from Unity"
slug: aura
---

.png)

## Overview

[Aura from Unity](https://aura.ironsrc.com/) connects OEMs and carriers with mobile advertisers to create value for users right out of the box.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Ad Network |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Acquisition campaigns |
| Ad Formats | Contact support at Aura from Unity for more information. |
| Click Types | - Client-side click - Server-side click |
| Supported Platforms | - Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | - via API (Beta) - ~~via Branch Ad Link~~ - Email Import - Manual File Upload |
| Cost Time Zone | GMT |
| Cost Data Scheduling | [ 4, 9, 12, 18, 24, 36, 48, 72, 96, 120, 240, 360, 480, 720 ] in hours from midnight |
| Cost Ingestion Types | - Click/impression tracking link - API |
| Pricing Models | - CPI - CPC - CPA |

## Prerequisites

In order to enable Aura from Unity, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Aura from Unity.

## Enable Aura from Unity

## 1. Enable Aura from Unity in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Aura from Unity. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_aura?tab=settings) to go there directly.

::: info Unity & ironSource
Even though Unity and ironSource have merged, Aura attribution configuration still falls under ironSource Aura in the Branch Dashboard.
:::

Click the **Save & Enable** button.

.png)

### 2. Configure Postbacks

Enabling Aura from Unity will automatically enable the following postbacks:

- INSTALL
- PURCHASE
- OPEN
- ACHIEVE\_LEVEL
- COMPLETE\_TUTORIAL
- COMPLETE\_REGISTRATION
- ADD\_TO\_CART
- SHARE

.png)

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_aura?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Aura.

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_aura?tab=attribution_windows) tab to set windows by attribution type.

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

To set up cost ingestion for Aura from Unity, you will need to authenticate using your Authentication Token. Please reach out to your Aura from Unity account manager if you have trouble finding these values.

Enter your Authentication Token, and click **Save Authentication**

.png)

### 5. Create Branch Ad Link

Next, you'll need to create a Branch Ad Link for your Aura from Unity campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Aura from Unity campaign.

### 6. Verify Data in Branch

After launching your Aura campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Aura. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_aura` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Aura from Unity from Branch.

#### Verifying Cost Data

To verify that cost data is flowing into Branch, you need to have the following:

- Completed all implementation steps above
- You need to already be live with campaigns running for the ad network
- Wait 24 hours for data to be pulled in
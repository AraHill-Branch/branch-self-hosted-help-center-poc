---
title: "Adikteev"
slug: adikteev
---

![1328](/img/32dda4a-Adikteev__branch(3).png "Adikteev + branch.png")

## Overview

[Adikteev](https://www.adikteev.com/) is the leading app re-engagement platform for performance-driven marketers. We help the world's top-spending app publishers increase retention, reacquire churned users and drive incremental revenue. App publishers in gaming, e-commerce, on-demand, services, and entertainment rely on us to deliver made-to-measure strategies, creatives, and algorithms.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | - DSP - RTB |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Retargeting Campaigns |
| Ad Formats | Contact support at Adikteev for more information. |
| Click Types | - Client-side click |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | - API - Email Import - Manual File Upload |
| Pricing Models | - CPC |

## Prerequisites

In order to enable Adikteev, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Adikteev.

## Enable Adikteev

### 1. Enable Adikteev in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Adikteev. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_adikteev?tab=settings) to go there directly.

Click the **Save & Enable** button.

![](/img/ab22401-enable_adikteev(3).png "enable adikteev.png")

### 2. Configure Postbacks

Enabling Adikteev will automatically enable the following postbacks:

- INSTALL
- PURCHASE
- VIEW\_ITEM
- VIEW\_ITEMS
- ACHIEVE\_LEVEL
- LOGIN
- COMPLETE REGISTRATION

![](/img/71ed738-Adikteev_Postbacks(3).png "Adikteev Postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_adikteev?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Adikteev.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

![](/img/c1b289e-Add_New_Postbacks(85).gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_adikteev?tab=attribution_windows) tab to set windows by attribution type.

#### Recommended Attribution Windows

| Attribution Type | Window |
| --- | --- |
| click to session start | 90 days |
| click to install | 30 days |
| click to conversion event | 90 days |
| impression to session start | 1 day |
| impression to install | 1 day |
| impression to conversion event. | 1 day |

### 4. Create Branch Ad Link

Next, you'll need to create a Branch Ad Link for your Adikteev campaigns in order for Branch to properly attribute conversions.

[![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/a516deb-small-95b5d97-small-Vectorlogo_1(98).png)

![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/feddb04-Branch_badge_light_default-32x32.ico) help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Adikteev campaign.

## 5. Verify Data in Branch

After launching your Adikteev campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Adikteev. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_adikteev` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Adikteev from Branch.
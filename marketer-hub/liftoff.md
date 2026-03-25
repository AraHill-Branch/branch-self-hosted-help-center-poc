---
title: "Liftoff"
slug: liftoff
---

*[Image: 1328]*.png "Liftoff + branch.png")

## Overview

[Liftoff](https://liftoff.io)  is a full-service mobile app marketing platform that uses post-install data to run true CPA-optimized user acquisition and re-engagement campaigns. App install campaigns are optimized to acquire users who engage beyond the install, like booking a hotel, making a purchase, or subscribing to a service.

Powered by a database of over 3 billion unique mobile profiles, machine learning, and predictive intelligence, Liftoff enables advanced targeting across the entire mobile RTB ecosystem. Based in Redwood City, CA, Liftoff powers CPA-optimized mobile user acquisition campaigns for hundreds of brands and app publishers.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | DSP |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Acquisition campaigns - Retargeting campaigns |
| Ad Formats | Contact support at Liftoff for more information. |
| Click Types | - Client-side click - Server-side click |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | - via API (Beta) - via Branch Ad Link |
| Cost Data Timezone | GMT |
| Cost Data Scheduling | [ 4, 9, 12, 18, 24, 36, 48, 72, 96, 120, 240, 360, 480, 720 ] in hours from midnight |
| Pricing Models | - CPI - CPC (retargeting campaigns only) - CPM - CPA |

## Prerequisites

In order to enable Liftoff, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Liftoff.

## Enable Liftoff

### 1. Enable Liftoff in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Liftoff. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_liftoff?tab=settings) to go there directly.

Click the **Save & Enable** button.

.png "liftoff enable.png")

### 2. Configure Postbacks

Enabling Liftoff will automatically enable the following postbacks:

- INSTALL
- OPEN
- PURCHASE
- ADD\_TO\_CART
- VIEW\_CART
- VIEW\_ITEM
- VIEW\_ITEMS
- INITIATE\_PURCHASE

.png "liftoff postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_liftoff?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Liftoff.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

.gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_liftoff?tab=attribution_windows) tab to set windows by attribution type.

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

To set up cost ingestion for Liftoff, you will need to authenticate using your API Key and API Secret. Please reach out to your Liftoff account manager if you have trouble finding these values.

Enter your API Key and API Secret, and click **Save Authentication**

.png)

### 5. Create Branch Ad Link

Next, you'll need to create a Branch Ad Link for your Liftoff campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Liftoff campaign.

### 6. Verify Data in Branch

After launching your Liftoff campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Liftoff. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_liftoff` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Liftoff from Branch.

#### Verifying Cost Data

To verify that cost data is flowing into Branch, you need to have the following:

- Completed all implementation steps above
- You need to already be live with campaigns running for the ad network
- Wait 24 hours for data to be pulled in
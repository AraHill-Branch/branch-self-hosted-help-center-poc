---
title: "Clinch"
slug: clinch
---

![1328](/img/3fe1a62-Clinch__branch(3).png "Clinch + branch.png")

## Overview

Clinch is an AI-powered Creative Personalization platform that delivers consumer-tailored ad experiences across all channels, to drive online and in-store performance and sales.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | DCO |
| Deep Linking | Not Supported |
| Attribution | Contact support at Clinch for more information. |
| Ad Campaign Types | Contact support at Clinch for more information. |
| Ad Formats | Contact support at Clinch for more information. |
| Click Types | Contact support at Clinch for more information. |
| Supported Platforms | Contact support at Clinch for more information. |
| Link Wrapping | Contact support at Clinch for more information. |
| Cost Ingestion Support | Contact support at Clinch for more information. |
| Cost Ingestion Types | Contact support at Clinch for more information. |
| Pricing Models | Contact support at Clinch for more information. |

## Prerequisites

In order to enable Clinch, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Clinch.

## Enable Clinch

### 1. Enable Clinch in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Clinch. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_clinch?tab=settings) to go there directly.

You'll need to input your **Clinch Client ID (CID)** and your **Clinch Data Source ID (DSID)**. Please reach out to your Clinch Account Manager for details.

Click the **Save & Enable** button.

![](../../../assets/media/images/891ee40d-639c-4e14-94c7-8b6267d65faa "Enable Clinch.PNG")

### 2. Configure Postbacks

Enabling Clinch will automatically enable the following postbacks:

- INSTALL
- PURCHASE
- ADD\_TO\_CART
- ADD\_TO\_WISHLIST
- VIEW\_CART
- VIEW\_ITEM
- VIEW\_ITEMS
- INITIATE\_PURCHASE

![](../../../assets/media/images/643cab10-4356-446e-b1df-b93081441f42 "Clinch Postbacks.PNG")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_clinch?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Clinch.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

![](/img/c1b289e-Add_New_Postbacks(89).gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_clinch?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your Clinch campaigns in order for Branch to properly attribute conversions.

[![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/a516deb-small-95b5d97-small-Vectorlogo_1(98).png)

![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/feddb04-Branch_badge_light_default-32x32.ico) help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Clinch campaign.

### 5. Verify Data in Branch

After launching your Clinch campaigns, and conversions begin to happen, you'll want to to verify data is being sent from Branch to Clinch. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_clinch` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Clinch from Branch.
---
title: "ironSource"
slug: ironsource
---

*[Image: 1328]*.png "Ironsource + branch.png")

## Overview

[ironSource](http://www.ironsrc.com) works with the world’s largest mobile game companies, ironSource is developing the industry's leading growth engine for games. With a robust mobile ad mediation platform, mobile ad network, and a data-driven user acquisition platform, ironSource closes the monetization and marketing loop to empower game developers to turn their games into successful businesses. Founded in 2010, ironSource is a global company, with a strong local presence in Tel Aviv, London, New York, San Francisco, Beijing, Shenzhen, Bangalore, Seoul, and Tokyo.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Network |
| Deep Linking | Supported |
| Attribution | All Types |
| Ad Campaign Types | - Retargeting - Acquisition |
| Ad Formats | - Interstitial video - Rewarded video - Offerwall |
| Click Types | - Client-side click - Server-side click |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Contact support at ironSource for more information. |
| Cost Ingestion Types | Contact support at ironSource for more information. |
| Pricing Models | - CPI - CPCV - CPE (Offerwall) - CPM - CPC |

## Prerequisites

In order to enable ironSource, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through ironSource.

## Enable ironSource

### 1. Enable ironSource in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for ironSource. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_ironsource?tab=settings) to go there directly.

Click the **Save & Enable** button.

.png "ironsource enable.png")

### 2. Configure Postbacks

Enabling ironSource will automatically enable the following postbacks:

- INSTALL
- OPEN
- PURCHASE
- ACHIEVE\_LEVEL
- COMPLETE REGISTRATION
- COMPLETE TUTORIAL

.png "ironsource postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_ironsource?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to ironSource.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

.gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_ironsource?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your ironSource campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your ironSource campaign.

### 5. Verify Data in Branch

After launching your ironSource campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to ironSource. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_ironSource` |

Once applied, data should flow through the Liveview, and you can see the data being sent to ironSource from Branch.
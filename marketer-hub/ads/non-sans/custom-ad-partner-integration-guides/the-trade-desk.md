---
title: "The Trade Desk"
slug: the-trade-desk
---

*[Image: 1328]*.png "The Trade Desk + branch.png")

## Overview

[The Trade Desk](https://www.thetradedesk.com/) powers the most sophisticated buyers in advertising technology. Founded by the pioneers of real-time bidding, The Trade Desk has become the fastest-growing demand-side platform in the industry by offering agencies, aggregators, and their advertisers' best-in-class technology to manage display, mobile, and video advertising campaigns.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | DSP |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution (with the exception of web events) |
| Ad Campaign Types | - Acquisition Campaigns - Retargeting Campaigns |
| Ad Formats | Contact support at The Trade Desk for more information. |
| Click Types | - Server-side click |
| Supported Platforms | - iOS - Android - Amazon - Windows - Mac OS - Unix - Apple TV - Android TV - Samsung TV - Amazon Fire TV - Tizen |
| Link Wrapping | Yes |
| Cost Ingestion Support | No |
| Cost Ingestion Types | Contact support at The Trade Desk for more information. |
| Pricing Models | CPM |

## Prerequisites

In order to enable The Trade Desk, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through The Trade Desk.

## Enable The Trade Desk

### 1. Enable The Trade Desk in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for The Trade Desk. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_the_trade_desk?tab=settings) to go there directly.

You'll need to input your **Advertiser ID**, your **iOS Event Tracker ID**, your **Android Event Tracker ID**, and your **Web Event Tracker ID**. Please reach out to your Trade Desk Account Manager for details.

Click the **Save & Enable** button.

.png "The trade desk enable.png")

### 2. Configure Postbacks

Enabling The Trade Desk will automatically enable the following postbacks:

- INSTALL
- PURCHASE

.png "the trade desk postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_the_trade_desk?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to The Trade Desk.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

.gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_the_trade_desk?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your Trade Desk campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Trade Desk campaign.

### 5. Verify Data in Branch

After launching your Trade Desk campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to The Trade Desk. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_the_trade_desk` |

Once applied, data should flow through the Liveview, and you can see the data being sent to The Trade Desk from Branch.
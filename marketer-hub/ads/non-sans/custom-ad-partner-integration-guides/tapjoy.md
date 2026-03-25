---
title: "Tapjoy"
slug: tapjoy
---

*[Image: 1328]*.png "Tapjoy + branch.png")

## Overview

[Tapjoy](http://tapjoy.com) is a leading mobile advertising and app monetization company. Our platform empowers advertisers to connect with over one billion monthly active users through value exchange advertising that drives awareness, engagement, and the metrics that matter most to their overall growth. We’re also revolutionizing the market research industry with MobileVoice®, a market research solution that gives mobile users a voice of their own. Companies such as Scopely, Glu, Ludia, and many of the Top 200 grossing app publishers trust our platform to monetize their content, grow their audiences, and reward their users. Founded in 2007 and headquartered in San Francisco, Tapjoy is a global organization with offices in Santa Barbara, Boston, London, Beijing, Tokyo, and Seoul. For more information, visit [www.tapjoy.com](http://www.tapjoy.com).

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Contact support at Tapjoy for more information. |
| Deep Linking | Supported |
| Attribution | Contact support at Tapjoy for more information. |
| Ad Campaign Types | Contact support at Tapjoy for more information. |
| Ad Formats | Contact support at Tapjoy for more information. |
| Click Types | - Server-side click |
| Supported Platforms | Contact support at Tapjoy for more information. |
| Link Wrapping | Contact support at Tapjoy for more information. |
| Cost Ingestion Support | Contact support at Tapjoy for more information. |
| Cost Ingestion Types | Contact support at Tapjoy for more information. |
| Pricing Models | - CPI - CPC - CPA - CPV - CPE |

## Prerequisites

In order to enable Tapjoy, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Tapjoy.

## Enable Tapjoy

### 1. Enable Tapjoy in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Tapjoy. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_tapjoy?tab=settings) to go there directly.

Click the **Save & Enable** button.

.png "Tapjoy enable.png")

### 2. Configure Postbacks

Enabling Tapjoy will automatically enable the following postbacks:

- INSTALL
- OPEN
- PURCHASE

.png "Tapjoy postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_tapjoy?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Tapjoy.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

.gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_tapjoy?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your Tapjoy campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Tapjoy campaign.

### 5. Verify Data in Branch

After launching your Tapjoy campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Tapjoooy. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_tapjoy` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Tapjoy from Branch.
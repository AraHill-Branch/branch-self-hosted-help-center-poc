---
title: "Manage"
slug: manage
---

*[Image: 1328]*.png "Manage + branch.png")

## Overview

[Manage](https://www.manage.com/) is a leading mobile in-app advertising solution for brand and performance marketers.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | - Ad Network - Publisher |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Acquisition Campaigns - Retargeting Campaigns |
| Ad Formats | - Desktop Web Inventory - In-App Inventory - Mobile Web Inventory |
| Click Types | -Client-side click |
| Supported Platforms | -iOS -Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Not Supported |
| Cost Ingestion Types | N/A |
| Pricing Models | - CPI - CPC - CPM - CPA - CPV |

## Prerequisites

In order to enable Manage, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Manage.

## Enable Manage

### 1. Enable Manage in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Manage. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_manage?tab=settings) to go there directly.

Click the **Save & Enable** button.

.png "manage enable.png")

### 2. Configure Postbacks

Enabling Manage will automatically enable the following postbacks:

- INSTALL
- OPEN
- PURCHASE

.png "manage postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_manage?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Manage.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

.gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_manage?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your Manage campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Manage campaign.

### 5. Verify Data in Branch

After launching your Manage campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Manage. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_manage` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Manage from Branch.
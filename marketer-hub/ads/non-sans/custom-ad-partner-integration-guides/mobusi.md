---
title: "Mobusi"
slug: mobusi
---

*[Image: 1328]*.png "Mobusi + branch.png")

## Overview

[Mobusi](http://mobusi.com) is a technology media company with expertise in performance advertising.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | - Ad Network - DSP - Exchange |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Acquisition campaigns - Retargeting campaigns |
| Ad Formats | Contact support at Mobusi for more information. |
| Click Types | - Client-side click |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Not Supported |
| Cost Ingestion Types | N/A |
| Pricing Models | - CPI - CPC - CPM - CPA |

## Prerequisites

In order to enable Mobusi, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Mobusi.

## Enable Mobusi

### 1. Enable Mobusi in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Mobusi. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_mobusi?tab=settings) to go there directly.

You'll need to input your **Mobusi Service ID**. Please reach out to your Mobusi Account Manager for details.

Click the **Save & Enable** button.

.png "Mobusi enable.png")

### 2. Configure Postbacks

Enabling Mobusi will automatically enable the following postbacks:

- INSTALL
- OPEN

.png "Mobusi Postback.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_mobusi?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Mobusi.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

.gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_mobusi?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your Mobusi campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Mobusi campaign.

### 5. Verify Data in Branch

After launching your Mobusi campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Mobusi. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_mobusi` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Mobusi from Branch.
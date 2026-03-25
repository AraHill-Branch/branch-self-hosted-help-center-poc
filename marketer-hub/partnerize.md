---
title: "Partnerize"
slug: partnerize
---

![1328](/img/fd6b328-Partnerize__branch(3).png "Partnerize + branch.png")

## Overview

[Partnerize](https://partnerize.com/en) is a SaaS technology company that helps the world's leading brands build powerful business partnerships that drive extraordinary business growth. The Partnerize Partner Management Platform (PMP) is an end-to-end, SaaS-based solution for forming, managing, analyzing, and predicting the future results of partner marketing programs using artificial intelligence. Hundreds of the world's largest brands leverage our real-time technology to manage more than $6B in partner programs and financial exchanges across 214 countries and territories worldwide.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | - Ad Network - Self Serve |
| Deep Linking | Supported |
| Attribution | - Click-through Attribution |
| Ad Campaign Types | - Retargeting |
| Ad Formats | - Banner |
| Click Types | - Client-side Click |
| Supported Platforms | - iOS - Android - Windows - Mac OS - UNIX |
| Link Wrapping | Supported |
| Cost Ingestion Support | Not Supported |
| Cost Ingestion Types | N/A |
| Pricing Models | - CPI - CPC - CPA |

# Prerequisites

In order to enable Partnerize, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Partnerize.

## Enable Partnerize

### 1. Enable Partnerize in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Partnerize. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_partnerize?tab=settings) to go there directly.

Click the **Save & Enable** button.

![](/img/44c200a-Partnerize_enable(3).png "Partnerize enable.png")

### 2. Configure Postbacks

Enabling Partnerize will automatically enable the following postbacks:

- INSTALL
- CLICK
- OPEN
- PURCHASE

![](/img/bd28825-partnerize_postbakcs(3).png "partnerize postbakcs.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_partnerize?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Partnerize.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

![](/img/c1b289e-Add_New_Postbacks(102).gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_partnerize?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your Partnerize campaigns in order for Branch to properly attribute conversions.

[![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/a516deb-small-95b5d97-small-Vectorlogo_1(98).png)

![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/feddb04-Branch_badge_light_default-32x32.ico) help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Partnerize campaign.

### 5. Verify Data in Branch

After launching your Partnerize campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Partnerize. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_partnerize` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Partnerize from Branch.
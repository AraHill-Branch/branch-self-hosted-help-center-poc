---
title: "Mobupps"
slug: mobupps
---

![1328](/img/9f5c1b9-Mobupps__branch(3).png "Mobupps + branch.png")

## Overview

We are experts in marketing and have a proven ability to successfully match between publishers and advertisers.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Contact support at Mobupps for more information. |
| Deep Linking | Supported |
| Attribution | -Click-Through Attribution |
| Ad Campaign Types | -Acquisition Campaigns |
| Ad Formats | Contact support at Mobupps for more information. |
| Click Types | -Client-side Click |
| Supported Platforms | -iOS -Android |
| Link Wrapping | Supported |
| Cost Ingestion Support | Not Supported |
| Cost Ingestion Types | N/A |
| Pricing Models | - CPI - CPC - CPM - CPA - CPV |

## Prerequisites

In order to enable Mobupps, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Mobupps.

## Enable Mobupps

### 1. Enable Mobupps in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Mobupps. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_mobupps?tab=settings) to go there directly.

Click the **Save & Enable** button.

![](/img/cb0f17b-mobupps_enable(3).png "mobupps enable.png")

### 2. Configure Postbacks

Enabling Mobupps will automatically enable the following postbacks:

- INSTALL

![](/img/1fcd7ff-Mobupps_postbacks(3).png "Mobupps postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_mobupps?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Mobupps.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

![](/img/c1b289e-Add_New_Postbacks(100).gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_mobupps?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your Mobupps campaigns in order for Branch to properly attribute conversions.

[![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/a516deb-small-95b5d97-small-Vectorlogo_1(98).png)

![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/feddb04-Branch_badge_light_default-32x32.ico) help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Mobupps campaign.

### 5. Verify Data in Branch

After launching your Mobupps campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Mobupps. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_mobupps` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Mobupps from Branch.
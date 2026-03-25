---
title: "Bold Screen Media"
slug: bold-screen-media
---

*[Image: 1328]*.png "Bold Screen + branch.png")

## Overview

Branch is excited to partner with Bold Screen Media as one of our Ads Partners.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Contact support at Bold Screen Media for more information. |
| Deep Linking | Contact support at Bold Screen Media for more information. |
| Attribution | Contact support at Bold Screen Media for more information. |
| Ad Campaign Types | Contact support at Bold Screen Media for more information. |
| Ad Formats | Contact support at Bold Screen Media for more information. |
| Click Types | Contact support at Bold Screen Media for more information. |
| Supported Platforms | Contact support at Bold Screen Media for more information. |
| Link Wrapping | Contact support at Bold Screen Media for more information. |
| Cost Ingestion Support | Contact support at Bold Screen Media for more information. |
| Cost Ingestion Types | Contact support at Bold Screen Media for more information. |
| Pricing Models | Contact support at Bold Screen Media for more information. |

## Prerequisites

In order to enable Bold Screen Media, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Bold Screen Media.

## Enable Bold Screen Media

### 1. Enable Bold Screen Media in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Bold Screen Media. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_bold_screen_media?tab=settings) to go there directly.

Click the **Save & Enable** button.

.png "Bold Screen media enable.png")

### 2. Configure Postbacks

Enabling Bold Screen Media will automatically enable the following postback:

- INSTALL

.png "Bold screen postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_bold_screen_media?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Clinch.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

.gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_bold_screen_media?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your Bold Screen Media campaigns in order for Branch to properly attribute conversions.

[.png)

 help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your Bold Screen Media campaign.

### 5. Verify Data in Branch

After launching your Bold Screen Media campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Bold Screen Media. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_bold_screen_media` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Bold Screen Media from Branch.
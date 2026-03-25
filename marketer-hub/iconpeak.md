---
title: "IconPeak"
slug: iconpeak
---

![1328](/img/17ae7e8-Iconpeak__branch(3).png "Iconpeak + branch.png")

## Overview

[IconPeak](https://www.iconpeak.com/)  is the extension of your user acquisition team. We combine proprietary technology, expertise, and data to help agencies, brands, and app developers win in today's attention economy. We activate your global audiences by utilizing the best of our state-of-the-art DSP and in-house machine-learning technology.

SmartIcon: Our proprietary AI technology uses real-time post-install data not only to measure KPIs and optimize traffic delivery but also to recommend sources with the right traffic for your app.

RTB DSP: We make calculated real-time buying decisions and pool insights on user behavior to continuously optimize performance. We offer transparency on publishers, audiences, and invest your budget in real people through premium inventory.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Contact support at IconPeak for more information |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution |
| Ad Campaign Types | - Acquisition Campaigns |
| Ad Formats | Contact support at IconPeak for more information. |
| Click Types | - Server-side click |
| Supported Platforms | - iOS - Android - Windows |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | - ~~Click/Impression tracking link~~ - Email Import - Manual File Upload |
| Pricing Models | - CPI |

## Prerequisites

In order to enable IconPeak, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through IconPeak.

## Enable IconPeak

### 1. Enable IconPeak in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for IconPeak. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_iconpeak?tab=settings) to go there directly.

Click the **Save & Enable** button.

![](/img/29efbb6-iconpeak_enable(3).png "iconpeak enable.png")

### 2. Configure Postbacks

Enabling IconPeak will automatically enable the following postbacks:

- INSTALL

![](/img/1480baf-iconpeak_postbacks(3).png "iconpeak postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_iconpeak?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to IconPeak.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

![](/img/c1b289e-Add_New_Postbacks(92).gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_iconpeak?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your IconPeak campaigns in order for Branch to properly attribute conversions.

[![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/a516deb-small-95b5d97-small-Vectorlogo_1(98).png)

![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/feddb04-Branch_badge_light_default-32x32.ico) help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your IconPeak campaign.

### 5. Verify Data in Branch

After launching your IconPeak campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to IconPeak. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_iconpeak` |

Once applied, data should flow through the Liveview, and you can see the data being sent to IconPeak from Branch.
---
title: "MAAS (Powered by Affle)"
slug: maas
---

![1328](/img/af4bdc1-MAAS__Branch(3).png "MAAS + Branch.png")

## Overview

[Affle](http://www.affle.com/) is a Singapore headquartered Mobile Audience as a Service (MAAS) platform company. Affle delivers end-to-end mobile commerce & marketing solutions with greater ROI and transparency for marketers, commerce marketplaces, app developers and publishers through unique intent insights derived from behavioral signals, attribution and transaction data. Since 2006, Affle has been a pioneer in the field of mobile technology and has built significant scale and intelligence backed by its robust profile data and insights about millions of users growing larger and richer by the day. Affle's investors include Microsoft, D2C (An NTT DoCoMo subsidiary), Itochu, Bennett Coleman & Company Ltd. (BCCL), Centurion Private Equity amongst others.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution |
| Ad Campaign Types | - Acquisition campaigns - Retargeting campaigns |
| Ad Formats | Contact support at MAAS (Powered by Affle) for more information. |
| Click Types | - Client-side click |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | - Click/impression tracking link |
| Pricing Models | - CPI - CPM - CPA |

## Prerequisites

In order to enable MAAS, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through MAAS.

## Enable MAAS

### 1. Enable MAAS in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for MAAS. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_affle?tab=settings) to go there directly.

Click the **Save & Enable** button.

![](/img/8db1e7b-Enable_maas(3).png "Enable maas.png")

### 2. Configure Postbacks

Enabling MAAS will automatically enable the following postbacks:

- INSTALL

![](/img/5c56dd9-maas_postbacks(3).png "maas postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_affle?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to MAAS.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

![](/img/c1b289e-Add_New_Postbacks(97).gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_affle?tab=attribution_windows) tab to set windows by attribution type.

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

Next, you'll need to create a Branch Ad Link for your MAAS campaigns in order for Branch to properly attribute conversions.

[![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/a516deb-small-95b5d97-small-Vectorlogo_1(98).png)

![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/feddb04-Branch_badge_light_default-32x32.ico) help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your MAAS campaign.

### 5. Verify Data in Branch

After launching your Clinch campaigns, and conversions begin to happen, you'll wantto verify data is being sent from Branch to Clinch. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_affle` |

Once applied, data should flow through the Liveview, and you can see the data being sent to MAAS from Branch.
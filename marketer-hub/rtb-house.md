---
title: "RTB House"
slug: rtb-house
---

![1328](/img/92eae3c-RTB_House__branch(3).png "RTB House + branch.png")

## Overview

[RTB House Inc.](https://www.rtbhouse.com/) provides digital advertising technology services. The Company delivers digital advertising campaigns to customers who have displayed purchase intent. RTB House serves customers worldwide.

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | Contact support at RTB House for more information |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Retargeting campaigns |
| Ad Formats | - Banner - Video |
| Click Types | - Server-side click |
| Supported Platforms | - iOS - Android - Windows - Mac OS - Unix |
| Link Wrapping | Supported |
| Cost Ingestion Support | Supported |
| Cost Ingestion Types | via API (Beta) |
| Cost Time Zone | GMT |
| Cost Data Scheduling | [ 4, 9, 12, 18, 24, 36, 48, 72, 96, 120, 240, 360, 480, 720 ] in hours from midnight |
| Pricing Models | - CPC - CPM - CPA |

## Prerequisites

In order to enable RTB House, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Have the following enabled in RTB House:

   - The account being used must not have multi-factor authentication enabled.
   - The feature **SHOW\_COUNTRY\_COLUMN** must be enabled in the API for your account
   - The account must have `campaign id` mapped in tracking links
5. Running campaigns through RTB House.

## Enable RTB House

### 1. Enable RTB House in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for RTB House. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_rtb_house_sa?tab=settings) to go there directly.

You'll need to input your Region.  
 For EMEA, enter **emea**  
 For APAC, enter **asia**  
 For Americas, enter **us**  
 Please reach out to your RTB House Account Manager if you have any questions.

Click the **Save & Enable** button.

![](/img/6dcaf12-RTB_House_enable(3).png "RTB House enable.png")

### 2. Configure Postbacks

Enabling RTB House will automatically enable the following postbacks:

- INSTALL

![](/img/d2c3066-rtb_house_postbacks(3).png "rtb house postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_rtb_house_sa?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to RTB House.

#### Adding Postbacks

Click the **Add New Postback** button at the bottom of the screen. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).

![](/img/c1b289e-Add_New_Postbacks(105).gif "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended** 👍 [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_rtb_house_sa?tab=attribution_windows) tab to set windows by attribution type.

#### Recommended Attribution Windows

| Attribution Type | Window |
| --- | --- |
| click to session start | 90 days |
| click to install | 30 days |
| click to conversion event | 90 days |
| impression to session start | 1 day |
| impression to install | 1 day |
| impression to conversion event. | 1 day |

### 4. Set up Cost Data

::: warning Beta for Non-SANs
Cost Data for Non-Self-Attributing Networks (Non-SANs) is a feature currently in Beta; be aware that there may be unexpected bugs/behaviors until the full release.
:::

To set up cost ingestion for RTB House, you will need to authenticate using your **User Name and Password**. Please reach out to your RTB House account manager if you have trouble finding these values.

Enter your **User Name and Password**, and click **Save Authentication**

![](/img/b1f8d54-RTB_House_Cost_Data_Enable(3).png)

### 5. Create Branch Ad Link

Next, you'll need to create a Branch Ad Link for your RTB House campaigns in order for Branch to properly attribute conversions.

[![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/a516deb-small-95b5d97-small-Vectorlogo_1(98).png)

![](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/feddb04-Branch_badge_light_default-32x32.ico) help.branch.io

Create Ad Links](/docs/ad-links)

The Branch Ad Link you create will be placed in your RTB House campaign.

### 6. Verify Data in Branch

After launching your RTB House campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to RTB House. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_rtb_house_sa` |

Once applied, data should flow through the Liveview, and you can see the data being sent to RTB House from Branch.

#### Verifying Cost Data

To verify that cost data is flowing into Branch, you need to have the following:

- Completed all implementation steps above
- You need to already be live with campaigns running for the ad network
- Wait 24 hours for data to be pulled in
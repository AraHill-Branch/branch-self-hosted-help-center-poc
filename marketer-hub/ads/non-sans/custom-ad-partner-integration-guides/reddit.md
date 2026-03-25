---
title: "Reddit"
slug: reddit
---

*[Image: 1328]*.png "Reddit + branch.png")

## Overview

[Reddit](https://www.reddit.com) is a network of more than 100,000 communities where people can find experiences built around their interests, hobbies and passions. Reddit users submit, vote and comment on content, stories and discussions about the topics they care about the most. From pets to parenting, there’s a community for everybody on Reddit and with more than 52 million daily active users, it is home to the most open and authentic conversations on the internet. For more information, visit redditinc.com.

### Restrictions

**Reminder**: Data received about a Reddit Campaign is subject to the [Reddit Business Tool Terms](https://business.reddithelp.com/s/article/Reddit-Business-Tool-Terms), and includes, among other restrictions, a prohibition on using Reddit Data to create profiles of any users.

#### Click-Through Attribution (CTA) Data Sharing

For users acquired through Click-Through Attribution (CTA), companies may enrich Advertiser's user-level data only with the following Reddit Personal Data:

- Media Source: "Reddit"
- Click Date: (Time excluded)
- Campaign Metadata: (To the extent received by the Company)
- Campaign ID
- Ad Group ID
- Ad ID
- Ad Group Name
- Ad Name
- Account ID
- Campaign Name (when available)

#### View-Through Attribution (VTA) Data Sharing

For users attributed to Reddit via View-Through Attribution (VTA), companies may only display the media source as "Restricted" (or an equivalent term approved by Reddit). All campaign metadata fields listed above will be hidden (i.e., shown as null).

### Partner Capabilities

| Capability | Details |
| --- | --- |
| Company Type | - Publisher - Ad Network |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Acquisition campaigns |
| Ad Formats | Contact support at Reddit for more information. |
| Click Types | - Server-side click |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Not Supported |
| Cost Ingestion Types | N/A |
| Pricing Models | - CPC |

## Prerequisites

In order to enable Reddit, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Running campaigns through Reddit.

## Enable Reddit

### 1. Enable Reddit in Branch

In the Branch Dashboard under **Ads** > [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Reddit. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_reddit?tab=settings) to go there directly.

Click the **Save & Enable** button.

.png "reddit enable.png")

### 2. Configure Postbacks

Enabling Reddit will automatically enable the following postbacks:

- INSTALL
- OPEN
- PURCHASE
- ADD\_TO\_CART
- ACHIEVE\_LEVEL
- REINSTALL

.png "reddit postbacks.png")

You can configure these postbacks or add more under the [**Postback Config**](https://dashboard.branch.io/ads/partner-management/a_reddit?tab=postback) tab.

#### Send All Events

Optionally, you can check the checkbox for a given postback for sending all events. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to Reddit.

#### Adding Postbacks

To add a postback:

1. Click the **Add New Postback** button at the bottom of the screen.
2. A modal will appear that will allow you to select an event that you are tracking with the Branch SDKs (including Custom Events).
3. Select the event type for the postback, add the postback URL, and click **Save**.

.png "Add New Postbacks.gif")

For more in-depth postback configurations, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **Recommended**: [Test Postbacks](testing-postbacks.md)

### 3. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_reddit?tab=attribution_windows) tab to set windows by attribution type.

#### Recommended Attribution Windows

| Attribution Type | Window |
| --- | --- |
| click to session start | 90 days |
| click to install | 30 days |
| click to conversion event | 90 days |
| impression to session start | 1 day |
| impression to install | 1 day |
| impression to conversion event. | 1 day |

### 4. Add Branch Ad Links to Reddit Ads

Integrating Branch with Reddit Ads is a two-part process that enables deep linking while maintaining accurate attribution without double-counting.

By separating the Destination URL (for routing) from the Tracking URLs (for reporting), you ensure accurate campaign measurement without duplicating installs.

#### Create a Branch Ad LInk

Start by creating a [Branch Ad Link](https://help.branch.io/docs/ad-links) for your Reddit campaign in the Branch Dashboard. This will generate the URLs you need for both deep linking and attribution tracking.

When you create a Branch Ad Link, you will get:

- The main Branch Ad Link URL, which you will use for the Destination URL (with modifications).
- The Click Tracking URL, used for click attribution tracking.
- The Impression Tracking URL, used for view-through attribution tracking.

**Destination URL (Deep Linking Only)**

The Destination URL is where users are sent when they tap your ad. This handles the deep linking action.

- Syntax: Use your standard Branch Link and append the `$deeplink_no_attribution` parameter.

  - Note: Remove all others macros from this link!
- Purpose: This parameter tells the Branch server to only perform deep link routing (sending users into the app or to the fallback) and to exclude this session from attribution reporting. This prevents the link from taking credit for an install that should be credited to your dedicated Tracking URLs (see below).

Example: `https://monster-factory.app.link/mXvG6BooMXb?%243p=a_reddit&$deeplink_no_attribution=true`

Implementation:

1. Copy the main URL that was created when you made your Branch Ad Link. Make sure to append the `$deeplink_no_attribution` parameter.
2. In Reddit Ads Manager, paste this URL into the **Destination URL** field.



**Tracking URLs (Attribution Only)**

The actual measurement of your ad's performance must be handled separately, using dedicated tracking fields in the Reddit Ads Manager.

- Click trackers: This is a server-to-server (S2S) URL that records the click and passes essential macros like &#123;&#123;ad_id&#125;&#125; and &#123;&#123;campaign_id&#125;&#125; back to Branch. This ensures click-through attribution is recorded.
- Impression trackers:This URL is fired when someone views your ad and is used to record view-through attribution data.

Implementation:

1. Copy the generated **Click** and **Impression** tracking URLs from Branch. These are generated automatically when you create a Branch Ad Link.
2. Paste them into the corresponding **Tracking** fields in the Reddit Ads Manager setup.



For more information, visit [Reddit’s help documentation](https://business.reddithelp.com/s/article/Set-up-third-party-measurement).

### 5. Verify Data in Branch

After launching your Reddit campaigns, and conversions begin to happen, you'll want to verify data is being sent from Branch to Reddit. You can look at the [Branch Dashboard's Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | `a_reddit` |

Once applied, data should flow through the Liveview, and you can see the data being sent to Reddit from Branch.
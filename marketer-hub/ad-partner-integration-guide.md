---
title: "Ad Partner Integration Guide"
slug: ad-partner-integration-guide
---

This guide will walk you through connecting your ad partner in Branch to track campaign performance.

## Prerequisites

In order to enable your ad partner, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Added the Performance [product](packaging.md) to your Branch account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)

## 1. Enable Ad Partner

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
2. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for your **Ad Partner**.
4. Select Ad Partner Name and hit **Save & Enable**.



## 2. Provide Account Credentials

Not all integrations require providing account credentials.

When prompted to, enter any credentials that may be required, and click **Save and Enable** in the bottom right-hand corner.



If you do not know your account credentials for said partner, please ask your ad partner for this information.

## 3. Enable Postbacks

When a conversion/event attributed to an ad campaign occurs, Branch notifies the Ad partner of these events via **postbacks** which are turned on when you enable any Ads integrated partner (Postback Config tab of the ad partner)

Basic postbacks will automatically be activated for events like **INSTALL** and **PURCHASE** when you enable your ad partner.



For a more detailed guide on configuring Postbacks, view our guides:

- [Basic Postback Configuration](basic-postback-configuration.md)
- [Advanced Postback Configuration](advanced-postback-configuration.md)
- **RECOMMENDED** 👍 [Postback Testing](testing-postbacks.md)

Postback Testing makes it easy to verify if you have properly enabled a postback for an ad partner and (if applicable) if you have the correct ad partner credentials entered.

## 4. Create Ad Link

For non-SANs, they require [Branch Ad Links](ad-links.md) in their campaigns in order for Branch to properly attribute conversions.

[Create Ad Links](ad-links.md)

## 5. Verify Data Sent

Once the above steps are complete, you are ready to start launching campaigns. Branch-attributed conversions enabled as postbacks will be sent to the winning ad network that drove the conversion.

#### Obtain Ad Partner Key

You need to obtain your ad partner's **$3p Value**. You can find this in the **Account Settings** tab of your ad partner in the [**Partner Management page**](https://dashboard.branch.io/ads/partner-management).



To verify data is being sent from Branch to the ad network, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| ad partner (3p) | equals | Your ad partner key |

We also recommend adding the following columns to better understand the postback/webhook being sent:

- Webhook Response Code

  - 200 Codes: Success
  - 400 Codes: Error
- IDFA/AAID & Click ID: A good indicator that macros are being populated properly.



::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto the ad networks. If data has not appeared in your ad network after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::
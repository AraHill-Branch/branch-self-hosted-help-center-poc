---
title: "Roku"
slug: roku
---



## Overview

For marketers utilizing Branch and Roku, this article details how to integrate Branch's robust deep linking and attribution features within your Roku ad campaigns.

Learn how this integration can improve the user journey and provide clearer insights into your advertising effectiveness on the Roku platform

**Roku Ad Manager**  
Roku's Self-Attributing Ad Network, provides access for its third-party Measurement Partners to request attribution for install and event attribution for clients utilizing Roku’s Endemic(i.e. streaming) Media to help drive distribution and re-engagement of their apps. Similar to other Self-Attributing Networks (SANs), Roku will be able to receive conversion events tracked via Branch SDK and use it for performance optimization, audience segmenting, and re-targeting.

::: info Roku Data Sharing
Roku last-attributed data will be wiped at the log-level (via [Custom Exports](custom-exports-api.md) and [Daily Exports](daily-exports-api.md)) and this data will appear as **null/blank** in exports but you can still export it via aggregated data ([Aggregate API](aggregate-api.md) or [Query API](query-api.md))
:::

## Prerequisites

In order to enable Roku, you first need to:

1. Create a [Branch Dashboard](https://dashboard.branch.io/).
2. Enable [Household Measurement](https://help.branch.io/docs/packaging#performance-pro-tier) for your Branch account. Household Measurement requires a premium plan. Please [contact our Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.
3. *(Optional)* Implement the Branch SDK into your OTT/CTV app:

   - [Roku SDK](roku-basic-integration.md)
   - [Connected SDK](https://help.branch.io/developers-hub/docs/connected-sdk-index)
   - [OTT Server-to-Server](desktop-over-the-top-ott-attribution.md)
4. Have admin access to your [Roku Account](https://advertising.roku.com/).

## Enable Roku

To enable Roku, you can either use Roku Ads Manager or Roku managed services.

### Enable Roku with Roku Ads Manager

To enable Roku with Roku Ads Manager, complete the steps below:

1. Sign in to [Roku Ads Manager](https://ads.roku.com/).
2. Navigate to the [Events page](https://ads.roku.com/pixels).
3. Identify an existing Event Group or create a new Event Group.
4. Copy the Event Group ID.  
   *[Image: Roku Ads Manager interface showing event group ID and event source status.]*.png)
5. Send Roku ([adsmanagersupport@roku.com](mailto:adsmanagersupport@roku.com)) the following information:

   1. Your MMP name (Branch)
   2. Your Event Group ID

### Enable Roku with managed services

To enable Roku with managed services, you will need Roku to provide you with an Event Group ID. Please reach out to your Roku representative for this.

## **Connect Roku in Branch**

To connect Roku in Branch, complete the steps below:

1. In the Branch Dashboard, navigate to the [Ads Partner page](https://dashboard.branch.io/ads/partner-management), search for “RokuSAN” and select it. Do **not** use the “Roku” option.
2. Enter your Roku Ads Manager Event Group ID and click **Save**.  
   
3. Switch to the [Events Config tab](https://dashboard.branch.io/ads/partner-management/a_ott_roku_san?tab=events) and map your Branch app events to Roku Ads Manager events.

   1. Events will appear in Roku Ads Manager attribution reporting based on this mapping configuration.
   2. Click **Save.**  
      
4. (Optional) After configuring your events, navigate to the [Attribution Windows tab](https://dashboard.branch.io/ads/partner-management/a_roku?tab=attribution_windows) to set windows by attribution type. Here are Roku’s recommended attribution window settings:

   | Attribution Type | Window |
   | --- | --- |
   | click to session start | 1 day |
   | click to install | 7 days |
   | click to conversion event | 1 day |
   | impression to session start | 1 day |
   | impression to install | 1 day |
   | impression to conversion event | 1 day |

::: info Note
Events can take up to 4 hours to appear in Roku Ads Manager.
:::

## Data mapping between Roku & Branch

Branch maps the following data fields from Roku to Branch:

| Roku Data | Branch Data | Possible Values |
| --- | --- | --- |
| Touch Type | last\_attributed\_touch\_type | CLICK or IMPRESSION |
| Account ID | last\_attributed\_touch\_data\_tilde\_advertising\_account\_id | The ID of your Roku Ads Manager account |
| Account Name | last\_attributed\_touch\_data\_tilde\_advertising\_account\_name | The name of your Roku Ads Manager account |
| Campaign ID | last\_attributed\_touch\_data\_tilde\_campaign\_id | The ID of your Roku campaign |
| Campaign Name | last\_attributed\_touch\_data\_tilde\_campaign | The name of your Roku campaign |
| Creative ID | last\_attributed\_touch\_data\_tilde\_creative\_id | The ID of your Roku creative |
| Creative Name | last\_attributed\_touch\_data\_tilde\_creative\_name | The name of your Roku creative |
| Flight ID | last\_attributed\_touch\_data\_tilde\_ad\_set\_id | The ID of the Roku line item |
| Flight Name | last\_attributed\_touch\_data\_tilde\_ad\_set\_name | The name of the Roku line item |
| Content ID | last\_attributed\_touch\_data\_tilde\_content\_id | The ID of the Roku content |
| Placement Type | last\_attributed\_touch\_data\_tilde\_placement | `mychannels` or `screensaver` |
| Timestamp | last\_attributed\_touch\_timestamp | Timestamp of the ad impression or click |

## Forwarding events to Roku

Once you begin tracking events through the Branch SDK, we will start sending them to Roku. Roku has pre-defined events that map to pre-defined Branch events, listed below.

Branch will forward in-app events to Roku for campaign optimization. In addition, Branch will receive attribution data for rich analysis in the Branch Dashboard.

| Branch Event Name | Roku Event Name | Roku Description |
| --- | --- | --- |
| INSTALL | APP\_INSTALL | When a user installs an app, or the first time an app is opened/launched. |
| REINSTALL | APP\_INSTALL | When a user installs an app, or the first time an app is opened/launched. |
| OPEN | SESSION\_START | When a user starts an app session. |
| START\_TRIAL | START\_TRIAL | When a user starts a free trial of a product or service you offer. |
| COMPLETE\_REGISTRATION | COMPLETE\_REGISTRATION | When a user completes a registration form. |
| SUBSCRIBE | SUBSCRIBE | When a user applies to a start a paid subscription for a product or service you offer. |
| COMPLETE\_STREAM | QSS | Trigger Quality Streaming Session on Video Views exceeding 5M of contiguous video play back time. |
| ADD\_TO\_CART | ADD\_TO\_CART | When a user adds a product to their shopping cart. |
| ACHIEVE\_LEVEL | ACHIEVE\_LEVEL | When a user reaches a certain level that you have defined in your game. |
| ADD\_PAYMENT\_INFO | ADD\_PAYMENT\_INFO | When a user adds payment information during the checkout flow. |
| ADD\_TO\_WISHLIST | ADD\_TO\_WISHLIST | When a user adds a product to their wishlist. |
| INITIATE\_PURCHASE | INITIATE\_CHECKOUT | When a user enters the checkout flow, prior to completing the checkout flow. |
| SEARCH | SEARCH | When a user uses your search feature. |
| LOGIN | SIGN\_UP | When a user applies for a product, service, or program you offer. |
| PAGEVIEW | PAGE\_VIEW | When a user visits a page; uses default pixel tracking. |
| PURCHASE | PURCHASE | When a user completes a purchase or completes the checkout flow. |
| CUSTOM\_EVENT | CONTACT | When a user initiates contact with your business via telephone, SMS, email, chat, etc. |
| CUSTOM\_EVENT | CUSTOMIZE\_PRODUCT | When a user customizes a product. |
| CUSTOM\_EVENT | DONATE | When a user donates funds to your organization or cause. |
| CUSTOM\_EVENT | DOWNLOAD | When a user downloads a doc, info, or service. |
| CUSTOM\_EVENT | FIND\_LOCATION | When a user searches for a location of your store via a website or app, with an intention to visit the physical location. |
| CUSTOM\_EVENT | FIRST\_VIDEO\_VIEW | When a user first views a video. This will map to Roku FTV. |
| CUSTOM\_EVENT | LEAD | When a user completes a sign up. |
| CUSTOM\_EVENT | SCHEDULE | When a user books an appointment to visit one of your locations. |
| CUSTOM\_EVENT | SUBSCRIPTION\_CANCELLATION | When a user cancels their subscription. |
| CUSTOM\_EVENT | SUBSCRIPTION\_RENEWAL | When a subscription is auto-renewed - this could be system generated event. |
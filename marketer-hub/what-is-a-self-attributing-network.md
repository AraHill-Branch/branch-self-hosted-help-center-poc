---
title: "What is a Self Attributing Network?"
slug: what-is-a-self-attributing-network
---

## Overview

Self Attributing Networks - commonly referred to as SANs - are unique in that they have infrastructure to track users & conversions at both the web & app level, so they can attribute downstream user behavior that occurs within their own ecosystem.

As such, SAN attribution is completed independently from a third party attribution provider - like Branch - which receives attribution confirmation directly from the SAN itself.

## How It Works

![](/img/e8e7276-Non-tech_SAN_Workflow_1.png "Non-tech SAN Workflow (1).png")

**1.** User interacts with a SAN mobile ad -> is taken into your app -> completes an in-app event.; e.g. a purchase.  
**2.** The SAN records and ingests the click/impression information associated with the in-app event.  
**3.** Simultaneously, the Branch SDK records the in-app event which is sent to the Branch servers.  
**4.** Branch sends device-level event data to the SAN via API to potentially be claimed by the SAN.  
**5.** If the SAN has touch data that corresponds to the device-level event data, the SAN sends Branch said touch data to use for attribution.  
**6.** Branch joins the SAN touch data with the event data on a per device basis after which the SAN attribution data is aggregated and displayed in your Branch dashboard.

In summary, Branch tracks app conversion events and sends them to the SANs enabled in your dashboard in bulk; the Ad Networks then claim the conversions they want to take credit for.

Branch adds value here by de-duplicating the attribution data across Ad Networks by cross-referencing event data across networks, giving credit based on event timestamps. For example, if Twitter and Facebook were claiming the same event, we’d credit the Ad Network with the last timestamp.

As SANs only have visibility into their own platform, conversion counts tend to be higher in their own reporting UI which is why 3rd party attribution providers like Branch exist.

## Attribution Data Sent Between Branch <> SANs

### Branch Data -> SANs

- [Apple Ads](https://developer.apple.com/documentation/iad/setting_up_apple_search_ads_attribution/#3342534) (client-side SDK attribution dictionary retrieval)
- Facebook
- [Google Ads](https://developers.google.com/app-conversion-tracking/api/request-response-specs#conversion_tracking_request)
- Google Marketing Platform
- Snap (available upon request)
- [Twitter](https://developer.twitter.com/en/docs/ads/measurement/api-reference/conversion-event#parameters)

### SAN Data -> Branch

- [Apple Ads](https://developer.apple.com/documentation/iad/setting_up_apple_search_ads_attribution/#3341535) (Retrieved Attribution Dictionary via SDK)
- Facebook
- [Google Ads](https://developers.google.com/app-conversion-tracking/api/request-response-specs#conversion_tracking_response)
- Google Marketing Platform
- Snap (available upon request)
- [Twitter](https://developer.twitter.com/en/docs/ads/measurement/api-reference/conversion-event#example-response)

### SAN Cost Data

The following SANs also provide an endpoint for the retrieval of cost data:

- Apple Ads
- Facebook
- Google Ads
- Snap
- Tiktok

For those SANs that send cost data, Branch provides the following metrics:

| Analytics Tag | Description | Used for |
| --- | --- | --- |
| Cost | Total cost (spend) for those dimensions (analytics tags, user data, time range), regardless of cost model | Understanding the total amount spent |
| eCPI | cost / installs | Normalizing spend per install, to understand the average price of an install across networks or over time |
| eCPC | cost / clicks | Normalizing spend per click, to understand the average price of an click across networks or over time |
| eCPM | cost / (impressions / 1000) | Normalizing spend per thousand impressions, to understand the average price of 1000 impressions across networks or over time |
| eCPA | cost / purchases [includes web and app purchases] | Normalizing spend per purchase, to understand the average price of a purchase across networks or over time |
| Return On Investment (ROI) | (revenue-cost / cost) \* 100 | Deriving return on investment, to understand the percentage "profit" made on ad spend |
| Return On Ad Spend (ROAS) | (revenue / cost) \* 100 | Deriving return on investment by understanding the percentage revenue multiple for a given unit of spend |

**NOTE**: All cost data is ingested in local currency and then translated to USD on the dashboard using the exchange rate for that currency on the day the data is stored. In effect, this means the dashboard shows the amount that campaign cost converted to USD at the time it ran.

## Using Branch Links

For those Self Attributing Networks that allow the use of 3rd party links in **APP AD CAMPAIGNS**, the Branch Link you provide can only be used for deep linking and not for attribution.

To ensure this, add `$deeplink_no_attribution=true` as a query parameter to the ad link you have created. Not doing so will cause any conversions resulting from said link to not be attributed.

For non-app ad campaigns - i.e. **WEB CAMPAIGNS** - you do not need to modify the Branch-generated link.

## Agency-Managed SAN Campaigns

Only agencies managing advertising campaigns on behalf of a client must append their **Agency ID** to the campaign name when creating advertising campaigns for Self-Attributing Networks (SANs).

::: danger Agency ID Required
Failure to append the campaign name with the **Agency ID** will result in any subsequent conversion not being properly attributed to the responsible agency.
:::

### Finding Your Agency ID

You can find your Agency ID under Account Settings in the [Agency view](entity-views-access-controls-overview.md).

### Creating Your Agency Tag

Your agency tag **must** adhere to the following format:

`agency_{YOUR AGENCY ID HERE}_`

**Example Campaign with Agency tag**

`agency_1234567890_My_SAN_Ad_Campaign`

*You can append the Agency Tag to either the* ***beginning*** *or the* ***end*** *of the campaign name.*

**NOTE**: The `~campaign` value displayed in exports/analytics will not include the agency\_id. If you set up a campaign called `test_campaign_agency_1234` for a SAN, the `~campaign` value will be `test campaign` for any installs that came from that campaign.

## Viewing SAN Data via Branch

Each SAN has its own requirements on how their attribution data can be handled by a third party. To learn the specifics for each SAN, please refer to the following:

- [Apple Ads](apple-search-ads.md)
- [Facebook Ads](facebook-ads-overview.md#viewing-facebook-data)
- [Google Ads](google-ads-data-reporting.md)
- [Google Marketing Platform](google-marketing-platform.md)
- [Snap](snap.md#view-attribution-on-dashboard)
- [Twitter Ads](twitter-ads.md#twitter-data-sharing)
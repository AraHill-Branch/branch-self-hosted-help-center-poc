---
title: "Multi-Touch Attribution"
slug: multi-touch-attribution
---

## Overview

Our attribution process is based on the last-click model: the party responsible for the last click before the install is attributed with the install.

While the install itself (and consequently, the advertising partner or publisher who promoted the install) is the main metric of interest, it does not capture the entirety of what actually occurred to generate the install. Oftentimes, users are influenced by and interact with numerous partners (and their advertising efforts) before finally installing your mobile app.

Simply put, having insight into multi-touch attribution (MTA) offers you a more complete picture of the interactions and events that led up to an install (in contrast to simply measuring the winning impressions, clicks, and installs).

::: warning Allowlist & Self-Attribution Networks Only
At this time, Branch is providing insight into multi-touch attribution for Self-Attributing Networks (SANs) only. This includes the touch data for the following ad partners:

- Apple Ads
- Facebook
- Google Ads
- Google Marketing Platform
- Snap
- Twitter

**NOTE**: Branch data privacy (e.g. GDPR) as well as SAN data restrictions still apply.

Please reach out to your Branch team to be added to the allowlist for this feature.
:::

## How does it work?

While Branch and other MMPs normally run on a Last Touch Attribution model, you can utilize this feature to get a better picture of the true customer journey by surfacing *all touchpoints* that led to a conversion.

### Example Multi-Touch Journey



For example, the user touches three different ad partners, Google, Snapchat, and Facebook (in that order) before converting. With MTA, you can see not only the awarded ad partner, but you can also see Google and Snapchat's touches along with the reason why they were not rewarded attribution for the conversion.

## View SAN Multi-Touch Data

Branch currently supports two methods for extracting Multi-Touch Attribution data:

1. [**Custom Exports (via UI and API)**](custom-exports-api.md)
2. [**Custom Webhooks (UI only)**](webhooks.md)

### Multi-Touch Parameters

When viewing all SAN touch data - not just attributed SAN touch data - you will receive all of the same fields as other Branch exports, but with the inclusion of the following three fields which specifically identify whether or not the touch was attributed to the SAN or a different ad partner.

| Field Name | Description | Options |
| --- | --- | --- |
| `attributed` | Whether or not the SAN was attributed.  When TRUE, it is considered as a winning touch.  When FALSE, is considered as a losing touch. | - TRUE - FALSE |
| `attributed_false_reason_code` | The `reason_code` field that defines why attribution was lost for this touch. | - NO\_CLAIM - NO\_LAST\_TOUCH - OUT\_OF\_ATTRIBUTION\_WINDOW - FRAUD\_DETECTED - ERROR |
| `attributed_false_winner` | The attribution provider that was awarded.  When PERSONA, there was a touch that was more recent (likely for a non-SAN) | - GOOGLE\_AD\_WORDS - FACEBOOK - SNAP - TWITTER - GOOGLE\_MARKETING\_PLATFORM - APPLE\_SEARCH\_AD - PERSONA |
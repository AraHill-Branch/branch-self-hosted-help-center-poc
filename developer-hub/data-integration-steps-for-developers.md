---
title: "Data Integration Steps for Developers"
slug: data-integration-steps-for-developers
---

## Overview

Data Integrations provide an easy way to automatically send Branch data to your other analytics services and marketing tools using pre-formatted webhooks.

This guide covers the technical implementation requirements for Data Integrations. For setup instructions in Branch, see our [Data Integrations guide in Marketer Hub](data-integration-implementation-guide.md).

## Prerequisites

In order to use Branch Data Integrations, you must first:

1. [Implement the Branch SDK](native-sdks-overview.md)
2. [Ensure app events are measured](track-branch-events.md)
3. Be a customer to the third party and have their respective SDK installed in your app.

## Pass ID/metadata to Branch (partner specific)

For some partners, you'll need to make sure to pass through the correct identifiers to the Branch SDKs. In order to do so, retrieve the ID from the partner SDK and pass this value to Branch using the following method:  
`setRequestMetadataKey()` method of the Branch SDKs: [iOS](ios-advanced-features.md#section-set-initialization-metadata) | [Android](android-advanced-features.md#section-set-initialization-metadata)

<details>
<summary>FIND PARTNER KEY & METHOD TO PASS TO BRANCH</summary>

| Data Integration Partner | Partner Key & Method to pass to Branch SDK |
| --- | --- |
| Adobe Analytics | - [View Adobe Analytics (Data Connector) Specific Guide Here](https://help.branch.io/partners-portal/docs/adobe-analytics?highlight=adobe%20analytics) |
| Adobe Analytics | - [View Adobe Analytics (Processing Rules) Specific Guide Here](adobe-analytics.md) |
| Airship | - [View Airship Specific Guide Here](airship.md) |
| Amplitude | - Set value for $amplitude\_device\_id & $amplitude\_user\_id keys using setRequestMetadataKey() method |
| Batch | - [View Batch Specific Guide Here](batch.md) |
| Braze | - [View Braze Specific Guide Here](braze.md) |
| CleverTap | - [View CleverTap Specific Guide Here](clevertap.md) |
| Google Analytics | - [View Google Analytics Specific Guide Here](google-analytics.md) |
| Google Analytics 4 | - [View Google Analytics 4 Specific Guide Here](google-analytics-4-configuration.md) |
| Google Firebase | - [View Google Firebase Specific Guide Here](firebase.md) |
| Iterable | - Set Iterable user ID using setIdentity() method |
| Mixpanel | - [View Mixpanel Specific Guide Here](mixpanel.md) |
| MoEngage | - [View MoEngage Specific Guide Here](moengage.md) |
| Movable Ink | - [View Movable Ink Specific Guide Here](movable-ink.md) |
| mParticle | - [View mParticle Import Specific Guide Here](mparticle-import.md) |
| mParticle | - [View mParticle Export Specific Guide Here](mparticle.md) |
| Segment | - [View Segment Import Specific Guide Here](segment-import.md) |
| Segment | - [View Segment Export Specific Guide Here](segment-export.md) |

</details>

## Additional steps for Data Integrations

To learn more about setting up Data Integrations, visit our [Data Integrations guide](data-integration-implementation-guide.md).
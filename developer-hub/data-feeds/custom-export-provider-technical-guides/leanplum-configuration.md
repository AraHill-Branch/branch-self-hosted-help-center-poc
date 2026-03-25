---
title: "Leanplum Configuration"
slug: leanplum-configuration
---

*[Image: 1328]*

## Overview

Leanplum is the mobile marketing platform that drives app engagement & ROI.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your relevant Ids will result in Branch automatically forwarding referred events to Leanplum, in the exact format Leanplum expects.

### Branch Events Sent to Leanplum

The events Branch sends to third party data tools varies based on the events the partner supports as well as whether or not you've implemented the Branch SDK to measure said events.

Leanplum supports the following events:

- Install  
   \*Reinstall

## Prerequisites

In order to enable Leanplum, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implement the Leanplum SDK](https://docs.leanplum.com/reference)
5. Admin access to your Leanplum account.

## Enable Leanplum

## 1. Retrieve IDs from Leanplum

Before you can enable the integration in your Branch dashboard, you need to retrieve your credentials from your Leanplum account.

Branch requires these credentials to not only authenticate, but to ensure your Branch data is being sent to the correct account.

Branch requires the following credentials from your Leanplum account:

- **App ID** - This is the ID applied to your application in Leanplum that tells us which dashboard the data is applied to.This key is used in your Leanplum integration.
- **Production Key** - This key is used to tell Leanplum to send the data to the production/live pipeline. It is specific to your app and Leanplum dashboard. See our available production methods.

Please see [Leanplum's documentation](https://docs.leanplum.com/docs/how-to-integrate-external-attribution-services) on how to find these values.

## 2. Connect Leanplum in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for Leanplum.

Enter the App ID and Production Key from the previous step, then hit **Enable**.



## 3. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Airship. To verify data is being sent from Branch to Airship, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_leanplum |

::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto Leanplum. If data has not appeared in Leanplum after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::
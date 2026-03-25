---
title: "Airship Configuration"
slug: airship-configuration
---

![1328](/img/d62617b-Airship_branch.png "Airship+ branch.png")

## Overview

Airship creates deeper connections with customers by delivering incredibly relevant, orchestrated messages on any channel.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your relevant Ids will result in Branch automatically forwarding referred events to Airship, in the exact format Airship expects.

### Branch Events Sent to Airship

The events Branch sends to third party data tools varies based on the events the partner supports as well as whether or not you've implemented the Branch SDK to measure said events.

Airship supports the following events:

- Commerce Events
- Custom Events

## Prerequisites

In order to enable Airship, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implement the Airship SDK](https://docs.airship.com/platform/)

   - Make sure to follow the steps in Airships [documentation here](https://docs.airship.com/partners/branch/#associating-branch-events-with-airship-channels).
5. Admin access to your Airship account.

## Enable Airship

## 1. Retrieve IDs from Airship

Before you can enable the integration in your Branch dashboard, you need to retrieve your credentials from your Airship account.

Branch requires these credentials to not only authenticate, but to ensure your Branch data is being sent to the correct account.

Branch requires the following credentials:

- Airship Project Domain
- Application Key
- Access Token

Please refer to [Airship's documentation](https://docs.airship.com/) if you need instructions on how to find the values required to enable the integration.

## 2. Connect Airship in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for Airship.

Enter the IDs from the previous step. Enter them into the iOS and Android fields in the Branch Dashboard, and hit **Save**.

![](/img/0526f40-6fd0f22-airship-enable.gif "6fd0f22-airship-enable.gif")

## 3. Pass Metadata to the Branch SDK

::: tip Developer Required
Developers on your mobile app are required for this step
:::

Airship requires you to pass through the correct identifiers to the Branch SDKs. In order to do so, retrieve the ID from the Airship SDK and pass this value to Branch using the following method:

- `setRequestMetadataKey()` method of the Branch SDKs:

::: danger IMPORTANT
To be able to match events with your users - you must send a client's email using **$airship\_user\_id** metadata key in via **.setRequestMetaData**
:::

## 4. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Airship. To verify data is being sent from Branch to Airship, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_airship |

::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto Airship. If data has not appeared in Airship after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::
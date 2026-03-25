---
title: "Batch Configuration"
slug: batch-configuration
---

*[Image: 1328]*

## Overview

Batch.com is an SDK and marketing automation dashboard focused on marketing and transactional push notifications. It also includes mobile analytics which are useful to monitor and improve its users? customer retention as well as engagement.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your relevant Ids will result in Branch automatically forwarding referred events to Batch, in the exact format Batch expects.

### Branch Events Sent to Batch

The events Branch sends to third party data tools varies based on the events the partner supports as well as whether or not you've implemented the Branch SDK to measure said events.

Batch supports the following events:

- Commerce Events
- Custom Events

## Prerequisites

In order to enable Batch, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implement the Batch SDK](https://doc.batch.com/download/)
5. Admin access to your Batch account.

## Enable Batch

## 1. Retrieve IDs from Batch

Before you can enable the integration in your Branch dashboard, you need to retrieve your credentials from your Batch account.

Branch requires these credentials to not only authenticate, but to ensure your Branch data is being sent to the correct account.

Branch requires the following credentials:

- REST API Key
- iOS API Key
- Android API Key

Please refer to [Batch's documentation](https://doc.batch.com/dashboard/settings/app-settings#api-keys) on how to retrieve these keys.

## 2. Connect Batch in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for Batch.

Enter the API Keys from the previous step and hit **Save**.



## 3. Pass Metadata to the Branch SDK

::: tip Developer Required
Developers on your mobile app are required for this step
:::

Batch requires you to pass through the correct identifiers to the Branch SDKs. In order to do so, retrieve the ID from the Batch SDK and pass this value to Branch using the following method:

- `setRequestMetadataKey()` method of the Branch SDKs: [iOS](ios-advanced-features.md#section-set-initialization-metadata) | [Android](android-advanced-features.md#section-set-initialization-metadata)

::: danger IMPORTANT
To be able to match events with your users - you must send a Batch User ID using **batch\_user\_id** metadata key in via .setRequestMetaData

You can find more about Custom user ID here: <https://doc.batch.com/ios/custom-data/customid#setting-up-a-custom-user-id>
:::

## 4. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Batch. To verify data is being sent from Branch to Batch, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_batch |

::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto Batch. If data has not appeared in Batch after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::
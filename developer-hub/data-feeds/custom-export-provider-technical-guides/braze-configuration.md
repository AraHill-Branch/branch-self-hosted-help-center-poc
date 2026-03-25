---
title: "Braze Configuration"
slug: braze-configuration
---

*[Image: 1328]*.png "Braze + branch.png")

## Overview

Braze unites data, teams, and technology to create brilliant brand messaging experiences for customers everywhere.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your relevant Ids will result in Branch automatically forwarding referred events to Braze, in the exact format Braze expects.

### Branch Events Sent to Braze

The events Branch sends to third party data tools varies based on the events the partner supports as well as whether or not you've implemented the Branch SDK to measure said events.

Braze supports the following events:

- Installs

*Metadata sent to Braze*  
The metadata Branch sends to third party data tools varies based on the data the partner supports as well as whether or not you've implemented the Branch SDK to measure said data.

| Branch Analytics Tag | Braze Data Placeholder Tag |
| --- | --- |
| Campaign | `campaign` |
| Channel | `source` |
| Adgroup | `adgroup` |
| Ad | `ad` |

## Prerequisites

In order to enable Braze, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implement the Braze SDK](https://www.braze.com/docs/developer_guide/getting_started/sdk_overview)

   - Make sure to follow the steps in Braze's [documentation here](https://www.braze.com/documentation/Partner_Integrations/#branch).
5. Admin access to your Braze account.

## Enable Braze

## 1. Retrieve IDs from Braze

Before you can enable the integration in your Branch dashboard, you need to retrieve your credentials from your Braze account.

Branch requires these credentials to not only authenticate, but to ensure your Branch data is being sent to the correct account.

Branch requires the following credentials:

- API Key
- Braze REST Endpoints

To find your Braze API Key:

1. On the Braze dashboard, navigate to the **App Settings** section, and click **3rd Party Integrations**.
2. From there, grab your API key (this will be the same for all attribution partners listed on the page).

To find the correct Braze REST Endpoint, please refer to Braze's [documentation](https://www.braze.com/docs/api/basics?redirected=true#endpoints).

## 2. Connect Braze in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for Braze.

Enter the API Key and Rest Endpoint from the previous step and hit **Save**.



## 3. Pass Metadata to the Branch SDK

::: tip Developer Required
Developers on your mobile app are required for this step
:::

Braze requires you to pass through the correct identifiers to the Branch SDKs. In order to do so, retrieve the ID from the Braze SDK and pass this value to Branch using the following method:

- `setRequestMetadataKey()` method of the Branch SDKs:

**NOTE** You must set the correct key before initializing the Branch session. You must also initialize the Braze SDK before setting the request metadata in the Branch SDK.

::: info February 2023 Updates
Prior to February 2023, our Branch attribution integration used the IDFV as the primary identifier to match iOS attribution data. It is not necessary for Braze customers using Objective-C to fetch the Braze device\_id and sent to Branch upon install as there will be no disruption of service.

For those using the Swift SDK v5.7.0+, if you wish to continue using IDFV as the mutual identifier, you must ensure that the useUUIDAsDeviceId field is set to false so there is no disruption of the integration.

If set to true, you must implement the iOS device ID mapping for Swift in order to pass the Braze device\_id to Branch upon app install in order for Braze to appropriately match iOS attributions.

**You must also disable and re-enable the Braze Data Integration connection on the Branch Dashboard**
:::

::: code-group

```java [Java]
Branch.getInstance().setRequestMetadata("$braze_install_id", Braze.getInstance(context).deviceId);
```

```kotlin [Kotlin]
Branch.getInstance().setRequestMetadata("$braze_install_id", Braze.getInstance(context).deviceId)
```

```swift [Swift]
Branch.getInstance.setRequestMetadata("$braze_install_id", braze.deviceId)
```

```objectivec [Objective-C]
  [[Branch getInstance] setRequestMetadataKey:@"$braze_install_id" value: braze.deviceId];
```

:::

## 4. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Braze. To verify data is being sent from Branch to Braze, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_braze |

::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto Braze. If data has not appeared in Braze after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::
---
title: "MoEngage Configuration"
slug: moengage-configuration
---

# Overview

MoEngage is an insights-led Customer Engagement platform for consumer brands, that empowers marketers and product owners with AI-driven insights to create omnichannel experiences that consumers love.

The integration enables MoEngage to receive events captured through the Branch SDK, providing up-to-date insights into user actions and preferences.

# How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and user actions. Enabling this integration and supplying your MoEngage key will lead to Branch automatically sending referred events to MoEngage, enabling marketers to transform user actions into tailored content.

## Branch Events sent to MoEngage

Branch will send **referred** installs and opens, as well as [any](track-branch-events.md#available-events) Branch Custom, Commerce, User Lifecycle, and Content Events you track.

**Important**: Non-referred events, clicks, web session starts, and pageviews will be excluded.

Branch also sends all the analytics tags that are attached to the link that drove the referred event. This lets you to analyze which campaigns, channels, etc. are helping you acquire and engage users.

# Prerequisites

To enable MoEngage, you first need:

1. Admin access to your [Branch account](https://dashboard.branch.io/).
2. Admin access to your MoEngage account.
3. The Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
4. To implement the latest Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)

## Enable MoEngage

### 1. Retrieve MoEngage credentials

In order to enable the MoEngage integration, you need the following:

- Preferred Data Center
- Data API ID
- Data API Key
- App ID

Branch requires these credentials to not only authenticate but to ensure your Branch data is being sent to the correct account. You can gather these from the MoEngage App via **Settings** > **APIs** > **General Settings** tab.

Additional details can be found in the [MoEngage documentation](https://developers.moengage.com/hc/en-us/articles/4404674776724-Overview).

![](/img/c5bae44-MoEngage_Keys.png)

### 2. Connect MoEngage in Branch

1. Log in to [Branch](https://dashboard.branch.io).
2. Navigate to **Configure** > [**Data Feeds**](https://dashboard.branch.io/data-feeds/integrations).
3. Search for and select MoEngage.
4. Configure your MoEngage integration:

   1. Select a **Data Center**.
   2. Add your **Data API ID**, **Data API Key**, and **App ID**.
5. Select **Enable**.

![](/img/319c9c5-MoEngage_in_Branch.png)

### 3. Pass metadata to Branch SDK

::: tip Developer Required
Developers of your mobile app are required for this step. For SDK documentation, visit our [Branch SDK Overview](native-sdks-overview.md) page.
:::

To utilize MoEngage effectively, you must provide the appropriate identifiers to the Branch SDKs. To achieve this, send the Customer ID value that you established while using the MoEngage SDK for User Attribution Tracking ([iOS](https://developers.moengage.com/hc/en-us/articles/4403905883796-Tracking-user-attributes) | [Android](https://developers.moengage.com/hc/en-us/articles/4402050979860-Track-User-Attributes)) to the Branch SDK through the following approach:

For each app session, the distinct MoEngage Customer ID must be transmitted to the Branch SDK (**prior** to the initialization of the Branch SDK), so that Branch can accurately relay events to MoEngage.

::: code-group

```swift [Swift]
// Call before Branch SDK initialization
MoEngageSDKAnalytics.sharedInstance.setUniqueID(UNIQUE_ID)
Branch.getInstance().setRequestMetadataKey("$moengage_customer_id", value: UNIQUE_ID)
```

```objectivec [Objective-C]
// Call before Branch SDK initialization
[[MoEngageSDKAnalytics sharedInstance] setUniqueID:UNIQUE_ID];
[[Branch getInstance] setRequestMetadataKey:@"$moengage_customer_id" value: UNIQUE_ID;
```

```java [Java]
// Call before Branch SDK initialization
MoEAnalyticsHelper.INSTANCE.setUniqueId(context, UNIQUE_ID);
Branch.getInstance().setRequestMetadata("$moengage_customer_id", UNIQUE_ID);
```

```kotlin [Kotlin]
// Call before Branch SDK initialization
MoEAnalyticsHelper.setUniqueId(context, UNIQUE_ID)
Branch.getInstance().setRequestMetadata("$moengage_customer_id", UNIQUE_ID)
```

:::

### 4. Verify data sent

You are now ready to start launching campaigns, and your Branch-attributed conversions will be sent to MoEngage.

#### Verify data in Branch

To verify data is being sent from Branch to MoEngage, you can look at Branch’s [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| `webhook partner key` | `equals` | `di_moengage` |

::: info Note
Data may take some time to flow through Branch's attribution systems to MoEngage.

If data has not appeared in MoEngage after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::

#### Verify data in MoEngage

Additionally, you can verify that the events have reached MoEngage through the **Recent events** screen of the MoEngage Dashboard:

![](/img/b492d2d-MoEngage_Verify(1).png)
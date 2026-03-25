---
title: "Movable Ink Configuration"
slug: movable-ink-configuration
---

![](/img/895130d-Movable_Ink_Branch_Logo.png)

# Overview

Movable Ink personalizes every customer engagement through automation and artificial intelligence. The integration enables Movable Ink to receive real-time behavioral events captured through the Branch SDK, providing up-to-date insights into user actions and preferences. Marketers can dynamically adjust content, offers, or recommendations based on recent user behavior, ensuring that the messaging remains highly relevant and resonates with individual users.

# How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Movable Ink key will result in Branch automatically forwarding referred events to Movable Ink, allowing marketers to activate user behaviors into personalized content.

## Branch Events Sent to Movable Ink

Branch will send **installs, opens, commerce, content, and custom events** you track with Branch. Clicks, web session starts, and web page views will not be sent.

| App Events | Commerce Events | Content Events | Custom Events |
| --- | --- | --- | --- |
| - Install - Open | - Add to Cart - Purchase | - View Item - View Items - Search | - Custom Event |

Additional attributes can be included in the events sent to Movable Ink. Please reach out to your Movable Ink Account Manager to scope the feasibility of your desired use case.

# What does it look like?

Branch events will appear in your Movable Ink analytics dashboard. Here is an example of what it will look like once the integration is enabled:

![](/img/c08d667-Movable_Ink_Report(1).png)

# Prerequisites

In order to enable Movable Ink, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the latest Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Admin access to your Movable Ink account.

   - You must also have a license to Stories and use the Behavioural API

# Enable Movable Ink

## 1. Retrieve Credentials from Movable Ink

In order to enable the Movable Ink integration, you need the following:

- API Key
- Username
- Password

Branch requires these credentials to not only authenticate but to ensure your Branch data is being sent to the correct account.

The Movable Ink Solutions team will generate the API Key for you in the form of an endpoint URL with the **key** at the end of the URL:

`https://collector.movableink-dmz.com/behavioral/{key}`

## 2. Connect Movable Ink in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for Movable Ink.

Enter the credentials from the previous step. Enter them into the respective fields in the Branch Dashboard, and click **Enable**.

![](/img/7f9cd52-Movable_Ink_Branch_Dashboard.png)

## 3. Pass Metadata to the Branch SDK

::: tip Developer Required
Developers of your mobile app are required for this step
:::

Movable Ink requires you to pass through the correct identifiers to the Branch SDKs. In order to do so, retrieve the Movable Ink User ID and pass this value to Branch using the following method:

For a given app session, the unique Movable Ink User ID needs to be passed to the Branch SDK (**before the Branch SDK initializes**) in order for Branch to properly send events to Movable Ink.

::: code-group

```swift [Swift]
// Call before Branch SDK initialization
// User ID
Branch.getInstance().setRequestMetadataKey("$movable_ink_user_id", value: MovableInk.mainInstance().userId)
```

```objectivec [Objective-C]
// Call before Branch SDK initialization
// User ID
[[Branch getInstance] setRequestMetadataKey:@"$movable_ink_user_id" value:[MovableInk sharedInstance].userId];
```

```java [Java]
// Call before Branch SDK initialization
// User ID
MovableInk mi = MovableInkAPI.getInstance(this, "<your project token>"); 
Branch.getInstance().setRequestMetadata("$movable_ink_user_id", mi.getUserId());
```

```kotlin [Kotlin]
// Call before Branch SDK initialization
// User ID
Branch.getInstance().setRequestMetadata("$movable_ink_user_id", "{user_id}")
```

:::

## 4. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Movable Ink. To verify data is being sent from Branch to Movable Ink, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_movable\_ink |

::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto Movable Ink. If data has not appeared in Movable Ink after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::

# Troubleshooting

For a high-level overview of Movable Ink’s Stories product, see <https://support.movableink.com/hc/en-us/sections/360001239453-Power-content-with-behavioral-data>. If you experience any issues regarding the Customer Data API, please read the [documentation](https://support.movableink.com/hc/en-us/articles/13815957200663-Customer-Data-API-introduction-and-guide) or reach out to your Movable Ink Client Experience team if the problem persists.
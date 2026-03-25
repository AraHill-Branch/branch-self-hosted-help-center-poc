---
title: "Google Analytics Configuration"
slug: google-analytics-configuration
---

*[Image: 1328]*

## Overview

Send your referred Branch data to your Google Analytics dashboard, helping you understand the power of Branch as an acquisition and re-engagement pathway. If you're interested in the segment of users coming into your apps through Branch and want to measure their events against your other cohorts, this guide can help.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to opens, installs, re-installs, and down funnel events. Enabling this integration and providing your Google Analytics Tracking Id will result in Branch automatically forwarding events to Google Analytics, in the exact format Google Analytics expects. This includes automatically setting various UTM tags that can be used to determine the source of new users.

### Branch Events Sent to Google Analytics

Branch will send referred **installs** and **opens**, **commerce**, **content**, **user lifecycle**, as well as any **custom events** you track with Branch. Clicks, web session starts, and web pageviews will not be sent. Branch also sends over analytics data that is attached to the link, whether it's UTM tags or fields set on the Branch Dashboard (e.g. Campaign, Channel, Feature). This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Google Analytics [here](google-analytics.md#properties-sent-to-google-analytics).

## What does it look like?

Branch events will appear alongside your other tracked events in Google Analytics. Here is an example of the Sources screen with test information set.



To view **installs** and **opens**, as well as any custom events you track with Branch as they are occur, navigate to Real-Time > Events. The event category for all Branch events is **BranchEvent**.



## Prerequisites

In order to enable Google Analytics, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implement the Google Analytics SDK](https://developers.google.com/analytics/devguides/collection)
5. Admin access to your Google Analytics account.

## Enable Google Analytics

## 1. Retrieve IDs from Google Analytics

Log into your Google Analytics Dashboard. Make sure that you have admin access.

For **Google Analytics 4** you need to retrieve your **Measurement ID**:

- In [Admin](https://support.google.com/analytics/answer/6132368), make sure that you have the desired account and property selected.
- In the *Property* column, click **Data Streams**, then click your web data stream. Your `G-XXXX` Measurement ID appears in the upper right portion of the panel.



For **Universal Analytics (Legacy)** you need to retrieve your **Tracking ID**:

- Go to [Admin](https://support.google.com/analytics/answer/6132368).
- In the *Property* column, click **Property Settings**. Your `UA-XXXX` Tracking ID appears at the top of the Property Settings Page



## 2. Connect Google Analytics in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for Google Analytics.

Enter the IDs from the previous step. Enter them into the iOS and Android fields in the Branch Dashboard, and hit **Save**.

*[Image: 1714]*

Note: If you only have one **Measurement/Tracking ID**, then enter the same ID for both iOS and Android.

## 3. Pass Metadata to the Branch SDK

::: tip Developer Required
Developers on your mobile app are required for this step
:::

For a given app session, the unique Google Analytics identifier needs to be passed to the Branch SDK (**before the Branch SDK initializes**) in order for Branch to properly send events to Google Analytics.

### Compatible IDs

| Version | Identifier | Google Shortcode | Branch Metadata Key |
| --- | --- | --- | --- |
| Google Analytics 4 | User ID | `uid` | `$google_analytics_user_id` |
| Universal Analytics | Client ID (for device identification) | `cid` | `$google_analytics_client_id` |

Specify the Branch metadata key for your Google Analytics tracking identifier

### Pass User ID to Branch

::: code-group

```swift [Swift]
branch.setRequestMetadataKey("$google_analytics_user_id", "USER-ID-HERE")
```

```java [Java]
Branch.getInstance().setRequestMetadata("$google_analytics_user_id", "USER-ID-HERE");
```

:::

### Pass Client ID to Branch

Note: You just need to pass a random UUID on install and store it in local storage for later use for the Branch SDK.

::: code-group

```swift [Swift]
// Add before initializing Branch session.
let uuid = UUID().uuidString;
let branch = Branch.getInstance();
branch.setRequestMetadataKey("$google_analytics_client_id", uuid)
```

```java [Java]
// Need import java.util.UUID
// Call after instantiating Branch in your application's onCreate before you call Branch initSession
UUID uuid = UUID.randomUUID();
String client_id = uuid.toString();

Branch.getInstance().setRequestMetadata("$google_analytics_client_id",client_id);
```

:::

## 4. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Google Analytics. To verify data is being sent from Branch to Google Analytics, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_google\_analytics |



::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto Google Analytics. If data has not appeared in Google Analytics after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::

## Properties Sent to Google Analytics

| Property Name | Value | Sourced From | Example | Required |
| --- | --- | --- | --- | --- |
| `v` | API version | [fixed] | 1 | Yes |
| `tid` | Tracking ID | Branch Dashboard | UA-XXXXXX-Y | Yes |
| `ds` | Source (mobile SDK) | [fixed] | app | Yes |
| `an` | Application Name | [fixed] | BRANCH-APP | Yes |
| `t` | Type | [fixed] | event | Yes |
| `ec` | Event Category | [fixed] | BranchEvent | Yes |
| `cid` | Client ID | (discussed above, includes `$google_analytics_client_id`) | AEBE52E7-03EE-455A-B3C4-E57283966239 | Yes |
| `uid` | User ID | `$google_analytics_user_id` | User A | No |
| `cn` | Campaign Name | utm\_campaign or Branch campaign | "Beaches and breezes" | No |
| `cs` | Campaign Source | utm\_source or Branch channel | "Twitter" | No |
| `cm` | Campaign Medium | utm\_medium or Branch feature | "480banner" | No |
| `ck` | Campaign Keywords | utm\_term or Branch `$keywords` | ["Keyword1", "keyword3"] | No |
| `cc` | Campaign Content | utm\_content or Branch tags | "Some content" | No |
| `ea` | Event Action (Name) | event name | install | Yes |
| `uip` | Device IP Address | collected by Branch SDK | 111.111.111.111 | No |
| `z` | Cache buster | [unix time + random number] | 1461878903666 | No |

::: info Anonymous Client ID
If for some reason Branch does not receive an advertising identifier or hardware identifier, and you do not explicitly specify `$google_analytics_user_id` or `$google_analytics_client_id`, then Branch will send `anonymous` as the Client ID (`cid`). This is a required field by Google Analytics.
:::

## Troubleshooting

### Very short or nonexistent session lengths

Google Analytics will automatically start a session when Branch sends over installs and opens. Because of this, you should remove any code that creates a new session when your application starts up. For example, on iOS, you may be firing an event with the following:

```
[builder set:@"start" forKey:kGAISessionControl];
```

You should remove this so that your app does not start a new session. Otherwise, you may see zero second sessions and your average session length drop.

### Data not appearing in Google Analytics

1. Check your Measurement/Tracking ID in the Branch Dashboard matches the Measurement/Tracking ID in Google Analytics
2. Ensure you are looking at the right part of the Google Analytics dashboard. The data should appear in `Acquisition > Sources > All`
3. Check that your Google Analytics Views don't have any filters on them. For example, if your View filters out users in the United Kingdom, and your Branch opens are from users in the United Kingdom, you won't see this Branch data in your View.
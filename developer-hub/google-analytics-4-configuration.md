---
title: "Google Analytics 4 Configuration"
slug: google-analytics-4-configuration
---

*[Image: 1328]*.png "Google Analytics + branch.png")

# Overview

Send your referred Branch data to your Google Analytics Dashboard, helping you understand the power of Branch as an acquisition and re-engagement pathway. If you're interested in the segment of users coming into your apps through Branch and want to measure their events against your other cohorts, this guide can help.

# How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to opens, installs, re-installs, and down funnel events. Enabling this integration and providing your Google Analytics Tracking Id will result in Branch automatically forwarding events to Google Analytics, in the exact format Google Analytics expects. This includes automatically setting various UTM tags that can be used to determine the source of new users.

### Branch Events Sent to Google Analytics

Branch will send referred **installs** and **opens**, **commerce**, **content**, **user lifecycle**, as well as any **custom events** you track with Branch. Clicks, web session starts, and web pageviews will not be sent. Branch also sends over analytics data that is attached to the link, whether it's UTM tags or fields set on the Branch Dashboard (e.g. Campaign, Channel, Feature). This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Google Analytics [here](google-analytics-4.md#properties-sent-to-google-analytics).

| App Events | Commerce Events | User Lifecycle Events | Content Events | Custom Events |
| --- | --- | --- | --- | --- |
| - Install - Open | - Add to Cart - Add to Wishlist - View Cart - Initiate Purchase - Add Payment Info - View Ad - Click Ad - Purchase - Reserve - Spend Credits | - Complete Registration - Login - Complete Tutorial - Achieve Level - Unlock Achievement - Invite - Start Trial - Subscribe - Opt In - Opt Out | - Search - View Item - View Items - Rate - Share - Initiate Stream - Complete Stream | - Custom |

# What does it look like?

Branch events will appear alongside your other tracked events in Google Analytics. Here is an example of the Events screen with sample data.



# Prerequisites

In order to enable Google Analytics, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implement the Google Analytics SDK](https://developers.google.com/analytics/devguides/collection)
5. Admin access to your Firebase and Google Analytics accounts.

# Enable Google Analytics 4

## 1. Retrieve IDs from Firebase & Google Analytics

### Retrieve Firebase App ID

- In the GA4 Admin UI, open **Data Streams**, there you should find your App Stream Details. Use this to find your **Firebase App IDs**.

::: tip iOS & Android App IDs
Typically, you will have separate Firebase App IDs for the different platforms. Be sure to retrieve **both** of your iOS and Android Firebase App IDs.
:::



### Retrieve API Secret

If you do not have an API Secret already created, navigate in the Google Analytics Dashboard to:

- In [Admin](https://support.google.com/analytics/answer/6132368), make sure that you have the desired account and property selected.
- In the *Property* column, click **Data Streams**, then click your stream. Select **Measurement Protocol API secrets**. From here a new page will prompt you to create a new API secret. Click the **Create** button.

  
- After you create an API secret, make sure to copy the **Secret Value**.

::: tip API Secret
Note - You will need an API Secret for iOS and **another** API Secret for Android.
:::



## 2. Connect Google Analytics in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find or search for Google Analytics 4.

Enter the IDs from the previous step. Enter them into the corresponding fields and click **Save**.



## 3. Pass Metadata to the Branch SDK

::: tip Developer Required
Developers on your mobile app are required for this step
:::

For a given app session, these unique Google Analytics identifiers needs to be passed to the Branch SDK (**before the Branch SDK initializes**) in order for Branch to properly send events to Google Analytics.

### Compatible IDs

| Origin | Identifier | Branch Metadata Key | Required |
| --- | --- | --- | --- |
| Firebase | App Instance ID | `$firebase_app_instance_id` | **Yes** |
| Firebase | User ID | `$firebase_user_id` | No |

Specify the Branch metadata key for your Google Analytics tracking identifier

### Pass Firebase IDs to Branch

::: code-group

```swift [iOS - Swift]
// Call before Branch SDK initialization
// App Instance ID - ID dedicated to the install; will change when app is uninstalled and reinstalled.
Branch.getInstance().setRequestMetadataKey("$firebase_app_instance_id", Analytics.appInstanceID())
// User ID
Branch.getInstance().setRequestMetadataKey("$firebase_user_id", "{user_id}")
```

```objectivec [iOS - Obj-C]
// Call before Branch SDK initialization
// App Instance ID
[[Branch getInstance] setRequestMetadataKey:@"$firebase_app_instance_id" value: [Analytics appinstanceID]];
// User ID
[[Branch getInstance] setRequestMetadataKey:@"$firebase_user_id" value:@"{user_id}"];
```

```java [Android - Java]
// Call before Branch SDK initialization
// App Instance ID
Branch.getInstance().setRequestMetadata("\$firebase_app_instance_id", Analytics.getAppInstanceId());
// User ID
Branch.getInstance().setRequestMetadata("\$firebase_user_id", "{user_id}");
```

```kotlin [Android - Kotlin]
// Call before Branch SDK initialization
// App Instance ID
Branch.getInstance().setRequestMetadata("\$firebase_app_instance_id", Analytics.getAppInstanceId())
// User ID
Branch.getInstance().setRequestMetadata("\$firebase_user_id", "{user_id}")
```

```csharp [Xamarin - C#]
// Call AFTER Branch SDK initialization
setRequestMetadataKey("$firebase_app_instance_id", Analytics.appInstanceID())
```

```dart [Flutter - Dart]
// App Instance ID
FlutterBranchSDK.setRequestMetadata(key: "\$firebase_app_instance_id", value: "<Firebase App Instance ID Here>");

// User ID
FlutterBranchSDK.setRequestMetadata(key: "\$firebase_user_id", value: "<Firebase User ID Here>");
```

:::

## 4. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Google Analytics. To verify data is being sent from Branch to Google Analytics, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | `di_google_analytics_v4_firebase` |



::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto Google Analytics. If data has not appeared in Google Analytics after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::

# Properties Sent to Google Analytics

| Google Property Name | Branch Property Name | Example Commerce Event |
| --- | --- | --- |
| `app_instance_id` | `custom_data.$firebase_app_instance_id` | `1d4f3658fa5304dd42e9531187a4bf0e` |
| `name` | `name` | `PURCHASE` |
| `description` | `event_data_description` | `Customer made a purchase` |
| `user_id` | `custom_data.$firebase_user_id` | `user1234` |
| `timestamp_micros` | `timestamp` \* 1000 | `1679432023497000` |
| `utm_campaign` | `last_attributed_touch_data_tilde_campaign` | `Test Campaign` |
| `utm_source` | `last_attributed_touch_data_tilde_channel` | `Test Source` |
| `utm_medium` | `last_attributed_touch_data_tilde_feature` | `Test Medium` |
| `utm_keyword` | `last_attributed_touch_data_tilde_keyword` | `Test Keyword` |
| `utm_content` | `last_attributed_touch_data_tilde_tags` | `Test Content` |
| `currency` | `event_data_currency` | `USD` |
| `revenue` | `event_data_revenue` | `1.5` |
| `revenue_in_usd` | `event_data_revenue_in_usd` | `1.5` |
| `exchange_rate` | `event_data_exchange_rate` | `1` |
| `shipping` | `event_data_shipping` | `0` |
| `tax` | `event_data_tax` | `9.75` |
| `coupon` | `event_data_coupon` | `Coupon Code` |
| `affiliation` | `event_data_affiliation` | `Test Affiliation` |
| `search_query` | `event_data_search_query` | `Test Search Query` |
| `revenue_in_local_currency` | `event_data_revenue_in_local_currency` | `124.083532` |
| `local_currency` | `event_data_local_currency` | `INR` |
| `local_currency_exchange_rate` | `event_data_local_currency_exchange_rate` | `82.7222355` |

# Troubleshooting

### Data not appearing in Google Analytics

1. Check your Measurement/Tracking/Firebase IDs in the Branch Dashboard matches the Measurement/Tracking/Firebase IDs in Google Analytics
2. Ensure you are looking at the right part of the Google Analytics Dashboard with the right app selected.
3. Check that your Google Analytics Reports don't have any comparisons on them. For example, if your report compares users in the United Kingdom, and your Branch opens are from users in the United Kingdom, you won't see this Branch data in your report.
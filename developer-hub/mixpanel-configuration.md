---
title: "Mixpanel Configuration"
slug: mixpanel-configuration
---

![1328](/img/8997fdb-Mixpanel__branch.png "Mixpanel + branch.png")

## Overview

With a push of a button you can send your Branch data to your Mixpanel dashboard, helping you understand the power of Branch as an acquisition pathway.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Mixpanel Token will result in Branch automatically forwarding referred events to Mixpanel, in the exact format Mixpanel expects.

### Branch Events Sent to Mixpanel

Branch will send *referred* **installs** and **opens**, **commerce**, **content**, **user lifecycle,** as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the data that is attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Mixpanel [here](mixpanel.md#what-branch-sends-to-mixpanel).

## What does it look like?

Branch events will appear alongside your other tracked events in Mixpanel. These events will automatically have `[Branch]` prepended.

![](/img/72745d3-5cfeff3-branch-mixpanel.png "5cfeff3-branch-mixpanel.png")

Additionally, individual events, such as those seen in Live View or visible when looking at People, will have Branch Link data included. Here's an example:

![](/img/db84f65-9a0b868-mixpanel-live-view.png "9a0b868-mixpanel-live-view.png")

Branch events are similar to Mixpanel events in that they can be used in your existing funnels and tracked on the various pages and dashboards. However, unlike normal events, Branch events contain invaluable information about how users ended up in your app in the first place.

## Prerequisites

In order to enable Mixpanel, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implement the MIXPANEL SDK](https://developer.mixpanel.com/docs/implement-mixpanel)
5. Admin access to your Mixpanel Analytics account**.**

## Enable Mixpanel

## 1. Retrieve IDs from Mixpanel

For the basic, codeless integration: find your Mixpanel Token and enter it into the Branch Dashboard.

1. Navigate to <https://mixpanel.com> and log into the Dashboard.
2. Click on **Account** in the navigation bar at the top of the page.
3. Choose **Projects** in the modal that appears, then copy your app’s Token:

![](/img/ea2c577-91d9bde-mixpanel-token.png "91d9bde-mixpanel-token.png")

## 2. Connect Mixpanel in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for Mixpanel.

Enter the Android and iOS tokens from the previous step, then hit **Enable**.

![2332](/img/7e14904-mixpanel_enable.png "mixpanel enable.png")

Note: If you only have one **Measurement/Tracking ID**, then enter the same ID for both iOS and Android.

## 3. Pass Metadata to the Branch SDK

::: tip Developer Required
Developers on your mobile app are required for this step
:::

Please ensure you're using the Branch iOS SDK 0.12.2 or greater, and Android SDK v1.12.1 or greater.

In addition to the basic integration, you should add a tiny amount of code to your app. This will allow the Branch SDK to pass the user's Mixpanel Distinct ID to our servers. Branch will then pass that Distinct ID to Mixpanel when logging any event.

**iOS:**

Please add the following before initializing the Branch session:

::: code-group

```objectivec [Objective-C]
[[Branch getInstance] setRequestMetadataKey:@"$mixpanel_distinct_id" value:[Mixpanel sharedInstance].distinctId];
```

```swift [Swift]
Branch.getInstance().setRequestMetadataKey("$mixpanel_distinct_id", value: Mixpanel.mainInstance().distinctId)
```

:::

**Android:**

Please call the following line right after you initialize Branch in your Application’s #onCreate or Activity’s #onCreate:

```
MixpanelAPI mp = MixpanelAPI.getInstance(this, "<your project token>");
Branch.getInstance().setRequestMetadata("$mixpanel_distinct_id", mp.getDistinctId());
```

For more information, see [Why We Recommend Passing Mixpanel Distinct ID](mixpanel.md#section-what-branch-sends-to-mixpanel).

::: warning Changes in Mixpanel Distinct ID
If you at any point change the Mixpanel Distinct ID for a user as she’s using your app, you should invoke the same one line of code as above. This way, future calls from Branch to Mixpanel use the updated distinct id.

Example for iOS:

```
[[Branch getInstance] setRequestMetadataKey:@"$mixpanel_distinct_id" value:@"User A"];
```
:::

## 4. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to Mixpanel. To verify data is being sent from Branch to Mixpanel, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_mixpanel |

::: info Wait Period
Please be patient as data may take some time to flow through Branch's attribution systems and onto Mixpanel. If data has not appeared in Mixpanel after 30 minutes of completing a test conversion, review the above steps to see if you may have missed something.
:::

## Troubleshooting

For a high level overview of identities in Mixpanel, see [Identity Management in Mixpanel](https://mixpanel.com/help/questions/articles/how-do-i-use-alias-and-identify). If you experience any issues regarding tracking identities or have general questions about the `.alias()` and `.identify()` methods, please take a look at [Mixpanel's documentation](https://mixpanel.com/help/questions/articles/how-should-i-handle-my-user-identity-with-the-mixpanel-javascript-library) first. Additionally, reach out to [[support@mixpanel.com](mailto:support@mixpanel.com)](mailto:%5Bsupport@mixpanel.com%5D(mailto:support@mixpanel.com)) if the problem persists.

## Advanced

### What Branch Sends to Mixpanel

| Property Name | Value | Sourced from | Example | Req |
| --- | --- | --- | --- | --- |
| `event` | Branch event | event name | [Branch] install | Y |
| `properties.distinct_id` | Unique ID for device/user | [see section below](mixpanel.md#why-we-recommend-passing-mixpanel-distinct-id) | AEBE52E7-03EE-455A-B3C4-E57283966239 | N |
| `properties.token` | Mixpanel Token | Branch Dashboard | eed14a8aaa8c8ef777b8e9cb30826399 | Y |
| `properties.time` | Event creation date | event | 1461878903 | N |
| `properties.ANY-KEY` (many) | The value associated with the key | event metadata or referring link data | ~channel: facebook | N |

### Why We Recommend Passing Mixpanel Distinct ID

Branch will automatically specify the Distinct ID requested by Mixpanel, if any of the IDentifiers that Mixpanel uses are available. On iOS, Branch will send the IDFA if present, or the identifierForVendor (IDFV) if present, otherwise it will omit Distinct ID. On Android Branch will send the Google Advertising ID if present, or the Android ID (hardware ID) if present, otherwise it will omit Distinct ID.

On iOS, the Mixpanel SDK by default will use the IDFA if present, otherwise it will use the identifierForVendor (IDFV) (also known as the vendor ID or identifierForVendor). In rare cases where the identifierForVendor (IDFV) is not available, it will generate a random UUID. In order for IDFA to be available, please be sure you have included AdSupport.framework.

On Android, the Mixpanel SDK by default does not use the Google Advertising ID or the Android ID (hardware ID). Instead, it generates a random UUID. This means that on Android, if you do not pass Branch the Mixpanel Distinct ID, we cannot properly associate Branch-generated events with users as identified by Mixpanel.

## Support

### Nuances with Multiple Devices and Mixpanel Identities/Aliases

If you at any point change the Mixpanel distinct id for a user as she’s using your app, you should invoke the same one line of code as above. This way, future calls from Branch to Mixpanel use the updated distinct id.

Additionally, there is one scenario in which the event will be logged to Mixpanel but not associated with the correct user. This is due to limitations with identities on Mixpanel’s end.

**Here is an example scenario:**

The User has an iPhone and an iPad

iPhone has IDFA 1234XXXX-XXXX-XXXX-XXXXXXXXXXXX -- 1234 for short

iPad has IDFA 5678XXXX-XXXX-XXXX-XXXXXXXXXXXX -- 5678 for short

The User opens the app organically (not from a Branch Link), and is automatically assigned the distinctId 1234 (this is the IDFA). Then the user finishes signing up, and alias() is called with value "User A", linking 1234 <> "User A". All is well so far.

The User then gets placed into a drip email campaign, targeted for re-engagement. She's checking her email on her iPad and clicks on a Branch Link to the app. The app is opened. We send Mixpanel a referred event with an automatically assigned distinctId 5678 (this is the IDFA). Then the user logs in, and identify() is called with value "User A". Identify() is called because we want the user to match across both devices with the same identity = User A. If we called alias() in this second case, then there would be two distinctIds (and in Mixpanel’s logic, two different people) - one with distinctId 1234 and another with distinctId 5678. In order to merge them, we have to identify() the user on the second device. An unfortunate side effect of this logic is that actions before identify() are not associated with the same user, as there are briefly two distinctIds..

The referred event associated with 5678 is not associated with 1234 / "User A".

In order for any additional events on this device to be associated with "User A", the app should invoke the one line of code as recommended in the section [Pass Mixpanel Distinct ID](mixpanel.md#why-we-recommend-passing-mixpanel-distinct-id). Example:

```
[[Branch getInstance] setRequestMetadataKey:@"$mixpanel_distinct_id" value:@"User A"];
```

If there are ever workarounds for this, we will update this guide and notify our partners accordingly. [Here is more information](https://mixpanel.com/help/questions/articles/how-do-i-use-alias-and-identify) on how Mixpanel manages identities.

### User Profile Properties

Branch does not support sending any User Profile Properties to Mixpanel. In order to set user properties, please follow Mixpanel's guide on [setting a user profile property](https://help.mixpanel.com/hc/en-us/articles/115004501966-User-Profiles).
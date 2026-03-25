---
title: "CleverTap (Export) Configuration"
slug: clevertap-data-configuration
---

![1328](/img/272abd6-Clevertap_branch.png "Clevertap+ branch.png")

## Overview

Accurately attribute impressions, ad clicks, app installs, and in-app events to evaluate campaign performance for each of your partners.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your relevant IDs will result in Branch automatically forwarding events to CleverTap, in the exact format Clevertap expects.

### Branch Events Sent to CleverTap

The events Branch sends to third party data tools varies based on the events the partner supports as well as whether or not you've implemented the Branch SDK to measure said events.

CleverTap supports the following events:

- Installs
- Lifecycle Events
- Commerce Events
- Content Events
- Custom Events

Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the data that is attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users.

## Viewing Branch Data in CleverTap

In order to view Branch data in CleverTap, you can find people by Behavior or view events where your provider contains "Branch". For more information on Clevertap's reporting, please refer to their [Behavioral Analytics](https://docs.clevertap.com/docs/simple-reports) documentation.

![](/img/a742a9c-69a4ba0-clevertap-people.png "69a4ba0-clevertap-people.png")

![](/img/70c8459-fcef568-clevertap-events.png "fcef568-clevertap-events.png")

## Prerequisites

In order to enable CleverTap, you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. [Implement the Clevertap SDK](https://developer.clevertap.com/docs/clevertap-sdks)
5. Admin access to your CleverTap account.

## Enable CleverTap

## 1. Retrieve your CleverTap Information

Before you can enable the integration in your Branch dashboard, you need to retrieve your credentials from your CleverTap account.

Branch requires these credentials to not only authenticate, but to ensure your Branch data is being sent to the correct account.

Branch requires the following credentials:

- Account ID
- Account Token
- Account Passcode

To find your CleverTap Account Credentials:

1. Log in to your [CleverTap account](https://dashboard.clevertap.com/) and navigate to Settings by clicking the cog at the top of the screen, then `Settings Dashboard`.

   ![](/img/c2f4f8f-27a6372-clevertap-settings.png "27a6372-clevertap-settings.png")
2. Ensure you're looking at the correct app for your integration, then click the eye icon to show your account credentials.

   ![](/img/74f762f-1c210a0-clevertap-account-credentials.png "1c210a0-clevertap-account-credentials.png")
3. Copy these account credentials into the Branch dashboard as instructed below.

## 2. Connect CleverTap in Branch

In the Branch Dashboard in Data Feeds → [**Data Integrations** tab](https://dashboard.branch.io/data-feeds/integrations), find and search for CleverTap. Then enter your CleverTap information

![](/img/76b4fb7-5e4feae-clevertap-enable.gif "5e4feae-clevertap-enable.gif")

## 3. Pass CleverTap IDs to Branch

Clevertap requires you to pass through the correct identifiers to the Branch SDKs. In order to do so, retrieve the ID from the Clevertap SDK and pass this value to Branch using the following method:

- `setRequestMetadataKey()` method of the Branch SDKs:

::: code-group

```objectivec [Objective-C]
///Inside `didFinishLaunchingWithOptions`

Branch *branch = [Branch getInstance];
[CleverTap autoIntegrate];
[[Branch getInstance] setRequestMetadataKey:@"$clevertap_attribution_id"
value:[[CleverTap sharedInstance] profileGetCleverTapAttributionIdentifier]];
```

```swift [Swift]
///Before you initialize in your Application `#onCreate` or Deep Link Activity’s `#onCreate`

Branch branch = Branch.getInstance();
branch.setRequestMetadata("$clevertap_attribution_id",
cleverTapInstance.getCleverTapAttributionIdentifier());
```

```java [Java]
cleverTapInstance.getCleverTapID(new OnInitCleverTapIDListener() {
    @Override
    public void onInitCleverTapID(final String cleverTapID) {
       // Call before Branch SDK initialization
        Branch.getInstance().setRequestMetadata("$clevertap_attribution_id",
            cleverTapID);

    }
});
```

:::

## 4. Verify Data Sent

Once the above steps are complete, you are now ready to start launching campaigns. Branch-attributed conversions will be sent to CleverTap. To verify data is being sent from Branch to CleverTap, you can look at the Branch Dashboard's [Liveview Webhook Records](https://dashboard.branch.io/liveview/webhooks) and apply the following filter:

| Filter | Operator | Value |
| --- | --- | --- |
| webhook partner key | equals | di\_clevertap |

## Troubleshooting

## Testing your CleverTap integration

The simplest way to test your integration is working end to end is to open your app **from a Branch Link** then verify the data appears in CleverTap. After doing this, you will know how you to test more advanced scenarios.

1. Create a Branch Short Link at <https://dashboard.branch.io/quick-links>.
2. Click that Branch Link to open your app.
3. In your Branch dashboard, verify you see the open event show as a "referred session" with a "session referring link URL" in your Branch dashboard under "Liveview > Events"
---
title: "Enable TikTok For Business"
slug: enable-tiktok-for-business
---

## Overview

By connecting Branch and TikTok For Business, the following is enabled:

- App conversion data collected by the Branch SDK is sent to TikTok For Business for attribution through the self-attributing network (SAN) integration.
- Read-only access to import click and impression data from TikTok For Business into your Branch account.
- Deep link into in-app experiences (campaign specific)

## Prerequisites

In order to enable TikTok For Business, you need to have completed the following:

1. Created a Branch Dashboard.
2. Enabled Ads for your Branch account.

   - Contact your Branch account manager or visit <https://branch.io/pricing>
3. Implement the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Admin access to your TikTok For Business account.
5. Your App needs to be connected to your TikTok For Business account.

## Enable TikTok For Business

### 1. Connect TikTok For Business in Branch

In the Branch Dashboard under **Ads** → [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for **TikTok For Business SAN**. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_tiktok?tab=settings) to go there directly.

Click the **Log In With TikTok** button and follow the prompts to authenticate your TikTok For Business account

![](../../../assets/media/images/c1ea121c-0dc2-4c73-b27f-95a754574515 "Enable TikTok.PNG")

Be sure to read and agree to the permissions requested by Branch in order to properly authenticate.

![1572](/img/752f82f-TikTok_Permissions.png "TikTok Permissions.png")

### 2. Input your TikTok App ID

*This is a required field.* In your TikTok For Business **Events Manager**, generate your **TikTok App ID** (TTAID) for your app (iOS and/or Android). You can learn more about the TikTok App ID [here](https://ads.tiktok.com/help/article?aid=10001060).

![](/img/1a8a06d-Screenshot_2023-10-06_at_2.37.25_PM.png "TikTok App ID.jpg")

Once generated, copy/paste the respective TikTok App ID(s) into the TikTok For Business Ad Partner Settings. More than one TikTok App IDs can be added using a comma as a separator (no spaces).

Click the blue **Save** button to complete the authentication.

![](../../../assets/media/images/81900da6-7e61-4dd4-b22e-3b76127902e5 "TikTok Authenticated.PNG")

### 3. Configure Events

After authenticating your TikTok For Business account to Branch, navigate to the [**Events Config**](https://dashboard.branch.io/ads/partner-management/a_tiktok?tab=event_config) tab to configure your events.

It is important to add your event mappings here for Branch to properly send event metadata to TikTok For Business for attribution. You should see the events you are tracking with the Branch SDK here when you **Add Event Mappings**. Find the event you want to link and update the field with one of the predefined TikTok For Business (SAN) event names.  
 For more details on the TikTok For Business and Branch event and metadata mapping, see the specifications [here](tiktok-data-reporting.md).

![](../../../assets/media/images/1fb40ba3-b7c5-43f6-872d-385099c46077 "Events Config.PNG")

::: info Additional Event Details
- If you plan to run TikTok SKAN Campaigns and are tracking Custom Events, make sure you map your Custom Event to TikTok's Standard Event.
:::

Click the blue **Save** button to set your event mappings.

### 4. Configure Attribution Windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_tiktok?tab=attribution_windows) tab to set windows by attribution type.

You have full freedom to choose your attribution windows; however, it may cause discrepancies between Branch and TikTok For Business when comparing reports.

Recommended Attribution Windows:

| Attribution Type | Window |
| --- | --- |
| click to session start | 7 days |
| click to install | 7 days |
| click to conversion event | 7 days |
| impression to session start | 1 day |
| impression to install | 1 day |
| impression to conversion event | 1 day |

### 5. Launch TikTok For Business Campaigns

In TikTok For Business Ads Manager, you can now launch your campaigns, and the integration will take care of measuring performance.

Please visit the [TikTok For Business Help Center](https://ads.tiktok.com/help/article/campaign-set-up?redirected=2) for details on campaign setup.

### [OPTIONAL] - Use Branch Ad Link

You can use a [Branch Ad Link](ad-links.md) in your TikTok For Business campaigns for deep linking.

#### Using Your TikTok For Business Link in TikTok Ads

In your TikTok Ads Account:

1. Click the Library tab and select Assets > Event > Manager App Event > Create New App to create a new app or view previously added apps.

![](/img/059a04a-Screen_Shot_2021-01-08_at_11.40.49_PM.png "Screen Shot 2021-01-08 at 11.40.49 PM.png")

2. Provide your app's Download URL Settings. (Use your app's app store / play store address)

![](/img/52caae3-tiktok-create-new.png "tiktok-create-new.png")

3. In the Tracking Settings section, select **Branch** as your Measurement Partner.
4. Place your TikTok For Business Link in the Click Tracking URL field and click **Confirm**.
5. Place your TikTok For Business impression link in the Default Impression Tracking URL field and click **Confirm**.

![](/img/13ded97-43ba6c0-f6f73bc-Screen_Shot_2020-07-07_at_6.45.07_PM.png "43ba6c0-f6f73bc-Screen_Shot_2020-07-07_at_6.45.07_PM.png")

## Deep Linking from Tiktok For Business

Please consult with your app development team to set up deep linking for your TikTok For Business campaigns. TikTok For Business supports deep links using the following:

- Direct/Deferred Deep Linking

  - Deep linking is supported through Branch Ad Links. View the [optional step above](enable-tiktok-for-business.md#optional-use-branch-ad-link) on using Branch Ad Links in TikTok For Business.
- [Android App Links](android-app-links.md)
- [iOS Universal Links](ios-universal-links.md)
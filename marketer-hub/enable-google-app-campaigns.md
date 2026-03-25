---
title: "Enable Google App Campaigns"
slug: enable-google-app-campaigns
---

## Overview

By connecting Branch and Google Ads, the following is enabled:

- App conversion data collected by the Branch SDK is sent to Google Ads for attribution.
- Read-only access to import click and impression data at the aggregate level from Google Ads into your Branch account.
- Viewing Google Ads metrics in your Branch Dashboard (your manager (MCC) and children accounts).
- Deep link into in-app experiences (campaign specific)

## Before you begin

In order to enable Google Ads, you first need to:

1. Create an account in the [Branch Dashboard](https://dashboard.branch.io/).
2. Enable Ads for your Branch account. Please contact our [Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.
3. Implement the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md)). Once you do this, you can start to [track events](track-branch-events.md).
4. Have admin access to your Google Ads account.

## Enable app campaigns

### 1. Link Branch in Google Ads

After signing into your Google Ads account, click on **Tools** in the sidebar, then click on the **Data manager** tab.

![](/img/0a5e94c-Google_Ads_Data_Manager.png)

Then, scroll down to **Popular products**, and select **Third-party app analytics**.

![](/img/e100faf-Google_Ads_Third_Party_App_Analytics.png)

Click on **Create link ID**.

![](/img/906ba28-Google_Ads_Create_Link_ID.png)

Choose **Branch** in the **App analytics provider** dropdown to link Branch to Google Ads.

![](/img/36912ec-Branch_in_Google_Ads.png "google-ads-aap.png")

You are allowed to link multiple accounts as long as the user connecting has access to all of the accounts you wish to connect. For each app you want to track with Branch, you'll need to create a different link ID.

If you manage campaigns for the same app in multiple Google Ads account, you must do one of the following three options:

- Use [cross-account conversion tracking](https://support.google.com/google-ads/answer/3030657) and set up a link ID with your third-party app analytics provider in your manager account. Once you link at the MCC level, there is one additional step to "share down" the ability for the sub-accounts to utilize these Conversion Events:

  - Navigate to **MCC** → **Settings** → **Sub-account Settings** → **Google Ads Conversion account**. For those accounts you wish to share conversions from the MCC, the “Google Ads Conversion account” column should be edited to "This Manager."

![](/img/516f0bd-Background.png)

- Or, share a single link ID with another Google Ads account.
- Or, the account you share from will be the “owner” of the link ID. Only the “owner” of the link ID can share their link ID with other accounts. Any account that has accepted the owner's invite will be able to import conversions from the corresponding third-party app analytics provider for the app associated with the shared link ID.

Once you create the link IDs, copy them, as you'll need them for the next step.

::: info Note
Branch validates the link ID generated from Google in order to avoid any human error.
:::

### 2. Connect Google Ads in Branch

In the Branch Dashboard on the[**Ad Partners page**](https://dashboard.branch.io/ads/partner-management)under the **Configure** section, find/search for Google AdWords.

Click the **Sign in with Google** button to authenticate with your Google Ads account.

![](../../../assets/media/images/179b8f1f-6862-4a14-a26b-0a4c0514b813 "sign in google.PNG")

After selecting the Adwords accounts to connect with Branch, paste the link IDs from [Step 1](enable-google-app-campaigns.md#1-link-branch-in-google-ads).

![](/img/dd1b840-link-ids.png "link-ids.png")

After inputting your link IDs, Google Ads will be connected to Branch.

![](../../../assets/media/images/ced74a24-d9b5-468c-9c08-77ae7fa5cabf "Google Ads.PNG")

::: info Note
You must add all the accounts that you want to receive SKAN data for. If you only add one, you will only receive SKAN data for that account.
:::

### 3. Configure events

After authenticating your Google Ads account to Branch, navigate to the [**Events Config**](https://dashboard.branch.io/ads/partner-management/a_google_adwords?tab=events) tab to configure your events.

It's important to add your event mappings here for Branch to properly send event metadata to Google Ads for attribution. You should see the events you are tracking with the Branch SDK here when you **Add Event Mappings**. For more details on Google Ads and Branch event & metadata mapping, see the specifications [here](google-ads-data-reporting.md).

![](../../../assets/media/images/dd7e855b-f5ce-45cb-a272-d4383d5b0c20 "Google Events.PNG")

### 4. Configure attribution windows

After configuring your events, navigate to the [**Attribution Windows**](https://dashboard.branch.io/ads/partner-management/a_google_adwords?tab=attribution_windows) tab to set windows by attribution type.

You have full freedom to choose your attribution windows; however, it may cause discrepancies between the Branch and Google Dashboards when comparing.

Google's Recommended Attribution Windows:

| Attribution type | Window |
| --- | --- |
| click to session start | 60 days |
| click to install | 30 days |
| click to conversion event | 90 days |
| impression to session start | 1 day |
| impression to install | 1 day |
| impression to conversion event | 1 day |

### 5. Import events to Google

After setting up events and the attribution windows in Branch, you will need to [import app conversion data to Google Ads](https://support.google.com/google-ads/answer/7382633).

#### Newly generated conversions

When you create new conversion events in Branch, Google Ads requires specific activation steps before it can recognize and track them.

::: warning Caution
For Google Ads to recognize your newly generated conversions, it is essential to **activate your app and execute the designated in-app actions at least once**.

Please note that it might take **up to 6 hours** for the event conversions to be queued and processed. Once added to the queue, you can import these conversions, and their status will shift from "No recent conversion" to "Recording conversion."
:::

#### First open event conversions

For any `first_open` event conversions, please **ensure that you enable the "account default" setting** for a conversion goal so that primary conversion actions within that goal can be tracked as conversions in your reporting.

For more information, please refer to Google's [documentation](https://support.google.com/google-ads/answer/4677036?hl=en&co=ADWORDS.IsAWNCustomer%3Dtrue&oco=0).

### 6. Launch Google Ads app campaigns

In Google Ads, after you've created and optimized your App Install/Engagement campaign, you can create your ad group(s), which dynamically creates formats for various formats. Here is where you can set additional campaign configurations.

You must create separate campaigns for iOS and Android:

![](/img/d211749-Ad_Group.png "Ad Group.png")

Once you finish, review the information and launch your campaign.

![](/img/ddc7ad7-Campaign_Ready.png "Campaign Ready.png")

::: info Note
If your campaigns are agency-managed, please see additional steps [here](what-is-a-self-attributing-network.md).
:::

## Deep linking from Google App campaigns

Please consult with your app development team to set up deep linking for your Google App Campaigns.

#### App install campaign deep linking

The only type of deep linking supported by UAC is Branch's SAN deferred deep linking feature. Please follow our guide [**here**](san-deferred-deep-linking.md) on how to set it up.

#### App engagement campaign deep linking

Engagement campaigns have the ability to deep link using the following:

- [iOS Universal Links](ios-universal-links.md)
- [Android App Links](android-app-links.md)
- [URI schemes](in-app-routing.md)

## Google ads conversion reporting

Branch enables Google Ads conversion tracking for users who opted out of ATT on iOS 14.5+ devices. Branch transmits the Google Ads `gbraid`, a campaign identifier for app re-engagement via deep links. The Branch SDK then retains the `gbraid` to link it with events over a 30-day period.

### Enable Google Ads conversion reporting

#### 1. Update your iOS app

Be sure to update your iOS app with the latest version of the [Branch iOS SDK](ios-version-history.md) to support `gbraid` handling to share the aggregated identifier with Google on post-install or open events when a user is opted out of ATT on the iOS 14.5+ devices.

#### 2. Track events

[Track events](track-branch-events.md) with the Branch SDK in order to attribute post-install events in Google's reporting.

To learn more about Google Ads campaign identifiers, click [here](google-ads.md#campaign-identifiers).

## FAQ

#### How do I handle multiple Google Ad accounts?

First, it is not necessary to connect all Google Ads accounts. However, you must connect the Google Ads account that owns in-app conversions for your mobile app. Often, this is the MCC account.

::: info Note
Inside an MCC, it is possible to configure which account (the MCC or the child account) is responsible for conversions. Ensure that you create link IDs with the account that is noted as the Conversion Account under the **MCC > Management** tab.

**Note:** Do not authenticate a single ad account to multiple Branch apps (ex. Live and Test apps) as that will cause issues with authentication and Dashboard reports.
:::

![](/img/b167128-mcc-conversion-account.png "mcc-conversion-account.png")

If you only have access to the child account (but that account is attached to an MCC), you can see which account is recording conversions within the child account as well, by going to **Tools > Conversions > Settings > Conversion Account** in Google Ads.
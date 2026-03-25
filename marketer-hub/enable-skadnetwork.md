---
title: "Enable SKAdNetwork"
slug: enable-skadnetwork
---

## Overview

Easily set up SKAdNetwork (SKAN) with Branch through a quick-and-easy Magic Setup or configure granular settings yourself all through the Branch SKAN Conversion Center.

## Prerequisites

In order to implement SKAdNetwork via the Branch SDK, you must have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Enabled Ads for your Branch account.

   - Contact your Branch account manager or visit <https://branch.io/pricing>
3. Implemented the latest version of the [Branch iOS SDK](ios-sdk-overview.md) into your mobile app. Your development team will need to implement Apple's StoreKit Framework and track events. See our [developer documentation](native-sdks-overview.md) for SDK implementation details.
4. Add your app to the Apple App Store.

   - Admin access to [App Store Connect](https://appstoreconnect.apple.com/).

     - **Note**: Branch currently does not support using the same iOS App Store ID across multiple Branch apps. This limitation exists because Branch's SKAN implementation requires a 1:1 mapping between each iOS App Store ID and Branch App ID. **Exception**: Test apps may use the same iOS App Store ID as production apps.
5. Ensure your network/publishers support SKAdNetwork and pass attribution data to Branch.

   - Verify your ad network(s) [here](skadnetwork.md).
   - Campaign types within that ad network are supported by SKAN.
   - Utilizing Branch [Ad Links](ad-links.md) in SKAN Campaigns.

## 1. Obtain authentication parameters

You will need to obtain several IDs and a key from your [**Apple App Store** Connect](https://appstoreconnect.apple.com/):

| ID | Definition | Example |
| --- | --- | --- |
| Issuer ID | Your issuer ID from the API Keys page in App Store Connect. | 57246542-96fe-1a63-e053-0824d011072a |
| Key ID | Your private key ID from App Store Connect. | 2X9R4HXF34 |
| Private Key | Your key file that authorizes access to your data in App Store Connect and the Apple Developer website. | P8 Key File |

In the App Store Connect in **Users and Access** → **Keys** tab, find your **Issuer ID** and **Key ID**. Click **Download API key** to obtain your **Private Key**.

::: info Generate API Key
If you have not created an API key, click the **+** button to generate a new API Key. Full details for creating API Keys for App Store Connect API can be found [here](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api).
:::

![](/img/69de4d5-App_Store_Connect.png "App Store Connect.png")

## 2. Authenticate App Store Connect

In the Branch Dashboard navigate to the **SKAN Conversion Center** page. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/skan-conversion) to go there directly.

![](/img/a1dea93-Authenticat_App_Store_Connect.png "SKAN Configuration.PNG")

Here, you'll submit your **Issuer ID**, **Key ID**, and **Private Key** that you obtained from [Step 1](enable-skadnetwork.md#1-obtain-authentication-parameters).

Click **Save & Continue**.

Once your App Store Connect account is authenticated (denoted by a green checkmark), please verify the correct app has been synced.

::: info App Store Connect Credentials
App Store Connect credentials are used as a one-time check to verify app ownership.

**DO NOT** remove API access as it will disable the ability to map conversion values.
:::

## 3. Opt-in/out for SDK support

By default, your configuration will be set to SDK Opt-In, meaning the Branch SDK will call the two necessary Apple methods for SKAN to enable Postbacks to ad partners on your behalf. You may update this by clicking the options menu on the top right of the SKAN Conversion Center page and selecting **Opt-out SKAdNetwork**.

![](/img/0ee26ae-SKAN_Opt_Out.png)

We suggest opting out if you have a third-party library or SKAN integration. You'll still be able to map your conversion value events that will also appear within the Branch Dashboard. Note: Once opted out, the Branch SDK will stop updating SKAN postback conversion values. If you opt out, your development team will need to implement the necessary Apple methods and define conversion values. See our developer documentation for implementation details.

## 4. Select set up type

From here, you will be prompted to select a set up type: **Magic Set Up** or **Custom Set Up**.

![](/img/7c07dc6-Screenshot_2023-10-06_at_2.02.55_PM.png)

| Set Up Type | Description |
| --- | --- |
| Magic Set Up | Configure SKAN with a Branch-recommended conversion set up to help you get up and running with SKAN quickly while maximizing campaign performance. Recommended for those brand new to SKAN. |
| Custom Set Up | Set granular SKAN configurations like fine/coarse-grained values, anchoring, etc. If you've already set up SKAN, your prior set up will be converted over to Custom Set Up. Recommended for those familiar with SKAN already. |

### Magic set up

#### Select target conversion event

After selecting **Magic Set Up**, you will be prompted to select a target conversion event. It is recommended you select a conversion event that is meaningful for your specific app's use case that demonstrates customer value.

![](/img/bb28b77-Screenshot_2023-10-10_at_9.37.57_AM.png)

#### Review recommendations

Once a conversion event is selected, click **Run Magic Set Up**, and Branch will generate a recommendation for each SKAN window for you.

![](/img/8e4ecbf-Screenshot_2023-10-10_at_9.46.03_AM.png)

Click **Save Configuration** to confirm your SKAN setup.

### Custom set up

After selecting **Custom Set Up**, you will be able to set an event to a fine-grained value in each of the three windows available for SKAN postbacks.

#### Templates

Optionally, you can select a template to preset SKAN for a specific vertical and Branch will help optimize for that. You may choose a template by clicking the **Try now** or **See Templates** link.

![](/img/b717df1-Select_Template.png)

| Template Type | Optimization Focus | Events |
| --- | --- | --- |
| Basic | Generic mobile apps | Install  Open |
| Commerce | Commerce-focused mobile apps | Install  Add to Cart  Purchase |
| Media | Media streaming apps | Install  Initiate Stream  Complete Stream |
| Game | Gaming apps | Install  Complete Tutorial  Achieve Level  Spend Credits |
| Subscription | Subscription-based apps | Install  Complete Registration  Start Trial  Subscribe |
| Revenue Ranges | Distinct purchase-focused apps | Install  Purchase |

At any time, you may revert your configuration to a preset template.

#### Assign events

Assign an event to a *Fine-Grained Value*. For each event set to a fine-grained value, assign a *Coarse-Grained Value*.

::: tip Fine & Coarse Conversion Values
A fine value is the fine-grained value of an event that is tied to a value from 0-63 (63 being the highest priority conversion). In SKAN 4.0, this value is sent in the first postback for Tier 2 and 3 thresholds.

A coarse value indicates a broader signal of the level of priority that that conversion falls under (where the fine value is not eligible for use): low, medium, or high. This is only available for SKAN 4.0+ and is sent in the first postback for the Tier 1 threshold and in the second and third postbacks of Tier 1-3 thresholds.

For additional details on Postbacks and Tier thresholds, please visit Apple's documentation [here](https://developer.apple.com/documentation/storekit/skadnetwork/receiving_postbacks_in_multiple_conversion_windows/).
:::

![](/img/7133fa0-Custom_Setup_Events.png)

::: info SKAN 4.0+
If you already had SKAN set up before the release of SKAN 4, you will not have coarse conversion values set for your configuration. By default, a coarse value of "low" is set when not initially defined (< SKAN 3). Making changes to the Event and Conversion Value Mapping will **require** you to select a coarse value and lock option for each event **before** you can save the configuration.
:::

#### Revenue range

Revenue range is available for all [Commerce Events](track-branch-events.md):

- Revenue must be entered as USD.
- Revenue ranges must not overlap for the same event (Ex. 1-100 and 50-150).
- Lower bound is *inclusive*, Upper bound is *exclusive*.

#### Locking events

For SKAN 4.0+, you are allowed to indicate which events are "locking" events - which means that when that event is detected, it will trigger the SKAN postback and "end" the current SKAN window.

#### Anchor highest value

For SKAN 4.0+, the conversion value mapper supports the ability to anchor to the highest value which means that Branch will guarantee that the highest value event in your mapping that a user completes will be the event sent to SKAN.

Click **Save Configuration** to confirm your settings and view your settings for each window.

![](/img/2e3ceb3-Confirm_Custom_Setup.png)

## 5. Verify integration

::: tip SKAN Data Availability & Reporting
SKAN does not attribute conversions in real-time. Postbacks sent/recieved abide by the [SKAdNetwork Event Flow](skadnetwork.md).

Additionally, you can view your full guide on all SKAdNetwork-related reporting [here](skadnetwork-dashboard-reports.md).
:::

1. Set up a test campaign with the [participating ad network](skadnetwork.md). Please note that your app will need to be in production and not in Testflight or any other testing platform.
2. Download an Apple SKAdNework Testing Profile to decrease the time in which the postback is sent from a test device from 24 hours to 5-10 minutes.

   - See Apple documentation [here](https://developer.apple.com/documentation/adattributionkit/testing-ad-attributions-with-a-downloaded-profile) for instructions.
3. Check the [SKAdNetwork Analytics page](https://dashboard.branch.io/ads/skadnetwork/activity) to verify SKAdNetwork data.

![](/img/a5c731a-SKAN_Analytics.png "SKAN Data Verification.png")

Additionally, you can verify with your Ad Network the data that they are receiving are proper postbacks for the SKAN campaigns. For advanced testing and troubleshooting, see our developer documentation.
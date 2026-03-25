---
title: "TikTok SKAdNetwork"
slug: tiktok-skadnetwork
---

## Overview

The introduction of iOS 14.5 came with the rise of SKAdNetwork (SKAN) which had industry-wide impacts on the mobile measurement and attribution ecosystem. As such, TikTok For Business will work similarly to most non-self-attribution networks when it comes to SKAdNetwork campaigns.

## How does it work?

The Branch SDK can be used to manage all calls to SKAN. Once TikTok For Business is integrated and authenticated with Branch and the SDK is tracking events, TikTok For Business will forward individual SKAN Postbacks to Branch.

## TikTok For Business SKAN Support

### Supported Campaigns

| TikTok Campaign Type | SKAN Support for Branch |
| --- | --- |
| TikTok App Install | ✅ |
| TikTok App Re-Engagement | ❌ Does not support SKAN |

### Apple Postback Data

| Parameter | Supported |
| --- | --- |
| Version | ✅ |
| Ad Network ID | ✅ |
| Campaign ID | ✅ |
| Transaction ID | ✅ |
| App ID | ✅ |
| Attribution Signature | ✅ |
| Redownload | ✅ |
| Source App ID | ✅ |
| Fidelity Type | ✅ |

### Added TikTok Data

| Parameter | Supported |
| --- | --- |
| Campaign ID | ✅ |
| Campaign Name | ✅ |
| Ad Set ID | ✅ |
| Ad Set Name | ✅ |
| Ad ID | ❌ |
| Ad Name | ❌ |
| Creative ID | ❌ |
| Creative Name | ❌ |

## Prerequisites

In order to enable TikTok For Business SKAdNetwork, you need to have completed the following:

1. [Enable TikTok For Business](enable-tiktok-for-business.md)
2. Access to Apple's developer tool.

## Enable TikTok SKAdNetwork

### 1. Authenticate SKAdNetwork in Branch

::: warning DEVELOPER MAY BE REQUIRED
Authenticating your app requires access to Apple's developer tool **App Store Connect** as Branch requires several IDs and a key to complete authentication and sync the correct app to your Branch account.



- Issuer ID
- Key ID
- Private Key - [learn how to generate a Private Key](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api)
:::

To configure SKAdNetwork functionality:

1. Navigate to the [SKAN Conversion Center](https://dashboard.branch.io/skan-conversion/) page in the Branch Dashboard.
2. On this page, please provide the following App Store Connect information:  
    a. **Issuer ID**  
    b. **Key ID**  
    c. **Private Key**

   
3. Once your fields are filled out and your Private Key file is uploaded, click the **Authenticate & Proceed To Configuration** button.

   

#### Resetting Credentials

App Store Connect credentials are used as a one time check to verify app ownership. The SKAdNetwork integration is complete and valid as long as the app integration step is complete.

After this, the credentials may be removed. To remove them, click the **Reset App Store Credentials** button.

### 2. Opt-in for Branch SDK Support

In the **SKAdNetwork Config** section of the [Branch dashboard](https://dashboard.branch.io), select the `YES` radio button to have the Branch SDK handle all calls to SKAdNetwork.

**Do NOT opt-in if you decide to**:

- Integrate directly with SKAdNetwork and [call the SKAdNetwork functions natively](enable-skadnetwork.md).
- Use another 3rd party library to handle your app's interactions with SKAdNetwork.



### 3. Assign Conversion Values to Events

::: info Custom Events
Custom Events need to be mapped in the [TikTok For Business Events Config](https://dashboard.branch.io/ads/partner-management/a_tiktok?tab=settings) so Branch can share the conversion value with TikTok.
:::

- In the `SKAdNetwork Config` section of the [Branch dashboard](https://dashboard.branch.io), select all app events you want Branch to send to Apple for attribution.
- You may optionally select a Customer Event Alias and/or a Revenue Range to further distinguish the conversion value.
- Assign unique values to each event (*Apple accepts any number from 0 to 63*) that represent their level of importance to you, where 63 is the highest priority and 0 is the lowest priority. Apple will always use the event with the highest priority, regardless if an event with a lower priority was tracked afterward.



::: info Revenue Range Guidance
- Revenue range is available for all Commerce Events where revenue is available on the event (Purchase, Add to Cart, Add to Wishlist, View Cart, Initiate Purchase, Add Payment Info, Click Ad, View Ad, Reserve, Spend Credits).
- Revenue must be entered as USD on the dashboard. Branch will convert revenue with different currencies on events to USD.
- Revenue ranges must not overlap for the same event (Ex: 1-100, 50-150).
- Lower Bound Revenue is *inclusive*, Upper Bound Revenue is *exclusive*.
- While not necessary, it is recommended to include both a lower + upper bound on every event.
:::

## SKAdNetwork Reporting

You may view performance of your SKAdNetwork Campaigns through the [SKAdNetwork Activity Tab](https://dashboard.branch.io/ads/skadnetwork/activity)

*[Image: 1451]*

For additional details on the reporting capabilities, dimensions, etc. please see the following guides:

- [SKAdNetwork Data](skadnetwork-data.md)
- [SKAdNetwork Analytics Dashboard](skadnetwork-dashboard-reports.md)
---
title: "Amazon"
slug: amazon-new-duplicate
---

## Overview

Amazon SAN (Self-Attributing Network) is Branch’s integration with Amazon Ads, and it enables you to measure and attribute app installs and in-app events from your Amazon DSP campaigns.

This integration uses Amazon’s Events Manager to pass conversion data in real-time, allowing you to:

- Track mobile app installs and in-app conversions.
- Attribute user actions back to Amazon advertising campaigns.
- Optimize campaigns based on cost per install (CPI), cost per action (CPA), and return on ad spend (ROAS).
- Create custom audiences based on app conversion signals.

For more information about Amazon's Events Manager and MMP integration, visit Amazon’s [help documentation](https://advertising.amazon.com/help/GF97FJUFXBDM32P4).

### Platform support

Amazon SAN integration supports:

- Android mobile devices
- Amazon Fire TV devices
- Amazon Fire Tablet devices
- iOS devices (via SKAdNetwork)

#### iOS attribution with SKAN

iOS campaigns are supported through Amazon’s integration with Apple’s SKAdNetwork (SKAN). While Android and Amazon Fire devices use Amazon’s direct SAN integration, iOS attribution works through SKAN to comply with Apple’s privacy requirements.

SKAN is more limited than the direct SAN integration, so expect to see more comprehensive attribution on Android and Amazon Fire devices than iOS devices.

Learn more in our [SKAdNetwork documentation](https://help.branch.io/docs/skadnetwork).

## Prerequisites

1. Branch setup requires:

   1. A Branch account.
   2. The Performance product enabled for your account. Learn more on our [Products page](https://help.branch.io/docs/products#performance), or [contact our Sales team](https://branchdocs.app.link/e/amazon-contact-sales).
   3. The Branch SDK integrated into your mobile app(s):

      1. [iOS](https://help.branch.io/developers-hub/docs/ios-basic-integration)
      2. [Android](https://help.branch.io/developers-hub/docs/android-basic-integration)
2. Amazon setup requires:

   1. An Amazon Ads or Amazon DSP account.
   2. Admin access to your Amazon Advertising console.
   3. Access to your Amazon Advertiser ID (more information [below](amazon-new.md#step-2-enter-amazon-advertiser-id)).

## Enable Amazon SAN

### Step 1: Enable Amazon SAN in Branch

1. Visit the [**Ad Partners** page](https://branchdocs.app.link/e/amazon-san-dashboard) in Branch.
2. In the search bar, type **Amazon SAN** and select this option from the results.
3. Select **Save & Enable**.

### Step 2: Enter Amazon Advertiser ID

Enter your Amazon Advertiser ID in Branch when prompted during setup.

#### Find your Amazon Advertiser ID

**For self-service advertisers**:

1. Navigate to the Amazon Ads reporting console.
2. Look for your advertiser name in the **Advertisers** tab of the **Amazon DSP Campaign Manager**.
3. Copy your Advertiser ID from this location.

**For managed service advertisers**:

Managed service advertisers must contact their Amazon account manager to obtain their Amazon Advertiser ID.

### Step 3: Configure event mapping

1. Navigate to the [**Event Config** tab](https://branchdocs.app.link/e/amazon-san-dashboard-event-config) in Branch’s Amazon SAN partner settings.
2. Enable the events you want to share with Amazon Ads by toggling them on.
3. Map your in-app events:

   1. In the left field, select the name of a [Branch Event](https://help.branch.io/developers-hub/docs/track-branch-events#track-events). You can use Standard Events, which are predefined by Branch, or Custom Events, which are defined by you.

      1. Branch strongly recommends that you use Standard Events whenever possible.
   2. In the right field, map it to one of Amazon’s predefined conversion events.
   3. Repeat this for all events you want to track with Amazon.

#### Standard Amazon conversion event types

Amazon supports the following standard conversion event types for mapping:

| Amazon event name | Description | Branch options |
| --- | --- | --- |
| `ADD_TO_SHOPPING_CART` | When a user adds a product to their shopping cart. | `ADD_TO_CART` |
| `APPLICATION` | When a user submits an application. | `COMPLETE_REGISTRATION` or Custom Event |
| `CHECKOUT` | When a user goes to the checkout page. | `INITIATE_PURCHASE` or `PURCHASE` |
| `CONTACT` | When a user supplies contact information, such as email, phone number, etc. | Custom Event |
| `LEAD` | When a user performs an action that initiates a sales lead. | `COMPLETE_REGISTRATION` or Custom Event |
| `OFF_AMAZON_PURCHASES` | When a user makes a purchase for a service or product. | `PURCHASE` |
| `PAGE_VIEW` | When a user visits a page on your website. | `VIEW_ITEM` or `VIEW_ITEMS` |
| `SEARCH` | When a user performs a search for a product. | `SEARCH` |
| `SIGN_UP` | When a user signs up for a product or service. | `COMPLETE_REGISTRATION` |
| `SUBSCRIBE` | When a user signs up for your service. | `SUBSCRIBE` or `START_TRIAL` |
| `OTHER` | User events that don’t fit the definition of the standard conversion types. | Custom Event |
| `MOBILE_APP_FIRST_START` | When a user launches the mobile app for the first time. | Tracked by default by Branch SDK as `INSTALL` |

For a full list of Branch Standard Events and how to track them, see [Track Branch Events](https://help.branch.io/developers-hub/docs/track-branch-events).

**Important notes**:

- Only events that are properly mapped will be sent to Amazon. Unmapped events will not be shared with Amazon Ads.
- For Amazon events that don't have a direct Branch Standard Event equivalent (like `CONTACT` or `LEAD`), you can create a Custom Event with an appropriate name.
- The `MOBILE_APP_FIRST_START` event is automatically tracked by the Branch SDK as an `INSTALL` event.

### Step 4: Set attribution windows

1. Navigate to the [Attribution Windows tab](https://branchdocs.app.link/e/amazon-san-attribution-windows) in Branch’s Amazon SAN partner settings.
2. Configure your attribution windows to match your campaign needs:

   1. Click-through attribution window: Time window after click during which conversions are attributed to Amazon.
   2. View-through attribution window: Time window after an impression during which conversions are attributed to Amazon.

## Data sharing and privacy

Amazon has specific data handling requirements that Branch adheres to:

- User-level data retention: Amazon user-level data is retained for attribution purposes according to Amazon’s policies.
- Privacy protection: Amazon does not provide access to certain raw campaign data to protect end-user privacy.
- Campaign details: When installs or events are attributed to Amazon, campaign details are available in Branch.

## FAQ

<details>
<summary>What is Amazon SAN?</summary>

Amazon SAN (Self-Attributing Network) is Branch’s integration with Amazon Ads that allows you to measure and attribute app installs and in-app events from your Amazon DSP campaigns.

</details>

<details>
<summary>What platforms does Amazon SAN support?</summary>

Amazon SAN integration supports Android mobile devices, Amazon Fire TV devices, and Amazon Fire Tablet devices. iOS campaigns are not supported.

</details>

<details>
<summary>Do I need to create Branch Ad Links for Amazon campaigns?</summary>

No, Amazon SAN does not require you to create Branch Ad Links for tracking Amazon campaigns as Amazon’s platform automatically handles tracking.

</details>

<details>
<summary>What should I do if events are not showing in Amazon?</summary>

If you don’t see the events you’re expecting in Amazon:

- Verify event mapping is configured correctly.
- Ensure the Branch SDK is properly implemented and events are being logged.
- Check that postbacks are enabled for the events you want to share.
- Confirm your Amazon Advertiser ID is entered correctly.

</details>

<details>
<summary>What should I do if I’m seeing attribution discrepancies?</summary>

If you’re seeing attribution discrepancies between Amazon and Branch:

- Remember that Amazon is self-attributing and may have different attribution logic than Branch.
- Check that the same events are being tracked consistently across both platforms.

</details>

<details>
<summary>Why is my campaign data not appearing?</summary>

If your campaign data is not appearing as expected:

- Confirm Amazon SAN integration is enabled in Branch.
- Verify you have active Amazon DSP campaigns running.
- Allow up to 24 hours for initial data to populate.

</details>
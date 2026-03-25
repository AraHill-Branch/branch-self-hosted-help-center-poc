---
title: "Meta Aggregated Event Measurement"
slug: meta-aggregated-event-measurement
---

## Overview

With iOS 14.5 and later, Apple's App Tracking Transparency (ATT) framework requires apps to request user permission before accessing the Identifier for Advertisers (IDFA). When users decline tracking permission (which is often the case), traditional attribution methods become limited. To address this challenge, Meta introduced **Aggregated Event Measurement (AEM)**.

Meta's AEM is a privacy-preserving protocol that allows measurement of web and app events from iOS 14.5+ devices, *even when users have opted out of tracking*. AEM enables you to:

- Measure app installs and re-engagement campaigns on Meta properties.
- Optimize campaigns using conversion events without requiring IDFA.
- Access near real-time reporting for faster campaign optimization.
- Attribute events while respecting user privacy preferences.

### AEM and SKAN

AEM works alongside Apple's SKAdNetwork (SKAN) but serves a different purpose. While SKAN provides aggregated, delayed attribution data through Apple's framework, AEM offers:

- Faster reporting.
- Campaign-level attribution data from Meta.
- Compatibility with Meta's campaign optimization systems.
- You can run both AEM and SKAN simultaneously for the same campaign, giving you more complete measurement across different attribution frameworks.

### Campaign support

AEM supports two kinds of Meta campaigns:

| Campaign Type | Description |
| --- | --- |
| Mobile App Engagement (MAE) | AEM is available for the following campaign types when the destination is set to a mobile app:  - Sales campaigns, with catalog turned on or off  - Lead campaigns  - Engagement campaigns  **Note**: MAE campaigns require deep linking configuration. Work with your development team to ensure this is set up correctly. |
| Mobile App Install (MAI) | AEM includes campaigns that use the app promotion objective. This means you can now run app promotion campaigns without configuring app events for SKAN, and more app events will be available for ad delivery optimization.  You can continue to configure events for SKAN if you want to view performance across platforms.  Attribution for mobile app installs is also supported.  **Note**: MAI campaigns work automatically once AEM is enabled. |

### How AEM works

Instead of using device-level identifiers like IDFA, AEM utilizes aggregate identifiers that are automatically handled by the Branch SDK and forwarded to Meta for campaign optimization.

**Important**: We prioritize Meta’s AEM when it is present. If both AEM and Branch Link data appear in the traffic, AEM data takes priority.

## Before you begin

Before enabling AEM, make sure you meet the requirements in this section.

### Branch requirements

1. Create a [Branch](https://dashboard.branch.io) account.
2. Enable Branch Ads for your Branch account. Please contact your Account Manager or [our Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.
3. Work with your development team to [implement the Branch iOS SDK](https://help.branch.io/developers-hub/docs/ios-basic-integration) (minimum version 2.1.2 required).
4. [Enable the Facebook integration](ad-partner-integration-guide.md) in Branch.

### Meta requirements

1. Obtain admin access to your Meta Business Manager account.
2. Register your app with Meta Business Manager. Meta determines app eligibility for AEM. If your app is eligible, AEM will appear as the default attribution option when you create campaigns in Meta Ads Manager.

### Technical requirements

The technical requirements for AEM depend on your [campaign type](enable-app-aggregated-event-measurement-support.md#campaign-support).

**For all AEM campaigns (MAI and MAE)**:

- Ensure your event Postbacks in Branch are [configured to send events](enable-app-aggregated-event-measurement-support.md#configure-events) to Meta.

**For MAE campaigns**:

- Work with your development team to ensure [deep linking](https://help.branch.io/docs/deep-linking) is properly configured for your app.

**For MAI campaigns**:

- MAI campaigns work automatically once AEM is enabled. No additional deep linking configuration is required.

### Configure events

Before enabling AEM, configure which Branch events are sent to Meta for campaign optimization. Event mapping tells Meta which user actions to optimize your campaigns for, such as purchases, registrations, or content views.

#### Available standard Meta events

Branch maps your events to Meta's standard event names for optimization. Common Meta events include:

| **Meta event name** | Branch event name |
| --- | --- |
| `MOBILE_APP_INSTALL` | `INSTALL` |
| `fb_mobile_activate_app` | `OPEN` |
| `fb_mobile_add_payment_info` | `ADD_PAYMENT_INFO` |
| `fb_mobile_add_to_cart` | `ADD_TO_CART` |
| `fb_mobile_add_to_wishlist` | `ADD_TO_WISHLIST` |
| `fb_mobile_complete_registration` | `COMPLETE_REGISTRATION` |
| `fb_mobile_content_view` | `VIEW_ITEM` |
| `fb_mobile_initiated_checkout` | `INITIATE_PURCHASE` |
| `fb_mobile_level_achieved` | `ACHIEVE_LEVEL` |
| `fb_mobile_purchase` | `PURCHASE` |
| `fb_mobile_rate` | `RATE` |
| `fb_mobile_search` | `SEARCH` |
| `fb_mobile_spent_credits` | `SPEND_CREDITS` |
| `fb_mobile_tutorial_completion` | `COMPLETE_TUTORIAL` |

For a complete list of Meta events and their parameters, see the [Facebook Ads Overview article](facebook-ads-overview.md#event-names).

#### Set event mappings

In the [**Events Config tab**](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=event_config), you'll see a mapping table with three columns:

- **Your Event Name**: The Branch events tracked in your app (INSTALL, OPEN, PURCHASE, etc.)
- **Your Customer Event Alias**: Optional custom names for organizing events internally. Most users can leave this set to "All Aliases."
- **Ad Partner Event Name**: Meta's standard names. These are the events Meta recognizes and can optimize campaigns for.

To set event mappings in Branch:

1. In Branch, navigate to **Configure → Ads Partners →** [**Events Config**](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=event_config).
2. Review the default event mappings Branch has configured.
3. To add additional events:

   1. Select the **Add Events Mapping** button.
   2. Select your Branch event from the **Your Event Name** column.
   3. Choose the corresponding Meta event from the **Ad Partner Event Name** column.
   4. Make sure the **Enabled** checkbox is checked so the event is active.
4. To modify existing mappings:

   1. Use the dropdowns to select different Meta event names.
   2. Click the **trash icon** to remove unwanted mappings.
5. Select **Save** to apply your changes.

![](/img/b309dbe-small-Enable_AEM_Branch.png)

#### Verify event mappings

It's important to verify that your events are being sent to Meta and they're properly configured.

**In your app**:

- Work with your development team to trigger a test event (e.g., make a test purchase).
- Check Branch [Liveview](https://dashboard.branch.io/overview/events) to confirm the event appears.
- Verify the event includes any required parameters (like revenue for purchases).

**In Meta Events Manager**:

- Log in to Meta Business Manager.
- Go to Events Manager and select your app.
- Check the Activity tab to see if your mapped events are being received.
- Look for any errors or warnings about event eligibility.

**In Meta Ads Manager**:

When creating a campaign, your mapped events should appear as available optimization events. If an event doesn't appear, it may not be eligible for AEM.

::: info Note
Event data typically appears within minutes to hours after configuration, but allow up to 24 hours for full propagation through Meta's systems.
:::

## Enable AEM

1. Contact your Account Manager from Meta to enable AEM support for your account. **Meta must enable AEM on their side before you can activate it in Branch**.
2. (Optional) To improve event eligibility and AEM performance, configure Meta to use MMP (Mobile Measurement Partner) as your preferred connection method:

   1. Go to Meta Events Manager and select your app.
   2. Set "MMP" as your preferred connection method.
   3. Ensure install and post-install events use the same connection method.
   4. Learn more in Meta's [documentation](https://www.facebook.com/business/help/3215014965459549).
3. In the Branch Dashboard, under **Ads** → [**Partner Management**](https://dashboard.branch.io/ads/partner-management), search for Facebook.
4. Navigate to the [**Events Config tab**](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=events), and toggle the **Enable Aggregated Event Measurement (AEM)** switch below your event mappings.

::: warning Warning
If your development team updates the SDK version, you may need to re-toggle the AEM switch in Branch.
:::

## Understand AEM data

AEM provides the following campaign-level data in Branch:

- `campaign_id` - Meta campaign identifier
- `ad_id` - Ad identifier
- `creative_id` - Creative identifier
- `secondary_publisher` - Placement (Instagram, Facebook, Audience Network, etc.)
- `ad_set_id` - Ad set identifier

#### Data limitations

Due to Meta's privacy-preserving approach, the `campaign_name` field will show as `Unpopulated` in Branch reports and exports. This is a Meta limitation that affects all mobile measurement partners using AEM.

**Please use** `campaign_id` **to identify campaigns instead**.

### AEM data in Branch

**Dashboard reporting:**

- AEM-attributed events appear in your standard Branch analytics reporting.
- Branch includes AEM campaigns in last-touch attribution results.
- Filter and segment your data using Branch's [available AEM fields](enable-app-aggregated-event-measurement-support.md#understand-aem-data).

**Exports and webhooks:**

- Log-level data exports include all AEM-attributed events.
- Events attributed to Facebook AEM campaigns display full available attribution data.
- Access detailed event-level data through Branch's [data export options](data-feeds-overview.md).

**Data freshness:**

- Near real-time reporting (events appear within minutes to hours).
- Significantly faster than SKAdNetwork's 24-72 hour reporting delay.
- Most recent campaign performance data available for quick optimization decisions.

For more on Branch's iOS attribution approach, see [iOS Attribution Best Practices](ios-attribution-best-practices.md).

## FAQ

<details>
<summary>If an advertiser also uses the Facebook SDK for iOS, what should they do to enable App AEM?</summary>

If an advertiser uses both the Branch SDK and the Facebook SDK for iOS, they can pass the events in their app campaigns through either method. As a best practice ensure that the install and post-install events use the same preferred connection method by following [these steps from Facebook](https://www.facebook.com/business/help/3215014965459549).

</details>

<details>
<summary>How is Branch integrating App AEM campaigns into reporting or exports?</summary>

Branch takes App AEM Campaigns into consideration for last touch attribution results.

Log-level data exports for all events is displayed in Exports/Webhooks for events attributed to Facebook AEM campaigns.

</details>

<details>
<summary>What does AEM reporting look like?</summary>

Meta does not provide `campaign_group_name` for AEM, which Branch maps to Campaign Name on the dashboard and exports. So `campaign_name` for events attributed via Meta AEM protocol will be marked as `Unpopulated`.

Data available under AEM is as follows:`campaign_id`, `ad_id`. `creative_id`, `secondary_publisher`, `ad_set_id`.

</details>

<details>
<summary>Why does my event data say "Ineligible"?</summary>

You may run into this issue if you toggled AEM on in the Branch Dashboard before setting up AEM in Meta. You need to set up AEM in Meta first, then enable it in the Branch Dashboard.

If you've already run into this issue, you can resolve it by toggling AEM off and back on again in the Branch Dashboard.

</details>

<details>
<summary>How long until I see AEM data after enabling?</summary>

**Event mapping changes**: Within minutes to hours for events to start flowing. Allow up to 24 hours for full propagation through Meta's systems.  
**After enabling AEM**: New events should appear once campaigns are running.  
**First campaign data**: Allow 24-48 hours after launching your first AEM campaign to see meaningful data.  
**After toggling AEM off/on**: If you need to retoggle the AEM switch, allow a few hours for data flow to resume.

</details>

<details>
<summary>What happens when both Meta's AEM and Branch Link data appear in the same traffic?</summary>

We prioritize Meta's AEM data whenever it is present. If both AEM and Branch Link data appear in the same traffic, AEM takes priority over Branch Link data.

</details>
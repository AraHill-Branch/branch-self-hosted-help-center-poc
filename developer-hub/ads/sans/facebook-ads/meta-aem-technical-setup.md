---
title: "Meta AEM Technical Setup"
slug: meta-aem-technical-setup
---

## Overview

With iOS 14.5 and later, Apple's App Tracking Transparency (ATT) framework requires apps to request user permission before accessing the Identifier for Advertisers (IDFA). When users decline tracking permission (which is often the case), traditional attribution methods become limited. To address this challenge, Meta introduced **Aggregated Event Measurement (AEM)**.

Meta's AEM is a privacy-preserving protocol that allows measurement of web and app events from iOS 14.5+ devices, *even when users have opted out of tracking*.

### Campaign support

AEM supports two kinds of Meta campaigns:

| Campaign Type | Technical Requirements |
| --- | --- |
| Mobile App Engagement (MAE) | **Requires** deep linking configuration ([iOS Universal Links](https://help.branch.io/developers-hub/docs/ios-universal-links) or [URI schemes](https://help.branch.io/docs/advanced-link-configuration)).  `campaign_ids` must be passed through deep links. |
| Mobile App Install (MAI) | Works automatically once AEM is enabled. No additional deep linking configuration is required. |

### How AEM works

Instead of using device-level identifiers like IDFA, AEM utilizes aggregate identifiers:

| Identifier | Description |
| --- | --- |
| `campaign_ids` | A set of IDs found on some links that open the app from Facebook ads persisted for 7 days and forwarded to Facebook for campaign optimization.  **Required** for [MAE](enable-app-aggregated-event-measurement-support.md#campaign-support) campaigns. |
| `anon_id` | An ID generated automatically by the Branch SDK, persisted on install and forwarded to Facebook for campaign optimization.  Available for [SDK v2.1.2](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/releases/tag/2.1.2)+.  **Optional** for [MAE](enable-app-aggregated-event-measurement-support.md#campaign-support) campaigns. |

These identifiers are forwarded to Facebook through all conversion events for re-engagement campaign optimization.

## Implementation prerequisites

### SDK requirements

1. Implement the Branch iOS SDK into your mobile app.

   1. Minimum version: [SDK v2.1.2](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/releases/tag/2.1.2)
   2. Recommended version: [latest](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/releases)
2. Coordinate with your marketing team to [enable the Facebook integration](ad-partner-integration-guide.md) in Branch.

### Technical requirements

The technical requirements for AEM depend on your [campaign type](enable-app-aggregated-event-measurement-support.md#campaign-support).

**For all AEM campaigns (MAI and MAE)**:

- Ensure your event Postbacks in Branch are configured to send events to Meta (coordinate with your marketing team on event mappings).

**For MAE campaigns**:

- Your app must support [iOS Universal Links](https://help.branch.io/developers-hub/docs/ios-universal-links) or [URI schemes](https://help.branch.io/docs/advanced-link-configuration).
- Your app must properly handle [deep links](deep-link-reference.md) in Meta campaigns.

**For MAI campaigns**:

- MAI campaigns work automatically once AEM is enabled. No additional deep linking configuration is required.

## Set custom anonymous ID

This step is **optional**. Branch automatically creates and sets a GUID for the `anon_id` field and sends that to Facebook. **Most implementations do not need to modify this setting.**

However, you may want to set a custom `anon_id` if you:

- Have an existing user identification system you want to align with across platforms.
- Need to maintain consistent IDs across multiple attribution providers.
- Have specific user privacy or identifier requirements unique to your app.

If you determine you need a custom ID, use the `setAnonID` method:

::: code-group

```swift [Swift]
Branch.setAnonID("your-custom-anon-id")
```

```objectivec [Objective-C]
[Branch setAnonID:@"your-custom-anon-id"];
```

:::

## Testing and verification

### Verify event implementation

**In your app**:

- Trigger a test event (e.g., make a test purchase).
- Check Branch [Liveview](https://dashboard.branch.io/overview/events) to confirm the event appears.
- Verify the event includes any required parameters (like revenue for purchases).

**In Meta Events Manager**:

- Coordinate with your marketing team to verify events appear in Meta Events Manager.
- Check for any errors or warnings about event eligibility.

::: info Note
Event data typically appears within minutes to hours after configuration, but allow up to 24 hours for full propagation through Meta's systems.
:::

## AEM data structure

AEM provides the following campaign-level data in Branch:

- `campaign_id` - Meta campaign identifier
- `ad_id` - Ad identifier
- `creative_id` - Creative identifier
- `secondary_publisher` - Placement (Instagram, Facebook, Audience Network, etc.)
- `ad_set_id` - Ad set identifier

#### Data limitations

Due to Meta's privacy-preserving approach, the `campaign_name` field will show as `Unpopulated` in Branch reports and exports. This is a Meta limitation that affects all mobile measurement partners using AEM.

## Learn more

For more on Branch's iOS attribution approach, see [iOS Attribution Best Practices](ios-attribution-best-practices.md).

## FAQ

<details>
<summary>If an advertiser also uses the Facebook SDK for iOS, what should they do to enable App AEM?</summary>

If an advertiser uses both the Branch SDK and the Facebook SDK for iOS, they can pass the events in their app campaigns through either method. As a best practice ensure that the install and post-install events use the same preferred connection method by following [these steps from Facebook](https://www.facebook.com/business/help/3215014965459549).

</details>

<details>
<summary>Why does my event data say "Ineligible"?</summary>

You may run into this issue if AEM was toggled on in the Branch Dashboard before setting up AEM in Meta. AEM must be set up in Meta first, then enabled in the Branch Dashboard.

If you've already run into this issue, coordinate with your marketing team to toggle AEM off and back on again in the Branch Dashboard.

</details>

<details>
<summary>How long until I see AEM data after enabling?</summary>

**Event mapping changes**: Within minutes to hours for events to start flowing. Allow up to 24 hours for full propagation through Meta's systems.  
**After enabling AEM**: New events should appear once campaigns are running.  
**First campaign data**: Allow 24-48 hours after launching your first AEM campaign to see meaningful data.  
**After toggling AEM off/on**: If you need to retoggle the AEM switch, allow a few hours for data flow to resume.

</details>

<details>
<summary>Why aren't my Mobile App Engagement (MAE) campaigns getting attributed?</summary>

For MAE re-engagement campaigns specifically, attribution requires proper deep linking configuration.

**Check the following**:

- Verify [iOS Universal Links](https://help.branch.io/developers-hub/docs/ios-universal-links) or [URI Schemes](advanced-link-configuration.md) are properly configured.
- Test that your app opens properly when a [Branch Ad Link](ad-links.md) is clicked from Meta ads.
- Confirm the `campaign_ids` field is being passed through the Branch Ad Link.
- Check that [deep link handling](deep-link-reference.md) is implemented correctly in your app.
- Ensure you completed the deep linking requirements in the "[Technical Requirements](enable-app-aggregated-event-measurement-support.md#technical-requirements)" section.
- Coordinate with your marketing team to verify MAE campaigns are set to open your app (not web) in Meta.

**To test deep linking**:

1. Have your marketing team create a test MAE campaign in Meta that includes a Branch Ad Link.
2. Click the ad from a test device.
3. Verify the app opens and doesn't redirect to web.
4. Check Branch [Liveview](https://dashboard.branch.io/overview/events) to see if the deep link data is received.

</details>
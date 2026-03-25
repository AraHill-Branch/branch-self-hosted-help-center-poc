---
title: "Configure Events for Self-Attributing Networks"
slug: configuring-events-for-self-attributing-networks
---

::: info Attention
Explore Branch’s new linking experience for [Web Links](https://help.branch.io/docs/create-web-links-1#view-and-manage-links) and [App Links](https://help.branch.io/docs/create-app-links-new), which offer deep linking, flexible configuration, and link analysis across multiple platforms!
:::

## Overview

Branch accepts different naming conventions for the conversion events we measure. For example, maybe the app Modern Clothing Styles sends a custom event called “Check Out". Most people who see this name would understand what it means. If they sent it as “PURCHASE” it wouldn’t be the same event, nor would it be clear.

However, Self-Attributing Networks (SANs) such as Facebook do not allow customers to optimize against custom events or show custom events in their UI. Therefore, if you want Facebook to auto-optimize against your RiderFirstBooking event, you’ll need to send it to Facebook as a “fb\_mobile\_purchase” event.

## Supported SANs

::: info Event Mapping Support
The ability to configure event mappings is available only for integrations with SANs. For all other ad partners, Branch uses standard event mappings for Postbacks.
:::

You can configure event mappings for the following Self-Attributing Networks:

- **Facebook**
- **Google Ads (formerly Google AdWords)**
- **Google Marketing Platform**
- **Roku**
- **Snap**
- **Twitter**
- **TikTok**

::: info Apple Ads Not Supported
Configuring event mappings for Apple Ads - although a SAN - is not supported due to the inability to send events server side.
:::

## Default Event Mappings

Your events will be mapped by default to ad partner event names for the purposes of campaign optimization and reporting.

Please refer to the following respective documents for our default event mappings per SAN:

- [Facebook](facebook-ads-overview.md#event-names)
- [Google Ads](google-ads-data-reporting.md#event-mapping)
- [Google Marketing Platform](google-marketing-platform.md#forward-events-to-gmp)
- [Roku](roku.md#forwarding-events-to-roku)
- [Snap](snap.md#event-names)
- [Twitter](twitter-ads.md#forwarding-events-to-twitter-ads)
- [TikTok](tiktok-data-reporting.md#mapping-between-tiktok-branch)

## Configuring Event Mappings

If you do not want to use the default event mappings, you can configure how Branch maps the events it tracks with those of the Self-Attributing Network.

To configure a SAN’s event mappings:

1. In the left-hand navigation, under **Ads**, click **Partner Management**.
2. Find and select the SAN for which you want to configure the event mappings.
3. Click the **Events Config** tab.
4. Click the **Add Event Mappings** button.
5. Map your event by providing the following:

   1. **Your Event Name** - The app event you want mapped; only app events you are tracking with the Branch SDK are available to be mapped.
   2. **Your Customer Event Alias** - Your custom name for your app event; only available if you’ve already implemented `customer_event_alias` in the Branch SDK.
   3. **Ad Partner Event Name** - The ad partner’s name for the app events they support; see default event mappings above.
6. Click **Save**.



::: warning Disabling events
If you disable an event, you will not receive any attribution data for that event. If this is not your intention, rather rename the event to a custom name.
:::

## Using Custom event names

If you are using the self-attributing network's SDK to track in-app events but need Branch to collect attribution data for these events, you will need to map Branch events to custom names to prevent duplicates from being tracked on the network. To create custom events follow the steps below:

1. Click on the pencil icon in the drop down next to value custom



2. Rename the custom event to your new event name



3. Save the name and don't forget to save your configuration when all of your events have been renamed



If you would like to revert to the default name, you can just re-select the network's name from the dropdown.

## Things to Keep in Mind

- Branch defines an “event” as a combination of Your Event Name + Customer Event Alias.
- You **cannot** use [Branch Standard event names](https://help.branch.io/developers-hub/docs/track-branch-events) as your custom event name. Doing so will result in your custom event not being tracked.
- You **cannot** configure more than one of the same event; i.e. the same combination of event name and customer event alias.
- You **cannot** map to a single Branch event to two different Ad Partner events.

  - You **can** map two different Branch events to a single Ad Partner Event.
- You can only configure at the event level; sub-parameters (e.g. order\_id or revenue) cannot be mapped to ad partner events.
- If you start to measure a new app event after you’ve enabled the SAN integration, you must manually configure the event.
- Some SANs accept custom events. For those that do, it’s indicated in the Ad Partner Event Name drop-down.
- If you have not configured any event mappings, Branch will use the default mappings outlined above for all events.
- If you have **at least one event mapped, only the mapped events visible in the UI will be sent.**
- When unchecked, the **Enabled** checkbox does not prevent events that the Branch SDK tracks automatically (for example, installs and opens) from being sent to ad networks. You must add `disableAdNetworkCallouts()` to your SDK integration to stop tracking these events.
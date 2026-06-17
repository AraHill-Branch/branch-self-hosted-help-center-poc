---
title: "Attribution windows"
slug: attribution-windows
---

An attribution window is a time period during which eligible conversion events can be claimed. The conversion event can be an App Install, Added to cart, Purchase, or any other downstream event.

Setting attribution windows lets you control the time between a touch (Click or an Impression) and the corresponding downstream event.

For example, if the Click to Install window is set to 7 days in Branch, anytime a user clicked on the ad and decided to download the app within the 7 days, the Ad will be attributed for the Install.

You can also set the time duration for the user to be deep linked along with when an event should be classified as a re-engagement for cohort analysis.

::: danger Warning
This article explains the [legacy Branch experience](branch-dashboard-overview.md) of setting attribution windows, which is slated for deprecation.  
  
In the [new version of Branch](new-branch-overview.md), attribution windows are configured under **Configuration > [Attribution](attribution-page-new.md)**.
:::

## Configure attribution windows

1. Navigate to **Configure > App Settings > [Attribution](https://dashboard.branch.io/configuration/attribution-windows)**.
2. Configure your attribution window settings. You can define your window of time for as little as 0.001 of a day or as long as 90 days. Reference the following when configuring:

- **Deep Linking Duration** refers to the duration of time someone is eligible to receive deep link data. This includes anyone clicking a Branch Link, or being automatically redirected to the app through a Branch Web SDK call. Measured in minutes.

  - This setting also covers the maximum length of time allowed for probabilistic modeling. Hence changing this value will also change the length of time allowed to use probabilistic modeling for attribution.
- **Click to x** refers to events that occur after someone clicks a Branch Link. If someone clicks and installs from a link, and comes back 10 days later to purchase (assuming Click to Conversion event window > 10 days), we would count that as an attributed conversion, and it would surface in Branch. Measured in days.
- **Impression to x** refers to events that occur after someone views a Branch impression link. Measured in days.
- **Re-engagement Inactivity** defines the period between two events that a user must be inactive in order to define the later event as a re-engagement. Used in re-engagement cohort analysis but not activity analysis.

3. Select **Save**. Once you change an attribution window setting, allow up to several minutes for the change to persist through our system. New attribution window settings apply to future attributions only.



## Organization view vs. app view vs. agency view attribution window settings

Your default attribution window settings - as described above - can be applied at the [Organization View](entity-views-access-controls-overview.md#organization-view), [App View](entity-views-access-controls-overview.md#app-view) and [Agency View](entity-views-access-controls-overview.md#agency-view) of your account.

Each level of attribution settings can exist independently from one another, but you can also choose to inherit (or disinherit) the attribution window settings from a parent level.

### Inherit attribution window settings from the organization level

If your account includes an organization level, you can choose to inherit (or not) its attribution window settings for each individual app in your organization.

To access app-level attribution window settings, navigate to [Link Settings](https://dashboard.branch.io/link-settings), select the **Attribution Windows** tab and turn the toggle **Inherit attribution windows from your app's parent organization** on.



### Override attribution window settings at the app level

You can override the app-level attribution window defaults on a per ad partner basis by enabling the use of Ad Partner Attribution Windows for any given ad partner.

To access ad partner attribution settings, navigate to the [Partner Management](https://dashboard.branch.io/ads/partner-management) page, search for and select the corresponding ad partner, and select the **Attribution Windows** tab.



### Use ad partner attribution windows

When you enable Use Ad Partner Attribution Windows, the defaults from the app level are auto-loaded. Contact your ad partner if they require different settings to ensure you input the correct attribution window lengths.

## FAQ

<details>
<summary>What is the time range for deep link duration/match duration?</summary>

The match duration or the deep link duration is the time that Branch allows a click to remain outstanding and be eligible to be matched with a new app session. By default, it is set to 2 hours (~ 120 mins). You can manage this setting via [Attribution Windows](attribution-windows-link-settings.md). You can also override the match duration for deep link matching when creating the link via API.

</details>

<details>
<summary>Can I get link-level Attribution Windows in minutes?</summary>

Yes, but you'll need to convert it into a decimal in terms of days. For example, 0.0007 roughly equals 1 minute.

</details>
---
title: "Enable Google Marketing Platform"
slug: enable-google-marketing-platform
---

## Prerequisites

In order to enable Google Marketing Platform, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Set your [local currency](advanced-settings-configuration.md#local-currency).
3. Enabled Ads for your Branch account.

   - Contact your Branch account manager or visit <https://branch.io/pricing>
4. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
5. Admin access to your Google Marketing Platform (DV360 and/or CM360) account.

## Enable Google Marketing Platform

### 1. Generate Link IDs

Link IDs are needed for Branch to connect to GMP.

::: info Link ID Creation
You only need one Link ID per app:

- If you are using **both** Campaign Manager and Display & Video 360, generate the Link ID in Campaign Manager.
- If you're **only** using Display & Video 360, generate your Link ID in Display & Video 360.
:::

#### Generate Link ID in CM360

In CM360, go to **Advertiser > Floodlight > Floodlight Configuration**, and select the app you are configuring. Select Branch as your partner, and save the generated Link ID for the next step.

![](/img/01554f7-Link_ID.png "Link ID.png")

#### Generate Link ID in DV360

In DV360, go to **Advertiser > Resources > Floodlight > Basic Details > Third-Party App Analytics > Edit**. Select **Create New Link**, and choose your platform. Save the generated Link ID for the next step.

![](/img/94cf4f3-Link_ID_DV360.png "Link ID DV360.png")

### 2. Connect GMP in Branch

In the Branch Dashboard under **Ads >** [**Partner Management**](https://dashboard.branch.io/ads/partner-management), find/search for Google Marketing Platform. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_google_marketing_platform?tab=settings) to go there directly.

Enter the Link IDs from [Step 1](enable-google-marketing-platform.md#1-generate-link-ids) in the [Account Settings tab](https://dashboard.branch.io/ads/partner-management/a_google_marketing_platform?tab=settings) and click **Save & Enable**.

![](../../../assets/media/images/cdb9f288-45f3-4ee2-9bbc-00aa3a2e8f83 "Enable GMP.PNG")

### 3. Configure Events

After inputting your GMP Link IDs into Branch, navigate to the [Events Config tab](https://dashboard.branch.io/ads/partner-management/a_google_marketing_platform?tab=events) to configure your events.

::: info Limited Custom Events
Google Marketing Platform only supports 10 custom events, so we recommend choosing which events are most valuable.
:::

You should see the events you are tracking with the Branch SDK here when you Add Event Mappings. For more details on Google Ads and Branch event & metadata mapping, see the specifications here.

![](../../../assets/media/images/def8afd7-5c89-4212-9a17-380c1e7a45e4 "Events Config.PNG")

### 4. Configure Attribution Windows

After configuring your events, navigate to the [Attribution Windows tab](https://dashboard.branch.io/ads/partner-management/a_google_marketing_platform?tab=attribution_windows) to set windows by attribution type.

You have full freedom to choose your attribution windows; however, it may cause discrepancies between the Branch and GMP Dashboards when comparing. It is recommended that attribution windows are set to be the same to reduce discrepancies.
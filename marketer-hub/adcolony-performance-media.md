---
title: "AdColony Performance Media"
slug: adcolony-performance-media
---

## Overview

![](/img/8a79598-8c145af-logo-adcolony-1524610626366(2).png "8c145af-logo-adcolony-1524610626366.png")

AdColony is the premiere in-app marketplace for brands and agencies to reach consumers on the most intimate screen in consumers' lives with 100% measurable, transparent, and brand-safe inventory with industry-leading viewability.

**PARTNER CAPABILITIES**

| Partner Capabilities | Details |
| --- | --- |
| Company Type | Ad Network |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution - View-Through Attribution |
| Ad Campaign Types | - Acquisition campaigns - Retargeting campaigns |
| Ad Formats | - Banner - Interstitial - Video - Recommendation - App of Day |
| Click Types | - Client-side click - Server-side click |
| Supported Platforms | - iOS - Android - Amazon |
| Link Wrapping | Supported |
| Cost Ingestion Support | Not Supported |
| Cost Ingestion Types | - Click/impression tracking link |
| Pricing Models | - CPI - CPC - CPM - CPA - CPV |

## 1. Complete Ads Prerequisites

::: info DEVELOPER MAY BE REQUIRED
The following Ads prerequisite includes providing URI schemes and other components that may require a developer:

- [**Add Deep Link Routing & Required Redirects**](https://branch.dashboard.branch.io/configuration/general)
:::

::: warning DEVELOPER REQUIRED
The following Ads prerequisites involve app code changes:

- [**Implement the Branch SDK**](native-sdks-overview.md)
:::

## 2. Enable the Integration

1. Visit the [**Ads**](https://dashboard.branch.io/ads) page on the Branch dashboard.
2. Select [**Partner Management**](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for AdColony Performance Media.
4. Select **AdColony Performance Media** and click **Save & Enable**.

   ![](/img/7bff50a-Screen_Shot_2020-12-03_at_10.28.56_AM.png "Screen Shot 2020-12-03 at 10.28.56 AM.png")

## 3. Enable Postbacks

When Branch measures a conversion (install or other event), it determines which ad network or partner is responsible for generating the action, then attributes credit to the proper partner accordingly. Branch notifies the Ad partner of these events via postbacks which are turned on when you enable any Ads integrated partner.

Basic postbacks will automatically be activated for events like Install and Purchase when you enable your ad partner.

Branch’s postback system is highly [customizable](basic-postback-configuration.md); you can set up postbacks for specific events, as well as specific subsections of events, filtered by link data, user data or event properties.

You can then [add additional postbacks](branch-universal-ads-advanced.md#addingenabling-more-postbacks), for example, if you wanted to add postbacks for custom events that are specific to your app like Account Created. You can also [edit postbacks](branch-universal-ads-advanced.md#addingenabling-more-postbacks) if there's additional data you really need to pass along to your ad partner.

![](/img/31e3690-pb-conf.png "pb-conf.png")

::: warning AdColony Performance Media requires the Event ID that corresponds to each postback.  Please make sure you provide these and click Save.
Talk to your Account Manager at AdColony Performance Media to learn how to access your [Event ID].
:::

::: danger Troubleshoot Postbacks
There may be times when you need to reset a partner's settings; i.e. when a partner updates their postback templates or when perhaps you've made a mistake during partner setup. Resetting a partner's settings allows you to re-enable the partner integration with the correct information to accurately measure and attribute conversion.

Note, by resetting your partner settings, this will:

- Disable the ad partner
- Clear out all of your saved credentials and postbacks that are already setup
- Return the ad partner to its basic configuration

[Learn more here on how to reset your ad partner's settings.](reset-my-ad-partners-settings.md)
:::

## 4. Verify Integration Setup

<details>
<summary>View Link Parameters</summary>

By default, Branch automatically appends partner-specific link parameters during the link creation process. When a user clicks on the link, AdColony Performance Media provides the appropriate parameter values which Branch ingests and uses for attribution and reporting purposes.

Below are the link parameters that Branch automatically appends for this ad partner:

![](/img/b9b0087-Screen_Shot_2020-12-03_at_10.35.09_AM.png "Screen Shot 2020-12-03 at 10.35.09 AM.png")

</details>

<details>
<summary>View Attribution Windows</summary>

Branch employs [Attribution Windows](attribution-windows-link-settings.md) at both the app level and the ad partner level. When you enable AdColony Performance Media, Branch uses the attribution windows you've selected at the app level.

However, you can choose to use the attribution windows provided specifically by AdColony Performance Media. To do so, toggle the **Use Ad Partner Attribution Windows** to on. Please keep in mind that only conversions attributed to this ad partner will use these specific windows; otherwise, the app-level windows prevail.

![](/img/9aff440-Screen_Shot_2020-12-03_at_10.35.30_AM.png "Screen Shot 2020-12-03 at 10.35.30 AM.png")

</details>

<details>
<summary>Test Postbacks</summary>

Testing your configuration is a very important step that we highly recommend you take the time to complete before going live with marketing campaigns.

Learn how to [Test Postbacks](testing-postbacks.md)

![](/img/6c2f933-Screen_Shot_2020-12-03_at_10.35.47_AM.png "Screen Shot 2020-12-03 at 10.35.47 AM.png")

</details>

## 5. Create a Branch Link

If you are running paid advertising campaigns, you'll want to create a Branch Ad Link so we can accurately attribute resulting app conversions to the appropriate advertising partner.

Branch Ad Links support deferred deep linking, Android App Links, and iOS Universal Links, as well as web and app conversions.

Learn how to [Create A Branch Ad Link](ad-links.md).
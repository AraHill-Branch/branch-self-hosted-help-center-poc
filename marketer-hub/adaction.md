---
title: "AdAction"
slug: adaction
---

## Overview

![image](/img/adaction-og-image(1).png)

[Adaction](https://www.adaction.com/) is a leading mobile app marketing platform that delivers over 6 million monthly conversions for well-known companies and game developers in the space. We specialize in providing premium demand to publishers worldwide by way of our owned and operated inventory and strategic partnerships.

**PARTNER CAPABILITIES**

| Partner Capabilities | Details |
| --- | --- |
| Company Type | - Ad Network - Publisher |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution |
| Ad Campaign Types | - Acquisition campaigns |
| Ad Formats | - Banner - Interstitial - Video - App of Day |
| Click Types | - Server-side click |
| Supported Platforms | - iOS - Android - Amazon - Windows - Mac OS |
| Link Wrapping | Supported |
| Cost Ingestions Support | Supported |
| Cost Ingestion Types | - Click/impression tracking link |
| Pricing Models | - CPI - CPC - CPA |

## 1. Complete Ads Prerequisites

::: info DEVELOPER MAY BE REQUIRED
The following Ads prerequisite includes providing URI schemes and other components that may require a developer:

- [**Add Deep Link Routing & Required Redirects**](https://branch.dashboard.branch.io/configuration/general)
:::

::: warning DEVELOPER REQUIRED
The following Ads prerequisites involve app code changes:

- [**Implement the Branch SDK**](native-sdks-overview.md)
:::

## 2. Retrieve Credentials

Before you can enable the partner integration in your Branch dashboard, you will first need to make sure you have the following credentials available:

- Client Security Token

## 3. Enable the Integration

1. Visit the [**Ads**](https://dashboard.branch.io/ads) page on the Branch dashboard.
2. Select [**Partner Management**](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for AdAction Interactive.
4. Select **AdAction Interactive**, provide your **Client Security Token** and click **Save & Enable**.

   ![](/img/bef1980-adaction_interactive_enable.png "adaction_interactive_enable.png")

## 4. Enable Postbacks

When Branch measures a conversion (install or other event), it determines which ad network or partner is responsible for generating the action, then attributes credit to the proper partner accordingly. Branch notifies the Ad partner of these events via postbacks which are turned on when you enable any Ads integrated partner.

Basic postbacks will automatically be activated for events like Install and Purchase when you enable your ad partner.

Branch’s postback system is highly [customizable](basic-postback-configuration.md); you can set up postbacks for specific events, as well as specific subsections of events, filtered by link data, user data or event properties.

You can then [add additional postbacks](branch-universal-ads-advanced.md#addingenabling-more-postbacks), for example, if you wanted to add postbacks for custom events that are specific to your app like Account Created. You can also [edit postbacks](branch-universal-ads-advanced.md#addingenabling-more-postbacks) if there's additional data you really need to pass along to your ad partner.

![](/img/97f80fc-Adaction_interactive_postback_config.png "Adaction_interactive_postback_config.png")

::: warning Additional Information Required
AdAction Interactive requires the GOAL ID that corresponds to each postback. Please make sure you provide these and click **Save**.

Talk to your Account Manager from AdAction Interactive to learn how to access your GOAL ID.
:::

::: danger Troubleshoot Postbacks
There may be times when you need to reset a partner's settings; i.e. when a partner updates their postback templates or when perhaps you've made a mistake during partner setup. Resetting a partner's settings allows you to re-enable the partner integration with the correct information to accurately measure and attribute conversion.

Note, by resetting your partner settings, this will:

- Disable the ad partner
- Clear out all of your saved credentials and postbacks that are already setup
- Return the ad partner to its basic configuration

[Learn more here on how to reset your ad partner's settings.](reset-my-ad-partners-settings.md)
:::

## 5. Verify Integration Setup

<details>
<summary>View Link Parameters</summary>

By default, Branch automatically appends partner-specific link parameters during the link creation process. When a user clicks on the link, AdAction Interactive provides the appropriate parameter values which Branch ingests and uses for attribution and reporting purposes.

Below are the link parameters that Branch automatically appends for this ad partner:

![](/img/cfba2b3-Adaction_Interactive_link_parameters.png "Adaction_Interactive_link_parameters.png")

</details>

<details>
<summary>View Attribution Windows</summary>

Branch employs [Attribution Windows](attribution-windows-link-settings.md) at both the app level and the ad partner level. When you enable AdAction Interactive, Branch uses the attribution windows you've selected at the app level.

However, you can choose to use the attribution windows provided specifically by AdAction Interactive. To do so, toggle the **Use Ad Partner Attribution Windows** to on. Please keep in mind that only conversions attributed to this ad partner will use these specific windows; otherwise, the app-level windows prevail.

![](/img/9ca4c14-Adaction_Interactive_Attribution_windows.png "Adaction_Interactive_Attribution_windows.png")

</details>

<details>
<summary>Test Postbacks</summary>

Testing your configuration is a very important step that we highly recommend you take the time to complete before going live with marketing campaigns.

Learn how to [Test Postbacks](testing-postbacks.md)

![](/img/f83738f-Adaction_Interactive_postback_testing.png "Adaction_Interactive_postback_testing.png")

</details>

## 6. Create a Branch Link

If you are running paid advertising campaigns, you'll want to create a Branch Ad Link so we can accurately attribute resulting app conversions to the appropriate advertising partner.

Branch Ad Links support deferred deep linking, Android App Links, and iOS Universal Links, as well as web and app conversions.

Learn how to [Create A Branch Ad Link](ad-links.md).
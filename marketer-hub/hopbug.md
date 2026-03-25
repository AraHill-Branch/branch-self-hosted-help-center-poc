---
title: "Hopbug"
slug: hopbug
---

## Overview



[HopBug](http://hopbug.com/)  Media is a programmatic digital agency which empowers the role of how to connect the right brand with the right user at the right time with eye-catching content digitally.

**PARTNER CAPABILITIES**

| Partner Capabilities | Details |
| --- | --- |
| Company Type | Ad Network |
| Deep Linking | Supported |
| Attribution | - Click-Through Attribution |
| Ad Campaign Types | - Acquisition campaigns |
| Ad Formats | - Banner - Interstitial |
| Click Types | - Client-side click |
| Supported Platforms | - iOS - Android |
| Link Wrapping | Not Supported |
| Cost Ingestion Support | Not Supported |
| Cost Ingestion Types | N/A |
| Pricing Models | - CPI - CPC |

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
3. Search for Hopbug.
4. Select **Hopbug**, and click **Save & Enable**.

   

## 3. Enable Postbacks

When Branch measures a conversion (install or other event), it determines which ad network or partner is responsible for generating the action, then attributes credit to the proper partner accordingly. Branch notifies the Ad partner of these events via postbacks which are turned on when you enable any Ads integrated partner.

Basic postbacks will automatically be activated for events like Install and Purchase when you enable your ad partner.

Branch’s postback system is highly [customizable](basic-postback-configuration.md); you can set up postbacks for specific events, as well as specific subsections of events, filtered by link data, user data or event properties.

You can then [add additional postbacks](branch-universal-ads-advanced.md#addingenabling-more-postbacks), for example, if you wanted to add postbacks for custom events that are specific to your app like Account Created. You can also [edit postbacks](branch-universal-ads-advanced.md#addingenabling-more-postbacks) if there's additional data you really need to pass along to your ad partner.



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

By default, Branch automatically appends partner-specific link parameters during the link creation process. When a user clicks on the link, Hopbug provides the appropriate parameter values which Branch ingests and uses for attribution and reporting purposes.

Below are the link parameters that Branch automatically appends for this ad partner:



</details>

<details>
<summary>View Attribution Windows</summary>

Branch employs [Attribution Windows](attribution-windows-link-settings.md) at both the app level and the ad partner level. When you enable Hopbug, Branch uses the attribution windows you've selected at the app level.

However, you can choose to use the attribution windows provided specifically by Hopbug. To do so, toggle the **Use Ad Partner Attribution Windows** to on. Please keep in mind that only conversions attributed to this ad partner will use these specific windows; otherwise, the app-level windows prevail.



</details>

<details>
<summary>Test Postbacks</summary>

Testing your configuration is a very important step that we highly recommend you take the time to complete before going live with marketing campaigns.

Learn how to [Test Postbacks](testing-postbacks.md)



</details>

## 5. Create a Branch Link

If you are running paid advertising campaigns, you'll want to create a Branch Ad Link so we can accurately attribute resulting app conversions to the appropriate advertising partner.

Branch Ad Links support deferred deep linking, Android App Links, and iOS Universal Links, as well as web and app conversions.

Learn how to [Create A Branch Ad Link](ad-links.md).
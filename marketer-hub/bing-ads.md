---
title: "Bing Ads"
slug: bing-ads
---

## Overview



[Bing Ads](https://bingads.microsoft.com/) is a service that provides pay per click advertising on both the Bing and Yahoo! search engines.

**PARTNER CAPABILITIES**

| Partner Capabilities | Details |
| --- | --- |
| Company Type | Contact support at Bing Ads for more information. |
| Deep Linking | Supported |
| Attribution | Contact support at Bing Ads for more information. |
| Ad Campaign Types | - Acquisition campaigns |
| Ad Formats | Contact support at Bing Ads for more information. |
| Click Types | Contact support at Bing Ads for more information. |
| Supported Platforms | - iOS - Android - Windows |
| Link Wrapping | Contact support at Bing Ads for more information. |
| Cost Ingestion Support | Contact support at Bing Ads for more information. |
| Cost Ingestion Types | Contact support at Bing Ads for more information. |
| Pricing Models | Contact support at Bing Ads for more information. |

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
3. Search for Bing Ads.
4. Select **Bing Ads**, and click **Save & Enable**.

   

## 3. Enable Postbacks

When Branch measures a conversion (install or other events), it determines which ad network or partner is responsible for generating the action, then attributes credit to the proper partner accordingly. Branch notifies the Ad partner of these events via postbacks which are turned on when you enable any Ads integrated partner.

Bing Ads only support the INSTALL postback.

*[Image: 2060]*

Bing Postbacks

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

By default, Branch automatically appends partner-specific link parameters during the link creation process. When a user clicks on the link, Bing Ads provides the appropriate parameter values which Branch ingests and uses for attribution and reporting purposes.

Below are the link parameters that Branch automatically appends for this ad partner:



</details>

<details>
<summary>View Attribution Windows</summary>

Branch employs [Attribution Windows](attribution-windows-link-settings.md) at both the app level and the ad partner level. When you enable Bing Ads, Branch uses the attribution windows you've selected at the app level.

However, you can choose to use the attribution windows provided specifically by Bing Ads. To do so, toggle the **Use Ad Partner Attribution Windows** to on. Please keep in mind that only conversions attributed to this ad partner will use these specific windows; otherwise, the app-level windows prevail.



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

::: warning Bing App Extension Ads
When running Bing App Extension campaigns, you must run separate links for your Android and iOS app campaigns. In addition to that, for each platform's link, set the desktop redirect to the platform-specific App Store. For example, in your Android campaign link, set the desktop redirect to the app listing in the Play Store.
:::

## Using Branch Ad links in Bing App Install Ads

When creating an app install campaign on Bing Ads, it has options to enter the final URL and a tracking template. By default, it uses the store page URL of the app as the final URL, however, this needs to be replaced with a Branch Ad Link in a specific way;

**Example Branch Ad Link:**  
`https://branchster.app.link/UuR8XIPPljb?%243p=a_bing_ads&~ad_id={AdId}&~ad_set_id={AdGroupId}&~ad_set_name={AdGroup}&~campaign={Campaign}&~campaign_id={CampaignId}&~click_id={msclkid}&~keyword={keyword:default}`

Deconstructing the Branch Ad Link, we can obtain both the final URL and tracking template to run the app install campaign:

| Final URL | Tracking Template |
| --- | --- |
| branchster.app.link/UuR8XIPPljb | {lpurl}?%243p=a\_bing\_ads&~ad\_id={AdId}&~ad\_set\_id={AdGroupId}&~ad\_set\_name={AdGroup}&~campaign={Campaign}&~campaign\_id={CampaignId}&~click\_id={msclkid}&~keyword={keyword:default} |

## Troubleshooting

Bing prioritizes keyword-level final URLs over ad-level URLs, which results in Branch not being able to register the click, and users not being redirected by the Branch Link.

To address this issue, choose one of the following options:

1. Remove the final URL at the keyword level, so that the Branch Link is used:

   - `www.example.com`
2. Apply the Branch Link at the keyword level instead of the ad level:

   - `example.app.link`

Branch Links should be applied at the highest level of URL precedence (keyword, ad, or campaign).
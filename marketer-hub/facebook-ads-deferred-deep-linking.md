---
title: "Facebook Ads Deferred Deep Linking"
slug: facebook-ads-deferred-deep-linking
---

## **Overview**

Branch provides both deep linking and deferred deep linking using Facebook Ads. This article is specifically about deferred deep linking. This **does not** require you to integrate the Meta SDK in your app.

**Deferred deep linking**

If a user doesn’t have your app installed, you can use deferred deep linking to direct them to the app store. Once they install the app, they will be taken to specific, relevant content inside your mobile app immediately.

This solves the problem of new users being sent to generic app home screens after they click an ad. Instead of landing on the home screen, the user is seamlessly taken to the exact product, content, or page they were expecting to see.

## **Prerequisites**

To use deferred deep linking with Facebook Ads, you must first:

1. Enable Branch Ads for your Branch account. Please contact your Account Manager or [our Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.
2. Integrate the Branch SDK into your mobile app(s):

   1. [iOS](https://help.branch.io/developers-hub/docs/ios-basic-integration)
   2. [Android](https://help.branch.io/developers-hub/docs/android-basic-integration)
3. Configure [Universal Links](https://help.branch.io/developers-hub/docs/ios-universal-links) and/or [App Links](https://help.branch.io/developers-hub/docs/android-app-links).
4. Implement deep link handling for your app:

   1. [iOS](https://help.branch.io/developers-hub/docs/ios-advanced-features#general-deep-linking)
   2. [Android](https://help.branch.io/developers-hub/docs/android-advanced-features#general-deep-linking)
5. Have admin access to your Facebook Ads account.
6. Integrate Facebook Ads as an ad partner in Branch using our [Ad Partner Integration Guide](ad-partner-integration-guide.md) and the [event mapping table](facebook-ads-overview.md#event-names) between Branch and Facebook.
7. Use a [Branch Ad Link](ad-links-index.md) in your Facebook Ads advertising campaign.

::: info Note
Unlike other Self-Attributing Networks where Branch can retrieve data directly from the SAN partner without a Branch Link, Facebook's deferred deep linking implementation requires a Branch Ad Link because it relies on a passive deep view from a browser. This enables Branch to gather web session metadata.
:::

## How it works

For deep linking and deferred deep linking with Facebook Ads, you can use Instant Experience Templates from Meta. Then, when a user clicks on an ad, the following happens:

1. A [Branch Ad Link](ad-links.md) is activated in the Facebook Ads campaign.
2. A [Branch Deepview](deepviews.md) opens a webpage.
3. Branch gathers all the metadata linked to that web session.
4. The Branch Deepview directs users to the Apple App Store or Google Play Store for app installation.
5. The user installs and launches the app.
6. Branch [probabilistically](predictive-modeling.md) associates that user session with the web session.
7. Branch sends the link data in the callback to facilitate deep link navigation.

::: info Note
The **Leave Facebook** modal is presented by Facebook when the user leaves the in-app browser from paid media. This is not a URL scheme modal and it **cannot** be bypassed.
:::

## Implementation

To use deferred deep linking in your Facebook Ads campaign:

1. Create a [Branch Ad Link](ad-links.md), and make sure to append `$deeplink_no_attribution=true` at the end.

   1. This parameter disables Branch's deep link attribution and allows Facebook to attribute installs through their own conversion logic, which Branch then analyzes.
2. Create an ad campaign in Facebook Ads.
3. In the **Destination** settings for the ad, select the **Instant Experience** option.  
   *[Image: Integration between Branch and Facebook Ads using Instant Experience destination for deferred deep linking.]*.png)
4. Select **Create New** to create a **Custom Instant Experience**.
5. Add relevant components to your ad on the **Select components to add** screen, such as buttons, creatives, or content.  
   
6. Within the **Button** component settings, set the **Destination** as **Website** and place your Branch Ad Link in that field.  
   
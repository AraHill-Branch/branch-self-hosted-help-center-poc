---
title: "Enable Google Web-Based Campaigns"
slug: enable-google-web-based-campaigns
---

## Overview

While App Campaigns (UAC/UACe) are focused solely on campaigns for app installs/engagement, you can still use Google web-based campaigns (**Display, Search, Discovery, Video, Shopping**) to expand your marketing efforts that enable both app and web conversions. Once enabled, Branch will automatically attribute trackable app conversions, deep link users from web campaigns, and attribute web events in Branch.

## Prerequisites

In order to enable Google Ads Web-based Campaigns, you need to have completed the following:

1. [Enable Google App Campaigns](enable-google-app-campaigns.md)
2. [Enable Parallel Tracking](https://support.google.com/google-ads/answer/7650215).
3. Implement the [Branch Web SDK](web-basic-integration.md)

   - [Track Web Events](web-advanced-features.md#event-tracking)
   - **Note**: Google does not ingest web events and will only use web events tracked via their own web trackers.

## Enable Web-Based Campaigns

### 1. Create a Campaign

After completing the prerequisites, [set up your Web Engagement campaign in Google Ads](https://support.google.com/google-ads/answer/7020291?hl=en-GB)

![](/img/1248a6a-web_campaign.png "web campaign.png")

For example for a **Display** campaign:

- Select **Website traffic** as your goal
- Set **Display** as your campaign type
- Set your campaign subtype as **Standard, Smart, or Gmail**

### 2. Build a Branch Ad Link

Log into the [Branch Dashboard](https://dashboard.branch.io/), and [create a Branch Ad Link](https://dashboard.branch.io/ads/analytics/activity?modal=ad-link) from the **Create** button on the top right. Make sure you set the Ad Partner to **Google Adwords**.

![](../../../assets/media/images/4f8bb353-3b26-4326-8b02-110487ea5ab7 "Create Ad Link.PNG")

Use the following table to determine the type of Branch Ad Link to create based on your campaign:

| Campaign Type | Branch Ad Link Type | Link Placement |
| --- | --- | --- |
| Display | Cross-Platform Display | Campaign or Ad Level tracking template |
| Search | Cross-Platform Search | Campaign, Ad Level tracking template, or Final URL`*`. Make sure you replace lpurl={lpurl} with `%24fallback_url={lpurl}` in your link. |
| Discovery | Cross-Platform Display | Campaign or Ad Level tracking template |
| Video | Cross-Platform Display | Campaign or Ad Level tracking template |
| Shopping | Cross-Platform Display | Campaign or Ad Level tracking template |

Be sure to define your analytics tags to mirror what is in Google Ads. Additional details on creating Branch Ad Links can be found in our guide [**here**](ad-links.md).

![](/img/4312eaa-Branch_Ad_Link_Tags.png "Branch Ad Link Tags.png")

Once your Branch Ad Link is complete, be sure to copy the Click Tracking Link as this will be used in the next step.

![](/img/3794a9d-Branch_Ad_Link_Final.png "Branch Ad Link Final.png")

**Note:** You can append additional [macros](https://support.google.com/admanager/answer/2376981?hl=en) on your Branch Ad Link after the link is created.

### 3. Add to Tracking Template

Add the Branch Click Tracking Link from [Step 2](enable-google-web-based-campaigns.md#2-build-a-branch-ad-link) to the Campaign Tracking Template. You can use the same one across ad groups or you can do this for each ad group separately.

![](/img/1b8b8ef-Tracking_Template.png "Tracking Template.png")

Once you are done with the campaign settings, just launch the campaign!

## Deep Linking from Google Web-Based Campaigns

Please consult with your app development team to set up deep linking for your Google Web-Based Campaigns.

The setup requires enabling Universal Links & Android App Links on your web domain:

- [iOS Universal Links](ios-universal-links.md)
- [Android App Links](android-app-links.md)

If you would like to attribute deep-linked app conversions from SEO, please see Branch's [SEO App Attribution](seo-app-attribution.md) feature.

## Using your Product Feed

When setting up a Shopping campaign, you can use [your own product feeds](creating-branch-links-for-product-feeds.md#google-feeds).

##### Uploading to Google Merchant Center

1. In Google Merchant Center, navigate to `Products` then `Feeds`.

![](/img/06106b5-google-merchant-center-home.png "google-merchant-center-home.png")

2. Click the large blue plus button to add a new feed.
3. Follow the prompts to name your feed, select feed language, and upload or connect your feed.
4. Once your feed has been created, Merchant Center will take a few minutes to process it. Once that has finished, you're feed is ready to be used in your Adwords campaigns.

##### Using your Merchant Center Feed in Adwords

1. In your Adwords dashboard, navigate to the All Campaigns page.

![](/img/ac36f16-google-adwords-campaign-view.png "google-adwords-campaign-view.png")

2. Click the red campaign button, and create a new Shopping Campaign.
3. On the Shopping Ads Setup page, make sure the correct Merchant Identifier is selected (this should match the value in your Merchant Center Dashboard).
4. Complete the ad configuration and name your ad group.
5. You should see your new Campaign and Ad Group.

Adwords will automatically pull products from your Primary Feeds defined in Google Merchant Center for these Shopping campaigns.

## Tracking Web-Only Campaigns

If you are running campaigns that are web-only, you can still use Branch Ad Links to track that campaign. Be sure to add the following tags:

| Tag | Details |
| --- | --- |
| `~campaign` | This must match the campaign name in Google Ads |
| `~campaign_id` | This is used to avoid duplicating clicks |

Additional details can be found in our [SAN Web Tracking guide](san-web-tracking.md).

## Video Ads Specifics

Branch supports the measurement of the following touch types for Video Ads:

- Impression
- Click
- When a user watches a skippable video for 10 seconds or more this [Engaged View](https://support.google.com/google-ads/answer/10048752?hl=en#) is sent as a "click" by Google Ads.

  - In other words, Google bundles clicks and engaged views into engagements for iOS.

    - Android Engaged View: `engaged_view`
    - iOS Click/Engaged View: `engagement`

This documentation supports the following Google Campaign types:

| Google Campaign | Campaign Type/Objective | Branch Ad Format |
| --- | --- | --- |
| Video | Standard - Instream | Cross-platform Search |
| Video | Standard - Bumper | Cross-platform Search |
| Video | Mobile App Install - Instream | App Only: Install |

#### OS Support and Major Differences

| Platform/OS | Supported by Adwords Video Ads? |
| --- | --- |
| Web | Yes |
| iOS | Yes |
| Android | Yes |

## FAQ

#### What is Parallel Tracking?

![](/img/0ef254b-new-parallel-tracking.png "new-parallel-tracking.png")

With the change to “parallel tracking”, Google sends the customer directly to the Final URL, and uses the new Beacon API to "click" the Tracking URL (including following any server side redirects) in the background. The key here is that the Tracking URL (and redirects) are still being visited by the end user's browser, but because this happens “in parallel” (i.e., not visible to the customer), the user experience is better. For browsers without Beacon API support, Google will fall back to legacy sequential tracking.

##### How does Parallel Tracking work?

If you are running a Universal App Install Campaign, parallel tracking does not come into play as this campaign type directs users solely to the respective app store and does not include a third party link.

If you are running a non-UAC Web-based Ad (Display, Search, Shopping, Video), and using a Branch Link as `Tracking Template`, parallel tracking ensures your users are directly routed to the final destination while also allowing Branch to properly measure and attribute the resulting actions/conversions.

![](/img/e29ad03-google-ads-non-uac.png "google-ads-non-uac.png")

##### How does this impact me?

Attribution is unaffected because, although the Branch link is no longer the referring URL to the domain, parallel tracking still allows Branch link clicks to happen. This means the Branch Match ID parameter is still appended to the link that is being "clicked", and Branch can still store (and access) the Match ID in local storage because the web SDK can still load and read query parameters, even in the background.

Furthermore, this is in line with Google & Safari’s expectations of how clicks should be tracked (i.e., using query parameters instead of third-party cookies), and is compliant with current policy.

#### Why is my ad being disapproved on Google Ads?

For Video Campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

For Cross Platform campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to your Final destination URL specified in the ad. Please ensure that your Branch link redirects to your Final URL specified in your ad. To ensure install tracking is functional please ensure that for the Branch link you're using to track installs, Deepviews are disabled and your Branch link's iOS/Android redirects are set to their respective App / Play Store.

#### How does changing my URL to a Branch Link affect my Quality Score in Google Ads?

Whenever you make changes to an ad in Google Ads in any way, be it landing page or ad copy, the history of the ad resets and the quality score calculation starts over. However, after the ad is built again with a Branch link, deep linking improves the conversion rate, so the ad quality score should improve once you start using a Branch link. The best practice of making changes to an ad is to always create a new ad unit.

#### Does Branch Links work in Google Web Stories

Yes, you may use [Branch Short Links](create-quick-links.md) in Google Web Stories for both deep linking and attribution.
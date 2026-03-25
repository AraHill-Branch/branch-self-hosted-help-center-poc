---
title: "Facebook Traffic and Conversion Ads"
slug: facebook-traffic-and-conversion-ads
---

## Overview

Branch Links can be used together with Facebook Traffic and Conversion ads, allowing you to track engagement with your advertisements and ad-driven installs which deep link new users directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

| Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format |
| --- | --- | --- |
| Consideration | Traffic | Cross-platform Display |
| Conversion | Conversions | Cross-platform Display |

##### Facebook Campaign Advert Format Support Table

| Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Traffic | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎ |
| Conversion | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎ |

::: info Facebook Campaign Types
Looking for other Facebook Ad campaign types? Please check out our [Facebook Ads Overview guide](facebook-ads-overview.md).
:::

## Setup

::: tip Prerequisites
- To track installs from Facebook Ads you should [integrate the Branch SDK](native-sdks-overview.md) into your app.
- To use Branch Links in Facebook App Install Ads ensure you have:

  - URI schemes configured on iOS
  - URI schemes configured on Android
  - iOS App Store ID set
  - Android Package Name set
  - Social Media Settings filled out (i.e. OG tags at the bottom of [Link Settings](configure-default-link-behaviors.md#4-social-media-preview)
- If you want to deep link from your ads directly to content, you should [configure deep link routing](in-app-routing.md).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality."
:::

##### Enable Facebook as an Ad Partner (for measurement)

::: info Enable Facebook as an Ad Partner
Completing this section -- **Enable Facebook as an Ad Partner** -- will result in Branch sending app events to Facebook in order to attribute them back to ad campaigns. **This does not enable deep linking for the ad**. Further work below is required for deep linking.
:::

If you haven't enabled Facebook as an Ad Partner on the Branch dashboard follow this section to do so. Advanced options for sending events can be found [here](facebook-mmp-event-options.md).

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management).

![2770](/img/3b489ed-ads-partner-management.png "ads-partner-management.png")

2. Search for **Facebook**.
3. Click **Connect With Facebook**

![1141](/img/89701bc-1-connect.png "1-connect.png")

4. Log in to Facebook if you are not logged in

![587](/img/0a9f81c-2-login.png "2-login.png")

5. Confirm that Branch can receive your public profile

![712](/img/07f94fb-3-profile.png "3-profile.png")

6. Confirm that Branch can have permissions `ads_read`

![712](/img/a3d3694-4-scopes.png "4-scopes.png")

`ads_read` is used to surface impressions and clicks on the Branch Dashboard.

7. Select the ad accounts for which you want to run app install ads or app engagement ads

![1137](/img/b518827-5-adaccounts.png "5-adaccounts.png")

::: info Ad Account FAQ
If you are having trouble finding or selecting the ad account(s) for which you want to run ads, please visit our [FAQ](i-cant-see-the-ad-account-i-want-to-use-at-all.md).
:::

8. Click to select a Facebook app id for which you want to run Facebook ads

![1136](/img/859cd9d-6-app-1.png "6-app-1.png")

9. Copy the app id

![1172](/img/60ae918-7-app-2.png "7-app-2.png")

10. Paste the app id and press `Save`

![1182](/img/15be351-8-app-3.png "8-app-3.png")

11. Facebook is now enabled as an ad partner!

    Note that if you have different attribution windows between Facebook and Branch, those will be highlighted. The warning has a link to the docs on how to align these attribution windows.

![487](/img/0cfe3f0-9-complete.png "9-complete.png")

12. Finally, to create a Facebook Ads link click the **Create Facebook Link** button in the top right hand corner.

![2882](/img/7299f7f-create-facebook-link.png "create-facebook-link.png")

## Create an Ad Link

::: info Optional if Running App-Only Ads
This section is optional if you are running app-only ads. We will automatically pull in campaign, ad set, ad, and creative information from Facebook. However, if you want users to be deep linked, you should follow the instructions in this section.
:::

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management) `Create Facebook Link` button under the Facebook Partner and select `Create Display Link`.

![1306](/img/133ac75-create-link-display.png "create-link-display.png")

2. Under the Define Section, pick a Link Name for later reference.
3. Configure the link with the Ad Partner set to **Facebook**, and the Ad Format set to **Cross-platform Display**.

![2350](/img/33688b8-link-setup.png "link-setup.png")

4. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android and Desktop redirects are set to the desired destinations being promoted by the ad campaign.

![1920](/img/d3e6414-example-link-redirect.png "example-link-redirect.png")

5. Under the Analytics Tags sub-section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Facebook Campaign, set the channel field to Facebook Ads and set the campaign field to the same ad campaign name used in Facebook Ads.

![2242](/img/d4b3f65-facebook-analytics-tags.png "facebook-analytics-tags.png")

::: warning Disabling Deepviews
In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews](deepviews.md) for your entire account or [disable Deepviews for one link](advanced-deepview-configurations.md#disable-per-link-deepviews).
:::

::: info Optional: Deep Link Data
You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](in-app-routing.md) page to learn more.
:::

### Traffic Campaign Setup

##### Configure an Ad

To set up a Facebook Traffic campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook Traffic Campaign information is available [**here**](https://www.facebook.com/business/ads-guide/traffic).

##### Create Your Campaign

1. Navigate to <https://www.facebook.com/ads/create> while logged in to the account that owns your Facebook app.
2. Select **Traffic** as the campaign marketing objective.

![1926](/img/2afc32f-campaign-selection.png "campaign-selection.png")

3. Select either to drive traffic to your `Website` or your `App`
4. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
5. Now select an advertisement format and customize your ad
6. Add your Branch Ad Link to your advertisement

- If you chose to drive traffic to an App, locate the **Deep Link** field and copy and paste your Branch link there.

![1894](/img/9a8688f-link-setup-app.png "link-setup-app.png")

- If you chose to drive traffic to a Website, paste your Branch Ad link into the **Website URL** field.

![1914](/img/8f169d5-link-setup-web.png "link-setup-web.png")

- If you chose to drive traffic to a Website and are using a full-screen Canvas, add your Branch Ad link as the **Destination URL** for your canvas advertisement components.

7. Complete the rest of the ad campaign setup.

::: info Optional: Ad formats with Multiple Links

::: info Optional: Ad formats with Multiple Links
Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.
:::

:::

### Conversions Campaign Setup

##### Configure an Ad

To set up a Facebook Conversions campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook Conversions Campaign information is available [**here**](https://www.facebook.com/business/ads-guide/conversions).

::: warning Prerequisites
As a prerequisite, Facebook requires you to report events about your users interacting with your content, for example: viewing, adding to cart, and purchasing. To add the Facebook Pixel to your website, and event tracking using the Branch SDK (which forwards to Facebook) to your app, follow these instructions:
:::

- [Sending App Events with the Branch SDK](tracking-other-conversion-events-with-facebook.md)
- [Sending Web Events with the Facebook Pixel](https://developers.facebook.com/docs/marketing-api/facebook-pixel/v2.8)

##### Create Your Campaign

1. Navigate to <https://www.facebook.com/ads/create> while logged in to the account that owns your Facebook app.
2. Select **Conversions** as the campaign marketing objective.

![1926](/img/061edf9-campaign-selection.png "campaign-selection.png")

3. Select either to have the goal of having conversions on a `Website` or in an `App`
4. Continue with campaign creation selecting an audience, placement, and budget. Then press continue to enter the Advert creation step.
5. Now select an advertisement format and customize your ad
6. Add your Branch Ad Link to your advertisement

- If you chose app conversions App, copy and paste your [Branch ad link for deep linking]/using-branch/docs/facebook-app-install-ads#create-an-ad-link-for-deep-linking) into the **Deep Link** field.

![1894](/img/9419a5e-link-setup-app.png "link-setup-app.png")

- If you chose Website conversions, paste your Branch Ad link into the **Website URL** field.

![1914](/img/e4919b3-link-setup-web.png "link-setup-web.png")

- If you chose Website conversions and are using a full-screen Canvas, add your Branch Ad link as the **Destination URL** for your canvas advertisement components.

7. Complete the rest of the ad campaign setup.

Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

### View Your Data

The [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard provides an interactive time series graph and table to view the performance of your Ad campaigns.

![2596](/img/3ae75c3-trends-graph.png "trends-graph.png")

The table shows summary data on the performance of each Ad campaign. On the right top side of the table you can find a **download button** to retrieve the chart's content as a CSV file.

![2590](/img/8dea4cd-events-table.png "events-table.png")

::: info Interacting with your data
Breakdown and compare aspects of your Ad campaigns' performance by using the `Compare by +` button to add a parameter to split the data displayed data by.
:::

Then use the `and +` button to refine the data displayed to gain deeper insight into the performance of your Ad campaigns.

## Engagement Metrics

You can view data for view-through engagement ([engaged view](https://www.facebook.com/business/help/1055388958765938)) conversion metrics for Facebook through Branch Dashboard reports and exports:

| Report/Export | Parameter | Value |
| --- | --- | --- |
| Dashboard Report | `touch subtype` | `engaged_view` |
| Dashboard Custom Exports | Column | Touch Subtype |
| Custom Exports API | `fields` | `last_attributed_touch_data_tilde_touch_subtype` |

## Troubleshooting

We now have a dedicated [FAQ page for Facebook app ads](sources-of-discrepancies-between-facebook-and-branch.md). If you are having any issues with app ads, please review the FAQ.

If you are having issues with web-only ads, you can check out the FAQ.
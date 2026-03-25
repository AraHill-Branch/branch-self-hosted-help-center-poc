---
title: "Facebook Platform Ads"
slug: facebook-platform-ads
---

## Overview

Branch Links can be used together with a variety of Facebook ads, allowing you to track ad performance on the Branch dashboard and to deep link new users from ad-driven installs directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

| Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format |
| --- | --- | --- |
| Awareness | Brand Awareness | Cross-platform Display |
| Awareness | Reach | Cross-platform Display |
| Consideration | Video Views | Cross-platform Display |
| Consideration | Lead Generation | Cross-platform Display |

#### Facebook Campaign Advert Format Support Table

| Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Brand Awareness | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎ |
| Reach | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎ |
| Video Views |  | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎ |
| Lead Generation | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  |  |

::: info Facebook Campaign Types
Looking for other Facebook Ad campaign types? Please check out our [Facebook Ads Overview guide](facebook-ads-overview.md).
:::

## Setup

::: warning Prerequisites
- To track installs from Facebook Ads you should [integrate the Branch SDK](native-sdks-overview.md) into your app.
- To use Branch Links in Facebook App Install Ads ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, check out [Universal](https://help.branch.io/developers-hub/docs/ios-universal-links) and [App Links](https://help.branch.io/developers-hub/docs/android-app-links).
- If you want to deep link from your ads directly to content, you should [configure deep link routing](deep-linking.md).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality."
:::

#### Enable Facebook as an Ad Partner (for measurement)

::: info Enable Facebook as an Ad Partner
Completing this section -- **Enable Facebook as an Ad Partner** -- will result in Branch sending app events to Facebook in order to attribute them back to ad campaigns. **This does not enable deep linking for the ad**. Further work below is required for deep linking.
:::

If you haven't enabled Facebook as an Ad Partner on the Branch Dashboard follow this section to do so. Advanced options for sending events can be found [here](facebook-faq-and-advanced-options.md).

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management).



2. Search for **Facebook**.
3. Click **Connect With Facebook**



4. Log in to Facebook if you are not logged in



5. Confirm that Branch can receive your public profile



6. Confirm that Branch can have permissions `ads_read`



`ads_read` is used to surface impressions and clicks on the Branch Dashboard.

7. Select the ad accounts for which you want to run app install ads or app engagement ads



::: info Ad Account FAQ
If you are having trouble finding or selecting the ad account(s) for which you want to run ads, please visit our [FAQ](https://help.branch.io/faq/docs/i-cant-see-the-ad-account-i-want-to-use-at-all).
:::

8. Click to select a Facebook app id for which you want to run Facebook ads



9. Copy the app id



10. Paste the app id and press `Save`



11. Facebook is now enabled as an ad partner!

    Note that if you have different attribution windows between Facebook and Branch, those will be highlighted. The warning has a link to the docs on how to align these attribution windows.



12. Finally, to create a Facebook Ads link click the **Create Facebook Link** button in the top right hand corner.



##### Create an Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s **Create Facebook Link** button under the Facebook Partner and select **Create Display Link** or **Create Display Link** depending on your campaign type.



2. Pick a Link Name for later reference.
3. Configure the link the Ad Partner set to **Facebook** and the Ad Format set to **Cross-Platform Display** or **Cross-platform Display**.



4. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android and Desktop redirects are set to the desired destinations being promoted by the ad campaign.



5. Under the Analytics Tags sub-section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Facebook Campaign, set the channel field to Facebook Ads and set the campaign field to the same ad campaign name used in Facebook Ads.

.png")

::: warning Disabling Deepviews
In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews]((/using-branch/docs/deepviews) for your entire account or [disable Deepviews for one link](deepviews.md).
:::

::: info Optional: Deep Link Data
You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](deep-linking.md) page to learn more.
:::

#### Brand Awareness Campaign Setup

##### Configure an Ad

To set up Facebook Brand Awareness Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad.

##### Create Your Campaign

1. Navigate to <https://www.facebook.com/ads/create> while logged in to the account that owns your Facebook app.
2. Select **Brand Awareness** as the campaign marketing objective.



3. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
4. Now select an advertisement format and customize your ad
5. Now add your Branch Link to your advertisement

   - Select the **Add a Website URL** checkbox and copy your Branch Ad Link into the **Website URL** field.



```
- If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the <span class="notranslate">**Destination URL**</span> for your canvas advertisement components
```

6. Complete the rest of the ad campaign setup.

::: info Optional: Ad formats with Multiple Links

::: info Optional: Ad formats with Multiple Links

::: info Optional: Ad formats with Multiple Links
Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.
:::

:::

:::

#### Reach Campaign Setup

##### Configure an Ad

To set up Facebook Reach Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad.

##### Create Your Campaign

1. Navigate to <https://www.facebook.com/ads/create> while logged in to the account that owns your Facebook app.
2. Select **Reach** as the campaign marketing objective.



3. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
4. Now select an advertisement format and customize your ad
5. Now add your Branch Link to your advertisement

   - Select the **Add a Website URL** checkbox and copy your Branch Ad Link into the **Website URL** field.



```
- If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the <span class="notranslate">**Destination URL**</span> for your canvas advertisement components
```

6. Complete the rest of the ad campaign setup.

Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

#### Video Views Campaign Setup

##### Configure an Ad

To set up Facebook Video Views Campaigns, you will need to insert your Branch Display Ad Link as the Website destination for the created ad.

##### Create Your Campaign

1. Navigate to <https://www.facebook.com/ads/create> while logged in to the account that owns your Facebook app.
2. Select **Video Views** as the campaign marketing objective.



3. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
4. Now select an advertisement format and customize your ad
5. Now add your Branch Link to your advertisement

   - Select the **Add a Website URL** checkbox and copy your Branch Ad Link into the **Website URL** field.

.png")

```
- If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the <span class="notranslate">**Destination URL**</span> for your canvas advertisement components
```

6. Complete the rest of the ad campaign setup.

Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

#### Lead Generation Campaign Setup

##### Configure an Ad

To set up Facebook Lead Generation Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. After users fill out the lead form, they'll be directed to your website or app after through the Branch Ad link.

##### Create Your Campaign

1. Navigate to <https://www.facebook.com/ads/create> while logged in to the account that owns your Facebook app.
2. Select **Lead Generation** as the campaign marketing objective.



3. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
4. Now select an advertisement format and customize your ad
5. Enter the Lead form creation portal and setup your form.
6. On the final "Thank you" screen, locate and paste your Branch Ad Link into the **Website link** field.



7. Complete the rest of the ad campaign setup.

#### View Your Data

The [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard provides an interactive time series graph and table to view the performance of your Ad campaigns.



The table shows summary data on the performance of each Ad campaign. On the right top side of the table you can find a **download button** to retrieve the chart's content as a CSV file.



::: info Interacting with your data
Breakdown and compare aspects of your Ad campaigns' performance by using the `Compare by +` button to add a parameter to split the data displayed data by.
:::

Then use the `and +` button to refine the data displayed to gain deeper insight into the performance of your Ad campaigns.

### Troubleshooting

We now have a dedicated [FAQ page for Facebook app ads](facebook-faq-and-advanced-options.md). If you are having any issues with app ads, please review the FAQ.

If you are having issues with web-only ads, you can check out the FAQ.
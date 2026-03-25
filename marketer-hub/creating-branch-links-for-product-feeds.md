---
title: "Create Branch Links for Product Feeds"
slug: creating-branch-links-for-product-feeds
---

::: info Attention
Explore Branch’s new linking experience for [Web Links](https://help.branch.io/docs/create-web-links-1#view-and-manage-links) and [App Links](https://help.branch.io/docs/create-app-links-new), which offer deep linking, flexible configuration, and link analysis across multiple platforms!
:::

## Overview

A product feed or catalog is essentially an inventory of all your products and contain information like images, prices, descriptions and more. These attributes are used to define each one of your products in a unique way. Your product feed or catalog should reflect your business type, consisting of different attributes that are specific to your products.  
 Your Branch link ensures your users are taken to the correct product feed or catalog content and when used as part of your dynamic and responsive marketing efforts, they allow you to effectively engage with users who have expressed interest in a wide range of your products across both web and app.

## Prerequisites for Product Feeds

- Branch SDK
- Branch Web SDK
- Deep Link Routing set up in your Branch dashboard
- Facebook and/or Google Ads integrations enabled in your Branch Dashboard
- Link per product feed item

**If you want to support routing to your app (not just web) for Google Ads**

- Universal Links and/or App Links enabled on your primary home domain

## Google Feeds

### Creating Branch Tracking Links

::: warning IMPORTANT - MUST COMPLETE
You must include Branch Links in the **Tracking Template** field of your campaign settings **AFTER** you created your campaign
:::

::: info No Cross-Domain Redirects
Since your product feed items' landing pages must match your display URL and not contain any cross-domain redirects, you cannot put a Branch link directly in the Final URL field
:::

1. Start with your base domain.

   1. e.g. `https://example.app.link`
2. Add your deep link data as query parameters. NOTE: Be sure to URI encode each query parameter.  
    2. e.g. `https://example.app.link?product_id=123&category=shoes`
3. Add [fallback URLs](creating-a-deep-link.md#fallback-to-a-specific-url) to point to your website (i.e., Google's `{lpurl}` macro will auto-populate the final url of the ad)  
    3. e.g. `https://example.app.link?product_id=123&category=shoes&$fallback_url={lpurl}`
4. Finally, add the following analytics parameters needed to categorize your data accurately.

   1. [Generic Branch Analytics Parameters](creating-a-deep-link.md)
   2. Google Ads Analytics Parameters:

|  |  |
| --- | --- |
| **Parameter** | **Value** |
| $3p | a\_google\_adwords |
| ~advertising\_partner\_name | Google AdWords |
| $one\_time\_use | false |
| ~branch\_ad\_format | Cross-Platform Display OR App Only |
| ~channel | Display OR Shopping |
| ~feature | paid advertising |
| ~campaign | &#123;&#123;campaign.name&#125;&#125; |
| ~ad\_id | &#123;&#123;ad.id&#125;&#125; |
| ~ad\_set\_id | &#123;&#123;adset.id&#125;&#125; |
| ~campaign\_id | &#123;&#123;campaign.id&#125;&#125; |

Your Branch long link for Google Ads should look like this:

```
https://example.app.link?product_id=123&category=shoes&$fallback_url=https://branch.io/universal-ads/&$3p=a_google_adwords&~advertising_partner_name=Google-Adwords&$one_time_use=false&branch_ad_format=Cross-Platform Search&~channel=Google Adwords&~feature=paid advertising&~ad_set_id={adgroupid}&~campaign_id={campaignid}&~keyword={keyword}&~placement={placement}&~gclid={gclid}&~lpurl={lpurl}&$android_deepview=false&$ios_deepview=false&$desktop_deepview=false&$android_passive_deepview=false&$ios_passive_deepview=false
```

### Creating a Google Feed

The type of feed you create should match the business type you selected when creating your Dynamic remarketing campaign. Use the "Custom" feed only if the other business types don't apply to your products or services.  
 Please refer to Google’s [Create a feed for your responsive ads](https://support.google.com/google-ads/answer/6053288?hl=en&ref_topic=3180758) for the following:

- About feeds
- Get feed templates and specs for your business type
- Create and upload a new feed
- Fix problems with your feed

#### Placing your Link in the Product Feed

::: info Opening the Mobile App
If you are using Universal links and/or Android App links on your primary domain, including those links in the `link` column will result in the app opening for users with the app installed. By default, all links will open your webpage in your mobile browser, unless Universal Links and/or Android App links are enabled on your primary domain.
:::

When creating your product feed, one of the required parameters is the `link` parameter. The `link` parameter is typically a URL link to merchant's site (website landing page) where you can purchase or learn more about the item.

### Uploading Your Feed to Google Ads

There are limits to the number of feeds and feed items per account. Learn more [About Google Ads account limits.](https://support.google.com/google-ads/answer/6372658)

To upload your product feed to Google Ads, please follow Google’s help document on [Create a feed for your responsive ads](https://support.google.com/google-ads/answer/6053288?hl=en&ref_topic=3180758).

If you're a retail business, use the [Google Merchant Center to upload your product feed](https://support.google.com/merchants/answer/188477).

To include your Branch long link in the campaign's settings:

1. Once you've created your campaign, go into the campaign's **Settings**.
2. On the **Settings** page, expand the **Campaign URL options** section.
3. In the **Campaign URL options** section, place the Branch long link in the **Tracking Template** field.
4. Click **Save**.

.png "tracking-template.png")

## Facebook Data Feeds

### Creating Branch Links

As each product in your product feed is unique, each requires its own Branch link to ensure the user is not only taken to the correct content, but for Branch to correctly attribute the event.

The best way to create Branch deep links for your product feed is to create a "long link" for each product feed item.

To create a Branch link:

1. Start with your base domain.
2. e.g. `https://example.app.link`
3. Add your deep link data as query parameters. NOTE: Be sure to URI encode each query parameter.
4. e.g. `https://example.app.link?product_id=123&category=shoes`
5. Add any fallback URLs to ensure proper routing if the app isn't installed.
6. e.g. `https://example.app.link?product_id=123&category=shoes&$fallback_url=https%3A%2F%2Fbranch.io%2Funiversal-ads%2F`
7. Finally, add the following analytics parameters needed to categorize your data accurately.
8. [Generic Branch Analytics Parameters](creating-a-deep-link.md)
9. Facebook Analytics Parameters:

|  |  |
| --- | --- |
| **Parameter** | **Value** |
| $3p | a\_facebook |
| ~advertising\_partner\_name | Facebook |
| $one\_time\_use | false |
| ~branch\_ad\_format | Cross-Platform Display OR App Only |
| ~channel | Facebook |
| ~feature | paid advertising |
| ~campaign | &#123;&#123;campaign.name&#125;&#125; |
| ~ad\_id | &#123;&#123;ad.id&#125;&#125; |
| ~ad\_set\_id | &#123;&#123;adset.id&#125;&#125; |
| ~campaign\_id | &#123;&#123;campaign.id&#125;&#125; |

Your final link for Facebook looks like this:

```
https://example.app.link?product_id=123&category=shoes&$fallback_url=https%3A%2F%2Fbranch.io%2Funiversal-ads%2F&%243p=a_facebook&~advertising_partner_name=Facebook&%24one_time_use=false&branch_ad_format=App%20Only&~channel=Facebook&~feature=paid%20advertising&~campaign=%7B%7Bcampaign.name%7D%7D&~ad_id=%7B%7Bad.id%7D%7D&~ad_set_id=%7B%7Bad.set.id%7D%7D&~campaign_id=%7B%7Bcampaign.id%7D%7D
```

### Creating a Facebook Data Feed

There are several different methods to add items to your catalog. One method is to use a data feed, which allows you to add many items to your catalog at once. A data feed is a spreadsheet file where you enter information about your inventory.  
 Please refer to Facebook’s Ads documentation for the following:

- [Add Catalog Items with a Data Feed](https://www.facebook.com/business/help/125074381480892)
- [Use a Data Feed Template](https://www.facebook.com/business/help/1898524300466211)
- [Data Feed Columns](https://developers.facebook.com/docs/marketing-api/catalog-feed-setup#da-commerce)
- [Troubleshoot Data Feeds](https://www.facebook.com/business/help/2041876302542944)

### Placing your Link in the Product Feed

Once you’ve created a Branch long link for each item in your product feed, you need to include these links in your product feed file before uploading it to Facebook.

When creating your product feed, one of the required parameters is the `link` parameter. The `link` parameter is typically a URL link to merchant's site (website landing page) where you can purchase or learn more about the item.

When using Branch long links for Facebook - that already contain all of the proper routing given multiple scenarios - you must substitute your website landing page URL with your Branch long link.

### Uploading Your Feed to Facebook

We recommend using [Facebook’s Product Feed Debug Tool](https://business.facebook.com/ads/product_feed/debug) to test and debug your Product Feed format. The largest file size accepted by the tool is 50MB.

To upload your product feed to Facebook, please follow Facebook’s help document on [Add Catalog Items with a Data Feed](https://www.facebook.com/business/help/125074381480892).
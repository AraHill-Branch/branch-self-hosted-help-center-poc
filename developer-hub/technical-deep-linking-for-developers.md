---
title: "Deep Linking for Developers"
slug: technical-deep-linking-for-developers
---

![](/img/0b1e745-Contextual_Deep_Link(1).png "Contextual_Deep_Link.png")

## Overview

Branch deep linking gives you peace of mind that your links will work in every edge case to route users to the best destination with the industry's highest matching accuracy, by combining every deep linking standard into a single, simple package. Easy to implement, and always up to date.

### Deep linking use cases:

- Direct deep linking users who have the app installed already to relevant content.
- Deferred deep linking users who do not have the app installed to relevant content immediately after the first install.
- Customized/branded URLs.
- Store custom data parameters in link data.

## How does it work?

1. User clicks a link.

   1. If user has the app installed, then the app opens and routes to relevant content.
   2. If user doesn't have the app installed, then:

      1. User is routed to App/Play store to download the app, then routed to relevant content when they open the app, or
      2. User is routed to relevant mobile web content.

## Integration guide

#### 1. Implement the Branch SDKs to your mobile app

Please visit our [Native SDK Overview page](https://help.branch.io/developers-hub/docs/native-sdks-overview) to learn how to implement the Branch SDK on both iOS and Android.

#### 2. Set up deep link routing

How your mobile app is routing to in-app content will determine how you will create and tag your Branch Links.

- [Build custom routing inside the routing callback](in-app-routing.md#option-1-build-custom-routing-inside-the-routing-callback)
- [Let Branch use your existing deep link routing](in-app-routing.md#option-2-let-branch-use-your-existing-deep-link-routing)

#### 3. Create your Branch Link

Branch Link creation options:

- [Short Link](create-quick-links.md)

  - Ideal for one-off campaigns, especially social media, blog posts, etc.
- [Deep Linking API](deep-linking-api.md)

  - Ideal if you are looking to programmatically generate Branch Links at scale.
- [Mobile SDKs](native-sdks-overview.md)
- [Web SDK](web-sdk-overview.md)
- [Chrome Extension](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf)

#### 4. Configure your Branch Link

When configuring your Branch Link you must make sure you are adding the correct key/value pairs to the data dictionary to ensure they make it into the app when it opens from a Branch Link click.

![](/img/8d644e6-Screen_Shot_2021-09-28_at_1.42.10_PM(1).png "Screen Shot 2021-09-28 at 1.42.10 PM.png")Additional details on configuring your Branch Link can be found [here](creating-a-deep-link.md).

#### 5. Test your Branch Link

Click the Branch Link on your mobile device and it should go through the flow outlined on the [How Does It Work?](deep-linking.md#how-does-it-work) page.

#### 6. Set up NativeLink™ Deferred Deep Linking (optional)

For NativeLink™ Deferred Deep Linking, please follow our guide [here](nativelink-deferred-deep-linking.md).

## Best practices

### Deep link routing with `$canonical_url`

A canonical URL is a Branch referred term that represents the corresponding web URL for the in-app content. If your app can already deep link using web URLs, it is recommended to use the $canonical\_url key with the web URLs value for deep linked routing for the app. This reduces the level of effort as $canonical\_url is often automatically applied as Branch Link data for products like Journeys and Email; therefore, there is not an additional need to add extra data to a link.

For example, a shopping brand that has both a website and a mobile app will have equivalent experiences for the user to get to related content and it can be identified with a canonical URL. A web URL might look something like this:

`https://www.myshop.com/category/productName`

For a hotel/travel brand, a canonical URL might look something like this:

`https://www.mytravel.com/Hotel-Search?rooms=1&adults=2&destination=Bangkok%20(BKK%20-%20Suvarnabhumi%20Intl.)&regionId=4934466&latLong=13.687353%2C100.74995&startDate=2021-09-23&endDate=2021-09-24&d1=2021-09-23&d2=2021-09-24`

The different parts of the URL can be used for deep linking the user to in-app content.

### Open Graph tags in Branch Links

When creating your Branch Link, you can add [Open Graph](https://ogp.me/) tags to enhance its look and feel in a social graph. Adding these tags should make your Branch Link look better in channels like SMS or on social media posts. The following tags can be used in your Branch Link:

| Open Graph Key | Description |
| --- | --- |
| `$og_title` | The title of your object as it should appear within the graph. |
| `$og_description` | A one to two sentence description of your object. |
| `$og_image_url` | An image URL which should represent your object within the graph. |

This is automatically set when setting the Social Media Tags if you are creating a Branch Short Link or scraped when setting `$original_url`, `$desktop_url`, or `$fallback_url`.

::: warning Caution
`$original_url` is set in the Link Template, which will automatically add the `$canonical_url` with the same value. However, `$canonical_url` is NOT directly scraped for setting the Social Media Tags.
:::

![](/img/e174b97-Screen_Shot_2021-09-28_at_2.22.55_PM(1).png "Screen Shot 2021-09-28 at 2.22.55 PM.png")

## Testing and troubleshooting

Please use the following guides for testing and troubleshooting your deep links:

- Android

  - [Testing](android-testing.md)
  - [Troubleshooting](android-troubleshooting.md)
- iOS

  - [Testing](ios-testing.md)
  - [Troubleshooting](ios-troubleshooting.md)
---
title: "Deep Linking Reference for Marketers"
slug: marketer-deep-link-reference
---

## Overview

This article includes the information that a marketer needs to create deep links using Branch.

## How deep linking works

Deep linking is a technology that allows URLs to send users directly to specific content within a mobile app, rather than just the app's home screen. Branch is a platform that specializes in making this seamless across all devices and scenarios. Our links work whether the user has the app installed or not, and they handle the complexity of routing users to the right place on iOS, Android, or web.

Branch supports deferred deep linking. With this, if someone needs to install the app first, the deep link remembers where they were trying to go and takes them to that specific content once the app opens.

## How Branch Links work

App links are deep links that take users to specific pages in your app. Web links are web-only Short Links that work everywhere. Web and app links look the same (yourbrand.com/slug or yourbrand.app.link/slug) depending on if you choose to use a custom domain or a Branch-provided [app.link](http://app.link) domain.

Ad Links are deep links that provide you with full attribution and analytics across email, referrals, paid advertising, social, organic search, and desktop-to-mobile. If you are running paid advertising campaigns, you'll want to create an Ad Link so we can accurately attribute resulting app conversions to the appropriate advertising partner. Branch Ad Links support Android App Links, and iOS Universal Links, as well as web and app conversions.

### Expected behavior for web links

If your end user does not have your app installed, or if you don’t have an app, the link will open in their default web browser. If they do have your app downloaded, the link will open in your app through an in-app web view.

Read our Create Web Links article to learn more about app links.

### Expected behavior for app links

If your end user has your app installed, the App Link will deep link to the specific app page you’ve chosen. If they do not have your app installed, they will taken to the redirect destination for non-app users which can be configured as a web page, a Branch Deepview, or the app store listing to download the app.

### Expected behavior for Ad Links

### Long links

Long links can be created without a network call to Branch. Long links need [link data](creating-a-deep-link.md#configure-deep-links) to be added as a query string. Be sure to URI encode any URLs in the link.

- Existing link example: `https://example.app.link/fzmLEhobLD?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F` or
- Dynamic link example: `https://example.app.link/?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F` .

Long links need a `/a/` and a [Branch Key](profile-settings.md) if you use a custom domain.

- Existing link example: `https://link.example.com/5NPh/p4M09KRLrD?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`
- Dynamic link example: `https://link.example.com/a/key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`

When adding `tags` to a dynamic link, enter each tag separately. For example: `https://example.app.link/?foo=bar&~tags=tag1&~tags=tag2`

## Before you begin

You can set up a custom domain in Branch or you can use the Branch-provided app.link domain. If you want in-app web views to work, you must have the latest version of the Branch SDK installed.

### Set up a custom domain (optional)

You can set up a custom domain (for example, link.yourbrand.com) in Branch. Read our [Advanced Settings & Changing Link Domain](advanced-settings-configuration.md) article to learn how.  
  
After you set up your custom domain, you can use it to create branded web Short Links.

### Set up app integration

You must have the latest version of the Branch SDK (latest update May 15, 2025) installed for app links to work. This setup requires a developer.

Read the following articles to learn more:

- [Branch SDK Overview](https://help.branch.io/developers-hub/docs/native-sdks-overview)
- [Branch iOS SDK Overview](https://help.branch.io/developers-hub/docs/ios-sdk-overview)
- [Branch Android SDK Overview](https://help.branch.io/developers-hub/docs/android-sdk-overview)

## Validate deep link behavior

Use the [Link Validator](link-validator.md) to view the expected and actual behavior of your links=.
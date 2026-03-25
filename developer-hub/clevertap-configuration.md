---
title: "CleverTap Configuration"
slug: clevertap-configuration
---

*[Image: 1328]*

## Overview

Clevertap personalization links work with the following ESPs:

1. Amazon SES
2. Mailgun
3. Mandrill
4. Sendgrid

Use the corresponding guides below to set up CleverTap with your ESP.

## How does it work?



1. User clicks on a link in an email from their mobile mail client (Gmail, Apple Mail, etc.)
2. If the user has the app installed and the link has a corresponding screen in the app, the app will open and deep link the user to the right content.

   - Ex. Product detail page, category shopping page, etc.
3. If the user does not have the app installed or the link only corresponds to a screen on the web, the user is routed to the website using their default mobile web browser.

   - Ex. Unsubscribe link, privacy policy, etc.
4. Obtained or set up your CleverTap **click tracking domain** (CTD). Reach out to your CleverTap account manager for assistance on this.

## Prerequisites

::: info Required Roles
Branch's Branch Email requires the following roles involved in order to enable:

- Developers
- CRM/Email Team
- CleverTap Account Manager / Support Team
:::

In order to enable CleverTap, you must first:

1. Have admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Engagement [product](packaging.md) enabled for your Branch Account.
3. Implement the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - Set Up Deep Link Routing. How your mobile app routes to in-app content will determine how you will create and tag your Branch Links.

     - [Build custom routing inside the routing callback](in-app-routing.md#option-1-build-custom-routing-inside-the-routing-callback)
     - [Let Branch use your existing deep link routing](in-app-routing.md#option-2-let-branch-use-your-existing-deep-link-routing)
   - [Track events](track-branch-events.md)
4. Review our [Email Overview](email-overview.md) and [Basic Email Integration Guide](email-integration-guide.md) to understand the feature and our integrations.

## Enable and Configure CleverTap

### Enable CleverTap

::: danger COMPLETE THE Branch Email INTEGRATION GUIDE
Before you can start sending Branch Links in your emails with Clevertap, you must complete the standard [Branch Email Integration Guide](universal-email-integration-guide.md).
:::

### Configure CleverTap

## 1. Set up Link Behavior

Once you have completed the ESP configuration, you can start adding CleverTap links to the email body.

With your ESP make sure to add the URL parameter `$follow_redirect=true` to every CleverTap link in the email body. This will indicate to Branch that this link is a CleverTap link. As soon as Branch detects this parameter Branch backend will follow the Clevertap link, receive personalization data from their servers, and send it to the mobile App/Web.

## 2. Disable HTML Sanitization

CleverTap uses an HTML editor for creating email bodies. It has been observed that CleverTap editors  
 scrape our deep link parameter such as `universal=”true”` or `deeplink=”true”` from the URL which causes the deep links to fail.

By disabling Clevertap's HTML sanitization, the above parameters are not scraped/removed from the link.

Before you go live with your campaign, please reach out to your CleverTap account manager and ask them to disable the HTML Sanitization. This will usually take 3 -4 working days to turn off. Please plan accordingly.

## 3. Send Deep Links via Email Editor

You can use the HTML and Custom HTML (Dynamic Content) elements available in the drag and drop editor to form and embed deep links in your email.

## Add Branch Links to your Emails

CleverTap personalization links work with the following ESPs:

## Amazon SES

**1. Create Flagged Links**

Before you start setting up your email campaigns, you need to determine what flow you want the user to experience and flag your email link accordingly.

Use the following markup for the links to work properly:

- **Deep linking users to in-app content**: add `$deep_link=true` to your links as a query parameter
- **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter

**2. Configure Clevertap**

Please follow all of the [Configure Clevertap](clevertap-data.md#configure-clevertap) steps to ensure everything is working properly before you go live.

## Mailgun

**1. Create Flagged Links**

Before you start setting up your email campaigns, you need to determine what flow you want the user to experience and flag your email link accordingly.

Use the following markup for the links to work properly:

- **Deep linking users to in-app content**: add `deeplink="true"` to the HTML
- **Linking users to web-only content**: No need to add anything

**2. Configure Clevertap**

Please follow all of the [Configure Clevertap](clevertap-data.md#configure-clevertap) steps to ensure everything is working properly before you go live.

## Mandrill

**1. Create Flagged Links**

Before you start setting up your email campaigns, you need to determine what flow you want the user to experience and flag your email link accordingly.

Use the following markup for the links to work properly:

- **Deep linking users to in-app content**: add `$deep_link=true` to your links as a query parameter
- **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter

**2. Configure Clevertap**

Please follow all of the [Configure Clevertap](clevertap-data.md#configure-clevertap) steps to ensure everything is working properly before you go live.

## Sendgrid

**1. Create Flagged Links**

Before you start setting up your email campaigns, you need to determine what flow you want the user to experience and flag your email link accordingly.

Use the following markup for the links to work properly:

- **Deep linking users to in-app content**: add `universal="true"` to the HTML
- **Linking users to web-only content**: No need to add anything

**2. Configure Clevertap**

Please follow all of the [Configure Clevertap](clevertap-data.md#configure-clevertap) steps to ensure everything is working properly before you go live.

```
**Analytics on the Branch Dashboard**

        To see how the email campaigns have performed and break it down into campaigns, it is very essential to tag your email links with the ~campaign tag. If your team uses UTM tags, Branch will also ingest the UTM_campaign tag. This will help dedupe the numbers and hence see the downstream events. You can add the campaign tag in any comparisons and filters in any Dashboard views.
```
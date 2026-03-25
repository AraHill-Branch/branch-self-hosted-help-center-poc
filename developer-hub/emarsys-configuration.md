---
title: "Emarsys Configuration"
slug: emarsys-configuration
---

![1328](/img/e45a3dc-Emarsys_branch.png "Emarsys+ branch.png")

## Overview

An omnichannel customer engagement platform built to accelerate business outcomes.

## How does it work?

![](../../../assets/media/images/7b76454b-657a-42d5-b9be-8346344136d5 "Branch Email Flow.PNG")

1. User clicks on a link in an email from their mobile mail client (Gmail, Apple Mail, etc.)
2. If the user has the app installed and the link has a corresponding screen in the app, the app will open and deep link the user to the right content.

   - Ex. Product detail page, category shopping page, etc.
3. If the user does not have the app installed or the link only corresponds to a screen on the web, the user is routed to the website using their default mobile web browser.

   - Ex. Unsubscribe link, privacy policy, etc.

## Prerequisites

::: info Required Roles
Branch's Branch Email requires the following roles involved in order to enable:

- Developers
- CRM/Email Team
- Emarsys Account Manager / Support Team
:::

In order to enable Emarsys, you must first:

1. Have admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Engagement [product](packaging.md) enabled for your Branch Account.
3. Implement the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - Set Up Deep Link Routing. How your mobile app routes to in-app content will determine how you will create and tag your Branch Links.

     - [Build custom routing inside the routing callback](in-app-routing.md#option-1-build-custom-routing-inside-the-routing-callback)
     - [Let Branch use your existing deep link routing](in-app-routing.md#option-2-let-branch-use-your-existing-deep-link-routing)
   - [Track events](track-branch-events.md)
4. Review our [Email Overview](email-overview.md) and [Basic Email Integration Guide](email-integration-guide.md) to understand the feature and our integrations.
5. Obtain or set up your Emarsys **click tracking domain** (CTD). Reach out to your Emarsys account manager for assistance on this.

## Enable Emarsys

## Emarsys Redirect

In your Emarsys admin console, set your redirect method to *HTTP*. Reach out to your Emarsys account manager if you need assistance on this.

## Connect Emarsys Service in Branch

In the Branch Dashboard in Email → [Manager tab](https://dashboard.branch.io/email/manager), find **Emarsys** and click **Enable**

![1415](/img/32228a4-f6965c7-emarsys-enable.gif "f6965c7-emarsys-enable.gif")

### Input Click Tracking Domain

Click tracking domains allow you to track engagement on email opens and link clicks.

The Emarsys integration requires you provide the following:

- **Click Tracking Domain** - The domain you use with Emarsys for links in emails  
   -**Emarsys Domain** - The domain Emarsys uses to collect data

::: warning Click Tracking Domain
- Remove `https://` when adding your click tracking domain.
- Never add the same CTD to both your **Live** and **Test** Branch environments.
- You can enable the integration with multiple CTDs, if needed, but you **cannot** add the same CTD to multiple Branch Dashboards or ESP integrations.
:::

![](/img/37be31a-ee1d502-emarsys-ctd.png "ee1d502-emarsys-ctd.png")

## Configure your App

### Add your Emarsys CTD to your Associated Domains

For your iOS App, you must add the CTD to the Associated Domains. Additional details can be found [here](ios-basic-integration.md#3-configure-associated-domains).

![](/img/9f475e3-Associated_Domains(11).png "Associated Domains.png")

### Return `YES` to `continueUserActivity`

Additionally, you will need to add the CTD to your iOS app's info.plist file. Additional details can be found [here](ios-advanced-features.md#return-yes-to-continueuseractivity).

![](/img/13dc276-branch-universal-link-domain(11).png "branch-universal-link-domain.png")

## Point DNS CNAME to Branch

Please follow your web hosting provider’s instructions on how to configure your DNS CNAME.

Update the DNS CNAME and point it to `thirdparty.bnc.lt`. Once the CNAME record is added, please allow up to an hour for Branch to generate SSL and AASA files for your click tracking domain.

**Important CNAME Info**

- The Branch dashboard must be enabled & reflect the CTD **BEFORE** you add the CNAME.
- If the CTD already has SSL setup, confirm if your security credentials allow a 3rd party to submit a CSR on behalf of the domain. If not, contact Branch's Support team, to coordinate providing an SSL certificate manually to Branch.
- Once the CNAME is added, Branch auto-generates an SSL certificate and AASA file for your click tracking domain. It may take up to an hour to resolve SSL errors once you change the CNAME. During this time, link redirects on the click tracking domain will redirect to the **Default URL** you provided in the **General Configuration** section of your account.
- If you are making this change to a live domain with active email click traffic, schedule the CNAME change to occur during an off-hours time with low click traffic.

## Add Branch Links to your Emails

Before you start sending your email campaigns, you need to determine what flow you want the user to experience and flag your email links accordingly.

### Add Deep Linking Flag

For the email links that you would like to deep link to content, add `$deep_link=true` to the URL as a query parameter, for example:

```
<a href="links.example.com?$deep_link=true" >Link to your app!</a>
```

This will ensure that your links are converted to Branch Links that will open the app on iOS and Android, with full tracking and attribution.

### Add Web-only Flag

With your email service provider, all email links will open the app by default. In order for your app to know that the email link should bounce to web after opening the app, add `$web_only=true` to your links as a query parameter, for example:

```
<a href="links.example.com?$web_only=true" >Link to your app!</a>
```

**Flag your hardcoded web-only links**  
 Web LInks like "Unsubscribe" have a hardcoded href in the email templates; thus, you are not able to append `$web_only=true` to these links. In order to account for this, we can add the `e:do-not-track=true` element in the `<a>` tag of these links such that it will use a different domain instead of the domain used for the Branch integration, for example:

```
<a e:do-not-track="true" href="http://example.com?q=link2">Unsubscribe</a>
```

These links should still be tracked in Emarsys; they are not tracked in Branch.

**Analytics on the Branch Dashboard**

To see how the email campaigns have performed and break it down into campaigns, it is very essential to tag your email links with the ~campaign tag. If your team uses UTM tags, Branch will also ingest the UTM\_campaign tag. This will help dedupe the numbers and hence see the downstream events. You can add the campaign tag in any comparisons and filters in any Dashboard views.
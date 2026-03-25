---
title: "Braze | Sparkpost Configuration"
slug: braze-sparkpost-configuration
---

![1328](/img/0832156-Braze_Sparkpost(2).png "Braze Sparkpost+ branch.png")

## Overview

The Braze platform makes messages feel more like conversations between you and your customers across channels like push, email, in-app, and more.

## How does it work?

![](../../../assets/media/images/2e51a423-7fee-4166-9e3b-142c2e0b7b9f "Branch Email Flow.PNG")

1. User clicks on a link in an email from their mobile mail client (Gmail, Apple Mail, etc.)
2. If the user has the app installed and the link has a corresponding screen in the app, the app will open and deep link the user to the right content.

   - Ex. Product detail page, category shopping page, etc.
3. If the user does not have the app installed or the link only corresponds to a screen on the web, the user is routed to the website using their default mobile web browser.

   - Ex. Unsubscribe link, privacy policy, etc.
4. Obtained or set up your Braze **click tracking domain** (CTD). Reach out to your Braze account manager for assistance on this.

## Prerequisites

::: info Required Roles
Branch's Branch Email requires the following roles involved in order to enable:

- Developers
- CRM/Email Team
- Braze Account Manager / Support Team
:::

In order to enable Braze + Sparkpost, you must first:

1. Have admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Engagement [product](packaging.md) enabled for your Branch Account.
3. Implement the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - Set Up Deep Link Routing. How your mobile app routes to in-app content will determine how you will create and tag your Branch Links.

     - [Build custom routing inside the routing callback](in-app-routing.md#option-1-build-custom-routing-inside-the-routing-callback)
     - [Let Branch use your existing deep link routing](in-app-routing.md#option-2-let-branch-use-your-existing-deep-link-routing)
   - [Track events](track-branch-events.md)
4. Review our [Email Overview](email-overview.md) and [Basic Email Integration Guide](email-integration-guide.md) to understand the feature and our integrations.

## Enable Braze + Sparkpost

## Connect Braze + Sparkpost Service in Branch

In the Branch Dashboard in Email → [Manager tab](https://dashboard.branch.io/email/manager), find **Braze Sparkpost** and click **Enable**

![1101](/img/b568ff5-be34336-braze-sparkpost-enable.gif "be34336-braze-sparkpost-enable.gif")

### Input Click Tracking Domain

Click tracking domains allow you to track engagement on email opens and link clicks.

The Braze + Sparkpost integration requires you provide the following:

- **Click Tracking Domain** - The domain you use with Braze + Sparkpost for links in emails

For additional help, please see Sparkpost's [documentation](https://www.sparkpost.com/docs/tech-resources/enabling-multiple-custom-tracking-domains/).

::: warning Click Tracking Domain
- Remove `https://` when adding your click tracking domain.
- Never add the same CTD to both your **Live** and **Test** Branch environments.
- You can enable the integration with multiple CTDs, if needed, but you **cannot** add the same CTD to multiple Branch Dashboards or ESP integrations.
:::

![](/img/a40292d-92f8477-braze-sparkpost-ctd.png "92f8477-braze-sparkpost-ctd.png")

### SparkPost proxy domain

The Braze + SparkPost integration includes an optional **SparkPost Proxy Domain** field. This is the domain SparkPost uses to proxy click tracking requests. This field may appear blank in Branch. If left blank, we automatically apply a default proxy domain behind the scenes, so your integration continues to work as expected. If SparkPost has provided you with a specific proxy domain (such as `eu.spgo.io` for EMEA accounts), enter it in this field. If you're unsure which proxy domain to use, contact your SparkPost account team for confirmation.

## Configure your app

### Add your Braze + Sparkpost CTD to your Associated Domains

For your iOS App, you must add the CTD to the Associated Domains. Additional details can be found [here](ios-basic-integration.md#3-configure-associated-domains).

![](/img/9f475e3-Associated_Domains(6).png "Associated Domains.png")

### Return `YES` to `continueUserActivity`

Additionally, you will need to add the CTD to your iOS app's info.plist file. Additional details can be found [here](ios-advanced-features.md#return-yes-to-continueuseractivity).

![](/img/13dc276-branch-universal-link-domain(6).png "branch-universal-link-domain.png")

## Point DNS CNAME to Branch

Please follow your web hosting provider’s instructions on how to configure your DNS CNAME.

Here are a few common provider’s instructions for reference:

- [AWS](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html)
- [GoDaddy](https://www.godaddy.com/help/change-a-cname-record-19237)
- [CloudFlare DNS](https://support.cloudflare.com/hc/en-us/articles/360020615111-Configuring-a-CNAME-setup)

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

**Analytics on the Branch Dashboard**

To see how the email campaigns have performed and break it down into campaigns, it is very essential to tag your email links with the ~campaign tag. If your team uses UTM tags, Branch will also ingest the UTM\_campaign tag. This will help dedupe the numbers and hence see the downstream events. You can add the campaign tag in any comparisons and filters in any Dashboard views.
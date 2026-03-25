---
title: "Activation Onboarding Guide"
slug: activation-onboarding-guide
---

## Overview

Welcome to [Branch Activation](https://help.branch.io/docs/products#activation), our enterprise solution for creating custom QR Codes and Short Links to activate customers across web and app.

With Activation, you can create shortened web and app links, as well as custom QR codes, that leverage the full power of the Branch Growth Platform.

Activation simplifies how you generate branded web links, app links, and QR codes, providing dedicated click insights and exports without requiring complex SDK setups for your web campaigns.

The information and resources in this guide will help you:

- Set up your Branch Dashboard
- Choose the right link creation method for your use case
- Test and manage your links
- View and export your data

### How Branch Links work

Web Links are web-only Short Links that work everywhere. App Links are deep links that take users to specific pages in your app. Web and App Links look the same (yourbrand.com/slug or yourbrand.app.link/slug) depending on if you choose to use a custom domain or a Branch-provided app.link domain.

#### Expected behavior for Web Links

If your end user does **not** have your app installed, or if you don’t have an app, the link will open in their default web browser. If they do have your app downloaded, the link will open in your app through an in-app web view.

#### Expected behavior for App Links

If your end user has your app installed, the App Link will deep link to the specific app page you’ve chosen. If they do **not** have your app installed, they will taken to the redirect destination for non-app users which can be configured as a web page, a Branch Deepview, or the app store listing to download the app.

## Before you begin

The questions in this section will help you decide how you want to set up Activation for your scenario. The questions you’ll need to answer depend on whether you are a new or existing Branch user.

::: info Note
To show an in-app web view for web links when a user has your app downloaded, you must update your Branch SDK to version 3.12.0 or higher for iOS and 5.18.0 for Android. If you don’t update the SDK, your app’s homepage will open using Android App Linking or Apple Universal Links.
:::

### New Branch users

If you are a new Branch user, start by answering the following questions:

1. Will you be using **a custom domain or a Branch-provided** `app.link` **domain**?

   - If you want to use a custom domain, read our [Basic Link Configuration](basic-link-configuration.md) article to learn how to set it up.

     - You can also add multiple custom domains to use for different purposes.
   - If you use the Branch-provided domain, your links will have the format `yourbrand.app.link` after implementation.
2. Will you be creating **web links, app links, or both**? You can learn more in our [Create Web Links](create-web-links.md) or [Create App Links](create-app-links.md) articles.

   1. If you’re creating app links with the intention of deep linking, you must integrate the [Branch SDK](https://help.branch.io/developers-hub/docs/native-sdks-overview) with your app.
   2. If you’re creating both, do you want to **consolidate to the same domain for web and app linking or keep them separate**?

      1. Learn more about the implications of consolidating or separating your web and app linking domains in the ["Choose web and app domains"](activation-onboarding-guide.md#choose-web-and-app-domains) section below.

### Existing Branch users

If you are an existing Branch user, start by answering the following questions:

1. Will you continue using **the same domain with Branch for shortened links or a different domain**?

   1. If you choose to use your existing domain for all links, then Activation will be enabled for your current Branch Dashboard.
   2. If you want to [use a different domain](advanced-link-configuration.md) from your current Branch domain, do you also want to **consolidate to the same domain for web and app linking or keep them separate**?

      1. Learn more about the implications of consolidating or separating your web and app linking domains in the ["Choose web and app domains"](activation-onboarding-guide.md#choose-web-and-app-domains) section below.
2. Will you be creating **web links, app links, or both**? You can learn more in our [Create Web Links](create-web-links.md) or [Create App Links](create-app-links.md) articles.

   1. If you’re creating app links with the intention of deep linking, you must integrate the [Branch SDK](https://help.branch.io/developers-hub/docs/native-sdks-overview) with your app.

### Choose web and app domains

Read the following sections to review the implications of using either the same or different web and app domains when shortening links with Activation.

#### Different web and app domains

- **All web links will open using the user’s default browser**, regardless of whether they have the app.
- **You can’t toggle between web and app destinations without using a different domain**. This means the web and app links, and the QR code would have to be updated manually if you switch between a web and app destination after you’ve already deployed the link.

#### Same web and app domains

- **Web links will open in an in-app web view** when users who already have your app click on a shortened web link.
- **You can toggle between web and app destinations without changing the Branch Link URL**. This allows you to update links after you deploy them. Imagine you have a Branch Link that goes to a webpage because the corresponding page doesn’t exist in the app. Once the app is updated to include that page, the link settings can be updated to go to an in-app destination without the need to update the QR code or Branch Link URL.

## Create links

Use the resources listed in this section to help you create links individually or in bulk.

Based on your desired link behavior and variety, use the following resources to help you create links:

- [Create Web Links](create-web-links.md)
- [Create App Links](create-app-links.md) (requires developer support)
- [Deep Link Reference](creating-a-deep-link.md)
- [Deep Linking API](https://help.branch.io/apidocs/deep-linking-api) (requires developer support)

Use the optional analytics tags fields to assign values to channel, feature, and campaign relevant to your marketing goals. These values will be used for filtering your link analytics.

To explore these concepts further, check out the following Branch University courses:

- [Link Creation & Management Made Easy](https://university.branch.io/paths/5096b210-eae4-11ee-bdd2-0293a0258cb5)
- [Engagement: Short Links](https://university.branch.io/paths/7f3f266c-3705-11ee-a8fb-06ea1e01ee1b)
- [Seamless Branding: Custom QR Codes](https://university.branch.io/paths/019098ae-8594-7ff1-9be2-aabf91cc4426)

## Test links

Use [Link Validator](link-validator.md) to test how your link will behave based on who your end user is and where they are clicking the link from.

## Export campaign data

With Activation, you can export your campaign data using Dashboard Exports, Branch’s Advanced Data Feeds, or one of the APIs included in your package.

#### Branch Dashboard

Export data as a CSV or JSON file manually from the Branch Dashboard using [Dashboard Exports](dashboard-exports.md). Choose between Daily or Custom exports to identify the best configuration of your export.

#### Included APIs

Activation includes the [Daily Exports API](https://help.branch.io/apidocs/daily-exports-api), [Custom Exports API](https://help.branch.io/apidocs/custom-exports-api), [Query API](https://help.branch.io/apidocs/query-api), [Aggregate API](https://help.branch.io/apidocs/aggregate-api), and [Cohort API](https://help.branch.io/apidocs/cohort-api). Use these APIs to export specific data and analytics.

<details>
<summary>Available export fields</summary>

The following table shows the export fields that are available with Activation:

| Field name |
| --- |
| di\_match\_click\_token |
| event\_timestamp |
| hash\_version |
| id |
| last\_attributed\_touch\_data\_custom\_fields |
| last\_attributed\_touch\_data\_dollar\_marketing\_title |
| last\_attributed\_touch\_data\_plus\_current\_feature |
| last\_attributed\_touch\_data\_plus\_touch\_id |
| last\_attributed\_touch\_data\_plus\_url |
| last\_attributed\_touch\_data\_plus\_via\_features |
| last\_attributed\_touch\_data\_plus\_web\_format |
| last\_attributed\_touch\_data\_tilde\_campaign |
| last\_attributed\_touch\_data\_tilde\_campaign\_id |
| last\_attributed\_touch\_data\_tilde\_campaign\_type |
| last\_attributed\_touch\_data\_tilde\_channel |
| last\_attributed\_touch\_data\_tilde\_customer\_campaign |
| last\_attributed\_touch\_data\_tilde\_feature |
| last\_attributed\_touch\_data\_tilde\_id |
| last\_attributed\_touch\_data\_tilde\_keyword |
| last\_attributed\_touch\_data\_tilde\_keyword\_id |
| last\_attributed\_touch\_data\_tilde\_keyword\_match\_type |
| last\_attributed\_touch\_data\_tilde\_placement |
| last\_attributed\_touch\_data\_tilde\_stage |
| last\_attributed\_touch\_data\_tilde\_tags |
| last\_attributed\_touch\_timestamp |
| last\_attributed\_touch\_timestamp\_iso |
| name |
| origin |
| request\_id |
| timestamp |
| timestamp\_iso |
| user\_data\_brand |
| user\_data\_browser |
| user\_data\_build |
| user\_data\_cpu\_type |
| user\_data\_cross\_platform\_id |
| user\_data\_developer\_identity |
| user\_data\_environment |
| user\_data\_geo\_city\_code |
| user\_data\_geo\_city\_en |
| user\_data\_geo\_country\_code |
| user\_data\_geo\_dma\_code |
| user\_data\_http\_referrer |
| user\_data\_installer\_package\_name |
| user\_data\_internet\_connection\_type |
| user\_data\_ip |
| user\_data\_language |
| user\_data\_limit\_ad\_tracking |
| user\_data\_model |
| user\_data\_opted\_in |
| user\_data\_os |
| user\_data\_os\_version |
| user\_data\_os\_version\_android |
| user\_data\_past\_cross\_platform\_ids |
| user\_data\_platform |
| user\_data\_prob\_cross\_platform\_ids |
| user\_data\_screen\_height |
| user\_data\_screen\_width |
| user\_data\_user\_agent |

</details>

#### Advanced Data Feeds

[Advanced Data Feeds](data-feeds-overview.md) is Branch’s suite of tools for exporting data which can be added on to any Branch [package](packaging.md). Use these tools if you want to export your data to other analytics services.

To explore these concepts further, check out these blog posts:

- [Which Branch Data Export Solution Should I Use?](https://www.branch.io/resources/blog/which-branch-data-export-solution-should-i-use-2/)
- [10 Essential Tips for Leveraging Branch’s Analytics Capabilities](https://www.branch.io/resources/blog/10-essential-tips-for-leveraging-branchs-analytics-capabilities/)

## Manage and maintain links

Use [LinkHub](linkhub.md) to create, manage, and deploy links at scale. You can also view click analytics for your links on the [Overview](branch-summary-page.md) page.

Use [Link Templates](link-templates.md) to manage the bulk creation of your app and web Short Links. A Link Template can be used to automatically apply attributes while creating Short Links. This can save you time and reduce the potential for errors when creating Short Links.

## FAQ

<details>
<summary>Can I change the link type from app to web and the other way around?</summary>

Yes. A link created as an app link can be switched to a web link and the other way around. The method you use to create the link does not matter when switching between app and web links.

</details>

<details>
<summary>Do I need to integrate the Branch SDK to use Activation?</summary>

Only if you want to create app links or support in-app webviews for web links.

</details>

<details>
<summary>Do shortened links expire?</summary>

Short Links created in the Branch Dashboard will never expired, even if archived. Links created with the Deep Linking API will expire 380 days after creation or the last time a user clicked it.

</details>

<details>
<summary>I am currently using Branch web-only links. Can I continue using those links?</summary>

No. There is no need to migrate existing web-only links. They will continue to function as expected. Once you update the Branch SDK to the latest version (Branch SDK version ≥ 3.12.0 on iOS, ≥ 5.18.0 on Android), web links will open an in-app webview for users with your app installed. Non-app users will be taken to the device browser.

</details>

<details>
<summary>What should I do if I don’t have the team or resources needed to implement Activation?</summary>

If your team lacks the capacity or expertise to implement the solution, our [Professional Services](https://www.branch.io/professional-services/) team can provide hands-on, tailored support to ensure a successful deployment from start to finish. We offer advisory hours to give you access to our consultants for strategic guidance, technical support, or specific project deliverables.

</details>

## Get Professional Services support

Branch’s [Professional Services](https://www.branch.io/professional-services/) team is available on a paid basis for your onboarding setup and advisory, implementation enhancement, and large strategic project execution needs. Reach out to your Branch Account Owner for more information on how Professional Services can support your Activation product usage.

## Leverage Branch University

For continued learning, [Branch University](https://university.branch.io) offers live, [expert-led training sessions](https://university.branch.io/pages/live-trainings) designed to help you master our products, sharpen your skills, and gain hands-on experience. These sessions provide an opportunity to ask questions directly to our trainers, ensuring you get the most out of the Branch Growth Platform.
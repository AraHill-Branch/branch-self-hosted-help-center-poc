---
title: "Activation Migration Guide"
slug: activation-migration-guide
---

## Overview

Welcome to [Branch Activation](https://help.branch.io/docs/products#activation), our enterprise solution for creating custom QR Codes and Short Links to activate customers across web and app.

With Activation, you can create shortened web and app links, as well as custom QR codes, that leverage the full power of the Branch Growth Platform.

Activation simplifies how you generate branded web links, app links, and QR codes, providing dedicated click insights and exports without requiring complex SDK setups for your web campaigns.

The information and resources in this guide will help you:

- Migrate your existing links from another service to Branch
- Test and manage your links
- View and export your data

### How Branch Links work

Web Links are web-only Short Links that work everywhere. App Links are deep links that take users to specific pages in your app. Web and App Links look the same (yourbrand.com/slug or yourbrand.app.link/slug) depending on if you choose to use a custom domain or a Branch-provided app.link domain.

#### Expected behavior for Web Links

If your end user does **not** have your app installed, or if you don’t have an app, the link will open in their default web browser. If they do have your app downloaded, the link will open in your app through an in-app web view.

#### Expected behavior for App Links

If your end user has your app installed, the App Link will deep link to the specific app page you’ve chosen. If they do **not** have your app installed, they will taken to the redirect destination for non-app users which can be configured as a web page, a Branch Deepview, or the app store listing to download the app.

## Before you begin

#### Determine your scenario

Complete the following tasks to determine the correct migration scenario for your use case:

1. Identify whether you will be using a custom domain or the Branch provided app.link domain. Read the “Add a custom domain” section below if you plan to use a custom domain.

   
::: info Note

::: info Note
The steps in this article only apply to links using a custom domain that you own. Branch does not support migrating links that use a domain that you don’t own (for example, bit.ly). Links that do not use a custom domain that you own must be recreated in Branch using the provide app.link domain or a custom domain.
:::

:::

2. Identify the types of links you will be migrating: web links. app links, or both. Read the “How Branch Links work” section above to learn more about each link type. If migrating app links, the Branch SDK is a required component to enable deep linking into your app.

#### Set up your Branch Dashboard

Get a new Branch Dashboard (if you’re a new user) or use your existing Branch Dashboard (if you’re an existing user). If you need a new Branch Dashboard, reach out to your Branch Account Owner to create a separate dashboard for migrated Branch Links.

#### Add a custom domain (optional)

Read our [Basic Link Configuration](https://help.branch.io/docs/basic-link-configuration#change-link-domain) article to learn how to set up a custom domain to use for Branch Links.

::: warning Caution
SSL certificate setup will cause about 5 minutes of downtime where users will see an error page, followed by temporarily redirecting to the default domain.
:::

## Migrate your links

Complete the steps in this section to migrate your links to Branch.

### Step 1: Export your links to a CSV

Export the links that are stored in your existing linking service. Transfer these links to a Branch-compliant CSV or change the existing CSV to align with the fields in the sample CSV below.

Bulk Link Creation

223 Byte

### Step 2: Import your links to Branch

Branch supports two migration paths. We recommend using the self-serve path shown in this guide if a 5-15 minute downtime is possible. Generating a CSR and updating the certificate (zero downtime) will involve Branch support and may take time.

The steps in this article only apply to links using a custom domain that you own. Branch does not support migrating links that use a domain that you don’t own (for example, bit.ly). Links that do not use a custom domain that you own must be recreated in Branch using the provide app.link domain or a custom domain.

Upload your CSV to Branch using “Method 2: Bulk Short Links in the Branch Dashboard” in our [Create Web Links](create-app-links.md) article. You can create both app and web links using the same method.

Alternatively, you can [create individual links in the Branch Dashboard](create-web-links.md) or use the [Deep Linking API](https://help.branch.io/apidocs/deep-linking-api) to create links programmatically (requires developer support).

### Step 3: Test your links

Use [Link Validator](link-validator.md) to test how your links will behave based on who your end user is and where they are clicking the link from.

::: tip Tip
Once you’ve confirmed that your Branch Links are working and your links from your other service are no longer receiving traffic, you can deprecate them in that service.
:::

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
<summary>I am currently using links under a domain that I don’t own. Can I migrate those links to Branch?</summary>

No. You cannot migrate any links that use a domain that you don't have ownership of (for example, bit.ly). Links from a domain you don’t own would need to be recreated as Branch Links with an app.link or custom domain.

</details>

<details>
<summary>Will my existing link analytics carry over to Branch?</summary>

No. Link analytics for your Branch Links will begin as soon as they’re created.

</details>

<details>
<summary>Can I migrate my shortened links from a different tool to the same Branch Dashboard I already use for existing Branch campaigns?</summary>

Yes. You can use the same Branch Dashboard. Review the following examples to learn more about what to expect.

| Change | Example | Behavior |
| --- | --- | --- |
| App.link to custom domain | **yourbrand.app.link** to **yourbrand.com** | - Existing app.link links will work - You must add the new domain to the app code for the new links to work - You must release a new version of your app |
| Custom domain to custom domain | **app.youbrand.com** to **yourbrand.com** | - Existing links will break - You must add the new domain to the app code for the new links to work - You must release a new version of your app |

</details>

<details>
<summary>What should I do if I don’t have the team or resources needed to implement Activation?</summary>

If your team lacks the capacity or expertise to implement the solution, our [Professional Services](https://www.branch.io/professional-services/) team can provide hands-on, tailored support to ensure a successful deployment from start to finish. We offer advisory hours to give you access to our consultants for strategic guidance, technical support, or specific project deliverables.

</details>

## Get Professional Services support

Branch’s [Professional Services](https://www.branch.io/professional-services/) team is available on a paid basis for your onboarding setup and advisory, implementation enhancement, and large strategic project execution needs. Reach out to your Branch Account Owner for more information on how Professional Services can support your Activation product usage.
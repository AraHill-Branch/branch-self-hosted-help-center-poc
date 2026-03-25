---
title: "Legacy Branch Overview"
slug: branch-dashboard-overview
---

::: info Attention
Branch is rolling out a new interface! Your environment may contain new and legacy pages, depending on when you started using Branch.

For documentation on the new Branch experience, please visit our [New Branch Overview](https://help.branch.io/docs/new-branch-overview) article.
:::

::: info Note
We’ve updated the Branch Dashboard structure. For more information, please read the [Branch Dashboard Navigation Update](new-navigation-structure.md) changelog entry.
:::

The Branch Dashboard is the primary location where you will work with Branch’s products and analytics. Any individual who has a Branch account can access the Branch Dashboard.

The three primary functions of the Dashboard include:

- Link and campaign creation
- Metrics and insights analysis
- Account settings configuration

## Analysis section

View metrics for for campaigns, fraud, ads, and more.

### Overview page

The first page you will see when logging into the Branch Dashboard is the [Overview](https://dashboard.branch.io/) page. This dashboard provides a global overview of your Branch analytics across all your channels, campaigns, and use cases for Branch linking.

Shortcuts allow quick access to view data for:

- All Data
- Journeys
- Short Links
- Ads
- Email

The Overview page allows you to:

- View data custom date ranges and data granularity
- Select the metrics you would like to view and how you would like to compare them, both visually and in Table form.
- Share reports with other stakeholders on your team

**Date Ranges**

Choose a pre-set date range via the drop-down menu or customize the time frame using the date selector.

**Sharing and Saving**

Create a Branch Link to share your view with another person on your team or save your report to come back to at another time.

**Summary Tiles**

Summary tiles are customizable and allow for the selection of the metrics that are the most important to you.

**Summary Graph**

Select the metrics (downloads, clicks, installs etc.) and how you would like to compare them (ad partner, campaign, device type, geography etc.) In order to explore a visual breakdown of the data. View more closely or export the graphs for later use.

**Events/ Performance Table**

View a table breakdown for the time window selected at the top of the page. Again, select the metrics you would like to view and how you would like to compare them, this time, via the "add columns" button, "Compare By" dropdown, and additional filters. Download the data to CSV for additional analysis.

For in-depth information about the Overview page, read our [Overview Page](branch-summary-page.md) article.

For additional information about Sharing and Dashboard reporting, read our [Dashboard Reports](dashboard-reports.md#eventsperformance-table) article.

### Ads Analytics page

Set up your Ad Partner connections and Postbacks, create tracking links for new campaigns, analyze potential fraud, and view your analytics for both traditional campaigns and SKAdNetwork campaigns.

**Analytics**

View Analytics specifically for your Ads Channel. Similar to the Branch Overview Page, Select your Time Range, Metrics, and Compare Bys and see your data both visually and in data table form.

**SKAdNetwork**

Configure SKAdNetwork with Branch and view SKAdNetwork-specific conversion data. Learn more about SKAdNetwork [here](skadnetwork.md)

For more information about Ads, take a look at our [Ads Overview Guide](ads-overview.md) as well as our [Partner Integration Guide](universal-ad-partner-integration-guide.md) and our [Creating Ad Links Guide](ad-links.md).

### **Fraud page**

Generate reports to see which clicks and conversions have been blocked by Branch's anomaly detection practices. Learn more about Branch's fraud solution [here](fraud.md).

## Campaigns section

### LinkHub page

Create and manage links and QR codes that can be used in every channel online and off.

### Journeys page

Design completely custom banners and interstitials for your mobile website. Target audiences, run A/B tests, and view Journeys-specific analytics including Pageviews, Journeys Impressions, View-to-Click ratios etc.

For more information about Journeys, Take a look at our [Journeys Overview Guide](journeys-overview.md).

### Email page

Enable your Email Service Provider's integration with Branch to allow you to deep link from your emails to your app within your current email marketing setup flow. View your email-specific analytics including clicks and in-app conversions from your email campaigns.

For more information about Branch’s Email feature, take a look at our [Overview Guide](branch-universal-email.md) as well as our [Integration Guide](universal-email-integration-guide.md).

### **Engagement Builder page**

Create rules to help you identify groups of users to target in re-engagement campaigns and share these groups of users directly with your ad networks.

## Configure section

### **App Settings**

Tell Branch exactly how to act when one of your Branch Links is clicked, create your custom domain, and more. For more information, visit our Configuration Guide [here](configure-default-link-behaviors.md)

**Integration Status**

View the status of your Branch Integration progress. See the additional steps that need to be completed, and link to relevant integration documentation.

**Test Devices**

Set up test devices to ensure that conversions resulting from your testing do not appear in your regular traffic and re-set devices to allow you to test installs more than once. See our Test Device Guide [here](add-test-devices.md).

### **Ad Partners page**

Set up your connections to Ad Partners including Self-Attributing and Traditional Networks. Create, edit, and test postbacks to Branch from your networks.

### ROI Hub

ROI Hub is a critical tool in your marketing strategy if you're interested in analyzing and reporting on ad spend to make sure you're getting the best use of your investment dollars. ROI Hub unifies your cost data and revenue insights, and helps you understand the actual impact of your ad dollars.

### **Data Feeds**

Enable Branch's [Daily Export API](daily-exports-api.md) to send Branch Data to an S3 bucket for retrieval by your team, and set up automatic data sending via pre-built integrations with Branch's marketing analytics partners.

### Exports

**Daily Exports**

Retrieve daily exports from Branch's Dashboard interface.

**Custom Exports**

Generate a completely custom data export with the topics, events, and columns of your choosing via the Branch user interface

## **Account section**

### **Settings page**

Retrieve your Branch key and secret and control permissions for team member and agency access to your Branch Data and configurations. More on users and permissions [here](entity-views-access-controls-overview.md)
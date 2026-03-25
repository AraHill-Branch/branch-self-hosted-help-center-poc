---
title: "Journeys Analytics"
slug: journeys-analytics
---

::: info Attention
Journeys Analytics is part of the legacy Branch experience.  
  
Our new Branch Analysis tool offers customizable dashboards made up of flexible widgets to capture the data you need. Branch Analysis is being rolled out to customers in phases. While you're waiting for access, discover how to filter, share, and export performance across different channels on our [Analysis Overview](https://help.branch.io/docs/branch-analysis) page.
:::

## Overview

To access Journeys analytics, click to **Journeys** from the navigation, click on the **Activity** tab to start analyzing your Journeys data. There are 2 visuals to use when analyzing your Journeys performance:

- [Trends using a graph view](journeys-analytics.md#trends)
- [Performance using a table view](journeys-analytics.md#performance)

We'll cover how to filter your data, using the Trends and Performance visuals, and some [tips and tricks](journeys-analytics.md#tips-and-tricks).

::: info Data Limits
**Cardinality Protection**

Branch limits all dimensions to 40,000 values per publisher per day. This means that you can only see up to 40,000 unique campaigns, ad names, etc in the Dashboard.

If an app tries to send up > 40,000 values for a single dimension (e.g. ~campaign) in a day, then Branch stops tracking those unique values. Branch combines additional values together and bucket them under the value "Other".
:::

::: danger Organic Check-Box Post iOS 14.5
**For** [**Trends View**](journeys-analytics.md#trends) **and** [**Performance View**](journeys-analytics.md#performance)**:**, the organic check-box will be removed because those views would be polluted with paid ad traffic which we cannot subtract from organic traffic due to those users never opting-in to tracking.

Having the organic check-box would introduce “Journeys vs Direct Traffic + Misattributed Paid Traffic”.

For additional information on changes post iOS 14.5, visit our [FAQ Pages](ios-14-faqs.md)
:::

## Data Requirements

## Filtering and Sharing Your Journeys Data

At the top of the page, you'll see a menu of options that apply to both the Trends and Performance views. Here, you can set the date range you'd like to see data for. This date range will apply to both the graph and table views on the page.

You can share your current dashboard view using the share button, which will preserve the filters and time windows; this is useful for circulating a specific set of filters among your team or with your Branch Technical Account Manager.

![](/img/535ce1d-Screen_Shot_2020-04-28_at_1.09.09_PM.png "Screen Shot 2020-04-28 at 1.09.09 PM.png")

## Trends

The Trends view is a visual breakdown of where your various in-app and web events are originating from the Journey banner. These events can be further filtered by the various analytics tags from their originating ad campaigns.

![](/img/55d657b-journeys1.png "journeys1.png")

### Common Analytics Labels

1. CAMPAIGN: Auto-populated by the name of the Journey.
2. TAGS: Auto-populated by the name of the Journey view.
3. MOBILE PAGEVIEWS: This is a count of the number of page views your website has received for the date range.
4. JOURNEYS VIEWS: The total number of times the Journey banners were loaded and displayed on the webpage.
5. JOURNEYS DISMISSALS: A count of the number of times users dismissed Journeys.
6. REACH: This is the percentage of the web pages that are loading the Journeys banner on your website. The higher the number, the maximum installs you'll be driving.
7. VIEW TO CLICK: The ratio of the total number of times the banner was loaded and viewed on the webpage to the total number of times the users actually clicked on the banner.
8. VIEW TO OPEN: The ratio of the number of Journeys banners loaded and viewed on the webpage to the number of open events triggered in the app; this will include both the open events when the user clicks the banner or does an open event manually after seeing the banner on the web.

**To get the performance of the banner, you can scroll down to the table below the graph:**

![](/img/83217e4-journeys2.png "journeys2.png")

## Performance

The Performance view is a table view that lets you see a more granular view of your event data. Here you can filter and compare fields with the same parameters as in the graph view, and see a side-by-side view of your events. Use the three vertical column button to select which events you'd like to see in this table.

![](/img/17be294-journeys3.png "journeys3.png")

## Tips and Tricks

- You can export your current table view as a *CSV* file using the download button on the top right of the table.

![](/img/8c21cea-Screen_Shot_2020-06-09_at_12.29.19_PM.png "Screen Shot 2020-06-09 at 12.29.19 PM.png")

- The Unique checkbox on both the graph and table views allows you to restrict reports to one event of each type per user. For example, take a user who clicked an ad link, then opened the app seven times within the attribution window for that link. With the Unique box checked, we'd report one of those opens, with it unchecked, we'd report all seven.

::: info "Unpopulated" Ad Partner vs. "Organic"
There are times when Branch does not receive the name of the Ad Partner who received attribution. In these cases, the word **Unpopulated** will show as the name in the **Ad Partner** column.

For conversions that are not attributed to any Ad Partner, the word **Organic** will show in the **Ad Partner** column.
:::
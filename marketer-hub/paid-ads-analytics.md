---
title: "Ads Analytics"
slug: paid-ads-analytics
---

::: info Attention
Ads Analytics is part of the legacy Branch experience.  
  
Our new Branch Analysis tool offers customizable dashboards made up of flexible widgets to capture the data you need. Branch Analysis is being rolled out to customers in phases. While you're waiting for access, discover how to filter, share, and export campaign performance across different channels on our [Analysis Overview](https://help.branch.io/docs/branch-analysis) page.
:::

## Overview

The Branch Ads Analytics Dashboard has two main sections: a high-level graph at the top and a detailed table below. Each view allows filtering and comparing in-app and web events by analytics parameters associated with your Branch Ad Links.

When creating a Branch Ad Link, you include a **campaign**, **channel**, and **tags**, and Branch will automatically add a **feature** and **ad partner** for filtering events.

::: warning Warning
Branch limits all dimensions to **40,000 values per publisher per day**. This means that you can only see up to 40,000 unique campaigns, ad names, etc. in the Branch Dashboard.

If an app tries to send more than 40,000 values for a single dimension (e.g. `~campaign`) in a day, then Branch stops tracking those unique values. Branch combines additional values together and bucket them under the value "Other".
:::

::: warning Warning
Adding **ad partner**, **country**, **secondary publisher**, and **OS** in the **Compare by** field will cause an error in loading data into the Events/Performance Table.
:::

## Dimensions

Branch integrates with many different ad partners, each with their own requirements and capabilities. Use this section to learn more about which dimensions are supported for which ad partner, and how to combine different dimensions in your reports.

### Supported SAN dimensions

Self-Attributing Networks (SANs) do not always support all of the dimensions available in your Branch analytics.  
  
Please refer to the following table when using **Compare by** dimensions:

| Dimension | Facebook | Google | Apple Ads | Snap | Twitter |
| --- | --- | --- | --- | --- | --- |
| **Feature** | Supported | Supported | Supported | Supported | Supported |
| **Channel** | Unsupported | Supported | Unsupported | Unsupported | Supported |
| **Campaign** | Supported | Supported | Supported | Supported | Supported |
| **Tags** | Unsupported | Unsupported | Unsupported | Unsupported | Supported |
| **Stage** | Unsupported | Unsupported | Unsupported | Unsupported | Unsupported |
| **Ad Partner** | Supported | Supported | Supported | Supported | Supported |
| **Secondary Publisher** | Supported | Supported | Unsupported | Unsupported | Supported |
| **Ad Set Name** | Supported | Unsupported | Supported | Supported | Unsupported |
| **Ad Name** | Supported | Unsupported | Unsupported | Supported | Unsupported |
| **Creative Name** | Supported | Unsupported | Unsupported | Unsupported | Unsupported |
| **Keyword** | Unsupported | Supported | Supported | Unsupported | Unsupported |
| **Last Touch Type** | Unsupported | Unsupported | Unsupported | Unsupported | Supported |
| **Link ID** | Unsupported | Unsupported | Unsupported | Unsupported | Unsupported |
| **Country** | Supported | Unsupported | Unsupported | Unsupported | Supported |
| **OS** | Unsupported | Unsupported | Supported | Unsupported | Supported |
| **Platform** | Unsupported | Unsupported | Unsupported | Unsupported | Supported |

### Dimension capabilities

Ad partner APIs often require Branch to make several sequential requests to retrieve all the data we surface to our customers.

Notably, **not all dimensions are available for each request**. Some are available in what we call “set A” and others are available in “set B”. Some are available in both, so they’re called “common”.

::: warning Warning
Sets A and B cannot be reconciled, so Branch defaults to set A if you select dimensions from both.
:::

Branch’s **recommendation** when creating a report is to either:

- Use dimensions from set A, with any common dimensions you’d like **or**
- Use dimensions from set B, with any common dimensions you’d like

That is, we advise **not combining dimensions from sets A and B when creating a report**.

For details on which dimensions are in sets A and B, and which dimensions are common, use the lists in these tabs:

## Filter bar

At the top of the page, you'll see a menu of options that applies to both the graph and table views. With the filter bar, you can add attributes that will apply to both the graph and table views on this page.

![Branch Dashboard Ads Analytics page displaying data options and filters for analysis and reporting.](/img/Screenshot 2025-05-01 at 12.37.55 PM.png "Filter Bar.png")

You can apply the following attributes:

| Attribute | Description |
| --- | --- |
| Split SKAN data | When **Split SKAN data** is checked, your report will break your data into “non-SKAN”, “SKAN”, and “Total”. The total is the sum of non-SKAN and SKAN. |
| Organic | When **Organic** is checked, unattributed data will show (attributed: false). This data is not attributed to any click or impression, and is the same as "organic" or "direct" data. |
| Unique | When **Unique** is checked, these are unique to a user. For example: if 1 user clicks 100 times, it will count as 1. There is no concept of "unique revenue"; "revenue" is always the sum of all purchase events. |
| Dates | This is the date range for your report. By default, the Branch Dashboard will allow you to set the date range for up to **6 months** back. |
| Ad Partner | Apply the **Ad Partner** filter to your report to only display data from specific ad partners. |
| OS | Apply the **OS** filter to your report to only display data from specific operating systems. |
| Campaign | Apply the **Campaign** filter to your report to only display data from specific campaigns |
| Filters | Add additional filters that you apply to the report. |
| Reset | Reset the report back to a blank template |

## Trends graph

Here you can see a visual breakdown of where your various in-app and web events are originating from. See the appendix for a breakdown of each event and filter type. These events can be further filtered by the various analytics tags from their originating ad campaigns.

![](/img/59bb9439e12ed6465efc5706b4ccd87d2af2a7c97a5fe0538aec070c9570acc7-Screenshot_2024-11-19_at_10.46.12_AM.png "Trends Graph.png")

::: warning
**Warning**  
For iOS 14.5+, when the organic check-box is checked, the traffic being added to this view will include “true direct organic traffic **plus** misattributed first installs”.  
This introduces **double counting with the paid-attributed opted-in installs** the page displays by default.

For additional information on changes **post iOS 14.5**, visit our [FAQ Pages](https://help.branch.io/faq/docs/ios-14-faqs)
:::

## Events table

The Events table lets you see a more granular view of your event data. Here you can filter and compare fields while seeing a side-by-side view of your events.

![](/img/50a8c9a46f3ab6e7f6a272ef38fd71d63a8f698186b80ae487b66d1bccf45f15-Screenshot_2024-11-19_at_10.48.21_AM.png "Events Table.png")

### Columns

You can use the three-column button on the top right of the table to customize the columns viewable in the table. You can customize your columns even further through the Column Selector.

![](/img/a761f5f59894f463d0eb6daa68c6213fec14faf560f87d4adad546643ba17bb4-Screenshot_2024-11-19_at_10.51.12_AM.png)

Events within each bucket are ordered by the volume received in the past 15 days. The most relevant events for each app will always appear at top of the list. You can also pin your favorite events and metrics to always appear on top.

Any event with zero volume will appear at the bottom irrespective of the event type.

::: info Note
Below are the definitions for several percentage-related metrics:

- **Click to Install %**: The percentage of attributed installs divided by clicks. Installs with "last attributed touch type" of value `IMPRESSION` are filtered out. Installs with "platform" of value `DESKTOP_WEB` and `DESKTOP_APP` are also filtered out.
- **Click to Open %**: The percentage of attributed opens divided by clicks. Opens with "last attributed touch type" of value `IMPRESSION` are filtered out. Opens with "platform" of value `DESKTOP_WEB` and `DESKTOP_APP` are also filtered out.
:::

### Custom metrics

In the column selector, you can also make your own custom metrics for more insights from your aggregated data. Formulaic calculations between event counts and aggregations are supported. Additionally, you will have access to templated calculations like **Average Order Value** and **Customer Acquisition Cost**.

![1500](/img/cb2ec9a-Custom_Metrics.gif "Custom Metrics.gif")

## Drill-down analytics

When you use the **Compare by** feature with multiple values, you will notice a **plus icon** appear in the rows of your table. Click the plus icon to expand these rows, which are separated by the different dimensions you provided.

In the example below, you can see ad partner, day, and platform are the chosen fields, and this is reflected in the **Dimensions** column of the table. The rows have been expanded, so you can see how each dimension is broken down.

![Branch Ads Analytics table showing example performance metrics for installs and purchases.](/img/Screenshot 2025-05-01 at 2.06.02 PM.png)

## Save views

The Branch Dashboard allows you to save the state of your report after you've applied changes to your satisfaction. You can name and save your report for future use. This is helpful if you have several report types you use to analyze ads-related performance.

![1632](/img/decad7ff3054713f961940ac168e61c84d3cf0461d20a8325877edf57ed239ca-Screenshot_2024-11-19_at_10.40.04_AM.png "Save Report.png")

## Share views

Clicking the three-dot share button next to the name of your report will generate a shareable link to your report. Anyone with read access to your Branch Dashboard will be able to click the link and be directed to the report you created.

![](/img/84dff83a28333635e89a7cf14061c7cf35a74084f0940cfbd09d11e9eb3dd016-Screenshot_2024-11-19_at_10.41.56_AM.png)

## Revenue and cost

Unique to Branch Ads, the Branch Dashboard will enhance your analytics by adding cost-related parameters to your data. Through Branch's integration with specific ad partners, reports will be populated with the following analytics:

| Analytics Tag | Description | Used for |
| --- | --- | --- |
| Cost | Total cost (spend) for those dimensions (analytics tags, user data, time range), regardless of cost model | Understanding the total amount spent |
| Revenue | Revenue attributed to your selected filters | Calculating how much money you've gained through commerce events |
| eCPI | cost / installs | Normalizing spend per install, to understand the average price of an install across networks or over time |
| eCPC | cost / clicks | Normalizing spend per click, to understand the average price of an click across networks or over time |
| eCPM | cost / (impressions / 1000) | Normalizing spend per thousand impressions, to understand the average price of 1000 impressions across networks or over time |
| eCPA | cost / purchases [includes web and app purchases] | Normalizing spend per purchase, to understand the average price of a purchase across networks or over time |
| Return On Investment (ROI) | (revenue-cost / cost) \* 100 | Deriving return on investment, to understand the percentage "profit" made on ad spend |
| Return On Ad Spend (ROAS) | (revenue / cost) \* 100 | Deriving return on investment by understanding the percentage revenue multiple for a given unit of spend |

::: info Note
When looking at certain dimensions (ex. country), data may come in separately as `Unpopulated`. This is because different dimensions come from different forms in ingestion.

Metrics like Install and Cost are ingested by Branch from an ad partner, and it will have different dimensions.

Use [this table](self-attributing-networks-sans.md#san-supported-analytics-parameters) to see what parameters are supported by which SAN.
:::

### Local currency

::: danger Local Currency in Legacy vs New Branch
The instructions in this section outline setting local currency in the [legacy Branch experience](branch-dashboard-overview.md).

For instructions on setting up local currency in the [new Branch experience](new-branch-overview.md), please visit our documentation about the [General](general-page.md#local-currency) page.
:::

By default, the Branch Dashboard **will generate reports in USD**. In order to view revenue and cost in your local currency, please enable the **Local Currency** setting in your Branch Dashboard's Configuration. Additional details can be found [here](https://help.branch.io/v1/docs/advanced-settings-configuration#local-currency).

Local currency support in the Branch Dashboard will allow you to analyze marketing spend and revenue in your local currency. Additionally, it will allow for direct cost data comparison with ad partners who report their spending in a currency other than the USD.

![](/img/ad24a7f0408721d264d6be673cad31aea89dc31ba7c2d270643964940d258c9c-Screenshot_2024-11-19_at_10.53.12_AM.png "Local Currency Analytics.PNG")

With Local Currency enabled, you will gain new analytics tags as dimensions:

| Analytics Tag |
| --- |
| Cost in App Local Currency |
| Revenue in Local Currency |
| eCPA in Local Currency |
| eCPC in Local Currency |
| eCPI in Local Currency |
| eCPM in Local Currency |

## Tips and tricks

- You can export your current table view as a CSV file using the download button on the top right of the table.

![](/img/ddcfca44521bffd28f3f35b8e55d6e87bafc8ddbe11d2b7775191ef773a0bea7-Screenshot_2024-11-19_at_10.53.55_AM.png "paid-ads7.png")

- The **Unique** **checkbox** on both the graph and table views allows you to restrict reports to one event of each type per user. For example, take a user who clicked an ad link, then opened the app 7 times within the attribution window for that link. With the Unique box checked, we'd report one of those opens, with it unchecked, we'd report all 7.
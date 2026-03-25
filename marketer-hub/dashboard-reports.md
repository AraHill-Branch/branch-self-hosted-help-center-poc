---
title: "Dashboard Reports"
slug: dashboard-reports
---

## Overview

The [Branch Dashboard](https://dashboard.branch.io/) is the best place to view your campaign performance across all of your Branch-integrated channels. Use the data collected through Branch's cross-platform Link Graph to make data-driven decisions to improve metrics and user experience.



### Available Reports:

- [Summary](branch-summary-page.md)
- [Ads](universal-ads-reporting.md)

  - [SKAdNetwork](skadnetwork-dashboard-reports.md)
- [Journeys](journeys-analytics.md)
- Email
- Short Links
- Sources

### Limitations

| Limitation | Details |
| --- | --- |
| Max lookback | 6 months |

### Filter Bar

The Filter Bar allows you to add multiple controls across your charts and tables. With it, you'll be able to control the following:

- Date Range
- Apply Filters
- Saving Views
- Sharing Views
- Reset View



### Saving Views

You can also save the current state of your report - i.e. including whatever changes you have made to the default view - by clicking on the **flag button**, naming the view, and clicking **Save**.

You can also access your previously saved reports here as well.



### Sharing Views

You can easily share the current state of your report - i.e. including whatever changes you have made to the default view - by clicking on the **link button** and copying the auto-generated Branch Link. You can then send this link to users who have access to your Branch Dashboard for them to view that report.



## Trends Graph

The Trends Graph is a type of view in the Branch Dashboard that allows you to view your campaign performance through robust charts.



The Trends Graph can be customized to show **two** events compared by a specific attribute.

#### Filter

Applying filters can help drill down into more specific campaign parameters to better fit the story of your report. Filters uses a set of operators to specify those parameters:

- equals
- contains
- starts with
- ends with  
   The available options you have for filters are based on what is currently available in your Branch data. If you don't see a specific option on your filter, it likely means that the data is not yet there or something went wrong during implementation.

#### Granularity

Granularity allows you to break down the chart by day, week, or month.

## Events/Performance Table

The Events/Performance Table is a type of view in the Branch Dashboard that allows you to view your campaign performance through customizable tables with download capabilities.

#### Columns

To change which events and/or metrics are shown as columns:

1. In the header of the table, in the far-right upper corner, click the three-column button.
2. Select the events and/or metrics of interest to you.
3. To re-arrange the column order, click on the dotted tab to the right of the column name and drag to re-order.



Additionally, you have the ability to customize your columns even further through the Column Selector. With it you'll be able to have new sections:

- **Events**: An ordered list of events.
- **Metrics**: All Branch pre-calculated metrics.
- **Ordering**: The ordering space for all selected columns including compare-by as well as selected events and metrics with easy drag-and-drop functionality.



Events within each bucket are ordered by the volume received in the past 15 days. The most relevant events for each app will always appear at top of the list. You can also pin your favorite events and metrics to always appear on top.

Note: Any event with zero volume will appear at the bottom irrespective of the event type.

#### Adding a Custom Metric

In the column selector, you can also make your own custom metrics for more insights from your aggregated data. Formulaic calculations between event counts and aggregations are supported. Additionally, you will have access to templated calculations like Average Order Value and Customer Acquisition Cost.



#### Compare By

::: warning Limitation
Note: The following combination in the **Compare by** field will cause an error in loading data into the Events/Performance Table:

- OS + Country

**OR**

- Secondary Publisher + Country
:::

To modify which dimension the columns are split by:

1. Click on the **Compare by** drop-down and select the dimension on which you want the event split.
2. To remove a dimension, click the**X** next to the event in the **Compare by** field.



#### Filter

Applying filters can help drill down into more specific campaign parameters to better fit the story of your report. Filters uses a set of operators to specify those parameters:

- equals
- contains
- starts with
- ends with  
   The available options you have for filters are based on what is currently available in your Branch data. If you don't see a specific option on your filter, it likely means that the data is not yet there or something went wrong during implementation.

#### Granularity

Granularity allows you to break down the chart by day, week, month, or all time.

#### Tags

You can add `tags` to nearly everything you do with Branch. This includes Branch Links, Journeys, etc. You can add the `tags` to your Compare By to differentiate between the different uses of Branch, campaigns, and more!

### Report Previews



If certain conditions are met, you may see a prompt on Events/Performance Tables to **Run Full Report**. To ensure stable performance and usability, Branch only shows you partial data for your report until you confirm to run the full report. This is also a good opportunity to confirm you have the correct columns/dimensions set.

Report Previews only initiate when the following conditions are met:

| Time-Range | Granularity | Preview Data Time Range |
| --- | --- | --- |
| `> 30 Days` | Daily | First 7 Days |
| `> 60 Days` | Weekly | First 2 Weeks |
| `> 90 Days` | Monthly | First 1 Month |

### Export CSV

In addition to seeing the report in the Events/Performance Tables, you also have the ability to export the table as a CSV by clicking the **download** button next to the granularity setting. The CSV you export will abide by the time range you set from the **Export CSV** modal.


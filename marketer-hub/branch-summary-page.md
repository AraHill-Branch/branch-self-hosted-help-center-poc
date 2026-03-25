---
title: "Overview Page"
slug: branch-summary-page
---

::: info Attention
The Overview Summary tab is part of the legacy Branch experience.  
  
Our new Branch Analysis tool offers customizable dashboards made up of flexible widgets to capture the data you need. Branch Analysis is being rolled out to customers in phases. While you're waiting for access, discover how to filter, share, and export campaign performance across different channels on our [Analysis Overview](https://help.branch.io/docs/branch-analysis) page.
:::

The [Overview](https://dashboard.branch.io/) page provides a global overview of your performance across different channels, campaigns, and use cases in the Branch ecosystem. Here, you can quickly view analytics breakdowns for:

- All Data
- Journeys
- Short Links
- Ads
- Email

![](../../../assets/media/images/7cd32637-5cde-4d5c-9c32-9a9f5ae78c67 "All Data.PNG")

## Report Settings

![](../../../assets/media/images/18f389ad-628f-4fdb-84ac-132e8e39f2d2? "Report Settings.PNG")

### Date Range

You can choose the following date ranges for your report:

- Last 3 Days
- Last 7 Days
- Last 14 Days
- Last 30 Days
- Last 90 Days
- Custom...

  - By default, you are only allowed to look back up to 6 months of data.

There are built-in date ranges to choose from or you can have a custom date range selected.

### Sharing

You can easily share the Overview page in its current state - i.e including whatever changes you have made to default view - by clicking on the link button and copying the auto-generated Branch Link. Users who have access to your Branch Dashboard will then be able to see the view you've shared.

![](../../../assets/media/images/fa24f391-afab-4353-8e39-ed5c753aa731 "Sharing.PNG")

### Saving

You can also save the Overview page in its current state - i.e including whatever changes you have made to default view - by clicking on the flag button, naming the view, and clicking Save.

You can also access your previously saved views here as well.

![](../../../assets/media/images/98c199e6-a1e7-45cf-85fd-b2bd0b7d43db "Saving.PNG")

### Resetting

You can reset the Overview page back to its default state at any time, by clicking on the reset button.

![](/img/d507152-Reset.png "Reset.png")

## Summary Tiles

::: info Summary Tiles vs Table Data
There may be a difference in conversion proportions when comparing the Summary Tiles and the Events/Performance Tables. In the tables, the total unique will differentiate events based on their compare-by dimensions, leading to a greater count compared to the Summary Tiles.
:::

Each summary tile includes the following information:

- Large number represents metric for current time period.
- Small number represents metric for previous time period.
- Arrow to right indicates whether metric has increased or decreased.

To change which event is shown:

1. For the respective tile, click on the Pencil icon.
2. In the **Customize Tile** modal, click within the **Show** drop-down.
3. From the **Show** drop-down, select the event you want to populate the graph with.
4. Click **Save**.

![](/img/6aba0b0-customize-tiles.gif "customize-tiles.gif")

Each tile can be customized to show one of the following events:

<details>
<summary>Available SHOW Events</summary>

- **Installs**
- **Pageviews**
- **Views**
- **Clicks**
- **Opens**
- **Reinstalls**
- **Web Session Starts**
- **Web to App Redirects**
- **SMS Sent**
- **Impressions**
- **Journey Dismissals**

</details>

## Summary Charts

![](/img/e539da5-Summary_Charts.gif "Summary Charts.gif")

Summary Charts are an easy-to-use way for you to be able to see campaign performance quickly at a high level. It's a great tool to compare multiple data sources to find valuable insights.

### Customization

![](../../../assets/media/images/7d8f6ffe-09f8-430d-beb2-a59b91530032 "Customization.PNG")

#### Show

You can **Show** 2 values in which your chart will automatically conform to. Here, you'll be able to add helpful at-a-glance metrics like installs, purchases, etc.

::: info Data Limits
**Event/Metric Records**

We will load the top 5,000 records for each event or metric. Some low-volume records may be missing from the displayed analytics when looking at many different compare bys. In particular, data sorted by ascending values may be limited.

**Cardinality Protection**

Branch limits all dimensions to 40,000 values per publisher per day. This means that you can only see up to 40,000 unique campaigns, ad names, etc in the Dashboard.

If an app tries to send up > 40,000 values for a single dimension (e.g. ~campaign) in a day, then Branch stops tracking those unique values. Branch combines additional values together and bucket them under the value "Other".
:::

#### Compare By

You can add 1 **Compare by** value to break down your data by a specific dimension.

#### Filter

You can add 2 **Filters** to get more granular with the data shown in the Summary Chart. Here you can add specific values for keys like os, ad partner, etc.

#### Organic/Unique

When **Unique** is checked, Branch employs an algorithm to generate an approximation of unique users completing an event within a given time period.

For example: Within the time interval selected, if 1 user clicks 100 times, the dashboard will only display 1 unique click.

There is no concept of "unique revenue"; "revenue" is always the sum of all purchase events.

By default, Unique is shown.

When **Organic** is checked, unattributed data will show (attributed: false). This data is not attributed to any click or impression, and is the same as "organic" or "direct" data. By default, Organics are left hidden.

### Views/Download

By clicking the button in the upper right hand corner of the chart, you have the ability to **View in Full Screen** or download in one of the following formats:

- **PNG**
- **XLS**
- **SVG**
- **CSV**

## Events/Performance Table

![](../../../assets/media/images/36fc85a5-1170-4232-84bc-07c19070f459 "Table.PNG")

For a full guide on customizing the events/performance table, view our guide on [Dashboard Reports](dashboard-reports.md#eventsperformance-table).
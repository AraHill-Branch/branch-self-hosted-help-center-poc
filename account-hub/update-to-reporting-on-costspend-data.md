---
title: "Update to Reporting on Cost/Spend Data"
slug: update-to-reporting-on-costspend-data
---

Reporting on cost/spend data is important for measuring performance. We have launched two improvements aimed at making cost data reporting more intuitive and understandable 💲

## Overview

Improvements have been made to Ads Analytics related to cost/spend data. Previously, for cases where ad networks have multiple disparate media structure types, Branch pulled the Cost/Click/Impression data separately, and that data cannot be combined in reporting. This led to a misalignment of the totals shown in metric columns.

### Data Selection and Defaults

In cases where there are multiple data sources for Cost/Click/Impression data from an ad network, Branch will select the appropriate data source for the report based on which dimensions are added. Branch will intelligently select a "default" data source if there is a conflict or clash between dimensions. This results in a more consistent experience when generating reports.

### New UI Components

During report creation in the [Events Table](paid-ads-analytics.md) and when dimensions have been selected from one data source, Branch dynamically adds new icon tooltips that will indicate a warning about incompatible dimensions.

![](/img/f1badc6-Cost_Improvement.png)

::: tip
Ready to learn more about your ads analytics? Visit our guide on Ads Analytics here: [Ads Analytics](paid-ads-analytics.md)
:::

## FAQ

#### Which dimensions are compatible with which Ad Networks?

A helpful table has been created to show which dimensions are compatible with which ad networks [here](paid-ads-analytics.md#dimension-compatibility-for-cost-aggregation).

#### What happens if dimensions across two data sources are added to a report?

To preserve logical totals, Branch will only ever use one data source at a time. Dimensions from the unused data source will have Cost/Click/Impression values of 0.

#### Is this a common occurrence?

Ad networks offering incompatible dimensions are the exception, not the rule. Examples:

- Apple Ads - `Keyword` vs `Display Ad`
- Facebook/Meta - `Secondary Publisher` vs `Geo`
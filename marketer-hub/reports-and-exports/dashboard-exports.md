---
title: "Dashboard Exports"
slug: dashboard-exports
---

## Overview

There are a few features available on the Branch Dashboard that allow you to export data. These exports are delivered in the form of CSV and email.

## Available Dashboard Exports

### Report Exports

Branch Dashboard users have the ability to export data from any of the analytics reports in the dashboard. The Branch Summary Page and each of the product-specific analytics pages (Ads, Journeys, Email) each have an icon that allows you to download a CSV of the data that you are viewing. The resulting CSV will match the time range, compare bys, filters, and data granularity that you have set for the table, as well as all of the columns you have selected. Data is delivered to you immediately via a CSV download.

*[Image: 636]*

### Daily Exports

Branch Daily Exports are the most comprehensive exports offered in the Branch Dashboard. Data is presented at log-level and all [available export fields](daily-exports-api.md#daily-exports-fields) are included in the report.

Since all available data for a single day is included in the export, the files are very large. For an optimal experience, export data for one day at a time. Once you have selected the day's data that you would like to export, click "Export All" or click on the download button if you would only like to download a specific topic (or topics). You will receive an email with a link to the data for download when it is available.



### Custom Exports

Custom Exports are the most flexible export feature provided by Branch. Custom exports allow you to specify exactly which metrics are the most useful for your analysis.

Using the custom exports interface, select your Start and End dates and times and the timezone that you would like the data to be exported in. Then you can select the Topic (Installs, Opens, Custom Events etc.) as well as all of the relevant columns (channels, creatives, ad ids, timestamps etc.) for your export. Select your export type, then click export. We also provide a number of pre-configured exports based on the information that marketers are most often looking for.

Once your export is complete, you will see it available for download on the Custom Exports page within the dashboard.



More information is available in our [Dashboard Custom Exports Guide](dashboard-custom-exports.md). In addition to being able to export this data, we also have the [Custom Export API](custom-exports-api.md).

## Deciding on an Export Method

If you are deciding on an Export Method from the dashboard: First think about if you need an aggregate snapshot of the data or are looking for log-level information. Report Exports will provide an aggregate based on the parameters and columns set on the analytics page at the time of download.

If you are looking for log-level information: Do you need all of the [columns that Branch offers](daily-exports-api.md#daily-exports-fields)? If so, use Daily Exports. If you only need a subset of the columns available or if one of our [pre-configured exports](dashboard-custom-exports.md#pre-configured-exports) will suffice, use Custom Exports.

Finally, if you would like to provide one of your agencies access to your Branch data, they can export via the Report Exports or Custom Exports when appropriate [data permissions](add-manage-users-roles-permissions-access.md) are granted.

## Other Exports

You also have the ability to export data out of Branch systems via API. For more information on Branch APIs, please visit our [**API Developer Documentation.**](apis-overview.md)
---
title: "APIs Overview"
slug: apis-overview
---

The following Branch APIs can help you query and export data, create Branch Links, make your own custom Branch QR Codes, and much more.

### Data APIs

| API | Purpose | Type of Data | Timing | Export Window |
| --- | --- | --- | --- | --- |
| [**Daily Exports**](https://help.branch.io/apidocs/daily-exports-api) | Export **all** device-level data in batches on a daily basis. | Log | Delayed & batched | Rolling 7 day window |
| [**Custom Exports**](https://help.branch.io/apidocs/custom-exports-api) | Export **select** device-level data using your own filters. | Log | Delayed & batched | Rolling 120 day window |
| [**Scheduled Log Exports**](https://help.branch.io/apidocs/scheduled-log-exports-api) | Set up a recurring export of select device-level data. | Log | Delayed & batched (hourly or daily cadence) | N/A |
| [**Cross-Events Export**](https://help.branch.io/apidocs/cross-events-export-api) | Query and compare large pools of data across multiple sources. | Aggregate | Delayed & batched | Rolling 2 year window |
| [**Unified Analytics Export**](https://help.branch.io/apidocs/unified-analytics-export) | Get unified analytics data into your data warehouse. | Aggregate | Delayed & batched | Rolling 2 year window |
| [**Aggregate**](https://help.branch.io/apidocs/aggregate-api) | Pull aggregate Branch data filtered for limited-access users. | Aggregate | Delayed & batched | Rolling 2 year window |
| [**Cohort**](https://help.branch.io/apidocs/cohort-api) | Pull cohort Branch data to understand user behavior and performance over time. | Aggregate | Delayed & batched | Rolling 2 year window |
| [**Query**](https://help.branch.io/apidocs/query-api) | Export **select** campaign- level data. | Aggregate | Real Time | Rolling 2 year window |

### Functional APIs

| API | Purpose |
| --- | --- |
| [**Deep Linking**](https://help.branch.io/apidocs/deep-linking-api) | Create, read, update, and delete your Branch Links. |
| [**Events**](https://help.branch.io/apidocs/events-api) | Track all of your events/conversions for your app. |
| [**QR Code**](https://help.branch.io/apidocs/qr-code-api) | Programmatically generate and customize Branch-powered QR codes. |
| [**Attribution**](https://help.branch.io/apidocs/attribution-api) | Attribute your app sessions to your active campaigns. |
| [**App**](https://help.branch.io/apidocs/app-api) | View and make updates to an existing Branch app configuration to better support workflows. |
| [**Data Subject Request**](https://help.branch.io/apidocs/data-subject-request-branch-api) | GDPR and CCPA related uses for accessing and erasing user/device data from Branch. |
| [**Short Links**](https://help.branch.io/apidocs/quick-links-api) | Programmatically generate Branch Deep Links that surface on the Branch Dashboard. |

## API Access

Some Branch APIs are included with the Branch Growth Platform, while others require specific Branch packages. Please [contact our Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.
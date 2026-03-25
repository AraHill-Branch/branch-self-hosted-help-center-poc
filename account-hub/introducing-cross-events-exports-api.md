---
title: "Cross-Events Export API"
slug: introducing-cross-events-exports-api
---

Branch's new Cross-Events Export API is a powerful tool for querying and comparing large pools of data across multiple sources.

## Overview

With the Cross-Events Export API your queries can access extensive aggregate-level data, return an unlimited number of rows, and include as many dimensions as you want.

You can also pull from Log Click Warehouse, Log Impression Warehouse, and Aggregate SAN CCI Warehouse [data](cross-events-export-api.md#notes-on-data-sources).

## Limitations

| Limitation | Details |
| --- | --- |
| Max Number of Rows Returned | No limit.  If the result has over 200,000 rows, multiple files will be returned. |
| Export Window | Rolling 2 year window. |
| Max Number of Dimensions | No limit. |
| Max Number of Days Queried | No limit. |
| Rate Limits | 2 requests per second. 5 requests per minute. 150 requests per hour. |
| Data Readiness | Data generally takes ~1.5 hours to be ready. To check for data readiness, you can use Branch's [Custom Exports API](custom-exports-api.md#check-data-readiness) and set the `warehouse_meta_type` to `AGGREGATE`. |

## Try It!

Try out the Cross-Events Export API in your browser, using your Branch data:

Request Data Export

[Retrieve Export Download Status](retrieveexportdownloadstatus.md)

## Prerequisites

In order to use the Cross-Events Export API, you first need to:

1. Create a Branch Dashboard.
2. Enable Ads **and** start running ad campaigns from your Branch account.
3. Implement the appropriate Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md)).
4. Make sure you have the appropriate permissions set on your user account. See the [Access](cross-events-export-api.md#access) section in our reference guide for more.

## Use Case Examples

View the example queries below to see what's possible with the Cross-Events Export API:

[Query All Standard Branch Events](cross-events-export-api.md#query-all-standard-events)

[Split Revenue Field by Ad Partner](cross-events-export-api.md#split-revenue-field-by-ad-partner)

[Split a Sampling of Events by Ad Partner](cross-events-export-api.md#split-various-events-by-ad-partner)

[Pull All Links for an App](cross-events-export-api.md#pull-all-links-for-an-app)

[Add a Filter](cross-events-export-api.md#add-a-filter)

## Learn More

For all the details about the Cross-Events Export API, visit our reference [guide](https://docs.app.link/e/qAO5SWdzjIb).
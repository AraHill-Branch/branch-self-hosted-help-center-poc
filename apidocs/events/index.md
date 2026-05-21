---
title: "Events API"
slug: events
---

# Events API

## Overview

Branch's Events API is a robust endpoint for tracking all of your conversions in your app. With it, you'll be able to tie in detailed metadata about your Commerce, Content, Lifecycle, and Custom Events to better understand user behavior and attribute to your ongoing campaigns.

## Important considerations

- **Real-time only**: Events must be sent in real time as they occur. Branch does not support backtracking or historical event ingestion. Events with timestamps in the past will not be backfilled into reports.
- **SKAdNetwork (SKAN)**: SKAN must be handled natively by your app, not via the Branch SDK. Branch returns SKAN-relevant fields (such as `coarse_key` and `update_conversion_value`) in the API response so your app can update its conversion value accordingly. See the [SKAdNetwork guide](https://help.branch.io/marketer-hub/docs/skadnetwork) for details.

## Rate limits

The Events API enforces rate limits on a per-app basis. If you exceed the limit, the API returns a `429 Rate Limit Reached` error. Back off and retry with exponential delay.

| Limit | Value |
|-------|-------|
| Requests per second | TBD |
| Requests per day | TBD |

Contact your Branch account manager for details on your app's specific limits.

## Authentication

All requests require a Branch Key. See [the API authentication overview](/apidocs/#authentication) for how to retrieve it and apply it to your requests.

## Endpoint

```
POST https://api2.branch.io/v2/event/standard
Content-Type: application/json
```

## Full reference

Browse the operations in the sidebar for the complete parameter reference, request and response schemas, and an interactive Try-it panel.


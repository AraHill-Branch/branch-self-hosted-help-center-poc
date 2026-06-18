---
title: "Daily Exports API"
slug: daily-exports
description: Export ALL device-level data from a specific day.
...
---

# Daily Exports API

<BranchCredentialsBar />

## Overview

Export ALL device-level data from a specific day.

## Authentication

All requests authenticate with two credentials:

- **`Access-Token` header** — your Branch access token, retrieved from **Configuration → Security & Access → Credentials** in the Branch Dashboard.
- **`app_id` query parameter** — the Branch App ID identifying which app's data you are querying.

Paste both into the credentials bar at the top of any operation page and the code samples and Try-it will use them automatically. See the [API authentication overview](/apidocs/#authentication) for more.

## Endpoint

```
POST https://api2.branch.io/v3/export
Content-Type: application/json
```

## Full reference

Browse the operations in the sidebar for the complete parameter reference, request and response schemas, and an interactive Try-it panel.


## Endpoints

<ApiEndpointList api="daily-exports" />

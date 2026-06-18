---
title: "Query API"
slug: query
description: The Query API is an HTTP API that can be used for programmatically querying pre-aggregated
  analytics.
...
---

# Query API

<BranchCredentialsBar />

## Overview

The Query API is an HTTP API that can be used for programmatically querying pre-aggregated analytics.

## Packaging

The Query API is available on premium plans. [Contact Sales](https://branch.io/contact-sales/) for access.

## Authentication

All requests authenticate with two credentials:

- **`Access-Token` header** — your Branch access token, retrieved from **Configuration → Security & Access → Credentials** in the Branch Dashboard.
- **`app_id` query parameter** — the Branch App ID identifying which app's data you are querying.

Paste both into the credentials bar at the top of any operation page and the code samples and Try-it will use them automatically. See the [API authentication overview](/apidocs/#authentication) for more.

## Endpoint

```
POST https://api2.branch.io/v1/query/analytics
Content-Type: application/json
```

## Full reference

Browse the operations in the sidebar for the complete parameter reference, request and response schemas, and an interactive Try-it panel.


## Endpoints

<ApiEndpointList api="query" />

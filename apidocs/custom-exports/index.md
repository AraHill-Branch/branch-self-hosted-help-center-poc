---
title: "Custom Exports API"
slug: custom-exports
---

# Custom Exports API

## Overview

Export selected device-level (log) data using your own filters, delivered as a downloadable file for your data warehouse or analytics pipeline.

## Packaging

Custom Exports are available on premium plans. [Contact Sales](https://branch.io/contact-sales/) for access.

## Authentication

All requests authenticate with two credentials:

- **`Access-Token` header** — your Branch access token, retrieved from **Configuration → Security & Access → Credentials** in the Branch Dashboard.
- **`app_id` query parameter** — the Branch App ID identifying which app's data you are querying.

Paste both into the credentials bar at the top of any operation page and the code samples and Try-it will use them automatically. See the [API authentication overview](/apidocs/#authentication) for more.

## Endpoint

```
POST https://api2.branch.io/v2/logs
Content-Type: application/json
```

## Full reference

Browse the operations in the sidebar for the complete parameter reference, request and response schemas, and an interactive Try-it panel.


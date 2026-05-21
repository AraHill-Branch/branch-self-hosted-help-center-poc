---
title: "Cohort API"
slug: cohort
---

# Cohort API

## Overview

The Cohort API allows you to programmatically query and export Cohort analytics

## Packaging

The Cohort API is available on premium plans. [Contact Sales](https://branch.io/contact-sales/) for access.

## Authentication

All requests authenticate with two credentials:

- **`Access-Token` header** — your Branch access token, retrieved from **Configuration → Security & Access → Credentials** in the Branch Dashboard.
- **`app_id` query parameter** — the Branch App ID identifying which app's data you are querying.

Paste both into the credentials bar at the top of any operation page and the code samples and Try-it will use them automatically. See the [API authentication overview](/apidocs/#authentication) for more.

## Endpoint

```
POST https://api2.branch.io/v2/analytics
Content-Type: application/json
```

## Full reference

Browse the operations in the sidebar for the complete parameter reference, request and response schemas, and an interactive Try-it panel.


---
title: "APIs Overview"
slug: apis-overview
description: "Branch API reference \u2014 create deep links and QR codes, track events, and export\
  \ attribution data. Interactive endpoints with code samples in 8 languages."
---

# APIs Overview

<BranchCredentialsBar />

The Branch APIs let you query and export data, create Branch Links, generate custom Branch QR Codes, and more.

## Data APIs

| API | Purpose | Type of data | Timing | Export window |
| --- | --- | --- | --- | --- |
| [**Daily Exports**](/apidocs/daily-exports/) | Export **all** device-level data in batches on a daily basis. | Log | Delayed & batched | Rolling 7 days |
| [**Custom Exports**](/apidocs/custom-exports/) | Export **select** device-level data using your own filters. | Log | Delayed & batched | Rolling 120 days |
| [**Scheduled Log Exports**](/apidocs/scheduled-log-exports/) | Set up a recurring export of select device-level data. | Log | Delayed & batched (hourly or daily) | — |
| [**Cross-Events Export**](/apidocs/cross-events-export/) | Query and compare large pools of data across multiple sources. | Aggregate | Delayed & batched | Rolling 2 years |
| [**Aggregate**](/apidocs/aggregate/) | Pull aggregate Branch data filtered for limited-access users. | Aggregate | Delayed & batched | Rolling 2 years |
| [**Cohort**](/apidocs/cohort/) | Pull cohort data to understand user behavior and performance over time. | Aggregate | Delayed & batched | Rolling 2 years |
| [**Query**](/apidocs/query/) | Export **select** campaign-level data. | Aggregate | Real time | Rolling 2 years |

## Functional APIs

| API | Purpose |
| --- | --- |
| [**Deep Linking**](/apidocs/deep-linking/) | Create, read, update, and delete Branch deep links. |
| [**Quick Links**](/apidocs/quick-links/) | Programmatically create, update, and bulk-manage Branch Quick Links. |
| [**QR Code**](/apidocs/qr-code/) | Programmatically generate and customize Branch-powered QR codes. |
| [**Events**](/apidocs/events/) | Track events and conversions for your app. |
| [**Attribution**](/apidocs/attribution/) | Attribute app sessions to your active campaigns. |
| [**App**](/apidocs/app/) | View and update an existing Branch app configuration. |
| [**Data Subject Request**](/apidocs/data-subject-request/) | GDPR and CCPA workflows for accessing and erasing user / device data from Branch. |

## Authentication

All Branch APIs authenticate with your **Branch Key**. Most endpoints accept the key in the JSON request body as `branch_key`; export and data APIs accept an access token.

### Retrieve your Branch Key

In the New Branch experience:

1. Navigate to **Configuration → Security & Access → Credentials**.
2. Use the copy icon to copy your Branch Key.

In the legacy Branch experience:

1. Navigate to **Account → Settings → Profile**.
2. Use the copy icon to copy your Branch Key.

See the [Credentials guide](/account-hub/new-branch/configuration-new/security-and-access-new/credentials-new) for managing access tokens, organization IDs, and additional credentials.

## Conventions

- **Base URL:** `https://api2.branch.io`
- **Versioning:** included in the path (`/v1/`, `/v2/`, `/v3/`)
- **Content type:** `application/json` unless otherwise noted
- **Errors:** every endpoint returns a JSON error body of `{ "error": { "message": string, "code": integer } }`
- **Rate limits:** documented per-API in the operation reference

---
aside: false
outline: false
pageClass: api-operation-page
title: "Details on Single Subscription - Scheduled Log Exports API"
description: "Details on Single Subscription — Scheduled Log Exports API endpoint reference: parameters, request and response schema, and copy-paste code samples in 8 languages."
---

# Details on Single Subscription

<ApiOperation operationId="checkSubscriptionStatus" />

<div class="api-search-only">

Scheduled Log Exports API checkSubscriptionStatus Details on Single Subscription This endpoint enables developers to retrive the subscription status via the `subscription_url` provided. Do make sure the `subscription_status` is set to `ACTIVE`. Scheduled Log Exports API subscription_id path A persistent id for the specific subscription.
 XXXX-0000-xxxx Status of aggregate export Scheduled Log Subscription Body subscription_id A persistent id for the retrieved subscription report Information about the report that should be generated. cadence report.cadence How frequently the report is generated, and for what time period it is generated. Options: hourly or daily. response_format report.response_format format in which the export data is delivered. Options: csv, json, parquet. response_format_compression report.response_format_compression method by which the export data should be compressed. Options: gz, snappy. Defaults to gz if not specified. report_type report.report_type An array representing event type of your report. See [Available Topics](https://help.branch.io/developers-hub/docs/custom-exports#branch-available-topics) the for complete list. report_fields report.report_fields An array representing fields/columns available in your report. Pass `["all"]` to include every available field. The all fields option requires Sensitive Data, Fraud Settings & Data, and Export permissions. When using `"all"`, new fields are automatically included as they become available — design your systems to handle schema changes gracefully. Parquet is recommended for resilience to schema changes. See [Available EO Fields](https://help.branch.io/developers-hub/docs/custom-exports#branch-available-eo-fields) for the complete list. filter report.filter Filter by fields and boolean operators against fields of the LogInstalls model; must be URI encoded and JSON parsed. Example: ["eq", "name", "PURCHASE"] subscription_status report.subscription_status Current subscription status destination Information about where a finished report is stored and how it can be accessed subscription_type destination.subscription_type Should be set to branch if you want data stored in Branch's S3 bucket, and accessible via API cloud destination.cloud The cloud service being used for external exports. Can be either `s3` or `gcs`. bucket destination.bucket The cloud bucket being used for subscription. prefix destination.prefix The prefix or folder you are using for Branch exports. resource_access_id destination.resource_access_id ARN for the Role (AWS) or full service account name (GCP) you are using for Branch exports. recipient_emails destination.recipient_emails Array of recipient emails associated with subscription Bad request — typically an invalid or missing credential or parameter. error Job ID Not Found

</div>

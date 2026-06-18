---
aside: false
outline: false
pageClass: api-operation-page
title: "Create New Subscription - Scheduled Log Exports API"
description: "Create New Subscription — Scheduled Log Exports API endpoint reference: parameters, request and response schema, and copy-paste code samples in 8 languages."
---

# Create New Subscription

<ApiOperation operationId="createScheduledLogExportSubscription" />

<div class="api-search-only">

Scheduled Log Exports API createScheduledLogExportSubscription Create New Subscription Set up a new scheduled log export subscription. Supported at both app and org level. The result is a subscription that specifies what data will be exported (e.g. topic, columns, filters) and where data will be exported to
 Scheduled Log Exports API Create Scheduled Log Export Subscription Request Body report Information about the report that should be generated. cadence report.cadence How frequently the report is generated, and for what time period it is generated. Options: hourly or daily. response_format report.response_format format in which the export data is delivered. Options: csv, json, parquet. response_format_compression report.response_format_compression method by which the export data should be compressed. Options: gz, snappy. Defaults to gz if not specified. report_type report.report_type An array representing event type of your report. See [Available Topics](https://help.branch.io/developers-hub/docs/custom-exports#branch-available-topics) the for complete list. report_fields report.report_fields An array representing fields/columns available in your report. Pass `["all"]` to include every available field. The all fields option requires Sensitive Data, Fraud Settings & Data, and Export permissions. When using `"all"`, new fields are automatically included as they become available — design your systems to handle schema changes gracefully. Parquet is recommended for resilience to schema changes. See [Available EO Fields](https://help.branch.io/developers-hub/docs/custom-exports#branch-available-eo-fields) for the complete list. filter report.filter Filter by fields and boolean operators against fields of the LogInstalls model; must be URI encoded and JSON parsed. Example: ["eq", "name", "PURCHASE"].

NOTE: ADD EACH SYNTAX AS ITS OWN STRING destination Information about where a finished report is stored and how it can be accessed subscription_type destination.subscription_type Should be set to "branch" if you want data stored in Branch's S3 bucket, and accessible via API cloud destination.cloud For cloud-based destinations. Can be either `s3` or `gcs`. bucket destination.bucket The cloud bucket being used for subscription. prefix destination.prefix The prefix or folder you are using for Branch exports. resource_access_id destination.resource_access_id ARN for the Role (AWS) or full service account name (GCP) you are using for Branch exports. recipient_emails destination.recipient_emails ONLY FOR `subscription_type`: `email`. List of recipient email addresses. Status of aggregate export subscription_id A persistent id for this subscription, used to check the status, locate recent export jobs, and make modifications status if PENDING, Branch is still working on an initial export to test out this subscription. If ACTIVE then the subscription was set up successfully. If FAILED then the test export was unsuccessful.
 description More information about the subscription's status. subscription_url Get details on this subscription. See the section "Get details on one log export subscription" below.
 Auth Client failed response error User Not Found error Internal Server Error error

</div>

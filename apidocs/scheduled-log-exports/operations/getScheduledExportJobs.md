---
aside: false
outline: false
pageClass: api-operation-page
title: "Details on Many Export Jobs - Scheduled Log Exports API"
---

# Details on Many Export Jobs

<ApiOperation operationId="getScheduledExportJobs" />

<div class="api-search-only">

Scheduled Log Exports API getScheduledExportJobs Details on Many Export Jobs Once your subscription is active, you can query for the exported data and download the data via the array `export_url`. For data accessible via API, the files are stored in Branch's S3 bucket, and you are provided a pre-signed S3 URL for exporting data. Typically data is accessible via API for 7 days, so be sure to download your data shortly after it is generated. Scheduled Log Exports API app_id query Unique identifier for Branch app of requested data. subscription_id path ID for your subscription. Obtained from the [/subscribe path](https://help.branch.io/developers-hub/reference/createscheduledlogexportsubscription). OK - Returns an array of export jobs Bad Request error

</div>

---
aside: false
outline: false
pageClass: api-operation-page
title: "Details on Single Export Job - Scheduled Log Exports API"
---

# Details on Single Export Job

<ApiOperation operationId="getDetailsOnIndividualExportJob" />

<div class="api-search-only">

Scheduled Log Exports API getDetailsOnIndividualExportJob Details on Single Export Job This endpoint provides a way to get details on the particular job, as long as you know the subscription_id and the job_id. Scheduled exports run at a regular cadence. Each individual run is considered a "job" and has a "job Id".
 Export Job success response Export Job Body job_id A persistent identifier for this export job run status whether the job is in progress, succeeded or failed. Available options are PENDING_GENERATION, PENDING_UPLOAD, RUNNING, SUCCEEDED and FAILED start_date The earliest date for which exported objects will be included. Format is set to yyyy-MM-dd'T'HH:mm:ssZ. Timezone is UTC.
 end_date The latest date for which exported objects will be included. Format is set to yyyy-MM-dd'T'HH:mm:ssZ. Timezone is UTC. Please note that this includes data through the final millisecond. So if end_date is 2023-05-30T19:59:59, this export job run will include data through the final millisecond i.e. 2023-05-30T19:59:59.999.
 export_url if the export job is for a subscription with destination.subscription_type set to branch, then this will be an array of pre-signed S3 URLs for export files that you can then download.
 lines_exported Number of objects in the export (e.g. CSV rows). Authentication Failed error Job ID Not Found

</div>

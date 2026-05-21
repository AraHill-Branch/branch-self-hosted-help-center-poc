---
aside: false
outline: false
pageClass: api-operation-page
title: "Export Download Status - Aggregate API"
---

# Export Download Status

<ApiOperation operationId="getExportDownloadStatus" />

<div class="api-search-only">

Aggregate API getExportDownloadStatus Export Download Status Check the status of an aggregate export job. When the job's status is `FINISHED`, the response includes a signed `response_url` you can use to download the export.
 Aggregate API job_id path The unique ID of the request. Obtained from the [Export Request](https://help.branch.io/developers-hub/docs/branch-aggregate-api#export-request).
 app_id query Unique identifier for Branch app of requested data. limit query The maximum number of results to return. format query Format of returned data. json or csv csv json Current status of the aggregate export job. When `status` is `FINISHED`, `response_url` contains the signed download link. code HTTP-style response code. status Current state of the export job. response_url Signed S3 URL for downloading the export. Present when `status` is `FINISHED`. error_message Human-readable error message. Present when `status` is `ERROR`. Authentication Failed error Job ID Not Found

</div>

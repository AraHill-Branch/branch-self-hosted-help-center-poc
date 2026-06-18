---
aside: false
outline: false
pageClass: api-operation-page
title: "Retrieve Download Status - Cross-Events Export API"
description: "Retrieve Download Status — Cross-Events Export API endpoint reference: parameters, request and response schema, and copy-paste code samples in 8 languages."
---

# Retrieve Download Status

<ApiOperation operationId="retrieveExportDownloadStatus" />

<div class="api-search-only">

Cross-Events Export API retrieveExportDownloadStatus Retrieve Download Status Receive a status update on your aggregate export request, as well as a URL to the data. Cross-Events Export API job_id path The unique ID of the request. Obtained from the [export request](https://help.branch.io/developers-hub/reference/cross-events-export-api#request-data-export). a1b2c3d4 app_id query The unique identifier for the app. Alternatively, provide `organization_id`. 123456789012345680 Job Successfully Finished code Response code job_id The unique ID of the request. status_url The URL of the export request. Bad request — typically an invalid or missing credential or parameter. error Job ID Not Found

</div>

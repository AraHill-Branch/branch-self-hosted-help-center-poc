---
aside: false
outline: false
pageClass: api-operation-page
title: "Get Export Download Status - Cohort API"
---

# Get Export Download Status

<ApiOperation operationId="getCohortExportStatus" />

<div class="api-search-only">

Cohort API getCohortExportStatus Get Export Download Status This endpoint provisions querying and export Cohort analytics
 Cohort API app_id query app_id | Unique identifier for Branch app of requested data. Either appId or organization_id is required. job_id path Unique identifier for job. Obtained from POST Export Cohort Analytics API. 0000-XXxx format query Format of returned data. json or csv csv json Status of aggregate export status Status of the query. code HTTP-style code representing the outcome of the status request. A 1xx value indicates a QUEUED or RUNNING status. response_url S3 url for downloading the response data. error_message Error message if the query failed Bad request — typically an invalid or missing credential or parameter. error

</div>

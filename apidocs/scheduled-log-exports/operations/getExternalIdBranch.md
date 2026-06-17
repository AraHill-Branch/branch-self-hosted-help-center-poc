---
aside: false
outline: false
pageClass: api-operation-page
title: "Get External ID - Scheduled Log Exports API"
description: "Get External ID — Scheduled Log Exports API endpoint reference: parameters, request and response schema, and copy-paste code samples in 8 languages."
---

# Get External ID

<ApiOperation operationId="getExternalIdBranch" />

<div class="api-search-only">

Scheduled Log Exports API getExternalIdBranch Get External ID Branch provides a unique "external Id" for your Branch account. This should be used when setting up data to be exported to your cloud data service (i.e. S3). NOTE: Developer either needs to provide app_id or organization_id along with accessToken to execute this operation.
 Scheduled Log Exports API The ID to be used in the Trust Relationship of the Role that you create to allow Branch to access your S3 bucket. Body for external id external_id A persistent external id against the App Id Bad request — typically an invalid or missing credential or parameter. error Job ID Not Found

</div>

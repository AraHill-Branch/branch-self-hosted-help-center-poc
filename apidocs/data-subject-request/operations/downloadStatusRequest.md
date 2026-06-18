---
aside: false
outline: false
pageClass: api-operation-page
title: "Download / Status Request - Data Subject Request API"
description: "Download / Status Request — Data Subject Request API endpoint reference: parameters, request and response schema, and copy-paste code samples in 8 languages."
---

# Download / Status Request

<ApiOperation operationId="downloadStatusRequest" />

<div class="api-search-only">

Data Subject Request API downloadStatusRequest Download / Status Request Gets the current status of the request for the given request_id generated from the Access/Erasure POST request. Data Subject Request Branch API request_id The UUID generated for the request made. This can be used to check the status of the request at a later time. Success. request_id The UUID generated for the request made. This can be used to check the status of the request at a later time. request_status This is the status of your request. It can be one of 
  “SUCCESS”: The request has been fulfilled.
  “PENDING”: A correct request has been received and is currently in the queue
  “IN_PROGRESS”: The request is currently being acted on.
 request_type Request type requested by the user export_url The pre-assigned s3 URL link to download the CSV file containing the identity objects requested. Bad request — typically an invalid or missing credential or parameter. error

</div>

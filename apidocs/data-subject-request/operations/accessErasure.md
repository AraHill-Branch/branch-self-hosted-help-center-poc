---
aside: false
outline: false
pageClass: api-operation-page
title: "Access / Erasure - Data Subject Request API"
description: "Access / Erasure — Data Subject Request API endpoint reference: parameters, request and response schema, and copy-paste code samples in 8 languages."
---

# Access / Erasure

<ApiOperation operationId="accessErasure" />

<div class="api-search-only">

Data Subject Request API accessErasure Access / Erasure This endpoint access any personal data associated with known given identities from Branch Metrics. Data Subject Request Branch API subject_request_type The type of post request being sent. In this case “access” subject_identities Success. request_id The UUID generated for the request made. This can be used to check the status of the request at a later time. request_status This is the status of your request. It can be one of 
  “SUCCESS”: The request has been fulfilled.
  “PENDING”: A correct request has been received and is currently in the queue
  “IN_PROGRESS”: The request is currently being acted on.
 Bad request — typically an invalid or missing credential or parameter. error Not Found/Incorrect API URL Rate limit exceeded — reduce request frequency and retry. error

</div>

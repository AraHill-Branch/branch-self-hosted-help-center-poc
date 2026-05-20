---
aside: false
outline: false
pageClass: api-operation-page
title: "Access / Erasure - Data Subject Request API"
---

# Access / Erasure

<ApiOperation operationId="accessErasure" />

<div class="api-search-only">

Data Subject Request API accessErasure Access / Erasure This endpoint access any personal data associated with known given identities from Branch Metrics. subject_request_type The type of post request being sent. In this case “access” subject_identities Ok request_id The UUID generated for the request made. This can be used to check the status of the request at a later time. request_status This is the status of your request. It can be one of 
  “SUCCESS”: The request has been fulfilled.
  “PENDING”: A correct request has been received and is currently in the queue
  “IN_PROGRESS”: The request is currently being acted on.
 Authentication Failed error Not Found/Incorrect API URL Rate Limit Reached error

</div>

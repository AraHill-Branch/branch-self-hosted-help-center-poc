---
aside: false
outline: false
pageClass: api-operation-page
title: "Check Data Readiness - Custom Exports API"
description: "Check Data Readiness — Custom Exports API endpoint reference: parameters, request and response schema, and copy-paste code samples in 8 languages."
---

# Check Data Readiness

<ApiOperation operationId="checkDataReadiness" />

<div class="api-search-only">

Custom Exports API checkDataReadiness Check Data Readiness Check if event or aggregate data is ready and available for a topic, for a particular hour of the day.
 Custom Exports API Check Data Readiness Request Body date The start of the interval time range, in the format YYYY-MM-DD hh:mm:ss (must be within the past year). warehouse_meta_type The type of data to check for. topic The topic associated with the data. app_id Your Branch App ID, found under Account Settings in your Branch Dashboard. Data Readiness Status Successfully Retrieved data_ready Whether the data is currently available. date The date associated with the data. Invalid Request error Internal Server Error error

</div>

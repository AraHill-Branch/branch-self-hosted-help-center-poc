---
aside: false
outline: false
pageClass: api-operation-page
title: "Request Data Export - Cross-Events Export API"
---

# Request Data Export

<ApiOperation operationId="requestCrossEventsDataExport" />

<div class="api-search-only">

Cross-Events Export API requestCrossEventsDataExport Request Data Export Initiate an export of your aggregate Branch data. start_date The start of the interval time range represented as an ISO-8601 complete date. end_date The end of the interval time range represented as an ISO-8601 complete date. dimensions An array representing dimension(s) to group by. See [dimensions](https://help.branch.io/developers-hub/reference/cross-events-export-api#dimensions) section for more. filter An object representing a filter, or multiple filters. See filter [examples](https://help.branch.io/developers-hub/reference/cross-events-export-api#filters). granularity The time granularity that each band value will represent. limit_sort_spec An object describing column/row ordering and limiting. See [schema](https://help.branch.io/developers-hub/reference/cross-events-export-api#schema-for-limit_sort_spec). aggregations An array where each element is an aggregation object. Aggregation object requires field name, display name, and data source. See [schema](https://help.branch.io/developers-hub/reference/cross-events-export-api#schema-for-aggregation) and [more](https://help.branch.io/developers-hub/reference/cross-events-export-api#data-source--field-name). response_format_compression Compression method to use for data file. response_format Compression format to use for data file. Success code job_id The unique ID of the request. status_url The URL of the export request. Authentication Failed error

</div>

---
aside: false
outline: false
pageClass: api-operation-page
title: "Create Export Request - Custom Exports API"
description: "Create Export Request — Custom Exports API endpoint reference: parameters, request and response schema, and copy-paste code samples in 8 languages."
---

# Create Export Request

<ApiOperation operationId="buildExportRequest" />

<div class="api-search-only">

Custom Exports API buildExportRequest Create Export Request By passing in the appropriate options, you can find and queue all records that match search criteria for export and build the relevant export request accordingly.
 Custom Exports API Custom Exports Request Body start_date The start of the interval time range represented as an ISO-8601 complete datetime including Hours, Minutes, Seconds, and Milliseconds. Datetime must be within the last 120 days. end_date The end of the interval time range represented as an ISO-8601 complete datetime including Hours, Minutes, Seconds, and Milliseconds. report_type An array representing event type of your report. See [Available Topics](https://help.branch.io/developers-hub/docs/custom-exports#branch-available-topics) the for complete list. fields An array representing fields/columns available in your report. Pass `["all"]` to include every available field. The all fields option requires Sensitive Data, Fraud Settings & Data, and Export permissions. When using `"all"`, new fields are automatically included as they become available — design your systems to handle schema changes gracefully. See [Available EO Fields](https://help.branch.io/developers-hub/docs/custom-exports#branch-available-eo-fields) for the complete list. limit The maximum number of results to return. timezone Timezone for results. Accepts [tz database strings](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) like ‘America/Los_Angeles’. Results are returned in the Branch Dashboard timezone if not provided. Will default to UTC only if Branch Dashboard timezone is not set.
 filter A filter requires an array with 3 specific string values: ["[Filter Prefix](https://help.branch.io/developers-hub/docs/custom-exports#cthulhu-filter-specification)", "[EO Field Key](https://help.branch.io/developers-hub/reference/custom-exports-api#available-eo-fields)", "EO Field Value"] response_format Format of returned data. json or csv allow_multiple_files Set this parameter to `true` if you want more than 15 million records returned. response_format_compression The file compression method to use for the data.
Required if `allow_multiple_files` is set to `true`. Status of aggregate export handle Unique request handle generated against the endpoint call. export_job_status_url The URL of the export request. Auth Client failed response error User Not Found error Internal Server Error error

</div>

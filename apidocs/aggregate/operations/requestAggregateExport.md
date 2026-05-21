---
aside: false
outline: false
pageClass: api-operation-page
title: "Request Aggregate Export - Aggregate API"
---

# Request Aggregate Export

<ApiOperation operationId="requestAggregateExport" />

<div class="api-search-only">

Aggregate API requestAggregateExport Request Aggregate Export By passing in the appropriate options, you can initiate an export of your aggregate Branch data.
 Aggregate API limit query The maximum number of results to return. format query Format of returned data. json or csv csv json start_date The start of the interval time range represented as an ISO-8601 complete date. end_date The end of the interval time range represented as an ISO-8601 complete date. data_source A string value representing the data source.  See [Topics](https://help.branch.io/developers-hub/docs/branch-aggregate-api#topics) for complete list.  dimensions An array representing dimension(s) to group by. Limit is 11. See [Dimensions](https://help.branch.io/developers-hub/docs/branch-aggregate-api#dimensions) for complete list.
 granularity The time granularity that each band value will represent. aggregation How to count events towards the final result count.  When querying with a data source of "eo_commerce_event", the aggregation may also be specified as "revenue", in which case the counts returned are the sum of revenue from matching events, and not the number of events themselves. enable_install_calculation If true, then Branch will de-dupe unattributed installs caused by duplicate events from non-opt-in users coming from paid ads (result from [iOS 14.5 privacy changes](https://help.branch.io/faq/docs/ios-14-faqs)). filters Status of aggregate export code job_id The unique ID of the request. This is used in the [Export Download Status request](https://help.branch.io/developers-hub/docs/branch-aggregate-api#export-download-status).
 status_url The URL of the export request. Authentication Failed error Internal Server Error error

</div>

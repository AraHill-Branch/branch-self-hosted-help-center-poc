---
aside: false
outline: false
pageClass: api-operation-page
title: "Post Query - Query API"
---

# Post Query

<ApiOperation operationId="postQuery" />

<div class="api-search-only">

Query API postQuery Post Query This endpoint provides a way to query dashboard analytics without having to access the Branch Dashboard.
 Query API limit query Maximum number of results to return in the response. If granularity is set to day, Branch will pull results up to the limit for each day. So if limit is set to 1000 and 5 days worth of data is queried, with granularity=day, then this API will return up to 5000 results.
 100 after query A pagination parameter indicating the index of the first result to return in the response. Eg, with 100 results returned, setting "after" to 50 would return elements 51-100
 query_id query Returned as query parameter on the "paging" object nexturl and previous_url. Locks the last event to count for a query, so new events that occur between queries are not added to the results (prevents count change over time)
 Query Request Body branch_key The Branch key of the app analytics information is being pulled for. branch_secret The Branch secret of the app, used for authentication. start_date A timestamp representing the oldest date to return data for. Timezone of the timestamp is set in your Branch Dashboard configuration. Please note that start_date cannot be earlier than 2017-10-14. end_date The last timestamp (exclusive) to return data for. No events that triggered after the enddate will be counted in the query results. Timezone of the timestamp is set in your Branch Dashboard configuration. Please note that end_date cannot be more than 7 days after the startdate data_source The type of event to query for. The values are valid Branch data sources. Here are the descriptions:
  * `eo_impression` - Real-time User-device level impressions/ad-views triggered via Impression Tracking Ad Links. SAN Ad Partner's impressions not included in this data source.
  * `eo_click` - Real-time user-device level Link clicks recorded through User Clicks on the Branch Links. SAN Ad Partner's clicks are not included in this bucket.
  * `xx_impression` - Combined Aggregated Data Source containing both Real-Time user-device level impressions and the SAN Ad Partner's Impressions passed to Branch Systems from SAN servers.
  * `xx_click` - Combined Aggregated Data source containing both Reat-Time User-device level Clicks and the SAN Ad Partner's Clicks passed to Branch systems from SAN servers.
 aggregation How to count events towards the final result count. When using unique_count, each event is only counted if an event by that user has not already been seen.
 dimensions List of event fields to use as splits for the query. Results counts are returned grouped with other events that have matchings values for each key provided in dimensions.
 filters enable_install_recalculation This field related to Result formatting. De-dupe unattributed installs caused by duplicate events from non-opt-in users coming from paid ads. granularity This field related to Result formatting. Range of time to roll multiple events into a single result count. Eg, with a value of "day" the counts for each day are returned independently, where "all" would return a single count for the entire time range.
 ordered_by Field indicates which key of result to sort results on. Only supports 1 sort key as of now. Possible values are any element of query "dimensions" or the value of "aggregation" in the query
 ordered Field indicates the sorting order of the output.
 zero_fill Whether to return result objects where the result count was 0. If set to false, results with count = 0 will be omitted from the response. If result is empty and zerofill=true, fields will be loaded with null/0 to provide a schema.
 Status of aggregate export results Array of result rows. Each row pairs a `result` object (the metric values for that grouping) with a `timestamp`. result results.result timestamp results.timestamp Timestamp for the result row. paging next_url paging.next_url URL to next result set total_count paging.total_count Number of total records retrieved against search Authentication Failed error

</div>

---
aside: false
outline: false
pageClass: api-operation-page
title: "Export Cohort Analytics - Cohort API"
---

# Export Cohort Analytics

<ApiOperation operationId="exportCohortAnalytics" />

<div class="api-search-only">

Cohort API exportCohortAnalytics Export Cohort Analytics This endpoint provisions querying and export Cohort analytics
 Cohort Request Body start_date The start of the interval time range represented as an ISO-8601 complete date. end_date The end of the interval time range represented as an ISO-8601 complete date. data_source A string value representing the cohort type measures The cohort measures to return. Limit is 3.See [Measure](https://help.branch.io/developers-hub/docs/cohort-exports#section-measures) for complete list.
 granularity_band_count Number of time units since the cohort event to return to the user. dimensions An array representing dimension(s) to group by. Limit is 11. See [Dimensions](https://help.branch.io/developers-hub/docs/cohort-exports#section-dimensions) for complete list.
 filter ordered Order of response based on ordered_by value. ordered_by The dimension used for sorting unique Whether or not to return unique values. cumulative If true, sum across bands so that a given band value is the sum of all preceding values plus the band value. per_user If true, divide each band value by the user count. granularity The time granularity that each band value will represent. enable_install_recalculation If true, then Branch will de-dupe unattributed installs caused by duplicate events from non-opt-in users coming from paid ads. (result from [iOS 14.5 privacy changes](https://help.branch.io/faq/docs/ios-14-faqs)). Status of aggregate export job_id Unique identifier used to retrieve job status and data. code HTTP-style code representing the outcome of the export request. status_url More information about the subscription's status. error_message Error message if the export call fails
 Authentication Failed error

</div>

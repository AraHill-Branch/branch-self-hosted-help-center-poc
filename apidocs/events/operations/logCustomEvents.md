---
aside: false
outline: false
pageClass: api-operation-page
title: "Logging Custom Events - Events API"
---

# Logging Custom Events

<ApiOperation operationId="logCustomEvents" />

<div class="api-search-only">

Events API logCustomEvents Logging Custom Events This endpoint is used to log custom events.

## Important considerations

- **Real-time only**: Events must be sent in real time as they occur. Branch does not support backtracking or historical event ingestion. Events with timestamps in the past will not be backfilled into reports.
- **SKAdNetwork (SKAN)**: SKAN must be handled natively by your app, not via the Branch SDK. Branch returns SKAN-relevant fields (such as `coarse_key` and `update_conversion_value`) in the API response so your app can update its conversion value accordingly. See the [SKAdNetwork guide](https://help.branch.io/marketer-hub/docs/skadnetwork) for details.
 branch_key The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings) name The name of the event to log. Can be a string of custom event name. For instance "picture swiped".
 user_data custom_data Additional custom key-value pairs that you want attached to the event. Values may be of any JSON type. Attached to events retrieved via Exports and sent via Webhooks. meta_data Additional metadata for the event. event_data Ok Successful event ingestion. The response carries SKAdNetwork-relevant fields that the app can use to update its native SKAN conversion value. ascending_only coarse_key locked update_conversion_value Authentication Failed error Rate Limit Reached error

</div>

---
aside: false
outline: false
pageClass: api-operation-page
title: "Logging Standard Events - Events API"
---

# Logging Standard Events

<ApiOperation operationId="logStandardEvents" />

<div class="api-search-only">

Events API logStandardEvents Logging Standard Events This endpoint is used to log standard events i.e. Commerce, Content, User Lifecycle.

## Important considerations

- **Real-time only**: Events must be sent in real time as they occur. Branch does not support backtracking or historical event ingestion. Events with timestamps in the past will not be backfilled into reports.
- **SKAdNetwork (SKAN)**: SKAN must be handled natively by your app, not via the Branch SDK. Branch returns SKAN-relevant fields (such as `coarse_key` and `update_conversion_value`) in the API response so your app can update its conversion value accordingly. See the [SKAdNetwork guide](https://help.branch.io/marketer-hub/docs/skadnetwork) for details.
 Events API Content-Type header Recommended. The media type of the request body. Should be `application/json`. application/json Accept header Recommended. The media type the client expects in the response. Should be `application/json`. application/json X-IP-Override header Optional. Override the IP address Branch uses for the event (for example, when forwarding events server-to-server from your own backend).

**Two requirements must be met for this header to function:**

1. **Your app ID must be allowlisted by Branch.** The header is ignored until allowlisting is enabled. [Open a support request](https://support.branch.io/) to have your app ID allowlisted before sending this header in production.
2. **You must also include `user_data.ip` in the request body** with the same IP value. Sending the header alone is not sufficient — the body field is what Branch persists for attribution.
 198.51.100.42 branch_key The Branch Key of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings) name The name of the event to log. Must be one of the following standard Branch Event names:
  * Commerce:
    * ADD_TO_CART
    * ADD_TO_WISHLIST
    * VIEW_CART
    * INITIATE_PURCHASE
    * ADD_PAYMENT_INFO
    * CLICK_AD
    * PURCHASE
    * SPEND_CREDITS
    * VIEW_AD
  * Content:
    * SEARCH
    * VIEW_ITEM
    * VIEW_ITEMS
    * RATE
    * SHARE
    * INITIATE_STREAM
    * COMPLETE_STREAM
  * User Lifecycle:
    * COMPLETE_REGISTRATION
    * COMPLETE_TUTORIAL
    * ACHIEVE_LEVEL
    * UNLOCK_ACHIEVEMENT
    * INVITE
    * LOGIN
    * START_TRIAL
    * SUBSCRIBE
 customer_event_alias The event alias as defined by you; used in addition to the event name defined above. user_data custom_data Additional custom key-value pairs that you want attached to the event. Values may be of any JSON type. Attached to events retrieved via Exports and sent via Webhooks. event_data content_items Ok Successful event ingestion. The response carries SKAdNetwork-relevant fields that the app can use to update its native SKAN conversion value. ascending_only coarse_key locked update_conversion_value Authentication Failed error Rate Limit Reached error

</div>

---
title: "Branch Event Ontology"
slug: branch-event-ontology
---

Branch's Event Ontology Data Schema is a unified format that is shared across all Branch products.

## Events Included

We split out events into logical groupings. We have the following distinct event groupings:

- impression
- click
- Branch CTA view
- open
- install
- reinstall
- web session start (measured every time a webpage with the Web SDK opens in a new tab or when a user clicks on a Branch Link and is redirected to a page with the Web SDK)
- pageview
- commerce event
- custom event
- content event
- user lifecycle event

::: warning Install Event Changes Post iOS 14.5
Apple requires users to opt into sharing their device data through [Apple's AppTrackingTransparency framework](https://developer.apple.com/app-store/user-privacy-and-data-use/). When an install is attributed to paid ads, a 2nd **install** event will fire post user opt-in

For additional information on changes post iOS 14.5, visit our [FAQ Pages](ios-14-faqs.md)
:::

The last four are groupings of multiple events.

- **Custom events** are any events you choose to track with Branch that fall outside our list of standard events.
- **Commerce events** include a short list of events such as PURCHASE that involve e-commerce.
- **Content events** include a short list of events such as VIEW\_ITEM that involve content and are not directly related to e-commerce.
- **User lifecycle events** are events marking a distinct action completed by a user as they progress through your app, such as COMPLETE\_REGISTRATION.

::: info Note
If a Branch event is blocked by a fraud rule, Branch logs it as a blocked event. For example, `purchase` would instead be `purchase_blocked`.
:::

## Branch Events

**Commerce Events**

| Event Name | iOS | Android | Web/API |
| --- | --- | --- | --- |
| Add To Cart | BranchStandardEventAddToCart | BRANCH\_STANDARD\_EVENT.ADD\_TO\_CART | ADD\_TO\_CART |
| Add To Wishlist | BranchStandardEventAddToWishlist | BRANCH\_STANDARD\_EVENT.ADD\_TO\_WISHLIST | ADD\_TO\_WISHLIST |
| View Cart | BranchStandardEventViewCart | BRANCH\_STANDARD\_EVENT.VIEW\_CART | VIEW\_CART |
| Initiate Purchase | BranchStandardEventInitiatePurchase | BRANCH\_STANDARD\_EVENT.INITIATE\_PURCHASE | INITIATE\_PURCHASE |
| Add Payment Info | BranchStandardEventAddPaymentInfo | BRANCH\_STANDARD\_EVENT.ADD\_PAYMENT\_INFO | ADD\_PAYMENT\_INFO |
| Click Ad | BranchStandardEventClickAd | BRANCH\_STANDARD\_EVENT.CLICK\_AD | CLICK\_AD |
| Purchase | BranchStandardEventPurchase | BRANCH\_STANDARD\_EVENT.PURCHASE | PURCHASE |
| Reserve | BranchStandardEventReserve | BRANCH\_STANDARD\_EVENT.RESERVE | RESERVE |
| Spend Credits | BranchStandardEventSpendCredits | BRANCH\_STANDARD\_EVENT.SPEND\_CREDITS | SPEND\_CREDITS |
| View Ad | BranchStandardEventViewAd | BRANCH\_STANDARD\_EVENT.VIEW\_AD | VIEW\_AD |

**Content Events**

| Event Name | iOS | Android | Web/API |
| --- | --- | --- | --- |
| Search | BranchStandardEventSearch | BRANCH\_STANDARD\_EVENT.SEARCH | SEARCH |
| View Item | BranchStandardEventViewItem | BRANCH\_STANDARD\_EVENT.VIEW\_ITEM | VIEW\_ITEM |
| View Items | BranchStandardEventViewItems | BRANCH\_STANDARD\_EVENT.VIEW\_ITEMS | VIEW\_ITEMS |
| Rate | BranchStandardEventRate | BRANCH\_STANDARD\_EVENT.RATE | RATE |
| Share | BranchStandardEventShare | BRANCH\_STANDARD\_EVENT.SHARE | SHARE |
| Initiate Stream | BranchStandardEventInitiateStream | BRANCH\_STANDARD\_EVENT.INITIATE\_STREAM | INITIATE\_STREAM |
| Complete Stream | BranchStandardEventCompleteStream | BRANCH\_STANDARD\_EVENT.COMPLETE\_STREAM | COMPLETE\_STREAM |

**Lifecycle Events**

| Event Name | iOS | Android | Web/API |
| --- | --- | --- | --- |
| Complete Registration | BranchStandardEventCompleteRegistration | BRANCH\_STANDARD\_EVENT.COMPLETE\_REGISTRATION | COMPLETE\_REGISTRATION |
| Complete Tutorial | BranchStandardEventCompleteTutorial | BRANCH\_STANDARD\_EVENT.COMPLETE\_TUTORIAL | COMPLETE\_TUTORIAL |
| Achieve Level | BranchStandardEventAchieveLevel | BRANCH\_STANDARD\_EVENT.ACHIEVE\_LEVEL | ACHIEVE\_LEVEL |
| Unlock Achievement | BranchStandardEventUnlockAchievement | BRANCH\_STANDARD\_EVENT.UNLOCK\_ACHIEVEMENT | UNLOCK\_ACHIEVEMENT |
| Invite | BranchStandardEventInvite | BRANCH\_STANDARD\_EVENT.INVITE | INVITE |
| Login | BranchStandardEventLogin | BRANCH\_STANDARD\_EVENT.LOGIN | LOGIN |
| Start Trial | BranchStandardEventStartTrial | BRANCH\_STANDARD\_EVENT.START\_TRIAL | START\_TRIAL |
| Subscribe | BranchStandardEventSubscribe | BRANCH\_STANDARD\_EVENT.SUBSCRIBE | SUBSCRIBE |

**Custom Events**

[Custom Events](track-branch-events.md#track-custom-events)  can be tracked if the event does not fall within one of the categories above.

## Field Examples

At each event, we provide a considerable amount of information. The following table has an overview. Several of the fields below are objects which themselves have many fields.

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | A unique id for the event |
| `name` | String | The name of the event, such as CLICK, INSTALL, PURCHASE, or custom event names like "signup". |
| `timestamp` | Long | Unix timestamp in milliseconds for the event |
| `user_data_opted_in` | Boolean | Will always be false on first install. Will only be `true` on first app session **after** users opts in to Apple's App Tracking Transparency framework from paid ads |
| `days_from_install_to_opt_in` | Int | number of days between when the first install (`user_data_opted_in= false`) and when this event occurred |
| `request_id` | String | A Branch generated identifier used to track the request through our pipeline. |
| `days_from_last_attributed_touch_to_event` | Int | Number of days between when the last touch occurred and when this event subsequently occurred. |
| `last_attributed_touch_type` | enum { CLICK, IMPRESSION } | Whether the last attributed touch was an impression or a click |
| `last_attributed_touch_data_tilde_id` | Long | id for the last attributed touch (Short Links only). set automatically server side. |
| `last_attributed_touch_data_tilde_keyword_match_type` | String | How the keyword the user searched got matched to the ad, e.g. Broad, Exact, Phrase, Search Match. |
| `last_attributed_touch_timestamp` | Long | Unix timestamp in milliseconds for the last attributed touch. |
| `last_attributed_touch_data` | Object | If an impression, click, or branch CTA view, this field contains the link data directly associated with the event. For all other events, this is the data associated with the last qualifying touch (click, impression, etc) to occur before this event. Subject to attribution windows, within which the last click trumps a more recent impression. |
| `days_from_last_cta_view_to_event` | Int | Number of days between when the last Branch CTA view occurred and when this event subsequently occurred (see datasource definition of CTA view). |
| `last_cta_view_timestamp` | Long | Unix timestamp in milliseconds for the last Branch CTA view. |
| `last_cta_view_data` | Object | This is the data associated with the last qualifying Branch CTA View to occur before this event. Subject to attribution windows, within which the last click trumps a more recent impression. |
| `first_event_for_user` | Boolean | If this is the first time for this persona that this event has been triggered. |
| `user_data` | Object | Data associated with the user who triggered the event. |
| `event_data` | Object | Data associated with commerce or content events, but not specific to any one item. |
| `content_items` | Array of Object | Array of content items. A content item is any distinct item, whether a product, piece of content, restaurant, service, flight, hotel, or any kind of media (text, visual, audio.) |
| `custom_data` | Object | Partner-specified custom key-value pairs associated with an event, excluding Touches, Branch CTA view. |

## Full List of Fields

If you are building an integration with Branch or simply wish to learn more about the fields we offer, please download the `.xlsx` file below. This file can be opened with Microsoft Excel, Apple Numbers, or Google Sheets.

The file provides a comprehensive list of events and fields, definitions, and data types, along with which fields are available for which event types.

Branch Event Ontology\_ 11-03-2025

134.70 KB
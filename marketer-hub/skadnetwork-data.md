---
title: "SKAdNetwork Data"
slug: skadnetwork-data
---

## Postback Data Tiers

|  | Tier 0 | Tier 1 | Tier 2 | Tier 3 |
| --- | --- | --- | --- | --- |
| **Postback 1** | - `source-identifier` | - `source-identifier` - `coarse-conversion-value` | - `source-identifier` - `conversion-value` | - `source-identifier` - `conversion-value` - `source-app-id` or `source-domain` |
| **Postback 2 + 3** | n/a | - `source-identifier` - `coarse-conversion-value` | - `source-identifier` - `coarse-conversion-value` | - `source-identifier` - `coarse-conversion-value` |

## Postback Measurement Windows

|  | Window Spans |
| --- | --- |
| Postback 1 | Days 0-2 |
| Postback 2 | Days 3-7 |
| Postback 3 | Days 8-35 |

## Fields

::: info Returned by Apple Postback
General and Last Attributed Touch Data fields **do not** come from the Apple Postback for SKAdNetwork.
:::

### General Fields

| Field | Type | Description | Example | Availability |
| --- | --- | --- | --- | --- |
| `id` | varchar | SKadNetwork Message ID, unique ID created by Branch for every postback received. | e92eb789-2e93-4ada-91d4-b758a900cb2e | SKAN 3+ |
| `timestamp` | bigint | Timestamp representing when Branch received the postback from the ad network. | 1620415056299 | SKAN 3+ |
| `invalid_reason` | varchar | Reason Branch marks postback from ad network invalid. Only available for skadnetwork-invalid-messages. | INVALID\_SIGNATURE | SKAN 3+ |
| `app_id` | bigint | Branch App ID. | 638469555697504342 | SKAN 3+ |
| `organization_id` | bigint | Branch Organization ID. | 862418696042206147 | SKAN 3+ |
| `annotation_dollar_3p` | varchar | Branch 3p value of the ad network that sent the postback. | a\_tiktok\_ads | SKAN 3+ |
| `annotation_conversion_value_mapped_value` | varchar | Mapped value of the conversion value received (as set in the Branch Dashboard). | COMPLETE\_REGISTRATION | SKAN 3+ |
| `annotation_customer_event_alias` | varchar | Mapped value of the customer event alias | Purchase1 | SKAN 3+ |
| `annotation_revenue_lower` | varchar | Mapped value of the lower revenue value received. | 5.0 | SKAN 3+ |
| `annotation_revenue_upper` | varchar | Mapped value of the upper revenue value received. | 20.0 | SKAN 3+ |

### Last Attributed Touch Data Fields

| Field | Type | Description | Example | Availability |
| --- | --- | --- | --- | --- |
| `last_attributed_touch_data_tilde_ad_set_id` | varchar | Ad set ID - Optional field supplied by some ad partners. | bd7ffd1c-53de-498d-981c-57912fc6de91 | SKAN 3+ |
| `last_attributed_touch_data_tilde_campaign_id` | varchar | Campaign ID (non-Apple ID) - Optional field supplied by some ad partners. | 64d02bc0-f4d4-41ff-a93e-1e20f8d7f345 | SKAN 3+ |
| `last_attributed_touch_data_tilde_campaign` | varchar | Campaign Name - Optional field supplied by some ad partners. | IOS14\_Campaign\_Male(18-30)\_Fantou | SKAN 3+ |

### Body Fields

All of the body fields come from the Apple Postback for SKAdNetwork except for the following field(s):

- `body_source_domain`

| Field | Type | Description | Example | Availability |
| --- | --- | --- | --- | --- |
| `body_transaction_id` | varchar | A unique value for this validation; use for deduplicating install [and probably conversion] validation messages. This is part of the postback from Apple. | 38b64295-0875-4d2e-868a-3969e2fc8e1e | SKAN 3+ |
| `body_version` | varchar | The version of the SKAdNetwork API being used by the publisher app. | 2.0 | SKAN 2+ |
| `body_ad_network_id` | varchar | ID of the attributed ad network on the postback. This ID is assigned by Apple when an ad network registers for SKAdNetwork. | 424m5lk.skadnetwork | SKAN 3+ |
| `body_campaign_id` | integer | Campaign ID which will be a number from 1-100. | 47 | SKAN 3+ |
| `body_app_id` | bigint | The advertiser app ID - App Store ID. | 1350133141 | SKAN 3+ |
| `body_attribution_signature` | varchar | Apple’s attribution signature in install/conversion Postbacks, that is used to verify the validity of the postback. | MDUCGec/xnWx== | SKAN 3+ |
| `body_redownload` | boolean | If false, the postback represents an install If true, the postack represents a reinstall. | false | SKAN 3+ |
| `body_source_app_id` | bigint | The publisher app ID - App Store ID. This may be not included by Apple if number of postbacks do not reach a certain threshold. | 447188370 | SKAN 3+ |
| `body_conversion_value` | integer | Conversion value (0-63) on the postback, which represents a post-install action. The highest conversion value that the end user performed in during the timer will be reflected. This may be not included by Apple if number of postbacks do not reach a certain threshold. | 15 | SKAN 3+ |
| `body_fidelity_type` | integer | If 1, this represents a Store-Kit rendered ad (App Store product page, rendered by Store Kit) If 0, this represents a "View-Through" ad (Custom, provided by ad network). | 1 | SKAN 3+ |
| `body_did_win` | boolean | If it is true, that will signify that the partner won the claim. | true | SKAN 3+ |
| `body_postback_sequence_index` | integer | Enables marketers to easily distinguish between postbacks 1, 2, and 3. The possible integer values of 0, 1, and 2 signify the order of postbacks that result from the three conversion windows. For more information, see [Receiving postbacks in multiple conversion windows](https://developer.apple.com/documentation/storekit/skadnetwork/receiving_postbacks_in_multiple_conversion_windows). | 1 | SKAN 4+ |
| `body_source_identifier` | string | The hierarchical source identifier, with 2 or 4 digits (depending on the postback value). | 12 | SKAN 3+ |
| `body_coarse_conversion_value` | string | A coarse value, if the app provides one. | low | SKAN 4+ |
| `body_source_domain` | For attributable web ads. | Ad set name - Optional field supplied by some ad partners. **Does not** come from the Apple Postback. | IOS14-Install-Male(18+) | SKAN 3+ |
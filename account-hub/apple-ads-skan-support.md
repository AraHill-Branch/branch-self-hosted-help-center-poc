---
title: "Apple Ads SKAN Support"
slug: apple-ads-skan-support
---

## Overview

Branch is happy to share that Apple Ads (previously Apple Ads) now supports SKAdNetwork (SKAN) attribution tracking! This update helps you better understand how users discover and download your iOS app through Apple's advertising platform.

Please note, this is **available for SKAN versions 1.0, 2.0, and 3.0 only**.

## Key updates

- **Live now**: Full attribution tracking support and enhanced dashboard reporting.
- **Coming April 28**: Detailed campaign mapping (see the [“Technical data mappings” section](apple-ads-skan-support.md#technical-data-mappings) below).

## What this means for you

If you enable SKAN attribution tracking with Apple Ads, you'll get better insights into how users find your app through:

- App Store search results
- App Store Today tab
- App Store Search tab
- App Store product pages

## What to do next

If you want to access this new attribution data, you'll need to:

1. Enable [SKAN direct postbacks](skadnetwork-direct-postback.md).

2. Have your technical team implement a simple app update.

::: warning Warning
If you do not take these steps, your app will remain unaffected, but you will not have access to SKAN attribution data for Apple Ads.
:::

## Technical data mappings

The table in this section details how Branch maps Apple Ads fields to Branch fields.

These mappings will be **available April 28**.

Additional notes about the columns:

- `body_campaign_id`: Apple will only send Branch 4 possible values for this field.
- `last_attributed_touch_data_tilde_campaign`: Branch takes `body_campaign_id` and maps it to this field.
- **Touch type**: The value for this field will alway be “Taps” (clicks).
- `body_fidelity_type`: Branch reflects the touch type in this field, using the value 1 to indicate clicks.

| `body_campaign_id` | `last_attributed_touch_data_tilde_campaign` | Touch type | `body_fidelity_type` |
| --- | --- | --- | --- |
| 10 | APPSTORE\_SEARCH\_RESULTS | Taps | 1 |
| 20 | APPSTORE\_TODAY\_TAB | Taps | 1 |
| 30 | APPSTORE\_SEARCH\_TAB | Taps | 1 |
| 40 | APPSTORE\_PRODUCT\_PAGES\_BROWSE | Taps | 1 |

## Additional resources

For more detailed help:

- Check out our [additional SKAdNetwork documentation](skadnetwork-index.md).
- Contact your account manager for support.
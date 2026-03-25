---
title: "Google DMA Compliance"
slug: google-dma-compliance
---

In response to recent changes made to Google conversion APIs, Branch SDKs now include the `setDMAParamsForEEA()` method, which helps you pass consent information from your user to Google. Branch has also made changes to our Attribution API and Events API so you can send user consent data along with your requests.

## Overview

In 2023, the European Union designated Alphabet (Google) as a "Gatekeeper" company, which means Google is required to act in accordance with the new regulations related to the Digital Markets Act (DMA).

These regulations become enforceable starting **March 6 2024**.

Because of this, Google is [making changes](https://blog.google/around-the-globe/google-europe/an-update-on-our-preparations-for-the-dma/) to its conversion APIs by adding new parameters related to user consent data.

In turn, Branch has introduced a new method called `setDMAParamsForEEA()` into our SDKs that will send your user consent data to Google. Similarly, we have also updated the parameters that can be sent to our Attribution API and Events API to accommodate this change.

## SDK Changes

### Parameters

The `setDMAParamsForEEA()` method takes 3 parameters:

| Parameter Name | Type | Description | When `true` | When `false` |
| --- | --- | --- | --- | --- |
| `eeaRegion` | Boolean | Whether European regulations, including the DMA, apply to this user and conversion. | User is **included** in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA. | User is considered **excluded** from European Union regulations. |
| `adPersonalizationConsent` | Boolean | Whether end user has granted or denied ads personalization consent. | User has **granted** consent for ads personalization. | User has **denied** consent for ads personalization. |
| `adUserDataUsageConsent` | Boolean | Whether end user has granted or denied consent for 3P transmission of user level data for ads. | User has **granted** consent for 3P transmission of user-level data for ads. | User has **denied** consent for 3P transmission of user-level data for ads. |

### Default Behavior

When `eeaRegion` is set to `true`, the parameters `adPersonalizationConsent` and `adUserDataUsageConsent` **must also be set**.

When parameters are successfully set using `setDMAParamsForEEA()`, they will be sent along with every future request to the following Branch endpoints:

- `/v1/install`
- `/v1/open`
- `/v2/event`

::: warning
**Warning:** `NULL` **by Default**

Please note that the 3 parameters passed to `setDMAParamsForEEA()` are all `NULL` by default.

**Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.**
:::

### Examples

For iOS examples in Swift and Objective-C, visit the iOS Advanced Features [page](ios-advanced-features.md).

For Android examples in Kotlin and Java, visit the Android Advanced Features [page](android-advanced-features.md).

## API Changes

### Parameters

Mirroring the 3 parameters passed to the new `setDMAParamsForEEA()` method, Branch has introduced 3 parameters to our Attribution API and Events API that allow you to send user consent data with your requests:

| Parameter Name | Type | Description | When `true` | When `false` |
| --- | --- | --- | --- | --- |
| `dma_eea` | Boolean | Whether European regulations, including the DMA, apply to this user and conversion. | User is **included** in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA. | User is considered **excluded** from European Union regulations. |
| `dma_ad_personalization` | Boolean | Whether end user has granted or denied ads personalization consent. | User has **granted** consent for ads personalization. | User has **denied** consent for ads personalization. |
| `dma_ad_user_data` | Boolean | Whether end user has granted or denied consent for 3P transmission of user level data for ads. | User has **granted** consent for 3P transmission of user-level data for ads. | User has **denied** consent for 3P transmission of user-level data for ads. |

::: warning Warning: Not Included by Default
Please note that the 3 new API parameters are not sent with requests by default.

**Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.**
:::

### Attribution API

The Branch Attribution API offers developers a way track `INSTALL`, `REINSTALL`, and `OPEN` events while also supplying a payload of attribution properties.

The 3 new request body parameters are top-level parameters for this API, as shown in the API's full parameter [table](attribution-api.md).

See below for sample requests containing user consent data:

::: code-group

```custom [cURL (iOS)]
curl -v -d '{
 "branch_key": "TODO",
 "branch_secret": "TODO",
 "server_to_server": true,
 "app_version": "1.12.4",
 "os": "iOS",
 "os_version": "10.0",
 "model": "iPhone",
 "screen_height": 2208,
 "screen_width": 1242,
 "facebook_app_link_checked": false,
 "user_agent": "{FULL_USER_AGENT_HERE}",
 "hardware_id": "000AAAA-0A0A-000AAA-AAAA000",
 "hardware_id_type": "idfa",
 "ios_vendor_id": "000AAAA-0A0A-000AAA-AAAA000",
 "is_hardware_id_real": true,
 "ad_tracking_enabled": true,
 "custom_param_1": "Parameter 1",
 "custom_param_2": "Parameter 2",
 "custom_param_3": "Parameter 3",
 "dma_eea": true,
 "dma_ad_personalization": true,
 "dma_ad_user_data": true
}' "https://api2.branch.io/v1/open" -H "X-IP-Override: 1.2.3.4"
```

```custom [cURL (Andriod)]
curl -v -d '{
 "branch_key": "TODO",
 "branch_secret": "TODO",
 "server_to_server": true,
 "app_version": "1.12.4",
 "os": "Android",
 "os_version": 26,
 "model": "SM-G960U1",
 "screen_height": 2076,
 "screen_width": 1080,
 "facebook_app_link_checked": false,
 "user_agent": "{FULL_USER_AGENT_HERE}",
 "hardware_id": "00aa0a000a0a0",
 "google_advertising_id": "000AAAA-0A0A-000AAA-AAAA000",
 "advertising_ids": {
    "oaid": "000AAAA-0A0A-000AAA-AAAA000"
 },
 "google_search_install_referrer": "referrer_value_here",
 "clicked_referrer_ts": 1574699946,
 "install_begin_ts": 1574699955,
 "is_hardware_id_real": true,
 "ad_tracking_enabled": true,
 "custom_param_1": "Parameter 1",
 "custom_param_2": "Parameter 2",
 "custom_param_3": "Parameter 3",
 "dma_eea": true,
 "dma_ad_personalization": true,
 "dma_ad_user_data": true
}' "https://api2.branch.io/v1/open" -H "X-IP-Override: 1.2.3.4"
```

:::

Visit the full [guide](attribution-api.md) on Branch's Attribution API to learn more.

### Events API

The Branch Events API is a robust tool for tracking events that take place in your app.

The 3 new request body parameters are nested parameters for this API, living inside the `user_data` object. See this API's top-level parameter [table](events-api.md) and its `user_data` parameter [table](events-api.md) for more.

See below for sample requests containing user consent data:

::: code-group

```custom [Example Commerce Request (cURL)]
curl -vvv -d '{
  "name": "PURCHASE",
  "customer_event_alias": "my custom alias",
  "user_data": {
    "advertising_ids": {
      "oaid": "00aa00a0-0000-0a00-a000-aaa0000a0aaa"
    },
    "os": "Android",
    "os_version": 25,
    "environment": "FULL_APP",
    "aaid": "abcdabcd-0123-0123-00f0-000000000000",
    "android_id": "a12300000000",
    "limit_ad_tracking": false,
    "developer_identity": "user123",
    "country": "US",
    "language": "en",
    "ip":"000.000.0.0",
    "local_ip": "000.000.0.0",
    "brand": "LGE",
    "app_version": "1.0.0",
    "model": "Nexus 5X",
    "screen_dpi": 420,
    "screen_height": 1794,
    "screen_width": 1080,
    "dma_eea": true,
    "dma_ad_personalization": true,
    "dma_ad_user_data": true
  },
  "custom_data": {
    "purchase_loc": "Palo Alto",
    "store_pickup": "unavailable"
  },
  "event_data": {
    "transaction_id": "tras_Id_1232343434",
    "currency": "USD",
    "revenue": 180.2,
    "shipping": 10.5,
    "tax": 13.5,
    "coupon": "promo-1234",
    "affiliation": "high_fi",
    "description": "Preferred purchase"
  },
  "content_items": [
    {
      "$content_schema": "COMMERCE_PRODUCT",
      "$og_title": "Nike Shoe",
      "$og_description": "Start loving your steps",
      "$og_image_url": "http://example.com/img1.jpg",
      "$canonical_identifier": "nike/1234",
      "$publicly_indexable": false,
      "$price": 101.2,
      "$locally_indexable": true,
      "$quantity": 1,
      "$sku": "1101123445",
      "$product_name": "Runner",
      "$product_brand": "Nike",
      "$product_category": "Sporting Goods",
      "$product_variant": "XL",
      "$rating_average": 4.2,
      "$rating_count": 5,
      "$rating_max": 2.2,
      "$creation_timestamp": 1499892854966,
      "$exp_date": 1499892854966,
      "$keywords": [
        "sneakers",
        "shoes"
      ],
      "$address_street": "230 South LaSalle Street",
      "$address_city": "Chicago",
      "$address_region": "IL",
      "$address_country": "US",
      "$address_postal_code": "60604",
      "$latitude": 12.07,
      "$longitude": -97.5,
      "$image_captions": [
        "my_img_caption1",
        "my_img_caption_2"
      ],
      "$condition": "NEW",
      "$custom_fields": "{\"foo1\":\"bar1\",\"foo2\":\"bar2\"}"
    },
    {
      "$og_title": "Nike Woolen Sox",
      "$canonical_identifier": "nike/5324",
      "$og_description": "Fine combed woolen sox",
      "$publicly_indexable": false,
      "$price": 80.2,
      "$locally_indexable": true,
      "$quantity": 5,
      "$sku": "110112467",
      "$product_name": "Woolen Sox",
      "$product_brand": "Nike",
      "$product_category": "Apparel & Accessories",
      "$product_variant": "Xl",
      "$rating_average": 3.3,
      "$rating_count": 5,
      "$rating_max": 2.8,
      "$creation_timestamp": 1499892854966
    }
  ],
  "metadata": {},
  "branch_key": "key_test_XXX"
}' https://api2.branch.io/v2/event/standard
```

```custom [Example Content Request (cURL)]
curl -vvv -d '{
  "name": "VIEW_ITEMS",
  "customer_event_alias": "my custom alias",
  "user_data": {
    "advertising_ids": {
      "oaid": "00aa00a0-0000-0a00-a000-aaa0000a0aaa"
    },
    "os": "Android",
    "os_version": 25,
    "environment": "FULL_APP",
    "aaid": "abcdabcd-0123-0123-00f0-000000000000",
    "android_id": "a12300000000",
    "limit_ad_tracking": false,
    "developer_identity": "user123",
    "country": "US",
    "language": "en",
    "ip": "000.000.0.0",
    "local_ip": "000.000.0.0",
    "brand": "LGE",
    "app_version": "1.0.0",
    "model": "Nexus 5X",
    "screen_dpi": 420,
    "screen_height": 1794,
    "screen_width": 1080,
    "dma_eea": true,
    "dma_ad_personalization": true,
    "dma_ad_user_data": true
  },
  "custom_data": {
    "purchase_loc": "Palo Alto",
    "store_pickup": "unavailable"
  },
  "event_data": {
    "search_query": "red sneakers",
    "description": "Preferred purchase"
  },
  "content_items": [
    {
      "$content_schema": "COMMERCE_PRODUCT",
      "$og_title": "Nike Shoe",
      "$og_description": "Start loving your steps",
      "$og_image_url": "http://example.com/img1.jpg",
      "$canonical_identifier": "nike/1234",
      "$publicly_indexable": false,
      "$price": 101.2,
      "$locally_indexable": true,
      "$sku": "1101123445",
      "$product_name": "Runner",
      "$product_brand": "Nike",
      "$product_category": "Sporting Goods",
      "$product_variant": "XL",
      "$rating_average": 4.2,
      "$rating_count": 5,
      "$rating_max": 2.2,
      "$creation_timestamp": 1499892854966,
      "$exp_date": 1499892854966,
      "$keywords": [
        "sneakers",
        "shoes"
      ],
      "$address_street": "230 South LaSalle Street",
      "$address_city": "Chicago",
      "$address_region": "IL",
      "$address_country": "US",
      "$address_postal_code": "60604",
      "$latitude": 12.07,
      "$longitude": -97.5,
      "$image_captions": [
        "my_img_caption1",
        "my_img_caption_2"
      ],
      "$condition": "NEW",
      "$custom_fields": "{\"foo1\":\"bar1\",\"foo2\":\"bar2\"}"
    },
    {
      "$og_title": "Nike Woolen Sox",
      "$canonical_identifier": "nike/5324",
      "$og_description": "Fine combed woolen sox",
      "$publicly_indexable": false,
      "$price": 80.2,
      "$locally_indexable": true,
      "$sku": "110112467",
      "$product_name": "Woolen Sox",
      "$product_brand": "Nike",
      "$product_category": "Apparel & Accessories",
      "$product_variant": "Xl",
      "$rating_average": 3.3,
      "$rating_count": 5,
      "$rating_max": 2.8,
      "$creation_timestamp": 1499892854966
    }
  ],
  "metadata": {},
  "branch_key": "key_test_XXX"
}' https://api.branch.io/v2/event/standard
```

```custom [Example Lifecycle Request (cURL)]
curl -vvv -d '{
  "name": "COMPLETE_REGISTRATION",
  "user_data": {
    "advertising_ids": {
      "oaid": "00aa00a0-0000-0a00-a000-aaa0000a0aaa"
    },
    "os": "Android",
    "os_version": 25,
    "environment": "FULL_APP",
    "aaid": "abcdabcd-0123-0123-00f0-000000000000",
    "android_id": "a12300000000",
    "limit_ad_tracking": false,
    "developer_identity": "user123",
    "country": "US",
    "language": "en",
    "ip": "000.000.0.0",
    "local_ip": "000.000.0.0",
    "brand": "LGE",
    "app_version": "1.0.0",
    "model": "Nexus 5X",
    "screen_dpi": 420,
    "screen_height": 1794,
    "screen_width": 1080,
    "dma_eea": true,
    "dma_ad_personalization": true,
    "dma_ad_user_data": true
  },
  "custom_data": {
    "foo": "bar"
  },
  "event_data": {
    "description": "Preferred purchase"
  },
  "metadata": {},
  "branch_key": "key_test_XXX"
}' https://api.branch.io/v2/event/standard
```

:::

Visit the full [guide](events-api.md) on Branch's Events API to learn more.
---
title: "Postback Macros and Functions"
slug: postback-macros-functions
---

## Overview

The following list shows the macros and available functions that Branch supports in your Postback URLs and Webhooks. When you use these macros and functions, Branch dynamically resolves/replaces them with their corresponding values before notifying the specified postback URL.

## URL Macros

We’ve grouped our macros into categories based the type of information being collected.

::: info Using Functions to Modify Postback Macros
All postback macros can be hashed/encrypted/modified using a variety of postback URL functions. For information about the available postback URL functions applicable to the following postback macros, see the URL Function Macros section below.
:::

### Postback Data

The following macros represent the high-level data points associated with the postback event itself.

| Macro | Type | Description |
| --- | --- | --- |
| `${(name)!}` | String | The name of the postback event. The list of event names can be found here. |
| `${(customer_event_alias)!}` | String | The alias name of the event provided by the customer; used in addition to the standard Branch names defined in the namefield. |
| `${(organization_id)!}` | Fixed64 | The ID associated with your organization for which the event occurred; assigned by Branch. |
| `${(organization_name)!}` | String | The name of your organization for which the event occurred; provided during account setup. |
| `${(event_timestamp)!}` | Fixed64 | The UNIX timestamp in milliseconds for the event; set automatically server side. |
| `${(origin)!}` | String | Where the attribution was recorded:   - branch - segment - mparticle |
| `${(id)!}` | String | The ID associated with the event; assigned by Branch. |
| `<#if attributed>1<#else>0</#if>` | Boolean | Whether or not the event is attributed; 1 (true/yes) OR 0 (false/no) |
| `${(days_from_last_attributed_touch_to_event)!}` | Int32 | The number of days between the last attributed touch and the event. |
| `${(hours_from_last_attributed_touch_to_event)!}` | Int32 | The number of hours between the last attributed touch and the event; capped at 24. |
| `${(minutes_from_last_attributed_touch_to_event)!}` | Int32 | The number of minutes between the last attributed touch and the event; capped at 60. |
| `${(seconds_from_last_attributed_touch_to_event)!}` | Int32 | The number of seconds between the last attributed touch and event; capped at 60. |
| `${(last_attributed_touch_type)!}` | String | The type of the attribution the event was for:   - click - impression - impression |
| `${(last_attributed_touch_timestamp)!}` | Fixed64 | The UNIX timestamp in milliseconds for the last attributed touch; set automatically server side. |
| `${(di_match_click_token)!}` | Fixed64 | The Branch Flow ID used by other third party attribution providers to match a click to an install, using the Android install referrer; set server side, relayed by the client. |
| `${last_cta_view_timestamp)!}` | Fixed64 | The UNIX timestamp in milliseconds for the last Branch CTA view. set automatically server side. |
| `<#if deep_linked>1<#else>0</#if>` | Boolean | If the current app or web session resulted in the user being deep linked. set automatically server side; 1 (true/yes) OR 0 (false/no). |
| `<#if first_event_for_user>1<#else>0</#if>` | Boolean | If this is the first time for this persona that this event has been triggered. set automatically server side; 1 (true/yes) OR 0 (false/no). |
| `${(store_install_begin_timestamp)!}` | Fixed64 | The time the install button is clicked in the Play Store / App Store. |
| `${(referrer_click_timestamp)!}` | Fixed64 | The time of the Play Store launch (Android only) |
| `<#if existing_user>1<#else>0</#if>` | Boolean | If the user associated with the event is pre-existing or new; 1 (true/yes) OR 0 (false/no) |
| `${(webhook_id)!}` | Fixed64 | The ID of the webhook/postback itself; assigned by Branch. |
| `${(webhook_partner_key)!}` | String | The machine readable partner name to which Branch is sending payload; set automatically server side. |

### Attributed Touch Data

The following macros represent the data points associated with aspects of the advertising campaign itself.

| Macro | Type | Description |
| --- | --- | --- |
| `${(last_attributed_touch_data.~id)!}` | Fixed64 | The ID for the last attributed touch (Short Links only). set automatically server side. |
| `${(last_attributed_touch_data.~campaign)!}` | String | The campaign (name) specified for the last attributed touch. can be specified on links by the client, or pre-filled automatically server side in some cases. |
| `${(last_attributed_touch_data.~campaign_id)!}` | String | The campaign ID specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~campaign_type)!}` | String | The type of Google campaign; Google AAP field. set automatically server side. |
| `${(last_attributed_touch_data.~customer_campaign)!}` | String | The customer campaign specified for the last attributed touch. can be specified on links by the client. |
| `${(last_attributed_touch_data.~channel)!}` | String | The channel specified for the last attributed touch. can be specified on links by the client, or pre-filled automatically server side in some cases. |
| `${(last_attributed_touch_data.~feature)!}` | String | The feature specified for the last attributed touch. can be specified on links by the client, or pre-filled automatically server side in some cases. |
| `${(last_attributed_touch_data.~stage)!}` | String | The stage specified for the last attributed touch. can be specified on links by the client, or pre-filled automatically server side in some cases. |
| `${(last_attributed_touch_data.~tags)!}` | String | The tags specified for the last attributed touch. can be specified on links by the client, or prefilled automatically server side in some cases. |
| `${(last_attributed_touch_data.~advertising_partner_name)!}` | String | The human-readable advertising partner name specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~advertising_partner_id)!}` | String | The ID for the advertising partner specified for the last attributed touch. set automatically server side OR specified by the client. |
| `${(last_attributed_touch_data.~secondary_publisher)!}` | String | The secondary publisher specified for the last attributed touch. passed by the ad network. |
| `${(last_attributed_touch_data.~secondary_publisher_id)!}` | String | The ID of the secondary publisher specified for the last attributed touch. passed by the ad network. |
| `${(last_attributed_touch_data.~customer_secondary_publisher)!}` | String | The ID of the secondary publisher specified for the last attributed touch. passed by the ad network. |
| `${(last_attributed_touch_data.~creative_name)!}` | String | The creative name specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~creative_id)!}` | String | The creative ID specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~ad_set_name)!}` | String | The ad set name specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~ad_set_id)!}` | String | The ad set ID specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~customer_ad_set_name)!}` | String | The customer ad set name specified for the last attributed touch. can be specified on links by the client. |
| `${(last_attributed_touch_data.~ad_name)!}` | String | The ad name specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~ad_id)!}` | String | The ad ID specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~customer_ad_name)!}` | String | The customer ad name specified for the last attributed touch. can be specified on the link by the client. |
| `${(last_attributed_touch_data.~keyword)!}` | String | The keyword specified for the last attributed touch. set automatically server side. |
| `${(last_attributed_touch_data.~keyword_id)!}` | String | The unique ID for keyword of the last touch as provided by Google. |
| `${(last_attributed_touch_data.~customer_keyword)!}` | String | The customer keyword of the last touch. Can be specified on links by the client. |
| `${(last_attributed_touch_data.~branch_ad_format)!}` | String | The ad format of the last touch. Ad Format chosen upon Branch link creation and set as an analytics tag. e.g. Search, Display, Product Ad, App only. |
| `${(last_attributed_touch_data.~technology_partner)!}` | String | The technology partner of last touch, as set with an analytics tag. Any third party that's used to enhance a campaign (e.g. audiences being provided, creative optimization), with the exception of agencies. |
| `${(last_attributed_touch_data.~banner_dimensions)!}` | String | The dimensions of display banner of the last touch, as set with an analytics tag |
| `${(last_attributed_touch_data.~placement)!}` | String | The placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns. |
| `${(last_attributed_touch_data.~placement_id)!}` | String | The ID of placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns. |
| `${(last_attributed_touch_data.~customer_placement)!}` | String | The customer specified placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns. |
| `${(last_attributed_touch_data.~sub_site_name)!}` | String | Reference to the site where the ad was displayed. passed by the ad network. |
| `${(last_attributed_touch_data.~customer_sub_site_name)!}` | String | Customer reference to the site where the ad was displayed. Can be specified on links by the client. |
| `${(last_attributed_touch_data.~agency)!}` | String | The agency of the last touch, as set with an analytics tag. Agency that runs ad campaigns on behalf of advertiser. |
| `${(last_attributed_touch_data.~agency_id)!}` | String | The ID of agency of the last touch, as set with an analytics tag. Agency that runs ad campaigns on behalf of advertiser. |
| `${(last_attributed_touch_data.~optimization_model)!}` | String | Optimization model of the last touch, as set with an analytics tag. Model detailing the event for which the campaign is optimizing, e.g. for installs, clicks, events. |
| `${(last_attributed_touch_data.~secondary_ad_format)!}` | String | Secondary ad format of the last touch, as set with an analytics tag or during ad link creation flow in the dashboard. Ad Partner Specific Ad format, such as Display Engagement Ad for Google. |
| `${(last_attributed_touch_data.~external_touch)!}` | String | The ID of click or impression (view) sent to Branch from a third party. Used to tie an attributed event back to the original touch. Where the attributed partner is Google SAN, this will be the gclid value. See gclid in this sheet for more information. |
| `${(last_attributed_touch_data.~journey_name)!}` | String | The "Campaign Name" or "title" for an audience rule / Journey. can be specified on links by the client, or pre-filled automatically server side in some cases. |
| `${(last_attributed_touch_data.~journey_id)!}` | String | The audience rule ID for a Journey. set automatically server side. |
| `${(last_attributed_touch_data.~view_name)!}` | String | The "View Name" or "title" for a branch view / template. can be specified on links by the client, or pre-filled automatically server side in some cases. |
| `${(last_attributed_touch_data.~view_id)!}` | String | Branch view ID for a Journey. set automatically server side. |
| `${(last_attributed_touch_data.+referring_domain)!}` | String | Domain of the URL that the user visited before landing on a page with a Journey. This should use the same data source that we use for the "came directly from a URL" audience filter. specified by the client. |
| `${(last_attributed_touch_data.dollar_3p)!}` | String | Set if an event originated with a touch on Google AMP or Facebook Instant Article. specified by the client. |
| `${(last_attributed_touch_data.+web_format)!}` | String | The format of the webside:   - amp - instant\_articles |
| `${(last_attributed_touch_data.+current_features)!}` | String | Branch feature (determined by Branch) of the current touch. set automatically server side;   - desktop\_deepviews - desktop\_journeys - mobile\_deepviews - mobile\_journeys - ads - email - social - quick\_links |
| `${(last_attributed_touch_data.+via_features)!}` | String | All Branch features (determined by Branch) which were determined, via attribution, to have led to this event. For example, if an email link click leads to a Journey which leads to the app, the published eo\_open will have +via\_features:   - EMAIL - JOURNEYS   or set server side:   - desktop\_deepviews - desktop\_journeys - mobile\_deepviews - mobile\_journeys - ads - email - social - quick\_links |
| `<#if last_attributed_touch_data.dollar_fb_data_terms_not_signed>1<#else>0</#if>` | Boolean | if the mobile data terms are not signed from facebook. this means we need to hide everything attribution-related from external events. set automatically server side; 1 (true/yes) OR 0 (false/no) |
| `${(last_attributed_touch_data.+touch_id)!}` | String | The attributing touch's (impression, click, etc) ID. |
| `${(last_attributed_touch_data.custom_fields)!}` | String | Any deep link data specified for the last touch not captured by the above fields e.g. {foo:true, deeplink\_path: id/12}. "custom\_fields" should not be surfaced as an independent object. The values should be included in last\_attributed\_touch\_data. specified by the client. |
| `${(last_attributed_touch_data.user_data_ip)!}` | String | IP address of the user's device. |
| `${(last_attributed_touch_data.user_data_user_agent)!}` | String | The User-Agent string format including product name and version and system (e.g. “Mozilla/5.0 (iPad)”). |
| `${(last_attributed_touch_data.+device_brand_name)!}` | String | Brand or make of user's device (such as “Apple” or “Samsung”); determined by parsing the user-agent sent via HTTP headers. |
| `${(last_attributed_touch_data.+device_brand_model)!}` | String | Model of the user's device (such as “Droid Pro”); determined by parsing the user-agent sent via HTTP headers. |

### User Data

The following macros represent the data points associated with the user / device collected at the time of conversion.

| Macro | Type | Description |
| --- | --- | --- |
| `${(user_data.os)!}` | String | The operating system of the device on which the event was registered: |
| `${(user_data.os_version)!}` | String | The version of the operating system of the device on which the event was registered; specified by client. |
| `${(user_data.os_version_android)!}` | String | The operating system version (Android) of the device where the event occurred; specified by the client. |
| `${(user_data.environment)!}` | String | The runtime environment where the event occurred:   - full\_web - full\_app - instant\_app - imessage\_app |
| `${(user_data.platform)!}` | String | A convenience dimension that allows users to easily see web vs app, desktop vs mobile, and iOS vs Android vs other |
| `${(user_data.aaid)!}` | String | Android/Google advertising id of the device where the event occurred. specified by the client. |
| `${(user_data.android_id)!}` | String | Android hardware id. Can only be reset by wiping the device. specified by the client. |
| `${(user_data.idfa)!}` | String | iOS advertising id of the device where the event occurred. specified by the client. |
| `${(user_data.idfv)!}` | String | OS vendor id of the device where the event occurred. Scoped to a vendor e.g. Facebook: idfv is the same for Facebook and Messenger but different Twitter. specified by the client. |
| `${(user_data.kindle_aid)!}` | String | The ID associated with a Kindle device. |
| `${(user_data.windows_aid)!}` | String | The Windows Advertising ID. |
| `<#if user_data.limit_ad_tracking>1<#else>0</#if>` | Boolean | If the partner has opted to not be tracked by advertisers. on iOS 10+, accompanied by idfa of 0s; 1 (true/yes) OR 0 (false/no). |
| `<#if user_data.is_jailbroken>1<#else>0</#if>` | Boolean | If true, then the phone that sent this event was jailbroken; 1 (true/yes) OR 0 (false/no). |
| `${(user_data.user_agent)!}` | String | The user agent of the browser or app where the event occurred. Usually associated with a webview. |
| `${(user_data.ip)!}` | String | The IP address from which the API call tracking the event originated; set automatically server side. |
| `${(user_data.developer_identity)!}` | String | The developer-specified identity for a user; specified by the client. |
| `${(user_data.language)!}` | String | The [ISO 639-1 Code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) of the language. |
| `${(user_data.sdk_version)!}` | String | The Branch SDK version used to track this event; specified by the client. |
| `${(user_data.http_referrer)!}` | String | The referral URL that led to the current page where Web SDK logged web session start; specified by the client. |
| `${(user_data.referral_source)!}` | String | Android: `activity.getCallingPackage()`. iOS: Web referrer, safari referrer, or bundle\_id. |
| `${(user_data.app_version)!}` | String | The app version where the event occurred; specified by the client. |
| `${(user_data.device_type)!}` | String | The type of device |
| `${(user_data.carrier_name)!}` | String | Which carrier covers the device where the event occurred. specified by the client. |
| `${(user_data.brand)!}` | String | Brand or make of user device (such as “Apple” or “Samsung”). |
| `${(user_data.model)!}` | String | The model of the device where the event occurred. specified by the client. |
| `${(user_data.geo_continent_code)!}` | String | The continent code, derived from IP address (above), set automatically server side. |
| `${(user_data.geo_region_code)!}` | String | The region code, derived from IP address (above), set automatically server side. |
| `${(user_data.geo_region_en)!}` | String | The human-readable region, derived from IP address (above), set automatically server side. |
| `${(user_data.geo_dma_code)!}` | UInt32 | The [DMA Code](https://support.google.com/richmedia/answer/2745487?hl=en), derived from IP address (above), set automatically server side. |
| `${(user_data.geo_city_code)!}` | UInt32 | The city code, derived from IP address (above), set automatically server side. |
| `${(user_data.geo_city_en)!}` | String | The human-readable city, derived from IP address (above), set automatically server side. |
| `${(user_data.geo_lat)!}` | Float | Latitude, derived from IP address (above), set automatically server side. |
| `${(user_data.geo_lon)!}` | Float | Longitude, derived from IP address (above), set automatically server side. |
| `${(user_data.geo_country_code)!}` | String | The [ISO 3166 code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) of the country. |
| `${(user_data.geo_country_en)!}` | String | The country name in English, derived from IP address (above), set automatically server side. |
| `${(user_data.geo_postal_code)!}` | String | The postal code, derived from IP address (above), set automatically server side. |
| `${(user_data.browser)!}` | String | A human-readable name for the browser from which the web event originated. Derived from user-agent string. specified by the client. |
| `${(user_data.installer_package_name)!}` | String | The package name of the app that installed the app; set automatically server side. |
| `${(user_data.cpu_type)!}` | String | The type of central processing unit used by the device ; set automatically server side. |
| `${(user_data.build)!}` | String | The build version of the device ; set automatically server side. |
| `${(user_data.internet_connection_type)!}` | String | The type of connection to the internet (e.g. Wifi) used by the device ; set automatically server side. |
| `${(user_data.screen_width)!}` | String | The width of the screen of the device ; set automatically server side. |
| `${(user_data.screen_height)!}` | String | The height of the screen of the device; set automatically server side. |
| `${(user_data.carrier_name)!}` | String | The name of the carrier (e.g. Verizon) of the device ; set automatically server side. |

### Event Data

The following macros represent the data points associated with the events completed by the user / device collected at the time of conversion.

| Macro | Type | Description |
| --- | --- | --- |
| `${(event_data.transaction_id)!}` | String | The partner-specified transaction id for their internal use. specified by the client. |
| `${(event_data.currency)!}` | String | [ISO 4217 Code](https://en.wikipedia.org/wiki/ISO_4217) for currency. |
| `${(event_data.revenue)!}` | Double | The partner-specified revenue for the event. specified by the client. |
| `${(event_data.revenue_in_usd)!}` | Double | Revenue in USD, based off of revenue, currency, and exchange rate. set automatically server side. |
| `${(event_data.exchange_rate)!}` | Double | The exchange rate from the time the event occurred (may be up to 24 hours old but is typically updated within the hour). specified by the client. |
| `${(event_data.shipping)!}` | Double | Shipping cost associated with the transaction. specified by the client. |
| `${(event_data.tax)!}` | Double | Total tax associated with the transaction. specified by the client. |
| `${(event_data.coupon)!}` | String | Transaction coupon redeemed with the transaction (e.g. "SPRING2017"). specified by the client. |
| `${(event_data.affiliation)!}` | String | Store or affiliation from which this transaction occurred (e.g. Google Store). specified by the client. |
| `${(event_data.search_query)!}` | String | Search query associated with the event. specified by the client. |
| `${(event_data.ad_type)!}` | String | Ad type that the user saw or clicked on. Defined by Facebook. specified by the client:   - banner - interstitial - rewarded\_video - native |
| `${(event_data.description)!}` | String | Description associated with the event, not necessarily specific to any individual content items. specified by the client. |

### Content Items Data

The following macros represent the data points associated with the contents within events completed by the user / device collected at the time of conversion

| Macro | Type | Description |
| --- | --- | --- |
| `${(content_items[0].$content_schema)!}` | String | The category / schema for a piece of content. specified by the client:commerce\_auction / commerce\_business / commerce\_other / commerce\_product / commerce\_restaurant / commerce\_service / commerce\_travel\_flight / commerce\_travel\_hotel / commerce\_travel\_other / game\_state / media\_image / media\_mixed / media\_music / media\_other / media\_video / other / text\_article / text\_blog / text\_other / text\_recipe / text\_review / text\_search\_results / text\_story / text\_technical\_doc | |
| `<#if content_items[0].$publicly_indexable>1<#else>0</#if>` | Boolean | true: content can be indexed for local (device) use OR false: cannot index for local use; specified by the client; 1 (true/yes) OR 0 (false/no) |
| `<#if content_items[0].$locally_indexable>1<#else>0</#if>` | Boolean | true: content can be seen by anyone OR false: cannot index for public use; specified by the client; 1 (true/yes) OR 0 (false/no) |
| `${(content_items[0].$exp_date!}` | Fixed64 | The last time afterwhich this content is no longer valid. null / 0 mean no limit. specified by the client. |
| `${(content_items[0].$canonical_identifier)!}` | String | Used to allow Branch to unify content/messages. specified by the client. |
| `${(content_items[0].$og_title)!}` | String | The rendered document title (also for searching) - if a collection then the title for the collection not the individual items. specified by the client. |
| `${(content_items[0].$canonical_url)!}` | String | A web URL which refers to the content on the public web (mobile or desktop). Preferably is a permalink, and used as canonical URL elsewhere (main website, AMP pages, etc.). specified by the client. |
| `${(content_items[0].$og_description)!}` | String | The description (for individual item). specified by the client. |
| `${(content_items[0].$og_image_url)!}` | String | The image URL. specified by the client. |
| `${(content_items[0].$keywords)!}` | String | Any keywords. specified by the client. |
| `${(content_items[0].$price)!}` | Double | The unit price for the product/content. specified by the client. |
| `${(content_items[0].$price_in_usd)!}` | Double | The unit price in USD, based off of price, currency, and exchange rate. specified by the client OR set automatically server side. |
| `${(content_items[0].$quantity)!}` | Double | The quantity of the item to be ordered (for PURCHASE, ADD\_TO\_CART, etc). specified by the client. |
| `${(content_items[0].$value)!}` | Double | The value is the product of `$price` multiplied by `$quantity`. specified by the client OR set automatically server side. |
| `${(content_items[0].$value_in_usd)!}` | Double | The value in USD (see `$value` above), based off of price, currency, and exchange rate. specified by the client OR set automatically server side. |
| `${(content_items[0].$sku)!}` | String | The product sku or product id. specified by the client. |
| `${(content_items[0].$product_name)!}` | String | The product's name. specified by the client. |
| `${(content_items[0].$product_brand)!}` | String | The product's brand. specified by the client. |
| `${(content_items[0].$product_variant)!}` | String | The product variant (e.g. XL). specified by the client; animals\_and\_pets\_supplies / apparel\_and\_accessories / arts\_and\_entertainment / baby\_and\_toddler / business\_and\_industrial / cameras\_and\_optics / electronics / food\_beverage\_and\_tobacco / furniture / hardware / health\_and\_beauty / home\_and\_garden / luggage\_and\_bags / mature / media / office\_supplies / religious\_and\_ceremonial / software / sporting\_goods / toys\_and\_games / vehicles\_and\_parts |
| `${(content_items[0].$rating)!}` | Double | The rating given by the user on a **RATE** event. specified by the client. |
| `${(content_items[0].$rating_average)!}` | Double | The average rating of the item. specified by the client. |
| `${(content_items[0].$rating_count)!}` | Int64 | The number of ratings for the item. specified by the client. |
| `${(content_items[0].$rating_max)!}` | Double | The maximum possible rating for the item (e.g. 5 stars is highest possible rating). specified by the client. |
| `${(content_items[0].$address_street)!}` | String | The street address for a restaurant, business, room (hotel), etc. specified by the client. |
| `${(content_items[0].$address_city)!}` | String | The city for a restaurant, business, room (hotel), etc. specified by the client. |
| `${(content_items[0].$address_country)!}` | String | The country code for a restaurant, business, room (hotel), etc. specified by the client. |
| `${(content_items[0].$address_postal_code)!}` | String | The postal/zip code for a restaurant, business, room (hotel), etc. specified by the client. |
| `${(content_items[0].$latitude)!}` | Float | The latitude for a restaurant, business, room (hotel), etc. specified by the client. |
| `${(content_items[0].$longitude)!}` | Float | The longitude for a restaurant, business, room (hotel), etc. specified by the client. |
| `${(content_items[0].$condition)!}` | String | For auctions, whether the item is new, good, acceptable, etc. specified by the client; new / excellent / good / fair / poor / used / refurbished / other |
| `${(content_items[0].$image_captions)!}` | String | The captions associated with the image. specified by the client. |
| `${(content_items[0].$creation_timestamp)!}` | Fixed64 | The time the content was created. specified by the client. |
| `${(content_items[0].$currency)!}` | String | The [ISO 4217 code](https://en.wikipedia.org/wiki/ISO_4217) of currency. |
| `${(content_items[0].custom_fields)!}` | String | The partner-specified custom key-value pairs associated with a BUO. specified by the client. |

### Cohort Related Data

The following macros represent the data points associated with the cohorted users based on install or re-engagement activity.

| Macro | Type | Description |
| --- | --- | --- |
| `${(install_activity.event_name)!}` **OR** `${(reengagement_activity.event_name)!}` | String | The name of the cohort event. |
| `<#if install_activity.attributed>1<#else>0</#if>`**OR**`<#if reengagement_activity.attributed>1<#else>0</#if>` | Boolean | Whether or not the install/reengagement event is attributed; 1 (true/yes) OR 0 (false/no) |
| `${(install_activity.timestamp)!}` **OR** `${(reengagement_activity.timestamp)!}` | Fixed64 | An epoch timestamp for the time of the install/reengagement in UTC in milliseconds |
| `${(install_activity.touch_data.tilde_advertising_partner_name)!}` **OR** `${(reengagement_activity.touch_data.tilde_advertising_partner_name)!}` | String | The human-readable advertising partner name specified for the last attributed touch. set automatically server side. |
| `${(install_activity.touch_data.dollar_3p)!}` **OR** `${(reengagement_activity.touch_data.dollar_3p)!}` | String | Set if an event originated with a touch on Google AMP or Facebook Instant Article. specified by the client. |

### CTA View Data

The following macros represent the data points associated with Journeys or Deepview data where there is no link click.

| Macro | Type | Description |
| --- | --- | --- |
| `${(last_cta_view_data.~id)!}` | Fixed64 | The ID for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~campaign)!}` | String | The campaign (name) specified for the last CTA view. can be specified on links by the client, or prefilled automatically server side in some cases. |
| `${(last_cta_view_data.~campaign_id)!}` | String | The campaign ID specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~campaign_type)!}` | String | The type of Google campaign; Google AAP field. set automatically server side. |
| `${(last_cta_view_data.~customer_campaign)!}` | String | The customer campaign specified for the last CTA view. can be specified on links by the client. |
| `${(last_cta_view_data.~channel)!}` | String | The channel specified for the last CTA view. can be specified on links by the client, or prefilled automatically server side in some cases. |
| `${(last_cta_view_data.~feature)!}` | String | The feature specified for the last CTA view. can be specified on links by the client, or prefilled automatically server side in some cases. |
| `${(last_cta_view_data.~stage)!}` | String | The stage specified for the last CTA view. can be specified on links by the client, or prefilled automatically server side in some cases. |
| `${(last_cta_view_data.~tags)!}` | String | The tags specified for the last CTA view. can be specified on links by the client, or prefilled automatically server side in some cases. |
| `${(last_cta_view_data.~advertising_partner_name)!}` | String | The human-readable advertising partner name specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~advertising_partner_id)!}` | String | The ID for the advertising partner specified for the last CTA view. set automatically server side OR specified by the client. |
| `${(last_cta_view_data.~secondary_publisher)!}` | String | The secondary publisher specified for the last CTA view. passed by the ad network. |
| `${(last_cta_view_data.~secondary_publisher_id)!}` | String | The ID of the secondary publisher specified for the last CTA view. passed by the ad network. |
| `${(last_cta_view_data.~customer_secondary_publisher)!}` | String | The ID of the secondary publisher specified for the last CTA view. passed by the ad network. |
| `${(last_cta_view_data.~creative_name)!}` | String | The creative name specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~creative_id)!}` | String | The creative ID specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~ad_set_name)!}` | String | The ad set name specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~ad_set_id)!}` | String | The ad set ID specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~customer_ad_set_name)!}` | String | The customer ad set name specified for the last CTA view. can be specified on links by the client. |
| `${(last_cta_view_data.~ad_name)!}` | String | The ad name specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~ad_id)!}` | String | The ad ID specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~customer_ad_name)!}` | String | The customer ad name specified for the last CTA view. can be specified on the link by the client. |
| `${(last_cta_view_data.~keyword)!}` | String | The keyword specified for the last CTA view. set automatically server side. |
| `${(last_cta_view_data.~keyword_id)!}` | String | The unique ID for keyword of the last view as provided by Google. |
| `${(last_cta_view_data.~customer_keyword)!}` | String | The customer keyword of the last view. Can be specified on links by the client. |
| `${(last_cta_view_data.~branch_ad_format)!}` | String | The ad format of the last view. Ad Format chosen upon Branch link creation and set as an analytics tag. e.g. Search, Display, Product Ad, App only. |
| `${(last_cta_view_data.~technology_partner)!}` | String | The technology partner of last view, as set with an analytics tag. Any third party that's used to enhance a campaign (e.g. audiences being provided, creative optimization), with the exception of agencies |
| `${(last_cta_view_data.~banner_dimensions!}` | String | The dimensions of display banner of the last view, as set with an analytics tag. |
| `${(last_cta_view_data.~placement)!}` | String | The placement of the last view, as set with an analytics tag. Actual app or website the ad appears on display campaigns |
| `${(last_cta_view_data.~placement_id)!}` | String | The ID of placement of the last view, as set with an analytics tag. Actual app or website the ad appears on display campaigns |
| `${(last_cta_view_data.~customer_placement)!}` | String | The customer specified placement of the last view, as set with an analytics tag. Actual app or website the ad appears on display campaigns |
| `${(last_cta_view_data.~sub_site_name)!}` | String | Reference to the site where the ad was displayed. passed by the ad network. |
| `${(last_cta_view_data.~customer_sub_site_name)!}` | String | Customer reference to the site where the ad was displayed. Can be specified on links by the client. |
| `${(last_cta_view_data.~agency)!}` | String | The agency of the last view, as set with an analytics tag. Agency that runs ad campaigns on behalf of advertiser. |
| `${(last_cta_view_data.~agency_id)!}` | String | The ID of agency of the last view, as set with an analytics tag. Agency that runs ad campaigns on behalf of advertiser. |
| `${(last_cta_view_data.~optimization_model)!}` | String | Optimization model of the last view, as set with an analytics tag. Model detailing the event for which the campaign is optimizing, e.g. for installs, clicks, events |
| `${(last_cta_view_data.~secondary_ad_format)!}` | String | Secondary ad format of the last view, as set with an analytics tag or during ad link creation flow in the dashboard. Ad Partner Specific Ad format, such as Display Engagement Ad for Google. |
| `${(last_cta_view_data.~external_touch_id)!}` | String | The ID of click or impression (view) sent to Branch from a third party. Used to tie an attributed event back to the original touch. Where the attributed partner is Google SAN, this will be the gclid value. See `gclid` in this sheet for more information. |
| `${(last_cta_view_data.~journey_name)!}` | String | The "Campaign Name" or "title" for an audience rule / Journey. can be specified on links by the client, or prefilled automatically server side in some cases. |
| `${(last_cta_view_data.~journey_id)!}` | String | The audience rule ID for a Journey. set automatically server side. |
| `${(last_cta_view_data.~view_name)!}` | String | The "View Name" or "title" for a branch view / template. can be specified on links by the client, or prefilled automatically server side in some cases. |
| `${(last_cta_view_data.~view_id)!}` | String | Branch view ID for a Journey. set automatically server side. |
| `${(last_cta_view_data.plus_referring_domain)!}` | String | Domain of the URL that the user visited before landing on a page with a Journey. This should use the same data source that we use for the "came directly from a URL" audience filter. specified by the client. |
| `${(last_cta_view_data.3p)!}` | String | Set if an event originated with a touch on Google AMP or Facebook Instant Article. specified by the client. |
| `${(last_cta_view_data.+web_format)!}` | String | The format of the website;   - amp - instant\_articles |
| `${(last_cta_view_data.+via_features)!}` | String | Branch feature (determined by Branch) of the current touch. set automatically server side; desktop\_deepviews / desktop\_journeys / mobile\_deepviews / mobile\_journeys / ads / email / social / quick\_links |
| `${(last_cta_view_data.+touch_id)!}` | String | The attributing touch's (impression, click, etc) ID |
| `${(last_cta_view_data.custom_fields)!}` | String | Any deep link data specified for the last view not captured by the above fields e.g. {foo:true, deeplink\_path: 'id/12'}. "custom\_fields" should not be surfaced as an independent object. The values should be included in last\_attributed\_touch\_data. specified by the client. |

### Custom Data

The following macros represent the data points associated with the custom data points pre-assigned by Branch.

| Macro | Type | Description |
| --- | --- | --- |
| `${(custom_data.sub1)!}` | String | General-purpose field for passing data from click through to installs, opens, and conversion events. |
| `${(custom_data.sub2)!}` | String | General-purpose field for passing data from click through to installs, opens, and conversion events. |
| `${(custom_data.sub3)!}` | String | General-purpose field for passing data from click through to installs, opens, and conversion events. |
| `${(custom_data.sub4)!}` | String | General-purpose field for passing data from click through to installs, opens, and conversion events. |
| `${(custom_data.sub5)!}` | String | General-purpose field for passing data from click through to installs, opens, and conversion events. |
| `${(custom_data.content_id)!}` | String | ID of the content interacted with during an in-app event. |
| `${(custom_data.content_type)!}` | String | The type of content interacted with during an in-app event. |
| `${(custom_data.date1)!}` | String | Time of check-in for the in-app event “reservation”. |
| `${(custom_data.date2)!}` | String | Time of check-out for the in-app event “reservation”. |
| `${(custom_data.level)!}` | String | The event level achieved. |
| `${(custom_data.quantity)!}` | String | The count related to an in-app event; e.g. number of guests or credits spent. |
| `${(custom_data.rating)!}` | String | The rating related to an in-app event; e.g. a 4 star rating. |
| `${(custom_data.transaction_id)!}` | String | ID of the transaction recorded on conversion. |

## URL Function Macros & Freemarker

Along with our URL macros, we also support a variety of URL functions to be used in conjunction with our macros. Using functions gives you more control over how your data is formatted for your own internal uses.

We’ve grouped our functions into categories based on what type of action is being taken as well as what type of information is being handled.

More information on Freemarker can be found [here](https://freemarker.apache.org/docs/ref_directive_alphaidx.html).

### Hashing/Encoding/etc.

Function macros that can hash, encode/decode or otherwise modify another macro’s value; e.g. the MD5 hash of a unique identifier.

| Hashing/Encoding/etc. | Type | Description |
| --- | --- | --- |
| `<@alphanumeric>INPUT_MACRO_HERE` | Function | Removes non-alphanumeric characters from a string. |
| `<@base64>INPUT_MACRO_HERE` | Base64 | Base64 encodes the contents |
| `<@json>INPUT_MACRO_HERE` | JSON | JSON encodes the contents as a string. |
| `<@jsonmap>INPUT_MACRO_HERE` | JSON | JSON encodes the data (be sure not to quote), in whatever. |
| `<@lower>INPUT_MACRO_HERE` | Function | Returns the inputted value formatted as lowercase with separating colons. |
| `<@md5>INPUT_MACRO_HERE` | MD5 | MD5 encodes the contents |
| `<@sha1>INPUT_MACRO_HERE` | SHA1 | SHA1 encodes the contents |
| `<@sha256>INPUT_MACRO_HERE` | SHA256 | SHA256 encodes the contents |
| `<@upper>INPUT_MACRO_HERE` | Function | Returns the inputted value formatted as uppercase with separating colons. |
| `<@urldecode>INPUT_MACRO_HERE` | Decode | URL decodes the contents. |
| `<@urlencode>INPUT_MACRO_HERE` | Encode | URL encodes the contents. |

### Datetime

Function macros that return datetime information about another macro’s value; e.g. the time of an in-app purchase event.

| Format | Description |
| --- | --- |
| `<@dateformat output_date_format="yyyy-MM-dd">INPUT_MACRO_HERE` | Returns the calendar date of the specified conversion |
| `<@dateformat output_date_format="yyyy-MM-dd HH:mm:ss">INPUT_MACRO_HERE` | Returns the DateTime of the specified conversion |
| `<@dateformat output_date_format="TIMESTAMP_SECONDS">INPUT_MACRO_HERE` | Returns the current unix timestamp in seconds of the specified conversion |
| `<@dateformat output_date_format="TIMESTAMP_MILLIS">INPUT_MACRO_HERE` | Returns the current unixt timestamp in milliseconds of the specified conversion |
| `<@iso8601UTCDate>INPUT_MACRO_HERE` | Format a `DateTime` value in [ISO 8601 UTC](https://en.wikipedia.org/wiki/ISO_8601). Returns an empty string for missing data or data that is not a `DateTime`. As `DateTime` doesn’t store millisecond precision, milliseconds are hard-coded to 000 |

### General Actions

Function macros that perform a variety of general use actions; e.g. modifying a boolean value into an integer.

| Action | Description |
| --- | --- |
| `<@countryCodeIso3166>INPUT_MACRO_HERE` | Returns the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) two-letter country code. |
| `<@firstNotEmpty>INPUT_MACRO_HERE` | Gets the first value that isn’t empty in a delimited string. |
| `<@languageIso639>INPUT_MACRO_HERE` | Returns the [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) two-character language code. |
| `<@loop data=app.app_bundles val="bundle"><#if user_data.os == bundle.os>``</#if>``<#if bundle.os=="ANDROID">${(bundle.android.package_name)}<@break/> </#if></@loop>` | Return the `store_app_id` for an iOS site and a `package_name` for an Android site. |
| `<@loop>INPUT_MACRO_HERE`, `<@break>`, `<@sep>` | Loops around the variable specified in data, assigning each successive one to the name specified in val. Be sure not to put quotes around data. |
| `<@rand>INPUT_MACRO_HERE` | Returns a random value between 0 and 2^31. |
| `<@ternary>INPUT_MACRO_HERE` | A basic implementation of ternary functionality that uses | to separate parameters This function must receive 4 parameters or nothing will be returned. Given parameter 0 matches parameter 1, parameter 2 will be returned. Given parameter 0 does not match parameter 1, parameter 3 will be returned. |
| `<@truncate>INPUT_MACRO_HERE` | Returns a value shortened to 40 characters in length. |
| `<#assign captured>%s` | Casts a boolean string to its integer counter part. |
| `<#if user_data.os == "IOS">0<#elseif user_data.os == "ANDROID">1<#elseif user_data.os == "WINDOWS">2<#else>null</#if>` | Return the platform as an integer ios = 0, android = 1, windows = 2. |

### Unsupported Freemarker Expressions

Due to security restrictions, Branch does not support the below Freemarker expressions:

- `<#import>`
- `<#visit>`
- `<#include>`
- `?eval`
- `<#recurse>`
- `<#setting>`
- `<#macro>`
- `<#function>`
- `<#nested>`
- `<#return>`
- `<#list>`
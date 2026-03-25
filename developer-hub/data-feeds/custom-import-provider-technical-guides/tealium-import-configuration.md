---
title: "Tealium Configuration"
slug: tealium-import-configuration
---

*[Image: 1328]*

## Overview

Sending events from Tealium to Branch will allow you to attribute downstream conversions like purchases across web and app to Branch link clicks. Events imported from Tealium to Branch will be available wherever you can normally use events within Branch, including dashboard visualizations, Data Feeds, Ads Postbacks, Journeys targeting, Liveview and more.

This guide will walk you through how to send your [Tealium](https://tealium.com/) data to Branch using Branch Data Integration. Enabling this integration will result in automatically forwarding Tealium events to Branch via Tealium's Server-Side Connectors.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and sending your events to Branch will allow Branch to enhance your Tealium data with Branch data.

### Branch Events Imported from Tealium

Branch will import events that are not auto-tracked with the Branch SDKs. This includes commerce, content, user lifecycle, and custom events, and excludes events like clicks and installs.

::: warning Avoid Duplicate Data
To avoid duplicate data, you should either [track conversion events directly with Branch](track-branch-events.md) or track events with Tealium and then enable import to Branch, not both. Branch will warn you if you try to import events to Branch that you are already tracking.
:::

## Prerequisites

In order to enable Tealium (import), you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have either the Engagement or Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))
4. You also need to be a Tealium customer using the [Customer Data Hub](https://community.tealiumiq.com/t5/Customer-Data-Hub/tkb-p/udh) in your app.
5. Admin access to your Tealium account.

## Enable Tealium (import)

## 1. Setup Tealium

1. Go to the [Tealium Customer Data Hub](https://my.tealiumiq.com/)
2. Add Branch as a Connector

   - EventStream > Event Connectors.
   - AudienceStream > Audience Connectors (for visitor data connector)

   

### 2. Configure Connector

1. Select Data Source & Event Feed you want to send.
2. Set a name for your Connector.
3. Add your Branch Key from your [Branch Dashboard](https://dashboard.branch.io/account-settings/profile)

   

### 3. Configure Action

1. Set an Action Name.
2. Select an Action Type (this is the event to be sent to Branch)
3. Configure Required event properties

   - Event Type
   - Mobile Operating System
   - Mobile Device ID Mapping
4. [OPTIONAL] Configure Optional event properties

   

## Test your Connector

1. Use Tealium [Trace](https://community.tealiumiq.com/t5/Customer-Data-Hub/Trace/ta-p/12058)
2. Start a new Trace.
3. Check for the action you want to validate by clicking the *Actions Triggered* entry to expand in the Trace Log.
4. Look for the action you want to validate and view the log status.

::: warning Tealium Tools Browser Extension REQUIRED
[Tealium Tools](https://chrome.google.com/webstore/detail/tealium-tools/gidnphnamcemailggkemcgclnjeeokaa) is needed to start and end a trace session in your browser.
:::

## Advanced

## Optional Event Parameters

Actions set in the Connector can be configured further with Optional event parameter mappings.

<details>
<summary>Log Commerce Event</summary>

| Parameter | Description |
| --- | --- |
| User Data | Properties identifying a mobile device.   - OS Version: number, version of the operating system. Specific to Android and iOS. - Environment: string, usually "FULL\_APP". - User Agent: string, user agent of the browser or app where the event occurred. - HTTP Origin: string, current page url where Web SDK logged web session start. - HTTP Referrer: string, referral url that led to the current page where Web SDK logged web session start. - Local IP: string, local ip of the device (Android only). - Country: string, country code of the user, usually based on device settings or user agent string. - Language: string, language code of the user, usually based on device settings or user agent string. - Brand: string, brand of the device. - Model: string, model of the device. - App Version: string, app version downloaded by the user. - Screen DPI: number, screen's DPI. - Screen Height: number, height of the screen. - Screen Width: number, width of the screen. - Developer Identity: string, developer-specified identity for a user. - Device Fingerprint Id: Branch internal-only field for tracking devices. - Browser Fingerpring Id: Branch internal-only field for tracking browsers. - Limit Ad Tracking: true, if the partner has opted to not be tracked by advertiser. |
| Event Data | Data relevant to the event type.   - Transaction ID: string, partner-specified transaction id for their internal use. - Currency: string, currency that revenue, price, shipping, tax were orginally reported in by the partner. - Revenue: number, partner-specified reported revenue for the event. - Shipping: number, shipping cost associated with the transaction. - Tax: number, total tax associated with the transaction. - Coupon: string, transaction coupon redeemed with the transaction (e.g. "SPRING2017"). - Affiliation: string, store or affiliation from which this transaction occurred (e.g. "Google Store"). - Description: string, description associated with the event, not necessarily specific to any individual content item. |
| Custom Data | Key-value pairs that the app developer would like attached to the event. |
| Content Items | Content item properties, specify either array-typed values of equal lengths or a single value, which will apply to all items.   - Content Schema: category or schema for a piece of content, may be used in the future for analytics. One of:    - COMMERCE\_AUCTION   - COMMERCE\_BUSINESS   - COMMERCE\_OTHER   - COMMERCE\_PRODUCT   - COMMERCE\_RESTAURANT   - COMMERCE\_SERVICE   - COMMERCE\_TRAVEL\_FLIGHT   - COMMERCE\_TRAVEL\_HOTEL   - COMMERCE\_TRAVEL\_OTHER   - GAME\_STATE   - MEDIA\_IMAGE   - MEDIA\_MIXED   - MEDIA\_MUSIC   - MEDIA\_OTHER   - MEDIA\_VIDEO   - OTHER   - TEXT\_ARTICLE   - TEXT\_BLOG   - TEXT\_OTHER   - TEXT\_RECIPE   - TEXT\_REVIEW   - TEXT\_SEARCH\_RESULTS   - TEXT\_STORY   - TEXT\_TECHNICAL\_DOC - Title: title (for the individual content item). - Description: description (for individual content item). - Image URL: image URL (for the individual content item). - Canonical Identifier: used to allow Branch to unify content/messages for Content Analytics. Publicly Indexable: true - content can be seen by anyone, false - cannot index for public use. - Locally Indexable: true - content can be indexed for local (device) use, false - cannot index for local use. - Price: price for the product/content. - Quantity: quantity of the item to be ordered (for PURCHASE, ADD\_TO\_CART, etc). - SKU: product sku or product id. - Product Name: name of the product. - Product Brand: brand of the product. - Product Category: category of a product if applicable. One of:    - ANIMALS\_AND\_PET\_SUPPLIES   - APPAREL\_AND\_ACCESSORIES   - ARTS\_AND\_ENTERTAINMENT   - BABY\_AND\_TODDLER   - BUSINESS\_AND\_INDUSTRIAL   - CAMERAS\_AND\_OPTICS   - ELECTRONICS   - FOOD\_BEVERAGES\_AND\_TOBACCO   - FURNITURE   - HARDWARE   - HEALTH\_AND\_BEAUTY   - HOME\_AND\_GARDEN   - LUGGAGE\_AND\_BAGS   - MATURE   - MEDIA   - OFFICE\_SUPPLIES   - RELIGIOUS\_AND\_CEREMONIAL   - SOFTWARE   - SPORTING\_GOODS   - TOYS\_AND\_GAMES   - VEHICLES\_AND\_PARTS - Product Variant: variant of the product (e.g. XL, red). - Rating Average: average rating of the item. - Rating Count: number of ratings for the item. - Rating Max: maximum possible rating for the item (e.g. 5.0 if 5 stars are highest possible rating). - Creation Timestamp: time the content was created. - Exp Date: the last time after which this content is no longer valid. null / 0 means no limit. Should rarely be set. - Condition: for auctions, whether the item is new, good, acceptable, etc. One of:    - OTHER   - NEW   - EXCELLENT   - GOOD   - FAIR   - POOR   - USED   - REFURBISHED. - Keywords: keyword. - Image Captions: string with comma-separated-values, captions associated with the image. - Latitude: latitude for a restaurant, business, room (hotel), etc. - Longitude: longitude for a restaurant, business, room (hotel), etc. - Postal Code: postal/zip code for a restaurant, business, room (hotel), etc. - Country: country code for a restaurant, business, room (hotel), etc. - Region: state or region for a restaurant, business, room (hotel), etc. - City: street address for a restaurant, business, room (hotel), etc. - Street: street address for a restaurant, business, room (hotel), etc. - Custom Fields: key-value pairs that the app developer would like attached to the content item. |

</details>

<details>
<summary>Log Content Event</summary>

| Parameter | Description |
| --- | --- |
| User Data | Properties identifying a mobile device.   - OS Version: number, version of the operating system. Specific to Android and iOS. - Environment: string, usually "FULL\_APP". - User Agent: string, user agent of the browser or app where the event occurred. - HTTP Origin: string, current page url where Web SDK logged web session start. - HTTP Referrer: string, referral url that led to the current page where Web SDK logged web session start. - Local IP: string, local ip of the device (Android only). - Country: string, country code of the user, usually based on device settings or user agent string. - Language: string, language code of the user, usually based on device settings or user agent string. - Brand: string, brand of the device. - Model: string, model of the device. - App Version: string, app version downloaded by the user. - Screen DPI: number, screen's DPI. - Screen Height: number, height of the screen. - Screen Width: number, width of the screen. - Developer Identity: string, developer-specified identity for a user. - Device Fingerprint Id: Branch internal-only field for tracking devices. - Browser Fingerpring Id: Branch internal-only field for tracking browsers. - Limit Ad Tracking: true, if the partner has opted to not be tracked by advertiser |
| Event Data | Data relevant to the event type.   - Search Query: string, search query associated with the event. - Description: string, description associated with the event, not necessarily specific to any individual content items. |
| Custom Data | Key-value pairs that the app developer would like attached to the event. |
| Content Items | Content item properties, specify either array-typed values of equal lengths or a single value, which will apply to all items.   - Content Schema: category or schema for a piece of content, may be used in the future for analytics. One of:    - COMMERCE\_AUCTION   - COMMERCE\_BUSINESS   - COMMERCE\_OTHER   - COMMERCE\_PRODUCT   - COMMERCE\_RESTAURANT   - COMMERCE\_SERVICE   - COMMERCE\_TRAVEL\_FLIGHT   - COMMERCE\_TRAVEL\_HOTEL   - COMMERCE\_TRAVEL\_OTHER   - GAME\_STATE   - MEDIA\_IMAGE   - MEDIA\_MIXED   - MEDIA\_MUSIC   - MEDIA\_OTHER   - MEDIA\_VIDEO   - OTHER   - TEXT\_ARTICLE   - TEXT\_BLOG   - TEXT\_OTHER   - TEXT\_RECIPE   - TEXT\_REVIEW   - TEXT\_SEARCH\_RESULTS   - TEXT\_STORY   - TEXT\_TECHNICAL\_DOC - Title: title (for the individual content item). - Description: description (for individual content item). - Image URL: image URL (for the individual content item). - Canonical Identifier: used to allow Branch to unify content/messages for Content Analytics. Publicly Indexable: true - content can be seen by anyone, false - cannot index for public use. - Locally Indexable: true - content can be indexed for local (device) use, false - cannot index for local use. - Price: price for the product/content. - Quantity: quantity of the item to be ordered (for PURCHASE, ADD\_TO\_CART, etc). - SKU: product sku or product id. - Product Name: name of the product. - Product Brand: brand of the product. - Product Category: category of a product if applicable. One of:    - ANIMALS\_AND\_PET\_SUPPLIES   - APPAREL\_AND\_ACCESSORIES   - ARTS\_AND\_ENTERTAINMENT   - BABY\_AND\_TODDLER   - BUSINESS\_AND\_INDUSTRIAL   - CAMERAS\_AND\_OPTICS ELECTRONICS   - FOOD\_BEVERAGES\_AND\_TOBACCO   - FURNITURE   - HARDWARE   - HEALTH\_AND\_BEAUTY   - HOME\_AND\_GARDEN   - LUGGAGE\_AND\_BAGS   - MATURE   - MEDIA OFFICE\_SUPPLIES   - RELIGIOUS\_AND\_CEREMONIAL   - SOFTWARE SPORTING\_GOODS   - TOYS\_AND\_GAMES   - VEHICLES\_AND\_PARTS - Product Variant: variant of the product (e.g. XL, red). - Rating Average: average rating of the item. - Rating Count: number of ratings for the item. - Rating Max: maximum possible rating for the item (e.g. 5.0 if 5 stars is highest possible rating). - Creation Timestamp: time the content was created. - Exp Date: the last time after which this content is no longer valid. null / 0 mean no limit. Should rarely be set. - Condition: for auctions, whether the item is new, good, acceptable, etc. One of:    - OTHER   - NEW   - EXCELLENT   - GOOD   - FAIR   - POOR   - USED   - REFURBISHED. - Keywords: keyword. - Image Captions: string with comma-separated values, captions associated with the image. - Latitude: latitude for a restaurant, business, room (hotel), etc. - Longitude: longitude for a restaurant, business, room (hotel), etc. - Postal Code: postal/zip code for a restaurant, business, room (hotel), etc. - Country: country code for a restaurant, business, room (hotel), etc. - Region: state or region for a restaurant, business, room (hotel), etc. - City: street address for a restaurant, business, room (hotel), etc. - Street: street address for a restaurant, business, room (hotel), etc. - Custom Fields: key-value pairs that the app developer would like attached to the content item. |

</details>

<details>
<summary>Log Lifecycle Event</summary>

| Parameter | Description |
| --- | --- |
| User Data | Properties identifying a mobile device.   - OS Version: number, version of the operating system. Specific to Android and iOS. - Environment: string, usually "FULL\_APP". - User Agent: string, user agent of the browser or app where the event occurred. - HTTP Origin: string, current page url where Web SDK logged web session start. - HTTP Referrer: string, referral url that led to the current page where Web SDK logged web session start. - Local IP: string, local ip of the device (Android only). - Country: string, country code of the user, usually based on device settings or user agent string. - Language: string, language code of the user, usually based on device settings or user agent string. - Brand: string, brand of the device. - Model: string, model of the device. - App Version: string, app version downloaded by the user. - Screen DPI: number, screen's DPI. - Screen Height: number, height of the screen. - Screen Width: number, width of the screen. - Developer Identity: string, developer-specified identity for a user. - Device Fingerprint Id: Branch internal-only field for tracking devices. - Browser Fingerpring Id: Branch internal-only field for tracking browsers. - Limit Ad Tracking: true, if the partner has opted to not be tracked by advertiser. |
| Event Data | Data relevant to the event type. |
| Custom Data | Key-value pairs that the app developer would like attached to the event. |

</details>

<details>
<summary>Log Custom Event</summary>

| Parameter | Description |
| --- | --- |
| User Data | Properties identifying a mobile device.   - OS Version: number, version of the operating system. Specific to Android and iOS. - Environment: string, usually "FULL\_APP". - User Agent: string, user agent of the browser or app where the event occurred. - HTTP Origin: string, current page url where Web SDK logged web session start. - HTTP Referrer: string, referral url that led to the current page where Web SDK logged web session start. - Local IP: string, local ip of the device (Android only). - Country: string, country code of the user, usually based on device settings or user agent string. - Language: string, language code of the user, usually based on device settings or user agent string. - Brand: string, brand of the device. - Model: string, model of the device. - App Version: string, app version downloaded by the user. - Screen DPI: number, screen's DPI. - Screen Height: number, height of the screen. - Screen Width: number, width of the screen. - Developer Identity: string, developer-specified identity for a user. - Device Fingerprint Id: Branch internal-only field for tracking devices. - Browser Fingerpring Id: Branch internal-only field for tracking browsers. - Limit Ad Tracking: true, if the partner has opted to not be tracked by advertiser. |
| Custom Data | Key-value pairs that the app developer would like attached to the event. |

</details>
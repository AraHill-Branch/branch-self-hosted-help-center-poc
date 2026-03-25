---
title: "Track Branch Events"
slug: track-branch-events
---

## Overview

Event tracking helps you understand how a user moves through your app and what actions they are taking along the way. It's also how you get insight into when a user installs or reinstalls your app.

Some events are tracked automatically by Branch, while others are not. For those that aren't, you'll use the Branch SDK to log the event.

### Types of Branch Events

There are 2 main categories of events: **Standard** and **Custom**.

#### Standard Events

Standard Events have properties that are pre-defined by Branch. There are 3 categories of Standard Events: Commerce, Content, and Lifecycle.

Standard Events have the following HTTP API endpoint:

```
POST /v2/event/standard
Content-Type: application/json
```

::: info Note
Whenever possible, we encourage you to track your event using a Branch Standard Event. This is because:

- Branch has pre-defined mappings with ad partners for Standard Events, so it’s easier to send data to ad networks.
- Some Standard Events, like [Commerce Events](track-branch-events.md#track-commerce-events), have pre-defined metadata like revenue, currency, etc. which can’t be attached to Custom Events.

  - **If you want to send metadata like revenue to ad partners like Facebook or Google**, it’s important that you use a Standard Commerce Event.
:::

#### Custom Events

Custom Events are for actions you want to track that Branch doesn't have a suitable Standard Event for. You can define your own properties for these types of events.

Custom Events have the following HTTP API endpoint:

```
POST /v2/event/custom
Content-Type: application/json
```

### Automatically tracked events

By default, the Branch SDKs track some events automatically (out-of-the-box). See the table below for specifics:

| Event | Tracked Automatically by Mobile SDKs | Tracked Automatically by Web SDK |
| --- | --- | --- |
| Click | ✔️ | ✔️ |
| Open | ✔️ | ✔️ (called `web_session_start`) |
| Install | ✔️ | ✔️ |
| Reinstall | ✔️ | ✔️ |
| Impression | ✔️ | ✔️ |
| Journeys Dismissal | N/A | ✔️ |

On web, open events are called `web_session_start`. This event is triggered every time a webpage with the web SDK opens in a new tab or when a user clicks on a Branch Link and is redirected to a page with the web SDK. A user doing things like clearing the browser cache or navigating away from the webpage and the going back to it will reinitiate the web session.

### Ad network event mapping

When the Branch Ads feature is enabled, tracking Branch Standard Events will postback to the attributed ad network. For example, if you track a Standard `PURCHASE` Event through Branch, it will automatically map to Facebook's Purchase event (if the user is attributed to Facebook). These events will also have analytics like counts and cohorts.

### Branch Universal Objects

Branch SDKs use the concept of a Branch Universal Object (BUO) to represent the thing you want to share. A `BranchUniversalObject` instance encapsulates a unique piece of content, such as an article, video, or item for sale.

When tracking app events, you will sometimes want to create a BUO first and then [associate it with a Branch Event](create-branch-objects-and-events.md#branch-event) by adding the BUO instance to the Branch Event's `contentItems` field.

## Attribution

For accurate attribution, Branch requires that you include certain identifiers with user data when sending events.

Important: These identifiers are especially important for server-to-server (S2S) events, because the Branch SDK automatically collects them when using the SDK directly.

#### Universal identifiers

Include one of the following (if available):

- `developer_identity`
- `browser_fingerprint_id`

#### iOS

If the device is running iOS, include:

- `os = "iOS"`
- `os_version` (e.g. "17.1")
- One of the following:

  - `idfa` (Identifier for Advertisers), OR
  - `idfv` (Identifier for Vendors)

#### Android

If the device is running Android, include:

- `os = "Android"`
- `os_version` (e.g. "14")
- One of the following:

  - `aaid` (Android Advertising ID), OR
  - `android_id`

### Example summary

| Platform | Required parameters | Notes |
| --- | --- | --- |
| Web | `browser_fingerprint_id` or `developer_identity` | SDK auto-handles when using JavaScript SDK |
| iOS | `os`, `os_version`, and `idfa` or `idfv`) | Required for S2S; SDK collects automatically |
| Android | `os`, `os_version`, and `aaid` or `android_id`) | Required for S2S; SDK collects automatically |

If you are sending events to Branch via a server-to-server (S2S) integration, please note the following requirements to ensure accurate attribution:

- OS version: If you are running Facebook campaigns on iOS, include the `os_version` parameter for proper attribution of Facebook ads.
- `anon_id`: If your Facebook campaigns use [AEM (Aggregated Event Measurement)](https://help.branch.io/docs/enable-app-aggregated-event-measurement-support), you must also include the `anon_id` parameter.
- User IP address: When sending events S2S, you must include the user's IP address rather than your server’s. To do this, set the X-IP-Override header in your request.

::: warning ⚠️ Important: Caution
In order to use the X-IP-Override header, your app ID must first be added to Branch’s allowlist. Please contact [support@branch.io](mailto:support@branch.io) with your Branch app ID to have it added.
:::

## Track events

The sections below outline each type of Branch Standard Event, as well as Custom Events. Included are code samples in a range of languages, so you can see how to log that event using your version of the Branch SDK.

::: warning Caution
Branch may implement caps or overages based on the number of events you are tracking. We recommend that you **only track events that are useful** for your analytics and attribution needs. This will also avoid unnecessary network calls being made by your app, leading to better app performance.
:::

### Track Commerce Events

Commerce Events include purchases and transactions, as well as actions related to carts and wishlists.

If you have the Branch Ads feature enabled, Commerce Events will automatically map to certain Ad Partners.

::: info Note
If you track Commerce Events without a currency, we assume the currency is USD.

If you track Commerce Events with a currency other than USD, we will convert the `revenue` specified to USD (using a recent exchange rate).

This allows you to easily visualize revenue on the Dashboard across many countries and currencies, because all units are USD.

The exchange rate is pulled from [openexchangerates.org](https://openexchangerates.org) regularly and is generally within an hour of the real-time exchange rate. If you view raw Branch Events via either Webhooks or Exports, you can see the exchange rate used.
:::

| Event Name | iOS | Android | Web/API |
| --- | --- | --- | --- |
| Add To Cart | `BranchStandardEventAddToCart` | `BRANCH_STANDARD_EVENT.ADD_TO_CART` | `ADD_TO_CART` |
| Add To Wishlist | `BranchStandardEventAddToWishlist` | `BRANCH_STANDARD_EVENT.ADD_TO_WISHLIST` | `ADD_TO_WISHLIST` |
| View Cart | `BranchStandardEventViewCart` | `BRANCH_STANDARD_EVENT.VIEW_CART` | `VIEW_CART` |
| Initiate Purchase | `BranchStandardEventInitiatePurchase` | `BRANCH_STANDARD_EVENT.INITIATE_PURCHASE` | `INITIATE_PURCHASE` |
| Add Payment Info | `BranchStandardEventAddPaymentInfo` | `BRANCH_STANDARD_EVENT.ADD_PAYMENT_INFO` | `ADD_PAYMENT_INFO` |
| Click Ad | `BranchStandardEventClickAd` | `BRANCH_STANDARD_EVENT.CLICK_AD` | `CLICK_AD` |
| Purchase | `BranchStandardEventPurchase` | `BRANCH_STANDARD_EVENT.PURCHASE` | `PURCHASE` |
| Reserve | `BranchStandardEventReserve` | `BRANCH_STANDARD_EVENT.RESERVE` | `RESERVE` |
| Spend Credits | `BranchStandardEventSpendCredits` | `BRANCH_STANDARD_EVENT.SPEND_CREDITS` | `SPEND_CREDITS` |
| View Ad | `BranchStandardEventViewAd` | `BRANCH_STANDARD_EVENT.VIEW_AD` | `VIEW_AD` |

#### Subscription and in-app purchase events

The Branch iOS and Android SDKs offer [certain methods](relay-subscriptions-and-in-app-purchases.md) that make tracking **subscription and in-app purchase events** simpler. These methods allow you to convert standard purchase events from Apple and Google into a Branch Event without needing to create and populate a Branch Universal Object first.

#### Examples

::: code-group

```swift [Swift (iOS)]
// Create a BranchUniversalObject with your content data
let branchUniversalObject = BranchUniversalObject.init()

// Add data to the branchUniversalObject as needed
branchUniversalObject.canonicalIdentifier = "item/12345"
branchUniversalObject.canonicalUrl = "https://branch.io/item/12345"
branchUniversalObject.title = "My Item Title"

branchUniversalObject.contentMetadata.contentSchema = .commerceProduct
branchUniversalObject.contentMetadata.quantity  = 1
branchUniversalObject.contentMetadata.price = 23.20
branchUniversalObject.contentMetadata.currency = .USD
branchUniversalObject.contentMetadata.sku = "1994320302"
branchUniversalObject.contentMetadata.productName = "my_product_name1"
branchUniversalObject.contentMetadata.productBrand = "my_prod_Brand1"
branchUniversalObject.contentMetadata.productCategory = .apparel
branchUniversalObject.contentMetadata.productVariant = "XL"
branchUniversalObject.contentMetadata.condition = .new
branchUniversalObject.contentMetadata.customMetadata = ["custom_key1": "custom_value1", "custom_key2": "custom_value2"]

// Create an event
let event = BranchEvent.standardEvent(.purchase)

// Add the BranchUniversalObject with the content (do not add an empty branchUniversalObject)
event.contentItems = [ branchUniversalObject ]

// Add relevant event data
event.alias = "my custom alias"
event.transactionID = "12344555"
event.currency = .USD
event.revenue = 1.5
event.shipping = 10.2
event.tax = 12.3
event.coupon = "test_coupon"
event.affiliation = "test_affiliation"
event.eventDescription = "Event_description"
event.searchQuery = "item 123"
event.customData = [
    "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
    "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
]

// Log the event
event.logEvent()
```

```objectivec [Obj-C (iOS)]
// Create a BranchUniversalObject with your content data
BranchUniversalObject *branchUniversalObject = [BranchUniversalObject new];

// Add data to the branchUniversalObject as needed
branchUniversalObject.canonicalIdentifier = @"item/12345";
branchUniversalObject.canonicalUrl = @"https://branch.io/item/12345";
branchUniversalObject.title = @"My Item Title";

branchUniversalObject.contentMetadata.contentSchema = BranchContentSchemaCommerceProduct;
branchUniversalObject.contentMetadata.quantity = 1;
branchUniversalObject.contentMetadata.price = [[NSDecimalNumber alloc] initWithDouble:23.20];
branchUniversalObject.contentMetadata.currency = BNCCurrencyUSD;
branchUniversalObject.contentMetadata.sku = @"1994320302";
branchUniversalObject.contentMetadata.productName = @"my_product_name1";
branchUniversalObject.contentMetadata.productBrand = @"my_prod_Brand1";
branchUniversalObject.contentMetadata.productCategory = BNCProductCategoryApparel;
branchUniversalObject.contentMetadata.productVariant = @"XL";
branchUniversalObject.contentMetadata.condition = @"NEW";
branchUniversalObject.contentMetadata.customMetadata = (NSMutableDictionary*) @{
    @"content_custom_key1": @"content_custom_value1",
    @"content_custom_key2": @"content_custom_value2"
};

// Create an event
BranchEvent *event = [BranchEvent standardEvent:BranchStandardEventAddToCart];

// Add the BranchUniversalObject with the content (do not add an empty branchUniversalObject)
event.contentItems = (id) @[ branchUniversalObject ];

// Add relevant event data
event.alias = @"my custom alias";
event.transactionID = @"12344555";
event.currency = BNCCurrencyUSD;
event.revenue = [NSDecimalNumber decimalNumberWithString:@"1.5"];
event.shipping = [NSDecimalNumber decimalNumberWithString:@"10.2"];
event.tax = [NSDecimalNumber decimalNumberWithString:@"12.3"];
event.coupon = @"test_coupon";
event.affiliation = @"test_affiliation";
event.eventDescription = @"Event_description";
event.searchQuery = @"item 123";
event.customData = (NSMutableDictionary*) @{
    @"Custom_Event_Property_Key1": @"Custom_Event_Property_val1",
    @"Custom_Event_Property_Key2": @"Custom_Event_Property_val2"
};

// Log the event
[event logEvent];
```

```java [Java (Android)]
// Create a BranchUniversalObject with your content data
BranchUniversalObject buo = new BranchUniversalObject()
	.setCanonicalIdentifier("myprod/1234")
	.setCanonicalUrl("https://test_canonical_url")
	.setTitle("test_title")
	.setContentMetadata(
	    new ContentMetadata()
			.addCustomMetadata("custom_metadata_key1", "custom_metadata_val1")
			.addCustomMetadata("custom_metadata_key1", "custom_metadata_val1")
			.addImageCaptions("image_caption_1", "image_caption2", "image_caption3")
			.setAddress("Street_Name", "test city", "test_state", "test_country", "test_postal_code")
			.setRating(5.2, 6.0, 5)
			.setLocation(-151.67, -124.0)
			.setPrice(10.0, CurrencyType.USD)
			.setProductBrand("test_prod_brand")
			.setProductCategory(ProductCategory.APPAREL_AND_ACCESSORIES)
			.setProductName("test_prod_name")
			.setProductCondition(ContentMetadata.CONDITION.EXCELLENT)
			.setProductVariant("test_prod_variant")
			.setQuantity(1.5)
			.setSku("test_sku")
			.setContentSchema(BranchContentSchema.COMMERCE_PRODUCT))
			.addKeyWord("keyword1")
			.addKeyWord("keyword2");

//  Create an event
new BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
	.setAffiliation("test_affiliation")
	.setCustomerEventAlias("my_custom_alias")
	.setCoupon("Coupon Code")
	.setCurrency(CurrencyType.USD)
	.setDescription("Customer added item to cart")
	.setShipping(0.0)
	.setTax(9.75)
	.setRevenue(1.5)
	.setSearchQuery("Test Search query")
	.addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
	.addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
	.addContentItems(buo) // Add a BranchUniversalObject to the event (cannot be empty)
	.logEvent(context); // Log the event
```

```kotlin [Kotlin (Android)]
// Create a BranchUniversalObject with your content data
val buo = BranchUniversalObject()
	.setCanonicalIdentifier("myprod/1234")
	.setCanonicalUrl("https://test_canonical_url")
	.setTitle("test_title")
	.setContentMetadata(
		ContentMetadata()
			.addCustomMetadata("custom_metadata_key1", "custom_metadata_val1")
			.addCustomMetadata("custom_metadata_key1", "custom_metadata_val1")
			.addImageCaptions("image_caption_1", "image_caption2", "image_caption3")
			.setAddress("Street_Name", "test city", "test_state", "test_country", "test_postal_code")
			.setRating(5.2, 6.0, 5)
			.setLocation(-151.67, -124.0)
			.setPrice(10.0, CurrencyType.USD)
			.setProductBrand("test_prod_brand")
			.setProductCategory(ProductCategory.APPAREL_AND_ACCESSORIES)
			.setProductName("test_prod_name")
			.setProductCondition(ContentMetadata.CONDITION.EXCELLENT)
			.setProductVariant("test_prod_variant")
			.setQuantity(1.5)
			.setSku("test_sku")
			.setContentSchema(BranchContentSchema.COMMERCE_PRODUCT)
	)
	.addKeyWord("keyword1")
	.addKeyWord("keyword2")

//  Create an event
BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
	.setAffiliation("test_affiliation")
	.setCustomerEventAlias("my_custom_alias")
	.setCoupon("Coupon Code")
	.setCurrency(CurrencyType.USD)
	.setDescription("Customer added item to cart")
	.setShipping(0.0)
	.setTax(9.75)
	.setRevenue(1.5)
	.setSearchQuery("Test Search query")
	.addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
	.addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
	.addContentItems(buo) // Add a BranchUniversalObject to the event (cannot be empty)
	.logEvent(applicationContext) // Log the event
```

```javascript [JavaScript (Web)]
// Define event data
var event_and_custom_data = {
   "transaction_id": "tras_Id_1232343434",
   "currency": "USD",
   "revenue": 180.2,
   "shipping": 10.5,
   "tax": 13.5,
   "coupon": "promo-1234",
   "affiliation": "high_fi",
   "description": "Preferred purchase",
   "purchase_loc": "Palo Alto",
   "store_pickup": "unavailable"
};

// Define content data
var content_items = [
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
   "$product_category": "SPORTING_GOODS",
   "$product_variant": "XL",
   "$rating_average": 4.2,
   "$rating_count": 5,
   "$rating_max": 2.2,
   "$creation_timestamp": 1499892854966,
   "$exp_date": 1499892854966,
   "$keywords": [ "sneakers", "shoes" ],
   "$address_street": "230 South LaSalle Street",
   "$address_city": "Chicago",
   "$address_region": "IL",
   "$address_country": "US",
   "$address_postal_code": "60604",
   "$latitude": 12.07,
   "$longitude": -97.5,
   "$image_captions": [ "my_img_caption1", "my_img_caption_2" ],
   "$condition": "NEW",
   "$custom_fields": {"foo1":"bar1","foo2":"bar2"}
},
{
   "$og_title": "Nike Woolen Sox",
   "$canonical_identifier": "nike/5324",
   "$og_description": "Fine combed woolen sox for those who love your foot",
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
}];

// Set alias
var customer_event_alias = "my custom alias";

// Log the event
branch.logEvent(
   "PURCHASE",
   event_and_custom_data,
   content_items,
   customer_event_alias,
   function(err) { console.log(err); }
);
```

:::

::: code-group

```javascript [ReactNative]
// Create a BranchUniversalObject
let buo = await branch.createBranchUniversalObject(
  "item/12345",
  {
    canonicalUrl: "https://branch.io/item/12345",
    title: "My Item Title",
    contentMetadata: {
      quantity: 1,
      price: 23.20,
      sku: "1994320302",
      productName: "my_product_name1",
      productBrand: "my_prod_Brand1",
      customMetadata: {
            custom_key1: "custom_value1",
            custom_key2: "custom_value2"
    		}
  	}
	}
)

// Define content data
let params = {
  transaction_id: "tras_Id_1232343434",
  currency: "USD",
  revenue: 180.2,
  shipping: 10.5,
  tax: 13.5,
  coupon: "promo-1234",
  affiliation: "high_fi",
  description: "Preferred purchase",
  purchase_loc: "Palo Alto",
  store_pickup: "unavailable",
  customData: {
   "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
   "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
  }
}

// Create an event and associate the BranchUniversalObject with it
let event = new BranchEvent(BranchEvent.Purchase, [buo], params)

// Log the event
event.logEvent()
```

```custom [Flutter]
// Create a BranchUniversalObject
BranchUniversalObject buo = BranchUniversalObject(
  canonicalIdentifier: 'flutter/branch',
  canonicalUrl: 'https://test_canonical_url',
  title: 'Flutter Branch Plugin',
  imageUrl: 'https://flutter.dev/assets/flutter-lockup-4cb0ee072ab312e59784d9fbf4fb7ad42688a7fdaea1270ccf6bbf4f34b7e03f.svg',
  contentDescription: 'Flutter Branch Description',
  keywords: ['Plugin', 'Branch', 'Flutter'],
  publiclyIndex: true,
  locallyIndex: true,
  contentMetadata: BranchContentMetaData()..addCustomMetadata('custom_string', 'abc')
  ..addCustomMetadata('custom_number', 12345)
  ..addCustomMetadata('custom_bool', true)
  ..addCustomMetadata('custom_list_number', [1,2,3,4,5 ])
  ..addCustomMetadata('custom_list_string', ['a', 'b', 'c']),
);

// Create an event
BranchEvent event = BranchEvent.standardEvent(BranchStandardEvent.PURCHASE);

// Define event properties
event.transactionID    = "12344555";
event.currency         = BranchCurrencyType.USD;
event.revenue          = 1.5;
event.shipping         = 10.2;
event.tax              = 12.3;
event.coupon           = "test_coupon";
event.affiliation      = "test_affiliation";
event.eventDescription = "Event_description";
event.searchQuery      = "item 123";
event.addCustomData('Custom_Event_Property_Key1', 'Custom_Event_Property_val1');
event.addCustomData('Custom_Event_Property_Key2', 'Custom_Event_Property_val2');

// Associate BranchUniversalObject with event and log the event
FlutterBranchSdk.trackContent(buo: [buo], branchEvent: event);
```

```swift [Swift (macOS)]
// Create a BranchUniversalObject with your content data
let branchUniversalObject = BranchUniversalObject.init()

// Add data to the branchUniversalObject
branchUniversalObject.canonicalIdentifier = "item/12345"
branchUniversalObject.canonicalUrl        = "https://branch.io/item/12345"
branchUniversalObject.title               = "My Item Title"

branchUniversalObject.contentMetadata.contentSchema     = .commerceProduct
branchUniversalObject.contentMetadata.quantity          = 1
branchUniversalObject.contentMetadata.price             = 23.20
branchUniversalObject.contentMetadata.currency          = .USD
branchUniversalObject.contentMetadata.sku               = "1994320302"
branchUniversalObject.contentMetadata.productName       = "my_product_name1"
branchUniversalObject.contentMetadata.productBrand      = "my_prod_Brand1"
branchUniversalObject.contentMetadata.productCategory   = .apparel
branchUniversalObject.contentMetadata.productVariant    = "XL"
branchUniversalObject.contentMetadata.condition         = .new
branchUniversalObject.contentMetadata.customMetadata = [
	"custom_key1": "custom_value1",
	"custom_key2": "custom_value2"
]

// Create a Branch Event
let event = BranchEvent.standardEvent(.purchase)

// Add the BranchUniversalObject (do not add an empty branchUniversalObject)
event.contentItems     = [ branchUniversalObject ]

// Add relevant event data
event.transactionID    = "12344555"
event.currency         = .USD
event.revenue          = 1.5
event.shipping         = 10.2
event.tax              = 12.3
event.coupon           = "test_coupon"
event.affiliation      = "test_affiliation"
event.eventDescription = "Event_description"
event.searchQuery      = "item 123"
event.customData       = [
	"Custom_Event_Property_Key1": "Custom_Event_Property_val1",
	"Custom_Event_Property_Key2": "Custom_Event_Property_val2"
]

// Log the event
Branch.sharedInstance.logEvent(event) { (error) in
	// Log errors here
}
```

```objectivec [Obj-C (macOS)]
// Create a BranchUniversalObject with your content data:
BranchUniversalObject *branchUniversalObject = [BranchUniversalObject new];

// Add data to the branchUniversalObject
branchUniversalObject.canonicalIdentifier = @"item/12345";
branchUniversalObject.canonicalUrl        = @"https://branch.io/item/12345";
branchUniversalObject.title               = @"My Item Title";

branchUniversalObject.contentMetadata.contentSchema     = BranchContentSchemaCommerceProduct;

branchUniversalObject.contentMetadata.quantity          = 1.0;

branchUniversalObject.contentMetadata.price             = [NSDecimalNumber decimalNumberWithString:@"23.20"];

branchUniversalObject.contentMetadata.currency          = BNCCurrencyUSD;
branchUniversalObject.contentMetadata.sku               = @"1994320302";
branchUniversalObject.contentMetadata.productName       = @"my_product_name1";
branchUniversalObject.contentMetadata.productBrand      = @"my_prod_Brand1";
branchUniversalObject.contentMetadata.productCategory   = BNCProductCategoryApparel;
branchUniversalObject.contentMetadata.productVariant    = @"XL";
branchUniversalObject.contentMetadata.condition         = @"NEW";
branchUniversalObject.contentMetadata.customMetadata =  (NSMutableDictionary*) @{
	@"content_custom_key1": @"content_custom_value1",
	@"content_custom_key2": @"content_custom_value2"
};

// Create an event and add the BranchUniversalObject to it
BranchEvent *event     = [BranchEvent standardEvent:BranchStandardEventAddToCart];

// Add the BranchUniversalObjects with the content (do not add an empty branchUniversalObject)
event.contentItems     = (id) @[ branchUniversalObject ];

// Add relevant event data
event.transactionID    = @"12344555";
event.currency         = BNCCurrencyUSD;
event.revenue          = [NSDecimalNumber decimalNumberWithString:@"1.5"];
event.shipping         = [NSDecimalNumber decimalNumberWithString:@"10.2"];
event.tax              = [NSDecimalNumber decimalNumberWithString:@"12.3"];
event.coupon           = @"test_coupon";
event.affiliation      = @"test_affiliation";
event.eventDescription = @"Event_description";
event.searchQuery      = @"item 123";
event.customData       = (NSMutableDictionary*) @{
	@"Custom_Event_Property_Key1": @"Custom_Event_Property_val1",
	@"Custom_Event_Property_Key2": @"Custom_Event_Property_val2"
};

[[Branch sharedInstance] logEvent:event completion:^(NSError * _Nullable error) {
	NSLog(@"Test Standard Event: %@", error);
}];
```

```custom [cURL]
curl -vvv -d '{
  "name": "PURCHASE",
  "customer_event_alias": "my custom alias",
  "user_data": {
    "advertising_ids": {
      "oaid": "02ab41d3-7886-4f29-a606-fba4372e9fdc"
    },
    "os": "Android",
    "os_version": "25",
    "environment": "FULL_APP",
    "aaid": "abcdabcd-0123-0123-00f0-000000000000",
    "android_id": "a12300000000",
    "limit_ad_tracking": false,
    "developer_identity": "user123",
    "country": "US",
    "language": "en",
    "ip": "192.168.1.1",
    "local_ip": "192.168.1.2",
    "brand": "LGE",
    "app_version": "1.0.0",
    "model": "Nexus 5X",
    "screen_dpi": 420,
    "screen_height": 1794,
    "screen_width": 1080
  },
  "custom_data": {
    "purchase_loc": "Palo Alto",
    "store_pickup": "unavailable"
  },
  "event_data": {
    "transaction_id": "trans_Id_1232343434",
    "currency": "USD",
    "revenue": 180.2,
    "shipping": 10.5,
    "tax": 13.5,
    "coupon": "promo-1234",
    "affiliation": "high_fi",
    "description": "Preferred purchase",
    "custom_param_1": "Parameter 1",
    "custom_param_2": "Parameter 2",
    "custom_param_3": "Parameter 3"
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
      "$og_description": "Fine combed woolen sox for those who love your foot",
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
   "branch_key": "key_test_0000000000000000"
 }' https://api2.branch.io/v2/event/standard
```

```csharp [C# (Unity)]
// Create an event
BranchEvent branchEvent = new BranchEvent(BranchEventType.PURCHASE);

// Add data to event
branchEvent.AddCustomData("Transaction ID", "12344555");
branchEvent.AddCustomData("Currency", BranchCurrencyType.USD.ToString());
branchEvent.AddCustomData("Revenue", "1.5");
branchEvent.AddCustomData("Shipping", "10.2");
branchEvent.AddCustomData("Tax", "12.3");
branchEvent.AddCustomData("Coupon", "test_coupon");
branchEvent.AddCustomData("Affiliation", "test_affiliation");
branchEvent.AddCustomData("Event Description", "event_description");
branchEvent.AddCustomData("Search Query", "item 123");
branchEvent.AddCustomData("Custom_Event_Property_Key1", "Custom_Event_Property_val1");
branchEvent.AddCustomData("Custom_Event_Property_Key2", "Custom_Event_Property_val2");

// Log event
Branch.sendEvent(branchEvent);
```

:::

#### Product category field

Branch Universal Objects support a product category field.

You can choose a product category from the following list to populate this field:

```
// Values available for the `productCategory` field

ANIMALS_AND_PET_SUPPLIES("Animals & Pet Supplies"),
APPAREL_AND_ACCESSORIES("Apparel & Accessories"),
ARTS_AND_ENTERTAINMENT("Arts & Entertainment"),
BABY_AND_TODDLER("Baby & Toddler"),
BUSINESS_AND_INDUSTRIAL("Business & Industrial"),
CAMERAS_AND_OPTICS("Cameras & Optics"),
ELECTRONICS("Electronics"),
FOOD_BEVERAGES_AND_TOBACCO("Food, Beverages & Tobacco"),
FURNITURE("Furniture"),
HARDWARE("Hardware"),
HEALTH_AND_BEAUTY("Health & Beauty"),
HOME_AND_GARDEN("Home & Garden"),
LUGGAGE_AND_BAGS("Luggage & Bags"),
MATURE("Mature"),
MEDIA("Media"),
OFFICE_SUPPLIES("Office Supplies"),
RELIGIOUS_AND_CEREMONIAL("Religious & Ceremonial"),
SOFTWARE("Software"),
SPORTING_GOODS("Sporting Goods"),
TOYS_AND_GAMES("Toys & Games"),
VEHICLES_AND_PARTS("Vehicles & Parts")
```

For more information, view the [full API docs](https://github.com/BranchMetrics/branch-deep-linking-public-api#logging-commerce-events).

### Track Content Events

Content Events are events that occur when a user engages with your in-app content.

An example could be in-app articles that you post. In that instance, you might want to track events related to users performing search queries, viewing content, rating the content, and sharing it.

Content Events can relate to a wide variety of in-app content, such as blog posts, music, videos, pictures, and e-commerce catalogue items.

| Event Name | iOS | Android | Web/API |
| --- | --- | --- | --- |
| Search | `BranchStandardEventSearch` | `BRANCH_STANDARD_EVENT.SEARCH` | `SEARCH` |
| View Item | `BranchStandardEventViewItem` | `BRANCH_STANDARD_EVENT.VIEW_ITEM` | `VIEW_ITEM` |
| View Items | `BranchStandardEventViewItems` | `BRANCH_STANDARD_EVENT.VIEW_ITEMS` | `VIEW_ITEMS` |
| Rate | `BranchStandardEventRate` | `BRANCH_STANDARD_EVENT.RATE` | `RATE` |
| Share | `BranchStandardEventShare` | `BRANCH_STANDARD_EVENT.SHARE` | `SHARE` |
| Initiate Stream | `BranchStandardEventInitiateStream` | `BRANCH_STANDARD_EVENT.INITIATE_STREAM` | `INITIATE_STREAM` |
| Complete Stream | `BranchStandardEventCompleteStream` | `BRANCH_STANDARD_EVENT.COMPLETE_STREAM` | `COMPLETE_STREAM` |

#### Examples

::: code-group

```swift [Swift (iOS)]
// Create event
let event = BranchEvent.standardEvent(.search)
  
// Define event data
event.alias = "my custom alias"
event.eventDescription = "Product Search"
event.searchQuery = "user search query terms for product xyz"
event.customData["Custom_Event_Property_Key1"] = "Custom_Event_Property_val1"

// Log the event
event.logEvent()
```

```objectivec [Obj-C (iOS)]
// Create event
BranchEvent *event = [BranchEvent standardEvent:BranchStandardEventSearch];

// Define event data
event.alias = @"my custom alias";
event.eventDescription = @"Product Search";
event.searchQuery = @"user search query terms for product xyz";
event.customData = (NSMutableDictionary*) @{
    @"Custom_Event_Property_Key1": @"Custom_Event_Property_val1",
    @"Custom_Event_Property_Key2": @"Custom_Event_Property_val2"
};

// Log the event
[event logEvent];
```

```java [Java (Android)]
// Create event
new BranchEvent(BRANCH_STANDARD_EVENT.SEARCH)
.setCustomerEventAlias("my_custom_alias") // Define event data
.setDescription("Product Search")
.setSearchQuery("product name")
.addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
.logEvent(context); // Log event
```

```kotlin [Kotlin (Android)]
// Create event
BranchEvent(BRANCH_STANDARD_EVENT.SEARCH)
.setCustomerEventAlias("my_custom_alias") // Define event data
.setDescription("Product Search")
.setSearchQuery("product name")
.addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
.logEvent(applicationContext); // Log event
```

```javascript [JavaScript (Web)]
// Define event data
var event_and_custom_data = {
   "transaction_id": "tras_Id_1232343434",
   "currency": "USD",
   "revenue": 180.2,
   "shipping": 10.5,
   "tax": 13.5,
   "coupon": "promo-1234",
   "affiliation": "high_fi",
   "description": "Preferred purchase",
   "purchase_loc": "Palo Alto",
   "store_pickup": "unavailable"
};

// Define content data
var content_items = [
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
   "$keywords": [ "sneakers", "shoes" ],
   "$address_street": "230 South LaSalle Street",
   "$address_city": "Chicago",
   "$address_region": "IL",
   "$address_country": "US",
   "$address_postal_code": "60604",
   "$latitude": 12.07,
   "$longitude": -97.5,
   "$image_captions": [ "my_img_caption1", "my_img_caption_2" ],
   "$condition": "NEW",
   "$custom_fields": {"foo1":"bar1","foo2":"bar2"}
},
{
   "$og_title": "Nike Woolen Sox",
   "$canonical_identifier": "nike/5324",
   "$og_description": "Fine combed woolen sox for those who love your foot",
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
}];

var customer_event_alias = "my custom alias";

// Log event
branch.logEvent(
   "VIEW_ITEMS",
   event_and_custom_data,
   content_items,
   customer_event_alias,
   function(err) { console.log(err); }
);
```

:::

::: code-group

```javascript [ReactNative]
// Define event data
let params = {
  alias: "my custom alias",
  description: "Product Search",
	searchQuery: "user search query terms for product xyz",
  customData: {
   "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
   "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
  }
}

// Create event
let event = new BranchEvent(BranchEvent.Search, null, params)

// Log event
event.logEvent()
```

```custom [Flutter]
// Create event
BranchEvent event = BranchEvent.standardEvent(BranchStandardEvent.SEARCH);

// Define event data
event.eventDescription = "Product Search";
event.searchQuery = "user search query terms for product xyz";
event.addCustomData('Custom_Event_Property_Key1', 'Custom_Event_Property_val1');
event.addCustomData('Custom_Event_Property_Key2', 'Custom_Event_Property_val2');

// Log event
FlutterBranchSdk.trackContentWithoutBuo(branchEvent: event);
```

```swift [Swift (macOS)]
// Create event
let event = BranchEvent.standardEvent(.search)

// Define event data
event.alias = "my custom alias"
event.eventDescription = "Product Search"
event.searchQuery = "user search query terms for product xyz"
event.customData["Custom_Event_Property_Key1"] = "Custom_Event_Property_val1"

// Log event
Branch.sharedInstance.logEvent(event) { (error) in
	// Log errors here
}
```

```objectivec [Obj-C (macOS)]
// Create event
BranchEvent *event = [BranchEvent standardEvent:BranchStandardEventSearch];

// Define event data
event.alias = "my custom alias";
event.eventDescription = @"Product Search";
event.searchQuery = @"user search query terms for product xyz";
event.customData[@"Custom_Event_Property_Key1"] = @"Custom_Event_Property_val1";

// Log event
[[Branch sharedInstance] logEvent:event completion:^(NSError * _Nullable error) {
	NSLog(@"Test Standard Event: %@", error);
}];
```

```custom [cURL]
curl -vvv -d '{
  "name": "VIEW_ITEMS",
  "customer_event_alias": "my custom alias",
  "user_data": {
    "advertising_ids": {
      "oaid": "02ab41d3-7886-4f29-a606-fba4372e9fdc"
    },
    "os": "Android",
    "os_version": "25",
    "environment": "FULL_APP",
    "aaid": "abcdabcd-0123-0123-00f0-000000000000",
    "android_id": "a12300000000",
    "limit_ad_tracking": false,
    "developer_identity": "user123",
    "country": "US",
    "language": "en",
    "ip": "192.168.1.1",
    "local_ip": "192.168.1.2",
    "brand": "LGE",
    "app_version": "1.0.0",
    "model": "Nexus 5X",
    "screen_dpi": 420,
    "screen_height": 1794,
    "screen_width": 1080
  },
  "custom_data": {
    "purchase_loc": "Palo Alto",
    "store_pickup": "unavailable"
  },
  "event_data": {
    "search_query": "red sneakers",
    "description": "Preferred purchase",
    "custom_param_1": "Parameter 1",
    "custom_param_2": "Parameter 2",
    "custom_param_3": "Parameter 3"
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
      "$og_description": "Fine combed woolen sox for those who love your foot",
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
  "branch_key": "key_test_000000000000000"
}' https://api2.branch.io/v2/event/standard
```

```csharp [C# (Unity)]
// Create event
BranchEvent branchEvent = new BranchEvent(BranchEventType.SEARCH);

// Define event data
branchEvent.SetAlias("my_custom_alias");
branchEvent.AddCustomData("Description", "Product Search");
branchEvent.AddCustomData("Search Query", "product name");
branchEvent.AddCustomData("Custom_Event_Property_Key1", "Custom_Event_Property_val1");

// Log event
Branch.sendEvent(branchEvent);
```

:::

For more information, view the [full API docs](https://github.com/BranchMetrics/branch-deep-linking-public-api#logging-content-events).

### Track Lifecycle Events

Lifecycle Events are related to actions the user takes in your app to continue progressing through it. These events can apply to game apps as well as non-game apps. Examples include a user completing a tutorial, opting in to an email list, or starting a free trial.

| Event Name | iOS | Android | Web/API |
| --- | --- | --- | --- |
| Complete Registration | `BranchStandardEventCompleteRegistration` | `BRANCH_STANDARD_EVENT.COMPLETE_REGISTRATION` | `COMPLETE_REGISTRATION` |
| Complete Tutorial | `BranchStandardEventCompleteTutorial` | `BRANCH_STANDARD_EVENT.COMPLETE_TUTORIAL` | `COMPLETE_TUTORIAL` |
| Achieve Level | `BranchStandardEventAchieveLevel` | `BRANCH_STANDARD_EVENT.ACHIEVE_LEVEL` | `ACHIEVE_LEVEL` |
| Unlock Achievement | `BranchStandardEventUnlockAchievement` | `BRANCH_STANDARD_EVENT.UNLOCK_ACHIEVEMENT` | `UNLOCK_ACHIEVEMENT` |
| Invite | `BranchStandardEventInvite` | `BRANCH_STANDARD_EVENT.INVITE` | `INVITE` |
| Login | `BranchStandardEventLogin` | `BRANCH_STANDARD_EVENT.LOGIN` | `LOGIN` |
| Start Trial | `BranchStandardEventStartTrial` | `BRANCH_STANDARD_EVENT.START_TRIAL` | `START_TRIAL` |
| Subscribe | `BranchStandardEventSubscribe` | `BRANCH_STANDARD_EVENT.SUBSCRIBE` | `SUBSCRIBE` |
| Opt In | Tracked via [handleATTAuthorizationStatus()](https://portal.us.document360.io/developers-hub/docs/ios-advanced-features#track-att-opt-in-and-opt-out) | Not Applicable | Not Applicable |
| Opt Out | Tracked via [handleATTAuthorizationStatus()](https://portal.us.document360.io/developers-hub/docs/ios-advanced-features#track-att-opt-in-and-opt-out) | Not Applicable | Not Applicable |
| Uninstall | **API Only** | **API Only** | **API Only** |

#### Examples

::: code-group

```swift [Swift (iOS)]
// Create event
let event = BranchEvent.standardEvent(.completeRegistration)

// Define event data
event.alias = "my custom alias"
event.transactionID = "tx1234"
event.eventDescription = "User completed registration."
event.customData["registrationID"] = "12345"

// Log event
event.logEvent()
```

```objectivec [Obj-C (iOS)]
// Create event
BranchEvent *event = [BranchEvent standardEvent:BranchStandardEventCompleteRegistration];

// Define event data
event.alias = "my custom alias";
event.transactionID = @"tx1234";
event.eventDescription = @"User completed registration.";
event.customData = (NSMutableDictionary*) @{
    @"Custom_Event_Property_Key1": @"Custom_Event_Property_val1",
    @"Custom_Event_Property_Key2": @"Custom_Event_Property_val2",
    @"registrationID": @"12345"
};

// Log event
[event logEvent];
```

```java [Java (Android)]
// Create event
new BranchEvent(BRANCH_STANDARD_EVENT.COMPLETE_REGISTRATION)
	.setCustomerEventAlias("my_custom_alias") // Define event data
	.setTransactionID("tx1234")
	.setDescription("User created an account")
	.addCustomDataProperty("registrationID", "12345")
	.logEvent(context); // Log event
```

```kotlin [Kotlin (Android)]
// Create event
BranchEvent(BRANCH_STANDARD_EVENT.COMPLETE_REGISTRATION)
 .setCustomerEventAlias("my_custom_alias") // Define event data
 .setTransactionID("tx1234")
 .setDescription("User created an account")
 .addCustomDataProperty("registrationID", "12345")
 .logEvent(applicationContext); // Log event
```

```javascript [JavaScript (Web)]
// Define event data
var event_and_custom_data = {
   "transaction_id": "tras_Id_1234",
   "description": "Preferred purchase",
   "registration_id": "12345"
};

var customer_event_alias = "my custom alias";

// Log event
branch.logEvent(
   "COMPLETE_REGISTRATION",
   event_and_custom_data,
   customer_event_alias,
   function(err) { console.log(err); }
);
```

:::

::: code-group

```javascript [ReactNative]
// Define event data
let params = {
  alias: "my custom alias",
  transaction_id: "tras_Id_1234",
  description: "Preferred purchase",
  registration_id: "12345",
  customData: {
   "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
   "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
  }
}

// Create event
let event = new BranchEvent(BranchEvent.CompleteRegistration, null, params)

// Log event
event.logEvent()
```

```custom [Flutter]
// Create event
BranchEvent event = BranchEvent.standardEvent(BranchStandardEvent.COMPLETE_REGISTRATION);

// Define event data
event.transactionID = "tx1234";
event.eventDescription = "User completed registration";
event.addCustomData('Custom_Event_Property_Key1', 'Custom_Event_Property_val1');
event.addCustomData('Custom_Event_Property_Key2', 'Custom_Event_Property_val2');

// Log event
FlutterBranchSdk.trackContentWithoutBuo(branchEvent: event);
```

```swift [Swift (macOS)]
// Create event
let event = BranchEvent.standardEvent(.completeRegistration)

// Define event data
event.alias = "my custom alias"
event.transactionID = "tx1234"
event.eventDescription = "User completed registration."
event.customData["registrationID"] = "12345"

// Log event
Branch.sharedInstance.logEvent(event) { (error) in
	// Log errors here
}
```

```objectivec [Obj-C (macOS)]
// Create event
BranchEvent *event = [BranchEvent standardEvent:BranchStandardEventCompleteRegistration];

// Define event data
event.alias = "my custom alias";
event.transactionID = @"tx1234";
event.eventDescription = @"User completed registration.";

// Log event
[[Branch sharedInstance] logEvent:event completion:^(NSError * _Nullable error) {
	NSLog(@"Test Standard Event: %@", error);
}];
```

```custom [cURL]
curl -vvv -d '{
  "name": "COMPLETE_REGISTRATION",
  "customer_event_alias": "my custom alias",
  "user_data": {
    "advertising_ids": {
      "oaid": "02ab41d3-7886-4f29-a606-fba4372e9fdc"
    },
    "os": "Android",
    "os_version": "25",
    "environment": "FULL_APP",
    "aaid": "abcdabcd-0123-0123-00f0-000000000000",
    "android_id": "a12300000000",
    "limit_ad_tracking": false,
    "developer_identity": "user123",
    "country": "US",
    "language": "en",
    "ip": "192.168.1.1",
    "local_ip": "192.168.1.2",
    "brand": "LGE",
    "app_version": "1.0.0",
    "model": "Nexus 5X",
    "screen_dpi": 420,
    "screen_height": 1794,
    "screen_width": 1080
  },
  "custom_data": {
    "foo": "bar"
  },
  "event_data": {
    "description": "Preferred purchase",
    "custom_param_1": "Parameter 1",
    "custom_param_2": "Parameter 2",
    "custom_param_3": "Parameter 3"
  },
  "metadata": {},
  "branch_key": "key_test_0000000000000000"
}' https://api2.branch.io/v2/event/standard
```

```csharp [C# (Unity)]
// Create event
BranchEvent branchEvent = new BranchEvent(BranchEventType.COMPLETE_REGISTRATION);

// Define event data
branchEvent.SetAlias("my_custom_alias");
branchEvent.AddCustomData("Transaction_ID", "tx1234");
branchEvent.AddCustomData("Description", "User created an account");
branchEvent.AddCustomData("registrationID", "12345");

// Log event
Branch.sendEvent(branchEvent);
```

:::

For more information, view the [full API docs](https://github.com/BranchMetrics/branch-deep-linking-public-api#logging-user-lifecycle-events).

### Track Custom Events

If there isn't a Branch Standard Event that is suitable for the event you want to track, you can create a Custom Event.

#### Naming

The name `custom event` is **reserved by Branch**. Please give your Custom Event a more descriptive name.

Additionally, **do not use Standard Event names** as the name for your Custom Event.

#### Examples

::: code-group

```swift [Swift (iOS)]
// Create event
let event = BranchEvent.customEvent(withName:"User_Scanned_Item")

// Define event data
event.customData["Custom_Event_Property_Key1"] = "Custom_Event_Property_val1"
event.customData["Custom_Event_Property_Key2"] = "Custom_Event_Property_val2"
event.alias = "my custom alias"

// Log event
event.logEvent()
```

```objectivec [Obj-C (iOS)]
// Create event
BranchEvent *event = [BranchEvent customEventWithName:@"User_Scanned_Item"];

// Define event data
event.customData = (NSMutableDictionary*) @{
    @"Custom_Event_Property_Key1": @"Custom_Event_Property_val1",
    @"Custom_Event_Property_Key2": @"Custom_Event_Property_val2"
};
event.alias = "my custom alias";

// Log event
[event logEvent];
```

```java [Java (Android)]
// Create event
new BranchEvent("Some Custom Event")
	.addCustomDataProperty("Custom_Event_Property_Key11", "Custom_Event_Property_val11") // Define event data
	.addCustomDataProperty("Custom_Event_Property_Key22", "Custom_Event_Property_val22")
	.setCustomerEventAlias("my_custom_alias")
	.logEvent(MainActivity.this); // Log event
```

```kotlin [Kotlin (Android)]
// Create event
BranchEvent("Some Custom Event")
	.addCustomDataProperty("Custom_Event_Property_Key11", "Custom_Event_Property_val11") // Define event data
	.addCustomDataProperty("Custom_Event_Property_Key22", "Custom_Event_Property_val22")
	.setCustomerEventAlias("my_custom_alias")
	.logEvent(this); // Log event
```

```javascript [JavaScript (Web)]
// Define event data
var custom_data = {
   "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
   "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
};

// Log event
branch.logEvent(
    'custom_event_name',
    custom_data,
    function(err) { console.log(err); }
);
```

:::

::: code-group

```javascript [ReactNative]
Sc// Define event data
let params = {
  alias: "my custom alias",
  customData: {
   "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
   "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
  }
}

// Create event and pass null if no BranchUniversalObject is used
let event = new BranchEvent("Some Custom Event", null, params)

// Log event
event.logEvent()
```

```custom [Flutter]
// Create event
BranchEvent eventCustom = BranchEvent.customEvent('User_Scanned_Item');

// Define event data
eventCustom.addCustomData('Custom_Event_Property_Key1', 'Custom_Event_Property_val1')
eventCustom.addCustomData('Custom_Event_Property_Key2', 'Custom_Event_Property_val2');

// Log event
FlutterBranchSdk.trackContentWithoutBuo(branchEvent: eventCustom);
```

```swift [Swift (macOS)]
// Create event
let event = BranchEvent.customEvent(withName:"User_Scanned_Item")

// Define event data
event.customData["Custom_Event_Property_Key1"] = "Custom_Event_Property_val1"
event.customData["Custom_Event_Property_Key2"] = "Custom_Event_Property_val2"
event.alias = "my custom alias"

// Log event
Branch.sharedInstance.logEvent(event) { (error) in
	// Log errors here
}
```

```objectivec [Obj-C (macOS)]
// Create event
BranchEvent *event = [BranchEvent customEventWithName:@"User_Scanned_Item"];

// Define event data
event.customData[@"Custom_Event_Property_Key1"] = @"Custom_Event_Property_val1";
event.customData[@"Custom_Event_Property_Key2"] = @"Custom_Event_Property_val2";
event.alias = "my custom alias";

// Log event
[[Branch sharedInstance] logEvent:event completion:^(NSError * _Nullable error) {
	NSLog(@"Test Standard Event: %@", error);
}];
```

```custom [cURL]
curl -vvv -d '{
  "name": "picture swiped",
  "customer_event_alias": "my custom alias",
  "user_data": {
    "advertising_ids": {
      "oaid": "02ab41d3-7886-4f29-a606-fba4372e9fdc"
    },
    "os": "Android",
    "os_version": "25",
    "environment": "FULL_APP",
    "aaid": "abcdabcd-0123-0123-00f0-000000000000",
    "android_id": "a12300000000",
    "limit_ad_tracking": false,
    "developer_identity": "user123",
    "country": "US",
    "language": "en",
    "ip": "192.168.1.1",
    "local_ip": "192.168.1.2",
    "brand": "LGE",
    "app_version": "1.0.0",
    "model": "Nexus 5X",
    "screen_dpi": 420,
    "screen_height": 1794,
    "screen_width": 1080
  },
  "event_data": {
    "custom_param_1": "Parameter 1",
    "custom_param_2": "Parameter 2",
    "custom_param_3": "Parameter 3"
  },
  "custom_data": {
    "foo": "bar"
  },
  "metadata": {},
  "branch_key": "key_test_hdcBLUy1xZ1JD0tKg7qrLcgirFmPPVJc"
}' https://api2.branch.io/v2/event/custom
```

```csharp [C# (Unity)]
// Create event
BranchEvent branchEvent = new BranchEvent("Some Custom Event");

// Define event data
branchEvent.AddCustomData("Custom_Event_Property_Key11", "Custom_Event_Property_val11");
branchEvent.AddCustomData("Custom_Event_Property_Key22", "Custom_Event_Property_val22");
branchEvent.SetAlias("my_custom_alias");

// Log event
Branch.sendEvent(branchEvent);
```

:::

For more information, view the [full API docs](https://github.com/BranchMetrics/branch-deep-linking-public-api#logging-custom-events).

## Miscellaneous

### Facebook Ads support

If you are sending any event to Branch via a server to server call **and** you are running Facebook campaigns on iOS, it is required that you send the OS version to Branch for proper attribution on Facebook ads.

When sending events to Branch via a server-to-server (S2S) integration:

• If you are running Facebook campaigns on iOS, include `os_version`.

• If those campaigns use [AEM (Aggregated Event Measurement)](https://help.branch.io/docs/enable-app-aggregated-event-measurement-support), also include `anon_id` for accurate attribution.

## Testing

To make sure your events are being sent to Branch, you can check the Liveview [page](https://dashboard.branch.io/liveview/events) of the Branch Dashboard.

Please note that it may take several minutes for your events to appear in Liveview after they've been triggered.
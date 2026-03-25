---
title: "Create Branch Objects"
slug: create-branch-objects-and-events
---

## Overview

The `BranchUniversalObject` (BUO) and `BranchEvent` classes are fundamental to tracking and logging events with Branch. They are a standard way to send content and events to Branch, opening the door to deep linking, sharing content, content analytics, and content indexing.

A `BranchUniversalObject` instance represents a unique piece of content, such as an article, video, or item for sale. A `BranchEvent` instance corresponds to an in-app event that you want to log with Branch.

Together, these classes let you describe your content and events in a way that Branch can track.

## Prerequisites

To start using the `BranchUniversalObject` and `BranchEvent` classes:

1. Create a [Branch Dashboard](https://dashboard.branch.io/).
2. Integrate the appropriate Branch SDK into your app ([iOS](ios-sdk-overview.md) | [macOS](mac-os-basic-integration.md) | [Android](android-sdk-overview.md)).

## Branch Universal Object

Populate BUO properties like `title` and `price` with data about your content. You can also use the BUO `contentMetadata` field to include a sub-object that provides even more detail.

::: info Note
On iOS and macOS, content indexed using `CSSearchableItem` could be removed from Spotlight but cannot be removed if indexed using `NSUserActivity`.
:::

#### BUO Properties

| BUO Key | Description | Default Value | Link Property | OS |
| --- | --- | --- | --- | --- |
| `canonicalIdentifier` | The unique identifier for content that helps Branch dedupe across many instances of the same thing. This field is **required**.   Examples include a website with pathing or a database with identifiers for entities. | None | `$canonical_identifier` | iOS, macOS, Android |
| `canonicalUrl` | The canonical URL, used for SEO purposes. This should reflect the content’s web URL equivalent. | None | `$canonical_url` | iOS, macOS, Android |
| `title` | The name for the piece of content. | None | `$og_title` | iOS, macOS, Android |
| `contentDescription` | A description for the content. | None | `$og_description` | iOS, macOS, Android |
| `contentImageUrl` | The image URL for the content. Must be an absolute path. | None | `$og_image_url` | iOS, macOS, Android |
| `price` | The price of the item. | None | `$amount` | iOS, macOS, Android |
| `currency` | The currency representing the price (in ISO 4217 currency code). | `USD` | `$currency` | iOS, macOS, Android |
| `expirationDate` | Expiry date for the content and any associated link data. Represented as UTC epoch milli second. The maximum date this can be set is 31 days in the future. | None | iOS: `expiration`   Android: `$exp_date` | iOS, macOS, Android |
| `contentIndexMode` | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`.  `ContentIndexModePublic` indicates that you'd like this content to be discovered by other apps. | `ContentIndexModePublic` | `contentIndexMode` | iOS,  macOS |
| `locallyIndex` | If set to `1`, Branch will index this content on Spotlight on the user's phone. | `0` | `$locally_indexable` | iOS, macOS |
| `publiclyIndex` | If set to `1`, Branch will index this content on Google, Branch, etc. | `0` | `$publicly_indexable` | iOS, macOS |
| `keywords` | Keywords that describe the object. Used for Spotlight search and web scraping. | None | `$keywords` | iOS, macOS |
| `contentMetadata` | A sub-object that further describes your content. See the "BUO Content Metadata Properties" table for more information. | None |  | iOS, macOS, Android |

#### BUO Content Metadata Properties

The `contentMetadata` field of a BUO is a sub-object with a variety of properties you can populate to give Branch more details about the BUO.

| BUO Content Metadata Key | Description |
| --- | --- |
| `contentMetadata.customMetadata` | A dictionary that contains any extra parameters you'd like to associate with the BUO. These are available to you after the user clicks the link and opens the app. |
| `contentMetadata.contentSchema` | Set this property to the `BranchContentSchema` enum value that best describes the content type.   Valid values include `BranchContentSchemaCommerceProduct` and `BranchContentSchemaMediaImage`. |
| `contentMetadata.price` | The price of the item to be used in conjunction with other `contentMetadata` commerce fields. |
| iOS: `contentMetadata.currency`   Android: `contentMetadata.currencyType` | The currency in ISO 4217 currency code. The default is USD. |
| `contentMetadata.quantity` | The number of items. |
| `contentMetadata.sku` | The vendor SKU. |
| `contentMetadata.productName` | The product name. |
| `contentMetadata.productBrand` | The product brand. |
| `contentMetadata.productCategory` | A `BNCProductCategory` [value](track-branch-events.md), such as `BNCProductCategoryAnimalSupplies` or `BNCProductCategoryFurniture`. |
| `contentMetadata.productVariant` | The product variant. |
| `contentMetadata.condition` | A `BranchCondition` value, such as `BranchConditionNew` or `BranchConditionRefurbished`. |
| `contentMetadata.rating` `contentMetadata.ratingAverage` `contentMetadata.ratingCount` `contentMetadata.ratingMax` | The rating for your content. |
| `contentMetadata.addressStreet` `contentMetadata.addressCity` `contentMetadata.addressRegion` `contentMetadata.addressCountry` `contentMetadata.addressPostalCode` | The address of your content. |
| `contentMetadata.latitude` `contentMetadata.longitude` | The latitude and longitude of your content. |
| `contentMetadata.imageCaptions` | Image captions for the content's images. |

### BUO Best Practices

When working with BUO instances, Branch recommends certain practices and discourages others.

#### Do:

- Set the `canonicalIdentifier` to a unique, deduped value across instances of the app.
- Ensure that the `title`, `contentDescription`, and `imageUrl` properly represent the object.
- Initialize the BUO and call the `logEvent()` method with the `View Item` event on page load.
- Call the `showShareSheet()` and `createShortLink()` methods later in the lifecycle, when the user takes an action that needs a link.
- Call additional events (`Purchase`, `Share`, etc.) when the corresponding user action is taken.
- On iOS, set the `contentIndexMode` to `ContentIndexModePublic` or `ContentIndexModePrivate`. If set to `ContentIndexModePublic`, then content is indexed using `NSUserActivity`, otherwise content is indexed using `CSSearchableIndex` on Spotlight.

#### Do Not:

- Set the same `title`, `contentDescription`, and `imageUrl` across all objects.
- Wait until the user goes to share before initializing the object and register views.
- Wait until you need a link before initializing the object.
- Create many objects at once and register views in a `for` loop.

### iOS and macOS Examples

::: code-group

```swift [Swift]
let buo: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
buo.title = "My Content Title"
buo.contentDescription = "My Content Description"
buo.imageUrl = "https://example.com/mycontent-12345.png"
buo.contentMetadata.contentSchema = .product;
buo.contentMetadata.customMetadata["property1"] = "blue"
buo.contentMetadata.customMetadata["property2"] = "red"
```

```objectivec [Objective-C]
BranchUniversalObject *buo = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
buo.title = @"My Content Title";
buo.contentDescription = @"My Content Description";
buo.imageUrl = @"https://example.com/mycontent-12345.png";
buo.contentMetadata.contentSchema = BranchContentSchemaCommerceProduct;
buo.contentMetadata.customMetadata[@"property1"] = @"blue";
buo.contentMetadata.customMetadata[@"property2"] = @"red";
```

:::

### Android Examples

::: code-group

```java [Java]
BranchUniversalObject buo = new BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
  .setTitle("My Content Title")
  .setContentDescription("My Content Description")
  .setContentImageUrl("https://lorempixel.com/400/400")
  .setContentMetadata(new ContentMetadata().addCustomMetadata("key1", "value1"));
```

```kotlin [Kotlin]
val buo = BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
  .setTitle("My Content Title")
  .setContentDescription("My Content Description")
  .setContentImageUrl("https://lorempixel.com/400/400")
  .setContentMetadata(ContentMetadata().addCustomMetadata("key1", "value1"))
```

:::

## Branch Event

Use the `BranchEvent` class to track special user actions or application specific events. For example, you can track when a user adds an item to a shopping cart or searches for a keyword.

You can use a BUO instance to populate the `contentItems` field of the `BranchEvent` class. This is how you associate BUO data with a specific event.

### iOS and macOS Examples

**IMPORTANT**: This method should only be invoked after `initSession`. If it is invoked before, then Branch will silently initialize the SDK before the callback has been set, in order to carry out this method's required task. As a result, you may experience issues where the `initSession` callback does not fire.

::: code-group

```swift [Swift]
// Create a Branch Event (this example uses the `purchase` event)
let event = BranchEvent.standardEvent(.purchase)

// Add a populated BranchUniversalObject to the event
event.contentItems     = [ buo ]

// Add additional event data
event.alias = "my custom alias"
event.transactionID = "12344555"
event.eventDescription = "event_description"
event.searchQuery = "item 123"
event.customData = [
    "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
    "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
]

// Log the event
event.logEvent()
```

```objectivec [Objective-C]
// Create a Branch event (this example uses the `BranchStandardEventAddToCart` event)
BranchEvent *event     = [BranchEvent standardEvent:BranchStandardEventAddToCart];

// // Add a populated BranchUniversalObject to the event
event.contentItems     = (id) @[ buo ];

// Add additional event data
event.alias = @"my custom alias";
event.transactionID = @"12344555";
event.eventDescription = @"event_description";
event.searchQuery = @"item 123";
event.customData = (NSMutableDictionary*) @{
    @"Custom_Event_Property_Key1": @"Custom_Event_Property_val1",
    @"Custom_Event_Property_Key2": @"Custom_Event_Property_val2"
};

// Log the event
[event logEvent];
```

:::

### Android Examples

::: code-group

```java [Java]
// Create a Branch Event (this example uses the `ADD_TO_CART` event)
new BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
  .setCustomerEventAlias("my_custom_alias")
  .setDescription("Customer added item to cart")
  .setSearchQuery("Test Search query")
  .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
  .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
  .addContentItems(buo) // Add a populated BranchUniversalObject to the event
  .logEvent(context); // Log the event
```

```kotlin [Kotlin]
// Create a Branch Event (this example uses the `ADD_TO_CART` event)
BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
  .setCustomerEventAlias("my_custom_alias")
  .setDescription("Customer added item to cart")
  .setSearchQuery("Test Search query")
  .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
  .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
  .addContentItems(buo) // Add a populated BranchUniversalObject to the event
  .logEvent(applicationContext) // Log the event
```

:::

## More Examples

For more examples across our SDKs, visit our [docs](track-branch-events.md#available-events) on tracking commerce, content, lifecycle, and custom events.

## Deep Link Data Structure

An example of the data structure for a deep link in JSON:

```
{
  "randomized_bundle_token": "427469360685348303",
  "link": "https://example.app.link?%24randomized_bundle_token=427469360685348303",
  "session_id": "429691081177874743",
  "data": {
    "$canonical_identifier": "item/1503684554354.28",
    "$canonical_url": "https://example.com/home?utm_campaign=test&deeplink=value",
    "$desktop_url": "http://example.com/home",
    "$randomized_bundle_token": "427469360685348303",
    "$og_description": "My Content Description",
    "$og_image_url": "http://lorempixel.com/200/200/",
    "$og_title": "46D6D28E-0390-40E4-A856-BD74F34D24C8",
    "$publicly_indexable": true,
    "+click_timestamp": 1503684563,
    "+clicked_branch_link": true,
    "+is_first_session": false,
    "+match_guaranteed": true,
    "custom": "blue",
    "random": "FE848A5B-78F7-42EC-A253-9F795FE91692",
    "added": "1503684554354.33",
    "~campaign": "new launch",
    "~channel": "facebook",
    "~creation_source": 3,
    "~feature": "sharing",
    "~id": 429691043152332059,
    "~referring_link": "https://example.app.link/X7OsnWv9TF",
    "~stage": "new person",
    "~tags": [
      "one",
      "two"
    ]
  }
}
```
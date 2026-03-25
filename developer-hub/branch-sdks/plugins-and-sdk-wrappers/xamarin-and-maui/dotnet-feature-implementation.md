---
title: ".NET Feature Implementation"
slug: dotnet-feature-implementation
---

## Overview

While Branch configuration steps for [Xamarin](xamarin-configuration.md) and [MAUI](maui-configuration.md) applications differ, both types of applications use the same set of Branch SDK methods for feature implementation. These methods can be used to support both the iOS and Android components of your .NET application.

**IMPORTANT**: Please note that both Xamarin and MAUI applications need to use the `Branch-Xamarin-Linking-SDK` NuGet package, but that versions 9.0.0+ are only for MAUI apps. Earlier versions are for Xamarin.

## Deep Link

The Branch SDK has a collection of methods that make creating, sharing, and reading Branch Deep Links simple.

### Create Content Reference

The `BranchUniversalObject` ([BUO](create-branch-objects-and-events.md)) class is a central concept in Branch event tracking and logging. You can create a BUO instance and fill in its [properties](create-branch-objects-and-events.md#buo-properties) in the following way:

```
BranchUniversalObject buo = new BranchUniversalObject();
buo.canonicalIdentifier = "id12345";
buo.title = "id12345 title";
buo.contentDescription = "My awesome piece of content!";
buo.imageUrl = "https://example.com/image.png";
buo.metadata.AddCustomMetadata("foo", "bar");
```

### Create Deep Link

To create a Branch Deep Link, start by creating a [link properties](create-branch-objects-and-events.md#deep-link-data-structure) object with `new BranchLinkProperties();` and adding relevant data to it. Then pass that object, as well as a [BUO instance](dotnet-feature-implementation.md#create-content-reference), to the `GetShortUrl()` method to actually create the link.

You can verify Branch Deep Link creation in the **Liveview** section of the Branch [Dashboard](https://dashboard.branch.io/liveview).

```
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.tags.Add("tag1");
linkProperties.tags.Add("tag2");
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$desktop_url", "http://example.com");

Branch.GetInstance().GetShortURL(callback,
                                  universalObject,
                                  linkProperties);
```

### Share Deep Link

The `ShareLink()` method will generate a Branch Deep Link and tag it with the channel the user selects. You will need to pass this method a [BUO instance](dotnet-feature-implementation.md#create-content-reference) and a [link properties object](dotnet-feature-implementation.md#create-deep-link).

```
Branch.GetInstance().ShareLink (callback,
           universalObject,
           linkProperties,
           message)
```

### Read Deep Link

Reading a Branch Deep Link means retrieving [properties](dotnet-feature-implementation.md#create-deep-link) about that specific Deep Link.

Please note that Branch recommends receiving data from the listener to prevent a race condition.

```
// Get the parameters used the most recent time this user was referred
Dictionary<string, object> sessionParams = Branch.GetInstance().GetLastReferringParams();

// Get the parameters used the first time this user was referred
Dictionary<string, object> installParams = Branch.GetInstance().GetFirstReferringParams();
```

### Deferred Deep Linking

Use the iOS pasteboard to enable deferred deep linking via Branch NativeLink™.

::: warning Prerequisites
**Make sure you are on** [**v7.1.2+**](https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/releases/tag/7.1.2)

To use this feature you must:

- [Enable NativeLink™ Deep Linking](configure-default-link-behaviors.md#3-ios-default-link-behavior) in the [Branch Dashboard Configuration tab](https://dashboard.branch.io/configuration/general)  
  **or**
- Manually configure your Branch Link to use [$ios\_nativelink](creating-a-deep-link.md#deep-linking)
:::

To use the iOS pasteboard, implement one of the [pasteboard opt-in options](ios-advanced-features.md#implementation-options).

## Track Events

Branch SDK event tracking methods allow you to log [events](create-branch-objects-and-events.md#branch-event) that take place in your app.

Before tracking events with Branch, you'll want to familiarize yourself with the concept of a [Branch Universal Object](create-branch-objects-and-events.md#branch-universal-object) (BUO).

You can use the Branch [Dashboard](https://branch.dashboard.branch.io/liveview/events) to verify that your Branch Events are being captured correctly.

### Track Commerce Events

Commerce events describe events that relate to a customer interacting with your products and whether those interactions convert to a purchase. That conversion would be represented by a `PURCHASE` event. Other commerce events include things like adding payment information and viewing products.

You can track commerce event by creating a BUO for each product that is associated with the event you're tracking.

From there, add the BUO to the tracked event with `AddContentItem`, and use the right predefined `BranchEventType` for the event you want to track:

```
BranchUniversalObject buo = new BranchUniversalObject();
buo.canonicalIdentifier = "id12345";
buo.canonicalUrl = "https://branch.io/item/id12345";
buo.title = "Item 12345";
buo.contentDescription = "My awesome piece of content!";
buo.imageUrl = "https://example.com/image.png";

buo.metadata.price = (float)23.20;
buo.metadata.quantity = 1;
buo.metadata.sku = "1994329302";
buo.metadata.productName = "my_product_name1";
buo.metadata.productBrand = "my_product_brand1";
buo.metadata.productCategory = 				        BranchProductCategory.APPAREL_AND_ACCESSORIES;
buo.metadata.productVariant = "XL";
buo.metadata.condition = BranchCondition.NEW;
buo.metadata.AddCustomMetadata("foo", "bar");

BranchEvent branchCommerceEvent = new BranchEvent(BranchEventType.PURCHASE);
branchCommerceEvent.SetAlias("new_user_purchase");
branchCommerceEvent.AddContentItem(buo); 
branchCommerceEvent.SetRevenue((float)1.5);
branchCommerceEvent.SetShipping((float)10.5);
branchCommerceEvent.SetCurrency(BranchCurrencyType.USD);
branchCommerceEvent.SetTax((float)12.3);

Branch.GetInstance().SendEvent(branchCommerceEvent);
```

### Track Content Events

Content events occur when a user engages with your in-app content. This includes user searches, content viewing, content rating, and sharing. This can apply to a wide variety of in-app content, such as blog posts, music, videos, pictures, and e-commerce catalogue items.

```
BranchEvent branchContentEvent = new BranchEvent(BranchEventType.SEARCH);
branchContentEvent.SetAlias("my_custom_alias");
branchContentEvent.SetDescription("Product Search");
branchContentEvent.SetSearchQuery("user search query terms for product xyz");
branchContentEvent.AddCustomData("content_event_property_key1", "content_event_property_val1");

Branch.GetInstance().SendEvent(branchContentEvent);
```

### Track Lifecycle Events

Lifecycle events represent actions the user takes in your app to continue progressing through it. These events can apply to game apps as well as non-game apps, and includes actions like a user completing a profile, registering for something, or going through a tutorial.

```
BranchEvent branchLifecycleEvent = new BranchEvent(BranchEventType.COMPLETE_REGISTRATION);
branchLifecycleEvent.SetAlias("registration_flow_xyz"); branchLifecycleEvent.SetDescription("Existing User Registration");
branchLifecycleEvent.AddCustomData("lifeycle_event_property_key1", "lifecycle_event_property_val1");

Branch.GetInstance().SendEvent(branchLifecycleEvent);
```

### Track Custom Events

If you want to track an event that isn't predefined, you have the option to create a custom event.

**Important**: Branch strongly recommends using custom event names that contain no more than 40 characters, contain only letters, numbers, hyphens, spaces and underscores, and do not start with a hyphen.

```
BranchEvent branchCustomEvent = new BranchEvent("custom_event");
branchCustomEvent.SetAlias("custom_event_alias");
branchCustomEvent.SetDescription("Custom Event Description");
branchCustomEvent.AddCustomData("custom_event_property_key1", "custom_event_property_val1");
branchCustomEvent.AddCustomData("custom_event_property_key2", "custom_event_property_val2");

Branch.GetInstance().SendEvent(branchCustomEvent);
```

## Set User Tracking

You can set the identity of a user with the `SetIdentity()` method. This method sets the identity of a user (ID, UUID, etc.) for events, deep links, and referrals.

You can validate that user identities are being set properly using the Branch [Dashboard](https://dashboard.branch.io/liveview/identities).

```
Branch branch = Branch.GetInstance ();
branch.SetIdentity("the user id", this);  // Where this implements IBranchIdentityInterface
branch.Logout(this); // Where this implements IBranchIdentityInterface
```

## Troubleshoot

#### Xamarin: [Troubleshooting](xamarin-configuration.md#troubleshoot)

#### MAUI: [Troubleshooting](maui-configuration.md#6-troubleshoot)
---
title: "GTM iOS Setup"
slug: gtm-ios
---

## Overview

You can use Google Tag Manager (GTM) to trigger specific actions related to Branch.

This guide walks you through how to do this for your iOS app, in combination with the Branch iOS SDK.

More specifically, you will learn how to create and log Branch Events.

## Prerequisites

In order to use GTM and Branch together, you first need to:

1. Create a GTM account that has a container with "iOS" as the chosen platform.
2. [Integrate](ios-basic-integration.md) the Branch iOS SDK into your iOS app.

## Setup

### Import GTM

Add the following line to your `podfile` to import the GTM library:

```
pod 'GoogleTagManager', '~> 6.0'
```

To learn more about how to set up your `podfile`, visit the iOS Basic Integration [guide](ios-basic-integration.md#5-install-branch) and review the CocoaPods steps.

### Create Custom Class

You'll now need to write a class that includes your Branch code. This is the code that GTM will be configured to call.

Create a class that extends `NSObject` and implements `TAGCustomFunction`.

In this example, the class will create and log a Branch `PURCHASE` Event when triggered by GTM.

::: code-group

```swift [Swift]
import Foundation
import GoogleTagManager

final class BranchGTMClass : NSObject, TAGCustomFunction {
	func execute(withParameters parameters: [AnyHashable : Any]!) -> NSObject! {
		var parameters: [String : Any] = parameters as! [String : Any]
		guard let actionType: String = parameters[ActionTypeKey] as? String else {
			print("no action type key in this call. Doing nothing.")
			return nil
		}
		trackBranchEvent(parameters: parameters, eventType: .purchase)
	}
  
	func trackBranchEvent(parameters: [AnyHashable : Any]!, eventType: BranchStandardEvent) {
		var parameters: [String : Any] = parameters as! [String : Any]

		let branchUniversalObject = BranchUniversalObject.init()
		branchUniversalObject.canonicalIdentifier = "item/12345"
		branchUniversalObject.canonicalUrl = "https://branch.io/item/12345"
		branchUniversalObject.title = "My Item Title"

		let event = BranchEvent.standardEvent(eventType)

		event.contentItems = [ branchUniversalObject ]

		event.alias = "my custom alias"
		event.transactionID = "12344555"
		event.currency = .EUR
		event.shipping = 10.2
		event.tax = 12.3
		event.coupon = "test_coupon"
		event.affiliation = "test_affiliation"
		event.eventDescription = "Event_description"
		event.searchQuery = "item 123"
		event.customData = parameters as? [String : Any] ?? [:]
		if let revenue = parameters["revenue"] as? Double {
		event.revenue = revenue
	}

	event.logEvent()
}
```

```objectivec [Objective-C]
@import BranchSDK;

static NSString *const ActionTypeKey = @"actionType";

@interface BranchGTMClass : NSObject <TAGCustomFunction>

@end

@implementation BranchGTMClass

- (NSObject *)executeWithParameters:(NSDictionary<NSString *, id> *)parameters {
    NSMutableDictionary<NSString *, id> *mutableParameters = [parameters mutableCopy];
    NSString *actionType = mutableParameters[ActionTypeKey];
    if (actionType == nil) {
        NSLog(@"No action type key in this call. Doing nothing.");
        return nil;
    }
    [self trackBranchEventWithParameters:mutableParameters eventType:BranchStandardEventPurchase];
    return nil;
}

- (void)trackBranchEventWithParameters:(NSDictionary<NSString *, id> *)parameters eventType:(BranchStandardEvent)eventType {
    NSMutableDictionary<NSString *, id> *mutableParameters = [parameters mutableCopy];

    BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] init];
    branchUniversalObject.canonicalIdentifier = @"item/12345";
    branchUniversalObject.canonicalUrl = @"https://branch.io/item/12345";
    branchUniversalObject.title = @"My Item Title";

    BranchEvent *event = [BranchEvent standardEvent:eventType];
    event.contentItems = @[branchUniversalObject];
    event.alias = @"my custom alias";
    event.transactionID = @"12344555";
    event.currency = BNCurrencyEUR;
    event.shipping = 10.2;
    event.tax = 12.3;
    event.coupon = @"test_coupon";
    event.affiliation = @"test_affiliation";
    event.eventDescription = @"Event_description";
    event.searchQuery = @"item 123";
    event.customData = [mutableParameters copy];

    if (mutableParameters[@"revenue"] != nil) {
        event.revenue = [mutableParameters[@"revenue"] doubleValue];
    }

    [event logEvent];
}

@end
```

:::

Note the path to this class in your code. You'll need it when you create your tag in GTM.

## Implement Branch Features

### Track Events

#### 1. Create a Trigger

Create a new trigger that is associated with a Firebase event.

1. In the **Workspace** tab, click on **Triggers**.
2. Click **New**, and create a trigger with type **Custom Event**.
3. Provide an event name and configure when you want the trigger to fire. ![](/img/9163a29-Screenshot_2024-06-26_at_2.31.03_PM(1).png)
4. Click **Save**.

#### 2. Create a Tag

Create a new tag, which will describe what you want to have occur when the trigger fires.

1. In the **Workspace** tab, click on **Tags**.
2. Click **New**, and create a tag with type "Function Call".
3. For the **Class Path** field, add the path that leads to your custom class that calls Branch Event code.
4. In the **Key** and **Value** sections, add your relevant variables.
5. In the **Triggering** section, add the trigger you just created. ord![](/img/5ce4044-Screenshot_2024-06-28_at_2.06.11_PM.png)
6. Click **Save**.

#### 3. Deploy GTM Changes

Deploy the changes you have made on the GTM side. Once you do this, the Branch Event creation and logging code will run every time the GTM tag is fired.

#### 5. Trigger Firebase Event

In your code, trigger the Firebase event associated with the GTM trigger you created.

::: code-group

```swift [Swift]
let parameters: [String: Any] = [
	AnalyticsParameterCurrency: "EUR",
	AnalyticsParameterValue: 100
]
    
Analytics.logEvent(AnalyticsEventPurchase, parameters: parameters)
```

```objectivec [Objective-C]
NSDictionary *parameters = @{
    AnalyticsParameterCurrency: @"EUR",
    AnalyticsParameterValue: @100
};

[Analytics logEvent:AnalyticsEventPurchase parameters:parameters];
```

:::

## Testing

#### Liveview

To make sure you've successfully set up GTM to work with the Branch iOS SDK:

1. Trigger the event you are interested in, based on the trigger you set up in GTM.
2. Go to the Liveview [page](https://dashboard.branch.io/liveview/) of the Branch Dashboard.
3. Filter the dropdown to the relevant event type that you are interested in, such as "custom event".
4. Check to make sure that the event is being triggered with the expected details.

#### Enable Branch iOS SDK Logging

Make sure you have logging enabled within the Branch iOS SDK so you can see logs related to the Branch Event.

For steps on how to do this, visit our Branch iOS SDK Testing [guide](ios-testing.md#enable-logging).

## FAQs

Visit our [FAQs section](google-tag-manager.md#faqs) to learn more about implementing Branch with GTM.
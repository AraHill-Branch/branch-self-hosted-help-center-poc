---
title: "React Native Advanced Features"
slug: react-native-advanced-features
---

## Overview

The Branch React Native SDK exposes a set of methods specifically made for React Native apps, which you can call using JavaScript.

If you need to access a feature that lives in the Branch iOS SDK or Branch Android SDK, you can call those native SDKs directly in the relevant language.

[iOS SDK Full Reference](ios-full-reference.md)

[Android SDK Full Reference](android-full-reference.md)

## Prerequisites

Before you implement the features on this page, you first need to:

1. Create a [Branch Dashboard](https://dashboard.branch.io/?_gl=1*4u8xew*_ga*MTE0ODc2MjU5OC4xNjc5MzM4OTI0*_ga_KSDD8Y11CT*MTcxMzg4NzAyMC41MjQuMS4xNzEzODk5MTUzLjU5LjAuMA..).
2. [Integrate](react-native-basic-integration.md) the Branch React Native SDK into your mobile app.
3. [Validate](react-native-basic-integration.md#5-validate-integration) your integration.
4. Import Branch by adding the following import statement to any React Native source file that uses the SDK:

   ```
   import branch from 'react-native-branch'
   ```

## Defer Initialization for Plugin Runtime

It's possible you might run into race conditions which cause your app to not receive Branch params on cold starts.

If this happens, you may need to defer loading the native iOS or Android layer.

To do this, add the following code to your `branch.json` [file](react-native-basic-integration.md#3-configure-app):

```
{
  "deferInitForPluginRuntime": true
}
```

#### Set Initialization Metadata

Some third-party [Data Integration Partners](data-integration-partners.md) require setting certain identifiers before initializing Branch.

To do this:

1. Make sure you have added `deferInitForPluginRuntime` to your `branch.json` file as shown [above](react-native-advanced-features.md#defer-initialization-for-plugin-runtime).
2. Use the `setRequestMetadata()` method to set your identifiers:

```
import branch from 'react-native-branch'

// Call `setRequestMetadata` before `subscribe`
branch.setRequestMetadata('$analytics_visitor_id', '000001')

branch.subscribe(({error, params}) => {
  // ...
})
```

See our [iOS](ios-advanced-features.md#set-initialization-metadata) and [Android](android-advanced-features.md#set-initialization-metadata) documentation for more.

## Set Branch API URL

It is possible to set a custom base URL for all calls to the Branch API.

To do this, add the following code to your `branch.json` [file](react-native-basic-integration.md#3-configure-app):

```
{
  "apiUrl": "https://protected-api.branch.io"
}
```

## NativeLink™ Deferred Deep Linking

Use iOS pasteboard to enable deferred deep linking via Branch NativeLink™, which enables 100% matching on iOS through Installs.

::: warning Prerequisite
Minimum SDK Version: v5.0.4

To use this feature you must:

- [Enable NativeLink™ Deep Linking](configure-default-link-behaviors.md#3-ios-default-link-behavior) in the [Branch Dashboard App Settings tab](https://dashboard.branch.io/configuration/general)

**or**

- Manually configure your Branch Link to use [$ios\_nativelink](creating-a-deep-link.md#deep-linking)
:::

Please note that deferred deep linking is part of our Engagement package. Learn more on our [pricing](packaging.md) page.

#### Implementation Options

##### Basic Example

To enable this feature, call the `RNBranch.branch checkPasteboardOnInstall` method in the AppDelegate file. Call this method prior to Branch initialization.

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	[RNBranch.branch checkPasteboardOnInstall]; 
	[RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];

	return YES;
}
```

##### Example With iOS 15.X Check

If you only want to enable this feature on iOS 15.X, include an iOS version check prior to calling the `RNBranch.branch checkPasteboardOnInstall` method. Both the version check and the method call happen inside the AppDelegate file, before Branch initialization.

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if ([[[UIDevice currentDevice] systemVersion] compare:@"15.0" options:NSNumericSearch] != NSOrderedAscending)
        [RNBranch.branch checkPasteboardOnInstall]; 

    [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];
    
    return YES;
}
```

##### Example With Pasteboard Visibility Check

You can also check whether the pasteboard toast will show or not by using the `RNBranch.branch willShowPasteboardToast` method. This call happens inside the AppDelegate file, before Branch initialization.

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [RNBranch.branch checkPasteboardOnInstall];
  
    if ([RNBranch.branch willShowPasteboardToast]) {
    // ...
    }

    [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];

    return YES;
}
```

## Event Tracking

By default, the Branch React Native SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box).

You can also use the `BranchEvent` class to [track special user actions or application-specific events](track-branch-events.md). For example, you can track when a user adds an item to a shopping cart or searches for a keyword.

In short, a `BranchEvent` instance corresponds to an in-app event that you want to log with Branch.

You can use a `BranchUniversalObject` (BUO) instance to populate the `contentItems` field of the `BranchEvent`. This is how you associate BUO data with a specific event.

Learn more about [tracking events](track-branch-events.md) and the `logEvent()` [method](react-native-full-reference.md#logevent) in our respective guides.

## Push Notifications

To track Branch Deep Links in your push notifications, use the Branch React Native SDK `openURL()` method:

```
import branch from 'react-native-branch'

let data = {
  "aps": {
    "alert": "Push notification with a Branch deep link",
    "badge": "1"
  },
  "branch": "https://example.app.link/u3fzDwyyjF"
}

branch.openURL(data["branch"],{newActivity: true})
```

The JSON object you pass to `openURL()` can take any form, but it must include a field called `"branch"` at the top level, which points to a Branch Link.

Add this method to the callback function of the push notification handler ([iOS](ios-advanced-features.md#push-notifications) and [Android](android-advanced-features.md#push-notifications)).

## User Data

#### Google DMA Compliance

In response to the European Union's enactment of the Digital Markets Act (DMA), the Branch React Native SDK includes the `setDMAParamsForEEA()` method to help you pass consent information from your user to Google.

The setDMAParamsForEEA() method takes 3 parameters:

| Parameter Name | Type | Description | When `true` | When `false` |
| --- | --- | --- | --- | --- |
| `eeaRegion` | Boolean | Whether European regulations, including the DMA, apply to this user and conversion. | User is **included** in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA. | User is considered **excluded** from European Union regulations. |
| `adPersonalizationConsent` | Boolean | Whether end user has granted or denied ads personalization consent. | User has **granted** consent for ads personalization. | User has **denied** consent for ads personalization. |
| `adUserDataUsageConsent` | Boolean | Whether end user has granted or denied consent for 3P transmission of user level data for ads. | User has **granted** consent for 3P transmission of user-level data for ads. | User has **denied** consent for 3P transmission of user-level data for ads. |

##### Default Behavior

When parameters are successfully set using `setDMAParamsForEEA()`, they will be sent along with every future request to the following Branch endpoints:

- `/v1/install`
- `/v1/open`
- `/v2/event`

::: warning Omitted by Default
Please note that the 3 consent parameters related to `setDMAParamsForEEA()` are all omitted by default.

**Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.**

Making a successful `setDMAParamsForEEA()` call requires that all 3 parameters be set.
:::
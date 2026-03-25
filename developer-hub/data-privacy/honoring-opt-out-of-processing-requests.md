---
title: "Restricting End User Data Processing"
slug: honoring-opt-out-of-processing-requests
---

## Overview

We take our customers’ privacy needs very seriously. To enable our customers to honor opt-out requests from their end-users or comply with laws that allow end users to restrict processing of their data, we provide mechanisms for disabling certain data collection features, which are identified below.

This way, if a user indicates that they want to limit collection of their data on your app or website, or if you otherwise determine that a particular end user’s data should not be collected or processed, you can continue to make use of the Branch SDK (e.g. for creating and sharing Branch Links to deep link end users) while not measuring attribution for that end user.

## SDK Privacy Controls

We collect limited device information to power our deep linking technology and to provide attribution and analytics services. You can learn more about the types of data that we need to collect through our services here: <https://branch.io/policies/#privacy>.

We understand that some end users would like to opt out of (or not opt into) this data processing. In other cases, legal requirements (or Branch’s policies) do not permit that certain types of personal data for certain end users be provided to Branch (for example, data relating to children under the age of 13). To address these needs, we have developed the **SDK Privacy Controls** feature.

## Configure SDK Privacy Controls

With the SDK Privacy Controls feature, you can manage data processing on an **opt-out** or **opt-in** basis.

Learn more about each below.

### Opt-Outs

Operating on an opt-out basis means data from website or app visitors will no longer be processed by Branch once you’ve affirmatively disabled or reduce tracking for such users using the SDK [methods](honoring-opt-out-of-processing-requests.md#using-sdk-privacy-controls) below.

Through the Branch SDK Privacy Controls feature, a customer running an app or website can request that Branch cease certain personal data processing for a particular end user. Branch will immediately cease data processing for that end user. However, that user can still generate and share Branch Links, and basic deep linking to route the end user to the right place in the app will continue to work.

### Opt-Ins

If you're operating on an opt-in basis, then data from website or app visitors won’t be processed by Branch until you determine that it is appropriate for Branch to process their end user data and you affirmatively enabled or increased tracking for such users.

To use the SDK Privacy Controls in this way, set the end user's Consumer Protection Preference level to "No Attribution" or disabling tracking entirely for that user (see [examples](honoring-opt-out-of-processing-requests.md#using-sdk-privacy-controls)), and only change that if you determine that it is appropriate for Branch to process their end user data because they've opted-in to it.

### Impact on Analytics

Note that while the essential deep linking functionality of the SDKs will continue to work when the SDK Privacy Controls are enabled, there are significant tradeoffs to analytics that you should be aware of.

Depending on the level of tracking the user has consented to, you may not see analytics for these users in the Branch Dashboard.

We also won’t attribute their activity to any campaigns you may be running, send Postbacks for these events to your ads partners, or send these events to Self Attributing Networks like Facebook and Google.

Depending on the scope of how you use the SDK Privacy Controls, this can lead to significant drops in event counts and discrepancies with other analytics systems. This is particularly true if you enable these controls by default and only disable them when users opt into data processing, especially if your opt-in rates are very low.

### Opt-In vs. Opt-Out Processing

Different jurisdictions may have different requirements around consent for end user data processing. Branch provides tools like the SDK Privacy Controls to enable you to comply with these laws, but we cannot provide legal advice on the correct way for you to comply with each regulation or help interpret exactly how they apply to your business's use of our services. Please consult with your counsel to determine the right way for your business to handle end user data processing requests and other applicable requirements in each jurisdiction.

::: info End User Opt Out
If you are an end user looking to opt out of the Branch Services, please visit [Branch’s Opt-Out](https://branch.app.link/optout) page for available methods.
:::

## Using SDK Privacy Controls

If you would like to enable the SDK Privacy Controls for a particular user (for example, pursuant to a data subject request, or to comply with certain privacy laws), utilize the methods below to prevent Branch from sending most network requests. Note that there are two cases where the SDK will still send a network request:

1. App opens driven by a direct deep link. Used purely to retrieve deep link data, does not result in any events being attributed for the user.
2. Requests to generate Short Link URLs on iOS. Again, purely used to return a short Branch Link URL for e.g. an in-app sharing link and does not result in any events being attributed for the user.

By default, tracking is enabled (opt-in).

#### Android SDK

| Consumer Preference Level | Description | Value to Pass |
| --- | --- | --- |
| Full Attribution | This is the **default** level. This level includes advertising IDs and device IDs, as well as other data. | `FULL` |
| Privacy Attribution | This level does not include advertising IDs, but does include data from privacy frameworks like SKAN and Privacy Sandbox. | `REDUCED` |
| Analytics Only | This level includes device IDs, but does not include data from privacy frameworks. | `MINIMAL` |
| No Attribution | This level only includes deterministic deep linking. Appropriate for users that fall under GDPR or CCPA regulations. | `NONE` |

::: code-group

```java [Java]
// Set consumer preference level to "No Attribution"
Branch.getInstance().setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel.NONE);
```

```kotlin [Kotlin]
// Set consumer preference level to "Analytics Only"
Branch.getInstance().setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel.MINIMAL)
```

:::

Learn more about Consumer Protection Preferences in our [guide](consumer-protection-preferences.md).

#### iOS SDK

| Consumer Preference Level | Description | Swift | Obj-C |
| --- | --- | --- | --- |
| Full Attribution | This is the **default** level. This level includes advertising IDs and device IDs, as well as other data. | `full` | `BranchAttributionLevelFull` |
| Privacy Attribution | This level does not include advertising IDs, but does include data from privacy frameworks like SKAN and Privacy Sandbox. | `reduced` | `BranchAttributionLevelReduced` |
| Analytics Only | This level includes device IDs, but does not include data from privacy frameworks. | `minimal` | `BranchAttributionLevelMinimal` |
| No Attribution | This level only includes deterministic deep linking. Appropriate for users that fall under GDPR or CCPA regulations. | `none` | `BranchAttributionLevelNone` |

::: code-group

```swift [Swift]
// Set consumer preference level to "Privacy Attribution"
Branch.getInstance().setConsumerProtectionAttributionLevel(.reduced)
```

```objectivec [Objective-C]
// Set consumer preference level to "Full Attribution"
[Branch setConsumerProtectionAttributionLevel:BranchAttributionLevelFull];
```

:::

Learn more about Consumer Protection Preferences in our [guide](consumer-protection-preferences.md).

#### tvOS SDK

::: code-group

```swift [Swift]
Branch.setTrackingDisabled(true)
```

```objectivec [Objective-C]
Branch.setTrackingDisabled(true)
```

:::

#### Web SDK

**NOTE**: This state is persistent, meaning that it’s saved for the user across browser sessions for the web site. This setting can also be enabled across all users for a particular link, or across your Branch Links.

```
branch.init( 'BRANCH_KEY',
    {
        ‘tracking_disabled’ : true
    }
);
```

#### MacOS SDK

::: code-group

```swift [Swift]
Branch.sharedInstance().trackingDisabled = true
```

```objectivec [Objective-C]
[Branch sharedInstance].trackingDisabled = YES;
```

:::

#### Windows SDK

::: code-group

```cpp [C++]
branchInstance->getAdvertiserInfo().disableTracking();
```

```csharp [C#]
void DisableTracking(bool disableTracking);
```

:::

#### Roku SDK

```
m.branchSdkObj.disableTracking(true)
```

::: info Impact on Journeys
To learn how these privacy controls impact our Journey’s feature, please see [Journeys & GDPR](create-journey-banner-or-interstitial.md).
:::
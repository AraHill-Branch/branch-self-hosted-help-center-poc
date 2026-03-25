---
title: "Introducing Consumer Protection Preference Levels"
slug: introducing-consumer-protection-preference-levels
---

With Branch's new Consumer Protection Preferences (CPP) model, you can set user privacy preferences at a granular level based on the consent you've received from your user, instead of completely enabling or disabling tracking.

## Overview

CPP is an advancement in the user consent and attribution space. Instead of turning tracking either entirely on or entirely off for a user, you can take a more nuanced approach based on the kind of consent they've granted you.

Branch offers four consumer data preference levels, ranging from full attribution to no attribution.

## Consumer Preference Levels

The table below lists the different consumer preference levels and provides a brief description of each.

Find more details about each [here](consumer-protection-preferences.md#consumer-preference-level-details).

| Consumer Preference Level | Description |
| --- | --- |
| Full Attribution | This is the **default** level. This level includes advertising IDs and device IDs, as well as other data. |
| Privacy Attribution | This level does not include advertising IDs, but does include data from privacy frameworks like SKAN and Privacy Sandbox. |
| Analytics Only | This level includes device IDs, but does not include data from privacy frameworks. |
| No Attribution | This level only includes deterministic deep linking. Appropriate for users that fall under GDPR or CCPA regulations. |

## Usage

.png)

Using the `setConsumerProtectionAttributionLevel` method, you can relay to Branch the level of attribution and analytics data the user has consented to sharing with you and third parties.

The table below describes how each consumer preference level is referred to in various languages.

| Consumer Preference Level | Swift | Objective-C | Kotlin | Android |
| --- | --- | --- | --- | --- |
| Full Attribution | `full` | `BranchAttributionLevelFull` | `FULL` | `FULL` |
| Privacy Attribution | `reduced` | `BranchAttributionLevelReduced` | `REDUCED` | `REDUCED` |
| Analytics Only | `minimal` | `BranchAttributionLevelMinimal` | `MINIMAL` | `MINIMAL` |
| No Attribution | `none` | `BranchAttributionLevelNone` | `NONE` | `NONE` |

### Examples

Use the values in the table above alongside the consumer preference method used in these examples to set the appropriate attribution levels for your customers.

#### iOS

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

#### Android

::: code-group

```kotlin [Kotlin]
// Set consumer preference level to "Analytics Only"
Branch.getInstance().setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel.MINIMAL)
```

```java [Java]
// Set consumer preference level to "No Attribution"
Branch.getInstance().setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel.NONE);
```

:::

## Learn More

To learn more about CPP, visit our [guide](consumer-protection-preferences.md).
---
title: "Consumer Protection Preferences"
slug: consumer-protection-preferences
---

## Overview

![](/img/e47ba2b8aebbb3e0a2c401c63dae847b19945171757aca9f31d56462866b4b0d-unnamed_1.png)

Branch's Consumer Protection Preferences (CPP) model is an advancement in the user consent and attribution space. Instead of turning tracking either entirely on or entirely off for a user, you can take a more nuanced approach based on the level of consent you've received from them.

Once you've integrated a Branch SDK into your app, you can use it to tell Branch the level of data you want to collect and transmit about these users.

Branch offers four consumer data preference levels, ranging from full attribution to no attribution.

Using the `setConsumerProtectionAttributionLevel` method, you can relay to Branch the level of attribution and analytics data the user has consented to sharing with you and third parties.

## Consumer Preference Levels

The table below lists the different consumer preference levels and provides a brief description of each. See the next section for a more detailed look at each level.

::: warning Be sure you review the impact on UX, attribution, and analytics below
Setting the CPP level affects how events are tracked and what data is available on those events. Depending on the level you choose, deep linking UX, attribution methodologies, and analytics data can be affected. Review the below for the specific impact each level has.
:::

| Consumer Preference Level | Description |
| --- | --- |
| Full Attribution | This is the **default** level. This level includes advertising IDs and device IDs, as well as other data. |
| Privacy Attribution | Branch performs only aggregated measurement (for example, SKAN, Privacy Sandbox). No device or advertising IDs are used, and no device data is sent back to SANs. Owned and organic channels are also measured and attributed. |
| Analytics Only | Measurement occurs, but events are not attributed to any specific channel (everything is counted as organic). Device IDs are included, but data from privacy frameworks is excluded. |
| No Attribution | This level only includes deterministic deep linking. Appropriate for users that fall under GDPR or CCPA regulations. |

#### Consumer Preference Level Details

|  | Full Attribution | Privacy Attribution | Analytics Only | No Attribution |
| --- | --- | --- | --- | --- |
| **Advertising IDs (aaid/idfa)** | Yes | No | No | No |
| **Device IDs (idfv/android\_id/BFPID)** | Yes | Yes | Yes | No |
| **Persisted Non-Aggregate IDs (gclid)** | Yes | No | No | No |
| **Persisted Aggregate IDs (gbraid)** | Yes | No | No | No |
| **Privacy Frameworks** | Yes | Yes | No | No |
| **Ads Postbacks/Webhooks** | Yes | No | No | No |
| **Data Integrations/**  **Dashboard Webhooks** | Yes | Yes | Yes | No |
| **SAN Callouts** | Yes | No | No | No |
| **Deep Linking** | Always | Always | Always | Deterministic Only |

::: info You will see install network requests when you click a Branch link with CPP set to NONE
With CPP equal to NONE, any Branch link clicks will show an install call instead of an open for fetching deep link data but neither the install event nor device ID gets processed by the server.
:::

## Usage

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

```java [Java]
// Set consumer preference level to "No Attribution"
Branch.getInstance().setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel.NONE);
```

```kotlin [Kotlin]
// Set consumer preference level to "Analytics Only"
Branch.getInstance().setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel.MINIMAL)
```

:::
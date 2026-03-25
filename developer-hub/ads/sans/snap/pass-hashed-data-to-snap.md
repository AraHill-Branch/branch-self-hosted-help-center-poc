---
title: "Pass Hashed Data to Snap"
slug: pass-hashed-data-to-snap
---

## Overview

Advanced Conversions is Snap’s privacy-centric approach to digital advertising. It helps marketers meet their business objectives while respecting users’ ad tracking preferences via Apple’s ATT policy. This methodology employs a range of cryptographic techniques to measure aggregate conversion data, without tying off-platform activities (like installing an app or visiting a website) back to specific Snapchatters.

Advanced Conversions reporting is compatible for web and offline events via the Snap Pixel and Conversions API through integration with Branch through a Dashboard toggle.

**Note:** Snap Advanced Conversions is **DISABLED** by default; thus, Branch will only send iOS user data to Snap for those who have opted-in to ATT. Follow our guide on [Enabling Snap Advanced Conversions](snap-advanced-conversions.md#enabling-snap-advanced-conversions) to turn on.

## Enabling Snap Advanced Conversions

Visit our guide in Marketer Hub to learn more about [enabling Snap Advanced Conversions](https://help.branch.io/docs/snap-advanced-conversions).

## Pass Hashed Data

This step is **optional**.

In order to better help optimize ads and build improved re-marketing audiences, you can optionally send hashed PII (i.e. phone numbers or email addresses to model conversion events for Snap Advanced Matching. Call the Branch SDK method to set the hashed PII.

#### Hashed PII Requirements: Lowercase SHA-256

::: code-group

```swift [Swift]
//Set this before Branch SDK initialization
Branch.getInstance().addSnapPartnerParameter(withName: "hashed_email_address", value: "11234e56af071e9c79927651156bd7a10bca8ac34672aba121056e2698ee7088")
Branch.getInstance().addSnapPartnerParameter(withName: "hashed_phone_number", value: "534a4a8eafcd8489af32356d5a7a25f88c70cfe0448539a7c42964c1b897a359")
```

```objectivec [Objective-C]
//Set this before Branch SDK initialization
Branch *branch = [Branch getInstance];
branch addSnapPartnerParameterWithName:@"hashed_email_address" value:@"11234e56af071e9c79927651156bd7a10bca8ac34672aba121056e2698ee7088"];
branch addSnapPartnerParameterWithName:@"hashed_phone_number" value:@"534a4a8eafcd8489af32356d5a7a25f88c70cfe0448539a7c42964c1b897a359"];
```

```java [Java]
//Set this before Branch SDK initialization
Branch branch = Branch.getAutoInstance(getApplicationContext());
branch.addSnapPartnerParameterWithName("hashed_email_address", "11234e56af071e9c79927651156bd7a10bca8ac34672aba121056e2698ee7088");
branch.addSnapPartnerParameterWithName("hashed_phone_number", "534a4a8eafcd8489af32356d5a7a25f88c70cfe0448539a7c42964c1b897a359");
```

```kotlin [Kotlin]
//Set this before Branch SDK initialization
Branch branch = Branch.getAutoInstance(getApplicationContext())
branch.addSnapPartnerParameterWithName("hashed_email_address", "11234e56af071e9c79927651156bd7a10bca8ac34672aba121056e2698ee7088")
branch.addSnapPartnerParameterWithName("hashed_phone_number", "534a4a8eafcd8489af32356d5a7a25f88c70cfe0448539a7c42964c1b897a359")
```

:::

Once set, the parameters will be attached to all installs, opens, and events until cleared or when the app restarts.
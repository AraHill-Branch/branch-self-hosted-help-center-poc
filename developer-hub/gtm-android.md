---
title: "GTM Android Setup"
slug: gtm-android
---

## Overview

You can use Google Tag Manager (GTM) to trigger specific actions related to Branch.

This guide walks you through how to do this for your Android app, in combination with the Branch Android SDK.

More specifically, you will learn how to create and log Branch Events.

## Prerequisites

In order to use GTM and Branch together, you first need to:

1. Create a GTM account that has a container with "Android" as the chosen platform.
2. [Integrate](android-basic-integration.md) the Branch Android SDK into your Android app.

## Setup

### Import GTM

Update your `build.gradle` (Groovy) or `build.gradle.kts` (Kotlin) file to include the following line:

::: code-group

```groovy [Groovy]
implementation 'com.google.android.gms:play-services-tagmanager:18.0.4'
```

```kotlin [Kotlin]
implementation("com.google.android.gms:play-services-tagmanager:18.0.4")
```

:::

Learn more about updating your build file in our Android SDK Basic Integration [guide](android-basic-integration.md#2-install-branch).

### Create Custom Class

You'll now need to write a class that includes your Branch code. This is the code that GTM will be configured to call.

Create a custom class that extends `com.google.android.gms.tagmanager.CustomTagProvider`.

In this example, the class will create and log a Branch `PURCHASE` Event when triggered by GTM.

::: code-group

```java [Java]
package com.example.myAppPackageName;

import com.google.android.gms.tagmanager.CustomTagProvider;
import io.branch.referral.util.BRANCH_STANDARD_EVENT;
import io.branch.referral.util.BranchEvent;
import io.branch.referral.util.CurrencyType;

// If you are using ProGuard, make sure that the class methods and names are not obfuscated
@Keep
public class BranchGTMClass implements CustomTagProvider {
  
	@Override
	public void execute(@NonNull Map<String, Object> map) {
		Context applicationContext = context.getApplicationContext();
		BranchEvent e = new BranchEvent(BRANCH_STANDARD_EVENT.PURCHASE);

		for (Map.Entry<String,Object> v : map.entrySet()) {
			if(v.getKey().equals("revenue")){
				e.setRevenue((Double) v.getValue());
			}
			else if(v.getKey().equals("currency")) {
				e.setCurrency((CurrencyType) v.getValue());
			}
			e.addCustomDataProperty(v.getKey(),v.getValue().toString());
			Log.d("BranchExample ", "Key Is " + v.getKey() + " and val is  " + v.getValue());
		}
		e.logEvent(applicationContext);
	}
}
```

```kotlin [Kotlin]
package com.example.myAppPackageName

import android.content.Context
import androidx.annotation.Keep
import com.google.android.gms.tagmanager.CustomTagProvider
import io.branch.referral.util.BRANCH_STANDARD_EVENT
import io.branch.referral.util.BranchEvent
import io.branch.referral.util.CurrencyType

// If you are using ProGuard, make sure that the class methods and names are not obfuscated
@Keep
class BranchGTMClass : CustomTagProvider {

    override fun execute(map: Map<String, Any>) {
        val applicationContext = context.applicationContext
        val e = BranchEvent(BRANCH_STANDARD_EVENT.PURCHASE)

        for ((key, value) in map) {
            when (key) {
                "revenue" -> e.setRevenue(value as Double)
                "currency" -> e.setCurrency(value as CurrencyType)
            }
            e.addCustomDataProperty(key, value.toString())
            Log.d("BranchExample", "Key Is $key and val is $value")
        }
        e.logEvent(applicationContext)
    }
}
```

:::

Note the path to this class in your code. You'll need it when you create your tag in GTM.

## Implement Branch Features

### Track Events

#### 1. Create a Trigger

Create a new trigger that is associated with a Firebase event.

1. In the **Workspace** tab, click on **Triggers**.
2. Click **New**, and create a trigger with type **Custom Event**.
3. Provide an event name and configure when you want the trigger to fire. ![](/img/9163a29-Screenshot_2024-06-26_at_2.31.03_PM.png)
4. Click **Save**.

#### 2. Create a Tag

Create a new tag, which will describe what you want to have occur when the trigger fires.

1. In the **Workspace** tab, click on **Tags**.
2. Click **New**, and create a tag with type "Function Call".
3. For the **Class Path** field, add the path that leads to your custom class that calls Branch Event code.
4. In the **Key** and **Value** sections, add your relevant variables.
5. In the **Triggering** section, add the trigger you just created. ![](/img/938de10-Screenshot_2024-06-28_at_3.53.59_PM.png)
6. Click **Save**.

#### 3. Deploy GTM Changes

Deploy the changes you have made on the GTM side. Once you do this, the Branch Event creation and logging code will run every time the GTM tag is fired.

#### 4. Trigger Firebase Event

In your code, trigger the Firebase event associated with the GTM trigger you created.

::: code-group

```java [Java]
FirebaseAnalytics mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);
Bundle bundle = new Bundle();
bundle.putString("currency", "EUR");
bundle.putString("revenue", "100");
mFirebaseAnalytics.logEvent("Purchase", bundle);
```

```kotlin [Kotlin]
val mFirebaseAnalytics = FirebaseAnalytics.getInstance(this)
val bundle = Bundle()
bundle.putString("currency", "EUR")
bundle.putString("revenue", "100")
mFirebaseAnalytics.logEvent("Purchase", bundle)
```

:::

## Testing

#### Liveview

To make sure you've successfully set up GTM to work with the Branch Android SDK:

1. Trigger the event you are interested in, based on the trigger you set up in GTM.
2. Go to the Liveview [page](https://dashboard.branch.io/liveview/) of the Branch Dashboard.
3. Filter the dropdown to the relevant event type that you are interested in, such as "custom event".
4. Check to make sure that the event is being triggered with the expected details.

#### Enable Branch Android SDK Logging

Make sure you have logging enabled within the Branch Android SDK so you can see logs related to the Branch Event.

For steps on how to do this, visit our Branch Android SDK Testing [guide](android-testing.md#enable-logging).

## FAQs

Visit our [FAQs section](google-tag-manager.md#faqs) to learn more about implementing Branch with GTM.
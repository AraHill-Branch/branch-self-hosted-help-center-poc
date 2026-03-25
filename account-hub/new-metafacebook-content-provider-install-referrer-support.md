---
title: "New Meta/Facebook Content Provider Install Referrer Support"
slug: new-metafacebook-content-provider-install-referrer-support
---

We're bringing you a new level of support for Meta/Facebook's Install Referrer. Find out more in this update ↘️

## Overview

Branch app install reporting on Meta Android Campaigns is improving. We have been working closely with Meta on the implementation of a new solution called Meta install referrer and are excited to announce the rollout will begin by **April 17th, 2024**. We will now be able to share install-level reporting on additional measurement use cases by leveraging this tool.

### What is Meta install referrer?

Meta install referrer is an Android-specific measurement solution that is designed to help attribute views and clicks to the correlating app download. This means that it supports same-session click-through attribution as well as use cases that are unsupported by Google Play Install Referrer: most view-through attribution and non-same-session click-through attribution.

### How does this help?

This is good news for advertisers, as you will now see a more complete picture of your Meta Android Campaigns performance. This is because we anticipate that the volume of unattributed installs in your reports will reduce and instead be shared as view-through or non-same-session click-through installs. This will be available both through Branch reporting and through our exports.

## How does it work?

As part of the user’s ad exposure and conversion journey, when a user views or clicks on an advertiser's app install ad on Meta's app (e.g., Facebook or Instagram), Meta's app encrypts and logs the relevant ad campaign metadata in Meta app's local storage layer on-device.

Once the resulting install completes, when the user first opens the app, Branch’s SDK will read Meta install referrer data from the local storage layer on device and use it for attribution measurement.

### How does Meta install referrer work in conjunction with Google Play Install Referrer?

We will replicate the same process we used for Google Play Install Referrer, which involves a decryption key. If you haven’t set up Google Play Install Referrer yet, just install the latest version of the Branch SDK and the [Google Play Store Install Referrer API](https://developer.android.com/google/play/installreferrer/igetinstallreferrerservice) is called. We only use one of the 3 ways to attribute across Meta install referrer, Google Play Install Referrer, and Self-Attributing Network claims, so it should be automatically deduplicated. So customers should be reassured that both aggregate and user-level output will not contain duplication.

Branch’s "Meta Referrer" measurement consists of two install referrer solutions used by Meta when serving Android app install ads.

- Google Play Install Referrer

  - When a user clicks on an advertiser's app install ad from a Meta app install campaign, Meta encrypts and logs the relevant ad campaign metadata (Meta referrer) and appends it to the referrer parameter in the Play Store URL. The Play Store URL redirects the user to the Play Store app product page, and the appended Meta referrer is saved by the store.
  - Once the resulting install completes and the user first opens the app, Branch's SDK reads the Google Play install referrer from the Play Install Referrer API to retrieve the Meta referrer from the Google Play install referrer data. The Meta referrer is then decrypted by our servers for install attribution.
- Meta Install Referrer

  - When a user views or clicks on an advertiser's app install ad on Meta's app (e.g., Facebook or Instagram), Meta's app encrypts and logs the relevant ad campaign metadata (Meta referrer) in the Meta app's local storage layer on-device.
  - Once the resulting install completes and the user first opens the app, Branch's SDK reads the Meta referrer from the Meta install referrer data retrieved from the local storage layer on device. The Meta referrer is then decrypted by our servers for install attribution.

Branch prioritizes the Meta Referrer data to measure Meta attributions to prioritize the availability of user-level data for advertiser. . For a given Android app install, we will prioritize the following attribution methods as follows:

1. (Meta Referrer) Google Install Referrer
2. (Meta Referrer) Meta Install Referrer
3. Meta self-attributing API

Branch uses the self-attributing claim if any Meta Referrer data is not available. Doing so maximizes the availability of user-level attribution data while ensuring accurate aggregate measurement of Meta campaigns.

## Integration Guide

#### 1. Implement the Branch Android SDK to your mobile app

Please visit our [Developers Hub](android-sdk-overview.md) to implement the Branch SDK on Android. If you already have the Android SDK implemented into your mobile app, make sure that it is using [5.10.1+](https://github.com/BranchMetrics/android-branch-deep-linking-attribution/releases/tag/5.10.1).

##### 1a. Modify Android Manifest

To allow the Branch SDK to receive referral attribution data from Meta platforms, have your developer declare the following queries in your app's `AndroidManifest.xml` file:

```
//AndroidManifest.xml
<manifest>
    ...
    <queries>
        <!-- Facebook app for referral data -->
        <package android:name="com.facebook.katana" />
        <!-- Instagram app for referral data -->
        <package android:name="com.instagram.android" />
    </queries>
    ...
</manifest>
```

##### 1b. Set your FB App ID

Have your developer Implement the `setFBAppID` [method](android-full-reference.md) to enable support for view-through-attributed installs:

| Method | Description |
| --- | --- |
| `public static void setFBAppID(String fbAppID)` | Set your app's Facebook App ID, which is used for fetching the Meta Install Referrer. |

| Argument | Type | Description |
| --- | --- | --- |
| `fbAppID` | `String` | Your app's Facebook App ID. |

::: code-group

```kotlin [Kotlin]
package com.example.android

import android.app.Application
import io.branch.referral.Branch

class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()

		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext)
    
    // Set your Facebook App ID for Meta Install Referrer
    Branch.setFBAppID("YOUR_FACEBOOK_APP_ID_HERE")
	}
}
```

```java [Java]
import io.branch.referral.Branch;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // Initialize the Branch SDK
        Branch.getAutoInstance(this);
        
        // Set your Facebook App ID for Meta Install Referrer
        Branch.setFBAppID("YOUR_FACEBOOK_APP_ID_HERE");
    }
}
```

:::

#### 2. Obtain your Facebook Decryption Key

In the Facebook App Dashboard under **Basic > Settings** for your app, scroll down to the **Android** section. Copy the **Install Referrer Decryption Key**

![](/img/550c75e-Facebook_Install_Referrer_Decryption_Key.png "Facebook Install Referrer Decryption Key.png")

#### 3. Input your key in Branch

In the Branch Dashboard under **Ads > Partner Management**, find/search for **Facebook**.  
 Paste the decryption key from [Step 2](facebook-install-referrer.md#2-obtain-your-facebook-decryption-key).

If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings) to go there directly.

::: tip
Ready to learn more about Meta/Facebook Install Referrer? View our guide here: [Meta Install Referrer](facebook-install-referrer.md)
:::

## FAQ

#### Is there support for iOS?

No, iOS does not have an equivalent to the Meta install referrer mechanism.

#### When is Meta install referrer applicable for attribution?

- Install attribution and re-engagement attribution
- Click-through attribution for all campaigns
- View-through attribution for all Advantage + App Campaigns and Manual App Promotion Campaigns with broad targeting (e.g. where age, and gender are set to “default).
- Google Play Store and 3rd Party app stores
- Does not include campaigns redirecting to landing pages

#### How does Meta install referrer factor into Branch’s attribution waterfall?

Branch retains the existing attribution logic, and if Meta install referrer is present, it takes top priority.

#### How do you define broad targeting?

Broad targeting is required to receive view-through install data. You can find the supported campaign configuration below:

- Age: The default setting, “18-65+”, is applied
- Gender: The default setting, “All genders”, is applied.
- Location: Regions, country groups (e.g. Asia) or specific countries are applied as the location.
- Detailed Targeting: If detailed targeting such as demographics, interests or behaviors are applied, opting into Advantage detailed targeting is required.
- Custom Audiences: If Custom Audiences are applied, opting into Advantage custom audience is required.

![](/img/b2b5981-l8N_Image_1.png)![](/img/6e903f0-4nf_Image_2.png)
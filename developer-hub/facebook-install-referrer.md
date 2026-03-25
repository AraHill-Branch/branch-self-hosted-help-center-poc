---
title: "Meta Install Referrer"
slug: facebook-install-referrer
---

![](/img/73f8f80-Facebook_Referrer_Install.png "Facebook Referrer Install.png")

## Meta Referrer

Branch’s "Meta Referrer" measurement consists of two install referrer solutions used by Meta when serving Android app install ads - Google Play Install Referrer, and Meta install referrer. These solutions offer ways for advertisers to get device-level conversion data on Android for Facebook Ads, and each has different coverage based on different implementations.

## Google Play Install Referrer

When a user clicks on an advertiser's app install ad from a Meta app install campaign, Meta encrypts and logs the relevant ad campaign metadata (Meta referrer) and appends it to the referrer parameter in the Play Store URL. The Play Store URL redirects the user to the Play Store app product page, and the appended Meta referrer is saved by the store.

Once the resulting install completes and the user first opens the app, Branch's SDK reads the Google Play install referrer from the Play Install Referrer API to retrieve the Meta referrer from the Google Play install referrer data. The Meta referrer is then decrypted by our servers for install attribution.

#### Google Play Install Referrer Data limitations\*\*

This data will not be available for:

- Installs on iOS
- View-through post-install conversions (impressions)
- Android installs that happen on other app stores (ex. Galaxy Apps, Amazon Appstore, etc.)
- Android installs that happen in a later session than the ad click through to the Google Play Store

## Meta Install Referrer

When a user views or clicks on an advertiser's app install ad on Meta's app (e.g., Facebook or Instagram), Meta's app encrypts and logs the relevant ad campaign metadata (Meta referrer) in the Meta app's local storage layer on-device.

Once the resulting install completes and the user first opens the app, Branch's SDK reads the Meta referrer from the Meta install referrer data retrieved from the local storage layer on device. The Meta referrer is then decrypted by our servers for install attribution.

Branch prioritizes the Meta Referrer data to measure Meta attributions to prioritize the availability of user-level data for advertiser. For a given Android app install, we will prioritize the following attribution methods as follows:

(Meta Referrer) Google Play Install Referrer

(Meta Referrer) Meta Install Referrer

Meta self-attributing API

Branch uses the self-attributing claim if any Meta Referrer data is not available. Doing so maximizes the availability of user-level attribution data while ensuring accurate aggregate measurement of Meta campaigns.

#### Meta install referrer coverage

Meta install referrer data is available for Android app installs on Google Play, including both click (same session & non-same session) and view-through data (see below FAQ for limitations).

#### How does Meta install referrer work?\*\*

As part of the user’s ad exposure and conversion journey, when a user views or clicks on an advertiser's app install ad on Meta's app (e.g., Facebook or Instagram), Meta's app encrypts and logs the relevant ad campaign metadata in Meta app's local storage layer on-device.

Once the resulting install completes, when the user first opens the app, Branch’s SDK will read Meta install referrer data from the local storage layer on device and use it for attribution measurement.

#### How does Meta install referrer work in conjunction with Google Play Install Referrer?

We will replicate the same process we used for Google Play Install Referrer, which involves a decryption key. If you haven’t set up Google Play Install Referrer yet, just install the latest version of the Branch SDK and the Google Play Store Install Referrer API is called. We only use one of the 3 ways to attribute across Meta install referrer, Google Play Install Referrer, and Self-Attributing Network claims, so it should be automatically deduplicated. So customers should be reassured that both aggregate and user-level output will not contain duplication.

## Integration Guide

### 1. Implement the Branch Android SDK to your mobile app

Please visit our [Developers Hub](android-sdk-overview.md) to implement the Branch SDK on Android. If you already have the Android SDK implemented into your mobile app, make sure that it is using [v5.10.1+](android-version-history.md#v5101) to support Meta install referrer (Google Play Install Referrer is supported from [v5.2.0](android-version-history.md#v520)).

#### 1.a Modify Android Manifest (Meta install referrer only)

To allow the Branch SDK to receive referral attribution data from Meta platforms, have your developer declare the following queries in your app's AndroidManifest.xml file:

```
<manifest>
...
<queries>
<!-- Facebook app for referral data -->
<package android:name="com.facebook.katana" />
<!-- Instagram app for referral data -->
<package android:name="com.instagram.android" />
<!-- Facebook Lite app for referral data -->
<package android:name="com.facebook.lite" />
</queries>
...
</manifest>
```

#### 1.b Set your FB App ID (Meta install referrer only)

Have your developer Implement the `setFBAppID` [method](android-full-reference.md#setfbappid) to enable support for view-through-attributed installs:

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

### 2. Obtain your Facebook Decryption Key

In the Facebook App Dashboard under **Basic > Settings** for your app, scroll down to the Android section. Copy the **Install Referrer Decryption Key**.

![](/img/db31247-Meta_Decryption_Key.png)

### 3. Input your key in Branch

In the Branch Dashboard under **Ads > Partner Management**, find/search for Facebook.

Paste the decryption key from Step 2. Note you only need to do this step once to enable both Google Play Install Referrer and the Meta install referrer.

If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings) to go there directly.

### 4. View data in Branch Exports or Webhooks

Utilize Branch's [Exports](apidocs.md) or [Webhooks](webhooks.md) to look at granular Facebook-attributed data.

Note: You need a live Facebook Android ad campaign running in order for data to properly flow through Branch.

**Example Meta Referrer Export**

| `user_data_aaid` | `last_attributed_touch_data_tilde_ad_id` | `last_attributed_touch_data_tilde_ad_name` | `last_attributed_touch_data_tilde_advertising_partner_name` | `last_attributed_touch_data_dollar_3p` | `last_attributed_touch_data_tilde_ad_set_id` | `last_attributed_touch_data_tilde_ad_set_name` | `attributed` | `user_data_brand` | `last_attributed_touch_data_tilde_campaign_id` | `last_attributed_touch_data_tilde_campaign` | `last_attributed_touch_data_tilde_channel` | `last_attributed_touch_data_tilde_feature` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 124bed9c-5c28-43d0-8c7a-1a44ce93db2c | 23847649446430680 | App Install Ad | Facebook | a\_facebook | 23847649328040680 | App Install Ad Set | TRUE | samsung | 23847649328020680 | App Installs Campaign | Facebook | paid advertising |

---

## FAQ

<details>
<summary>What is the difference between Branch's normal attribution with Facebook and attribution from Meta referrers?</summary>

Attribution with Facebook can occur through the [Facebook MMP API](facebook-ads-overview.md) and/or through [Meta install Referrers](facebook-install-referrer.md).

- For the Facebook MMP API, attribution occurs through a server-to-server connection between Branch and Facebook on installs, opens, reinstalls, and downstream app events. Facebook will then take those events and perform their own self-attribution to claim credit for the conversion. Attributed data is available only via aggregate reports due to Facebook's data-sharing limitation.
- >For Meta referrers, attribution of installs on Android is controlled through the use of Google Android APIs to pass encrypted data for attribution. Attributed data is then available in Branch's aggregate reports and in log-level Exports/Webhooks.

**Note:** Branch will prioritize Install Referrer data over MMP API data for attribution if both are available.

</details>

<details>
<summary>What events are displayed in log-level data reports and when will this become available?</summary>

Log-level data for all events is displayed in Exports/Webhooks once a valid install referrer decryption key is submitted and is attributed to Facebook Ads with Install Referrer data.

**Note:** If an open or re-install comes with install referrer from Facebook, then it will also be available in the log-level data reports.

</details>

<details>
<summary>What can cause differences between Branch and Meta reporting when Facebook Install Referrer is enabled?</summary>

Possible Causes:

- Facebook's self-attribution for Android is only available when the device ID (GAID/AAID) is available. Meta’s referrer attribution is available when device ID is not available on Android 12+ devices.
- Facebook's self-attribution supports cross-device claims while Meta referrers only support attribution on a single device.
- Timestamps can also cause discrepancies. Facebook uses the timestamp received from the MMP API. Branch uses the timestamp available from the Meta referrers.

</details>

<details>
<summary>Is there support for iOS?</summary>

No, iOS does not have an equivalent to the Google Play Install Referrer or Meta install referrer mechanisms.

</details>

<details>
<summary>When is Meta install referrer applicable for attribution?</summary>

- Install attribution and re-engagement attribution
- Click-through attribution for all campaigns
- View-through attribution for all Advantage + App Campaigns and Manual App Promotion
- Campaigns with **broad targeting** (e.g. where age, and gender are set to “default)
- Google Play Store and 3rd Party app stores
- Does not include campaigns redirecting to landing pages

</details>

<details>
<summary>How does Meta install referrer factor into Branch’s attribution waterfall?</summary>

Branch retains the existing attribution logic, and if Meta install referrer is present, it takes top priority.

</details>

<details>
<summary>How do you define broad targeting?</summary>

Broad targeting is required to receive view-through install data from the Meta install referrer. You can find the supported campaign configuration below:

- Age: The default setting, “18-65+”, is applied
- Gender: The default setting, “All genders”, is applied.
- Location: Regions, country groups (e.g. Asia) or specific countries are applied as the location.
- Detailed Targeting: If detailed targeting such as demographics, interests or behaviors are applied, opting into Advantage detailed targeting is required.
- Custom Audiences: If Custom Audiences are applied, opting into Advantage custom audience is required.   
   ![Broad Targeting](/img/Broad Targeting.png)

</details>
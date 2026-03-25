---
title: "Android SDK Overview"
slug: android-sdk-overview
---

### SDK Stats

**Open Source Github Repo**: <https://github.com/BranchMetrics/android-branch-deep-linking>

**SDK Size**: 187kb

**Speed**: Median 80ms to 250ms

**Minimum OS Version**: API Level 21+

### Android Demo App

**Want to take our technology for a test drive before implementing it?**

[DOWNLOAD BRANCH MONSTER FACTORY](https://play.google.com/store/apps/details?id=io.branch.branchster)

**Want to dive into the code directly?**

[VIEW BRANCH MONSTER FACTORY GITHUB](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android)

### Basic Integration

**Integrating the Branch Android SDK is required for the following features:**

- Ads
- Email
- Journeys

[INTEGRATE THE BRANCH SDK](android-basic-integration.md)

### Advanced Features

**On top of the basic integration, you can implement the following features:**

- Create content reference
- Create deep link
- Share deep link
- Read deep link
- Navigate to content
- Display content
- Track content
- Track users
- Handle push notifications
- Handle links in your own app

[IMPLEMENT ADVANCED FEATURES](android-advanced-features.md)

### Testing

**Test your Branch integration before your app goes live.**

[TEST THE INTEGRATION](android-testing.md)

### Troubleshooting

**Running into issues? Browse our troubleshooting section to find a solution.**

[SEARCH SOLUTIONS](android-troubleshooting.md)

### Version History

**View past versions of the Branch SDK for Android including changes.**

[VIEW VERSION HISTORY](android-version-history.md)

### Full Reference

**The information presented here serves as a reference manual for our Android SDK.**

[VIEW FULL REFERENCE](android-full-reference.md)

## FAQ

<details>
<summary>Why do we recommend initializing the SDK in onStart() versus onCreate() in Android?</summary>

`onCreate()` is called when the Activity is first created and not when the activity is backgrounded. The Branch SDK is to be initialized every time the activity is foregrounded. If the activity is backgrounded and then foregrounded, this callback is not guaranteed to be called and hence the SDK will not be initialized.

The recommended way to initialize the Branch SDK is in `onStart()`. This is where you need to initialize the SDK since this callback is triggered every time the app is started whether from a cold start or a warm start. This is the callback that makes the activity visible to the user.

</details>

<details>
<summary>Why does my Android app crash when opening from a Branch link?</summary>

This mostly happens when there is a problem with the AndroidManifest.xml file. Please check to make sure that the entries added for App Links are not broken and are added inside the correct launcher activity.

Also, ensure that the entry for application name points to an existing Application class.

</details>

<details>
<summary>How do I know if my Android app links are configured properly?</summary>

You can check on which app links will open the app directly by doing the following:

Navigate to **App Info** > **Advanced** > **Open by Default** > **Supported Links**. This will show all the app links that are enabled for your app.

</details>

<details>
<summary>Why does my Android app call Branch multiple times when resuming?</summary>

This behavior is often a consequence of the launchMode parameter in the Android manifest being set incorrectly. Make sure that launchMode in the manifest is set as follows:

`android:launchMode='singleTask'`

When this is not set, or is set incorrectly, the activity may fire twice.

</details>

<details>
<summary>Why did Google Play remove my app from the store?</summary>

In older versions of the Branch Android SDK (1.2.6 to 2.11.0) calls were made to <https://api.branch.io/v1/applist> endpoint. We disabled and deprecated this endpoint in 2015, but it seems that it is not enough. We believe a recent update to the Google Play Store policies prompted these new violations. In response, Branch has removed all the potentially hostile code from our Android SDK and released an updated version on 8/14/17. This was limited to our Android SDK and our latest SDK complies with the privacy policies of the Play Store.

Please update your Android app to use the latest version (v 2.11.1) of the Branch SDK and re-submit it to the Play Store.

</details>

<details>
<summary>How does Charles Proxy relate to my Android app?</summary>

Since Android N, you are not able to proxy to apps unless it is your own app. What this means is:

1. You need to download the .apk.
2. Add the code in the [instructions](https://developers.google.com/admob/android/charles)​.
3. Recompile it.

</details>

<details>
<summary>How do I stop collecting the SSAID (android\_id)?</summary>

The SSAID or android\_id is a persistent hardware identifier that is “common between apps signed by the same developer signing key.” Branch utilizes this for many use cases such as Fraud and to provide the best user experience across different apps. If you wish for Branch not to collect the SSAID, you can call `Branch.disableDeviceIDFetch()` within `onCreate()` of your Application Class.

When this method is enabled, the SDK will fallback to generating a UUID as a hardware id.

</details>

<details>
<summary>Why does my app not open directly when it gives an option to choose between browser and app?</summary>

On Android, **if the App Links are enabled correctly, they should never show the dialog box to choose between a browser and the app as mentioned in the** [**Android documentation**](https://developer.android.com/training/app-links/verify-site-associations)**.**

### Troubleshooting Steps

1. Confirm the device browser is NOT the default handler for xx.app.link domain.

   - Android App Links sets the app as the default handler for a domain (i.e., xx.app.link). If a user clicks a link before App Links is enabled, they’ll have the option to open in browser or in-app. If the browser is selected with “always”, that domain will never open the app.
   - Reset browser defaults: Settings → Apps → select the browser → Defaults → “Clear Defaults”.
2. If one domain is failing verification, App Links is disabled for every other domain too.

   - Every domain & subdomain in Manifest must host a DAL file at: https://[domain]/.well-known/assetlinks.json
   - Even if `autoVerify="true"` is not in all intent filters, Android will scrape every domain.
3. Confirm Branch dashboard & all other DAL files contain the correct SHA 256 fingerprint.
4. Confirm app’s compileSdkVersion in build.gradle is 23+.
5. All link domains must be publicly accessible (not behind firewall/vpn) and accessible by Google's bots.
6. Validate App Links: Install app > connect device to Android Studio > ./adb shell dumpsys package d.

*[Image: 520]*

Successful verification

*[Image: 327]*

Failed verification

</details>

<details>
<summary>How do I continue accessing GAID after Android 12?</summary>

Google will [implement some changes to GAID access](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en) beginning in April 2022. If your app targets Android 13, you will need to declare new `AD_ID` permission to continue collecting GAIDs for users on Android 13.

To ensure your Branch attribution data remains reliable and complete, please take either of the following actions before April 2022:

1. Confirm that your Google Mobile Ads SDK (play-services-ads-identifier) SDK is version 17.1.0+ (released September 2021). Versions 17.1.0 and above of this SDK automatically merge the `AD_ID` permission, allowing your app to continue properly ingesting the GAID.  
   **OR**
2. If you prefer not to update your Google Mobile Ads SDK at this time, you may explicitly declare the new AD\_ID permission () in your app's manifest file. More information on how to do this is available [here](android-basic-integration.md).

</details>

<details>
<summary>Will the GAID changes impact our attribution on Branch?</summary>

Since the introduction of zeroed out GAIDs is the same feature as Limit Ad Tracking and Limit Ad Tracking has been available on Android for years, we do not expect a sudden decrease in Attribution or heavily impact our Attribution reporting. This is primarily because Branch **does not** collect the GAID when Limit Ad Tracking is enabled by the end-user.

With that said, many Ad Networks are implementing alternative parameters and methodologies to provide accurate attribution reporting even with Limit Ad Tracking enabled. Please evaluate the matrix below.

### Impact on Sources when GAID is Zeroed and Limit Ad Tracking is Enabled

| Source | Alternate Param/ID | Install | Open | Downstream Events |
| --- | --- | --- | --- | --- |
| Facebook | [Facebook Install Referrer](facebook-install-referrer.md) | Yes | Yes | Yes |
| Google | Market Referrer GCLID | Yes | Yes | Yes |
| Twitter | Unknown | No | No | No |
| Snap | Probabilistic Attribution for Android | Yes | Yes | Yes |
| Non-SANs | No changes as Branch Links are used. | Yes | Yes | Yes |
| Other Branch Features | [PREM](predictive-modeling.md) | Yes | Yes | Yes |

</details>

<details>
<summary>Why are Branch Links always taking me to the Google Play Store on Android 12?</summary>

With the introduction of Android 12, Google has implemented some new updates to how Android App Links function and how they are properly verified. One update we have observed, but are unable to find official Google documentation, is the lack of auto-verification and support for Application ID Suffixes.

Application ID suffix is something for Android to allow apps to differentiate builds with different app IDs.  
For example:  
**Production Build:** io.branch  
**QA Build:** io.branch.qa  
**Staging Build:** io.branch.staging

Please check your {domain}.app.link/.well-known/assetlinks.json or {domain}.test-app.link/.well-known/assetlinks.json (generated by Branch when you select the **Enable App Links** checkbox in Branch) file to ensure the proper packages are declared. We have observed that all packages, including their Application ID Suffixes, need to be explicitly declared on the Digital Asset Links files that Branch hosts on your Branch Links (app.link).

We strongly recommend utilizing Androids [App Link Verification Instructions](https://developer.android.com/training/app-links/verify-site-associations) to identify and confirm the root cause.

Additionally, Branch has noticed the enforcement of explicitly declaring hosts for your Branch URI Scheme within the intent filter of your manifest. By default Branch will utilize the open host (i.e {uri-scheme}://open?....), however, when utilizing deeplink\_paths, we can replace the open host with your $deeplink\_path. If you do use $deeplink\_path, please explicitly declare those paths for your host or utilize a wildcard. [Android Basic Integration - Configure App](android-basic-integration.md)

If you are noticing Branch Links not working on Android 12 devices with your app targeting API 31+, please contact your Branch Account team or [Submit a Ticket](submit-a-ticket.md).

</details>
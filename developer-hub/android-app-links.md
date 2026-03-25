---
title: "Android App Links"
slug: android-app-links
---

## Overview

Branch makes it simple to enable Android App Links while greatly improving on them, offering full attribution, supporting edge cases where Android App Links fail, and allowing you to deep link when the user doesn't have your app installed. Note that Android App Links only work on Android 6+; Branch can handle the rest!

### Setup

#### 1. Generate signing certificate fingerprint

1. Start by generating a SHA256 fingerprint of your app's signing certificate.

   1. Navigate to your [keystore](https://developer.android.com/studio/publish/app-signing#generate-key) file. This is the file that you use to build the debug and production version of your APK file before deploying it.
   2. Run this command to generate the fingerprint: `keytool -list -v -keystore xxxx-example-my-release-key.keystore`
   3. You'll see a value like  
      `14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5`   
       come out the other end. Copy this.
2. Now, you’ll enable app links on the Branch dashboard by doing the following:

   1. Head to the [Configuration](https://dashboard.branch.io/configuration/general) page on the Branch dashboard.
   2. Toggle the **Enable App Links** checkbox in the Android section.
   3. Paste the copied fingerprint value into the **SHA256 Cert Fingerprints** field that appears. You can insert both your debug and production fingerprints for testing. Simply separate them with a comma.
   4. Scroll down and click **Save**.
3. Now, add your Intent Filter to Manifest by going to the Link Domain section on the [Configuration](https://dashboard.branch.io/configuration/general) page.

   1. Copy your domain name.
   2. Choose the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from (and likely the same one you selected in the SDK integration guide.
   3. Inside your `AndroidManifest.xml`, locate where the selected `Activity` is defined.
   4. Within the `Activity` definition, insert the intent filter provided below (making sure that `xxxx` matches the subdomain prefix you've been assigned or selected for yourself). Add this as its own separate intent filter.
   5. If you use a custom domain or subdomain for your Branch Links, you should also add an entry for:

```
<data android:scheme="https" android:host="mycustomdomainorsubdomain" />
```

```
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="xxxx.app.link" />
    <data android:scheme="https" android:host="xxxx-alternate.app.link" />
    <data android:scheme="https" android:host="xxxx.test-app.link" />
    <data android:scheme="https" android:host="xxxx-alternate.test-app.link" />
</intent-filter>
```

::: warning Domain Validation
The system must be able to verify every host specified in a URL intent filters’ data elements against the Digital Asset Links files hosted on the respective web domains. If any verification fails, the app is not verified to be a default handler for any of the URL patterns defined in the app's intent filters. You can use Google's [Statement List Asset Generator](https://developers.google.com/digital-asset-links/tools/generator) to test your existing statement file.
:::

#### 2. Get APK SHA256 Fingerprints

1. Run: `keytool -printcert -jarfile my_app.apk` on your APK file.

## FAQs

<details>
<summary>How do I debug Android App Links?</summary>

1. **Confirm the device browser is NOT the default handler for *xx.app.link* domain**

   1. Android App Links sets the app as the default handler for a domain (i.e., xx.app.link). If a user clicks a link before App Links is enabled, they’ll have the option to open in browser or in app. If the browser is selected with “always”, that domain will never open the app.
   2. **Reset browser defaults**: Settings → Apps → select the browser → Defaults → “Clear Defaults”
2. **If one domain is failing verification, App Links is disabled for every other domain too**

   1. Every [domain & subdomain](https://developer.android.com/training/app-links/verify-site-associations.html#multi-subdomain) in Manifest must host a DAL file at: *https://****[domain]****/.well-known/assetlinks.json*
   2. Even if **autoVerify="true"** is not in all intent filters, [Android will scrape every domain](https://developer.android.com/training/app-links/verify-site-associations#request-verify)
   3. Confirm Branch dashboard & all other DAL files contain the correct [SHA 256 fingerprint](https://developers.google.com/digital-asset-links/v1/getting-started)
   4. Confirm app’s compileSdkVersion in build.gradle is 23+
   5. All link domains must be publicly accessible (not behind firewall/vpn) and accessible by Google's bots
3. **Validate App Links :** Install app > connect device to Android Studio > [*./adb shell dumpsys package d*](https://developer.android.com/training/app-links/verify-site-associations.html#check-link-policies)

*[Image: 1212]*

</details>
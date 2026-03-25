---
title: "Android Basic Integration"
slug: android-basic-integration
---

This page outlines the steps required to integrate the Branch Android SDK.

At the end, you will be ready to do things like send [Branch Events](track-branch-events.md) and use [Branch Deep Links](creating-a-deep-link.md).

Please note that some Branch Android SDK features require a Branch Growth Platform package. Contact our [Sales team](https://www.branch.io/contact-sales/) for more info.

| GitHub | SDK Size | Speed | Min. OS Version |
| --- | --- | --- | --- |
| [Repo](https://github.com/BranchMetrics/android-branch-deep-linking) | ~187kb for all features | Median 80ms to 250ms | API Level 21+ |

#### Older versions

If you'd like to support down to Android API version 9, please pin to version `1.14.5` of the Branch Android SDK.

If you'd like to support Android API version 15, please pin to a `2.x` version of the Branch Android SDK.

The minimum version we support for Branch Android SDK `3.x` is Android version 16.

## 1. Configure Branch

Start by configuring Branch for your application.

## 2. Install Branch

To install Branch, import the Branch Android SDK into your app-level `build.gradle` (Groovy) or `build.gradle.kts` (Kotlin).

::: danger Warning

::: danger Warning
Read all code comments in this section, as some values need to be replaced or updated.

Confirm you are using the latest version of `io.branch.sdk.android:library` by checking the version [here](https://central.sonatype.com/artifact/io.branch.sdk.android/library).
:::

:::

::: code-group

```groovy [Groovy]
apply plugin: 'com.android.application'

                    android {
                    compileSdkVersion 25
                    buildToolsVersion "25.0.2"
                    defaultConfig {
                    applicationId "com.example.android" // REPLACE with your app ID
                    minSdkVersion 16
                    targetSdkVersion 25
                    versionCode 1
                    versionName "1.0"
                    testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
                    }
                    buildTypes {
                    release {
                    minifyEnabled false
                    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
                    }
                    }
                    }

                    dependencies {
                    // Required for all Android apps:
                    implementation 'io.branch.sdk.android:library:5.8.0' // Check for latest version before hard-coding

                    implementation 'store.galaxy.samsung.installreferrer:samsung_galaxystore_install_referrer:4.0.0'

                    // Required if your app is in the Google Play Store (tip: avoid using bundled play services libs):
                    implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
                    // Alternatively, use the following lib for getting the AAID:
                    // implementation 'com.google.android.gms:play-services-ads:17.2.0'
                    }
```

```kotlin [Kotlin]
import java.util.*

                    plugins {
                    id("com.android.application")
                    kotlin("android")
                    }

                    dependencies {
                    implementation(project(":Branch-SDK"))
                    implementation("com.google.android.gms:play-services-ads-identifier:18.0.1")
                    implementation("com.huawei.hms:ads-identifier:3.4.62.300")

                    implementation("com.android.billingclient:billing:6.0.1")
                    implementation("com.huawei.hms:ads-installreferrer:3.4.39.302")
                    implementation("store.galaxy.samsung.installreferrer:samsung_galaxystore_install_referrer:4.0.0")
                    implementation("com.miui.referrer:homereferrer:1.0.0.7")

                    androidTestImplementation("androidx.test.ext:junit:1.1.5")
                    androidTestImplementation("androidx.test:runner:1.5.2")
                    androidTestImplementation("androidx.test:rules:1.5.0")
                    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
                    }

                    android {
                    val ANDROID_BUILD_SDK_VERSION: String by project
                    val ANDROID_BUILD_TARGET_SDK_MINIMUM: String by project
                    val ANDROID_BUILD_TARGET_SDK_VERSION: String by project
                    val VERSION_NAME: String by project
                    val VERSION_CODE: String by project

                    compileSdk = ANDROID_BUILD_SDK_VERSION.toInt()
                    defaultConfig {
                    applicationId = "io.branch.branchandroidtestbed" // REPLACE with your app ID
                    minSdk = ANDROID_BUILD_TARGET_SDK_MINIMUM.toInt()
                    targetSdk = ANDROID_BUILD_TARGET_SDK_VERSION.toInt()
                    versionName = VERSION_NAME
                    versionCode = VERSION_CODE.toInt()

                    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
                    }

                    val propFile = file("signing.properties")
                    val props = if (propFile.exists()) {
                    val props = Properties()
                    props.load(propFile.inputStream())
                    props
                    } else {
                    null
                    }

                    if (props != null) {
                    val pStoreFile = props["STORE_FILE"] as? String
                    val pStorePassword = props["STORE_PASSWORD"] as? String
                    val pKeyAlias = props["KEY_ALIAS"] as? String
                    val pKeyPassword = props["KEY_PASSWORD"] as? String
                    if (!pStoreFile.isNullOrBlank()
                    && !pStorePassword.isNullOrBlank()
                    && !pKeyAlias.isNullOrBlank()
                    && !pKeyPassword.isNullOrBlank()
                    ) {
                    signingConfigs {
                    create("release") {
                    storeFile = file(pStoreFile)
                    storePassword = pStorePassword
                    keyAlias = pKeyAlias
                    keyPassword = pKeyPassword
                    }
                    }
                    }
                    }

                    buildTypes {
                    release {
                    signingConfig = signingConfigs.findByName("release")
                    }
                    }
                    namespace = "io.branch.branchandroidtestbed" // REPLACE with your namespace
                    }
```

:::

## 3. Add dependencies

At this stage, you can add certain dependencies to your Android app that will enable additional Branch Android SDK functionality.

**Note**: Some of these dependencies are already bundled into the Branch Android SDK.

<details>
<summary>[Android Advertising ID (AAID)](https://developers.google.com/android/reference/com/google/android/gms/ads/identifier/AdvertisingIdClient)</summary>

In order for Branch to properly access the GAID value of a device, apps targeting Android 13+ will need to use the latest version  
of the `play-services-ads-identifier` dependency or **explicitly** declare within the app's manifest file.  
  
**Signature:** `implementation "com.google.android.gms:play-services-ads-identifier:18.0.1"`

**Library repository:** `maven { url 'https://maven.google.com/' }`

</details>

<details>
<summary>[Play Install Referrer Library](https://developer.android.com/google/play/installreferrer/library)</summary>

As of version 4.3.0, Google's Play Install Referrer Library is bundled into Branch Android SDK.  
If you are using a version below 4.3.0, you must update your app's dependencies to include the Play Install Referrer Library.

**Signature:** `implementation "com.android.installreferrer:installreferrer:2.2"`

**Library repository:** `maven { url 'https://maven.google.com/' }`

</details>

<details>
<summary>[Huawei Mobile Services & Ads Kit](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/identifier-service-use-cases-0000001050064978)</summary>

The Branch SDK supports Huawei devices without Google Mobile Services. This dependency will add [Install Referrer support](branch-methodology-overview.md#install-referrers) on the Huawei AppGallery store and attribution using OAID.  
**Ensure** [**proguard rules**](android-basic-integration.md#7-configure-proguard) **are set.**

**Signature:** `implementation "com.huawei.hms:ads-identifier:3.4.39.302"`

**Library repository:** `maven { url 'http://developer.huawei.com/repo/' }`

</details>

<details>
<summary>Xiaomi GetApps Store Referrer</summary>

This dependency will add [Install Referrer support](branch-methodology-overview.md#install-referrers) on the Xiaomi GetApps store.  
Please reach out to your Xiaomi representative for additional details.

**Signature:** `implementation "com.miui.referrer:homereferrer:1.0.0.6"`

**Library repository:** `maven { url 'https://repos.xiaomi.com/maven/' }`

</details>

<details>
<summary>Samsung Galaxy Store Referrer</summary>

This dependency will add [Install Referrer support](branch-methodology-overview.md#install-referrers) on the Samsung Galaxy store  
Please reach out to your Samsung representative for additional details.

**Signature:** `implementation "store.galaxy.samsung.installreferrer:samsung_galaxystore_install_referrer:4.0.0"`

**Library repository:** Please reach out to your Samsung representative for the maven repo to add to your project level `build.gradle`

</details>

## 4. Configure app

To configure your app to use the Branch Android SDK, you will need to update your `AndroidManifest.xml` file.

To populate the file with the correct values, you will need to gather your:

- App package name
- Android URI scheme
- The `app.link` domain associated with your app
- The `-alternate.app.link` domain associated with your app
- Branch Live Key
- Branch Test Key

#### Finding these values in New Branch

- **Android URI Scheme** and **app.link domains**: Go to **Configuration** > **Link Controls**. The `app.link` domains are found in the **Link Appearance** tab under **Link Domains**. The Android URI Scheme is found in the **Link Routing Rules** tab under **Mobile Routing** > **Android**.
- **Branch Live Key and Test Key**: Navigate to **Configuration** > **Security & Access** > **Credentials** tab. Your Branch key is listed under "Your Branch key".

#### Finding these values in Legacy Branch

You can find these values for your app in the Branch [App Settings](https://dashboard.branch.io/account-settings/app) and [Link Settings](https://dashboard.branch.io/link-settings).

Use the sample code below for your `AndroidManifest.xml` file.

Read all code comments in this section, as some values need to be replaced or updated.

Confirm you are using the latest version of `io.branch.sdk.android:library` by checking the version [here](https://central.sonatype.com/artifact/io.branch.sdk.android/library).

```
<?xml version="1.0" encoding="utf-8"?>
        <manifest
        xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.example.android">
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>

        <!-- REPLACE `android:name` with your app's package name -->
        <application
        android:allowBackup="true"
        android:name="com.example.android.CustomApplicationClass"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <!-- Launcher Activity to handle incoming Branch intents -->
        <activity
        android:name=".LauncherActivity"
        android:launchMode="singleTask"
        android:label="@string/app_name"
        android:theme="@style/AppTheme.NoActionBar"
        android:exported="true">

        <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>

        <!-- Branch URI Scheme -->
        <intent-filter>
        <!-- If utilizing $deeplink_path please explicitly declare your hosts, or utilize a wildcard(*) -->
        <!-- REPLACE `android:scheme` with your Android URI scheme -->
        <data android:scheme="yourapp" android:host="open" />
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        </intent-filter>

        <!-- Branch App Links - Live App -->
        <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- REPLACE `android:host` with your `app.link` domain -->
        <data android:scheme="https" android:host="example.app.link" />
        <!-- REPLACE `android:host` with your `-alternate` domain (required for proper functioning of App Links and Deepviews) -->
        <data android:scheme="https" android:host="example-alternate.app.link" />
        </intent-filter>

        <!-- Branch App Links - Test App -->
        <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="example.test-app.link" />
        <!-- REPLACE `android:host` with your `-alternate` domain (required for proper functioning of App Links and Deepviews) -->
        <data android:scheme="https" android:host="example-alternate.test-app.link" />
        </intent-filter>
        </activity>

        <!-- Branch init -->
        <!-- REPLACE `BranchKey` with the value from your Branch Dashboard -->
        <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_XXX" />
        <!-- REPLACE `BranchKey.test` with the value from your Branch Dashboard -->
        <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_XXX" />
        <!-- Set to `true` to use `BranchKey.test` -->
        <meta-data android:name="io.branch.sdk.TestMode" android:value="false" />

        </application>
        <queries>
        <intent>
        <action android:name="android.intent.action.SEND" />
        <data android:mimeType="text/plain" />
        </intent>
        </queries>
        </manifest>
```

::: warning Caution
The Single Task mode instantiates the Main/Splash Activity only if it does not exist in the Activity Stack.

If the Activity exists in the background, every subsequent intent to the Activity just brings it to the foreground. You can read more about Single Task mode [here](https://developer.android.com/guide/components/activities/tasks-and-back-stack.html#TaskLaunchModes).

If your app has **multiple activities** triggered by multiple intent filters with the same scheme, your app may run into a race condition when clicking on links that open the app (ex. Branch Links and custom deep links). To prevent this, make sure to implement the Branch Android SDK in the `LauncherActivity`.
:::

## 5. Load Branch

To load Branch, import `io.branch.referral.Branch` and use the `getAutoInstance()` method in your `CustomApplicationClass`:

::: code-group

```java [Java]
package com.example.android;

                    import android.app.Application;
                    import io.branch.referral.Branch;

                    public class CustomApplicationClass extends Application {
                    @Override
                    public void onCreate() {
                    super.onCreate();

                    // Branch logging for debugging
                    Branch.enableLogging();

                    // Branch object initialization
                    Branch.getAutoInstance(this);
                    }
                    }
```

```kotlin [Kotlin]
package com.example.android

                    import android.app.Application
                    import io.branch.referral.Branch

                    class CustomApplicationClass : Application() {
                    override fun onCreate() {
                    super.onCreate()

                    // Branch logging for debugging
                    Branch.enableLogging()

                    // Branch object initialization
                    Branch.getAutoInstance(this)
                    }
                    }
```

:::

To learn more about the `getAutoInstance()` and `getInstance()` methods, visit our Android SDK Full Reference [guide](android-full-reference.md).

## 6. Initialize Branch

To initialize Branch, add the following code to your `LauncherActivity`:

::: code-group

```java [Java]
package com.example.android;

                    import android.content.Intent;
                    import android.os.Bundle;
                    import android.support.design.widget.FloatingActionButton;
                    import android.support.design.widget.Snackbar;
                    import android.support.v7.app.AppCompatActivity;
                    import android.support.v7.widget.Toolbar;
                    import android.util.Log;
                    import android.view.View;
                    import android.view.Menu;
                    import android.view.MenuItem;

                    import org.json.JSONObject;

                    import io.branch.indexing.BranchUniversalObject;
                    import io.branch.referral.Branch;
                    import io.branch.referral.BranchError;
                    import io.branch.referral.util.LinkProperties;

                    public class LauncherActivity extends AppCompatActivity {

                    @Override
                    protected void onCreate(Bundle savedInstanceState) {
                    super.onCreate(savedInstanceState);
                    setContentView(R.layout.activity_launcher);
                    }

                    @Override
                    protected void onStart() {
                    super.onStart();
                    Branch.sessionBuilder(this).withCallback(new Branch.BranchUniversalReferralInitListener() {
                    @Override
                    public void onInitFinished(BranchUniversalObject branchUniversalObject, LinkProperties linkProperties, BranchError error) {
                    if (error != null) {
                    Log.e("BranchSDK_Tester", "branch init failed. Caused by -" + error.getMessage());
                    } else {
                    Log.i("BranchSDK_Tester", "branch init complete!");
                    if (branchUniversalObject != null) {
                    Log.i("BranchSDK_Tester", "title " + branchUniversalObject.getTitle());
                    Log.i("BranchSDK_Tester", "CanonicalIdentifier " + branchUniversalObject.getCanonicalIdentifier());
                    Log.i("BranchSDK_Tester", "metadata " + branchUniversalObject.getContentMetadata().convertToJson());
                    }

                    if (linkProperties != null) {
                    Log.i("BranchSDK_Tester", "Channel " + linkProperties.getChannel());
                    Log.i("BranchSDK_Tester", "control params " + linkProperties.getControlParams());
                    }
                    }
                    }
                    }).withData(this.getIntent().getData()).init();
                    }

                    @Override
                    public void onNewIntent(Intent intent) {
                    super.onNewIntent(intent);
                    this.setIntent(intent);
                    if (intent != null && intent.hasExtra("branch_force_new_session") && intent.getBooleanExtra("branch_force_new_session",false)) {
                    Branch.sessionBuilder(this).withCallback(new BranchReferralInitListener() {
                    @Override
                    public void onInitFinished(JSONObject referringParams, BranchError error) {
                    if (error != null) {
                    Log.e("BranchSDK_Tester", error.getMessage());
                    } else if (referringParams != null) {
                    Log.i("BranchSDK_Tester", referringParams.toString());
                    }
                    }
                    }).reInit();
                    }
                    }
                    }
```

```kotlin [Kotlin]
package com.example.android

                    import io.branch.indexing.BranchUniversalObject
                    import io.branch.referral.Branch
                    import io.branch.referral.BranchError
                    import io.branch.referral.util.LinkProperties

                    import android.util.Log;
                    import org.json.JSONObject;

                    // Always initialize Branch in `onStart()` - see warnings below for details
                    override fun onStart() {
                    super.onStart()
                    Branch.sessionBuilder(this).withCallback { branchUniversalObject, linkProperties, error ->
                    if (error != null) {
                    Log.e("BranchSDK_Tester", "branch init failed. Caused by -" + error.message)
                    } else {
                    Log.i("BranchSDK_Tester", "branch init complete!")
                    if (branchUniversalObject != null) {
                    Log.i("BranchSDK_Tester", "title " + branchUniversalObject.title)
                    Log.i("BranchSDK_Tester", "CanonicalIdentifier " + branchUniversalObject.canonicalIdentifier)
                    Log.i("BranchSDK_Tester", "metadata " + branchUniversalObject.contentMetadata.convertToJson())
                    }
                    if (linkProperties != null) {
                    Log.i("BranchSDK_Tester", "Channel " + linkProperties.channel)
                    Log.i("BranchSDK_Tester", "control params " + linkProperties.controlParams)
                    }
                    }
                    }.withData(this.intent.data).init()
                    }

                    override fun onNewIntent(intent: Intent?) {
                    super.onNewIntent(intent)
                    this.setIntent(intent);
                    if (intent != null && intent.hasExtra("branch_force_new_session") && intent.getBooleanExtra("branch_force_new_session",false)) {
                    Branch.sessionBuilder(this).withCallback { referringParams, error ->
                    if (error != null) {
                    Log.e("BranchSDK_Tester", error.message)
                    } else if (referringParams != null) {
                    Log.i("BranchSDK_Tester", referringParams.toString())
                    }
                    }.reInit()
                    }
                    }
```

:::

::: warning LauncherActivity vs Other Activities
Branch recommends initializing the session inside the LauncherActivity. This is the Activity that contains the intent filter `android.intent.category.LAUNCHER` in your `AndroidManifest.xml` file.

However, if your app requires it, session initialization can happen in a different Activity too, as long as that Activity is the one configured to open Branch Links using the intent filters in `AndroidManifest.xml`.

Note that in this case, if the app is opened organically, Branch will auto-initialize behind the scenes and calling `sessionBuilder()…init()` will return an error. This is because the SDK will already be initialized. The main exceptions are [push notifications](android-advanced-features.md#push-notifications) and [intra-app linking](android-advanced-features.md#handle-links-in-your-own-app).
:::

::: warning
**Always Initialize Branch in** `onStart()`

Initializing Branch in other Android lifecycle methods, like `onCreate()` or `onResume()`, will lead to unintended behavior. The `onStart()` method is what makes the Activity visible to the user, as the app prepares for the Activity to enter the foreground and become interactive.

To learn more, visit:

- [Branch FAQ](why-do-we-recommend-initializing-the-sdk-in-onstart-vs-oncreate-in-android.md)
- [Android Developer Docs](https://developer.android.com/guide/components/activities/activity-lifecycle.html)

If your app requires a different session initialization setup, please see the [Delay Branch Initialization](android-advanced-features.md#delay-branch-initialization) section of our Android Advanced Features guide.
:::

## 7. Configure ProGuard

To collect the Google Advertising ID, you must ensure that ProGuard doesn't remove the necessary Google Ads class.

The surest way to do this is add it to your ProGuard rules. If your application is enabled with ProGuard, add the following instruction to your `proguard.cfg` or `proguard-rules.pro` file:

```
-keep class com.google.android.gms.** { *; }
```

If you are adding support for Huawei devices without Google Mobile Services, please make sure to add the following to your ProGuard rules:

```
-keep class com.huawei.hms.ads.** { *; }
        -keep interface com.huawei.hms.ads.** { *; }
```

## 8. Validate integration

It's important to validate your Branch Android SDK integration after you've set it up, to make sure that data flows properly to Branch and you're able to start configuring Branch Deep Links and sending Branch Events.

Validation methods:

1. The [Integration Status tab](android-testing.md#integration-status-tab) in [Branch](https://dashboard.branch.io/configuration/integration).
2. The Branch Android SDK's [Integration Validation method](android-testing.md#integration-validator-method).
3. The Branch Android SDK's [Enable Logging method](android-testing.md#enable-logging).
4. Branch's [Link Debugger tool](android-testing.md#link-debugger), which helps you confirm Branch Deep Link configuration, data, and routing.

For additional testing scenarios and tools, visit the [Android Testing page](android-testing.md).

If you're running into issues with your Branch Android SDK integration, start by looking at the [Android Troubleshooting page](android-troubleshooting.md).
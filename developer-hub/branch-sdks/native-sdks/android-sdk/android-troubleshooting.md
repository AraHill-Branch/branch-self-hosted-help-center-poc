---
title: "Android Troubleshooting"
slug: android-troubleshooting
---

## Overview

This guide covers some common challenges we see when trying to integrate the Branch Android SDK.

To integrate the Branch Android SDK, follow the steps in our Android SDK Basic Integration [guide](android-basic-integration.md).

## Scenarios

### Using Older Android API Versions

If you need to use an Android API version **older** than version 15:

1. Use Branch Android SDK version 1.14.5
2. Add the `onStart()` and `onStop()` methods to your app:

::: code-group

```java [Java]
@Override
protected void onStart() {
    super.onStart();
    Branch.getInstance(getApplicationContext()).initSession();
}

@Override
protected void onStop() {
    super.onStop();
    branch.closeSession();
}
```

```kotlin [Kotlin]
override fun onStart() {
    super.onStart()
    Branch.getInstance().initSession()
}

override fun onStop() {
    super.onStop()
    Branch.getInstance().closeSession()
}
```

:::

### App Has No Application Class

If your app does not have an application class, add the following to your `AndroidManifest.xml` file:

```
<application android:name="io.branch.referral.BranchApp">
```

### Overrunning Dex Limit

Adding additional dependencies may overrun the dex limit.

This can lead to a `NoClassDefFoundError` or a `ClassNotFoundException`.

To fix this, add the following to your `build.gradle`:

::: code-group

```java [Java]
defaultConfig {
    multiDexEnabled true
}
```

```kotlin [Kotlin]
defaultConfig {
    multiDexEnabled true
}
```

:::

Then, add the following to your `Application` class and make sure it extends `MultiDexApplication`:

::: code-group

```java [Java]
@Override
protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
}
```

```kotlin [Kotlin]
override fun attachBaseContext(base: Context?) {
    super.attachBaseContext(base)
    MultiDex.install(this)
}
```

:::

### Proguard

#### InvalidClassException, ClassLoadingError, or VerificationError

`InvalidClassException`, `ClassLoadingError`, and `VerificationError` are often caused by a Proguard bug.

To fix this, try using the latest Proguard version.

You can also disable Proguard optimization by using the `-dontoptimize` flag.

#### Answers Shim Module

Warnings or errors may occur if you exclude the `answers-shim` module.

Try adding `-dontwarn com.crashlytics.android.answers.shim.**` to your Proguard file.

#### Play Services Ads Module

The Branch Android SDK has an optional dependency on Play Services Ads for GAID matching.

Using Proguard without using this library can create issues in fetching the GAID, which happens when initializing a Branch session or Branch Events.

Try adding the following to your Proguard file to solve this issue:

```
-keep class com.google.android.gms.ads.identifier.AdvertisingIdClient {
com.google.android.gms.ads.identifier.AdvertisingIdClient$Info getAdvertisingIdInfo(android.content.Context);
}

-keep class com.google.android.gms.ads.identifier.AdvertisingIdClient$Info {
java.lang.String getId();
boolean isLimitAdTrackingEnabled();
}
```

### Link Open Error

An "Unable to open this link" error happens whenever URI Scheme redirection fails.

Make sure you do not have `$deeplink_path` set, or you have a `$deeplink_path` which your `AndroidManifest.xml` can accept

### Stuck State

You may notice your Branch initialization get stuck in the following state: `initState_ == SESSION_STATE.INITIALISING`

This is often caused by Branch not having the right application context from your activity.

To avoid this, make sure you pass in your application context:

::: code-group

```java [Java]
protected static final String branchKey = "branch_key_here";

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();

		// Branch object initialization
		Branch.getAutoInstance(this.getApplicationContext, branchKey);
	}
}
```

```kotlin [Kotlin]
const val branchKey: String = "branch_key_here"
class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()
    
		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext, branchKey)
	}
}
```

:::

### Automatic Initialization

One possible error you may run into is `BranchError.ERR_BRANCH_ALREADY_INITIALIZED`.

#### Context

The Branch Android SDK will automatically initialize when the app comes to the foreground, and the first activity to show enters the `RESUMED` lifecycle state. This is done as a failsafe not to miss tracking sessions.

Therefore, if you delay Branch initialization, never attempt to initialize Branch, or have the app open to activities other than the launcher activity, then the Branch Android SDK will automatically initialize.

At this point, if the app's code tries to initialize Branch (again), then the SDK will throw an error. This prevents initializing over and over again, or other potentially unexpected states.

#### Error Handling

If you want to delay initialization without having the Branch Android SDK self-initialize, you can do so using the approach outlined in our Advanced Features [guide](android-advanced-features.md#delay-branch-initialization).

Alternatively, you can ignore the error and add the following code snippet to your callback:

::: code-group

```java [Java]
if(error.getErrorCode() == BranchError.ERR_BRANCH_ALREADY_INITIALIZED) {
   branchReferringParams_ = Branch.getLatestReferringParams();
}
```

```kotlin [Kotlin]
if (error.errorCode == BranchError.ERR_BRANCH_ALREADY_INITIALIZED) {
    branchReferringParams_ = Branch.getLatestReferringParams()
}
```

:::
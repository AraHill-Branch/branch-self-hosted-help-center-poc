---
title: "Android Testing"
slug: android-testing
---

## Overview

The test scenarios, tools, and resources in this guide help make sure you've integrated the Branch Android SDK correctly.

To integrate the Branch Android SDK, follow the steps in our Android SDK Basic Integration [guide](android-basic-integration.md).

## Test scenarios

### Test deep linking

To test whether you can successfully use Branch deep links:

1. Create a deep link using the [Branch Dashboard](https://dashboard.branch.io/quick-links/).
2. Make sure your [test device](add-test-devices.md) is ready to use.
3. Remove the app from your device and reset your advertising ID.
4. Compile and re-install your app on the device.
5. Paste the deep link in a different app on the device - somewhere that you'll be able to click the link from.
6. Click the deep link. Your app should open and route you to the proper screen.

Please note that you must have our [Engagement product](packaging.md#engagement-essentials-tier) to have access to Branch deep linking.

### Test deep link routing

To test deep link routing for your app:

1. Append `?bnc_validate=true` to a Branch deep link.
2. Click on this deep link from your mobile device (**not** the Simulator).

An example link would look like: `"https://.app.link ndj6nfzrbk?bnc_validate="">.app.link>`

### Test for Install events

The [Liveview](https://help.branch.io/using-branch/docs/liveview) and [Summary](https://help.branch.io/using-branch/docs/branch-summary-page) tabs are both reliable methods to check Branch for Install events. Seeing an Install in either of these views means:

- The app SDK recognized a First Open event.
- Branch’s [Event API](https://help.branch.io/apidocs/events-api) was called by the Branch SDK.
- Branch servers received the API call and recorded the conversion.

::: info Note
The Liveview and Summary tabs display data based on when Branch receives SDK API calls. Due to network conditions and other factors, some data may arrive with delays.
:::

Customers using Branch Ads can test functionality end to end by:

- [Adding a test device](https://help.branch.io/using-branch/docs/add-test-devices) to your Branch account.
- [Testing](https://help.branch.io/using-branch/docs/testing-universal-ads-campaign-setup) your Branch Ads campaign setup.

#### Install events on Android

To test for Install events on Android:

1. Configure a test version of your Android app using our [Android Basic Integration](android-basic-integration.md) guide.

   1. You will need your Branch app’s Test Key and corresponding Test Domain. In Branch, set the toggle in the left-side navigation to **Test**, then

      1. Visit **Accounts → Settings → Profile →** [**Branch Key and Secret**](https://dashboard.branch.io/account-settings/profile) and find the key that contains `key_test_`.
      2. Visit **Configure → App Settings → General →** [**Link Domain**](https://dashboard.branch.io/configuration/general)and find the domain that contains `test`.
2. Set up [Branch.enableLogging()](https://help.branch.io/developers-hub/docs/android-testing#enable-logging) within your app’s code.
3. Navigate to **Analysis → Overview →** [**Liveview Events**](https://dashboard.branch.io/overview/events), then install the app onto your test device.
4. Check the `enableLogging()` logs for `is_first_session = true` and a call to `/v1/install`.

## Testing tools

### Integration Status tab

For a quick approach to checking your Branch Android SDK integration status and progress, you can use the [Integration Status](https://dashboard.branch.io/configuration/integration) tab of the Branch Dashboard.

![](/img/5aae3c5-Screenshot_2024-04-04_at_12.43.06_PM.png)

### Integration Validator method

Another simple way to test the status of your Branch Android SDK integration is using the built-in `IntegrationValidator.validate()` method.

To use this method, add the following code to your MainActivity's `onStart()`:

::: code-group

```java [Java]
IntegrationValidator.validate(MainActivity.this);
```

```kotlin [Kotlin]
IntegrationValidator.validate(this)
```

:::

This method will check to ensure that the Branch keys, package name, URI schemes, and link domain settings from the Branch Dashboard match those in the build.

Check your ADB Logcat to make sure all the SDK integration tests pass.

Make sure to comment out or remove `IntegrationValidator.validate()` in your production build.

For more about the `IntegrationValidator.validate()` method, visit our blog:

- [How To Use Branch’s New Integration Validator Functionality on Android](https://www.branch.io/resources/blog/how-to-use-branchs-new-integration-validator-functionality-on-android/)
- [How To Validate Your Branch Mobile SDK Integration](https://www.branch.io/resources/blog/how-to-validate-your-branch-mobile-sdk-integration/)

### Branch test key

For testing purposes, you can use your Branch test key instead of your live key.

To use your test key:

1. [Add your test key](android-basic-integration.md#4-configure-app) to your `AndroidManifest.xml` file.
2. Use the sample code below to update your app, noting the `enableTestMode()` method:

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
		Branch.enableTestMode();

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
		Branch.enableTestMode()

		// Branch object initialization
		Branch.getAutoInstance(this)
	}
}
```

:::

Make sure the test key of your app matches the test key in the deep link, and that you remove the `enableTestMode()` method before releasing to production.

### Enable logging

Enable logging in your app to catch errors and other useful information coming from Branch. Make sure to only do this for testing, and that you **remove the logging code before releasing to production**.

Use the sample code below to update your app with any of the `enableLogging()` methods:

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

    // Adjust the desired log level (Android SDK versions v5.12.0+ only)
    Branch.enableLogging(BranchLogger.BranchLogLevel.VERBOSE);
		
    // Create a custom callback to forward log messages to
    IBranchLoggingCallbacks loggingCallbacks = new IBranchLoggingCallbacks() {
      @Override
      public void onBranchLog(String logMessage, String severityConstantName) {
        // Handle the log messages  
        Log.v( "CustomTag", logMessage);
      }
    };
    Branch.enableLogging(loggingCallbacks);

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
	
    // Adjust the desired log level (Android SDK versions v5.12.0+ only)
    Branch.enableLogging(BranchLogger.BranchLogLevel.VERBOSE)

    // Create a custom callback to forward log messages to
    val loggingCallbacks = IBranchLoggingCallbacks { logMessage, severityConstantName -> 
          // Handle the log messages  
        Log.v("CustomTag", logMessage)
    }
    Branch.enableLogging(loggingCallbacks)
  
		// Branch object initialization
		Branch.getAutoInstance(this)
	}
}
```

:::

### Link debugger

You can make sure your Branch Link is properly configured by using Branch's Link Debugger tool. It can help you determine whether the link was properly configured and passed the correct data when it was created.

To use Branch's Link Debugger:

1. Sign in to your [Branch Dashboard](https://branch.dashboard.branch.io/).
2. Make sure you are in the proper environment for the link you want to debug (live or test).
3. Copy the Branch Link, and append `?debug=1` to the end of it.

   1. For example, the Branch Link `https://branchster.app.link/3vqEJflHrGb` would become `https://branchster.app.link/3vqEJflHrGb?debug=1`
4. Paste this link, including the `?debug=1` flag, into your browser. This will open the Link Debugger view:  
   ![](/img/a6a48ef-image.png)

This tool includes the Link Routing Debugger, which allows you to view the expected behavior for each operating system and click location.

To use the Link Routing Debugger:

1. Select an operating system and location using the dropdown menus.  
   ![](/img/05e0cfe-Screenshot_2024-04-10_at_3.41.12_PM.png)
2. View the redirect results table for the link.  
   ![](/img/69b90e7-Screenshot_2024-04-10_at_3.44.16_PM.png)

Based on the operating system and click location you have selected, you’ll see the click redirect outcome for when a user does and does not have the app installed.

## Additional resources

### Sample applications

- [Branchsters](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android)
- [Testbed](https://github.com/BranchMetrics/android-branch-deep-linking/tree/master/Branch-SDK-TestBed)
- Additional [Android SDK sample applications](https://github.com/BranchMetrics/branch-android-sdk-samples)

### Troubleshooting guide

If you're experiencing unexpected behavior with the Branch Android SDK, start by taking a look at our [Troubleshooting guide](android-troubleshooting.md).

## FAQ

<details>
<summary>What are some reliable methods to confirm Installs in Branch?</summary>

To confirm Installs in Branch, start with the [Liveview](https://help.branch.io/using-branch/docs/liveview) and [Summary](https://help.branch.io/using-branch/docs/branch-summary-page) tabs. Please note that data may be delayed.

</details>
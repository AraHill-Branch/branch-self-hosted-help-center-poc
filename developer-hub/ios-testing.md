---
title: "iOS Testing"
slug: ios-testing
---

## Overview

The test scenarios, tools, and resources in this guide help you make sure that you've integrated the Branch iOS SDK correctly.

To integrate the Branch iOS SDK, follow the steps in our iOS SDK Basic Integration [guide](ios-basic-integration.md).

## Test scenarios

### Test AASA file download

To confirm that the AASA file has successfully downloaded:

1. Connect a test device to your Mac.
2. Uninstall your app from the test device.
3. View the device's console output in the Mac console.
4. Install your app and let it launch.
5. Filter the console output by "swcd".

You should see content that looks similar to this if the file downloaded successfully:

*[Image: 1436]*

If the AASA file did not download, then you must uninstall the app, restart the device, and then reinstall the app.

### Test deep linking

To test whether you can successfully use Branch Deep Links:

1. Create a deep link using the [Branch Dashboard](https://dashboard.branch.io/quick-links/).
2. Make sure your [test device](add-test-devices.md) is ready to use.
3. Delete your app from the device you are testing with.
4. Compile and re-install your app on the device.
5. Paste the deep link in a note in the Apple Notes app.
6. Long-press on the deep link (not 3D touch).
7. Click **Open**, which should cause your app to open and route to the proper content.

Please note that you must have our [Engagement product](packaging.md#engagement-essentials-tier) to have access to Branch Deep Linking.

### Test deferred deep linking

Deferred deep linking means deep linking into an app that is not yet installed.

Once the app is installed, the context from the click is preserved and the user's first app-open event will include deep link data from the original Branch Deep Link.

To test deferred deep linking:

1. Enable [NativeLink™ Deferred Deep Linking](ios-advanced-features.md#nativelink-deferred-deep-linking).
2. Delete your app from the device you are testing with (must be iOS 15+).
3. Compile and re-install your app on the device.
4. Paste a Branch Deep Link that contains `ios_nativelink=true` in a note in the Apple Notes app.
5. Long-press on the deep link (not 3D touch) and **have it route through Safari**.
6. If you enabled NativeLink™ Deferred Deep Linking correctly, then you should get routed to a Branch [Deepview](deepviews.md) prompting you to download the app. Click the call-to-action and ensure that the link is copied to the iOS clipboard.
7. Manually launch the app from Xcode. You should be routed to the correct content within your app if you configured deep link routing properly (using URL, URI Schema, or key/value pairs).

Expected behavior:

1. Upon clicking the link, the web browser opens and the user sees the NativeLink™ [experience](nativelink-deferred-deep-linking.md#how-does-it-work).
2. When the app opens, the user sees a notification indicating that the app has used the device's clipboard.
3. The API call to `api2.branch.io/v1/open` or `v1/install` should include a new parameter called `local_url`.

Please note that you must have our [Engagement product](packaging.md#engagement-essentials-tier) to have access to Branch Deferred Deep Linking.

### Test deep link routing

To test deep link routing for your app:

1. Append `?bnc_validate=true` to a Branch Deep Link.
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

#### Install events on iOS

To test for Install events on iOS:

1. Configure a test version of your iOS app using our [iOS Basic Integration](https://help.branch.io/developers-hub/docs/ios-basic-integration) guide.

   1. You will need your Branch app’s Test Key and corresponding Test Domain. In Branch, set the toggle in the left-side navigation to **Test**, then

      1. Visit **Accounts → Settings → Profile →** [**Branch Key and Secret**](https://dashboard.branch.io/account-settings/profile) and find the key that contains `key_test_`.
      2. Visit **Configure → App Settings → General →** [**Link Domain**](https://dashboard.branch.io/configuration/general)and find the domain that contains `test`.
2. Set up [Branch.enableLogging()](https://help.branch.io/developers-hub/docs/ios-testing#enable-logging) within your app’s code.
3. Navigate to **Analysis → Overview →** [**Liveview Events**](https://dashboard.branch.io/overview/events), then install the app onto your test device.
4. Check the `enableLogging()` logs for `is_first_session = true` and a call to `/v1/install`.

#### Install events and TestFlight

Install events are visible when installing from TestFlight because the Branch SDK records Open events and identifies First Open events using the `is_first_session=true` field in the initialization data.

#### Install events and Apple Ads

Please note that Apple Ads will always return [test data](https://help.branch.io/using-branch/docs/enable-apple-search-ads#advanced--troubleshooting) when testing using TestFlight, a developer app, or debugging. This appears as `1234567890` in the campaign ID. This will make every testing Install event seem to be attributed to Apple Ads.

As a workaround, remove `AdServices` from the test build of your app.

For more testing information, [see this document](https://help.branch.io/faq/docs/test-the-branch-ios-android-web-sdk).

## Testing tools

### AASA file config validator

To determine if your domain's AASA file is properly configure for Universal Links, use Branch's AASA Validator [tool](https://branch.io/resources/aasa-validator/).

### App Settings tab

For a quick approach to checking your Branch iOS SDK integration status and progress, you can use the [App Settings](https://branch.dashboard.branch.io/integration) tab of the Branch Dashboard.

### Integration validator method

Another simple way to test the status of your Branch iOS SDK integration is using the built-in `validateSDKIntegration()` method.

To use this method, add the following code to your AppDelegate file:

::: code-group

```swift [Swift]
Branch.getInstance().validateSDKIntegration()
```

```objectivec [Objective-C]
[[Branch getInstance] validateSDKIntegration];
```

:::

This method will check to ensure that the Branch keys, package name, URI schemes, Universal Links, and link domain settings from the Branch Dashboard match those in the build.

Check your Xcode logs to make sure all the SDK integration tests pass.

Make sure to comment out or remove `validateSDKIntegration()` in your production build.

For more about the `validateSDKIntegration()` method, visit our [blog](https://www.branch.io/resources/blog/how-to-validate-your-branch-mobile-sdk-integration/#:~:text=Step%202%3A%20Utilize%20Branch%E2%80%99s%20Integration%20Validator).

### Branch test key

For testing purposes, you can use your Branch test key instead of your live key.

To use your test key:

1. Make sure the value of `branch_key` in `Info.plist` is a dictionary and includes your test key. For example:

```
<key>branch_key</key>
<dict>
	<key>live</key>
	<string>key_live_XXXXX</string>
	<key>test</key>
	<string>key_test_XXXXX</string>
</dict>
```

2. Add the following line of code before the `initSession()` [method](ios-basic-integration.md#6-initialize-branch):

::: code-group

```swift [Swift]
Branch.setUseTestBranchKey(true)
```

```objectivec [Objective-C]
[Branch setUseTestBranchKey:YES];
```

:::

Make sure the test key of your app matches the test key in the deep link, and that you remove the `setUseTestBranchKey()` method before releasing to production.

### Enable logging

Enable logging in your app to catch errors and other useful information coming from Branch. Make sure to only do this for testing, and that you **remove the logging code before releasing to production**.

##### Basic logging

To enable basic logging:

1. Make sure that `OS_ACTIVITY_MODE` is [not disabled](https://stackoverflow.com/questions/37886600/ios-10-doesnt-print-nslogs/39503602#39503602).
2. Swap out your Branch live key for your Branch test key.
3. Add the following line of code before the `initSession()` [method](ios-basic-integration.md#6-initialize-branch):

::: code-group

```swift [Swift]
// Enable basic logging
Branch.enableLogging()
```

```objectivec [Objective-C]
// Enable basic logging
[Branch enableLogging];
```

:::

4. Don't forget to remove the logging code and switch back to your Branch live key before releasing to production.

##### Advanced logging

For more advanced logging needs, you can forward logs to a custom callback instead of the default `os_log`:

::: code-group

```swift [Swift]
// Enable basic logging
Branch.enableLogging()

// Choose the minimum log level to be logged
Branch.enableLogging(at: .error)

// Forward logs to a custom callback instead of the default os_log
Branch.enableLogging(at: .warning) { message, level, error in
    if error != nil {
        print("[Branch Error][\(level)] \(message) - \(error)")
    } else {
        print("[Branch Log][\(level)] \(message)")
    }
}
```

```objectivec [Objective-C]
// Enable basic logging
[Branch enableLogging];

// Choose the minimum log level to be logged and forward logs to a custom callback instead of the default os_log
[Branch enableLoggingAtLevel:BranchLogLevelVerbose withCallback:^(NSString * _Nonnull message, BranchLogLevel logLevel, NSError * _Nullable error) {
    // Handle the log message and error here. For example, printing to the console:
    if (error) {
        NSLog(@"[BranchLog] Level: %lu, Message: %@, Error: %@", (unsigned long)logLevel, message, error.localizedDescription);
    } else {
        NSLog(@"[BranchLog] Level: %lu, Message: %@", (unsigned long)logLevel, message);
    }
}];
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
   

This tool includes the Link Routing Debugger, which allows you to view the expected behavior for each operating system and click location.

To use the Link Routing Debugger:

1. Select an operating system and location using the dropdown menus.  
   
2. View the redirect results table for the link.  
   

Based on the operating system and click location you have selected, you’ll see the click redirect outcome for when a user does and does not have the app installed.

## Additional resources

### Sample applications

- [Branch iOS SDK Sample Applications](https://github.com/BranchMetrics/branch-ios-sdk-samples)
- [Objective C Testbed](https://github.com/BranchMetrics/ios-branch-deep-linking/tree/master/Branch-TestBed)

### Troubleshooting guide

If you're experiencing unexpected behavior with the Branch iOS SDK, start by taking a look at our Troubleshooting [guide](ios-troubleshooting.md). You can also see more testing instructions [here](https://help.branch.io/faq/docs/test-the-branch-ios-android-web-sdk).

## FAQ

<details>
<summary>Will install events be visible in Liveview when installing from TestFlight?</summary>

Yes. Install events will be visible when installing from TestFlight because the Branch SDK will still record Open events and check for First Open with the `is_first_session=true` field in the initialization data.

</details>

<details>
<summary>What are some reliable methods to confirm Installs in Branch?</summary>

To confirm Installs in Branch, start with the [Liveview](https://help.branch.io/using-branch/docs/liveview) and [Summary](https://help.branch.io/using-branch/docs/branch-summary-page) tabs. Please note that data may be delayed.

</details>
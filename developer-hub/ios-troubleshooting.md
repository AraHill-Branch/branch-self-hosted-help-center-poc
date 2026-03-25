---
title: "iOS Troubleshooting"
slug: ios-troubleshooting
---

## Overview

This guide lists out some of the most common challenges we see customers run into when trying to integrate the Branch iOS SDK.

To integrate the Branch iOS SDK, follow the steps in our iOS SDK Basic Integration [guide](ios-basic-integration.md).

## Scenarios

### X (Twitter) WebViews do not redirect

Universal Links and URI schemes do not redirect from X’s in-app browser properly. To work around this, we recommend using an [active Deepview](https://help.branch.io/marketer-hub/docs/enable-deepviews). Instead of an automatic redirect, users are shown a landing page with a button to open your app. This ensures a consistent experience for users coming from X.

### App does not open

If your app is not opening when you click a Branch Deep Link, confirm that:

1. The Branch iOS SDK has been [integrated](ios-basic-integration.md) into your app [successfully](ios-testing.md#testing-tools).
2. Universal Links are enabled on the device (can only be disabled on iOS 9 and iOS 10). The iOS SDK Testing [guide](ios-testing.md#test-deep-linking) has steps on testing a Branch Deep Link, which will re-enable Universal Links on the device.
3. No issues related to the actual [creation](creating-a-deep-link.md) of the Branch Deep Link.
4. Your website is [properly configured](https://branch.io/resources/aasa-validator/) for Universal Links.

### Link does not pass data

If Branch Deep Link data is not getting funneled to your app, confirm that:

1. You are not having issues related to the [app not opening](ios-troubleshooting.md#app-does-not-open).
2. Your console logs are free of errors. To check this, you need to [enable logging](ios-testing.md#enable-logging).

### Deep links are long

If you find that your Branch Deep Links are long, this is because the app cannot make a connection to the Branch servers.

However, these long Branch Deep Links will still open the app and pass data.

### Deferred deep linking issues

If deferred deep linking is broken, confirm that you have [enabled](ios-advanced-features.md#nativelink-deferred-deep-linking) NativeLink™.

Not doing so will cause deferred deep linking to be broken on devices with iOS 15+ installed and Private Relay enabled.

You can also test your deferred deep linking scenario with these [steps](ios-testing.md#test-deferred-deep-linking).

Please note that you must have our [Engagement product](packaging.md#engagement-essentials-tier) to have access to Branch Deferred Deep Linking.

#### iOS 26 with Safari

If you are testing on an iOS 26 device with Safari, please note that the user agent OS token gets frozen at `18_6`.

In this case, Branch labels iOS 26 devices as iOS 18.6 devices due to the data provided in the user agent. **This prevents a match being made, and breaks deferred deep linking**.

Branch automatically fixes cases where the os\_version is provided by the DSP. For cases where os\_version is not available, we **strongly recommend** using [NativeLink™](https://help.branch.io/docs/nativelink-deferred-deep-linking).

### Deep link routing issues

If you're having issues with deep link routing, confirm that:

1. You have followed the appropriate steps in our [guide](ios-advanced-features.md#navigate-to-content) for navigating to content.
2. You [test the routing](ios-testing.md#test-deep-link-routing) with the `?bnc_validate=true` param.

## FAQ

<details>
<summary>When a user clicks a web-only email link on iOS and they get directed into the app before getting kicked out to web, does Branch still count as app open?</summary>

Yes, Branch will register an open if a web-only link is clicked, despite the app kicking the user back out to web.

</details>
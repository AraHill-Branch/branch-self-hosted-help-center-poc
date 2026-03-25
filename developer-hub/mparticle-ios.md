---
title: "mParticle iOS"
slug: mparticle-ios
---

This documentation explains how to send **mParticle events to your Branch dashboard**. If you'd like to send Branch installs to your mParticle dashboard, please review the [Branch/mParticle Data Integration](mparticle-export.md).

::: info These instructions apply to the mParticle SDK version 7+ integration
mParticle introduced a new attribution & deep linking API in v7 of their SDK (<http://docs.mparticle.com/developers/sdk/ios/getting-started/#upgrade-to-version-7-of-the-sdk>), so please contact your Branch or mParticle Account Managers for more details, if you have mParticle SDK < v7 installed in your app.
:::

::: warning Inconsistent Universal links behavior on iOS 11.2
After updating a device to iOS 11.2, we found that the app's AASA file is no longer downloaded reliably onto your user's device after an app install. As a result, clicking on Universal links will no longer open the app consistenly. You can set [forced uri redirect mode](creating-a-deep-link.md#redirections) on your Branch Links to open the app with URI schemes.
:::

## Technical Requirements

- [mParticle SDK for iOS](https://docs.mparticle.com/developers/sdk/ios/getting-started/)
- [mParticle Branch Kit](https://github.com/mparticle-integrations/mparticle-apple-integration-branchmetrics)

::: info iOS 14 Implementation
In order to give you full control over the user experience, the Branch SDK will not trigger the IDFA permission modal.

However, we will still collect and use IDFAs when available if you do choose to trigger the modal.

[LEARN MORE](ios-14-faqs.md)
:::

## Branch Setup

### Configure bundle identifier

- Make sure Bundle Id matches your Branch configuration:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Link Controls**. Navigate to the **Link Routing Rules** tab, then find the **Mobile Routing** section and select **iOS**.
  - **Legacy Branch**: Navigate to the [Link Settings page](https://dashboard.branch.io/settings/link).

![](/img/a81a05a-ios-bundle-id.png "ios-bundle-id.png")

### Confirm App Prefix

- From your [Apple Developer Account](https://developer.apple.com/account/ios/identifier/bundle)

![](/img/cfa3912-ios-team-id.png "ios-team-id.png")

### Configure Branch & Enable Universal Links

- Enter a URI scheme and [enable Universal Links](ios-universal-links.md#section-enable-universal-links-on-the-branch-dashboard):

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Link Controls**. Navigate to the **Link Routing Rules** tab, then find the **Mobile Routing** section and select **iOS**.
  - **Legacy Branch**: Navigate to the [Link Settings page](https://dashboard.branch.io/settings/link).

![](/img/c4295d7-ios.png "ios.png")

![](/img/9672c31-link-domain.png "link-domain.png")

### Configure Associated Domains

- Add your link domains from Branch:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Link Controls**. Find your link domains in the **Link Routing Rules** tab.
  - **Legacy Branch**: Navigate to the [Link Settings page](https://dashboard.branch.io/settings/link).
- `-alternate` is needed for Universal Linking with the [Web SDK](web-sdk-overview.md) inside your Website
- `test-` is needed if you need use a test key
- If you use a [custom link domain](https://help.branch.io/#change-link-domain), you will need to include your old link domain, your `-alternate` link domain, and your new link domain

![](/img/5b75d7d-ios-entitlements.png "ios-entitlements.png")

### Configure Entitlements

- Confirm entitlements are within target

![](/img/2766527-ios-package.png "ios-package.png")

### Configure `info.pList`

- Add Branch values:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Keys & Domains** to find your Branch key and link domain.
  - **Legacy Branch**: Navigate to the [Account Settings page](https://dashboard.branch.io/account-settings/app).
  - Add `branch_app_domain` with your live key domain
  - Add your URI scheme as `URL Types` -> `Item 0` -> `URL Schemes`
  - Do NOT add your API keys to the file (mParticle handles this via the dashboard)

![](/img/4753c93-ios-plist.png "ios-plist.png")

## mParticle Setup

### Enable Branch on mParticle

- Before you can enable Branch in your mParticle dashboard, you must retrieve your Branch Key:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Keys & Domains**.
  - **Legacy Branch**: Navigate to the [Link Settings](https://dashboard.branch.io/settings/link) page.
- Please follow mParticle's documentation on how to [Connect an Event Output](https://docs.mparticle.com/guides/getting-started/connect-an-event-output/); i.e. enable the Branch integration.
- If you have enabled Apple Ads for your Branch implementation, you must also check `Enable Apple Ads` in the Connection Settings.

Once you have added the kit and configured your branch API key in the mParticle dashboard, the mParticle SDKs will take care of initializing the Branch SDK and forwarding the appropriate application lifecycle events to handle deep links.

### Install the mParticle Branch Kit

#### Option 1: [CocoaPods](https://cocoapods.org/)

```
platform :ios, '8.0'

        target 'APP_NAME' do
        # if swift
        use_frameworks!

        'pod 'mParticle-BranchMetrics', '~> 8'
        end
```

#### Option 2: [Carthage](https://github.com/Carthage/Carthage)

```
github "mparticle-integrations/mparticle-apple-integration-branchmetrics"
```

### Import iOS Support Libraries

- `AdSupport`
- `SafariServices`
- `MobileCoreServices`
- `CoreSpotlight`
- `iAd`

### Initializing Branch in the mParticle Kit

The mParticle iOS SDK (version 5.4.1 and later) will automatically call the following methods of the Branch Kit:

- `initSessionWithLaunchOptions:` within `application:didFinishLaunchingWithOptions:`
- `handleDeepLink:` within `application:openURL:options:`
- `continueUserActivity:` within `application:continueUserActivity:restorationHandler:`

This means mParticle will automatically handle initializing Branch sessions. However, please ensure `.onAttributionComplete` is enabled in the `mParticleOptions` object.

::: warning mParticle appDelegate proxy not enabled
If the mParticle appDelegate proxy is not enabled, you must add mParticle's [URI & Domain relays](https://docs.mparticle.com/developers/sdk/ios/configuration/#uiapplication-delegate-proxy) to the appDelegate.
:::

At this point you should start seeing your Branch session data - including installs, re-opens, and any custom events - in your Branch dashboard.

### Retrieve Deep Link Data via mParticle

Our integration with mParticle supports the creation and attribution of deep links to install and open an app. A deep link will typically contain some additional information to be used when the user ultimately opens your application, so that you can properly route the user to the appropriate content, or otherwise customize their experience.

Please ensure you've followed [mParticle's documentation](http://docs.mparticle.com/developers/sdk/ios/kits#deep-linking) to ensure your deep link data is being retrieved.

::: info mParticle in React Native
If you integrate mParticle in React Native, you will still integrate the Branch kit as a Native module and follow the setup steps above. However, instead of retrieving deep link data in the the native layer, you'll retrieve deep link data via [mParticle's React Native function found here](https://github.com/mParticle/react-native-mparticle/blob/master/README.md#attribution).
:::

#### NativeLink™ Deferred Deep Linking

- Use iOS pasteboard to enable deferred deep linking via Branch NativeLink™

::: warning Prerequisite
**Make sure the underlying iOS SDK Version is v1.39.4+**

To use this feature you must:

- [Enable NativeLink™ Deep Linking](configure-default-link-behaviors.md#3-ios-default-link-behavior):

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Link Controls**. Navigate to the **Link Routing Rules** tab, then find the **Mobile Routing** section and select **iOS**.
  - **Legacy Branch**: Navigate to the [Configuration page](https://dashboard.branch.io/configuration/general).

  **or**
- Manually configure your Branch Link to use [$ios\_nativelink](creating-a-deep-link.md#deep-linking)
:::

Implement one of the [pasteboard opt-in options](ios-advanced-features.md#options-for-implementation) in the native iOS SDK code.

Please note that deferred deep linking is part of our Engagement package. Learn more on our pricing [page](packaging.md).

## Test Deep Link

1. Create a deep link in [Branch](https://dashboard.branch.io/marketing).
2. Delete your app from the device.
3. Compile and test on a device.
4. Paste deep link in **Apple Notes.**
5. Long press on the deep link (not 3D Touch).
6. Click **Open in "APP\_NAME"**to open your app.

![](/img/83b95b6-ios-notes.png "ios-notes.png")

## Implementing Features

- Please refer to mParticle's [making direct calls to kits](https://docs.mparticle.com/developers/sdk/ios/kits/#making-direct-calls-to-kits) documentation for how to access the Branch kit via the mParticle SDK.
- Once you have a reference to the Branch kit, refer to Branch's [native iOS SDK](ios-advanced-features.md#section-create-content-reference) documentation on how to implement secondary functionality.

## Sample Testing Apps

- [Example Applications](https://github.com/mparticle-integrations/mparticle-apple-integration-branchmetrics/tree/master/Examples)

## Troubleshooting

Please refer to the [Branch iOS SDK troubleshooting section](ios-troubleshooting.md).
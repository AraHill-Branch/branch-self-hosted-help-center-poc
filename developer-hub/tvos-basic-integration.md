---
title: "tvOS Basic Integration"
slug: tvos-basic-integration
---

::: tip SDK Stats
**Open Source Github Repo**: <https://github.com/BranchMetrics/ios-branch-deep-linking>

**SDK Size**: ~220kb (with all Branch features enabled)

**Speed**: Median 80ms to 250ms

**Minimum XCode Version**: 12+

**Minimum OS version**: iOS 9+
:::

::: info iOS 14 Implementation
In order to give you full control over the user experience, the Branch SDK will not trigger the IDFA permission modal.

However, we will still collect and use IDFAs when available if you do choose to trigger the modal.

[LEARN MORE](ios-14-faqs.md#apptrackingtransparency)
:::

## Configure Branch

tvOS uses the same Universal Links as iOS. It does not support redirect to URI scheme or web.

- [Configure the default link settings](configure-default-link-behaviors.md) for your app
- Make sure `I have an iOS app` and `Enable Universal Links` are selected:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Link Controls**. Navigate to the **Link Routing Rules** tab and find the **Mobile Routing** section.
  - **Legacy Branch**: Navigate to the [Configuration page](https://branch.dashboard.branch.io/configuration/general) and find the iOS section.

![1590](/img/8fa2ea2-ios.png "ios.png")

## Configure Bundle Identifier

- Make sure Bundle Id matches the info in Branch:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and select **Link Controls**. Navigate to the **Link Routing Rules** tab, then find the **Mobile Routing** section and select **iOS**.
  - **Legacy Branch**: Navigate to the [Link Settings page](https://dashboard.branch.io/settings/link).

![1912](/img/277a139-ios-bundle-id.png "ios-bundle-id.png")

Branch assumes you use the same bundle id for all Apple platforms. If you use different bundle ids, you can set the bundle id to a consistent value when initializing the Branch SDK.

## Configure Associated Domains

- In the Xcode `Signing & Capabilities` tab, add `Associated Domains`
- Add your link domains from Branch:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and select **Link Controls**. Find your link domains in the **Link Routing Rules** tab.
  - **Legacy Branch**: Navigate to the [Link Settings page](https://dashboard.branch.io/settings/link) to find your link domains.
- `-alternate` is needed for Universal Linking with the [Web SDK](web-sdk-overview.md) inside your Website
- `test-` is needed if you need use a test key
- If you use a [custom link domain](https://help.branch.io), you will need to include your old link domain, your `-alternate` link domain, and your new link domain

![1918](/img/1f5e908-ios-entitlements.png "ios-entitlements.png")

## Configure Info.plist

- Add Branch values:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and select **Keys & Domain** to find your Branch key and link domain.

    - Add `branch_universal_link_domains` with your live key domain
    - Add `branch_key` with your current Branch key
    - Add your URI scheme as `URL Types` -> `Item 0` -> `URL Schemes`
  - **Legacy Branch**: Navigate to the [Account Settings page](https://dashboard.branch.io/account-settings/app) to find your Branch key and link domain.

    - Add `branch_universal_link_domains` with your live key domain
    - Add `branch_key` with your current Branch key
    - Add your URI scheme as `URL Types` -> `Item 0` -> `URL Schemes`

![1716](/img/fd9fb05-info.plist.png "info.plist.png")

## Confirm App Prefix

- From your [Apple Developer Account](https://developer.apple.com/account/ios/identifier/bundle)

![1984](/img/ffeaed9-ios-team-id.png "ios-team-id.png")

## Install Branch

### Option 1

[CocoaPods](https://cocoapods.org/)

```
platform :tvos, '9.0'

        target 'APP_NAME' do
        # if swift
        use_frameworks!

        pod 'Branch'
        end
```

```
pod install && pod update
```

### Option 2

::: warning Carthage 0.36.x does not include support for xcframeworks
Carthage support for xcframeworks is not included in the 0.36.x release. You can install Carthage from source to gain access to the `--use-xcframeworks` option.

[Carthage install instructions](https://github.com/Carthage/Carthage#installing-carthage)
:::

[Carthage](https://github.com/Carthage/Carthage)

Branch iOS SDK now supports xcframework and requires the `--use-xcframeworks` option.

```
github "BranchMetrics/ios-branch-deep-linking"
```

- Import the `Branch.xcframework` into **Linked Frameworks**
- Import `AdSupport` and `CoreServices` into **Linked Frameworks**

### Option 3

From the 0.37.0 release, the Branch iOS SDK [github releases page](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/releases) includes a prebuilt xcframework in `Branch.zip` and a checksum.

- Drag and drop `Branch.xcframework` into \*Embedded Binaries **(select** Copy items if needed\*\*)
- Import `AdSupport` and `CoreServices`, into **Linked Frameworks**

![2092](/img/3408899-frameworks.png "frameworks.png")

## Initialize Branch

In your app's AppDelegate

```
import UIKit
        import Branch

        @UIApplicationMain
        class AppDelegate: UIResponder, UIApplicationDelegate {

        var window: UIWindow?

        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // if you are using the TEST key
        Branch.setUseTestBranchKey(true)
        // listener for Branch Deep Link data
        Branch.getInstance().initSession(launchOptions: launchOptions, andRegisterDeepLinkHandler: { (params, error) in
        // do stuff with deep link data (nav to page, display content, etc)
        print(params as? [String: AnyObject] ?? {})
        }
        return true
        }

        func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
        Branch.getInstance().application(app, open: url, options: options)
        return true
        }

        func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
        // handler for Universal Links
        Branch.getInstance().continue(userActivity)
        return true
        }

        func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        // handler for Push Notifications
        Branch.getInstance().handlePushNotification(userInfo)
        }
```

## App to App linking on tvOS

tvOS does not have a web browser or a web view. We workaround this limitation by App to App programmatic linking.

For this section, "ad partner app" refers to the tvOS app that wishes to link your Branch enabled tvOS app, the "target app". The ad partner app does not need to be Branch enabled.

App to App linking is implemented in the ad partner app.

- Add the `AdSupport` framework. This is used to obtain the device IDFA.
- Enable the ad partner app to query for your tvOS app by adding your URI scheme to the Info.plist. See [canOpenURL](https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl)

![2782](/img/755156d-Screen_Shot_2021-02-04_at_11.08.52_AM.png "Screen Shot 2021-02-04 at 11.08.52 AM.png")

The following code demonstrates how to link from the ad partner app to the target app.

- The target app's Branch Link has the device IDFA appended to it as a query parameter.
- We query for the target app using canOpenURL. Note, canOpenURL is checking the URI scheme, while Branch Links are Universal Links.
- If we detect the app, we attempt to open it with the Branch Link. If we do not detect the app or we fail to open it with the Branch Link, we fallback to sending a click to the Branch server then opening the app store.

```
// This example opens the target app using a Branch Link. This does get Branch parameters and deferred deeplink data.
        @IBAction func testBranchLink() {

        // Since tvOS only supports app to app linking, we simply pass the advertising identifier as a query parameter
        // Also added the adpartner parameter just to indicate where this came from, not strictly necessary
        let branchLink = "https://bnctestbed.app.link/cCWdYYokQ6?$os=tv_os&$idfa=" + self.checkIdfa()

        guard let url = URL(string: branchLink) else { return }
        guard let uriScheme = URL(string:"branchtest://") else { return }

        self.openURL(url: url, uriScheme: uriScheme)
        }

        func checkIdfa() -> String {
        return ASIdentifierManager.shared().advertisingIdentifier.uuidString
        }

        // We assume the uri scheme is for the same app as the universal link url
        func openURL(url:URL, uriScheme:URL) {

        // canOpenURL can only check URI schemes listed in the Info.plist. It cannot check Universal Links.
        // https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl
        if (UIApplication.shared.canOpenURL(uriScheme)) {
        if #available(tvOS 10.0, *) {
        UIApplication.shared.open(url, options: [:]) { (success) in
        if (success == false) {
        self.clickBranchLink(url: url)
        }
        }
        } else {
        let success = UIApplication.shared.openURL(url)
        if (success == false) {
        self.clickBranchLink(url: url)
        }
        }

        } else {
        self.clickBranchLink(url: url)
        }
        }

        func clickBranchLink(url:URL) {
        URLSession.shared.dataTask(with: url) { (data, response, error) in
        DispatchQueue.main.async {
        self.openAppStore()
        }
        }.resume()
        }

        // directly open the app store if we're unable to detect the app
        func openAppStore() {
        guard let url = URL(string:"https://apps.apple.com/us/app/branch-monster-factory/id917737838?mt=8") else { return }

        if #available(tvOS 10.0, *) {
        UIApplication.shared.open(url, options: [:]) { (success) in

        }
        } else {
        UIApplication.shared.openURL(url)
        }
        }
```
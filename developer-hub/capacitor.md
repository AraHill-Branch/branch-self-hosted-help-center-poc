---
title: "Capacitor"
slug: capacitor
---

## Install Branch

```
npm install capacitor-branch-deep-links
```

## Configure Branch

- Complete your Branch configuration:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Link Controls**. Navigate to the **Link Routing Rules** tab to configure your app settings.
  - **Legacy Branch**: Navigate to the [Configuration page](https://branch.dashboard.branch.io/configuration/general).

![](/img/6462cc8-Screen_Shot_2020-08-27_at_9.45.07_AM.png "Screen Shot 2020-08-27 at 9.45.07 AM.png")

## Configure App

### Android

- If your app is in the Google Play Store, update `build.gradle` with the necessary dependencies:

```
apply plugin: 'com.android.application'

        android {
        defaultConfig {
        // ...
        + multiDexEnabled true
        // ...
        }
        }

        dependencies {
        + implementation("com.google.android.gms:play-services-ads-identifier:18.0.1") // AAID
        + implementation 'androidx.multidex:multidex:2.0.1' // Only required if your minSDKVersion is 20 or lower
        }
```

- Update `src/main/res/values/strings.xml` with your configuration:

```
<?xml version='1.0' encoding='utf-8'?>
        <resources>
        <!-- ... ->
        + <string name="applink_host">example.app.link</string>
        + <string name="applink_host_alternate">example-alternate.app.link</string>
        + <string name="deeplink_scheme">example</string>
        + <string name="branch_key">key_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</string>
        + <string name="branch_test_key">key_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</string>
        + <bool name="branch_test_mode">false</bool>
        + <!-- set above to "true" to use test key -->
        </resources>
```

- Register the plugin in your Activity and set the request metadata `MainActivity.java`:

```
package com.example;

        + import android.content.Intent;
        import android.os.Bundle;
        + import co.boundstate.BranchDeepLinks;
        import com.getcapacitor.BridgeActivity;
        import com.getcapacitor.Plugin;
        import java.util.ArrayList;
        + import io.branch.referral.Branch;

        public class MainActivity extends BridgeActivity {

        @Override
        public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        + Branch.getInstance().setRequestMetadata("insert_user_id", "value"); // if you need to append partner metadata before initializing Branch
        + registerPlugin(BranchDeepLinks.class);
        }
        +
        + @Override
        + protected void onNewIntent(Intent intent) {
        + this.setIntent(intent);
        + super.onNewIntent(intent);
        + }
        }
```

- Add a `CustomApplicationClass.java` file to your project with the following content:

```
+ package com.example;
        +
        + import android.content.Context;
        + import android.os.UserManager;
        + import androidx.multidex.MultiDex;
        + import androidx.multidex.MultiDexApplication;
        + import static android.os.Build.VERSION.SDK_INT;
        + import io.branch.referral.Branch;
        +
        + public class CustomApplicationClass extends MultiDexApplication {
        +
        + @Override
        + public void onCreate() {
        + super.onCreate();
        +
        + // Branch logging for debugging
        + Branch.enableLogging();
        +
        + if (SDK_INT >= 24) {
        + UserManager um = getApplicationContext().getSystemService(UserManager.class);
        + if (um == null || !um.isUserUnlocked()) return;
        + }
        +
        + // Branch object initialization
        + Branch.getAutoInstance(this);
        + }
        +
        + @Override
        + protected void attachBaseContext(Context base) {
        + super.attachBaseContext(base);
        + MultiDex.install(this);
        + }
        + }
```

- Update your `AndroidManifest.xml` as follows:

```
<?xml version="1.0" encoding="utf-8"?>
        <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.example">

        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>

        <application
        + android:name=".CustomApplicationClass"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <!-- ... -->

        <activity
        android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
        android:name="com.example.MainActivity"
        android:label="@string/title_activity_main"
        android:theme="@style/AppTheme.NoActionBarLaunch"
        android:launchMode="singleTask">

        + <intent-filter>
        + <action android:name="android.intent.action.MAIN" />
        + <category android:name="android.intent.category.LAUNCHER" />
        + </intent-filter>

        + <!-- BEGIN BRANCH -->
        + <intent-filter android:autoVerify="true">
        + <action android:name="android.intent.action.VIEW" />
        + <category android:name="android.intent.category.DEFAULT" />
        + <category android:name="android.intent.category.BROWSABLE" />
        + <data
        + android:scheme="http"
        + android:host="@string/applink_host" />
        + <data
        + android:scheme="https"
        + android:host="@string/applink_host" />
        + <data
        + android:scheme="http"
        + android:host="@string/applink_host_alternate" />
        + <data
        + android:scheme="https"
        + android:host="@string/applink_host_alternate" />
        + </intent-filter>
        +
        <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        - <data android:scheme="@string/custom_url_scheme"/>
        + <data android:scheme="@string/deeplink_scheme"/>
        </intent-filter>
        + <!-- END BRANCH -->

        </activity>

        + <!-- BEGIN BRANCH -->
        + <!-- Branch init -->
        + <meta-data android:name="io.branch.sdk.BranchKey" android:value="@string/branch_key" />
        + <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="@string/branch_test_key" />
        + <meta-data android:name="io.branch.sdk.TestMode" android:value="@bool/branch_test_mode" />
        + <!-- END BRANCH -->
        +
        <!-- ... -->

        </application>

        <!-- ... -->

        </manifest>
```

### iOS

::: info iOS 14 Implementation
In order to give you full control over the user experience, the Branch SDK will not trigger the IDFA permission modal.

However, we will still collect and use IDFAs when available if you do choose to trigger the modal.

[Learn More](sdk-faqs.md)
:::

1. [Configure Bundle Identifier](ios-basic-integration.md#2-configure-bundle-identifier)
2. [Configure Associated Domains](ios-basic-integration.md#3-configure-associated-domains)
3. [Configure Info.plist](ios-basic-integration.md#4-configure-infoplist)
4. Update the project:

```
npx cap update ios
```

5. Make the following changes to your `AppDelegate.swift` file:

```
import UIKit
        import Capacitor
        +import BranchSDK

        @UIApplicationMain
        class AppDelegate: UIResponder, UIApplicationDelegate {

        var window: UIWindow?

        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch

        + Branch.setUseTestBranchKey(true) // If you are using the TEST key
        + Branch.getInstance().enableLogging() // If you want to enable logging
        + Branch.getInstance().setRequestMetadataKey("insert_user_id", value: "value") // If you need to append partner metadata before initializing Branch
        + Branch.getInstance().initSession(launchOptions: launchOptions)

        return true
        }

        func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
        }

        func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
        }

        func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
        }

        func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
        }

        func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
        }

        func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        + Branch.getInstance().application(app, open: url, options: options)
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
        }

        func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        + Branch.getInstance().continue(userActivity)
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
        }

        if statusBarRect.contains(touchPoint) {
        NotificationCenter.default.post(name: .capacitorStatusBarTapped, object: nil)
        }
        }

        + func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        + Branch.getInstance().handlePushNotification(userInfo)
        + }

        }
```

## Initialize Branch

```
+ import { BranchDeepLinks, BranchInitEvent } from 'capacitor-branch-deep-links';

        @Component({
        selector: 'app-root',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.scss']
        })
        export class AppComponent {
        constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
        ) {
        this.initializeApp();
        }

        initializeApp() {
        this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        + BranchDeepLinks.addListener('init', (event: BranchInitEvent) => {
        + // Retrieve deeplink keys from 'referringParams' and evaluate the values to determine where to route the user
        + // Check '+clicked_branch_link' before deciding whether to use your Branch routing logic
        + console.log(event.referringParams);
        + });

        + BranchDeepLinks.addListener('initError', (error: any) => {
        + console.error(error);
        + });
        });
        }
        }
```

## Implement features

### Configure pre-initialization settings

The following methods must be called **before** Branch SDK initialization to set data correctly

#### setSDKWaitTimeForThirdPartyAPIs()

Configures how long the SDK waits for third-party API responses (ODM info and Apple Attribution Token)

```
import { BranchDeepLinks } from 'capacitor-branch-deep-links';

BranchDeepLinks.setSDKWaitTimeForThirdPartyAPIs(3);
```

| Argument | Type | Description |
| --- | --- | --- |
| `waitTime` | `number` | Number of seconds SDK will wait for third party APIs to finish. Default is 0.5 seconds (500ms). |

#### setODMInfo()

Passes ODM info to the Branch iOS SDK.

```
import { BranchDeepLinks } from 'capacitor-branch-deep-links';

BranchDeepLinks.setODMInfo("odmInfo", Date.now());
```

| Argument | Type | Description |
| --- | --- | --- |
| `odmInfo` | `String` | The ODM event data (or aggregate conversion info) for the current app instance. |
| `firstOpenTimestamp` | `Number` | The date and time when the app was first opened after installation. This timestamp is used for conversion attribution timing and should match the value passed to Google's `setFirstLaunchTime` method. |

#### setAnonID()

Sets a custom Meta anon\_id for the current user. The Meta anon\_id is a GUID generated by the Branch iOS SDK for Meta AEM.

```
import { BranchDeepLinks } from 'capacitor-branch-deep-links';

BranchDeepLinks.setAnonID("your-anon-id");
```

| Argument | Type | Description |
| --- | --- | --- |
| `anonID` | `String` | The custom Meta anon\_id to set for the user. |

### Create Deep Link

- Creates a deep link URL with encapsulated data
- Uses [Deep Link Properties](creating-a-deep-link.md)
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/links)

```
// optional fields
        var analytics = {
        channel: 'facebook',
        feature: 'onboarding',
        campaign: 'content 123 launch',
        stage: 'new user',
        tags: ['one', 'two', 'three']
        }

        // optional fields
        var properties = {
        $desktop_url: 'http://www.example.com/desktop',
        $android_url: 'http://www.example.com/android',
        $ios_url: 'http://www.example.com/ios',
        $ipad_url: 'http://www.example.com/ipad',
        $match_duration: 2000,
        custom_string: 'data',
        custom_integer: String(Date.now()), // Custom integers must be converted to a string
        custom_boolean: true
        }

        BranchDeepLinks.generateShortUrl({ analytics, properties }).then(function (res) {
        alert('Response: ' + JSON.stringify(res.url))
        }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err))
        })
```

### Share Deep Link

- Will generate a Branch deep link and tag it with the channel the user selects
- Uses [Deep Link Properties](creating-a-deep-link.md)

```
// optional fields
        var analytics = {
        channel: 'facebook',
        feature: 'onboarding',
        campaign: 'content 123 launch',
        stage: 'new user',
        tags: ['one', 'two', 'three']
        }

        // optional fields
        var properties = {
        $desktop_url: 'http://www.example.com/desktop',
        custom_string: 'data',
        custom_integer: String(Date.now()), // Custom integers must be converted to a string
        custom_boolean: true
        }

        var shareText = 'Check out this link'

        // share sheet
        BranchDeepLinks.showShareSheet({ analytics, properties, shareText })
```

### NativeLink™ Deferred Deep Linking (iOS Only)

- Use iOS pasteboard to enable deferred deep linking via Branch NativeLink™

::: warning Prerequisites
**Make sure the underlying iOS SDK Version is v1.39.4+**

To use this feature you must:

- [Enable NativeLink™ Deep Linking](configure-default-link-behaviors.md#3-ios-default-link-behavior) in the Branch Dashboard:

  - **New Branch**: In the left-hand navigation, go to **Configuration** and click on **Link Controls**. Navigate to the **Link Routing Rules** tab, then find the **Mobile Routing** section and select **iOS**.
  - **Legacy Branch**: Navigate to the [Configuration page](https://dashboard.branch.io/configuration/general) and find the iOS section.

  **or**
- Manually configure your Branch Link to use [$ios\_nativelink](creating-a-deep-link.md#deep-linking)
:::

Implement one of the [pasteboard opt-in options](ios-advanced-features.md#options-for-implementation) in the native iOS SDK code.

Please note that deferred deep linking is part of our [Engagement package](https://help.branch.io/docs/products#engagement).

### Create QR Code

- Set your Qr Code Settings
- Set your Analytics and Link Properties
- Use getBranchQRCode() to create a QR code.

```
// Optional fields
        var analytics = {
        channel: 'facebook',
        feature: 'onboarding',
        campaign: 'content 123 launch',
        stage: 'new user',
        tags: ['one', 'two', 'three']
        }

        // Optional fields
        var properties = {
        $desktop_url: 'http://www.example.com/desktop',
        $android_url: 'http://www.example.com/android',
        $ios_url: 'http://www.example.com/ios',
        $ipad_url: 'http://www.example.com/ipad',
        $match_duration: 2000,
        custom_string: 'data',
        custom_integer: String(Date.now()), // Custom integers must be converted to a string
        custom_boolean: true
        }

        var settings = {
        width: 2000,
        codeColor: "#3b2016",
        backgroundColor: "#c79200",
        centerLogo: "https://cdn.britannica.com/95/156695-131-FF89C9FA/oak-tree.jpg",
        margin: 3,
        imageFormat: "PNG"
        }

        BranchDeepLinks.getBranchQRCode({analytics, properties, settings}).then((res) => {
        this.picToView = "data:image/png;base64," + res.qrCode;
        }).catch(function (err) {
        alert('Error getting QR code: ' + JSON.stringify(err) + err)
        })
```

#### Access

Basic Branch QR Codes are included in the free tier of the Branch Growth Platform.

For more advanced QR Code capabilities, see our Engagement Pro [package](packaging.md), which includes access to the [QR Code API](qr-code-api.md) as well as the ability to create custom QR Codes in the Branch Dashboard.

### Track Users

- Sets the identity of a user (ID, UUID, etc) for events, deep links, and referrals
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)

```
var newIdentity = '123456'
        BranchDeepLinks.setIdentity({ newIdentity: newIdentity }).then(function (res) {
        alert('Response: ' + JSON.stringify(res.referringParams))
        }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err))
        })
```

- Remove the identity of a user

```
BranchDeepLinks.logout().then(function (res) {
        alert('Response: ' + JSON.stringify(res.logged_out))
        }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err))
        })
```

### Track Events

- Registers a custom event
- Events named `open`, `close`, `install`, and `referred session` are Branch restricted
- Best to [Track users](capacitor.md#section-track-users) before [Track events](capacitor.md#section-track-events) to associate a custom event to a user
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

```
var eventName = 'my_event'
        var metaData = {
        customData: {
        'custom_dictionary': '123',
        'anything': 'everything'
        }
        }

        BranchDeepLinks.sendBranchEvent({ eventName, metaData })
```

### Track Commerce

- Registers a custom commerce event
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/commerce)

```
// get a list of all Branch standard events
        BranchDeepLinks.getStandardEvents().then(function (res) {
        alert('Response: ' + JSON.stringify(res.branch_standard_events))
        }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err))
        })

        var eventName = 'ADD_TO_CART'
        var metaData = {
        customerEventAlias: 'alias name for event',
        transactionID: '1234455',
        currency: 'USD',
        revenue: 1.5,
        shipping: 10.2,
        tax: 12.3,
        coupon: 'test_coupon',
        affiliation: 'test_affiliation',
        description: 'Test add to cart event',
        searchQuery: 'test keyword',
        customData: {
        "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
        "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
        }
        }

        BranchDeepLinks.sendBranchEvent({ eventName, metaData })
```

### Disable Tracking

If you need to comply with a user's request to not be tracked for GDPR purposes, or otherwise determine that a user should not be tracked, utilize this field to prevent Branch from sending network requests. This setting can also be enabled across all users for a particular link, or across your Branch Links.

```
BranchDeepLinks.disableTracking().then(function (res) {
        alert('Response: ' + JSON.stringify(res.is_enabled))
        }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err))
        })

        var isEnabled = true
        BranchDeepLinks.disableTracking({ isEnabled }).then(function (res) {
        alert('Response: ' + JSON.stringify(res.is_enabled))
        }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err))
        })
```
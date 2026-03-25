---
title: "React Native Basic Integration"
slug: react-native-basic-integration
---

## 1. Configure Branch Dashboard

Start by configuring the Branch Dashboard for your application:

1. iOS Branch Dashboard Configuration [steps](ios-basic-integration.md#1-configure-branch-dashboard).
2. Android Branch Dashboard Configuration [steps](android-basic-integration.md#1-configure-branch-dashboard).

Make sure to [configure your default link settings](configure-default-link-behaviors.md) as part of the setup process.

## 2. Install Branch

Please choose one of the following integration methods to install the Branch React Native SDK into your app.

#### Pure React Native App

Use one of the following commands to install the module:

##### NPM

```
npm install react-native-branch
```

##### Yarn

```
yarn add react-native-branch
```

**Note**: The `react-native-branch` module requires your `react-native` version to be greater than or equal to `0.60`.

#### Native iOS App With CocoaPods

1. Add the following code to your Podfile in order to install Branch using [CocoaPods](https://cocoapods.org/):

```
platform :ios, '11.0'

target 'APP_NAME' do
  # if swift
  use_frameworks!

  pod 'react-native-branch', path: '../node_modules/react-native-branch'
end
```

2. Run the `pod install` command to regenerate the `Pods` project with the new dependencies. Please note that the location of `node_modules` relative to your Podfile may vary.

#### Expo Framework

Branch does support applications that use Expo, but please note that we **do not** maintain the [react-native-branch](https://www.npmjs.com/package/@config-plugins/react-native-branch) plugin for Expo. This means we cannot fix any issues that arise related to this plugin.

To learn more, visit our [React Native Expo Integration](react-native-expo-integration.md) guide.

## 3. Configure App

Complete the app configuration steps for the relevant platform(s) you are using.

#### iOS Configuration

To configure iOS:

1. [Configure](ios-basic-integration.md#2-configure-bundle-identifier) bundle identifier.
2. [Configure](ios-basic-integration.md#3-configure-associated-domains) associated domains.
3. [Configure](ios-basic-integration.md#4-configure-infoplist) `Info.plist` file.
4. Add a `branch.json` file to your project, which you will use to access certain Branch configuration settings:

   1. Create an empty file called `branch.json`.
   2. Add the file to your project using Xcode. Within your project, navigate to **File** → **Add Files**.
   3. Select the `branch.json` file and make sure every target in your project that uses Branch is selected.
   4. Click **Add**.

#### Android Configuration

To configure Android:

1. [Add](android-basic-integration.md#3-add-dependencies) dependencies.
2. [Configure](android-basic-integration.md#3-add-dependencies) `AndroidManifest.xml` file.
3. Add a `branch.json` file to your project, which you will use to access certain Branch configuration settings.

   1. Create an empty file called `branch.json`.
   2. Place the file in the `src/main/assets folder` of your app.

## 4. Initialize Branch

Use the code samples in this section to initialize the SDK in your application(s).

#### Branch Initialization on iOS

To initialize Branch on iOS, add the following to your app's AppDelegate file:

::: code-group

```swift [Swift]
import RNBranch

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
 
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  // Optional: Uncomment next line to use test instead of live key
  // RNBranch.useTestInstance()
  RNBranch.initSession(launchOptions: launchOptions)
  
  return true
}

func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
  RNBranch.application(app, open:url, options:options)
  return true
}

func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
  RNBranch.continue(userActivity)
  return true
}
```

```objectivec [Objective-C]
#import "AppDelegate.h"
#import <RNBranch/RNBranch.h>
  
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Optional: Uncomment next line to use test instead of live key
    // [RNBranch useTestInstance];
    [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];
    NSURL *jsCodeLocation;
    //...
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  [RNBranch application:app openURL:url options:options];
  return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  [RNBranch continueUserActivity:userActivity];
  return YES;
}

@end
```

:::

#### Branch Initialization on Android

To initialize Branch on Android, you need to:

1. Add Branch to your `MainApplication.java` file or `MainApplication.kt` file:

::: code-group

```java [Java]
import io.branch.rnbranch.RNBranchModule;

public class MainApplication extends Application implements ReactApplication {

@Override
public void onCreate() {
  super.onCreate();
  
  // Enable logging for debugging (remove in production)
  RNBranchModule.enableLogging();
  
  RNBranchModule.getAutoInstance(this);
}
```

```kotlin [Second tab]
import io.branch.rnbranch.*

// ...

override fun onCreate() {
    super.onCreate()
    RNBranchModule.getAutoInstance(this)

    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
        // If you opted-in for the New Architecture, we load the native entry point for this app
        load()
    }
  
    // Enable logging for debugging (remove in production)
    RNBranchModule.enableLogging();
  
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
}

// ...
```

:::

2. Add Branch to your `MainActivity.java` file or `MainActivity.kt` file:

::: code-group

```java [Java]
import io.branch.rnbranch.*;
import android.content.Intent;

public class MainActivity extends ReactActivity {

    @Override
        protected String getMainComponentName() {
        return "base";
    }

    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        RNBranchModule.onNewIntent(intent);
    }
}
```

```kotlin [Kotlin]
import io.branch.rnbranch.*
import android.content.Intent

// ...

override fun onStart() {
    super.onStart()
    RNBranchModule.initSession(getIntent().getData(), this)
}

override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    setIntent(intent)
    RNBranchModule.reInitSession(this)
}

// ...
```

:::

## 5. Validate Integration

Use the guides below to validate that your SDK integration(s) are properly configured:

#### iOS

- [iOS Validation](ios-basic-integration.md#7-validate-integration)
- [iOS Testing](ios-testing.md)
- [iOS Troubleshooting](ios-troubleshooting.md)

#### Android

- [Android Validation](android-basic-integration.md#8-validate-integration)
- [Android Testing](android-testing.md)
- [Android Troubleshooting](android-troubleshooting.md)

#### Common Build Problems

- Be sure to update from < 2.0.0 if your app used an earlier version of `react-native-branch`. In version 2.x, the native SDKs are embedded in the NPM module and must not also be added from elsewhere (Gradle, CocoaPods, etc.).
- Note that when using the `React` pod in a native app, the name of the native SDK pod is `Branch-SDK`, not `Branch`, and it comes from `node_modules`, not the CocoaPods repo.
- Starting with React Native 0.40, all external iOS headers in Objective-C must be imported as `#import` . This applies to React Native headers as well as the header from this SDK.
- If you upgraded from RN < 0.40 manually, without adjusting your Xcode project settings, you may still be importing headers with double quotes. This probably indicates a problem with your settings.
- The `react-native-git-upgrade` tool from NPM may be used to update dependencies as well as project settings.
- On Android, when using Proguard in release builds, depending on your build settings, it may be necessary to add one or both of these lines to your `android/app/proguard-rules.pro` file:

  ```
  -dontwarn com.crashlytics.android.answers.shim.**
  -dontwarn com.google.firebase.appindexing.**
  ```
---
title: "MAUI Configuration"
slug: maui-configuration
---

## 1. Set Target Platforms

Update your project's target platforms:

1. Open Visual Studio and right-click on your project, then select **Properties → Build → Target Platforms**.
2. Check the **Enable targeting the Android platform** box and make sure the **Target .NET Runtime** is set to **.NET 7.0** - also confirm you have the appropriate **Target Android version** and **Minimum Android version** set.
3. Check the **Enable targeting the iOS platform** box and make sure the **Target .NET Runtime** is set to **.NET 7.0** - also confirm you have the appropriate **Target iOS version** and **Minimum iOS version** set.

   

## 2. Install Branch NuGet Package

**IMPORTANT**: MAUI applications should use versions 9.0.0 or higher of the `Branch-Xamarin-Linking-SDK` [NuGet package](https://www.nuget.org/packages/Branch-Xamarin-Linking-SDK) - lower versions are for Xamarin applications.

To add the Branch NuGet package to your project:

1. Right-click on your project and select **Add → Add NuGet Packages**.
2. Find the `Branch-Xamarin-Linking-SDK` package and add it to the project. Make sure you are using version 9.0.0 or higher for a Xamarin application.

## 3. Configure App

### iOS

#### 1. Configure Branch

Now that you have completed the general project setup requirements in Visual Studio, [configure](ios-basic-integration.md#1-configure-branch-dashboard) the iOS settings of your MAUI application in Branch:

#### 2. Update `Info.plist` File

1. Navigate to **Project/Platforms/iOS/Info.plist**, then right-click on the file and select **Open With**. Choose the editor you would like to use.
2. Update your `Info.plist` file so it has the `CFBundleIdentifier` and `CFBundleURLTypes` keys, as shown in this sample file:

```
<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0">
        <dict>
        <key>LSRequiresIPhoneOS</key>
        <true/>
        <key>UIDeviceFamily</key>
        <array>
        <integer>1</integer>
        <integer>2</integer>
        </array>
        <key>UIRequiredDeviceCapabilities</key>
        <array>
        <string>arm64</string>
        </array>
        <key>UISupportedInterfaceOrientations</key>
        <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
        </array>
        <key>UISupportedInterfaceOrientations~ipad</key>
        <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
        </array>
        <key>XSAppIconAssets</key>
        <string>Assets.xcassets/appicon.appiconset</string>
        <key>CFBundleIdentifier</key>
        <string>io.Branch.MyMauiApp</string>
        <key>CFBundleURLTypes</key>
        <array>
        <dict>
        <key>CFBundleURLSchemes</key>
        <array>
        <string>MyMauiApp</string>
        </array>
        </dict>
        </array>
        </dict>
        </plist>
```

#### 3. Add Associated Domains in `Entitlements.plist`

::: code-group

```xml [New Branch]
<?xml version="1.0" encoding="UTF-8"?>
                            <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
                            <plist version="1.0">
                            <dict>
                            <key>com.apple.developer.associated-domains</key>
                            <array>
                            <string>applinks:h06h3.app.link</string>
                            <string>applinks:h06h3-alternate.app.link</string>
                            </array>
                            </dict>
                            </plist>
```

```xml [Legacy Branch]
<?xml version="1.0" encoding="UTF-8"?>
                            <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
                            <plist version="1.0">
                            <dict>
                            <key>com.apple.developer.associated-domains</key>
                            <array>
                            <string>applinks:h06h3.app.link</string>
                            <string>applinks:h06h3-alternate.app.link</string>
                            </array>
                            </dict>
                            </plist>
```

:::

#### 4. Configure Bundle Signing

1. Make sure that your Apple Developer Account is associated with your solution. To do this, go to **Tools → Preferences** and [sign in to your account](https://learn.microsoft.com/en-us/dotnet/maui/ios/apple-account-management?tabs=vs#add-an-apple-developer-account).
2. Right-click on your project, then navigate to **Properties**. Open the **Bundle Signing** section under **iOS**.
3. In the **Custom Entitlements** field, add the path to the `Entitlements.plist` file you [created](maui-configuration.md#add-associated-domains-in-entitlementsplist).
4. Make sure the appropriate options are selected for **Signing Identity** and **Provisioning Profile**.

   

#### 5. Update `AppDelegate.cs` File

Use the following sample file to update your `AppDelegate.cs` file to initialize Branch and turn on logging. Import the Branch SDK at the top of the file and replace `key_live_<YOUR-GUID-HERE>` with your Branch key:

```
using BranchSDK;
        using Foundation;
        using UIKit;

        namespace MyMauiApp;

        [Register("AppDelegate")]
        public class AppDelegate : MauiUIApplicationDelegate, IBranchSessionInterface
        {
        protected override MauiApp CreateMauiApp() => MyMauiApp.MauiProgram.CreateMauiApp();

        public override bool FinishedLaunching(UIApplication application, NSDictionary launchOptions)
        {
        Branch.EnableLogging = true;
        BranchIOS.Init("key_live_<YOUR-GUIDE-HERE>", launchOptions, this);

        return base.FinishedLaunching(application, launchOptions);
        }

        // Handle URI opens
        public override bool OpenUrl(UIApplication application, NSUrl url, NSDictionary options)
        {
        return BranchIOS.getInstance().OpenUrl(url);
        }

        // Handle Universal Links
        public override bool ContinueUserActivity(UIApplication application, NSUserActivity userActivity, UIApplicationRestorationHandler completionHandler)
        {
        return BranchIOS.getInstance().ContinueUserActivity(userActivity);
        }

        public void InitSessionComplete(Dictionary<string, object> data)
        {
        LogMessage("InitSessionComplete: ");
        foreach (var key in data.Keys)
        {
        LogMessage(key + " : " + data[key].ToString());
        }
        }

        public void SessionRequestError(BranchError error)
        {
        LogMessage("SessionRequestError: ");
        LogMessage("Error Message: " + error.ErrorMessage);
        LogMessage("Error Code: " + error.ErrorCode);
        }

        void LogMessage(string message)
        {
        Console.WriteLine(message);
        }
        }
```

### Android

#### 1. Configure Branch

Now that you have completed the general project setup requirements in Visual Studio, [configure](android-basic-integration.md#configure-branch-dashboard) the Android settings of your MAUI application in Branch:

#### 2. Update `AndroidManifest.xml` File

Although you have already set the minimum and target Android versions in your project's properties, you also need to do this in the `AndroidManifest.xml` file. You also need to set your Branch key in the file:

1. Navigate to **Project/Platforms/Android/AndroidManifest.xml**, then right-click on the file and select **Open With**. Choose the editor you would like to use.
2. Use the following sample code to update your `AndroidManifest.xml` file. Add a `<meta-data>` field for your Branch key and a `<uses-sdk>` field for your minimum/target version values:

```
<?xml version="1.0" encoding="utf-8"?>
        <manifest xmlns:android="http://schemas.android.com/apk/res/android" package="io.Branch.MyMauiApp" android:versionCode="1" android:versionName="1.0">
        <application android:allowBackup="true" android:icon="@mipmap/appicon" android:supportsRtl="true" android:label="MyMauiApp">
        <meta-data android:name="io.branch.sdk.BranchKey" android:value="@string/branch_key" />
        </application>
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="33" />
        </manifest>
```

#### 3. Add `strings.xml` File

::: code-group

```xml [New Branch]
<?xml version="1.0" encoding="UTF-8" ?>
                            <resources>
                            <string name="branch_key">key_live_YOUR-GUID-HERE</string>
                            </resources>
```

```xml [Legacy Branch]
<?xml version="1.0" encoding="UTF-8" ?>
                            <resources>
                            <string name="branch_key">key_live_YOUR-GUID-HERE</string>
                            </resources>
```

:::

#### 4. Update `MainActivity.cs` File

Use the following sample code to update the `MainActivity` class in your `MainActivity.cs` file. Give the `Activity` a name, set a `LaunchMode`, implement `IBranchSessionInterface`, and replace `key_live_YOUR-GUID-HERE` with your Branch key:

```
using Android.App;
        using Android.Content.PM;
        using Android.OS;
        using BranchSDK;
        using Android.Content;

        namespace MyMauiApp;

        [IntentFilter(new[] { "android.intent.action.VIEW" },
        Categories = new[] { "android.intent.category.DEFAULT", "android.intent.category.BROWSABLE" },
        DataScheme = "MyMauiApp",
        DataHost = "open")]

        [IntentFilter(new[] { "android.intent.action.VIEW" },
        Categories = new[] { "android.intent.category.DEFAULT", "android.intent.category.BROWSABLE" },
        DataScheme = "https",
        DataHost = "MyMauiApp.app.link")]

        /*
        * Update the Activity
        *
        * Add a `Name` so this Activity can be located by name
        * Set the `LaunchMode` (`SingleTop` or `SingleTask` is recommended)
        *
        * Implement `IBranchSessionInterface` to get Branch payloads
        *
        */
        [Activity(Name = "io.Branch.MyMauiApp.MainActivity", Theme = "@style/Maui.SplashTheme", MainLauncher = true, LaunchMode = LaunchMode.SingleTop, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize | ConfigChanges.Density)]
        public class MainActivity : MauiAppCompatActivity, IBranchSessionInterface
        {
        protected override void OnCreate(Bundle savedInstanceState)
        {
        base.OnCreate(saavedInstanceState);
        BranchAndroid.Init(this, "key_live_<YOUR-GUID-HERE>", this);
        }

        protected override void OnNewIntent(Intent intent)
        {
        base.OnNewIntent(intent);
        intent.PutExtra("branch_force_new_session", true);
        Intent = intent;
        }

        public void InitSessionComplete(Dictionary<string, object> data)
        {
        if (data == null)
        {
        LogMessage(" InitSessionComplete with data: null");
        }
        else
        {
        var dataString = string.Join(", ", data.Select(kvp => $"{kvp.Key}: {kvp.Value?.ToString() ?? "null"}"));
        LogMessage($"InitSessionComplete with data: {dataString}");
        }
        }

        public void SessionRequestError(BranchError error)
        {
        LogMessage("SessionRequestError: ");
        LogMessage("Error Message: " + error.ErrorMessage);
        LogMessage("Error Code: " + error.ErrorCode);
        }

        void LogMessage(string message)
        {
        Console.WriteLine(message);
        }
        }
```

#### 5. Update `MainApplication.cs` File

Use the following sample code to add Branch initialization and logging to your `MainApplication.cs` file:

```
using Android.App;
        using Android.Runtime;
        using BranchSDK;

        namespace MyMauiApp;

        [Application]
        public class MainApplication : MauiApplication
        {
        public MainApplication(IntPtr handle, JniHandleOwnership ownership)
        : base(handle, ownership)
        {
        }

        public override void OnCreate()
        {
        base.OnCreate();
        Branch.EnableLogging = true;
        BranchAndroid.GetAutoInstance(ApplicationContext);
        }

        protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
        }
```

## 4. Send Branch Events

To start sending Branch Events, update your `MainPage.xaml.cs` code to use the Branch `SendEvent()` method:

```
using BranchSDK;

        namespace MyMauiApp;

        public partial class MainPage : ContentPage
        {
        int count = 0;

        public MainPage()
        {
        InitializeComponent();
        }

        private void OnCounterClicked(object sender, EventArgs e)
        {
        count++;

        if (count == 1)
        CounterBtn.Text = $"Clicked {count} time";
        else
        CounterBtn.Text = $"Clicked {count} times";

        SemanticScreenReader.Announce(CounterBtn.Text);

        // Send Branch Test Event
        SendEvent();
        }

        void SendEvent()
        {
        BranchEvent branchEvent = new BranchEvent(BranchEventType.PURCHASE);
        branchEvent.SetAlias("new_user_purchase");
        branchEvent.SetRevenue((float)1.5);
        branchEvent.SetShipping((float)10.5);
        branchEvent.SetCurrency(BranchCurrencyType.USD);
        branchEvent.SetTax((float)12.3);

        BranchUniversalObject buo1 = new BranchUniversalObject();
        buo1.canonicalIdentifier = "id12345";
        buo1.title = "id12345 title";
        buo1.contentDescription = "ITEM 1";
        BranchUniversalObject buo2 = new BranchUniversalObject();
        buo2.canonicalIdentifier = "id12345";
        buo2.title = "id12345 title";
        buo2.contentDescription = "ITEM 2";

        List<BranchUniversalObject> list = new List<BranchUniversalObject>();
        list.Add(buo1);
        list.Add(buo2);
        branchEvent.AddContentItems(list);

        Branch.GetInstance().SendEvent(branchEvent);
        }
        }
```

You can now create [Branch Universal Objects](create-branch-objects-and-events.md#branch-universal-object) and log various types of [Branch Events](dotnet-feature-implementation.md#event-tracking).

## 5. Test

Test that your application is sending Branch Events as expected:

## 6. Troubleshoot

#### MAUI Sample Application

**Full application**: <https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber>

**iOS configuration**: <https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber/Platforms/iOS>

**Android configuration**: <https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber/Platforms/Android>

#### Visual Studio

- Visual Studio aggressively caches build products, so make sure your build folder has no errors.
- Confirm you are using the correct Branch NuGet package. MAUI applications **should use versions 9.0.0 or higher** of the `Branch-Xamarin-Linking-SDK` NuGet package (lower versions are for Xamarin applications).

#### iOS

| Issue | Solution |
| --- | --- |
| Universal links do not work | Your `Entitlements.plist` file is likely not set up correctly. Check the format, that it is included in Visual Studio, and the Apple account logged-in and associated with the project can manage signing. |
| Integrity verification error | Causes app install to fail and means that the logged-in Apple Developer account does not have permission to sign for the app. Either switch accounts or request access from your organization. |

#### Android

| Issue | Solution |
| --- | --- |
| "Unable to find BranchAndroid" | Use a .NET 7 test app because .NET 6 is unreliable about resolving it’s Android dependencies. |
| Minimum version error | Make sure you have set an appropriate minimum version in both **Project → Properties → Target Platforms** as well as your `AndroidManifest.xml` file. |
| JIN exception at runtime | Within `MainApplication.cs`, the `BranchAndroid.GetAutoInstance(ApplicationContext)` function fails with a JNI error. This can occur due to a missing Branch key. Set the key both programmatically and within the `AndroidManifest.xml` file. |
| "Mismatch between instruction set variant of device" | App fails to run on device and error appears in logcat. To fix this, make sure you are using release builds for devices, not debug builds. |
| "Installation of the app failed" | Make sure you are using debug builds for simulators, not release builds. |
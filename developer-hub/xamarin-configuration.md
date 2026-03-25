---
title: "Xamarin Configuration"
slug: xamarin-configuration
---

## iOS

::: info iOS 14 Implementation
In order to give you full control over the user experience, the Branch SDK will not trigger the IDFA permission modal.

However, we will still collect and use IDFAs when available if you do choose to trigger the modal.
:::

::: danger Inconsistent Universal links behavior on iOS 11.2
After updating a device to iOS 11.2, we found that the app's AASA file is no longer downloaded reliably onto your user’s device after an app install. As a result, clicking on Universal links will no longer open the app consistently. You can set [forced uri redirect mode](creating-a-deep-link.md#section-redirections) on your Branch Links to open the app with URI schemes.
:::

### 1. Configure Branch

Start by [configuring](ios-basic-integration.md#1-configure-branch-dashboard) the iOS settings of your Xamarin application in Branch:

### 2. Install Branch NuGet Package

**IMPORTANT**: Xamarin applications should use versions 8.1.2 or lower of the `Branch-Xamarin-Linking-SDK` [NuGet package](https://www.nuget.org/packages/Branch-Xamarin-Linking-SDK) - versions 9.0.0+ are for MAUI applications.

The package must be added to each of the Xamarin projects that will use Branch methods.

To add the Branch NuGet package to a project:

1. Right-click on each project and select **Add → Add NuGet Packages**.
2. Find the `Branch-Xamarin-Linking-SDK` package and add it to the project. Make sure you are using version 8.1.2 or lower for a Xamarin application.

### 3. Configure App

#### Create an Apple Device Provisioning Profile for the App

#### Configure the Xamarin Project's Info.plist File

1. Open the `Info.plist` file.
2. Enter the app's Bundle Identifier from the [Apple Developer Portal](https://developer.apple.com/account/ios/identifier/bundle) in the **Bundle Identifier** field. **IMPORTANT**: This field will automatically be populated with an all-lowercase value by Xamarin. The value is in fact case-sensitive and must match the value in the [Apple Developer Portal](https://developer.apple.com/account/ios/identifier/bundle) precisely.
3. Click on the **Advanced** tab.
4. In the **URL Types** section, click the **Add URL Type** button:  
   **Identifier**: Branch Scheme  
   **URL Schemes**: The app's URI Scheme, for example `testiosapp`  
   **Role**: Editor

   ![](/img/975b01b-ios_uri_scheme.png "ios_uri_scheme.png")

#### Configure the Xamarin Project's Associated Domains Entitlement

1. Open the `Entitlements.plist` file and browse to the **Associated Domains** section.
2. Create entries for both the app's link domain and its alternate link domain. The entries for the `TestBed-Xamarin` app would be:  
   `applinks:testiosapp.app.link`  
   `applinks:testiosapp-alternate.app.link`

   ![](/img/1049ef4-ios_associated_domains.png "ios_associated_domains.png")

#### Update the Project's Signing Identity and Provisioning Profile

1. Right-click on the iOS project and select **Options**.
2. Select **iOS Bundle Signing**.
3. Set the **Signing Identity** and **Provisioning Profile** values to the values used when deploying the Provisioning Profile to the device.

### 4. Initialize Branch

Branch initialization occurs within the `FinishedLaunching` method of the `AppDelegate.cs` file. Branch calls are also required in the `OpenUrl`, `ContinueUserActivity`, and `ReceiveRemoteNotification` methods to ensure that Branch link information is handled properly whenever the app becomes active.

Whenever the app becomes active, the Branch SDK will reach out to the Branch backend to retrieve any available link parameters. If the app becomes active due to a click on a Branch link, the link data will be returned in the `InitSessionComplete` method. This is where any Branch Deep Link routing logic should reside. Any error in retrieving Branch link data from the backend will be returned in the `SessionRequestError` method.

```
// AppDelegate.cs

        using Foundation;
        using UIKit;
        using BranchXamarinSDK;
        using BranchXamarinSDK.iOS;
        using System;

        namespace TestiOSApp.iOS
        {
        [Register("AppDelegate")]
        public class AppDelegate : UIApplicationDelegate, IBranchBUOSessionInterface
        {
        public override UIWindow Window
        {
        get;
        set;
        }

        public override bool FinishedLaunching(UIApplication application, NSDictionary launchOptions)
        {
        // Debug mode - set to 'false' before releasing to production
        BranchIOS.Debug = true;
        BranchIOS.Init("key_live_<YOUR-GUID-HERE>", launchOptions, this);

        return true;
        }

        // Called when the app is opened via URI scheme
        public override bool OpenUrl(UIApplication application, NSUrl url, string sourceApplication, NSObject annotation)
        {
        return BranchIOS.getInstance().OpenUrl(url);
        }

        // Called when the app is opened from a Universal Link
        public override bool ContinueUserActivity(UIApplication application, NSUserActivity userActivity,
        UIApplicationRestorationHandler completionHandler)
        {
        return BranchIOS.getInstance().ContinueUserActivity(userActivity);
        }

        // Called when the app receives a push notification
        public override void ReceivedRemoteNotification(UIApplication application, NSDictionary userInfo)
        {
        BranchIOS.getInstance().HandlePushNotification(userInfo);
        }

        // Called when the Branch initialization is completed
        // Put Branch Deep Link logic in this method
        public void InitSessionComplete(BranchUniversalObject buo, BranchLinkProperties blp)
        {
        NSObject[] keys = {
        NSObject.FromObject("+is_first_session")
        };

        NSObject[] values = { NSObject.FromObject(0) };
        if (buo.metadata.ContainsKey("+is_first_session"))
        {
        values[0] = NSObject.FromObject(buo.metadata["+is_first_session"]);
        }

        NSDictionary nsData = NSDictionary.FromObjectsAndKeys(values, keys);
        }

        // Called when there is an error initializing Branch
        public void SessionRequestError(BranchError error)
        {
        Console.WriteLine("Branch error: " + error.ErrorCode);
        Console.WriteLine(error.ErrorMessage);
        }

        }
        }
```

#### Create a Class for Branch Session Handling

Branch initializes asynchronously, with Branch link parameters being returned following a network call to Branch. If initialization is successful, the `InitSessionComplete` method will be invoked. If initialization is unsuccessful, the `SessionRequestError` method will be invoked. Branch Deep Link routing logic should be located in the `InitSessionComplete` method.

1. Right-click on the C# project and select **Add → New File**.
2. Select **General**, then **Empty Class**.
3. Rename the file to `TestXamarinFormsApp.cs`.
4. Add the following code:

```
using BranchXamarinSDK;
        using System.Collections.Generic;
        using System.ComponentModel;
        using Xamarin.Forms;

        // Replace `TextXamarinFormsApp` with actual name of your app
        namespace TestXamarinFormsApp
        {
        public class TestXamarinFormsApp : Application, IBranchSessionInterface
        {

        public TestXamarinFormsApp()
        {
        }

        #region IBranchSessionInterface implementation

        public void InitSessionComplete(Dictionary<string, object> data)
        {
        }

        public void CloseSessionComplete()
        {
        }

        public void SessionRequestError(BranchError error)
        {
        }

        #endregion
        }
        }
```

#### Create a Class for Handling Link Data

Branch stores link data in an object referred to as the [Branch Universal Object](create-branch-objects-and-events.md#branch-universal-object), or BUO.

1. Right-click on the C# project and select **Add → New File**.
2. Select **General → Empty Class**.
3. Rename the file to `TestXamarinFormsAppBUO.cs`.
4. Add the following code:

```
using BranchXamarinSDK;
        using System.Collections.Generic;
        using System.ComponentModel;
        using Xamarin.Forms;

        // Replace `TextXamarinFormsApp` with actual name of your app
        namespace TestXamarinFormsApp
        {
        public class TestXamarinFormsAppBUO : Application, IBranchBUOSessionInterface
        {

        public TestXamarinFormsAppBUO()
        {
        }

        #region IBranchBUOSessionInterface implementation

        public void InitSessionComplete(BranchUniversalObject buo, BranchLinkProperties blp)
        {
        }

        public void SessionRequestError(BranchError error)
        {
        }

        #endregion
        }
        }
```

#### Add Branch Calls to the AppDelegate

To ensure that the Branch SDK initializes when the app starts and can retrieve link parameters whenever the app becomes active, Branch initialization occurs within the `FinishedLaunching` method of the `AppDelegate.cs` file. Branch calls are also required in the `OpenUrl`, `ContinueUserActivity`, and `ReceiveRemoteNotification` methods to ensure that Branch link information is handled properly whenever the app becomes active. The `AppDelegate.cs` file should look like this:

```
using System;
        using System.Collections.Generic;
        using System.Linq;

        using Foundation;
        using UIKit;
        using BranchXamarinSDK;
        using TestXamarinFormsApp;

        // Replace `TextXamarinFormsApp` with actual name of your app
        namespace TestXamarinFormsApp.iOS
        {
        [Register("AppDelegate")]
        public partial class AppDelegate : global::Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
        {
        public override bool FinishedLaunching(UIApplication app, NSDictionary options)
        {
        global::Xamarin.Forms.Forms.Init();

        // Debug mode - set to 'false' before releasing to production
        BranchIOS.Debug = true;

        TestXamarinFormsAppBUO appBUO = new TestXamarinFormsAppBUO();

        // Find your key_live value on the Account Settings page of the Branch Dashboard
        BranchIOS.Init("key_live_<YOUR-GUID-HERE>", options, appBUO);
        LoadApplication(appBUO);

        return base.FinishedLaunching(app, options);
        }

        // Called when the app is opened via URI scheme
        public override bool OpenUrl(UIApplication application, NSUrl url, string sourceApplication, NSObject annotation)
        {
        return BranchIOS.getInstance().OpenUrl(url);
        }

        // Called when the app is opened from a Universal Link
        public override bool ContinueUserActivity(UIApplication application, NSUserActivity userActivity, UIApplicationRestorationHandler completionHandler)
        {
        return BranchIOS.getInstance().ContinueUserActivity(userActivity);
        }

        // Called when the app receives a push notification
        public override void ReceivedRemoteNotification(UIApplication application, NSDictionary userInfo)
        {
        BranchIOS.getInstance().HandlePushNotification(userInfo);
        }
        }
        }
```

## Android

::: danger Google Play Services version 17+
If you reference Google Play Services version 17 or higher, you **MUST** complete Google's update instructions [here](https://developers.google.com/android/guides/releases#june_17_2019).

Due to a major Google Play Services change made in June 2019, not completing the update steps will cause Branch's Android SDK (and various other cross-platform SDKs, e.g. Unity) to stop collecting Android AID which we use to ensure accurate deep linking and attribution.

If you are running Google Play Services versions below 17, no update is necessary.
:::

### 1. Configure Branch

Start by [configuring](android-basic-integration.md) the Android settings of your Xamarin application in Branch.

### 2. Install Branch NuGet Package

::: warning Google Advertising Identifier (GAID)
Branch Xamarin SDK 8.0.0+ requires the `Xamarin.GooglePlayServices.AdsIdentifier` NuGet package to obtain the advertising id.

Note that version 117.0.1.5 does not work properly on Visual Studio for Mac 2019, use 117.0.1.3 instead.
:::

**IMPORTANT**: Xamarin applications should use versions 8.1.2 or lower of the `Branch-Xamarin-Linking-SDK` [NuGet package](https://www.nuget.org/packages/Branch-Xamarin-Linking-SDK) - higher versions are for MAUI applications.

The package must be added to each of the Xamarin projects that will use Branch methods.

To add the Branch NuGet package to a project:

1. Right-click on each project and select **Add → Add NuGet Packages**.
2. Find the `Branch-Xamarin-Linking-SDK` package and add it to the project. Make sure you are using version 8.1.2 or lower for a Xamarin application.

### 3. Configure App

#### Ensure Android Project Is Not Using Shared Mono Runtime

1. Right-click on the Android project and select **Options**.
2. Select **Android Build**.
3. On the **General** tab, un-check **Use Shared Mono Runtime**.

#### Add App Capabilities in Manifest File

In the `Required permissions` section of `AndroidManifest.xml`, configure the following permissions:

- `AccessNetworkState`
- `Internet`

Additional reading on the Android manifest:

- [Working with android manifest.xml](https://developer.xamarin.com/guides/android/advanced_topics/working_with_androidmanifest.xml/)
- [Add permissions to android manifest](https://developer.xamarin.com/recipes/android/general/projects/add_permissions_to_android_manifest/)

#### Add App's Branch Key

Add the app's Branch key to the Android project's `Strings.xml` file which lives in `Resources/values/`. This file contains values that can be accessed by the app's Application class.

```
<?xml version="1.0" encoding="utf-8"?>
        <resources>
        <string name="app_name">TestXamarinFormsApp</string>
        <string name="branch_key">key_live_liAnF8k7gZUEZv76Rt9a4bffAzlC5zVW</string>
        </resources>
```

### 4a. Initialize Branch Without Xamarin.Forms

You can initialize Branch with or without the Xamarin.Forms framework.

To initialize **without** the framework:

1. Right-click on the .Droid project and select  **Add → New File**.
2. Select **General → Empty File**.
3. Name the file `Application.cs`.
4. Add the following code:

```
using System;
        using Android.App;
        using Android.Content;
        using Android.Runtime;
        using BranchXamarinSDK;

        // Replace `TestAndroidApp` with actual name of your app
        namespace TestAndroidApp.Droid
        {
        [Application(AllowBackup = true, Icon = "@mipmap/icon", Label = "@string/app_name")]
        [MetaData("io.branch.sdk.auto_link_disable", Value = "false")]
        [MetaData("io.branch.sdk.TestMode", Value = "true")]
        [MetaData("io.branch.sdk.BranchKey", Value = "@string/branch_key")]

        public class TestAndroidApp : Application
        {
        public TestAndroidApp(IntPtr javaReference, JniHandleOwnership transfer) : base(javaReference, transfer)
        {
        }

        public override void OnCreate()
        {
        base.OnCreate();
        BranchAndroid.GetAutoInstance(this.ApplicationContext);
        }
        }
        }
```

| Key | Value |
| --- | --- |
| `io.branch.sdk.TestMode` | Setting this parameter to `true` enables Debug Mode, which causes simple uninstall/reinstalls of the app to trigger Install events. Be sure to disable this before deploying to production. Note that enabling Debug Mode on iOS also forces the app to use the Branch test key if this key has been added to the project. Apps running with a test key will be unable to receive data from Branch Deep Links created with the live key. |
| `io.branch.sdk.BranchKey` | The app's Branch key. Both a live key and a test key can be added to the `Strings.xml` file. When test mode is enabled, the app will automatically use the test key if one has been specified. |

##### Create an Activity to Handle Branch Events

1. Right-click on the .Droid project and select **Add → New File**.
2. Select **Android →Activity**.
3. Rename the file `BranchActivity.cs`.
4. Add the following code:

```
using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Text;
        using Newtonsoft.Json;
        using BranchXamarinSDK;

        using Android.App;
        using Android.Content;
        using Android.OS;
        using Android.Runtime;
        using Android.Views;
        using Android.Widget;

        // Replace `TestAndroidApp` with actual name of your app
        namespace TestAndroidApp.Droid
        {
        [Activity(Label = "BranchActivity")]
        public class BranchActivity : Activity

        {
        private string logString = "";

        protected override void OnCreate(Bundle savedInstanceState)
        {
        base.OnCreate(savedInstanceState);

        LogMessage("Branch initialization completed: ");

        Dictionary<string, object> data = JsonConvert.DeserializeObject<Dictionary<string, object>>(Intent.GetStringExtra("BranchData"));
        foreach (var key in data.Keys)
        {
        LogMessage(key + " : " + data[key].ToString());
        }
        }

        #region Utils

        void LogMessage(string message)
        {
        Console.WriteLine(message);
        logString += DateTime.Now.ToLongTimeString() + "> " + message + "\n";
        }

        #endregion
        }
        }
```

##### Create an Activity to Handle Branch Errors

1. Right-click on the .Droid project and select **Add → New File**.
2. Select **Android → Activity**.
3. Rename the file `BranchErrorActivity.cs`.
4. Add the following code:

```
using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Text;

        using Android.App;
        using Android.Content;
        using Android.OS;
        using Android.Runtime;
        using Android.Views;
        using Android.Widget;

        // Replace `TestAndroidApp` with actual name of your app
        namespace TestAndroidApp.Droid
        {
        [Activity(Label = "BranchErrorActivity")]
        public class BranchErrorActivity : Activity
        {
        private string logString = "";

        protected override void OnCreate(Bundle savedInstanceState)
        {
        base.OnCreate(savedInstanceState);

        LogMessage("Branch initialization failed");
        LogMessage("Error code: " + Intent.Extras.GetInt("ErrorCode").ToString());
        LogMessage(Intent.Extras.GetString("ErrorMessage"));
        }

        #region Utils

        void LogMessage(string message)
        {
        Console.WriteLine(message);
        logString += DateTime.Now.ToLongTimeString() + "> " + message + "\n";
        }

        #endregion
        }
        }
```

##### Initialize Branch and Configure Branch Session Management

Branch must be initialized in the `OnCreate` method of either the `Application` class or the first Activity launched by the app. The `OnNewIntent` method must be added to retrieve the latest link identifier when the app becomes active due to a Branch Deep Link click.

If initialization is successful, the `InitSessionComplete` method will be invoked. If initialization is unsuccessful, the `SessionRequestError` method will be invoked. Branch Deep Link routing logic should be located in the `InitSessionComplete` method.

In the code example below the following Branch initialization and session management steps have been added to `MainActivity.cs`:

1. An Activity to respond to the app's URI Scheme is created and launched in `singleTask` mode.
2. The `OnCreate` method is overwritten and initializes the Branch SDK.
3. The `OnNewIntent` method is overwritten.
4. An `InitSessionComplete` method is added for processing Branch Deep Link information. This is where Deep Link routing logic should live.
5. A `SessionRequestError` method is added to handle situations where Branch fails to initialize.

```
using Android.App;
        using Android.Widget;
        using Android.OS;
        using BranchXamarinSDK;
        using System;
        using System.Collections.Generic;
        using Android.Content;
        using Newtonsoft.Json;

        // Replace `TestAndroidApp` with actual name of your app
        namespace TestAndroidApp.Droid
        {
        [Activity(Label = "TestAndroidApp", MainLauncher = true, Icon = "@mipmap/icon", LaunchMode = Android.Content.PM.LaunchMode.SingleTask)]

        [IntentFilter(new[] { "android.intent.action.VIEW" },
        Categories = new[] { "android.intent.category.DEFAULT", "android.intent.category.BROWSABLE" },
        DataScheme = "testandroidapp",
        DataHost = "open")]

        [IntentFilter(new[] { "android.intent.action.VIEW" },
        Categories = new[] { "android.intent.category.DEFAULT", "android.intent.category.BROWSABLE" },
        DataScheme = "https",
        DataHost = "testandroidapp.app.link")]

        [IntentFilter(new[] { "android.intent.action.VIEW" },
        Categories = new[] { "android.intent.category.DEFAULT", "android.intent.category.BROWSABLE" },
        DataScheme = "https",
        DataHost = "testandroidapp-alternate.app.link")]

        public class MainActivity : Activity, IBranchSessionInterface
        {

        protected override void OnCreate(Bundle savedInstanceState)
        {
        base.OnCreate(savedInstanceState);

        BranchAndroid.Init(this, Resources.GetString(Resource.String.branch_key), this);
        }

        // Ensure we get the updated link identifier when the app becomes active
        // due to a Branch link click after having been in the background
        protected override void OnNewIntent(Intent intent)
        {
        this.Intent = intent;
        }

        public void InitSessionComplete(Dictionary<string, object> data)
        {
        //Handle custom logic based on deep link data in InitSessionComplete

        //View all the link data in the console
        Console.WriteLine("My Link Data: " + JsonConvert.SerializeObject(data));

                    //Preferred method: use BranchActivity created previously to handle the link data
        //Will need to update BranchActivity with desired custom logic, to open the correct page in the app
        var intent = new Intent(this, typeof(BranchActivity));
        intent.PutExtra("BranchData", JsonConvert.SerializeObject(data));

        StartActivity(intent);var intent = new Intent
        }

        public void SessionRequestError(BranchError error)
        {
        Console.WriteLine("Branch session initialization error: " + error.ErrorCode);
        Console.WriteLine(error.ErrorMessage);

        var intent = new Intent(this, typeof(BranchErrorActivity));
        intent.PutExtra("ErrorCode", error.ErrorCode);
        intent.PutExtra("ErrorMessage", error.ErrorMessage);

        StartActivity(intent);
        }
        }
        }
```

### 4b. Initialize Branch With Xamarin.Forms

You can initialize Branch with or without the Xamarin.Forms framework.

To initialize **with** the framework:

##### Create a Class for Branch Session Handling

Branch initializes asynchronously, with Branch link parameters being returned following a network call to Branch. If initialization is successful, the `InitSessionComplete` method will be invoked. If initialization is unsuccessful, the `SessionRequestError` method will be invoked. Branch Deep Link routing logic should be located in the `InitSessionComplete` method.

1. Right-click on the C# project and select **Add → New File**.
2. Select **General → Empty Class**.
3. Rename the file `TestXamarinFormsApp.cs`.
4. Add the following code:

```
using BranchXamarinSDK;
        using System.Collections.Generic;
        using System.ComponentModel;
        using Xamarin.Forms;

        // Replace `TestXamarinFormsApp` with actual name of your app
        namespace TestXamarinFormsApp
        {
        public class TestXamarinFormsApp : Application, IBranchSessionInterface
        {

        public TestXamarinFormsApp()
        {
        }

        #region IBranchSessionInterface implementation

        public void InitSessionComplete(Dictionary<string, object> data)
        {
        }

        public void SessionRequestError(BranchError error)
        {
        }

        #endregion
        }
        }
```

##### Create a Class for Handling Link Data

Branch stores link data in an object referred to as the [Branch Universal Object](create-branch-objects-and-events.md#branch-universal-object), or BUO.

1. Right-click on the C# project and select **Add → New File**.
2. Select **General →Empty Class**.
3. Rename the file `TestXamarinFormsAppBUO.cs`.
4. Add the following code:

```
using BranchXamarinSDK;
        using System.Collections.Generic;
        using System.ComponentModel;
        using Xamarin.Forms;

        // Replace `TestXamarinFormsApp` with actual name of your app
        namespace TestXamarinFormsApp
        {
        public class TestXamarinFormsAppBUO : Application, IBranchBUOSessionInterface
        {

        public TestXamarinFormsAppBUO()
        {
        }

        #region IBranchBUOSessionInterface implementation

        public void InitSessionComplete(BranchUniversalObject buo, BranchLinkProperties blp)
        {
        }

        public void SessionRequestError(BranchError error)
        {
        }

        #endregion
        }
        }
```

##### Configure Application Class

Within the .Droid project's `Application` class:

1. Set the Branch SDK's initialization parameters.
2. Override the `OnCreate()` method so it calls the `BranchAndroid.GetAutoInstance` method.

If an `Application` class does not already exist for the project, create one:

1. Right-click on the .Droid project and select **Add →New File**.
2. Select **General → Empty Class**.
3. Name the file the same name as your app, for example `TestXamarinFormsApp`.
4. Add the following code:

```
using System;
        using Android.App;
        using Android.Content;
        using Android.Runtime;
        using BranchXamarinSDK;

        // Replace `TestXamarinFormsApp` with actual name of your app
        namespace TestXamarinFormsApp.Droid
        {

        [Application (AllowBackup = true, Icon = "@drawable/icon", Label = "@string/app_name")]
        [MetaData("io.branch.sdk.auto_link_disable", Value = "false")]
        [MetaData("io.branch.sdk.TestMode", Value = "true")]
        [MetaData("io.branch.sdk.BranchKey", Value = "@string/branch_key")]

        public class App : Application
        {
        public App(IntPtr javaReference, JniHandleOwnership transfer) : base(javaReference, transfer)
        {
        }

        public override void OnCreate()
        {
        base.OnCreate();
        BranchAndroid.GetAutoInstance(this.ApplicationContext);
        }
        }
        }
```

| Key | Value |
| --- | --- |
| `io.branch.sdk.TestMode` | Setting this parameter to `true` enables Debug Mode, which causes simple uninstall/reinstalls of the app to trigger Install events. Be sure to disable this before deploying to production. Note that enabling Debug Mode on Android also forces the app to use the Branch test key if this key has been added to the project. Apps running with a test key will be unable to receive data from Branch Deep Links created with the live key. |
| `io.branch.sdk.BranchKey` | The app's Branch key. Both a live key and a test key can be added to the `Strings.xml` file. When test mode is enabled, the app will automatically use the test key if one has been specified. |

##### **Initialize Branch**

```
using System;

        using Android.App;
        using Android.Content;
        using Android.Content.PM;
        using Android.Runtime;
        using Android.Views;
        using Android.Widget;
        using Android.OS;

        using BranchXamarinSDK;
        using TestXamarinFormsApp;

        // Replace `TestXamarinFormsApp` with actual name of your app
        namespace TestXamarinFormsApp.Droid
        {
        [Activity(Label = "TestXamarinFormsApp.Droid", LaunchMode = LaunchMode.SingleTask, Icon = "@drawable/icon", Theme = "@style/MyTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]

        [IntentFilter(new[] { "android.intent.action.VIEW" },
        Categories = new[] { "android.intent.category.DEFAULT", "android.intent.category.BROWSABLE" },
        DataScheme = "testxamarinformsapp",
        DataHost = "open")]

        [IntentFilter(new[] { "android.intent.action.VIEW" },
        Categories = new[] { "android.intent.category.DEFAULT", "android.intent.category.BROWSABLE" },
        DataScheme = "https",
        DataHost = "testxamarinformsapp.app.link")]

        public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity
        {
        protected override void OnCreate(Bundle savedInstanceState)
        {
        base.OnCreate(savedInstanceState);

        global::Xamarin.Forms.Forms.Init(this, savedInstanceState);

        TestXamarinFormsAppBUO linkData = new TestXamarinFormsAppBUO();
        BranchAndroid.Init(this, GetString(Resource.String.branch_key), linkData);
        LoadApplication(linkData);
        }

        protected override void OnNewIntent(Intent intent)
        {
        this.Intent = intent;
        }
        }
        }
```

## Troubleshoot

#### iOS

###### Deep Link Testing

To test whether your app is properly configured to support Branch Deep Links:

###### NuGet Package Failures

Adding required NuGet packages to the C# project may fail if the project has not been configured to use PCL 4.5 - Profile78. To solve this:

1. Right-click on the project name and select **Options**.
2. Browse the menu to **Build → General**.
3. Change the **Current Profile** to **PCL 4.5 - Profile78** and try again.

###### Provisioning Profile Failures

Xamarin automatically populates the Bundle Identifier field in the `Info.plist` file with an all-lowercase value derived from the app's name. This value is in fact case-sensitive and must match the value in the Apple Developer Portal precisely. The default Xamarin configuration may work when there are no entitlements configured, and then suddenly begin failing after entitlements have been added.

This issue can be resolved by ensuring that the Bundle Identifier in the `Info.plist` matches the Bundle Identifier shown on the Apple Developer Portal. To make this change:

1. Open the `Info.plist` file.
2. Enter the app's Bundle Identifier from the Apple Developer Portal in the Bundle Identifier field.

#### Android

###### Deep Link Testing

To test whether your app is properly configured to support Branch Deep Links:

###### Linking Errors During Build

The `Newtonsoft.Json` NuGet package is automatically added to a project when the `Branch-Xamarin-Linking-SDK` package is added. There is a known issue with this package that results in linking errors when building a project:

*error XA0009: Error while loading assembly: /Users/david/Projects/TestXamarinFormsApp/Droid/obj/Debug/android/assets/mscorlib.dll*

To resolve this issue:

1. Right-click on the project and select **Options**.
2. Go to **Android Build** and select the **Linker** tab.
3. Select **Release**.
4. Go to the **Ignore Assemblies** box.
5. Add **System.Core** to the assemblies.
6. Rebuild the app.

## FAQs

<details>
<summary>Why am I receiving the error “Value can not be null error in Xamarin SDK”?</summary>

The error usually comes when you are using "IBranchBUOSessionInterface" in our Xamarin SDK. This is currently a bug and the workaround available right now is to use "IBranchSessionInterface" only which is the non-BUO method.

</details>
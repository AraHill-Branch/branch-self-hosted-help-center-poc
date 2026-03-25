---
title: "Adobe Launch iOS SDK"
slug: adobe-launch-ios-sdk
---

Add the power of Branch Deep Linking and Attribution to your Adobe Marketing Cloud app. With Branch's Linking platform, mobile developers and marketers can grow their mobile business with world class Deep Links and Attribution.

### Benefits

1. All events tracked with the Adobe SDK will automatically be sent to Branch without any extra work.
2. All core Branch functionality is accessible.
3. The SDK will automatically pick up the Adobe IDs.

### Requirements

- iOS 10+
- Adobe Core Platform

::: info iOS 14 Compatible
In order to give you full control over the user experience, the Branch SDK will not trigger the IDFA permission modal.

However, we will still collect and use IDFAs when available if you do choose to trigger the modal.

Learn more [here](https://help.branch.io/faq/docs/sdk-faqs).
:::

::: tip Branch iOS SDK Not Required
As the Adobe Branch extension is a wrapper that automatically includes a sub-dependency for the Branch iOS SDK, it is neither necessary nor recommended to implement the Branch iOS SDK separately in your app.
:::

### Example Apps

An example app can be found in the AdobeBranchExtension-iOS repository, in the `Examples/AdobeBranchExample` project.

- [AdobeBranchExample Project](https://github.com/BranchMetrics/AdobeBranchExtension-iOS/tree/master/Examples/AdobeBranchExample)
- [AdobeBranchExtension-iOS Repository](https://github.com/BranchMetrics/AdobeBranchExtension-iOS)

### Installation & Usage

::: danger Note
The Adobe Experience Platform (AEP) SDK and AdobeMobileLibrary cannot coexist in the same project.
:::

Here's a brief outline of how to use the `AdobeBranchExtension` in your app:

1. Configure your app and get a Branch API Key in the Branch [Dashboard](https://branch.dashboard.branch.io/account-settings/app).
2. [Add](ios-basic-integration.md#3-configure-associated-domains) associated domains for Universal Links.
3. [Configure](ios-basic-integration.md#4-configure-infoplist) your Info.plist file with an app URI scheme and your Branch Key.
4. In the Adobe dashboard, activate Branch and add your Branch Key to your app's configuration:

   
5. Add the AdobeBranchExtension to your app's Podfile using the `pod 'AdobeBranchExtension'`command.
6. Run `pod install` and `pod update` to install the latest version of the extension.
7. Register `AdobeBranchExtension` with `AEPMobileCore` in the `didFinishLaunchingWithOptions()` Branch SDK method:

::: code-group

```swift [Swift]
#import "AdobeBranchExtension/AdobeBranchExtension.h"

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let appState = application.applicationState            
    MobileCore.registerExtensions([AdobeBranchExtension.self, /*Other AEP SDK's*/], {
        MobileCore.configureWith(appId: "yourAppId")
        if appState != .background {
          // Only start lifecycle if the application is not in the background
          MobileCore.lifecycleStart(additionalContextData: ["contextDataKey": "contextDataVal"])
        }
    })
  ...
  return true // Important! If you return `false` iOS will not handle Deep Links as expected
}
```

```objectivec [Objective-C]
#import <AdobeBranchExtension/AdobeBranchExtension.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	const UIApplicationState appState = application.applicationState;
	[AEPMobileCore setLogLevel: AEPLogLevelDebug];
	[AEPMobileCore registerExtensions:@[AdobeBranchExtension.class /*Other AEP SDK's*/] completion:^{
	[AEPMobileCore configureWithAppId: @"yourAppId"];
		if (appState != UIApplicationStateBackground) {
			// Only start lifecycle if the application is not in the background
			[AEPMobileCore lifecycleStart:@{@"contextDataKey": @"contextDataVal"}];
		}
	}];
	...
	return YES; // Important! If you return `NO` iOS will not handle Deep Links as expected
}
```

:::

8. Add the Branch Deep Link routers and receivers in your AppDelegate class in three places, as shown below:

::: code-group

```swift [Swift]
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
	// Register your AdobeBranchExtension with AEPCore here

	// Handle your Branch deep link routing in the callback
	AdobeBranchExtension.initSession(withLaunchOptions: launchOptions) { params, error in
		if error == nil, let clickedBranchLink = params?["+clicked_branch_link"] as? Bool, clickedBranchLink {
			// Handle Branch Link data (route user, show alert, etc)
		}
	}
}

// Handling URL opening
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    AdobeBranchExtension.application(app, open: url, options: options)
    return true
}

// Handling User Activity
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    AdobeBranchExtension.application(application, continue: userActivity)
    return true
}
```

```objectivec [Objective-C]
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

	// Register your AdobeBranchExtension with AEPCore here

	// Handle your Branch deep link routing in the callback
	[AdobeBranchExtension initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary * _Nullable params, NSError * _Nullable error) {
	    if (!error && params && [params[@"+clicked_branch_link"] boolValue]) {
	        // Handle Branch Link data (route user, show alert, etc)
	    }
	}];
}

// Handle URL opening
- (BOOL)application:(UIApplication *)application
        openURL:(NSURL *)url
        options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    [AdobeBranchExtension application:application openURL:url options:options];
    return YES;
}

// Handle User Activity
- (BOOL)application:(UIApplication *)application
        continueUserActivity:(NSUserActivity *)userActivity
        restorationHandler:(void(^)(NSArray<id<UIUserActivityRestoring>> * __nullable restorableObjects))restorationHandler {
    [AdobeBranchExtension application:application continueUserActivity:userActivity];
    return YES;
}
```

:::

For best practices related to routing, visit Branch's Deep Link Routing [guide](https://help.branch.io/).

#### NativeLink™ Deferred Deep Linking

Use iOS pasteboard to enable deferred deep linking via Branch NativeLink™.

::: warning Prerequisites
Minimum underlying Branch iOS SDK Version: v1.39.4

To use this feature you must **either**:

- [Enable NativeLink™ Deep Linking](configure-default-link-behaviors.md#3-ios-default-link-behavior) in the Branch Dashboard [Configuration tab](https://dashboard.branch.io/configuration/general)  
  **or**
- Manually configure your Branch Link to use [$ios\_nativelink](creating-a-deep-link.md#deep-linking)
:::

To use NativeLink™, implement one of the [pasteboard opt-in options](ios-advanced-features.md#nativelink-deferred-deep-linking) in the native iOS SDK code.

Please note that deferred deep linking is part of our Engagement package. Learn more on our pricing [page](packaging.md).

### Implementing Branch Features

Once you've added the AdobeBranchExtension and Branch, you can always use Branch features directly. You can learn about using the Branch features in the Branch documentation for [iOS.](ios-sdk-overview.md)

### Register `AEPCore`

There are two ways to register with `AEPCore`:

1. Access the hosted Adobe config by directly passing in the App ID:

::: code-group

```swift [Swift]
// Option 1 - Access the Hosted Adobe Config by directly passing the Adobe App ID
AEPMobileCore.configure(withAppId: "replacewithyouradobeappid")
```

```objectivec [Objective-C]
// Option 1 - Access the Hosted Adobe Config by directly passing the Adobe App ID
[AEPMobileCore configureWithAppId:@"replacewithyouradobeappid"];
```

:::

2. Configuring at runtime by updating the `AEPCore` configuration:

::: code-group

```swift [Swift]
//Option 2 - Configure at runtime
func setupTestConfig() {
	var config: [String: Any] = [:]
	
	// ============================================================
	// global
	// ============================================================
	config["global.privacy"] = "optedin"
	config["global.ssl"] = true
	
	// ============================================================
	// Branch
	// ============================================================
	config["branchKey"] = "replacewithyourbranchkey"
	
	// ============================================================
	// acquisition
	// ============================================================
	config["acquisition.appid"] = ""
	config["acquisition.server"] = ""
	config["acquisition.timeout"] = 0
	
	// ============================================================
	// analytics
	// ============================================================
	config["analytics.aamForwardingEnabled"] = false
	config["analytics.batchLimit"] = 0
	config["analytics.offlineEnabled"] = true
	config["analytics.rsids"] = ""
	config["analytics.server"] = ""
	config["analytics.referrerTimeout"] = 0
	
	// ============================================================
	// audience manager
	// ============================================================
	config["audience.server"] = ""
	config["audience.timeout"] = 0
	
	// ============================================================
	// identity
	// ============================================================
	config["experienceCloud.server"] = ""
	config["experienceCloud.org"] = ""
	config["identity.adidEnabled"] = false
	
	// ============================================================
	// target
	// ============================================================
	config["target.clientCode"] = ""
	config["target.timeout"] = 0
	
	// ============================================================
	// lifecycle
	// ============================================================
	config["lifecycle.sessionTimeout"] = 0
	config["lifecycle.backdateSessionInfo"] = false
	
	// ============================================================
	// rules engine
	// ============================================================
	config["rules.url"] = "pathtoyourrulesfile"
	config["com.branch.extension/deepLinkKey"] = "pictureId"
	config["deepLinkKey"] = "pictureId"
	
	AEPMobileCore.updateConfiguration(config)
}
```

```objectivec [Objective-C]
//Option 2 - Configure at runtime
- (void) setupTestConfig {
	NSMutableDictionary *config = [NSMutableDictionary dictionary];

	// ============================================================
	// global
	// ============================================================
	config[@"global.privacy"] = @"optedin";
	config[@"global.ssl"] = @true;

	// ============================================================
	// Branch
	// ============================================================
	config[@"branchKey"] = @"replacewithyourbranchkey";

	// ============================================================
	// acquisition
	// ============================================================
	config[@"acquisition.appid"] = @"";
	config[@"acquisition.server"] = @"";
	config[@"acquisition.timeout"] = @0;

	// ============================================================
	// analytics
	// ============================================================
	config[@"analytics.aamForwardingEnabled"] = @false;
	config[@"analytics.batchLimit"] = @0;
	config[@"analytics.offlineEnabled"] = @true;
	config[@"analytics.rsids"] = @"";
	config[@"analytics.server"] = @"";
	config[@"analytics.referrerTimeout"] = @0;

	// ============================================================
	// audience manager
	// ============================================================
	config[@"audience.server"] = @"";
	config[@"audience.timeout"] = @0;

	// ============================================================
	// identity
	// ============================================================
	config[@"experienceCloud.server"] = @"";
	config[@"experienceCloud.org"] = @"";
	config[@"identity.adidEnabled"] = @false;

	// ============================================================
	// target
	// ============================================================
	config[@"target.clientCode"] = @"";
	config[@"target.timeout"] = @0;

	// ============================================================
	// lifecycle
	// ============================================================
	config[@"lifecycle.sessionTimeout"] = @0;
	config[@"lifecycle.backdateSessionInfo"] = @false;

	// ============================================================
	// rules engine
	// ============================================================
	config[@"rules.url"] = @"pathtoyourrulesfile";
	config[@"com.branch.extension/deepLinkKey"] = @"pictureId";
	config[@"deepLinkKey"] = @"pictureId";

	[AEPMobileCore updateConfiguration:config];
	}
```

:::

### Enable Event Sharing

To enable Event Sharing between Adobe and Branch, add the following line of code and specify which event types and sources you want forwarded to Branch:

::: code-group

```swift [Swift]
AdobeBranchExtension.configureEventTypes(["com.adobe.eventType.analytics"], andEventSources: ["com.adobe.eventSource.responseContent"])
```

```objectivec [Objective-C]
[AdobeBranchExtension configureEventTypes:@[@"com.adobe.eventType.analytics"] andEventSources:@[@"com.adobe.eventSource.responseContent"]];
```

:::

### Register Event Allow or Exclusion List

::: warning Conflict
You can define **either** an allow list **or** an exclusion list of events but **you can't define both**.
:::

You can create an allow list and add event types to it:

::: code-group

```swift [Swift]
if AdobeBranchExtension.configureEventAllowList(["VIEW"], error: &error) {
	print("AdobeBranchExtension AllowList configured")
} else if let error = error {
	print(error)
}
```

```objectivec [Objective-C]
if ([AdobeBranchExtension configureEventAllowList:@[@"VIEW"] error:&error]) {
	NSLog(@"AdobeBranchExtension AllowList configured");
} else {
	NSLog(@"%@", error);
}
```

:::

**Or** you can create an exclusion list and add event types to it:

::: code-group

```swift [Swift]
if AdobeBranchExtension.configureEventExclusionList(["VIEW"], error: &error) {
	print("AdobeBranchExtension ExclusionList configured")
} else if let error = error {
	print(error)
}
```

```objectivec [Objective-C]
if ([AdobeBranchExtension configureEventExclusionList:@[@"VIEW"] error:&error]) {
	NSLog(@"AdobeBranchExtension ExclusionList configured");
} else {
	NSLog(@"%@", error);
}
```

:::

### Disable Event Sharing

To disable Event Sharing between Adobe and Branch, add the following line of code:

::: code-group

```swift [Swift]
AdobeBranchExtension.configureEventTypes(nil, andEventSources: nil)
```

```objectivec [Objective-C]
[AdobeBranchExtension configureEventTypes:nil andEventSources:nil];
```

:::

### Automatic: Track Action and State

When you track actions and states in Adobe Launch, the action and state messages are sent to Branch too and shown on the Branch Dashboard. This allows you to track the effectiveness of Branch Deep Link campaigns and viral sharing in your app's actions.

Here's an example of tracking app state via Adobe Launch:

::: code-group

```swift [Swift]
AEPMobileCore.trackState("VIEW", data: [
	"name": self.product.name,
	"revenue": "200.0",
	"currency": "USD"
])
```

```objectivec [Objective-C]
[AEPMobileCore trackState:@"VIEW" data:@{
	@"name":        self.product.name,
	@"revenue":     @"200.0",
	@"currency":    @"USD"
}];
```

:::

### Register Extension

Once the allow list or exclusion list of event names has been configured, the `AdobeBranchExtension` needs to be registered.

::: code-group

```swift [Swift]
//Register AdobeBranchExtension
AEPMobileCore.registerExtension(AdobeBranchExtension.self) {
	print("AdobeBranchExtension Registered!")
}
```

```objectivec [Objective-C]
// Register AdobeBranchExtension
[AEPMobileCore registerExtension:AdobeBranchExtension.class completion:^{
	NSLog(@"AdobeBranchExtension Registered!");
}];
```

:::
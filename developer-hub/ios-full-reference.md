---
title: "iOS Full Reference"
slug: ios-full-reference
---

## getInstance

| Method | Description |
| --- | --- |
| [(Branch \*)getInstance;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get the live, global Branch instance. |

#### Example Usage

::: code-group

```swift [Swift]
let branch: Branch = Branch.getInstance()
```

```objectivec [Objective-C]
Branch *branch = [Branch getInstance];
```

:::

---

## initSessionWithLaunchOptions

| Method | Description |
| --- | --- |
| [(void)initSessionWithLaunchOptions:(nullable NSDictionary \*)options andRegisterDeepLinkHandler:(nullable callbackWithParams)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Initialize a Branch session with your app's specific launch options, and handle the completion with a `callbackWithParams` object. |
| [(void)initSessionWithLaunchOptions:(nullable NSDictionary \*)options andRegisterDeepLinkHandlerUsingBranchUniversalObject:(nullable callbackWithBranchUniversalObject)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Initialize a Branch session with your app's specific launch options, and handle the completion with a `callbackWithBranchUniversalObject` object. |

| Argument | Type | Description |
| --- | --- | --- |
| `options` | `NSDictionary` | The launch options provided by your AppDelegate file's `didFinishLaunchingWithOptions:` method. |
| `callback` | `callbackWithParams` or `callbackWithBranchUniversalObject` | A callback that is called when the session is opened. This will be called multiple times during the app's life, including any time the app goes through a background/foreground cycle. |

#### Example Usage

::: code-group

```swift [Swift]
// Within the AppDelegate
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
  let branch: Branch = Branch.getInstance()
  branch?.initSession(launchOptions: launchOptions, deepLinkHandler: { params, error in
    if error == nil {
        // Params are the deep linked params associated with the link that the user clicked
        print("params: %@", params.description)
    }
   })
  return true
}

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    // Pass URL to the "handle deep link" call
    let branchHandled = Branch.getInstance().application(
        application,
        open: url,
        options: options
    )
    if (!branchHandled) {
        // If not handled by Branch, do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    }

    return true
}

func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    let handledByBranch = Branch.getInstance().continue(userActivity)

    return handledByBranch
}
```

```objectivec [Objective-C]
// Within the AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    Branch *branch = [Branch getInstance];
    [branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
    	// Route user based on params
    }];
    return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    BOOL branchHandled =
        [[Branch getInstance]
            application:application
                openURL:url
                options:options];
    if (!branchHandled) {
        // Do other deep link routing for the Facebook SDK, Pinterest SDK, etc.
    }
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler {
    BOOL handledByBranch = [[Branch getInstance] continueUserActivity:userActivity];

    return handledByBranch;
}
```

:::

#### Parameters Returned

**Note**: The `~` symbol denotes analytics and `+` denotes information added by Branch.

| Parameter | Description |
| --- | --- |
| `~channel` | The channel on which the link was shared, specified at Branch Link creation time. |
| `~feature` | The feature, such as `invite` or `share`, specified at Branch Link creation time. |
| `~tags` | Any tags, specified at Branch Link creation time. |
| `~campaign` | The campaign the link is associated with, specified at Branch Link creation time. |
| `~stage` | The stage, specified at Branch Link creation time. |
| `~creation_source` | Where the Branch Link was created ('API', 'Dashboard', 'SDK', 'iOS SDK', 'Android SDK', or 'Web SDK'). |
| `+match_guaranteed` | True or false as to whether the match was made with 100% accuracy. |
| `+referrer` | The referrer for the Branch Link click, if a Branch Link was clicked. |
| `+phone_number` | The phone number of the user, if the user texted themself the app. |
| `+is_first_session` | Denotes whether this is the first session (install) or any other session (open). |
| `+clicked_branch_link` | Denotes whether or not the user clicked a Branch Link that triggered this session. |
| `+click_timestamp` | Epoch timestamp of when the click occurred. |

---

## handleDeepLink

**Warning**: Handling a new Branch Deep Link in your app will clear the current session data and a new referred "open" will be attributed.

| Method | Description |
| --- | --- |
| [(BOOL)handleDeepLink:(nullable NSURL \*)url;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Allow Branch to handle a link that opens the app, and to parse the parameters from it. Returns `true` if Branch handled the link. |

| Argument | Type | Description |
| --- | --- | --- |
| `url` | `NSURL` | The URL that caused the app to be opened. |

#### Example Usage

::: code-group

```swift [Swift]
// The following call would return `false`
Branch.getInstance().handleDeepLink("myapp://")

// The following call would return `true`
Branch.getInstance().handleDeepLink("myapp://open?link_click_id=12345")
```

```objectivec [Objective-C]
// The following call would return `YES`
NSURL *URL = [NSURL URLWithString:@"myapp://open?link_click_id=12345"];
[[Branch getInstance] handleDeepLink:URL];
```

:::

---

## continueUserActivity

| Method | Description |
| --- | --- |
| [(BOOL)continueUserActivity:(nullable NSUserActivity \*)userActivity;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Allow Branch to handle restoration from an `NSUserActivity`. Returns `true` if Branch handled the link. |

| Argument | Type | Description |
| --- | --- | --- |
| `userActivity` | `NSUserActivity` | The `NSUserActivity` that caused the app to be opened. |

#### Example Usage

::: code-group

```swift [Swift]
func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
  Branch.getInstance().continueUserActivity(userActivity);
  return true
}
```

```objectivec [Objective-C]
- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *))restorationHandler {
    [[Branch getInstance] continueUserActivity:userActivity];
    return YES;
}
```

:::

---

## application

| Method | Description |
| --- | --- |
| [(BOOL)application:(nullable UIApplication )application openURL:(nullable NSURL )url options:(nullable NSDictionary<UIApplicationOpenURLOptionsKey,id> \*)options;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Allow Branch to open the URL that gets passed to it. This is the preferred Branch method to call inside your `application:openURL:options:` method. |

| Argument | Type | Description |
| --- | --- | --- |
| `application` | `UIApplication` | The application that was passed to your app delegate. |
| `url` | `NSURL` | The URL that was passed to your app delegate. |
| `options` | `NSDictionary` | The launch options dictionary that was passed to your app delegate. |

#### Example Usage

::: code-group

```swift [Swift]
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    Branch.getInstance().application(app, open: url, options:options)
    return true
}
```

```objectivec [Objective-C]
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
    return [[Branch getInstance] application:app openURL:url options:options];
}
```

:::

---

## handlePushNotification

| Method | Description |
| --- | --- |
| [(void)handlePushNotification:(nullable NSDictionary \*)userInfo;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Allow Branch to handle a push notification with a Branch Link. When creating a push notification, specify the Branch Link as an `NSString` for the `@"branch"` key. |

| Argument | Type | Description |
| --- | --- | --- |
| `userInfo` | `NSDictionary` | The application that was passed to your app delegate. |

#### Example Usage

::: code-group

```swift [Swift]
// NSDictionary userInfo = @{@"branch": @"https://bnc.lt/...", ... };
// NSDictionary userInfo = @{@"branch": @"https://app.link/...", ... };

Branch.getInstance().handlePushNotification(response.notification.request.content.userInfo)
```

```objectivec [Objective-C]
// NSDictionary userInfo = @{@"branch": @"https://bnc.lt/...", ... };
// NSDictionary userInfo = @{@"branch": @"https://app.link/...", ... };

[[Branch getInstance] handlePushNotification:userInfo];
```

:::

---

## enableLogging

| Method | Description |
| --- | --- |
| [(void)enableLogging;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Enable sending debug messages to NSLog (the Apple System Log facility). **Important**: Branch recommends that you use this method with your Branch test key and that you remove the method call before releasing to production. |

| Argument | Type | Description |
| --- | --- | --- |
| `userInfo` | `NSDictionary` | The application that was passed to your app delegate. |

#### Example Usage

::: code-group

```swift [Swift]
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
  // Add `enableLogging` before `initSesssion` in AppDelegate
  Branch.enableLogging()
  
	// Listener for Branch Deep Link data
	Branch.getInstance().initSession(launchOptions: launchOptions) { (params, error) in
		// Do stuff here with Deep Link data (nav to page, display content, etc)
		print(params as? [String: AnyObject] ?? {})
	}
	return true
}
```

```objectivec [Objective-C]
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	// Add `enableLogging` before `initSesssion` in AppDelegate
	[Branch enableLogging];

	// Listener for Branch Deep Link data
	[[Branch getInstance] initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary * _Nonnull params, NSError * _Nullable error) {
		// Do stuff here with Deep Link data (nav to page, display content, etc)
		NSLog(@"%@", params);
	}];
	return YES;
}
```

:::

---

## setAPIURL

| Method | Description |
| --- | --- |
| [(void)setAPIUrl:(NSString \*)url](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Branch.m) | Set the Branch API URL globally for all Branch operations. |

| Argument | Type | Description |
| --- | --- | --- |
| `url` | `NSString` | The new API URL to be used by Branch. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.setAPIURL("https://api3.branch.io")
```

```plaintext [Objective-C]
[Branch setAPIURL:@"https://api3.branch.io"];
```

:::

---

## validateSDKIntegration

| Method | Description |
| --- | --- |
| [(void)validateSDKIntegration;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Check that you've added the Branch iOS SDK successfully to your app and are able to handle Branch Deep Links. After you run your app, check the project's Xcode logs to make sure all the SDK Integration tests pass. See [SDK Integration Validator](.html) for more information. **Warning**: this method should **not** be used in production - it is for debugging purposes only. |

#### Example Usage

::: code-group

```swift [Swift]
// Check your Xcode logs to make sure all the SDK Integration tests pass
// Make sure to comment out or remove validateSDKIntegration in your production build
Branch.getInstance().validateSDKIntegration()
```

```objectivec [Objective-C]
// Check your Xcode logs to make sure all the SDK Integration tests pass
// Make sure to comment out or remove validateSDKIntegration in your production build
[[Branch getInstance] validateSDKIntegration];
```

:::

---

## addAllowedScheme

| Method | Description |
| --- | --- |
| [(void)addAllowedScheme:(nullable NSString \*)scheme;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Allow a URI scheme to be tracked by Branch. Defaults to all schemes. |

| Argument | Type | Description |
| --- | --- | --- |
| `scheme` | `NSString` | URI scheme allowed to be tracked, for example`@"http"`, `@"https"`, or `@"myapp"`. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().addAllowedScheme("https")
```

```objectivec [Objective-C]
[[Branch getInstance] addAllowedScheme:@"https"];
```

:::

---

## setAllowedSchemes

| Method | Description |
| --- | --- |
| [(void)setAllowedSchemes:(nullable NSArray \*)schemes;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Allow an array of URI schemes to be tracked by Branch. Defaults to all schemes. |

| Argument | Type | Description |
| --- | --- | --- |
| `schemes` | `NSArray` | An array of URI schemes allowed to be tracked. |

#### Example Usage

::: code-group

```swift [Swift]
var allowedSchemes = ["http", "https", "myapp"]
Branch.getInstance().setAllowedSchemes(allowedSchemes)
```

```objectivec [Objective-C]
[[Branch getInstance] addAllowedScheme:@[@"http", @"https", @"myapp"]];
```

:::

---

## checkPasteboardOnInstall

| Method | Description |
| --- | --- |
| [(void)checkPasteboardOnInstall;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Implement deferred deep linking via Branch NativeLink™. This method checks the device's pasteboard (clipboard) for a Branch link on app installation. If found, the Branch Link is used to provide deferred deep link data. **Notes**:  - To use this feature, you must [enable NativeLink™](configure-default-link-behaviors.md#3-ios-default-link-behavior) either in the Branch Dashboard or by manually configuring the Branch link to use [$ios\_nativelink](creating-a-deep-link.md#deep-linking).  - Using this feature may result in the end user seeing a toast message (you can check this with the [willShowPasteboardToast](ios-full-reference.md#willshowpasteboardtoast) method).  - The required minimum Branch iOS SDK version for this feature is v1.39.4. |

#### Example Usage

::: code-group

```swift [Swift]
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
	// The `checkPasteboardOnInstall` call must be made before `initSesssion`
	Branch.getInstance().checkPasteboardOnInstall()

	// Listener for Branch Deep Link data
	Branch.getInstance().initSession(launchOptions: launchOptions) { (params, error) in
		// Do stuff here with Deep Link data (nav to page, display content, etc)
		print(params as? [String: AnyObject] ?? {})
	}
  
	return true
}
```

```objectivec [Objective-C]
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	// The `checkPasteboardOnInstall` call must be made before `initSesssion`
	[[Branch getInstance] checkPasteboardOnInstall];

	// Listener for Branch Deep Link data
	[[Branch getInstance] initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary * _Nonnull params, NSError * _Nullable error) {
		// Do stuff here with Deep Link data (nav to page, display content, etc)
		NSLog(@"%@", params);
	}];
  
	return YES;
}
```

:::

Visit the iOS Advanced Features page for [more examples](ios-advanced-features.md#nativelink-deferred-deep-linking) using the `checkPasteboardOnInstall()` method.

---

## willShowPasteboardToast

| Method | Description |
| --- | --- |
| [(BOOL)willShowPasteboardToast;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Check whether the Branch iOS SDK will trigger a pasteboard toast message for the end user. Returns `true` if the end user will see a pasteboard toast message. |

#### Example Usage

::: code-group

```swift [Swift]
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
	// The `checkPasteboardOnInstall` call must be made before `initSesssion`
	Branch.getInstance().checkPasteboardOnInstall()
  
	// Check if pasteboard toast will show for end user
	if Branch.getInstance().willShowPasteboardToast(){
		// You can give the user information about what just occurred here
	}
  
	// Listener for Branch Deep Link data
	Branch.getInstance().initSession(launchOptions: launchOptions) { (params, error) in
		// Do stuff here with Deep Link data (nav to page, display content, etc)
		print(params as? [String: AnyObject] ?? {})
	}
	return true
}
```

```objectivec [Objective-C]
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	// The `checkPasteboardOnInstall` call must be made before `initSessionWithLaunchOptions`
	Branch.getInstance().checkPasteboardOnInstall()
  
	// Check if pasteboard toast will show for end user
	if ([[Branch getInstance] willShowPasteboardToast]) {
		// You can give the user information about what just occurred here    
	}

	// Listener for Branch Deep Link data
	[[Branch getInstance] initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary * _Nonnull params, NSError * _Nullable error) {
		// Do stuff here with Deep Link data (nav to page, display content, etc)
		NSLog(@"%@", params);
	}];
	return YES;
}
```

:::

---

## setAppClipAppGroup

| Method | Description |
| --- | --- |
| [(void)setAppClipAppGroup:(NSString \*)appGroup;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Set the AppGroup used to share data between the App Clip and your full app. |

| Argument | Type | Description |
| --- | --- | --- |
| `appGroup` | `NSString` | The AppGroup to use. |

#### Example Usage

::: code-group

```swift [Swift]
// Within the AppDelegate
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    // The `setAppClipAppGroup()` call must be made before `initSession()`
    Branch.getInstance().setAppClipAppGroup("group.io.branch")
    BranchScene.shared().initSession(launchOptions: launchOptions) { (params, error, scene) in
        if let dict = params {
            
            if Monster.shared.waitingForData {
                let name = (dict["monster_name"] as? String) ?? "Branchster"
                Monster.shared.update(name: name)
            }
        }
    }
    
    return true
}
```

```objectivec [Objective-C]
// Within the AppDelegate

- (BOOL)application:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    Branch *branch = [Branch getInstance];
    
    // The `setAppClipAppGroup()` call must be made before `initSessionWithLaunchOptions()`
    [branch setAppClipAppGroup:@"group.io.branch"];

    [branch initSessionWithLaunchOptions:launchOptions
        andRegisterDeepLinkHandlerUsingBranchUniversalObject:
            ^ (BranchUniversalObject *BUO, BranchLinkProperties *linkProperties, NSError *error) {

    }];

		return YES;
}
```

:::

---

## handleATTAuthorizationStatus

| Method | Description |
| --- | --- |
| [(void)handleATTAuthorizationStatus:(NSUInteger)status;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Pass the `AppTrackingTransparency` authorization status to Branch to measure ATT prompt performance. |

#### Example Usage

::: code-group

```swift [Swift]
if #available(iOS 14.0, *)  {
  // Check that `trackingAuthorizationStatus` is `notDetermined`, otherwise prompt will not display
	if ATTrackingManager.trackingAuthorizationStatus == .notDetermined {
		ATTrackingManager.requestTrackingAuthorization { (status) in
			// `handleATTAuthorizationStatus()` should be called from the callback of `requestTrackingAuthorization()`
			Branch.getInstance().handleATTAuthorizationStatus(status.rawValue)
		}
	}
}
```

```objectivec [Objective-C]
if (@available(iOS 14.0, *)) {
  // Check that `trackingAuthorizationStatus` is `notDetermined`, otherwise prompt will not display
	if (ATTrackingManager.trackingAuthorizationStatus == ATTrackingManagerAuthorizationStatusNotDetermined) {
		[ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
      // `handleATTAuthorizationStatus()` should be called from the callback of `requestTrackingAuthorization()`
			[[Branch getInstance] handleATTAuthorizationStatus:status];
		}];
	}
}
```

:::

---

## addFacebookPartnerParameterWithName

| Method | Description |
| --- | --- |
| [(void)addFacebookPartnerParameterWithName:(NSString )name value:(NSString )value;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Add a Partner Parameter for Facebook. This allows you to pass additional hashed information to the SDK for [Facebook Advanced Matching](pass-hashed-information-for-facebook-advanced-matching.md). Once set, this parameter is attached to `INSTALL`, `OPEN`, and other events until they are cleared or the app restarts. |

| Argument | Type | Description |
| --- | --- | --- |
| `name` | `NSString` | Partner Parameter name. See Facebook's documentation for details on valid parameters. |
| `value` | `NSString` | Partner Parameter value. See Facebook's documentation for details on valid parameters. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().addFacebookPartnerParameter(withName: "ph", value: "0000xxxx")

// Call `initSession()` after `addFacebookPartnerParameter()`
```

```objectivec [Objective-C]
Branch.getInstance().addFacebookPartnerParameter(withName: "ph", value: "0000xxxx")

// Call `initSession()` after `addFacebookPartnerParameter()`
[[Branch getInstance] addFacebookPartnerParameterWithName:@"ph" value:@"0000xxxx"];

// Call `initSession()` after `addFacebookPartnerParameterWithName()`
```

:::

---

## addSnapPartnerParameterWithName

| Method | Description |
| --- | --- |
| [(void)addSnapPartnerParameterWithName:(NSString )name value:(NSString )value;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Add a Partner Parameter for Snap. Once set, this parameter is attached to `INSTALL`, `OPEN`, and other events until they are cleared or the app restarts. |

| Argument | Type | Description |
| --- | --- | --- |
| `name` | `NSString` | Partner Parameter name. See Snap's documentation for details on valid parameters. |
| `value` | `NSString` | Partner Parameter value. See Snap's documentation for details on valid parameters. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().addSnapPartnerParameter(withName: "ph", value: "0000xxxx")

// Call `initSession()` after `addSnapPartnerParameter()`
```

```objectivec [Objective-C]
[[Branch getInstance] addSnapPartnerParameterWithName:@"ph" value:@"0000xxxx"];

// Call `initSession()` after `addSnapPartnerParameterWithName()`
```

:::

---

## clearPartnerParameters

| Method | Description |
| --- | --- |
| [(void)clearPartnerParameters;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Clears all Partner Parameters. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().clearPartnerParameters()
```

```objectivec [Objective-C]
[[Branch getInstance] clearPartnerParameters];
```

:::

---

## setRetryInterval

| Method | Description |
| --- | --- |
| [(void)setRetryInterval:(NSTimeInterval)retryInterval;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Specify the time to wait in seconds between retries in the case of a Branch server error. |

| Argument | Type | Description |
| --- | --- | --- |
| `retryInterval` | `NSTimeInterval` | Number of seconds to wait between retries. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().setRetryInterval(10.0)
```

```objectivec [Objective-C]
[[Branch getInstance] setRetryInterval:10.0];
```

:::

---

## setMaxRetries

| Method | Description |
| --- | --- |
| [(void)setMaxRetries:(NSInteger)maxRetries;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Specify the max number of times to retry in the case of a Branch server error. |

| Argument | Type | Description |
| --- | --- | --- |
| `maxRetries` | `NSInteger` | Number of retries to make. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().setMaxRetries(3)
```

```objectivec [Objective-C]
[[Branch getInstance] setMaxRetries:3];
```

:::

---

## setNetworkTimeout

| Method | Description |
| --- | --- |
| [(void)setNetworkTimeout:(NSTimeInterval)timeout;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Specify the amount of time to wait before a request should be considered timed out. |

| Argument | Type | Description |
| --- | --- | --- |
| `timeout` | `NSTimeInterval` | Number of seconds to wait before a request is considered timed out. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().setNetworkTimeout(10.0)
```

```objectivec [Objective-C]
[[Branch getInstance] setNetworkTimeout:10.0];
```

:::

---

## disableAdNetworkCallouts

| Method | Description |
| --- | --- |
| [(void)disableAdNetworkCallouts:(BOOL)disableCallouts;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Disable callouts to ad networks for all events (by default, Branch sends callouts to ad networks). If callouts to ad networks are disabled, Branch will not send any events to the ad networks specified in your Branch account. If ad networks are not specified in your Branch account, this method will be ignored. |

| Argument | Type | Description |
| --- | --- | --- |
| `disableCallouts` | `BOOL` | When set to `true`, callouts to ad networks will be disabled. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().disableAdNetworkCallouts(true)
```

```objectivec [Objective-C]
[[Branch getInstance] disableCallouts:YES];
```

:::

---

## isBranchLink

| Method | Description |
| --- | --- |
| [(BOOL)isBranchLink:(NSString \*)urlString;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Check if a URL is likely a Branch link. This check happens against `Info.plist` and the standard Branch list. |

| Argument | Type | Description |
| --- | --- | --- |
| `urlString` | `NSString` | The URL to check. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.isBranchLink("https://example.app.link/fzmLEhobLD?$custom_data=123&hello=world")
```

```objectivec [Objective-C]
[Branch isBranchLink:@"https://example.app.link/fzmLEhobLD?$custom_data=123&hello=world"];
```

:::

---

## setRequestMetadataKey

| Method | Description |
| --- | --- |
| [(void)setRequestMetadataKey:(NSString )key value:(NSString )value](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Add key-value pairs to the metadata of every request. Some [Data Integration Partners](data-integration-partners.md) **require** specific identifiers to be set prior to Branch initialization. Use this function to set those identifiers. |

| Argument | Type | Description |
| --- | --- | --- |
| `key` | `NSString` | Key to be included in request metadata. |
| `value` | `NSString` | Value to be included in request metadata. |

#### Example Usage

General example:

::: code-group

```swift [Swift]
// Inside the `didFinishLaunchingWithOptions` method
// Replace <analytics_id> with your Data Integration Partner's key
Branch.getInstance().setRequestMetadataKey("<analytics_id>", "<value>")
```

```objectivec [Objective-C]
// Inside the `didFinishLaunchingWithOptions` method
// Replace <analytics_id> with your Data Integration Partner's key
[[Branch getInstance] setRequestMetadataKey:@"<analytics_id>" value: @"<value>"];
```

:::

Example using Braze as the 3rd party Data Integration Partner:

::: code-group

```swift [Swift]
// Inside the `didFinishLaunchingWithOptions` method
Branch.getInstance.setRequestMetadataKey("$braze_install_id", braze.deviceId)
```

```objectivec [Objective-C]
// Inside the `didFinishLaunchingWithOptions` method
[[Branch getInstance] setRequestMetadataKey:@"$braze_install_id" value: braze.deviceId];
```

:::

Visit the iOS Advanced Features page to [learn more](ios-advanced-features.md#set-initialization-metadata) about the `setRequestMetadataKey()` method.

---

## setTrackingDisabled (deprecated)

| Method | Description |
| --- | --- |
| [(void) setTrackingDisabled:(BOOL)disabled;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Disable the Branch SDK from tracking the user. This is useful for GDPR privacy compliance. When tracking is disabled, the Branch SDK will clear the Branch defaults of user identifying information and prevent Branch from making any Branch network calls that will track the user. |

| Argument | Type | Description |
| --- | --- | --- |
| `disabled` | `BOOL` | When set to `true`, tracking will be disabled. |

#### Implications of Using `setTrackingDisabled`

| Action | Will work? |
| --- | --- |
| Opening Branch Deep Links with an explicit URL | Y |
| Deferred deep linking | N |
| Generating Short Links | N (returns long links) |
| Sending user tracking events such as `userCompletedAction`, `BranchCommerceEvents`, and `BranchEvents` | N |
| User rewards and credits | N |
| Setting a user identity and logging a user identity out | N |

#### Example Usage

::: code-group

```swift [Swift]
// Call takes place at the SDK level
Branch.setTrackingDisabled(true)
```

```objectivec [Objective-C]
// Call takes place at the SDK level
[Branch setTrackingDisabled:YES];
```

:::

---

## trackingDisabled (deprecated)

| Method | Description |
| --- | --- |
| [(BOOL) trackingDisabled;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Check whether user tracking is currently disabled. Returns `true` if user tracking is disabled. |

#### Example Usage

::: code-group

```swift [Swift]
func trackingStatus() -> Bool {
  // Call takes place at the SDK level
  return Branch.trackingDisabled()
}
```

```objectivec [Objective-C]
// Call takes place at the SDK level
[Branch trackingDisabled];
```

:::

---

## setReferrerGbraidValidityWindow

| Method | Description |
| --- | --- |
| [(void) setReferrerGbraidValidityWindow:](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h)  [(NSTimeInterval) validityWindow;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Sets the time window for which `referrer_gbraid` is valid, starting from now. After the validity window is over, it gets cleared from settings and will not be sent with requests anymore. |

| Argument | Type | Description |
| --- | --- | --- |
| `validityWindow` | `NSTimeInterval` | The number of seconds `referrer_gbraid` will be valid starting from now.   Default `validityWindow` is 30 days (2,592,000 seconds). |

#### Example Usage

::: code-group

```swift [Swift]
Branch.setReferrerGbraidValidityWindow(10.0)
```

```objectivec [Objective-C]
[Branch setReferrerGbraidValidityWindow:10.0]
```

:::

---

## setDMAParamsForEEA

::: warning
**Warning:** `NULL` **by Default**

Please note that the 3 parameters passed to `setDMAParamsForEEA()` are all `NULL` by default.

**Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.**
:::

| Method | Description |
| --- | --- |
| [(void) setDMAParamsForEEA:(BOOL)eeaRegion AdPersonalizationConsent:(BOOL)adPersonalizationConsent AdUserDataUsageConsent:(BOOL)adUserDataUsageConsent](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Sets the value of parameters required by Google Conversion APIs for DMA Compliance in the EEA region. |

| Argument | Type | Description |
| --- | --- | --- |
| `eeaRegion` | `Boolean` | Set to `true` if user is **included** in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA. Set to `false` if user is considered **excluded** from European Union regulations. |
| `adPersonalizationConsent` | `Boolean` | Set to `true` if user has **granted** consent for ads personalization. Set to `false` if user has **denied** consent for ads personalization. |
| `adUserDataUsageConsent` | `Boolean` | Set to `true` if user has **granted** consent for 3P transmission of user-level data for ads. Set to `false` is user has **denied** consent for 3P transmission of user-level data for ads. |

#### Example Usage

::: code-group

```swift [Swift]
// Example for an EEA resident who has denied both ad personalization and data usage consent
Branch.getInstance().setDMAParamsForEEA(true,false,false)
```

```objectivec [Objective-C]
// Example for an EEA resident who has denied both ad personalization and data usage consent
[[Branch getInstance]
	setDMAParamsForEEA:YES
	adPersonalizationConsent:NO
	adUserDataUsageConsent:NO];
```

:::

::: code-group

```swift [Swift]
// Example for an EEA resident who has consented to ad personalization but denied data usage consent
Branch.getInstance().setDMAParamsForEEA(true,true,false)
```

```objectivec [Objective-C]
// Example for an EEA resident who has consented to ad personalization but denied data usage consent
[[Branch getInstance]
	setDMAParamsForEEA:YES
	adPersonalizationConsent:YES
	adUserDataUsageConsent:NO];
```

:::

::: code-group

```swift [Swift]
// Example for an EEA resident who has denied ad personalization but granted data usage consent
Branch.getInstance().setDMAParamsForEEA(true,false,true)
```

```objectivec [Objective-C]
// Example for an EEA resident who has denied ad personalization but granted data usage consent
[[Branch getInstance]
	setDMAParamsForEEA:YES
	adPersonalizationConsent:NO
	adUserDataUsageConsent:YES];
```

:::

Read more about the `setDMAParamsForEEA()` method and Google DMA compliance in iOS Advanced Features [guide](ios-advanced-features.md).

---

## setConsumerProtectionAttributionLevel

| Method | Description |
| --- | --- |
| [(void)setConsumerProtectionAttributionLevel:(BranchAttributionLevel)level;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Set the Consumer Protection Preference level. |

| Argument | Type | Description |
| --- | --- | --- |
| `level` | `BranchAttributionLevel` | The Consumer Protection Preference level to set for the user, based on the consent they have granted you. |

| Consumer Preference Level | Description | Swift | Obj-C |
| --- | --- | --- | --- |
| Full Attribution | This is the **default** level. This level includes advertising IDs and device IDs, as well as other data. | `full` | `BranchAttributionLevelFull` |
| Privacy Attribution | This level does not include advertising IDs, but does include data from privacy frameworks like SKAN and Privacy Sandbox. | `reduced` | `BranchAttributionLevelReduced` |
| Analytics Only | This level includes device IDs, but does not include data from privacy frameworks. | `minimal` | `BranchAttributionLevelMinimal` |
| No Attribution | This level only includes deterministic deep linking. Appropriate for users that fall under GDPR or CCPA regulations. | `none` | `BranchAttributionLevelNone` |

#### Example Usage

::: code-group

```swift [Swift]
// Set consumer preference level to "Privacy Attribution"
Branch.getInstance().setConsumerProtectionAttributionLevel(.reduced)
```

```plaintext [Objective-C]
// Set consumer preference level to "Full Attribution"
[Branch setConsumerProtectionAttributionLevel:BranchAttributionLevelFull];
```

:::

To learn more about setting Consumer Protection Preference levels, visit our [guide](consumer-protection-preferences.md).

---

## getFirstReferringBranchUniversalObject

| Method | Description |
| --- | --- |
| [(nullable BranchLinkProperties \*)getFirstReferringBranchLinkProperties;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get the `BranchUniversalObject` instance from the first time this user was referred (can be empty). |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance.getFirstReferringBranchUniversalObject()
```

```objectivec [Objective-C]
const char *_getFirstReferringBranchUniversalObject() {
	BranchUniversalObject* universalObject = [[Branch getInstance] getFirstReferringBranchUniversalObject];
	return jsonCStringFromDictionary(dictFromBranchUniversalObject(universalObject));
}
```

:::

---

## getFirstReferringBranchLinkProperties

| Method | Description |
| --- | --- |
| [(nullable BranchLinkProperties \*)getFirstReferringBranchLinkProperties;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get the `BranchLinkProperties` instance from the first time this user was referred (can be empty). |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance.getFirstReferringBranchLinkProperties()
```

```objectivec [Objective-C]
[[Branch getInstance] getFirstReferringBranchLinkProperties]
```

:::

---

## getFirstReferringParams

| Method | Description |
| --- | --- |
| [(nullable NSDictionary \*)getFirstReferringParams;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get the parameters used the first time this user was referred (can be empty). |

#### Example Usage

::: code-group

```swift [Swift]
// In AppDelegate file, inside `didFinishLaunchingWithOptions()` method

// Listener for Branch Deep Link data
Branch.getInstance().initSession(launchOptions: launchOptions) { params, error in
  print(params as? [String: AnyObject] ?? {})
}

// Get first referring params for Deep Link
let installParams = Branch.getInstance().getFirstReferringParams()
```

```objectivec [Objective-C]
// In AppDelegate file, inside `didFinishLaunchingWithOptions()` method

// Listener for Branch Deep Link data
[[Branch getInstance] initSessionWithLaunchOptions:launchOptions
                        andRegisterDeepLinkHandler:^(NSDictionary * _Nullable params,
                                                     NSError * _Nullable error) {
    if (!error) {
        //Referring params
        NSLog(@"Referring link params %@",params);
    }
}];

// Get first referring params for Deep Link
NSDictionary *installParams =  [[Branch getInstance] getFirstReferringParams];
```

:::

---

## getLatestReferringBranchUniversalObject

| Method | Description |
| --- | --- |
| [(nullable BranchUniversalObject \*)getLatestReferringBranchUniversalObject;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get the `BranchUniversalObject` instance from the most recent time this user was referred (can be empty). |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance.getLatestReferringBranchUniversalObject()
```

```objectivec [Objective-C]
[[Branch getInstance] getLatestReferringBranchUniversalObject];
```

:::

---

## getLatestReferringBranchLinkProperties

| Method | Description |
| --- | --- |
| [(nullable BranchLinkProperties \*)getLatestReferringBranchLinkProperties;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get the `BranchLinkProperties` instance from the most recent time this user was referred (can be empty). |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance.getLatestReferringBranchLinkProperties()
```

```objectivec [Objective-C]
[[Branch getInstance] getLatestReferringBranchLinkProperties];
```

:::

---

## getLatestReferringParams

| Method | Description |
| --- | --- |
| [(nullable NSDictionary \*)getLatestReferringParams;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get the parameters used the most recent time this user was referred (can be empty). This call **does not block the calling thread**, which means you may receive results from the previous time the user was referred. If you need the most recent result, use `getLatestReferringParamsSynchronous` instead. |

#### Example Usage

::: code-group

```swift [Swift]
// In AppDelegate file, inside `didFinishLaunchingWithOptions()` method

// Listener for Branch Deep Link data
Branch.getInstance().initSession(launchOptions: launchOptions) { params, error in
  print(params as? [String: AnyObject] ?? {})
}

// Get latest referring params for Deep Link
// Warning: This method may return results from a previous referral
let sessionParams = Branch.getInstance().getLatestReferringParams()
```

```objectivec [Objective-C]
// In AppDelegate file, inside `didFinishLaunchingWithOptions()` method

// Listener for Branch Deep Link data
[[Branch getInstance] initSessionWithLaunchOptions:launchOptions
                        andRegisterDeepLinkHandler:^(NSDictionary * _Nullable params,
                                                     NSError * _Nullable error) {
    if (!error) {
        //Referring params
        NSLog(@"Referring link params %@",params);
    }
}];

// Get latest referring params for Deep Link
// Warning: This method may return results from a previous referral
NSDictionary *sessionParams = [[Branch getInstance] getLatestReferringParams];
```

:::

---

## getLatestReferringParamsSynchronous

| Method | Description |
| --- | --- |
| [(nullable NSDictionary \*)getLatestReferringParamsSynchronous;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get the parameters used the most recent time this user was referred (can be empty). This call **blocks the calling thread** until the latest results are available. If you do not want to block the calling thread, use `getLatestReferringParams()` instead. |

#### Example Usage

::: code-group

```swift [Swift]
// Warning: This method blocks the calling thread until the latest results are available
Branch.getInstance.getLatestReferringParamsSynchronous()
```

```objectivec [Objective-C]
// Warning: This method may block the current thread until the latest results are available
[[Branch getInstance] getLatestReferringParamsSynchronous];
```

:::

---

## resetUserSession

| Method | Description |
| --- | --- |
| [(void)resetUserSession;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Tells Branch to act as though `initSession()` had not been called. Will require another open call (this is done automatically, internally). |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance.resetUserSession()
```

```objectivec [Objective-C]
[[Branch getInstance] resetUserSession];
```

:::

---

## isUserIdentified

| Method | Description |
| --- | --- |
| [(BOOL)isUserIdentified;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Indicates whether or not this user has a custom identity specified for them. This is **independent of installs**. If you call `setIdentity()`, this device will have that identity associated with this user until `logout()` is called. This includes persisting through uninstalls, as Branch tracks device ID. **Warning**: This method should only be invoked after `initSession` completes, either within the callback or after a delay. If it is invoked before, then Branch will silently initialize the SDK before the callback has been set, in order to carry out this method's required task. As a result, you may experience issues where the `initSession` callback does not fire. |

#### Example Usage

::: code-group

```swift [Swift]
// Warning: only invoke `isUserIdentified()` after `initSession()` completes
Branch.getInstance.isUserIdentified()
```

```objectivec [Objective-C]
// Warning: only invoke `isUserIdentified() after `initSession()` completes
[[Branch getInstance] isUserIdentified];
```

:::

---

## setIdentity

| Method | Description |
| --- | --- |
| [(void)setIdentity:(nullable NSString \*)userId;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Set the user's identity to a unique ID used by your system, so that it is identifiable by you elsewhere. |
| ([void)setIdentity:(nullable NSString \*)userId withCallback:(nullable callbackWithParams)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Set the user's identity to a unique ID used by your system, so that it is identifiable by you elsewhere and receive a completion callback, notifying you whether it succeeded or failed. |

**WARNINGS**:

- If you use the same ID between users on different sessions/devices, their actions will be merged.
- This request is not removed from the queue upon failure - it will be retried until it succeeds.

| Argument | Type | Description |
| --- | --- | --- |
| `userId` | `NSString` | The ID that Branch should use to identify this user. |
| `callback` | `callbackWithParams` | The callback to be called once the request has completed (success or failure). |

#### Example Usage Without Callback

::: code-group

```swift [Swift]
// Login
Branch.getInstance().setIdentity("your_user_id")

// Logout
Branch.getInstance().logout()
```

```objectivec [Objective-C]
//Login
Branch *branch = [Branch getInstance];
[branch setIdentity:@"test_user" withCallback:^(NSDictionary *params, NSError *error) {
	NSLog(@"callback in setIdentity %@", params);
}];

// Logout
[[Branch getInstance] logout]; // Or replace with .logoutWithCallback() to customize further
```

:::

---

## logout

| Method | Description |
| --- | --- |
| [(void)logout;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Clear all of the current user's session items. **Warning**: If the request to logout fails, the items will not be cleared. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().logout()
```

```objectivec [Objective-C]
[[Branch getInstance] logout];
```

:::

---

## logoutWithCallback

| Method | Description |
| --- | --- |
| [(void)logoutWithCallback:(nullable callbackWithStatus)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Clear all of the current user's session items. **Warning**: If the request to logout fails, the items will not be cleared. |

| Argument | Type | Description |
| --- | --- | --- |
| `logoutWithCallback` | `callbackWithStatus` | The callback to be called once the request has completed (success or failure). |

#### Example Usage

::: code-group

```swift [Swift]
let branch = Branch.getInstance()
branch.logoutWithCallback { (changed, error) in
	if (error != nil || !changed) {
		print(String(format: "Logout failed: %@", error!))
} else {
		print("Logout succeeded")
	}
}
```

```objectivec [Objective-C]
Branch *branch = [Branch getInstance];
[branch logoutWithCallback:^(BOOL changed, NSError *error) {
	if (error || !changed) {
		NSLog(@"Logout failed: %@", error);
  } else {
    NSLog(@"Logout succeeded");
  }
}];
```

:::

---

## getShortURL (sync)

**Warning**: This method makes a **synchronous** URL request.

| Method | Description |
| --- | --- |
| [(NSString \*)getShortURL;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL without any items specified. The usage type will default to unlimited. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().getShortURL()
```

```objectivec [Objective-C]
[[Branch getInstance] getShortURL];
```

:::

---

## getShortURLWithParams (sync, without tags)

**Warning**: The variations of `getShortURLWithParams()` in this table make a **synchronous** URL request.

| Method | Description |
| --- | --- |
| [(NSString \*)getShortURLWithParams:(nullable NSDictionary \*)params;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters. |
| [(NSString \*)getShortURLWithParams:(nullable NSDictionary \*)params andChannel:(nullable NSString \*)channel andFeature:(nullable NSString \*)feature;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, channel, and feature. |
| [(NSString \*)getShortURLWithParams:(nullable NSDictionary \*)params andChannel:(nullable NSString \*)channel andFeature:(nullable NSString \*)feature andStage:(nullable NSString \*)stage;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, channel, feature, and stage. |
| [(NSString )getShortURLWithParams:(nullable NSDictionary )params andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andAlias:(nullable NSString )alias;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, channel, feature, stage, and alias. |
| [(NSString \*)getShortURLWithParams:(nullable NSDictionary \*)params andChannel:(nullable NSString \*)channel andFeature:(nullable NSString \*)feature andStage:(nullable NSString \*)stage andType:(BranchLinkType)type;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, channel, feature, stage, and type. |
| [(NSString )getShortURLWithParams:(nullable NSDictionary )params andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString \*)stage andMatchDuration:(NSUInteger)duration;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, channel, feature, stage, and match duration. |

| Argument | Type | Description |
| --- | --- | --- |
| `params` | `NSDictionary` | Dictionary of parameters to include in the short URL. |
| `channel` | `NSString` | Channel for the short URL. Examples include Facebook, Twitter, and SMS (depending on where it will be shared). |
| `feature` | `NSString` | Feature that the short URL is utilizing. Examples could be Sharing, Referring, Inviting, etc. |
| `stage` | `NSString` | The stage used for the short URL, indicating what part of a funnel the user is in. |
| `alias` | `NSString` | The alias for a short URL. **Warning**: If you pass an alias that is already taken, the method call will fail. |
| `type` | `BranchLinkType` | The type of short URL this is, either single use or unlimited use. Single use means once **per user**. |
| `duration` | `NSUInteger` | How long to keep an unmatched link click in Branch's backend server queue before discarding. |

#### Example Usage

::: code-group

```swift [Swift]
// For all variations of `getShortURLWithParams()` the usage type will default to unlimited

let params: [String: Any] = [
    "key1": "value1",
    "key2": "value2"
]
let shortURL = Branch.getInstance().getShortURL(withParams: params)
```

```objectivec [Objective-C]
// For all variations of `getShortURLWithParams()` the usage type will default to unlimited

NSDictionary *params = @{
    @"key1": @"value1",
    @"key2": @"value2"
};
NSString *shortURL = [[Branch getInstance] getShortURLWithParams:params];
```

:::

---

## getShortURLWithParams (sync, with tags)

**Warning**: The variations of `getShortURLWithParams()` in this table make a **synchronous** URL request.

| Method | Description |  |
| --- | --- | --- |
| [(NSString \*)getShortURLWithParams:(nullable NSDictionary \*)params andTags:(nullable NSArray \*)tags andChannel:(nullable NSString \*)channel andFeature:(nullable NSString \*)feature andStage:(nullable NSString \*)stage;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, tags, channel, feature, and stage. |  |
| [(NSString )getShortURLWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andAlias:(nullable NSString \*)alias;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, tags, channel, feature, stage, and alias. |  |
| [(NSString )getShortURLWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andAlias:(nullable NSString )alias ignoreUAString:(nullable NSString )ignoreUAString;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, tags, channel, feature, stage, and type. |  |
| [(NSString )getShortURLWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andCampaign:(nullable NSString )campaign andAlias:(nullable NSString )alias ignoreUAString:(nullable NSString \*)ignoreUAString forceLinkCreation:(BOOL)forceLinkCreation;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, tags, channel, feature, stage, and match duration. |  |
| [(NSString \*)getShortURLWithParams:(nullable NSDictionary \*)params andTags:(nullable NSArray \*)tags andChannel:(nullable NSString \*)channel andFeature:(nullable NSString \*)feature andStage:(nullable NSString \*)stage andType:(BranchLinkType)type;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified parameters, tags, alias, channel, feature, stage, and match duration. |  |
| [(NSString \*)getShortURLWithParams:(nullable NSDictionary \*)params andTags:(nullable NSArray \*)tags andChannel:(nullable NSString \*)channel andFeature:(nullable NSString \*)feature andStage:(nullable NSString \*)stage andMatchDuration:(NSUInteger)duration;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) |  | Get a short URL with specified parameters, tags, alias, channel, feature, stage, campaign, and match duration. |
| [(NSString )getShortUrlWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andAlias:(nullable NSString )alias andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString \*)stage andMatchDuration:(NSUInteger)duration;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified tags, params, channel, feature, stage, and match duration. |  |
| [(NSString )getShortUrlWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andAlias:(nullable NSString )alias andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString \*)stage andCampaign:campaign andMatchDuration:(NSUInteger)duration;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with specified params, channel, feature, stage, campaign and match duration. |  |

| Argument | Type | Description |
| --- | --- | --- |
| `params` | `NSDictionary` | Dictionary of parameters to include in the short URL. |
| `tags` | `NSArray` | An array of tags to associate with this short URL. Useful for tracking. |
| `channel` | `NSString` | Channel for the short URL. Examples include Facebook, Twitter, and SMS (depending on where it will be shared). |
| `feature` | `NSString` | Feature that the short URL is utilizing. Examples could be Sharing, Referring, Inviting, etc. |
| `stage` | `NSString` | The stage used for the short URL, indicating what part of a funnel the user is in. |
| `alias` | `NSString` | The alias for a short URL. **Warning**: If you pass an alias that is already taken, the method call will fail. |
| `type` | `BranchLinkType` | The type of short URL this is, either single use or unlimited use. Single use means once **per user**. |
| `duration` | `NSUInteger` | How long to keep an unmatched link click in Branch's backend server queue before discarding. |
| `campaign` | `campaign` | Use this field to organize the links by actual marketing campaign. |
| `ignoreUAString` | `NSString` | The User Agent string to tell the server to ignore the next request - prevents it from treating a preview scrape as a link click. |
| `forceLinkCreation` | `BOOL` | Whether we should create a link from the Branch key even if `initSession` failed. Defaults to NO. |

#### Example Usage

::: code-group

```swift [Swift]
// For all variations of `getShortURLWithParams()` the usage type will default to unlimited

let params: [String: Any] = [
    "key1": "value1",
    "key2": "value2"
]

let shortURL = Branch.getInstance().getShortURL(withParams:params andTags:["one", "two", "three"])
```

```objectivec [Objective-C]
// For all variations of `getShortURLWithParams()` the usage type will default to unlimited

NSDictionary *params = @{
    @"key1": @"value1",
    @"key2": @"value2"
};

NSString *shortURL = [[Branch getInstance] getShortURLWithParams:params andTags:@["one", "two", "three"]];
```

:::

---

## getLongURLWithParams

| Method | Description |
| --- | --- |
| [(NSString )getLongURLWithParams:(nullable NSDictionary )params;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a long URL with specified parameters. |
| [(NSString )getLongURLWithParams:(nullable NSDictionary )params andFeature:(nullable NSString \*)feature;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a long URL with specified parameters and feature. |
| [(NSString )getLongURLWithParams:(nullable NSDictionary )params andFeature:(nullable NSString )feature andStage:(nullable NSString )stage;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a long URL with specified parameters, feature, and stage. |
| [(NSString )getLongURLWithParams:(nullable NSDictionary )params andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andTags:(nullable NSArray \*)tags;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a long URL with specified parameters, feature, stage, and tags. |
| [(NSString )getLongURLWithParams:(nullable NSDictionary )params andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andAlias:(nullable NSString \*)alias;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a long URL with specified parameters, feature, stage, and alias. |
| [(NSString )getLongURLWithParams:(nullable NSDictionary )params andChannel:(nullable NSString )channel andTags:(nullable NSArray )tags andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andAlias:(nullable NSString \*)alias;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a long URL with specified parameters, channel, tags, feature, stage, and alias. |

| Argument | Type | Description |
| --- | --- | --- |
| `params` | `NSDictionary` | Dictionary of parameters to include in the long URL. |
| `tags` | `NSArray` | An array of tags to associate with this long URL. Useful for tracking. |
| `channel` | `NSString` | Channel for the long URL. Examples include Facebook, Twitter, and SMS (depending on where it will be shared). |
| `feature` | `NSString` | Feature that the long URL is utilizing. Examples could be Sharing, Referring, Inviting, etc. |
| `stage` | `NSString` | The stage used for the long URL, indicating what part of a funnel the user is in. |
| `alias` | `NSString` | The alias for a long URL. **Warning**: If you pass an alias that is already taken, the method call will fail. |
| `campaign` | `campaign` | Use this field to organize the links by actual marketing campaign. |

#### Example Usage

::: code-group

```swift [Swift]
// For all variations of `getLongURLWithParams()` the usage type will default to unlimited

let params: [String: Any] = [
    "key1": "value1",
    "key2": "value2"
]
let longUrl = Branch.getInstance().getLongURL(withParams: params, andChannel: "channel", andTags: ["tag1"], andFeature: "feature", andStage: "stage", andAlias: "testingLinkAlias123")
```

```objectivec [Objective-C]
// For all variations of `getLongURLWithParams()` the usage type will default to unlimited

NSDictionary *params = @{
    @"key1": @"value1",
    @"key2": @"value2"
};
NSString *longUrl = [[Branch getInstance] getLongURLWithParams:params andChannel:@"channel" andTags:@[@"tag1"] andFeature:@"feature" andStage:@"stage" andAlias:@"testingLinkAlias123"];
```

:::

---

## getLongAppLinkURLWithParams

| Method | Description |
| --- | --- |
| [(NSString )getLongAppLinkURLWithParams:(NSDictionary )params andChannel:(nullable NSString )channel andTags:(NSArray )tags andFeature:(NSString )feature andStage:(NSString )stage andAlias:(NSString \*)alias;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a long app.link URL with specified parameters, channel, tags, feature, stage, and alias. **Warning**: If you pass an alias that is already taken, the method call will fail. |

| Argument | Type | Description |
| --- | --- | --- |
| `params` | `NSDictionary` | Dictionary of parameters to include in the long app.link URL. |
| `channel` | `NSString` | Channel for the long app.link URL. Examples include Facebook, Twitter, and SMS (depending on where it will be shared). |
| `tags` | `NSArray` | An array of tags to associate with this long app.link URL. Useful for tracking. |
| `feature` | `NSString` | Feature that the long app.link URL is utilizing. Examples could be Sharing, Referring, Inviting, etc. |
| `stage` | `NSString` | The stage used for the long app.link URL, indicating what part of a funnel the user is in. |
| `alias` | `NSString` | The alias for the long app.link URL. **Warning**: If you pass an alias that is already taken, the method call will fail. |

#### Example Usage

::: code-group

```swift [Swift]
// The usage type of `getLongAppLinkURLWithParams()` will default to unlimited

let params: [String: Any] = [
    "key1": "value1",
    "key2": "value2"
]

let longAppUrl = Branch.getInstance().getLongAppLinkURL(withParams: params, andChannel: "channel", andTags: ["tag1"], andFeature: "feature", andStage: "stage", andAlias: "testingLinkAlias123")
```

```objectivec [Objective-C]
// The usage type of `getLongAppLinkURLWithParams()` will default to unlimited

NSDictionary *params = @{
    @"key1": @"value1",
    @"key2": @"value2"
};

NSString *longAppUrl = [[Branch getInstance] getLongAppLinkURLWithParams:params andChannel:@"channel" andTags:@[@"tag1"] andFeature:@"feature" andStage:@"stage" andAlias:@"testingLinkAlias123"];
```

:::

---

## getShortURLWithCallback (async)

**Warning**: This method **should only be invoked after** `initSession()` completes, either within the callback or after a delay. If it is invoked before, Branch will silently initialize the SDK before the callback has been set, in order to carry out this method's required task. As a result, **you may experience issues** where the `initSession()` callback does not fire.

| Method | Description |
| --- | --- |
| [(void)getShortURLWithCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL without any items specified. |

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `callbackWithUrl` | Callback called with the short URL. |

#### Example Usage

::: code-group

```swift [Swift]
// The usage type of `getShortURLWithCallback()` will default to unlimited

Branch.getInstance().getShortURLWithCallback { (url, error) in
	print("Generated short URL: \(url)")
}
```

```objectivec [Objective-C]
// The usage type of `getShortURLWithCallback()` will default to unlimited

NSDictionary *params = @{
	@"key1": @"value1",
	@"key2": @"value2"
};
  
[[Branch getInstance] getShortURLWithCallback:^(NSString * _Nullable url, NSError * _Nullable error) {
    NSLog(@"Generated short URL: %@", url);
}];
```

:::

---

## getShortURLWithParams (async, without tags)

**Warning**: The variations of `getShortURLWithParams()` in this table **should only be invoked after** `initSession()` completes, either within the callback or after a delay. If it is invoked before, Branch will silently initialize the SDK before the callback has been set, in order to carry out this method's required task. As a result, **you may experience issues** where the `initSession()` callback does not fire.

| Method | Description |
| --- | --- |
| [(void)getShortURLWithParams:(nullable NSDictionary \*)params andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL without any items specified. |
| [(void)getShortURLWithParams:(nullable NSDictionary )params andChannel:(nullable NSString )channel andFeature:(nullable NSString \*)feature andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, channel, and feature. |
| [(void)getShortURLWithParams:(nullable NSDictionary )params andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, channel, feature, and stage. |
| [(void)getShortURLWithParams:(nullable NSDictionary )params andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andAlias:(nullable NSString \*)alias andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, channel, feature, stage, and alias. **Warning**: If you pass an alias that is already taken, the method call will fail. |
| [(void)getShortURLWithParams:(nullable NSDictionary )params andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andType:(BranchLinkType)type andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, channel, feature, stage, and link type. |
| [(void)getShortURLWithParams:(nullable NSDictionary )params andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andMatchDuration:(NSUInteger)duration andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, channel, feature, stage, and match duration. |

| Argument | Type | Description |
| --- | --- | --- |
| `params` | `NSDictionary` | Dictionary of parameters to include in the short URL. |
| `callback` | `callbackWithUrl` | Callback called with the short URL. |
| `channel` | `NSString` | The channel for the short URL. Examples include Facebook, Twitter, and SMS, depending on where it will be shared. |
| `feature` | `NSString` | The feature the short URL is utilizing. Examples include Sharing, Referring, Inviting, etc. |
| `stage` | `NSString` | The stage used for the generated short URL, indicating what part of a funnel the user is in. |
| `alias` | `NSString` | The alias for the short URL. **Warning**: If you pass an alias that is already taken, the method call will fail. |
| `type` | `BranchLinkType` | The type of short URL this is, either single use or unlimited use. Single use means once **per user**. |
| `duration` | `NSUInteger` | How long to keep an unmatched link click in Branch's backend server queue before discarding. |

#### Example Usage

::: code-group

```swift [Swift]
// Warning: This method should only be invoked after `initSession()` completes, either within the callback or after a delay
// The usage type of `getShortURLWithParams()` will default to unlimited

let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.channel = "facebook"
linkProperties.feature = "sharing"
linkProperties.campaign = "content 123 launch"
linkProperties.stage = "new user"
linkProperties.alias = "myapp.com/customalias"
linkProperties.matchDuration = 0

func getShortUrl(params: [AnyHashable : Any], linkProperties: BranchLinkProperties, completion: @escaping (String?, Error?)->(Void)) -> Void {
	Branch.getInstance().getShortUrl(withParams: params, andChannel: linkProperties.channel, andFeature: linkProperties.feature, andStage: linkProperties.stage, andAlias: linkProperties.alias) { (url, error) in
		if (error == nil) {
			completion(url, nil)
		} else {
			completion(nil, error)
		}
	}
}
```

```objectivec [Objective-C]
// Warning: This method should only be invoked after `initSession()` completes, either within the callback or after a delay
// The usage type of `getShortURLWithParams()` will default to unlimited

Branch *branch = [Branch getInstance];
[branch getShortURLWithParams:nil andChannel:@"facebook" andFeature:nil andCallback:^(NSString *url, NSError *error) {
	// Do stuff with URL here
}];
```

:::

---

## getShortURLWithParams (async, with tags)

**Warning**: The variations of `getShortURLWithParams()` in this table **should only be invoked after** `initSession()` completes, either within the callback or after a delay. If it is invoked before, Branch will silently initialize the SDK before the callback has been set, in order to carry out this method's required task. As a result, **you may experience issues** where the `initSession()` callback does not fire.

| Method | Description |
| --- | --- |
| [(void)getShortURLWithParams:(nullable NSDictionary \*)params andTags:(nullable NSArray \*)tags andChannel:(nullable NSString \*)channel andFeature:(nullable NSString \*)feature andStage:(nullable NSString \*)stage andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, tags, channel, feature, and stage. |
| [(void)getShortURLWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andAlias:(nullable NSString )alias andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, tags, channel, feature, stage, and alias. **Warning**: If you pass an alias that is already taken, the method call will fail. |
| [(void)getShortURLWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString \*)stage andType:(BranchLinkType)type andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, tags, channel, feature, stage, and link type. |
| [(void)getShortURLWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString \*)stage andMatchDuration:(NSUInteger)duration andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, tags, channel, feature, stage, and match duration. |
| [(void)getShortUrlWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andAlias:(nullable NSString )alias andMatchDuration:(NSUInteger)duration andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, tags, alias, match duration, channel, feature, and stage. **Warning**: If you pass an alias that is already taken, the method call will fail. |
| [void)getShortUrlWithParams:(nullable NSDictionary )params andTags:(nullable NSArray )tags andAlias:(nullable NSString )alias andMatchDuration:(NSUInteger)duration andChannel:(nullable NSString )channel andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andCampaign:(nullable NSString \*)campaign andCallback:(nullable callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a short URL with the specified parameters, tags, alias, match duration, channel, feature, stage, and campaign. **Warning**: If you pass an alias that is already taken, the method call will fail. |

| Argument | Type | Description |
| --- | --- | --- |
| `params` | `NSDictionary` | Dictionary of parameters to include in the short URL. |
| `tags` | `NSArray` | An array of tags to associate with the short URL. Useful for tracking. |
| `callback` | `callbackWithUrl` | Callback called with the short URL. |
| `channel` | `NSString` | The channel for the short URL. Examples include Facebook, Twitter, and SMS, depending on where it will be shared. |
| `feature` | `NSString` | The feature the short URL is utilizing. Examples include Sharing, Referring, Inviting, etc. |
| `stage` | `NSString` | The stage used for the generated short URL, indicating what part of a funnel the user is in. |
| `alias` | `NSString` | The alias for the short URL. **Warning**: If you pass an alias that is already taken, the method call will fail. |
| `type` | `BranchLinkType` | The type of short URL this is, either single use or unlimited use. Single use means once **per user**. |
| `duration` | `NSUInteger` | How long to keep an unmatched link click in Branch's backend server queue before discarding. |

#### Example Usage

::: code-group

```swift [Swift]
// Warning: This method should only be invoked after `initSession()` completes, either within the callback or after a delay
// The usage type of `getShortURLWithParams()` will default to unlimited

let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.channel = "facebook"
linkProperties.feature = "sharing"
linkProperties.campaign = "content 123 launch"
linkProperties.stage = "new user"
linkProperties.tags = ["one", "two", "three"]
linkProperties.alias = "myapp.com/customalias"
linkProperties.matchDuration = 0

func generateShortUrl(params: [AnyHashable : Any], linkProperties: BranchLinkProperties, completion: @escaping (String?, Error?)->(Void)) -> Void {
	Branch.getInstance().getShortUrl(withParams: params, andTags: linkProperties.tags, andAlias: linkProperties.alias, andMatchDuration: linkProperties.matchDuration, andChannel: linkProperties.channel, andFeature: linkProperties.feature, andStage: linkProperties.stage, andCampaign: linkProperties.campaign) { (url, error) in
		if (error == nil) {
			completion(url, nil)
		} else {
			completion(nil, error)
		}
	}
}
```

```objectivec [Objective-C]
// Warning: This method should only be invoked after `initSession()` completes, either within the callback or after a delay
// The usage type of `getShortURLWithParams()` will default to unlimited

BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"share";
linkProperties.channel = @"facebook";
linkProperties.stage = @"new user";
linkProperties.tags = @["one", "two", "three"]

Branch *branch = [Branch getInstance];
[branch getShortURLWithParams:nil andTags:linkProperties.tags andChannel:linkProperties.channel andFeature:linkProperties.feature andStage:linkProperties.stage andCallback:^(NSString *url, NSError *error) {
	// Do stuff with URL here
}];
```

:::

---

## getSpotlightUrlWithParams (async)

**Warning**: This method **should only be invoked after** `initSession()` completes, either within the callback or after a delay. If it is invoked before, Branch will silently initialize the SDK before the callback has been set, in order to carry out this method's required task. As a result, **you may experience issues** where the `initSession()` callback does not fire.

| Method | Description |
| --- | --- |
| [(void)getSpotlightUrlWithParams:(NSDictionary \*)params callback:(callbackWithParams)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a Spotlight URL with specified parameters. |

| Argument | Type | Description |
| --- | --- | --- |
| `params` | `NSDictionary` | Dictionary of parameters to include in the Spotlight URL. |
| `callback` | `callbackWithParams` | Callback called with the Spotlight URL. |

#### Example Usage

::: code-group

```swift [Swift]
// Warning: This method should only be invoked after `initSession()` completes, either within the callback or after a delay

let params: [String: Any] = [
    "key1": "value1",
    "key2": "value2"
]

Branch.getInstance().getSpotlightUrl(withParams: params) { (returnedParams, error) in
	if let url = returnedParams?["url"] as? String {
		print("Got spotlight URL with params: \(url)")
	}
}
```

```objectivec [Objective-C]
// Warning: This method should only be invoked after `initSession()` completes, either within the callback or after a delay

NSDictionary *params = @{
    @"key1": @"value1",
    @"key2": @"value2"
};

[[Branch getInstance] getSpotlightUrlWithParams:params callback:^(NSDictionary * _Nullable returnedParams, NSError * _Nullable error) {
	NSLog(@"Got spotlight URL with params: %@", returnedParams[@"url"]);
}];
```

:::

---

## setODMInfo

| **Method** | Description |
| --- | --- |
| [+(void)setODMInfo:(NSString \*)odmInfo andFirstOpenTimestamp:(NSDate \*) firstOpenTimestamp;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Passes ODM info to the Branch iOS SDK. |

| **Argument** | Type | **Description** |
| --- | --- | --- |
| `odmInfo` | `NSString` | The ODM event data (or aggregate conversion info) for the current app instance. |
| `firstOpenTimestamp` | `NSDate` | The date and time when the app was first opened after installation. This timestamp is used for conversion attribution timing and should match the value passed to Google's `setFirstLaunchTime` method. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.setODMInfo(aggregateConversionInfo, andFirstOpenTimestamp: firstLaunchTime)
```

```objectivec [Objective-C]
[Branch setODMInfo:aggregateConversionInfo andFirstOpenTimestamp:firstLaunchTime];
```

:::

---

## setSDKWaitTimeForThirdPartyAPIs

| **Method** | **Description** |
| --- | --- |
| [+ (void)setSDKWaitTimeForThirdPartyAPIs:(NSTimeInterval)waitTime;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Configure SDK wait duration for third-party API responses (ODM info and Apple Attribution Token) |

| **Variable** | **Type** | **Restrictions** | **Description** |
| --- | --- | --- | --- |
| `waitTime` | `NSTimeInterval` | 0 < `waitTime` ≤ 10 | Number of seconds SDK will wait for third party APIs to finish. Default is 0.5 seconds (500ms). |

#### Example Usage

::: code-group

```swift [Swift]
Branch.setSDKWaitTimeForThirdPartyAPIs(5.0)
let branch: Branch = Branch.getInstance()
```

```objectivec [Objective-C]
[Branch setSDKWaitTimeForThirdPartyAPIs:5.0];
Branch *branch = [Branch getInstance];
```

:::

---

## setAnonID

| **Method** | **Description** |
| --- | --- |
| [+ (void)setAnonID:(NSString \*)anonID;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Sets a custom Meta `anon_id` for the current user.    The Meta `anon_id` is a GUID generated by the Branch iOS SDK for Meta AEM. Read more [here](https://help.branch.io/docs/enable-app-aggregated-event-measurement-support). |

| **Variable** | **Type** | **Description** |
| --- | --- | --- |
| `setAnonID` | `NSString` | The custom Meta `anon_id` to set for the user. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.setAnonID("your-custom-anon-id")
```

```objectivec [Objective-C]
[Branch setAnonID:@"your-custom-anon-id"];
```

:::

---

## createDiscoverableContentWithTitle

**Warning**: The variations of `createDiscoverableContentWithTitle` in this table are only useable in iOS 9 or above - earlier versions will simply receive the callback with an error.

| Method | Description |
| --- | --- |
| [(void)createDiscoverableContentWithTitle:(NSString \*)title description:(NSString \*)description;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. It will not be public by default. Type defaults to `kUTTypeImage`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description callback:(callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. It will not be public by default. Type defaults to `kUTTypeImage`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description publiclyIndexable:(BOOL)publiclyIndexable callback:(callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. Type defaults to `kUTTypeImage`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description type:(NSString \*)type publiclyIndexable:(BOOL)publiclyIndexable callback:(callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable callback:(callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet \*)keywords callback:(callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl linkParams:(NSDictionary )linkParams publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet \*)keywords;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl linkParams:(NSDictionary )linkParams type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet )keywords;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet \*)keywords;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl linkParams:(NSDictionary )linkParams publiclyIndexable:(BOOL)publiclyIndexable;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl linkParams:(NSDictionary )linkParams type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet )keywords callback:(callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl linkParams:(NSDictionary )linkParams type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet )keywords expirationDate:(NSDate \*)expirationDate callback:(callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl canonicalId:(NSString )canonicalId linkParams:(NSDictionary )linkParams type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet )keywords expirationDate:(NSDate )expirationDate callback:(callbackWithUrl)callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl linkParams:(NSDictionary )linkParams type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet )keywords expirationDate:(NSDate \*)expirationDate spotlightCallback:(callbackWithUrlAndSpotlightIdentifier)spotlightCallback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |
| [(void)createDiscoverableContentWithTitle:(NSString )title description:(NSString )description thumbnailUrl:(NSURL )thumbnailUrl canonicalId:(NSString )canonicalId linkParams:(NSDictionary )linkParams type:(NSString )type publiclyIndexable:(BOOL)publiclyIndexable keywords:(NSSet )keywords expirationDate:(NSDate )expirationDate spotlightCallback:(callbackWithUrlAndSpotlightIdentifier)spotlightCallback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Take the current screen and make it discoverable, adding it to Apple's Core Spotlight index. Will be public if specified. You can override the type as desired, using one of the types provided in `MobileCoreServices`. |

| Argument | Type | Description |
| --- | --- | --- |
| `title` | `NSString` | Title for the Spotlight preview item. |
| `description` | `NSString` | Description for the Spotlight preview item. |
| `callback` | `callWithUrl` | Callback called with the Branch URL this will fallback to. |
| `publiclyIndexable` | `BOOL` | Whether or not this item should be added to Apple's public search index. |
| `type` | `NSString` | The type to use for the `NSUserActivity`, taken from the list of constants provided in the MobileCoreServices framework. |
| `thumbnailUrl` | `NSURL` | URL to an image to be used for the thumbnail in Spotlight. |
| `keywords` | `NSSet` | A set of keywords to be used in Apple's search index. |
| `linkParams` | `NSDictionary` | Additional params to be added to the `NSUserActivity`. These will also be added to the Branch link. |
| `expirationDate` | `NSDate` | Expiration date after which this will not appear in Apple's search index |
| `canonicalId` | `NSString` | The canonical identifier for the content for deduplication. |
| `spotlightCallback` | `callbackWithUrlAndSpotlightIdentifier` | Callback called with the Branch URL this will fallback to. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().createDiscoverableContent(withTitle: "Discover Branch", description: "Content Description")
```

```objectivec [Objective-C]
[[Branch getInstance] createDiscoverableContentWithTitle:self.title
description:self.contentDescription
thumbnailUrl:[NSURL URLWithString:self.imageUrl]
canonicalId:self.canonicalIdentifier
linkParams:metadataAndProperties.copy
type:self.type
publiclyIndexable:publiclyIndexable
keywords:[NSSet setWithArray:self.keywords]
expirationDate:self.expirationDate
spotlightCallback:spotlightCallback];
```

:::

---

## indexOnSpotlightWithBranchUniversalObject

**Warning**: This method is only useable in iOS 9 or above - earlier versions will simply receive the callback with an error.

| Method | Description |
| --- | --- |
| [(void)indexOnSpotlightWithBranchUniversalObject:(BranchUniversalObject )universalObject linkProperties:(nullable BranchLinkProperties )linkProperties completion:(void (^) (BranchUniversalObject universalObject, NSString url,NSError \*error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Get a Spotlight URL with specified parameters. |

| Argument | Type | Description |
| --- | --- | --- |
| `universalObject` | `BranchUniversalObject` | Dictionary of parameters to include in the Spotlight URL. |
| `linkProperties` | `BranchLinkProperties` | Callback called with the Spotlight URL. |
| `completion` | `BranchUniversalObject` or `NSString` or `NSError` | Callback called when all Branch Universal Object instance are indexed. Dynamic URL generated and saved as Spotlight identifier. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

Branch.getInstance().indexOnSpotlight(with: buo, linkProperties: lp) { (universalObject, url, error) in
	print("Indexed Branch Universal Object instance on Spotlight.")
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [[BranchLinkProperties alloc] init];

[[Branch getInstance] indexOnSpotlightWithBranchUniversalObject:buo linkProperties:lp completion:^(BranchUniversalObject * _Nonnull universalObject, NSString * _Nonnull url, NSError * _Nonnull error) {
	NSLog(@"Indexed Branch Universal Object instance on Spotlight.");
}];
```

:::

---

## indexOnSpotlightUsingSearchableItems

**Warning**: This method is only useable in iOS 9 or above - earlier versions will simply receive the callback with an error.

| Method | Description |
| --- | --- |
| [(void)indexOnSpotlightUsingSearchableItems:(NSArray<BranchUniversalObject\*>\*)universalObjects completion:(void (^) (NSArray<BranchUniversalObject\*>\* universalObjects, NSError\* error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Index multiple Branch Universal Object instances using `SearchableItem` from Apple's CoreSpotlight. Content indexed is private irrespective of the `ContentIndexMode` value of the BUOs. |

| Argument | Type | Description |
| --- | --- | --- |
| `universalObjects` | `NSArray<BranchUniversalObject>` | Multiple Branch Universal Object instances are indexed on Spotlight using Spotlight metadata. |
| `completion` | `NSArray<BranchUniversalObject>` or `NSError` | Callback called when all Branch Universal Object instances are indexed. The dynamic URL generated is returned as the `spotlightIdentifier` of the BUO. Use this identifier to remove content from Spotlight. |

#### Example Usage

::: code-group

```swift [Swift]
let buoArray: [BranchUniversalObject] = [
  BranchUniversalObject(canonicalIdentifier: "item/12345"),
  BranchUniversalObject(canonicalIdentifier: "item/6789")
]

Branch.getInstance().indexOnSpotlight(usingSearchableItems: buoArray) { (universalObjects, error) in
	print("Indexed Branch Universal Object instance on Spotlight.")
}
```

```objectivec [Objective-C]
NSArray<BranchUniversalObject *> *buoArray = @[
  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"],
  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/6789"]
];

[[Branch getInstance] indexOnSpotlightUsingSearchableItems:buoArray completion:^(NSArray<BranchUniversalObject *> * _Nonnull universalObjects, NSError * _Nonnull error) {
	NSLog(@"Indexed Branch Universal Object instance on Spotlight.");
}];
```

:::

---

## removeSearchableItemWithBranchUniversalObject

**Warning**: This method is only useable in iOS 9 or above - earlier versions will simply receive the callback with an error.

| Method | Description |
| --- | --- |
| [(void)removeSearchableItemWithBranchUniversalObject:(BranchUniversalObject )universalObject callback:(void (^\_Nullable)(NSError \_Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Remove indexing of a Branch Universal Object instance, which is indexed using `SearchableItem` from Apple's CoreSpotlight. |

| Argument | Type | Description |
| --- | --- | --- |
| `universalObject` | `BranchUniversalObject` | The Branch Universal Object instance that is to be removed from indexing. |
| `completion` | `void (^_Nullable)(NSError * _Nullable error)` | Called when the request has been journaled by the index. Here “journaled” means that the index makes a note that it has to perform this operation. Note that the request may not have completed. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")

Branch.getInstance().removeSearchableItem(with: buo) { (universalObject, error) in
	print("Removed Branch Universal Object instance from Spotlight.")                                                                          
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];

[[Branch getInstance] removeSearchableItemWithBranchUniversalObject:buo completion:^(BranchUniversalObject * _Nonnull universalObject, NSError * _Nonnull error) {
	NSLog(@"Removed Branch Universal Object instance on Spotlight.");
}];
```

:::

---

## removeSearchableItemsWithBranchUniversalObject

**Warning**: This method is only useable in iOS 9 or above - earlier versions will simply receive the callback with an error.

| Method | Description |
| --- | --- |
| [(void)removeSearchableItemsWithBranchUniversalObjects:(NSArray<BranchUniversalObject\*> )universalObjects callback:(void (^\_Nullable)(NSError \_Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Remove indexing of an array of Branch Universal Object instances, which are indexed using `SearchableItem` from Apple's CoreSpotlight. |

| Argument | Type | Description |
| --- | --- | --- |
| `universalObjects` | `NSArray<BranchUniversalObject>` | The Branch Universal Object instances to remove from Spotlight indexing. Note: The Spotlight identifier of the BUO is used to remove indexing. |
| `completion` | `void (^_Nullable)(NSError * _Nullable error)` | Called when the request has been journaled by the index. Here “journaled” means that the index makes a note that it has to perform this operation. Note that the request may not have completed. |

#### Example Usage

::: code-group

```swift [Swift]
let buoArray: [BranchUniversalObject] = [
  BranchUniversalObject(canonicalIdentifier: "item/12345"),
  BranchUniversalObject(canonicalIdentifier: "item/6789")
]

Branch.getInstance().removeSearchableItems(with: buoArray) { (universalObjects, error) in
	print("Removed Branch Universal Object instances on Spotlight.")
}
```

```objectivec [Objective-C]
NSArray<BranchUniversalObject *> *buoArray = @[
  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"],
  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/6789"]
];

[[Branch getInstance] removeSearchableItemsWithBranchUniversalObject:buoArray completion:^(NSArray<BranchUniversalObject *> * _Nonnull universalObjects, NSError * _Nonnull error) {
	NSLog(@"Indexed Branch Universal Object instance on Spotlight.");
}];
```

:::

---

## removeAllPrivateContentFromSpotLightWithCallback

**Warning**: This method is only useable in iOS 9 or above - earlier versions will simply receive the callback with an error.

| Method | Description |
| --- | --- |
| [(void)removeAllPrivateContentFromSpotLightWithCallback:(void (^\_Nullable)(NSError \* \_Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Remove all content Spotlight indexed, through either `SearchableItem` or privately indexed Branch Universal Object instances. |

| Argument | Type | Description |
| --- | --- | --- |
| `completion` | `void (^_Nullable)(NSError * _Nullable error)` | Called when the request has been journaled by the index. Here “journaled” means that the index makes a note that it has to perform this operation. Note that the request may not have completed. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().removeAllPrivateContentFromSpotLight { (error) in
    print("Removed all private content from Spotlight.")
}
```

```objectivec [Objective-C]
[[Branch getInstance] removeAllPrivateContentFromSpotLightWithCallback:^(NSError * _Nullable error) {
	NSLog(@"Removed all private content from Spotlight.");
}];
```

:::

---

## passPasteItemProviders

**Warnings**:

- This function only works with iOS 16 or above.
- Do not call both `checkPasteboardOnInstall()` and `passPasteItemProviders()`, or use `BranchPasteControl` without properly version checking, as `checkPasteboardOnInstall()` will be called on iOS 16+ as well.

| Method | Description |
| --- | --- |
| [(void)passPasteItemProviders:(NSArray<NSItemProvider > )itemProviders API\_AVAILABLE(ios(16));](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/BranchSDK/Public/Branch.h) | Pass pasteboard items to the Branch SDK when the user implements `UIPasteControl` on their end. Branch SDK retrieves the URL from these item providers, if any, to support Branch NativeLink functionality. |

| Argument | Type | Description |
| --- | --- | --- |
| `itemProviders` | `NSArray<NSItemProvider>` | An array of item providers collected from the pasteboard. |

#### Example Usage

::: code-group

```swift [Swift]
// Inside the ViewController
override func paste(itemProviders: [NSItemProvider]) {
	if #available(iOS 16.0, *) {
		Branch.getInstance().passPaste(itemProviders)
	} else {
		// Fallback on earlier versions
	}
}
```

```objectivec [Objective-C]
// Inside the ViewController
if (@available(iOS 16.0, *)) {
	[[Branch getInstance] passPasteItemProviders:itemProviders]
}
```

:::

---

## setLogInAppPurchasesAsEventsEnabled

| Method | Description |
| --- | --- |
| [(void)setLogInAppPurchasesAsEventsEnabled:(BOOL)enabled;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchEvent.h) | Log in-app purchases as Branch Events. |

| Argument | Type | Description |
| --- | --- | --- |
| `enabled` | `BOOL` | Set to `true` to log in-app purchases as events. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().setLogInAppPurchasesAsEventsEnabled(true)
```

```objectivec [Objective-C]
[[Branch getInstance] setLogInAppPurchasesAsEventsEnabled:YES];
```

:::

---

## logInAppPurchasesBranchEventsEnabled

| Method | Description |
| --- | --- |
| [(BOOL)logInAppPurchasesBranchEventsEnabled;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchEvent.h) | Check to see if you are tracking in-app purchases as Branch Events. Returns `true` if you are tracking in-app purchases as Branch Events. |

#### Example Usage

::: code-group

```swift [Swift]
Branch.getInstance().logInAppPurchasesBranchEventsEnabled()
```

```objectivec [Objective-C]
[[Branch getInstance] logInAppPurchasesBranchEventsEnabled];
```

:::

---

## logEventWithCompletion

| Method | Description |
| --- | --- |
| [(void)logEventWithCompletion:(void (^\_Nullable)(BOOL success, NSError \* \_Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchEvent.h) | Logs the event on the Branch server. This version will callback on success/failure. |

| Argument | Type | Description |
| --- | --- | --- |
| `completion` | `void (^_Nullable)(BOOL success, NSError * _Nullable error)` | Completion handler containing any potential error. |

#### Example Usage

::: code-group

```swift [Swift]
// This method should only be invoked after `initSession()`
// If it's invoked before, Branch will silently initialize the SDK before the callback has been set

let event = BranchEvent(standardEvent: .addToCart)
event.logEvent { (success, error) in
    print("Event logged: \(success)")
}
```

```objectivec [Objective-C]
// This method should only be invoked after `initSession()`
// If it's invoked before, Branch will silently initialize the SDK before the callback has been set

// Example 1
event = [BranchEvent standardEvent:BranchStandardEventInitiatePurchase];
[event logEventWithCompletion:^(BOOL success, NSError * _Nullable error) {
	if (success) {
		[self showAlert:@"Succesfully logged commerce event" withDescription:@""];
	} else {
		[self showAlert:@"Error sending commerce event:" withDescription:error.description];
	}
}];

// Example 2
BranchEvent *event = [BranchEvent standardEvent:BranchStandardEventAddToCart];
[event logEventWithCompletion:^(BOOL success, NSError * _Nullable error) {
    NSLog(@"Event logged: %@", @(success));
}];
```

:::

---

## logEvent

| Method | Description |
| --- | --- |
| [(void)logEvent;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchEvent.h) | Logs the event on the Branch server. This version automatically caches and retries as necessary. To learn more about creating a Branch Universal Object (BUO) instance to associate with the Branch Event, follow the examples in [this guide](create-branch-objects-and-events.md). |

#### Example Usage

::: code-group

```swift [Swift]
// This method should only be invoked after `initSession()`
// If it's invoked before, Branch will silently initialize the SDK before the callback has been set

// Create a Branch Event (this example uses the `Purchase` event)
let event = BranchEvent.standardEvent(.purchase)

// Add a populated `BranchUniversalObject` to the event
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
event.contentItems     = [ buo ]

// Add additional event data
event.alias = "my custom alias"
event.transactionID = "12344555"
event.eventDescription = "event_description"
event.searchQuery = "item 123"
event.customData = [
    "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
    "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
]

// Log the event
event.logEvent()
```

```objectivec [Objective-C]
// This method should only be invoked after `initSession()`
// If it is invoked before, Branch will silently initialize the SDK before the callback has been set

// Create a Branch Event (this example uses the `BranchStandardEventAddToCart` event)
BranchEvent *event     = [BranchEvent standardEvent:BranchStandardEventAddToCart];

// Add a populated `BranchUniversalObject` to the event
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
event.contentItems     = (id) @[ buo ];

// Add additional event data
event.alias = @"my custom alias";
event.transactionID = @"12344555";
event.eventDescription = @"event_description";
event.searchQuery = @"item 123";
event.customData = (NSMutableDictionary*) @{
    @"Custom_Event_Property_Key1": @"Custom_Event_Property_val1",
    @"Custom_Event_Property_Key2": @"Custom_Event_Property_val2"
};

// Log the event
[event logEvent];
```

:::

---

## logEventWithTransaction

| Method | Description |
| --- | --- |
| [(void) logEventWithTransaction:(SKPaymentTransaction\*\_Nonnull)transaction;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchEvent.h) | Log an `SKPaymentTransaction` as a Branch Event. |

| Argument | Type | Description |
| --- | --- | --- |
| `transaction` | `SKPaymentTransaction` | The `SKPaymenTransaction` to log as a Branch Event. |

#### Example Usage

::: code-group

```swift [Swift]
let event = BranchEvent(name: "PURCHASE")
event.logEvent(with: transaction as! SKPaymentTransaction)
```

```objectivec [Objective-C]
BranchEvent *event = [[BranchEvent alloc] initWithName:@"eventName"];
[event logEventWithTransaction:(SKPaymentTransaction *)transaction];
```

:::

---

## addControlParam

| Method | Description |
| --- | --- |
| [(void)addControlParam:(NSString )controlParam withValue:(NSString )value;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchLinkProperties.h) | Add a control parameter to a Branch Link Properties object. |

| Argument | Type | Description |
| --- | --- | --- |
| `controlParam` | `NSString` | The name of the control parameter. |
| `value` | `NSString` | The value of the control parameter. |

#### Example Usage

::: code-group

```swift [Swift]
let lp = BranchLinkProperties()
lp.addControlParam("$desktop_url", withValue: "http://example.com/desktop")
lp.addControlParam("$ios_url", withValue: "http://example.com/ios")
lp.addControlParam("$ipad_url", withValue: "http://example.com/ios")
lp.addControlParam("$android_url", withValue: "http://example.com/android")
lp.addControlParam("$match_duration", withValue: "2000")
lp.addControlParam("custom_data", withValue: "yes")
lp.addControlParam("look_at", withValue: "this")
lp.addControlParam("nav_to", withValue: "over here")
lp.addControlParam("random", withValue: UUID.init().uuidString)
```

```objectivec [Objective-C]
BranchLinkProperties *lp = [[BranchLinkProperties alloc] init];
lp.feature = @"facebook";
lp.channel = @"sharing";
lp.campaign = @"content 123 launch";
lp.stage = @"new user";
lp.tags = @[@"one", @"two", @"three"];

[lp addControlParam:@"$desktop_url" withValue: @"http://example.com/desktop"];
[lp addControlParam:@"$ios_url" withValue: @"http://example.com/ios"];
[lp addControlParam:@"$ipad_url" withValue: @"http://example.com/ios"];
[lp addControlParam:@"$android_url" withValue: @"http://example.com/android"];
[lp addControlParam:@"$match_duration" withValue: @"2000"];

[lp addControlParam:@"custom_data" withValue: @"yes"];
[lp addControlParam:@"look_at" withValue: @"this"];
[lp addControlParam:@"nav_to" withValue: @"over here"];
[lp addControlParam:@"random" withValue: [[NSUUID UUID] UUIDString]];
```

:::

---

## getBranchLinkPropertiesFromDictionary

| Method | Description |
| --- | --- |
| [(BranchLinkProperties )getBranchLinkPropertiesFromDictionary:(NSDictionary )dictionary;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchLinkProperties.h) | Converts a given dictionary into a `BranchLinkProperties` object. This enables seamless mapping between dictionary-based data representations and the SDK's native data models, allowing for a more flexible and convenient way to handle link properties. Returns a `BranchLinkProperties` object populated with the values from the provided dictionary. |

| Argument | Type | Description |
| --- | --- | --- |
| `dictionary` | `NSDictionary` | A dictionary containing key-value pairs that map to the properties of a `BranchLinkProperties` object. |

#### Example Usage

::: code-group

```swift [Swift]
let lp = BranchLinkProperties.getBranchLinkProperties(from: lpDictionary)
```

```objectivec [Objective-C]
// Example 1
NSDictionary *params = [self getFirstReferringParams];
if ([[params objectForKey:BRANCH_INIT_KEY_CLICKED_BRANCH_LINK] isEqual:@1]) {
	return [BranchLinkProperties getBranchLinkPropertiesFromDictionary:params];
}

// Example 2
BranchLinkProperties *lp = [BranchLinkProperties getBranchLinkPropertiesFromDictionary:lpDictionary];
```

:::

---

## initWithFrame (BranchPasteControl)

| Method | Description |
| --- | --- |
| [@interface BranchPasteControl : UIView <UIPasteConfigurationSupporting> - (instancetype)initWithFrame:(CGRect)frame AndConfiguration:( UIPasteControlConfiguration \* Nullable) config NSDESIGNATED\_INITIALIZER; @end](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchPasteControl.h) | Use the wrapper class `BranchPasteControl` to automatically conform to Apple's `UIPasteConfigurationSupporting` protocol. |

| Argument | Type | Description |
| --- | --- | --- |
| `frame` | `CGRect` | A `CGRect` specifying the dimensions and position for the view. |
| `config` | `UIPasteControlConfiguration` | An optional `UIPasteControlConfiguration` object that contains settings for customizing the paste functionality. |

#### Example Usage

::: code-group

```swift [Swift]
// Inside the ViewController
if #available(iOS 16.0, *) {
	// Setup `UIPasteControl` configuration
	let pcConfig = UIPasteControl.Configuration()
	pcConfig.baseBackgroundColor = UIColor.blue
	pcConfig.displayMode = UIPasteControl.DisplayMode.iconOnly

	// Create frame and button
	let frameDimension = CGRect(x: 0, y: 0, width: 40, height: 40)
	let bc = BranchPasteControl(frame: frameDimension, andConfiguration: pcConfig)

	// Add `BranchPasteControl` button to superview
	view.addSubview(bc)
}
```

```objectivec [Objective-C]
// Inside the ViewController
if (@available(iOS 16.0, *)) {
  // Setup `UIPasteControl` configuration
  UIPasteControlConfiguration *pcConfig = [[UIPasteControlConfiguration alloc] init];
  pcConfig.baseBackgroundColor = UIColor.blueColor;
  pcConfig.displayMode = UIPasteControlDisplayModeIconOnly;

  // Create frame and button
  CGRect frameDimension = CGRectMake(0, 0, 120.0, 30.0);
  BranchPasteControl *bc = [[BranchPasteControl alloc] initWithFrame:frameDimension AndConfiguration:pcConfig];

  // Add `BranchPasteControl` button to superview
  [view addSubview:bc];
}
```

:::

---

## showShareSheetWithQRCodeFromViewController

| Method | Description |
| --- | --- |
| [(void)showShareSheetWithQRCodeFromViewController:(nullable UIViewController )viewController anchor:(nullable id)anchorViewOrButtonItem universalObject:(nullable BranchUniversalObject )buo linkProperties:(nullable BranchLinkProperties )lp completion:(void(^)(NSError \_Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchQRCode.h) | Create a Branch QR Code image and display it in a Share Sheet. |

| Argument | Type | Description |
| --- | --- | --- |
| `viewController` | `UIViewController` | The ViewController. |
| `anchorViewOrButtonItem` | `id` | Specifies the anchor UI element for presenting the Share Sheet. Accepts either a `UIView` or a `UIBarButtonItem`. If nil, the Share Sheet will appear centered. |
| `buo` | `BranchUniversalObject` | The Branch Universal Object instance to share. |
| `lp` | `BranchLinkProperties` | The Branch Link Properties object to associate with the Branch QR Code. |
| `completion` | `NSError` | Completion handler containing any potential error. |

#### Example Usage

::: code-group

```swift [Swift]
let qrCode = BranchQRCode()
qrCode.codeColor = UIColor.white
qrCode.backgroundColor = UIColor.blue
qrCode.centerLogo = "https://cdn.branch.io/branch-assets/1598575682753-og_image.png"
qrCode.width = 1024
qrCode.margin = 1
qrCode.imageFormat = .JPEG

let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

// Display the QR code directly in a share sheet
qrCode.showShareSheetWithQRCode(from: self, anchor: nil, universalObject: buo, linkProperties: lp) { error in
    // Showing a share sheet with the QR code
}
```

```objectivec [Objective-C]
BranchQRCode *qrCode = [BranchQRCode new];
qrCode.codeColor = [[UIColor new] initWithRed:0.1 green:0.8392 blue:0.8667 alpha:1.0];
qrCode.backgroundColor = [UIColor whiteColor];
qrCode.width = @700;
qrCode.margin = @1;
qrCode.centerLogo = @"https://cdn.branch.io/branch-assets/1598575682753-og_image.png";
qrCode.imageFormat = BranchQRCodeImageFormatPNG;
    
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

// Display the QR code directly in a share sheet
[qrCode showShareSheetWithQRCodeFromViewController:self anchor:nil universalObject:buo linkProperties:lp completion:^(NSError * _Nullable error) {
    // Showing a share sheet with the QR code
}];
```

:::

---

## getQRCodeAsData

| Method | Description |
| --- | --- |
| [(void)getQRCodeAsData:(nullable BranchUniversalObject )buo linkProperties:(nullable BranchLinkProperties )lp completion:(void(^)(NSData Nullable qrCode, NSError Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchQRCode.h) | Create a Branch QR Code image. Return the QR code as `NSData`. |

| Argument | Type | Description |
| --- | --- | --- |
| `buo` | `BranchUniversalObject` | The Branch Universal Object instance to share. |
| `lp` | `BranchLinkProperties` | The Branch Link Properties object to associate with the Branch QR Code. |
| `completion` | `NSError` | Completion handler containing a Branch QR Code image or an error. |

#### Example Usage

::: code-group

```swift [Swift]
let qrCode = BranchQRCode()
qrCode.codeColor = UIColor.white
qrCode.backgroundColor = UIColor.blue
qrCode.centerLogo = "https://cdn.branch.io/branch-assets/1598575682753-og_image.png"
qrCode.width = 1024
qrCode.margin = 1
qrCode.imageFormat = .JPEG

let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

qrCode.getAsData(buo, linkProperties: lp) { qrCodeImage, error in
    // Do something with your QR code here...
}
```

```objectivec [Objective-C]
BranchQRCode *qrCode = [BranchQRCode new];
qrCode.codeColor = [[UIColor new] initWithRed:0.1 green:0.8392 blue:0.8667 alpha:1.0];
qrCode.backgroundColor = [UIColor whiteColor];
qrCode.width = @700;
qrCode.margin = @1;
qrCode.centerLogo = @"https://cdn.branch.io/branch-assets/1598575682753-og_image.png";
qrCode.imageFormat = BranchQRCodeImageFormatPNG;
    
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

[qrCode getQRCodeAsData:buo linkProperties:lp completion:^(UIImage * _Nonnull qrCode, NSError * _Nonnull error) {
    // Do something with the QR code here...
}];
```

:::

---

## getQRCodeAsImage

| Method | Description |
| --- | --- |
| [(void)getQRCodeAsImage:(nullable BranchUniversalObject )buo linkProperties:(nullable BranchLinkProperties )lp completion:(void(^)(UIImage Nullable qrCode, NSError Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchQRCode.h) | Create a Branch QR Code image. Return the QR code as `NSData`. |

| Argument | Type | Description |
| --- | --- | --- |
| `buo` | `BranchUniversalObject` | The Branch Universal Object instance to share. |
| `lp` | `BranchLinkProperties` | The Branch Link Properties object to associate with the Branch QR Code. |
| `completion` | `NSError` | Completion handler containing a Branch QR Code image or an error. |

#### Example Usage

::: code-group

```swift [Swift]
let qrCode = BranchQRCode()
qrCode.codeColor = UIColor.white
qrCode.backgroundColor = UIColor.blue
qrCode.centerLogo = "https://cdn.branch.io/branch-assets/1598575682753-og_image.png"
qrCode.width = 1024
qrCode.margin = 1
qrCode.imageFormat = .JPEG

let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

qrCode.getAsImage(buo, linkProperties: lp) { qrCodeImage, error in
    // Do something with your QR code here...
}
```

```objectivec [Objective-C]
BranchQRCode *qrCode = [BranchQRCode new];
qrCode.codeColor = [[UIColor new] initWithRed:0.1 green:0.8392 blue:0.8667 alpha:1.0];
qrCode.backgroundColor = [UIColor whiteColor];
qrCode.width = @700;
qrCode.margin = @1;
qrCode.centerLogo = @"https://cdn.branch.io/branch-assets/1598575682753-og_image.png";
qrCode.imageFormat = BranchQRCodeImageFormatPNG;
    
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

[qrCode getQRCodeAsImage:buo linkProperties:lp completion:^(UIImage * _Nonnull qrCode, NSError * _Nonnull error) {
    // Do something with the QR code here...
}];
```

:::

---

## initSessionWithLaunchOptions (UIScene)

This method is part of the `BranchScene : NSObject` interface. [Learn more](ios-basic-integration.md) about apps using scenes.

| Method | Description |
| --- | --- |
| [(void)initSessionWithLaunchOptions:(nullable NSDictionary )options registerDeepLinkHandler:(void (^ Nonnull)(NSDictionary Nullable params, NSError Nullable error, UIScene Nullable scene))callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchScene.h) | Initialize a Branch session with your app's specific launch options. Callback may contain a `UIScene` object. |

| Argument | Type | Description |
| --- | --- | --- |
| `options` | `NSDictionary` | The launch options provided by your AppDelegate file's `didFinishLaunchingWithOptions:` method. |
| `callback` | `NSDictionary` or `NSError` or `UIScene` | A callback that is called when the session is opened. This will be called multiple times during the app's life, including any time the app goes through a background/foreground cycle. |

#### Example Usage

::: code-group

```swift [Swift]
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

	func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
		// Override point for customization after application launch

		BranchScene.shared().initSession(launchOptions: launchOptions, registerDeepLinkHandler: { (params, error, scene) in  
                                                                                             
		})
		return true
	}
}
```

```objectivec [Objective-C]
@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.

    [[BranchScene shared] initSessionWithLaunchOptions:launchOptions registerDeepLinkHandler:^(NSDictionary * _Nullable params, NSError * _Nullable error, UIScene * _Nullable scene) {
        
    }];

    return YES;
}
```

:::

---

## scene (UIScene)

This method is part of the `BranchScene : NSObject` interface. [Learn more](ios-basic-integration.md) about apps using scenes.

| Method |
| --- |
| [(void)scene:(UIScene \*)scene continueUserActivity:(NSUserActivity \*)userActivity;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchScene.h) |
| [(void)scene:(UIScene )scene openURLContexts:(NSSet<UIOpenURLContext > \*)URLContexts;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchScene.h) |

#### Example Usage

::: code-group

```swift [Swift]
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
	var window: UIWindow?
  
	// Use `scene` to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`
	// If using a storyboard, the `window` property will automatically be initialized and attached to the scene
	// This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead)
	func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
		guard let _ = (scene as? UIWindowScene) else { return }
    
		// Workaround for SceneDelegate `continueUserActivity` not getting called on cold start:
		if let userActivity = connectionOptions.userActivities.first {
			BranchScene.shared().scene(scene, continue: userActivity)
		} else if !connectionOptions.urlContexts.isEmpty {
			BranchScene.shared().scene(scene, openURLContexts: connectionOptions.urlContexts)
		}
  }
}
```

```objectivec [Objective-C]
@interface AppDelegate ()

@interface SceneDelegate ()
@end
@implementation SceneDelegate
// Use `scene` to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`
// If using a storyboard, the `window` property will automatically be initialized and attached to the scene
// This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead)
- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
  
    // Workaround for SceneDelegate `continueUserActivity` not getting called on cold start
    NSUserActivity *activity = [[connectionOptions userActivities] allObjects].firstObject;

  	if (activity) {
			[[BranchScene shared] scene:scene continueUserActivity:activity];
		} else if ([[connectionOptions URLContexts] count] != 0) {
			[[BranchScene shared] scene:scene openURLContexts: [connectionOptions URLContexts]];
		}  
}
@end
```

:::

---

## initWithUniversalObject

This method is part of the `BranchShareLink : NSObject <UIActivityItemSource>` interface.

| Method | Description |
| --- | --- |
| [(instancetype Nonnull) initWithUniversalObject:(BranchUniversalObject\*Nonnull)universalObject linkProperties:(BranchLinkProperties\*\_Nonnull)linkProperties NS\_DESIGNATED\_INITIALIZER;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchShareLink.h) | Create a `BranchShareLink` object. |

| Argument | Type | Description |
| --- | --- | --- |
| `universalObject` | `BranchUniversalObject` | The Branch Universal Object instance to associate with the `BranchShareLink`. |
| `linkProperties` | `BranchLinkProperties` | The Branch Link Properties object to associate with the `BranchShareLink`. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

let sharelink = BranchShareLink(universalObject: buo, linkProperties: lp)
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

BranchShareLink *shareLink =
	[[BranchShareLink alloc]
		initWithUniversalObject:buo
		linkProperties:lp];
```

:::

---

## activityItems

This method is part of the `BranchShareLink : NSObject <UIActivityItemSource>` interface.

| Method | Description |
| --- | --- |
| [(NSArray<UIActivityItemProvider\*>\*\_Nonnull) activityItems;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchShareLink.h) | Use a `BranchShareLink` instance to retrieve an array of activity item providers: one for the Branch Universal Object instance, one for the share text (if provided), and one for the shareObject (if provided). |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

let shareLink = BranchShareLink(universalObject: buo, linkProperties: lp)

shareLink.activityItems()
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

BranchShareLink *shareLink =
	[[BranchShareLink alloc]
		initWithUniversalObject:buo
		linkProperties:lp];

[shareLink activityItems];
```

:::

---

## presentActivityViewControllerFromViewController

This method is part of the `BranchShareLink : NSObject <UIActivityItemSource>` interface.

| Method | Description |
| --- | --- |
| [(void) presentActivityViewControllerFromViewController:(UIViewController\*\_Nullable)viewController anchor:(id \_Nullable)anchorViewOrButtonItem;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchShareLink.h) | Use a `BranchShareLink` instance to present a `UIActivityViewController` that shares the Branch Link. |

| Argument | Type | Description |
| --- | --- | --- |
| `viewController` | `UIViewController` | The parent view controller from which to present the activity sheet. |
| `anchorViewOrButtonItem` | `id` | The anchor point for the activity sheet. Used for iPad form factors. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

let shareLink = BranchShareLink(universalObject: buo, linkProperties: lp)

shareLink.presentActivityViewController(from: self, anchor: nil)
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

BranchShareLink *shareLink =
	[[BranchShareLink alloc]
		initWithUniversalObject:buo
		linkProperties:lp];

[shareLink presentActivityViewControllerFromViewController:self anchor:nil];
```

:::

---

## addLPLinkMetadata

This method is part of the `BranchShareLink : NSObject <UIActivityItemSource>` interface.

**Warning**: This method is only available on iOS 13.0 or greater.

| Method | Description |
| --- | --- |
| [(void) addLPLinkMetadata:(NSString Nullable)title icon:(UIImage Nullable)icon API\_AVAILABLE(ios(13.0));](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchShareLink.h) | Create and attach an `LPLinkMetadata` object (containing `title` and `icon`) to a `BranchShareLink` instance. |

| Argument | Type | Description |
| --- | --- | --- |
| `title` | `NSString` | The string that will appear in the share sheet preview. |
| `icon` | `UIImage` | The image used for the share sheet preview icon. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

let shareLink = BranchShareLink(universalObject: buo, linkProperties: lp)

shareLink.addLPLinkMetadata("LPLinkMetaData Link Title", icon: iconImg)
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

BranchShareLink *shareLink =
	[[BranchShareLink alloc]
		initWithUniversalObject:buo
		linkProperties:lp];

[shareLink addLPLinkMetadata:@"LPLinkMetadata Link Title" icon:iconImg];
```

:::

---

## registerView

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(void)registerView;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | List a Branch Universal Object instance on Spotlight and log a `BranchStandardEventViewItem`. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")

buo.registerView()
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];

[buo registerView]
```

:::

---

## registerViewWithCallback

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(void)registerViewWithCallback:(void (^\_Nullable)(NSDictionary Nullable params, NSError Nullable error))callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Log a User Content View Branch Event. |

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `NSDictionary` or `NSError` | Callback containing a dictionary of parameters or an error. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")

buo.registerView { (params: [AnyHashable: Any]?, error: Error?) in
    print("BUO was listed on spotlight and event was logged: \(String(describing: params))")
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo = [BranchUniversalObject new];
buo.canonicalIdentifier = @"Uniq!";
buo.title = @"Object Title";

// Example 1
[buo registerViewWithCallback:^(NSDictionary * _Nullable params, NSError * _Nullable error) {
	XCTAssertNil(error);
}];

// Example 2
[buo registerViewWithCallback:^(NSDictionary * _Nullable params, NSError * _Nullable error) {
    NSLog(@"BUO was listed on spotlight and event was logged: %@", params);
}];
```

:::

---

## getShortUrlWithLinkProperties

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(nullable NSString )getShortUrlWithLinkProperties:(nonnull BranchLinkProperties )linkProperties;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Returns a Branch short URL for the specified Branch Universal Object instance and includes the passed Link Properties object. |
| [(void)getShortUrlWithLinkProperties:(nonnull BranchLinkProperties )linkProperties andCallback:(void (^\_Nullable)(NSString Nullable url, NSError \* Nullable error))callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Returns a Branch short URL for the specified Branch Universal Object instance and includes the passed Link Properties object. Callback may contain URL or error. |

| Argument | Type | Description |
| --- | --- | --- |
| `linkProperties` | `BranchLinkProperties` | The Branch Link Properties object to associate with the Branch short URL. |
| `callback` | `NSString` or `NSError` | Callback containing a string URL or an error. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

buo.getShortUrl(with: lp) { (url, error) in
	if (error == nil) {
		print("Got my Branch link to share: (url)")
	} else {
		print(String(format: "Branch error : %@", error! as CVarArg))
	}
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

[buo getShortUrlWithLinkProperties:lp andCallback:^(NSString *url, NSError *error) {
	if (!error) {
		NSLog(@"got my Branch invite link to share: %@", url);
	}
}];
```

:::

---

## getShortUrlWithLinkPropertiesAndIgnoreFirstClick

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(nullable NSString )getShortUrlWithLinkPropertiesAndIgnoreFirstClick:(nonnull BranchLinkProperties )linkProperties;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Returns a Branch short URL for the specified Branch Universal Object instance and includes the passed Link Properties object. Ignores the first access of the item (usually due to a robot indexing the item) for statistics. |

| Argument | Type | Description |
| --- | --- | --- |
| `linkProperties` | `BranchLinkProperties` | The link properties to include with the Branch short URL. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

buo.getShortUrl(with: lp) { (url, error) in
	if (error == nil) {
		print("Got my Branch link to share: (url)")
	} else {
		print(String(format: "Branch error : %@", error! as CVarArg))
	}
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [BranchLinkProperties new];

[buo getShortUrlWithLinkPropertiesAndIgnoreFirstClick:lp andCallback:^(NSString *url, NSError *error) {
	if (!error) {
		NSLog(@"got my Branch invite link to share: %@", url);
	}
}];
```

:::

---

## getLongUrlWithChannel

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(nullable NSString )getLongUrlWithChannel:(nullable NSString )channel andTags:(nullable NSArray )tags andFeature:(nullable NSString )feature andStage:(nullable NSString )stage andAlias:(nullable NSString )alias;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Returns a Branch long URL for the specified Branch Universal Object instance and includes `channel`. |

| Argument | Type | Description |
| --- | --- | --- |
| `channel` | `NSString` | The channel to include with the long URL. |
| `tags` | `NSArray` | The tags to include with the long URL. |
| `feature` | `NSString` | The feature to include with the long URL. |
| `stage` | `NSString` | The stage to include with the long URL. |
| `alias` | `NSString` | The alias to include with the long URL. |

#### Example Usage

::: code-group

```swift [Swift]
let longUrl = Branch.getInstance().getLongURL(withChannel: "channel", andTags: ["tag1"], andFeature: "feature", andStage: "stage", andAlias: "testingLinkAlias123")
```

```objectivec [Objective-C]
NSString *longUrl = [[Branch getInstance] getLongURLWithChannel:@"channel" andTags:@[@"tag1"] andFeature:@"feature" andStage:@"stage" andAlias:@"testingLinkAlias123"];
```

:::

---

## showShareSheetWithShareText

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(void)showShareSheetWithShareText:(nullable NSString )shareText completion:(void (^ Nullable)(NSString Nullable activityType, BOOL completed))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Show the user a Share Sheet and specify the text to display. |

| Argument | Type | Description |
| --- | --- | --- |
| `shareText` | `NSString` | The message associated with the shareable Branch Deep Link. |
| `completion` | `NSString` and/or `BOOL` | The `activityType` as a string (nullable) and a boolean representing completion state. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")

buo.showShareSheet(withShareText: "Share Your Monster!") { (activityType, success) in
	if (success) {
		print("Log an event here")
	}
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];

[self.buo
	showShareSheetWithShareText:@"Super amazing thing I want to share"
	completion:^(NSString *activityType, BOOL completed) {
		if (completed) {
			NSLog(@"%@", [NSString stringWithFormat:@"Completed sharing to %@", activityType]);
		}
  }
}];
```

:::

---

## showShareSheetWithLinkProperties

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(void)showShareSheetWithLinkProperties:(nullable BranchLinkProperties )linkProperties andShareText:(nullable NSString )shareText fromViewController:(nullable UIViewController )viewController completion:(void (^ Nullable)(NSString Nullable activityType, BOOL completed))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Show the user a Share Sheet and specify the text to display as well as the link properties. |
| [(void)showShareSheetWithLinkProperties:(nullable BranchLinkProperties )linkProperties andShareText:(nullable NSString )shareText fromViewController:(nullable UIViewController )viewController completionWithError:(void (^ Nullable)(NSString Nullable activityType, BOOL completed, NSError\*\_Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Show the user a Share Sheet and specify the text to display as well as the link properties. Include `activityError` in `completion`. |
| [(void)showShareSheetWithLinkProperties:(nullable BranchLinkProperties )linkProperties andShareText:(nullable NSString )shareText fromViewController:(nullable UIViewController )viewController anchor:(nullable UIBarButtonItem )anchor completion:(void (^ Nullable)(NSString \* Nullable activityType, BOOL completed))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | On iPad, show the user a Share Sheet and specify the text to display as well as the link properties. |
| [(void)showShareSheetWithLinkProperties:(nullable BranchLinkProperties )linkProperties andShareText:(nullable NSString )shareText fromViewController:(nullable UIViewController )viewController anchor:(nullable UIBarButtonItem )anchor completionWithError:(void (^ Nullable)(NSString Nullable activityType, BOOL completed, NSError\_Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | On iPad, show the user a Share Sheet and specify the text to display as well as the link properties. Include `activityError` in `completion`. |

| Argument | Type | Description |
| --- | --- | --- |
| `linkProperties` | `BranchLinkProperties` | The Branch Link Properties object to associate with the Branch Link. |
| `shareText` | `NSString` | The message associated with the shareable Branch Deep Link. |
| `viewController` | `UIViewController` | The `UIViewController` to use to share the Branch Deep Link. |
| `anchor` | `UIBarButtonItem` | For iPads. |
| `completion` | `NSString` and/or `NSError` `BOOL` | May contain `activityType`, `activityError`, and/or completion status. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

let message = "Check out this link"
buo.showShareSheet(with: lp, andShareText: message, from: self) { (activityType, completed) in
  print(activityType ?? "")
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [[BranchLinkProperties alloc] init];

[buo showShareSheetWithLinkProperties:lp
	andShareText:shareText
	fromViewController:self.parentViewController
	completion:^(NSString *activityType, BOOL completed) {
		if (completed) {
			NSLog(@"Completed sharing to %@", activityType);
		} else {
			NSLog(@"Sharing failed");
		}
	}
];
```

:::

---

## listOnSpotlight

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(void)listOnSpotlight;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | List content on iOS Spotlight. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")

buo.listOnSpotlight()
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];

[buo listOnSpotlight];
```

:::

---

## listOnSpotlightWithCallback

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(void)listOnSpotlightWithCallback:(void (^\_Nullable)(NSString Nullable url, NSError Nullable error))callback;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | List content on iOS Spotlight and include a callback. |

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `NSString` or `NSError` | A callback including either the URL for the content or an error. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")

buo.listOnSpotlight { (url, error) in
    if let spotlightUrl = url {
        print("BUO was listed on spotlight: \(spotlightUrl)")
    }
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];

// Example 1
[buo listOnSpotlightWithCallback:^(NSString *url, NSError *error) {
	if (!error) {
		NSLog(@"shortURL: %@", url);
	} else {
		NSLog(@"error: %@", error);
	}
}];

// Example 2
[buo listOnSpotlightWithCallback:^(NSString * _Nullable url, NSError * _Nullable error) {
    NSLog(@"BUO was listed on spotlight: %@", url);
}];
```

:::

---

## listOnSpotlightWithLinkProperties

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(void)listOnSpotlightWithLinkProperties:(BranchLinkProperties\*\_Nullable)linkproperties callback:(void (^\_Nullable)(NSString Nullable url, NSError Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | List content on iOS Spotlight with link properties and include a callback. |

| Argument | Type | Description |
| --- | --- | --- |
| `linkproperties` | `BranchLinkProperties` | The Branch Link Properties object to associate with the Branch Link. |
| `completion` | `NSString` or `NSError` | A callback including either the URL for the content or an error. |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")
let lp = BranchLinkProperties()

buo.listOnSpotlight(with: lp) { (url, error) in
	if (error == nil) {
  	NSLog("Successfully indexed on spotlight \(url)")
	}
}
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
BranchLinkProperties *lp = [[BranchLinkProperties alloc] init];

// Example 1
[buo listOnSpotlightWithCallback:^(NSString *url, NSError *error) {
	if (!error) {
		NSLog(@"shortURL: %@", url);
	} else {
		NSLog(@"error: %@", error);
	}
}];

// Example 2
[buo listOnSpotlightWithCallback:^(NSString * _Nullable url, NSError * _Nullable error) {
    NSLog(@"BUO was listed on spotlight: %@", url);
}];
```

:::

---

## removeFromSpotlightWithCallback

This method is part of the `BranchUniversalObject : NSObject` interface.

| Method | Description |
| --- | --- |
| [(void)removeFromSpotlightWithCallback:(void (^\_Nullable)(NSError \* \_Nullable error))completion;](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/tree/master/Sources/BranchSDK/Public/BranchUniversalObject.h) | Remove content from iOS Spotlight and include a callback. |

| Argument | Type | Description |
| --- | --- | --- |
| `completion` | `NSError` | A callback containing an error (nullable). |

#### Example Usage

::: code-group

```swift [Swift]
let buo = BranchUniversalObject(canonicalIdentifier: "item/12345")

buo.removeFromSpotlight { (error) in
	if (error == nil) {
    print("BUO successfully removed")
  }
 }
```

```objectivec [Objective-C]
BranchUniversalObject *buo =  [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];

[buo removeFromSpotlightWithCallback:^(NSError * _Nullable error) {
	NSString *title = @"Remove private indexing";
	NSString *message;
	if (!error) {
		message = @"Successfully removed indexing";
	}
	else {
		message = [error description];
	}
}];
```

:::
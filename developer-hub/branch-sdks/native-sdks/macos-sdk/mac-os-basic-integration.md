---
title: "macOS Basic Integration"
slug: mac-os-basic-integration
---

::: tip SDK Stats
**Open Source Github Repo**: <https://github.com/BranchMetrics/mac-branch-deep-linking>
:::

::: tip PREREQUISITE
Before you implement the SDK, please ensure you have [Configured Link Behaviors for Redirects and Link Domains](configure-default-link-behaviors.md#7-desktop-app-default-link-behavior).
:::

## 1. Install Branch SDK

Please choose one of the following integration methods to install the Branch Framework in your app.

<details>
<summary>Swift Package Manager</summary>

[**Swift Package Manager**](https://swift.org/package-manager/) **is supported by Branch macOS SDK 1.3.0+**

To add the Branch macOS SDK GitHub repo as a Swift Package dependency:

1. With the project name selected in the project navigator and the project editor, click on the **Swift Packages** tab.

   
2. Click on the **+** button to add a package.

   
3. Use the package URL for the Branch macOS SDK, "https://github.com/BranchMetrics/mac-branch-deep-linking", and continue.

   
4. Make sure the Branch Swift Package is being added to the correct target and click **Finish**.

   
5. If you have any other targets that need to use the Branch Swift Package, select the target and add it under **Frameworks, Libraries, and Embedded Content** in the General tab.

   

The Swift Package tab for your project should now look like the following:



</details>

<details>
<summary>CocoaPods</summary>

[**CocoaPods**](https://cocoapods.org/) **is supported by Branch macOS SDK 1.3.0+**

1. If you don’t have a pod file in your project directory already, go ahead and initialize one by running pod `init`.
2. You should now have a file named `Podfile` in your project directory.
3. Your `Podfile` should look like this:

   `platform :osx, '10.14' target 'Example' do use_frameworks! pod 'BranchMacOS' end`
4. Now that you have your dependencies listed in your `Podfile`, go ahead and install your dependencies by running `pod install`. If you don’t have a workspace already CocoaPods will create one that includes the dependencies you just installed. The CocoaPods generated framework should already be added to the target you specified in your `Podfile`.

   

</details>

<details>
<summary>Carthage</summary>

[**Carthage**](https://github.com/Carthage/Carthage) **is supported by Branch macOS SDK 1.3.0+**

`github "BranchMetrics/mac-branch-deep-linking"`

</details>

<details>
<summary>Manual Framework</summary>

**Manual Team Signing Required**

1. Clone the Branch macOS SDK: `git clone https://github.com/BranchMetrics/mac-branch-deep-linking`.
2. In the lower right hand corner of Project Navigator in Xcode click on the **+** button and select the option to add files to your workspace.>

   
3. Select the `Branch.xcodeproj` file which is located in the Branch macOS SDK directory you cloned in step 1. You should now see the Branch project in the Project Navigator on the left.

   
4. For your main project, go to the targets that will require the Branch macOS SDK as a dependency and click on the **+** button under **Frameworks, Libraries, and Embedded Content** to add it.

     

</details>

## 2. Configure Info.plist

In this step you will add a URL Scheme to your app so macOS knows what schemes to associate with the app.

1. First off start off by adding the URL types property inside your target’s Info.plist. Open the Info.plist file, click on the “+” button that shows up when you hover over “Information Property List” and add the “URL types” if it doesn’t exist.

   *[Image: 2362]*
2. After you fully expand “URL types” add a “URL Schemes” property under “Item 0”.

   *[Image: 2362]*
3. Provide a value for “Item 0” under “URL Schemes”. This will be the scheme your app will handle.

   *[Image: 2362]*

::: info NOTE
If you want to edit the Info.plist as a XML document, right click on your Info.plist and open it as source code.
:::

*[Image: 1166]*

You can paste this snippet before the final tag. Remember to change `YOUR-APP-SCHEME-HERE` to the app scheme for your app.

```
<key>CFBundleURLTypes</key>
        <array>
        <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
        <string>YOUR-APP-SCHEME-HERE</string>
        </array>
        </dict>
        </array>
```

If you wish to use Universal Links with a custom link domain, add `branch_universal_link_domains` with your live key domain. This is only necessary if you do not use the default `app.link` domain.

Here's a sample xml with the custom domain.

```
<key>CFBundleURLTypes</key>
        <array>
        <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
        <string>YOUR-APP-SCHEME-HERE</string>
        </array>
        <key>branch_universal_link_domains</key>
        <array>
        <string>YOUR-CUSTOM-APP-LINK-DOMAIN</string>
        </array>
        </dict>
        </array>
```

::: warning First Scheme Defined
Your app's URI scheme must be the first scheme defined (item 0) in the list.
:::

The Branch SDK will use the first URI Scheme from your list that does not start with `fb`, `db`, `twitterkit-`, `pin`, or `com.googleusercontent.apps`. These schemes are ignored by Branch since they are commonly used by other app kits for oauth and other uses.

## 3. Configure macOS Universal Links

::: warning macOS Universal Links are not supported on Chrome or Firefox.
When opening a Branch link on these browsers, we will redirect to an URI to open the native app.
:::

Universal Links are available on macOS Catalina or newer. When configured, Branch links clicked from Safari or a WebKit web view can open the native app without a URI redirect.

## a. Configure Associated Domains

1. Add your link domains from Branch:

   - **New Branch**: In the left-hand navigation, go to **Configuration** and select **Link Controls**. Find your link domains in the **Link Routing Rules** tab.
   - **Legacy Branch**: Navigate to the [Configuration page](https://branch.dashboard.branch.io/configuration/general) to find your link domains.
2. If you don't already have an Associated Domains section in the **Signing & Capabilities** tab for your target, go ahead and add it by clicking on the **+** sign.

   *[Image: 1166]* *[Image: 1936]*
3. Add the associated domains from your Branch Dashboard (see step 1 above for navigation instructions).

   *[Image: 1936]*

## b. Check Entitlements

- Confirm entitlements are within target (This file is configured automatically when completing the steps above in [Capabilities tab of Xcode](https://developer.apple.com/documentation/security/password_autofill/setting_up_an_app_s_associated_domains#3001207))

*[Image: 2100]*

## c. Configure AppDelegate to handle Universal Links

::: code-group

```swift [Swift]
func application(_ application: NSApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([NSUserActivityRestoring]) -> Void) -> Bool {
                    Branch.sharedInstance.continue(userActivity)
                    return true
                    }
```

```objectivec [Objective-C]
- (BOOL)application:(NSApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<NSUserActivityRestoring>> * _Nonnull))restorationHandler {
                    [[Branch sharedInstance] continueUserActivity:userActivity];
                    return YES;
                    }
```

:::

## 4. Initialize Branch

The Branch SDK requires Outgoing Connections from your macOS application. Make sure your application has permissions to do so by going to the targets that your application uses and enable **Outgoing Connections (Client)** in the **Signing & Capabilities** tab.

*[Image: 2466]*

Start Branch when your app first starts up. In your app delegate, make sure to first import the Branch SDK. Then, start Branch in your `applicationDidFinishLaunching: method`:

::: code-group

```swift [Swift]
func applicationDidFinishLaunching(_ aNotification: Notification) {
                    // Register for Branch URL notifications
                    NotificationCenter.default.addObserver(self, selector: #selector(branchWillStartSession), name: .BranchWillStartSession, object: nil)
                    NotificationCenter.default.addObserver(self, selector: #selector(branchDidStartSession), name: .BranchDidStartSession, object: nil)
                    NotificationCenter.default.addObserver(self, selector: #selector(branchOpenedURLNotification), name: .BranchDidOpenURLWithSession, object: nil)

                    // Create a Branch configuration object with your key:
                    let configuration = BranchConfiguration(key: "YOUR_KEY_HERE")

                    // Start Branch:
                    Branch.sharedInstance.start(with: configuration)
                    }
```

```objectivec [Objective-C]
#import <Branch/Branch.h>

                    // In your app delegate class file add this method to start the Branch SDK:
                    - (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
                    // Insert code here to initialize your application

                    // Register for Branch URL notifications:
                    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(branchWillStartSession:) name:BranchWillStartSessionNotification object:nil];
                    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(branchDidStartSession:) name:BranchDidStartSessionNotification object:nil];
                    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(branchOpenedURLNotification:) name:BranchDidOpenURLWithSessionNotification object:nil];

                    // Create a Branch configuration object with your key:
                    BranchConfiguration *configuration = [[BranchConfiguration alloc] initWithKey:@"key_live_joQf7gfRz1vebNOoHPFGJhnhFCarsZg0"];

                    // Start Branch:
                    [[Branch sharedInstance] startWithConfiguration:configuration];
                    }
```

:::

Next up add the notification handlers which are used by the observers in the `applicationDidFinishLaunching: method`:

::: code-group

```swift [Swift]
@objc private func branchWillStartSession(_ notification: Notification?) {
                    guard let notification = notification else { return }

                    let url = notification.userInfo?[BranchURLKey] ?? "N/A"
                    print("branchWillStartSession: \(notification.name) URL: \(url)")
                    }

                    @objc private func branchDidStartSession(_ notification: Notification?) {
                    guard let notification = notification else { return }

                    let url = notification.userInfo?[BranchURLKey] ?? "N/A"
                    let session = notification.userInfo?[BranchSessionKey] as? BranchSession
                    let data = (session != nil && session?.data != nil) ? session?.data?.description ?? "" : ""
                    print("branchDidStartSession: \(notification.name) URL: \(url) Data: \(data)")
                    }

                    @objc private func branchOpenedURLNotification(_ notification: Notification?) {
                    guard let notification = notification else { return }

                    let url = notification.userInfo?[BranchURLKey] ?? "N/A"
                    print("branchOpenedURLNotification: \(notification.name) URL: \(url)")

                    let session = notification.userInfo?[BranchSessionKey] as? BranchSession
                    let linkContent = session?.linkContent
                    displayLinkContent(linkContent)
                    }

                    private func displayLinkContent(_ linkContent: BranchUniversalObject?) {
                    guard let linkContent = linkContent,
                    let viewController = NSApplication.shared.keyWindow?.contentViewController as? ViewController
                    else {
                    return
                    }

                    viewController.updateContent(title: linkContent.title, contentDescription: linkContent.contentDescription, imageURLString: linkContent.imageUrl)
                    }
```

```objectivec [Objective-C]
- (void) branchWillStartSession:(NSNotification*)notification {
                    NSLog(@"branchWillStartSession: %@", notification.name);

                    NSString *url = notification.userInfo[BranchURLKey] ?: @"";
                    NSLog(@"URL: %@", url);
                    }

                    - (void) branchDidStartSession:(NSNotification*)notification {
                    NSLog(@"branchDidStartSession: %@", notification.name);

                    NSString *url = notification.userInfo[BranchURLKey] ?: @"";
                    NSLog(@"URL: %@", url);

                    BranchSession *session = notification.userInfo[BranchSessionKey];
                    NSString *data = (session && session.data) ? session.data.description : @"";
                    }

                    - (void) branchOpenedURLNotification:(NSNotification*)notification {
                    NSLog(@"branchOpenedURLNotification: %@", notification.name);

                    NSString *url = notification.userInfo[BranchURLKey] ?: @"";
                    NSLog(@"URL: %@", url);

                    BranchSession *session = notification.userInfo[BranchSessionKey];

                    // Do something with the link!
                    // In this contrived example we'll load a view controller that plays the song that was in the link:
                    SongViewController *viewController = [SongViewController loadController];
                    viewController.songTitle = branchSession.linkContent.title;
                    [viewController.window makeKeyAndOrderFront:self];
                    [viewController playSong];
                    }
```

:::
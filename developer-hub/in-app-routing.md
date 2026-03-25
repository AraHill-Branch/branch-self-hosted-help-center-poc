---
title: "In-App Routing"
slug: in-app-routing
---

## Overview

When a Branch link is opened, either your app launches or users are taken to the App/Play store to download it. Deep links improve this process by routing users directly to specific content after your app launches. With Branch, this works even if users have to stop and download the app first (a.k.a., "deferred deep links"). Deep links are an incredibly important part of delivering a high-quality user experience.

Below we will walk you through your 3 configuration options:

- Option 1: Build custom routing inside the routing callback - Route immediately on app open
- Option 2: Let Branch use your existing deep link routing

::: warning iOS Deferred Deep Linking
With the introduction of iOS 15 and iCloud+ Private Relay, Branch released support for deferred deep linking using NativeLink™

To implement iOS NativeLink™, follow the instructions in our [developer documentation](ios-advanced-features.md#nativelink™-deferred-deep-linking).
:::

## Option 1: Build custom routing inside the routing callback

### Route immediately on app open

Inside the deep link handler callback that you register in initSession, you will want to examine the parameters dictionary to determine whether the user opened a Branch link. Below is an example assuming that the links correspond to pictures. Below are some examples from iOS and Android where we're using the `pictureId` key to route, but you can see more code snippets for the other platforms here.

**iOS**

::: code-group

```objectivec [Objective-C]
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

	  // initialize the session, setup a deep link handler
	  [[Branch getInstance] initSessionWithLaunchOptions:launchOptions
	                          andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {

	    // start setting up the view controller hierarchy
	    UINavigationController *navC = (UINavigationController *)self.window.rootViewController;
	    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
	    UIViewController *nextVC;

	    // If the key 'pictureId' is present in the deep link dictionary
	    // then load the picture screen with the appropriate picture
	    NSString *pictureId = [params objectForKey:@"pictureId"];
	    if (pictureId) {
	      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"PicVC"];
	      [nextVC setNextPictureId:pictureId];
	    } else {
	      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"MainVC"];
	    }

	    // navigate!
	    [navC setViewControllers:@[nextVC] animated:YES];
	  }];

	  return YES;
	}
```

```swift [Swift]
import UIKit
import BranchSDK // Assuming Branch SDK is imported

class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        // Initialize the session, setup a deep link handler
        Branch.getInstance().initSession(launchOptions: launchOptions) { (params: [AnyHashable: Any]?, error: Error?) in
            // Start setting up the view controller hierarchy
            guard let navC = self.window?.rootViewController as? UINavigationController else {
                // Handle the case where the rootViewController is not a UINavigationController,
                // or self.window is nil. This might involve logging an error or
                // taking alternative setup steps.
                print("Error: Root view controller is not a UINavigationController or window is nil.")
                return
            }

            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            var nextVC: UIViewController

            // If the key 'pictureId' is present in the deep link dictionary
            // then load the picture screen with the appropriate picture
            if let pictureId = params?["pictureId"] as? String {
                // Assuming "PicVC" has a custom class PicViewController
                // and it has a method setNextPictureId or a property to set the pictureId.
                // If it's a method:
                if let picViewController = storyboard.instantiateViewController(withIdentifier: "PicVC") as? PicViewController {
                    picViewController.setNextPictureId(pictureId) // Assuming PicViewController has this method
                    nextVC = picViewController
                } else {
                    // Fallback if PicVC can't be instantiated or cast
                    print("Error: Could not instantiate PicViewController with identifier 'PicVC'. Falling back to MainVC.")
                    nextVC = storyboard.instantiateViewController(withIdentifier: "MainVC")
                }
                // Alternatively, if PicViewController has a property:
                // if let picViewController = storyboard.instantiateViewController(withIdentifier: "PicVC") as? PicViewController {
                //     picViewController.nextPictureId = pictureId // Assuming PicViewController has this property
                //     nextVC = picViewController
                // } else {
                //     print("Error: Could not instantiate PicViewController with identifier 'PicVC'. Falling back to MainVC.")
                //     nextVC = storyboard.instantiateViewController(withIdentifier: "MainVC")
                // }

            } else {
                nextVC = storyboard.instantiateViewController(withIdentifier: "MainVC")
            }

            // Navigate!
            navC.setViewControllers([nextVC], animated: true)
        }

        return true
    }
}

// Example of what PicViewController might look like:
class PicViewController: UIViewController {
    var nextPictureId: String?

    // If using a method to set the ID
    func setNextPictureId(_ id: String) {
        self.nextPictureId = id
        // Potentially load picture data here based on the ID
        print("PicViewController: pictureId set to \(id)")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // If the ID was set as a property, you might use it here
        if let pictureId = nextPictureId {
            print("PicViewController loaded with pictureId: \(pictureId)")
            // Load picture data
        }
    }
}

// Example of what MainViewController might look like (just for completeness):
class MainViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        print("MainViewController loaded")
    }
}
```

:::

**Android**

::: code-group

```java [Java]
@Override
        public void onStart() {
            super.onStart();

            Branch.sessionBuilder(this).withCallback(new BranchReferralInitListener(){
                @Override
                public void onInitFinished(JSONObject referringParams, Branch.BranchError error) {
                    if (error == null) {
                        // params are the deep linked params associated with the link that the user clicked before showing up
                        // params will be empty if no data found
                        String pictureID = referringParams.optString("picture_id", "");
                        if (pictureID.equals("")) {
                            startActivity(new Intent(this, HomeActivity.class));
                        }
                        else {
                            Intent i = new Intent(this, ViewerActivity.class);
                            i.putExtra("picture_id", pictureID);
                            startActivity(i);
                        }
                    } else {
                        Log.e("MyApp", error.getMessage());
                    }
                }
            }).withData(this.getIntent().getData()).init();
        }
```

```kotlin [Kotlin]
import android.content.Intent
import android.os.Bundle // Required for onStart, though not directly used in the snippet
import android.util.Log
import androidx.appcompat.app.AppCompatActivity // Assuming this is an Activity
import io.branch.referral.Branch
import io.branch.referral.BranchError
import org.json.JSONObject

// Assuming your class is an Activity, replace YourActivityName with its actual name
class YourActivityName : AppCompatActivity() { // Or androidx.fragment.app.FragmentActivity, etc.

    override fun onStart() {
        super.onStart()

        // `this` (the Activity context) is passed to sessionBuilder
        Branch.sessionBuilder(this).withCallback { referringParams: JSONObject?, error: BranchError? ->
            if (error == null) {
                // params are the deep linked params associated with the link that the user clicked before showing up
                // params will be empty if no data found

                // Use elvis operator for default value if referringParams is null
                val pictureID = referringParams?.optString("picture_id", "") ?: ""

                if (pictureID.isEmpty()) {
                    // `this@YourActivityName` explicitly refers to the Activity context
                    startActivity(Intent(this@YourActivityName, HomeActivity::class.java))
                } else {
                    val intent = Intent(this@YourActivityName, ViewerActivity::class.java)
                    intent.putExtra("picture_id", pictureID)
                    startActivity(intent)
                }
            } else {
                Log.e("MyApp", error.message)
            }
        }.withData(this.intent?.data).init() // Use safe call for intent.data as it can be null
    }
}

// Example stubs for HomeActivity and ViewerActivity for completeness
class HomeActivity : AppCompatActivity() {
    // ...
}

class ViewerActivity : AppCompatActivity() {
    // ...
}
```

:::

#### Branch-added parameters

In addition to any custom key/value pairs specified in the link data dictionary, Branch also returns some other useful parameters every time a session is initialized. These parameters will be returned every time session is initialized, even if the user has not clicked on a Branch link. Here is a list, and a description of what each represents.

- `~` denotes analytics
- `+` denotes information added by Branch
- This data will not be available for deeplinks from Facebook or other Self Attributing Networks
- For the curious, $ denotes reserved keywords used for controlling how the Branch service behaves. Read more about control parameters on the [Configuring Links](in-app-routing.md) page

| Parameter | Meaning |
| --- | --- |
| +is\_first\_session | Denotes whether this is the first session (install) or any other session (re-install, open) |
| +clicked\_branch\_link | Denotes whether or not the user clicked a Branch link that triggered this session |
| +match\_guaranteed | True or false as to whether the match was made with 100% accuracy  **Please note**: When implementing data-sensitive use cases (ie auto-login, PNR visualization), the mobile app logic should parse the flag `+match_guaranteed` from the SDK initialization callback, and deep link users **only when its value is true**. Post-iOS 14, `+match_guaranteed` will usually be false on install events, unless users opt-in to IDFA collection. |
| +referrer | The referrer for the link click, if a link was clicked |
| +click\_timestamp | Epoch timestamp of when the click occurred |
| +url | The full URL of the link that drove the install/open, if present (e.g. yourapp.app.link/abcde12345) |
| ~channel | The channel on which the link was shared, specified at link creation time |
| ~feature | The feature, such as invite or share, specified at link creation time |
| ~tags | Any tags, specified at link creation time |
| ~campaign | The campaign the link is associated with, specified at link creation time |
| ~creation\_source | Where the link was created ('API', 'Dashboard', 'SDK', 'iOS SDK', 'Android SDK', or 'Web SDK') |
| ~id | Automatically generated 18 digit ID number for the link that drove the install/open, if present (0 for dynamic and 3P links) |

### Access deep link parameters later on

You can retrieve the deep link data at any time from the Branch singleton by calling one of the below methods. This would be the route to use if you wanted to deep link the user after prompting them to log in or something. You can see the code snippets for other platforms here.

#### Get latest session referring params

This returns the latest set of deep link data from the most recent link that was clicked. If you minimize the app and reopen it, the session will be cleared and so will this data.

**iOS**

::: code-group

```objectivec [Objective-C]
NSDictionary *params = [[Branch getInstance] getLatestReferringParams];
```

```swift [Swift]
let params = Branch.getInstance().getLatestReferringParams()
```

:::

**Android**

::: code-group

```java [Java]
JSONObject sessionParams = Branch.getInstance().getLatestReferringParams();
```

```kotlin [Kotlin]
val sessionParams: JSONObject? = Branch.getInstance().getLatestReferringParams()
```

:::

#### Get first session referring params

This returns the first set of deep link data that ever referred the user. Once it's been set for a given user, it can never be updated. This is useful for referral programs.

**iOS**

::: code-group

```objectivec [Objective-C]
NSDictionary *params = [[Branch getInstance] getFirstReferringParams];
```

```swift [Swift]
let params = Branch.getInstance().getFirstReferringParams()
```

:::

**Android**

::: code-group

```java [Java]
JSONObject installParams = Branch.getInstance().getFirstReferringParams();
```

```kotlin [Kotlin]
val installParams: JSONObject? = Branch.getInstance().getFirstReferringParams()
```

:::

## Option 2: Let Branch use your existing deep link routing

If your app already supports deep linking using URI paths, you can populate the `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` link parameters with the URI path of the content to be displayed within the app. When the Branch SDK receives a link containing one of these parameters, it will automatically load the specified URI path.

::: warning Incomplete support on iOS
[Universal Links](ios-universal-links.md) and Spotlight do not support deep linking via URI paths. If you use `$deeplink_path` or `$ios_deeplink_path`, you will need to implement some custom logic. [Click here for more information.](in-app-routing.md#how-to-handle-uri-paths-with-universal-links-or-app-links)
:::

### How to insert custom deep link routes into a Branch link

All of the examples below create links that will cause Branch to display `myapp://content/1234` after launch. Please do not add the URI scheme on the `$deeplink_path` parameters; we automatically append the scheme specified in the Configuration page of the dashboard.

**When creating links dynamically**  
If you're creating a link by appending query parameters, just append the control parameters to the URL. Please make sure to URL encode everything, else the link will break.

```
"https://[branchsubdomain]?%24deeplink_path=content%2F1234"
```

**When using a mobile SDK**

**iOS**

::: code-group

```objectivec [Objective-C]
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$deeplink_path" withValue:@"content/1234"];
```

```swift [Swift]
import BranchSDK // Make sure to import the Branch SDK

let linkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$deeplink_path", withValue: "content/1234")
```

:::

**Android**

::: code-group

```java [Java]
LinkProperties linkProperties = new LinkProperties()
.setChannel("facebook")
.setFeature("sharing")
.addControlParameter("$deeplink_path", "content/1234");
```

```kotlin [Kotlin]
import io.branch.referral.util.LinkProperties // Verify this import path based on your project setup and Branch SDK version

val linkProperties = LinkProperties()
    .setChannel("facebook")
    .setFeature("sharing")
    .addControlParameter("\$deeplink_path", "content/1234") // Or simply "$deeplink_path"
```

:::

::: info When Creating Short Links on the Branch Dashboard
You can specify the control parameters for individual Short Links by inserting the keys and values into the Deep Link Data (Advanced) section.
:::

## How to handle URI paths with Universal Links or App Links

Because Universal Links, Spotlight and Android App Links do not use URI schemes for deep link routing. If you populate `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` with a URI path, you will need to a bit of additional work to ensure that Branch Links route according to your original schema.

1. Initialize session as described in the app configuration steps.
2. In the callback function, add some custom code to read the appropriate `$deeplink_path` parameter in the `params`
3. Use this value to call your existing routing logic to route users to the correct place in your app

Now whenever your app launches from a Branch link that has the `product_picture` key set in its data dictionary, this Activity will be displayed!
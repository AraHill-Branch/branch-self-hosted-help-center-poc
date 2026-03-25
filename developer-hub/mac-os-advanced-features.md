---
title: "macOS Advanced Features"
slug: mac-os-advanced-features
---

## Enable Logging

To help debug your app, you can turn on Branch logging, which logs to the console. Remember to turn it off in your production app.

#### Property

::: code-group

```swift [Swift]
Branch.loggingIsEnabled
```

```objectivec [Objective-C]
Branch.loggingEnabled
```

:::

## Set User Identity

Often, you might have your own user IDs, or want referral and event data to persist across platforms or uninstall/reinstall. It's helpful if you know your users access your service from different devices. This where we introduce the concept of an 'user identity'.

#### Method

::: code-group

```swift [Swift]
private func login(userIdentity: String?) {
        guard let userIdentity = userIdentity else { return }

        Branch.sharedInstance.setUserIdentity(userIdentity,
                                              completion: { (branchSession, error) in
                                                // Do stuff with login
                                              })
    }
```

```objectivec [Objective-C]
[Branch setUserIdentity:completion:]
```

:::

## Get User Identity

Use the `getUserIdentity` method to retrieve the user ID set via `setUserIdentity`.

#### Method

::: code-group

```swift [Swift]
var userIdentity = Branch.sharedInstance().getUserIdentity()
```

```objectivec [Objective-C]
NSString *userIdentity = [Branch sharedInstance].getUserIdentity();
```

:::

## Logout

If you provide a logout function in your app, be sure to clear the user when the logout completes. This will ensure that all the stored parameters get cleared and all events are properly attributed to the right identity.

::: warning Warning
This call will clear attribution on the device.
:::

#### Method

::: code-group

```swift [Swift]
private func logout() {
        Branch.sharedInstance.logout(completion: { (error) in
          // Do stuff on logout
        })
    }
```

```objectivec [Objective-C]
[Branch logoutWithCompletion:]
```

:::

## User Data

If you need to comply with a user's request to not be tracked for GDPR purposes, or otherwise determine that a user should not be tracked, utilize this field to prevent Branch from sending network requests. This setting can also be enabled across all users for a particular link, or across your Branch Links.

::: code-group

```swift [Swift]
Branch.sharedInstance().trackingDisabled = true
```

```objectivec [Objective-C]
[Branch sharedInstance].trackingDisabled = YES;
```

:::

You can choose to call this throughout the lifecycle of the app. Once called, network requests will not be sent from the SDKs. Link generation will continue to work, but will not contain identifying information about the user. In addition, deep linking will continue to work, but will not track analytics for the user.

## Set Initialization Metadata

If you are using a 3rd Party [Data Integration Partner](data-integration-partners.md) that requires setting certain identifiers before initializing the Branch SDK, you should add this code snippet:

::: code-group

```swift [Swift]
let dict = NSMutableDictionary()
        dict.setObject("your metadata" as NSString, forKey: "sample_key" as NSString)
        Branch.sharedInstance.requestMetadataDictionary = dict
```

```objectivec [Objective-C]
NSMutableDictionary<NSString *, NSString *> *metadata = [NSMutableDictionary<NSString *, NSString *> new];
    [metadata setObject:@"your metadata" forKey:@"sample_key"];
    [[Branch sharedInstance] setRequestMetadataDictionary:metadata];
```

:::

## Branch Universal Objects

The Branch iOS SDK uses the concept of a Branch Universal Object (BUO) to represent the thing you want to share. A `BranchUniversalObject` instance encapsulates a unique piece of content, such as an article, video, or item for sale.

The `BranchUniversalObject.contentMetadata` properties further describe your content. These properties are trackable in the Branch dashboard and will be automatically exported to your connected third-party app intelligence partners like Adjust or Mixpanel.

[Learn more](create-branch-objects-and-events.md) about creating BUOs so that you can start deep linking, sharing content, content analytics, event tracking, and content indexing on Spotlight.

## Track Events

The `BranchEvent` class is used to make a Branch Event out of an event or action that has taken place in your app. Examples include tracking when a user adds an item to an online shopping cart or searches for a keyword.

You can [associate a BUO with a Branch Event](create-branch-objects-and-events.md#branch-event) by adding the BUO instance to the Branch Event's `contentItems` field. You can also view analytics for your Branch Events on the Branch dashboard.

[Learn more](track-branch-events.md) about the different classes of Branch Events, including the [Custom class](track-branch-events.md#track-custom-events) for tracking events that aren't predefined.

## Shortened Links

Once you've created your `Branch Universal Object`, which is the reference to the content you're interested in, you can then get a link back to it with the mechanisms described below.

::: info Encoding Note
One quick note about encoding. Since `NSJSONSerialization` supports a limited set of classes, we do some custom encoding to allow additional types. Current supported types include `NSDictionary`, `NSArray`, `NSURL`, `NSString`, `NSNumber`, `NSNull`, and `NSDate` (encoded as an ISO8601 string with timezone). If a parameter is of an unknown type, it will be ignored.
:::

#### Method

::: code-group

```swift [Swift]
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$desktop_url", withValue: "http://example.com/home")
linkProperties.addControlParam("$ios_url", withValue: "http://example.com/ios")

branchUniversalObject.getShortUrl(with: linkProperties) { (url, error) in
    if error == nil {
        NSLog("got my Branch link to share: %@", url)
    }
}
```

```objectivec [Objective-C]
#import "BranchLinkProperties.h"
  
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$desktop_url" withValue:@"http://example.com/home"];
[linkProperties addControlParam:@"$ios_url" withValue:@"http://example.com/ios"];

[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error) {
        NSLog(@"success getting url! %@", url);
    }
}];
```

:::

#### Link Properties Parameters

| Parameter | Description |
| --- | --- |
| **channel** | The channel for the link. Examples could be Facebook, Twitter, SMS, etc., depending on where it will be shared. |
| **feature** | The feature the generated link will be associated with, e.g., `sharing`. |
| **controlParams** | A dictionary to use while building up the Branch link. Here is where you specify custom behavior controls as described in the table below. |

You can do custom redirection by inserting the following *optional keys in the dictionary*:

| Key | Value |
| --- | --- |
| `$fallback_url` | Where to send the user for all platforms when app is not installed. Note that Branch will forward all robots to this URL, overriding any OG tags entered in the link. |
| `$desktop_url` | Where to send the user on a desktop or laptop. By default it is the Branch-hosted text-me service. |
| `$android_url` | The replacement URL for the Play Store to send the user if they don't have the app. *Only necessary if you want a mobile web splash*. |
| `$ios_url` | The replacement URL for the App Store to send the user if they don't have the app. *Only necessary if you want a mobile web splash*. |
| `$ipad_url` | Same as above, but for iPad Store. |
| `$fire_url` | Same as above, but for Amazon Fire Store. |
| `$blackberry_url` | Same as above, but for Blackberry Store. |
| `$windows_phone_url` | Same as above, but for Windows Store. |
| `$after_click_url` | When a user returns to the browser after going to the app, take them to this URL. *iOS only; Android coming soon*. |
| `$afterclick_desktop_url` | When a user on desktop returns to the desktop browser after going to the desktop app, take them to this URL. |

You have the ability to control the direct deep linking of each link by inserting the following *optional keys in the dictionary*:

| Key | Value |
| --- | --- |
| `$deeplink_path` | The value of the deep link path that you'd like us to append to your URI. For example, you could specify "$deeplink\_path": "radio/station/456" and we'll open the app with the URI "yourapp://radio/station/456?link\_click\_id=branch-identifier". This is primarily for supporting legacy deep linking infrastructure. |
| `$always_deeplink` | true or false. (default is not to deep link first) This key can be specified to have our linking service force try to open the app, even if we're not sure the user has the app installed. If the app is not installed, we fall back to the respective app store or $platform\_url key. By default, we only open the app if we've seen a user initiate a session in your app from a Branch link (has been cookied and deep linked by Branch). |
| **alias** | The alias for a link, e.g., `myapp.com/customalias` |
| **matchDuration** | The attribution window in seconds for clicks coming from this link. |
| **stage** | The stage used for the generated link, indicating what part of a funnel the user is in. |
| **tags** | An array of tag strings to be associated with the link. |

#### Get Short Url Parameters

| Parameter | Description |
| --- | --- |
| **linkProperties** | The link properties created above that describe the type of link you'd like |
| **linkProperties** | The callback that is called with url on success, or an error if something went wrong. Note that we'll return a link 100% of the time. Either a short one if network was available or a long one if it was not. |

## Create QR Code

- Create a BranchUniversalObject and BranchLinkProperties
- Create a BranchQRCode object and set the properties
- Use getQRCodeAsImage() or getQRCodeAsData() to create a QR code

```
BranchLinkProperties *linkProperties = [BranchLinkProperties new];
    BranchUniversalObject *buo = [BranchUniversalObject new];
    
    BranchQRCode *qrCode = [BranchQRCode new];
    qrCode.codeColor = [NSColor colorWithCalibratedRed:0.1 green:0.8392 blue:1.0 alpha:1.0f];
    qrCode.backgroundColor = NSColor.whiteColor;
    qrCode.width = @500;
    qrCode.margin = @1;
    qrCode.centerLogo = @"https://cdn.branch.io/branch-assets/1598575682753-og_image.png";
    qrCode.imageFormat = BranchQRCodeImageFormatPNG;
    
    [qrCode getQRCodeAsImage:buo linkProperties:linkProperties completion:^(CIImage * _Nullable qrCodeImage, NSError * _Nullable error) {
        //Use the QR code image here...
    }];
```

#### Access

Basic Branch QR Codes are included in the free tier of the Branch Growth Platform.

For more advanced QR Code capabilities, see our Engagement Pro [package](packaging.md), which includes access to the [QR Code API](qr-code-api.md)  as well as the ability to create custom QR Codes.
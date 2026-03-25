---
title: "Migrating Firebase Dynamic Links to Branch Links"
slug: migrating-firebase-dynamic-links-to-branch-links
---



## Overview

Google has [announced the deprecation](https://firebase.google.com/support/dynamic-links-faq) of Firebase Dynamic Links, but fortunately, Branch has made it straightforward to transition from Firebase Dynamic Links to Branch Links!

With Branch, you can continue to create the best experience for your users while ensuring your marketing efforts are effectively driving new customers to your app.

### Custom domain vs default domain

Depending on whether or not you have used a custom domain with Firebase, there are a few different options when it comes to migrating to Branch Links.

#### Custom Firebase domain

If you used a custom domain with Firebase, you have the option to use the same custom domain with Branch, or a different domain.

**Same custom domain with Branch**

The benefit of using the same custom domain with Branch that you had with Firebase is that you won't need to worry about replacing links, because Branch can replicate the exact same functionality of the existing links. Also, if you've used QR Codes, you won't need to reprint them because the same links will work with Branch.

To ensure that you do not need to replace any of your existing links, make sure to create Branch Links with the exact same alias as the one you used with Firebase.

Please note that if you choose this approach, there will be a **small amount of downtime** when you switch the CNAME of the custom domain from Firebase to Branch.

**Different domain with Branch**

If you used a custom domain with Firebase but want to use a different domain with Branch, you will need to replace any existing links in circulation with new Branch Links that you create.

#### Default Firebase domain

If you used the default Firebase domain (`[page.link](http://page.link)`), you will need to transition to using Branch's default `app.link` domain or use a custom domain with Branch. There is no way to continue using `page.link` with Branch.

::: warning Caution
Please note that this mean you will need to **replace any existing links in circulation** with new Branch Links that you create.
:::

## Prerequisites

If you are using Firebase Dynamic Links **without** the Firebase SDK, you can skip to [Step 5](migrating-firebase-dynamic-links-to-branch-links.md#5-migrate-links-created-from-firebase-console).

Otherwise, in order to start migrating your Firebase Dynamic Links to Branch Links, you need to have the following:

1. Developer resources for your mobile app.

2. The ability to identify your existing Firebase Dynamic Links.

### Note on using Firebase and Branch together:

It is possible to implement Branch SDKs alongside the Firebase SDK you already have implemented, and to start using Branch Links that way. This lets you ensure that your users have a seamless experience and that you can continue handling Firebase Dynamic Links out in the wild. This may be especially important if you are also using Firebase for other use cases, like authentication.

::: danger Warning
Using the Branch iOS SDK alongside the Firebase SDK **will cause issues unless you disable method swizzling** with the `FirebaseAppDelegateProxyEnabled` flag (learn more [here](https://firebase.google.com/docs/cloud-messaging/ios/client#method_swizzling_in)).  
  
For this reason, Branch recommends **either removing the Firebase SDK entirely before integrating the Branch iOS SDK, or disabling method swizzling**.
:::

## Migrate from Dynamic Links to Branch Links

Follow the steps below to migrate your Firebase Dynamic Links to Branch Links.

### 1. Create your Branch account

Go to <https://dashboard.branch.io/> and create an account. Then, navigate to the [App Settings page](https://branch.dashboard.branch.io/configuration/general) and configure your app settings.

#### Set your redirects

In the **Required Redirects** section, set your redirects per platform, and specify the correct app configuration settings.



#### Set your social media preview

In the **Social Media Preview** section, set your title, description, and thumbnail image.



#### Establish your link domain

In the **Link Domain** section, set your default link domain or [set a custom domain](advanced-link-configuration.md).



For additional details on configuring your Branch Dashboard, view our guide [here](configure-default-link-behaviors.md).

### 2. Integrate Branch SDK

We have full guides on integrating the Branch SDK into your mobile app. Follow the guides below based on your platform of choice.

You will also want to **set up deep link routing,** which each SDK has resources on. More information on in-app routing can be found [here](in-app-routing.md).

- Native Platforms:

  - [Android](android-basic-integration.md)
  - [iOS](ios-basic-integration.md)
- Plugins/Wrappers:

  - Adobe Launch ([Android](adobe-launch-android-sdk.md) | [iOS](adobe-launch-ios-sdk.md))
  - [Capacitor](capacitor.md)
  - [Cordova PhoneGap Ionic](cordova-phonegap-ionic.md)
  - [Flutter](flutter-sdk.md)
  - mParticle ([Android](mparticle-android.md) | [iOS](mparticle-ios.md))
  - [React Native](react-native.md)
  - [Unity](unity.md)
  - Xamarin ([Android](https://help.branch.io/developers-hub/docs/xamarin-configuration#android) | [iOS](https://help.branch.io/developers-hub/docs/xamarin-configuration#ios))

### 3. Verify Branch Links

During the integration process, you should have gone through testing your Branch Links. By now you should be able to do the following with Branch Links:

- Branch Link click can redirect to your website and relevant mobile app store listings if the app is not installed or if it's a web-only link.
- Branch Link click opens your mobile app if the app is installed.
- Branch Link click can deep link into specific in-app content if the app is installed.

### 4. Understand parameter mapping

Before migrating Dynamic Links to Branch Links, it's important to understand how different parameters are mapped between Firebase and Branch. If your Dynamic Links are utilizing specific parameters for certain behaviors or analytics, use the following table to determine which Branch parameter you will need to achieve the same result:

::: tip Tip
For some Firebase parameters, there is **no equivalent Branch parameter**. This is because Branch does not require that parameter to achieve that behavior; it is automatically determined by your [app settings](migrating-firebase-dynamic-links-to-branch-links.md#1-create-your-branch-account) in the Branch Dashboard.
:::

| Firebase | Branch | Description |
| --- | --- | --- |
| `link` | `$canonical_url` | The link your app will open. Specify a URL that your app can handle, typically the app's content or payload, which initiates app-specific logic (such as crediting the user with a coupon or displaying a welcome screen). This link must be a well-formatted URL, be properly URL-encoded, use either HTTP or HTTPS, and cannot be another Dynamic Link. |
| `afl` | `$android_url` | The link to open when the app isn't installed. Specify this to do something other than install your app from the Play Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app. |
| `ifl` | `$ios_url` | The link to open when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app. |
| `ipfl` | `$ipad_url` | The link to open on iPads when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the web version of the content, or display a promotional page for your app. |
| `efr` | `$ios_uri_redirect_mode` | If set to '1', skip the app preview page when the Dynamic Link is opened, and instead redirect to the app or store. The app preview page (enabled by default) can more reliably send users to the most appropriate destination when they open Dynamic Links in apps; however, if you expect a Dynamic Link to be opened only in apps that can open Dynamic Links reliably without this page, you can disable it with this parameter. This parameter will affect the behavior of the Dynamic Link only on iOS. |
| `ofl` | `$fallback_url` | The link to open on platforms beside Android and iOS. This is useful to specify a different behavior on desktop, like displaying a full web page of the app content/payload (as specified by param link) with another dynamic link to install the app. |
| `st` | `$og_title` | The title to use when the Dynamic Link is shared in a social post. |
| `sd` | `$og_description` | The description to use when the Dynamic Link is shared in a social post. |
| `si` | `$og_image_url` | The URL to an image related to this link. The image should be at least 300x200 px, and less than 300 KB. |
| `utm_source` | `~channel` | Google Play analytics parameters. |
| `utm_medium` | `~feature` | Google Play analytics parameters. |
| `utm_campaign` | `~campaign` | Google Play analytics parameters. |
| `utm_term` | `~keywords` | Google Play analytics parameters. |
| `utm_content` | `~tags` | Google Play analytics parameters. |

### 5. Migrate Links created from Firebase console

Firebase Dynamic Links created in the [Firebase console](https://console.firebase.google.com/project/_/durablelinks/links/?_gl=1*xqedse*_ga*MTk5MTY2MDYzNy4xNjgzMDU0OTQ2*_ga_CW55HF8NVT*MTY4NDUxMDUwOS4zLjEuMTY4NDUxNDY1NS4wLjAuMA..) are useful for creating promo links to share on social media through a user interface.



To create the equivalent Branch Link, utilize the [Branch Dashboard](https://dashboard.branch.io/quick-links/manage) to create a [Short Link](create-quick-links.md):



### 6. Migrate links from Dynamic Link Builder API

Firebase Dynamic Links created through the Firebase Dynamic Builder API ([iOS](https://firebase.google.com/docs/dynamic-links/ios/create#create-a-dynamic-link-from-parameters) | [Android](https://firebase.google.com/docs/dynamic-links/android/create#create-a-dynamic-link-from-parameters) | [Flutter](https://firebase.google.com/docs/dynamic-links/flutter/create#create_a_dynamic_link_from_parameters)) are useful for programmatically creating links in your app for user-to-user sharing or in any situation that requires many links.

::: code-group

```swift [Swift]
guard let link = URL(string: "https://www.example.com/my-page") else { return }
let dynamicLinksDomainURIPrefix = "https://example.com/link"
let linkBuilder = DynamicLinkComponents(link: link, domainURIPrefix: dynamicLinksDomainURIPRefix)
linkBuilder.iOSParameters = DynamicLinkIOSParameters(bundleID: "com.example.ios")
linkBuilder.androidParameters = DynamicLinkAndroidParameters(packageName: "com.example.android")

guard let longDynamicLink = linkBuilder.url else { return }
print("The long URL is: \(longDynamicLink)")
```

```objectivec [Obj-C]
NSURL *link = [[NSURL alloc] initWithString:@"https://www.example.com/my-page"];
NSString *dynamicLinksDomainURIPrefix = @"https://example.com/link";
FIRDynamicLinkComponents *linkBuilder = [[FIRDynamicLinkComponents alloc]
                                         initWithLink:link
                                               domainURIPrefix:dynamicLinksDomainURIPrefix];
linkBuilder.iOSParameters = [[FIRDynamicLinkIOSParameters alloc]
                             initWithBundleID:@"com.example.ios"];
linkBuilder.androidParameters = [[FIRDynamicLinkAndroidParameters alloc]
                                 initWithPackageName:@"com.example.android"];

NSLog(@"The long URL is: %@", linkBuilder.url);
```

```kotlin [Kotlin]
val dynamicLink = Firebase.dynamicLinks.dynamicLink {
    link = Uri.parse("https://www.example.com/")
    domainUriPrefix = "https://example.page.link"
    // Open links with this app on Android
    androidParameters { }
    // Open links with com.example.ios on iOS
    iosParameters("com.example.ios") { }
}

val dynamicLinkUri = dynamicLink.uri
```

```java [Java]
DynamicLink dynamicLink = FirebaseDynamicLinks.getInstance().createDynamicLink()
        .setLink(Uri.parse("https://www.example.com/"))
        .setDomainUriPrefix("https://example.page.link")
        // Open links with this app on Android
        .setAndroidParameters(new DynamicLink.AndroidParameters.Builder().build())
        // Open links with com.example.ios on iOS
        .setIosParameters(new DynamicLink.IosParameters.Builder("com.example.ios").build())
        .buildDynamicLink();

Uri dynamicLinkUri = dynamicLink.getUri();
```

```dart [Dart]
final dynamicLinkParams = DynamicLinkParameters(
  link: Uri.parse("https://www.example.com/"),
  uriPrefix: "https://example.page.link",
  androidParameters: const AndroidParameters(packageName: "com.example.app.android"),
  iosParameters: const IOSParameters(bundleId: "com.example.app.ios"),
);
final dynamicLink =
    await FirebaseDynamicLinks.instance.buildLink(dynamicLinkParams);
```

:::

To create the equivalent Branch Link, utilize Branch's relevant SDK methods ([iOS](ios-advanced-features.md) | [Android](android-advanced-features.md) | [Flutter](flutter-sdk-full-reference.md#getshorturl)):

::: code-group

```swift [Swift]
buo.getShortUrl(with: lp) { url, error in
    print(url ?? "")
}
```

```objectivec [Obj-C]
[buo getShortUrlWithLinkProperties:lp andCallback:^(NSString* url, NSError* error) {
    if (!error) {
        NSLog(@"@", url);
    }
}];
```

```kotlin [Kotlin]
val lp = LinkProperties()
        .setChannel("facebook")
        .setFeature("sharing")
        .setCampaign("content 123 launch")
        .setStage("new user")
        .addControlParameter("$desktop_url", "http://example.com/home")
        .addControlParameter("custom", "data")
        .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()))

    buo.generateShortUrl(this, lp, BranchLinkCreateListener { url?, error? ->
        if (error == null) {
            Log.i("BRANCH SDK", "got my Branch link to share: " + url)
        }
    })
```

```java [Java]
LinkProperties lp = new LinkProperties()
        .setChannel("facebook")
        .setFeature("sharing")
        .setCampaign("content 123 launch")
        .setStage("new user")
        .addControlParameter("$desktop_url", "https://example.com/home")
        .addControlParameter("custom", "data")
        .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));

    buo.generateShortUrl(this, lp, new Branch.BranchLinkCreateListener() {
        @Override
        public void onLinkCreate(String url, BranchError error) {
            if (error == null) {
                Log.i("BRANCH SDK", "got my Branch link to share: " + url);
            }
        }
    });
```

```dart [Dart]
BranchUniversalObject buo = BranchUniversalObject(
  canonicalIdentifier: 'flutter/branch',
  //canonicalUrl: '',
  title: 'Flutter Branch Plugin',
  imageUrl: 'https://flutter.dev/assets/flutter-lockup-4cb0ee072ab312e59784d9fbf4fb7ad42688a7fdaea1270ccf6bbf4f34b7e03f.svg',
  contentDescription: 'Flutter Branch Description',
  keywords: ['Plugin', 'Branch', 'Flutter'],
  publiclyIndex: true,
  locallyIndex: true,
  contentMetadata: BranchContentMetaData()..addCustomMetadata('custom_string', 'abc')
  ..addCustomMetadata('custom_number', 12345)
  ..addCustomMetadata('custom_bool', true)
  ..addCustomMetadata('custom_list_number', [1,2,3,4,5 ])
  ..addCustomMetadata('custom_list_string', ['a', 'b', 'c']),
);

BranchLinkProperties lp = BranchLinkProperties(
  //alias: 'flutterplugin', //define link url,
  channel: 'facebook',
  feature: 'sharing',
  stage: 'new share',
  tags: ['one', 'two', 'three']
);
lp.addControlParam('url', 'http://www.google.com');
lp.addControlParam('url2', 'http://flutter.dev');

BranchResponse response =
  await FlutterBranchSdk.getShortUrl(buo: buo, linkProperties: lp);
if (response.success) {
  print('Link generated: ${response.result}');
} else {
  print('Error : ${response.errorCode} - ${response.errorMessage}');
}
```

:::

### 7. Migrate links from REST API

Firebase Dynamic Links created through the Firebase [REST API](https://firebase.google.com/docs/dynamic-links/rest) are useful for dynamically creating links on platforms that don't have a Builder API.

```
POST https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=api_key
Content-Type: application/json

{
  "dynamicLinkInfo": {
    "domainUriPrefix": "https://example.page.link",
    "link": "https://www.example.com/",
    "androidInfo": {
      "androidPackageName": "com.example.android"
    },
    "iosInfo": {
      "iosBundleId": "com.example.ios"
    }
  }
}
```

To create the equivalent Branch Link, utilize Branch's [Deep Link API](https://help.branch.io/apidocs/createdeeplinkurl):

```
POST /v1/url HTTP/1.1
Accept: application/json
Content-Type: application/json
Host: api2.branch.io
Content-Length: 710

{"branch_key":"key_live_xxxx","channel":"facebook","feature":"onboarding","campaign":"new product","stage":"new user","tags":["one"],"data":{"$fallback_url":"string","$fallback_url_xx":"string","$desktop_url":"string","$ios_url":"string","$ios_url_xx":"string","$ipad_url":"string","$android_url":"string","$android_url_xx":"string","$samsung_url":"string","$huawei_url":"string","$windows_phone_url":"string","$blackberry_url":"string","$fire_url":"string","$ios_wechat_url":"string","$android_wechat_url":"string","$web_only":false,"$desktop_web_only":false,"$mobile_web_only":false,"$after_click_url":"false","$afterclick_desktop_url":"string"},"alias":"string","type":0,"duration":7200,"identity":"string"}
```

### 8. Migrate manually created links

Firebase Dynamic Links created [manually](https://firebase.google.com/docs/dynamic-links/create-manually) are useful if you don't need to track click data and don't care if links are long:

`https://your_subdomain.page.link/?link=your_deep_link&st=your_title&sd=your_description`

To create the equivalent Branch Link, utilize Branch's [Long Links](creating-a-deep-link.md#long-links):

`https://your_subdomain.app.link/?$canonical_url=your_deep_link&$og_title=your_title&$og_description=your_description`

## Additional Branch Link creation options

There are other methods of creating Branch Links that may better align with your marketing strategies and processes. Some of these options can help make your migration easier through bulk creation. View some of those options here:

| Option | Description |
| --- | --- |
| [Bulk Short Link Creation (CSV)](create-quick-links.md#bulk-create-quick-links) | Upload a [CSV](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/bulk%20link%20creation%20sample.csv) to the Branch Dashboard to create Short Links in bulk. |
| [Bulk Link Create API](https://help.branch.io/apidocs/createdeeplinkurl) | Programmatically create Short Links in bulk via Branch's Deep Linking API. |
| [QR Code API](https://help.branch.io/apidocs/qr-code-api) | Programmatically create QR Codes via Branch's QR Code API. **Note:** Using this request will output your QR Code in the directory where the request was made and in the format defined in the request. |
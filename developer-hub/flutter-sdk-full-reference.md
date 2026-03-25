---
title: "Flutter SDK Full Reference"
slug: flutter-sdk-full-reference
---

## initSession (Deprecated)

| Method | Description |
| --- | --- |
| [Stream\&lt;Map\&lt;dynamic, dynamic\&gt;\&gt; initSession()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L35) | Initiates a session with the Branch API through a listener. |

#### Example Usage

```
streamSubscription = FlutterBranchSdk.initSession().listen((data) {
  print('listenDynamicLinks - DeepLink Data: $data');
  controllerData.sink.add((data.toString()));
  if (data.containsKey('+clicked_branch_link') &&
      data['+clicked_branch_link'] == true) {
    print(
      '------------------------------------Link clicked----------------------------------------------');
    print('Custom string: ${data['custom_string']}');
    print('Custom number: ${data['custom_number']}');
    print('Custom bool: ${data['custom_bool']}');
    print('Custom list number: ${data['custom_list_number']}');
    print(
      '------------------------------------------------------------------------------------------------');
    showSnackBar(
      context: context,
      message: 'Link clicked: Custom string - ${data['custom_string']}',
      duration: 10);
  }
}, onError: (error) {
  PlatformException platformException = error as PlatformException;
  print(
    'InitSession error: ${platformException.code} - ${platformException.message}');
  controllerInitSession.add(
    'InitSession error: ${platformException.code} - ${platformException.message}');
});
```

---

## validateSDKIntegration

| Method | Description |
| --- | --- |
| [void validateSDKIntegration()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L41) | Use the SDK integration validator to check that you've added the Branch SDK and handle deep links correctly when you first integrate Branch into your app. Validates the following:   - Branch Keys - Package Name - URI Schemes - Android App Link - Universal Links - Link Domains |

#### Example Usage:

```
FlutterBranchSdk.validateSDKIntegration();
```

---

## setRequestMetadata

| Method | Description |
| --- | --- |
| [void setRequestMetadata(String key, String value)](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L9) | Set specific key/value pairs to all requests. This is required for integrating with specific partners like Adobe Analytics, Amplitude, etc. Partner keys can be found in the partner-specific guides. |

| Argument | Type | Description |
| --- | --- | --- |
| `key` | `String` | The partner key. Ex. `$marketing_cloud_visitor_id` |
| `value` | `String` | The value of the partner key |

#### Example Usage

```
FlutterBranchSdk.setRequestMetadata(requestMetadataKey, requestMetadataValue);
```

---

## setIdentity

| Method | Description |
| --- | --- |
| [void setIdentity(String userId)](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L4) | Set the identity of a user (ID, UUID, etc) for events, deep links, and referrals. Use this method when the user logs into their account in your app.See [PII Best Practices](best-practices-to-avoid-sending-pii-to-branch.md#developer-identity) for details. |

| Argument | Type | Description |
| --- | --- | --- |
| `userId` | `String` | The unique ID of the user |

#### Example Usage

```
FlutterBranchSdk.setIdentity('user1234567890');
```

---

## isUserIdentified

| Method | Description |
| --- | --- |
| [Future\&lt;bool\&gt; isUserIdentified()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L114) | Indicate whether or not this user has a custom identity specified for them. Note that this is independent of installs.If you call the `setIdentity` method, this device will have that identity associated with this user until the `logout` method is called.This includes persisting through uninstalls, as device ID is tracked. |

#### Example Usage

```
bool isUserIdentified = await FlutterBranchSdk.isUserIdentified();
```

## logout

| Method | Description |
| --- | --- |
| [void logout()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L14) | Clear the identity set from the `setIdentity()` method. This method should be called if you know that the user is explicitly logging out or if a different person is about to use the app. |

#### Example Usage

```
FlutterBranchSdk.logout();
```

---

## handleDeepLink

| Method | Description |
| --- | --- |
| [void handleDeepLink(String url)](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L209) | End the current deep link session and starts a new session with the provided URL. To handle push notifications, call this method inside of the push notification callback. |

| Argument | Type | Description |
| --- | --- | --- |
| `url` | `String` | The URL of the deep link for the new session. |

#### Example Usage

```
FlutterBranchSdk.handleDeepLink('myapp://open?link_click_id=12345');
```

---

## getLatestReferringParams

| Method | Description |
| --- | --- |
| [Future\&lt;Map\&lt;dynamic, dynamic\&gt;\&gt; getLatestReferringParams()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L19) | Return the last parameters associated with the link that referred the user to the current app session. |

#### Example Usage

```
Map<dynamic, dynamic> params = await FlutterBranchSdk.getLatestReferringParams();
```

---

## getFirstReferringParams

| Method | Description |
| --- | --- |
| [Future\&lt;Map\&lt;dynamic, dynamic\&gt;\&gt; getFirstReferringParams()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L24) | Return the first parameters associated with the link that referred the user. Consider this as the parameters used to retrieve the details from the user's first app session. |

#### Example Usage

```
Map<dynamic, dynamic> params = await FlutterBranchSdk.getFirstReferringParams();
```

---

## disableTracking

| Method | Description |
| --- | --- |
| [void disableTracking(bool value)void disableTracking(bool value)](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L29) | If you need to comply with a user's request to not be tracked for GDPR purposes, or otherwise determine that a user should not be tracked, utilize this method to prevent Branch from sending network requests. This setting can also be enabled across all users for a particular link or across your Branch Links. |

| Argument | Type | Description |
| --- | --- | --- |
| `value` | `Boolean` | If set to `true`, `disableTracking` is enabled.  If set to `false`, `disableTracking` is disabled. |

#### Example Usage

```
FlutterBranchSdk.disableTracking(true);
```

---

## getShortUrl

| Method | Description |
| --- | --- |
| [Future\&lt;BranchResponse\&gt; getShortUrl( {required BranchUniversalObject buo, required BranchLinkProperties linkProperties})](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L47) | Generate a [Branch Short Link](creating-a-deep-link.md#short-links) used for deep linking and attribution. |

| Argument | Type | Description |
| --- | --- | --- |
| `buo` | `BranchUniversalObject` | The [Universal Object](creating-a-deep-link.md#universal-object) used to define content within your app.[BUO Best Practices](creating-a-deep-link.md#buo-best-practices) |
| `linkProperties` | `BranchLinkProperties` | The analytics properties associated with the link you are about to generate. |

#### Example Usage

```
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

---

## showShareSheet

| Method | Description |
| --- | --- |
| [Future\&lt;BranchResponse\&gt; showShareSheet( {required BranchUniversalObject buo, required BranchLinkProperties linkProperties, required String messageText, String androidMessageTitle = '', String androidSharingTitle = ''})](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L55) | Display a share sheet to prompt the user to share to an external platform (ex. messaging) |

| Argument | Type | Description |
| --- | --- | --- |
| `buo` | `BranchUniversalObject` | The [Universal Object](creating-a-deep-link.md#universal-object) used to define content within your app. [BUO Best Practices](creating-a-deep-link.md#buo-best-practices) |
| `linkProperties` | `BranchLinkProperties` | The analytics properties associated with the link you are about to generate. |
| `messageText` | `String` | The body of the message in your share sheet. |
| `androidMessageTitle` | `String` | The message title of the share sheet. |
| `androidSharingTitle` | `String` | The sharing title of the share sheet. |

#### Example Usage

```
BranchResponse response = await FlutterBranchSdk.showShareSheet(
  buo: buo,
  linkProperties: lp,
  messageText: 'My Share text',
  androidMessageTitle: 'My Message Title',
  androidSharingTitle: 'My Share with');

if (response.success) {
  print('showShareSheet Sucess');
} else {
  print('Error : ${response.errorCode} - ${response.errorMessage}');
}
```

---

## getQRCode

| Method | Description |
| --- | --- |
| [Future\&lt;BranchResponse\&gt; getQRCodeAsData( {required BranchUniversalObject buo, required BranchLinkProperties linkProperties, required BranchQrCode qrCode})](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L175) | Method `getQRCodeAsData` returns the QR code as Uint8List. Can be stored in a file or converted to image. |
| [Future\&lt;BranchResponse\&gt; getQRCodeAsImage( {required BranchUniversalObject buo, required BranchLinkProperties linkProperties, required BranchQrCode qrCode})](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L184) | Method `getQRCodeAsImage` returns the QR code as a Image. |

| Argument | Type | Description |
| --- | --- | --- |
| `primaryColor` | `Color` | Color name or Hex color value |
| `backgroundColor` | `Color` | Color name or Hex color value of the background of the QR code itself. |
| `margin` | `Integer (Pixels)` | The number of pixels you want for the margin. Min 1px. Max 20px. |
| `width` | `Integer (Pixels)` | Output size of QR Code image. Min 300px. Max 2000px. (Only applicable to JPEG/PNG) |
| `imageFormat` | `BranchImageFormat` | JPEG, PNG |
| `centerLogoUrl` | `String (HTTP URL)` | URL to the image you want as a center logo e.g. \&lt;https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/branch%20logo%20qrcode.jpeg\&gt; |

#### Example Usage

```
BranchResponse responseQrCodeImage = await FlutterBranchSdk.getQRCodeAsImage(
  buo: buo!,
  linkProperties: lp,
  qrCode: BranchQrCode(primaryColor: Colors.black, 
                       //primaryColor: const Color(0xff443a49), //Hex colors
                       centerLogoUrl: imageURL,
                       backgroundColor: Colors.white,
                       imageFormat: BranchImageFormat.PNG));

  if (response.success) {
      print('QrCode Success');
      showQrCode(this.context, responseQrCodeImage.result);
      /*
       Image(image: responseQrCodeImage.result,
             height: 250,
             width: 250,),
      */
  } else {
     print('Error : ${response.errorCode} - ${response.errorMessage}');
```

## trackContent

By default, the Branch SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box).

#### General Event Tracking

Please refer to our [Event Tracking Docs](track-branch-events.md) for more information and examples:

- [Track Commerce Events](track-branch-events.md#track-commerce-events)
- [Track Content Events](track-branch-events.md#track-content-events)
- [Track Lifecycle Events](track-branch-events.md#track-lifecycle-events)
- [Track Custom Events](track-branch-events.md#track-custom-events)

#### Tracking In-App Web View Events

With the Branch Flutter SDK, it is possible to inject JavaScript into an in-app web view with event listeners to make calls to one of our mobile SDKs.

In this scenario, the website’s JavaScript posts a message when a button or element on the page is clicked. The app then uses a JavaScript channel to listen for that message. Inside of the callback, a switch statement is used to check the message and trigger a Branch Event.

To implement this approach:

1. Add JavaScript code to the website to add a listener to the button’s selector and call the `postMessage()` function:

   ```
   var _selector = document.querySelector('button[id=BUTTON_ID]');
   _selector.addEventListener('click', function(event) {
     var message = "LOGIN";

     if (messageHandler) {
       messageHandler.postMessage(message);
     }
   });
   ```
2. Add a JavaScript channel to the WebViewController to handle the `onMessageRecieved` callback and trigger the corresponding Branch Event:

   ```
   class _MyWebViewState extends State {="" late="" final="" webviewcontroller="" controller;="" @override="" void="" initstate()="" {="" super.initstate();="" controller="WebViewController()" ..loadrequest(="" uri.parse('https://your_website.com'),="" );="" controller.setjavascriptmode(javascriptmode.unrestricted);="" controller.addjavascriptchannel('messagehandler',="" onmessagereceived:="" (message)="" {="" switch="" (message.message)="" {="" case="" "login":="" branchevent="" event="BranchEvent.standardEvent(BranchStandardEvent.LOGIN);" flutterbranchsdk.trackcontentwithoutbuo(branchevent:="" event);="" break;="" case="" "purchase":="" branchevent="" event="BranchEvent.standardEvent(BranchStandardEvent.PURCHASE);" flutterbranchsdk.trackcontentwithoutbuo(branchevent:="" event);="" break;="" }="" });="" }="" }="">>
   ```

## registerView

| Method | Description |
| --- | --- |
| [void registerView({required BranchUniversalObject buo})](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L84) | Mark the content referred to by this object as viewed. This will increment the view count of the contents referred by this object. |

| Argument | Type | Description |
| --- | --- | --- |
| `buo` | `BranchUniversalObject` | The [Universal Object](creating-a-deep-link.md#universal-object) used to define content within your app.[BUO Best Practices](creating-a-deep-link.md#buo-best-practices) |

#### Example Usage

```
FlutterBranchSdk.registerView(buo: buo);
```

---

## listOnSearch

| Method | Description |
| --- | --- |
| [Future\&lt;bool\&gt; listOnSearch( {required BranchUniversalObject buo, BranchLinkProperties? linkProperties})](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L89) | On iOS, list items on Spotlight. |

| Argument | Type | Description |
| --- | --- | --- |
| `buo` | `BranchUniversalObject` | The [Universal Object](creating-a-deep-link.md#universal-object) used to define content within your app. [BUO Best Practices](creating-a-deep-link.md#buo-best-practices) |
| `linkProperties` | `BranchLinkProperties` | The analytics properties associated with the link you are about to generate. |

#### Example Usage

```
bool success = await FlutterBranchSdk.listOnSearch(buo: buo);
print(success);
```

---

## removeFromSearch

| Method | Description |
| --- | --- |
| [Future\&lt;bool\&gt; removeFromSearch( {required BranchUniversalObject buo, BranchLinkProperties? linkProperties})](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L98) | On iOS, remove the BUO from Spotlight if privately indexed. |

| Argument | Type | Description |
| --- | --- | --- |
| `buo` | `BranchUniversalObject` | The [Universal Object](creating-a-deep-link.md#universal-object) used to define content within your app.[BUO Best Practices](creating-a-deep-link.md#buo-best-practices) |
| `linkProperties` | `BranchLinkProperties` | The analytics properties associated with the link you are about to generate. |

#### Example Usage

```
bool success = await FlutterBranchSdk.removeFromSearch(buo: buo);
print('Remove sucess: $success');
```

---

## setIOSSKAdNetworkMaxTime

| Method | Description |
| --- | --- |
| [void setIOSSKAdNetworkMaxTime(int hours)](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L108) | Set the time window for SKAdNetwork callout in hours on **iOS only**. By default, Branch limits calls to SKAdNetwork to within 72 hours after first install. |

| Argument | Type | Description |
| --- | --- | --- |
| `hours` | `int` | Time window in hours. |

#### Example Usage

```
FlutterBranchSdk.setIOSSKAdNetworkMaxTime(24);
```

---

---

## requestTrackingAuthorization

| Method | Description |
| --- | --- |
| [Future\&lt;AppTrackingStatus\&gt; requestTrackingAuthorization()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L121) | Request AppTracking Authorization and returns AppTrackingStatus on **iOS only**. |

#### Example Usage

```
AppTrackingStatus status = await FlutterBranchSdk.requestTrackingAuthorization();
print(status);
```

---

## getTrackingAuthorizationStatus

| Method | Description |
| --- | --- |
| [Future\&lt;AppTrackingStatus\&gt; getTrackingAuthorizationStatus()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L127) | Return AppTrackingStatus on **iOS only**. |

#### Example Usage

```
AppTrackingStatus status = await FlutterBranchSdk.getTrackingAuthorizationStatus();
print(status);
```

---

## getAdvertisingIdentifier

| Method | Description |
| --- | --- |
| [Future\&lt;String\&gt; getAdvertisingIdentifier()](https://github.com/BranchMetrics/flutter_branch_sdk/blob/master/lib/src/flutter_branch_sdk.dart#L133) | Return the advertising identifier on **iOS only**. |

#### Example Usage

```
String status = await FlutterBranchSdk.getAdvertisingIdentifier();
print(status);
```
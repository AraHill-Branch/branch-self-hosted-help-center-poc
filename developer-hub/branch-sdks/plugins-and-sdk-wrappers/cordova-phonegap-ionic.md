---
title: "Cordova PhoneGap Ionic"
slug: cordova-phonegap-ionic
---

## Configure Branch

- Complete your [Branch Dashboard](https://dashboard.branch.io/settings/link)





## Configure App

<details>
<summary>Cordova and Ionic</summary>

```
<!-- sample config.xml -->
    <widget id="com.eneff.branch.cordovatestbed" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
      <!-- Branch -->
      <plugin name="branch-cordova-sdk" spec="^4.0.0" />
      <branch-config>
        <branch-key value="key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3" />
        <uri-scheme value="branchcordova" />
        <link-domain value="cordova.app.link" />  <!-- Required app.link domain -->
        <link-domain value="cordova-alternate.app.link" />  <!-- Required alternate.app.link domain -->
        <ios-team-release value="PW4Q8885U7" />
      </branch-config>
```

</details>

<details>
<summary>PhoneGap</summary>

```
<!-- sample config.xml -->
    <widget id="com.eneff.branch.cordovatestbed" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">
      <!-- Branch -->
      <plugin name="branch-cordova-sdk" spec="^4.0.0" />
      <branch-config>
        <branch-key value="key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3" />
        <uri-scheme value="branchcordova" />
        <link-domain value="cordova.app.link" />  <!-- Required app.link domain -->
        <link-domain value="cordova-alternate.app.link" />  <!-- Required alternate.app.link domain -->
        <ios-team-release value="PW4Q8885U7" />
      </branch-config>
```

</details>

- Change the following values to match your [Branch Dashboard](https://dashboard.branch.io/settings/link)
- `com.eneff.branch.cordovatestbed`
- `key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3`
- `branchcordova`
- `cordova.app.link`
- `PW4Q8885U7`

## Initialize Branch

<details>
<summary>Cordova and PhoneGap</summary>

```
// sample index.js
    var app = {
      initialize: function() {
        this.bindEvents();
      },
      bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', this.onDeviceResume, false);
      },
      onDeviceReady: function() {
        app.handleBranch();
      },
      onDeviceResume: function() {
        app.handleBranch();
      },
      handleBranch: function() {
        // Branch initialization
        Branch.initSession().then(function(data) {
          if (data['+clicked_branch_link']) {
            // read deep link data on click
            alert('Deep Link Data: ' + JSON.stringify(data));
          }
        });
      }
    };

    app.initialize();
```

</details>

<details>
<summary>Ionic 1</summary>

```
// sample app.js
    angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        // Branch
        $ionicPlatform.on('deviceready', function() {
          handleBranch();
        });

        $ionicPlatform.on('resume', function() {
          handleBranch();
        });

        function handleBranch() {
          // Branch initialization
          Branch.initSession().then(function(data) {
            if (data['+clicked_branch_link']) {
              // read deep link data on click
              alert('Deep Link Data: ' + JSON.stringify(data));
            }
          });
        }
      });
    })
    // ...
```

</details>

<details>
<summary>Ionic 2 & 3</summary>

```
// sample app.component.js
      import { Component } from '@angular/core';
      import { Platform } from 'ionic-angular';
      import { StatusBar, Splashscreen } from 'ionic-native';

      import { TabsPage } from '../tabs/tabs

      @Component({
        template: `<ion-nav [root]="rootPage"></ion-nav>`
      })
      export class MyApp {
        rootPage = TabsPage;

        constructor(platform: Platform) {
          platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
            handleBranch();
          });

          platform.resume.subscribe(() => {
            handleBranch();
          });

          // Branch initialization
          const handleBranch = () => {
            // only on devices
            if (!platform.is('cordova')) { return }
            const Branch = window['Branch'];
            Branch.initSession().then(data => {
              if (data['+clicked_branch_link']) {
                // read deep link data on click
                alert('Deep Link Data: ' + JSON.stringify(data));
              }
            });
          }
        }
      }
```

</details>

## Test deep link iOS

- Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)
- Delete your app from the device
- Compile your app *(*`cordova run ios``phonegap run ios``ionic run ios`*)*
- Paste deep link in **Apple Notes**
- Long press on the deep link *(not 3D Touch)*
- Click **Open in "APP\_NAME"** to open your app



## Test deep link Android

- Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)
- Delete your app from the device
- Compile your app *(*`cordova run android``phonegap run android``ionic run android`*)*
- Paste deep link in **Google Hangouts**
- Click on the deep link to open your app

## Implement Features

## Initialize Branch features

- Loads Branch into your app
- Must be called on `deviceready` and `resume`

```
// for development and debugging only
    Branch.setDebug(true)

    // for GDPR compliance (can be called at anytime)
    Branch.disableTracking(true);

    // Branch initialization
    Branch.initSession().then(function(data) {
      if (data['+clicked_branch_link']) {
        // read deep link data on click
        alert('Deep Link Data: ' + JSON.stringify(data))
      }
    })
```

### Configure pre-initialization settings

The following methods must be called **before** `Branch.initSession()` to set data correctly

#### setSDKWaitTimeForThirdPartyAPIs()

Configures how long the SDK waits for third-party API responses (ODM info and Apple Attribution Token)

```
Branch.setSDKWaitTimeForThirdPartyAPIs(3);
```

| Argument | Type | Description |
| --- | --- | --- |
| `waitTime` | `number` | Number of seconds SDK will wait for third party APIs to finish. Default is 0.5 seconds (500ms). |

#### setODMInfo()

Passes ODM info to the Branch iOS SDK.

```
Branch.setODMInfo("odmInfo", Date.now());
```

| Argument | Type | Description |
| --- | --- | --- |
| `odmInfo` | `String` | The ODM event data (or aggregate conversion info) for the current app instance. |
| `firstOpenTimestamp` | `Number` | The date and time when the app was first opened after installation. This timestamp is used for conversion attribution timing and should match the value passed to Google's `setFirstLaunchTime` method. |

#### setAnonID()

Sets a custom Meta anon\_id for the current user. The Meta anon\_id is a GUID generated by the Branch iOS SDK for Meta AEM.

```
Branch.setAnonID("your-anon-id");
```

| Argument | Type | Description |
| --- | --- | --- |
| `anonID` | `String` | The custom Meta anon\_id to set for the user. |

## Create content reference

- The **Branch Universal Object** encapsulates the thing you want to share (content or user)
- Uses the [Universal Object Properties](creating-a-deep-link.md#section-universal-object)

```
// only canonicalIdentifier is required
    var properties = {
      canonicalIdentifier: 'content/123',
      canonicalUrl: 'https://example.com/content/123',
      title: 'Content 123 Title',
      contentDescription: 'Content 123 Description ' + Date.now(),
      contentImageUrl: 'http://lorempixel.com/400/400/',
      price: 12.12,
      currency: 'GBD',
      contentIndexingMode: 'private',
      contentMetadata: {
        custom: 'data',
        testing: 123,
        this_is: true
      }
    }

    // create a branchUniversalObj variable to reference with other Branch methods
    var branchUniversalObj = null
    Branch.createBranchUniversalObject(properties).then(function (res) {
      branchUniversalObj = res
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
```

## Create deep link

- Creates a deep link URL with encapsulated data
- Needs a [Branch Universal Object](cordova-phonegap-ionic.md#section-create-content-reference)
- Uses [Deep Link Properties](creating-a-deep-link.md)
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/links)

```
// optional fields
    var analytics = {
      channel: 'facebook',
      feature: 'onboarding',
      campaign: 'content 123 launch',
      stage: 'new user',
      tags: ['one', 'two', 'three']
    }

    // optional fields
    var properties = {
      $desktop_url: 'http://www.example.com/desktop',
      $android_url: 'http://www.example.com/android',
      $ios_url: 'http://www.example.com/ios',
      $ipad_url: 'http://www.example.com/ipad',
      $match_duration: 2000,
      custom_string: 'data',
      custom_integer: Date.now(),
      custom_boolean: true
    }

    branchUniversalObj.generateShortUrl(analytics, properties).then(function (res) {
      alert('Response: ' + JSON.stringify(res.url))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
```

## Share deep link

- Will generate a Branch deep link and tag it with the channel the user selects
- Needs a [Branch Universal Object](cordova-phonegap-ionic.md#section-create-content-reference)
- Uses [Deep Link Properties](creating-a-deep-link.md)

```
// optional fields
    var analytics = {
      channel: 'facebook',
      feature: 'onboarding',
      campaign: 'content 123 launch',
      stage: 'new user',
      tags: ['one', 'two', 'three']
    }

    // optional fields
    var properties = {
      $desktop_url: 'http://www.example.com/desktop',
      custom_string: 'data',
      custom_integer: Date.now(),
      custom_boolean: true
    }

    var message = 'Check out this link'

    // optional listeners (must be called before showShareSheet)
    branchUniversalObj.onShareSheetLaunched(function (res) {
      // android only
      console.log(res)
    })
    branchUniversalObj.onShareSheetDismissed(function (res) {
      console.log(res)
    })
    branchUniversalObj.onLinkShareResponse(function (res) {
      console.log(res)
    })
    branchUniversalObj.onChannelSelected(function (res) {
      // android only
      console.log(res)
    })

    // share sheet
    branchUniversalObj.showShareSheet(analytics, properties, message)
```

## Read deep link

- Retrieve Branch data from a deep link
- Best practice to receive data from the `listener` (to prevent a race condition)
- Returns [deep link properties](creating-a-deep-link.md#data-structure)
- Listener

```
// Branch initialization within your deviceready and resume
    Branch.initSession().then(function success(res) {
      if (res["+clicked_branch_link"]) {
        alert("Open app with a Branch deep link: " + JSON.stringify(res));
        // Branch Short Link: https://cordova.app.link/uJcOH1IFpM
        // Branch web link: https://cordova-alternate.app.link/uJcOH1IFpM
        // Branch dynamic link: https://cordova.app.link?tags=one&tags=two&tags=three&channel=Copy&feature=onboarding&stage=new+user&campaign=content+123+launch&type=0&duration=0&source=android&data
        // Branch uri scheme: branchcordova://open?link_click_id=link-500015444967786346
        // Branch android intent: intent://open?link_click_id=518106399270344237#Intent;scheme=looprocks;package=com.eneff.branch.cordovatestbed;S.browser_fallback_url=https%3A%2F%2Fcordova.app.link%2FuJcOH1IFpM%3F__branch_flow_type%3Dchrome_deepview%26__branch_flow_id%3D518106399312287278;S.market_referrer=link_click_id-518106399270344237%26utm_source%3DCopy%26utm_campaign%3Dcontent%20123%20launch%26utm_feature%3Donboarding;S.branch_data=%7B%22~feature%22%3A%22onboarding%22%2C%22this_is%22%3A%22true%22%2C%22custom_string%22%3A%22data%22%2C%22testing%22%3A%22123%22%2C%22%24publicly_indexable%22%3A%22false%22%2C%22%24desktop_url%22%3A%22http%3A%2F%2Fwww.example.com%2Fdesktop%22%2C%22%24one_time_use%22%3Afalse%2C%22custom_object%22%3A%22%7B%5C%5C%5C%22random%5C%5C%5C%22%3A%5C%5C%5C%22dictionary%5C%5C%5C%22%7D%22%2C%22~id%22%3A%22517795540654792902%22%2C%22~campaign%22%3A%22content%20123%20launch%22%2C%22%2Bclick_timestamp%22%3A1524764418%2C%22%2Burl%22%3A%22https%3A%2F%2Fcordova.app.link%2FuJcOH1IFpM%22%2C%22custom_boolean%22%3A%22true%22%2C%22custom%22%3A%22data%22%2C%22source%22%3A%22android%22%2C%22%24og_image_url%22%3A%22http%3A%2F%2Florempixel.com%2F400%2F400%2F%22%2C%22%2Bdomain%22%3A%22cordova.app.link%22%2C%22custom_integer%22%3A%221524690301794%22%2C%22~tags%22%3A%5B%22one%22%2C%22two%22%2C%22three%22%5D%2C%22custom_array%22%3A%22%5B1%2C2%2C3%2C4%2C5%5D%22%2C%22~channel%22%3A%22Copy%22%2C%22~creation_source%22%3A2%2C%22%24canonical_identifier%22%3A%22content%2F123%22%2C%22%24og_title%22%3A%22Content%20123%20Title%22%2C%22%24og_description%22%3A%22Content%20123%20Description%201524690296449%22%2C%22%24identity_id%22%3A%22453670943617990547%22%2C%22~stage%22%3A%22new%20user%22%2C%22%2Bclicked_branch_link%22%3Atrue%2C%22%2Bmatch_guaranteed%22%3Atrue%2C%22%2Bis_first_session%22%3Afalse%7D;B.branch_intent=true;end
        // Branch android app link (device controlled): https://cordova.app.link/uJcOH1IFpM
        // Branch ios universal link (device controlled): https://cordova.app.link/uJcOH1IFpM
      } else if (res["+non_branch_link"]) {
        alert("Open app with a non Branch deep link: " + JSON.stringify(res));
        // Competitor uri scheme: anotherurischeme://hello=world
      } else {
        alert("Open app organically");
        // Clicking on app icon or push notification
      }
    })
    .catch(function error(err) {
      logger(err, true);
    });
```

- Latest data

```
Branch.getLatestReferringParams().then(function(res) {
  alert('Response: ' + JSON.stringify(res))
}).catch(function(err) {
  alert('Error: ' + JSON.stringify(err))
})
```

- First data

```
Branch.getFirstReferringParams().then(function(res) {
  alert('Response: ' + JSON.stringify(res))
}).catch(function(err) {
  alert('Error: ' + JSON.stringify(err))
})
```

### NativeLink™ Deferred Deep Linking (iOS Only)

- Use iOS pasteboard to enable deferred deep linking via Branch NativeLink™

::: warning Prerequisites
**Make sure the underlying iOS SDK Version is v1.39.4+**

To use this feature you must:

- [Enable NativeLink™ Deep Linking](configure-default-link-behaviors.md#3-ios-default-link-behavior) in the [Branch Dashboard Configuration tab](https://dashboard.branch.io/configuration/general)  
  **or**
- Manually configure your Branch Link to use [$ios\_clipboard\_deepview](creating-a-deep-link.md#deep-linking)
:::

Implement one of the [pasteboard opt-in options](ios-advanced-features.md) in the native iOS SDK code.

Please note that deferred deep linking is part of our Engagement package. Learn more on our pricing [page](packaging.md).

## Create QR Code

- Set your Qr Code Settings
- Set your Analytics and Link Properties
- Use getBranchQRCode() to create a QR code.

```
var qrCodeSettings = {
        width: 2000,
        codeColor: "#3b2016",
        backgroundColor: "#a8e689",
        centerLogo: "https://cdn.britannica.com/95/156695-131-FF89C9FA/oak-tree.jpg",
        margin: 4,
        imageFormat: "PNG"
    };

    var analytics = {
        channel: "facebook",
        feature: "onboarding",
        campaign: "content 123 launch",
        stage: "new user",
        tags: ["one", "two", "three"],
        alias: document.getElementById("alias").value
      };
    
    var properties = {
        $desktop_url: "http://www.example.com/desktop",
        $android_url: "http://www.example.com/android",
        $ios_url: "http://www.example.com/ios",
        $ipad_url: "http://www.example.com/ipad",
        $deeplink_path: "content/123",
        $match_duration: 2000,
        custom_string: "data",
        custom_integer: Date.now(),
        custom_boolean: true
    };
    
    
    if (branchUniversalObj === null) {
        alert("Need to Generate Branch Universal Object");
        return;
    }
      
    Branch
    .getBranchQRCode(qrCodeSettings, branchUniversalObj, analytics, properties)
    .then(function success(res) {
        document.getElementById("qrCodeImage").src = "data:image/png;base64, " + res;
    })
    .catch(function error(err) {
        alert(err, true);
    });
```

### Access

Basic Branch QR Codes are included in the free tier of the Branch Growth Platform.

For more advanced QR Code capabilities, see our Engagement Pro [package](packaging.md), which includes access to the [QR Code API](qr-code-api.md) as well as the ability to create custom QR Codes in the Branch Dashboard.

## Navigate to content

- Handled within `Branch.initSession()`
- Branch allows you to pass any custom key-value from URLs to your app. Use this data to navigate to content, display a personalized welcome screen, login a user, offer a promotion, etc.

```
Branch.initSession().then(function(data) {
      if (data['+clicked_branch_link']) {
        // option 1: save to model to be used later
        window.localStorage['branchData'] = data;

        // option 2: navigate to page
        window.location.href = '#/content/123'

        // option 3: display data
        alert(JSON.stringify(data));
      }
    });
```

## Display content

- List content on **iOS Spotlight**
- Needs a [Branch Universal Object](cordova-phonegap-ionic.md#section-create-content-reference)

```
branchUniversalObj.listOnSpotlight().then(function (res) {
  alert('Response: ' + JSON.stringify(res))
}).catch(function (err) {
  alert('Error: ' + JSON.stringify(err))
})
```

## Track content

- Track how many times a piece of content is viewed
- Needs a [Branch Universal Object](cordova-phonegap-ionic.md#create-content-reference)
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/content)

```
branchUniversalObj.registerView().then(function (res) {
  alert('Response: ' + JSON.stringify(res))
}).catch(function (err) {
  alert('Error: ' + JSON.stringify(err))
})
```

### Track users

- Sets the identity of a user (ID, UUID, etc) for events, deep links, and referrals
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)

```
var userId = '123456'
    Branch.setIdentity(userId).then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err.message))
    })
```

- Removes the identity of a user

```
Branch.logout().then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err.message))
    })
```

## Track events

- Registers a custom event
- Events named `open`, `close`, `install`, and `referred session` are Branch restricted
- Best to [Track users](cordova-phonegap-ionic.md#track-users) before [Track events](cordova-phonegap-ionic.md#track-events) to associate a custom event to a user
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

```
var eventName = 'clicked_on_this';
var metadata = { 'custom_dictionary': 123, 'anything': 'everything' };
Branch.sendBranchEvent(eventName, metadata);

var eventName = 'clicked_on_this';
Branch.sendBranchEvent(eventName);
```

## Track commerce

- Registers a custom commerce event
- Uses [Track commerce properties](cordova-phonegap-ionic.md#track-commerce) for `Currency` and `Category`
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/commerce)

```
Branch.getStandardEvents().then(function success(res) {
  var event = res.STANDARD_EVENT_ADD_TO_CART;
  var properties = {
        transactionID: '12344555',
        currency: 'USD',
        revenue: 1.5,
        shipping: 10.2,
        tax: 12.3,
        coupon: 'test_coupon',
        affiliation: 'test_affiliation',
        description: 'Test add to cart event',
        searchQuery: 'test keyword',
        customData: {
          "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
          "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
        },
        contentMetadata: [
          {
            "$content_schema": "COMMERCE_PRODUCT",
            "$og_title": "Nike Shoe",
            "$og_description": "Start loving your steps",
            "$og_image_url": "http://example.com/img1.jpg",
            "$canonical_identifier": "nike/1234",
            "$publicly_indexable": false,
            "$price": 101.2,  
            "$locally_indexable": true,
            "$sku": "1101123445",
            "$product_name": "Runner",
            "$product_brand": "Nike",
            "$product_category": "Sporting Goods",
            "$product_variant": "XL",
            "$creation_timestamp": 1499892854966
          },
          {
            "$content_schema": "COMMERCE_PRODUCT",
            "$og_title": "Adidas Shoe",
            "$og_description": "Start loving your steps",
            "$og_image_url": "http://example.com/img1.jpg",
            "$canonical_identifier": "adidas/1234",
            "$publicly_indexable": false,
            "$price": 90.2,
            "$locally_indexable": true,
            "$sku": "1101123445",
            "$product_name": "Runner",
            "$product_brand": "Adidas",
            "$product_category": "Sporting Goods",
            "$product_variant": "XL",
            "$creation_timestamp": 1499892854967
          }
        ],
      };

  Branch.sendBranchEvent(event, properties);
}).catch(function error(err) {
  alert("Get Standard Event " + err);
});
```

## Troubleshoot Issues

## Testing: Key Points

- Need to select `"app uses IDFA or GAID"` when publishing your app
- Best to enable [Deepviews](https://dashboard.branch.io/settings/deepviews) ([Testing: Supported Platforms](cordova-phonegap-ionic.md#testing-supported-platforms))
- Mobile browser capability: `Android 4.4.4+`, `Safari 8+`, `Chrome 32+`, `Firefox 29+`

## Testing: Optional App Config

- Additional configuration for custom link domains, simulating installs, unique bundle identifiers, etc

```
<!-- sample config.xml -->
    <widget id="com.eneff.branch.cordovatestbed" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
      <!-- Branch -->
      <plugin name="branch-cordova-sdk" spec="^4.0.0" /> <!-- optional spec -->
      <branch-config>
        <branch-key value="key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3" />
        <uri-scheme value="branchcordova" />
        <link-domain value="yourcustomdomain.com" />
        <link-domain value="cordova.app.link" />  <!-- optional previous link domain -->
        <link-domain value="bnc.lt" />  <!-- optional previous link domain -->
        <ios-team-release value="PW4Q8885U7" /> <!-- required if iOS app -->
        <ios-team-debug value="FG35JLLMXX" /> <!-- optional -->
        <android-prefix value="/WSuf" /> <!-- optional (for bnc.lt) -->
        <android-testmode value="true" /> <!-- optional (simulate installs) -->
      </branch-config>
      
      
 <widget ios-CFBundleIdentifier="com.eneff.branch.cordovatestbedios" android-packageName="com.eneff.branch.cordovatestbedandroid" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

## Testing: Branch Analytics

- Whenever a user `clicks` on a deep link and opens the app, and will trigger either an `install` or an `open`
- `installs` represent Branch recognizing the app\_id and device\_id for the first time
- `installs` represent new app users and the success rate of your Branch deep links
- `installs` do **not** represent App Store downloads
- `non-Branch installs` are installs outside of Branch deep link clicks
- `opens` are non-installs
- If a user uninstalls and reinstalls the app, this will be an `open` because Branch recognizes the device
- If a user has the app and clicks a Branch deep link, this will be an `open` because the user is not new

## Testing: Simulating an Install

- Delete your app
- *[iOS]* iPhone Device -> **Settings** -> **Privacy** -> **Advertising** -> **Reset Advertising Identifier** -> **Reset Identifier**
- *[Android]* Add to your `config.xml` ([Testing: Optional App Config](cordova-phonegap-ionic.md#testing-optional-app-config))
- Add `Branch.setDebug(true);` before `Branch.initSession();` ([Initialize Branch Features](cordova-phonegap-ionic.md#initialize-branch-features))
- Click on a deep link to navigate to your `$fallback_url` because your app is not installed
- Install your app
- Open your app
- Read from `Branch.initSession().then(data)` for `+is_first_session = true`

## Testing: Supported Platforms

- Apps which support Branch deep links

| App | iOS | Details | Android | Details |
| --- | --- | --- | --- | --- |
| Facebook NewsFeed | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ |  |
| Facebook Messenger | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ |  |
| Twitter | ✅ |  | ✅ |  |
| Pinterest | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ |  |
| Slack | ✅ |  | ✅ |  |
| Chrome address bar | 🅾 |  | 🅾 |  |
| Chrome web page | ✅ |  | ✅ |  |
| FireFox address bar | 🅾 |  | 🅾 |  |
| FireFox web page | ✅ |  | ✅ |  |
| Safari address bar | 🅾 |  |  |  |
| Safari web page | ✅ |  |  |  |
| WeChat | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ |  |
| WhatsApp | ✅ | `app.link` requires https/http to be clickable | ✅ | `app.link requires` https/http to be clickable |
| Hangouts | ✅ |  | ✅ |  |
| iMessage | ✅ |  |  |  |
| Apple Mail | ✅ |  |  |  |
| Gmail | ✅ |  | ✅ |  |

## Link Data: Universal Object properties

- For [Create content reference](cordova-phonegap-ionic.md#section-create-content-reference)

| Key | Default | Usage | Link Property |
| --- | --- | --- | --- |
| `canonicalIdentifier` |  | **(Required)** This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | `$canonical_identifier` |
| `canonicalUrl` |  | The canonical URL, used for SEO purposes | `$canonical_url` |
| `title` |  | The name for the piece of content | `$og_title` |
| `contentDescription` |  | A description for the content | `$og_description` |
| `contentImageUrl` |  | The image URL for the content. Must be an absolute path | `$og_image_url` |
| `price` |  | The price of the item | `$amount` |
| `currency` |  | The currency representing the price in ISO 4217 currency code | `$currency` |
| `contentIndexingMode` | `"public"` | Can be set to either `"public"` or `"private"`. Public indicates that you’d like this content to be discovered by other apps. | `$publicly_indexable` |
| `contentMetadata` |  | Any custom key-value data e.g. `{ "custom": "data" }` |  |

## Link Data: Deep Link Properties

- For [Create Deep Link](cordova-phonegap-ionic.md#create-deep-link) and [Share Deep Link](cordova-phonegap-ionic.md#share-deep-link)
- Analytics

| Key | Default | Usage |
| --- | --- | --- |
| channel |  | Use channel to tag the route that your link reaches users. For example, tag links with `"Facebook"` or `"LinkedIn"` to help track clicks and installs through those paths separately |
| feature |  | This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature ‘referral’ |
| campaign |  | Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that |
| stage |  | Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter |
| tags |  | This is a free form entry with unlimited values `["string"]`. Use it to organize your link data with labels that don’t fit within the bounds of the above |
| alias |  | Specify a link alias in place of the standard encoded short URL e.g. `yourdomain.com/youralias`. Link aliases are unique, immutable objects that cannot be deleted. You cannot change the alias of existing links. Aliases on the legacy `bnc.lt` domain are incompatible with Universal Links and Spotlight |
| type | `0` | Set to `1` to limit deep linking behavior of the generated link to a single use. Set type to `2` to make the link show up under [Marketing Dashboard](https://dashboard.branch.io/marketing) while adding `$marketing_title` to `data`. Must be an `int`. Does not work with the Cordova SDK (limitation of native SDKs |

- Properties

  - Custom Data

| Key | Value | Usage |
| --- | --- | --- |
| random | `123` | Any key-value pair |
| hello | `"world"` | Any key-value pair |
| custom\_data | `true` | Any key-value pair |

- Redirection

| Key | Default | Usage |
| --- | --- | --- |
| $fallback\_url |  | Change the redirect endpoint for all platforms - so you don’t have to enable it by platform. Note that Branch will forward all robots to this URL, which **overrides any OG tags** entered in the link. System-wide Default URL (set in Link Settings) |
| $desktop\_url |  | Change the redirect endpoint on desktops Text-Me-The-App page (set in Link Settings) |
| $ios\_url |  | Change the redirect endpoint for iOS App Store page for your app (set in Link Settings) |
| $ipad\_url |  | Change the redirect endpoint for iPads `$ios_url` value |
| $android\_url |  | Change the redirect endpoint for Android Play Store page for your app (set in Link Settings) |
| $windows\_phone\_url |  | Change the redirect endpoint for Windows OS Windows Phone default URL (set in Link Settings) |
| $blackberry\_url |  | Change the redirect endpoint for Blackberry OS BlackBerry default URL (set in Link Settings) |
| $fire\_url |  | Change the redirect endpoint for Amazon Fire OS Fire default URL (set in Link Settings) |
| $ios\_wechat\_url |  | Change the redirect endpoint for WeChat on iOS devices `$ios_url value` |
| $android\_wechat\_url |  | Change the redirect endpoint for WeChat on Android devices `$android_url` value |
| $after\_click\_url |  | URL redirect to after the main click redirect has completed |
| $web\_only | `false` | Force to open the `$fallback_url` instead of the app |

```
- Deep Link
```

| Key | Default | Usage |
| --- | --- | --- |
| $deeplink\_path | `open?link_click_id=1234` | Set the deep link path for all platforms - so you don’t have to enable it by platform. When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within |
| $android\_deeplink\_path |  | Set the deep link path for Android apps When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within |
| $ios\_deeplink\_path |  | Set the deep link path for iOS apps. When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within |
| $match\_duration | `7200` | Lets you control the probabilistic modeling timeout (the time that a click will wait for an app open) also known as attribution window. Specified in seconds |
| $always\_deeplink | `true` | Set to `false` to make links always fall back to your mobile site. Does not apply to Universal Links or Android App Links. |
| $ios\_redirect\_timeout | `750` | Control the timeout that the client-side JS waits after trying to open up the app before redirecting to the App Store. Specified in milliseconds |
| $android\_redirect\_timeout | `750` | Control the timeout that the clientside JS waits after trying to open up the app before redirecting to the Play Store. Specified in milliseconds |
| $one\_time\_use | `false` | Set to `true` to limit deep linking behavior of the generated link to a single use. Can also be set using type |
| $custom\_sms\_text |  | Text for SMS link sent for desktop clicks to this link. Must contain &#123;&#123; link &#125;&#125; Value of Text me the app page in Settings |
| $marketing\_title |  | The Marketing Title for the deep link in the [Marketing Dashboard](https://dashboard.branch.io/marketing) |

```
- Content
```

| Key | Default | Usage |
| --- | --- | --- |
| $publicly\_indexable | `1` | Cannot modify here. Needs to be set by the Branch Universal Object |
| $keywords |  | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you’d like to use |
| $canonical\_identifier |  | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities |
| $exp\_date | `0` | Cannot modify here. Needs to be set by the Branch Universal Object. Must be epoch timestamp with milliseconds |
| $content\_type |  | This is a label for the type of content present. Apple recommends that you use uniform type identifier as described here |

```
- DeepView
```

| Key | Default | Usage |
| --- | --- | --- |
| $ios\_deepview | `default_template` | The name of the deepview template to use for iOS |
| $android\_deepview | `default_template` | The name of the deepview template to use for Android |
| $desktop\_deepview | `default_template` | The name of the deepview template to use for the Desktop |

```
- Open Graph
```

| Key | Default | Usage |
| --- | --- | --- |
| $og\_title |  | Set the title of the link as it will be seen in social media displays |
| $og\_description |  | Set the description of the link as it will be seen in social media displays |
| $og\_image\_url |  | Set the image of the link as it will be seen in social media displays |
| $og\_image\_width |  | Set the image’s width in pixels for social media displays |
| $og\_image\_height |  | Set the image’s height in pixels for social media displays |
| $og\_video |  | Set a video as it will be seen in social media displays |
| $og\_url |  | Set the base URL of the link as it will be seen in social media displays |
| $og\_type |  | Set the type of custom card format link as it will be seen in social media displays |
| $og\_redirect |  | (Advanced, not recommended) Set a custom URL that we redirect the social media robots to in order to retrieve all the appropriate tags | |
| $og\_app\_id |  | (Rarely used) Sets the app id tag |

```
- Twitter
```

| Key | Default | Usage |
| --- | --- | --- |
| $twitter\_card |  | Set the Twitter card type of the link |
| $twitter\_title |  | Set the title of the Twitter card |
| $twitter\_description |  | Set the description of the Twitter card |
| $twitter\_image\_url |  | Set the image URL for the Twitter card |
| $twitter\_site |  | Set the site for Twitter |
| $twitter\_app\_country |  | Set the app country for the app card |
| $twitter\_player |  | Set the video player’s URL. Defaults to the value of `$og_video`. |
| $twitter\_player\_width |  | Set the player’s width in pixels |
| $twitter\_player\_height |  | Set the player’s height in pixels |

## Link Data: Commerce properties

- For [Track commerce](cordova-phonegap-ionic.md#track-commerce)
- Categories

| Value | Category | Value | Category |
| --- | --- | --- | --- |
| `0` | Animals & Pet Supplies | `11` | Home & Garden |
| `1` | Apparel & Accessories | `12` | Luggage & Bags |
| `2` | Arts & Entertainment | `13` | Mature |
| `3` | Baby & Toddler | `14` | Media |
| `4` | Business & Industrial | `15` | Office Supplies |
| `5` | Camera & Optics | `16` | Religious & Ceremonial |
| `6` | Electronics | `17` | Software |
| `7` | Food, Beverage & Tobacco | `18` | Sporting Goods |
| `8` | Furniture | `19` | Toys & Games |
| `9` | Hardware | `20` | Vehicles & Parts |
| `10` | Health & Beauty |  |  |

- Currencies

| Value | Currency | Value | Currency | Value | Currency |
| --- | --- | --- | --- | --- | --- |
| `0` | `AED` | `60` | `HKD` | `120` | `RSD` |
| `1` | `AFN` | `61` | `HNL` | `121` | `RUB` |
| `2` | `ALL` | `62` | `HRK` | `122` | `RWF` |
| `3` | `AMD` | `63` | `HTG` | `123` | `SAR` |
| `4` | `ANG` | `64` | `HUF` | `124` | `SBD` |
| `5` | `AOA` | `65` | `IDR` | `125` | `SCR` |
| `6` | `ARS` | `66` | `ILS` | `126` | `SDG` |
| `7` | `AUD` | `67` | `INR` | `127` | `SEK` |
| `8` | `AWG` | `68` | `IQD` | `128` | `SGD` |
| `9` | `AZN` | `69` | `IRR` | `129` | `SHP` |
| `10` | `BAM` | `70` | `ISK` | `130` | `SLL` |
| `11` | `BBD` | `71` | `JMD` | `131` | `SOS` |
| `12` | `BDT` | `72` | `JOD` | `132` | `SRD` |
| `13` | `BGN` | `73` | `JPY` | `133` | `SSP` |
| `14` | `BHD` | `74` | `KES` | `134` | `STD` |
| `15` | `BIF` | `75` | `KGS` | `135` | `SYP` |
| `16` | `BMD` | `76` | `KHR` | `136` | `SZL` |
| `17` | `BND` | `77` | `KMF` | `137` | `THB` |
| `18` | `BOB` | `78` | `KPW` | `138` | `TJS` |
| `19` | `BOV` | `79` | `KRW` | `139` | `TMT` |
| `20` | `BRL` | `80` | `KWD` | `140` | `TND` |
| `21` | `BSD` | `81` | `KYD` | `141` | `TOP` |
| `22` | `BTN` | `82` | `KZT` | `142` | `TRY` |
| `23` | `BWP` | `83` | `LAK` | `143` | `TTD` |
| `24` | `BYN` | `84` | `LBP` | `144` | `TWD` |
| `25` | `BYR` | `85` | `LKR` | `145` | `TZS` |
| `26` | `BZD` | `86` | `LRD` | `146` | `UAH` |
| `27` | `CAD` | `87` | `LSL` | `147` | `UGX` |
| `28` | `CDF` | `88` | `LYD` | `148` | `USD` |
| `29` | `CHE` | `89` | `MAD` | `149` | `USN` |
| `30` | `CHF` | `90` | `MDL` | `150` | `UYI` |
| `31` | `CHW` | `91` | `MGA` | `151` | `UYU` |
| `32` | `CLF` | `92` | `MKD` | `152` | `UZS` |
| `33` | `CLP` | `93` | `MMK` | `153` | `VEF` |
| `34` | `CNY` | `94` | `MNT` | `154` | `VND` |
| `35` | `COP` | `95` | `MOP` | `155` | `VUV` |
| `36` | `COU` | `96` | `MRO` | `156` | `WST` |
| `37` | `CRC` | `97` | `MUR` | `157` | `XAF` |
| `38` | `CUC` | `98` | `MVR` | `158` | `XAG` |
| `39` | `CUP` | `99` | `MWK` | `159` | `XAU` |
| `40` | `CVE` | `100` | `MXN` | `160` | `XBA` |
| `41` | `CZK` | `101` | `MXV` | `161` | `XBB` |
| `42` | `DJF` | `102` | `MYR` | `162` | `XBC` |
| `43` | `DKK` | `103` | `MZN` | `163` | `XBD` |
| `44` | `DOP` | `104` | `NAD` | `164` | `XCD` |
| `45` | `DZD` | `105` | `NGN` | `165` | `XDR` |
| `46` | `EGP` | `106` | `NIO` | `166` | `XFU` |
| `47` | `ERN` | `107` | `NOK` | `167` | `XOF` |
| `48` | `ETB` | `108` | `NPR` | `168` | `XPD` |
| `49` | `EUR` | `109` | `NZD` | `169` | `XPF` |
| `50` | `FJD` | `110` | `OMR` | `170` | `XPT` |
| `51` | `FKP` | `111` | `PAB` | `171` | `XSU` |
| `52` | `GBP` | `112` | `PEN` | `172` | `XTS` |
| `53` | `GEL` | `113` | `PGK` | `173` | `XUA` |
| `54` | `GHS` | `114` | `PHP` | `174` | `XXX` |
| `55` | `GIP` | `115` | `PKR` | `175` | `YER` |
| `56` | `GMD` | `116` | `PLN` | `176` | `ZAR` |
| `57` | `GNF` | `117` | `PYG` | `177` | `ZMW` |
| `58` | `GTQ` | `118` | `QAR` |  |  |
| `59` | `GYD` | `119` | `RON` |  |  |

## Link data: Mixpanel Integration

- Sync with Mixpanel if plugin is installed

```
Branch.setRequestMetadata("$mixpanel_distinct_id", "123");
```

## Compiling: Cordova dependencies

- Node

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
brew update;
brew install node;
```

- Xcode

  - Install [Xcode](https://developer.apple.com/download/)
  - Open Xcode -> agree to SDK license agreement
  - Open Xcode -> Create new Xcode project -> Run simulator -> Agree to developer mode on mac
- Android Studio

  - Read [instructions](https://developer.android.com/studio/install.html)
  - Install [JVM](https://www.oracle.com/java/technologies/downloads/#java8)
  - Install [Android Studio](https://developer.android.com/studio/index.html)
  - Open Android Studio -> **configure** -> **appearance/system settings/android sdk** -> **android 6.0** -> **Okay**
  - Open Android Studio -> **New project** -> ... -> **Run** -> **Create new emulator** -> **Nexus 6p 23** -> **Finish**

```
# add to ~/.bash_profile
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH

source ~/.bash_profile;

android update sdk;
```

- Install Android SDK build-tools 24.0.1
- Generate Android Keystore

```
keytool -genkeypair -dname "cn=Full Name, ou=Business Unit, o=Company, c=US" -alias release -keypass aaa111 -keystore release.keystore -storepass aaa111 -validity 10000
keytool -list -v -keystore release.keystore
```

- Genymotion *[optional]*

  - Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
  - Install [Genymotion](https://www.genymotion.com/download/)
  - Genymotion -> **Add virtual device** -> **Google Nexus 6P** - **6.0.0** - **API 23** -> **Next**

## Compiling: Display console logs

- iOS Simulator

  - `cordova run ios;`
  - Safari -> **Preferences** -> **Advance** -> **Show Develop menu in menu bar**
  - Safari -> **Develop** -> **Simulator** -> **index.html** -> **Console**
  - *May need to unplug and replug device*
  - *May need to open Xcode and update provisioning profile*
- iOS Xcode

  - `cordova plugin add cordova-plugin-console;`
  - `cordova build ios;`
  - Xcode -> `APP_LOCATION/platforms/ios/APP_NAME.Xcodeproj`
  - Xcode -> **App** -> **General** -> **Signing** -> **Team**
  - Xcode -> **Product** -> **Run**
  - Xcode -> **View** -> **Debug Area** -> **Activate Console**
- Android Device

  - Plug device in
  - `cordova run android;`
  - Chrome -> `[chrome://inspect/#devices](chrome://inspect/#devices)` -> **Console**
- Android Genymotion

  - Genymotion ->**Start**
  - `cordova run android;`
  - Chrome -> `[chrome://inspect/#devices](chrome://inspect/#devices)` -> **Console**

## Compiling: Update the Branch SDK

- To get the latest improvements and capabilities

```
# terminal
cordova plugin remove io.branch.sdk
cordova plugin remove branch-cordova-sdk
```

```
<!-- config.xml -->
<plugin name="branch-cordova-sdk" spec="^4.0.0" />
```

- [Test Deep Link iOS](developers-hub/docs/cordova-phonegap-ionic#test-deep-link-ios)
- [Test Deep Link Android](developers-hub/docs/cordova-phonegap-ionic#test-deep-link-android)

## Compiling: Incompatibilities

- The following plugins will not work with the Branch SDK

  - [Custom URL scheme](https://github.com/EddyVerbruggen/Custom-URL-scheme)
  - [Cordova Universal Links Plugin](https://github.com/nordnet/cordova-universal-links-plugin)
  - [Ionic Deeplinks Plugin](https://github.com/driftyco/ionic-plugin-deeplinks)
- PhoneGap Build is also not supported by the Branch SDK because we need plugin hooks to enable Entitlements, Universal Links, App Links, and URI Scheme redirects but PhoneGap Build does not allow plugin hooks.
- With both the 'branch-cordova-sdk' plugin and the 'cordova-plugin-siri-shortcuts' plugin installed, deep-linking breaks. This seems to most often happen when the siri shortcuts plugin is installed after the branch plugin.

  - **Solution**

    - Using a modified version of the `AppDelegate+SiriShortcuts` Category to include Branch. This version only works if both Branch and SiriShortcuts is present.
    - From within the Xcode workspace, locate `AppDelegate+BranchSDK.m`. Either remove it or ignore it.
    - From within the Xcode workspace, locate `AppDelegate+SiriShortcuts.m`. This is the file we want to modify.
    - Update `AppDelegate+SiriShortcuts.m` to call Branch SDK. This version should work when dropped in with the current release of both SDKs.

```
#import "AppDelegate+SiriShortcuts.h"
    #import <objectivec/runtime.h>

    #import "BranchNPM.h"

    #ifdef BRANCH_NPM
    #import "Branch.h"
    #else
    #import <Branch/Branch.h>
    #endif

    static void * UserActivityPropertyKey = &UserActivityPropertyKey;

    @implementation AppDelegate (siriShortcuts)

    - (NSUserActivity *)userActivity {
        return objectivec_getAssociatedObject(self, UserActivityPropertyKey);
    }

    - (void)setUserActivity:(NSUserActivity *)activity {
        objectivec_setAssociatedObject(self, UserActivityPropertyKey, activity, objectivec_ASSOCIATION_RETAIN_NONATOMIC);
    }

    - (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler {

        // SiriShortcuts code
        NSString *bundleIdentifier = [[NSBundle mainBundle] bundleIdentifier];
        if ([userActivity.activityType isEqualToString:[NSString stringWithFormat:@"%@.shortcut", bundleIdentifier]]) {
            self.userActivity = userActivity;
        }

        // Respond to Universal Links
        if (![[Branch getInstance] continueUserActivity:userActivity]) {
            // send unhandled URL to notification
            if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
                [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:[userActivity.webpageURL absoluteString]]];
            }
        }

        return YES;
    }

    // Respond to URI scheme links
    - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
        // pass the url to the handle deep link call
        if (![[Branch getInstance] application:app openURL:url options:options]) {
            // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
            [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
            // send unhandled URL to notification
            [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:[url absoluteString]]];
        }
        return YES;
    }

    // Respond to Push Notifications
    - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
        @try {
            [[Branch getInstance] handlePushNotification:userInfo];
        }
        @catch (NSException *exception) {
            [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:userInfo]];
        }
    }

    @end
```

## Compiling: Cordova errors

### Migrate from SDK 2.5+ to 3.0+

```
// Branch initialization
- Branch.initSession(function(data) {
+ Branch.initSession().then(function(data) {
if (data["+clicked_branch_link"]) {
// read deep link data on click
alert("Deep Link Data: " + JSON.stringify(data));
}
});
```

### Device only

- Error  
  `ORIGINAL EXCEPTION: Branch is not defined`  
  `ReferenceError: Branch is not defined`
- Solution

  - Branch opens and installs your app, so you cannot simulate Branch in the desktop browser or simulator

```
// Ionic 2/3 - running on browser instead of device
if (!platform.is('cordova')) { return }
Branch.userCompletedAction('did_this')

// Ionic 2/3 - missing Branch import
const Branch = window['Branch'];
```

### Provisioning Profile missing

- Error

`** ARCHIVE FAILED **`

```
The following build commands failed:
Check dependencies
    (1 failure)
    Error: Error code 65 for command: xcodebuild with args: -xcconfig,cordova/build-debug.xcconfig,-workspace,Branch Testing.xcworkspace,-scheme,Branch Testing,-configuration,Debug,-destination,generic/platform=iOS,-archivePath,Branch Testing.xcarchive,archive,CONFIGURATION_BUILD_DIR=build/device,SHARED_PRECOMPS_DIR=build/sharedpch
```

```
No profiles for 'com.eneff.branch.cordova_testbed' were found
```

- Solution

  - Fix by opening your app in `Xcode` and launch from there (to select a `Provisioning Profile`)

### Invalid bundle id

- Error

```
An invalid value 'XC com eneff branch cordova_testbed' was provided for the parameter 'appIdName'.

Error: Error code 1 for command: /gradlew with args: cdvBuildDebug,-b,/build.gradle,-Dorg.gradle.daemon=true,-Pandroid.useDeprecatedNdk=true
```

- Solution

  - Don't use `cordova`, `hyphens` (Android), or `underscores` (iOS) in your bundle id (widget id)

### File not found

- Error

```
Branch.h not found
```

- Solution

  - If that is the ONLY error you see, this can be fixed by upgrading dependencies. Ensure you are using version 4.0.1 of this plugin or higher and have updated your Xcode, Cordova, and other dependencies (listed below) to the latest versions. This error arose due to an inability in CocoaPods and cordova-ios to resolve dependencies that was later fixed.
  - Sometimes this error occurs when a build error occurs in the Pod project; since Branch is usually the first pod alphabetically, it'll show up as the error when attempting to build the main project (since the Pod didn't get built), even though the real error is elsewhere. Make sure to read your build log to find the original error that prevented building the Pod project.

### Build fails with Pods

- iOS build fails with Pods and CONFIGURATION\_BUILD\_DIR configured
- Command-line builds result in the above error. Please see the section below [Compiling: Capacitor](cordova-phonegap-ionic.md#compiling-capacitor) for the full list of up-to-date dependencies needed for CLI builds to work.

## Compiling: Cordova 8

- **Version 4.1.x of this plugin works with Cordova 8, but you need to add some fields to your config.xml file:**
- Cordova 8 does not correctly support CocoaPods, which the 4.x releases of this plugin utilize
- This plugin can't include both versions of the pod spec, which changed between Cordova 8 and Cordova 9. We have chosen to include the Cordova 9 version.
- In order to support Cordova 8's handling of CocoaPods, you must install an extra Cordova plugin to correctly incorporate our CocoaPod ("Branch" v.0.31.3 as of 2020.02.10)
- Install the plugin [cordova-plugin-cocoapods-support](https://github.com/blakgeek/cordova-plugin-cocoapods-support)
- That plugin does not add any code to your app, it is strictly a Cordova hook to create your Podfile before building your app.
- Add the following lines to the `widget/platform[name="ios"]` path in config.xml:

```
<preference name="pods_ios_min_version" value="<YOUR MINIMUM VALUE>" />
<pod name="Branch" spec="~> 0.31.3" />
```

- Replace with the minimum iOS version your app requires, e.g. "8" or "10.0" or "11.4"
- Run `cordova prepare ios` again and ensure you see console output similar to

```
Searching for new pods
Checking config.xml for pods.
config.xml requires pod: Branch
Installing pods
Sit back and relax this could take a while.
```

- Provided that the dependencies listed in the next section are up to date (see [Compiling: Capacitor](cordova-phonegap-ionic.md#compiling-capacitor)), you should also be able to do `cordova build ios` without issue.

## Compiling: Capacitor

- **Version 4.1.0 of this plugin works with Ionic 4 + Cordova and Ionic 4 + Capacitor, with the following caveats:**
- We strongly recommend Node >= 10.15. Node 8 might work, but it is not tested.
- For BOTH Cordova and Capacitor, you must use Xcode >= 11.1, CocoaPods >= 1.8.4, Cordova >= 8.0.0, Ionic-CLI >= 5.1, cordova-ios >= 5.1.0

  - Every single one of these dependencies has fixes that allow the command line build, and the pod dependency resolution to work correctly
- You MUST use @capacitor/ios >= 1.4.0. Versions prior to that version did not federate the OpenURL notifications to other plugins, including Branch.
- `use_frameworks` has been removed from this plugin and will now be statically built. If the another podfile uses `use_frameworks` that is fine but this plugin no longer flags itself as dynamic. Ideally your app should be updated to remove `use_frameworks!` from your Podfile.
- When using Capacitor, you must add the following entries yourself to `ios/App/App/Info.plist`:

```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.getcapacitor.capacitor</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>capacitor</string>
    </array>
  </dict>
  <dict>
    <key>CFBundleURLName</key>
    <string>branch-cordova-sdk</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>[YOUR URL SCHEME HERE]</string>
    </array>
  </dict>
</array>
<key>branch_key</key>
<string>[YOUR BRANCH LIVE KEY]</string>
<key>branch_app_domain</key>
<string>[YOUR DOMAIN].app.link</string>
```

- This is a limitation of Capacitor where explicit config changes are the developer's responsibility in order to avoid "magic config"
- When using Capacitor, you must add your Associated Domains entitlements via the Xcode entitlement editor yourself

  - This MUST be done using Xcode - again this is part of Capacitor's core philosophy whereby you are in control of every config file change
  - Open the "Signing & Entitlements" tab in Xcode, add the Associated Domains entitlement, and add the urls found on your Branch dashboard.

## AppStore: iOS

- **App rejected because it uses push notification features but does not declare the aps-environment key**
- When branch-cordova-sdk moved to use CocoaPods, a change was introduced in Cordova 9 where the separate entitlement files were no longer flattened together. This issue has been fixed in version 4.1.0 of this plugin by directly adding the Branch config to your existing entitlements rather than creating new entitlement files. This change is backward-compatible with Cordova 8.

## Apple Ads: iOS

- Follow the [native iOS documentation](apple-search-ads.md) for setting up Apple Ads
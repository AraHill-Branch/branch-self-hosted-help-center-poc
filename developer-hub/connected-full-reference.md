---
title: "Connected Full Reference"
slug: connected-full-reference
---

### Using the Sample Connected App

We provide a sample app which demonstrates what Branch Metrics Connected SDK can do. The online version can be found at <https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/connected-example(1).html>. Alternatively, you can open `connected-example.html` locally to for the same effect.

To modify this local app, edit `src/web/example.template.html` first, and then run `make`, which will automatically update `connected-example.html`. Refrain from manually editing `connected-example.html`.

### Minimum Requirements

- The Branch Connected SDK requires native browser Javascript and has only been tested in Tizen and WebOS with sessionStorage capability. No 3rd party libraries are needed to make use of the SDK as is it 100% native Javascript.

| Tizen | WebOS |
| --- | --- |
| 2.3 | 6.0 |

### Initialization

Add the following script within your `<head>` tags:

*Be sure to replace* `BRANCH KEY` *with your actual Branch Key found in your* [*account dashboard*](https://dashboard.branch.io/account-settings/profile)*.*

```
<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script>
        // load Branch
        (function (b, r, a, n, c, h, _, s, d, k) {
            if (!b[n] || !b[n]._q) {
                for (; s < _.length;) c(h, _[s++]);
                d = r.createElement(a);
                d.async = 1;
                d.src = "https://cdn.branch.io/branch-connected.min.js";
                k = r.getElementsByTagName(a)[0];
                k.parentNode.insertBefore(d, k);
                b[n] = h
            }
        })(window, document, "script", "branch", function (b, r) {
                b[r] = function () {
                    b._q.push([r, arguments])
                }
            }, {
                _q: [],
                _v: 1
            },
            "data first init link logout setIdentity track logEvent disableTracking qrCode"
            .split(" "), 0);
        // Pass the device's advertising id through 'options' with the corresponding key (/developers-hub/docs/connected-basic-integration)
        const options = {
            advertising_ids: {
                SAMSUNG_IFA: 'xxxxx',
            }
        };
        // init Branch 
        branch.init('key_live_YOUR_KEY_GOES_HERE', options);
    </script>
</head>
<body></body>
</html>
```

- Change `key_live_YOUR_KEY_GOES_HERE` to match your [Branch Dashboard](https://dashboard.branch.io/account-settings/app)

### NPM

```
npm install branch-connected-sdk
```

```
import branch from 'branch-connected-sdk'

// Pass the device's advertising id through 'options' with the corresponding key (/developers-hub/docs/connected-basic-integration)
const options = {
    advertising_ids: {
        SAMSUNG_IFA: 'xxxxx',
    }
};
// init Branch 
branch.init('key_live_YOUR_KEY_GOES_HERE', options);
```

- Change `key_live_YOUR_KEY_GOES_HERE` to match your [Branch Dashboard](https://dashboard.branch.io/account-settings/app)
- If you'd like to use a specific version of the SDK, point to `npm install branch-connected-sdk@x.xx.x` or update your `package.json` and rerun `npm install`

### API Reference

### init(branch\_key, options, callback)

**Parameters**

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| **branch\_key** | `string` | Your Branch [live key](http://dashboard.branch.io/settings), or (deprecated) your app id. | Y |
| **options** | `Object` | { } See options table below. | N |
| **callback** | `function` | Callback to read the session data. | N |

Adding the Branch script to your page automatically creates a window.branch object with all the external methods described below.

- All calls made to Branch methods are stored in a queue, so even if the SDK is not fully instantiated, calls made to it will be queued in the order they were originally called.
- If the session was opened from a referring link, `data()` will also return the referring link click as `referring_link`, which gives you the ability to continue the click flow.
- The init function on the Branch object initiates the Branch session and creates a new user session, if it doesn't already exist, in`sessionStorage`.

::: info Useful Tip
The init function returns a data object where you can read  
the link the user was referred by.
:::

Properties available in the options object:

| Key | Value | Type | Required |
| --- | --- | --- | --- |
| advertising\_ids | The current devices advertising id declared by the brand's corresponding key. Please refer to [Connected Basic Integration](connected-basic-integration.md#advertising-id-index) for more the key index. | `{string:string}` | **Y** for Ad Network Attribution **N** for Web Based Attribution |
| branch\_match\_id | The current user's browser-fingerprint-id. The value of this parameter should be the same as the value of ?*branch\_match\_id (automatically appended by Branch after a link click). \_Only necessary if ?\_branch\_match\_id is lost due to multiple redirects in your flow*. | `string` | N |
| retries | default: 2 | `number` | N |
| retry\_delay | expressed in milliseconds default: 200ms | `number` | N |
| timeout | expressed in milliseconds default:5000ms | `number` | N |
| tracking\_disabled | default: false | `boolean` | N |
| enableLogging | default: false | `boolean | N |

#### Usage

```
branch.init(
    branch_key,
    options,
    callback (err, data),
);
```

#### Callback Format

```
callback(
     "Error message",
     {
          data_parsed:        { },                          // If the user was referred from a link, and the link has associated data, the data is passed in here.
          referring_identity: '12345',                      // If the user was referred from a link, and the link was created by a user with an identity, that identity is here.
          has_app:            true,                         // Does the user have the app installed already?
          identity:           'BranchUser',                 // Unique string that identifies the user
          ~referring_link:     'https://bnc.lt/c/jgg75-Gjd3' // The referring link click, if available.
     }
);
```

::: info Note
`Branch.init` must be called prior to calling any other Branch functions.
:::

### data(callback)

**Parameters**

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| **callback** | `function` | Callback to read the session data. | N |

Returns the same session information and any referring data, as`Branch.init`, but does not require the `app_id`.

- This is meant to be called after `Branch.init` has been called if you need the session information at a later point.
- If the Branch session has already been initialized, the callback will return immediately, otherwise, it will return once Branch has been initialized.

### first(callback)

**Parameters**

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| **callback** | `function` | Callback to read the session data. | N |

Returns the same session information and any referring data, as`Branch.init` did when the app was first installed.

- This is meant to be called after `Branch.init` has been called if you need the first session information at a later point.
- If the Branch session has already been initialized, the callback will return immediately, otherwise, it will return once Branch has been initialized.

### setIdentity(identity, callback)

::: warning Sending PII
Be sure to not send any PII through this method. For additional details, please view our guide on [Best Practices to Avoid Sending PII to Branch](best-practices-to-avoid-sending-pii-to-branch.md)
:::

**Parameters**

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| **identity** | `string` | A string uniquely identifying the user - often a user ID. | Y |
| **callback** | `function` | Callback that returns the user's Branch identity id and unique link. | N |

#### Usage

```
branch.setIdentity(
    identity,
    callback (err, data)
);
```

#### Callback Format

```
callback(
     "Error message",
     {
          randomized_bundle_token:             '12345', // Server-generated ID of the user identity, stored in `sessionStorage`.
          link:                    'url',   // New link to use (replaces old stored link), stored in `sessionStorage`.
          referring_data_parsed:    { },      // Returns the initial referring data for this identity, if exists, as a parsed object.
          referring_identity:      '12345'  // Returns the initial referring identity for this identity, if exists.
     }
);
```

### logout(callback)

**Parameters**

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| **callback** | `function` | Logs out the current session, replaces session IDs and identity IDs. | N |

#### Usage

```
branch.logout(
    callback (err)
);
```

#### Callback Format

```
callback(
     "Error message"
);
```

### getBrowserFingerprintId(callback)

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| **callback** | `function` | callback to read a user's browser-fingerprint-id |

Returns the current user's browser-fingerprint-id. If tracking is disabled then 'null' is returned.

#### Usage

```
branch.getBrowserFingerprintId(function(err, data) { console.log(data); });
```

#### Callback Format

```
callback(
     null,
     '79336952217731267', // browser-fingerprint-id, stored in `localStorage`.
);
```

### lastAttributedTouchData(attribution\_window, callback)

**Parameters**

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| **attribution\_window** | `number` | The number of days to look up attribution data for |  |
| **callback** | `function` | Callback to read last attributed touch data | N |

Returns last attributed touch data for current user. Last attributed touch data has the information associated with that user's last viewed impression or clicked link.

#### Usage

```
branch.lastAttributedTouchData(
    attribution_window,
    callback (err, data)
);
```

### logEvent(event, event\_data\_and\_custom\_data, content\_items, customer\_event\_alias, callback)

**Parameters**

| Parameter |  | Description | Required |
| --- | --- | --- | --- |
| **event** | `String` |  | Y |
| **event\_data\_and\_custom\_data** | `Object` |  | N |
| **content\_items** | `Array` |  | N |
| **customer\_event\_alias** | `String` |  | N |
| **callback** | `function` |  | N |

Register commerce events, content events, user lifecycle events and custom events via logEvent()

The guides below provide information about what keys can be sent when triggering these event types:

- [Logging Commerce Events](connected-full-reference.md#section-logging-commerce-events)
- [Logging Content Events](connected-full-reference.md#section-logging-content-events)
- [Logging User Lifecycle](connected-full-reference.md#section-logging-user-lifecycle-events)
- [Logging Custom Events](connected-full-reference.md#section-logging-custom-events)

#### Usage for Commerce, Content & User Lifecycle "Standard Events"

```
branch.logEvent(
    event,
    event_data_and_custom_data,
    content_items,
    customer_event_alias,
    callback (err)
);
```

#### Usage for "Custom Events"

```
branch.logEvent(
    event,
    custom_data,
    callback (err)
);
```

::: info Notes
- logEvent() sends user\_data automatically
- When firing Standard Events, send custom and event data as part of the same object
- Custom Events do not contain content items and event data
:::

#### Example -- How to log a Commerce Event

```
var event_and_custom_data = {
   "transaction_id": "tras_Id_1232343434",
   "currency": "USD",
   "revenue": 180.2,
   "shipping": 10.5,
   "tax": 13.5,
   "coupon": "promo-1234",
   "affiliation": "high_fi",
   "description": "Preferred purchase",
   "purchase_loc": "Palo Alto",
   "store_pickup": "unavailable"
};

var content_items = [
{
   "$content_schema": "COMMERCE_PRODUCT",
   "$og_title": "Nike Shoe",
   "$og_description": "Start loving your steps",
   "$og_image_url": "http://example.com/img1.jpg",
   "$canonical_identifier": "nike/1234",
   "$publicly_indexable": false,
   "$price": 101.2,
   "$locally_indexable": true,
   "$quantity": 1,
   "$sku": "1101123445",
   "$product_name": "Runner",
   "$product_brand": "Nike",
   "$product_category": "Sporting Goods",
   "$product_variant": "XL",
   "$rating_average": 4.2,
   "$rating_count": 5,
   "$rating_max": 2.2,
   "$creation_timestamp": 1499892855,
   "$exp_date": 1499892854,
   "$keywords": [ "sneakers", "shoes" ],
   "$address_street": "230 South LaSalle Street",
   "$address_city": "Chicago",
   "$address_region": "IL",
   "$address_country": "US",
   "$address_postal_code": "60604",
   "$latitude": 12.07,
   "$longitude": -97.5,
   "$image_captions": [ "my_img_caption1", "my_img_caption_2" ],
   "$condition": "NEW",
   "$custom_fields": {"foo1":"bar1","foo2":"bar2"}
},
{
   "$og_title": "Nike Woolen Sox",
   "$canonical_identifier": "nike/5324",
   "$og_description": "Fine combed woolen sox for those who love your foot",
   "$publicly_indexable": false,
   "$price": 80.2,
   "$locally_indexable": true,
   "$quantity": 5,
   "$sku": "110112467",
   "$product_name": "Woolen Sox",
   "$product_brand": "Nike",
   "$product_category": "Apparel & Accessories",
   "$product_variant": "Xl",
   "$rating_average": 3.3,
   "$rating_count": 5,
   "$rating_max": 2.8,
   "$creation_timestamp": 1499892855
}];

var customer_event_alias = "event alias";

branch.logEvent(
   "PURCHASE",
   event_and_custom_data,
   content_items,
   customer_event_alias,
   function(err) { console.log(err); }
);
```

### link(data, callback)

**Parameters**

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| **data** | `Object` | Link data and metadata. | Y |
| **callback** | `function` | Returns a string of the Branch deep linking URL. | Y |

::: info Note
You can customize the Facebook OG tags of each URL if you want to dynamically share content by  
using the following optional keys in the data dictionary. Please use this [Facebook tool](https://developers.facebook.com/tools/debug/) to debug your OG tags!
:::

| Key | Value |
| --- | --- |
| "$og\_title" | The title you'd like to appear for the link in social media |
| "$og\_description" | The description you'd like to appear for the link in social media |
| "$og\_image\_url" | The URL for the image you'd like to appear for the link in social media |
| "$og\_video" | The URL for the video |
| "$og\_url" | The URL you'd like to appear |
| "$og\_redirect" | If you want to bypass our OG tags and use your own, use this key with the URL that contains your site's metadata. |

Also, you can set custom redirection by inserting the following optional keys in the dictionary:

| Key | Value |
| --- | --- |
| "$desktop\_url" | Where to send the user on a desktop or laptop. By default it is the Branch-hosted text-me service |
| "$android\_url" | The replacement URL for the Play Store to send the user if they don't have the app. *Only necessary if you want a mobile web splash* |
| "$ios\_url" | The replacement URL for the App Store to send the user if they don't have the app. *Only necessary if you want a mobile web splash* |
| "$ipad\_url" | Same as above but for iPad Store |
| "$fire\_url" | Same as above but for Amazon Fire Store |
| "$blackberry\_url" | Same as above but for Blackberry Store |
| "$windows\_phone\_url" | Same as above but for Windows Store |
| "$after\_click\_url" | When a user returns to the browser after going to the app, take them to this URL. *iOS only; Android coming soon* |
| "$afterclick\_desktop\_url" | When a user on desktop returns to the desktop browser after going to the desktop app, take them to this URL. |

You have the ability to control the direct deep linking of each link as well:

| Key | Value |
| --- | --- |
| "$deeplink\_path" | The value of the deep link path that you'd like us to append to your URI. For example, you could specify "$deeplink\_path": "radio/station/456" and we'll open the app with the URI "yourapp://radio/station/456?link\_click\_id=branch-identifier". This is primarily for supporting legacy deep linking infrastructure. |
| "$always\_deeplink" | `true` or `false`. (default is not to deep link first) This key can be specified to have our linking service force try to open the app, even if we're not sure the user has the app installed. If the app is not installed, we fall back to the respective app store or $platform\_url key. By default, we only open the app if we've seen a user initiate a session in your app from a Branch Link (has been cookied and deep linked by Branch). |

#### Usage

```
branch.link(
    data,
    callback (err, link)
);
```

#### Example

```
branch.link({
    tags: [ 'tag1', 'tag2' ],
    channel: 'facebook',
    feature: 'dashboard',
    stage: 'new user',
    data: {
        mydata: 'something',
        foo: 'bar',
        '$desktop_url': 'http://myappwebsite.com',
        '$ios_url': 'http://myappwebsite.com/ios',
        '$ipad_url': 'http://myappwebsite.com/ipad',
        '$android_url': 'http://myappwebsite.com/android',
        '$og_app_id': '12345',
        '$og_title': 'My App',
        '$og_description': 'My app\'s description.',
        '$og_image_url': 'http://myappwebsite.com/image.png'
    }
}, function(err, link) {
    console.log(err, link);
});
```

#### Callback Format

```
callback(
    "Error message",
    'https://bnc.lt/l/3HZMytU-BW' // Branch deep linking URL
);
```

### disableTracking(disableTracking)

**Parameters**

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| **disableTracking** | `Boolean` | `true` disables tracking and `false` re-enables tracking. | N |

::: info Notes
- `disableTracking()` without a parameter is a shorthand for disableTracking(true).
- If a call to `disableTracking(false)` is made, the Connected SDK will re-initialize. Additionally, if tracking\_disabled: `true` is passed as an option to `init()`, it will be removed during the re-initialization process.
:::

#### Allows User to Remain Private

This will prevent any Branch requests from being sent across the network, except for the case of deep linking.  
If someone clicks a Branch Link, but has expressed not to be tracked, we will return deep linking data back to the  
client but without tracking information.

In do-not-track mode, you will still be able to create links and display Journeys however, they will not have identifiable information associated to them. You can change this behavior at any time, by calling the aforementioned function.

The do-not-track mode state is persistent: it is saved for the user across app sessions.
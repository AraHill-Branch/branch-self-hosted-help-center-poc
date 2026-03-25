---
title: "Web Full Reference"
slug: web-full-reference
---

## init

Initializing the SDK is an asynchronous method with a callback, so it may seem as though you would need to place any method calls that will execute immediately inside the `branch.init()` callback. We've made it even easier than that, by building in a queue to the SDK! The only thing that is required is that `branch.init()` is called prior to any other methods. All SDK methods called are guaranteed to:

- Be executed in the order that they were called in.
- Wait to execute until the previous SDK method finishes.

Adding the Branch script to your page automatically creates a `window.branch` object with all the external methods described below.

All calls made to Branch methods are stored in a queue, so even if the Branch Web SDK is not fully instantiated, calls made to it will be queued in the order they were originally called.

If the session was opened from a referring link, the `data()` function will also return the referring link click as `referring_link`, which gives you the ability to continue the click flow.

The `init()` function on the Branch object initiates the Branch session and creates a new user session, if it doesn't already exist, in `sessionStorage`.

| Method | Description |
| --- | --- |
| `Branch.prototype['init'] = wrap(callback_params.CALLBACK_ERR_DATA, function(done, branch_key, options) {...});` | Initiate a Branch session. |

| Argument | Type | Description |
| --- | --- | --- |
| `branch_key` | `string` | Your Branch [Live Key](http://dashboard.branch.io/settings) . |
| `options` | `object` | See "options" [table](web-full-reference.md#options-data-object). |
| `callback` | `function` | Callback that returns Branch session data. This includes the link the user was referred by. |

##### `options` Data Object

| Key | Value | Type | Required |
| --- | --- | --- | --- |
| `branch_match_id` | The current user's browser-fingerprint-id.   The value of this parameter should be the same as the value of `?_branch_match_id` (automatically appended by Branch after a link click).   Only necessary if `?_branch_match_id` is lost due to multiple redirects in your flow. | `string` | No |
| `branch_view_id` | If you would like to test how Journeys render on your page before activating them, you can set the value of this parameter to the id of the view you are testing.   Only necessary when testing a view related to a Journey. | `string` | No |
| `no_journeys` | When `true`, prevents Journeys from appearing on current page. | `boolean` | No |
| `disable_entry_animation` | When `true`, prevents a Journeys entry animation. | `boolean` | No |
| `disable_exit_animation` | When `true`, prevents a Journeys exit animation. | `boolean` | No |
| `retries` | Value specifying the number of times a Branch API call can be retried.   Default number is 2. | `integer` | No |
| `retry_delay` | Amount of time in milliseconds to wait before retrying a timed-out request to the Branch API.   Default is 200 ms. | `integer` | No |
| `timeout` | Duration in milliseconds that the system should wait for a response before considering any Branch API call to have timed out.   Default is 5000 ms. | `integer` | No |
| `metadata` | Key-value pairs used to target Journeys users via the "is viewing a page with metadata key" filter. | `object` | No |
| `nonce` | A nonce value that will be added to `branch-journey-cta` injected script. Used to allow that script from a Content Security Policy. | `string` | No |
| `tracking_disabled` | Setting to `true` disables tracking. | `boolean` | No |

##### Example Usage

```
branch.init(
    branch_key,
    options,
    callback (err, data),
);
```

##### Example Response

```
callback(
	"Error message",
	{
		data_parsed: { }, // If the user was referred from a link, and the link has associated data, the data is passed in here
		referring_identity: '12345', // If the user was referred from a link, and the link was created by a user with an identity, that identity is here
		has_app: true, // Whether the user has the app installed already
		identity: 'BranchUser', // Unique string that identifies the user
		~referring_link: 'https://bnc.lt/c/jgg75-Gjd3' // The referring link click, if available
	}
);
```

---

## setRequestMetaData

| Method | Description |
| --- | --- |
| `Branch.prototype['setRequestMetaData'] = function(key, value) {...};` | Add additional metadata in the form of key-value pairs to every network request that is made by the Branch Web SDK. This metadata can be used for analytics, troubleshooting, or to enhance the data set sent with requests. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `key` | `string` | Metadata key. | Yes |
| `value` | `string` | Metadata value. | Yes |

##### Example Usage

```
branch.setRequestMetadata("key","value");
```

---

## setAPIUrl

| Method | Description |
| --- | --- |
| `Branch.prototype['setAPIUrl'] = function(url) {...};` | Sets a custom base URL for all calls to the Branch API. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `url` | `string` | The base URL that the Branch API uses. | Yes |

##### Example Usage

```
branch.setAPIUrl("https://api2.myhost.io");
```

---

## getAPIUrl

| Method | Description |
| --- | --- |
| `Branch.prototype['getAPIUrl'] = function(){...};` | Get the previously set custom base URL for all calls to the Branch API. |

| Returns |
| --- |
| The base URL for all calls to the Branch API. |

##### Example Usage

```
branch.getAPIUrl();
```

---

## data

| Method | Description |
| --- | --- |
| `Branch.prototype['data'] = wrap(callback_params.CALLBACK_ERR_DATA, function(done) {...});` | Returns the same session information and any referring data as `Branch.init`, but does not require the `app_id`. This is meant to be called after `Branch.init` has been called, if you need the session information at a later point. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `callback` | `function` | Callback to read the session data. If the Branch session has already been initialized, the callback will return immediately. Otherwise, it will return once Branch has been initialized. | No |

##### Example Usage

```
branch.data(function(err, data) {
	response.html(err || JSON.stringify(data));
});
```

---

## first

| Method | Description |
| --- | --- |
| `Branch.prototype['first'] = wrap(callback_params.CALLBACK_ERR_DATA, function(done) {...});` | Returns the same session information and any referring data as `Branch.init` did when the app was first installed. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `callback` | `function` | Callback to read the session data. If the Branch session has already been initialized, the callback will return immediately. Otherwise, it will return once Branch has been initialized. | No |

##### Example Usage

```
branch.first(function(err, data) {
	response.html(err || JSON.stringify(data));
});
```

---

## setIdentity

This method may be helpful if you have your own user IDs for customers, or you want referral and event data to persist across platforms or uninstall/reinstall. Using this method can make it easier to know when users access your service from different devices.

::: warning Sending PII
Be sure to not send any PII through the `setIdentity()` method. For additional details, please view our guide on [Best Practices to Avoid Sending PII to Branch](best-practices-to-avoid-sending-pii-to-branch.md).
:::

| Method | Description |
| --- | --- |
| `Branch.prototype['setIdentity'] = wrap(callback_params.CALLBACK_ERR_DATA, function(done, identity) {...});` | Identifies the current user to the Branch API by supplying a unique identifier. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `identity` | `string` | A string uniquely identifying the user - often a user ID. | Yes |
| `callback` | `function` | Callback that returns the user's Branch identity ID and unique link. | No |

| Returns |
| --- |
| Callback containing the user's Branch identity ID and unique link. |

##### Example Usage

```
branch.setIdentity(
    "unique-user-aa11",
    callback (err, data)
);
```

##### Example Response

```
callback(
     "Error message",
     {
          randomized_bundle_token: '12345', // Server-generated ID of the user identity, stored in `sessionStorage`
          link:                    'url',   // New link to use (replaces old stored link), stored in `sessionStorage`
          referring_data_parsed:   { },     // Returns the initial referring data for this identity, if exists, as a parsed object
          referring_identity:      '12345'  // Returns the initial referring identity for this identity, if exists
     }
);
```

---

## logout

| Method | Description |
| --- | --- |
| `Branch.prototype['logout'] = wrap(callback_params.CALLBACK_ERR, function(done) {...});` | Logs the user out of the Branch current session. Replaces session IDs and identity IDs. |

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `function` | Callback that returns whether the session was successful. |

##### Example Usage

```
branch.logout(
    callback (err)
);
```

##### Example Response

```
callback(
     "Error message"
);
```

---

## getBrowserFingerprintId

| Method | Description |
| --- | --- |
| `Branch.prototype['getBrowserFingerprintId'] = wrap(callback_params.CALLBACK_ERR_DATA, function(done) {...});` | Returns the current user's browser-fingerprint-id. If tracking is disabled then `null` is returned. |

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `function` | Callback to read a user's browser-fingerprint-id. |

##### Example Usage

```
branch.getBrowserFingerprintId(function(err, data) { console.log(data); });
```

##### Example Response

```
callback(
     null,
     '00000000000000000', // browser-fingerprint-id, stored in `localStorage`
);
```

---

## lastAttributedTouchData

| Method | Description |
| --- | --- |
| `Branch.prototype['lastAttributedTouchData'] = wrap(callback_params.CALLBACK_ERR_DATA, function(done, attribution_window) {...});` | Returns last attributed touch data for current user. Last attributed touch data has the information associated with that user's last viewed impression or clicked link. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `attribution_window` | `number` | The number of days to look up attribution data for. | Yes |
| `callback` | `function` | Callback to read last attributed touch data. | No |

##### Example Usage

```
branch.lastAttributedTouchData(
    attribution_window,
    callback (err, data)
);
```

---

## logEvent

By default, the Branch Web SDK tracks clicks, opens, installs, reinstalls, impressions, and Journeys dismissals automatically (out-of-the-box).

You can also track special user actions or application-specific events. For example, you can track when a user adds an item to a shopping cart or searches for a keyword.

Learn more about tracking Commerce, Content, Lifecycle, and Custom Events via the `logEvent()` method in our [guide](track-branch-events.md).

| Method | Description |
| --- | --- |
| `Branch.prototype['logEvent'] = wrap(callback_params.CALLBACK_ERR, function(done, name, eventData, contentItems, customer_event_alias) {...});` | Log a Branch Event to Branch's servers for tracking and analytics. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `event` | `string` | Name of the event. | Yes |
| `event_data_and_custom_data` | `object` | Relevant information about the event. | No |
| `content_items` | `array` | Information about the items associated with the event. For example, products purchased (content items) during a transaction (event). | No |
| `customer_event_alias` | `string` | An alias for the event name, if applicable. | No |
| `callback` | `function` | Callback that returns whether event logging was successful. | No |

##### Example Usage for Standard Events (Commerce, Content, and Lifecycle)

```
// Example for how to log a `PURCHASE` Commerce Event

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

##### Example Usage for Custom Events

```
var custom_data = {
   "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
   "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
};

branch.logEvent(
    'custom_event_name',
    custom_data,
    function(err) { console.log(err); }
);
```

---

## link

| Method | Description |
| --- | --- |
| `Branch.prototype['link'] = wrap(callback_params.CALLBACK_ERR_DATA, function(done, data) {...});` | Creates and returns a Branch Deep Link URL. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `data` | `object` | Link data and metadata. | Yes |
| `callback` | `function` | Callback that returns a string containing the Branch Deep  Link URL. | Yes |

##### Facebook OG Tags

You can customize the Facebook OG tags of each URL if you want to dynamically share content.

Do this using the following optional keys in the `data` object.

| Key | Value |
| --- | --- |
| `$og_title` | The title you'd like to appear for the link in social media. |
| `$og_description` | The description you'd like to appear for the link in social media. |
| `$og_image_url` | The URL for the image you'd like to appear for the link in social media. |
| `$og_video` | The URL for the video you'd like to appear for the link in social media. |
| `"$og_url"` | The URL you'd like to appear for the link in social media. |
| `$og_redirect` | If you want to bypass our OG tags and use your own, use this key with the URL that contains your site's metadata. |

##### Example Usage

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
        '$og_title': 'My App',
        '$og_description': 'My app\'s description.',
        '$og_image_url': 'http://myappwebsite.com/image.png'
    }
}, function(err, link) {
    console.log(err, link);
});
```

##### Example Response

```
callback(
    "Status message here",
    "https://example.app.link/l/3HZMytU-BW"
);
```

---

## deepview

See our [tutorial](https://www.branch.io/resources/blog/how-to-deep-link-from-your-mobile-website) for a full guide on how to use Deepview functionality with the Branch Web SDK.

| Method | Description |
| --- | --- |
| `Branch.prototype['deepview'] = wrap(callback_params.CALLBACK_ERR, function(done, data, options) {...});` | Turns the current page into a [Branch Deepview](deepviews.md#overview). A Deepview is a mobile web splash page, hosted by Branch, that gives a preview of the in-app content behind a given Branch Link. This gives the page two special behaviors:   1. When the page is viewed on a mobile browser, if the user has the app installed on their phone, we will try to open the app automatically and deep link them to this content. This can be toggled off by turning `open_app` to false, but this is not recommended. 2. Provides a callback to open the app directly, accessible as `branch.deepviewCta();` - you'll want to have a button on your web page that says something like "View In App", which calls this function on click. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `data` | `object` | Object that includes all link data. | Yes |
| `options` | `object` | Includes the following properties: `make_new_link`: Whether to create a new link even if one already exists. `open_app`: Whether to try to open the app passively (as opposed to opening it upon user clicking). Defaults to `true`. | No |
| `callback` | `function` | Callback that returns an error if the API call is unsuccessful. | No |

##### Example Usage

```
branch.deepview(
    {
        channel: 'facebook',
        data: {
            mydata: 'content of my data',
            foo: 'bar',
            '$deeplink_path': 'item_id=12345'
        },
        feature: 'dashboard',
        stage: 'new user',
        tags: [ 'tag1', 'tag2' ],
    },
    {
        make_new_link: true,
        open_app: true
    },
    function(err) {
        console.log(err || 'no error');
    }
);
```

---

## deepviewCta

| Method | Description |
| --- | --- |
| `Branch.prototype['deepviewCta'] = wrap(callback_params.CALLBACK_ERR, function(done) {...});` | Perform the Branch Deepview call to action (CTA) on mobile after `branch.deepview()` call is finished. If the `branch.deepview()` call is finished with no error, when `branch.deepviewCta()` is called an attempt is made to open the app and deep link the end user into it; if the end user does not have the app installed, they will be redirected to the platform-appropriate app stores. If, on the other hand, `branch.deepview()` returns with an error, then `branch.deepviewCta()` will fall back to redirect the user using [Branch Deep Links](https://github.com/BranchMetrics/Deferred-Deep-Linking-Public-API#structuring-a-dynamic-deeplink) . If `branch.deepview()` has not been called, an error will arise with a reminder to call `branch.deepview()` first. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `callback` | `function` | Callback that returns an error if CTA is unsuccessful. | No |

##### Example Usage

```
$('a.deepview-cta').click(branch.deepviewCta); // jQuery example

document.getElementById('my-elem').onClick = branch.deepviewCta; // General example

<a href='...' onclick='branch.deepviewCta()'> // In HTML

// We recommend assigning `deepviewCta()` in `deepview()` callback:
branch.deepview(data, option, function(err) {
    if (err) {
        throw err;
    }
    $('a.deepview-cta').click(branch.deepviewCta);
});

// You can call `deepviewCta()` any time after `deepview()` is finished
branch.deepviewCta();

// When debugging, call `deepviewCta()` with an error callback
branch.deepviewCta(function(err) {
	if (err) {
		console.log(err);
	}
});
```

---

## addListener

| Method | Description |
| --- | --- |
| `Branch.prototype['addListener'] = function(event, listener) {...};` | An event listener for Journeys-related Branch Events. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `event` | `string` | Specify which events you would like to listen for. If not defined, the observer will receive all events. | No |
| `listener` | `function` | Listening function that receives an event as a string and optional data as an object. | Yes |

##### Example Usage

```
var listener = function(event, data) { console.log(event, data); }

// Specify an event to listen for
branch.addListener('willShowJourney', listener);

// Listen for all events
branch.addListener(listener);
```

##### Available Journeys Events

| Event Name | Description |
| --- | --- |
| `willShowJourney` | Journey is about to be shown. |
| `didShowJourney` | Journey's entrance animation has completed and it is being shown to the user. |
| `willNotShowJourney` | Journey will not be shown and no other events will be emitted. |
| `didClickJourneyCTA` | User clicked on Journey's CTA button. |
| `didClickJourneyClose` | User clicked on Journey's close (X) button. |
| `didClickJourneyContinue` | User clicked on the dismiss Journey text. |
| `willCloseJourney` | Journey close animation has started. |
| `didCloseJourney` | Journey's close animation has completed and it is no longer visible to the user. |
| `didCallJourneyClose` | Emitted when developer calls branch.closeJourney() to dismiss Journey. |

---

## removeListener

| Method | Description |
| --- | --- |
| `Branch.prototype['removeListener'] = function(listener) {...};` | Remove the listener from observations, if it is present. |

| Argument | Type | Description |
| --- | --- | --- |
| `listener` | `function` | Reference to the listening function you would like to remove. **Note**: this must be the same reference that was passed to `branch.addListener()` earlier - not an identical clone of the function. |

##### Example Usage

```
var listener = function(event, data) { console.log(event, data); }

// Specify an event to listen for
branch.addListener('willShowJourney', listener);

// Remover listener
branch.removeListener(listener);
```

---

## setBranchViewData

| Method | Description |
| --- | --- |
| `Branch.prototype['setBranchViewData'] = wrap(callback_params.CALLBACK_ERR, function(done, data) {...});` | This function lets you set Branch Deep Link data dynamically for a given mobile web Journey. For example, if you design a full page interstitial, and want the Branch Deep Link data to be custom for each page, you'd need to use this function to dynamically set the deep link params on page load. Then, any Journey loaded on that page will inherit these deep link params. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `data` | `object` | Object of all link data. Same as the data object passed to the `branch.link()` [method](web-full-reference.md#link). | Yes |
| `callback` | `function` | Callback that returns an error if setting link data fails. | No |

##### Example Usage

```
branch.setBranchViewData({
  tags: ['tag1', 'tag2'],
  data: {
    mydata: 'something',
    foo: 'bar',
    '$deeplink_path': 'open/item/1234'
  }
},
function(err) {
	if (err) {
		console.log(err);
	}
});
```

---

## closeJourney

| Method | Description |
| --- | --- |
| `Branch.prototype['closeJourney'] = wrap(callback_params.CALLBACK_ERR, function(done) {...});` | Branch Journeys include a close button the user can click, but you may want to close the Journey with a timeout, or via some other user interaction with your web app. For these cases, call `closeJourney()`. |

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `function` | Callback that returns an error if closing Journey fails. |

##### Example Usage

```
branch.closeJourney(function(err) {
	if (err) {
		console.log(err);
	}
});
```

---

## disableTracking

| Method | Description |
| --- | --- |
| `Branch.prototype['disableTracking'] = wrap(callback_params.CALLBACK_ERR, function(done, disableTracking) {...});` | Disabling tracking prevents any Branch requests from being sent across the network, except in the case of deep linking. If someone clicks a Branch Deep Link, but has requested not to be tracked, Branch will return deep linking data back to you but without tracking information. When tracking is disabled for a user, you will still be able to create Deep Links and display Journeys. However, the user will not have identifiable information associated with them. You can change this behavior at any time by calling `disableTracking()`. Disabled tracking for a user is a persistent state. It is saved for the user across browser sessions for the web site. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `disableTracking` | `boolean` | Set to `true` to disable tracking. Calling `disableTracking();` is the same thing as calling `disableTracking(true);`. If the call `disableTracking(false)` is made, the Web SDK will re-initialize. Additionally, if `tracking_disabled: true` is passed as an option to `branch.init()`, it will be removed during the re-initialization process. | No |
| `callback` | `function` | Callback that returns an error if tracking status update fails. | No |

##### Example Usage

```
branch.disableTracking(
	true,
	function(err) {
		if (err) {
			console.log(err);
		}
	}
);
```

---

## setDMAParamsForEEA

::: warning
**Warning:** `false` **by Default**

Please note that the 3 parameters passed to `setDMAParamsForEEA()` are all `false` by default.

**Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.**
:::

| Method | Description |
| --- | --- |
| `Branch.prototype['setDMAParamsForEEA'] = wrap(callback_params.CALLBACK_ERR, function(done, eeaRegion, adPersonalizationConsent, adUserDataUsageConsent) {...});` | Sets the value of parameters required by Google Conversion APIs for DMA Compliance in the EEA region. |

| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `eeaRegion` | `boolean` | Set to `true` if user is **included** in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA. Set to `false` if user is considered **excluded** from European Union regulations. | **Required** if EU regulations apply to this user |
| `adPersonalizationConsent` | `boolean` | Set to `true` if user has **granted** consent for ads personalization. Set to `false` if user has **denied** consent for ads personalization. | **Required** if `eeaRegion` is set to `true` (i.e., EU regulations apply to this user) |
| `adUserDataUsageConsent` | `boolean` | Set to `true` if user has **granted** consent for 3P transmission of user-level data for ads. Set to `false` is user has **denied** consent for 3P transmission of user-level data for ads. | **Required** if `eeaRegion` is set to `true` (i.e., EU regulations apply to this user) |
| `callback` | `function` | Callback that returns an error if call fails. | No |

##### Example Usage

The `setDMAParamsForEEA()` method can be called before or after the `init()` method, and will be queued accordingly:

```
// Example for an EEA resident who has denied both ad personalization and data usage consent
branch.setDMAParamsForEEA(
  true,
  false,
  false,
	function(err) {
		if (err) {
			console.log(err);
		}
	}
);
```
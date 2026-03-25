---
title: "Connected Advanced Features"
slug: connected-advanced-features
---

### Initialize Branch features

- Loads Branch into your app
- Uses [Branch init options](connected-troubleshooting.md#section-branch-init-options)

```
const options = {
    advertising_ids: {
        SAMSUNG_IFA: 'xxxxx',
    },
    branch_match_id: 'xxxxx'
};
branch.init('key_live_YOUR_KEY_GOES_HERE', options, function (err, data) {
    console.log(err, data);
});
```

- Returns the following inside the `data` object

| Key | Value | Type |
| --- | --- | --- |
| data\_parsed | If the user was referred from a link, and the link has associated data, the data is passed in here. | `object` |
| has\_app | Does the user have the mobile app installed already, using Branch's persona data. | `bool` |
| identity | Unique string that identifies the user, if set from `setIdentity` | `string` |
| referring\_link | The referring link clicked, if available. | `string` |
| referring\_identity | If the user was referred from a link, and the link was created by a user with an identity, that identity is here. | `string` |

### Create Deep Link

- Creates a deep link URL with encapsulated data
- Uses [Deep Link Properties](creating-a-deep-link.md)
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/links)

```
const linkData = {
  campaign: 'content 123',
  channel: 'facebook',
  feature: 'dashboard',
  stage: 'new user',
  tags: [ 'tag1', 'tag2', 'tag3' ],
  alias: '',
  data: {
    'custom_bool': true,
    'custom_int': Date.now(),
    'custom_string': 'hello',
    '$og_title': 'Title',
    '$og_description': 'Description',
    '$og_image_url':'http://lorempixel.com/400/400'
  }
};

branch.link(linkData, function(err, link) {
  console.log(link);
});
```

### Share Deep Link

- Will generate a Branch deep link and tag it with the channel the user selects
- Uses [Deep Link Properties](creating-a-deep-link.md)

```
<!-- shareable elements -->
<button id="button">deep link</button>
<a id="anchor" href="#">deep link</a>
```

```
const linkData = {
  campaign: 'content 123',
  channel: 'facebook',
  feature: 'dashboard',
  stage: 'new user',
  tags: [ 'tag1', 'tag2', 'tag3' ],
  alias: '',
  data: {
    'custom_bool': true,
    'custom_int': Date.now(),
    'custom_string': 'hello',
    '$og_title': 'Title',
    '$og_description': 'Description',
    '$og_image_url':'http://lorempixel.com/400/400'
  }
};

branch.link(linkData, function(err, link) {
  // bind elements
  document.getElementById('button').onclick = function() {
    window.open(link || err);
  };
  document.getElementById('anchor').href = link || err;
});
```

### Read Deep Link

- Retrieve Branch data from a deep link
- Best practice to receive data from the `listener` (to prevent a race condition)
- Validate with [Testing read deep link](connected-troubleshooting.md#section-testing-read-deep-link)
- Listener

```
const options = {
    advertising_ids: {
        SAMSUNG_IFA: 'xxxxx',
    }
};
branch.init('key_live_YOUR_KEY_GOES_HERE', options, function(err, data) {
  console.log(err, data);
});
```

- Latest data

```
branch.data(function(err, data) {
  console.log(err, data);
});
```

- First data

```
branch.first(function(err, data) {
  console.log(err, data);
});
```

### Create a QR Code

- Generates a custom QR Code with a unique Branch Link which you can deep link and track analytics with.
- Uses [QR Code Settings (1st parameter)](qr-code-api.md#qr_code_settings)
- Uses [Deep Link Properties (2nd parameter)](creating-a-deep-link.md)
- Callback is a `qrCode` object which contains a `rawBuffer` or a `base64()` function which base 64 encodes the raw buffer so that you can use to display the image directly

```
const qrCodeSettings = {
    "code_color":"#000000",
    "background_color": "#FFFFFF",
    "margin": 5,
    "width": 1000,
    "image_format": "png"
};
const qrCodeLinkData = {
    tags: [ 'tag1', 'tag2' ],
    channel: 'sample app',
    feature: 'create link',
    stage: 'created link',
    data: {
        mydata: 'bar',
        '$desktop_url': 'https://cdn.branch.io/example.html',
        '$og_title': 'Branch Metrics',
        '$og_description': 'Branch Metrics',
        '$og_image_url': 'http://branch.io/img/logo_icon_white.png'
    }
};
branch.qrCode(qrCodeLinkData, qrCodeSettings, function(err, qrCode) {
    // qrCode.rawBuffer is the raw buffer
    // qrCode.base64() is the encoded 
    //
    // Example img tag:
    // <img src="data:image/png;charset=utf-8;base64,' + qrCode.base64() + '" width="500" height="500">
});
```

#### Access

Basic Branch QR Codes are included in the free tier of the Branch Growth Platform.

For more advanced QR Code capabilities, see our Engagement Pro [package](packaging.md), which includes access to the [QR Code API](qr-code-api.md)  as well as the ability to create custom QR Codes in the Branch Dashboard.

### Setting a custom Deeplink Path when Canonical URL doesn't match App path taxonomy

- Branch automatically pulls meta tags for your convenience. If Canonical Url is set as a meta tag, it will default this as the Branch `$deeplink_path`. You can override this by setting `$deeplink_path` to the path your app url taxonomy uses to deeplink.

```
<meta name="branch:deeplink:$deeplink_path" content="recipes/456789" />
const options = {
    advertising_ids: {
        SAMSUNG_IFA: 'xxxxx',
    }
};
branch.init('BRANCH_KEY', options, function(err, data) {
  if (document.querySelectorAll("meta[name='branch:deeplink:$deeplink_path']").length > 0) {
    var meta = document.querySelector("meta[name='branch:deeplink:$deeplink_path']").getAttribute("content");
    branch.setBranchViewData({
      data:{
        '$deeplink_path':meta"
      }
    });
  }
});
```

For more information on the branch:deeplink:Keys you can use to customize your meta tags, please reference [this table](deep-link-data-options.md).

#### Troubleshooting

- If you have [Facebook App Links metatags](https://developers.facebook.com/docs/applinks) on your site and working with your app, then you can skip these instructions. Branch will automatically fetch App Links tags and add them to your deep link data.
- Do not use Google Tag Manager (GTM) to insert your content metatags. GTM requires JavaScript to load on the page, and the Branch Link data scraper does not support JavaScript execution.
- If you need to allowlist the postback server IP addresses for security purposes, they are listed [here](basic-postback-configuration.md#section-whitelist-postback-server-ip-addresses).

### Track Users

::: warning Sending PII
Be sure to not send any PII through this method. For additional details, please view our guide on [Best Practices to Avoid Sending PII to Branch](best-practices-to-avoid-sending-pii-to-branch.md)
:::

- Sets the identity of a user (ID, UUID, etc) for events, deep links, and referrals
- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)

```
branch.setIdentity('123456');
```

```
branch.setIdentity('123456', function (err, data) {
  console.log(err, data);
});
```

- Removes the identity of a user

```
branch.logout();
```

```
branch.logout(function(err, data) {
console.log(err, data);
});
```

### Track Events

By default, the Branch SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box).

Please refer to our [Event Tracking Docs](track-branch-events.md) for more information and examples:

- [Track Commerce Events](track-branch-events.md#track-commerce-events)
- [Track Content Events](track-branch-events.md#track-content-events)
- [Track Lifecycle Events](track-branch-events.md#track-lifecycle-events)
- [Track Custom Events](track-branch-events.md#track-custom-events)

### Enable / Disable User Tracking

In order to help our customers comply with GDPR and other laws that restrict data collection from certain users, we’ve updated our Connected SDK with a Do Not Track mode. This way, if a user indicates that they want to remain private on your app, or if you otherwise determine that a particular user should not be tracked, you can continue to make use of the Branch Connected SDK (e.g. for creating Branch Links) while not tracking that user. This state is persistent, meaning that it’s saved for the user across sessions for the app. This setting can also be enabled across all users for a particular link, or across your Branch Links.

- To enable Do Not Track Mode during initialization, include the `tracking_disabled` flag, with a value of `true`, into the options during initialization:

```
const options = {
    ‘tracking_disabled’ : true
};
branch.init('key_live_YOUR_KEY_GOES_HERE', options, function (err, data) {
    console.log(err, data);
});
```

- To enable Do Not Track Mode following initialization, call `disableTracking(true)`. If you call `disableTracking()` with no argument, it will default to `disableTracking(true)`. Use `disableTracking(false)` to resume tracking.

```
const options = {
    advertising_ids: {
        SAMSUNG_IFA: 'xxxxx',
    },
};
branch.init('key_live_YOUR_KEY_GOES_HERE', options, function (err, data) {
    console.log(err, data);
});

branch.disableTracking(true);
```
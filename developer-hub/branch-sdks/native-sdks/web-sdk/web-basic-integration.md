---
title: "Web Basic Integration"
slug: web-basic-integration
---

This page outlines the steps required to integrate the Branch Web SDK. At the end, you will be ready to send [Branch Events](track-branch-events.md) and use [Branch Deep Links](creating-a-deep-link.md).

| GitHub | SDK Size | Speed |
| --- | --- | --- |
| \&lt;https://github.com/BranchMetrics/web-branch-deep-linking-attribution/releases\&gt; | 50kb | Median 80ms to 250ms |

**Note**: On iOS 14 in Safari, you will likely see `branch.io` listed as "blocked" with the new visibility. This is expected, and simply means that cookies from `branch.io` are blocked. No web functionality or tracking will be impacted. Branch uses a different domain for managing cookies.

#### Requirements

The Branch Web SDK requires native browser JavaScript. No 3rd party libraries are needed to make use of the Branch Web SDK, as it is 100% native JavaScript.

#### Browser Support

The Branch Web SDK has been tested in all modern browsers with `sessionStorage` capability.

| Chrome | Firefox | Safari | IE |
| --- | --- | --- | --- |
| ✔ | ✔ | ✔ | 9, 10, 11 |

#### Branch Journeys Escaped Keys and Values

Data returned from Branch Journeys event handlers contains escaped keys and values. This is true in Branch Web SDK versions 2.48.0 and older.

Characters targeted for escaping include:

- `"`
- `'`
- `&`
- `<`
- `>`

These characters are escaped to their corresponding HTML entities.

Additionally, URLs (in both keys and values) will be URI encoded.

Developers using Branch Web SDK versions 2.49.0 and up will notice values in Branch Journeys link data escaped with the same rules as above. Keys will not be escaped.

## 1. Configure Branch

Start by configuring the Branch Dashboard for your application.

1. On the [App Settings](https://dashboard.branch.io/configuration/general) page of the Branch Dashboard, navigate to the **General** tab.
2. Enter your fallback URL for mobile devices that do not have a specified redirect:  
   

## 2. Install Branch

There are several ways you can reference or install the Branch Web SDK.

#### Script Tag in HTML

To reference the latest version of the Branch Web SDK, add the following to your HTML:

```
<!doctype html>
<html>
   <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
      <script>
         // Load Branch
         (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener banner closeBanner closeJourney data deepview deepviewCta first init link logout removeListener setBranchViewData setIdentity track trackCommerceEvent logEvent disableTracking getBrowserFingerprintId crossPlatformIds lastAttributedTouchData setAPIResponseCallback qrCode setRequestMetaData setAPIUrl getAPIUrl setDMAParamsForEEA".split(" "), 0);
      </script>
   </head>
   <body></body>
</html>
```

If you want to reference a specific version of the Branch Web SDK, visit the Web Version History [page](web-version-history.md) for the CDN link, SRI hash, and initialization script.

#### Bower Package Manager

To install the Branch Web SDK with Bower, use the following command:

`bower install branch-sdk`

#### Node Package Manager

To install the Branch Web SDK with NPM, use the following command:

`npm install branch-sdk`

#### Common.JS and RequireJS Compatibility

In addition to working as a standalone library, the Branch Web SDK works great in CommonJS environments (browserify, webpack) as well as RequireJS environments (RequireJS/AMD).

Just use `require('branch')` or `define(['branch'], function(branch) { ... });` to get started!

## 3. Initialize Branch

To initialize Branch, use the `init()` method.

#### Basic Example With Logging

The `init()` method requires a Branch Key, which you can get from your account’s [Settings](https://branch.dashboard.branch.io/account-settings/profile) page in the Branch Dashboard.

```
// Replace key_live_YOUR_KEY_GOES_HERE with your Branch Key (live version)
branch.init('key_live_YOUR_KEY_GOES_HERE', function(err, data) {
	console.log(err, data);
});
```

#### Example With Additional Options

You can also use the `init()` method with special options:

| Key | Value | Type | Required |
| --- | --- | --- | --- |
| `branch_match_id` | The current user's `browser-fingerprint-id`. The value of this parameter should be the same as the value of `?_branch_match_id` (automatically appended by Branch after a link click). **Only necessary if** `?_branch_match_id` is lost due to multiple redirects in your flow. | `string` | N |
| `branch_view_id` | If you would like to test how Branch Journeys render on your page before activating them, set the value of this parameter to the id of the view you are testing **Only necessary if** testing a view related to a Branch Journey. | `string` | N |
| `no_journeys` | When set to `true`, this option prevents Branch Journeys from appearing on the current page. | `boolean` | N |
| `disable_entry_animation` | When set to `true`, prevents a Branch Journeys entry animation. | `boolean` | N |
| `disable_exit_animation` | When set to `true`, prevents a Branch Journeys exit animation. | `boolean` | N |
| `open_app` | When set to `true`, Branch will try to open the app passively through Branch Journeys (as opposed to opening it upon user clicking). Default value is `false`. | `boolean` | N |
| `nonce` | A nonce value that will be included on any script or style tags Branch adds to your site. Used to allowlist these tags in your Content Security Policy. | `string` | N |

For example:

```
var options = { no_journeys: true };

// Replace key_live_YOUR_KEY_GOES_HERE with your Branch Key (live version)
branch.init('key_live_YOUR_KEY_GOES_HERE', options, function(err, data) {
  console.log(err, data);
});
```

#### Data Returned

The `data` object passed back by Branch includes the following fields:

| Key | Value | Type |
| --- | --- | --- |
| `data_parsed` | If the user was referred from a link and the link has associated data, then the data is passed in here. | `object` |
| `has_app` | Whether the user has the app installed already. This is based on Branch's persona data. | `object` |
| `identity` | Unique string that identifies the user. Originally set by the `setIdentity()` method. | `string` |
| `referring_link` | The referring link that was clicked, if available. | `string` |
| `referring_identity` | If the user was referred from a link and the link was created by a user with an identity in the Branch system, that identity is the `referring_identity`. | `string` |

## 4. Validate Integration

It's important to validate your Branch Web SDK integration after you've set it up, to make sure that data flows properly to the Branch Dashboard and you're able to start configuring Branch Deep Links and sending Branch Events.

Validation methods:

1. The Overview tab in the [Branch Dashboard](https://dashboard.branch.io/integration).
2. The Branch Web SDK's Integration Validation method.
3. The Branch Web SDK's Enable Logging method.
4. Branch's [Link Validator tool](https://help.branch.io/docs/link-validator?highlight=link%20validator), which helps you confirm Branch Deep Link configuration, data, and routing.

For additional testing scenarios and tools, visit the Web Testing [page](web-testing.md).

If you're running into issues with your Branch Web SDK integration, start by looking at the Web Troubleshooting [page](web-troubleshooting.md).
---
title: "Connected Troubleshooting"
slug: connected-troubleshooting
---

### Minimum Requirements

- The Branch Connected SDK requires native browser Javascript and has only been tested in Tizen and WebOS with sessionStorage capability. No 3rd party libraries are needed to make use of the SDK as is it 100% native Javascript.

| Tizen | WebOS |
| --- | --- |
| 2.3 | 6.0 |

### Branch init Options

- Properties which you can pass within `branch.initSession()`
- Used for [Initialize Branch features](connected-advanced-features.md#section-initialize-branch-features)

| Key | Value | Type | Required |
| --- | --- | --- | --- |
| advertising\_ids | The current devices advertising id declared by the brand's corresponding key. Please refer to [Connected Basic Integration](connected-basic-integration.md#advertising-id-index)  for more the key index. | `{string:string}` | **Y** for Ad Network Attribution **N** for Web Based Attribution |
| branch\_match\_id | The current user's browser-fingerprint-id. The value of this parameter should be the same as the value of ?*branch\_match\_id (automatically appended by Branch after a link click). \_Only necessary if ?\_branch\_match\_id is lost due to multiple redirects in your flow*. | `string` | N |
| retries | default: 2 | `number` | N |
| retry\_delay | expressed in milliseconds  default: 200ms | `number` | N |
| timeout | expressed in milliseconds  default:5000ms | `number` | N |
| tracking\_disabled | default: false | `boolean` | N |
| enableLogging | default: false | `boolean | N |

### No Access-Control Error

- Make sure the Branch key is the same within the deep link and app

```
XMLHttpRequest cannot load https://api2.branch.io/v1/open. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. The response had HTTP status code 400.
```

### Browser Fingerprint ID

- In case you need to access your user's Browser Fingerprint ID for user deletion, use the function below.

```
branch.getBrowserFingerprintId(function(err, data) { console.log(data); });
```
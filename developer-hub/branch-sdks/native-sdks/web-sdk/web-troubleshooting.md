---
title: "Web Troubleshooting"
slug: web-troubleshooting
---

## Overview

This guide lists out some of the most common challenges we see customers run into when trying to integrate the Branch Web SDK.

To integrate the Branch Web SDK, follow the steps in our Web SDK Basic Integration [guide](web-basic-integration.md).

## Scenarios

### Journeys Banner Not Sticking to Nav

If your Journeys banner is not sticking to your nav bar:

1. Navigate to the Journeys [section](https://dashboard.branch.io/web/journeys) of the Branch Dashboard.
2. Select **Journey** → **Edit** → **Configure Views** → **Banner** → **Page Placement**.
3. Set the banner scroll value to `sticky`. Hit **Save**.
4. Add the following div to your navigation:

```
<div class="branch-journeys-top"></div>
```

### Access-Control-Allow-Origin Error

Below is a possible error message you may see:

```
XMLHttpRequest cannot load https://api2.branch.io/v1/open. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. The response had HTTP status code 400.
```

If you see this error message, make sure the Branch Key (live or test) is the same between the Branch Deep Link and your website.

### Content Security Policy Violations

If you are running into content security policy violations:

1. Generate a dynamic nonce value.
2. Include the nonce value as a `script-src` and `style-src` exception within your Content Security Policy.
3. Pass the nonce value to the `init()` method:

```
branch.init(YOUR_BRANCH_KEY, {'nonce': 'GENERATED_NONCE_VALUE' });
```

### Blocked By Client Error

If you run into the error `ERR_BLOCKED_BY_CLIENT`, you can try changing the host of the Branch Web SDK from `https://cdn.branch.io` to your own personal hosting solution.

To do this, change `src="https://cdn.branch.io/branch-latest.min.js"` within the [script tag](web-basic-integration.md#script-tag-in-html) in your HTML to point to a location you own. That location needs to contain the `.js` file corresponding to the version of Branch you want to use (`branch-latest` or alternatively, a specific version like `branch-2.85.0`).

For the CDN link, SRI hash, and initialization script, visit the Web Version History [page](web-version-history.md).
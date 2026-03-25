---
title: "Web Testing"
slug: web-testing
---

## Overview

The testing tools and resources in this guide help you make sure that you've integrated the Branch Web SDK correctly.

To integrate the Branch Web SDK, follow the steps in our Web SDK Basic Integration [guide](web-basic-integration.md).

## Test Scenarios

### Test Reading Deep Link

Reading a Branch Deep Link means retrieving the data from it. You can learn about how to do this in our Web SDK Advanced Features [guide](https://help.branch.io/developers-hub/docs/web-advanced-features#read-deep-link).

To test reading a Branch Deep Link, first add a fallback URL to the Deep Link that points to your website:

```
https://example.app.link/kJNbhZ1PrF?$fallback_url=https://example.com
```

The website in the fallback URL will open, and a value called `_branch_match_id` will get appended to the Deep Link:

```
https://example.app.link/kJNbhZ1PrF?$fallback_url=https://www.website.com/&_branch_match_id=418480444086051524
```

You can now try to read the `_branch_match_id` from the `$fallback_url` website:

```
branch.init('key_live_YOUR_KEY_GOES_HERE', function(err, data) {
  console.log(err, data);
});

// Read latest data
branch.data(function(err, data) {
  console.log(err, data);
});
```

## Testing Tools

### Integration Status Tab

For a quick approach to checking your Branch Web SDK integration status and progress, you can use the [Integration Status](https://branch.dashboard.branch.io/integration) tab of the Branch Dashboard.

![](/img/2e39fe4-Screenshot_2024-05-24_at_2.44.07_PM.png)

### Link Debugger

You can make sure your Branch Link is properly configured by using Branch's Link Debugger tool. It can help you determine whether the link was properly configured and passed the correct data when it was created.

To use Branch's Link Debugger:

1. Sign in to your [Branch Dashboard](https://branch.dashboard.branch.io/).
2. Make sure you are in the proper environment for the link you want to debug (live or test).
3. Copy the Branch Link, and append `?debug=1` to the end of it.

   1. For example, the Branch Link `https://branchster.app.link/3vqEJflHrGb` would become `https://branchster.app.link/3vqEJflHrGb?debug=1`
4. Paste this link, including the `?debug=1` flag, into your browser. This will open the Link Debugger view: ![](/img/a6a48ef-image(1).png)

## Additional Resources

#### Sample Application

The following sample application allows you to test creating Branch Events, Links, QR Codes, and Journeys.

Use the [Branch SDK Web Full Reference](web-full-reference.md) guide for definitions and code samples related to methods used in the sample application.

To use the demo:

1. Visit the Branch Web SDK [sample application](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/example.html) live page.
2. In the **API Settings** section, enter in your Branch Live Key, which you can find in the **Account Settings** [page](https://dashboard.branch.io/account-settings/profile) of your Branch Dashboard.
3. Click the **Update API Settings** button.
4. To test sending Branch Events, click the **Create Custom Event** button. If you would like to see the headers and payload associated with the event, you can do so using the **Network** tab of browser's developer tools.  
   ![](/img/f37a190864352d689474981530d7d99638f013419df9d62750e193efc6799751-Screenshot_2025-01-16_at_7.41.18_PM.png)
5. To confirm that a Branch Event was sent successfully, go to the **Liveview** [page](https://branch.dashboard.branch.io/liveview/events) of the Branch Dashboard and filter by **custom event**. Please note that it may take a few minutes to see your events show up.  
   ![](/img/13d70fc8f3f1512fb725fc655ccbb34693eff0edabcd314078c73f0c36ac1e7c-Screenshot_2025-01-16_at_7.50.44_PM.png)
6. Explore the rest of the sample application using the available buttons, and see what is sent in the request and what is returned in the response when you do so.
7. Review the project on [GitHub](https://github.com/BranchMetrics/web-branch-deep-linking-attribution/blob/master/src/web/example.template.html) to see how the different Branch Web SDK methods are used in the sample application.

### Troubleshooting Guide

If you're experiencing unexpected behavior with the Branch Web SDK, start by taking a look at our Troubleshooting [guide](web-troubleshooting.md).
---
title: "Troubleshoot Journeys Banners"
slug: troubleshoot-journeys-banners
---

## Error Messages

### Web SDK errors

- You must have the web SDK installed on your website to run a Journey. The Branch SDKs for deferred deep and contextual deep linking help you grow your apps and websites with deep links that power referral systems, sharing links and invites with full attribution and analytics. If you've integrated the Web SDK already and you're still seeing issues see the [Web SDK troubleshooting](web-troubleshooting.md) guide.
- If you do not see the journey loading, confirm with your developers that this was loaded on all web pages.

### App SDK warnings

If you choose to target iOS or Android users but haven’t integrated those SDKs, your Journeys will still show on the correct devices and direct users to your app. However, you won’t be able to get any install or event attribution for your Journeys, and you will not be able to deep link users to content inside your app.

Be sure to integrate the Branch SDK into your app. If you've integrated the iOS SDK already and you're still seeing issues see the [iOS SDK troubleshooting](ios-troubleshooting.md) guide and/or [Android SDK troubleshooting](android-troubleshooting.md) guide.

### Journey not displaying

If you are testing a journey and it is not displaying, you should review your **dismissal settings**. If you clicked to dismiss the Journey and you are not in an incognito browser, it will not display when testing. We recommend testing in incognito and to check your dismissal settings.

**iOS 17 Safari Private Browsing:** Branch's Web SDK does not load when Advanced Tracking Protection on iOS 17 Safari is enabled. These protections are built directly into Safari on top of DuckDuckGo's ad blocking technology. Due to this configuration, it is the same as using an ad blocker, which prevents our Journey from showing when using Incognito Browsing on iOS 17 Safari.

### Audience rule warnings

You will see a warning if your audience rules do not add up to 100% and will not be able to proceed to Step 3. If you do not want to address 100% of your audience, set up a blank banner for the audience fragment that you do not want to see a Journey.

### Calls to [branchsubdomain] blocked

::: info
[Click here](add-manage-users-roles-permissions-access.md) to read about the value to use for `[branchsubdomain]`.
:::

Please make sure to add `[branchsubdomain]` to the CSP header for your pages. We've seen some browsers that attempt to block it outright. You can deliver this in an HTTP header from your web server, or you can add a simple metatag to your site like so:

```
<meta http-equiv="Content-Security-Policy" content="default-src https://[branchsubdomain]; child-src 'none'; object-src 'none'">
```

### Non-mobile optimized sites

If you're not using a mobile viewport tag () because your site isn't mobile-optimized, Journeys will appear shrunken. Not to worry, here's a workaround:

1. Design the banner as you would like it to appear on your site
2. Go to the CSS editor and scroll to the bottom of the CSS code
3. Add two properties to the #branch-banner selector

   - `height: 228;`
   - `zoom: 3;`

The image will not look appropriately scaled in the editor view because the dashboard is mobile optimized. Use the preview test link on the Validation screen to make sure the banner appears correctly.

### Prevent overlap between top banners and persistent navigation bars

1. From the **Configure Creatives** screen click to the **Page Placement** tab.
2. Under **Does this banner scroll with the page, or stay fixed in the frame?** select **sticky**.
3. Click **Save & Close**.
4. Then, add the following div to your nav

```
<div class="branch-journeys-top"></div>
```

![](/img/85b2c45-Screen_Shot_2020-04-27_at_3.56.11_PM.png "Screen Shot 2020-04-27 at 3.56.11 PM.png")
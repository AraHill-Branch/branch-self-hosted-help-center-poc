---
title: "Apple Universal Links"
slug: ios-universal-links
---

## Overview

Branch makes using Universal Links simple while simultaneously improving on them by offering full attribution and supporting edge cases where Universal Links fail. This allows you to deep link, even when the user doesn't have your app installed.

![1264](/img/18d593a-universal-links-diagram.png "universal-links-diagram.png")

## Set Up Universal Links

1. To get started, you’ll need to enable Universal Links on the Branch Dashboard. To do this:  
    a. Navigate to [App Settings](https://dashboard.branch.io/configuration/general) page in the Branch Dashboard.  
    b. Check the box to **Enable Universal Links** from iOS redirects.  
    c. Type in your App’s Bundle Identifier. Learn more [here](ios-basic-integration.md#2-configure-bundle-identifier).  
    d. Type in your Apple App Prefix (found by clicking your app on [this page](https://developer.apple.com/account/ios/identifier/bundle) in Apple's Developer Portal).  
    e. Scroll down and click on the **Save** button.
2. From here, you’ll enable Associated Domains in Xcode. To do this:  
    a. Go to the **Capabilities** tab of your project file.  
    b. Scroll down and enable **Associated Domains**.  
    c. If you see an error after this step, please check that:

   1. The right team is selected for your Xcode project.
   2. The Bundle Identifier of your Xcode project matches the one used to register the App Identifier with Apple.
3. To add your Branch Link Domains:  
    a. On the [App Settings](https://dashboard.branch.io/configuration/general) page, find the Link Domain section.  
    b. Copy your domain name.  
    c. In the Domains section, click the **+ icon** and add the following entries: (making sure that `xxxx` matches the subdomain prefix you've been assigned or selected for yourself):

   - `applinks:xxxx.app.link`
   - `applinks:xxxx-alternate.app.link`
   - `applinks:xxxx.test-app.link`
   - `applinks:xxxx-alternate.test-app.link`

::: warning Caution
If the Default domain name box shows the **legacy** `bnc.lt` **domain**, you should use the following entry instead: `applinks:bnc.lt`
:::

::: warning Caution
If you use a **custom domain or subdomain** for your Branch Links, you should instead add entries for `applinks:[mycustomdomainorsubdomain]`, `XXXX.app.link` and `XXXX-alternate.app.link`. If you're unsure of your Branch-assigned `app.link` subdomain, contact our [support team](submit-a-ticket.md) and we can provide it.
:::

## App and browser Universal Links support

Please note that Universal Links don't work everywhere. We have compiled here the Universal Links support status of some popular apps.

## Apps that always work

If you open a Universal Link in one of these apps, it should work correctly all the time:

- Messages
- Mail
- WhatsApp
- Gmail
- Inbox

## Apps limited by Apple

Apple has limited Universal Links in certain situations:

- Universal Links will not work if you paste the link into the browser URL field.
- Universal Links will not work with a user-driven `<a href="...">` element click on the same domain. For example, if there is a Universal Link on google.com pointing to a different Universal Link on google.com, it will not open the app.
- Universal Links cannot be triggered via Javascript (in `window.onload` or via a `.click()` call on an `<a>` element) unless it is part of a user action.

Apps/Browsers that work conditionally:

- Safari
- Chrome

## Apps that work sometimes

Apps with built-in webviews (Google, Twitter, Facebook, Facebook Messenger, WeChat, etc.) work with Universal Links only when a webview is already open. In other words, Universal Links do not work in-app from the feed or main app views.  
To work around this limitation, your links must have [Deepviews](deepviews.md) or something similar enabled, with a call-to-action link or button with a Universal Link behind it. This way, clicking a link from the app feed will open a webview containing your Deepview page, and the user can then click the link/button to launch your app. All of Apple's limitations (in the section above) still apply for the Deepview page.

Apps/Browsers that work conditionally:

- Google
- Facebook
- Facebook Messenger
- WeChat
- Twitter
- LinkedIn
- Any app using `SFSafariViewController`

## Apps with special cases

Slack works if configured to open links in Safari. Otherwise, it works conditionally as in the above section.

## Apps that do not work

- Instagram
- Pinterest
- Telegram

## Common issues

If you are running into issues with Universal Links, please consider the questions below:

<details>
<summary>Are you testing by manually entering into Safari?</summary>

Universal Links don't work properly when entered into Safari. Use Notes or iMessage for testing.

</details>

<details>
<summary>Are you wrapping Branch Links with another link and redirecting?</summary>

In most cases, Universal Links won't open the app when they are "wrapped" by click tracking links. Universal links, including Branch Links, must be freestanding. If you want Universal Links to work in all situations, do not use other links that redirect to your Branch Links.

</details>

<details>
<summary>Do your Team ID & Bundle ID match those on your dashboard?</summary>

You can find them in the Dashboard on the [App Settings page](https://dashboard.branch.io/configuration/general), in the iOS section next to "Enable Universal Links." They should match your Team ID and Bundle ID. Team ID can be found [here](https://developer.apple.com/membercenter/index.action#accountSummary). Your Bundle ID is found in Xcode, in the **General** tab for the correct build target. If your Apple App Prefix is different from your Team ID, you should use your App Prefix. Your App Prefix can be found from App IDs on Apple's Developer Portal.

</details>

<details>
<summary>Have you deleted the app and reinstalled it?</summary>

iOS does not re-scrape the Apple-app-site-association file unless you delete and reinstall the app. (The only exception to this is App Store updates. iOS does rescrape on every update. This means that when users update to a version of your app with the Applinks entitlement, Universal Links will start working for them.)

</details>

<details>
<summary>Universal Links can be disabled</summary>

If you are successfully taken into your app via a Universal Link, you'll see "app.link" (or your domain) and a forward button in the top right corner of the status bar. If you click that button, Apple will no longer activate Universal Links in the future. To re-enable Universal Links, long press on the link in Messages (iOS 9 only due to iMessage revamp in 10) or Notes (iOS 10/9) and choose 'Open in APP'.

</details>

<details>
<summary>Are you using a custom domain?</summary>

Make sure it's configured correctly. The following error message will appear in your OS-level logs if your domain doesn't have SSL set up properly:

```
Sep 21 14:27:01 Derricks-iPhone swcd[2044] : 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
```

These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the "up" arrow in the bottom left corner of the main view.

If you're using a custom subdomain, your CNAME should point to `custom.bnc.lt` under [Configuration](https://dashboard.branch.io/configuration/general) in the Branch Dashboard.

</details>
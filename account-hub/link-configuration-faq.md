---
title: "Link Configuration FAQ"
slug: link-configuration-faq
---

The most frequently asked questions about link configuration.

<details>
<summary>Why are Branch deep links redirecting to Desktop Fallbacks on iPad?</summary>

Apple treats iPad as a desktop device. This means all links by default will redirect as if on a Desktop device. Using this guide, [add custom fallback for iPad devices](configure-default-link-behaviors.md#i-pad-redirect-link-behavior).

</details>

<details>
<summary>Can I have multiple custom domains for one app?</summary>

You can have unlimited custom domains if you have [Branch Activation](https://branch.io/pricing).

Check out our [Add Multiple Custom Domains](https://help.branch.io/docs/add-multiple-custom-domains) release note for more information.

</details>

<details>
<summary>Why does the link redirect to fallback\_url even when the app is already installed when the link is clicked from Chrome/Gmail?</summary>

This usually happens when the Android URI scheme set on the dashboard does not match with the one in the Android Manifest file.

</details>

<details>
<summary>How do Branch Links handle redirecting users into the App Store or Google Play store?</summary>

Best practice is to find the app via the Google Play/App Store search functionality, as this provides us with all the info needed to identify the specific app that should be used for redirection. This includes the package name for Android and the App Store ID for iOS.

This is generally a better experience than using an HTTPS URL to redirect users to the page in the app store--while this can still open the app, it risks opening the page in a browser instead of opening the App Store or Google Play app. With the package name or App Store ID, Branch Links can automatically open the appropriate store app and page using the market:// URI scheme, along with the package name or the itms-app:// URI, with no risk of this opening in the browser.

While there are other identifiers (such as a deep link URI scheme) that can be used to identify apps, these aren't necessarily unique to a single app in the App Store or Google Play store, so these aren't factored in when routing users who don't have the app, as the information mentioned above will ensure we're routing them to the right place.

In absence of the above information (i.e. if no package name or App Store ID can be provided), a direct URL can be used, and we'll redirect a user normally in-browser for cases like these.

</details>

<details>
<summary>How do I set up an iPad redirect to my website?</summary>

When clicking on a Branch Link from an iPad, users are being redirected to the website and not the App Store. With the release of OS 13+, the iPad is now reporting as a desktop because Apple is sending the user agent as macOS. You can do one of two things to resolve the issue:

1. Set an `$ipad_url` on the link-level
2. Or, set the iPad fallback in the [Advanced Mobile Redirects](https://dashboard.branch.io/configuration/general) section of link settings in the Branch dashboard to the iTunes link for your app.

</details>

<details>
<summary>When configuring my redirects I cannot find my app from the list of apps, what do I do?</summary>

If you are unable to find your app using the App search field on the Branch Dashboard Configuration page. Please select 'Custom URL 'and enter the link to the Playstore or AppStore for your app.  
 This will not impact functionality in any way.

If you are unable to find your app using the App Search field on the [Configuration](https://dashboard.branch.io/configuration/general) page, you can do the following:

1. Select the option **I have an Android/iOS App**.
2. Select **Custom URL** and enter in the link to your app, and provide the Android Playstore Package Name and/or Apple App Store ID.

![1784](/img/8823ce0-Screen_Shot_2020-11-30_at_10.41.44_AM.png "Screen Shot 2020-11-30 at 10.41.44 AM.png")![1782](/img/efe0865-Screen_Shot_2020-11-30_at_10.43.54_AM.png "Screen Shot 2020-11-30 at 10.43.54 AM.png")

</details>
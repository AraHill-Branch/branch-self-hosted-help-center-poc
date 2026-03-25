---
title: "Link Routing Rules (New)"
slug: link-routing-rules-new
---

## Overview

This article explains how to configure your link settings in Branch. The **Link Controls** page allows you to manage link domains, customize link appearance, and configure routing rules for different platforms and devices.

To access these settings, go to **Configuration > Link Controls** in Branch.

The **Link Controls** page contains two tabs:

- **Link Appearance** - Configure your link domains, social media previews, and QR code styling.
- **Link Routing Rules** - Configure where users are redirected based on their platform and device.

The **Link Routing Rules** tab contains settings that control where users are redirected based on their platform, device, and app installation status.

### Web routing

Configure where to send users when they don't have your app installed.

#### Default URL

Enter your default fallback URL for links that don't have a specific redirect configured. This is where users will be sent if they don't have your app and no other redirect applies.

#### Redirect allowlist

Limit link redirection to specific web domains or URI schemes across your Branch platform. List each of the domains you want to limit redirection to. Wildcard subdomains are supported using `*`.

For example, if your allowlist includes `branch.io`, `*.branch.io`, and `myapp://`, your deep links can only redirect to domains like `branch.io`, `dashboard.branch.io`, or `myapp://`.

::: info Note
We recommend including the app store domains that are relevant to the way users download your app, such as `play.google.com` and `apps.apple.com`.
:::

### Mobile routing

Configure where to send mobile users based on their platform.

#### Android

| Setting | Description |
| --- | --- |
| Android URI Scheme | Where to send your user if they have the app installed. |
| Android URL | Where to send users that don't have the app. This can be the Play Store or a custom link. |
| Android Package Name | Your app's package name from the Play Store. |
| Enable App Links | App Links will open URLs directly into an app, rather than the usual Link → Browser → App handoff cycle. This requires some setup, but Branch does this for you. You'll need to provide your SHA256 certificate fingerprints. |
| SHA256 Certificate Fingerprints | Required for App Links. You can add multiple fingerprints by selecting **Add another SHA256 fingerprint**. |

::: info Note
The Play Store is for published apps. If your app can't be located or is a local/dev build, use the Custom URL option.
:::

#### Generate SHA256 cert fingerprint

If you choose to enable App Links, you'll need to generate a SHA256 cert fingerprint. Use one of the following methods:

**KeyStore file method**

1. Navigate to your `keystore file` (used to build the debug and production version of your APK file before it gets deployed).
2. Run `keytool -list -v -keystore my-release-key.keystore` to generate a fingerprint.

**Android Studio method**

1. In Android Studio, open the Gradle options from the top-right corner of the page by selecting the elephant icon.
2. Select the terminal icon. It will say "Execute Gradle Task" when you hover over it.
3. Enter `gradle signingReport` and press Enter/Return.
4. Select the cat icon to open logcat. Copy the SHA256 cert fingerprint from logcat at the bottom of Android Studio.

#### iOS

| Setting | Description |
| --- | --- |
| iOS URI Scheme | Where to send your user if they have the app installed. |
| iOS URL | Where to send users that don't have the app. This can be the App Store or a custom link. |
| App Store ID | Your app's ID from the App Store. |
| Enable Universal Links | Universal Links will open URLs directly into an app, rather than the usual Link → Safari → App handoff cycle. This requires some setup, but Branch does this for you. You'll need to provide your Apple App Prefix and Bundle Identifiers. |
| Bundle Identifiers | Required for Universal Links. Your app's Bundle IDs from Xcode. You can add multiple identifiers by selecting **Add another Bundle ID**. |
| Apple App Prefix | Required for Universal Links. Retrieve your Apple App Prefix from your Apple Developer account on the App IDs page. Branch only supports one Apple App Prefix with multiple Bundle IDs. |
| Enable NativeLink™ | NativeLink™ uses the local device clipboard to provide guaranteed deferred deep linking. Users will be presented with a landing page and CTA that copies the deep link to their clipboard. When the user installs the app, the app will automatically receive the deep link they copied. Requires iOS SDK 1.39.4 or higher and a Pasteboard Check Method call. |
| Audience Rule | When NativeLink™ is enabled, select the appropriate audience for this feature (e.g., All iOS Traffic). |

### Advanced settings

These settings apply to both web and app links.

#### URI scheme deep link mode

This selector allows you to control how and when Branch uses URI schemes to open your app when Universal Links and Android App Links fail.

| Mode | Description |
| --- | --- |
| Conservative | Conservative mode will never use URI schemes if there is a risk of error messages. |
| Intelligent | **Recommended.** Intelligent mode uses Branch data to safely use URI schemes everywhere, with the slight risk of error messages in certain browsers if the app is uninstalled. |
| Aggressive | Aggressive will force URI schemes everywhere, causing users without the app to see error messages in some browsers. |

#### Match type

Setting Match Type determines the matching methodology Branch uses for your links and app.

| Type | Description |
| --- | --- |
| Normal | **Recommended.** Branch will make a deep link through install match based on available footprint data. |
| Unique | Branch will only make a deep link through install match if there is a single, unique outstanding footprint. This is mostly for very special circumstances. |

#### Other advanced settings

| Setting | Description |
| --- | --- |
| Analytics mapping with UTM | When redirecting to a web URL, Branch automatically passes through any values from the following Branch Link analytics tags as UTM parameters: ~campaign → utm\_campaign, ~channel → utm\_source, ~feature → utm\_medium. If these UTM parameters are already detected on the URLs being redirected to, Branch won't overwrite them. |
| Enable link scraping | Dynamic links will scrape from appended query parameters like $original\_url, $fallback\_url, and $desktop\_url for meta tags. This ensures social link previews populate correctly for dynamic content. |
| Retrieve Last Attributed Touch Data via SDKs | Allows the app to fetch link data through the SDK rather than persisting it locally. Use this to implement post-onboarding or deferred deep linking. |

### Desktop redirects

Configure where to send users accessing your links from desktop devices.

#### Default desktop

Select one of the following options:

- **Branch-hosted QR Code Landing Page** - Display a QR code that users can scan to open the link on their mobile device.
- **Custom Landing Page** - Redirect to a custom URL of your choice.

#### Mac desktop

| Setting | Description |
| --- | --- |
| Mac URI Scheme | The URI scheme to open your Mac app if installed. |
| Mac App Store URL | The URL to your app in the Mac App Store. |

#### Windows desktop

| Setting | Description |
| --- | --- |
| Windows URI Scheme | The URI scheme to open your Windows app if installed. |
| Windows Store URL | The URL to your app in the Windows Store. |
| Windows Package Family Name | Your app's Package Family Name from the Windows Store. |

::: info Note
If the app isn't installed when the link is selected, the user will be redirected to the Desktop URL or Default URL, in that order.
:::

### Advanced mobile redirects

These settings allow you to specify different destination URLs or app store listings for users accessing your content on various mobile devices and platforms.

#### Amazon Fire redirects

Enter your optional Amazon Fire URL. If blank, users will be redirected to your current Android default setting.

If you have a different package for the Amazon Store than the Play Store on Fire devices, specify the Amazon Fire URL here using the `p=package` parameter.

#### iPad redirects

Enter your optional iPad URL. If you have a different App Store ID for your iPad app or would prefer to fall back to a different URL on iPad tablets, specify either URL here.

#### Android tablet redirects

Enter your optional Android Tablet URL. If blank, users will be redirected to your current Android default setting.

If you have a different Play Store package for your tablet apps or would prefer to fall back to a different URL on Android tablets, specify either URL here.

#### WeChat redirects

Enter your optional WeChat URL. If blank, users will be redirected to the Default URL.

::: info Note
WeChat doesn't support deep linking out of the app on iOS or Android. If you choose to fall back to a custom URL, you can enter it here.
:::

### Save your changes

After making changes on the **Link Routing Rules** tab, select **Save changes** to apply your settings.
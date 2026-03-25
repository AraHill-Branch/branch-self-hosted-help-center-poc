---
title: "Deepviews Overview"
slug: deepviews
---

## Overview

A Deepview is a mobile web splash page, hosted by Branch, that gives a preview of the in-app content behind a given Branch Link. When a visitor opens one of your Branch Links and does not have your app installed, you can show them a Deepview instead of sending them directly to the App/Play Store.

Deepviews are discoverable in all search portals (Google, Apple Spotlight, Bing, etc), opening up new mechanisms for people to find your app, and driving much higher conversions to install than sending visitors to the App/Play Store directly. Here's an example flow:

*[Image: 243]*

### Access

Access to the Deepviews feature requires a premium plan. Please contact our [Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.

### Deepview Types

<details>
<summary>Active Deepviews</summary>

Active deepviews should only show when the app is *not* installed (or when direct deep linking doesn't work like in the Facebook webview), and pause on the deepview page. These let the user preview the content, ultimately deciding if they want to install the app. The user must click the call-to-action of **Get The App** in order to be sent to the appropriate App or Play Store page.

| Key | Value | Default Template |
| --- | --- | --- |
| `$ios_deepview` | The name of the template to use for iOS. | `default_template` |
| `$android_deepview` | The name of the template to use for Android. | `default_template` |
| `$desktop_deepview` | The name of the template to use for the desktop. | `default_template` |

</details>

<details>
<summary>Passive Deepviews</summary>

Passive deepviews should also only appear when the app is *not* installed, but instead of pausing on the deepview page, they will attempt to redirect to the App/Play Store immediately without the user taking action. These should be used when you don't want a blank white screen to be left in a browser after the user clicks a link to go install your app. Note that these are automatically enabled in Safari iOS 10.3 and Facebook iOS webviews if you're attempting to redirect to your Store page.

To disable passive deepviews, simply set the value to `false` in the link data.

| Key | Value | Default |
| --- | --- | --- |
| `$ios_passive_deepview` | The name of the template to use for iOS. | `default_template` |
| `$android_passive_deepview` | The name of the template to use for Android. | `default_template` |

To enable another template as the default passive deepview, select the 'Set as Passive Default' option. You can also change the template **on a link level** by providing the template name in the [control parameters](creating-a-deep-link.md#deepview). If you're creating a link by appending query parameters, you simply need to append the parameters to the URL. Please make sure to URL encode everything, lest the link will break.

</details>

<details>
<summary>NativeLink™ Deepviews</summary>

NativeLink™ is an innovation from Branch that bridges the gap created by Private Relay with an on-device solution that does not require the use of an IP address for deferred deep linking. NativeLink™ gives end-users the choice to copy deep link content to their clipboard or not, so they have full control of their user experience.

View the full guide on NativeLink™ Deepviews [**here**](nativelink-deferred-deep-linking.md).

</details>

## How does it work?

1. User clicks a Branch Link.
2. The web browser opens and displays a page that gives preview of the in-app content.
3. User clicks the App Download call-to-action button.
4. User is deep linked into in-app content when they open the app after download.
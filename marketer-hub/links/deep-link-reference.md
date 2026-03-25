---
title: "Deep Linking Full Reference"
slug: deep-link-reference
---

## Overview

You can use deep links for your Journeys, Ads Links, Short Links, and Email. Use this reference article to help you configure your default and custom link behavior.

Read our [Create Web Links](create-web-links.md) or [Create App Links](create-app-links.md) articles for instructional content on creating links using different methods.

In this reference article, you can learn about:

- [Creating deep links](deep-link-reference.md#create-deep-links)
- [Validating deep link behavior](deep-link-reference.md#validate-deep-link-behavior)
- [Configuring deep links](deep-link-reference.md#configure-deep-links)
- [Reading deep links](deep-link-reference.md#read-deep-links)

::: info Note
Information about web links in this article is only relevant for the Engagement product, read our [Create Web Links](create-web-links.md) article for web links information relevant to the Activation product.
:::

## Create deep links

You can create both web and app deep links with the Branch Growth Platform. Links can be either short or long.

### Short Links

Short Links are the most common deep links created with the Branch SDK or Deep Linking API. You can use a Branch-provided `app.link`, or use a custom domain (for example, `links.yoursite.com`). You can also tailor the appearance of the shortcode to a custom `alias` during creation. Aliases can be short strings (for example, `https://example.app.link/october-sale`), or can be a full link path (for example, `https://example.app.link/product/id1234` ).

Short Links contain [link data](deep-link-reference.md#configure-deep-links) inside them on link creation (for example, existing link `https://example.app.link/fzmLEhobLD` ). Short Links can also have additional data appended to them (for example, dynamic link `https://example.app.link/fzmLEhobLD?content_id=123` ).

#### Methods of creating Short Links

Check out our [Create Web Links](create-web-links.md) and [Create App Links](create-app-links.md) articles to learn more about creating Short Links.

### Long links

Long links can be created without a network call to Branch. Long links need [link data](deep-link-reference.md#configure-deep-links) to be added as a query string. Be sure to URI encode any URLs in the link.

- Existing link example: `https://example.app.link/fzmLEhobLD?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F` or
- Dynamic link example: `https://example.app.link/?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F` .

Long links need a `/a/` and a [Branch Key](profile-settings.md) if you use a custom domain.

- Existing link example: `https://link.example.com/5NPh/p4M09KRLrD?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`
- Dynamic link example: `https://link.example.com/a/key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`

When adding `tags` to a dynamic link, enter each tag separately. For example: `https://example.app.link/?foo=bar&~tags=tag1&~tags=tag2`

## Validate deep link behavior

Use the [Link Validator](link-validator.md) to view the expected and actual behavior of your links.

<details>
<summary>Expand to view information about expected link behaviors</summary>

#### Default link behavior

If your user **does not** have your app installed:

1. User `clicks` on a Branch deep link.
2. Device `navigates` to the [fallback](deep-link-reference.md#link-behavior-and-redirects) (for example, an app store or website).

   - We support the following app stores:

     - Apple App Store
     - Google Play
     - Huawei App Store
     - Vivo App Store
     - Oppo App Store
     - Baidu Mobile Assistant
3. User `installs` and `opens` your app.
4. Branch passes deep link `data` into your app.

If your user **does** have your app installed:

1. User `clicks` on a Branch deep link.
2. Device `opens` your app or navigates to [expected link behavior](deep-link-reference.md#link-behavior-and-redirects).
3. Branch passes deep link `data` into your app.

#### Custom link behavior

**Pass data from link to app**

1. Add [link data](deep-link-reference.md#configure-deep-links) to each deep link.
2. Add key-values pairs to your Short Links.
3. Append query strings `https://example.app.link/fzmLEhobLD?$custom_data=123&hello=world` .

**Fallback to a specific URL**

- Determine where a deep link will navigate to if either

  - Your app is not installed
  - *[or]* Another app prevent links from deep linking outside their app
- Fallback overrides *(ordered by precedence)*

  - Add query string `https://example.app.link?$ios_url=https://example.com`
  - Add link data `$ios_url = 'https://example.com'` ([docs](deep-link-reference.md#link-behavior-and-redirects))
  - Add link data for a deep view `$ios_deepview = 'deepviewId'` ([docs](enable-deepviews.md))
  - Enable a **Deep View** globally on the [Branch Dashboard](https://dashboard.branch.io/web/deepviews)
  - Add link data `$fallback_url = 'https://example.com'` ([docs](deep-link-reference.md#link-behavior-and-redirects))
  - Add `iOS/Android Custom URL` on the [Branch Dashboard](https://dashboard.branch.io/link-settings)
  - Add **Default URL** (`$fallback_url`) on the [Branch Dashboard](https://dashboard.branch.io/link-settings)

**Open** **web** **instead of app**

This information is only relevant to the [Engagement product](packaging.md). [Activation](packaging.md#activation-product) links do not require /e/ or -web to open in a web browser.

If your app is not installed: device `navigates` to the [fallback](deep-link-reference.md#link-behavior-and-redirects) (for example, an app store or website).

If your app is installed:

- - *iOS:* need to override `Universal Links`

    - Add `$web_only = true` ([docs](deep-link-reference.md#link-behavior-and-redirects)).
    - Add redirect `$ios_url = 'https://google.com'` ([docs](deep-link-reference.md#redirections)).
    - *[or]* Append `/e/` to the deep link.

      - e.g. `https://example.app.link/fzmLEhobLD` -> `https://example.app.link/e/fzmLEhobLD`
  - *Android:* need to override `App Links`

    - Uncheck `Enable App Links` and then hit `Save` on the [Branch Dashboard](https://dashboard.branch.io/link-settings).
    - Add redirect `$android_url = 'https://google.com'` ([docs](deep-link-reference.md#redirections)).
    - Add a broken URI Scheme with `$android_deeplink_path = 'random'` .
- Add `-web` in the link domain: e.g. `branch.app.link` -> `branch-web.app.link` .

  - Does not work with custom link domains when used in conjunction with a custom alias.

#### Social link behavior

- Use [OG Tags](deep-link-reference.md#open-graph) to display content as a preview card in Facebook, Twitter, Pinterest, iMessage, etc.

  - The `$og_title` and `$og_description` tags are included with the Branch Growth Platform.
  - The `$og_image_url` tag is reserved for paid Branch accounts with a dedicated contract.
- Use [Deepviews](deepviews.md) to display content as a website.

  - Increases install attribution.
  - Completes deep linking experience in [certain apps](deep-link-reference.md#link-behavior-and-redirects).

#### UTM behavior

This is enabled by default. To disable this functionality, go to **Link Settings** > **Advance Settings** > **Analytics mapping with UTM**.

- When redirecting to a web URL, Branch automatically passes through any values from the following Branch link analytics tags as UTM parameters:

  - `~campaign` -> `utm_campaign`
  - `~channel` -> `utm_source`
  - `~feature` -> `utm_medium`
- This applies to web URLs defined using any of the following `$fallback_url`, `$ios_url`, `$android_url`, `$desktop_url`, `$original_url`, and `$canonical_url`.
- If these UTM parameters are already detected on the URLs being redirected to, Branch will not overwrite them.
- For more information about UTM parameters, please read Google Analytic's [Custom Campaigns](https://support.google.com/analytics/answer/1033863) article.

#### Expiration behavior

The default expiration behavior will vary depending on the type of Branch Link you're using.

| Link Type | Expiration |
| --- | --- |
| Short Links | Starting March 11, 2024. Expires 380 Days after creation. This expiration window is reset when the Short Link is clicked or if Branch receives a [read request via the Deep Linking API](readexistingdeeplink.md). |
| Long Links | Does not expire |
| Short Links | Does not expire |
| Ad Links | Does not expire |

</details>

## Configure deep links

You can add any of your own key-value parameters to a Branch link. These parameters will be passed to your app via the Branch SDK, however some keys will have specific extra effects.

### Link data

Specify where to deep link users in your app, or configure advanced settings like device-based targeting, attribution windows, and custom keys specific to your app.

#### Popular

The most popular and commonly used data options.

| Name | Default value | Key | Definition |
| --- | --- | --- | --- |
| Deep Link Path | `open?link_click_id=1234` | `$deeplink_path` | Sets a default deep link path for all platforms. When a user opens a Branch Link with this parameter, the Branch SDK will route them to the specified in-app content path. |
| iOS Deep Link Path |  | `$ios_deeplink_path` | Sets the deep link path for iOS apps, which overrides the default path. When a user on an iOS device opens a Branch Link, the Branch SDK will route them to the specified in-app content path. |
| Android Deep Link Path |  | `$android_deeplink_path` | Sets the deep link path for Android apps. When the Branch SDK receives a link with this parameter set, it will automatically load the custom Android URI path contained within. |
| Fallback URL |  | `$fallback_url` | Change the redirect destination for all platforms so you don’t have to enable it by platform. Branch will forward all robots to this URL, which overrides any OG tags entered in the link. System-wide default URL (set in Link Settings). |
| Canonical URL |  | `$canonical_url` | The corresponding web URL for the in-app content. |
| Unique Content Identifier |  | `$canonical_identifier` | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options include a website with pathing, or a database with identifiers for entities. |
| iOS Passive Deepview Template | `branch_default` | `$ios_passive_deepview` | The name of the Deepview template that your link will fallback to for iOS. |
| Android Passive Deepview Template | `branch_default` | `$android_passive_deepview` | The name of the Deepview template that your link will fall back to for Android. |
| Always Deep Link to App | `true` | `$always_deeplink` | Set to false to make links always fall back to your mobile site. Does not apply to Universal Links or Android App Links. |
| Deep Linking Window (Seconds) | `7200` | `$match_duration` | Lets you control the snapshotting match timeout (the time that a click will wait for an app open to match), also known as attribution window. Specified in seconds. |
| URI Redirect Mode |  | `$uri_redirect_mode` | Allows you to control how and when Branch uses URI schemes to open your app. |
| iOS URI Redirect Mode |  | `$ios_uri_redirect_mode` | Allows you to control how and when Branch uses URI schemes to open your app on iOS. |
| Android URI Redirect Mode |  | `$android_uri_redirect_mode` | Allows you to control how and when Branch uses URI schemes to open your app on Android. |

#### Deep linking parameters

Set the specific in-app content a user is routed to.

| Name | Default value | Key | Definition |
| --- | --- | --- | --- |
| Deep Link Path | `open?link_click_id=1234` | `$deeplink_path` | Sets a default deep link path for all platforms. When a user opens a Branch Link with this parameter, the Branch SDK will route them to the specified in-app content path. |
| iOS Deep Link Path |  | `$ios_deeplink_path` | Sets the deep link path for iOS apps, which overrides the default path. When a user on an iOS device opens a Branch Link, the Branch SDK will route them to the specified in-app content path. |
| Android Deep Link Path |  | `$android_deeplink_path` | Sets the deep link path for Android apps. When the Branch SDK receives a link with this parameter set, it will automatically load the custom Android URI path contained within. |
| Desktop Deep Link Path |  | `$desktop_deeplink_path` | Sets the deep link path for desktop apps. You must fetch this parameter from the link to route the user to the correct destination. |

#### Link behavior and redirects

Set where to send users if the app cannot be opened (for example, if it is not installed).

::: info Note
Using redirect parameters on Branch Links requires a valid credit card to be entered on your account. Alternatively, you can set up an Enterprise account.
:::

<details>
<summary>Expand to view information about forced redirects</summary>

### Forced Redirections

Prevent error messages from other apps when Branch deep links are clicked.

| Key | Value | Usage |
| --- | --- | --- |
| `$uri_redirect_mode` | **0** | Conservative mode. We don't try to open the app if the user can see an error. |
| `$uri_redirect_mode` | **1** | Smart redirect mode. This is the default value that yields the same behavior as 0 until we know the user has the app installed through Branch persona data. In that case, force URI schemes to open the app. |
| `$uri_redirect_mode` | **2** | Forceful redirect mode. Always try to force open the app, even if it risks showing an [error message](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/uri-error-message(1).png) when the app is not installed. |

- Forced redirections will not force open the app when the link is configured with an "Active Deepview" or "NativeLink" since they are intended to load a webpage and not redirect elsewhere.
- OS level redirect modes can be enabled by utilizing the parameters `$ios_uri_redirect_mode` and `$android_uri_redirect_mode`.
- Supported Apps

  - Facebook newsfeed iOS
  - Instagram iOS
  - Twitter iOS
  - Safari iOS
  - Firefox iOS & Android

</details>

| Name | Key | Definition |
| --- | --- | --- |
| Fallback URL | `$fallback_url` | Sets a single fallback URL for all platforms where users are redirected if the app cannot be opened or if they do not have the app downloaded. If the link is a web-only link, this will be the destination.    **Note**: Branch forwards all web crawlers (robots) to this URL, which overrides any Open Graph (OG) tags you set. |
| Country-Specific Fallback URL | `$fallback_url_xx` | Change the redirect endpoint for all platforms based on a [lower-case Alpha-2 country code](https://www.iso.org/obp/ui/#search). For example, `$fallback_url_de="..."` would redirect Germany deep link clicks. You should also set `$fallback_url` to act as the global redirect in addition to the country-specific ones.    **Warning**: If platform-specific redirects (like `$ios_url` or `$desktop_url`) are set, they will override the country-specific redirect. We recommend you only use $fallback\_url\_xx for the country-specific redirects and `$fallback_url` to catch all other users. |
| iPad Redirect URL | `$ipad_url` | Sets a specific redirect URL for iPad users, overriding the `$ios_url` value. |
| Samsung Galaxy Store Redirect URL | `$samsung_url` | Redirect users on Samsung devices to the Samsung Galaxy Store. You must provide the link in the following format: `http://www.samsungapps.com/appquery/appDetail.as?appId=YOUR.PACKAGE.NAME` |
| Huawei App Gallery URL | `$huawei_url` | Redirect users on Huawei devices to the Huawei AppGallery. The URL format must following Huawei’s App Linking guide. |
| Force Web Open | `$web_only` | Forces the link to open the web URL set in `$fallback_url` instead of opening the app. |
| Mobile Web Only (Desktop App) | `$mobile_web_only` | When set to `true`, the link will open your website on mobile devices but will open the app on desktop. |
| Desktop Web Only (Mobile App) | `$desktop_web_only` | When set to `true`, the link will open your website on desktop but will open the app on mobile devices. |
| Always Deep Link to App | `$always_deeplink` | Set to `false` to make links always fall back to your mobile site. Does not apply to Universal Links or Android App Links. |
| Enable iOS NativeLink | `$ios_nativelink` | When set to true, the link routes through NativeLink to enable deferred deep linking for iOS 15+ and Private Relay users. |
| URI Redirect Mode | `$uri_redirect_mode` | Allows you to control how and when Branch uses URI schemes to open your app. |
| iOS URI Redirect Mode | `$ios_uri_redirect_mode` | Allows you to control how and when Branch uses URI schemes to open your app on iOS. |
| Android URI Redirect Mode | `$android_uri_redirect_mode` | Allows you to control how and when Branch uses URI schemes to open your app on Android. |
| iOS App Store Redirect Delay (Milliseconds) | `$ios_redirect_timeout` | Control the timeout that the client-side JS waits after trying to open up the app before redirecting to the App Store. Specified in milliseconds. |
| Android Play Store Redirect Delay (Milliseconds) | `$android_redirect_timeout` | Control the timeout that the client-side JS waits after trying to open up the app before redirecting to the Play Store. Specified in milliseconds. |

#### Attribution and analytics control

Control the time window during which installs, opens, or conversions can be attributed to a link click or impression.

| Name | Key | Definition |
| --- | --- | --- |
| Click-to-Install Window (Days) | `$click_install_window_days` | Time between a click and an install or reinstall. For example: `.../?$click_install_window_days=3` |
| Click-to-Open/Session Window (Days) | `$click_session_start_window_days` | Time between a click and an open or web session start. For example: `.../?$click_session_start_window_days=7` |
| Click-to-Conversion Window (Days) | `$click_conversion_window_days` | Time between a click and a conversion event. Conversion events include commerce events, all custom events, and all view events. For example: `.../?$click_conversion_window_days=30` |
| Impression-to-Install Window (Days) | `$impression_install_window_days` | Time between an ad impression and an install and reinstall. For example: `.../?$impression_install_window_days=3` |
| Impression-to-Open/Session Window (Days) | `$impression_session_start_window_days` | Time between an ad impression and an open or web session start. For example: `.../?$impression_session_start_window_days=1` |
| Impression-to-Conversion Window (Days) | `$impression_conversion_window_days` | Time between an ad impression and a conversion event. Conversion events include commerce events, all custom events, and all view events. For example: `.../?$impression_conversion_window_days=7` |
| Deep Linking Window (Seconds) | `$match_duration` | Lets you control the snapshotting match timeout (the time that a click will wait for an app open to match), also known as attribution window. Specified in seconds. |
| Deep Link Only (No Attribution) | `$deeplink_no_attribution` | Set to true for the links to only support deep linking without any attribution for that link.    **Note**: Using this will lose all link metrics when set to `true`. |
| Disable Click Tracking & Analytics | `$do_not_process` | This will prevent click tracking and storage of link analytics. Deep link data will still flow into the app from link click to app open. |

**Analytical data keys**

These labels allow you to filter and organize your deep links. Refer to the “Reserved prefixes” section of this article to learn more about the `~` prefix.

| Key | Usage |
| --- | --- |
| `~channel or channel` | Use channel to tag the route that your link reaches users. For example, tag links with `'Facebook'` or `'LinkedIn'` to help track clicks and installs through those paths separately |
| `~feature or feature` | This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature 'referral' |
| `~campaign or campaign` | Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that |
| `~campaign_id` | Use this field to organize the links by actual campaign id. For example, if you launched a new feature or product and want to run a campaign around that |
| `~customer_campaign` | The customer campaign specified for the last attributed touch. can be specified on links by the client. |
| `~stage` | Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter |
| `~tags or tags` | This is a free form entry with unlimited values `['string']`. Use it to organize your link data with labels that don't fit within the bounds of the above |
| `~secondary_publisher` | secondary publisher specified for the last attributed touch. passed by the ad network. |
| `~customer_secondary_publisher` | The ID of the secondary publisher specified for the last attributed touch. can be specified on links by the client. |
| `~creative_name` | The creative name specified for the last attributed touch. |
| `~creative_id` | The creative ID specified for the last attributed touch. |
| `~ad_set_name` | The ad set name specified for the last attributed touch. |
| `~ad_set_id` | The ad set ID specified for the last attributed touch. |
| `~customer_ad_set_name` | The customer ad set name specified for the last attributed touch. can be specified on links by the client. |
| `~ad_name` | The ad name specified for the last attributed touch. |
| `~ad_id` | The ad ID specified for the last attributed touch. |
| `~customer_ad_name` | The customer ad name specified for the last attributed touch. can be specified on the link by the client. |
| `~keyword` | The keyword specified for the last attributed touch. |
| `~keyword_id` | The unique ID for keyword of the last touch |
| `~customer_keyword` | The customer keyword of the last touch. Can be specified on links by the client. |
| `~placement` | The placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns. |
| `~placement_id` | The ID of placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns. |
| `~customer_placement` | The customer specified placement of the last touch, as set with an analytics tag. Actual app or website the ad appears on display campaigns. Can be specified on the link by the client. |
| `~sub_site_name` | Reference to the site where the ad was displayed. |
| `~customer_sub_site_name` | Customer reference to the site where the ad was displayed. Can be specified on links by the client. |

#### Social media previews

Customize how a link preview appears when shared on social media platforms.

| Name | Key | Definition |
| --- | --- | --- |
| Social Media Image Width | `$og_image_width` | Set the image’s width in pixels for social media previews. |
| Social Media Image Height | `$og_image_height` | Set the image’s heigh in pixels for social media previews. |
| Social Media Video URL | `$og_video` | Set a video as it will be seen in social media previews. |
| Social Media Base URL | `$og_url` | Set the base URL of the link as it will be seen in social media previews. |
| Social Media Card Type | `$og_type` | Set the type of custom card format link as it will be seen in social media previews. Don’t set this property when sharing deep links on Facebook. |
| Social Media App ID | `$og_app_id` | Set the app ID tag. |
| Advanced Social Media Redirect | `$og_redirect` | Advanced, not recommended for most use cases. Set a custom URL that we redirect social media bots to in order to retrieve all the appropriate tags. |
| Twitter (X) Card Type | `$twitter_card` | Set the Twitter card type of the link (for example, player). You must allowlist your deep link with the Twitter Card Validator. |
| Twitter (X) Site Name | `$twitter_site` | Set the site for Twitter (X). |
| Twitter (X) App Country | `$twitter_app_country` | Set the app country for the app card. |
| Twitter (X) Video Player URL | `$twitter_player` | Set the video player’s URL. Default to the video value of `$og_video`. |
| Twitter (X) Player Width | `$twitter_player_width` | Set the player’s width in pixels. |
| Twitter (X) Player Height | `$twitter_player_height` | Set the player’s height in pixels. |
| Custom Social Media Meta Tags | `$custom_meta_tags` | Valid string JSON dictionary of the tags’ keys and values. For example: `{"twitter:player:stream": "https://branch.io"}` |

#### Content metadata

Set the content the link points to, helping with organization, deduplication, and search indexing.

| Name | Key | Definition |
| --- | --- | --- |
| Unique Content Identifier | `$canonical_identifier` | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options include a website with pathing, or a database with identifiers for entitie |
| Canonical URL | `$canonical_url` | The corresponding web URL for the in-app content |
| Publicly Indexable | `$publicly_indexable` | Cannot modify here. Must be set by the Branch Universal Object. |
| Content Type Label | `$content_type` | This is a label for the type of content present. Apple recommends that you use uniform-type identifier as described here. |
| Content Expiration Date | `$exp_date` | Expiry date for the content and any associated link data. Represented as UTC epoch millisecond. |

#### Deepview templates

Templates for Deepviews on iOS and Android.

| Name | Key | Definition |
| --- | --- | --- |
| iOS Passive Deepview Template | `$ios_passive_deepview` | The name of the Deepview template to use for iOS. |
| Android Passive Deepview Template | `$android_passive_deepview` | The name of the Deepview template to use for Android. |

#### Custom data

Create custom keys to pass any custom data to be read inside your app. For example:

| Custom key (example) | Custom value (example) | Custom usage (example) |
| --- | --- | --- |
| random | 123 | Sending random information to your app. |

### Link appearance

Customize the appearance of your Branch Short Link.

| Key | Default | Usage |
| --- | --- | --- |
| `alias` | none | Specify a link alias to replace of the standard encoded short URL (e.g. `https://example.app.link/aQXXDHaxKF` -> `https://example.app.link/october-campaign` or `https://example.app.link/product/id1234`). Link aliases must be unique per app (a `400 error` will occur if you create an alias already taken). Also note that we don't currently support single character path segments after the domain (`/a/`, `/b/`, `/c/`, etc). |

### Other reserved keys

| Key | Usage |
| --- | --- |
| `access_token` or `AccessToken` | Used by Branch to determine if a deep link is a valid Branch link or not. |
| `auth_token`or `AuthToken` | Used by Branch to determine if a deep link is a valid Branch link or not. |
| `data` | Used by Branch to contain top-level link information. If this parameter is added to a Branch link via appending query params, it will be dropped. It can be safely used when creating a link manually via the dashboard. |
| `password` | If this parameter is added to a Branch link via appending query params, it will be dropped. |
| `auth` | If this parameter is added to a Branch link via appending query params, it will be dropped. |

### Reserved prefixes

Branch adds prefixes to each deep link data key to explain the key. You will see this added to the beginning of the different types of keys below.

| Prefix | Usage |
| --- | --- |
| `$` | Branch reserved keyword. |
| `~` | Branch analytical data. |
| `+` | Branch added values. |

## Read deep links

Deep link data gets sent from your link to your app integration.

### Data structure

Example deep link data structure:

```
{
        "randomized_bundle_token": "427469360685348303",
        "link": "https://example.app.link?%24randomized_bundle_token=427469360685348303",
        "session_id": "429691081177874743",
        "data": {
        "$canonical_identifier": "item/1503684554354.28",
        "$canonical_url": "https://example.com/home?utm_campaign=test&deeplink=value",
        "$desktop_url": "http://example.com/home",
        "$randomized_bundle_token": "427469360685348303",
        "$og_description": "My Content Description",
        "$og_image_url": "http://lorempixel.com/200/200/",
        "$og_title": "46D6D28E-0390-40E4-A856-BD74F34D24C8",
        "$publicly_indexable": 1,
        "+click_timestamp": 1503684563,
        "+clicked_branch_link": true,
        "+is_first_session": false,
        "+match_guaranteed": true,
        "custom": "blue",
        "random": "FE848A5B-78F7-42EC-A253-9F795FE91692",
        "added": "1503684554354.33",
        "~campaign": "new launch",
        "~channel": "facebook",
        "~creation_source": 3,
        "~feature": "sharing",
        "~id": 429691043152332059,
        "~referring_link": "https://example.app.link/X7OsnWv9TF",
        "~stage": "new person",
        "~tags": [
        "one",
        "two"
        ]
        }
        }
```

### Callback values

Additional properties read from the `initSession` within your app and [website](web-sdk-overview.md) integrations.

| Key | Usage |
| --- | --- |
| `~id` | Automatically generated 18 digit ID number for the link that drove the install/open, if present (0 for dynamic and 3P links). |
| `~referring_link` | The referring link that drove the install/open, if present. |
| `~creation_source` | Where the link was created (`0` API , `1` Short Link, `2` SDK, `3` iOS SDK , `4` Android SDK , `5` Web SDK, `6` Dynamic, `7` Third party). |
| `+match_guaranteed` | If the match was made with 100% accuracy. |
| `+referrer` | The referrer for the link click, if a link was clicked. |
| `+is_first_session` | `true` if first session (install), `false` if any other session (open) or if it did not previously exist in the Branch Link Graph.  Default is `false`. |
| `+clicked_branch_link` | Whether or not the user clicked a Branch link that triggered this session.  Default is `false`. |
| `+non_branch_link` | App was opened from a non Branch link (third party, invalid Branch deep link, or Branch key mismatch). |

## FAQs

### Short Links

<details>
<summary>Why are some Short Link thumbnails not shown in WhatsApp?</summary>

The most common issue with Short Links not rendering thumbnail previews in WhatsApp is the image file size being too large. Although Facebook supports the display of Open Graph images [up to 8 MB](https://developers.facebook.com/docs/sharing/webmasters/images/#images-in-link-shares) in size, their WhatsApp product appears to have different, undocumented size limitations. We've seen that WhatsApp generally displays thumbnail previews for images up to 300 KB.

If your image file is larger than 300 KB, try reducing the image file size by adjusting your image dimensions or compression settings.

</details>

<details>
<summary>Can I see the stats for links created using the API or SDK in Branch?</summary>

Viewing Individual Link level stats for API/SDK created links is currently not available. Aggregate Stats can be observed in Branch by filtering with link analytics tags.

</details>

<details>
<summary>Why aren’t my Short Links showing up in Branch?</summary>

The Short Links section in Branch shows links that were generated in Branch. API/SDK-generated links are not visible in Branch.

If the Short Link you are looking for does not appear in Branch, it’s possible that the link wasn’t fetched in the first search. You will have to click on “Load More” at the bottom of the page, you should then be able to see the link pop up if it still exists.

</details>

<details>
<summary>Why is my Short Link redirection not working as expected?</summary>

If the Short Link redirection is not working as expected, we recommend trying to debug the link first to see if it is set up correctly.

1. To debug a Short Link, you can go to **Short Link** > **Select a link** and click on the ellipses, then click **Debug**.
2. On the Debug page, check the **Link Details** and the **Link Routing Debugger** section.

You can also debug a link by adding debug=1 at the end of the link as a query parameter. For example: [https://branchster.app.link/share-with-friends7\*\*?debug=1](https://branchster.app.link/share-with-friends7**?debug=1)

</details>

<details>
<summary>How can I create a Short Link for Snapchat?</summary>

Snap won't let you attach redirecting links to stories. The following workaround disables the redirects until you get the link attached, and then re-enables them after you create your story.

1. Create your Short Link to be attached to your Snap story.
2. On the Configure Options section, do the following:

   1. Add the key $always\_deeplink, and the value of false in the **Deep Linking** tab.
   2. Enable a Deepview on the iOS platform in the **Redirects** tab.
3. Attach this link to your Snap story.
4. Come back and edit the Short Link to:

   1. Delete the $always\_deeplink key/value from the **Deep Linking** tab.
   2. Remove the Deepview on iOS in the **Redirects** tab.

</details>

<details>
<summary>Does a Branch-generated QR code have an expiration date?</summary>

No, QR codes do not have an expiration date. The QR code has a Short Link behind it. As long as the Short Link is active, the QR code will continue to work. Short Links will always be active if not deleted or archived. However, if you change the link domain (\*\*\*.[app.link](http://app.link)) of your Branch app, all Short Links and the QR codes created with the old domain will stop working.

</details>

<details>
<summary>Why do I have to click on 'Load More' to find my link when searching Short Links?</summary>

The dashboard only loads the last 500 Short Links. If the link that you are searching for is not part of these 500 links, click 'Load More' in order to continue searching.

You can also load the Short Link directly, by going to the following URL with the corresponding Short Link ID appended to the end.

https://dashboard.branch.io/quick-links/qlc/config/[Short Link ID]

</details>

<details>
<summary>Are the number of 'Opens' included in the number of 'Installs' reported in Branch?</summary>

Opens are not included in installs. If a user who already has the app clicks on the link and opens the app, it is counted as an open. If the app is not installed, the user is taken to the app/play store to install the app. The first time they open the app after the install is counted as an install.

</details>

<details>
<summary>Can updating the Social Media Descriptors affect an app’s ranking in app store searches?</summary>

Updating the Social Media descriptors will only change the Image and description associated with the link, will not have any impact on the app's search ranking.

These values will be updated next time the link is scrapped by the respective platform.

</details>

<details>
<summary>Does Branch over-write UTM parameters if they are already detected in a link?</summary>

When you use Branch links for redirecting users to a web URL, Branch automatically passes through any values from the following Branch link analytics tags as UTM parameters [~campaign -> utm\_campaign, ~channel -> utm\_source, ~feature -> utm\_medium]. However, If these UTM parameters are already detected on the URLs being redirected to, Branch will not overwrite them unless you have disabled the 'Analytics mapping with UTM' setting on your Branch dashboard, which is already enabled by default

To view this setting, navigate to **Configuration** > **Advanced Settings** in Branch.

</details>

<details>
<summary>How long does it take for new images to appear on social media preview once updated?</summary>

Branch will update the link 'og' parameters immediately after it is updated. However how the social media descriptors show up on a platform are controlled by the platform. Different platforms handle these links in different ways, the platform might scrape the link everytime it is shared and the image might get refreshed immediately. However in most cases the link is not scraped regularly hence you might see a time lag before the image is updated for the link. If you are sharing on Facebook owned platforms you can manually scrape the link by visiting <https://developers.facebook.com/tools/debug/>

Please note that the `$og_image_url` social preview feature is reserved for paid Branch accounts with a dedicated contract. If you do not have a paid Branch account, you will not see this feature in Branch.

</details>

<details>
<summary>Why am I unable to find my link in the Short Links Section?</summary>

Branch only shows you the last 500 Short Links created. You can access the next 500 Short Links by clicking on **Load More** at the end of the list.

Alternatively you can directly open the Short Link by navigating to the Short Link appended by the following parameters on a browser where you are signed in to Branch.

- To edit the link append ?edit=1
- To view stats append ?stats=1
- To debug the link append ?debug=1

For example, if you want to edit <https://example.app.link/testlink>, try opening <https://example.app.link/testlink?edit=1>.

</details>

<details>
<summary>How are Short Links different from Ad Links?</summary>

#### Functionality

Functionally, Short Links and Ad Links work the same -- they both attribute in the same fashion (outside of the iOS ATT restrictions -- Short Links are “owned” links so these can still attribute downstream data) and route users in the same way to the destinations set up on the links.

[Ad Links](https://help.branch.io/v1/docs/ad-links) are primarily designed for working with ad partners, so they’ll include a $3p value that designates the specific ad partner, and for integrated partners, they’ll include a much longer URL string that includes macros for the partner to pass through dynamic values like campaign name, etc. Additionally, Ad Links will automatically implement ATT-compliant behavior on iOS. [This is not the case for Short Links](https://help.branch.io/faq/docs/how-do-we-configure-a-non-ads-link-to-use-branchs-att-compliant-behavior).

[Short Links](https://help.branch.io/v1/docs/create-quick-links) are for “owned” placements (non-paid-ads use cases in general) and cases where the link may be visible, and Ad Links are designed for paid ads where users aren’t expected to see the link itself as well as where dynamic data is expected to be passed.

For a list of what Branch Link to use for a specific use case, see below:

| Branch Link | Use Cases |
| --- | --- |
| Short Link | - Quick QR Code generator (via Branch Dashboard). - Custom Vanity/Alias Link. ex. `branchster.app.link/discount2022``df` |
| Ad Link | Ad Partner Campaign. ex. Facebook Ad Link: `https://branchster.app.link/J9g9yuoTPqb?%243p=a_facebook&%24deeplink_no_attribution=true` |

#### Access

Branch Ad Link creation is included in our Performance Essentials [product tier](https://help.branch.io/docs/products), while access to the [Short Links API](https://help.branch.io/v1-api/apidocs/quick-links-api) is limited to Engagement Pro customers.

</details>

<details>
<summary>Is there a way to split clicks and events for a link between a direct click and a QR code scan?</summary>

It is not possible to differentiate between a direct click and a click through QR code scan as-is, however you can track direct clicks vs. scans by modifying the link for one (or both) mediums by using Analytics Tags.

For example, if your Short Link is <https://example.app.link/test>, you can publish the link with the tag noQR to see metrics between direct clicks and QR code scanned clicks: <https://example.app.link/test?~tags=noQR>

</details>

### Troubleshooting deep links

<details>
<summary>Can I deep link from another app into my app?</summary>

Yes, you can link from another app into your app, and only your app needs the Branch SDK integrated.

There are 3 ways to embed links:

1. Embed Short Link from the target app’s dashboard.
2. Use the Deep Linking API to create a link with the target app’s API key, making sure to send your API request early enough to account for response time.
3. Programmatically build the link as a `String`, starting with target app’s domain (i.e. <https://example.app.link>), and append deep link keys as encoded query parameters.

Then, to execute in-app clicks:

**For iOS**

Call `UIApplication.shared.open()` on the link

**For Android**

Insert link into an Intent:

```
Intent intent = new Intent(Intent.ACTION_VIEW); intent.setData(Uri.parse(yourUrl));
startActivity(intent);
```

</details>

<details>
<summary>Why do my deep links not open my app?</summary>

- Make sure you are clicking on a deep link (e.g. <https://example.app.link/fzmLEhobLD>)
- Make sure you are not pasting a deep link in the address bar (in most cases, deep links must be clicked on)
- Make sure the deep link is not wrapped (e.g. <https://bit.ly/2yz3b8D> instead of <https://example.app.link/fzmLEhobLD>)
- Make sure you have configured your Branch and your app
- Make sure the Branch key in your app matches the Branch key [in your deep link](https://help.branch.io/v1/docs/creating-a-deep-link#view-deep-link-data)
- Make sure you have not [disabled universal linking on iOS](https://help.branch.io/developers-hub/docs/ios-troubleshooting#re-enable-universal-linking)
- Make sure you understand the [expected behavior of deep links](https://help.branch.io/v1/docs/creating-a-deep-link#default-link-behavior)
- Make sure the deep link domain matches your [link domain](https://dashboard.branch.io/link-settings) (e.g. link domain = [example.app.link](http://example.app.link), deep link = <https://example.app.link/fzmLEhobLD>)

</details>

<details>
<summary>How do I view deep link data?</summary>

Add `?debug=1` to the end of your deep link.

For example: <https://example.app.link/aQXXDHaxKF?debug=1>

</details>

<details>
<summary>How do I view deep link stats?</summary>

Add `?stats=1` to the end of your deep link.

For example: <https://example.app.link/aQXXDHaxKF?stats=1>

</details>

<details>
<summary>How do I deep link effectively in China?</summary>

We have found that our links don’t work with some Chinese ISPs. Here’s a list of the ones we have tested:

- China Mobile: Works as expected
- Chine Net: Works as expected
- Great Wall: Timeout error, ERR\_TIMED\_OUT on link response

</details>

<details>
<summary>How do I use Branch links in Snapchat Stories on iOS?</summary>

Snap won't let you attach redirecting links to stories. The following work around disables the redirects until you get the link attached, and then re-enables them after you create your story.

1. Create your Short Link to be attached to your Snap story
2. On the Configure Options section, do the following:

   1. Add the key `$always_deeplink`, and the value of `false` in the Deep Linking tab
   2. Enable a Deepview on the iOS platform in the Redirects tab
3. Attach this link to your Snap story
4. Come back and edit the Short Link to:

   1. Delete the `$always_deeplink` key/value from the Deep Linking tab
   2. Remove the Deepview on iOS in the Redirects tab

</details>

<details>
<summary>How do I fix the following error: “URL doesn’t pass security test”?</summary>

The error message, “URL doesn’t pass security tests,” can show up when the link that you are trying to use as a redirection URL does not match the redirection allowlist set for your app. For example, Branch can create custom allowlists where links created for your app can only redirect to \*.[example.com](http://example.com).

If you try to create a link that redirects to any other domain other than \*.[example.com](http://example.com), you will see this error message and the link will not be created.

You can update your redirection allowlist in Branch. Read our [Advanced Link Configuration](https://help.branch.io/docs/advanced-link-configuration#redirect-allowlist) article to learn how.

</details>

<details>
<summary>Why can’t access\_token and auth\_token be used as query parameters for long links?</summary>

`access_token` and `auth_token` (along with `AccessToken` and `AuthToken`) are [reserved keys](https://help.branch.io/v1/docs/creating-a-deep-link) used to determine if a deep link is a valid Branch link. Attempting to use these names as query parameters could yield unexpected results, so we don't allow their use in long URLs in order to prevent data collisions.

</details>

### NativeLink

<details>
<summary>Will NativeLink show for users with the app installed?</summary>

No, NativeLink should not show for users who have the app installed because the app should just open up automatically via Universal Link rather than going through the web redirect.

</details>

<details>
<summary>Will NativeLink override my existing Branch Deepviews?</summary>

No, by default it should not override the existing Branch Deepview.

The only scenario where it would override the existing Deepview is if you have "$ios\_nativelink"=true is set in the link parameters.

</details>
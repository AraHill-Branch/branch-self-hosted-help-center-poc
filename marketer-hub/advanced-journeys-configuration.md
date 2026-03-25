---
title: "Advanced Journeys Configuration"
slug: advanced-journeys-configuration
---

## Journeys & iOS Safari Banner Compatibility

If you have iOS Universal Links enabled on your main domain, you should see Apple's [Smart App Banners](https://developer.apple.com/documentation/webkit/promoting_apps_with_smart_app_banners) along with your Journeys banner. This can lead to customer confusion on which call to action to interact with to get to your mobile app.

In order to maximize conversion while maintaining full compatibility of Journeys and Universal Links, we recommend utilizing a **Floating Pill Button** for your Journeys campaign.

![882](/img/0660600-Floating_Pill_Safari.png "Floating Pill Safari.png")

## Journeys Website Redirect Options

You can configure your Journeys banner to redirect users to a website by doing the following:

#### Configure Your Redirect Keys

- `$android_url` - Controls where the journey sends Android users who do not have the app installed; otherwise, the user will be deep linked into the app if installed.
- `$ios_url` - Controls where the journey sends iOS users who do not have the app installed; otherwise, the user will be deep linked into the app if installed.
- `$fallback_url`  - Controls where the journey sends users who do not have the app installed; otherwise, the user will be deep linked into the app if installed.
- `$journeys_cta` - Controls where the journey link will redirect to.

  - User is redirected to the provided location regardless of whether or not they have the app installed.

    - For example, redirect all Journeys clicks to mobile web OR deep link users to a different app for cross-promotion.
  - This key overrides all others.
  - **NOTE**: Removes the ability to track Journeys click-through rates, as the customer's link will be used for the CTA. Branch will not get clicks, and thus it will not be able to attribute installs, opens, or conversion events.

### Setup via Dashboard

When configuring your [Journeys Template](create-journey-banner-or-interstitial.md#2-configure-creatives):

- On the **VIEW EDITOR** tab, click the CTA button in the UI of the template you've chosen.
- Add key-value pairs in the **DEEP LINK DATA** section.
- Click **Save&Close**.

![](/img/5e74ae8-Screen_Shot_2020-10-08_at_9.47.49_AM.png "Screen Shot 2020-10-08 at 9.47.49 AM.png")

## Dynamic Journeys Layout Customization

You can customize the appearance of a Journey depending on which link referred to the web session. So, you can create a Branch Link with a set of defined keys and values that will change properties such as the title or images when the user is referred to your website from this link.

| **Link Data Key** | **Value** | **Example Value** |
| --- | --- | --- |
| `$journeys_button_get_has_app` | The call to action button when the app is currently installed | "Open App" |
| `$journeys_button_get_no_app` | The call to action button when the app is **not** currently installed | "Install App" |
| `$journeys_title` | The title or main text of your Journey | "Download Appsolutely today" |
| `$journeys_description` | This is the description or subtitle in the frame | "This app is disrupting apps" |
| `$journeys_icon_image_url` | The app icon displayed in the layout | "<https://mysite.com/image.png>" |

Note: Not all templates support all override keys. For example, the floating button does not support title, description, or icon image URL (Floating Pills will support the custom liquid tags detailed below). If a creative is to be rendered and the key you've specified does not exist, it is ignored.

## Custom Data

Send users into your app with a discount or promotional coupon code by adding deep link data to your Journey template. In the call-to-action editing step, assign your deep link data key value pairs. This could look something like:

![](/img/8e3de4b-Screenshot_2024-05-09_at_3.47.31_PM.png)
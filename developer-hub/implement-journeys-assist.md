---
title: "Journeys Assist Implementation"
slug: implement-journeys-assist
---

## Overview

Journeys Assist allows you to combine your powerful banners and interstitials from [Journeys](journeys-overview.md) with your mobile measurement capabilities of [Ads](ads-overview.md), [Email](branch-universal-email.md) and other Branch-powered channels to provide complete attribution of the user flow.

## How does it work?

**Same Session** (Enabled by default)

![](/img/1aaeed4-single_session4x.png "single_session@4x.png")

1. User lands on your mobile website and sees a banner or full-page interstitial promoting the mobile app coming from an ad, email interaction or other Branch powered channel.

   - User can come from an ad they interact with (click).
   - User can come from an email campaign (click).
2. User clicks the call to action to install the mobile app within the same session.
3. Once the user opens the app, conversions (including the install) that happen in the app, are attributed to the original Branch powered campaign the user interacted with.

**Multi Session**

![](/img/a7bad9a-multi-session4x.png "multi-session@4x.png")

1. User lands on your mobile website and sees a banner or full-page interstitial promoting the mobile app coming from an ad, email interaction or other Branch powered channel.

   - User can come from an ad they interact with (click).
   - User can come from an email campaign (click).
2. User drops off for some time and returns to the mobile website to see the Journeys banner/interstitial again.
3. User clicks the call to action to install the mobile app.
4. Once the user opens the app, conversions (including the install) that happen in the app, are attributed to the original Branch powered campaign the user interacted with.

## Prerequisites

In order to enable Journeys Assist, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Enabled Journeys for your Branch account.

   - Contact your Branch account manager or visit <https://branch.io/pricing>
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Implemented the Branch [Web SDK](web-sdk-overview.md) into your website.
5. Already running Journeys [banners/interstitials](create-journey-banner-or-interstitial.md).
6. Already running other Branch powered channels, like ad campaigns through your chosen [ad partner](ad-partners-list.md) and/or running email campaigns through your chosen [email partner](email-partners-list.md).

## Enabling Journeys Assist

### **Same Session**

This is enabled by default for all Journeys. If a user is driven to a mobile web session from a Branch powered channel and interacts with a Journey Banner within the same session, Branch will automatically bypass the Journey CTA link with the session's referring Branch Link.

### **Multi Session**

If you wish to support Journeys Assist across multiple mobile web sessions to credit referring Branch powered channels for longer durations, you must add two new parameters the web SDKs initialization options.

| Key | Value | Definition |
| --- | --- | --- |
| enableExtendedJourneysAssist | Boolean | Enable or Disable Multi Session Journeys Assist.  **Branch defaults to false** |
| extendedJourneysAssistExpiryTime | Timestamp | TTL value in milliseconds for the referring Branch Link.  **Branch recommends and defaults to 7 days** |

#### Opt-In to Journeys Assist Multi Session through Web SDK Initialization Options

Before the Branch SDK initializes, implement the following method:

```
var options = { 
  enableExtendedJourneysAssist: true, // enable or disable referring Branch link expiry for Journeys Assist
  extendedJourneysAssistExpiryTime : 5000 // TTL value in milliseconds for the referring Branch link. Defaults to 7 days
};
branch.init('key_live_YOUR_KEY_GOES_HERE', options, function(err, data) {
  console.log(err, data);
});
```

## Disabling Journeys Assist

If you wish to disable the default Same Session Journeys Assist support and have Journeys always claim attribution for post CTA click conversions, you can do so through the following two ways:

#### 1. Add `make_new_link:true` to your Journey View Deep Link Data

![](/img/feaa73c-Screen_Shot_2023-03-02_at_9.11.19_AM.png "Screen Shot 2023-03-02 at 9.11.19 AM.png")

#### 2. Add `make_new_link:true` to the web SDK initialization options

```
var options = { 
  make_new_link: true
};
branch.init('key_live_YOUR_KEY_GOES_HERE', options, function(err, data) {
  console.log(err, data);
});
```

## View Analytics

After enabling Journeys Assist and as campaigns run, your ad/email campaigns should receive credit through Journeys installs and other conversions. To do this, we can apply the add the `~tags` filter for your respective campaign. With this, you can view which Journeys campaign drove the ad/email conversion.

|  | Key | Value |
| --- | --- | --- |
| Dashboard Report Filter | tags | The view/creative name of your Journeys campaign. |
| Exports Key | Last Attributed Touch Data Tilde Journey Name | The view/creative name of your Journeys campaign. |

## FAQ

<details>
<summary>Does Journeys Assist work with all types of ad networks?</summary>

Journeys Assist only works with ad networks where a Branch Link is used for redirection. In other words, ad networks that solely rely on an MMP API connection to function will not utilize Journeys Assist.

</details>
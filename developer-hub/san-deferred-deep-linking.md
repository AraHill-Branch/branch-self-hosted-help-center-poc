---
title: "SAN API-Driven Deferred Deep Linking"
slug: san-deferred-deep-linking
---

## Overview

When a Branch SDK initializes within an app, it calls out to Branch and gets back deep link data. This historically has excluded data from Self-Attributing Networks (SANs), making it difficult to implement deferred deep linking (DDL).

With SAN API-Driven DDL, Branch actually returns SAN ad data as deep link data on new installs or reinstalls (**not** opens).

### SAN support

The following SANs are supported:

- Google
- Meta

::: warning Warning
On iOS, SAN Deferred Deep Linking will **only** work after the user opts-in to sharing their device data through [Apple's AppTrackingTransparency framework](https://developer.apple.com/app-store/user-privacy-and-data-use/). This also means that there will be a delay due to the nature of the 2nd install event only occurring after a paid-attributed opt-in. For additional information on changes post iOS 14.5, visit our [FAQ Pages](ios-14-faqs.md).
:::

## Enable SAN API-Driven DDL

To use SAN API-Driven DDL, update the account settings for the ad partner you want it enabled for:

1. Go to Branch, and navigate to **Configure > Ad Partners**.
2. Search for and select the ad partner you want to enable SAN DDL for.
3. On the **Account Settings** tab for that ad partner, turn the **Enable SAN API-Driven Deferred Deep Linking** toggle on.

**Important notes**:

- If you were already using SAN DDL prior to the toggle feature, that SAN has been automatically enabled. No manual action is required.
- If the toggle is not enabled, SAN API DDL will not return data, but other DDL methods (such as Instant Experience for Meta) are still supported independently.

## View SAN deep link data

The fields available for routing will differ depending on the SAN. Below is a breakdown of what to expect from each supported network.

#### Data availability

**Important**: We will only return the information we get back from the SAN, which does not include any Branch Link control parameters (such as `$ios_url` or `$android_deeplink_path`) or attribution fields (such as `~campaign` or `~channel`), because there is no Branch Link involved. Even if you include a Branch Ad Link in the ad, that link's data will not be returned as part of this feature.

### Google

For Google SAN DDL, the fields your app should use for routing are:

- `+from_google_ad` — Set to `true` when the install is attributed to a Google Ad. Use this as the primary signal to identify a Google SAN DDL response.
- `+non_branch_link` — Contains the deep link value passed from Google. This is the value your app should use to determine where to route the user.
- `+clicked_branch_link` — Will be `false` in these cases, since no Branch Link is involved.
- `+is_first_session` — Will be `true` for new installs.

#### Response

```
{
    "+from_google_ad": true,
    "+non_branch_link": "https://www.example.com/",
    "+clicked_branch_link": false,
    "+is_first_session": true
}
```

::: warning Warning
Previously, Google SAN DDL returned a full metadata dictionary with fields like `~campaign`, `~ad_set_name`, and `~ad_id`. The new simplified format shown above replaces that response. The legacy format has been deprecated because it caused double-counting of installs reported to Google.

If your app currently parses the old format, you will need to update your routing logic to use `+non_branch_link` and `+from_google_ad` instead. Please contact our [support team](submit-a-ticket.md) to coordinate a transition timeline.
:::

### Meta

There are two ways to implement deferred deep linking with Meta ads:

- **SAN API DDL:** Does not use a Branch Link and returns campaign-level data from Meta (e.g. campaign name, ad set ID). This approach works for **App Install campaigns**.

  - For more information, see the SAN API DDL response payload below.
- **Instant Experience DDL**: Uses a Branch Ad Link and returns full Branch Link data (e.g. `$deeplink_path`, `$canonical_url`). This approach works best for web-based campaigns driving app installs. It may also work for App Install campaigns, but introduces an additional interstitial step for users before the App Store page.

  - For more information, visit the [Meta Ads Deferred Deep Linking guide](facebook-ads-deferred-deep-linking.md).

#### Response

The SAN API DDL response includes campaign-level data returned from Meta. Your app can use these fields to determine routing. Notice that the deep link data is inside `data`:

```
{
    "session_id": "1111111111111111111",
    "identity_id": "000000000000000000",
    "link": "https://abc.app.link?%24identity_id=123456789123456789",
    "data": {
        "+is_first_session": true,
        "$3p": "a_facebook",
        "~advertising_partner_name": "Facebook",
        "+click_timestamp": 1557204842,
        "~secondary_publisher": "facebook",
        "~campaign": "Summer_Promo_2025",
        "~campaign_id": "22222333334444455555",
        "~ad_set_name": "US_Lookalike",
        "~ad_set_id": "6666777788889999",
        "~ad_name": "Video_Creative_A",
        "~ad_id": "0000111122223333",
        "~feature": "paid advertising",
        "~ad_objective_name": "APP_INSTALLS",
        "~channel": "Facebook"
    },
    "device_fingerprint_id": "333444555666777"
}
```

## FAQs

### General

<details>
<summary>Will my app get back Branch deep link data?</summary>

No. SAN API DDL returns data from the SAN, not from a Branch Link. You will not receive Branch Link control parameters such as `$ios_url`, `$android_deeplink_path`, or `$canonical_url`.

Even if you include a Branch Ad Link in the ad, that link's data will not be returned as part of this feature.

</details>

<details>
<summary>Do I need to update my app for SAN API DDL?</summary>

Not necessarily. You need to have the [toggle enabled](san-deferred-deep-linking.md#enable-san-apidriven-ddl), but no SDK update is required.

However, if you want to change your routing logic based on the new data coming back from SANs (e.g. show a specific in-app page for a specific campaign name), you will need to update your app code.

</details>

<details>
<summary>Will I get ad data from impressions or view-throughs?</summary>

No. SAN API DDL only returns click data (not view-through).

</details>

<details>
<summary>If there are multiple recent clicks from different sources, which deep link data will I receive?</summary>

You will receive the data from the most recent click, regardless of source.

</details>

<details>
<summary>Does SAN API DDL work for reinstalls or opens?</summary>

SAN API DDL works for new installs and reinstalls, but **not** for opens. Supporting opens would result in over-counting reinstalls and opens within partner reporting.

</details>

<details>
<summary>What happens if the toggle is not enabled?</summary>

If the **Enable SAN API-Driven Deferred Deep Linking** toggle is not enabled, SAN API DDL will not return data. Other DDL methods (such as Instant Experience for Meta) are still supported independently and are not affected by this toggle.

</details>

### Google

<details>
<summary>I'm using the old Google SAN DDL format with full metadata. Will this break?</summary>

The legacy format (which returned a full metadata dictionary with fields like `~campaign`, `~ad_set_name`, and `~ad_id`) has been deprecated and replaced with a new simplified format using `+non_branch_link` and `+from_google_ad`.

If your app currently parses the old format, you will need to update your routing logic. Please contact our [support team](submit-a-ticket.md) to coordinate a transition timeline.

</details>

### Meta

<details>
<summary>Should I use SAN API DDL or Instant Experience for Meta?</summary>

It depends on your campaign type and what data you need.

- **SAN API DDL**:Use this if you run App Install campaigns and need campaign-level data (e.g. campaign name, ad set ID) for routing.
- **Instant Experience DDL**: Use this if you run web-based campaigns and need full Branch Link data (e.g. `$deeplink_path`, `$canonical_url`) for routing.

Instant Experience may also work for App Install campaigns, but it introduces an additional interstitial step for users before the App Store page.

</details>

<details>
<summary>I'm already using Instant Experience for Meta DDL. Do I need to change anything?</summary>

No. Instant Experience DDL and SAN API DDL are independent features. Enabling SAN API DDL does not affect your existing Instant Experience implementation.

</details>
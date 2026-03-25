---
title: "Advertising Identifiers for Attribution"
slug: advertising-identifiers-for-attribution
---

## Overview

Branch supports the following advertising identifiers in Branch Links on click, install, and other event requests. When the same identifier is available on click and install, Branch can perform attribution by matching this value through Identifier Matching.

## Types of Identifiers

### iOS Identifiers

**Advertising Identifiers**

#### iOS IDFA

In the absence of a valid IDFA, and where permitted under Apple's policies on tracking, Branch automatically falls back to probabilistic modeling to perform attribution ([Predictive Modeling](predictive-modeling.md)), and automatically assigns its own install-level identifier for future measurement of these installs, not used for ad partner (3p) traffic. This is existing behavior, however, it does require that partners pass the Device IP and User Agent to be used for modeling decisions.

Apple introduced its Identifier for Advertisers (IDFA) with iOS 6.0 primarily through the ASIdentifierManager class in iOS, which provides apps with access to an identifier that you can use for serving advertisements, as well as a flag that indicates if a user has enabled the Limit Ad Tracking feature. The IDFA value is an alphanumeric string that is unique to each device, and uses an upper case-format with hyphens (for example, `AAAAAAAAA-BBBB-CCCC-1111-222222220000`).

- Branch log-level parameter: `user_data_idfa`
- Branch postback macro: `${(user_data.idfa)!}` and `<#if (user_data.limit_ad_tracking)! >0<#else>1`

If you’re using the `${(user_data.idfa)!}` macro in a postback URL, then you must specify the `<#if (user_data.limit_ad_tracking)! >0<#else>1` macro to indicate if the user has enabled the Limit Ad Tracking feature (where 0 is limited). Or if the user has enabled this feature, you can set the ios\_ad\_tracking\_disabled parameter to 1.

If your SDK implementation does not collect IDFA on install (first “app open” event) and with post-install/in-app events, then you cannot use it for attribution by matching the value specified on click with the value specified on install (or some other event).

### Android Identifiers

#### Google AAID

The [Google Advertising Identifier (AAID)](https://developer.android.com/google/play-services/id.html) is a unique, user-specific, and resettable ID for advertising provided by Google Play services, which exposes an API for accessing the advertising ID of the user as a string, in the universally unique identifier (UUID) format similar to `38400000-8cf0-11bd-b23e-10b96e40000d`.

- Branch log-level parameter: `user_data_aaid`
- Branch postback macro: `${(user_data.aaid)!}`

#### Android OAID

The Open Anonymous Device Identifier (OAID) is used for advertising purposes in place of the non-supported Google Advertising ID for specific device manufacturers. The Branch SDK collects OAID and uses it for attribution on clicks and impressions.

- Branch log-level parameter: `user_data_oaid`
- Branch postback macro: `${(user_data.oaid)!}`

#### Legacy & Other Identifiers

While we rely first and foremost on advertising identifiers for attribution, there are cases in which advertising identifiers are not available. This includes legacy versions that do not support advertising identifiers and users downloading from non-Google android app stores. If an advertising identifier is not available, we rely on the following device identifiers for attribution.

**Android ID**

The [ANDROID ID](http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID) for Android devices is a 64-bit number (as a hex string) that is randomly generated on the first boot of a device and typically remains constant for the lifetime of the device. This value is formatted as lower case.

- Branch log-level parameter: `user_data.android_id`
- Branch postback macro: `${(user_data.android_id)!}`

### Amazon Identifiers

#### Fire ID

The [Amazon Fire ID](https://www.developer.amazon.com/docs/policy-center/advertising-id.html) is a user-resettable, unique identifier that helps protect the privacy of the user. If you collect information about a user’s behavior to display interest-based ads, or to generate analytics, you must use the Advertising ID; no other identifier or tracking method may be used. Users can reset the Advertising ID or opt out of interest-based ads altogether.

- Branch log-level parameter: `user_data.aaid`
- Branch postback macro: `${(user_data.aaid)!}`

### Windows Phone Identifiers

#### Windows AID

The [Windows advertising identifier (AID)](http://msdn.microsoft.com/en-us/library/windows/apps/windows.system.userprofile.advertisingmanager.advertisingid.aspx) is a unique, user and device-specific, and resettable ID for advertising represented as an alphanumeric string formatted as upper case without colons (for example, `AAAAAABBBBCCCC111122222222222`). When the advertising ID feature is disabled, this value is an empty string.

- Branch log-level parameter: `user_data_windows_aid`
- Branch postback macro: `${(user_data.windows_aid)!}`

### User Identifiers

#### User ID

The user ID generated by app developers (advertisers) is the same ID of the user in their system. The user\_id only works with cross-promo internal campaigns because third-party advertising partners cannot access or replicate this value (as they can with the other Android or iOS identifiers mentioned previously).

- Branch log-level parameter: `user_data_developer_identity`
- Branch postback macro: `${(user_data.developer_identity)!}`
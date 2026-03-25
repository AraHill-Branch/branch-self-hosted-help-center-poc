---
title: "Google Ads Overview"
slug: google-ads
---

![](/img/291745e-google-branch-logo.png "google-branch-logo.png")

## Overview

Branch, as a Google App Attribution partner, offers advanced ad attribution analytics with Google Ads.

By combining Branch data with Google's self-attributing network (SAN) data, you can pinpoint the factors affecting user engagement and make informed decisions about app campaigns, leading to improved conversion rates.

## How does it work?

Branch integrates with Google Ads differently based on attribution methodology and campaign type:

#### Attribution via API

1. Branch connects with Google through a Mobile Measurement Partner (MMP) API Endpoint through account authentication in the Branch Dashboard.
2. Events are configured to send from Branch to Google.
3. Once campaigns are launched, users see an ad to download the app.
4. User installs the app and performs in-app events (ex. PURCHASE)

   - The Branch SDK captures the app install and downstream events.
5. Branch communicates with Google through the MMP API Endpoint and sends Google data about the conversion.
6. Google claims conversions by sending the click or impression campaign data that sourced it to Branch.
7. The Branch Dashboard will update reports for you to be able to compare and measure ad campaigns across platforms, ad set name, ad partner, etc.

#### Attribution via Branch Link

1. Branch connects to Google using a Branch Ad Link. The Branch Ad Link is used in web engagement campaigns.
2. User sees a web-based ad and:

   - If the app **is not installed**, get routed to the web
   - if the app **is installed**, get deep linked into the app

     - iOS Universal Links or Android App Links must be configured in the [*Final URL*](https://support.google.com/google-ads/answer/6273460?hl=en) field for the user to be redirected into the app. Branch Links can be configured in the Tracking Template field to enable attribution by Branch.
3. The Branch SDK captures conversion.
4. Google sends data to Branch through the use of the Branch Ad Link in the Tracking Template field.
5. The Branch Dashboard will update reports for you to be able to compare and measure ad campaigns across platforms, ad set name, ad partner, etc.

::: info Note
Google will claim in-app conversions via the MMP API Endpoint if Universal/App Links (deep linking from the search ad to the app). Branch then pulls in all the campaign information.
:::

## Campaign support

| Campaign type | Conversion support | Attribution framework | Deep linking support | Branch Link type | Branch Link placement |
| --- | --- | --- | --- | --- | --- |
| App Promotion (ACi) | Installs & In-App Events | via MMP API | - SAN deferred deep linking | N/A | N/A |
| App Promotion (ACe) | Opens & In-app Events | via MMP API | - Universal Links - App Links - URI Scheme | N/A | N/A |
| Display, Discovery, Video, Shopping | Opens & In-app Events | via Branch Link or MMP API | - Universal Links - App Links - URI Scheme | Display Ad Link | Campaign or Ad level tracking template (not in Final URL) |
| Search | Opens & In-app Events | via Branch Link or MMP API | - Universal Links - App Links - URI Scheme | Search Ad Link | Campaign or Ad level tracking template (not in Final URL) |
| Performance Max | Web Events & In-app Events | via Branch Link or MMP API | - Universal Links - App Links - URI Scheme | Display Ad Link | Campaign or Ad level tracking template |

Branch Ad Links are required for web event attribution. MMP API attribution is always considered for App events, even when Branch Ad Links are leveraged.

### Campaign identifiers

::: info Note
Please reach out to your Google Account Manager in order to **add your app to the gBraid allowlist support** and use the latest [Branch iOS SDK](ios-basic-integration.md).
:::

Google Ads has introduced several identifiers over time that are used for web-to-app attribution and attribution without device IDs.

|  | gBraid | GCLID (deeplink gclid) | GCLID (market\_referrer\_gclid) |
| --- | --- | --- | --- |
| **Definition** | An aggregate click URL parameter that is forwarded back to Google on conversion events on **iOS** 14.5+ users that have not opted into app tracking. | A unique click URL parameter used to identify the campaign and other attributes of the click associated with the ad for ad tracking and campaign attribution. | A unique click URL parameter that is sourced from Google Play referrer at the time of app install and used for **Android** users that have opted out of ads personalization. |
| **Operating System** | iOS Only | iOS & Android | Android Only |
| **Used for** | Re-engagements Only | Re-engagements Only | Installs Only |
| **Campaign Usage** | - Search - Shopping - Performance Max & iOS ACi - Display and Youtube | App Engagement via all Google Ads campaigns | App Install via all Google Ads campaigns |

When Branch receives these identifiers and sends them in Google Ads Postbacks, Google Ads can utilize these identifiers for campaign optimizations.

## Limitations

### iOS attribution

| Ad Type | Advertiser | | SKAN |
| --- | --- | --- | --- |
| Opt-In | Opt-Out |
| Web-Based | [PREM](branch-methodology-overview.md) Attribution | None | ✘ |
| ACi | [IDFA](advertising-identifiers-for-attribution.md) Attribution | None | ✔ |
| ACe | [IDFA](advertising-identifiers-for-attribution.md) Attribution | [GBRAID\*](google-ads.md#campaign-identifiers) | ✘ |

Due to changes in iOS policies, Google does not send iOS install attributions resulting from the following to any MMP:

- [Google Search channel/inventory](https://support.google.com/google-ads/answer/9382304?hl=en)
- YouTube channel/inventory  
   While you can still view these attributions in your Google Ads account, you cannot view them in the Branch Dashboard as these modeled conversions will not be shared with Branch.

For additional information on iOS 14 Impact on Google, visit the [iOS 14 FAQs](ios-14-faqs.md)

For additional information on SKAdNetwork, visit our [Google SKADNetwork guide](google-skadnetwork.md).

### Deep linking

Deep linking support varies based on [Campaign Type](google-ads.md#campaign-support).

For **App Install Campaigns**, Branch Links are not supported, and the only way to support deep linking is through Branch's [**SAN Deferred Deep Linking**](san-deferred-deep-linking.md) feature.

For **App Engagement Campaigns**, Branch Links are not supported, so your developers are required to set up [iOS Universal Links](ios-universal-links.md), [Android App Links](android-app-links.md), and/or custom [URI Scheme](in-app-routing.md) to enable deep linking to in-app experiences.

For **Web-based Ads**, in order to enable deep linking, iOS Universal Links and Android App Links need to be enabled for your domain (the same domain entered into the campaign's **Final URL** field).
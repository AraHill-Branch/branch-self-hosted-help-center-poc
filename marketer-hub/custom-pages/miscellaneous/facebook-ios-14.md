---
title: "Guide to Facebook Attribution Changes for iOS 14"
slug: facebook-ios-14
---

In January, Facebook provided an updated response on how they’ll be handling IDFA and attribution when Apple enforces the ATT framework in an upcoming iOS 14 release. Facebook’s guidance for app advertiser’s can be found [here](https://developers.facebook.com/blog/post/2021/01/19/actions-app-advertisers-developers/) and for web advertiser’s can be found [here](https://developers.facebook.com/blog/post/2020/12/16/preparing-partners-ios-14-mobile-web-advertising).

Branch customers running Mobile App Install (MAI) and App Event Optimization (AEO) campaigns on Facebook will need to update their Branch SDK (this was already required for SKAdNetwork compatibility) and Facebook SDK (if used). Advertisers will also need to take some Facebook-specific actions listed below, including setting up a new Facebook ad account for iOS 14.

Our current understanding is that Facebook's web attribution changes will not affect Branch or the use of Branch Links in web campaign types, but we are working with Facebook to understand the full impact of these changes.

Facebook is planning on making SKAN data available via the Ad Insights API soon. Before then, MMPs will not have visibility into this data for our mutual advertisers.

## Key Takeaways

**Facebook will ask users for tracking consent via the ATT prompt**

Apple’s iOS 14 will give apps the ability to ask users for tracking consent, including access to IDFAs. Although previously they had announced that they would not be using Apple's ATT framework, Facebook decided they will be asking users for tracking consent via the ATT prompt, meaning Facebook will also have access to user IDFAs within their family of apps (Facebook, WhatsApp, Instagram, Messenger).

**Facebook will use a Conversion Bit Schema to map SKAdNetwork conversion-values**

If the customer is using the Facebook SDK (or any other implementation option) for SKAdNetwork, the conversion value mapping will be configured using Facebook's Events Manager.

If using the Branch SDK for SKAdNetwork, Facebook will use a Branch-provided API endpoint to pull the customer's SKAdNetwork Conversion Bit Schema (the mapping of SKAN conversion-value events). As of late January, we are in the final stages of testing this new API with Facebook. Once tests are complete, FB and Branch will be able to start test campaigns with this new functionality with our mutual advertisers.

**Facebook will continue to provide support for Mobile App Install (MAI) and App Event Optimization (AEO) campaigns**

Advertisers should update their app for iOS 14 by using either a new version of the Facebook SDK, or an updated SDK from a compatible MMP.

The updated Facebook SDK (v8.1 or above) will also enable apps to send a flag to Facebook to restrict data use on a per-event basis. If advertisers decide not to send Facebook a flag indicating an iOS 14 event is opted-in for tracking, Facebook will restrict their use of that event. For advertisers relying on the Facebook SDK to send App Events, only the updated SDK version allows events from users on iOS 14 to be used for optimizing app ads.

For advertisers relying on the Branch SDK to send App Events to Facebook, Branch will use the value of the device's limited\_ad\_tracking parameter to determine whether events should be sent to Facebook. This parameter is set based on the user's response to the ATT prompt for that app.

## Facebook's Recommendations to Customers

- Update to the latest versions of the Facebook and/or Branch SDKs, depending on which SDKs an advertiser has integrated into their app:

  1. **Only the updated Facebook SDK**: Facebook can provide both MAI and AEO campaigns.
  2. **Both updated Facebook SDK + Branch SDK**: Facebook can provide MAI and AEO campaigns as long as events are funneled through the FB SDK.
  3. **Only the Branch SDK**: MAI and AEO campaigns will be enabled once Branch completes testing of Facebook's new Conversion Bit Schema (sending a JSON mapping of conversion values/events to an API).
- Plan to operate all iOS 14 campaigns using:

  - 1 Ad Account
  - 9 Campaigns
  - 5 Ad Sets
- Implement the new “Advertiser Tracking Enabled” flag to enable matching for people using iOS 14.

  - For events collected via the Branch SDK, this flag is controlled by the value of the device's limited\_ad\_tracking parameter. This parameter is set based on the user's response to the ATT prompt for that app.

### FAQs

[Facebook iOS 14 FAQs](ios-14-faqs.md)
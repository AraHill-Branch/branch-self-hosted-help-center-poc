---
title: "Google & iOS 14 FAQ"
slug: google-ios-14-faq
---

<details>
<summary>What happens when a user installs an app, sees the ATT prompt, then deletes the app and reinstalls. Will they see the ATT prompt again?</summary>

For the latest on Google's iOS 14 plans, please see [this documentation page](google-ios14.md) and [this blog post](https://blog.branch.io/googles-ios-14-update-what-it-means-for-mobile-marketers/?_gl=1*1pb1ro3*_ga*MTE0MjE4NTYxLjE3NDIyOTA2MTE.*_ga_KSDD8Y11CT*MTc0MjI5MDYxMC4xLjEuMTc0MjMwMDg2MC42MC4wLjA.).

</details>

<details>
<summary>What does Google’s iOS 14 stance mean for Branch advertisers?</summary>

With Google both not asking for tracking consent and expanding their use of modeled conversions, Branch will essentially no longer be able to receive iOS attribution data from the Conversion API.

Google has indicated that they plan to begin sharing SKAdNetwork data with MMPs later in 2021, at which point we will be able to show this data along with your SKAdNetwork data from other ad networks.

If an advertiser is running a web campaign using a Branch tracking link, this should remain unaffected.

</details>

<details>
<summary>Do apps have to use the Firebase SDK for Google’s SKAN support?</summary>

No. While the Firebase SDK is one option advertisers can use to implement the SKAN methods necessary for Google's iOS 14 campaign measurement, apps can continue to use another third party (including the Branch SDK) for that functionality.

</details>

<details>
<summary>Why is ACe called out specifically as being significantly impacted?</summary>

The SKAdNetwork framework is meant for acquisition (app install) campaigns. Therefore reengagement campaigns are not supported in this attribution model.

</details>

<details>
<summary>Why will tROAS campaigns no longer be an option on iOS?</summary>

SKAdNetwork provides significantly less data for optimization, and it's likely that Google could not find a way to implement tROAS behavior within the limitations of this framework.

</details>

<details>
<summary>Can Branch Links still be used in Google ad campaigns?</summary>

If an advertiser is running a web-based Google campaign using a Branch tracking link, we believe this should remain unaffected (provided that the advertiser app receives user opt-in via the ATT framework for any in-app measurement).

</details>

<details>
<summary>What’s the difference between Google’s ‘modeled conversions’ and Branch’s Predictive Modeling?</summary>

Even though Google's '[modeled conversions](https://support.google.com/google-ads/answer/10081327)' and Branch's Predictive Modeling (PREM) might sound similar, they're totally different under the surface.

Branch's PREM system watches events (ad clicks + app installs) to try to identify specific matches for the purpose of attribution. We need event metadata (i.e., IP address, user agent) to do that, which requires user opt-in under Apple's ATT policy when used for the purpose of ad attribution.

Google's modeling doesn't need any of that data.

</details>

<details>
<summary>Will Google show the ATT prompt and provide device-level data for users that opt in?</summary>

Google will *not* show the AppTrackingTransparency prompt in their own apps, but will show it in certain scenarios for AdMob inventory.

This means that while their existing MMP API endpoint will continue to return device-level data *in addition* to SKAdNetwork if the user opts in on both ends, volume will likely be extremely low.

</details>

<details>
<summary>Does Branch support in-app conversion postbacks to ads via GBRAID?</summary>

Yes, Branch supports Google's new `gbraid` URL parameter for privacy-compliant conversion Postbacks.

Google currently requires apps to be individually approved — please reach out to your Google Account Manager to request allowlisting.

</details>

<details>
<summary>Is there currently any way to access SKAdNetwork data for Google campaigns?</summary>

While SKAdNetwork data is not currently available to MMPs via API, Google Account Managers have the ability to generate limited SKAdNetwork reports for their clients. We recommend reaching out to your Google contact for more information.

</details>

<details>
<summary>How will DoubleClick and DV360 campaigns be measured after ATT enforcement?</summary>

Google is still exploring reporting options for DoubleClick and DV360 campaigns after AppTrackingTransparency goes into effect.

</details>
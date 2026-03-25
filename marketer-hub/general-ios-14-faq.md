---
title: "General iOS 14 FAQ"
slug: general-ios-14-faq
---

<details>
<summary>Why is Apple blocking device-level attribution in iOS 14?</summary>

The public justification is to improve user privacy. Apple has indicated that they want to crack down on an entire 'dirty data industry' that looks to track and target users for paid advertising purposes without OS-level consent.

Since the IDFA was a resettable ID that all apps could read and recognize, it could be used as a central key to compile user profiles associated with other, potentially more personally identifying data. Apple might believe that since they created and supported the IDFA, they were partially responsible for enabling unscrupulous companies to do this.

![9f54d6e-Screen_Shot_2021-02-21_at_13.35.41.png](/img/9f54d6e-Screen_Shot_2021-02-21_at_13.35.41.png)

By blocking access to this ID, and enforcing policy guidelines to prevent any technically-equivalent alternatives, Apple can wipe its hands clean and move on, while also getting great press coverage for protecting user privacy — use of the device-level matching for responsible marketing (including the mobile attribution industry) is simply collateral damage.

</details>

<details>
<summary>What led Branch to change position in January 2021 on the use of the App Tracking Transparency framework?</summary>

Branch’s original stance was based on the understanding that brands would still be allowed to establish direct relationships with their own end users, based on user agreements and their terms of service that were in compliance with local laws and regulatory guidelines. These relationships would legitimately grant an advertiser consent to track via methods other than the IDFA.

The updated guidance from Apple in January, 2021 is counter to our previous expectations that companies would be able to acquire consent via any legally acceptable mechanism, including, but not limited to, Apple’s ATT framework. Apple has now made it explicit: apps that do not comply with the letter of their rules will be ejected from the App Store. That is a risk we are not willing to expose our customers to.

We recognized there was an outside chance of this potential outcome as Apple continued to iterate on messaging, and built product functionality that fully supports compliance with the new Apple requirements. This will enable continued support of our customers with ad attribution via our SKAN dashboard, and enhanced device-level matching for paid media only after a user has specifically consented via the ATT prompt.

</details>

<details>
<summary>Will Google do the same thing on Android by removing the GAID?</summary>

We think this is likely to happen at some point. Because Google has such such extensive interaction directly with end users, they're in the unique position of having platform-wide visibility on Android without relying on GAIDs, it's in their best long-term business interest to get rid of it. Now that Apple has broken the ice, and provided the rationale of privacy for doing so, Google has no reason not to do the same thing.

This means that the mobile industry should prepare for a future in which there are no persistent, platform-wide identifiers. For now, Branch will continue using GAIDs because this provides the most accurate measurement. If and when Google removes GAIDs or takes a similar regulatory approach to Apple, our iOS compliance paradigm and predictive modeling algorithm will be ready to fill in the gap.

</details>

<details>
<summary>Why do we still beed an MMP?</summary>

While some of the mechanisms have changed, the role of the MMP stays exactly the same: provide unbiased measurement that allows you to make actionable decisions. Branch's proposed solution supports SKAdNetwork while also preserving the data needed for device-level attribution on organic channels and a cohesive view of all results across iOS/Android/web/OTT.

In addition to providing neutral, third-party verification on SKAN-reported results from your active ad networks, Branch also offers the following value as an MMP partner:

**1. Deep linking / deferred deep linking capabilities.**

It’s clear that Apple is only looking to crack down on advertising measurement, tracking, and audience use cases. Navigation and user-experience use cases are still supported and valid. In a world with more limitations on growth hacking strategies to optimize for app installs, there will be a core use case for (1) deferred deep linking to reduce friction in new user experiences and (2) direct deep linking from walled gardens that consistently routes acquired users back to the app for higher conversion rates and enhanced LTV.

**2. Support for Android device-level (until GAID goes away).**

We must not forget that Apple only owns a single platform, and Android still represents the vast majority of mobile devices. Things will continue as they were until Google indicates otherwise with GAID.

**3. Aggregate data ingestion, combination, calculation and access.**

As an MMP, Branch plugs into your media networks to ingset information on cost and performance, allowing easy manipulation and visualization of all campaigns in a single dashboard. The value of a service like this increases as spend becomes more fragmented and lets your UA team act independently, so you can quickly evaluate impact and iterate accordingly.

**4. Access to MMP-only data from Facebook**

Where users do approve the ATT from both Facebook and your app, Branch will continue to provide device-level data insights available only through Facebook MMPs that can help guide your targeting criteria, creative/copy optimization and bid structure, even where they do not reflect the full set of user data.

**5. Reporting and benchmarking multiple non-exclusive datasets**

Branch will provide analytics on the multiple non-mutually exclusive datasets (aggregate SKAN for paid media only, ATT-tracked device-level for advertising tracking only, device-level owned-channel without advertising tracking) that, when analyzed together, can provide unique insight around paid media efficacy, advertising incrementality, and paid + owned channel tandem strategies that increase the rate of SKAN-trackable conversion value achievement in the paradigm of SKAN’s 24-hour looping timer.

</details>

<details>
<summary>How do we structure our internal BI systems without IDFA?</summary>

Right now, most customers export Branch/MMP data to their own systems and run calculations that combine click/impression/app events based off of the IDFA that is registered in all of these events. That IDFA key will disappear with iOS 14, so many internal data systems (aggregate analytics, mix modeling, in-house MTA, replicating Branch reports in their own systems) will stop working because there's no common key across these events anymore.

Your degree of impact will depend on the percentage of your users who are on iOS (if you’re a Branch customer, you can easily generate a report [like this one](https://branch.link/NYW68ZwAD7) showing the breakdown of iOS/Android traffic), and how you may have been using IDFAs in your current business systems.

If you used IDFA for data stitching, identity resolution, or other analytics, you will need to change to an alternative identifier, such as the IDFV (user\_data\_idfv).

</details>

<details>
<summary>What’s the difference between device-level and aggregate data?</summary>

‘Device-level data’ means visibility into events performed by an individual device. This provides the most granular insight into campaign performance, and device-level data can be used for things like retargeting and multi-touch attribution (it also has obvious privacy implications if used unscrupulously).

‘Aggregate data’ is the functional equivalent of taking a spreadsheet of device-level data and running it through a pivot table. In most cases, this is actually what you *want to do* in order to make sense of the data. However, aggregation is an irreversible process: once you aggregate, you can't get the device-level data back again. And it can be very difficult to re-process the data into any other configuration.

![8d0edb3-Screen_Shot_2021-02-20_at_18.13.58.png](../../../assets/media/images/8d0edb3-Screen_Shot_2021-02-20_at_18.13.58.png?sv=2022-11-02&spr=https&st=2025-11-19T22:27:14Z&se=2025-11-19T22:38:14Z&sr=c&sp=r&sig=6/i/xWwhaFD2+X0tPeVUHD2+f5rASIu2qPvTQXP4lYU=)

With the justification of promoting user privacy, Apple's new SKAdNetwork system performs this aggregation inside Apple's black box, and then makes only the final results available for use.

Technically, SKAdNetwork Postbacks are not 'aggregate data' because each one corresponds to a single install. However, SKAdNetwork only provides data *at an aggregate level of detail*, even within the individual postbacks.

This means in a world where SKAdNetwork becomes universal for ad measurement on iOS, any attribution workflow that depends on device-level data will become impossible.

</details>

<details>
<summary>Do these privacy changes also impact tvOS, iPadOS, and macOS?</summary>

iPadOS and tvOS behave like iOS. On tvOS, there is a full screen prompt when you request permission for IDFA.

macOS has not returned an IDFA since macOS Mojave.

</details>

<details>
<summary>If we enable SKAdNetwork, do we lose IDFA visibility unless the user opts into being tracked via AppTrackingTransparency?</summary>

No, SKAdNetwork is a completely separate system that runs *in parallel* to the device-level data you've traditionally used to measure your ad campaigns.

In other words, SKAdNetwork and the usage of AppTrackingTransparency to get device-level ad insights are mutually exclusive. SKAdNetwork does not require opt-in under the ATT framework, and enabling SKAN in your app will not trigger the ATT modal or automatically limit your ability to access IDFAs (though you will likely want to consider both changes at the same time).

</details>
---
title: "Other Networks & iOS 14 FAQ"
slug: other-networks-ios-14-faq
---

<details>
<summary>What are Twitter’s plans for iOS 14 changes?</summary>

We're in close communication with the Twitter team. [They are supporting Apple's SKAdNetwork framework](https://business.twitter.com/en/blog/twitter-ios14-updates.html). Rather than forwarding Postbacks like many other networks, Twitter is sharing this data with MMPs (including Branch) via an aggregate API. This means we are able to ingest campaign results data, and continue providing aggregate reporting for your Twitter ads.

This data is available in the Branch dashboard as long as you have enabled and authenticated with Twitter in the Partner Management section of the dashboard and have authenticated your app for SKAdNetwork reporting; no additional action is needed for this data to start flowing.

</details>

<details>
<summary>Will Twitter show the ATT prompt and provide device-level data for users that opt in?</summary>

Twitter will show the AppTrackingTransparency prompt, and their existing MMP API endpoint will continue to return device-level data *in addition* to SKAdNetwork if the user opts in on both ends.

</details>

<details>
<summary>What are TikTok’s plans for iOS 14 changes?</summary>

TikTok will be relying primarily on SKAdNetwork for attribution, and will forward individual SKAN Postbacks to Branch. In addition, they will also show the ATT prompt to enable device-level attribution for opted-in users.

TikTok has published the following resources related to iOS 14:

- [iOS 14 Impact & Guidance Overview](https://ads.tiktok.com/help/article?aid=10000858)
- [New iOS 14 Product Experience in TikTok Ads Manager](https://ads.tiktok.com/help/article?aid=10001074)

</details>

<details>
<summary>What are Pinterest’s plans for iOS 14 changes?</summary>

Prior to Apple's updated policy lanuage in January 2021, Pinterest was not planning to support SKAdNetwork in the short term. They have not yet issued updated guidance.

</details>

<details>
<summary>Can ad networks still target ad campaigns using identifiers such as phone numbers, emails, names, etc.?</summary>

This depends on the ad network, and whether the data is available to them in a first-party context.

A walled garden network like Facebook will likely have no problem continuing to use their first-party data about their own end users to target ads. However, other networks that don't have their own store of first-party data for targeting won't have that option (for example, re-targeting campaigns where the audience was generated somewhere else and then imported into the network's system as a list of IDFAs).

</details>
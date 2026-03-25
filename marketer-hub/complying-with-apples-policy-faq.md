---
title: "Complying with Apple's Policy FAQ"
slug: complying-with-apples-policy-faq
---

<details>
<summary>Are owned channels under the scope of Apple’s new policy?</summary>

App Tracking Transparency policy does not apply to tracking of owned channels.

This is a broad industry consensus, supported by the language of the ATT prompt.

.png)

**Examples of Owned Channels:**

- Web-to-app flows (smart banners, etc.).
- Email marketing.
- Most offline-to-online (QR codes, etc.).

</details>

<details>
<summary>Are organic/earned channels under the scope of Apple’s new policy?</summary>

No, we believe organic and earned channels are not in scope for Apple's policies against 'tracking'. Apple repeatedly calls out 'ads' (29 different places on [the ATT policy page](https://developer.apple.com/app-store/user-privacy-and-data-use/)). Non-ad measurement is not mentioned, despite multiple updates since WWDC.

**Examples of Organic/Earned Channels:**

- Organic search.
- Non-paid social media.
- User-generated content sharing.

Also, it's relevant to note that SKAdNetwork (Apple's alternative attribution framework) *only* supports paid ads.

It's obviously possible that Apple might make additional policy changes, or update their guidance in future. If so, Branch will adjust as necessary to ensure compliance.

</details>

<details>
<summary>Will Apple further tighten their policy language to prohibit measurement of earned/owned channels?</summary>

Based on both the spirit and direct language of [Apple’s new guidance](https://blog.branch.io/attribution-on-ios-14-welcoming-apples-new-world-order/), it seems clear that organic/owned channels are not in scope. Apple’s iOS 14 guidance has been consistent since release in that it is explicit in addressing the focus on “advertising”, calling out the term in 29 different places in the “User Privacy and Data Use” developer guide.

This is also reflected in the presentation of the ATT modal itself, via the extremely specific language about tracking across apps and website owned by *other companies*:

.png)

Had Apple intended to restrict owned or organic-channel tracking, Apple easily could have used different language or taken the technical blocking route, as they did with IDFA approach, and restricted access to IDFV, making even multi-session context preservation impossible to the individual company without ATT consent.

As the sole arbiter of the Apple Developer Program License Agreement, Apple has the right to change guidance as they see fit. Given the granular nature of their latest update, we feel secure that if organic/owned channels were in scope of the iOS 14.5 release, Apple would have highlighted this change. We'll be watching carefully for any further clarifications from Apple, and will adjust our guidance if they provide additional information.

</details>

<details>
<summary>What counts as an ‘ad’ and ‘tracking’ under Apple’s policy language?</summary>

In addition to industry standard acceptance of clear distinctions in the intent, use and meaning of the terms “advertising” and “marketing” as separate terms of art (where advertising is a type of marketing but not all marketing is advertising), Apple has taken care to be specific in their consistent use of “advertising” while taking the necessary steps to provide granularity around the more ambiguous “tracking” in their updated guidance around iOS 14.5

Apple repeatedly refers to advertising in the context of advertising networks in their [“User Privacy and Data Use” documentation](https://developer.apple.com/app-store/user-privacy-and-data-use/), which indicates a common sense understanding of an “ad” as a third-party placement that seeks to drive user interaction with the advertiser on their separate platform.

Supplemental information in the FAQ section of the documentation, including the answer to “Can I use multiple advertising networks for the purposes of SKAdNetwork?” that states, “Contact your advertising networks of choice to understand whether they are integrated with SKAdNetwork” further indicate that a traditional understanding of “ads” as paid placements on “other companies’ apps, websites, or offline properties” as apple states in the opening paragraph of “Asking Permission to Track”.

The “Asking Permission to Track” provides a specific definition of tracking, specifically that, “Tracking refers to the act of linking user or device data collected from your app with user or device data collected from other companies’ apps, websites, or offline properties for targeted advertising or advertising measurement purposes. Tracking also refers to sharing user or device data with data brokers.”

</details>

<details>
<summary>Does Apple’s new tracking policy block deep linking?</summary>

Based on Apple's language on their [User Privacy and Data Use](https://developer.apple.com/app-store/user-privacy-and-data-use/) page, our understanding of the ATT policy is that it is specific to tracking, attribution, and targeting *for paid ads and data brokers*. This means that core app UX functionality (like deep linking) is not within the scope of the App Tracking Transparency policy, *except* in situations where an app attempts to abuse this functionality to work around other limitations of the ATT policy.

On April 19, 2021, Apple further reinforced this distinction around ad-related use cases via a new FAQ item on the User Privacy and Data Use page:

.png)

The wording of the question references 'deep linking' and 'deferred deep linking', and the answer makes it clear that the behavior Apple considers objectionable is using such functionality to *'…pass unique identifiers or create a shared identity of the user between applications from different companies for ad targeting, ad measurement or sharing with a data broker'.*

In other words, ATT prohibits utilizing deep linking technology for the purposes of working around the policy's restrictions on tracking paid ads and sharing data with data brokers. This is perfectly in line with the policy's other prohibitions (for example, on fingerprinting), and reflects Apple's goals of a) limiting the IDFA on iOS, and b) placing policy limitations on any method that could be used to bypass these IDFA limits.

Branch agrees with Apple's stance on this, and we're glad to see them make this move to keep deep linking focused on its original purpose: **creating great product experiences for users.**

In summary, Branch's understanding is that deep linking (including deferred deep linking) properly implemented for its intended purpose of user experience enhancement is still permitted on iOS 14.5+, whether the user opts in via ATT or not. We believe this is the case both when you build your deep linking implementation in-house, and when you legally establish a processor relationship with a vendor such as Branch.

</details>

<details>
<summary>Is tracking web-to-app ad conversions, such as affiliate networks, still allowed?</summary>

Apple has made it very clear that in order to transmit the necessary data (IDFAs or other metadata for probabilistic matching) from your app necessary for attribution of a specific user to an ad, you must gain consent via ATT.

This policy *also* applies to a publisher app sending that same data (IDFAs, or other metadata for probabilistic matching), but Apple considers publisher websites out of the scope of ATT.

That means that for app-to-app ads, the user has to consent via ATT in both apps. While there is no ATT equivalent on the web, the user still needs to opt in via ATT in the advertiser’s app in order to attribute a web-to-app ad conversion.

Unfortunately, since SKAdNetwork is not compatible with mobile web inventory, there is not currently an Apple-approved way to attribute a web-to-app conversion if a user does not opt in via ATT in the advertiser’s app. We're aware this is a major problem, and we're hoping Apple will clarify their intentions.

</details>

<details>
<summary>Why is it not possible to get attribution for web-to-app campaigns if the user does not opt in via ATT?</summary>

In order to get device-level ad data in an app, you need to get consent via the AppTrackingTransparency framework. For app-to-app campaigns, if there’s no consent, Apple has provided SKAdNetwork as the alternative attribution method.

However, for web-to-app campaigns, there is no alternative that is equivalent to SKAN. This means if the user does not consent in-app, then there’s currently no way of attributing that ad (either in aggregate, at a device-level).

</details>

<details>
<summary>Can’t we just use Branch tracking links in our ads and still get device-level data?</summary>

In accordance with Apple’s updated guidance on iOS 14.5, Branch has taken the position that we will not provide device-level attribution for paid advertising on iOS until a user has approved ATT. Hacking the Branch platform to circumvent our technical safeguards is a misuse of our technology that could put your app in violation of your Apple Developer Program License Agreement.

</details>

<details>
<summary>How are boosted organic links treated? Are they subject to the ATT prompt?</summary>

This is a question about the nuances of Apple's policy and how it applies to individual, app-specific implementation choices.

We'd advise that you consult with your team (and your legal/privacy counsel as needed) to determine whether you consider a boosted organic link to be an 'ad' as Apple defines it, and therefore subject to ATT restrictions.

</details>

<details>
<summary>For app-to-app deep linking, how can Apple know the difference between an organic post and a paid link?</summary>

At this point, no one outside of Apple is familiar with Apple's backend compliance systems and enforcement plans. This means it's impossible to say whether Apple plans to implement automated technical verification to support this new policy (and if so, how they plan to distinguish between organic and paid traffic as a technical matter).

Our position (that paid ads are the scope of Apple's policy, and owned/organic sources are not) is based on our best reading of [Apple policy](https://developer.apple.com/app-store/user-privacy-and-data-use/), but we would always advise checking with your own team/counsel as needed.

</details>

<details>
<summary>Does Apple’s new policy also apply to IDFVs?</summary>

It does not. IDFVs are still considered owned identifiers, and can't be used to track activity across apps because each vendor receives a unique value. This makes IDFVs an excellent choice for internal analytics systems.

However, if an app attempted to map IDFVs to other cross-company data, it would be considered 'tracking'.

</details>

<details>
<summary>What impact will this have on retargeting campaigns on iOS?</summary>

This will have a significant impact on retargeting providers. Web-based retargeting will still be possible (within the parameters of existing restrictions like ITP and user opt-in after install), but without IDFAs, we expect that in-app retargeting can no longer exist as it does today.

Additionally, SKAdNetwork does not support re-engagement conversions, so no attribution of any kind is possible if the user does not opt in via the ATT framework. We’re aware that this is a major gap: it’s clearly prohibited by the language of Apple’s ATT policy, and unfortunately not supported by any of Apple’s new functionality. We hope Apple will clarify their intentions here.

</details>

<details>
<summary>Can we send a user to mobile web from an ad and then pass through campaign data into the app via deep link?</summary>

While this may be technically possible, our understanding is that it would fall under the definition of 'ad tracking' from Apple's policy, and is therefore subject to ATT opt-in.

In other words, there is no restriction on sending a user to mobile web and capturing conversion data there, but attempting to pass that ad campaign conversion data through to the app without securing user opt in via ATT could put your app in violation of your Apple Developer Program License Agreement.

</details>

<details>
<summary>Can we use solutions like OneTrust to get user-level opt-in instead of ATT?</summary>

Unfortunately not. Apple's policy makes it clear that the *only* acceptable opt-in method for device-level ad measurement on iOS is the AppTrackingTransparency prompt.

</details>

<details>
<summary>iOS Browsers are technically apps. What’s stopping iOS browsers like Chrome from showing the ATT prompt?</summary>

Technically, nothing is stopping browser apps like Chrome from implementing the ATT prompt. It's not clear yet what Apple's position is on this (if they have one), but it is a valid question because one could certainly make the case that Apple might feel Safari itself is liable for any 'information leakage' that might take place as a user is browsing the web. Apple's Intelligent Tracking Prevention (ITP) is likely a nod in that direction.

</details>

<details>
<summary>Is ATT opt-in required for SKAdNetwork?</summary>

No, it is not necessary for users to opt in under AppTrackingTransparency for SKAdNetwork. This is addressed in [Apple's FAQ](https://developer.apple.com/app-store/user-privacy-and-data-use/):

.png)

</details>

<details>
<summary>What happens if users upgrade to iOS 14.5 but don’t update to the version of our app with SKAN/ATT until later? Will that cause a policy violation?</summary>

iOS 14.5 actually *blocks* access to the IDFA at a technical level, which means IDFAs won't be available until/unless the user opts in via the App Tracking Transparency popup. Simultaneously, Branch will make a server-side update to disable other device-level ad attribution methods for iOS 14.5, including for older versions of the Branch SDK.

In other words, you don't need to worry about any compliance issues under Apple's policy, even if your users do not update to the newest version of your app until long after they upgrade to iOS 14.5.

</details>

<details>
<summary>Is it a violation of Apple’s policy to use the Branch SDK without ATT opt-in?</summary>

No, it is not necessary to get user opt-in via the ATT policy in order to use Branch or load the Branch SDK.

There are numerous uses for UX and analytics tools (such as Branch) that do not fall within the scope of Apple's policies against tracking. Until/unless you receive ATT opt-in from a user, Branch helps you stay in compliance with the policy by not activating the functionality in our platform that provides device-level ad measurement.

For more details, please see:

- [What counts as an 'ad' and 'tracking' under Apple's policy language?](what-counts-as-an-ad-and-tracking-under-apples-policy-language.md)
- [Are owned channels under the scope of Apple's new policy?](are-owned-channels-under-the-scope-of-apples-new-policy.md)
- [Are organic/earned channels under the scope of Apple's new policy?](are-organic-channels-under-the-scope-of-apples-new-policy.md)
- [Does Apple's new tracking policy block deep linking?](does-this-new-policy-block-deep-linking.md)

</details>

<details>
<summary>How do I answer the App Store Connect Privacy Questions (“Nutrition Labels“)?</summary>

When selecting answers from the options presented in App Store Connect please keep in mind:

- Branch’s SDKs are fully configurable by you, both in the data we collect on your behalf and how you use that data. Accordingly, you should identify all possible data collections and uses, even if not outlined here or even if certain data will be collected and used only in limited situations.
- Your answers should follow the [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) and any applicable laws.
- You are solely responsible for keeping your responses accurate and up to date. If your practices change, update your responses in App Store Connect.

You can find a full list of data collected, used, and linked by Branch, [here](answering-the-app-store-connect-privacy-questions.md).

</details>
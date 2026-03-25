---
title: "AppTrackingTransparency FAQ"
slug: apptrackingtransparency-faq
---

<details>
<summary>Does the Branch SDK trigger the AppTrackingTransparency prompt?</summary>

The Branch SDK does not trigger the ATT modal. If you want to implement it, we have provided an example code snippet for how to invoke the `ATTrackingManager` class [here](ios-advanced-features.md#include-apples-attrackingmanager).

You may also refer to Apple's documentation [here](https://developer.apple.com/documentation/apptrackingtransparency).

</details>

<details>
<summary>Is implementing the AppTrackingTransparency prompt mandatory for use of Branch?</summary>

No, it is not necessary to implement the AppTrackingTransparency prompt in order to use Branch: there are many valid Branch use cases that do not fall within the scope of Apple's policies on 'tracking', including deep linking and measurement of owned/organic channels.

For more information, please see these FAQ items:

- [What counts as an 'ad' and 'tracking' under Apple's policy language?](what-counts-as-an-ad-and-tracking-under-apples-policy-language.md)
- [Are owned channels under the scope of Apple's new policy?](are-owned-channels-under-the-scope-of-apples-new-policy.md)
- [Are organic/earned channels under the scope of Apple's new policy?](are-organic-channels-under-the-scope-of-apples-new-policy.md)
- [Does Apple's new tracking policy block deep linking?](does-this-new-policy-block-deep-linking.md)

If you choose to show the ATT modal, you will simply continue receive device-level data from Branch for ad conversions when the user opts in on both ends.

</details>

<details>
<summary>What is Branch’s recommendation on implementing the AppTrackingTransparency prompt?</summary>

We published [a blog post](https://blog.branch.io/best-practices-user-opt-in-ios-14/?_gl=1*1f4n8yc*_ga*MTE0MjE4NTYxLjE3NDIyOTA2MTE.*_ga_KSDD8Y11CT*MTc0MjI5MDYxMC4xLjEuMTc0MjMwMDE4My4xNi4wLjA.) on this recently, but here are a few high-level thoughts:

Showing the ATT prompt clearly interrupts your app's user experience. That's why most companies we spoke to originally expected to forgo access to IDFA with iOS 14 in order to avoid that interruption. The revised January 2021 language from Apple likely means that the ATT prompt will become the “GDPR cookie banner” of 2021 for companies that want any degree of access to device-level ads attribution.

If Apple's latest guidance means you're newly re-considering that approach, the good news is that we have initial best practices data from a few sources:

- Data on efficacy from companies that *did* originally plan to use the prompt and have tested mock scenarios since September (with opt-in rates as high as 40%).
- Long-term learning from other permission prompts (think geolocation, push notifications, etc.).
- Visible testing approaches from companies with tremendous scale, [like Facebook](https://www.adexchanger.com/privacy/facebook-is-testing-a-new-in-app-screen-on-ios-14-to-convince-users-to-opt-into-tracking/).

First and foremost, go soft-prompt first. This means providing context about what the user is about to be asked right before you trigger the Apple-mandated modal. The “official” language can be a little scary from a user perspective, so providing a voiceover about *why* you’re about to ask for this permission is critical.

Our recommendation for the soft-prompt itself comes down to three core tenets:

- **Show value to the user.** Any company worth their salt wants the best experience for their users. How will approving this ask help your users? Could it include increased personalization, access to rewards, special benefits, or fewer ad interruptions? When a user can see how this will benefit them personally, you’re more likely to get their informed consent.
- **Consider the timing.** Onboarding is always a delicate process, so while getting approval for ATT is critical, consider when to best make the ask from a user perspective. Consider floating your modal after an early “success” that ties into the user value you plan to highlight.
- **A/B test with rigour.** Your paid media team has testing built into their DNA. Apply that mentality to the copy, creative, timing, and highlighted value prop that accompany your soft prompt. Work as a cross-functional marketing, product, and data team to guide your process.

So when should you start testing?

- Start testing your soft-prompt prior to iOS 14.5 with scoped audience segments. That way you can get a sense of what resonates best with new users from different install sources while IDFA is still available, and you can easily assess impact on down-funnel behavior
- Integrate the Apple modal whenever your dev team has time in the next month, but keep the actual modal behind a flipper until iOS 14.5 release. No need to reduce data availability before it’s necessary and if you trigger the modal today, IDFA will be zero’d out unless your user accepts ATT.

</details>

<details>
<summary>What code do I need to add to show the AppTrackingTransparency prompt?</summary>

We have provided an example code snippet for how to invoke the `ATTrackingManager` class [here](ios-advanced-features.md#include-apples-attrackingmanager).

You may also refer to Apple's documentation [here](https://developer.apple.com/documentation/apptrackingtransparency).

</details>

<details>
<summary>Can I choose when to show the AppTrackingTransparency model to the user?</summary>

Deciding if/when to prompt a user for tracking permission is completely up to the developer. The Branch SDK will not trigger the modal.

- If you do not implement the modal, IDFAs will not be collected and device-level ad data will not be available.
- If you implement the modal, any events that occur before permission is granted will not have IDFA values attached and will be attributed as organic. When the user opts in, Branch will trigger a *second install* event with the correct ad attribution data, and subsequent events will be correctly attributed to the ad (however, events prior to the opt-in will not be updated).

</details>

<details>
<summary>How can we optimize our AppTrackingTransparency opt-in rate?</summary>

We have published a blog post with ATT opt-in best practices [here](https://blog.branch.io/best-practices-user-opt-in-ios-14/?_gl=1*olpb2e*_ga*MTE0MjE4NTYxLjE3NDIyOTA2MTE.*_ga_KSDD8Y11CT*MTc0MjI5MDYxMC4xLjEuMTc0MjMwMDM4OS4yLjAuMA..).

</details>

<details>
<summary>What happens if we can’t/don’t want to show the ATT prompt?</summary>

Apple has taken a very strong position with the default language in the AppTrackingTransparency prompt. We understand that some companies may simply not feel comfortable showing this modal to users, even though it is for a completely legitimate and appropriate purpose.

If you choose not to show the ATT prompt, you'll see the following:

- Device-level ad attribution will no longer be possible for any users on iOS 14.5. Instead, you'll receive aggregate data via SKAdNetwork for app-to-app install campaigns (assuming your ad network has implemented SKAdNetwork) Attribution will not be possible for web-to-app ads, or for re-engagement ads.
- Attribution for owned/organic channels will continue to work as before.
- Deep linking will continue to function, including deferred deep linking and deep links in paid ads when supported by ad networks (device-level matching for the purpose of UX is not considered 'tracking' under Apple's policy)

</details>

<details>
<summary>What happens when users decline the ATT prompt?</summary>

When you show the ATT prompt and users decline it, the following will happen:

- Device-level ad attribution will not occur. You'll still receive aggregate data via SKAdNetwork for app-to-app install campaigns (assuming your ad network has implemented SKAdNetwork) Attribution will not be possible for web-to-app ads, or for re-engagement ads.
- Attribution for owned/organic channels will continue to work as before.
- Deep linking will continue to function, including deferred deep linking and deep links in paid ads when supported by ad networks (device-level matching for the purpose of UX is not considered 'tracking' under Apple's policy).

</details>

<details>
<summary>Is it possible to only surface the ATT prompt to users coming from paid ads?</summary>

No, unfortunately this isn't possible. In order to know IF a user is coming from a paid ad, by definition you need to have done some form of 'tracking them' (as defined by Apple's policy) first.

</details>

<details>
<summary>If the user declines the ATT prompt, can we send them to the Settings to change it later?</summary>

Yes, it is possible to link the user into the Settings page to change this the ATT setting, *if the user hasn't disabled tracking requests at the device level*. Apple even mentions this here: <https://developer.apple.com/app-store/user-privacy-and-data-use/>.

![1e6bf1b-image.png](/img/1e6bf1b-image.png)

It won't reset the prompt to show a second time, but the user can go there and manually change the toggle setting.

</details>

<details>
<summary>Does Apple have any restrictions on how/when we display the ATT prompt?</summary>

The Apple Human Interface Guidelines [contain specific instructions](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessing-user-data/#displaying-custom-messaging-before-the-alert) on what is allowed in 'pre-permission prompts', including visual examples of what is allowed/not allowed.

The short version is that the official ATT modal can only be displayed once, shouldn't contain anything resembling a mockup of the system prompt, and must not function as a custom prompt that could be shown multiple times to 'protect' against the user opting out.

![379f574-Screen_Shot_2021-02-22_at_10.56.10.png](/img/379f574-Screen_Shot_2021-02-22_at_10.56.10.png)

Also, once you implement the `ATTrackingManager` class in your app, Apple's reviewers expect to see the prompt and they appear to be rejecting any subsequent app updates that do not include the framework.

</details>

<details>
<summary>What happens when a user installs an app, sees the ATT prompt, then deletes the app and reinstalls. Will they see the ATT prompt again?</summary>

AppTrackingTransparency is like any other permission on iOS: it gets reset when the app is uninstalled. This means the user will be asked again after they reinstall.

</details>
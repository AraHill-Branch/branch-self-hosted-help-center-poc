---
title: "Household Measurement Overview"
slug: household-measurement
---

## Overview

![](/img/104de4ff57dfa6486d25573d6f673a38bcdf92101c420749b91cce6dc3d6d437-Screenshot_2024-09-25_at_3.50.18_PM(1).png)Users are spending more time with their connected TVs (CTVs) than ever before, making it an increasingly important part of any cross-platform growth strategy.

CTV refers to the **devices** themselves that enable streaming video over the internet, e.g. smart TVs, streaming devices, and gaming consoles.

If you want to tap into this growth, having an accurate attribution provider is essential to your ads strategy.

Branch's Household Measurement feature offers comprehensive attribution support for household devices, allowing you to measure down-funnel events. This gives you a holistic view of your users' actions and **the data you need to optimize your campaigns and your TV ad budgets**.

Read more about Household Measurement, the problem it's solving, and the benefits of the feature below.

## What is Household Measurement?

![](/img/3a0c68f4fe2ac46d4f1d4840bff2349af5853a860770ca505522849fa6f3ee9b-household-1(2).png)Branch's Household Measurement feature is able to track downstream conversions across multiple household devices, such as mobile phones, desktops, laptops, and tablets.

Household Measurement attributes TV ad engagements to downstream conversions on other devices, which gives you more precise performance tracking and enables you to justify your TV ad spend.

Importantly, Branch integrates with major CTV platforms and in doing so **covers over 95% of streaming worldwide**.

## Benefits

Let's take a quick tour of some of the key benefits of Household Measurement.

#### Easily Measure ROAS

Measure ad performance across various devices to accurately understand your return on ad spend.

#### Analyze Cross-Device Performance

Analyze and report on conversions across mobile, web, desktop, and living room devices - all with one solution.

#### De-duplicate Marketing Data

Ensure every customer touchpoint is only counted once, which provides an accurate view of campaign effectiveness.

#### Improve Retargeting Efforts

Improve retargeting efforts by sharing conversions with ad partners that they can't track on their own.

## Attribution Flows

Household Measurement supports three attribution flows. Learn about each below.

#### TV to TV

View-through and click-through attribution of TV ad engagements. Put differently, this measures **TV ad engagements to TV conversions**.

![](/img/29001e4eeed980095d07caadacb38eb40ce23c8be7f5a82760faa6c460e576f2-Screenshot_2024-09-25_at_2.54.47_PM(1).png)

#### TV to Web/Mobile

View-through attribution of TV ad impressions that lead to a conversion on web or mobile. Here we are measuring **TV ad engagements that lead to non-TV (web/mobile) ad engagements**.

![](/img/e648023df82e68658f44fb4f036143f05be4c76a21e4eb62d76a42c921849563-Screenshot_2024-09-25_at_2.56.18_PM(1).png)

#### Web/Mobile to TV

View-through of web or mobile ad impressions that lead to a TV conversion. This measures **non-TV (web/mobile) ad engagements to TV ad engagements**.

![](/img/ef79766811a5607ebe93bb0c337ddebbd96c3f00ecab7242a38adbcc4704b097-Screenshot_2024-09-25_at_2.57.21_PM(1).png)

## Use Cases

Let's dive into some examples of top use cases for Household Measurement, so you can start to see it in action.

#### Cross-Device Linking

Power sophisticated user experiences by leveraging Branch QR Codes to drive mobile app engagement from CTV, or to simplify the login process.

#### Display and Video Ads

Understand the influence your CTV ads have on downstream conversion events across mobile, web, and desktop devices.

#### Engagement Ads

Track which CTV ad impressions and clicks led to subsequent TV conversions.

#### Mobile Ads to CTV Streaming

Measure the effectiveness of your mobile ads by tracking how they drive user engagement on CTV streaming platforms.

#### Pre-Install Tracking

Measure app installs from apps packaged with your partner platforms.

## Support

The table below details which Household Measurement features are supported on which CTV platforms.

| Feature | Details | Roku | Amazon Fire TV | Apple TV | Android TV | Samsung TV | Xbox | LG | Panasonic |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Engagement and Install Ads | Understand which ad impressions and clicks drove installs. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pre-Install Tracking | Measure app installs from apps packaged with your partner platforms. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Session Counts | Measure daily installs, opens, and session length. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Deep Linking | Route users to in-app content directly from the ad. | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| App-to-App Activity | Measure user journeys to and from your various OTT apps. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Conversion Events | Attribute conversions back to the last ad seen or Branch Link clicked. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Partner Events | Forward activity from partners directly to Branch. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| GDPR Compliance | Ability to comply with GDPR requirements. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cross-Device Attribution | Capture mobile app conversions and events triggered by CTV ads on the same IP address. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Integration Guide

You can implement Household Measurement either through our **SDK or a Server-to-Server (S2S)** integration. Each of these has their own pros and cons, but Branch recommends an SDK integration when possible.

Work with your development team to determine which integration type is right for you using the table below.

| Capability | Details | Integration Recommendation |
| --- | --- | --- |
| Platform Specificities & Flexibility | Certain CTV platforms only support specific ways of implementation. | **S2S** might be required because some platforms do not have a Branch SDK to integrate.  S2S integration will work for all platforms. |
| Ease of Implementation | Utilize an implementation for session management, installs, and capturing device identifiers. | **SDK** is preferred because Branch will handle the session automatically, while S2S will require additional work to capture the necessary parameters in order to make the requests. |
| Long-Term Upkeep | With updates to platforms, keeping up with changes is necessary to comply with privacy or to add new features. | **SDK** is preferred because when there is a change to the platform, you would only need to update the SDK while you may have to change core logic in an S2S integration. |

Once you've decided on an integration type, see the guides below to get started.

| Integration Type | Supported Platforms |
| --- | --- |
| SDK | - [Roku](roku.md) - [Amazon Fire TV](android-sdk-overview.md) - [Android TV](android-sdk-overview.md) - [Apple TV](ios-sdk-overview.md) - Samsung TV, Xbox, LG, Panasonic via [Connected SDK](connected-sdk.md) |
| [S2S](desktop-over-the-top-ott-attribution.md) | All |
---
title: "PAM Data Reference"
slug: predictive-aggregate-measurement-data-reference
---

## Introduction

This technical reference shows the log-level data structures available when using Predictive Aggregate Measurement (PAM).

Whether you're a marketer evaluating what attribution data you'll have access to or a data analyst building custom reporting, these tables contain the information you need on the exact fields available in each scenario.

The tables in this reference illustrate the data that advertisers see in Branch reporting, as well as what ad networks receive in postbacks. They also show how enabling PAM for Advertisers and PAM for Publishers affects the data available to each party.

For a high-level overview of PAM and how to enable it, see our main [PAM documentation](predictive-aggregate-measurement.md).

## Attribution scenarios

The following tables compare what attribution data is available to advertisers and ad networks as you move from pre-ATT environments through various PAM configurations.

### Pre-ATT

This scenario assumes that a user either has not updated to iOS 14.5+ (pre-ATT), or they have gone through Apple's App Tracking Transparency (ATT) prompts and given consent to tracking in both the advertiser's app and the publisher's app where they saw the ad.

**Advertiser data**

| IDFA  (user data from SDK) | IDFV  (user data from SDK) | Device (aggregate data from SDK) | Platform  (aggregate data from SDK) | Country  (aggregate data from SDK) |
| --- | --- | --- | --- | --- |
| 11111 | 22222 | iPhone 15 | iOS | US |

**Publisher data**

| IDFA  (user data from link) | Campaign  (aggregate data from ad network) | Creative  (aggregate data from ad network) | Click ID  (user data from ad network) | IP Address  (user data from link) |
| --- | --- | --- | --- | --- |
| 11111 | Summer Blast | new\_user\_discount | 333333 | 444.44.444.44 |

In this case, all data is available. However, the majority of users opt out with ATT. The remaining examples in this guide focus on that scenario.

### Post-ATT with opt-out

All of the tables in this section are related to cases where a user has gone through the ATT prompts for an app and decided to opt out, which is the most common behavior.

The tables demonstrate the trade-offs in attribution data when the user has opted out:

- **Without PAM**:Minimal attribution data available.
- **With PAM for Advertisers only**:You gain predictive attribution insights in Branch, but limit what identifiers are shared with ad partners in postbacks.
- **With both PAM for Advertisers and Publishers:** Ad partners receive additional identifiers (like Click ID and IP Address) to optimize campaigns, but you may see fewer device-level identifiers in your own reporting.

#### Without PAM

In this case, the user has opted out of ATT and the advertiser has not enabled PAM. As a result, all of the data from the publisher side is lost, and the IDFA from the advertiser side is lost as well.

Again, it is important to remember that most users decide to opt out when presented with ATT prompts. Without PAM, significant attribution data is left out of reporting.

**Advertiser data**

| IDFA  (user data from SDK) | IDFV  (user data from SDK) | Device (aggregate data from SDK) | Platform  (aggregate data from SDK) | Country  (aggregate data from SDK) |
| --- | --- | --- | --- | --- |
| null | 22222 | iPhone 15 | iOS | US |

**Publisher data**

| IDFA  (user data from link) | Campaign  (aggregate data from ad network) | Creative  (aggregate data from ad network) | Click ID  (user data from ad network) | IP Address  (user data from link) |
| --- | --- | --- | --- | --- |
| null | null | null | null | null |

#### With PAM for Advertisers

PAM has two components: PAM for Advertisers and PAM for Publishers. They have separate control switches in Branch.

PAM for Advertisers takes the privacy-preserving step of removing publisher user data while still capturing publisher aggregate data, so you can gather valuable information about which of your campaigns and creatives are performing the best.

PAM for Advertisers is turned on at [either the app or org level](predictive-aggregate-measurement.md#enable-pam-at-the-orglevel).

**Advertiser data**

| IDFA  (user data from SDK) | IDFV  (user data from SDK) | Device (aggregate data from SDK) | Platform  (aggregate data from SDK) | Country  (aggregate data from SDK) |
| --- | --- | --- | --- | --- |
| null | 22222 | iPhone 15 | iOS | US |

**Publisher data**

| IDFA  (user data from link) | Campaign  (aggregate data from ad network) | Creative  (aggregate data from ad network) | Click ID  (user data from ad network) | IP Address  (user data from link) |
| --- | --- | --- | --- | --- |
| null | Summer Blast | new\_user\_discount | null | null |

#### With PAM for Publishers

The second component of PAM is PAM for Publishers, and it controls what data is shared with ad partner in Postbacks.

PAM for Publishers removes advertiser user data but preserves advertiser aggregate data. With this approach, ad networks get click ID and IP address for campaign optimization, but you may lose some device identifiers.

PAM for Publishers is turned on at [the ad partner level](predictive-aggregate-measurement.md#enable-pam-for-publishers), in the configuration section for each ad partner.

**Advertiser data**

| IDFA  (user data from SDK) | IDFV  (user data from SDK) | Device (aggregate data from SDK) | Platform  (aggregate data from SDK) | Country  (aggregate data from SDK) |
| --- | --- | --- | --- | --- |
| null | null | iPhone 15 | iOS | US |

**Publisher data**

| IDFA  (user data from link) | Campaign  (aggregate data from ad network) | Creative  (aggregate data from ad network) | Click ID  (user data from ad network) | IP Address  (user data from link) |
| --- | --- | --- | --- | --- |
| null | Summer Blast | new\_user\_discount | 333333 | 444.44.444.44 |

## PAM reporting

This section illustrates what the advertiser and the ad network will see when both PAM for Advertisers and Publishers is enabled.

### What advertisers see

**Advertiser data**

| IDFA  (user data from SDK) | IDFV  (user data from SDK) | Device (aggregate data from SDK) | Platform  (aggregate data from SDK) | Country  (aggregate data from SDK) |
| --- | --- | --- | --- | --- |
| - | 22222 | iPhone 15 | iOS | US |

**Publisher data**

| Campaign  (aggregate data from ad network) | Creative  (aggregate data from ad network) | PAM Enabled |
| --- | --- | --- |
| Summer Blast | new\_user\_discount | TRUE |

### What ad networks see

Please note that this reporting structure requires PAM for Publishers to be turned on for this particular ad network.

**Advertiser data**

| Device (aggregate data from SDK) | Platform  (aggregate data from SDK) | Country  (aggregate data from SDK) |
| --- | --- | --- |
| iPhone 15 | iOS | US |

**Publisher data**

| IDFA  (user data from link) | Campaign  (aggregate data from ad network) | Creative  (aggregate data from ad network) | Click ID  (user data from ad network) | IP Address  (user data from link) |
| --- | --- | --- | --- | --- |
| null | Summer Blast | new\_user\_discount | 333333 | 444.44.444.44 |
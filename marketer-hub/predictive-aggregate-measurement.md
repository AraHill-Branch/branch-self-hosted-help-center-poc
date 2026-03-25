---
title: "PAM Overview"
slug: predictive-aggregate-measurement
---

## Introduction

Measuring attribution is becoming increasingly challenging and complex. As the privacy landscape evolves, shifting guidelines and regulations become more and more difficult to keep up with. As these rules grow and change, attribution solutions are becoming more intricate and harder to maintain.

![](/img/c62f76bd264597b1fd1fa6ac42e002c257115ef0732f48c29072b93de711e8d4-img2.png)

On top of all this, there is a growing number of opted-out users in marketing programs, lowering the accuracy of campaign performance measurements. This leaves you guessing as to how to optimize user engagement, especially among iOS users.

## What is PAM?

**Predictive Aggregate Measurement (PAM)** is an innovative approach to mobile campaign attribution, designed for performance marketers navigating today’s complex, privacy-focused mobile measurement world.

PAM is designed to navigate the complexities of today's changing privacy landscape while still expanding attribution coverage.

With PAM, you can **unlock additional insights for users previously marked as either** `Unattributed` **or** `reported under SKAN`.

By utilizing our predictive modeling tools alongside strict privacy protocols, PAM helps safeguard user privacy while also providing marketers with the most granular and effective reporting methodology available for each unique situation.

Our dynamic models adjust to the data available, employing the most precise attribution methods for each situation. We do this with user privacy in mind, so marketers can focus on analyzing performance and optimizing their strategies.

::: tip Tip
To understand **best practices** related to PAM and iOS attribution in general, visit our [iOS Attribution Best Practices guide](ios-attribution-best-practices.md).
:::

## Data precautions

PAM maximizes attribution coverage while still remaining privacy-focused.

Below are the methods PAM uses to help you meet your privacy compliance requirements.

### Data aggregation

To further help protect privacy, PAM aggregates campaign data, bringing individual data points into a broader dataset.

This provides a comprehensive view of campaign performance but doesn't expose data about the individual user.

The aggregated data is presented in a way that marketers can get actionable insights while still preventing user-level identification.

Together, these three data precautions help ensure that your user's privacy is respected, while still giving you valuable insights.

## PAM for Publishers

The **PAM for Publishers** toggle is available in the postback [configuration](basic-postback-configuration.md) settings for each ad partner. It’s designed to help advertisers maintain strong performance while respecting user privacy.

When enabled, this feature removes advertiser-specific user identifiers (e.g., `user_data_xxx`) from Postbacks unless the user has opted in via Apple’s App Tracking Transparency (ATT) framework. In doing so, it prioritizes identifiers provided directly by the ad partner. This ensures compliant, high-quality signals that support effective campaign optimization.

## Implementation

Use the steps below to enable PAM at the org-level or app-level.

::: danger Warning
Please note that this article explains the [legacy Branch experience](branch-dashboard-overview.md) of enabling PAM, which is slated for deprecation.

In the [new version of Branch](new-branch-overview.md), PAM is enabled under Configuration → [Attribution](attribution-page-new.md).
:::

#### Prerequisites

1. PAM is available with all Performance plans. See our [Pricing](https://www.branch.io/pricing/) page for details.
2. Access to make changes at the org-level or app-level, depending on what level you want to enable PAM on.

### Enable PAM at the org-level

To enable PAM at the org-level:

1. Go the [Branch Dashboard](https://dashboard.branch.io/) and select the org that you want to enable PAM for.
2. Use the left-side navigation bar to click on **App Settings**, which is in the **Configure** section.
3. Next, navigate to the **Attribution** tab. There, you will see a switch that enables PAM. Be careful! This enables PAM for the entire org.

   ![](/img/49319d6d6c0d8c6762e3b378eeb79eb774a261c715d72c7f6113486b4fd478b8-Screenshot_2024-09-20_at_1.33.31_PM.png)
4. Flip the switch to enable PAM for the org, then make sure to click **Save** at the bottom of the page.

   ![](/img/8852a3606c6e4369c29a4c855f52cf09957bd5dc4a36d026f5b58927b41cb85e-Screenshot_2024-09-20_at_1.37.46_PM.png)

### Enable PAM at the app-level

To enable PAM at the app-level:

1. Go the [Branch Dashboard](https://dashboard.branch.io/) and choose a specific app you want to enable PAM for.
2. Use the left-side navigation bar to click on **App Settings**, which is in the **Configure** section.
3. Next, navigate to the **Attribution** tab.
4. Check to see if the switch inside the **Inherit Organization Attribution Settings** section is enabled. If it is, then your app is inheriting attribution settings from the org it lives under.

   Decide if you still want to make PAM changes at the app-level.

   ![](/img/5fd27f474d4a6b9ea6dca4ea36d9a5184afec1104d3f870f0d5284dc3603a77a-Screenshot_2024-09-20_at_4.24.58_PM.png)
5. Also note that the **Attribution Windows** section will be greyed out if your app is inheriting from org-level attribution settings.

   ![](/img/aa05942c82da8c0241a532312a7f369a985a7403afd04fd21578be7f58b856a7-Screenshot_2024-09-20_at_4.36.36_PM.png)
6. If you've taken note of the org-level settings and you still want to enable PAM at the app-level, flip the PAM switch and then click **Save** at the bottom of the page.

   ![](/img/f7671c88aedacef817bdd4c1283d13436e9a995a5857a88cb3aeb16c35d367ef-Screenshot_2024-09-20_at_4.46.04_PM.png)

### Enable PAM for Publishers

To enable [PAM for Publishers](predictive-aggregate-measurement.md#pam-for-publishers):

1. Navigate to the **Ad Partners** [page](https://dashboard.branch.io/ads/partner-management) within the Branch Dashboard.
2. Select the relevant ad partner from the list.
3. Go to the **Postback Config** tab for that ad partner.
4. Enable the **PAM for Publishers** toggle.

## PAM data structures

For detailed information about how reporting looks based on different PAM configurations, please visit our dedicated [PAM Data Reference article](predictive-aggregate-measurement-data-reference.md).

## PAM dashboard data

### Dimensions

There are certain dimensions that are particularly relevant to PAM. These are `pam enabled` and `aggregate measurement`.

Within the Branch Dashboard, these dimensions can be found:

- On the main **Summary** [page](https://branch.dashboard.branch.io/), within the **All Data** or **Ads** tabs.
- On the **Sources** [page](https://branch.dashboard.branch.io/sources).
- On the **Analytics** [page](https://branch.dashboard.branch.io/ads/analytics/activity), within the **Activity** tab.

#### PAM enabled

This dimension identifies whether the conversion event was attributed via PAM or not.

The possible values for this dimension are:

- `true` - when PAM was used to attribute the event.
- `false` or `unpopulated` - when the attribution happened via other mechanisms, the data is unattributed via PAM, or PAM was not enabled for the selected time frame.

![](/img/b01f204f0265d74fd6d528c6847bacee29893a12a886d225fc8e3839ea45bcf5-Screenshot_2025-01-17_at_3.17.27_PM.png)

#### Aggregate measurement

This dimension is used to identify events attributed via Meta AEM or gBraid.

The possible values for this dimension are:

- `true` - when Meta AEM or gBraid was used to attribute the events.
- `false` or `unpopulated` - when the attribution happened via other mechanisms, the data is unattributed via aggregate methods, or aggregate measurement was not enabled for that ad partner at that time.

![](/img/d12b055994101fc4eb9f4b8e1646bbc18fd87e67879c7921b4957eaf8970a751-unnamed.png)

### Pre-built views

Use the following URLs to for sample configurations of Branch Dashboard reports.

- [PAM Enabled View](https://branch.link/qtV64c6OlPb)  
   Compare by `platform` and `pam enabled`, where `feature` equals `paid advertising`.
- [Aggregate Measurement View](https://branch.link/Go7CdX8OlPb)  
   Compare by `platform` and `ad partner` and `aggregate measurement` , where `ad partner` equals `Google AdWords` or `Facebook`.

## FAQ

1. **What is required to implement PAM?**  
    Implementing PAM doesn't require any engineering resources, and is an easy lift for marketers. Simply follow [these implementation steps](predictive-aggregate-measurement.md#implementation) to enable PAM at the org-level or app-level with a switch.
2. **Is Branch reverting to modeled conversions?**  
    Modeled conversions from ad networks will flow into the attribution waterfall of PAM.
3. **How will Branch dedupe this aggregate data against the log-level owned channel data?**  
    PAM will utilize the deduplication logic we have with opt-in conversions and SKAN. The data will live within our Event-Level Reporting suite and be deduplicated against all other sources within our Unified View Analytics.
4. **Can you consider a conversion deterministic if you’re using an aggregate ID?**  
    Yes, if the aggregate ID is not individually identifying. This implies a many to one relationship, which can be pulled deterministically and referenced deterministically.
5. **Will this affect channels other than opted-out iOS users under paid ads?**  
    No. PAM increases visibility for opted-out iOS users under paid ads without affecting SEO measurement or other channels. Users previously marked as either `Unattributed` or `reported under SKAN` will be available for additional insights under PAM.
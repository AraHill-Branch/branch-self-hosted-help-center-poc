---
title: "DMA Compliance for SANs"
slug: dma-compliance-for-sans
---

## Overview

In 2023, the European Union designated Google as a “Gatekeeper” under the Digital Marketers Act (DMA). As a result, Google requires that user consent signals be passed along with conversion data for users in the European Economic Area (EEA).

To support this, we made it possible to pass DMA data to Branch using our SDKs. We then include those consent signals when sending conversion data to your SAN partners.

By default, this includes all traffic, meaning DMA signals are passed to the ad partner regardless of whether the user is in the EEA or not.

## Non-EEA traffic

If you want to drop DMA signals for non-EEA traffic, you can do so for the following SANs:

- Google Ads
- Amazon SAN

To drop DMA signals for non-EEA traffic for a SAN:

1. Go to Branch, and navigate to **Configure > Ad Partners**.
2. Search for and select either **Google Ads** or **Amazon SAN**.
3. Select the **Event Config** tab for that particular partner.
4. Scroll past the event mapping table and find the **Disregard DMA Signals for non EEA traffic** toggle.
5. Enable the toggle.
6. Select **Save**.

This toggle is disabled by default. When disabled, Branch passes DMA signals to the ad partner for all traffic regardless of region.

## Additional information

For more information about sending DMA consent signals using our SDKs, please visit our developer documentation:

- [iOS](ios-advanced-features.md#google-dma-compliance)
- [Android](android-advanced-features.md#google-dma-compliance)
- [Web](web-advanced-features.md#google-dma-compliance)
- [React Native](react-native-advanced-features.md#google-dma-compliance)
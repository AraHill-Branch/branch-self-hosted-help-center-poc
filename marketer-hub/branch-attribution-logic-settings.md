---
title: "Branch Attribution Logic & Settings"
slug: branch-attribution-logic-settings
---

To accurately measure and attribute interactions (installs and in-app events) that users take with your app, Branch uses several different types of attribution. The attribution method Branch applies depends on a combination of factors, like platform/app store, engagement type, and conversion type. Branch’s attribution methods are “stack-ranked” to ensure the highest level of accuracy.

## Key takeaways

- Clicks take precedence over impressions.
- Methods using deterministic 1:1 attribution (via unique identifiers/IDs) take precedence over methods using probabilistic (not 1:1) attribution.
- By ensuring Branch receives the necessary information (i.e. unique identifiers) to implement deterministic click attribution, we ensure not only accurate attribution for our clients but give the appropriate level of priority to all incoming clicks/impressions.

## Attribution Methods in Order of Operation

**1. Deterministic Click Attribution**

- iOS NativeLink™
- Google Play Install Referrer
- Identifier Matching *when an identifier is provided on click, probabilistic modeling will not be used as a fallback*

  - Google Advertising Identifier (GAID)
  - Apple’s Identifier for Advertisers (IDFA)
- Open URL (deep link) with Click ID

**2. Probabilistic Click Attribution**

- [Predictive Modeling](predictive-modeling.md) if available, or point-in-time probabilistic modeling.

**3. Deterministic View Attribution**

- Identifier Matching Only

## Attribution Settings

For detailed information on configuring attribution windows, inheritance settings, and managing attribution at the organization, app, and partner levels, see our [Attribution Windows](attribution-windows.md) guide.
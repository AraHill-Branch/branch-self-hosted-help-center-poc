---
title: "Snap Advanced Conversions"
slug: snap-advanced-conversions
---

## Overview

Advanced Conversions is Snap’s privacy-centric approach to digital advertising. It helps marketers meet their business objectives while respecting users’ ad tracking preferences via Apple’s ATT policy. This methodology employs a range of cryptographic techniques to measure aggregate conversion data, without tying off-platform activities (like installing an app or visiting a website) back to specific Snapchatters.

Advanced Conversions reporting is compatible for web and offline events via the Snap Pixel and Conversions API through integration with Branch through a Dashboard toggle.

**Note:** Snap Advanced Conversions is **DISABLED** by default; thus, Branch will only send iOS user data to Snap for those who have opted-in to ATT. Follow our guide on [Enabling Snap Advanced Conversions](snap-advanced-conversions.md#enabling-snap-advanced-conversions) to turn on.

## Enable Snap Advanced Conversions

#### 1. Navigate to Snap in Branch

In the Branch Dashboard under **Ads > Partner Management**, find/search for **Snap**. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_snap?tab=settings) to go there directly.

#### 2. Enable Snap Advanced Conversions

Under the [**Events Config**](https://dashboard.branch.io/ads/partner-management/a_snap?tab=event_config) tab, toggle on the **Enable Snap Advance Conversions** checkbox. Click the **Save** button.



## Pass hashed Data

This step is **optional** and requires help from your development team.

In order to better help optimize ads and build improved re-marketing audiences, you can optionally send hashed PII (i.e. phone numbers or email addresses) to model conversion events for Snap Advanced Matching.

To learn more, visit our [guide](https://help.branch.io/developer-hub/docs/pass-hashed-data-to-snap) in Developer Hub.

## See the data in Snap

Due to privacy constraints, the data will appear in Snap's dashboard **after** the conversion volume crosses a threshold on Snap's side. After turning this on, your Snap support team can help advise on when to expect the data to appear in their dashboard.
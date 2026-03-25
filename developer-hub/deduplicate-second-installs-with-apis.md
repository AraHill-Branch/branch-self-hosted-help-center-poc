---
title: "Deduplicate Second Installs With APIs"
slug: deduplicate-second-installs-with-apis
---

## Overview

iOS 14.5 brought big changes to the mobile attribution ecosystem. One big change is that IDFA is not accessible on app install, but it can be accessed later if the user consents to [Apple's AppTrackingTransparency framework](https://developer.apple.com/app-store/user-privacy-and-data-use/). Currently, if the user installed the mobile app via a paid ad, then Branch will publish a second install event for that user that is attributed to the ad (assuming the user allowed tracking on both source and destination apps). This means that for a subset of users, there are technically two install events. In order to ensure you see accurate counts for installs, Branch has now provided functionality to "remove" the first unattributed install.

## How Does It Work?

1. User sees a paid ad in a publisher app (ex. Facebook/Instagram).

2. User clicks the ad and gets routed to App Store to download the advertiser app.

3. User installs and opens the advertiser app.

4. An unattributed (*first*) install is reported in Branch's attribution system.

![](/img/image(82).png)

5. After some time or after an event, the advertiser app prompts the user for tracking through Apple's AppTrackingTransparency framework.

6. If the user opts into tracking in the advertiser app **and** the user has opted into tracking in the publisher app where they originally saw the paid ad, then Branch will report a *second* install.

7. Once the deduplication is enabled, Branch will automatically "remove" the first unattributed install. The second install will take the timestamp of the first install.

![](/img/image(83).png)

## Deduplicate installs using Branch APIs

You can enable the deduplication of installs if you are using the following APIs:

- [Query API](query-api.md)

- [Cohort API](cohort-api.md)

You can include the `enable_install_recalculation` boolean parameter on these APIs to de-dupe installs.

|  |  |
| --- | --- |
| **Parameter** | `enable_install_recalculation` |
| **Description** | De-dupe unattributed installs caused by duplicate events from non-opted-in users coming from paid ads. |
| **Required Parameter** | No |
| **Parameter Location** | Request body |
| **Default Value** | `false` |
| **Format** | Boolean |

::: tip Tip
If you just want to change the views/reports that you see in Branch, follow the steps in our marketer documentation.
:::
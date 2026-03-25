---
title: "Vivo Pre-Install"
slug: vivo-pre-install
---

*[Image: 1280]*

### Overview

Branch partners with Vivo in order to support preload/pre-install attribution of your app's campaigns. Enabling support for this attribution will allow you to properly measure the full lifecycle of your customer before they make their first few conversions in the app.

### Prerequisites

In order to attribute pre-installs, you need to have completed the following:

- Implement the latest version of the Branch [Android SDK](android-basic-integration.md) into your app.

### Implementation

### 1. Initiate Campaign Setup

To initialize the campaign for Vivo, you will need to gather the following:

| What | Obtained from | Description |
| --- | --- | --- |
| `$3p` value | Branch Account Manager | Contact your Branch account manager to set up the `$3p` value: `a_vivo_preload` for the campaign |
| Campaign name | Customer | Contact the customer in order to get the name of the campaign |
| Application Id | Customer | Contact the customer to provide the application id of their project |

### 2. The application id can be obtained from the build.gradle file of the app module in the Android Project.

*[Image: 2870]*

### 3. Create the JSON file

```
{
        "apps": {
        "com.maxwell.branchdemo": {
            "preinstall_partner": "a_vivo_preload",
            "preinstall_campaign": "vivopreinstall"
        }
    }
}
```

### 4. Check the JSON file in the Android System Property

*[Image: 921]*

### 5. Enable Vivo in Branch

In the Branch Dashboard under **Ads > Partner Management**, find/search for Vivo Preload. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_vivo_preload?tab=settings) to go there directly.

*[Image: 1062]*

### 6. View Data in Branch

As campaigns run, you will be able to measure the performance of the pre-install analytics directly on the Branch Dashboard.

*[Image: 1052]*
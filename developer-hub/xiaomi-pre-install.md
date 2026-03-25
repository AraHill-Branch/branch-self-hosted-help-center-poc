---
title: "Xiaomi Pre-Install"
slug: xiaomi-pre-install
---

*[Image: 636]*

### Overview

Branch partners with Xiaomi in order to support preload/pre-install attribution of your app's campaigns. Enabling support for this attribution will allow you to properly measure the full lifecycle of your customer before they make their first few conversions in the app.

### Prerequisites

In order to attribute pre-installs, you need to have completed the following:

- Implement the latest version of the Branch [Android SDK](android-basic-integration.md) into your app.

### Implementation

### 1. Initiate Campaign Setup

To initialize the campaign for Xiaomi, you will need to gather the following:

| What | Obtained From | Description |
| --- | --- | --- |
| `$3p` Value | Branch Account Manager | Contact your Branch account manager to set up the `$3p` value: `a_xiaomipai` for the campaign |
| Campaign Name | Customer | Contact the customer in order to get the name of the campaign |

### 2. Add `isPreinstallApp()` Method to your App

You will need to create a method called `isPreinstallApp()` for the Android app to determine whether the application is a pre-installed application

```
public static boolean isPreinstallApp(String pkgName) { 
try {
    Class<?> miui = Class.forName("miui.os.MiuiInit");
    Method method = miui.getMethod("isPreinstalledPAIPackage", String.class);
    return (Boolean) method.invoke(null, pkgName); } catch (Exception e) {
    Log.e(TAG, "isPreinstalledPAIPackage failed:", e); }
    return false;
}
```

### 3. Call Method in `onCreate()`

Once you have created the `isPreinstallApp()` method, you will need to call it in your `onCreate()` method of the Android App.

```
@Override
    public void onCreate() {
        super.onCreate();
        // Branch object initialization
        Branch branch = Branch.getAutoInstance(this);
        if(isPreinstallApp(getPackageName())){
            branch.setPreinstallCampaign("xiaomipai_test_campaign");
            branch.setPreinstallPartner("a_xiaomipai");
        }
    }
```

Don't forget to release the app to the play store.

### 4. Enable Xiaomi in Branch

In the Branch Dashboard under **Ads > Partner Management**, find/search for Xiaomi Airpreload. If you're already logged into the Branch Dashboard, you can also click [here](https://dashboard.branch.io/ads/partner-management/a_xiaomipai?tab=settings) to go there directly.

*[Image: 1483]*

### 5. View Data in Branch

As campaigns run, you will be able to measure the performance of the pre-install analytics directly on the Branch Dashboard.

*[Image: 1507]*
---
title: "Pre-Install Analytics Overview"
slug: pre-install-analytics
---

## Overview

Many mobile devices come with apps already installed, which is great for the user experience since users do not need to launch an app store to download and install these pre-loaded apps. But how do you attribute the pre-loaded app install when there is no ad click to use for attributing the install to the appropriate advertising partner?

Branch solves this problem by allowing you to set all of the relevant partner/publisher information in the app itself, which we then collect during the install request **on Android only**.

::: tip Specific Partner Guides
There are specific partner guides available for Pre-Install attribution. Visit them here:

- [Xiaomi](xiaomi-pre-install.md)
- [Oppo](oppo-pre-install.md)
- [Vivo](vivo-pre-install.md)
:::

## How Does It Work?

1. You have agreed with a wireless carrier/OEM (ex. AT&T) to pre-install your mobile app on their devices. In this case, the wireless carrier/OEM is the advertising partner.
2. The ad partner's information is supplied to the app via the Branch Android SDK.
3. On the app's first open, the Branch Android SDK collects the advertiser's information and uses it to attribute the app install and downstream app events (`COMPLETE_REGISTRATION` for example) to the partner.

   - Events occurring in the first launch of the app will be attributed back to the partner (even if a Branch Link was clicked before the app was first opened). If there is then a later click, that will become the new most recent last touch, and future events will be attributed to that link click.

::: info Attribution Priority
All Preload Attribution Methods take priority over other attribution sources such as clicks and impressions. Preload Attribution Windows adhere to those set within the Branch Dashboard.
:::

## Prerequisites

To enable, you first need to:

1. Create a Branch Dashboard.
2. Integrate the [Branch Android SDK](android-basic-integration.md) v4.0.0+ into your mobile app.

## Default Pre-Install Analytics

By default, the Android SDK will utilize the [Google Play Store Install Referrer API](branch-methodology-overview.md#install-referrers) to evaluate specific indicators that would require Branch-related handling.

In terms of preload attribution, Branch specifically looks for the value `play-auto-install` - this value indicates that the app was pre-installed on the device at the carrier/OEM level and that even with a hard reset of the device, the app will still be present.

This `play-auto-install` value comes in the following format from the referrer API:

```
utm_source=play-auto-installs&utm_medium=preload&utm_campaign={Campaign set by advertiser}
```

Branch then maps the `utm_medium` and `utm_campaign` to `~channel` and `~campaign` respectively.

## Enable Advanced Pre-Install Analytics

There are two options for enabling advanced pre-install analytics with Branch.

::: info Preload Partner Values
When setting pre-loaded partner data, you must use Branch's `$3p` value for the partner's name, which will override the system props data. Follow our [guide](testing-universal-ads-campaign-setup.md#section-how-to-find-a-partners-webhook-key) on how to find a partner's `$3p` value.
:::

### Option 1: Pre-loaded APK

After loading the Branch Android SDK in the `Application` class (see [docs](android-basic-integration.md#section-load-branch)), call the setters to set the data in the APK:

```
// Branch object initialization
Branch.getAutoInstance(this);

// Set campaign
Branch.getInstance().setPreinstallCampaign("My Campaign Name");

// Set partner $3p value
Branch.getInstance().setPreinstallPartner("Branch $3p Parameter Value");
```

Measuring the logs, the request should look like this:

```
{
  …
  preinstall_campaign: “My Campaign Name”
  preinstall_partner: “Branch $3p Parameter Value”
  …
}
```

::: info Multiple Partners Pre-Installing Your App
If multiple partners are pre-installing your mobile app, then you can create a partner-specific build of your app for distribution to each publishing partner (where each build includes different partner settings, respective to the particular partner). The partner-specific build is what the partner pre-installs onto the desired devices.
:::

### Option 2: Pre-loaded Device Data

Once the data is set, you need to read the pre-loaded data from the Android System Properties.

1. Create a JSON file `pre_install_apps.branch` as follows:

```
{
    "apps": {
        "application.package.name": {
            "preinstall_partner": "Branch $3p Parameter Value",
            "preinstall_campaign": "campaign_to_attribute"
        }
    }
}
```

2. Ask the device manufacturer to add the file in the OS level file system.
3. Set the file path in the build.props as below:  
   `io.branch.preinstall.apps.path=/pre_install_apps.branch`
4. The SDK checks if the APK has the pre-install data.

## Enable Referring URL Attribution

By default, Branch prioritizes pre-install attribution on pre-installed apps. However, it is also possible to prioritize the referring link over pre-install attribution.

To do so, use the `setReferringLinkAttributionForPreinstalledAppsEnabled()` method, which enables referring URL attribution for pre-installed apps.

```
// Enable referring URL attribution prior to initialization
Branch.getInstance().setReferringLinkAttributionForPreinstalledAppsEnabled();

// Branch object initialization
Branch.getAutoInstance(this);
```

## View Pre-Install Data in Branch

Regardless of your Pre-Install Analytics Method, Branch will hard-code `channel` to `preinstall`.

While in the **Ads Analytics** section of the Branch Dashboard, filter first for `channel=preinstall` and continue to segment your data further by adding additional parameters in the **Compare by** row.
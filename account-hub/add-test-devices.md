---
title: "Add and Manage Test Devices"
slug: add-test-devices
---

## Overview

To easily test your campaign setup, we recommend you first add a test device to your Branch account. Doing so tells Branch servers that resulting conversions from said device are for testing purposes only; i.e. these conversions will not be considered normal traffic and therefore not be treated as such.

As Branch only allows one install event per unique device to ever be measured and stored, if you don't first add a test device, you'll only be able to test the install conversion event once ever.

::: danger Warning
Please note that this article explains the [legacy Branch experience](branch-dashboard-overview.md) for adding and managing test devices, which is slated for deprecation.  
  
In the [new version of Branch](new-branch-overview.md), attribution windows are configured under **Testing & Monitoring** > [**Add and Manage Test Devices**](add-and-manage-test-devices-new.md).
:::

## Supported device IDs

To identify your device as a test device within Branch, we require you to provide one of the following device IDs:

- Android: Google Advertising ID (GAID)
- iOS: Identifier for Advertisers (IDFA)

::: info Use Branch's Device ID Finder App
If you don't know how to access your device's IDs, you can use Branch's **Device ID Finder** app to easily see your device's ID.

- Get the [Android App](https://play.google.com/store/apps/details?id=io.branch.deviceid)
- Get the [iOS App](https://apps.apple.com/us/app/branch-device-id-finder/id1477763736)
:::

## Add your test device

To ensure you can use your device to test:

::: info Keep In Mind...
- You can add up to 50 test devices per app in your Branch account.
- Any user can add a device for testing; however, you must have Edit access to remove a test device.
- The test device is specific to the app you add it under. If you use it to test other apps, Branch will treat it like live traffic and it will be attributed and used for downstream analytics.
- These test devices work in both the live and test environment. You only need to add it once.
:::

1. In the left-hand navigation, under **Configure**, select the [Test Devices](https://dashboard.branch.io/test-devices) page.
2. Select the **Add Device** button.
3. In the Add Device modal, provide the following:  
    a. **Device Name**  
    b. **Device ID**  
    c. **Device Platform**
4. Select **Add Device**.

## Reset your test device data

If you need to test the install event more than once, you need to reset your test device data after each install attempt. Not doing so results in the next install attempt being marked as `reinstall`.

To reset your test device data:

1. On the [Test Devices](https://dashboard.branch.io/test-devices) page, find the test device you want to reset and select the `...` button.
2. Select **Reset Device Data**.
3. In the pop-up modal, select **Yes, Reset**.
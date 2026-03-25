---
title: "Add and Manage Test Devices (New)"
slug: add-and-manage-test-devices-new
---

## Overview

To easily test your campaign setup, we recommend you first add a test device to your Branch account. Doing so tells Branch servers that resulting conversions from said device are for testing purposes only; i.e. these conversions won't be considered normal traffic and therefore not be treated as such.

As Branch only allows one install event per unique device to ever be measured and stored, if you don't first add a test device, you'll only be able to test the install conversion event once ever.

::: danger Don't see this page yet?
The Testing & Monitoring page is part of the [new Branch](new-branch-overview.md) experience. This page is being rolled out to customers in phases through 2026. While you're waiting for access, you can explore this article to familiarize yourself with the new functionality.
:::

## Supported device IDs

To identify your device as a test device within Branch, you need to provide one of the following device IDs:

- **Android**: Google Advertising ID (GAID)
- **iOS**: Identifier for Advertisers (IDFA)

**Use Branch's Device ID Finder App**

If you don't know how to access your device's IDs, you can use Branch's Device ID Finder app to easily see your device's ID.

- Get the Android App
- Get the iOS App

::: info Note
- You can add up to 50 test devices per app in Branch.
- Any user can add a device for testing; however, you must have Edit access to remove a test device.
- The test device is specific to the app you add it under. If you use it to test other apps, Branch will treat it like live traffic and it will be attributed and used for downstream analytics.
- These test devices will work in both the live and test environment. You only need to add it once.
:::

To ensure you can use your device to test:

1. Under **Configuration**, select **Testing & Monitoring > Test Devices**.
2. Select **Add device**.
3. In the **Add test device** modal, provide the following:

   - **Device name:** Choose a name to help you recognize this device.
   - **Platform:** Select the platform for your test device.
   - **Device ID:** Enter a Device ID in IDFA format for iOS or GAID format for Android.
4. Select **Add device**.

## Refresh your test device

If you need to test the install event more than once, you need to refresh your test device after each install attempt. Not doing so results in the next install attempt being marked as `reinstall`.

To refresh your test device:

1. On the **Test Devices** tab, find the test device you want to refresh and select the three-dot icon.
2. Select **Refresh device**.

## Delete a test device

To remove a test device from your account:

1. On the **Test Devices** tab, find the test device you want to delete and select the three-dot icon.
2. Select **Delete device**.
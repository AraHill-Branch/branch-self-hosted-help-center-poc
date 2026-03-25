---
title: "Dashboard SDK Integration Guide"
slug: sdk-integration-tracker
---

## Overview

Integrate the Branch iOS, Android, and Web SDKs into your app or website with our Branch Dashboard integration guides. These interactive guides allow you to choose options relevant to your setup and copy and paste elements from the guide itself, all within the Branch Dashboard.

::: info Note
If you need to revisit any of the instructions in these guides or prefer it in article format, you can view those in the [iOS](ios-sdk.md), [Android](android-sdk.md), or [Web SDK](web-sdk.md) documentation.
:::

## Before you begin

You must have or configure the following items for the relevant SDK before you can use the integration guide. You’ll see checkmarks next to configured items and exclamation points next to items that still need to be configured.

#### iOS

Configure the following items on the **App Settings** page in the Branch Dashboard:

- [Associated domains](https://help.branch.io/docs/basic-link-configuration#3-ios-default-link-behavior)
- [Branch key](https://help.branch.io/docs/profile-settings#branch-key-and-secret) (configured by default)
- [iOS URI scheme](https://help.branch.io/docs/basic-link-configuration#3-ios-default-link-behavior)
- [Universal links](https://help.branch.io/developers-hub/docs/ios-universal-links?highlight=universal%20links)
- [App prefix](https://help.branch.io/developers-hub/docs/ios-universal-links#set-up-universal-links)
- [Bundle ID](https://help.branch.io/developers-hub/docs/ios-universal-links#set-up-universal-links)

#### Android

Configure the following items on the **App Settings** page in the Branch Dashboard:

- [Associated domains](https://help.branch.io/docs/basic-link-configuration#2-android-default-link-behavior)
- [Branch key](https://help.branch.io/docs/profile-settings#branch-key-and-secret) (configured by default)
- [Branch secret](https://help.branch.io/docs/profile-settings#branch-key-and-secret) (configured by default)
- [Android URI scheme](https://help.branch.io/docs/basic-link-configuration#2-android-default-link-behavior)
- [App links](https://help.branch.io/developers-hub/docs/android-app-links?highlight=android%20app%20links)

#### Web

Configure the following items on the **App Settings** page in the Branch Dashboard:

- [Branch key](https://help.branch.io/docs/profile-settings#branch-key-and-secret) (configured by default)
- [Desktop fallback URL](https://help.branch.io/docs/basic-link-configuration#1-default-link-behavior)

## Open an integration guide

Follow these steps to open an integration guide:

1. In the Branch Dashboard, make sure you’re on the **Home** page.
2. Find the **Integrate the Branch SDK** section.
3. Select **Open an integration guide**.
4. Select **iOS**, **Android**, or **Web**.
5. Make sure you have configured all of the required settings. Read the “Before you begin” section of this article to learn more.
6. Select **Get Started**.

## Use the integration guides

Follow the steps in the relevant integration guide to integrate the Branch SDK into your app or website.

::: warning Caution
If you close an integration guide, you must start the guide from the beginning. Your integration progress will **not** be lost.
:::

### iOS SDK integration guide

Follow the steps in the integration guide to integrate the iOS SDK into your app.

::: info Note
If you need to revisit any of the instructions in these guides or prefer it in an article format, you can read our [iOS SDK documentation](ios-sdk-overview.md).
:::

In this guide, you’ll complete the following steps:

1. Configure associated domains.
2. Configure `info.plist`.
3. Install Branch.
4. Initialize Branch.
5. Validate your integration.

After you complete this setup, you’ll be able to send Branch events and deep link with Branch.

### Android SDK integration guide

Follow the steps in the integration guide to integrate the Android SDK into your app.

::: info Note
If you need to revisit any of the instructions in these guides or prefer it in an article format, you can read our [Android SDK documentation](android-sdk-overview.md).
:::

In this guide, you’ll complete the following steps:

1. Install Branch.
2. Add dependencies.
3. Configure your app.
4. Load Branch.
5. Configure ProGuard.
6. Validate your integration.

After you complete this setup, you’ll be able to send Branch events and deep link with Branch.

### Web SDK integration guide

Follow the steps in the integration guide to integrate the Web SDK into your website.

::: info Note
If you need to revisit any of the instructions in these guides or prefer it in an article format, you can read our [Web SDK documentation](web-sdk-overview.md).
:::

In this guide, you’ll complete the following steps:

1. Install Branch.
2. Initialize Branch.
3. Validate your integration.

After you complete this setup, you’ll be able to send Branch events and deep link with Branch.

## Mark the task complete

Once you’ve integrated the SDKs that are relevant to your app or website, you can dismiss the section.

To do this, select the three-dot icon on the **Integrate the Branch SDK** section on the **Home** page and select **Mark complete**. This is a manual action to help you keep track of your progress, it does not affect your integration.

## Additional resources

For more information about integrating Branch SDKs, read our other [SDK documentation](native-sdks-overview.md).
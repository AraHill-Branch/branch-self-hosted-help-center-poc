---
title: "Push Notification Implementation"
slug: push-notifications
---

## Overview

Push notifications continue to be a reliable channel to re-engage your users back into your platform where they receive the best possible experience with your brand. Typical campaigns run through these channels are effective, but they can be difficult to properly track.

Branch can be used to help power your push notification campaigns through the use of Branch Links.

### Push Notifications Use Cases

- Re-engage current users on new product launches, sales, etc.
- Attribute downstream app events push notification

## How does it work?

1. User receives a push notification
2. App opens
3. User is deep-linked into specific app content
4. Events (ex. purchases, sign-ups, etc.) are attributed back to push notification campaign



## Access

Branch Short Links are available to all customers of the Branch Growth Platform. However, access to Branch Deep Links and the Deep Linking API is part of our Engagement package. Learn more on our [pricing](packaging.md) page.

## Integration Guide

::: warning Developer Required
Developers knowledgeable with APIs, Web, and Mobile Development may be required.
:::

### 1. Create & Configure your Branch Link

Branch Link creation options:

- [Short Link](create-quick-links.md)
- [Deep Linking API](deep-linking-api.md)
- [Mobile SDKs](native-sdks-overview.md)
- [Web SDK](web-sdk-overview.md)
- [Chrome Extension](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf)

Additional information on configuring your Branch Link can be found [here](creating-a-deep-link.md).

### 2. Embed the Branch Link into the push notification payload

- [iOS Push](ios-advanced-features.md#push-notifications)
- [Android Push](android-advanced-features.md#push-notifications)

You may also insert your Branch Link in the push notification sending UI of your Push Notification Provider:

- Braze
- Sailthru
- Mixpanel
- Responsys
- Localytics
- OneSignal

Please see your Push Notification Provider's documentation for setting up and enabling deep linking through push notifications.

### 3. Handle Push Notification in the Mobile App

[iOS](ios-basic-integration.md#6-initialize-branch)

- Call `.handlePushNotification(userinfo)` in AppDelegate `UIApplication.didReceiveRemoteNotifcation()`

  - For iOS 10+ call `.handlePushNotification(response.notification.request.content.userInfo)` in App Delegate `UNUserNotificationCenter.didReceive()`

[Android](android-basic-integration.md#6-initialize-branch)

- Call `.setIntent(intent)` & `.reInitSession()` in `.onNewIntent()` of Activity handling deep link
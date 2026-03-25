---
title: "Ad Partner Integration Testing"
slug: ad-partner-integration-testing
---

## Overview

An essential part of the Ad Partners verification process is to confirm that the integration works as expected and we deliver the best user experience. This enables Branch to guarantee the highest quality of Ad Partnership integrations and verify data accuracy.

Once we've provided you with the Click/Impression Tracking URLs via email, please follow the steps below so we can verify that postback URLs are coming through correctly on your end.

## Click Tracking & Postback URL Testing

1. Add the previously emailed tracking link to your system to generate a **ClickID** and **AAID** or **IDFA** specified in the Branch tracking URL, e.g.: `https://branchster.app.link/bKzQX2KCcS?%243p=partner_id&%24aaid={aaid}&%24idfa={idfa}&~click_id={click_id}&~secondary_publisher={secondary_publisher}&parameter1={XXX}&parameter2={YYY}&parameter3={ZZZ}`
2. Click on the tracking URL that now contains the filled macro parameters.
3. You'll be redirected to web page with Branch Monster Factory application.
4. Please initiate the following actions - *Install*, *Open* and *Purchase* events - following the guide specifications below.
5. Once we register those events, we will pass to you a predefined postback with populated parameters.
6. Please check your system to ensure we passed the correct postback parameters back to you.
7. Notify us via email to verify integration.

Please refer to the following screenshots below based on the iOS and Android Mobile Platforms per Event Type:

## Test application - Branch Monster Factory

iOS:<https://apps.apple.com/us/app/branch-monster-factory/id917737838?mt=8>  
 Android: <https://play.google.com/store/apps/details?id=io.branch.branchster>

## INSTALL

### Android

Tap on the test click URL.  
 At the bottom of page click on **Install Full App** to install the Branch Monster Factory app.  
 You will be redirected to Google Play Store. Click on `Install` button to initiate INSTALL event

![](/img/abb9255-test-install-android.png "test-install-android.png")

### iOS

Tap on the test click URL. The iOS prompts to open in App Store.  
 When redirected to App Store click on the `Cloud` download icon. Once the app is installed the INSTALL event initiated.

![](/img/ee1bd6f-test-install-ios.png "test-install-ios.png")

## OPEN

### Android

To open the Branch Monster Factory app, find it on your Phone or navigate to Google Play and click the `Open` button. Once the Branch Monster Factory app opens, the OPEN event is initiated.

![](/img/084ccef-test-open-android.png "test-open-android.png")

### iOS

Make sure the Branch Monster Factory app is installed. Find it on your phone or tap on `Open` button in App Store  
 Once Monster Factory app opened the OPEN event was initiated.

![](/img/6cd8fab-test-open-ios.png "test-open-ios.png")

## PURCHASE

### Android

Open the installed Branch Monster Factory app and tap on the `Share` icon. The share window pops up with multiple options. Tap on the **Copy to clipboard** item. When you see the **Copied to clipboard** notice, the PURCHASE event is initiated.

![](/img/fcf822a-test-purchase-android.png "test-purchase-android.png")

### iOS

Open the installed Branch Monster Factory app and tap on the **Share Your Monster link** at the bottom. The share window pops up with multiple options. Tap on the `Copy` item to initiate PURCHASE event.

![](/img/d6948c7-test-purchase-ios.png "test-purchase-ios.png")
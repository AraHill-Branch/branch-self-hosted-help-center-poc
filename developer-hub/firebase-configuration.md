---
title: "Firebase Configuration"
slug: firebase-configuration
---

*[Image: 1328]*

## Overview

With a push of a button, you can send your Branch data to your Google Analytics dashboard, helping you understand the power of Branch as an acquisition pathway. If you're interested in the segment of users coming into your apps through Branch and want to measure their events against your other cohorts, this guide can help.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and completing the relevant code will result in Branch automatically forwarding referred events to Google Firebase, in the exact format Firebase expects.

### Branch Events Sent to Firebase

Branch will send *referred* **installs**, **opens**, **commerce**, **content**, **user lifecycle** as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends over analytics data that is attached to the link, whether it's UTM tags or fields set in Branch (e.g. Campaign, Channel, Feature). This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users.

## Prerequisites

In order to enable Firebase, you need to have completed the following:

1. Admin access to [Branch](https://dashboard.branch.io/).
2. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
3. [Firebase Analytics SDK](https://firebase.google.com/docs/guides)
4. Admin access to your Firebase account.

## Enable Firebase

The code snippets below should be called before you track events via the Firebase SDK. This will not change event counts in Firebase, but rather allows you to augment those Firebase calls with Branch attribution data, when that data is available (i.e., the session or event would've been attributed in Branch). A few things to be aware of when passing this data through:

- Branch tracks one INSTALL event per user. You can check if `+is_first_session` is "true" in Branch's SDK callback, to confirm if the session will be tracked as an INSTALL in Branch.
- Branch frequency caps non-referred OPENs (i.e., OPENS that were not sourced via a deep link), so session counts between Branch & Firebase will not be the same (ask your account manager for your app's frequency cap). Attribution data will still be accessible in app, even if the session won't be tracked in Branch.

## Android

1. Ensure you've completed the Firebase SDK implementation as documented [here](https://firebase.google.com/docs/analytics/android/start)
2. Ensure you've completed the Branch SDK implementation as documented [here](android-sdk-overview.md).
3. In the `LauncherActivity#onStart() method` of the Branch Android SDK, update the implementation as below:

```
Branch.getInstance().getLastAttributedTouchData(
                new ServerRequestGetLATD.BranchLastAttributedTouchDataListener() {
                    @Override
                    public void onDataFetched(JSONObject jsonObject, BranchError error) {

                        if (error == null) {
                            if (jsonObject != null) {

                                FirebaseAnalytics firebaseAnalytics = FirebaseAnalytics
                                        .getInstance(getApplicationContext());

                                Bundle bundle = new Bundle();

                                try {
                                    JSONObject latd = jsonObject.getJSONObject("last_attributed_touch_data").getJSONObject("data");
                                    String feature = latd.getString("~feature");
                                    String channel = latd.getString("~channel");
                                    String campaign = latd.getString("~campaign");

                                        bundle.putString("utm_medium", feature);
                                        bundle.putString("utm_source", channel);
                                        bundle.putString("utm_campaign", campaign);

                                    firebaseAnalytics.logEvent("custom_event", bundle);

                                } catch (JSONException ignore) {

                                }

                            }
                        }
                    }
                }, 30);
```

## iOS

1. Ensure you've completed the Firebase SDK implementation as documented [here](https://firebase.google.com/docs/analytics/ios/start)
2. Ensure you've completed the Branch SDK implementation as documented [here](ios-sdk-overview.md).
3. In the `AppDelegate` of the Branch iOS SDK, update the implementation as below:

```
Branch.getInstance().lastAttributedTouchData(withAttributionWindow: 30) { latd in
            guard let json = latd?.lastAttributedTouchJSON else { return }
            
                if let params = json["data"] as? NSDictionary {
                var firebaseParams = [String: Any]()
                firebaseParams["utm_campaign"] = params["~campaign"] ?? ""
                // get the link feature
                firebaseParams["utm_medium"] = params["~feature"] ?? ""
                // get the link channel
                firebaseParams["utm_source"] = params["~channel"] ?? ""
                // get the link term
                firebaseParams["utm_term"] = params["~keyword"] ?? ""

                Analytics.logEvent("custom_event", parameters: firebaseParams)
}
```

::: warning mParticle for Android and/or iOS
If you use the mParticle plugins alongside the Branch SDK, you must **ensure Firebase authenticates before the Branch session is initialized with mParticle**. When the Branch session is initialized with mParticle prior to Firebase authentication, the deep link data is not returned.
:::

## Troubleshooting

## Using Firebase DebugView

To debug the events and their metadata, you can enable the `DebugView` on Firebase to verify the setup. Please refer to Google's official instructions [here](https://firebase.google.com/docs/analytics/debugview).



## Common Discrepancies Between Firebase & Branch

- When the attribution of the custom events occurs in the following sessions after the click (i.e not the session after the immediate click). For example, Click -> app open -> app close -> app open -> Purchase -> Purchase sent to Firebase.

  The above purchase event on Branch might be attributed based on the attribution window, but on the Firebase this will always be organic as the SDK will not have the attribution data.
- SAN attribution support, for Google UAC (no deep linking) and Facebook App Install (not so reliable deferred deep links), the Firebase installs would miss the attribution data.

::: warning NOTE
Please ensure you’ve reviewed your agreements with any ad network (for example Facebook, Snap and Twitter) to ensure your handling of attribution data and use of third party analytics tools is in compliance.
:::

- As per your account settings, it may be the case where attribution via probabilistic modeling is disabled. This means that the deep link will return the link data, but no attribution data will be recorded at Branch’s end. If this is the case (ensure to check with your Account Manager).
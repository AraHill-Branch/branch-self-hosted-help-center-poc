---
title: "Data Integration Implementation Guide"
slug: data-integration-implementation-guide
---

## Overview

Data Integrations provide an easy way to automatically send Branch data to your other analytics services and marketing tools using pre-formatted webhooks.

This guide will walk you through how to send your Branch data to our Data Integration partners. For most integrations, configuration just requires you to input your credentials and hit "Enable".

### Data limitations

Please note that installs and other events attributed to Facebook Ads, Snap, Twitter Ads, or TikTok will not be sent to third parties via Data Integrations.

For more information, please refer to the following:

- [Facebook Ads Data Limitations](facebook-ads-overview.md#data-limitations)
- [Exporting Snap Data](snap.md#exporting-snap-data)
- [Twitter Ads Data Sharing](twitter-ads.md#twitter-data-sharing)
- [TikTok Data Sharing](tiktok-for-business.md#data-sharing)

### iOS 14.5 data changes

Apple requires users to opt into sharing their device data through Apple's [AppTrackingTransparency](https://developer.apple.com/app-store/user-privacy-and-data-use/) framework. When an install is attributed to paid ads, a 2nd install event will fire post user opt-in

Opt-ins will affect your paid ads attributed install events as they will be delayed until opt-in. No data will be available for opted-out users unless another Branch-attributed channel was encountered (Short Link, Journeys, Email, etc.). Our recommendation is to use a different identifier (ex. IDFV) to de-dupe install events on your partner systems.

For additional information on changes post iOS 14.5, visit our [FAQ pages](ios-14-faqs-1.md)

## 1. Verify the data partner accepts the events you want

The events Branch sends to third party data tools varies based on the events the partner supports as well as whether or not you've implemented the Branch SDK to measure said events.

All non-attributed events will be excluded. Branch also sends all the data that is attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users.

<details>
<summary>VIEW BRANCH EVENTS SENT TO PARTNER</summary>

| Data Integration Partner | Branch Events Sent to Partner |
| --- | --- |
| 24Metrics Fraudshield | - Install Events - Click Events - Commerce Events |
| Adform | - Install Events - Commerce Events - Custom Events - Open Events |
| Adjust | - Click Events |
| Admost | - Install Events |
| Adobe Analytics (Data Connector) | - [View Adobe Analytics (Data Connector) Specific Guide Here](https://help.branch.io/partners-portal/docs/adobe-analytics?highlight=adobe%20analytics) |
| Adobe Analytics (Processing Rules) | - [View Adobe Analytics (Processing Rules) Specific Guide Here](adobe-analytics.md) |
| Adoya | - Install Events - Commerce Events |
| Airship | - [View Airship Specific Guide Here](airship.md) |
| Amplitude | - Install Events - Open Events - Reinstall Events - Commerce Events - Custom Events |
| AppMetrica | - Click Events |
| AppsFlyer | - Click Events   ⚠ AppsFlyer does NOT accept query params on the end of Branch Links  ⚠ AppsFlyer may not properly attribute installs to Journeys and other Branch Link clicks due to lack of IDFA on click  ⚠ There may be a delay in clicks arriving at AppsFlyer via Webhook and the install event being sent to AppsFlyer by the AppsFlyer SDK |
| Appsee | - Install Events |
| Apptilaus - Subscription Analytics | - Install Events - Open Events - Commerce Events - Custom Events |
| Apxor | - Install Events - Open Events - Commerce Events - Custom Events |
| Backinapp | - Install Events - Reinstall Events - Open Events - Commerce Events - Custom Events |
| Batch | - [View Batch Specific Guide Here](batch.md) |
| Bluecore | - Commerce Events |
| Braze | - [View Braze Specific Guide Here](braze.md) |
| Bubbleye | - Click Events - Install Events - Open Events - Commerce Events - Custom Events |
| Chartable | - Install Events - Commerce Events - Custom Events |
| Claritas | - Install Events - Open Events - Custom Events |
| CleverTap | - [View CleverTap Specific Guide Here](clevertap.md) |
| Convertro | - Click Events - Install Events - Reinstall Events - Open Events - Custom Events |
| Dataplusmath | - Install Events - Open Events - Commerce Events - User Lifecycle Events - Custom Events |
| Eulerian | - Click Events - Impression Events - Install Events - Open Events - Commerce Events |
| FollowAnalytics | - Install Events |
| Forensiq | - Click Events - Install Events |
| Fraudscore | - Install Events - Commerce Events - Custom Events |
| Fraud Defense | - Install Events |
| Google Analytics | - [View Google Analytics Specific Guide Here](google-analytics.md) |
| Google Analytics 4 | - [View Google Analytics 4 Specific Guide Here](google-analytics-4-configuration.md) |
| Google Firebase | - [View Google Firebase Specific Guide Here](firebase.md) |
| iCubes Pro | - Install Events - Commerce Events |
| Insider | - Install Events - Commerce Events - Custom Events |
| Iterable | - Install Events - Open Events - Commerce Events - Custom Events |
| Kochava | - Click Events |
| Leanplum | - [View Leanplum Specific Guide Here](leanplum.md) |
| Localytics | - Install Events |
| Machine Advertising | - Install Events - Commerce Events - Custom Events |
| mFilterit | - Install Events - Open Events - Commerce Events - Custom Events |
| Mixpanel | - [View Mixpanel Specific Guide Here](mixpanel.md) |
| MobileAction | - Install Events - Commerce Events |
| MovableInk | - [View MovableInk Specific Guide Here](movable-ink.md) |
| MoEngage | - [View MoEngage Specific Guide Here](moengage.md) |
| mParticle (Import) | - [View mParticle Import Specific Guide Here](mparticle-import.md) |
| mParticle (Export) | - [View mParticle Export Specific Guide Here](mparticle-export.md) |
| myTracker | - Click Events |
| Netcore Smartech | - Install Events - Commerce Events - Custom Events |
| Neustar | - Install Events - Open Events - Commerce Events - Custom Events |
| NotifyVisitors | - Install Events - Commerce Events - Custom Events |
| Scalarr | - Install Events - Open Events - Commerce Events - User Lifecycle Events - Custom Events |
| SearchAdsHQ | - Install Events - Open Events - Commerce Events - Custom Events |
| Segment (Import) | - [View Segment Import Specific Guide Here](segment-import.md) |
| Segment (Export) | - [View Segment Export Specific Guide Here](segment-export.md) |
| Singular | - Click Events |
| Tealium (Import) | - [View Tealium Import Specific Guide Here](https://help.branch.io/partners-portal/docs/tealium-import) |
| TrafficGuard | - Click Events - Install Events - Open Events - Commerce Events - Custom Events |
| Visual IQ | - Install Events - Open Events - Commerce Events - Content - User Lifecycle Events |
| WebEngage | - Install Events |

</details>

## 2. Complete data integration prerequisites

Before enabling a Data Integration, you'll need to ensure the Branch SDK is implemented in your app and that you're tracking the events you want to send to your partner. You'll also need to have the partner's SDK installed in your app if required by that partner.

See our [developer documentation](https://help.branch.io/developer-hub/docs/data-integration-guide-for-developers) for implementation details.

## 3. Retrieve keys/credentials from your partner

Find your Partner's Keys/Credentials. Later, you'll enter them into the Branch Dashboard.

<details>
<summary>FIND PARTNER KEY & METHOD TO PASS TO BRANCH</summary>

| Data Integration Partner | Partner Key & Method to pass to Branch SDK |
| --- | --- |
| Adobe Analytics | - [View Adobe Analytics Specific Guide Here](adobe-analytics-configuration.md) |
| Airship | - [View Airship Specific Guide Here](airship.md) |
| Amplitude | - Set value for $amplitude\_device\_id & $amplitude\_user\_id keys using setRequestMetadataKey() method |
| Batch | - [View Batch Specific Guide Here](batch.md) |
| Braze | - [View Braze Specific Guide Here](braze.md) |
| CleverTap | - [View CleverTap Specific Guide Here](clevertap.md) |
| Google Analytics | - [View Google Analytics Specific Guide Here](google-analytics.md) |
| Google Analytics 4 | - [View Google Analytics 4 Specific Guide Here](google-analytics-4-configuration.md) |
| Google Firebase | - [View Google Firebase Specific Guide Here](firebase.md) |
| Iterable | - Set Iterable user ID using setIdentity() method |
| Mixpanel | - [View Mixpanel Specific Guide Here](mixpanel.md) |
| MoEngage | - [View MoEngage Specific Guide Here](moengage.md) |
| Movable Ink | - [View Movable Ink Specific Guide Here](movable-ink.md) |
| mParticle | - [View mParticle Import Specific Guide Here](mparticle-import.md) |
| mParticle | - [View mParticle Export Specific Guide Here](mparticle.md) |
| Segment | - [View Segment Import Specific Guide Here](segment-import.md) |
| Segment | - [View Segment Export Specific Guide Here](segment-export.md) |

</details>

## 4. Enable the integration

To enable the integration:

1. In the left-hand navigation, under the **Exports** section, click **Data Feeds**.
2. On the **Data Feeds Manager** page, click the **Data Integrations** tab at the top.
3. Search for and click on your data partner.
4. Provide the necessary credentials on the data partner's **Export** page.
5. Click **Enable**.

   ![](/img/8e8d434-di-enable.gif "di-enable.gif")

## 5. Additional partner-specific configuration

Some partners require additional SDK configuration to pass specific identifiers or metadata to Branch. If your partner requires this step, your development team will need to make SDK updates.  
  
See our [developer documentation](https://help.branch.io/developer-hub/docs/data-integration-guide-for-developers) for implementation details.
---
title: "mParticle (Export) Configuration"
slug: mparticle-export-configuration
---

![1328](/img/8e94317-Mparticle__branch.png "Mparticle + branch.png")

## Overview

With a push of a button you can send your Branch data to your mParticle dashboard, helping you to understand the power of Branch as an acquisition pathway, export your data to your entire suite of analytics tools and build custom audiences upon Branch data.

This documentation explains how to send **Branch events to mParticle**. mParticle calls this an Inbound Feed Integration.

If you'd like to send mParticle events to Branch through your app, please review the Branch/mParticle SDK Kit integration documentation for [iOS](https://help.branch.io/) and [Android](https://help.branch.io/).

If you'd like to send mParticle events to Branch through a server-to-server integration, please review the [mParticle (import)](mparticle-import.md) documentation.

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links lead to installs, re-opens, and users' actions. Enabling this integration and providing your mParticle key/secret will result in Branch automatically forwarding attributed events to mParticle, in the exact format mParticle expects.

### Branch events sent to mParticle

Branch will send **attributed installs, opens, commerce events, user lifecycle events, content events, and custom events**. Branch also sends all the data that is attached to the link that drove the attributed events. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to mParticle [here](mparticle-export.md#).

| Property Name | Value | Sourced from | Example |
| --- | --- | --- | --- |
| `event_name` | Name of the event | *hardcoded* | "attribution" |
| `custom_event_type` | "attribution" | *hardcoded* | "attribution" |
| `event_id` | Unique ID for the event | Branch event ID | 469939270182891107 |
| `custom_attributes` | Branch Link Data Dictionary | Last Attributed Touch Data for the link to which the event was attributed | "campaign": "mParticle test", "channel": "Slack" |
| `timestamp_unixtime_ms` | timestamp of the event in ms | event | 1513280479654 |
| `device_info` | Device Data, like OS Version and country | Branch User Data for the device | "os\_version": "10.0","device\_country": "US" |
| `user_identities` | mParticle customer ID | mParticle customer ID for the user | user123abc |
| `application_info` | App information like package name | Branch SDK/App Details | "application\_name": "Branch-3rdParty-SDK-Testbed","application\_version": "1.2.0" |
| `IP` | IP of the event | Device | 192.82.115.928 |

### mParticle Identity Strategy

Branch sends several identifiers to mParticle as part of the webhook payload. Notably, these are:

| Identifier | Value | mParticle Field | Example | Notes |
| --- | --- | --- | --- | --- |
| IDFA | Apple's ID For Advertising | ios\_advertising\_id | EA7583CD-A667-48BC-B806-42ECB2B48606 | Sent with iOS events unless user has Limit Ad Tracking on |
| IDFV | Apple's ID For Vendor | ios\_idfv | 74683E89-E010-4A73-B3ED-2741D4E5FFFE | Sent with most iOS events |
| AAID | Android's Android Advertising ID | android\_advertising\_id | cdda802e-fb9c-47ad-0794d394c913 | Sent with Android events |
| Android ID | Android ID | android\_uuid | 404fc0aea39abcdf | Sometimes sent on Android events if AAID isn't present |
| Customer ID | mParticle Customer ID | customerid | user123abc | Customer Identifier mapped from Branch `developer_identity` |
| mPID | mParticle ID | mpid | user123abc | mParticle ID identifier mapped from Branch `developer_identity` |

Please ensure your mParticle identity strategy lines up with the identifiers sent by Branch. If it doesn't, mParticle may end up creating new profiles for events sent from Branch rather than attaching these events to the correct existing profiles.

The Customer ID or mPID is of particular importance. If you set developer\_identity with Branch (docs here), Branch will automatically map this to mParticle's Customer ID or mPID. Make sure the value you set here with Branch corresponds to the value you're using for that user in mParticle.

If you're using a different value in `developer_identity` please reach out to your Branch account team.

## What does it look like?

Branch events will appear as a **Custom Attribution Event** in mParticle. You can then export Branch data to your other data sources.

Branch events are mapped as follows:

- mParticle Event Type = Custom Event
- mParticle Custom Event Type = attribution

The mParticle Event Name depends on the type of event:

- Install = attribution
- Open = re-engagement
- All Others = Branch Event Name

![](/img/526005e-mparticle_export.png "mparticle export.png")

For information on how to test your integration and see more detailed data, please review our [testing instructions below](mparticle.md#section-testing-your-integration).

## Prerequisites

In order to enable mParticle (export), you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have the Advanced Data Feeds add-on enabled on your Branch account. Advanced Data Feeds can be included as an add-on to both the Engagement and Performance [products](packaging.md).
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))
4. Implement the mParticle SDK

   - Implemented the [AdSupportFramework](https://developer.apple.com/documentation/adsupport) on iOS and [Google Play Services library](https://developers.google.com/android/guides/setup) on Android.
5. Admin access to your mParticle account.

## Enable mParticle (export)

## 1. Retrieve your mParticle Key & Secret

Find your mParticle key & secret and enter it into the Branch Dashboard.

1. Navigate to <https://app.mparticle.com> and log into the Dashboard.
2. In the dashboard, navigate to the [**Directory**](https://app.mparticle.com/directory) and search for Branch .
3. Click the Branch tile, and click **Add Branch Metrics to Setup**
4. Select the **Input Feed** Integration Type and click **Go to Setup**

   ![](/img/a247fdb-mparticle_dash.png "mparticle dash.png")
5. Specify the following configuration parameters:

   - Configuration Name
   - Act as Application *(select the right platform here)*

   ![](/img/0953109-mp_config_parameters.png "mp config parameters.png")
6. Copy your server to server key and secret - you'll enter them into the Branch dashboard in a moment.

   ![](/img/c667d79-mp_branch_key.png "mp branch key.png")

## 2. Enable mParticle (Export) in Branch

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/data-feeds/integrations).
2. Search for mParticle and click on the tile.
3. Enter your mParticle key & secret and hit **Enable**.

   ![](/img/e08f05b-mparticle_export_enable.png "mparticle export enable.png")

## 3. Verify the integration

To see the data being passed to mParticle in more detail, you can set up a webhook to Requestbin. This will allow you to send only a subset of your Branch events to Requestbin and verify the data is coming through as expected.

1. Enable the Branch Data Integration above. Install your app from a Branch link to generate some data in mParticle. It can take up to an hour for the custom attributes to show in mParticle.
2. Create a Branch link from the Short Links section of the dashboard, with a campaign of *branch\_test*.

   ![](/img/9541957-6ee439f-mparticle-test-link.png "6ee439f-mparticle-test-link.png")
3. In mParticle, navigate to the Directory in mParticle and add **Webhooks** as an option. Add a Requestbin URL generated from [https://requestb.in](https://requestbin.com/?).

   ![](/img/cd6ffa1-a6f9adc-mparticle-add-webhooks.png "a6f9adc-mparticle-add-webhooks.png")
4. To refine the data being sent to the webhook, navigate to **Connections > Connect**.
5. Select the Branch Feed as the input, and **Webhooks** as the output.
6. Finally, view the Requestbin. You can do this by appending **?inspect** to your requestbin URL. You should be able to copy paste the POST body from the request bin into a JSON formatter like <https://jsonlint.com/> to view the event details.
7. Once you're done testing, delete the webhook.

## Support

#### Why doesn't Branch require the mParticle customer ID?

Branch doesn't require the mParticle customer ID because it has usually not been set upon installing the app. The usual workflow for a user is to install the app, then have a confirmed login about thirty seconds later. The Branch install event fires immediately upon install and therefore occurs before the login event, so it does not have the logged-in customer ID before it is sent to mParticle. However, you can join install events for a customer using the device ID attached to the install and login events.
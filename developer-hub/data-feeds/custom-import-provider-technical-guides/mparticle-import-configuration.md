---
title: "mParticle (Import) Configuration"
slug: mparticle-import-configuration
---

*[Image: 1328]*

## Overview

Sending events from mParticle to Branch will allow you to attribute downstream conversions like purchases across web and app to Branch link clicks. Events imported from mParticle to Branch will be available wherever you can normally use events within Branch, including dashboard visualizations, Data Feeds, Ads Postbacks, Journeys targeting, Liveview and more.

This guide walks through the server-side integration for data import from mParticle to Branch. For the client-side integration, see the [mParticle iOS](mparticle-ios.md) or [android](mparticle-android.md) documentation. For data export from Branch to mParticle, go [here](mparticle-export.md).

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which Branch Links are leading to installs, re-opens, and users' actions. Enabling this integration and sending your events to Branch will allow Branch to enhance your mParticle data with Branch data.

### Branch Events Imported from mParticle

Branch will import events that are not auto-tracked with the Branch SDKs. This includes commerce, content, user lifecycle, and custom events, and excludes events like clicks and installs. See the full list of supported events and associated mappings [here](mparticle-import.md#section-supported-events). Branch will only import events that can be [tied to a user](mparticle-import.md#identifiers).

::: warning Avoid Duplicate Data
To avoid duplicate data, you should either [track conversion events directly with Branch](track-branch-events.md) or track events with mParticle and then enable import to Branch, not both. Branch will warn you if you try to import events to Branch that you are already tracking.
:::

The Branch integration supports some of the events tracked with mParticle’s [API or SDKs](https://docs.mparticle.com/developers/server/json-reference/#events). Branch will only import events from mParticle that are not already auto-tracked with the Branch SDK. This means that events like click and install cannot be imported. The following outlines how mParticle events are mapped to Branch events, and which will be imported to Branch:

| mParticle Action | mParticle Event Type | mParticle Custom Event Type | Branch Event | Branch Event Category | Imported |
| --- | --- | --- | --- | --- | --- |
| `add_to_cart` | `product_action` | - | Add To Cart | Commerce Event | **Yes** |
| `add_to_wishlist` | `product_action` | - | Add To Wishlist | Commerce Event | **Yes** |
| *use the Branch event name* | - | - | View Cart | Commerce Event | **Yes** |
| *use the Branch event name* | - | - | Add Payment Info | Commerce Event | **Yes** |
| `checkout` | `product_action` | - | Initiate Purchase | Commerce Event | **Yes** |
| `purchase` | `product_action` | - | Purchase | Commerce Event | **Yes** |
| *use the Branch event name* | - | - | Spend Credits | Commerce Event | **Yes** |
| *use the Branch event name* | `custom_event` | `search` | Search | Content Event | **Yes** |
| `view_detail` | `product_action` | - | View Item | Content Event | **Yes** |
| *use the Branch event name* | - | - | Rate | Content Event | **Yes** |
| *use the Branch event name* | - | - | Share | Content Event | **Yes** |
| *use the Branch event name* | - | - | Complete Registration | Lifecycle Event | **Yes** |
| *use the Branch event name* | - | - | Complete Tutorial | Lifecycle Event | **Yes** |
| *use the Branch event name* | - | - | Achieve Level | Lifecycle Event | **Yes** |
| *use the Branch event name* | - | - | Unlock Achievement | Lifecycle Event | **Yes** |
| *use the Branch event name* | - | - | Custom | Custom Event | **Yes** |
| - | - | - | Click | - | No |
| - | - | - | Install | - | No |
| - | - | - | Reinstall | - | No |
| - | - | - | Open | - | No |
| - | - | - | SMS Sent | - | No |
| - | - | - | Pageview | - | No |
| - | - | - | Web Session Start | - | No |
| - | - | - | Branch CTA View | - | No |
| - | - | - | Impression | - | No |

## Prerequisites

In order to enable mParticle (import), you need to have completed the following:

1. Admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have either the Engagement or Performance [product](packaging.md) enabled for your Branch Account.
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))
4. Implement the mParticle SDK
5. Admin access to your mParticle account.

## Enable mParticle (import)

## 1. Setup Branch

[Contact Branch](submit-a-ticket.md) to configure Branch to receive events from mParticle. Please note that a subscription to [Data Feeds](https://branch.io/data-feeds/) is required to enable data import from mParticle to Branch.

Then, navigate to the [Data Integrations page](https://branch.dashboard.branch.io/data-feeds/integrations) of the Branch dashboard.

1. Select **mParticle** from the menu on the left.
2. Select the platforms you would like to import events from and click **Save**.

   

## 2. Setup mParticle

Navigate to your your mParticle UI’s Connections page.

1. Select an input and add Branch S2S as the output.
2. Enter your Branch Key. This can be found in the [Account Settings > App](https://dashboard.branch.io/account-settings/app) section of the Branch dashboard.
3. Enter your Branch Secret. This can be found in the [Account Settings > App](https://dashboard.branch.io/account-settings/app) section of the Branch dashboard.

#### Identifiers

Identifiers are required for events to be imported to Branch. You must include:

- `context.userId.Customer` **or** `context.userId.mpid` **or** `context.userId.other` **or** `context.userId.other<2-10>`
- (`environment.Identity.DeviceIdentity.IOS_ADVERTISING_ID` **or** `environment.Identity.DeviceIdentity.IOS_VENDOR_ID`) **and** `context.runtimeEnvironment.type` **or**
- (`environment.Identity.DeviceIdentity.GOOGLE_ADVERTISING_ID` **or** `environment.Identity.DeviceIdentity.ANDROID_ID`) **and** `context.runtimeEnvironment.type`

Branch maps mParticle's identifiers to the following:

| mParticle field | Branch field |
| --- | --- |
| `context.userId.Customer` `context.userId.mpid` `context.userId.other` `context.userId.other2` `context.userId.other3` `context.userId.other4` `context.userId.other5` `context.userId.other6` `context.userId.other7` `context.userId.other8` `context.userId.other9` `context.userId.other10` | `developer_identity` |
| `environment.Identity.DeviceIdentity.IOS_ADVERTISING_ID` | `idfa` |
| `environment.Identity.DeviceIdentity.GOOGLE_ADVERTISING_ID` | `aaid` |
| `environment.Identity.DeviceIdentity.IOS_VENDOR_ID` | `idfv` |
| `environment.Identity.DeviceIdentity.ANDROID_ID` | `android_id` |
| `context.runtimeEnvironment.type` | `os` |

At this time, Branch [will not attribute logged out web events](mparticle-import.md#attribution-for-logged-out-users-on-web) received from the server-to-server integration.

## 3. Verify the integration

Once you have import turned on in both mParticle and Branch, events should come through. You will see a green dot on the import card if Branch has seen events:

.png "09a44fd-mparticle-import-status.png")

Branch imports events from mParticle as [commerce, user lifecycle, content, or custom events](mparticle-import.md#section-supported-events). To see more information on the events that are coming in, you can look at events with **origin** `MPARTICLE` in [Liveview](https://dashboard.branch.io/liveview/events).

#### Using imported events

Events imported from mParticle to Branch will be available wherever you can normally use events within Branch. This includes dashboard visualizations, Data Feeds (including Data Integrations, Query API, Webhooks, and Daily Export API), Ads postbacks, Journeys targeting, Liveview and more.

## Advanced

### Attribution for logged out users on web

Branch uses a custom, in-house identifier for logged out users on web. If you enable the server to server integration from mParticle to Branch, you will not be able to attribute logged out web events to a campaign run with Branch. For this reason, you may want to track web events directly with the Branch web SDK, while still sending app events server to server from mParticle. Branch allows you to then toggle web event import off to prevent duplicate data.

### Enabling Roku OTT Events

::: warning Prerequisite
You must complete the above set up steps  
 You must have **OTHER** events checked in the [Branch Dashboard mParticle Integration](https://branch.dashboard.branch.io/data-feeds/integrations)
:::

::: info Events Supported
OTT mParticle import will not give Branch OPEN events. (OPEN events coming soon)  
 Branch imports session\_start events as a custom event.
:::

Enabling the Connection in the mParticle Dashboard:

1. Once the Branch S2S module has been configured, it can be selected as a destination via the mParticle connections UI (screenshot below).
2. Select the Roku platform input and connect it to Branch without any transformations applied.

   
3. Enter your [Branch Key and Branch Secret](https://branch.dashboard.branch.io/account-settings/profile) in order to configure the Branch S2S integration.

   
---
title: "Postbacks Overview"
slug: postbacks
---

## Overview

A postback, with respect to Branch, is quite simply a signal sent from Branch to a specific non-self-attributing ad network (Non-SAN) to notify them of a conversion that happens on the mobile app. Postbacks are helpful for informing marketing teams how well certain campaigns are performing while relaying information to the Non-SAN for them to be able to optimize campaigns.

::: tip Postbacks vs. Webhooks
Both the terms `Postbacks` and `Webhooks` are used to refer to the same process of sending data to other systems. In Branch’s case, we use the term `postback` when referring to the Ads product and `webhook` when referring to the Data Feeds product; though the functionality is the exact same.
:::

## How does it work?

1. Branch Tracking Links and Impression Links are placed in ad campaigns for Non-SANs.

   - Tracking Links and Impression Links contain postback macros on it dynamically filled by the ad network.
2. When campaigns are launched, the user sees an app install ad for an app.
3. User downloads and installs the app by clicking the ad and being routed to the app store.
4. When the user opens the app for the first time, the Branch SDK initializes and tracks events performed by the user.
5. Conversions/events are sent through Branch's attribution systems, and Branch will send a postback to the ad network that drove the conversions.
6. The network claims credit for all postbacks received from Branch.

## What does it look like?

Postbacks are configured directly on the Branch Dashboard after enabling a specific ad partner. These postbacks can be configured based on your campaign goals and metric specifications.


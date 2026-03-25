---
title: "Volume Credits (INTERNAL)"
slug: volume-credits-internal
---



## Overview

Branch uses the concept of **volume credits** for billing.

Volume credits correspond to the number of end-user actions tracked, attributed, or reported on in Branch.

At the core of end-user actions are **Branch Events**.

## Branch Events Explained

First of all, what is a Branch Event?

Branch Events are user actions that Branch tracks automatically through our SDK, as well as additional user actions you choose to send to Branch for tracking or reporting purposes.

Logging Branch Events helps you see how a user moves through your app and what actions they are taking along the way.

Examples of some commonly used Branch Events include: Clicks, Impressions, Installs, Purchases, Shares, and Logins. All of these are examples of Branch Events that have properties that are pre-defined by Branch.

If you want to create an event with your own properties, you can create a Branch **Custom** Event.

In terms of pre-defined Branch Events, there are three categories: Commerce, Content, and User Lifecycle. You'll learn more about these categories in this guide.

## Branch Events and Volume Credits

For billing purposes, an event can fall into one of the following buckets:

- Events that *never count* toward your volume credit limit.
- Events that count toward your volume credit limit **only** if they are driven by Branch Links.
- Events that *always count* toward your volume credit limit.

Let's consider the buckets in turn and what types of Branch Events live in each.

### Never Count

Some Branch Events don't count toward your volume credit limit and are simply included. These are:

- **Impressions**: When paid ads are rendered on a user's screen.
- **Clicks**: Whenever a Branch Link is clicked.
- **Web Page Views**: Measured every time a webpage loads with the Branch Web SDK.
- **Web Session Starts**: When a webpage with the Branch Web SDK opens in a new tab, or when a user clicks on a Branch Link and is redirected to a page with the Branch Web SDK.

Note that both of these events are automatically tracked by your Branch SDK integration.

### Count When Driven By Branch

There are other Branch Events that are also automatically tracked by your Branch SDK integration, but they **will** count toward your volume credit limit if they were tracked, driven by, and reported on in Branch.

These are:

- **Opens**: Occur every time an app is opened on a device (after the initial Install).
- **Installs**: Measured by Branch the first time the app is opened on a device.
- **Reinstalls**: The first time a user installs an app after previously uninstalling it.

If these were driven by a Branch Link, then they will count toward your volume credits. In this way, Branch's pricing is closely tied to the growth of your product and the value Branch brings to your brand.

### Always Count

Lastly, there are Branch Events that always count toward your volume credit limit.

Events in this category are considered **conversion events**. These are not automatically tracked by the Branch SDK by default.

These are:

- **Commerce Events**: Includes purchases and transactions, as well as actions related to carts and wishlists.

  - Examples: Branch customers frequently use Commerce Events to track how many times an item is added to a cart or wishlist, if a purchase is initiated, and if an end user adds payment info.
- **Content Events**: Occur when a user engages with your in-app content.

  - Examples: When posting in-app articles, a Branch customer may use this to track events related to users performing search queries, viewing content, rating the content, or sharing it.
- **User Lifecycle Events**: Actions the user takes in your app to continue progressing through it.

  - Examples: Can be used to track users completing a tutorial, opting in to an email list, or starting a free trial.
- **Custom Events**: Actions you want to track that Branch has no corresponding pre-defined event for.

Within the Commerce, Content, and User Lifecycle categories, there exists a set of events to choose from. You can learn more about those specific events in our event tracking [guide](track-branch-events.md#event-tracking).

All of these, or any type of Custom Branch Event you create with your own properties, will count against your volume credit limit.

## Events + Volume Credits Table

View the table below to quickly see which Branch Events fall into which bucket, as well as whether that event type is automatically tracked by our SDKs.

| Event Type | Tracked Automatically by SDK? | Counts Toward Volume Credit Limit? |
| --- | --- | --- |
| Impression | Yes | No |
| Click | Yes | No |
| Webhook | No | No |
| Open | Yes | **Only** if attributed to Branch |
| Web Session Start | Yes (Web SDK) | **Only** if attributed to Branch |
| Install | Yes | **Only** if attributed to Branch |
| Reinstall | Yes | **Only** if attributed to Branch |
| [Commerce](track-branch-events.md#track-commerce-events) | No | Yes |
| [Content](track-branch-events.md#track-content-events) | No | Yes |
| [User LifecycleLifecycle](track-branch-events.md#track-lifecycle-events) | No | Yes |
| [Custom](track-branch-events.md#track-custom-events) | No | Yes |

## Testing

To make sure your events are being sent to Branch from your app, you can check the Liveview [page](https://dashboard.branch.io/liveview/events) of the Branch Dashboard.

Please note that it may take several minutes for your events to appear in Liveview after they've been triggered.
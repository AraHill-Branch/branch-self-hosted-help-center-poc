---
title: "Filter Ad Network Data"
slug: filtering-ad-network-data
---

## What?

We take our customers’ privacy very seriously. To enable our customers to customize their event data flows to Branch’s different ad partners, we provide the Ad Network Data Filtering feature that allows you to limit the scope of event data exported to Branch’s ad partners. This way, if you want to filter out a subset of event data so that it is not exported to a particular ad network, or if you otherwise determine that a particular end user subset of event data should not be processed by a particular ad partner, you can continue to make use of Branch’s integration with that ad partner for other event data sets.

## Why?

Branch has a broad set of integrated partners that help our links work seamlessly across channels and platforms. Our strong partner relationships make deployment and speed-to-market easy to achieve. Use our network of partners to harness the power of Branch in the way that best fits your business objectives. You can learn more about the types of ad partnerships Branch has integrations with here: <https://branch.io/partners/>. We understand that some customers would like to filter the scope of end user event data sent to ad partners to ensure that events for certain end users are not exported. For this reason, we make available to our customers the Ad Network Data Filtering feature.

## Set Event Flag

Before you can apply the data filter to your ad network via the Branch Dashboard, you must set an event flag per user.

Once this is set to `true` for a user, Branch will set a flag on every event for that user for it to be potentially filtered.

By default, Branch sets this flag to `false`.

::: code-group

```java [Android - Java]
Branch.getInstance().disableAdNetworkCallouts(true);
```

```kotlin [Android - Kotlin]
Branch.getInstance().disableAdNetworkCallouts(true)
```

```swift [iOS - Swift]
let branch = Branch.getInstance()
branch.disableAdNetworkCallouts(true)
```

```objectivec [iOS - Objective-C]
Branch *branch = [Branch getInstance];
[branch disableAdNetworkCallouts:YES];
```

:::

## Select Ad Network to Filter

::: warning Self Attributing Networks (SANs) Only
At this time, only data filtering can only be applied to Self Attributing Networks.

You can view a list of these partners [here](self-attributing-networks-sans.md).
:::

To filter the data that is sent to a SAN:

1. In the left-hand navigation, under **Channels & Links**, click **Ads** and then **Partner Management**.
2. Search for and select the SAN that you want to filter the data Branch sends.
3. Click on the **Events Config** tab and scroll down to the **Restrict ad network data sharing** toggle.
4. Click the toggle to turn it on and click **Save**.

*[Image: 1794]*
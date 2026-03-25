---
title: "NativeLink™ Deferred Deep Linking"
slug: nativelink-deferred-deep-linking
---

![](../../../assets/media/images/64175b2f-5e6c-4824-9bfe-1b5c84f02b7d "nativelink.PNG")

::: info Note
If you are currently using the **Branch NativeLink feature on iOS 16**, when the Branch SDK checks the pasteboard on first opens, the native iOS prompt will automatically display itself requesting permission from the user. Alternative integrations are supported. Please refer to our [iOS Developer Docs](https://help.branch.io/developers-hub/docs/ios-advanced-features#nativelink%E2%84%A2-deferred-deep-linking).
:::

## Overview

NativeLink™ is an innovation from Branch that bridges the gap created by Private Relay with an on-device solution that does not require the use of an IP address for deferred deep linking.

NativeLink™ gives end-users the choice to copy deep link content to their clipboard or not, so they have full control of their user experience.

With no unique personally identifiable information (PII) required, there is no privacy-comprising tracking with NativeLink™. It works by utilizing the native copy and paste functionality already built into their iPhone.

## How does it work?

1. User clicks a Branch Link.
2. User's web browser opens and the user will see the NativeLink™ experience — a blue call-to-action button.
3. Once they click on the CTA, the URL location is copied to the clipboard.
4. The user is then brought to the App Store to download the app.
5. After installation, NativeLink™ will check the clipboard for the URL and process it for deep linking. The user is then routed to their final destination in the app.

## Access

Access to Deferred Deep Linking requires a premium plan. Please visit our [Pricing](https://www.branch.io/pricing/) page or [contact our Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.

## Integration guide

::: warning Caution
Developers knowledgeable with mobile development are required.
:::

#### 1. Make sure your [Branch iOS SDK](ios-sdk-overview.md) is v1.39.4+

Ensure that your mobile app is set up for deep-linked routing from Branch Links.

#### 2. Implement a single line of code for the app to process a NativeLink™ enabled Branch Link

Please follow the instructions in our [developer documentation](ios-advanced-features.md#nativelink™-deferred-deep-linking) for implementing the single line of code.

#### 3. Toggle NativeLink™ on in the [Branch Dashboard](https://dashboard.branch.io/configuration/general)

Select your audience rule.

![](../../../assets/media/images/949ac2f4-4a97-4a4b-ae63-386cc4f1ca1b "NativeLink Dashboard.PNG")

#### 4. Create and configure your Branch Link

Branch Link creation options:

- [Short Links](create-quick-links.md)
- [Deep Linking API](deep-linking-api.md)
- [Mobile SDKs](native-sdks-overview.md)
- [Web SDK](web-sdk-overview.md)
- [Chrome Extension](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf)

Additional information on configuring your Branch Links can be found [here](creating-a-deep-link.md).

## NativeLink™ customization

#### 1. Find the NativeLink™ Deepview

Go to the [Deepview Manager](https://dashboard.branch.io/deepview/deepview-manager) tab under **Campaigns** in the left-side navigation. Once there, locate the NativeLink™ default Deepview indicated by the following tooltip:

![896](/img/e24dcc7-NativeLink_Deepview(1).png "NativeLink Deepview.png")  
You have the following options:

- **Edit**: Opens the edit screen for the Deepview. This option is **only available** on cloned Deepviews.
- **Set as NativeLink™ Default**: Makes the Deepview the default only for NativeLink™ experiences.
- **Duplicate**: Clones the Deepview. This option is **only available** on the default Deepview.
- **Delete**: Deletes the Deepview. This option is **only available** on cloned deepviews.

## Testing and troubleshooting

Because enabling and using NativeLink™ requires iOS development resources, you can find our NativeLink™ testing & troubleshooting steps in our [developer documentation](ios-troubleshooting.md).

## A/B testing NativeLink™

::: info Note
Setting up an A/B test with one or more NativeLink™ Deepviews requires advanced link setup steps.
:::

With NativeLink™, you have the ability to test out different designs at the same time and control the release the control of those accessing the NativeLink™ Deepview on the link level.

#### 1. Getting NativeLink™ keys

When you are [customizing your NativeLink™ Deepview](nativelink-deferred-deep-linking.md#nativelink™-customization), each new Deepview you create will have its own unique **key**.

You can obtain the key from the [Deepview Manager](https://dashboard.branch.io/configuration/deepview-manager). Each key is located underneath the title of the Deepview.

![](/img/image-1746749922356.png "NativeLink Key.PNG")

Note the keys of the different NativeLink™ Deepviews that you are going to use for the A/B test.

#### 2. Set NativeLink™ keys

Once you have the keys of the Deepviews you are going to use for the A/B test, you need to set those keys on a per-link basis using the `$ios_nativelink` [parameter](creating-a-deep-link.md#deep-linking). Each Deepview will need to have its own corresponding [Branch Short Link](create-quick-links.md).

Set your NativeLink keys as the value for `$ios_nativelink` when [adding link data options](create-quick-links.md#4-add-link-data-optional).

Note that NativeLink configurations are a form of "Active Deepviews", so [forced redirections](creating-a-deep-link.md#forced-redirections) will not work with it.

#### 3. Launch A/B test

You can then use your preferred A/B testing platform to send out your Branch from the previous step to start getting data and usage on the NativeLink™ experiences.

#### 4. Measure A/B performance

The performance of the Branch Short Link can be [viewed on the Branch Dashboard](https://help.branch.io/v1/docs/create-quick-links#viewing-quick-links-in-the-dashboard).

You can then use these metrics to determine the winner of your A/B test, and set one of them to be the NativeLink™ Default.
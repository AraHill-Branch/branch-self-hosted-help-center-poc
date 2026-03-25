---
title: "Improved Deep Linking without Attribution"
slug: improved-deep-linking-without-attribution
---

We're expanding the use of a deep linking key with more functionality. Learn more in this update 🔗

## Overview

Before, users can add the `$deeplink_no_attribution` [Deep Link Data Key](deep-link-data-options.md) to their Branch Ad Links to utilize a deep link for user experience on self-attributing networks (SAN) without impacting last touch attribution. Now you can use this key to support deep linking without attribution in other channels outside of ads. With this key, you don't have to worry about links deployed for user experience claiming attribution outside of existing campaigns.

| Key | Description | When to use |
| --- | --- | --- |
| `$deeplink_no_attribution` | Set to true for the links to only support deep linking without any attribution for that link. | For paid ads (ex. SANs) and non-ad links (ex. Short Link, Email, Journeys) |

::: warning Metrics
Using `$deeplink_no_attribution` will lose all link metrics when set to true on your Branch Link.
:::

### Example Use Cases

#### Paid Ad Link to Mobile Website

1. User clicks a paid ad link (ex. Facebook ad) that leads user to mobile website
2. User sees and clicks a CTA on mobile website to download the app (CTA is a Branch Short Link)

   1. The Short Link has `$deeplink_no_attribution` key set to true
3. The app session will be attributed to the original paid ad link *not* the Short Link

#### User Authentication in Email

1. User interacts with an email campaign with links to a product
2. User initiates an authentication flow that utilizes a Branch Link

   1. The Branch Link has `$deeplink_no_attribution` key set to true
3. The app session will be attributed to the email campaign

#### Sharing to Mobile Web

1. A user is sent to your mobile website through a sharing/referral link (Branch Link).
2. The user then sees a Branch Short Link on the mobile website that leads them to download/install the app.

   1. The Short Link has `$deeplink_no_attribution` key set to true
3. The install/open event of the app will be attributed to the original sharing/referral link *not* the Short Link.

> Looking to learn more about Deep Link Data Options? View our guide here: [Deep Link Data Options](deep-link-data-options.md)
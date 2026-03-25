---
title: "Increased Attribution Coverage for TikTok for Business"
slug: increased-attribution-coverage-for-tiktok-for-business
---

Branch is strengthening our partnership with TikTok via TikTok's new Advanced Self Attributing Network (SAN) engine.

## Overview

Starting November 25, 2024, the Branch and TikTok for Business integration will support an enhancement called **Advanced SAN**.

With Advanced SAN, Branch will send **both** ad link and SAN attribution decision results to TikTok, instead of just the latter. This new approach maximizes attribution coverage.

## Enable Advanced SAN

For some accounts, no change is needed to enable Advanced SAN. For these accounts, Advanced SAN could be auto-enabled because the correct TikTok app ID was provided in the account's Branch Dashboard prior to this transition.

If the value was missing or incorrect, then Advanced SAN could not be auto-enabled. In these cases, some light manual configuration is required to enable Advanced SAN.

#### Auto-Enabled

If Advanced SAN is auto-enabled for your account, it means that TikTok has automatically backfilled your Branch Key in the TikTok Events Manager. Your Branch Key is required to ensure Advanced SAN support. We highly recommend verifying the Branch Key to ensure the correct one has been implemented.

Continue running your TikTok for Business campaigns using either the SAN integration or a Branch Ad Link.

#### Manual Configuration

If Advanced SAN has not been auto-enabled for your account, you can manually configure the set up.

##### Configuration Steps

To enable Advanced SAN:

1. Visit your Branch Dashboard to ensure that the "TikTok App ID" field is filled out for your app(s):

   1. In the navigation panel, select **Ads**, then **Partner Management**.
   2. Search for "TikTok For Business SAN" in the **Ad Partners** search bar and select the result.
   3. In the **Ad Account Information** section, find your **TikTok App IDs**. If you don't have these IDs, you will need to [generate them](enable-tiktok-for-business.md#2-input-your-tiktok-app-id) first.

      ![](/img/e8e9b3f-Screenshot_2024-08-15_at_5.18.45_PM(1).png)
2. Configure your Branch Key in the TikTok Events Manager:

   1. Visit the Account Settings [page](https://dashboard.branch.io/account-settings/profile) of your Branch Dashboard.
   2. Copy the Branch Key listed there, which starts with `key_live_`.

      ![](/img/2bd45fa-unnamed_1(1).png)
   3. Within the TikTok Events Manager, paste the Branch Key into the Partner Token field into the **Edit Tracking** module on the app details page.

      ![](/img/4503182d8442a989df2fd72b9b38c7de3246724847e0325b878e1104045821fe-Screenshot_2024-11-05_at_4.11.42_PM(1).png)
   4. Click "Confirm" to update the Branch Key.

## Advanced SAN + non-SAN

Please note that beginning February 1, 2025, Branch will be **discontinuing support** for TikTok’s non-SAN module.

Branch recommends that customers enable Advanced SAN prior to the discontinuation of the non-SAN module.

## Learn More

To learn more about TikTok Advanced SAN, visit our [guide](enable-tiktok-advanced-san.md).
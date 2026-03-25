---
title: "Enable TikTok Advanced SAN"
slug: enable-tiktok-advanced-san
---

## Overview

Branch's support for TikTok's Advanced SAN modules means Branch will send **both** ad link and SAN attribution decision results to TikTok, instead of just the latter. This latest approach maximizes your attribution coverage and prioritizing SAN claims. By gaining access to full Ad Link and TikTok SAN attribution coverage, you get more accurate insights across your campaigns.

To take full advantage of TikTok’s Advanced SAN, you’ll need to use their SAN module, which provides expanded, precise attribution data. Learn more about TikTok's transition to a SAN integration model [here](https://ads.tiktok.com/help/article/about-self-attribution-transition).

Additionally, to achieve optimal attribution coverage with TikTok Advanced SAN, we recommend enabling [Predictive Aggregate Measurement (PAM)](predictive-aggregate-measurement.md), which increases iOS attribution coverage in a privacy-centric manner.

## Implementation

For some accounts, no change is needed to enable Advanced SAN. For these accounts, Advanced SAN could be auto-enabled because the correct TikTok app ID was provided in the account's Branch Dashboard prior to Branch's support of this module.

However, if the value was missing or incorrect, then Advanced SAN might need some light manual configuration to be enabled.

### New apps

If you have a new app, you first need to connect it to TikTok's Ads Manager using the instructions [here](https://ads.tiktok.com/help/article/how-to-check-if-your-app-is-on-san-integration). Select **Branch** in the MMP section. Then move on to the [configuration steps](enable-tiktok-advanced-san.md#manual-configuration) in this guide.

### Auto-enabled

If Advanced SAN is auto-enabled for your account, it means that TikTok has automatically backfilled your Branch Key in the TikTok Events Manager. Your Branch Key is required to ensure Advanced SAN support. We highly recommend verifying the Branch Key to ensure the correct one has been implemented.

You can check whether your app is on TikTok's SAN integration using the instructions [here](https://ads.tiktok.com/help/article/how-to-check-if-your-app-is-on-san-integration).

Continue running your TikTok for Business campaigns using either the SAN integration or a Branch Ad Link.

### Manual configuration

If Advanced SAN has not been auto-enabled for your account, you can manually configure the set up.

#### Configuration steps

To enable Advanced SAN:

1. Visit your Branch Dashboard to ensure that the "TikTok App ID" field is filled out for your app(s):

   1. In the navigation panel, select **Ads**, then **Partner Management**.
   2. Search for "TikTok For Business SAN" in the **Ad Partners** search bar and select the result.
   3. In the **Ad Account Information** section, find your **TikTok App IDs**. If you don't have these IDs, you will need to [generate them](https://ads.tiktok.com/help/article/how-to-generate-a-tiktok-app-id?lang=en) first.

      ![](/img/e8e9b3f-Screenshot_2024-08-15_at_5.18.45_PM.png)
2. Configure your Branch Key in the TikTok Events Manager:

   1. Visit the Account Settings [page](https://dashboard.branch.io/account-settings/profile) of your Branch Dashboard.
   2. Copy the Branch Key listed there, which starts with `key_live_`.

      ![](/img/2bd45fa-unnamed_1.png)
   3. Follow the instructions [here](https://ads.tiktok.com/help/article/integrate-to-san-for-new-apps?lang=en) to transition your app to a SAN integration within TikTok Ads Manager.

      Once inside the TikTok Events Manager, paste your Branch Key into the Partner Token field in the **Edit Tracking** module on the app details page.

      ![](/img/4503182d8442a989df2fd72b9b38c7de3246724847e0325b878e1104045821fe-Screenshot_2024-11-05_at_4.11.42_PM.png)
   4. Click "Confirm" to update the Branch Key.

## Smart+ campaigns

Smart+ Campaigns use TikTok's AI to automate campaign setup, audience targeting, and creative optimization. Instead of manually configuring each element, you provide your goals and creative assets, and TikTok's system handles the delivery. Smart+ campaigns work differently from manual campaigns, so they also report data differently in Branch.

### Campaign types

**Manual Campaigns** give you standard reporting down to the individual ad. You won't see separate creative performance metrics.

**Smart+ Campaigns** skip the ad level entirely and report directly at the creative level. This means you see creative performance but don't have an intermediate ad level to analyze.

**Upgraded Smart+ Campaigns** provide the most detail with both ad and creative levels. You can see how ads perform overall and how each individual creative within those ads performs. This helps you identify which specific creative assets are driving your best results.

Learn more about Smart+ Campaigns in [TikTok’s documentation](https://ads.tiktok.com/help/article/about-smart-plus-campaign).

### Campaign data breakdown

| **Campaign Type** | **Account** | **Campaign** | **Ad Set** | **Ad** | **Creative** |
| --- | --- | --- | --- | --- | --- |
| **Manual Campaigns** | account | campaign | adgroup | ad | N/A |
| **Smart+ Campaigns** | account | campaign | adgroup | creative | N/A (Mapped to Ad, not tracked separately) |
| **Upgraded Smart+ Campaigns** | account | campaign | adgroup | ad | creative |

## FAQs

<details>
<summary>Can I use both the Advanced SAN and non-SAN modules from TikTok?</summary>

Please note that beginning February 1, 2025, Branch will be **discontinuing support** for TikTok’s non-SAN module.

Branch recommends that customers enable Advanced SAN prior to the discontinuation of the non-SAN module. We also recommend that you start using SAN Ad Links instead of non-SAN Ad Links

</details>

<details>
<summary>Will SKAN data be switched over to SAN completely?</summary>

Yes, Branch will automatically do this once you disable non-SAN Ad Links.

</details>

<details>
<summary>Do advertisers need to supply Ad Links proactively if they are only tracking app events with Branch?</summary>

They do not need to supply Ad Links for app promotion campaigns, but for non-app campaigns they will need to use SAN Ad Links.

</details>

<details>
<summary>If I enable TikTok Advanced SAN, should I also enable PAM?</summary>

We recommend using the TikTok Advanced SAN module alongside our in-house iOS aggregate attribution solution [PAM](predictive-aggregate-measurement.md) in order to maximize attribution coverage.

PAM is part of our [Performance](packaging.md#performance-product) product.

</details>

<details>
<summary>How can I check if my app is on the SAN integration within the TikTok Ads Manager?</summary>

To confirm that your app is on the SAN integration, use TikTok's instructions [here](https://ads.tiktok.com/help/article/how-to-check-if-your-app-is-on-san-integration).

</details>
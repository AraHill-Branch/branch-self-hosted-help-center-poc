---
title: "ROI Hub Overview"
slug: roi-hub
---

## Overview

ROI Hub is a critical tool in your marketing strategy if you're interested in analyzing and reporting on ad spend to make sure you're getting the best use of your investment dollars. ROI Hub unifies your cost data and revenue insights, and helps you understand the actual impact of your ad dollars.

ROI Hub also makes it easy to monitor the status of each of your ad partner connections, so you can find and fix issues quickly.

Currently, Branch supports over 20 of the largest and most commonly used ad partners. If we don't support a direct integration with an ad partner, you can still send their data to Branch via [file upload](cost-data-via-file-upload.md) or [email import](cost-data-via-email-import.md).

#### Cost Data

Cost data is the amount of money spent on ad campaigns, and that value is required to make ad optimization decisions in the mobile marketing ecosystem. With ROI Hub, you can bring your cost data from across disparate ad partner sources together in one place within the Branch Dashboard.

#### Access

Access to ROI Hub requires a premium plan. Please [contact our Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.

## ROI Hub Components

The sections below describe the three tabs within the Branch Dashboard that come together to make ROI Hub.

### Overview

For a quick look at which of your ad partners are getting significant traffic, as well as whether or not you have cost data ingestion set up for them, head to the **Overview** [tab](https://dashboard.branch.io/ads/roi-hub/overview) in ROI Hub.



The table featured in this tab includes columns for **Ad Partner**, **Cost**, **Clicks**, **Installs**, **Opens**, **Status**, and **Actions**.

If an ad partner has a status in the **Status** column, you can click on it to learn more. If there is an error associated with the connection, an error message with more information will be shared in the **Error Message** column.



#### Setup Cost Data

Clicking the **Setup cost data** button under the **Actions** column will take you to the **Ad Partner Settings** page for that ad partner, where you can visit the **Cost Data** tab to set up [cost data ingestion via API connection](cost-data-via-api-connection.md) if an integration exists for that ad partner.

There are also two other ways import cost data into Branch: [file upload](cost-data-via-file-upload.md) or [scheduled email import](cost-data-via-scheduled-ingestion.md).

#### View Analytics

Clicking the **View Analytics** button will take you to the **Activity** [tab](https://branch.dashboard.branch.io/ads/analytics/activity) in the **Ads** [section](https://branch.dashboard.branch.io/ads/) of the Branch Dashboard, where you can see tables for **Trends** and **Events** that allow you to compare by ad partner.

### Connection Overview

The **Connection Overview** [tab](https://branch.dashboard.branch.io/ads/roi-hub/connection-overview) of ROI Hub is a single place to manage all your cost-data connections.

This table view lets you sort your connections, easily identify issues, and routes you to fix problems with any connections.

.png)

| Column | Description |
| --- | --- |
| Ad Partner | The name of the ad partner for the cost data connection. |
| Connection Name & Account ID | The cost data connection name and ID for a given ad partner. |
| Last Pull | The most recent time and date that Branch requested cost data from a connection. |
| Last Successful Pull | The most recent time and date that Branch requested cost data from a connection and was able to receive cost data for a given connection. |
| Status | The status of the connection - Active, Inactive, Pending, or Failed. |
| Error Message | A description of what caused a connection to fail on the last cost data pull. |
| Actions | Click the **Manage** button to be taken to the **Cost Data** tab of the **Ad Partner Settings** page. |

Additionally, you can:

- Search by ad partner or connection name.
- Filter by connection status.
- Click the **Add Cost Connection** button on the top right of the page to route you to the Partner Management page to enable an ad partner.

### Import

The **Import** [tab](https://dashboard.branch.io/ads/roi-hub/import) is where you can either [import files individually](cost-data-via-file-upload.md) under the **File Upload** view, or you can set up the files to be imported to Branch [automatically through email](cost-data-via-email-import.md) under the **Email Importers** view.

Both options are made simpler with the help of [cost data templates](templates-for-cost-data.md), which you can create and store within this tab using the **Cost data templates** view.

You must create a cost data template for an ad partner **before** you can import cost data for them using file upload or email import.

The **Import History** view displays a record of previous imports that have taken place, either successfully or unsuccessfully. Clicking **View** in the **Actions** tab of this view will give you more information about that particular import, including error messages if the import failed.



## Ad Partner Support

ROI Hub currently supports the following ad partners for [sharing cost data with Branch via API connection](https://help.branch.io/docs/cost-data-via-api-connection#enabling-cost-via-api-connection).

<details>
<summary>Expand to see list of ad networks supported by direct API integration</summary>

| **Ad Partner** | 3p name |
| --- | --- |
| [Twitter](https://business.x.com/en/advertising) | `a_twitter` |
| [Adikteev](https://www.adikteev.com/) | `a_adikteev` |
| [Apple Ads](https://ads.apple.com/app-store) | `a_apple` |
| [AppLovin](https://www.applovin.com/) | `a_applovin` |
| [Aura](https://www.auraads.us/) | `a_aura` |
| [Criteo](https://www.criteo.com/) | `a_criteo` |
| [Google Ads](https://business.google.com/us/google-ads/) | `a_google_adwords` |
| [Google Marketing Platform (GMP)](https://marketingplatform.google.com/) | `a_google_marketing_platform` |
| [InMobi DSP](https://advertising.inmobi.com/dsp) | `a_inmobi_dsp` |
| [Jampp](https://www.jampp.com/) | `a_jampp` |
| [Liftoff](https://liftoff.io/) | `a_liftoff` |
| [Meta](https://business.meta.com/) | `a_facebook` |
| [Moloco](https://www.moloco.com/) | `a_moloco` |
| [Pinterest](https://ads.pinterest.com/) | `a_pinterest` |
| [RTBHouse](https://www.rtbhouse.com/) | `a_rtb_house_sa` |
| [Snap](https://ads.snapchat.com/) | `a_snap` |
| [TikTok](https://ads.tiktok.com/) | `a_tiktok` |
| [Unity Ads](https://unity.com/products/unity-ads) | `a_unity` |
| [Mintegral](https://www.mintegral.com/) | `a_mintegral` |
| [Remerge](https://www.remerge.io/) | `a_remerge` |
| [Smadex](https://smadex.com/) | `a_smadex` |
| [YouAppi](https://youappi.com/) | `a_youappi` |
| [Impact](https://impact.com/) | `a_impact` |

</details>
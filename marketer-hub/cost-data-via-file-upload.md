---
title: "Via File Upload"
slug: cost-data-via-file-upload
---

## Overview

If you would like to upload your ad partner cost data using the Branch Dashboard, you can do so using ROI Hub's **File Upload** [view](https://dashboard.branch.io/ads/roi-hub/import?section=file-upload).

Uploading this data will pipe it to your Branch Dashboard reports, where you can analyze campaign performance across multiple ad partners in one place.

## Prerequisites

In order to start tracking cost data, you first need to:

1. Create a [Branch Dashboard](https://dashboard.branch.io).
2. Enable our [Performance product](packaging.md#performance-pro-tier) for your Branch account.

   1. Contact your Branch account manager or our [sales team](https://www.branch.io/contact-sales) to get started.
3. Implement the Branch SDK into your mobile app ([iOS](ios-basic-integration.md) | [Android](android-basic-integration.md)).

## File Templates

Before you can upload a file containing cost data, you first need to [create a file template](templates-for-cost-data.md#create-new-file-template) for the ad partner associated with data.

File templates help map your custom cost data fields to standard Branch fields.

## File Requirements

- Your file can have any name, but it must be a CSV file and end with the `.csv` file extension.
- For every row in your CSV, you **must fill out the following columns**:

  - `date` (use the format YYYY-MM-DD)
  - `campaign_name`
  - `cost` (enter cost data in the format `1234.56` - do not include any currency symbols or commas)
- **If** you fill out data for the `country_code` field, you must use the country code with capital letters, i.e. `FR` or `US`.
- **If** you fill out data for the `os` field, you must use one of the following values: `IOS`, `ANDROID`, `MAC_OS`, `WINDOWS`, `WINDOWS_PHONE`, `AMAZON_FIRE`, `AMAZON_FIRE_TV`, `ROKU`, `SAMSUNG`, `ANDROID_TV`, `LG`, `PANASONIC`, `TV_OS`, `CHROMECAST`, `PLAYSTATION`, `BADA`, `BEOS`, `BLACKBERRY`, `BSD`, `CENTOS`, `CHROMIUM_OS`, `DEBIAN`, `DRAGONFLY`, `FEDORA`, `FIREFOX_OS`, `FREEBSD`, `GENTOO`, `GNU`, `JOLI`, `KUBUNTU`, `LINUX`, `MANDRIVA`, `MEEGO`, `MINT`, `NETBSD`, `NINTENDO`, `OPENBSD`, `OS_2`, `RIM_TABLET_OS`, `SAILFISH`, `SLACKWARE`, `SOLARIS`, `SUSE`, `SYMBIAN`, `TIZEN`, `UBUNTU`, `UNIX`, `ZENWALK`, `XBOX`, `WEBOS`, `OTHER`, `ROBOTS`.

## File Upload

To upload a file containing cost data:

1. Navigate to the **Import** [tab](https://dashboard.branch.io/ads/roi-hub/import?section=file-upload) of ROI Hub, then click on **File Upload**.
2. You will see the **Upload cost file** view, where you need to fill out:

   1. Ad partner (required)

      1. You will only be able to select an ad partner if you have [created a file template associated with it](templates-for-cost-data.md).
   2. Default account ID (optional)

      1. You can find this on the [Ad Partner Settings page](https://dashboard.branch.io/ads/partner-management) for the ad partner.
      2. This is important if you are uploading data for the same ad partner multiple times, as it might override existing data uploaded.
   3. Default currency (required)

      *[Image: aa0cb33422bc2d91d37a8ad77caa3265ca35270081669c0cda3926a36fdb3212-c93dd7ac0a7b599bd4a212e8a4ad39ac0adfde21be288ab178c308536a08ca7e-Screenshot_2024-10-30_at_2.21.58_PM.png]*.png)
3. In the **Select cost data file** section, click the **Upload** button and upload your CSV file.
4. At this point, we recommend using the file validation feature to make sure your file is properly formatted before attempting to process it, since that can take several hours. To validate your file's formatting, click the **Run quick validation** button.  
   *[Image: 61d50667984827ecf90f38538c9282111958a86bacc9594894ea1536cb6fac09-Screenshot_2024-11-12_at_1.39.03_PM.png]*.png)
5. If your file is properly formatted, you will see a success message upon validation:  
   *[Image: b7f7ed43ad0e885c2203d72b8c542d0f10a5997c4399b348a905692a0d27d114-Screenshot_2024-11-12_at_2.16.58_PM.png]*.png)
6. Now that you have validated the file, click **Upload file** to begin uploading your cost data.

   *[Image: 3cdcb12d3c305d71eabd5f8e3b9782dfb24f0e03a76cca06fe3668b825c9e3a4-Screenshot_2024-11-12_at_1.39.49_PM.png]*.png)
7. You'll be prompted to either **Upload another file** if you want to add more data, or get taken back to the main File Ingestion tab view using the **Go to History** button.  
   *[Image: cac5da15048f12f2ed55231fd416eb1b7e1e8b2fd34ca4a13f7ed5cd93f5aea2-Screenshot_2024-10-30_at_2.26.12_PM.png]*.png)
8. If you click **Go to History** and return to the File Ingestion tab, you'll notice your file is now in the table and is in the **pending** state. Please note that it may stay in this state for several hours while the data is being processed.
9. Once your data is processed, it will get included on the [ROI Hub Overview page](https://dashboard.branch.io/ads/roi-hub/analytics).

### View File History

Once you have kicked off the upload process for a file, it appears in the table on the **Import History** [view](https://dashboard.branch.io/ads/roi-hub/import?section=import-history).

To learn more about the file:

1. Click the **View** button in the **Action** column for the file you are interested in.
2. When you click this button, you will see file details appear in a module.  
   *[Image: a822a8257aa856400905e031cb2f48b38611fd18391669da018456d85482f6e9-Screenshot_2024-10-30_at_5.32.00_PM.png]*.png)
3. If you click **View** on a file that failed during the upload process, you will see what the error was that caused the failure.  
   *[Image: ac899af068c14b83175e31dc169fa45b357054448ba36075a50a4dcfe6208307-Screenshot_2024-10-30_at_5.36.57_PM.png]*.png)
4. You can also click **Download file with errors** to download a CSV file that contains all the data from your file alongside the errors that occurred when Branch tried to process it.

### Filter Uploaded Files

Once you've uploaded some files containing cost data, you can filter them by different attributes. For example, you could filter by ad partner "Impact" and status "Success" to see all the successful file uploads related to Impact. Or you could filter by ad partner "All" and status "Failed" to see all failed imports. Make sure to note the **Import Type** column here, which can say either **File Upload** or **Email Importer**.

You can also search for the file name if you know any part of it. Please note that this search is **case-sensitive**.

## Error Handling

There are a few different errors that might occur during the upload process, which mainly have to do with formatting.

These are the errors messages you might see, as well as their corresponding meaning:

- **Required fields are missing or formatted incorrectly**: When any of the three required fields (`date`, `campaign_name` or `cost`) aren’t filled in or have the wrong format.
- **Bad datatype or formatting detected**: When the data in the column doesn’t match what’s expected (e.g. a value for `currency` is in the `cost` column).
- **Fields contain values not currently supported**: This is when the `country` or `os` column has a value that doesn’t match what is expected.
- **Required fields do not exist in data file**: This is when the column names `date`, `campaign_name`, or `cost` don’t exist in the file, or there are extra columns that don’t match the [template file](cost-data-via-file-upload.md#template).
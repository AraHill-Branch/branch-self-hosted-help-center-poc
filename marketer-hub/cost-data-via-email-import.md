---
title: "Via Email Import"
slug: cost-data-via-email-import
---

## Overview

ROI Hub's email import functionality does several key things:

1. It generates a unique email alias that you can give to your ad partner for them to send scheduled data to.
2. Data sent to the email alias gets piped to your Branch Dashboard reports, where you can analyze campaign performance across multiple ad partners at once.
3. It lets you test whether the format you and your ad partner are using to report cost data works with Branch.

## Prerequisites

In order to start tracking cost data, you first need to:

1. Create a [Branch Dashboard](https://dashboard.branch.io).
2. Enable our [Performance product](packaging.md#performance-pro-tier) for your Branch account.

   1. Contact your Branch account manager or our [sales team](https://www.branch.io/contact-sales) to get started.
3. Implement the Branch SDK into your mobile app ([iOS](ios-basic-integration.md) | [Android](android-basic-integration.md)).

## File Templates

Before you can set up a cost data email importer, you first need to [create a file template](templates-for-cost-data.md).

File templates help map your custom cost data fields to standard Branch fields.

## File Requirements

- Your file can have any name, but it must be a CSV file and end with the `.csv` file extension.
- For every row in your CSV, you **must fill out the following columns**:

  - `date` (use the format YYYY-MM-DD)
  - `campaign_name`
  - `cost` (enter cost data in the format `1234.56` - do not include any currency symbols or commas)
- **If** you fill out data for the `country_code` field, you must use the country code with capital letters, i.e. `FR` or `US`.
- **If** you fill out data for the `os` field, you must use one of the following values: `IOS`, `ANDROID`, `MAC_OS`, `WINDOWS`, `WINDOWS_PHONE`, `AMAZON_FIRE`, `AMAZON_FIRE_TV`, `ROKU`, `SAMSUNG`, `ANDROID_TV`, `LG`, `PANASONIC`, `TV_OS`, `CHROMECAST`, `PLAYSTATION`, `BADA`, `BEOS`, `BLACKBERRY`, `BSD`, `CENTOS`, `CHROMIUM_OS`, `DEBIAN`, `DRAGONFLY`, `FEDORA`, `FIREFOX_OS`, `FREEBSD`, `GENTOO`, `GNU`, `JOLI`, `KUBUNTU`, `LINUX`, `MANDRIVA`, `MEEGO`, `MINT`, `NETBSD`, `NINTENDO`, `OPENBSD`, `OS_2`, `RIM_TABLET_OS`, `SAILFISH`, `SLACKWARE`, `SOLARIS`, `SUSE`, `SYMBIAN`, `TIZEN`, `UBUNTU`, `UNIX`, `ZENWALK`, `XBOX`, `WEBOS`, `OTHER`, `ROBOTS`.

## Email Import Features

Let's walk through the features of the **Email Importers** [view](https://dashboard.branch.io/ads/roi-hub/import?section=email-importers), and see how to use each in turn.

First, click on the **Import** [tab](https://branch.dashboard.branch.io/ads/roi-hub/import) in ROI Hub. Then click on **Email Importers**.

![0aef6f8e8d79da1056664deb32e6f0e71253de2f6512088ac5b025670b989800-Screenshot_2025-02-27_at_2.13.48_PM.png](/img/0aef6f8e8d79da1056664deb32e6f0e71253de2f6512088ac5b025670b989800-Screenshot_2025-02-27_at_2.13.48_PM.png)

### Create Email Importer

To create a new email cost importer:

1. Click the **Set up Email Importer** button in the upper right-side corner.
2. You will be taken to the **Set up Email Importer** page, where you need to fill out:

   1. Ad partner (required)

      1. You will only be able to select an ad partner if you have [created a file template associated with it](templates-for-cost-data.md).
   2. Account ID (optional)

      1. You can find this on the [Ad Partner Settings page](https://dashboard.branch.io/ads/partner-management) for the ad partner.
      2. This is important if you are uploading data for the same ad partner multiple times, as it might override existing data uploaded.
   3. Currency (required)
   4. Email Importer name (required)

      1. A unique name for your Email Importer.
      2. A name will be generated for you, which you can choose to use or edit.
   5. Permitted domains (required)

      1. Domains associated with the ad partner that you want to allow, and that Branch should expect files from. This could be their regular base domain, or it could be an obscure domain they send emails from, depending on the ad partner.
   6. Expected frequency (optional)

      1. How often you expect cost data to get sent to Branch.
3. The next step is optional, but we recommend uploading a sample CSV file that represents the kind of file you expect to be sent to Branch, so that you can validate the formatting.

   In the **Test sample file** section, click the **Upload** button to upload the sample file. Then click the **Run quick validation** button.  
   ![00c608d7c6ec61257fa278cb62e52b53404eceab2597280fa29de4f8d3091e06-Screenshot_2024-11-12_at_5.10.52_PM.png](/img/00c608d7c6ec61257fa278cb62e52b53404eceab2597280fa29de4f8d3091e06-Screenshot_2024-11-12_at_5.10.52_PM(1).png)
4. If your file is properly formatted, you will see a success message upon validation:  
   ![c861a37b12772e0558868707a3d27b5e37f3cca951bcb03aa38800431b189357-Screenshot_2024-11-12_at_5.13.47_PM.png](/img/c861a37b12772e0558868707a3d27b5e37f3cca951bcb03aa38800431b189357-Screenshot_2024-11-12_at_5.13.47_PM(1).png)
5. Once your file has been validated, click the **Generate Email Alias** button. This button sets up the email importer and also creates an email address alias.

   Note the email alias that gets generated. You will need to share this email alias with your ad partner so they can send cost data to Branch.  
   ![805853a9d0f51cf7eacba3eac9810a3aa894703f1a47035e9a1cd919b547da71-2e9f0c18ffe6fc14e26a2a90a7a27d397513ecc1efb8baeec7c20bc46265c0b0-Screenshot_2024-11-12_at_5.20.31_PM.png](/img/805853a9d0f51cf7eacba3eac9810a3aa894703f1a47035e9a1cd919b547da71-2e9f0c18ffe6fc14e26a2a90a7a27d397513ecc1efb8baeec7c20bc46265c0b0-Screenshot_2024-11-12_at_5.20.31_PM.png)

### Check Email Import Status

To check the status of an email cost importer that you have created:

1. Return to the **Email Importers** view of the **Import** tab.
2. If you recently created a new email cost importer, you will see it in the table, and it will have a status associated with it. It can be in one of the following states:

   - **Pending**: This is the initial state that the email importer goes into when you create it. It means the importer has been set up, but no emails have come through yet.
   - **Active**: The first email has been imported and there were no errors.
   - **Error**: The latest email import attempt failed. Visit the [Error Handling section](cost-data-via-scheduled-ingestion.md#error-handling) for more.

### Filter Email Importers

Once you've created several Email Importers, you can begin to filter them by different attributes in the [table](https://branch.dashboard.branch.io/ads/roi-hub/import?section=email-importers).

For example, you can filter by ad partner "All" and status "Pending" if you want to see all the Email Importers that have yet to have a full run. Or you can filter by status "Error" to see any that might need troubleshooting.

## Error Handling

If your email cost importer is in the **Failed** state:

1. Visit the **Import History** view and find the file that failed.
2. Click on **View** in the **Actions** column for the row that represents the file that failed.
3. You will see a detailed view of what caused the file to throw an error during ingestion.  
    There are a few different errors that might occur during the upload process, which mainly have to do with formatting.  
    These are the errors messages you might see, as well as their corresponding meaning:

   - **Required fields are missing or formatted incorrectly**: When any of the three required fields (`date`, `campaign_name` or `cost`) aren’t filled in or have the wrong format.
   - **Bad datatype or formatting detected**: When the data in the column doesn’t match what’s expected (e.g. a value for `currency` is in the `cost` column).
   - **Fields contain values not currently supported**: This is when the `country` or `os` column has a value that doesn’t match what is expected.
   - **Required fields do not exist in data file**: This is when the column names `date`, `campaign_name`, or `cost` don’t exist in the file, or there are extra columns that don’t match the [template file](cost-data-via-file-upload.md#file-template).
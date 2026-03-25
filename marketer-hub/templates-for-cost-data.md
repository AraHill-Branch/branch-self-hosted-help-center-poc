---
title: "Templates for Cost Data"
slug: templates-for-cost-data
---

## Overview

Before you can set up [email imports](cost-data-via-email-import.md) or [file uploads](cost-data-via-file-upload.md) for an ad partner, you first need to create a file template for that ad partner.

File templates are how Branch is able to map the fields in your cost data to our standard Branch fields.

By setting up this mapping ahead of time, you can share cost data with Branch in the format that is convenient for you, and we'll take care of translating and analyzing that information.

### Required Fields

Please note that three fields/columns are **required** in any cost data you send us:

- `date`
- `campaign_name`
- `cost`

## Create New File Template

To create a new file template:

1. Navigate to ROI Hub and click on the **Import** [tab](https://dashboard.branch.io/ads/roi-hub/import).

   Click on **Costa data templates**, then the **Create new template** button.

   
2. You will be taken to the **Start setup** view of the **Create new template** process.

   In this view, you will need to select an **Ad Partner** from the dropdown and give the the template a name. Then click the **Save & Continue** button.

   
3. In the **Map fields** view, you will need to upload a sample file in CSV format that is representative of the kind of file you expect to import to Branch for that ad partner. All the fields you anticipate using for this ad partner should be included in the sample file.

   Please note that three fields are **required**: `date`, `campaign_name`, and `cost`.

   Click **Upload** to select a sample file from your computer.  
   
4. Once you upload a sample file, you will see the **File column headers** section on the left filled out, and on the right the **Branch fields** are empty. The file column headers have been pulled directly from your sample file, while the corresponding Branch fields need to be filled out.

   Click **Auto Map Fields** to have the Branch fields automatically populated for you. Alternatively, you can select each field individually.

   When your sample file fields are correctly mapped to Branch fields, click the **Save & Continue** button.  
   
5. In the **Validate** view, click the **Run quick validation** button to check that the values in the columns of your sample file are ingestible as expected by Branch. Once your file has successfully been validated, click the **Save & Close** button.

## Use a File Template

Now that you have created a file template, you can use it in either the **File Upload** [view](https://dashboard.branch.io/ads/roi-hub/import?section=file-upload) or **Email Importers** [view](https://dashboard.branch.io/ads/roi-hub/import?section=email-importers).

When selecting an ad partner on those tabs, you will only be able to select ones that have a file template associated with them. All others will be greyed out and have an icon that indicates "**This ad partner does not have a cost file template**" - clicking the icon will take you to a file template setup screen for that ad partner.


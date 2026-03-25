---
title: "ROI Hub File Templates for Importing Cost Data"
slug: new-roi-hub-file-templates-for-importing-cost-data
---

## Overview

File templates for ROI Hub make it easier to import your cost data for an ad partner. File templates are useful because they help map your custom cost data fields to our standard Branch fields.

Instead of needing to change your cost data to match Branch's required formatting when importing it, you can now create a file template. A file template is how Branch knows how to translate your cost data field names into ours.

Moving forward, you will need to make sure an ad partner has an associated file template created for it **before** you can [upload a CSV cost data file](cost-data-via-file-upload.md) or [set up email importing](cost-data-via-email-import.md) for that ad partner.

## Field Mapping

When creating a file template, you will need to upload a sample file that contains the fields you expect in your cost data. Put these fields as your column headers, and populate the rows with some sample data that is similar to what you would actually send to Branch.

At this point, you will need to map your field names to Branch field names. You can ask Branch to try to automatically fill these in for you with the **Auto Map Fields** button, and then make any corrections you need to.

![](/img/image(84).png)

Please note that the following fields are **required**:

- `date`
- `campaign_name`
- `cost`

## Learn More

See our guide for detailed steps on how to [create and use a file template](templates-for-cost-data.md) for more information.
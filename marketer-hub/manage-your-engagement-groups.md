---
title: "Manage Your Engagement Groups"
slug: manage-your-engagement-groups
---

## View Your Engagement Groups

Once you've created an engagement group, you can view it in the **Engagement Manager** table.

![](/img/506fd7c-Screen_Shot_2020-07-30_at_9.39.30_AM.png "Screen Shot 2020-07-30 at 9.39.30 AM.png")

The **Engagement Manager** table includes:

| Column Name | Description | Interactions |
| --- | --- | --- |
| Created | Date that the engagement group was created. | Sort column by name in first-to -last or last-to-first order. Default sort shows most recently created segments at top of table (last-to-first order) |
| Engagement Group Name | User defined engagement group name. | Sort in alphabetical ascending or descending order.   Click **Engagement Name** to open the builder step-by-step process and edit the settings behind an engagement group. |
| More Info | This summary unit will contain a free text description entered by the user and a summary of settings taken from the audience rules. This is effectively the same unit of information that appears at the end of the step-by-step user flow. | Click on to show more information. |
| Update Frequency | Frequency of auto-updates and last update date. |  |
| Collaborators | All third parties associated with this audience segment; as indicated by agency IDs associated with the audience segment.   This will be empty if the segment was created by the customer.   It will show one agency name if created by an agency. |  |
| Status | Whether the audience segment is set to auto-fresh or not. Can be either “Active” or “Stopped”. | Sort column in alphabetical ascending or descending order. |
| Action | Access the "CRUD" menu via the ellipsis. | **Download Latest Batch**: This will download the latest batch from the Engagement Group (Latest days worth, or weeks depending on the time frame) **See Files to Download**: This will take them to a Downloads page where users can see all files associated to the audience segment (including expired files) **Edit**: Access the step-by-step builder. **Duplicate**: Copies the audience segment rule to a new row without carrying over any exportable data (e.g. CSVs). User will need to re-launch the engagement group to generate any CSV. **Stop Engagement Group**:  Turns off auto-fresh  OR if group is already stopped, **Resume Engagement Group**. **Delete**: Removes engagement group and associated data. |

## Download an Engagement Group

To view your available downloads for each engagement group, click on the Action ellipsis in the far right column.

![](/img/253af1e-Screen_Shot_2020-07-30_at_11.50.50_AM.png "Screen Shot 2020-07-30 at 11.50.50 AM.png")

**Download Latest Batch**

Download all available files from the latest batch. For example, if this is a daily updated engagement group, the latest days files would be downloaded. If this was weekly, the latest weeks files would be downloaded. There may be multiple files that are downloaded when this occurs.

**See Files to Download**

If selected, you are taken to a dedicated “Downloads” page where you can view all the files associated with the engagement group (including expired files). On this page, you can also select the files you wish to download.

![](/img/bfb0d24-Screen_Shot_2020-07-30_at_11.10.08_AM.png "Screen Shot 2020-07-30 at 11.10.08 AM.png")

The **Downloads** table includes:

| Column Name | Description | Actions |
| --- | --- | --- |
| Data Date | The calendar date the engagement group data was created. | Sort column in chronological ascending or descending order. |
| File Name | The name of the CSV file as provided by Branch. | Sort column in alphabetical ascending or descending order. |
| Last Updated | The calendar date and time the batch was last updated. | Sort column in chronological ascending or descending order. |
| Reach | The first number indicates reach in this file; bolded number indicates the total reach of the engagement group. |  |
| File Size | The total size of the file. |  |
| Status | The current number of days until the file expires or has already expired. | Sort column in chronological ascending or descending order. |
| Action | Download the respective file. |  |

::: tip Things to Keep In Mind
- Engagement groups are run every 24hrs at 8pm PST. Depending on when you create the engagement group, exports may take up to 24hrs to be available for download.
- Exports are CSV files.
- Prepares one file for Android device IDs (GAID) and one file for iOS device ID (IDFA).
- Downloads are accessible for 30 days. At 30 days, we purge the files, better enabling compliance with GDPR. The download table includes a count down to the expiry of a downloadable file (see text under the download link). Previously expired files are listed without an accessible download link.
- Files are lists of device IDs with no other data.
:::

## Modify an Engagement Group

To modify an engagement group, click on the Action ellipsis in the far right column.

![](/img/f356766-Screen_Shot_2020-07-30_at_12.08.40_PM.png "Screen Shot 2020-07-30 at 12.08.40 PM.png")

The following actions are available to modify an engagement group:

- **Edit** - walks you through the engagement group creation wizard again.
- **Duplicate** - Copies the audience segment rule to a new row without carrying over any exportable data (e.g. CSVs).
- **Stop/Resume Engagement Group** - Turns off auto-fresh OR if group is already stopped,  
   resumes said group.
- **Delete** - Removes engagement group and associated data
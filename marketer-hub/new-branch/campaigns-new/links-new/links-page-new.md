---
title: "Links Page (New)"
slug: links-page-new
---

## Overview

Use the **Links** page to build, manage, and deploy links at scale through a dedicated interface in Branch. It also provides enhanced governance and data reporting on your Branch Links. Additionally, you get capabilities like template creation, export access, search, and filters.

## Manager

The **Links** page allows you to easily organize and view all of your Branch Short Links and Ad Links in one place.

Here you'll be able to search, filter, export, and bulk publish Branch Links.

#### Create links

For full guides on creating Branch Links, read the following articles:

- [Create Web Links](create-quick-links.md)
- [Create App Links](create-app-links.md)
- [Create Ad Links](ad-links.md)

### Search and filters

You can find the links you need using the search bar to search by title or URL.

You can also apply the following filters to find and organize links:

| Filter | Description |
| --- | --- |
| Archived | Filter for only archived or deleted Branch Links. |
| Unique | Filter for showing analytics unique to a user. For example, if 1 user clicks 100 times, it will count as 1. There is no concept of "unique revenue"; "revenue" is always the sum of all purchase events. |
| Link Analytics Window | Filter to only show Branch Links with attribution in a specific window. |
| Link Created Window | Filter to only show Branch Links created within a specific window. |
| Campaign | Filter for specific campaign names. Dropdown options are set when you create the Branch Link. |
| Feature | Filter for specific feature names. Dropdown options are set when you create the Branch Link. |
| Channel | Filter for specific channel names. Dropdown options are set when you create the Branch Link. |
| Tags | Filter for specific tags. Dropdown options are set when you create the Branch Link. |

### Bulk link tools

When you click the **Create Bulk Links** button, you will be prompted to select a Link Template or upload a CSV to create bulk links. Once you select, you can begin creating standardized links in bulk, and once you're done, you can copy and/or export all links.

You can:

- Add and edit links in bulk.
- Upload a CSV for bulk link creation.
- Export a CSV of both link attributes and links.
- Archive links.
- Delete links.

### Analytics

View your Branch Link performance through a report similar to Branch's [Events/Performance Table](dashboard-reports.md) on the **Links** page. It has the same column customizability and sorting for your measurement but specific to your Ad Links and Short Links.

::: info Note
The Activation product only includes the **Clicks** metric.
:::

#### Individual link stats

You can access detailed statistics for your individual Branch Links on the **Links** page.

Select the three-dot icon in the row of the link you are interested in, then click on the **Analysis** option from the drop-down menu that opens. This will take you to a page where the `link id` has already been set for you for that particular link. You will also see a click flow count, broken out by operating system.

## Templates

Link Templates are a way to apply specific standardizations to Branch Link you create in Branch. Read our [Link Templates](link-templates.md) article for more information.

## Folders

You can use folders to organize links and enforce template requirements.

::: info Note
Previously created Collections will now be viewable as folders.
:::

### Create a folder

Complete the following instructions to create a folder:

1. In Branch, select **Campaigns** > **Links**.
2. Select **Create** in the top-right corner of the page.
3. Select **Folder** from the drop-down menu that appears.
4. Enter a name for the folder.
5. Select whether you want a template to be associated with this folder. This will require that all links in this folder adhere to this template.
6. Select **Save changes**.

Your created folder will now be viewable on the **Links** page and while creating a link.

### View folders

By default, the **Links** page displays all of your created links.

Complete the following instructions to view a specific folder:

1. In Branch, select **Campaigns** > **Links**.
2. Select up-and-down arrow icon next to **All Links** at the top-left corner of the page.
3. From here, you can search or scroll through the list of folders.
4. Select the folder you want to open.

### Add an existing link to a folder

Complete the following instructions to add an existing link to a folder:

1. In Branch, select **Campaigns** > **Links**.
2. Select the three-dot icon on the right side of the link you want to add to a folder.
3. Select **Move** from the drop-down menu that appears.
4. From here, you can search or scroll through the list of folders.
5. Select the folder you want to add the link to.
6. Select **Save changes**.

::: info Note
If a folder has a template associated with it, you can only add links that have been created with that template to that folder.
:::

### Remove a link from a folder

Complete the following instructions to remove a link from a folder:

1. In Branch, select **Campaigns** > **Links**.
2. Select the three-dot icon on the right side of the link you want to add to a folder.
3. Select **Move** from the drop-down menu that appears.
4. Select the **Folder** drop-down menu and select **Remove link from folder**.
5. Select **Save changes**.
---
title: "LinkHub"
slug: linkhub
---

::: info Attention
Learn more about Branch’s new [Links Page,](https://help.branch.io/docs/links-page) which contains an enhanced interface that will help you build, manage, and deploy links at scale.
:::

## Overview

Use LinkHub to build, manage, and deploy links at scale through a dedicated interface in the Branch Dashboard. LinkHub also provides enhanced governance and data reporting on your Branch Links. Additionally, you get capabilities like template creation, export access, and fast search/filters.

## Manager

LinkHub’s **Manager** tab allows you to easily organize and view all of your Branch Short Links and Ad Links in one place.

Here you'll be able to search, filter, export, and bulk publish Branch Links.

#### Create links

You can create Branch Links directly through LinkHub, and you should see a similar interface to how you were generating Branch Links in the Dashboard already. For full guides on creating Branch Links, please read the following articles:

- [Create Web Links](create-quick-links.md)
- [Create App Links](create-app-links.md)
- [Create Ad Links](ad-links.md)

### Search and filters

On the **Manager** tab, you can easily find the links you need using the search bar to search by title/URL. If you have Activation, you can switch between **All Links**, **Web Short Links**, **App Short Links**, and **Custom QR Codes** views. If you have Performance, you can also select a separate **Ad Links** view.

You can also apply the following filters to make your organization easier:

| Filter | Description |
| --- | --- |
| Archived | Filter for only archived/deleted Branch Links. |
| Unique | Filter for showing analytics unique to a user. For example: if 1 user clicks 100 times, it will count as 1. There is no concept of "unique revenue"; "revenue" is always the sum of all purchase events. |
| Link Analytics Window | Filter to only show Branch Links with attribution in a specific window. |
| Link Created Window | Filter to only show Branch Links created within a specific window. |
| Campaign | Filter for specific campaign names. Dropdown options are set when you create the Branch Link. |
| Feature | Filter for specific feature names. Dropdown options are set when you create the Branch Link. |
| Channel | Filter for specific channel names. Dropdown options are set when you create the Branch Link. |
| Tags | Filter for specific tags. Dropdown options are set when you create the Branch Link. |

### Bulk link tools

When you click the **Create Bulk Links** button, you will be prompted to select a Link Template or upload a CSV to create bulk links. Once you select, you can begin creating standardized links in bulk, and once you're done, you can copy and/or export all links.

When using any bulk actions like bulk link creation, all of your links associated with the bulk action will be under the one *Collection*. You'll be able to:

- Add/edit links in bulk. Columns in the bulk editor can now be re-sized and re-arranged via drag and drop
- Upload a CSV for bulk link creation
- Export a CSV of both link attributes (with the bulk editor) and links (with the Link Manager table)
- Create QR codes
- Archive links
- Delete links

![](/img/06210e9-LinkHub_Bulk_Edit(1).png)

### Analytics

LinkHub Manager allows you to easily view your Branch Link performance through a report similar to Branch's [Events/Performance Table](dashboard-reports.md). It has the same column customizability and sorting for your measurement but specific to your Ad Links and Short Links.

::: info Note

::: info Note
The Activation product only includes the **Clicks** metric.
:::

:::

![](/img/3a32fe2-LinkHub_Analytics(1).png)

#### Individual link stats

You can also access detailed statistics for your individuals Branch Links from the Manager tab.

Select the three-dot icon in the row of the link you are interested in, then click on the **View Stats** option in the dropdown that opens.

The Activation product only includes the **Clicks** metric.

![](/img/f22304584172279ef04858af1ce4ca06cf0818c70c9ada1f69b530b00af249e2-Screenshot_2024-12-23_at_2.58.43_PM(1).png)

This will take you to a page where the `link id` has already been set for you for that particular link.

![](/img/4cdd8e1d6ef3d0041b7c5c443337ac63be6003d4ae0602c3ba6e624da628df5e-Screenshot_2024-12-23_at_3.05.37_PM(1).png)

You will also see a click flow count, broken out by operating system.

![](/img/45572dab74f5851a616ec6c129fcd06d448b1375dc6581e6723a3719f013323c-Screenshot_2024-12-23_at_3.05.45_PM(1).png)

## Templates

Link Templates are a way to apply specific standardizations to Branch Links you create on the Dashboard. Read our [Link Templates](link-templates.md) article for more information.
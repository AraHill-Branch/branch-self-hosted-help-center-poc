---
title: "Link Templates"
slug: link-templates
---

::: info Attention
Learn more about Branch’s new [Links Page](https://help.branch.io/docs/links-page), which contains an enhanced interface that will help you build, manage, and deploy links at scale.
:::

## Overview

[Link Templates](https://dashboard.branch.io/quick-links/link-templates/) is a tab in the LinkHub page of the Branch Dashboard and is automatically included as part of Branch's [LinkHub](linkhub.md) product. It allows you to manage all of the templates that your Short Links may be using. A Link Template can be applied when creating a Short Link to auto-apply reusable attributes that can be used on multiple Short Links. Applying a Link Template to your Short Link has many benefits and can save you time when managing your Branch-powered campaigns.

#### Benefits of Link Templates

- Reusable templates
- Avoid creating duplicate links
- Create links with just one click
- Pre-populate values for cleaner analytics

## Before you begin

Your Branch Account requires permission to the Link Templates feature via the **Link Template Settings Permission**. This can be set on each individual by an admin in your Branch Dashboard's [Team Member Settings](https://dashboard.branch.io/account-settings/team).

“Admin” and “Team Member” users will get View & Edit access to Link Templates automatically. “Full Read” will get View access. “Limited Read” and “User Coordinator” will not get any access.

| Permission | Details |
| --- | --- |
| View | Ability for the user to use and access existing Link Templates. |
| Edit | Ability for the user to create, edit, archive, and duplicate Link Templates. |

Additional details on setting permissions for users on the Branch Dashboard can be found [here](add-manage-users-roles-permissions-access.md).

## Create Link Template

To create a Link Template, navigate to the Link Template tab from the LinkHub page in the Branch Dashboard. Alternatively, if you have not created a Link Template before, you will have the option to create a Link Template when creating a Branch Short Link.

Click **Create New Template**.

### 1. Name Link Template

The first and required step is to name your Link Template. Make sure to make the name of your template descriptive as it will make it easy to remember and apply the template for future Short Links along with additional details about the template in the Link Template Note section.

Below the Link Template Note section, you can mark specific field names to be **Required**. checking the respective checkbox for a given field name will enforce the user to fill out values for those fields when the template is applied to a Short Link.

### 2. Analytics Tags

Adding analytics tags to your Link Template is optional. We recommend adding analytics tags so that your Dashboard Reports all use the same standard naming conventions for tracking campaign performance. These fields can also be marked as **Required**.

### 3. Redirects

Adding redirects to your Link Template is optional. You can specific redirects by platform. Doing so will determine the user experience when clicking on the link without the app installed to route the user to the app store, a web page, or a deep view. These fields will always be marked as **Required**.

Setting the **Redirect Type** to *Default* will use the settings set on the [App Settings](configure-default-link-behaviors.md) page.

### 4. Link Data

Adding link data to your Link Template is optional. You can add fields that will be useful for the mobile app (ex. [deep linking parameters](deep-link-data-options.md#deep-link-data-key-values)). You may need to reach out to your mobile development team to confirm with key/value pairs are necessary for your link based on your use case. These fields can also be marked as **Required**.

### 5. Social Media Tags

Adding social media tags to your Link Template is optional. These tags can be set in order to fill Open Graph tags that make your Short Link more descriptive with a title, description, and image.

If you set a fixed value for the Original Web URL field in the Name Link Template step, links created from this template will scrape that URL for open graph tags to fill the social media tags.

## Manage Link Templates

If you've created any Link Templates, you can view and manage them all on the [Link Templates](https://dashboard.branch.io/quick-links/link-templates) tab.

#### Link Template Actions

For each Link Template, you can perform a specific action:

- Edit Template: This action will allow you to edit the template.

  - Editing a template will not retroactively change Short Links that have already been made using the template.
- Create Link from Template: This action will allow you to create a Short Link with the template applied to it.
- Archive Template: This action will remove the delete the LInk Template. **Archiving does not impact existing Short Links using the template.**
- Duplicate Template: This action will create a copy of the template and let you change the copied Link Template's attributes.
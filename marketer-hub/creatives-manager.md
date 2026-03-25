---
title: "Creatives Manager"
slug: creatives-manager
---

## Overview

[Creatives Manager](https://dashboard.branch.io/journeys/creatives/) is a tab in the Branch Dashboard as part of Journeys. It allows you to look at all of your creatives (the banner, button, and/or interstitial) for easier management. A Journeys campaign consists of one or more creatives to drive your end-users from mobile web to app. You can now manage, create, edit, delete, or duplicate all of your creatives in one place.

### Use Cases

1. Manage (build, edit, delete, duplicate) your creatives in one place.
2. Build a creative without creating a new Journeys campaign, allowing you to assign it to a Journey at a later date as needed.

## Managing Creatives

### Templates

![](../../../assets/media/images/f829447f-c736-4ed8-b07a-b18d00241aad "Creatives Manager Template.PNG")

The [Templates Tab](https://dashboard.branch.io/journeys/creatives/templates) allows you to view all of the default Branch-provided creatives. These templates are used as a starting point for the creatives that you customize for your brand and use case. There are 20+ templates to choose from, and this is where you start to [build new creatives](creatives-manager.md#buildedit-creatives).

### My Creatives

![](../../../assets/media/images/6b2c7372-d310-4d47-b829-10e2aea228f3 "Creatives Manager My Creatives.PNG")

The [My Creatives Tab](https://dashboard.branch.io/journeys/creatives/my-creatives) allows you to view all of the custom creatives that you or other team members have created. The creatives here can be [edited](creatives-manager.md#buildedit-creatives), [deleted](creatives-manager.md#delete-creatives), or [duplicated](creatives-manager.md#duplicate-creatives). Some of the creatives here may already be assigned to a Journey, while others might not be assigned yet.

You can filter the creatives being shown by the Journeys campaigns they are assigned to.

## Build/Edit Creatives

A creative built through the Creatives Manager go through a slightly different process than if you are building it directly from creating a Journeys campaign.

#### 1. Select a template

Go to the [Templates Tab](https://dashboard.branch.io/journeys/creatives/templates) and select one of the 20+ templates as a base starting point for the creative you are looking to build.

#### 2. Customize your creative

You will need to name your unique creative and

##### View Editor

![](../../../assets/media/images/664a7311-12b1-4f06-8e26-0caa5ecf0c1c "View Editor.PNG")

The *View Editor Tab* allows you to utilize Branch's WYSIWYG editor to customize your creative. Just click on the element you want to edit, and the View Editor Tab will populate with fields you can input details about that element for you to customize (text, font, color, alignment, etc.).

Fill out the View Name. This should reflect the banner type and any additional information to help track performance when testing. **Note:** Try to stick to a naming convention so that you can easily find the creative later.

Customizable Elements (elements dependent on the selected template):

- App Icon
- Title
- Description
- [Background](journeys-image-recommendations.md)
- Content Position
- Ratings Star Count
- Reviews
- Call to Action
- Dismiss Journey Configuration

##### CSS Editor

![](../../../assets/media/images/2d3e5c03-adf0-48cb-aee2-b7dbafa4e23b "CSS Editor.PNG")

You can utilize the *CSS Editor Tab* to customize your creative even further closer to your brand. This is for advanced users who have familiarity with CSS.

##### Page Placement

![](../../../assets/media/images/f9ef225e-acc6-4540-b178-0f561d9018a6 "Page Placement.PNG")

Use the *Page Placement Tab* to set the different styles of the way the banner/interstitial sits on the page.

**Note:** Implement the `<>` element from the *Advanced Embed Options section* as the first child of your website's sticky top navigation bar to account for the height difference.

##### Dismissal Settings

![](../../../assets/media/images/787df192-0dbb-4649-a3de-6c3587076412 "Dismissal Settings.PNG")

Use the *Dismissal Settings Tab* to adjust the behavior of your Journey when the user dismisses it. In some cases, rather than simply ignoring your Journeys, your users may want to dismiss them (by clicking either the **“X”** or the dismissal text on the Journey). In order to make sure that your users are having the best possible experience while also converting at the highest rate, you can adjust your Journeys’ dismissal settings while you’re setting up your creative.

- Dismissal Behavior: Choose what happens when a user dismisses a Journey. **“Close Journey”** will simply cause the Journey to close upon being dismissed; **“Redirect to a web page”** will cause the Journey to close and redirect to the webpage of your choice.
- Dismissal Period: Use the dropdown to choose how long the Journey should be dismissed. Next, decide whether dismissing this Journey should cause only this Journey or all Journeys to be dismissed for the chosen period.

**Note:** Dismissal Settings is only adjustable if the creative you are building/editing is already assigned to a Journeys campaign.

#### 3. Save your creative

Your finished creative should appear in the [My Creatives Tab](https://dashboard.branch.io/journeys/creatives/my-creatives).

## Delete Creatives

When deleting a creative from the [My Creatives Tab](https://dashboard.branch.io/journeys/creatives/my-creatives), you will be prompted with one of two messages:

#### Deleting an Assigned Creative

![757](../../../assets/media/images/5ca115c4-7ff9-4f98-b3fd-64e6d02d7e3d "Delete Assigned Creative.PNG")

Attempting to delete will have an impact on a created Journey, so clicking **"Yes, Continue"** will redirect you to managing that Journey. You will need to unassign the creative from that Journey before you are able to delete it.

#### Deleting an Unassigned Creative

![760](../../../assets/media/images/d1316658-3da9-4456-8722-2a85477a4e06 "Delete Unassigned Creative.PNG")

Click **"Yes, Delete"** to permanently delete the creative.

## Duplicate Creatives

![](../../../assets/media/images/2084f860-57db-46b6-aa00-14c80e5d087e "Duplicate.PNG")

Duplicating a creative from the [My Creatives Tab](https://dashboard.branch.io/journeys/creatives/my-creatives) will make an exact copy of the selected creative and redirect you to [edit the duplicate creative](creatives-manager.md#buildedit-creatives).
---
title: "Journeys Manager"
slug: manage-journeys
---

## Managing Journeys App Banners



The [Journeys Manager](https://dashboard.branch.io/journeys/manager) is your homepage for all of the personalized experiences you have created.

From the actions menu you can:

- Start
- Schedule
- Edit
- Clone
- Analyze
- Archive

### Journey Status

A Journey can have one of five statuses:

| Status | Meaning |
| --- | --- |
| Draft | Not yet published but editable. If you delete a draft, **it also deletes the corresponding creative**. |
| Active | Live for your users and editable. |
| Stopped | Not live for your users but editable. |
| Archived | Not live for your users but editable. |
| Scheduled | Not live until set date/time but editable. |

## Filter View

**Filter View** allows you to set specific filters to organize all of your Journeys in one place.

For any Journey, you can set/change its state, reorder its priority, edit or clone it, and analyze its performance. You can also adjust the filters to show Journeys by state, and you can sort by column.

### Journey Quick Look

To quickly preview the contents of a Journeys banner, simply hover on the corresponding row. An overlay appears that displays up to two previews of banners and up to two filters configured for a Journey.

You can also **Add More Templates** and/or **Add Rules** to the Journey from the Quick Look.



## Journeys Versioning

When you are editing a Journey (that is in any state **except the draft state**), you can save your changes in a way that updates the version number associated with that Journey.

By changing the version number as you are making edits to your Journey, you can keep track of different variations to that Journey and keep a historical log of any updates.

To use the versioning system:

1. Click on the three dots in the row associated with the Journey you are interested in. This will open a menu of actions you can take.

   
2. Click on the **Edit** option to open details about the Journey that you can make changes to.

   
3. Make the edits that you need to make for this Journey, and then click the **Save & Continue** button.
4. At this point, a popup will appear asking if you would like to increase the version number for the Journey you are working on.

   
5. To increase the version number of the Journey, click the **Yes, proceed** button.

   1. You also have the option to skip a version increase by clicking **Proceed without version update**.
6. Once you've increased the version number, you can also add a descriptive note to associate with that version.

   
7. Click **Save** to save your update note.
8. Continue through the **Configure Creatives** and **Validate & Test** sections. When you are done, you will be brought back to the **Manager** tab.
9. Inspect the **Version** column for the Journey you have been editing. You will see a number listed, which represents the latest version number for that Journey.

   
10. You can also hover over the clock icon, which will display the description associated with the latest Journey version update.

    
11. Click the **Version History** button to be taken to the complete version history for that Journey.

    

## Priority View

**Priority View** allows you to set the priority of multiple Journeys when they “overlap,” meaning when a single person is eligible to see multiple Journeys. You can choose the Journey that should show ahead of any others.

Let's say you have two Journeys that may reach the same audience:

- A half-page interstitial that promotes an offer on your "Shoes" category page.
- A smart banner that should show for all visitors.

In general, you'd like the interstitial to show ahead of the smart banner on the "Shoes" category page (where both audience segments overlap). To configure the prioritization:

1. In **Filter View**, hover on the priority value of a Journey you want to update.
2. In the popover that appears, enter the number and click **Save**.
3. The table should refresh with the new priority value(s).

Alternatively:

1. Switch to the **Priority View** by clicking on the toggle.
2. Drag and drop Journeys in the order you'd like them to show. Lower numbers mean higher priority (i.e. a Journey with priority 1 is going to show ahead of a Journey with priority 2).
3. Click the **Save** button when you're done.

Now all Journeys will be prioritized in the order they appear in the table.

### Prioritization FAQ

Below are a few frequently asked questions about prioritization related to Journeys.

#### When do my Journeys prioritization rules apply?

Prioritization only takes effect when two Journeys are overlapping. If you have a Journey targeting iOS users and a Journey targeting Android users, the prioritization won't matter. If you update the Journey targeting iOS to now target iOS and Android users, the higher priority Journey will show to Android users.

#### What happens if a user dismisses a banner or interstitial?

When a user dismisses a banner or interstitial, that banner or interstitial will be dismissed for the amount of time specified in the Journey’s dismissal settings.

If the Journey has been configured to dismiss all Journeys when dismissed, no other Journey will be shown to the user for the duration of the dismissal period. However, if the Journey has been configured to dismiss only that Journey, other applicable Journeys will still be shown to the user. To view your dismissal settings, edit your Journey, click Save & Continue, click on the name of your Journey and navigate to Dismissal Settings.

#### Why do I have to prioritize stopped and draft Journeys?

It’s important to prioritize all non-archived Journeys because Journeys can be set live from draft or stopped mode.
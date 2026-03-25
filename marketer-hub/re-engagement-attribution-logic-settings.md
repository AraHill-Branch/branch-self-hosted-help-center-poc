---
title: "Re-engagement Attribution Logic & Settings"
slug: re-engagement-attribution-logic-settings
---

## Overview

We think about event attribution and re-engagement as different but linked concepts. When we connect an install or event to a click or impression, we refer to this as attribution. Accordingly, we have various attribution windows that define the allowable length of time between a click or impression to install or event. If an install or event occurs outside of the set attribution window, then attribution is not performed. When we attribute an event, we update the corresponding ad click or impression as having been used for attribution.

For more information, please read [Branch Attribution Logic & Settings](branch-attribution-logic-settings.md).

## Re-engagement Determination

Similar to the function of the attribution windows referenced above, the re-engagement window defines the allowable length of time between two events (non-install events) that a user must be inactive in order to define the later event as a re-engagement. This determination can be used in re-engagement cohort analysis and Postbacks, but not in dashboard activity analytics.

Denoting an event is re-engagement occurs in addition to the attribution of the event itself; i.e. the event is first attributed using the attribution windows above and then marked as re-engagement when applicable using the re-engagement inactivity window.

![](/img/d99590f-reengagement-inactivity(1).png "reengagement-inactivity.png")

## Re-Engagement Inactivity Window Settings

By default, Branch sets the re-engagement inactivity window to 7 days. This means any attributed non-install event occurring 7 days (or more) after the most recent activity will be marked as re-engagement. Once a user completes an event that is attributed as re-engagement, all subsequent events will continue to be attributed as engagement until another 7 days of inactivity have passed.

To modify your app-level re-engagement inactivity window:

1. In the left-hand nav, click on **Configuration**.
2. On the **Configuration** page, click on the **Attribution Windows** tab.
3. Scroll down to the **Re-engagement Inactivity** setting and edit the value to any value between 0.001 and 90 days.

![](/img/c2f098e-re-engagement-attribution(1).png "re-engagement-attribution.png")

## Partner Settings for Acquisition Only Campaigns

While the app-level re-engagement inactivity window is a global setting that applies to any partner you work with to market your app and can be used in re-engagement cohort analysis and postbacks, there is also a related partner-level setting.

When this setting is enabled, we will only attribute events for this partner based on the touch (click or impression) that drove the install. This is useful for ad partners that are only used for acquisition campaigns and essentially disables "re-engagement" attribution. Other attribution windows (for example, click to conversion) still apply to the install touch.

Unlike the app-level setting, this impacts all analytics and postbacks, and can be configured on a per partner basis.

::: warning Enabling Install Touch Setting
Currently this setting is not available in your Branch dashboard. If you are interested in having this setting available in your account, please contact [Support](submit-a-ticket.md).
:::

1. In the left-hand nav, click on **Ads** and then on **Partner Management**.
2. Search for and select the partner you wish to enable install touch for.
3. On the partner's **Attribution Windows** tab, toggle **Use ad partner attribution settings** on.
4. At the bottom of the attribution window settings table, tick the box next to **Only attribute based on touch**.
5. Click **Save**.

![](/img/714b813-install-touch-setting(1).png "install-touch-setting.png")

## Viewing Re-Engagement in Reporting

While re-engagement activity is not viewable in the Ads Activity report, you can use the Cohort report to easily evaluate the long term behavior – i.e. interaction with your web or app properties as measured by in-app events and/or web interactions – of your users based on their re-engagement cohort.

To view a re-engagement cohort:

1. In the left-hand nav, click on **Ads**, click on **Analytics** and then click the **Cohorts** tab.
2. Click **Create New Cohort** and select **Re-engagement** as the **Cohort Type**.
3. Finish your report selections and click **Save**.

![](/img/9c1ea1a-reengagement-cohort(1).png "reengagement-cohort.png")
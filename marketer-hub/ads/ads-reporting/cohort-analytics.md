---
title: "Cohort Analytics"
slug: cohort-analytics
---

## Overview

Cohort analysis is a powerful tool that helps you not only understand the full ROI of your campaigns, but also helps you guide future investment decisions and consumer targeting.

The Cohorts Analytics report allows you to analyze your cross-channel, cross-platform Branch data by either acquisition date (app install only) or re-engagement date (web and app sessions) to see how those users performed over time.



As a tool used to separate growth metrics from engagement metrics, cohort analysis allows you to evaluate user behavior over time including key metrics such as retention and lifetime value (LTV).

This report is available within the following Channels (if said channel is part of your contract):

- Journeys
- Ads
- Email

::: info Data Limits
**Cardinality Protection**

Branch limits all dimensions to 40,000 values per publisher per day. This means that you can only see up to 40,000 unique campaigns, ad names, etc in the Dashboard.

If an app tries to send up > 40,000 values for a single dimension (e.g. ~campaign) in a day, then Branch stops tracking those unique values. Branch combines additional values together and bucket them under the value "Other".
:::

## Data Requirements

In order for the Cohort Analytics report to provide insights, you must be measuring events using the Branch SDK and/or the Branch Web SDK (based on your product usage).

If you want to include cost data in the analysis, you must have one or more of the following partner integrations enabled: Facebook, Google, Apple Ads or Snap. Cost data is not currently supported for other partner integrations.

## Acquisition vs Re-engagement Cohorts

When creating your cohort for analysis, you can choose to base the cohort on either acquisition (install) activity or re-engagement activities.

An install cohort allows you to evaluate the long term behavior – i.e. interaction with your app as measured by in-app events – of your users based on their install cohort. **NOTE**: Reinstalls are not included in acquisition cohorts.

A re-engagement cohort allows you to evaluate the long term behavior – i.e. interaction with your web or app properties as measured by in-app events and/or web interactions – of your users based on their re-engagement cohort.

A re-engagement can be any event that creates a web or app session after a period of inactivity, such as web session starts or opens.

::: warning Acquisition & Reengagement Changes Post iOS 14.5
Apple requires users to opt into sharing their device data through [Apple's AppTrackingTransparency framework](https://developer.apple.com/app-store/user-privacy-and-data-use/) (ATT). When an install is attributed to paid ads, a 2nd **install** event will fire post user opt-in

Opt-ins will affect your cohorts due to their delayed nature. This means that when reviewing a cohort over time based on attribution data, users will move buckets depending on what you are comparing by. Our advice:

- If you always push ATT opt-in on t+X days, cohorts will always be offset by x days
- If you gamify when you push ATT opt-in, cohorts will feature two partially countervailing trends:

  - increasing membership over time as users who installed on day zero opt-in
  - decreasing membership as users who installed on day zero stop using the app

For additional information on changes post iOS 14.5, visit our [FAQ Pages](https://help.branch.io/faq/docs/ios-14-faqs).
:::

### Re-engagement Inactivity Period

Since re-engagements can only occur after a period of inactivity, any event used for performance analysis can only be part of one re-engagement cohort. A session-qualifying event only counts as a re-engagement if it occurs after a period of inactivity. However, a user can be in multiple re-engagement cohorts if they are re-engaged multiple times.

The default re-engagement inactivity window is 7 days. You can modify this window under **Configuration** > **Attribution Windows**.



## Building Your Cohort

To create a cohort, click on the **Create New Cohort** button and provide the following information:

- **Cohort Name**
- **Cohort Type**

  - Acquisition (install)
  - Re-engagement (any session across web and app)
- **Cohort Date Range**

  - When the install or re-engagement event occurred
- **Include Cost Data**

  - Only available on the Ads Partner level
- **Measurement**

  - Show
  - Compare by
  - Where
  - Equals



### Cohort Measurement Options

When creating a new cohort, the following measurement options are available to you.

#### Show

Show measures include important KPIs and metrics which you can use to hone in on user activity.

| Measure | Description |
| --- | --- |
| Add Payment Info | Add Payment Info events |
| Add to Cart | Add to Cart events |
| Add to Wishlist | Add to Wishlist events |
| ARPPU | Average revenue per paying user; Ads Channel only |
| ARPU | Average revenue per user; Ads Channel only |
| Cost | Total cost; Ads Channel only |
| eCPA | Effective cost per purchase; Ads Channel only |
| eCPI | Effective cost per install. The total cost of the campaign divided by the number of installs driven; Ads Channel only |
| Gross Profit | Amount; Ads Channel only |
| Initiate Purchase | Initiate Purchase events |
| Lifetime Value | Cumulative revenue divided by the size of the cohort |
| Opens | Open events |
| Purchase | Purchase events |
| Retention | The ability of a product or service to retain its existing customers, with retention rates measuring the ratio of customers who are devoted and “stay” (those who keep using and supporting your app) to the total number of customers who installed your app. |
| Revenue | Revenue for commerce events |
| ROAS | Return on Ad Spend. Revenue as a percentage of cost (will need this to compare for cohorts); Ads Channel only |
| ROI | Return on investment. Profit as a percentage of cost; Ads Channel only |
| Spend Credits | Spend Credits events |
| Users | The total number of unique users for each compare by in your cohort. Accessible in Table View only. |
| View Cart | View Cart events |

#### Compare by & (where/and/equals) Filters

Compare by and (where/and/equals) filters can be applied to any cohorting event - install or re-engagement - as well as any downstream event.

| Name | Description |
| --- | --- |
| **ad name** | The name of the ad used in your campaign. |
| **ad partner** | The name of the ad partner attributed to the install/re-engagement event. |
| **ad set name** | The name of the ad set used in your ad. |
| **attributed** | Whether or not the install/re-engagement event was attributed; values ‘true’ or ‘false’. Note: It is not supported for cost data so a $0 cost appears when this is selected. |
| **campaign** | The name of the campaign associated with the install/re-engagement event. |
| **channel** | The name of the channel associated with the install/re-engagement event |
| **country** | The country code associated with the install/re-engagement event. |
| **creative name** | The name of the creative used in your ad. |
| **date** | The date of the event associated with the install/re-engagement event. |
| **environment** | The overall environment - app OR web - associated with the install/re-engagement event. |
| **environment (conversion event)** | The overall environment - app OR web - associated with the downstream event. |
| **feature** | The name of the Branch feature from which the install/re-engagement event. stems; paid advertising (Ads), journeys or email provider. |
| **has app** | Whether or not the user already had the app was installed before the re-engagement event; values ‘true’ or ‘false’. |
| **has clicked ad** | Whether or not the user clicked on an ad using a Branch Link; values ‘true’ or ‘false’. |
| **has clicked email** | Whether or not the user clicked on an email using a Branch Link; values ‘true’ or ‘false’. |
| **journey name** | The name you gave the Journey associated with the install/re-engagement event. |
| **keyword** | They keyword used in your ad. |
| **last attributed touch type** | Whether the last attributed touch was a click or an impression |
| **name** | The name of the app or web event associated with the install/re-engagement event. |
| **os** | The operating system of the device associated with the install/re-engagement event. |
| **os (conversion event**) | The operating system of the device associated with the downstream event. |
| **platform** | The platform - Android, iOS, Web, Desktop - associated with the install/re-engagement event. |
| **platform (conversion event)** | The platform - Android, iOS, Web, Desktop - associated with the downstream event. |
| **referring domain** | The name of the Branch referring domain associated with the install/re-engagement event. |
| **secondary publisher** | The secondary publisher specified for the last attributed touch, passed by the ad network. |
| **stage** | The name of the stage associated with the install/re-engagement event |
| **tags** | The tags associated with the install/re-engagement event |
| **view name** | The name of the Journey campaign associated with the install/re-engagement event. |
| **web format** | Whether the touch that referred the install or re-engagement event occurred on AMP web or regular web |

## Using Visualizations Options

Once you’ve created a cohort, you can view the resulting analytics. All created cohorts include the following visualization functionality:

- **Unique Counts** - When "Unique" is checked, these are unique to a user. For example: if 1 user clicks 100 times, it will count as 1. There is no concept of "unique revenue"; "revenue" is always the sum of all purchase events.
- **Time Interval and Granularity**
- **Incremental vs Cumulative** - Incremental shows only data that occurred that day, giving visibility into how performance changes over time. Cumulative shows data that occurred that day plus all previous days, giving visibility into overall performance over time.
- **Apply Cost Data** - shows the cost per event for each compare by in your cohort.
- **Total vs Per User Counts** - Total shows the total number for that day. Per user shows the total number for that day over the total number of users for each compare by in your cohort.
- **Table vs Time Series View**
- **Download CSV**
- **Share Page State**
- Saved Views

  - Rename
  - Delete
- Reset Page State



### Appendix: What is Cohort Analysis?

Cohort analysis is the study of behaviors of groups over time. What behaviors and what groups you ask? "Behaviors" can be any actions you find relevant or that you are interested in. “Groups” are aggregations of data points or users that share a commonality and hence form a cohort.

So let’s apply this to a very basic real world example. You’re interested in knowing the average income over the first five years for college graduates during 2008 and 2009. If you were to look at a graph that charts this information you would view something akin to this:



When you look at the income on an actual-basis, the average student income would be graphed for the year that it occurred—using the date time of the event in the analysis. The report above displays the data based on when the event happened. Using this type of linear analysis, it is difficult to compare one group to the other in order to determine any relationship between year of graduation and income because the timing is not static and the graduating classes are at different points in their careers for each year of comparison.

So let us take a look at this example using cohort analysis. As each graduating group of students is a cohort (they all graduated in the same year), we can evaluate the average income for each cohort using their graduation year as the initial event (t0) and graph their income relative to each year subsequent to their graduation (t0 +1, t0 +2, t0 +3, etc.).



By using cohort analysis, you are able to evaluate unique cohorts with one another for an "apples to apples" comparison that is not possible when using linear analyses. Here, you can see that both graduating classes do increase their average income per year, but that by the third year out, the 2009 grads make more on average than their 2008 counterparts.

## FAQs

<details>
<summary>In Cohorts, why is the number of "users" not the same as "Day 0"? Shouldn't those numbers be equal because every user opens the app when they first install it?</summary>

Day 0 shows the number of users that opened your app on the first day itself after triggering the install event. The install event is different from the open event, where a user opens the app for the first time after the installation.

Branch gets to know about an installation only when the 'first open' happens, we then record that 'first open' as an install event.

You can treat install as first open and any other subsequent open events as opens in order to get better clarity on this.

</details>
---
title: "Cohorts (New)"
slug: cohorts-new
---

## Introduction

The [Cohorts](https://branchdocs.app.link/cohorts-to-analysis-cohorts) data source lets you track user behavior over time by grouping users based on their app install acquisition dates. Use it to analyze retention, lifetime value, and campaign ROI so you can understand long-term user performance and make informed investment decisions.

To learn more about Analysis, read our [Dashboards Overview](analysis-dashboards-overview-new.md) article. To learn about all available data sources, read our [Analysis Data Sources](analysis-data-sources-new.md) article.

#### Packaging

Cohorts is available as part of certain Branch plans. For more information, please see our [Pricing page](https://www.branch.io/pricing/) or [contact our Sales team](https://branchdocs.app.link/cohorts-to-sales).

## When to use this data source

Use the Cohorts data source when you want to understand how groups of users behave after they install your app. Cohorts ties all downstream user actions (purchases, logins, uninstalls, and more) back to the date and source of the original install. This makes it useful for questions about retention, payback periods, and long-term campaign quality.

Common use cases include:

- **Retention analysis**: See how many users from a specific install week are still opening your app over time.
- **Lifetime value (LTV)**: Track cumulative revenue and purchase events per cohort to understand how much value different acquisition sources generate over time.
- **Campaign ROI**: Compare cost against downstream revenue, ROAS, and ROI to determine which campaigns pay for themselves and how quickly.
- **Ad partner benchmarking**: Break out cohort performance by Ad Partner Name, Ad Set Name, or Creative Name to see which partners and creatives deliver users with the strongest long-term engagement.

This data source includes cohort-specific dimensions and measures, such as Users, Cost Default, Revenue, ROAS, and ROI. These are not available in the standard [Activity](analysis-data-sources-new.md#cohorts) data source.

::: warning Caution
Re-engagement cohort data is not yet available in Analysis. The Cohorts data source currently supports acquisition (install) cohorts only.
:::

## How cohort data is organized

Every row in the Cohorts data source is anchored to an install cohort, which a group of users who installed your app during the same time period. The dimensions on each row (such as Ad Partner Name, Campaign Name, and OS) describe the attributes of that install, while the measures (such as Purchase, Open, and Revenue) reflect the downstream actions those users took after installing.

In this way, Cohorts differs from the [Activity](analysis-data-sources-new.md#activity1) and [Activity Extended](analysis-data-sources-new.md#activity-extended) data sources, which report on events independently of when the user was acquired.

## Use Cohorts

To access Cohorts, go to **Analysis >** [**Cohorts**](https://branchdocs.app.link/cohorts-to-analysis-cohorts) in Branch.

The Cohorts data source uses configurable day ranges to measure cumulative user behavior at different intervals after install. These are labeled:

- D Range A
- D Range B
- D Range C

Each one defines a number of days post-install to track. You can set up to three day ranges.

To adjust these day ranges, select the **D Range** filter parameters at the top of your [Cohorts](https://branchdocs.app.link/cohorts-to-analysis-cohorts) dashboard and enter an integer value for each one.

Note that the Cohorts data source requires a rolling date window (e.g. "Last 30 Days") and only supports day-level granularity.

#### Example

Imagine you set the ranges to:

- D Range A = 7
- D Range B = 14
- D Range C = 21

In this case, measure columns like Revenue and Purchase will appear with A, B, and C suffixes (e.g. Revenue A, Revenue B, Revenue C). Each value is cumulative, meaning Revenue A at **D Range A** = 7 represents the total revenue generated from install through day 7, not just day 7 alone.

## Use Ivy for insights

You can use [Ivy](analysis-dashboards-overview-new.md#ai) to ask questions about your cohort data. To make sure Ivy uses the Cohorts data source, select the **Ivy** button on a Cohorts [widget](analysis-dashboards-overview-new.md#widgets) rather than the Ask Ivy prompt bar at the top of the dashboard. Prompting from the widget gives Ivy the correct data source context automatically.

When using the Cohorts data source with Ivy, try prompts like:

- "Show me 30-day purchase revenue by install cohort for the last 3 months."
- "Compare ROAS across my top 5 ad partners for users who installed this quarter."
- "What's the retention rate (opens) for iOS versus Android cohorts over the past 60 days?"
- "Which campaign had the highest install-to-purchase conversion rate last month?"
- "Break down cost versus revenue by ad set for my Meta campaigns."

::: tip Tip
Be specific about time periods in your prompts. Because cohort analysis compares user behavior across different install windows, saying "users who installed in the last 30 days" is more useful than "recent users."
:::

## Fields reference

The following fields are available in the Cohorts data source.

| Field | Field Type | Description |
| --- | --- | --- |
| Achieve Level | Measure | Total count of Achieve Level Branch Standard Events |
| Achieve Level Unique | Measure | Total unique count of Achieve Level events |
| Ad Partner 3p | Dimension | The attributed install's ad partner via their Branch code (3p) |
| Ad Partner Name | Dimension | The attributed install's ad partner name |
| Ad Set Id | Dimension | The attributed install's ad set ID |
| Ad Set Name | Dimension | The attributed install's ad set name |
| Add Payment Info | Measure | Total count of Add Payment Info Branch Standard Events |
| Add Payment Info Unique | Measure | Unique Count of Add Payment Info events |
| Add to Cart | Measure | Total count of Add to Cart Branch Standard Events |
| Add to Cart Unique | Measure | Unique Count of Add to Cart events |
| Add to Wishlist | Measure | Total count of Add to Wishlist Branch Standard Events |
| Add to Wishlist Unique | Measure | Total unique count of Add to Wishlist events |
| Agency Id | Dimension | The attributed install's agency ID |
| Agency Name | Dimension | The attributed install's agency name |
| App Id | Dimension | The Branch App Id |
| App Name | Dimension | The Branch App Name |
| Attributed | Dimension | Indicates whether Branch was able to attribute the conversion event |
| Branch Channel | Dimension | Identifies which Branch product or feature measured the attributed event |
| Campaign ID | Dimension | The attributed install's campaign ID |
| Campaign Name | Dimension | The attributed install's campaign name |
| Channel | Dimension | The attributed install's Channel |
| Click Ad | Measure | Total count of Click Ad Branch Standard Events |
| Click Ad Unique | Measure | Total unique count of Click Ad events |
| Complete Registration Unique | Measure | Total unique count of Complete Registration events |
| Complete Stream | Measure | Total count of Complete Stream Branch Standard Events |
| Complete Stream Unique | Measure | Total unique count of Complete Stream events |
| Complete Tutorial | Measure | Total count of Complete Tutorial Branch Standard Events |
| Complete Tutorial Unique | Measure | Total unique count of Complete Tutorial events |
| Cost Default | Measure | The spend on the paid media campaign |
| Creative Id | Dimension | The attributed install's creative ID |
| Creative Name | Dimension | The attributed install's creative name |
| Custom Event Template 0 | Measure | Template to set up count of your Branch Custom Event KPI |
| Custom Event Unique Template 0 | Measure | Template to set up unique count of your Branch Custom Event KPI |
| Date | Dimension | Time-series date |
| Event Name | Dimension | The name of the Branch event |
| Feature | Dimension | Indicates what Branch feature or link campaign was attributed on the install |
| Geo Country Code | Dimension | Two-letter global geo country code |
| Initiate Purchase | Measure | Total count of Initiate Purchase Branch Standard Events |
| Initiate Purchase Unique | Measure | Total unique count of Initiate Purchase events |
| Initiate Stream | Measure | Total count of Initiate Stream Branch Standard Events |
| Initiate Stream Unique | Measure | Total unique count of Initiate Stream events |
| Install | Measure | Total count of Install Branch Standard Events |
| Install Unique | Measure | Total unique count of Install events |
| Invite | Measure | Total count of Invite Branch Standard Events |
| Invite Unique | Measure | Total unique count of Invite events |
| Keyword Id | Dimension | The attributed install's keyword ID |
| Keyword Name | Dimension | The attributed install's keyword name |
| Login | Measure | Total count of Login Branch Standard Events |
| Login Unique | Measure | Total unique count of Login events |
| Open | Measure | Total count of Open Branch Standard Events |
| Open Unique | Measure | Total unique count of Open events |
| Opt In | Measure | Total count of Opt In Branch Standard Events |
| Opt In Unique | Measure | Total unique count of Opt In events |
| Opt Out | Measure | Total count of Opt Out Branch Standard Events |
| Opt Out Unique | Measure | Total unique count of Opt Out events |
| OS | Dimension | Indicates the Operating System of the device as retrieved via the Branch SDK |
| Pageview | Measure | Total count of Pageview Branch Standard Events |
| Pageview Unique | Measure | Total unique count of Pageview events |
| Platform | Dimension | Indicates the Platform of the device as retrieved via the Branch SDK |
| Purchase | Measure | Total count of Purchase Branch Standard Events |
| Purchase Unique | Measure | Total unique count of Purchase events |
| Rate | Measure | Total count of Rate Branch Standard Events |
| Rate Unique | Measure | Total unique count of Rate events |
| Registration | Measure | Total count of Registration Branch Standard Events |
| Reinstall | Measure | Total count of Reinstall Branch Standard Events |
| Reinstall Unique | Measure | Total unique count of Reinstall events |
| Reserve | Measure | Total count of Reserve Branch Standard Events |
| Reserve Unique | Measure | Total unique count of Reserve events |
| Revenue | Measure | The tracked revenue from Branch commerce events |
| ROAS | Measure | Return on ad spend |
| ROI | Measure | Return on investment |
| Search | Measure | Total count of Search Branch Standard Events |
| Search Unique | Measure | Total unique count of Search events |
| Secondary Publisher | Dimension | The attributed install's secondary publisher |
| Share | Measure | Total count of Share Branch Standard Events |
| Share Unique | Measure | Total unique count of Share events |
| Spend Credits | Measure | Total count of Spend Credits Branch Standard Events |
| Spend Credits Unique | Measure | Total unique count of Spend Credits events |
| Start Trial | Measure | Total count of Start Trial Branch Standard Events |
| Start Trial Unique | Measure | Total unique count of Start Trial events |
| Subscribe | Measure | Total count of Subscribe Branch Standard Events |
| Subscribe Unique | Measure | Total unique count of Subscribe events |
| Total Count | Measure | The total count of rows |
| Touch Type | Dimension | Indicates whether the attributed install event was an Impression, Click, or other touch type. |
| Uninstall | Measure | Total count of Uninstall Branch Standard Events |
| Uninstall Unique | Measure | Total unique count of Uninstall events |
| Unique Count | Measure | The total unique user count of rows |
| Unlock Achievement | Measure | Total count of Unlock Achievement Branch Standard Events |
| Unlock Achievement Unique | Measure | Total unique count of Unlock Achievement events |
| Users | Measure | The unique count of users in the install cohort |
| View Ad | Measure | Total count of View Ad Branch Standard Events |
| View Ad Unique | Measure | Total unique count of View Ad events |
| View Cart | Measure | Total count of View Cart Branch Standard Events |
| View Cart Unique | Measure | Total unique count of View Cart events |
| View Item | Measure | Total count of View Item Branch Standard Events |
| View Item Unique | Measure | Total unique count of View Item events |
| View Items | Measure | Total count of View Items Branch Standard Events |
| View Items Unique | Measure | Total unique count of View Items events |
| Web Session Start | Measure | Total count of Web Session Start Branch Standard Events |
| Web Session Start Unique | Measure | Total unique count of Web Session Start events |

## FAQ

<details>
<summary>How do I access the Cohorts data source?</summary>

Navigate to **Analysis >** [**Cohorts**](https://branchdocs.app.link/cohorts-to-analysis-cohorts) in Branch.

</details>

<details>
<summary>What do the A, B, and C suffixes on measure columns mean?</summary>

Measure columns like Revenue A, Revenue B, and Revenue C correspond to the three configurable day ranges (**D Range A**, **D Range B**, and **D Range C**). Each value is cumulative. For example, if D Range A is set to 7, then Revenue A is the total revenue from install through day 7.

</details>

<details>
<summary>Does Cohorts use rolling or fixed date ranges?</summary>

The Cohorts data source requires a rolling date window (e.g. "Last 30 Days").

</details>

<details>
<summary>What kind of data granularity is supported?</summary>

Cohorts supports day-level granularity.

</details>

<details>
<summary>Why is Ivy returning unexpected results when I ask about cohort data?</summary>

The **Ask Ivy** prompt bar at the top of a dashboard may default to a different data source (such as Activity). To ensure Ivy queries the Cohorts data source, select the **Ivy** button directly on a Cohorts widget instead of using the top-of-dashboard prompt bar.

</details>

<details>
<summary>Can I use Cohorts for re-engagement analysis?</summary>

Not at this time. The Cohorts data source currently supports acquisition (install) cohorts only.

</details>

<details>
<summary>Is the Cohorts data source available in all Branch plans?</summary>

Availability of Cohorts depends on your Branch plan. Learn more on our [Pricing page](https://www.branch.io/pricing/) or [contact our Sales team](https://branchdocs.app.link/e/analysis-sales).

</details>
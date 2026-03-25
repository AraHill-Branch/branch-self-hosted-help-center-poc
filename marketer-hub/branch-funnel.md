---
title: "Funnel"
slug: branch-funnel
---

## Introduction

[Funnel Analysis](https://branchdocs.app.link/e/funnel) simplifies multi-touch attribution reporting by visualizing the journey users take across your campaigns before converting. Instead of viewing only the last touchpoint before a conversion event, you can see the sequence of up to three interactions that led to each conversion.

Traditional last-touch attribution assigns full credit to the final touchpoint a user interacted with before converting. This model can potentially undervalue assisted touchpoints, which are touchpoints that play important roles earlier in the user journey but don't receive last-click credit.

Funnel addresses the limitations of last-touch attribution by tracking and displaying the full path users take, enabling you to understand how different interactions work together to drive conversions.

With Funnel, you can:

- View aggregated paths showing how users moved between touchpoints before converting.
- Compare conversion paths across different dimensions such as campaigns, ad partners, and other attributes.
- Analyze user journeys leading to any type of conversion event including installs, [Branch Standard Events](https://help.branch.io/developers-hub/docs/track-branch-events#:~:text=and%20Custom.-,Standard%20Events,-Standard%20Events%20have) like “Add to Cart”, or other [Branch Custom Events](https://help.branch.io/developers-hub/docs/track-branch-events#:~:text=COPY-,Custom%20Events,-Custom%20Events%20are) that you’ve defined.
- Identify touchpoints that serve as effective entry points versus those that drive final conversions.
- Understand the role of assisted touches, where channels may receive little last-touch credit but significantly influence user behavior.

This path-level insight allows you to make more informed budget allocation decisions by accounting for the contribution of more touchpoints in the conversion journey, not just the final interaction.

#### Overlapping lookback windows

Funnel supports overlapping lookback windows, allowing each partner to maintain its own attribution window length simultaneously.

In traditional attribution, when a user converts, the most recent touchpoint within an active window receives credit, effectively cutting off earlier partners from their full lookback periods.

With Funnel, each partner’s attribution window runs independently. If a user interacts with multiple ad partners and then converts after some partners’ windows have expired, the conversion is still attributed to the last partner whose window is still active. This is true even if that partner wasn’t the most recent touchpoint.

This approach ensures that partners with longer attribution windows can receive credit for conversions that occur throughout their full window period, providing a more accurate view of each partner’s contribution to user behavior over time.

**Setting attribution windows**

To set your global attribution windows at the app level:

1. In Branch, select **App Settings** under the **Configure** section.
2. Select the **Attribution** tab.
3. Set your values for the various attribution types.

To set custom attribution windows at the ad partner level:

1. Select **Ad Partners** under the **Configure** section in Branch.
2. Find the ad partner you want to update in the list of ad partners.
3. Select the **Attribution Windows** tab.
4. Turn off the “**Use ad partner attribution settings**” toggle.
5. Set your own custom attribution window values for that ad partner’s attribution types.

### Packaging

Funnel is available as part of certain Branch plans. For more information, please see our [Pricing page](https://www.branch.io/pricing/) or [contact our Sales team](https://branchdocs.app.link/e/funnel-contact-sales).

## Use Funnel

Generating a Funnel report will create both a visual component and a table-based component. These are generated using the same data, but they illustrate your user journeys in different ways.

All Funnel reports require three parameters:

- The **date range** you want to see user journeys for.
- The event you consider the **conversion event** for your scenario.
- A **dimension** to break out the user journeys by, such as ad partner or campaign.

In addition to these three parameters, you have the option to add **filters** to the report. These are helpful if you only want to see certain campaigns, channels, features, etc.

#### Available dimensions

The list of dimensions available for the required “compare by” field includes:

- Ad Partner
- Ad Set ID
- Ad Set Name
- Campaign
- Channel
- Feature
- Keyword

#### Available filters

The list of filters you can add to your report includes:

- Ad Partner
- Ad Set ID
- Ad Set Name
- Campaign
- Campaign ID
- Channel
- Feature
- Keyword
- OS
- Geo Country Code

### Create report

To create a report in Funnel:

1. Under **Analysis** in the left-side navigation of Branch, select [**Funnel**](https://branchdocs.app.link/e/funnel).
2. Select **Dates** and pick the date range you want to view user journeys for.
3. Select **Show** and decide which event you want to use as the conversion event for this report. For example: Installs, Purchases, Subscriptions, Impressions, etc.
4. Select **Compare by** and choose the [dimension](branch-funnel.md#available-dimensions) you want user journeys to be split by.
5. (Optional) Select **Filters** and add one or more [filters](branch-funnel.md#available-filters) to the report.

Every selection you make will generate a new report immediately, so you can quickly observe how each selection is changing the report overall.

::: tip Tip
Based on the “compare by” dimension you chose in step 4, the report may populate with many user journeys. Filters help narrow results down even further, so you can focus on the user journeys you’re most interested in for a particular report.
:::

### Read report data

Funnel reports have a strong visual component, as well as a structured table component. Use both views together to gain a more complete understanding of user engagement and drop-off points.

#### Read visual data

The top half of a Funnel report contains the report’s visual component, which takes the form of a traditional Sankey diagram. Sankey diagrams have two main parts:

- **Nodes**: These represent the different touchpoints a user goes through on their journey to a conversion event. Funnel will show up to three nodes, or touchpoints, before a conversion. This information is displayed in the form of text. Please note that:

  - [0] in front of a touchpoint means it is the *first* touchpoint in a user journey.
  - [1] in front of a touchpoint means it is the *second* touchpoint in a user journey.
  - [2] in front of a touchpoint means it is the *third* touchpoint in a user journey.
- **Links**:These are the colored lines that connect touchpoints together. By following these flows, you can track groups of user journeys between touchpoints, and see where they diverge or drop off.

::: tip Tip
By confirming that your date range and filters are appropriately selective, you can make sure that you’re viewing a manageable number of flows at once.
:::

![Branch Funnel diagram showing connections between various ad partners and their performance metrics.](/img/Screenshot 2025-10-08 at 9.56.04 AM.png)

To read the visual diagram:

1. View the far left batch of touchpoints, which all start with `[0]`. These are all the different original starting points your users had for the conversion event you selected.

   1. We recommend using parameters that result in Sankey diagrams with approximately 5-20 starting touchpoints.
2. Hover directly over the text for a single touchpoint. Notice that:

   1. The color of the entire flow becomes opaque.
   2. The flow itself may diverge into multiple paths, leading to other touchpoints and/or directly to the conversion event.

      1. All these paths are the same color, to illustrate that they originate from the same touchpoint.
   3. A text box pops up that has the following format: **[Touchpoint number] Name of touchpoint (event): Number of events**. For example: `[0] spring_trial_campaign (click): 821`

      1. This means a click on the Spring Sign Up campaign was the *first* touchpoint (represented by the `[0]`) for 821 user journeys.
3. If the touchpoint you are hovering on splits into multiple paths of the same color, hover over one of the individual paths and notice:

   1. The path leads either to another touchpoint, or directly to a conversion event.
   2. The text in the text box changes, so now the format is **[First touchpoint number] Name of first touchpoint (event) → [Second touchpoint number] Name of second touchpoint (event): Number of events**. For example: `[0] spring_trial_campaign (click) → [1] spring_registration_campaign (click): 98`

      1. This means 98 user journeys started with a click on the Spring Sign Up campaign, then went on to click the Spring Get Started campaign.
4. Move inward to the second set of touchpoints, which all start with `[1]`. Hover directly over the text for one of these touchpoints. Notice that:

   1. There may be multiple paths that flow into this touchpoint. These are all the different places users are coming from to get to this touchpoint.
   2. There may be multiple paths that flow out of this touchpoint, that lead either to other touchpoints or directly to the conversion event.
5. Hover over the conversion event itself, on the rightmost side of the diagram. This will display the name of the conversion event, and the total number of times it occurred.

#### Read table data

The bottom half of a Funnel report is a structured table that distills the information from the visual component into a table with drill-down capabilities.

The table has two columns:

- The specific funnel (segment of a user journey), such as `[0] spring_trial_campaign (click) → [1] spring_registration_campaign (click)`.
- The number of conversion events associated with that funnel.

Each top-level row in the table will contain one of two things:

- Either the flow between two touchpoints and a **plus symbol**, OR
- The flow between a touchpoint and the conversion event, with *no* plus symbol.

If you see the **plus symbol**, this is because this particular segment does not lead directly to the conversion event. In other words, there are additional touchpoints between it and the conversion event.

To see these additional touchpoints, select the **plus symbol**. It will turn into a minus symbol, and will drill down into the row to show you how the paths from this touchpoint split off. Again, these paths can lead either to another touchpoint, or to a conversion event. The former will have another **plus symbol** you can select, to drill down further. The latter will not have any symbol, and will instead just show the number of user journeys associated with the parent row.

![Branch Funnel table showing flow with clicks and installs for various campaigns.](/img/Screenshot 2025-10-08 at 9.51.38 AM.png)

::: tip Tip
The top-level rows in the table show the total number of conversion events associated with the starting touchpoints (which start with `[0]` ).

When you drill down into a row, the rows that appear below it have conversion event counts that will add up to the top-level row’s total number of conversion events.

If you drill down even further, the same principle applies. The number of conversion events added up together in the new rows that appear will equal the total number of conversion events for that segment.
:::

### Download data

To download your Funnel report’s visual Sankey data, select the **three-line menu** **icon** in the upper-right corner of the diagram section and choose to download the data as PNG, XLS, SVG (vector), or CSV.

To download your Funnel report’s structured table data, select the **download icon** from the upper-right corner of the table section. This will download the table data as a CSV.

## Examples

Funnel is most effective when you start with a specific marketing question in mind.

Use the example questions below to get started with Funnel reports:

- **What is the typical path my users take across channels?**

  - Set the dimension to Channel, and notice the order of the channels your users hop between before converting.
- **Are some of my campaigns better at initiating user journeys, while others are better at closing conversions?**

  - Set the dimension to Campaign, and pick a specific date range, like your last quarter. See which campaigns work in the best combination with each other.
- **Is CRM stealing credit from paid advertising?**

  - Set the dimension to Channel or Feature and look for patterns where Paid Search or Paid Advertising appear early in the journey, followed by Email or CRM touchpoints at the end. If you see this frequently, your CRM might be getting last-click credit for conversions where paid campaigns served as crucial assisted touches earlier in the journey.
- **What keywords appear in successful conversion paths, and at what touchpoints?**

  - Set the dimension to Keyword and add the filter `Channel = Paid Search`. This will show you which keywords are best for early awareness versus conversion, which can help you refine your bidding strategy and keyword targeting.
- **Do users in one country require more touchpoints than another country?**

  - Set the dimension to Campaign or Channel, and add filters for the specific Geo country codes you want to compare. This will show you the journey patterns within each market, revealing whether users in different regions have shorter or longer paths to conversion. Use this insight to tailor your regional marketing strategies and budget allocation.
- **Which ad partners contribute most effectively to conversions?**

  - Set the dimension to Ad Partner, and make sure to adjust the date field to an appropriate time frame, like the last 30 days.

## FAQ

<details>
<summary>What is Branch Funnel?</summary>

Branch Funnel simplifies multi-touch attribution reporting by visualizing the complete journey users take across campaigns before converting.

</details>

<details>
<summary>How does Funnel differ from traditional last-touch attribution?</summary>

Funnel tracks and displays the actual path users take, allowing you to see up to three interactions that led to each conversion, rather than just the last touchpoint.

</details>

<details>
<summary>What are assisted touches?</summary>

Assisted touches are touchpoints that appear in the conversion path but aren't the final interaction before conversion. These touchpoints play important supporting roles in the user journey, such as initial awareness or mid-funnel engagement, even though they don't receive last-touch credit.

</details>

<details>
<summary>Can I set custom attribution windows for ad partners?</summary>

Yes. You can [set custom attribution windows](attribution-windows-link-settings.md#configure-attribution-windows) at the ad partner level by turning on the **Use ad partner attribution settings** toggle at the ad partner level in Branch.

</details>

<details>
<summary>What parameters are required to generate a Funnel report?</summary>

You need to specify the date range, the conversion event, and a dimension to break out the user journeys by.

</details>

<details>
<summary>What types of conversion events can I analyze with Funnel?</summary>

You can analyze various conversion events, including installs, Branch Standard Events like Add to Cart, or any other Branch Custom Events you’ve defined.

</details>

<details>
<summary>Is Funnel available for all Branch plans?</summary>

No, Funnel is only available as part of certain Branch plans. For more information, please [contact our Sales team](https://branchdocs.app.link/e/funnel-contact-sales) or reach out to your Account Manager.

</details>

<details>
<summary>What visual representation does a Funnel report use?</summary>

A Funnel report uses a traditional Sankey diagram to visually represent user journeys.

</details>

<details>
<summary>How can I download my Funnel report data?</summary>

You can download the visual Sankey data as PNG, XLS, SVG, or CSV, and the structured table data as CSV.

</details>

<details>
<summary>Why don't the counts in Funnel match my other Branch report counts?</summary>

Funnel shows the share of conversion paths rather than total counts. It also uses Branch's processing time rather than event timestamps in app timezones, which can cause differences compared to other reports.

</details>
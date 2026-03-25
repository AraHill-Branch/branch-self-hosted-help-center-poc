---
title: "Funnel (New)"
slug: funnel-new
---

## Introduction

[Funnel Analysis](https://branchdocs.app.link/funnel-new) simplifies multi-touch attribution reporting by visualizing the journey users take across your campaigns before converting. Instead of viewing only the last touchpoint before a conversion event, you can see the sequence of up to three interactions that led to each conversion.

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

**Set attribution windows**

To set your global attribution windows at the app level:

1. In Branch, go to **Configuration >** [**Attribution**](https://branchdocs.app.link/funnel-to-attribution).
2. [Set your values](attribution-page-new.md#attribution-windows) for the various attribution types.

To set custom attribution windows at the ad partner level:

1. In Branch, go to **Configuration >** **Ad Partners**.
2. Find the ad partner you want to update in the list of ad partners.
3. Select the **Attribution Windows** tab.
4. Turn off the “**Use ad partner attribution settings**” toggle.
5. Set your own custom attribution window values for that ad partner’s attribution types.

### Packaging

Funnel is available as part of certain Branch plans. For more information, please see our [Pricing page](https://www.branch.io/pricing/) or [contact our Sales team](https://branchdocs.app.link/e/funnel-contact-sales).

## Use Funnel

To access Funnel, go to **Analysis >** [**Funnel**](https://branchdocs.app.link/funnel-new) in Branch.

Funnel requires three parameters:

- The **date range** you want to see user journeys for.
- The event that you consider the **conversion event** for your scenario.
- The “compare by” **dimension** to break out the user journeys by, such as ad partner or campaign.

In addition to these three parameters, you have the option to add **filters**. These are helpful if you only want to see certain campaigns, channels, features, etc.

Your chosen date range, conversion event, and “compare by” dimension will be displayed at the top of the screen, alongside any filters you’ve added.

#### Available dimensions

The list of dimensions available for the required “compare by” field includes:

- Ad Set ID
- Ad Set Name
- Advertising Partner Name
- Branch Channel
- Campaign
- Campaign ID
- Feature
- Keyword

#### Available filters

The list of filters you can add to your widget includes:

- Ad Set ID
- Ad Set Name
- Advertising Partner Name
- Assist 1
- Assist 2
- Branch Channel
- Campaign ID
- Campaign Name
- Channel
- Conversion Event
- Date
- Feature
- Geo Country
- Keyword
- Last Touch
- OS

### Read Funnel data

Funnel has a strong visual component, as well as a structured table component. Use both views together to gain a more complete understanding of user engagement and drop-off points.

#### Read visual data

Funnel presents data visually in the form of a traditional Sankey diagram. Sankey diagrams have two main parts:

- **Nodes**: These represent the different touchpoints a user goes through on their journey to a conversion event. Funnel will show up to three nodes, or touchpoints, before a conversion. This information is displayed in the form of text. Note that in a user journey with three touchpoints:

  - Last Touch is the *most recent* touchpoint.
  - Assist 1 is the *second-to-last* touchpoint.
  - Assist 2 is the *initial* touchpoint.

If a user journey has fewer than three touchpoints, you will see that reflected with the **No Touch** label in the Assist 1 and/or Assist 2 columns.

- **Links**:These are the colored lines that connect touchpoints together. By following these flows, you can track groups of user journeys between touchpoints, and see where they diverge or drop off.

::: tip Tip
By setting your date range and filters to be appropriately selective, you can make sure that you’re viewing a manageable number of flows at once.
:::

![Branch Funnel paths illustrating user interactions leading to conversion events and assists.](/img/Screenshot 2026-02-20 at 4.21.09 PM.png)

To read the visual diagram:

1. Find the identical horizontal lines at the top and bottom of the diagram, with the benchmarks **Assist 2**, **Assist 1**, **Last Touch**, and **Conversion Event**. User journeys move from left to right along these benchmarks.
2. Notice that user journeys are batched together based on having a shared touchpoint, and that the touchpoint is given a label. This label tells you what that touchpoint is attributed to.

   - If a label says **No Touch**, follow the path(s) to the right until you see a label populated with data. This is where attributed touches start for those user journeys.
3. Hover over one of the paths. A popover will appear that contains:

   - **From**: What *this*touchpoint is attributed to.
   - **To**: What the *next* touchpoint is attributed to.
   - **Total Count**: How many user journeys shared this particular section of the path.
4. Observe that a single touchpoint is often the starting point for many different paths. Paths can start at the same touchpoint and then diverge. This can happen at the **Assist 2**, **Assist 1**, and/or **Last Touch** benchmarks.
5. All user journeys then converge at a single **Conversion Event**. The label for that touchpoint will reflect the name of the conversion event you set for your Funnel report.

#### Read structured data

To view Funnel data as a table:

1. At the [widget](analysis-dashboards-overview-new.md#key-terms) level, hover over the top-right corner of the Funnel visual diagram until the **three-dot**icon appears.
2. Select the **three-dot** icon.
3. Select **Show underlying data** from the menu that appears.

Each row represents a unique scenario, and the **Count** column tells you how many users that scenario applies to. For example, if two users have all the same touchpoints but are on different operating systems or in different geolocations, they will be in separate rows in the table.

To change the columns included in the table:

1. Select the **Edit columns** button.
2. Check the box next to each column you want to include in the table.
3. Select the **Done** button when you are finished.

### Use Ivy for insights

Funnel works best when you start with a specific marketing question in mind. Ivy, your powerful AI partner in Branch, can answer that question using your Funnel data and surface insights tailored to your situation.

Use the example questions in the table below to get started with Ivy in Funnel.

| Question for Ivy | Funnel configuration |
| --- | --- |
| What channels perform best at different stages of the user journey? | Set the dimension to Channel. |
| What different path combinations result in the best conversion rates? | Set the dimension to Channel. |
| Which partners contribute most effectively to conversions? | Set the dimension to Ad Partner. |
| Which partners are more effective at first touch versus last touch? | Set the dimension to Ad Partner. |
| Are some of my campaigns better at initiating user journeys, while others are better at closing conversions? | Set the dimension to Campaign. |
| Do users in one country require more touchpoints than another country? | Set the dimension to Campaign or Channel, and add filters for the specific Geo country codes you want to compare. |
| What keywords appear in successful conversion paths, and at what touchpoints? | Set the dimension to Keyword and add the filter `Channel = Paid Search`. |
| Is CRM stealing credit from paid advertising? | Set the dimension to Channel or Feature - look for patterns where Paid Search or Paid Advertising appear early in the journey, followed by Email or CRM touchpoints at the end. If you see this frequently, your CRM might be getting last-click credit for conversions where paid campaigns served as crucial assisted touches earlier in the journey. |

### Download data

To download the Funnel visual diagram as a PNG:

1. At the [widget](analysis-dashboards-overview-new.md#key-terms) level, hover over the top-right corner of the Funnel visual diagram until the **three-dot** icon appears.
2. Select the **three-dot** icon.
3. Choose **Download** from the menu that appears.
4. Select **PNG** as the download type.
5. Select the **Download** button.

To download the Funnel visual diagram as a PDF:

1. At the [dashboard](analysis-dashboards-overview-new.md#key-terms) level, select the **three-dot** icon that lives to the right of the Ivy chat box.
2. Select **Download PDF** from the menu that appears.

To download Funnel data as a structured table:

1. At the [widget](analysis-dashboards-overview-new.md#key-terms) level, hover over the top-right corner of the Funnel visual diagram until the **three-dot** icon appears.
2. Select the **three-dot** icon.
3. Choose **Download** from the menu that appears.
4. Select **XLSX** or **CSV** as the download type.
5. Select the **Download** button.

Alternatively, to download your Funnel data specifically as a CSV:

1. At the [widget](analysis-dashboards-overview-new.md#key-terms) level, hover over the top-right corner of the Funnel visual diagram until the **three-dot** icon appears.
2. Select the **three-dot** icon.
3. Select **Show underlying data** from the menu that appears.
4. If you want to change the columns included in the table, select the **Edit columns** button and update your chosen columns.
5. When you’ve confirmed your columns look as expected, select the **Download CSV** button.

## Fields reference

The full list of fields available in Funnel are outlined in the table below.

| Field | Field Type | Description |
| --- | --- | --- |
| Ad Set Id | Dimension | The attributed ad set ID |
| Ad Set Name | Dimension | The attributed ad set name |
| Advertising Partner Name | Dimension | The attributed advertising partner name |
| App Id | Dimension | The Branch App Id |
| Assist 1 | Dimension | The **second** touch attribution in the funnel path |
| Assist 2 | Dimension | The **first** touch attribution in the funnel path |
| Branch Channel | Dimension | Identifies which Branch product or feature measured the attributed event |
| Campaign ID | Dimension | The attributed campaign ID |
| Campaign Name | Dimension | The attributed campaign name |
| Channel | Dimension | The attributed channel |
| Compare Dimension | Dimension | The dimension used for Funnel comparison |
| Conversion Event | Dimension | The conversion event type in the Funnel path |
| Count | Measure | The total count of conversions |
| Date | Dimension | Time-series date |
| Feature | Dimension | Indicates what Branch feature or link campaign was attributed |
| Geo Country | Dimension | The geographic country name in English |
| Keyword | Dimension | The attributed keyword |
| Last Touch | Dimension | The last touch attribution in the funnel path |
| OS | Dimension | Indicates the Operating System of the device |

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

Yes. You can [set custom attribution windows](attribution-windows.md#disinheriting-attribution-window-settings-from-the-app-level) at the ad partner level by turning on the **Use ad partner attribution settings** toggle at the ad partner level in Branch.

</details>

<details>
<summary>What parameters are required to generate a Funnel report?</summary>

You need to specify the date range, the conversion event, and a dimension to break out the user journeys by.

</details>

<details>
<summary>What types of conversion events can I analyze with Funnel?</summary>

You can analyze various conversion events, including Installs, [Branch Standard Events](track-branch-events.md#standard-events) like Add to Cart, or any other [Branch Custom Events](track-branch-events.md#custom-events) you’ve defined.

</details>

<details>
<summary>Is Funnel available for all Branch plans?</summary>

No, Funnel is only available as part of certain Branch plans. For more information, please [contact our Sales team](https://branchdocs.app.link/e/funnel-contact-sales) or reach out to your Account Manager.

</details>

<details>
<summary>What visual representation does Funnel use?</summary>

Funnel uses a traditional Sankey diagram to visually represent user journeys.

</details>

<details>
<summary>What format can I download my Funnel data in?</summary>

You can download the visual Sankey data as a PNG or PDF file, and the structured table data as a CSV or XLSX file.

</details>

<details>
<summary>What should I do if I see the error message “One of your x-axis attributes contains too many values”?</summary>

If you see this error message, you should apply more filters to your Funnel report. For example, you can filter down your results to just one country or operating system. This will narrow down the number of user journeys displayed into a more manageable number.

</details>
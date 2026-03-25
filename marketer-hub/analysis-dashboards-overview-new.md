---
title: "Dashboards Overview (New)"
slug: analysis-dashboards-overview-new
---

## Introduction

![Branch Analysis dashboard displaying channel performance metrics including installs, clicks, and organic channels.](/img/image-1771618576547.png)

[Analysis Dashboards](https://branchdocs.app.link/e/dashboards-overview-to-all-dashboards) offer a powerful, sophisticated analytics experience.

Using Ivy, your strategic AI partner in Branch, you can **build dashboards with plain English prompts and get answers to everyday business questions** that come up in your marketing workflows.

A dashboard is an individual page that contains a specific set of widgets, which themselves display metrics or charts. Use each dashboard to tell a different story with your Branch data and to track your company's marketing growth from different angles.

By drilling down into specific campaigns, you can break out your data by platform, channel, and more to see what's really driving results. This visibility empowers you to effectively **optimize your ad spend** across all your active campaigns.

Share the data in your dashboards in multiple ways to **report important campaign metrics** to internal stakeholders, and stay informed about your campaign performance and notable changes in your data with **KPI alerts** delivered to your email.

::: danger Don't see this feature yet?
Analysis is the next evolution in Branch's marketing analytics and reporting functionality, bringing together data from ads, social media, SEO, email, and more in one cohesive experience.  
  
Analysis is being rolled out to customers in phases. While you're waiting for access, you can explore this article to familiarize yourself with the new functionality.  
  
In the meantime, please continue to refer to our [legacy documentation for reporting](dashboard-exports-index.md).
:::

### Key terms

The following terms are used extensively throughout this guide. Please take note of their definitions.

| Term | Definition |
| --- | --- |
| Widget | A single metric or chart that displays an aspect of your Branch data. You can edit widgets extensively to make sure they capture the data you're looking for.    If you'd like to understand where an aggregated widget metric is coming from, you can preview the underlying data from the widget directly (up to 1,000 rows). You can also download data from individual widgets. |
| Dashboard | A collection of widgets that live on a single page.    Dashboards can be exported as a single entity, and you can share an entire dashboard in presentation mode.    A core list of your individual dashboards are listed prominently under **Analysis** in the left-side navigation in Branch. To see the rest of your dashboards, select [**All Dashboards**](https://branchdocs.app.link/e/dashboards-overview-to-all-dashboards). |
| Data Source | Branch supports different data sources to power your dashboards. Each data source makes different dimensions of your data available. Depending on what data you want to display, you can use one or all of these data sources in a single dashboard or widget.    The supported data sources are:   - **Activity**: Default data source for most reporting. Provides extensive tracking of most user behavior. - **Activity Extended**: A more comprehensive version of Activity that includes a wider range of fields and dimensions. - **SKAdNetwork**: Contains SKAN data exclusively. - **Unified Activity and SKAdNetwork**: Combines Activity and SKAdNetwork data to provide a unified view of campaign performance. - **Fraud**: Track fraud detection and prevention performance across campaigns and ad partners. - **Cohorts**: Track user behavior over time by grouping users based on acquisition dates. - **Funnel**: Multi-touch attribution paths showing touchpoints users interact with before converting. - **Link Analytics**: Link-level performance reporting with link-specific dimensions.     Learn more about each data source and its available fields in [Analysis Data Sources Reference](analysis-data-sources-new.md). |
| Ivy | The sophisticated, AI-powered partner that helps you uncover and grow your analytics story.    Ivy provides you with intelligent insights into your data, and answers your natural language questions in real time.    You can talk to Ivy using the **Ask Ivy** prompt at the top of each dashboard, or you can select the **Ivy** button on a widget to ask it deeper questions about that specific widget's data. |
| Prompt | An individual query or instruction you give Ivy so it can start processing your requests and answering your questions. A [well-crafted prompt](analysis-dashboards.md#craft-prompts-for-ivy) helps Ivy give you a relevant answer that meets your criteria. |

### Access

The following Analysis Dashboards functionality is available depending on your Branch plan:

- Creating and editing dashboards
- AI prompt widget at dashboard-level
- AI on individual widgets within dashboards

Please note that **some plans do not include the ability to create or edit dashboards**; in these cases, you will only be able to view Branch's [default set of dashboards](analysis-dashboards.md#default-dashboards).

For more information, please visit our [Pricing](https://www.branch.io/pricing/) page or [contact our Sales team](https://branchdocs.app.link/e/analysis-sales).

## Dashboards

Analysis Dashboards are both powerful and intuitive, so you can glean deep insights from them without extensive guidance. However, it is helpful to understand the basic functionality before you dive into intermediate and advanced queries.

This section will get you started using dashboards quickly, and will use common marketing concepts to inform the types of questions used to prompt Ivy.

#### Default dashboards

Once you have access to Analysis Dashboards and you log in to your Branch account, you'll notice certain pre-configured dashboards are already available and ready for you to use immediately.

Part of this set is an important dashboard called [**Channel Performance**](https://branchdocs.app.link/e/analysis-dashboards-channel-performance), which you will see listed directly under the **Analysis** section in the left-side navigation of Branch.

The other part of this set is our **classic suite of dashboards**. These dashboards are meant to replace our legacy data reporting pages, and are useful jumping off points for anyone getting started.

::: warning Caution
Please note that there is **not a 1:1 relationship between legacy data reporting pages and the new classic suite** of dashboards. However, we have tried to maintain parity where possible.  
  
Also, the default dashboards you see depends on your Branch package.
:::

| Dashboard name | Legacy equivalent | Description |
| --- | --- | --- |
| Channel Performance | NA | Track marketing channel performance using key acquisition and engagement metrics including installs, opens, clicks, and impressions broken out by paid and organic channels. Quickly assess channel effectiveness and optimize marketing spend by comparing performance across different acquisition sources. |
| Classic Suite - Summary | Overview → Summary | Track performance across paid and organic channels, displaying key metrics like clicks, impressions, installs, and opens alongside overall monthly install trends. It includes a breakdown by ad partner to help evaluate which advertising partnerships are driving the most value. |
| Classic Suite - Sources | Overview → Sources | Track unique user actions per campaign and includes a trend analysis of unique user engagement to help identify campaign quality over time. |
| Classic Suite - Ads Unified | Ads Analytics → Unified | Track SKAdNetwork (SKAN) and non-SKAN attribution data to show which campaigns are actually driving installs, purchases, and revenue. See the full picture of campaign performance by tracking both total activity and unique users across different measurement methods. |
| Classic Suite - Ads Activity | Ads Analytics → Activity | Track paid advertising performance across platforms and campaigns, showing both total and unique user actions, from clicks to purchases. See a trend line of external clicks by platform over time, which demonstrates platform performance patterns and helps you optimize your ad spending. |
| Classic Suite - SKAdNetwork | Ads Analytics → SKAdNetwork | Track detailed SKAN attribution data, showing install trends over time, along with breakdowns by ad network, campaign, and source app. Understand iOS install performance and optimize SKAN-based campaign strategies across different ad partners. |
| Classic Suite - SEO Analytics | SEO → Analytics | Track organic search performance by channel, showing installs, opens, and purchases from SEO traffic. See a trend line of opens over time to monitor organic search engagement and identify which channels are driving the most valuable organic users. |
| Classic Suite - Journeys Activity | Journeys → Activity | Track Journeys advertising campaign performance across platforms, showing external click trends over time and detailed attribution metrics including installs, opens, purchases, and revenue. Monitor Journeys campaign effectiveness and optimize platform spending based on conversion performance. |
| Classic Suite - Email Activity | Email → Activity | Track Branch Email marketing performance across platforms and campaigns, showing external click trends over time plus detailed attribution metrics for both total and unique user actions. Measure email campaign effectiveness, from clicks to purchases and revenue generation. |
| Classic Suite - Short Links | NA | Track Short Link analytics performance across campaigns and channels, showing click-to-open rates, installs, and conversion metrics with detailed breakdowns by operating system, features, and top-performing campaigns. Monitor link effectiveness over time, optimize channel strategies based on weekly performance trends, and identify high-converting links for improved engagement outcomes. |
| Fraud | Fraud → Activity | Track fraud detection and prevention performance across campaigns and ad partners. See [blocked events](custom-exports-api.md#available-topics) and monitor the impact of your fraud protection rules to optimize ad spend quality. |
| Cohorts | Ads Analytics → Cohorts (Acquisition only) | Track user behavior over time by grouping users based on app install acquisition dates. Analyze retention, lifetime value, and campaign ROI to understand long-term user performance and guide future investment decisions. **Note**: Re-engagement cohort data is not yet available in Analysis. |
| Funnel | NA | Track multi-touch attribution paths showing up to three touchpoints users interact with before converting. Identify assisted touches and understand which campaigns work together to drive conversions. |

### View dashboards

Under the **Analysis** section in the left-side navigation in Branch, you will see several of your core dashboards listed by name. Select any of these dashboards to view them.

To view a dashboard *not* featured in that list, select [**All Dashboards**](https://branchdocs.app.link/e/analysis-dashboards-all-dashboards)and select the dashboard you're looking for from the full list.

From this page, you can also favorite a dashboard by selecting the **star icon** next to its name. You can then filter the full list by dashboards that are starred or not starred.

Dashboards that have the **verified checkmark icon** next to their names are dashboards that have been created for you by Branch. You can filter by verified or non-verified dashboards.

To view only the dashboards that you've created, you can also select the tab that says **Yours** at the top of the page.

### Create a dashboard

To create a new Analysis Dashboard:

1. Select **Analysis** in the left-side navigation in Branch, then select **All Dashboards**.
2. Select the **Create Dashboard** button in the top-right corner of the page.
3. Give the dashboard a unique name in the **Name** field.
4. Give the dashboard a description in the **Description** field that explains the purpose of the dashboard and how others should read it.
5. Select the **Create** button.

You are now ready to [add widgets](analysis-dashboards.md#create-and-configure-widget) to your new dashboard.

### Copy a dashboard

Sometimes you may want to use a certain dashboard as a starting point for creating your own version with different metrics. To do this, start by copying the original dashboard.

To make a copy of a dashboard:

1. Navigate to the dashboard you're interested in copying, and select the **three dot icon** in the upper-right corner.
2. In the menu that opens, select **Make a copy**.
3. Give the dashboard a unique name in the **Name** field.
4. Give the dashboard a description in the **Description** field that explains the purpose of the dashboard and how others should read it.
5. Select the **Create** button.

### Edit a dashboard

Dashboards can be edited, as long as they aren't one of the [dashboards created by Branch](analysis-dashboards.md#default-dashboards). You will see the author of these dashboards listed as "Branch" and they will have a **verified checkmark icon** next to their names on the **All Dashboards** page.

Also, please note that if someone else on your team created the dashboard, they will need to give you edit permissions before you can edit their dashboard.

To edit a dashboard:

1. Navigate to the dashboard you're interested in editing, and select the **three dot icon** in the upper-right corner.
2. In the menu that opens, select **Edit**.
3. From here, you can:

   1. Add notes: Select the **Add note** button in the top-right corner to add a widget to the dashboard that holds a note you want to keep. You can move and resize this widget. You can also add multiple notes to a single dashboard.
   2. Add filters: Select the **Add filter** button in the top-right corner to add a new filter and get taken to its configuration menu. When you are finished configuring it, select the **Apply** button.

      1. To learn more about configuring filters, read "[Configure dashboard filter](analysis-dashboards.md#configure-dashboard-filter)."
   3. Edit the dashboard name and description: Select the **pencil icon** next to the name of the dashboard to give it a new name or description. Select **Save** to save your changes.
   4. Remove filters: The filters applied to your dashboard are listed at the top in individual bubbles. To remove a filter, select the **X icon** that appears when you hover over it.
   5. Edit filters: From the filters listed at the top of the page, select the one you want to edit to see its configuration menu. To learn more about configuring filters, read "[Configure dashboard filter](analysis-dashboards.md#configure-dashboard-filter)."
   6. Move widgets: Hover over the top edge of the widget, until your cursor becomes an **icon** **with** **four arrows** and the **light gray bar** appears. Select the light gray bar and drag the widget into place.
   7. Delete widgets: Hover over the widget and select the **three dot icon** that appears. Select **Delete** to delete your widget.

      1. Warning: Please note that deleting a widget is a **permanent** action and cannot be undone!
   8. Resize widgets: There are two ways to resize widgets:

      1. Hover over the widget and select the **three dot icon** that appears. Select the visual representation of the dimensions you would like the widget to change to from the set of options.
      2. Hover over the bottom-right corner edge of a widget until your cursor becomes an **arrow icon**. Drag the widget's corner to make it bigger or smaller.
4. When you are done making changes to your dashboard, select the **Save** button.

   1. If you would like to discard the changes you've made, select the **Cancel** button instead. Then select **Discard changes**.

### Configure dashboard filter

Filters help make sure you're only seeing the data you want to see on your dashboard. To set a filter at the dashboard level:

1. Navigate to the dashboard you're interested in creating a filter for and select the **three dot icon** in the upper-right corner.
2. In the menu that opens, select **Edit**.
3. Select the **Add filter** button in the top-right corner.
4. A list of possible filters will open. Select the filter that you would like to add.
5. The filter's configuration menu will open. This menu has four main sections:

   1. Default values: Set the values you want to either include or exclude from your dashboard for this particular filter. Depending on the type of filter, you may be asked to select values from a list, or add your own conditional statements for what values to filter in or out.

      1. Example: To see only your social media campaigns, selected "Feature" as your filter and only include data where the value is `social`.

         1. Please note that by default, selecting values for a filter will limit the values displayed in any future filters you create for this dashboard. In this example, if you tried to add "Branch Channel" as a second filter, you would only be able to select a channel that applies to social media campaigns, like `Short Links`. To change this, enable the **Show unfiltered values** option at the bottom of the **Default values** section.
   2. Applicable to: Decide which widgets you want to apply this filter to. You can select the **checkbox** for **All**, or you can select individual widgets.
   3. Link filters: Connect columns from different models that contain the same values (like campaign names, dates, or regions), so one filter can control data from all sources at once.
   4. Filter options: Choose a display name for your filter, and decide whether you want to make it mandatory. To make a filter mandatory, select the **checkbox** that says **Require users to select a filter value**. If this is selected, users will not see widget visualizations on the dashboard until they select a filter value.
6. When you are done configuring your filter, select the **Apply** button to apply your changes to your dashboard. You will then see your filter populate the list of filters at the top of the dashboard.

### Configure dashboard currency

To view your Branch data in your desired currency, you can set a currency filter at the dashboard level.

Important: Before you try to set a currency for your dashboard, make sure at least one of the widgets on your dashboard contains a currency-related measure.

To set the currency for your dashboard:

1. Navigate to the dashboard you're interested in setting the currency for and select the **three dot icon** in the upper-right corner.
2. In the menu that opens, select **Edit**.
3. Select the **Add parameter** button in the top-right corner.
4. Select the parameter that says **Currency**.
5. A module will open, containing a list of all the possible currencies you can choose from. Search for a currency or scroll to select it from the list.
6. Select the **Apply** button.

To remove the currency parameter from your dashboard, select the **x icon** on that parameter while you're in edit mode.

::: tip Tip
If you'd like to compare your data in multiple currencies, we recommend creating duplicate dashboards as necessary, and setting the desired currency on each.
:::

### Delete a dashboard

::: danger Warning
Deleting a dashboard is a **permanent** action and cannot be undone.
:::

Please note that dashboards where the author is listed as "Branch" cannot be deleted.

To delete a dashboard:

1. Select **Analysis** in the left-side navigation in Branch, then select **All Dashboards**.
2. Find the dashboard you want to delete and select the **checkbox** near its name.
3. If you have the correct permissions to delete the dashboard, you will see the **Delete** button appear after selecting the checkbox.
4. Select the **Delete** button to permanently delete the dashboard.

## Widgets

Widgets are what Analysis Dashboards are made of. Each widget contains a key metric or visualization. Widgets can also be used to store your notes.

Use widgets to display important data related to the general theme of your dashboard.

### Create and configure widget

To create a new widget:

1. Navigate to the dashboard you want to add the widget to and select the blue button at the bottom of the screen that says **Add new widget**.
2. In the top bar, use the dropdown to open the data sources menu. From the menu, select the data source you want your widget to draw from. If you want to use multiple sources, select **Enable multiple sources**.  
   ![Branch Analysis widget displaying event data for the last 30 days with highlighted model selection options.](/img/Screenshot 2025-09-18 at 4.01.51 PM.png)
3. Choose the columns (filters) you want to add to your widget. The categories are:

   1. Measures: These have a measurable, numeric value. Primarily related to quantities of user events and amount of revenue.
   2. Attributes: Qualitative dimensions of your data, like `Campaign Name` or `Platform`.
   3. Dates: Check the **Date** box to include a date column. To configure this column, select the **filter** **icon** next to it. Then decide if you want your widget to display rolling data (changes as time passes) or fixed data (static, covering a specific period of time).
   4. Formulas: Add your own formulas to create your own custom calculations. Use either the free-form formula editor or the pre-built functions provided. Use the **+ Add** button to create new formulas. Select operators you're interested in from the list to learn more about how to use them.

      1. For example, use the formula `Ad Partner Name = "Taptica" and contains ( Campaign Name , "spring" )` to create a filter for Taptica campaigns you launched in the spring.
   5. Sets: There are two types of sets:

      1. Column set: A set based off a single column's data. Use the **+ Add** button to create new column sets.

         1. For example, select "Branch Channel" as the base column, then create a group for paid channels and a group for organic channels.
      2. Query set: A set based off a query that uses one or more columns of data. Use the **+ Add** button to create new query sets.

         1. For example, select "OS", "Feature", and "Campaign Name" for your base query, then create a group where `OS = Android`, `Feature = paid advertising`, and `Campaign Name = spring_solstice`.
   6. Parameters: Create a custom name and specify whether the data's type should be integer, decimal, string, date, or boolean (true or false). Parameters let you decide which values you want to see included in your data, as well as what the default value should be. Use the **+ Add** button to create new parameters.
4. For any columns you selected in step 3, you can add a filter to that column by selecting that column from the list. This way you can include or exclude the appropriate values for that column.
5. Select the **Go** button to run the data for your widget.
6. A suggested title for your widget will pre-populate for you, but you also have the option to change it to your own custom title.
7. Add a description to your widget to make it easier for others to quickly understand the data being displayed.
8. Your data will automatically be displayed in a suggested format, but you can also manually configure it as this point to be a table or a chart.

   1. If you choose the chart option, you will have the ability to select which type of chart you want your data displayed as by selecting the **bar chart icon** on the right side. Choose from a library of different types of charts, depending on your needs.
9. Edit the chart, table, or metric's configuration by selecting the **cog icon** on the right side. There are two tabs:

   1. Configure: Determine which table columns to show/hide, or customize chart axes.
   2. Settings: Additional display and formatting options, like text wrapping and table theme.
10. Select the **lowercase i icon** on the right side to see exactly what the query that you've built in this process looks like.
11. Once your query looks as expected and your visualization is properly formatted, select the **Pin** button to save your new widget. You will be able to choose which dashboard you want to save your widget to.

### Configure widget currency

It's possible [set the currency your data is reported in at the dashboard level](analysis-dashboards.md#configure-dashboard-currency), but you can also do it at the widget level.

Important: If you have a currency set at the dashboard level, this will override any currency you set at the widget level.

To set the currency for a specific widget:

1. Navigate to the dashboard containing the widget you're interested in. Make sure the widget has a currency-related measure.
2. Hover over the widget and select the **three dot icon** that appears.
3. Select **Edit**.
4. Find **Currency** under the **Parameters** section of the full list of columns you can add to your widget.
5. Click the **pencil icon** to modify the currency.
6. Search or scroll to find the currency you want to apply to your widget's data, then select it.
7. Select the **Apply** button.
8. Select the **Save** button.

Please note that if your dashboard currently does not have a currency set, the first currency you set for a widget will be added as a parameter on the dashboard as well. Follow the instructions [here](analysis-dashboards.md#configure-dashboard-currency) if you'd like to change it.

### View widget data

To view the underlying data that a widget is based on:

1. Navigate to the dashboard containing the widget you're interested in.
2. Hover over the widget and select the **three dot icon** that appears.
3. Select **Show underlying data**.

   1. Please note that you cannot view underlying data for columns based on aggregate formulas.
4. Select the **Edit columns** button to edit the columns displayed in this view.
5. Select **Download CSV** at the bottom-left of the module to download the data.

::: tip Tip
Editing which columns are displayed when viewing a widget's underlying data will also impact the columns included in the CSV download.
:::

You can also explore widget data further without actually making changes to it:

1. Navigate to the dashboard containing the widget you're interested in.
2. Hover over the widget and select the **three dot icon** that appears.
3. Select **Explore**.
4. From here, you can add filters, add columns, replace columns, or compare values.

   1. For example, you can quickly compare data where the "Ad Partner Name" is `amazon` versus `snap` to see which ad partner had more activity.  
      ![Branch Analysis comparison of ad partner performance for Snap and Amazon over the last 30 days.](/img/image-1758293697827.png)

### Edit widget

To edit the data displayed in a widget or how it is displayed:

1. Navigate to the dashboard containing the widget you're interested in.
2. Hover over the widget and select the **three dot icon** that appears.
3. Select **Edit**. For more information on widget configuration, read "[Create and configure a widget](analysis-dashboards.md#create-and-configure-widget)."
4. When you've finished your edits, select the **Save** button. Then select the **Close** button at the top of the page.

### Display widget on multiple dashboards

If you've already created a widget and you want to copy it to a different dashboard:

1. Navigate to the dashboard containing the widget you're interested in.
2. Hover over the widget and select the **three dot icon** that appears.
3. Select **Pin**.
4. Select the dashboard that you want to add your widget to, then select the **Pin** button.
5. When you visit the dashboard you selected, you will see that your widget has been added to it.

::: tip Tip
Editing a pinned widget in one dashboard will not impact that same widget in a different dashboard.
:::

### Delete widget

::: danger Warning
Deleting a widget is a **permanent** action and cannot be undone.
:::

To delete a widget:

1. Navigate to the dashboard containing the widget you want to delete.
2. Select the **three dot icon** in the upper-right corner of the dashboard.
3. Hover over the widget and select the **three dot icon** that appears.
4. Select **Delete** to permanently delete your widget.

### Display Custom Events

There's a wide variety of [Branch Standard Events](track-branch-events.md#standard-events) you can use to tell the story of your customer's journey. When you use the Branch SDK to track these events, they are automatically available for selection when creating and configuring a widget.

However, if necessary, you can also use a [Branch Custom Event](track-branch-events.md#custom-events) to describe your user's behavior. Unlike Standard Events, these are not automatically available to you when creating a widget. Instead, you'll need to use a Custom Event Template and specify which Custom Event you want to track.

To use a Custom Event Template:

1. Navigate to the dashboard containing the widget you want to add a Custom Event to.
2. Either [create](analysis-dashboards.md#create-and-configure-widget) or start to [edit](analysis-dashboards.md#edit-widget) the relevant widget.
3. Make sure to select the correct [data source](analysis-dashboards.md#key-terms) (typically **Activity**).
4. In the columns section, expand **Measures**.
5. Find and select `**Custom Event Template 0**.
6. Select the **Go** button to run the query.

   1. Note: at this point, your widget will display a count of `0` because the template doesn't know which Custom Event to track yet.
7. Find the **filter bubble** that says `custom_event_total_count_param_0 default` in the filter bar at the top of your widget configuration. Select this **filter bubble**.  
   ![Branch Custom Event template with highlighted parameter and currency details displayed on the Analysis Dashboards interface.](/img/Screenshot 2025-12-29 at 2.26.56 PM.png)
8. In the dialogue that opens, enter your Custom Event name exactly as it appears in your Branch data (e.g., `First_registration` or `Level_completed` ).
9. Select the **Apply** button. The widget will now display the count for your specified Custom Event.
10. The filter will update to show `custom_event_total_count_param 0` followed by the name of your Custom Event.
11. Select the **Pin** button to save your widget to a dashboard.

#### Use multiple Custom Events

If you need to track multiple Custom Events in your dashboard, please note that:

- Each Custom Event requires its own template slot.
- You can add additional Custom Event Templates beyond `Custom Event Template 0` (Template 1, Template 2, etc.) as separate measures.
- Each template will have its own parameter to configure.
- You can track up to five Custom Events (one per template slot).

**Example**: If tracking both `First_registration` and `Second_registration`, you would use `Custom Event Template 0` and set the parameter value to `First_registration` , then use `Custom Event Template 1` and set the parameter value to `Second_registration`.

::: tip Tips
- Use the exact name of the Custom Event as it appears in your Branch data when setting the parameter in the template (case-sensitive)
- The default parameter names (like `custom_event_total_count_param_0`) are technical but they'll become user-friendly like "Custom Event First Registration" after you set the value
:::

### Set KPI alert

Set an alert on a widget to be notified when a certain criteria or threshold is met. If a particular widget can have an alert set on it, it will have a **bell icon** on it when you hover over it.

1. Navigate to the dashboard containing the widget you want to set an alert on.
2. Hover over the widget and select the **bell icon** that appears.
3. Select an alert type from the pre-defined list of alerts. These include:

   1. "KPI crosses a set limit"
   2. "Regular KPI updates"
   3. "Values of an attribute crosses a set limit"
   4. "Regular updates on values of an attribute"
4. Select **Next**.
5. Give the alert a name and fill in the alert conditions with the appropriate values based on when you want the alert to fire.

   1. For example, set an alert to fire when your number of Open events goes over 25,000.
   2. By default, values will be checked daily at 09:00 UTC. You can change this by selecting **Change** and selecting a new cadence and time of day.
6. Add all the team members you want to receive this alert to the list of subscribers. You also have the option to add a custom message to be sent with the alert.
7. Confirm the structure of your alert by selecting **View query**.
8. When the alert looks how you expect, select the **Create alert** button.

### Manage KPI alert

Alerts are managed at the widget level. To manage the alerts for a widget:

1. Navigate to the dashboard containing the widget you're interested in.
2. Hover over the widget and select the three dot icon that appears.
3. Select **Manage alerts**.
4. Find the relevant alert, and select the **three dot icon** for it.
5. From this menu, you can select **Edit alerts**, **Add subscribers**, **Unsubscribe from alerts**, or **Delete alerts**.

## AI

AI is an important cornerstone of Analysis Dashboards. Your guide through this experience is Ivy, Branch's AI.

::: warning Caution
Please know that Ivy's answers are probabilistic, which means the same prompt may not always produce the exact same answer. Ivy's answers may contain errors and should be verified.

We recommend that you manually [confirm](analysis-dashboards.md#view-widget-data) that the models, filters, formulas, etc. your widgets are using are what you expect.
:::

Ivy can answer your questions about data at both the dashboard and widget levels.

You can prompt Ivy from any dashboard or widget, with the exception of widgets used to store your text-based notes.

If Ivy can't process the entirety of your prompt, it will let you know and attempt to process part of it.

Once Ivy gives you an answer, you can change the visualization type (table, chart), pin it as a widget to a dashboard, download the answer's data, or [edit the data](analysis-dashboards.md#edit-widget).

::: tip Tip
Selecting the **Edit** button on one of Ivy's answers also lets you see in more detail what models and columns it is using for the answer.
:::

If Ivy gives you an answer that is a link, you can select that link to see more information about the columns it is using. In some cases, it may have created a new formula, set, etc. for you, which you will find in the left-side navigation along with the rest of the available columns. You will also see all the columns used listed at the top in the search bar.

![Branch Analysis data for total count and conversion rates for ad partners over the last 30 days.](/img/Screenshot 2025-09-19 at 7.43.56 AM.png)

If a blue line appears under a column name, you can select it to see alternatives suggested by Ivy.

![](/img/Screenshot 2025-09-18 at 7.38.18 PM.png)

At the end of every answer, you have the option to tell Ivy whether it interpreted your question correctly by selecting either the **checkmark icon** or **X icon.**

**Dashboard level**

An individual dashboard is the highest level you can prompt Ivy from, but you can still ask Ivy questions about data that lives outside the dashboard you're asking questions from.

Prompting Ivy at the dashboard level is recommended when you want to create a truly unique widget. Otherwise, we recommend starting with a widget that is similar to what you're looking for, then prompting Ivy from there.

**Widget level**

When you prompt Ivy at the widget level, it will start by summarizing and re-iterating your question back to you. Use this output to confirm Ivy understood you correctly.

At this point it may also reference previous answers it has generated for you, to make sure it has built up the correct context between answers.

If Ivy makes changes to a previous answer, it will list these changes in shorthand form, for example `Added:Feature, Branch Channel = 'Short Links'`. Make sure these changes are what you expect for your prompt.

### Craft prompts for Ivy

Read the tips below and keep them in mind when crafting your own prompts for Ivy.

**Start broad, get narrow**

Instead of giving Ivy every detail upfront, ask a broader question first to establish a baseline, then build on the answers with more specific questions. Here is an example of a flow that uses this method:

Prompt 1: "How many users completed trials this quarter?"  
Prompt 2: "Break that down by OS."  
Prompt 3: "Now just show me users whose OS is Android."  
Prompt 4: "How many of these users are in Australia?"

**Use context**

The more context Ivy has about your question, the better it will understand what you are asking it to do. This is the reason it can be easier to build new widgets by using widgets you already have, than by creating a widget from scratch.

If you already have a widget that is a good starting point for your question, select the **Ivy** button on that widget to prompt Ivy from within the context of that widget. It will use the original widget to inform its answer.

**Speak naturally, but be aware of keywords**

Ivy expects your prompts to be formatted in plain English, not using proper Branch column names. For example, you can ask Ivy "What are the names of my top 5 campaigns?" and not use `campaign_name` anywhere in the prompt.

However, there are certain phrases worth noting:

- "Channel" and "Branch Channel" are not the same column name. "Branch Channel" includes Journeys, Short Links, Paid Media, and SEO.
- "Paid advertising" and "non-paid advertising" are useful ways to refer to owned and organic channels, respectively.
- The term "rate" is generic based on the context, so try to make it more specific, like "click-through percentage".

**Specify time periods clearly**

Be specific about the time period you want Ivy to look at when gathering your data. Instead of using a word like "recently", say "in the past 7 days".

**Ask for comparisons**

Ivy excels at comparative analysis. You can ask it to compare sets of data across different time periods, channels, campaigns, and much more.

**Use numbers as filters**

Ivy also handles numeric filters well. You can use phrases like:

- "Top 5"
- "Above 10%"
- "Higher than 80k"

### Get started with Ivy

Use these prompts as jumping off points to start conversations with Ivy:

- Which feature is driving most of my Short Link traffic?
- Are there differences in audience demographics between Short Link and Journeys clickers?
- Show me installs and opens for my top 5 paid advertising campaigns this quarter.
- What are our email open rates by audience segment?
- Show me click-through percentages for our top 10 email campaigns.
- How many subscriptions did users start last quarter?
- What's our paid advertising versus non-paid advertising install split this quarter?
- How many purchase events came from each Branch channel this month?
- How many registration forms were completed per campaign last quarter?
- What's our install-to-purchase conversion rate by ad partner?
- How many attributed installs do we have per geographic region for the past 60 days?
- Compare iOS versus Android install performance by channel.
- What day of the week has the highest engagement for clicks?
- What proportion of deep link users performed an add to cart event?

## Metrics

Analysis Dashboards give you several ways to share your data and discoveries with your team.

### Present data

To present a dashboard in presentation mode:

1. Navigate to the dashboard you want to present.
2. Select the **three dot icon** in the upper-right corner of the dashboard, then select **Present**.
3. Use the arrows keys on your keypad or the arrow icons at the top of the presentation to move through the dashboard's widgets one by one.

You can also enter presentation mode directly from a widget. To do this, hover over the widget and select the **three dot icon** that appears, then select **Present**.

### Download data

To download an entire dashboard:

1. Navigate to the dashboard you're interested in downloading.
2. Select the **three dot icon** in the upper-right corner of the dashboard, then select **Download PDF**.

To download data from a single widget:

1. Navigate to the widget you're interested in downloading.
2. Hover over the widget and select the **three dot icon** that appears, then select **Download**.
3. Choose your download type from the available options. The types of downloads available depend on the type of data in the widget.
4. Select the **Download** button.

### Share dashboards

You can share one or more dashboards at a time with your teammates that have a Branch account:

1. Navigate to the [**All Dashboards**](https://branchdocs.app.link/e/dashboards-overview-to-all-dashboards)page under **Analysis** in the left-side navigation of Branch.
2. Select the checkbox next to the dashboard(s) you want to share. Select the **Share** button.
3. Add either entire groups or individual users to the list of entities to share the dashboard(s) with. Decide whether each entity can view or edit the dashboard(s) you're sharing.
4. Select the **Share** button. These users will receive an email and see your dashboard appear in their list of **All Dashboards**.

## Learn more

Branch University offers **live**, **expert-led trainings** covering the new Branch experience, including Analysis. Learn more [here](https://branchdocs.app.link/e/dashboards-live-training).

## FAQ

<details>
<summary>What is a dashboard?</summary>

Dashboards are individual pages that bring together a collection of metrics/charts (widgets) in one place, where you can compare them side by side.

</details>

<details>
<summary>What is a widget?</summary>

Widgets are individual metrics or charts that display aspects of your Branch data. They can be edited and customized to capture the data you need. Ivy's responses can be turned into new widgets that get pinned to dashboards.

</details>

<details>
<summary>Can I create and edit Analysis Dashboard?</summary>

Yes, but the ability to create or edit Analysis Dashboards depends on your Branch package. Some packages only allow viewing [default dashboards](branch-analysis.md#default-dashboards).

</details>

<details>
<summary>What is Ivy?</summary>

Ivy is Brach's integrated AI. It helps you uncover insights and answers your business questions in real time.

</details>

<details>
<summary>Can I download data from Analysis Dashboards?</summary>

Yes, you can download entire dashboards or data from individual widgets in various formats.

</details>

<details>
<summary>What types of filters can I apply to my dashboards?</summary>

You can apply filters to include or exclude specific data, and you can configure them to apply to all or individual widgets.

</details>

<details>
<summary>What should I do if I see the error "Some x-axis values cannot be sliced by color because they have multiple y-axis values"?</summary>

Try to switch from chart view to table view for your data.

</details>

<details>
<summary>What does "Viewing underlying data is not supported when there are chasm traps, fan traps, or for columns based on aggregate formulas" mean?</summary>

This likely means that you are trying to view underlying data for a widget where the metric is calculated based off aggregate values that cannot be displayed more granularly because of the columns selected for the widget.

</details>

<details>
<summary>What does "Total Count" refer to?</summary>

"Total Count" includes impressions, clicks, opens, and installs.

</details>

<details>
<summary>What if Ivy's answer doesn't look the way I expect it to? How can I know exactly what data Ivy is pulling from?</summary>

Select the **Edit** button to be taken to the configuration page where all available columns are displayed, as well as the columns used in the answer. From here you can view the answer in more detail and edit it.

</details>
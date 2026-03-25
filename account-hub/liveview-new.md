---
title: "Liveview (New)"
slug: liveview-new
---

## Get started

To access Liveview, go to **Configuration** **>** **Testing & Monitoring**, then select the **Liveview** tab.

::: danger Don't see this page yet?
The Testing & Monitoring page is part of the [new Branch](new-branch-overview.md) experience. This page is being rolled out to customers in phases through 2026. While you're waiting for access, you can explore this article to familiarize yourself with the new functionality.
:::

### 1. Choose an event type

Select the event type you want to view from the dropdown menu in the upper left.

### 2. Add filters (optional)

Select **Build Query** to open the query builder modal. Here you can:

- Change the **Event Type** from the dropdown.
- Add filters by selecting a field, operator, and value.
- Select **+ Add filter** to add additional filters.

Select **Save** to apply your filters.

Some of the most useful filters include `name` (for example, `PURCHASE`), `feature`, `channel`, `campaign`, and device identifiers like `IDFA`.

### 4. Customize columns (optional)

Select the **Columns** dropdown to show or hide columns in the results table. You can search for available columns and check or uncheck them to customize your view.

### 5. View Webhook records

To see the webhook request and response for debugging, select webhooks from the event type dropdown. This allows you to see what information is getting sent and whether it was successful (200 status code) or not (400 or 500 status code).

::: info Note
If you're trying to view Webhook Records going to a data integration, you'll need to filter by `webhook_partner_key` and specify the value in the format `di_partner_name`. For example, Adobe Analytics Processing Rules is `di_adobe_analytics_pr`, Mixpanel is `di_mixpanel`. If you don't add this filter, the webhook records for those data integrations will not show.
:::

## Supported event types

Liveview enables you to debug the following event types:

- click
- branch cta view
- sms sent
- open
- install
- reinstall
- web session start
- pageview
- content event
- commerce event
- custom event
- user lifecycle event
- webhooks

Liveview allows advanced filtering on a number of dimensions, including per-event and per-device dimensions not surfaced elsewhere in Branch. Access to this data is determined by the [Sensitive Data access level](add-manage-users-roles-permissions-access.md#access-levels).

## FAQs

<details>
<summary>Why is my link showing the same campaign name even though I'm sending dynamic values via query parameters?</summary>

We don't allow you to override default values set for analytics parameters ('~channel', '~tags', '~campaign', '~feature') at the link level via query parameters. This is done to prevent spam.

</details>

<details>
<summary>Why am I able to see revenue data on Liveview but not on the analytics page?</summary>

Revenue data will only populate for `PURCHASE` events. The event must be a standard Branch Commerce Event with the type `PURCHASE`, as outlined in the Commerce table in this [section](track-branch-events.md#track-commerce-events).

If you use a different type of event other than a `PURCHASE` event, you'll only see the data in Liveview, and the same data will not populate the dashboard.

For more information, refer to our documentation on [Tracking Commerce, Content, Lifecycle and Custom Events](track-branch-events.md).

</details>
---
title: "Liveview"
slug: liveview
---

::: danger Warning
Please note that this article explains the [legacy Branch experience](branch-dashboard-overview.md) for Liveview, which is slated for deprecation.  
  
In the [new version of Branch](liveview-new.md), attribution windows are configured under **Testing & Monitoring** → **Liveview**.
:::

## Supported objects

Liveview enables you to debug the following objects:

- Events
- Webhook records

`Events` and `Webhook records` allow advanced filtering on a number of dimensions, including per-event and per-device dimensions not surfaced elsewhere in Branch. Access to this data is determined by the [Sensitive Data access level](add-manage-users-roles-permissions-access.md#access-levels).

## Get started

### 1. Choose an object

Choose among the supported objects using the tabs at the top of the screen.



### 2. Choose event type

If you are viewing `Events`, then be sure to choose the appropriate event type from the dropdown, e.g. `commerce event`.



### 3. Add advanced filters (optional)

Add advanced filters. Some of the most useful include `name` (e.g. `PURCHASE`), `feature`, `channel`, `campaign`, and device identifiers like `IDFA`.



::: info What does it mean if the OS is "Robots" in Liveview reports?
This means that one of these conditions is true:

- The link clicks are not from a true iOS, Android, or other platform user agent
- The link clicks are from a bot like a Google scraper
:::

### 4. View webhook records

To see the webhook request and response for debugging, you can use the webhook records tab. This allows you to see what information is getting sent and whether it was successful (200 status code) or not (400 or 500 status code).



::: warning If you are trying to view webhook records going to a Data Integration
You will need to filter by webhook\_partner\_key and specify the value in the format di\_partner\_name. For example, Adobe Analytics Processing Rules is di\_adobe\_analytics\_pr and Mixpanel is di\_mixpanel. If you don't add this filter, the webhook records for those DIs will not show.
:::

## FAQs

<details>
<summary>Why is my link showing the same campaign name even though I’m sending dynamic values via query parameters?</summary>

We do not allow you to override default values set for analytics parameters ('~channel', '~tags','~campaign', '~feature') at the link level via query parameters. This is done to prevent spam.

</details>

<details>
<summary>Why am I able to see revenue data on Liveview but not on the analytics page?</summary>

Revenue data will only populate for `PURCHASE` events. The event must be a standard Branch Commerce Event with the type `PURCHASE`, as outlined in the Commerce table in [Track commerce events](track-branch-events.md#track-commerce-events).

If you use a different type of event other than a `PURCHASE` event, you will only see the data in Liveview, and the same data will not populate Branch.

For more information, please refer to our documentation on [Tracking Commerce, Content, Lifecycle, and Custom Events](track-branch-events.md).

</details>
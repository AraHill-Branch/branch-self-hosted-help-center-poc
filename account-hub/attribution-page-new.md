---
title: "Attribution (New)"
slug: attribution-page-new
---

## Overview

The Attribution page is where you configure how Branch attributes user sessions, tracks organic traffic, and measures conversion events.

Use this page to manage:

- [Predictive Aggregate Measurement (PAM)](predictive-aggregate-measurement-index.md)
- [SEO and AIO App Attribution](seo-app-attribution.md)
- [Attribution windows](attribution-windows.md)

You can access this page by navigating to **Configuration** → [**Attribution**](https://branchdocs.app.link/attribution) in Branch.

::: danger Don't see this page yet?
The Attribution page is part of the [new Branch](new-branch-overview.md) experience. This page is being rolled out to customers in phases through 2026. While you're waiting for access, you can explore this article to familiarize yourself with the new functionality.
:::

## Configure settings

The Attribution page includes the following configuration options:

### PAM

Predictive Aggregate Measurement (PAM) is Branch's attribution modeling solution designed to expand mobile attribution coverage. While solutions like SKAdNetwork (SKAN) provide some measurement, they're highly limited. PAM unlocks additional insights for users who would otherwise only show up in aggregated reports or be marked as `Unattributed` entirely. PAM can be leveraged alongside SKAN and AdAttributionKit.

Toggle the **PAM switch** on the Attribution page to enable this feature for your account.

For detailed information about PAM, visit the [PAM Overview](predictive-aggregate-measurement.md) and [PAM Data Reference](predictive-aggregate-measurement-data-reference.md) articles.

### SEO and AIO

SEO App Attribution tracks and attributes organic traffic from search engines. When users arrive from Google, Bing, Yahoo, or [other search engines](seo-app-attribution.md#channel), Branch identifies the source and attributes the session to the `organic search` channel.

AIO App Attribution tracks and attribution organic traffic from AI chat agents. When users arrive from ChatGPT, Claude, Gemini, Copilot, or Perplexity, Branch identifies the source and attributions the session to the `organic chat agent` channel.

In the **Type to add Search Engine Result Page (SERP) Domains** field, list each domain you want to enable SEO and AIO App Attribution for. Wildcard characters are not supported, so you must specify the exact domain, like `https://www.branch.io`.

Before you can use SEO and AIO App Attribution, your development team must implement the Branch SDK and configure Universal Links and App Links. See the [SEO and AIO implementation documentation](seo-aio-implementation.md) for technical setup details.

For more information about SEO and AIO App Attribution, including analytics and troubleshooting, visit the general [SEO and AIO App Attribution documentation](seo-app-attribution.md).

### Attribution windows

Attribution windows define the time periods during which Branch can attribute conversion events back to a specific touch point (click or impression). These windows control the maximum time allowed between a user's interaction with your marketing and the resulting downstream event.

The **Attribution Windows** section of the Attribution page displays a table with the following attribution types:

| Attribution type | Description |
| --- | --- |
| `click to start session` | Time between a click and an open or web session start (default: 1 day) |
| `click to install` | Time between a click and an install or reinstall (default: 7 days) |
| `click to conversion event` | Time between a click and a conversion event. Conversion events include [Commerce Events](track-branch-events.md#track-commerce-events) (e.g. `purchase`, `add_to_cart`), all [Custom Events](track-branch-events.md#custom-events), and all [view-based Branch Events](branch-event-ontology.md) like `pageview` (default: 30 days) |
| `impression to start session` | Time between an ad `impression` and an `open` or `web_session_start` (default: 1 day) |
| `impression to install` | Time between an ad `impression` and an `install` or `reinstall` (default: 1 day) |
| `impression to conversion event` | Time between an ad `impression` and a conversion event (default: 7 days) |
| `deep linking duration` | Maximum time between a `click` and a user being deep linked (default: 120 minutes) |
| `re-engagement inactivity` | Defines the period between two events that a user must be inactive to define the later event as a re-engagement (default: 7 days) |
| `household measurement window` | Time between a household device's ad engagement and an `install`, `open`, or `web_session_start` (default: 2 days) |

.png)

#### Adjust attribution windows

To adjust your attribution windows, select the window value you want to change in the table and enter your desired value. You can define windows as small as 0.0007 days (approximately 1 minute) or as long as 90 days, depending on the attribution type.

::: info Note
Changes to attribution windows settings apply to future attributions only. Allow several minutes for changes to persist through Branch's system.
:::

For more detailed information about attribution windows, including organization and app-level inheritance, visit the [Attribution Windows documentation](attribution-windows.md).

#### Important notes

Reference the following notes when adjusting your attribution windows:

- `deep linking duration` includes anyone clicking a Branch Link or being automatically redirected to the app through a Branch Web SDK call. This setting also covers the maximum length of time allowed for probabilistic modeling. Hence changing this value will also change the length of time allowed to use probabilistic modeling for attribution.
- `click to ...` attribution types refer to events that occur after someone clicks a Branch Link.

  - For example, if someone clicks and installs from a Branch Link, and comes back 10 days later to purchase (assuming `click to conversion event` window is set to greater than 10 days), Branch would count that as an attributed conversion.
- `impression to ...` attribution types refer to events that occur after someone views a [Branch Impression Tracking Link](https://help.branch.io/marketer-hub/docs/ads-advanced-configuration#viewthrough-attribution-vta-with-impression-pixels).
- `re-engagement inactivity` is used in re-engagement cohort analysis but not activity analysis.

## Save changes

After making any changes to your attribution settings, select the **Save Changes** button at the top of the page to apply your updates.

::: warning Caution
Changes to attribution settings can significantly impact how Branch attributes user sessions and conversion events. Review your changes carefully before saving.
:::
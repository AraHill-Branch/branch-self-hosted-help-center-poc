---
title: "Update to Short Link Expiration Window"
slug: updated-short-link-expiration-window
---

Branch Short Links will have a new expiration window in March 2024. Find out more in this update 🔗

## Overview

Effective March 11, 2024, all newly created Short Links will expire **380 Days after creation**.

::: info Links Flagged for Expiration
If you have Branch Short Links that were flagged for expiration and have been deleted, reach out to your Branch Account Manager or [Submit a Ticket](submit-a-ticket.md) for backfill assistance until **April 1, 2024**.
:::

There will be no changes to Long Links, Short Links, or Ad Links. By default, these links do not expire.

### Expiration Window Reset

- For the Short Links that are already created and active, the expiration clocks on them will be reset.
- When an existing Short Link is clicked or if Branch receives a [read request via the Deep Linking API](readexistingdeeplink.md), the expiration window is reset to 380 days from the click/request.
- To ensure a Short Link remains active forever, we recommend setting up a script to trigger a [GET request](deep-linking-api.md#read-existing-deep-link) periodically within the 380 Day timeframe.

::: tip
Looking to learn more about Branch Links in general including expiration behavior? View our guide here: [Create Deep Links](deep-linking-api.md#read-existing-deep-link)
:::
---
title: "Alert Notifications (New)"
slug: alert-notifications-new
---

## Overview

The alerting system lets you set up automatic email alerts on Branch to notify you of any data and account settings changes. This will help keep track of any unwanted account changes, reduce the chance of data loss, and increase visibility into postback flows.

Features include:

- Email alerts based on user role permissions and email address.
- Admins enable specific account alerts.
- Add recipient emails from Branch.
- Unsubscribe directly from the email.
- Track the last triggered alert.

::: danger Don't see this page yet?
The Testing & Monitoring page is part of the [new Branch](new-branch-overview.md) experience. This page is being rolled out to customers in phases through 2026. While you're waiting for access, you can explore this article to familiarize yourself with the new functionality.
:::

### Email alerts

Branch will notify those on the email list of the following alerts:

| Alert | Details |
| --- | --- |
| SAN authentication token expiry | Notification if a SAN Authentication Token (used to establish a connection between Branch and a SAN) is expired.  You can use this notification to reauthenticate the SAN connection. |
| Postback failures | Notification if the success rate of a postback falls below a configurable success threshold over a 24-hour period. |
| A change is made to the settings of an existing integrated SAN partner | Notification if there is a change in the settings of a SAN setting:   - Change in authentication. - Change in Events Configuration. - Change in Attribution Windows. |
| A change is made to the global settings of an account | Notification if there is a change in the account configuration of Branch account settings:   - Account Settings > Profile. - Configuration > General. - Configuration > Attribution windows. |

## Get started

The Alert Notification system can be accessed through the **Testing & Monitoring** screen on the [**Alert Notifications**](https://branchdocs.app.link/alert-notifications) tab. For each alert, you can **subscribe**, **configure recipients**, and **enable/disable alerts** using the three-dot menu.

### Alert actions menu

Select the three-dot menu icon on any alert row to access the following options:

- **Subscribe:** Quickly add yourself to the list of recipients for the alert.
- **Recipients:** View and manage the full list of users receiving emails for the alert.
- **Enable Alert / Disable Alert:** Toggle the alert status between **Active** and **Disabled**.

### Subscribe

**Subscribe** lets you quickly add yourself to the list of recipients of the alert.

### Recipients

Selecting **Recipients** will allow you to view the full list of users who are receiving emails for a given alert. Here you'll be able to add or remove recipients by role or by email address. Only admins can add other recipients, while individual users can subscribe themselves directly using the Subscribe option.

When adding recipients, you can choose to add by **Role** or by **Email**:

- **Role:** Select from available roles including Admin, Team Member, Full Read, Limited Read, Custom, User Coordinator, or No Access.
- **Email:** Add multiple email addresses directly.

### Enable/disable alert

Select **Enable Alert** or **Disable Alert** from the three-dot menu to change the status of the alert to **Active** or **Disabled**. Enabled alerts will allow those in the recipient list to receive emails for the given alert. Note, only admins of the Branch account can enable or disable alerts.
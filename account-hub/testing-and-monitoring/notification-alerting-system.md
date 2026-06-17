---
title: "Notification and alerting system"
slug: notification-alerting-system
---

## Overview

The alerting system lets you set up automatic email alerts in Branch to notify you of any data and account settings changes. This helps you keep track of any unwanted account changes, reduce the chance of data loss, and increase visibility into postback flows.

Features include:

- Email alerts based on user role permissions and email address
- Admins enable specific account alerts
- Add recipient emails from Branch
- Unsubscribe directly from the email
- Track the last triggered alert

::: danger Warning
Please note that this article explains the [legacy Branch experience](branch-dashboard-overview.md) for receiving notifications and alerts, which is slated for deprecation.  
  
In the [new version of Branch](new-branch-overview.md), attribution windows are configured under **Testing & Monitoring** → [**Alert Notifications**](alert-notifications-new.md).
:::

### Email alerts

Branch notifies those on the email list of the following alerts:

| Alert | Details |
| --- | --- |
| SAN Authentication Token Expiration | Notification if a SAN Authentication Token (used to establish a connection between Branch and a SAN) is expired.  Users can use this notification to reauthenticate the SAN connection. |
| Low Postback Success Rate | Notification if the success rate of a postback falls below a configurable success threshold over a 24-hour period. |
| SAN Partner Change | Notification if there is a change in the settings of a SAN setting:   - Change in authentication - Change in Events Configuration - Change in Attribution Windows |
| Branch Global Account Settings Change | Notification if there is a change in the account configuration of the Branch Account Settings;   - Account Settings -> Profile - Configuration -> General - Configuration -> Attribution windows |

## Enable alert notifications

You can access the alert notification system directly through the **Configuration** screen and on the [**Alert Notifications** tab](https://dashboard.branch.io/configuration/alert-notifications). For each alert, you can **configure recipients**, **enable/disable alerts**, **update configuration**, and **subscribe**.



### Recipients

Selecting **Recipients** lets you view the full list of users who are receiving emails for a given alert. Here you'll be able to add/remove recipients by role or by email address. Only admins can add other recipients while individual users can subscribe themselves directly from the subscribe button.



### Subscribe

**Subscribe** lets you quickly add yourself to the list of recipients of the alert.

### Enable or disable an alert

This action changes the status of the alert to **ACTIVE** or **DISABLED**. Enabled alerts let those in the recipient list receive emails for the given alert. Note, only admins of the Branch account can enable or disable alerts.

### Update configuration

**Update Configuration** allows you to set the different thresholds for the success rate of *Postbacks* and *Webhooks*. Additionally, you can filter for specific ad partners by selecting the **+ Add More Partner(s) Filters** button.


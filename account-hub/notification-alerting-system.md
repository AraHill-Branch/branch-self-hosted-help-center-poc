---
title: "Notification & Alerting System"
slug: notification-alerting-system
---

## Overview

The alerting system lets you set up automatic email alerts on the Branch dashboard to notify you of any data and account settings changes. This will help keep track of any unwanted account changes, reduce the chance of data loss, and increase visibility into postback flows.

Features include:

- Email alerts based on user role permissions and email address
- Admins enable specific account alerts
- Add recipient emails from the Branch Dashboard
- Unsubscribe directly from the email
- Track the last triggered alert

::: danger Warning
Please note that this article explains the [legacy Branch experience](branch-dashboard-overview.md) for receiving notifications and alerts, which is slated for deprecation.  
  
In the [new version of Branch](new-branch-overview.md), attribution windows are configured under **Testing & Monitoring** → [**Alert Notifications**](alert-notifications-new.md).
:::

### Email Alerts

Branch will notify those on the email list of the following alerts:

| Alert | Details |
| --- | --- |
| SAN Authentication Token Expiration | Notification if a SAN Authentication Token (used to establish a connection between Branch and a SAN) is expired.  Users can use this notification to reauthenticate the SAN connection. |
| Low Postback Success Rate | Notification if the success rate of a postback falls below a configurable success threshold over a 24-hour period. |
| SAN Partner Change | Notification if there is a change in the settings of a SAN setting:   - Change in authentication - Change in Events Configuration - Change in Attribution Windows |
| Branch Global Account Settings Change | Notification if there is a change in the account configuration of the Branch Dashboard Account Settings;   - Account Settings -> Profile - Configuration -> General - Configuration -> Attribution windows |

## Enabling Alert Notifications

Enabling the Alert Notification system can be accessed directly through the **Configuration** screen and on the [**Alert Notifications** tab](https://dashboard.branch.io/configuration/alert-notifications). For each alert, you can **configure recipients**, **enable/disable alerts**, **update configuration**, and **subscribe**.

![](../../../assets/media/images/e3f8849d-7f08-44a8-9666-129961d86dd3 "Notification System.PNG")

### Recipients

Selecting **Recipients** will allow you to view the full list of users who are receiving emails for a given alert. Here you'll be able to add/remove recipients by role or by email address. Only admins can add other recipients while individual users can subscribe themselves directly from the subscribe button.

![](../../../assets/media/images/8d0bcde3-625b-4e65-bc03-b9e521580ad3 "Recipients.PNG")

### Subscribe

**Subscribe** lets you quickly add yourself to the list of recipients of the alert.

### Enable/Disable Alert

This action will change the status of the alert to be **ACTIVE** or **DISABLED**. Enabled alerts will allow those in the recipient list to receive emails for the given alert. Note, only admins of the Branch account can enable or disable alerts.

### Update Configuration

**Update Configuration** allows you to set the different thresholds for the success rate of *Postbacks* and *Webhooks*. Additionally, you can filters for specific ad partners by clicking the **+ Add More Partner(s) Filters** button.

![](../../../assets/media/images/ae53ee8b-543d-471a-8ac5-266305fd84e7 "Update Configuration.PNG")
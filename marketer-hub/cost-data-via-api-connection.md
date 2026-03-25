---
title: "Via API Connection"
slug: cost-data-via-api-connection
---

## Overview

Cost data can be enabled through a direct integration between Branch and the ad partner. This integration is established via an API connection that is uniquely authenticated for each partner.

Once integrated, Branch will begin to ingest cost data from the ad partner and begin to create reports in the Branch Dashboard for you to analyze campaign performance across multiple ad partners in one place.

## Prerequisites

In order to enable Cost Data, you first need to:

1. Create a [Branch Dashboard](https://dashboard.branch.io).
2. Enable our [Performance product](packaging.md#performance-pro-tier) for your Branch account.

   1. Contact your Branch account manager or our [sales team](https://www.branch.io/contact-sales) to get started.
3. Implement the Branch SDK into your mobile app ([iOS](ios-basic-integration.md) | [Android](android-basic-integration.md)).

## Enable cost data via API connection

To see which ad partners Branch integrates with directly through API connection, visit the list on the [ROI Hub Overview page](https://help.branch.io/docs/roi-hub#ad-partner-support).

### SANs

For supported SANs, cost data can be enabled through their Partner Management Screen in the Branch Dashboard via the **Account Settings** tab.

Here, you'll connect your ad partner through their respective authentication flow (typically through a login).

Go through the login flow to authenticate your ad partner and click **Save & Enable.**

![267cdeb-Authenticate_SAN.png](/img/267cdeb-Authenticate_SAN(1).png)

### Non-SANs

For supported non-SANs, cost data can be enabled through their Partner Management screen in the Branch Dashboard via the **Cost Data** tab.

![ba8b97273e74d38de4eb13b68b89c6cb902d874767dd6799ba35b7876829ad27-Screenshot_2024-11-18_at_11.41.33_PM.png](/img/ba8b97273e74d38de4eb13b68b89c6cb902d874767dd6799ba35b7876829ad27-Screenshot_2024-11-18_at_11.41.33_PM(1).png)

During setup, you will be able to input your ad partner-specific key/token/etc. to the corresponding fields to authenticate the API connection. These values can be retrieved from your ad partner account manager or through their dashboard.

**Note**: These authentication fields will be different for each ad partner.

## Advanced

### Data scheduling

By default, Branch APIs will use the below general timelines for how often data is requested:

| Days Passed | Hours Passed | Number of Requests for a Single Day of Data |
| --- | --- | --- |
| 0, 1 | 0-48 | 4 times per day |
| 2, 3, 4, 5 | 44-144 | 1 time per day |
| 6-20 | 144-504 | 1 time every 5 days |
| 21-29 | 504-720 | 0 |
| 30 | 720 | 1 time |

These schedules may vary by ad partner.

### Timezone for cost

- If the partner timezone can be edited then you can change it on their side. However, this might mean that Branch Cost numbers don’t exactly match your invoices or partner dashboard
- If the partner timezone can’t be edited then you can change your Branch Dashboard timezone. However, this can cause inconsistencies with numbers and Facebook. So, this isn’t recommended.

### Connection failures

If your Partner Management screen for an ad partner is indicating "Failed" or "Not receiving cost, click, impression", it is likely caused by one or more of the following:

- Your partner's authentication token expired. In this case, you must re-authenticate.
- You have just authenticated or re-authenticated the ad partner. In this case, you must wait 24 hours for data to start flowing.
- You have authenticated the wrong ad accounts that aren't running any valid campaigns with cost

If you are still seeing failures, please reach out to Support or your Branch Account Manager.

::: tip Email Notification
You can sign up for Branch's Notification & Alerting system to get notified on changes like this. To enable, view our guide [here](notification-alerting-system.md).
:::
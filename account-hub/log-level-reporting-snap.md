---
title: "Snap Log-Level Reporting"
slug: log-level-reporting-snap
---

Snap has introduced upcoming restrictions for User-Level Raw Data Exports (‘Log-Level Restrictions’) that will impact *all* third party MMP platforms that work with Snap 👻 Branch customers will experience the effects of this change starting **January 3rd, 2024**.

### Impact

With this change, Snap is requiring log-level data to be scrubbed. There will be restrictions to log-level view-through conversion data, limiting certain fields such as campaign-level data and timestamps. This impacts the following Branch products:

- The Daily Exports, Custom Exports, and Scheduled Log Exports APIs
- Third-party Data Integrations
- Webhooks
- Ad Partner Postbacks

Advertisers can still see Snap as a media source for view-through conversions; however, campaign-level breakdowns will be unavailable for raw data exports. Campaign-level aggregate data will continue to be provided through the Branch Dashboard, aggregate-level APIs, and through Snap's own reporting interfaces/APIs.

### De-identifying Data

For attribution reports that include view-through engagement, Branch will make the following adjustments to de-identify such data:

- The Media Source (PID) will be Snapchat, and will not otherwise be obfuscated or restricted.
- Snap campaign information will be removed, specifically:

  - Ad Account ID
  - Campaign ID
  - Ad Squad ID
  - Ad ID (and associated names)
- Attributed touch time will be reported as date only (dd/mm/yyyy)
- Deep link URI information will be removed

### Restricted Parameters

| Snap Parameter | Branch Parameter |
| --- | --- |
| ad\_account\_id | ~advertising\_account\_id |
| campaign\_id | ~campaign\_id |
| campaign\_name | ~campaign |
| ad\_squad\_id | ~ad\_set\_id |
| ad\_squad\_name | ~ad\_set\_name |
| ad\_id | ~ad\_id |
| ad\_name | ~ad\_name |
| country | ~country\_or\_region |
| request\_id | N/A |
| snap\_channel | ~secondary\_publisher |
| deep\_link\_url | external\_intent\_uri, universal\_link\_url, android\_app\_link\_url |

::: tip
Ready to learn more about our Snap integration? View our guide here: [Snap](snap.md)
:::
---
title: "Unified Analytics Exports & Dashboard Improvements"
slug: improved-unified-analytics-exports-1
---

We've made improvements to Unified Analytics, and you can now export your valuable Branch Unified Analytics data to use in your internal reports. Learn more here 🔥

## Dashboard Improvements

We have made improvements to our Unified Analytics processing, which is designed to rectify discrepancies in reported totals and to enhance overall system reliability.

To guarantee a seamless transition without interrupting your ads reporting, we've introduced these enhancements in a new, “**Unified**”, tab. The pre-existing analytics, now labeled “**Unified Legacy**”, will remain accessible for the next three weeks, allowing you ample time to familiarize yourself with the new features at your convenience.

![](/img/f1e8414-Unified_Legacy.png)

::: tip
Looking to learn more about Unified Analytics? Learn more here: [Unified Analytics](unified-analytics.md)
:::

## Unified Analytics Exports

Unified Analytics has been a great tool for viewing campaign data from all attribution methods in a single view. Now you can get this valuable data in your data warehouses using the new [Cross-Events Exports API](cross-events-export-api.md). Unified Analytics Exports introduces a new `data_source` called `skan_unified_view` to use.

### Common Use Cases

- Export your unified total conversions
- Compare SKAdNetwork and Non-SKAdNetwork total counts
- Compare SKAdNetwork and Non-SKAdNetwork revenue

With the Cross-Events Exports API, you can customize your request with complex filters, aggregations, and granularity.

## Example Usage

::: code-group

```powershell [Request (cURL)]
curl --request POST \
     --url 'https://api2.branch.io/v1/branch_aggregate/async/analytics?app_id=123456789' \
     --header 'Access-Token: api_app_123456789abcdefghi' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "filter": {
    "type": "selector",
    "dimension": "name",
    "value": "COMPLETE_REGISTRATION"
  },
  "granularity": "all",
  "response_format_compression": "gz",
  "response_format": "json",
  "start_date": "2024-04-28",
  "end_date": "2024-05-05",
  "dimensions": [
    "name",
    "last_attributed_touch_data_tilde_campaign_id"
  ],
  "aggregations": [
    {
      "field_name": "unified_total_count",
      "data_source": "skan_unified_view",
      "display_name": "Unified Total Count"
    }
  ]
}
'
```

```json [Response (JSON)]
{"name":"COMPLETE_REGISTRATION","last_attributed_touch_data_tilde_campaign_id":"1624766361","total_count":1.0}
{"name":"COMPLETE_REGISTRATION","last_attributed_touch_data_tilde_campaign_id":"452798654","total_count":2197.0}
{"name":"COMPLETE_REGISTRATION","last_attributed_touch_data_tilde_campaign_id":"7ceb4624-b7a8-43c1-8c95-247fd3ffa582","total_count":274.0}
{"name":"COMPLETE_REGISTRATION","last_attributed_touch_data_tilde_campaign_id":"120206639272860749","total_count":2091.0}
{"name":"COMPLETE_REGISTRATION","last_attributed_touch_data_tilde_campaign_id":"1797766853010482","total_count":10.0}
{"name":"COMPLETE_REGISTRATION","last_attributed_touch_data_tilde_campaign_id":"2dd25d10-d388-4ecf-894e-2b68b2185708","total_count":15.0}
{"name":"COMPLETE_REGISTRATION","last_attributed_touch_data_tilde_campaign_id":"671357963","total_count":607.0}
{"name":"COMPLETE_REGISTRATION","last_attributed_touch_data_tilde_campaign_id":"40790","total_count":1.0}
```

:::

::: tip
Looking to learn more about Unified Analytics Exports using the Cross-Events Exports API? Learn more here: [Unified Analytics Export](unified-analytics-export.md)
:::
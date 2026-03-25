---
title: "Webhooks for Developers"
slug: data-integration-webhooks-for-developers
---

## Overview

Branch's webhook system allows you to export install and down-funnel event data as it occurs. You can import this data into your internal systems for analysis. You simply need to specify a URL for the POST or GET requests.

If you are looking for postback integrations for ad networks, please visit our [Ads documentation](ads-overview.md). For pre-configured integrations into popular analytics tools, please visit our [Data Integrations documentation](data-integration-implementation-guide.md).

The webhook system is highly customizable. You can register to only receive notifications for specific events, as well as specific subsections of events, filtered by link data, user data or event properties.

Our webhook infrastructure supports all Branch events. The data is formatted according to standard event naming and metadata format which will get you through implementation and on to analysis in no time.

## Data format

Setting up Advanced Filters or Freemarker macros requires an understanding of the Event Ontology data format. Before diving into the schema, you should understand some high level concepts about event metadata structure:

- Each event has top level fields, such as "name" and "id" that are not nested
- Link data is generally nested in "Last Attributed Touch Data"
- User data (including device and OS data) is nested in "User Data"
- Product or content level data is nested in "Content Items"
- Transaction and generic content data is nested in "Event Data"
- Journeys or Deepviews view data (e.g. Journey banners loads, not clicks) is "Last CTA View Data"
- Client-specified custom data (e.g. internal fields your company requires on specific events) is nested in "Custom Data"

::: info Note
To find a complete list of Branch supported postback macros, please see [Postback Macros & Functions](postback-macros-functions.md).
:::

::: warning Warning
Geographic data, such as country and city, may not be available for a very small percentage of events where the IP cannot be resolved to a location.
:::

### Sample webhook POST body syntax

The POST body for all webhooks follows the same structure:

```
POST
        User-agent: Branch Metrics API
        Content-Type: application/json
        {
        "name": "<event name e.g. open>",
        "user_data": {},
        "last_cta_view_data": {},
        "last_attributed_touch_data": {},
        "custom_data": {},
        "event_data": {},
        "content_items": {},
        "timestamp": 'example timestamp (int)'
        }
```

If any of these objects are empty, they will not appear in the POST body.

Here's a POST body with example data for an attributed open:

```
// Attributed open
        POST
        User-agent: Branch Metrics API
        Content-Type: application/json

        {
        "name": "open",
        "user_data": {
        "os": "IOS",
        "os_version": "11.1.2",
        "environment": "FULL_APP",
        "platform": "IOS_APP",
        "idfa": "F520B35A-4165-4426-98F6-64F12F47E9BZ",
        "idfv": "C6B869E7-7B0A-4A93-1C3D-960E8859DP5D",
        "limit_ad_tracking": false,
        "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202",
        "ip": "50.200.105.218",
        "developer_identity": "DB8C86A6-8B7C-4192-BD29-8107A5B788A1",
        "country": "US",
        "language": "EN",
        "brand": "Apple"
        },
        "last_cta_view_data": {
        "~id": 457624031399716729,
        "~campaign": "_test",
        "~feature": "journeys",
        "+domain": "branchster.app.link",
        "+url": "https://branchster.app.link/jeMczRn5XH",
        "$deeplink_path": "open/item/1234",
        "~creation_source": 5,
        "+referrer": "https://store.com/products/green-table",
        "foo": "bar",
        "$canonical_url": "https://store.com/products/green-table",
        "mydata": "set_branch_view_data_value",
        "~tags": [
        "tag1",
        "tag2",
        "bottom_banner_style"
        ]
        },
        "last_attributed_touch_data": {
        "~id": 467391383381228204,
        "~feature": "marketing",
        "~campaign": "december_test",
        "~channel": "Facebook Organic",
        "product_id": "XBA8198j",
        "product_name": "Green Table AB10",
        "+url": "https://branchster.app.link/test_linking",
        "$marketing_title": "Deep Link Testing",
        "$ios_deepview": "branch_default",
        "+via_features": [
        "QUICK_LINKS"
        ]
        },
        "custom_data": {
        "reinstall": "false",
        "ip": "50.200.105.218",
        "referred": "false"
        },
        "timestamp": 1512681005807
        }
```

### Advanced filtering

Branch supports advanced filtering which allows you to set filters based on almost any event metadata.

Make sure you've taken a look at the data format before you attempt to set advanced filters.

Complete the following steps to create an advanced filter:

1. Select the **Add New Filter** button.
2. Select the metadata you'd like to filter on. For advanced filtering, choose "Custom."
3. Type in the key that you'd like to filter on. To find the key you'd like to filter on, reference our quick introduction to the Br data format to figure out where your key is likely nested. Another foolproof way to find your key is looking at your data in full before setting up your filter. You can do this by doing a [CSV export](https://dashboard.branch.io/data-import-export/csv-exports), [API export](https://help.branch.io/), or send a single webhook with a POST body. You can locate your key in that POST body.
4. Unless your key is part of the top level data (e.g. **timestamp** or **id**), it will likely be nested one level deep. Most keys will be of the format **object\_name.key**. For example, if you want to filter for a custom key in deep link data called "product\_deeplink\_id", that would take the form **last\_attributed\_touch\_data.product\_deeplink\_id**.

#### Advanced filtering example

Let's say you're interested in receiving a webhook for every **Purchase** event using a specific coupon. When you set up the Purchase event in your app or on your website, you added a specific piece of metadata for **coupon**. In the [Event Ontology Schema](branch-event-ontology.md) you saw that coupon is inside event\_data.

To configure your filter to fire a webhook only when coupon is equal to SUMMERDEALS10 you will:

1. Select **Custom** from the **Field Name** dropdown.
2. Set the key as **event\_data.coupon.**
3. Select **equals** on the **Comparator** drop-down.
4. Enter a value of **SUMMERDEALS10.**

::: warning Warning
Currently, webhooks do not support filtering on values inside arrays. Example arrays that cannot be filtered by value are **tags**, **+via\_features**, and **content\_items**.
:::

### Templating your postback URL

If you'd like to template your postback URL, you'll likely need to create one of our templated postback URLs along side the aforementioned filters. These work very similarly to filters but use Freemarker syntax.

#### Getting started with templates

To start, we can add a simple template. Let's say we want to add campaign as a query parameter. The correct syntax is

```
`https://webhook.com?campaign=${(last_attributed_touch_data.~campaign)!}`
```

Let's walk through the syntax:

1. First, find the key for the value you want to template in. As with filtering, to find the key, reference our quick introduction to the Branch data format to figure out where your key is likely nested. Another foolproof way to find your key is looking at your data in full before setting up your filter. You can do this by doing a [CSV export](https://dashboard.branch.io/data-import-export/csv-exports), API export or send a single webhook with a POST body, and locate your key in that POST body.
2. This exercise tells us that Campaign is nested inside `last_attributed_touch_data` and is represented by `last_attributed_touch_data.~campaign`.
3. The additional syntax around `last_attributed_touch_data.~campaign` is because Branch's templating engine uses Freemarker. In Freemarker, you can print variables by surrounding them with `${}`. Finally, we add `()!` to the variable because we want to prevent errors in the case that there is no value.
4. This leaves us with `${(last_attributed_touch_data.~campaign)!}`.

Here is some more example Freemarker for common templates:

| Parent object | Common name | Freemarker |
| --- | --- | --- |
| Bundle | Android Package Name | `${(bundle.android.package_name)!}` |
| Bundle | iOS Bundle ID | `${(bundle.ios.bundle_id)!}` |
| Last Attributed Touch Data | Feature | `${(last_attributed_touch_data.~feature)!}` |
| Last Attributed Touch Data | Channel | `${(last_attributed_touch_data.~channel)!}` |
| Last Attributed Touch Data | Campaign | `${(last_attributed_touch_data.~campaign)!}` |
| Last Attributed Touch Data | Ad Partner Name | `${(last_attributed_touch_data.~advertising_partner_name)!}` |
| User Data | OS | `${(user_data.os)!}` |
| User Data | Platform | `${(user_data.platform)!}` |
| User Data | IDFA | `${(user_data.idfa)!}` |
| User Data | IDFV | `${(user_data.idfv)!}` |
| User Data | Android Advertising ID | `${(user_data.aaid)!}` |

::: info Note
To find a complete list of Branch supported postback macros, please see [Postback Macros & Functions](branch-event-ontology.md).
:::

#### Freemarker expressions

Due to security restrictions, Branch does not support the full list of Freemarker expressions.

Here is a list of blocked expressions:

```
"<#import>", "<#visit>", "<#include>", "?eval", "<#recurse>", "<#setting>", "<#macro>", "<#function>", "<#nested>", "<#return>", "<#list>"
```

## Allowlist webhook IP addresses

If required by your setup, allowlist the following postback server IP addresses for security purposes:

|  |  |
| --- | --- |
| - 52.43.119.253/32  - 100.21.145.61/32 - 35.160.5.60/32 - 35.163.128.27/32 - 54.241.169.87/32 - 44.229.177.148/32 - 35.167.148.222/32 - 44.231.103.124/32 - 44.237.121.167/32 - 44.238.95.201/32 - 52.52.236.153/32 | - 44.247.175.42/32 - 44.247.58.38/32 - 52.33.75.0/32 - 52.34.127.49/32 - 54.177.16.103/32 - 54.213.17.93/32 - 184.169.196.16/32 - 35.161.135.86/32 - 44.230.175.24/32 - 52.27.172.117/32 - 35.160.133.187/32 |

### Optional: Configure AWS security group

If you have an AWS account you use for webhooks, you will need to create a security group, as well as a series of inbound rules associated with that security group.

::: warning Warning

::: warning Warning
This example **does not include the entire list** of IP addresses you need to make rules for. Find those [above](webhooks-for-developers.md#allowlist-webhook-ip-addresses).
:::

:::

![AWS security group details showing inbound rules and IP allowlist configurations for postbacks.](/img/Branch_IP_Allowlist_SG_Example.png)

### Optional: Configure GCP firewall policy

**If you have an GCP account** you use for webhooks, you will need to create a firewall policy, as well as a series of firewall rules associated with that policy.

This example **does not include the entire list** of IP addresses you need to make rules for. Find those [above](webhooks-for-developers.md#allowlist-webhook-ip-addresses).

![GCP firewall policy details showing various rules and their configurations for postbacks.](/img/Branch_IP_Allowlist_GCPFWRules_Example.png)

### Authenticating webhook events

Use the **Filters** tab to configure your own headers and authenticate your webhook events.

## Testing

#### Liveview

Use Branch’s [Liveview](liveview.md) feature to monitor your webhook records as they fire. You can see the complete request and response data for each webhook, including status codes that show whether your webhooks are successfully delivering (200) or encountering errors (400/500). Use the advanced filtering options to quickly pinpoint specific webhooks and troubleshoot any issues with your data integrations.

#### RequestBin

To test whether your webhook is configured correctly, you can use [RequestBin](https://requestbin.com/). RequestBin gives you a URL that accepts events for 24 hours and allows you to see exactly what Branch is sending.

1. Go to [RequestBin](https://requestbin.com/) and select **+ Create Request Bin**.
2. Copy the **Endpoint URL**.
3. Create a new webhook and use the **Endpoint URL** as your webhook URL.
4. Whenever your webhook is triggered, you will see a full report on RequestBin:

   ![](/img/7afbeb0-Screenshot_2020-07-03_at_10.56.25_AM.png "Screenshot 2020-07-03 at 10.56.25 AM.png")

::: warning Warning
Please archive your Requestbin webhook when you have finished testing. Requestbins only last for 24 hours and return errors once they expire.
:::

## More information

For more information on webhook configuration and testing, visit our [marketer documentation](webhooks.md).

## FAQs

<details>
<summary>What is the retry logic for webhooks?</summary>

We will retry if it's a timeout which can be on our end or our partner's end.

- Error codes mean it succeeded from our end and the recipient responded with an error, and we don't retry those.
- Since most partners' errors are caused by misconfigured webhooks and it would create a no-value load on our system.

In addition, the 500 timeout error definition is based on our setting, not based on their system, we are waiting only 2 seconds and if they did not respond back within 2 seconds we will log 500 with the timeout error message.  
 It is possible that they could receive data even though there is a 500 response code with a timeout error in our postback logs. When we have a waiting time (2 seconds) less than what their server took to process the request then we could see a timeout error at our end.

**Note**: `webhook_response_time_ms` in the raw data is not the time between request and response. This returns a time from postback request creation to webhooks record logging.

</details>
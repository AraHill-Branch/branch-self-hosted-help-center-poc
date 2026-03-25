---
title: "Google Marketing Platform Overview"
slug: google-marketing-platform
---

![](/img/e35c814-forwarderlogo_41_DoubleclickDFP.svg "forwarderlogo_41_DoubleclickDFP.svg")

## Overview

Branch connects to Google Marketing Platform (GMP) to surface ad-drive app conversions in the Branch Dashboard.

Google Marketing Platform includes the following products:

- Display & Video 360 (DV360)

  - Formerly DoubleClick Bid Manager (DBM)
- Campaign Manager 360 (CM360)

  - Formerly DoubleClick Campaign Manager (DCM)

**Important**: Please use the GMP integration in the Branch Dashboard instead of DoubleClick, which is the legacy integration.

### Limitations

By connecting your GMP and Branch accounts, you can:

- Send app conversion data collected by the Branch SDK to GMP for attribution.
- Gain `read-only` access to app conversion data from GMP Ads in your Branch Dashboard. **This does not include cost/click/impression data**.

### Feature Support

| Feature | Supported |
| --- | --- |
| View-Through Attribution | **Yes** |
| Click-Through Attribution | **Yes** |
| Local Currency Code | **Yes**  You can [set your local currency](advanced-settings-configuration.md#local-currency) in the Branch Dashboard. This results in a more accurate representation of performance. |

## How Does It Work?

1. Branch connects with GMP through an API endpoint. This requires account authentication in the Branch Dashboard through Link IDs set up in GMP.

   - If you are using GMP as a campaign manager, and a third party for the ad inventory, see [Attribution Claim Scenarios](google-marketing-platform-overview.md#attribution-claim-scenarios) to get additional details.
2. Events are configured to send from Branch to GMP.
3. Once campaigns are launched, users see an ad to download the app.
4. User installs the app and performs in-app events (ex. PURCHASE).

   - The Branch SDK captures the app install and downstream events.
5. Branch communicates with GMP through the API endpoint, sending GMP data about the conversion.
6. GMP claims conversions by sending the click or impression campaign data that sourced it to Branch.
7. The Branch Dashboard will update reports for you to be able to compare and measure ad campaigns across platforms, secondary publishers, etc.

Please note that if you are not using Branch Links, you can only see the [fields provided by GMP](google-marketing-platform-overview.md#data-mapping).

### Attribution Claim Scenarios

For customers that utilize GMP Ad-server and use trackers on 3rd party platforms (ex. DSPs like The Trade Desk) to get unified reporting in GMP, the attribution claim to Branch will depend on the setup in GMP.

| Scenario | Details |
| --- | --- |
| CM360 + Third-Party Media Source | DoubleClick Manager (DCM) parameters are included in the conversion response, and Branch ingests the DCM parameters.  **Attribution conversion credit goes to the third-party media source.**  **Note**: To retrieve and see important campaign information in Branch, you must use a Branch Ad Link with the `dclid` macro added:   - If there are existing parameters: `&dclid=%edclid!` - If there are no existing parameters: `?dclid=%edclid!` |
| CM360 + DV360 Media Source | DoubleClick Bid Manager (DBM) as well as DCM parameters are included in the conversion response, and Branch ingests the parameters.  **Attribution conversion credit goes to the DV360 Media Source.** |
| DV360 Media Source | DBM + DCM parameters are included (since a CM360 account is created when a DV360 account is created) in the conversion response, and Branch ingests all parameters.  **Attribution conversion credit goes to the DV360 Media Source.** |

::: danger Competing Conversion Reporting
Branch does not recommend enabling Google Ads alongside a third party partner that also reports on Google Ads traffic.

This is to avoid conflicts when reporting conversions from the same partner via two different integrations.  
  
For example, if Google Ads is enabled and CM360 is also utilized to report on Google Ads traffic, conversions might be reported by **both** Google Ads and CM360. In this scenario, CM360 will capture some of the conversions that would have been claimed by the main Google Ads integration.
:::

### Attribution Coverage

GMP covers attribution under the following properties/conditions:

| **Scenario** | Covered | Not Covered |
| --- | --- | --- |
| App to App | Both **click** & **view-through** **conversions**, using device ID. |  |
| Web to App | Only **click-through conversions**, using:   - dclid for DV360 Supply. - gclid for Google Ads/AdMob supply. | - View-through conversions - iOS scenarios where users have opted-out via ATT - Non-Google inventory (not leveraging gclid/dclid) |

## Integrate GMP and Branch

Follow the steps below to start tracking conversion events from GMP Ads.

### Prerequisites

Before you can track conversion events from GMP Ads, you first need to:

- Integrate the [Branch SDK](native-sdks-overview.md) into your app.

  - If you are using a server-to-server (S2S) integration, make sure the advertising IDs are being passed to Branch.
- Check with your Google representative for a guide provided by their team to **configure Branch as an App Analytics Partner** and **generate a link ID** for the iOS and Android versions of your app.

### Enable GMP in Branch

To start sending app conversions to GMP for attribution:

1. Navigate to the Partner Management [tab](https://branch.dashboard.branch.io/ads/partner-management/a_google_marketing_platform) and search for **Google Marketing Platform**.
2. Provide the **Link IDs** for your respective apps.
3. Click the **Save** button.

### Create GMP Ads Campaign

Please follow Google's documentation on how to set up a [Campaign](https://support.google.com/dcm/answer/2838056?visit_id=636933638406934064-1262523168&ref_topic=2834022&rd=1).

### Forward Events to GMP

Once you begin [tracking events](track-branch-events.md) with the Branch SDK, Branch will start sending them to GMP.

Branch will forward in-app events to GMP for campaign optimization. Additionally, Branch will receive attribution data from GMP, resulting in richer analysis in the Branch Dashboard.

View the Appendix section in this guide for [event mappings](google-marketing-platform-overview.md#event-mapping).

#### Custom Events

GMP supports up to 10 [custom events](track-branch-events.md#track-custom-events) in the following format:

- `custom`
- `custom_1`
- `custom_2`
- `custom_3`
- `custom_4`
- `custom_5`
- `custom_6`
- `custom_7`
- `custom_8`
- `custom_9`

When creating these custom events, you must click the **pencil icon** in order to create the new event.

## Appendix

### Data Mapping

Branch maps the following data fields from GMP to Branch.

| GMP | Branch | Possible Values |
| --- | --- | --- |
| n/a | `~advertising_partner_name` | “Google Marketing Platform” |
| `product_type` | `~channel` | This field reports the product that is responsible for the conversions, either “DBM” or “DCM”. |
| `creative_id` | `~creative_id` | The numeric ID of the creative ad unit that produced the ad event. This value is guaranteed unique. When product is DBM, this field represents the DBM Creative ID. When product is DCM, this field represents the DCM Creative ID. |
| `placement_id` | `~secondary_publisher` | The ID of the placement tag that calls an ad server for ad content when users visit a site. DCM serves ads when users visit a site with DCM placement tags. DCM generates a unique tag for each placement in an ad campaign. This value is only provided when product is DCM. |
| `placement_name` | `~placement` | The name of the placement tag that calls an ad server for ad content when users visit a site. DCM serves ads when users visit a site with DCM placement tags. DCM generates a unique tag for each placement in an ad campaign. This value is only provided when product is DCM. |
| `line_item_id` | `~ad_id` | Line items in DBM can be used for targeting, bidding and assigning creatives. This is the ID of the line item that produced the ad event. This value is guaranteed unique within the DBM universe. This value is only provided when product is DBM |
| `line_item_name` | `~ad_name` | Name of the line items in DBM that produced the ad event. This value is only provided when product is DBM. |

### Event Mapping

| Branch Event Name | GMP Conversion Type |
| --- | --- |
| `INSTALL` | `FIRST_OPEN` |
| `PURCHASE` | `ECOMMERCE_PURCHASE` |
| `INITIATE_PURCHASE` | `CUSTOM` |
| `ADD_TO_CART` | `ADD_TO_CART` |
| `VIEW_ITEM` | `VIEW_ITEM` |
| `VIEW_ITEMS` | `VIEW_ITEM_LIST` |
| `ADD_PAYMENT_INFO` | `CUSTOM` |
| `COMPLETE_REGISTRATION` | `CUSTOM` |
| `SEARCH` | `VIEW_SEARCH_RESULTS` |
| `ACHIEVE_LEVEL` | `CUSTOM` |
| `OPEN` | `SESSION_START` |
| `REINSTALL` | `REINSTALL_OPEN` |
| `COMPLETE_TUTORIAL` | `CUSTOM` |
| `ADD_TO_WISHLIST` | `CUSTOM` |
| `UNLOCK_ACHIEVEMENT` | `CUSTOM` |
| `SHARE` | `CUSTOM` |
| `SPEND_CREDITS` | `CUSTOM` |
| `RATE` | `CUSTOM` |
| `UPDATE` | `CUSTOM` |
| `RESERVE` | `CUSTOM` |
| `LOGIN` | `CUSTOM` |
| `INVITE` | `CUSTOM` |
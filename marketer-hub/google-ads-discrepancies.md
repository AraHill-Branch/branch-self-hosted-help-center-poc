---
title: "Google Ads Discrepancies"
slug: google-ads-discrepancies
---

## SAN Discrepancy

The main sources of discrepancies apply to all SANs that connect with Branch. Additional details can be found in our [Common Sources of SAN Reporting Discrepancies](common-sources-of-san-reporting-discrepancies.md).

## Cost, Click & Impressions

Google counts conversion day for click and impression so if you are comparing day by day it will be different.

- On the day that you click, Google is calling it the date of the install.
- Whereas Branch is calling the date as the date of the installs even if it might be three days later.

### Click Reporting

#### Google Adwords Valuetrack Parameters

Branch utilizes Google's Valuetrack parameters to collect more detailed information on the source of an ad click. Furthermore, we dynamically map Adword's **campaign id** and **network parameters** to a Branch Link's campaign analytics `Campaign` and `Channel` tags respectively. Leave these tags blank to have them dynamically mapped.

See below for a table of Valuetrack parameters collected by default through Branch's Ad links and refer to the table in [Google's Valuetrack](https://support.google.com/google-ads/answer/6305348) for more parameters to append.

| Valuetrack Parameters on Branch Ad Links | What It Returns |
| --- | --- |
| `\{campaignid\}` | The ad's campaign ID |
| `\{adgroupid\}` | The ad's ad group ID |
| `\{keyword\}` | For the Search Network: the keyword from your account that matches the search query, unless you are using a Dynamic Search ad, which returns a blank value. For the Display Network: the keyword from your account that matches the content. |
| `\{placement\}` | The content site where your ad was clicked (for keyword-targeted campaigns), or the matching placement targeting criteria for the site where your ad was clicked (for placement-targeted campaigns) |
| `\{network\}` | Where the click came from: "g" for Google search, "s" for a search partner, or "d" for the Display Network |
| `\{lpurl\}` | The final URL of the ad link clicked |

#### Universal App Campaigns (UAC)

- As links are not accepted into the Google Ads UAC UI, we will only report on clicks in aggregate (via Google's reporting API)
- Individual UAC clicks will not appear in Branch's liveview dashboard, webhooks, or exports
- 'Unique' UAC data cannot be viewed on the ads analytics dashboard (Non-UACs, like regular Search campaigns, will report on clicks in all Branch dashboards)
- Reporting on UAC clicks is done every 3 hours
- Branch only reports on clicks from an Google Ads campaign that led to an install or app engagement

#### Missing/Duplicated Click Data for Web-based Campaign

Click data for web campaigns is available with full breakdowns, but there are specific requirements for setting up web campaigns. Please see the [SAN Web Tracking](san-web-tracking.md) guide for more information on setting up web campaigns.

## Conversions

#### View-Through Conversions

By default, Google Ads includes View-Through Conversion counts in a separate column in reporting. If you have impression windows enabled in Branch, we can also attribute VTC installs and events (when there is not a matching click from another partner). Those will be grouped into the install and event counts, and can be segmented using the 'last attributed touch type' compare by in Branch reporting. You can manage settings to enable this attribution within the attribution settings tab of the Google AdWords partner management.

#### Conversion Table in Google Ads

When viewing a campaign, it shows the sum of all conversion events that apply to it. To view by conversion, navigate to `Segment` > `Conversions` > `Conversion name`, in order to clearly see the breakdown of your campaign's conversions.



#### Missing Conversions in Google Ads

Ensure that, in the [Google Ads dashboard, you have imported all Branch events](enable-google-app-campaigns.md#5-import-events-in-googles-dashboard) that you want to see in Google Ads.

#### Different Conversion Counts

While we should always expect around a 5% discrepancy due to time zone differences and the like, if you are seeing significant discrepancies, it could be an indication of a broader problem.

The first thing to do is to make sure you [Configure Attribution Windows](enable-google-app-campaigns.md#4-configure-attribution-windows).

Another source of discrepancies is the fact that attribution is based upon *click* time in Google Ads, whereas it is based upon *conversion* time in the Branch Dashboard. This will sometimes show different numbers in the two dashboards. This usually does not affect install numbers because install usually happens same-day as click, but it will have an impact on downstream events where events can sometimes occur up to 90 days after a click.

Google will send attribution data for almost every app conversion that they count on their end, with the exception of iOS Search traffic within UAC, and they also do not currently confirm standalone (outside of UAC) YouTube TrueView conversions to Branch (TrueView conversion support is in development).

::: warning iOS Campaigns Search Inventory
As of July 2019, Google has stopped reporting on installs from iOS App Campaign Search Inventory.
:::

Finally, Google Ads can delay reporting up to 24 hours. It's best to measure campaigns in a trailing manner.

#### Misaligned UAC Data

Google *installs* should have the full range of compare by options in the Branch Dashboard. However, *clicks, impressions, and cost* data for UAC are imported via the Google Ads Reporting API, as noted above. The Google Ads Reporting API does not necessarily provide the same breakdowns that Branch can create with raw install events, so there may be cases where the Branch Dashboard cannot compare by the same dimensions for clicks vs installs.
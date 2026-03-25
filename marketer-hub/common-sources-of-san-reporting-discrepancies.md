---
title: "Common Sources of SAN Reporting Discrepancies"
slug: common-sources-of-san-reporting-discrepancies
---

The following Branch Universal Ad Partners are [Self Attributing Networks](what-is-a-self-attributing-network.md):

- **Apple Ads**
- **Facebook Ads**
- **Google Ads**
- **Google Marketing Platform**
- **Snap**
- **Twitter Ads**

## Common Sources of Reporting Discrepancies

### Available Reporting Filters

Self-Attributing Networks (SANs) do not always support all of the dimensions available in your Branch analytics. Please refer to the following table when using Compare by dimensions.

|  | **Facebook** | **Google** | **Apple Ads** | **Snap** |
| --- | --- | --- | --- | --- |
| **Feature** | Supported | Supported | Supported | Supported |
| **Channel** | Unsupported | Unsupported | Unsupported | Unsupported |
| **Campaign** | Supported | Supported | Supported | Supported |
| **Tags** | Unsupported | Unsupported | Unsupported | Unsupported |
| **Stage** | Unsupported | Unsupported | Unsupported | Unsupported |
| **Ad Partner** | Supported | Supported | Supported | Supported |
| **Secondary Publisher** | Supported | Supported | Unsupported | Unsupported |
| **Ad Set Name** | Supported | Unsupported | Supported | Supported |
| **Ad Name** | Supported | Unsupported | Unsupported | Supported |
| **Creative Name** | Supported | Unsupported | Unsupported | Unsupported |
| **Keyword** | Unsupported | Supported | Supported | Unsupported |
| **Last Touch Type** | Unsupported | Unsupported | Unsupported | Unsupported |
| **Link ID** | Unsupported | Unsupported | Unsupported | Unsupported |
| **Country** | Supported | Unsupported | Unsupported | Unsupported |
| **OS** | Unsupported | Unsupported | Supported | Unsupported |
| **Platform** | Unsupported | Unsupported | Unsupported | Unsupported |

### Timezones

Please make sure the timezone is the same for your SAN account and your Branch account. If you are using multiple ad accounts with Branch, be sure to align the timezones of each of them.

If you are unable to align all timezones, you may notice some data on the Branch Dashboard does not line up exactly with data on the SAN Dashboard. However, data will not be lost, but merely shifted between days. Summing figures over longer periods of time should greatly diminish the effect of having inconsistent time zones.

**NOTE**: Branch exports are in UTC so make sure that when you are comparing the information that your timezones are aligned across 1) SAN dashboard, 2) Branch dashboard and 3) any Branch exported data.

### Limit Ad Tracking

In iOS 10, Apple broke the ability for app developers to collect the IDFA if the user had enabled Limit Ad Tracking.

In this case, Branch and SANs cannot compare notes to see who drove the install. This will account for about 15% discrepancy in counts across both platforms, where Branch's tracked installs will be lower.

### Attribution Windows

If one of your attribution windows on the Branch dashboard is different than the corresponding window on the SAN dashboard, the data between the two will not align. You can mitigate this by changing one of more of your attribution windows on the Branch dashboard, or changing the attribution windows in your SAN dashboard for the given ad account.

### Last-click Attribution

Branch's last-click attribution model can lead to differences in install counts for Branch vs self-attributing networks (SANs) that in turn cause differences in CPI metrics. Verify whether your cost and install metrics match the Ad Partner's dashboard.

If there is an install discrepancy, it is likely legitimate and due to differences in install counts, where Branch's number is more accurate. If the discrepancy is very large, investigate causes of install discrepancies through the usual troubleshooting steps.

### Reinstalls

Apple Ads' dashboard shows reinstalls as conversions in its default view, but Branch calls these installs "REINSTALLS." In the Apple dashboard, select New Downloads or Redownloads in the column selector to align data.

We remember the history of a particular user via their IDFA or Google Advertising ID (in addition to using a few other methods) and will detect whether the user is actually a new user or a returning user who had previously uninstalled your app. Facebook has a different mechanism that is limited to 180 days. Branch in some cases has detected reinstalls that occurred more than a year later.

### Opens vs Installs

Branch considers the first open to be the install. Apple Ads considers the time that the user downloaded the app to be an install. This can cause discrepancies in counts and date of install.

### Reporting based on Install Date vs Touch Date

Twitter will claim and report all conversions they have tracked clicks or views for within window. Because Branch will attribute to the last partner to interact with the user, you may see up to 10-30% discrepancies.

### Clicks vs Link Clicks

Branch will only show impressions and clicks for campaigns that have installs, reinstalls, or opens. If you have campaigns that have not resulted in these app-based outcomes, we will hide them.

Please be aware that Branch receives Link Clicks from Facebook via API. This click count differs from the click count found in Facebook which includes other sources of clicks.

### API Latencies

Apple Ads Attribution API can be slow to respond. Although customers can edit the timeout, the default Branch timeout in the code above is just over 1 second. If Apple Ads responds after this timeout, Branch will not attribute the install to Apple Ads.

### Cost Data Not Matching

Please ensure that you've selected the same time zone in your Ad Partner's dashboard and your Branch dashboard.

### CPI Metric Not Matching

Branch's last-click attribution model can lead to differences in install counts for Branch vs self-attributing networks (SANs) that in turn cause differences in CPI metrics. Verify whether your cost and install metrics match the Ad Partner's dashboard. If there is an install discrepancy, it is likely legitimate and due to differences in install counts, where Branch's number is more accurate. If the discrepancy is very large, investigate causes of install discrepancies through the usual troubleshooting steps.

### Cost, Click and Impression Data Missing

Generally, re-authenticating a partner and waiting 24 hours will re-enable cost data.

When you re-authenticate, double check that you have selected the correct accounts. We will only pull cost data for accounts that you select as part of the authentication process.

Background:

Cost, click and impression data for SANs are generally sourced from Partner APIs (unless Branch impression pixels or links are being intentionally used for attribution, for example, in web campaigns). When you enable a SAN, you authenticate with your provider. Branch uses this authentication to retrieve click, cost and impression data. If the authentication token expires (for example, if you reset your password, or the partner force resets your token), then you may not see click, impression or cost data. In this case, simply re-authenticate and that will refresh your token.

### Cost Data Missing or Incorrect Using "Compare By" Filters

Downstream events, such as *installs*, should always have the full range of compare by options in the dashboard. However, *clicks, impressions and cost* data for SAN are often imported via Partner APIs. These APIs do not necessarily provide the same breakdowns for cost data that Branch supports with raw install events, so there may be cases where the Branch Dashboard cannot compare by the same dimensions for cost data vs install data.

### Google Ads Conversion Modeling

Google Ads uses [conversion modeling](https://support.google.com/google-ads/answer/12443859?hl=en) to estimate conversions that it cannot directly observe. These modeled conversions are included in Google Ads reporting by default.

Branch does not incorporate Google's modeled conversions. Branch reports on conversions where a match can be made between a click/impression and an app event, using methods such as deterministic matching, [PREM](https://help.branch.io/marketer-hub/docs/predictive-modeling), or [PAM](https://help.branch.io/using-branch/docs/predictive-aggregate-measurement).

As a result, Google Ads will typically report higher conversion counts than Branch, particularly for iOS campaigns where ATT opt-in rates are low.
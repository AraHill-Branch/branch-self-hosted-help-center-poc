---
title: "Facebook App Install Ads"
slug: facebook-app-install-ads
---

## Overview

Branch Links can be used together with Facebook App Install Campaign ads, allowing you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

| Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format |
| --- | --- | --- |
| Consideration | App Installs | App Only: Install |

### Facebook Campaign Advert Format Support Table

| Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas |
| --- | --- | --- | --- | --- | --- | --- | --- |
| App Installs | ✔︎ | ✔︎ | ✔︎ | ✔︎ | - | - | ✔︎ |

::: info Facebook Campaign Types
Looking for other Facebook Ad campaign types? Please check out our [Facebook Ads Overview guide](facebook-ads-overview.md).
:::

## Setup

::: warning Prerequisites
- To track installs from Facebook Ads you should [integrate the Branch SDK](ios-basic-integration.md) into your app.
- To use Branch Links in Facebook App Install Ads ensure you have:

  - URI schemes configured on iOS
  - URI schemes configured on Android
  - iOS App Store ID set
  - Android Package Name set
  - Social Media Settings filled out (i.e. OG tags at the bottom of [Link Settings](configure-default-link-behaviors.md#4-social-media-preview))
- If you want to deep link from your ads directly to content, you should [configure deep link routing](in-app-routing.md).
- Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
:::

### Enable Facebook as an Ad Partner (for measurement)

::: info Enable Facebook as an Ad Partner
Completing this section -- **Enable Facebook as an Ad Partner** -- will result in Branch sending app events to Facebook in order to attribute them back to ad campaigns. **This does not enable deep linking for the ad**. Further work below is required for deep linking.
:::

If you haven't enabled Facebook as an Ad Partner on the Branch dashboard follow this section to do so. Advanced options for sending events can be found [here](facebook-faq-and-advanced-options.md#facebook-ads-advanced-options).

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management).



2. Search for **Facebook**.
3. Click **Connect With Facebook**



4. Log in to Facebook if you are not logged in



5. Confirm that Branch can receive your public profile



6. Confirm that Branch can have permissions `ads_read`, which is used to surface impressions and clicks on the Branch Dashboard.



7. Select the ad accounts for which you want to run app install ads or app engagement ads



8. Click to select a Facebook app id for which you want to run Facebook ads. *(Note - To Enable OS specific FB app IDs, please reach out to Branch support* [*support@branch.io*](mailto:support@branch.io)*)*

*[Image: 1136]*

9. Copy the app id



10. Paste the app id and press `Save`



Add your Facebook App Secret to enable deferred deep linking.



11. Facebook is now enabled as an ad partner! Note that if you have different attribution windows between Facebook and Branch, those will be highlighted. The warning has a link to the docs on how to align these attribution windows.



12. **(Optional) Add System User Token**: By default, Branch uses the authenticated user’s token to retrieve data from Facebook. However, you can optionally configure a System User Token instead.  
      
    A System User Token is tied to your Facebook Business Manager rather than an individual user account, so it typically lasts longer and won’t expire if a team member leaves. This provides more stable, long-term access for data retrieval. There is meant to be only one system user, and the rest of the team uses the same System User Token for access.  
      
    **Important**: Only admins can perform the steps required to generate a System User Token. Once your token is generated, keep it secure and do not share it outside your trusted team.  
      
    **Create a System User Token in Meta**  
    1. Log in to Meta Business Suite and navigate to Business Settings.  
    2. Under **Users**, select **System Users**, then select **Add New System User**. Enter a name and assign the Admin role.  
    3. Select the new system user’s name, then **Assign Assets**. Select your app and grant the **Manage App** permission. If needed, also add your ad account and grant **Manage Ad Account** permissions.  
    4. With the system user selected, select **Generate New Token**. Choose your app and select the required permissions (e.g., `business_management` , `ads_management`).  
    5. Select **Generate Token** and securely save the access token.  
      
    **Add the System User Token in Branch**  
    1. On the **Account Settings** tab for Facebook’s ad partner settings in Branch, locate the **System User Token** field.  
    2. Paste your token and select **Save**.  
      
    

13. **(Optional) Create a Facebook Ads link for deep linking**: Select the **Create Facebook Link** button in the top right hand corner. Scroll down to the section on **Deep link your app install campaign** for more details.



::: info Connecting Multiple Accounts
All SANs - including Facebook - accept multiple accounts. However, only a single Branch user can authenticate the integration. This means that the single user must have access to all of the accounts you wish to connect.

**Note:** Do not authenticate a single ad account to multiple Branch apps (ex. Live and Test apps) as that will cause issues with authentication and Dashboard reports.

If you are having trouble finding or selecting the ad account(s) for which you want to run ads, please visit our [FAQ](facebook-faq-and-advanced-options.md).
:::

::: tip Agency-Managed Campaigns
- If an Agency manages your Facebook Ads campaigns, please see [Agency-managed SAN Campaigns](what-is-a-self-attributing-network.md#agency-managed-san-campaigns).
:::

## Branch <> Facebook Field Mappings

Branch maps the following data fields from Facebook App Install Ads to Branch.

| Facebook Data | Branch Data | Possible Values |
| --- | --- | --- |
| n/a | `~advertising_partner_name` | “Facebook” |
| n/a | `~channel` | “Facebook” if null or last touch |
| n/a | `~feature` | "Paid Advertising" |
| `campaign_name` | `~campaign` | Light Bright Launch |
| `campaign_id` | `~campaign_id` | 15292426 |
| `publisher_platform` | `~secondary_publisher` | facebook / instagram / audience\_network |
| `creative_name` | `~creative_name` | Light Bright Vertical |
| `creative_id` | `~creative_id` | 1234567890 |
| `ad_set_name` | `~ad_set_name` | Light Bright |
| `ad_set_id` | `~ad_set_id` | 12345567890 |
| `ad_name` | `~ad_name` | Light Bright |
| `ad_id` | `~ad_id` | 123456789 |

::: info Cost Data Support
- To view the cost metrics Branch provides, please see [SAN Cost Data](what-is-a-self-attributing-network.md#san-cost-data).
- If you're seeing discrepancies, please see [Common Sources of SAN Reporting Discrepancies](common-sources-of-san-reporting-discrepancies.md).
:::

### View Your Data

The [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard provides an interactive time series graph and table to view the performance of your Ad campaigns.



The table shows summary data on the performance of each Ad campaign. On the right top side of the table you can find a **download button** to retrieve the chart's content as a CSV file.



::: info Interacting with your data
Breakdown and compare aspects of your Ad campaigns' performance by using the `Compare by +` button to add a parameter to split the data displayed data by.
:::

Then use the `and +` button to refine the data displayed to gain deeper insight into the performance of your Ad campaigns.

## Troubleshooting

We now have a dedicated [FAQ page for Facebook app ads](facebook-faq-and-advanced-options.md). If you are having any issues with app ads, please review the FAQ.

If you are having issues with web-only ads, you can check out the FAQ.

##### Branch Cost data not matching the Ad Partner dashboard

Please ensure that you've selected the same time zone in your Ad Partner's dashboard and your Branch dashboard.

##### CPI metric doesn't match between Ad Partner and Branch, although cost metric does

Branch's last-click attribution model can lead to differences in install counts for Branch vs self-attributing networks (SANs) that in turn cause differences in CPI metrics. Verify whether your cost and install metrics match the Ad Partner's dashboard. If there is an install discrepancy, it is likely legitimate and due to differences in install counts, where Branch's number is more accurate. If the discrepancy is very large, investigate causes of install discrepancies through the usual troubleshooting steps.

##### Cost, click and impression data is all missing

Generally, reauthenticating a partner and waiting 24 hours will re-enable cost data.

When you reauthenticate, double check that you have selected the correct accounts. We will only pull cost data for accounts that you select as part of the authentication process.

Background:  
Cost, click and impression data for SANs are generally sourced from Partner APIs (unless Branch impression pixels or links are being intentionally used for attribution, for example, in web campaigns). When you enable a SAN, you authenticate with your provider. Branch uses this authentication to retrieve click, cost and impression data. If the authentication token expires (for example, if you reset your password, or the partner force resets your token), then you may not see click, impression or cost data. In this case, simply reauthenticate and that will refresh your token.

##### Cost data is missing or incorrect for certain "compare by" breakdowns

Downstream events, such as *installs*, should always have the full range of compare by options in the dashboard. However, *clicks, impressions and cost* data for SAN are often imported via Partner APIs. These APIs do not necessarily provide the same breakdowns for cost data that Branch supports with raw install events, so there may be cases where the Branch Dashboard cannot compare by the same dimensions for cost data vs install data.

### Troubleshooting deep linking

##### Intercepting Deep Links Before Branch

If you use Branch deep links in Facebook app ads, please check the following.

We recently discovered an issue where an app was calling Facebook's SDK to fetch the deferred app link within their iOS and Android app. Branch calls use this same mechanism via direct API integration, but if Facebook's SDK retrieves it before we do, Branch will not see any deep link data. Please ensure to comment out any calls to the following API within your app:

- [Android: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/android/current/class/AppLinkData/)
- [iOS: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/ios/current/class/FBSDKAppLinkUtility/)

##### Issues Reading Facebook App Links

If Facebook is having trouble reading the App Links from the Branch Link, you might see messages like these while trying to test out the flow. This means that there is something corrupted in the OG tags causing Facebook to not parse your link.





**Rescrape the OG Tags**

You can test the OG tags using the [Sharing Debugger tool](https://developers.facebook.com/tools/debug) provided by Facebook:

1. Paste the Branch Link into the Input URL box.
2. Click on the Show existing scrape information button.
3. Examine errors regarding App Links from the output window.
4. Click on the Fetch New Scrape Information button. This last step typically resolves this problem if you are certain that your Branch Link Settings are correct.

::: info Automate Rescraping Process
You can further automate the rescraping process by using this command after you create a new link and before you use it for any ads:

```
curl --insecure "https://graph.facebook.com/?id=[YOUR-URL-TO-SCRAPE]&scrape=true"
```
:::

**If the OG tag tester continues to report problems**

1. Examine your [Link Settings](https://dashboard.branch.io/#/settings/link) and ensure that for all platforms (for which an app is available), that a URI scheme and a link to the app in the Play/App Store is configured. If you are using a Custom URL for your iOS Redirect, then you need to append `?id[10-digit App Store ID]` to the URL. This is necessary in order to fully generate the App Links and OG tags that the Facebook scraper expects to find.

   - For example, if your App Store URL is `https://itunes.apple.com/us/app/my-app-name/id1234567890`, then your Custom URL value should be `https://example.com?id1234567890`
2. If errors from the output window pertain to OG tags i.e. missing title, description etc. then examine link OG tags by appending `?debug=true`.
3. If you haven't set OG tags on a per link level, then please check your Dashboard's global Social Media Display Customization settings from the [Link Settings](https://dashboard.branch.io/#/settings/link) page.

**Use a direct deep link**

As a last resort, you can manually input a direct deep link. To retrieve this:

1. Go to Facebook's [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/)
2. Input the Branch Link you want to use for your ad
3. Click **Fetch new scrape information**
4. Find the `al:ios:url` line (it should look like )
5. Copy the value of this (`myapp://open?link_click_id=link-242052337263342024`) and input it as the Deep Link value of your ad

If none of these approaches work, please reach out to our [support team](submit-a-ticket.md) immediately.

##### Known Issue with App Restrictions

We recently discovered a bug within the Facebook system that prevents App Links from being read by the robot if you change any of these values from the defaults in your Advanced Facebook App Settings tab. Please make sure

- Contains Alcohol is set to **No**
- Age Restriction is set to **Anyone (13+)**
- Social Discovery is set to **Yes**
- Country Restricted is set to **No**

It has to look like this **exactly**:


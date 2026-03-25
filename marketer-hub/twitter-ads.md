---
title: "Twitter Ads"
slug: twitter-ads
---

![599](/img/749ddca-twitter-ads-logo.png "twitter-ads-logo.png")

## Overview

By connecting your Twitter Ads and Branch accounts, the following is enabled:

- App conversion data collected by the Branch SDK sent to Twitter Ads for attribution.
- `Read-only` access to install data (not cost/click/impression data) from Twitter Ads in your Branch account.

::: info Deep Linking Not Supported
Twitter Ads does not support the use of deep links at this time. As such, this integration does not require the use of Branch Links.
:::

## Prerequisites

::: warning Prerequisites
- Ensure Branch is the only MMP configured in your Twitter account. This must be done before you enable the Twitter integration in your Branch dashboard.
- To track installs from Twitter Ads you should [integrate the Branch SDK](ios-sdk-overview.md) into your app OR send events via server to server integration including device IDs (Google AID or Apple IFA).

  - To use Twitter App Install Ads ensure you have:

    - URI schemes configured on iOS
    - URI schemes configured on Android
    - iOS App Store ID set
    - Android Package Name set
  - Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.
:::

## Campaign Support

| **Campaign Type** | **Attribution Supported** | **Branch Linking Supported** |
| --- | --- | --- |
| App installs | Yes | No |
| App re-engagements | Yes | No |
| Website clicks or conversions | Yes (Branch only) | Yes |

The integration with Twitter Ads for mobile app conversion tracking is designed to support App install and re-engagement campaigns. Other campaign types can be run with Branch Links, but will only attribute in Branch and is not part of the integration.

## Branch Links

App campaigns do not support Branch Links. Branch Links can be used on Tweets, promoted Tweets, and non-app campaign types, but will only report conversions in Branch and not Twitter. To avoid high-level reporting discrepancies, you may want to segment this traffic from the integration by using Short Links.

## Enable Twitter Ads for Measurement

::: info Enabling Twitter
Completing this section -- **Enable Twitter Ads for Measurement** -- will result in Branch sending app events to Twitter in order to attribute them back to Twitter ad campaigns. Ensure Branch is the only MMP configured in your Twitter account. This must be done before you enable the Twitter integration in your Branch dashboard.
:::

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management) and search for **Twitter**.
2. Click **Log in with Twitter**

   ![1188](/img/d966285-twitter-ads-enable.png "twitter-ads-enable.png")
3. Provide your Twitter credentials to begin the authorization process.
4. Agree to the Advertising Terms & Conditions by checking the `I agree to the Twitter Ads Terms & Conditions`.

   ![564](/img/aaee4ff-twitter-ads-tocs.png "twitter-ads-tocs.png")
5. Authorize Branch Twitter Ads Manager to use your account by clicking `Authorize app`.

   ![713](/img/259fb67-twitter-ads-authorize.png "twitter-ads-authorize.png")
6. Select the ad accounts for which you want to run app install ads and click `Save`.

   ![982](/img/c9eaa21-twitter-ads-accounts.png "twitter-ads-accounts.png")
7. Finally, to create a Twitter Ads link click the `Create Twitter Link` button in the top right hand corner.

::: warning Twitter Ads Authentication Error
The error "Another MMP is already configured for this Twitter Ads account....." is returned when Twitter API still returns your previous MMP as your account provider.

To resolve this, please reach out to the Twitter team so that they can remove other providers from their end. Otherwise, please reach out to your previous measurement provider so that you can ask them to remove the past Twitter tags associated with your ad account.
:::

::: info Connecting Multiple Acccounts
All SANs - including Twitter - accept multiple accounts. However, only a single Branch user can authenticate the integration. This means that the single user must have access to all of the accounts you wish to connect.
:::

::: info Agency-Managed Campaigns
If an Agency manages your Twitter Ads campaigns, please see [Agency-managed SAN Campaigns](what-is-a-self-attributing-network.md#agency-managed-san-campaigns).
:::

## Creating a Twitter Ads Campaign

Please follow Twitter's documentation on how to set up an [App Install Ad Campaign](https://business.x.com/en/help/campaign-setup/create-an-app-installs-campaign).

## Data Mapping between Twitter Ads & Branch

Branch maps the following data fields from Twitter Ads to Branch.

| Twitter Data | Branch Data | Possible Values |
| --- | --- | --- |
| n/a | `~advertising_partner_name` | “Twitter” |
| `tpn_attribution` | `~channel` | “Twitter” if null or last touch, or “Twitter Audience Platform” if TAP is last touch |
| `engagement_time` | `last_attributed_touch_timestamp` | 1455675372963 |
| `campaign_name` | `~campaign` | Light Bright Launch |
| `campaign_id` | `~campaign_id` | 15292426 |
| `engagement_type` | `last_touch_type` | CLICK or IMPRESSION |
| `country_code` | `~user_data_geo_country_code` | US |

## Forwarding Events to Twitter Ads

Once you begin tracking events through the Branch SDK, we will start sending them to Twitter Ads. Twitter Ads has pre-defined events that map to pre-defined Branch events, listed below.

Branch will forward in-app events to Twitter Ads for campaign optimization. In addition, Branch will receive attribution data for rich analysis in the Branch dashboard.

| Branch Event Name | Twitter Conversion Type |
| --- | --- |
| `INSTALL` | `INSTALL` |
| `PURCHASE` | `PURCHASE` |
| `INITIATE_PURCHASE` | `CHECKOUT_INITIATED` |
| `ADD_TO_CART` | `ADD_TO_CART` |
| `VIEW_ITEM` | `CONTENT_VIEW` |
| `ADD_PAYMENT_INFO` | `ADDED_PAYMENT_INFO` |
| `COMPLETE_REGISTRATION` | `SIGN_UP` |
| `SEARCH` | `SEARCH` |
| `ACHIEVE_LEVEL` | `LEVEL_ACHIEVED` |
| `OPEN`, `REINSTALL` | `RE_ENGAGE` |
| `COMPLETE_TUTORIAL` | `TUTORIAL_COMPLETE` |
| `ADD_TO_WISHLIST` | `ADD_TO_WISHLIST` |
| `UNLOCK_ACHIEVEMENT` | `ACHIEVEMENT_UNLOCKED` |
| `SHARE` | `SHARE` |
| `SPEND_CREDITS` | `SPENT_CREDITS` |
| `RATE` | `RATED` |
| `UPDATE` | `UPDATE` |
| `RESERVE` | `RESERVATION` |
| `LOGIN` | `LOGIN` |
| `INVITE` | `INVITE` |

In order to track these events, please refer to the [v2 Event document](track-branch-events.md) for further information.

## Twitter Data Sharing

Twitter has a data agreement with Branch, and there are several layers of data that are concealed and can be exposed depending on who is accessing the data, and how the data is being accessed or exported.

### Data Levels

**Source Level** > Source level is the source information including Publisher name (hardcoded to "Twitter"), Publisher ID, 3p (hardcoded to "a\_twitter") and advertising partner name (hardcoded to "Twitter").

**Campaign Level** > Campaign level includes campaign information such as Campaign (Twitter Campaign Name), Campaign ID (Twitter Campaign ID), Channel (Twitter or Twitter Audience Platform), Feature (hardcoded to "paid advertising"), Ad ID (Tweet ID), Partner Ad Set ID (Line Item ID).

::: warning Allowlisting for Device IDs
If you want to receive device IDs and campaign level information via Branch's data feeds, then you must contact your Branch account manager. Please make use the email title of **CAMPAIGN LEVEL DATA EXPORT ALLOWLIST** when contacting your account manager to ensure proper handling.
:::

### Accessible Data

::: warning Data Purge
Branch will purge last-attributed data after 60 days.
:::

#### Clients

**Branch API/UI**:

- Source and campaign level data by default in aggregate reports.
- Source level data in exports by default. Campaign level data is not accessible in exports without allowlisting.

**Data Feeds**:

- Source level data with identifiers to an **internal BI endpoint only**.
- Data can not be sent to Branch data integrations, i.e. third party analytics.

  - Postbacks set up to analytics providers will scrub source and campaign level information by default, identifiers will still pass through, and the conversions will appear organic to the third party.

##### Agencies

Agencies can access Twitter data under the following circumstances:

- If they have been provided full agency access by the client.
- If they append their agency attribution code to the Twitter campaign they are running.

## Reporting and Discrepancies

There are two main causes for Twitter Ads discrepancies with Branch:

**Not last click**

Twitter will claim and report all conversions they have tracked clicks or views for within window. Because Branch will attribute to the last partner to interact with the user, you may see up to 10-30% discrepancies.

**August 2019 user data sharing changes**

In early August of 2019, Twitter temporarily suspended sharing conversion data with MMP's. Upon resuming, Twitter will still attribute all user conversions in their reporting, but will only share conversion data if the user has allowed data sharing in their settings. This may result in up to 50% discrepancies after the first week of August depending on the settings of the users you're acquiring. For more details contact Twitter or reference [their messaging](https://help.x.com/en/ads-settings).

## Troubleshooting

**Why am I seeing an onboarding error or not seeing an ad account?**

- You must have permissions to configure ad accounts.
- You can only track apps that are configured with store IDs & package names in Link Settings.

**What does the error** Missing app event tags **mean?**

If you see the **Missing app event tags** error while trying to enable the Twitter integration, please go through the onboarding flow in your Branch dashboard again.

**What does the error** `Non-Branch app event provider configuration detected` **mean?**

If you see the `Non-Branch app event provider configuration detected` error while trting to enable the Twitter integration, this means you have another Twitter Mobile Measurement Partner configured for your app/ad account combination. You must disable/delete any other MMP integration before enabling the Twitter integration in your Branch dashboard.

**Why are there so many events?**

We configure all permissible events at time of enablement so there’s no delay in tracking new events when they’re set up.
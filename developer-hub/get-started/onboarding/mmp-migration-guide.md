---
title: "MMP Migration Guide"
slug: mmp-migration-guide
---

## Overview

This guide walks you through how to migrate from your current MMP (Adjust, Singular, Kochava, Appsflyer, etc.) to Branch.

## Best practices

To help ensure a seamless transition to Branch, we recommend implementing these best practices:

- **Start small with tracking link transitions** - Begin by switching tracking links on your lowest-spend ad networks first to minimize potential attribution loss during the initial rollout.
- **Maintain dual SDK coverage** - Keep your existing MMP SDK active for a minimum of 2 weeks post-release to ensure continuous data collection from users who haven't yet updated to the latest app version containing the Branch SDK.
- **Implement a forced app update** - Consider requiring users to update to the latest version to ensure your entire user base transitions to Branch SDK rather than remaining on your legacy MMP solution.
- **Migrate all optimization events** - Ensure that every event currently sent to ad networks for campaign optimization is properly configured to flow through the Branch SDK.
- **Phase your implementation approach** - Begin by replicating your current MMP configuration exactly within Branch, then gradually expand functionality and explore additional features once the baseline setup is stable.

## Before you begin

To follow the steps in this guide, you must [sign up](https://branchdocs.app.link/e/migration-dashboard) for the Branch Growth Platform. Some features are included in the Branch Growth Platform, while others require a specific package. Please visit our [Pricing](https://www.branch.io/pricing/) page or [contact our Sales team](https://branchdocs.app.link/e/migration-sales) to learn more.

::: info Note
You must add a payment method to your account within 30 days of creating it. Learn more on our [billing page](how-billing-works.md).
:::

### Audit current MMP

Before you start migrating to Branch, you’ll need to understand your current MMP setup and the features that you use. We recommend creating an inventory of this so you know what needs to migrate to Branch.

You can also think about whether you want to add additional functionality to your setup by broadening the scope of features you use with Branch.

Alternatively, you may want to do some cleanup and maintenance during the migration to get rid of things like unused links or old events.

**After you complete this step**, you’ll be ready to start migrating to Branch.

<details>
<summary>Expand to view tasks</summary>

#### Organic channels

| **Task** | **Owner** | **Description** |
| --- | --- | --- |
| Inventory owned links | Marketing Team | For every link you are using with your existing MMP, you will need to replace that with a Branch Link. This means determining where all the links you are using today in your organic/owned channels live.  If you currently use an API to generate your links, you can continue to do so using the [Branch Deep Linking API](https://help.branch.io/apidocs/deep-linking-api). |
| Domain | Marketing Team | Note what your current domain is and whether it’s: 1. a custom domain you own, or  2. a domain provided by default, owned by your current MMP    For example, if the domain is branded and ends in `.com`, it is likely a custom domain. Decide whether you want to use this same custom domain with Branch.  By default, Branch will assign you an `app.link` domain. |

#### Paid channels

| **Task** | **Owner** | **Description** |
| --- | --- | --- |
| Audit ad partners | Marketing Team | Create a list of the ad partners that you are using with your current MMP.  First, verify whether these [ad partners are already listed](ad-partners-list.md) as integrations in Branch.  To include an ad partner that isn't on the list, refer to our guide on how to [add custom ad partner integrations.](adding-custom-partners.md) |
| Assess SKAN | Marketing Team | Confirm whether your team uses SKAN with your current MMP, and whether this setup was implemented in-house. |
| Inventory ad links | Marketing Team | For every link you are using with your existing MMP, you will need to replace that with a Branch Ad Link. This means determining where all the links you are using today in your paid channels live. |
| Audit events used for optimization | Marketing Team | Create an inventory of the events you currently use to optimize paid media spend. Your Development Team will need to track these through the Branch SDK, so they get forwarded to ad partners. |

#### Data

| **Task** | **Owner** | **Description** |
| --- | --- | --- |
| Account for data exports | Data Team | Determine the ways in which you are exporting data out of your current MMP, and decide whether you would like to replicate the same setup in Branch.  If you use an API to export data today, you can continue to do so using one of [Branch's Export APIs](https://www.branch.io/resources/blog/which-branch-data-export-solution-should-i-use-2/). |
| Plan event tracking | Marketing Team | Create a list of all the events your current setup tracks. Decide whether you would like to continue tracking the same events with Branch. |
| Consider importing existing users | Data Team | If your MMP allows you to export a list of your existing user IDs, you’ll need to think about whether you want to import this list into Branch. |

</details>

## Migrate to Branch

Follow these steps to transition from your current MMP to Branch while preserving your attribution data and minimizing disruption to your marketing campaigns.

### Step 1: Import historical data (optional)

You have two options for this step:

- **Skip if**: You're comfortable starting fresh with new data collection.
- **Complete if**: You want to preserve historical attribution data and user profiles. Once you have your data in the required format, the Branch team will import this data into our system. We recommend importing a maximum of six months of data.

::: warning Caution
If you install the Branch SDK without completing this step first, all existing users will appear as new installs in your data.
:::

**After you complete this step**, you’ll have historical data in Branch that you can start to gain new insights into.

<details>
<summary>Expand to view tasks</summary>

| **Task** | **Owner** | **Description** | **Time estimate\*** |
| --- | --- | --- | --- |
| Export data out of current MMP | Data Team | Export device IDs and timestamps from current MMP. Ensure you have IDFA/IDFV for iOS devices and GAID/Android ID for Android devices | 1 day |
| Format data in Branch-compatible format | Data Team | Format data into JSON line text format with required fields (timestamp, app\_id, device IDs). Reference our [importing guide](https://help.branch.io/developers-hub/docs/importing-historical-user-data#import-file-format) for exact format requirements and optional attribution fields. Please note that you will also need your Branch App ID, which you can find in the [Profile tab](https://dashboard.branch.io/account-settings/profile) of the **Account Settings** page. | 2 days |
| Share your data files with the Branch team | Data Team | Once you have submitted the files to Branch in the right format, the Branch team will ingest this data into our database. | 2 days |

</details>

### Step 2: Configure Branch and integrate SDK

Set up your Branch account, integrate the Branch SDK into your mobile app, and release the updated version.  
  
**After you complete this step**, Branch will start actively tracking attribution data for your app, and you'll be ready to begin transitioning your marketing campaigns to use Branch Links.

<details>
<summary>Expand to view tasks</summary>

| **Task** | **Owner** | **Description** | **Time estimate\*** |
| --- | --- | --- | --- |
| Set up Branch Dashboard | Marketing Team | Configure important fields within the Branch Dashboard, such as link domain and global attribution window settings. Visit our [general onboarding guide](https://help.branch.io/docs/onboarding-guide#step-1-set-up-branch-dashboard) for more details. | 1 day |
| Set up Branch SDK, track Branch Events, and validate setup | Mobile Development Team | Integrate the Branch SDK into your app and use it to start tracking Branch Events. Visit our [general onboarding guide](https://help.branch.io/docs/onboarding-guide#step-2-set-up-branch-mobile-sdks) for more details. | 8 days |
| Release your app | Mobile Development Team | **Important**: If you choose to [import historical data](migration-guide.md#step-1-import-historical-data-optional), please ensure that the import is complete before you release the app.  Branch recommends releasing your app with both your existing MMP and Branch enabled for a short period of time (at least 2 weeks). This will prevent any gaps in your data as users migrate onto the new version of your app. After that, you can remove your existing MMP from future app updates. | 1 day |

If you are planning to use the same custom domain on Branch as your previous MMP, you will need to CNAME the domain and migrate the links. Migration of the domain can lead to a short down time when transitioning to Branch.

</details>

### Step 3: Migrate owned links

Owned media refers to attribution links you use in content sharing, email, SMS, referrals, social media posts, blogs, and push notifications. Use Branch Short Links (App Links or Web Links) for these channels.

**After you complete this step**, all your owned media channels will be using Branch Links for attribution tracking.

<details>
<summary>Expand to view tasks</summary>

| **Task** | **Owner** | **Description** | **Time estimate\*** |
| --- | --- | --- | --- |
| Re-create owned links in Branch | Marketing Team, Development Team | Using your existing owned links as reference, re-create your links with Branch. You have several options for how to create links: in the Dashboard, with one of our APIs, or using the SDK.  Learn more in our [App Link](create-app-links.md) and [Web Link](create-web-links.md) guides. | 2-5 days, depending on how many links you need to re-create |
| Replace old owned links | Marketing Team | Replace your existing owned links from your old MMP with your new Branch Links. | 1-3 days, depending on how many links you need to replace |

</details>

### Step 4: Set up ad partner configurations

Configure self-attributing network (SAN) ad partners like Google and Facebook, set up other non-SAN ad partners, and gradually replace your existing ad campaign links with Branch Ad Links.

**After you complete this step**, all your paid advertising channels will be integrated with Branch, giving you unified attribution measurement across both owned and paid user acquisition efforts.

<details>
<summary>Expand to view tasks</summary>

| **Task** | **Owner** | **Description** | **Time estimate\*** |
| --- | --- | --- | --- |
| Integrate SAN partners in Branch | Marketing Team | Enable all relevant SAN partners in the Branch Dashboard, and map your Branch Events to the ad partner events.    Only Apple Ads and Google support connecting multiple MMPs. For all other partners, you will need to disable the ad partner from your previous MMP before you enable them in Branch.  For more information on individual SAN partners, visit our guides:   - [Google](google-ads.md) - [Facebook/Meta](facebook-ads-index.md) - [Apple Ads](apple-ads-index.md) - [Snap](snap.md) - [Twitter](twitter-ads.md) - [TikTok For Business](tiktok-for-business.md) | 15 minutes per ad partner |
| Replace SAN links | Marketing Team | In your SAN campaigns, replace each of your existing MMP ad links with a Branch Ad Link. Learn more in our [Ad Link](ad-links.md) guide. | 1-2 days, depending on how many links you need to re-create and replace |
| Integrate non-SAN partners in Branch | Marketing Team | Enable all relevant non-SAN partners in the Branch Dashboard, and validate the Postbacks to ensure the right events are sent to the ad partner.  Start with low-spend networks to mitigate the risk of lost attribution. For more details, visit our [Ad Partner Integration](ad-partner-integration-guide.md) guide. | 15 minutes per ad partner |
| Replace non-SAN links | Marketing Team | In your non-SAN campaigns, replace each of your existing MMP ad links with a Branch Ad Link. Learn more in our [Ad Link](ad-links.md) guide. | 1-2 days, depending on how many links you need to re-create and replace |
| Use SKAN with Branch | Marketing Team, Development Team | SKAN postbacks can be supported only by a single MMP. If your existing MMP is already sending SKAN postbacks to Apple, you will need to wait until the legacy MMP is fully disabled to start using SKAN with Branch.  To start using SKAN with Branch:   1. Ensure [StoreKit](https://developer.apple.com/documentation/storekit) is enabled on the app (to be done by developer) 2. Test SKAN campaign with ad partners:     - [Google Ads](google-skadnetwork.md)    - [TikTok](tiktok-skadnetwork.md)    - [Facebook](facebook-skadnetwork.md) | 5 hours |

</details>

### Step 5: Set up data exports

Configure integrations to send Branch data to supported data partners. This ensures your downstream systems continue to receive the attribution data they need without interruption.

To determine which Branch data export(s) best fit your use cases, check out this [blog post](https://www.branch.io/resources/blog/which-branch-data-export-solution-should-i-use-2/).

**After you complete this step**, your migration to Branch will be functionally complete. All your marketing channels will be tracked through Branch, and your data infrastructure will be receiving Branch attribution data for analysis and reporting.

<details>
<summary>Expand to view tasks</summary>

| **Task** | **Owner** | **Description** | **Time estimate\*** |
| --- | --- | --- | --- |
| Integrate Branch with data partners | Data Team | If you’d like to send Branch data to a supported data partner, you can configure that integration in the Branch Dashboard. Visit our general [Data Integration Implementation](data-integration-implementation-guide.md) guide for more details. | 15 minutes per partner |
| Pass partner-specific metadata to Branch SDK | Data Team | To pass Branch Event data to your data partner, you will first need to pass partner-specific metadata to the Branch SDK.  Refer to our list of [Data Integration Partners](data-integration-partners.md) for detailed information regarding the metadata that must be sent for each data partner. | 1 hour |
| Export Branch data using APIs | Data Team | You can export Branch data either at the aggregate-level or the log-level based on your requirements.  Log-level:   - [Daily Export API](https://help.branch.io/apidocs/daily-exports-api) - [Custom Export API](https://help.branch.io/apidocs/custom-exports-api) - [Scheduled Log Exports API](https://help.branch.io/apidocs/scheduled-log-exports-api)   Aggregate-level:   - [Aggregate API](http://help.branch.io/apidocs/aggregate-api) - [Query API](https://help.branch.io/apidocs/query-api) - [Cross-Events Export API](https://help.branch.io/apidocs/cross-events-export-api) | 3 hours |
| Test and validate your setup | Data Team | For data partner integrations, you can reference the [Liveview Webhook Records](https://dashboard.branch.io/overview/webhooks) tab to monitor the data being passed to your data partners in real time.  Also make sure to verify that any Branch APIs you are utilizing are providing the expected outputs. | 1 hour |

</details>

### Step 6: Remove existing MMP SDK

Once a few weeks have passed after releasing your app with both your existing MMP SDK and the Branch SDK, remove the existing MMP SDK.

**After you complete this step**, Branch will be completely integrated as your new MMP and your app will no longer be dependent on your legacy MMP.

<details>
<summary>Expand to view tasks</summary>

| **Task** | **Owner** | **Description** |
| --- | --- | --- |
| Review the app code and note down all references to the existing MMP SDK code | Development Team | Identify any areas in the code where the existing MMP SDK is being used or there are references to it.    Be sure to note any libraries that the existing MMP SDK imports by default, in case your app has dependencies on those. |
| Remove the existing MMP SDK code and any references to it | Development Team | Remove the legacy MMP SDK from the code, along with any references to it.    If there were any dependencies that it imported by default which your app depends on, include those individually. |
| Test that the app functions as expected | Development Team / QA Team | Perform regression testing to ensure that the removal of the legacy MMP SDK didn’t cause any bugs or cause any crashes when going through various flows your users would perform. |
| Release the app with the updates | Development Team | Submit the app without the legacy MMP SDK to the app store. |

</details>

## Additional support

Branch offers several ways to connect with expert guidance as you learn how to use all the powerful features of the Branch Growth Platform.

### Live trainings

For continued learning, [Branch University](https://branchu.app.link/e/XvE0493DFVb) offers live, expert-led [training sessions](https://monster-factory-web.app.link/e/universitylive) designed to help you master our products, sharpen your skills, and gain hands-on experience. These sessions provide an opportunity to ask questions directly to our trainers, ensuring you get the most out of the Branch Growth Platform.

### Professional Services

For deeper technical support, QA testing, or custom solutions, our Professional Services team is here to help. We offer dedicated workshops to better understand your goals, assist with setup, and provide guidance through go-live and beyond.

To learn more, please reach out to your Branch point of contact or [contact our Sales team](https://branchdocs.app.link/e/migration-sales) to request scoping.

\**The time estimates provided for each task are approximate and intended as general guidance. Actual completion times may vary depending on factors such as your team’s prior experience with Branch and the complexity of your existing app logic.*
---
title: "Analysis Data Sources Reference (New)"
slug: analysis-data-sources-new
---

## Introduction

Branch Analysis uses data sources to optimize performance and help you organize your data.

To learn more about Analysis, read our [Dashboards Overview](analysis-dashboards-overview.md) article.

## What are data sources?

Analysis uses different data sources to power your dashboards and widgets. When [creating a widget](https://branch.io/docs/branch-analysis#widgets), you’ll choose which data source to use.

The supported data sources are:

- **Activity**: Default data source for your last-touch Branch attribution reporting. It provides extensive tracking of most user behavior.
- **Activity Extended**: A more comprehensive version of the “Activity” data source that includes a wider range of fields and dimensions.
- **SKAdNetwork**: Contains SKAdNetwork (SKAN) data exclusively.
- **Unified Activity and SKAdNetwork**: Combines both “Activity” and “SKAdNetwork” data to provide a unified view of your campaign performance. While the most complete, this has the most limited set of available fields.
- **Fraud**: Contains information about blocked events so you can monitor the impact of your fraud protection rules.
- **Cohorts**: Groups users based on acquisition dates (re-engagement cohort data is not yet available in Analysis). Analyze retention, lifetime value, and campaign ROI.
- **Funnel**: Multi-touch attribution reporting across the user’s full journey.
- **Link Analytics**: Link-level performance reporting with link-specific dimensions.

::: info Note
When creating a widget, you will see an option to enable multiple sources. While this functionality is available, we do not recommend it for most use cases. The “Activity Extended” and “Unified Activity and SKAdNetwork” data source is the best method for viewing data from multiple sources. We recommend you build widgets using a single data source whenever possible.
:::

### Activity vs. Activity Extended

To optimize performance, activity data is divided into two separate data sources.

#### Activity

This is the default data source for widgets and should be used in the majority of cases. It's optimized for speed and contains the most frequently used reporting fields (about 33% of all available fields).

#### Activity Extended

This source contains all available activity fields. Because it contains significantly more data, widgets using this source will perform significantly slower. You should only use this source when you can't find a specific field you need in the default Activity source.

::: tip Tip
If you're building a widget and can't find a specific dimension, you must manually change the widget's data source from Activity to Activity Extended. The additional fields from the extended source will not appear in the search until you switch.
:::

## Data sources reference

Use this section to learn about each dimension and which data sources they appear in.

### Activity

| Field | Field Type | Description |
| --- | --- | --- |
| Achieve Level | Measure | Total count of Achieve Level Branch Standard Events |
| Achieve Level Unique | Measure | Total unique count of Achieve Level events |
| Ad Partner 3p | Dimension | The attributed ad partner via their Branch code (3p) |
| Ad Partner Name | Dimension | The attributed ad partner name |
| Ad Set Id | Dimension | The attributed ad set ID |
| Ad Set Name | Dimension | The attributed ad set name |
| Add Payment Info | Measure | Total count of Add Payment Info Branch Standard Events |
| Add Payment Info Unique | Measure | Unique Count of Add Payment Info events |
| Add to Cart | Measure | Total count of Add to Cart Branch Standard Events |
| Add to Cart Unique | Measure | Unique Count of Add to Cart events |
| Add to Wishlist | Measure | Total count of Add to Wishlist Branch Standard Events |
| Add to Wishlist Unique | Measure | Total unique count of Add to Wishlist events |
| Agency Id | Dimension | The attributed agency ID |
| Agency Name | Dimension | The attributed agency name |
| App Id | Dimension | The Branch App Id |
| App Name | Dimension | The Branch App Name |
| Attributed | Dimension | Indicates whether Branch was able to attribute the conversion event |
| Branch Channel | Dimension | Identifies which Branch product or feature measured the attributed event |
| Campaign ID | Dimension | The attributed campaign ID |
| Campaign Name | Dimension | The attributed campaign name |
| Channel | Dimension | The attributed Channel |
| Click Ad | Measure | Total count of Click Ad Branch Standard Events |
| Click Ad Unique | Measure | Total unique count of Click Ad events |
| Clicks | Measure | Count of clicks on links |
| Clicks Unique | Measure | Unique Count of Clicks |
| Complete Registration Unique | Measure | Total unique count of Complete Registration events |
| Complete Stream | Measure | Total count of Complete Stream Branch Standard Events |
| Complete Stream Unique | Measure | Total unique count of Complete Stream events |
| Complete Tutorial | Measure | Total count of Complete Tutorial Branch Standard Events |
| Complete Tutorial Unique | Measure | Total unique count of Complete Tutorial events |
| Cost Default | Measure | The spend on the paid media campaign |
| CPC | Measure | Cost per click |
| CPM | Measure | Cost per 1000 impressions |
| Creative Id | Dimension | The attributed creative ID |
| Creative Name | Dimension | The attributed creative name |
| CTA View | Measure | Total count of CTA View Branch Standard Events |
| CTA View Unique | Measure | Unique Count of CTA view events |
| Custom Event Template 0 | Measure | Template to set up count of your Branch Custom Event KPI |
| Custom Event Unique Template 0 | Measure | Template to set up unique count of your Branch Custom Event KPI |
| Date | Dimension | Time-series date |
| Event Name | Dimension | The name of the Branch event |
| External Click Count | Measure | The count of clicks received from integrated advertising partners |
| External Impression Count | Measure | The count of impressions received from integrated advertising partners |
| Feature | Dimension | Indicates what Branch feature or link campaign was attributed |
| Geo Country Code | Dimension | Two-letter global geo country code |
| Impressions | Measure | Total count of impressions on Branch impression links |
| Impressions Unique | Measure | Total unique count of Impressions |
| Initiate Purchase | Measure | Total count of Initiate Purchase Branch Standard Events |
| Initiate Purchase Unique | Measure | Total unique count of Initiate Purchase events |
| Initiate Stream | Measure | Total count of Initiate Stream Branch Standard Events |
| Initiate Stream Unique | Measure | Total unique count of Initiate Stream events |
| Install | Measure | Total count of Install Branch Standard Events |
| Install Unique | Measure | Total unique count of Install events |
| Invite | Measure | Total count of Invite Branch Standard Events |
| Invite Unique | Measure | Total unique count of Invite events |
| Journeys Dismissal Unique | Measure | Total unique count of Journeys Dismissal events |
| Journeys Dismissed | Measure | Total count of Dismissed Branch Journey Banners |
| Keyword Id | Dimension | The attributed keyword ID |
| Keyword Name | Dimension | The attributed keyword name |
| Login | Measure | Total count of Login Branch Standard Events |
| Login Unique | Measure | Total unique count of Login events |
| Open | Measure | Total count of Open Branch Standard Events |
| Open unique | Measure | Total unique count of Open events |
| Opt In | Measure | Total count of Opt In Branch Standard Events |
| Opt In Unique | Measure | Total unique count of Opt In events |
| Opt Out | Measure | Total count of Opt Out Branch Standard Events |
| Opt Out Unique | Measure | Total unique count of Add to Wishlist events |
| OS | Dimension | Indicates the Operating System of the device as retrieved via the Branch SDK |
| Pageview | Measure | Total count of Pageview Branch Standard Events |
| Pageview Unique | Measure | Total unique count of Pageview events |
| Platform | Dimension | Indicates the Platform of the device as retrieved via the Branch SDK |
| Purchase | Measure | Total count of Purchase Branch Standard Events |
| Purchase Unique | Measure | Total unique count of Purchase events |
| Rate | Measure | Total count of Rate Branch Standard Events |
| Rate Unique | Measure | Total unique count of Rate events |
| Registration | Measure | Total count of Registration Branch Standard Events |
| Reinstall | Measure | Total count of Reinstall Branch Standard Events |
| Reinstall Unique | Measure | Total unique count of Reinstall events |
| Reserve | Measure | Total count of Reserve Branch Standard Events |
| Reserve Unique | Measure | Total unique count of Reserve events |
| Revenue | Measure | The tracked revenue from Branch commerce events |
| ROAS | Measure | Return on ad spend |
| ROI | Measure | Return on investment |
| Search | Measure | Total count of Search Branch Standard Events |
| Search Unique | Measure | Total unique count of Search events |
| Secondary Publisher | Dimension | The attributed secondary publisher |
| Share | Measure | Total count of Share Branch Standard Events |
| Share Unique | Measure | Total unique count of Share events |
| Spend Credits | Measure | Total count of Spend Credits Branch Standard Events |
| Spend Credits Unique | Measure | Total unique count of Spend Credits events |
| Start Trial | Measure | Total count of Start Trial Branch Standard Events |
| Start Trial Unique | Measure | Total unique count of Start Trial events |
| Subscribe | Measure | Total count of Subscribe Branch Standard Events |
| Subscribe Unique | Measure | Total unique count of Subscribe events |
| Total Count | Measure | The total count of rows |
| Touch Type | Dimension | Indicates whether the attributed event was an Impression, Click, or other touch type. |
| Uninstall | Measure | Total count of Uninstall Branch Standard Events |
| Uninstall Unique | Measure | Total unique count of Uninstall events |
| Unique Count | Measure | The total unique user count of rows |
| Unlock Achievement | Measure | Total count of Unlock Achievement Branch Standard Events |
| Unlock Achievement Unique | Measure | Total unique count of Unlock Achievement events |
| View Ad | Measure | Total count of View Ad Branch Standard Events |
| View Ad Unique | Measure | Total unique count of View Ad events |
| View Cart | Measure | Total count of View Cart Branch Standard Events |
| View Cart Unique | Measure | Total unique count of View Cart events |
| View Item | Measure | Total count of View Item Branch Standard Events |
| View Item Unique | Measure | Total unique count of View Item events |
| View Items | Measure | Total count of View Items Branch Standard Events |
| View Items Unique | Measure | Total unique count of View Items events |
| Web Session Start | Measure | Total count of Web Session Start Branch Standard Events |
| Web Session Start Unique | Measure | Total unique count of Web Session Start events |

### Activity Extended

The Activity Extended data source has **all the fields from Activity plus the following fields**:

| Field | Field Type | Description |
| --- | --- | --- |
| Ad ID | Dimension | The attributed ad ID |
| Ad Name | Dimension | The attributed ad name |
| App Store | Dimension | Source app store for conversion event |
| App Version | Dimension | App version of conversion event app |
| Brand | Dimension | Mobile device brand of converison event |
| Campaign | Dimension | The attributed campaign name |
| Cross Device OTT | Dimension | Indicates whether attributed touch was OTT or CTV |
| Customer Event Alias | Dimension | Indicates the identifying alias for the Customer Event Alias feature |
| Days From Touch To Event | Dimension | Elapsed days between attributed touch and conversion event |
| Device Type | Dimension | Mobile device type of conversion event |
| Environment | Dimension | The platform type of the event (Web, App, etc.) |
| Journey Id | Dimension | Attributed Branch Journey ID |
| Journey Name | Dimension | Attributed Branch Journey feature name |
| Language | Dimension | Mobile device language of the conversion event |
| Marketing Title | Dimension | Identifying title added to links |
| Opted In | Dimension | ATT opt-in status of conversion event device |
| Organic Search URL | Dimension | Attributed organic search URL |
| SDK | Dimension | Branch SDK info of the conversion event |
| SDK Version | Dimension | Branch SDK version of the conversion event |
| Tags | Dimension | User-generated tags on links |

### SKAdNetwork

| Field | Field Type | Description |
| --- | --- | --- |
| Ad Partner 3p | Dimension | The attributed ad partner via their Branch code (3p) |
| Ad Partner Name | Dimension | The attributed ad partner name |
| Add To Cart | Measure | Total count of Add to Cart events |
| Add To Wishlist | Measure | Total count of Add to Wishlist events |
| App Id | Dimension | The Branch App Id |
| Assisted Download | Measure | Identifies whether the app has been previously installed |
| Assisted Install | Measure | The attributed install assist |
| Assisted Reinstall | Measure | The attributed reinstall assist |
| Body Campaign ID | Measure | The SKAdNetwork ID identifying the attributed touch campaign |
| Campaign ID | Dimension | The attributed campaign ID |
| Campaign Name | Dimension | The attributed campaign name |
| Complete Registration | Measure | Total count of Complete Registration events |
| Conversion Value | Measure | The SKAdNetwork fine-grained value that was passed to Apple by the advertiser app or MMP |
| Cost Default | Measure | The spend on the paid media campaign |
| Course Conversion Value | Dimension | The SKAdNetwork coarse-grained value that was passed to Apple by the advertiser app or MMP |
| Customer Event Alias | Dimension | The alias added via the Customer Event Alias feature |
| Date | Dimension | Time-series date |
| Download | Measure | Identifies whether this is a "first time install" |
| Fidelity Type | Measure | The SKAdNetwork fine-grained value that indicates whether the conversion was click-through or view-through |
| Initiate Purchase | Measure | Total count of Initiate Purchase events |
| Install | Measure | Total count of Install events |
| Login | Measure | Total count of Login events |
| Postback Sequence Index | Measure | The SKAdNetwork value that disambiguates the three postbacks (0,1,2) |
| Purchase | Measure | Total count of Purchase events |
| Reinstall | Measure | Total count of Reinstall events |
| Revenue | Measure | The tracked revenue from Branch commerce events |
| Search | Measure | Total count of Search events |
| Source App ID | Measure | The SKAdNetwork ID identifying the attributed touch publisher app |
| Source Identifier | Measure | The SKAdNetwork value that was passed to Apple by the ad touch publisher |
| Start Trial | Measure | Total count of Start Trial events |
| Total Count | Measure | Total count of rows |
| View Item | Measure | Total count of View Item events |

### Unified Activity and SKAdNetwork

| Field | Field Type | Description |
| --- | --- | --- |
| Ad Partner 3p | Dimension | The attributed ad partner via their Branch code (3p) |
| Ad Partner Name | Dimension | The attributed ad partner name |
| App Id | Dimension | The Branch App Id |
| App Name | Dimension | The Branch App Name |
| Attributed | Dimension | Indicates whether the conversion event was attributed or not |
| Campaign ID | Dimension | The attributed campaign ID |
| Campaign Name | Dimension | The attributed campaign name |
| Cost Default | Measure | The spend on the paid media campaign |
| Date | Dimension | Time-series date |
| Event Name | Dimension | The Branch event name |
| External Clicks | Measure | Total count of Clicks from integrated ad partners |
| External Impressions | Measure | Total count of Impressions from integrated ad partners |
| Feature | Dimension | Indicates the Branch feature |
| Non-SKAN Add To Cart Total Count | Measure | Total count of Add to Cart events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Add To Cart Unique Count | Measure | Total count of unique Add to Cart events. Add this to the 'SKAN revenue' to get de-duplicated total |
| Non-SKAN Add To Wishlist Total Count | Measure | Total count of Add to Wishlist events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Add To Wishlist Unique Count | Measure | Total count of unique Add to Wishlist events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Clicks | Measure | Total count of Clicks from Branch links. Add this to the 'SKAN revenue' to get de-duplicated total |
| Non-SKAN Complete Registration Total Count | Measure | Total count of Complete Registration events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Complete Registration Unique Count | Measure | Total count of unique Complete Registration events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Impressions | Measure | Total count of Impressions from Branch links. Add this to the 'SKAN revenue' to get de-duplicated total |
| Non-SKAN Initiate Purchase Total Count | Measure | Total count of Initiate Purchase events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Initiate Purchase Unique Count | Measure | Total count of unique Initiate Purchase events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Install Total Count | Measure | Total count of Install events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Install Unique Count | Measure | Total count of unique Install events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Login Total Count | Measure | Total count of Login events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Login Unique Count | Measure | Total count of unique Login events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Purchase Total Count | Measure | Total count of Purchase events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Purchase Unique Count | Measure | Total count of unique Purchase events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Reinstall Total Count | Measure | Total count of Reinstall events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Reinstall Unique Count | Measure | Total count of unique Reinstall events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Revenue | Measure | The tracked revenue from Branch commerce events. Add this to the 'SKAN revenue' to get de-duplicated total |
| Non-SKAN Search Total Count | Measure | Total count of Search events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Search Unique Count | Measure | Total count of unique Search events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Start Trial Total Count | Measure | Total count of Start Trial events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Start Trial Unique Count | Measure | Total count of unique Start Trial events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Total Count | Measure | The total count of rows. Add to SKAN total to get de-duplicated total |
| Non-SKAN Unique Clicks | Measure | Total count of unique Clicks from Branch links. Add this to the 'SKAN revenue' to get de-duplicated total |
| Non-SKAN Unique Count | Measure | Total unique count of rows. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN Unique Impressions | Measure | Total count of unique Impressions from Branch links. Add this to the 'SKAN revenue' to get de-duplicated total |
| Non-SKAN View Item Total Count | Measure | Total count of View Item events. Add this to the 'SKAN' total to get de-duplicated total |
| Non-SKAN View Item Unique Count | Measure | Total count of unique View Item events. Add this to the 'SKAN' total to get de-duplicated total. |
| Platform | Dimension | Indicates the Platform of the device as retrieved via the Branch SDK |
| SKAN Add To Cart Total Count | Measure | The total count of Add to Cart events. Add to non-SKAN to get the de-duplicated total |
| SKAN Add To Wishlist Total Count | Measure | The total count of Add to Wishlist events. Add to non-SKAN to get the de-duplicated total |
| SKAN Complete Registration Total Count | Measure | The total count of Complete Registration events. Add to non-SKAN to get the de-duplicated total |
| SKAN Initiate Purchase Total Count | Measure | The total count of Initiate Purchase events. Add to non-SKAN to get the de-duplicated total |
| SKAN Install Total Count | Measure | The total count of Install events. Add to non-SKAN to get the de-duplicated total |
| SKAN Login Total Count | Measure | The total count of Login events. Add to non-SKAN to get the de-duplicated total |
| SKAN Purchase Total Count | Measure | The total count of Purchase events. Add to non-SKAN to get the de-duplicated total |
| SKAN Reinstall Total Count | Measure | The total count of Reinstall events. Add to non-SKAN to get the de-duplicated total |
| SKAN Revenue | Measure | The tracked revenue from Branch commerce events. Add to non-SKAN Revenue to get total de-duplicated Revenue. |
| SKAN Search Total Count | Measure | The total count of Search events. Add to non-SKAN to get the de-duplicated total |
| SKAN Start Trial Total Count | Measure | The total count of Start Trial events. Add to non-SKAN to get the de-duplicated total |
| SKAN Total Count | Measure | The total count of rows. Add to non-SKAN to get the de-duplicated total |
| SKAN View Item Total Count | Measure | The total count of View Item events. Add to non-SKAN to get the de-duplicated total |
| Unified Add To Cart Total Count | Measure | Total count of Add to Cart events de-duplicated between SKAN and non-SKAN |
| Unified Add To Cart Unique Count | Measure | Total count of unique Add to Cart events de-duplicated between SKAN and non-SKAN |
| Unified Add To Wishlist Total Count | Measure | Total count of Add to Wishlist events de-duplicated between SKAN and non-SKAN |
| Unified Add To Wishlist Unique Count | Measure | Total count of unique Add to Wishlist events de-duplicated between SKAN and non-SKAN |
| Unified Complete Registration Total Count | Measure | Total count of Complete Registration events de-duplicated between SKAN and non-SKAN |
| Unified Complete Registration Unique Count | Measure | Total count of unique Complete Registration events de-duplicated between SKAN and non-SKAN |
| Unified Initiate Purchase Total Count | Measure | Total count of Initiate Purchase events de-duplicated between SKAN and non-SKAN |
| Unified Initiate Purchase Unique Count | Measure | Total count of unique Initiate Purchase events de-duplicated between SKAN and non-SKAN |
| Unified Install Total Count | Measure | Total count of Install events de-duplicated between SKAN and non-SKAN |
| Unified Install Unique Count | Measure | Total count of unique Install events de-duplicated between SKAN and non-SKAN |
| Unified Login Total Count | Measure | Total count of Login events de-duplicated between SKAN and non-SKAN |
| Unified Login Unique Count | Measure | Total count of unique Login events de-duplicated between SKAN and non-SKAN |
| Unified Purchase Total Count | Measure | Total count of Purchase events de-duplicated between SKAN and non-SKAN |
| Unified Purchase Unique Count | Measure | Total count of unique Purchase events de-duplicated between SKAN and non-SKAN |
| Unified Reinstall Total Count | Measure | Total count of Reinstall events de-duplicated between SKAN and non-SKAN |
| Unified Reinstall Unique Count | Measure | Total count of unique Reinstall events de-duplicated between SKAN and non-SKAN |
| Unified Revenue | Measure | The tracked revenue from Branch commerce events. De-duplicated total across SKAN and non-SKAN |
| Unified Search Total Count | Measure | Total count of Search events de-duplicated between SKAN and non-SKAN |
| Unified Search Unique Count | Measure | Total count of unique Search events de-duplicated between SKAN and non-SKAN |
| Unified Start Trial Total Count | Measure | Total count of Start Trial events de-duplicated between SKAN and non-SKAN |
| Unified Start Trial Unique Count | Measure | Total count of unique Start Trial events de-duplicated between SKAN and non-SKAN |
| Unified Total Count | Measure | The total count of rows de-duplicated between SKAN and non-SKAN |
| Unified Unique Count | Measure | Total unique count of rows de-duplicated between SKAN and non-SKAN |
| Unified View Item Total Count | Measure | Total count of View Item events de-duplicated between SKAN and non-SKAN |
| Unified View Item Unique Count | Measure | Total count of unique View Item events de-duplicated between SKAN and non-SKAN |

### Fraud

| Field | Field Type | Description |
| --- | --- | --- |
| Achieve Level | Measure | Total count of Achieve Level Branch Standard Events |
| Achieve Level Blocked | Measure | Total count of blocked Achieve Level events |
| Achieve Level Blocked Unique | Measure | Total unique count of blocked Achieve Level events |
| Achieve Level Unique | Measure | Total unique count of Achieve Level events |
| Ad Partner 3p | Dimension | The attributed ad partner via their Branch code (3p) |
| Ad Partner Name | Dimension | The attributed ad partner name |
| Ad Set Id | Dimension | The attributed ad set ID |
| Ad Set Name | Dimension | The attributed ad set name |
| Add Payment Info | Measure | Total count of Add Payment Info Branch Standard Events |
| Add Payment Info Blocked | Measure | Total count of blocked Add Payment Info events |
| Add Payment Info Blocked Unique | Measure | Total unique count of blocked Add Payment Info events |
| Add Payment Info Unique | Measure | Unique Count of Add Payment Info events |
| Add to Cart | Measure | Total count of Add to Cart Branch Standard Events |
| Add to Cart Blocked | Measure | Total count of blocked Add to Cart events |
| Add to Cart Blocked Unique | Measure | Total unique count of blocked Add to Cart events |
| Add to Cart Unique | Measure | Unique Count of Add to Cart events |
| Add to Wishlist | Measure | Total count of Add to Wishlist Branch Standard Events |
| Add to Wishlist Blocked | Measure | Total count of blocked Add to Wishlist events |
| Add to Wishlist Blocked Unique | Measure | Total unique count of blocked Add to Wishlist events |
| Add to Wishlist Unique | Measure | Total unique count of Add to Wishlist events |
| Agency Id | Dimension | The attributed agency ID |
| Agency Name | Dimension | The attributed agency name |
| App Id | Dimension | The Branch App Id |
| App Name | Dimension | The Branch App Name |
| Attributed | Dimension | Indicates whether Branch was able to attribute the conversion event |
| Branch Channel | Dimension | Identifies which Branch product or feature measured the attributed event |
| Campaign ID | Dimension | The attributed campaign ID |
| Campaign Name | Dimension | The attributed campaign name |
| Channel | Dimension | The attributed Channel |
| Click Ad | Measure | Total count of Click Ad Branch Standard Events |
| Click Ad Blocked | Measure | Total count of blocked Click Ad events |
| Click Ad Blocked Unique | Measure | Total unique count of blocked Click Ad events |
| Click Ad Unique | Measure | Total unique count of Click Ad events |
| Clicks | Measure | Count of clicks on links (non-blocked) |
| Clicks Blocked | Measure | Count of blocked clicks on links |
| Clicks Unique | Measure | Unique Count of Clicks |
| Commerce Event Blocked | Measure | Total count of all blocked commerce events |
| Complete Registration Blocked | Measure | Total count of blocked Complete Registration events |
| Complete Registration Blocked Unique | Measure | Total unique count of blocked Complete Registration events |
| Complete Registration Unique | Measure | Total unique count of Complete Registration events |
| Complete Stream | Measure | Total count of Complete Stream Branch Standard Events |
| Complete Stream Blocked | Measure | Total count of blocked Complete Stream events |
| Complete Stream Blocked Unique | Measure | Total unique count of blocked Complete Stream events |
| Complete Stream Unique | Measure | Total unique count of Complete Stream events |
| Complete Tutorial | Measure | Total count of Complete Tutorial Branch Standard Events |
| Complete Tutorial Blocked | Measure | Total count of blocked Complete Tutorial events |
| Complete Tutorial Blocked Unique | Measure | Total unique count of blocked Complete Tutorial events |
| Complete Tutorial Unique | Measure | Total unique count of Complete Tutorial events |
| Content Event Blocked | Measure | Total count of all blocked content events |
| Cost Default | Measure | The spend on the paid media campaign |
| Creative Id | Dimension | The attributed creative ID |
| Creative Name | Dimension | The attributed creative name |
| CTA View | Measure | Total count of CTA View Branch Standard Events (non-blocked) |
| CTA View Blocked | Measure | Total count of blocked CTA View events |
| CTA View Unique | Measure | Unique Count of CTA view events |
| Custom Event Blocked | Measure | Total count of all blocked custom events |
| Custom Event Template 0 | Measure | Template to set up count of your Branch Custom Event KPI |
| Custom Event Unique Template 0 | Measure | Template to set up unique count of your Branch Custom Event KPI |
| Datasource | Dimension | The data source for the event |
| Date | Dimension | Time-series date |
| Event Name | Dimension | The name of the Branch event |
| External Click Count | Measure | The count of clicks received from integrated advertising partners |
| External Impression Count | Measure | The count of impressions received from integrated advertising partners |
| Feature | Dimension | Indicates what Branch feature or link campaign was attributed |
| Fraud Bool Suspicious | Dimension | Indicates whether the event is marked as suspicious by fraud detection |
| Fraud Bool Suspicious Attribution | Dimension | Indicates whether the event's attribution is marked as suspicious by fraud detection |
| Fraud Codes | Dimension | Codes for fraud detection rules that flagged this event |
| Fraud Descriptions | Dimension | Descriptions of fraud detection rules that flagged this event |
| Fraud Names | Dimension | Names of fraud detection rules that flagged this event |
| Geo Country Code | Dimension | Two-letter global geo country code |
| Impressions | Measure | Total count of impressions on Branch impression links (non-blocked) |
| Impressions Blocked | Measure | Total count of blocked impressions |
| Impressions Unique | Measure | Total unique count of Impressions |
| Initiate Purchase | Measure | Total count of Initiate Purchase Branch Standard Events |
| Initiate Purchase Blocked | Measure | Total count of blocked Initiate Purchase events |
| Initiate Purchase Blocked Unique | Measure | Total unique count of blocked Initiate Purchase events |
| Initiate Purchase Unique | Measure | Total unique count of Initiate Purchase events |
| Initiate Stream | Measure | Total count of Initiate Stream Branch Standard Events |
| Initiate Stream Blocked | Measure | Total count of blocked Initiate Stream events |
| Initiate Stream Blocked Unique | Measure | Total unique count of blocked Initiate Stream events |
| Initiate Stream Unique | Measure | Total unique count of Initiate Stream events |
| Install | Measure | Total count of Install Branch Standard Events (non-blocked) |
| Install Blocked | Measure | Total count of blocked Install events |
| Install Unique | Measure | Total unique count of Install events |
| Invite | Measure | Total count of Invite Branch Standard Events |
| Invite Blocked | Measure | Total count of blocked Invite events |
| Invite Blocked Unique | Measure | Total unique count of blocked Invite events |
| Invite Unique | Measure | Total unique count of Invite events |
| Journeys Dismissal Unique | Measure | Total unique count of Journeys Dismissal events |
| Journeys Dismissed | Measure | Total count of Dismissed Branch Journey Banners |
| Journeys Dismissed Blocked | Measure | Total count of blocked Dismissed Branch Journey Banners |
| Keyword Id | Dimension | The attributed keyword ID |
| Keyword Name | Dimension | The attributed keyword name |
| Login | Measure | Total count of Login Branch Standard Events |
| Login Blocked | Measure | Total count of blocked Login events |
| Login Blocked Unique | Measure | Total unique count of blocked Login events |
| Login Unique | Measure | Total unique count of Login events |
| Open | Measure | Total count of Open Branch Standard Events (non-blocked) |
| Open Blocked | Measure | Total count of blocked Open events |
| Open Unique | Measure | Total unique count of Open events |
| Opt In | Measure | Total count of Opt In Branch Standard Events |
| Opt In Blocked | Measure | Total count of blocked Opt In events |
| Opt In Blocked Unique | Measure | Total unique count of blocked Opt In events |
| Opt In Unique | Measure | Total unique count of Opt In events |
| Opt Out | Measure | Total count of Opt Out Branch Standard Events |
| Opt Out Blocked | Measure | Total count of blocked Opt Out events |
| Opt Out Blocked Unique | Measure | Total unique count of blocked Opt Out events |
| Opt Out Unique | Measure | Total unique count of Add to Wishlist events |
| OS | Dimension | Indicates the Operating System of the device as retrieved via the Branch SDK |
| Pageview | Measure | Total count of Pageview Branch Standard Events (non-blocked) |
| Pageview Blocked | Measure | Total count of blocked Pageview events |
| Pageview Unique | Measure | Total unique count of Pageview events |
| Platform | Dimension | Indicates the Platform of the device as retrieved via the Branch SDK |
| Purchase | Measure | Total count of Purchase Branch Standard Events |
| Purchase Blocked | Measure | Total count of blocked Purchase events |
| Purchase Blocked Unique | Measure | Total unique count of blocked Purchase events |
| Purchase Unique | Measure | Total unique count of Purchase events |
| Rate | Measure | Total count of Rate Branch Standard Events |
| Rate Blocked | Measure | Total count of blocked Rate events |
| Rate Blocked Unique | Measure | Total unique count of blocked Rate events |
| Rate Unique | Measure | Total unique count of Rate events |
| Registration | Measure | Total count of Registration Branch Standard Events |
| Reinstall | Measure | Total count of Reinstall Branch Standard Events (non-blocked) |
| Reinstall Blocked | Measure | Total count of blocked Reinstall events |
| Reinstall Unique | Measure | Total unique count of Reinstall events |
| Reserve | Measure | Total count of Reserve Branch Standard Events |
| Reserve Blocked | Measure | Total count of blocked Reserve events |
| Reserve Blocked Unique | Measure | Total unique count of blocked Reserve events |
| Reserve Unique | Measure | Total unique count of Reserve events |
| Revenue | Measure | The tracked revenue from Branch commerce events |
| Search | Measure | Total count of Search Branch Standard Events |
| Search Blocked | Measure | Total count of blocked Search events |
| Search Blocked Unique | Measure | Total unique count of blocked Search events |
| Search Unique | Measure | Total unique count of Search events |
| Secondary Publisher | Dimension | The attributed secondary publisher |
| Share | Measure | Total count of Share Branch Standard Events |
| Share Blocked | Measure | Total count of blocked Share events |
| Share Blocked Unique | Measure | Total unique count of blocked Share events |
| Share Unique | Measure | Total unique count of Share events |
| Spend Credits | Measure | Total count of Spend Credits Branch Standard Events |
| Spend Credits Blocked | Measure | Total count of blocked Spend Credits events |
| Spend Credits Blocked Unique | Measure | Total unique count of blocked Spend Credits events |
| Spend Credits Unique | Measure | Total unique count of Spend Credits events |
| Start Trial | Measure | Total count of Start Trial Branch Standard Events |
| Start Trial Blocked | Measure | Total count of blocked Start Trial events |
| Start Trial Blocked Unique | Measure | Total unique count of blocked Start Trial events |
| Start Trial Unique | Measure | Total unique count of Start Trial events |
| Subscribe | Measure | Total count of Subscribe Branch Standard Events |
| Subscribe Blocked | Measure | Total count of blocked Subscribe events |
| Subscribe Blocked Unique | Measure | Total unique count of blocked Subscribe events |
| Subscribe Unique | Measure | Total unique count of Subscribe events |
| Total Count | Measure | The total count of rows |
| Touch Type | Dimension | Indicates whether the attributed event was an Impression, Click, or other touch type. |
| Uninstall | Measure | Total count of Uninstall Branch Standard Events |
| Uninstall Blocked | Measure | Total count of blocked Uninstall events |
| Uninstall Blocked Unique | Measure | Total unique count of blocked Uninstall events |
| Uninstall Unique | Measure | Total unique count of Uninstall events |
| Unique Count | Measure | The total unique user count of rows |
| Unlock Achievement | Measure | Total count of Unlock Achievement Branch Standard Events |
| Unlock Achievement Blocked | Measure | Total count of blocked Unlock Achievement events |
| Unlock Achievement Blocked Unique | Measure | Total unique count of blocked Unlock Achievement events |
| Unlock Achievement Unique | Measure | Total unique count of Unlock Achievement events |
| User Lifecycle Event Blocked | Measure | Total count of all blocked user lifecycle events |
| View Ad | Measure | Total count of View Ad Branch Standard Events |
| View Ad Blocked | Measure | Total count of blocked View Ad events |
| View Ad Blocked Unique | Measure | Total unique count of blocked View Ad events |
| View Ad Unique | Measure | Total unique count of View Ad events |
| View Cart | Measure | Total count of View Cart Branch Standard Events |
| View Cart Blocked | Measure | Total count of blocked View Cart events |
| View Cart Blocked Unique | Measure | Total unique count of blocked View Cart events |
| View Cart Unique | Measure | Total unique count of View Cart events |
| View Item | Measure | Total count of View Item Branch Standard Events |
| View Item Blocked | Measure | Total count of blocked View Item events |
| View Item Blocked Unique | Measure | Total unique count of blocked View Item events |
| View Item Unique | Measure | Total unique count of View Item events |
| View Items | Measure | Total count of View Items Branch Standard Events |
| View Items Blocked | Measure | Total count of blocked View Items events |
| View Items Blocked Unique | Measure | Total unique count of blocked View Items events |
| View Items Unique | Measure | Total unique count of View Items events |
| Web Session Start | Measure | Total count of Web Session Start Branch Standard Events (non-blocked) |
| Web Session Start Blocked | Measure | Total count of blocked Web Session Start events |
| Web Session Start Unique | Measure | Total unique count of Web Session Start events |

### Cohorts

| Field | Field Type | Description |
| --- | --- | --- |
| Achieve Level | Measure | Total count of Achieve Level Branch Standard Events |
| Achieve Level Unique | Measure | Total unique count of Achieve Level events |
| Ad Partner 3p | Dimension | The attributed install's ad partner via their Branch code (3p) |
| Ad Partner Name | Dimension | The attributed install's ad partner name |
| Ad Set Id | Dimension | The attributed install's ad set ID |
| Ad Set Name | Dimension | The attributed install's ad set name |
| Add Payment Info | Measure | Total count of Add Payment Info Branch Standard Events |
| Add Payment Info Unique | Measure | Unique Count of Add Payment Info events |
| Add to Cart | Measure | Total count of Add to Cart Branch Standard Events |
| Add to Cart Unique | Measure | Unique Count of Add to Cart events |
| Add to Wishlist | Measure | Total count of Add to Wishlist Branch Standard Events |
| Add to Wishlist Unique | Measure | Total unique count of Add to Wishlist events |
| Agency Id | Dimension | The attributed install's agency ID |
| Agency Name | Dimension | The attributed install's agency name |
| App Id | Dimension | The Branch App Id |
| App Name | Dimension | The Branch App Name |
| Attributed | Dimension | Indicates whether Branch was able to attribute the conversion event |
| Branch Channel | Dimension | Identifies which Branch product or feature measured the attributed event |
| Campaign ID | Dimension | The attributed install's campaign ID |
| Campaign Name | Dimension | The attributed install's campaign name |
| Channel | Dimension | The attributed install's Channel |
| Click Ad | Measure | Total count of Click Ad Branch Standard Events |
| Click Ad Unique | Measure | Total unique count of Click Ad events |
| Complete Registration Unique | Measure | Total unique count of Complete Registration events |
| Complete Stream | Measure | Total count of Complete Stream Branch Standard Events |
| Complete Stream Unique | Measure | Total unique count of Complete Stream events |
| Complete Tutorial | Measure | Total count of Complete Tutorial Branch Standard Events |
| Complete Tutorial Unique | Measure | Total unique count of Complete Tutorial events |
| Cost Default | Measure | The spend on the paid media campaign |
| Creative Id | Dimension | The attributed install's creative ID |
| Creative Name | Dimension | The attributed install's creative name |
| Custom Event Template 0 | Measure | Template to set up count of your Branch Custom Event KPI |
| Custom Event Unique Template 0 | Measure | Template to set up unique count of your Branch Custom Event KPI |
| Date | Dimension | Time-series date |
| Event Name | Dimension | The name of the Branch event |
| Feature | Dimension | Indicates what Branch feature or link campaign was attributed on the install |
| Geo Country Code | Dimension | Two-letter global geo country code |
| Initiate Purchase | Measure | Total count of Initiate Purchase Branch Standard Events |
| Initiate Purchase Unique | Measure | Total unique count of Initiate Purchase events |
| Initiate Stream | Measure | Total count of Initiate Stream Branch Standard Events |
| Initiate Stream Unique | Measure | Total unique count of Initiate Stream events |
| Install | Measure | Total count of Install Branch Standard Events |
| Install Unique | Measure | Total unique count of Install events |
| Invite | Measure | Total count of Invite Branch Standard Events |
| Invite Unique | Measure | Total unique count of Invite events |
| Keyword Id | Dimension | The attributed install's keyword ID |
| Keyword Name | Dimension | The attributed install's keyword name |
| Login | Measure | Total count of Login Branch Standard Events |
| Login Unique | Measure | Total unique count of Login events |
| Open | Measure | Total count of Open Branch Standard Events |
| Open Unique | Measure | Total unique count of Open events |
| Opt In | Measure | Total count of Opt In Branch Standard Events |
| Opt In Unique | Measure | Total unique count of Opt In events |
| Opt Out | Measure | Total count of Opt Out Branch Standard Events |
| Opt Out Unique | Measure | Total unique count of Opt Out events |
| OS | Dimension | Indicates the Operating System of the device as retrieved via the Branch SDK |
| Pageview | Measure | Total count of Pageview Branch Standard Events |
| Pageview Unique | Measure | Total unique count of Pageview events |
| Platform | Dimension | Indicates the Platform of the device as retrieved via the Branch SDK |
| Purchase | Measure | Total count of Purchase Branch Standard Events |
| Purchase Unique | Measure | Total unique count of Purchase events |
| Rate | Measure | Total count of Rate Branch Standard Events |
| Rate Unique | Measure | Total unique count of Rate events |
| Registration | Measure | Total count of Registration Branch Standard Events |
| Reinstall | Measure | Total count of Reinstall Branch Standard Events |
| Reinstall Unique | Measure | Total unique count of Reinstall events |
| Reserve | Measure | Total count of Reserve Branch Standard Events |
| Reserve Unique | Measure | Total unique count of Reserve events |
| Revenue | Measure | The tracked revenue from Branch commerce events |
| ROAS | Measure | Return on ad spend |
| ROI | Measure | Return on investment |
| Search | Measure | Total count of Search Branch Standard Events |
| Search Unique | Measure | Total unique count of Search events |
| Secondary Publisher | Dimension | The attributed install's secondary publisher |
| Share | Measure | Total count of Share Branch Standard Events |
| Share Unique | Measure | Total unique count of Share events |
| Spend Credits | Measure | Total count of Spend Credits Branch Standard Events |
| Spend Credits Unique | Measure | Total unique count of Spend Credits events |
| Start Trial | Measure | Total count of Start Trial Branch Standard Events |
| Start Trial Unique | Measure | Total unique count of Start Trial events |
| Subscribe | Measure | Total count of Subscribe Branch Standard Events |
| Subscribe Unique | Measure | Total unique count of Subscribe events |
| Total Count | Measure | The total count of rows |
| Touch Type | Dimension | Indicates whether the attributed install event was an Impression, Click, or other touch type. |
| Uninstall | Measure | Total count of Uninstall Branch Standard Events |
| Uninstall Unique | Measure | Total unique count of Uninstall events |
| Unique Count | Measure | The total unique user count of rows |
| Unlock Achievement | Measure | Total count of Unlock Achievement Branch Standard Events |
| Unlock Achievement Unique | Measure | Total unique count of Unlock Achievement events |
| Users | Measure | The unique count of users in the install cohort |
| View Ad | Measure | Total count of View Ad Branch Standard Events |
| View Ad Unique | Measure | Total unique count of View Ad events |
| View Cart | Measure | Total count of View Cart Branch Standard Events |
| View Cart Unique | Measure | Total unique count of View Cart events |
| View Item | Measure | Total count of View Item Branch Standard Events |
| View Item Unique | Measure | Total unique count of View Item events |
| View Items | Measure | Total count of View Items Branch Standard Events |
| View Items Unique | Measure | Total unique count of View Items events |
| Web Session Start | Measure | Total count of Web Session Start Branch Standard Events |
| Web Session Start Unique | Measure | Total unique count of Web Session Start events |

### Funnel

| Field | Field Type | Description |
| --- | --- | --- |
| Ad Set Id | Dimension | The attributed ad set ID |
| Ad Set Name | Dimension | The attributed ad set name |
| Advertising Partner Name | Dimension | The attributed advertising partner name |
| App Id | Dimension | The Branch App Id |
| Assist 1 | Dimension | The **second** touch attribution in the funnel path |
| Assist 2 | Dimension | The **first** touch attribution in the funnel path |
| Branch Channel | Dimension | Identifies which Branch product or feature measured the attributed event |
| Campaign ID | Dimension | The attributed campaign ID |
| Campaign Name | Dimension | The attributed campaign name |
| Channel | Dimension | The attributed channel |
| Compare Dimension | Dimension | The dimension used for Funnel comparison |
| Conversion Event | Dimension | The conversion event type in the Funnel path |
| Count | Measure | The total count of conversions |
| Date | Dimension | Time-series date |
| Feature | Dimension | Indicates what Branch feature or link campaign was attributed |
| Geo Country | Dimension | The geographic country name in English |
| Keyword | Dimension | The attributed keyword |
| Last Touch | Dimension | The last touch attribution in the funnel path |
| OS | Dimension | Indicates the Operating System of the device |

### Link Analytics

| Field | Field Type | Description |
| --- | --- | --- |
| Achieve Level | Measure | Total count of Achieve Level Branch Standard Events |
| Achieve Level Unique | Measure | Total unique count of Achieve Level events |
| Ad Partner 3p | Dimension | The attributed ad partner via their Branch code (3p) |
| Add Payment Info | Measure | Total count of Add Payment Info Branch Standard Events |
| Add Payment Info Unique | Measure | Unique count of Add Payment Info events |
| Add To Cart | Measure | Total count of Add to Cart Branch Standard Events |
| Add To Cart Unique | Measure | Unique count of Add to Cart events |
| Add To Wishlist | Measure | Total count of Add to Wishlist Branch Standard Events |
| Add To Wishlist Unique | Measure | Total unique count of Add to Wishlist events |
| App Id | Dimension | The Branch App Id |
| Attributed | Dimension | Indicates whether Branch was able to attribute the conversion event |
| Branch Channel | Dimension | Identifies which Branch product or feature measured the attributed event |
| Branch Cta View | Measure | Total count of CTA View Branch Standard Events |
| Branch Cta View Unique | Measure | Unique count of CTA View events |
| Branch Source | Dimension | The Branch source associated with the link |
| Browser | Dimension | The browser used during the link interaction |
| Campaign | Dimension | The attributed campaign name |
| Campaign Id | Dimension | The attributed campaign ID |
| Channel | Dimension | The attributed Channel |
| Click Ad | Measure | Total count of Click Ad Branch Standard Events |
| Click Ad Unique | Measure | Total unique count of Click Ad events |
| Clicks | Measure | Count of clicks on links |
| Clicks Unique | Measure | Unique count of clicks |
| Complete Registration | Measure | Total count of Complete Registration Branch Standard Events |
| Complete Registration Unique | Measure | Total unique count of Complete Registration events |
| Complete Stream | Measure | Total count of Complete Stream Branch Standard Events |
| Complete Stream Unique | Measure | Total unique count of Complete Stream events |
| Complete Tutorial | Measure | Total count of Complete Tutorial Branch Standard Events |
| Complete Tutorial Unique | Measure | Total unique count of Complete Tutorial events |
| Country | Dimension | The geographic country of the link interaction |
| Custom Event Template 0 | Measure | Template to set up count of your Branch Custom Event KPI |
| Custom Event Unique Template 0 | Measure | Template to set up unique count of your Branch Custom Event KPI |
| Date | Dimension | Time-series date |
| Domain | Dimension | The domain associated with the Branch link |
| Event Name | Dimension | The name of the Branch event |
| Feature | Dimension | Indicates what Branch feature or link campaign was attributed |
| Impression | Measure | Total count of impressions on Branch impression links |
| Impression Unique | Measure | Total unique count of impressions |
| Initiate Purchase | Measure | Total count of Initiate Purchase Branch Standard Events |
| Initiate Purchase Unique | Measure | Total unique count of Initiate Purchase events |
| Initiate Stream | Measure | Total count of Initiate Stream Branch Standard Events |
| Initiate Stream Unique | Measure | Total unique count of Initiate Stream events |
| Install | Measure | Total count of Install Branch Standard Events |
| Install Unique | Measure | Total unique count of Install events |
| Invite | Measure | Total count of Invite Branch Standard Events |
| Invite Unique | Measure | Total unique count of Invite events |
| Journeys Dismissal | Measure | Total count of Dismissed Branch Journey Banners |
| Journeys Dismissal Unique | Measure | Total unique count of Journeys Dismissal events |
| Link Id | Dimension | The unique identifier for the Branch link |
| Link Title | Dimension | The title assigned to the Branch link |
| Login | Measure | Total count of Login Branch Standard Events |
| Login Unique | Measure | Total unique count of Login events |
| Marketing Title | Dimension | Identifying title added to links |
| Open | Measure | Total count of Open Branch Standard Events |
| Open Unique | Measure | Total unique count of Open events |
| Opt In | Measure | Total count of Opt In Branch Standard Events |
| Opt In Unique | Measure | Total unique count of Opt In events |
| Opt Out | Measure | Total count of Opt Out Branch Standard Events |
| Opt Out Unique | Measure | Total unique count of Opt Out events |
| Os | Dimension | Indicates the Operating System of the device as retrieved via the Branch SDK |
| Pageview | Measure | Total count of Pageview Branch Standard Events |
| Pageview Unique | Measure | Total unique count of Pageview events |
| Platform | Dimension | Indicates the Platform of the device as retrieved via the Branch SDK |
| Purchase | Measure | Total count of Purchase Branch Standard Events |
| Purchase Unique | Measure | Total unique count of Purchase events |
| Rate | Measure | Total count of Rate Branch Standard Events |
| Rate Unique | Measure | Total unique count of Rate events |
| Reinstall | Measure | Total count of Reinstall Branch Standard Events |
| Reinstall Unique | Measure | Total unique count of Reinstall events |
| Reserve | Measure | Total count of Reserve Branch Standard Events |
| Reserve Unique | Measure | Total unique count of Reserve events |
| Search | Measure | Total count of Search Branch Standard Events |
| Search Unique | Measure | Total unique count of Search events |
| Share | Measure | Total count of Share Branch Standard Events |
| Share Unique | Measure | Total unique count of Share events |
| Spend Credits | Measure | Total count of Spend Credits Branch Standard Events |
| Spend Credits Unique | Measure | Total unique count of Spend Credits events |
| Start Trial | Measure | Total count of Start Trial Branch Standard Events |
| Start Trial Unique | Measure | Total unique count of Start Trial events |
| Subscribe | Measure | Total count of Subscribe Branch Standard Events |
| Subscribe Unique | Measure | Total unique count of Subscribe events |
| Tags | Dimension | User-generated tags on links |
| Uninstall | Measure | Total count of Uninstall Branch Standard Events |
| Uninstall Unique | Measure | Total unique count of Uninstall events |
| Unlock Achievement | Measure | Total count of Unlock Achievement Branch Standard Events |
| Unlock Achievement Unique | Measure | Total unique count of Unlock Achievement events |
| View Ad | Measure | Total count of View Ad Branch Standard Events |
| View Ad Unique | Measure | Total unique count of View Ad events |
| View Cart | Measure | Total count of View Cart Branch Standard Events |
| View Cart Unique | Measure | Total unique count of View Cart events |
| View Item | Measure | Total count of View Item Branch Standard Events |
| View Item Unique | Measure | Total unique count of View Item events |
| View Items | Measure | Total count of View Items Branch Standard Events |
| View Items Unique | Measure | Total unique count of View Items events |
| Web Session Start | Measure | Total count of Web Session Start Branch Standard Events |
| Web Session Start Unique | Measure | Total unique count of Web Session Start events |
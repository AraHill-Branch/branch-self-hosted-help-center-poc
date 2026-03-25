---
title: "Yahoo Ads"
slug: yahoo-ads
---

## Overview

*[Image: 220]*

Yahoo is a global media and tech company that reaches nearly 900 million people around the world, bringing them closer to finance, sports, shopping, gaming, and news—with the trusted products, content, and tech that fuel their day. For partners, we provide a full-stack platform for businesses to amplify growth and drive more meaningful connections across advertising, search, and media. To learn more, please visit [yahooinc.com](http://yahooinc.com).

#### Support Campaigns

- Native - Yahoo Preferred Network (YPN)
- Native - Open Exchange
- Display
- Video
- Connected TV
- Audio

## How does it work?

1. Branch connects with Yahoo for running app campaigns.
2. User sees an ad to download app.
3. User installs the app and converts.
4. Branch communicates with the ad network via API integration to see if they will claim attribution.

   - If Yahoo claims attribution, they will respond back to Branch with event details.
5. The Branch Dashboard will update reports for you to be able to compare and measure ad campaigns across platforms, ad set name, ad partner, etc.

## Enabling Yahoo Ads

#### 1. Navigate to [Partner Management](https://dashboard.branch.io/ads/partner-management) in the Branch Dashboard

#### 2. Scroll down or use the search box to look for **Yahoo**

#### 3. Insert your [Yahoo Pixel ID](https://help.yahooinc.com/dsp-api/docs/pixels) into the **Yahoo Pixel ID** field.

#### 4. Read and **Accept** the Terms of Service.

*[Image: 1288]*

#### 5. Configure your events under the [Events Config](https://dashboard.branch.io/ads/partner-management/a_yahoo_san?tab=events) tab.

Branch tracked events should automatically be mapped to the correct event names in Yahoo. Be sure to map custom events as well. Please follow the guide [here](track-branch-events.md) on tracking events with Branch.

#### 6. Save your settings.

It may take some time for Branch and Yahoo to start exchanging data. Please allow up to 48 hours for data to show in the Branch Dashboard and in Yahoo.

## Yahoo Mappings

### Yahoo Data Mapping

| Yahoo Attribution Tag | Branch Analytics Tag | Example Value |
| --- | --- | --- |
| n/a | $3p | a\_yahoo\_san |
| n/a | ~advertising\_partner\_name | Yahoo |
| engagement\_time | last\_attributed\_touch\_timestamp | 1455675372963 |
| campaign\_name | ~campaign | Light Bright Launch |
| campaign\_id | ~campaign\_id | 15292426 |
| adgroup\_name | ~ad\_set\_name | Example name |
| adgroup\_id | ~ad\_set\_id | 235465654654 |
| creative\_name | ~ad\_name & ~creative\_name | Creative name |
| creative\_id | ~ad\_id & ~creative\_id | 123456 |
| demand\_platform\_id | ~channel | 1 or 2  **Note**:   - 1: Native Ad Platform (O&O) - 2: Verizon Media DSP |
| campaign\_type | ~tags | App Install |
| network\_id | ~network | 456456 |
| site\_id | ~secondary\_publisher | dhjs8723tgajshd23a |
| event\_type | last\_attributed\_touch\_type | CLICK or IMPRESSION |

### Yahoo Event Mapping

| Branch Event | Yahoo Event | Event Category |
| --- | --- | --- |
| INSTALL | n/a - specific endpoint | n/a - specific endpoint |
| PURCHASE | Purchased | Purchase |
| INITIATE\_PURCHASE | InitiatedCheckout | Initiate Checkout |
| ADD\_TO\_CART | AddedToCart | Add to Cart |
| VIEW\_ITEM | ViewedContent | View Content |
| ADD\_PAYMENT\_INFO | AddedPaymentInfo | Add Payment Info |
| COMPLETE\_REGISTRATION | CompletedRegistration | Others |
| SEARCH | Searched | Others |
| ACHIEVE\_LEVEL | AchievedLevel | Others |
| OPEN, REINSTALL | ActivatedApp | Others |
| COMPLETE\_TUTORIAL | CompletedTutorial | Others |
| ADD\_TO\_WISHLIST | AddedToWishlist | Add To Wishlist |
| UNLOCK\_ACHIEVEMENT | UnlockedAchievement | Others |
| SHARE | n/a | Others |
| SPEND\_CREDITS | SpentCredits | Others |
| RATE | Rated | Others |
| SUBSCRIBE | SignUp | Sign Up |
| CUSTOM | Lead | Others |
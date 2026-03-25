---
title: "Self-Attributing Networks (SANs) Overview"
slug: self-attributing-networks-sans
---

## Overview

Self-Attributing Networks (SANs) are popular ad networks that Branch integrates with to support deep linking and attribution for your mobile apps. Through these robust integrations, you can gain insight into ad conversions across every device and platform to understand true campaign ROI. Every SAN will integrate differently with Branch as the mobile measurement partner (MMP) and will vary in campaign, attribution, deep linking, and deferred deep linking (DDL) support.

**Supported SANs:**

- [Google](google-ads.md)
- [Google Marketing Platform](google-marketing-platform.md)
- [Facebook/Meta](facebook-ads-overview.md)
- [Apple Ads](apple-search-ads.md)
- [Snap](snap.md)
- [Twitter](twitter-ads.md)
- [TikTok For Business](tiktok-for-business.md)
- [Yahoo](yahoo-ads.md)
- [Amazon](amazon-san.md)
- [LG Ad Solutions](lg-ad-solutions.md)
- [Roku](roku.md)

For additional details, view our guide on [What is a Self-Attribution Network?](what-is-a-self-attributing-network.md).

## SAN Ad Campaigns Support

### Google

| Campaign Type | Attribution Type | Deep Linking Support | Branch Link Support |
| --- | --- | --- | --- |
| App Installs (UAC) | via MMP API | - SAN DDL | n/a |
| App Engagement (UACe) | via MMP API | - Native Universal Links - Native App Links - Native URI Scheme | n/a |
| Display | via Branch Link | - Native Universal Links - Native App Links - SAN DDL | Display Ad Link |
| Search | via Branch Link | - Native Universal Links - Native App Links - SAN DDL | Search Ad Link |
| Discovery | via Branch Link | - Native Universal Links - Native App Links - SAN DDL | Display Ad Link |
| Video | via Branch Link | - Native Universal Links - Native App Links - SAN DDL | Display Ad Link |
| Shopping | via Branch Link | - Native Universal Links - Native App Links - SAN DDL | Display Ad Link |
| Performance Max | via MMP API or Branch link | - Native Universal Links - Native App Links | Display Ad Link |

### Facebook

| Campaign Type | Purpose | Attribution Type | Deep Linking Support | Branch Link Support |
| --- | --- | --- | --- | --- |
| App Conversion | Conversion | via MMP API | - Universal Links - App Links | Based on Adset Traffic:   - App - App Install Ad Link - Web - Display Ad Link |
| App Installs | Consideration | via MMP API | - [via Facebook SDK](https://developers.facebook.com/docs/app-ads/deep-linking/) | App Install Ad Link |
| Brand Awareness | Awareness | via Branch Link | - Branch Ad Links - Universal Links - App Links | Display Ad Link |
| Reach | Awareness | via Branch Link | - Branch Ad Links - Universal Links - App Links | Display Ad Link |
| Traffic | Consideration | via Branch Link | - Branch Ad Links - Universal Links - App Links | Display Ad Link |
| Video View | Consideration | via Branch Link | - Branch Ad Links - Universal Links - App Links | Display Ad Link |

### Apple Ads

| Campaign Type | Attribution Type | Deep Linking Support | Branch Link Support |
| --- | --- | --- | --- |
| Search Results | via MMP API | Using Campaign Name in Old Framework only | n/a |
| Search Tab | via MMP API | Using Campaign Name in Old Framework only | n/a |

### Snap

| Campaign Type | Objective | Attribution Type | Deep Linking Support | Branch Link Support |
| --- | --- | --- | --- | --- |
| App Install | Consideration | via MMP API | n/a | n/a |
| Awareness | Awareness | via MMP API | - Universal Links - App Links | App Install Ad Link |
| Drive Traffic to Website | Consideration | via Branch Link | n/a | Display Ad Link (web-only) |
| Drive Traffic to App | Consideration | via Branch Link | - Universal Links - App Links | Display Ad Link |
| Engagement | Consideration | via MMP API | n/a | n/a |
| Video Views | Consideration | via MMP API | - Universal Links - App Links | Display Ad Link (web-only) |
| App Conversion | Conversions | via MMP API | - Universal Links - App Links | Display Ad Link |
| Website Conversion | Conversions | via Branch Link | n/a | Display Ad Link (web-only) |

### Twitter

| Campaign Type | Purpose | Attribution Type | Deep Linking Support | Branch Link Support |
| --- | --- | --- | --- | --- |
| App Re-engagement | Conversions | via MMP API | via Branch Link | App Install Ad Link |
| App Installs | Consideration | via MMP API | via Branch Link | App Install Ad Link |
| Pre-roll Views | Consideration | via Branch Link | via Branch Link | Display Ad Link |
| Followers | Consideration | via Branch Link | via Branch Link | Display Ad Link |
| Engagements | Consideration | via Branch Link | via Branch Link | Display Ad Link |
| Website Clicks | Consideration | via Branch Link | via Branch Link | Display Ad Link |
| Video Views | Consideration | via Branch Link | via Branch Link | Display Ad Link |
| Reach | Awareness | via Branch Link | via Branch Link | Display Ad Link |

## SAN-Supported Analytics Parameters

| Branch Parameter | Facebook | Google | Google Marketing Platform | Apple Ads | Snap | Twitter | TikTok |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Branch-Specified** | | | | | | | |
| ~advertising\_partner\_name | "Facebook" | "Google AdWords" | "Google Marketing Platform" | "Apple Ads" | "Snapchat" | "Twitter" | “TikTok SAN” |
| ~feature | "paid advertising" | | | | | | |
| **Mapped to SAN Data Fields** | | | | | | | |
| ~channel | "Facebook" if null or last touch | network\_type | product\_type | Apple App Store | ✘ | tpn\_attribution | TikTok SAN |
| ~campaign\_id | campaign\_group\_id | campaign\_id | ✘ | iad-campaign-id | campaign\_id | campaign\_id | campaign\_id |
| ~campaign | campaign\_name | campaign\_name | ✘ | ✘ | campaign\_name | campaign\_name | campaign\_name |
| ~tags | ✘ | campaign\_type | ✘ | ✘ | ✘ | ✘ | ✘ |
| ~secondary\_publisher | publisher\_platform | network\_subtype | placement\_id | ✘ | ✘ | ✘ | ✘ |
| ~ad\_id | ad\_id | creative\_id | line\_item\_id | ✘ | ad\_id | ✘ | ad\_id |
| ~ad\_name | ad\_name | ✘ | line\_item\_name | ✘ | ad\_name | ✘ | ad\_name |
| ~ad\_format | ✘ | ad\_type | ✘ | ✘ | ✘ | ✘ | ✘ |
| ~ad\_set\_id | ad\_set\_id | ad\_group\_id | ✘ | iad-adgroup-id | ad\_squad\_id | ✘ | ✘ |
| ~ad\_set\_name | ~ad\_set\_name | ✘ | ✘ | iad-adgroup-name | ad\_squad\_name | ✘ | ✘ |
| ~creative\_id | creative\_id | ✘ | creative\_id | ✘ | ✘ | ✘ | ✘ |
| ~creative\_name | creative\_name | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| ~keyword | ✘ | keyword | ✘ | iad-keyword | ✘ | ✘ | ✘ |
| ~placement | ✘ | ✘ | placement\_name | ✘ | ✘ | ✘ | placement |
| last\_attributed\_touch\_timestamp | ✘ | ✘ | ✘ | ✘ | ✘ | engagement\_time | ✘ |
| last\_touch\_type | ✘ | ✘ | ✘ | ✘ | ✘ | engagement\_type | engagement\_type |
| ~user\_data\_geo\_country\_code | ✘ | ✘ | ✘ | ✘ | ✘ | country\_code | ✘ |
---
title: "Manage Fraud Rules"
slug: fraud-rules
---

## Overview

Branch recommends creating fraud rules to block erroneous attribution credit in real-time. While Branch still performs last-click attribution, it will not send the ad network a postback when the attribution is flagged as fraudulent.



This has two benefits:

- You can see how many fraudulent events come from each ad partner and sub-publisher.
- You do not have to try to recoup losses from the ad network, because the payout never happened in the first place.

Blocked events are also separated from normal traffic in your Branch dashboard, so you can see all events in one place (the fraud dashboard), while healthy analytics are not distorted by bad traffic.

But not to worry, blocked events are still deep linked, so blocking would not affect the user experience of a real user.

::: tip In-Depth Fraud & Recommendations
Because Fraud Detection is very complex, visit our guide on understanding fraud and recommendations [here](in-depth-fraud-recommendations.md).
:::

## Prerequisites

In order to enable Fraud Rules, you need to have completed the following:

1. Created a [Branch Dashboard](https://dashboard.branch.io/).
2. Enabled Ads for your Branch account.

   - Contact your Branch account manager or visit <https://branch.io/pricing>
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Have sufficient [access/permissions](add-manage-users-roles-permissions-access.md) rights for your Branch app.

   - Creating, enabling, or disabling requires **Edit** access to the **Fraud Settings & Data** permission.
   - Viewing rules require **View** access to to the **Fraud Settings & Data** permission.

## Universal Rules

Universal rules block events that violate Branch's universal fraud criteria and are enabled for all Branch accounts.



::: info Universal Rules Permanently Enabled
Since Branch's Universal Rules cover the most basic and necessary protection against fraud, you cannot disable these rules.
:::

### Suspicious IP

Branch automatically blocks events coming from TOR networks and obviously suspicious IPs.

**Fraud Name - IP**

### Suspicious Persona

This is based on Branch’s cross-platform link graph. We use proprietary algorithms to dynamically block attributions on browsers and devices showing suspicious behavior.

**Fraud Name - PERSONA\_FRAUD**

## Standard Rules

::: info Recommendation
While Standard Rules aren't enabled by default, Branch recommend enabling the following:

- Click Injection
- Conversion Time
:::

Standard rules block events based on the most common fraud patterns. These are available to all Branch customers but are not activated by default. We highly encourage all customers to enable Standard Fraud Rules as soon as possible.



Standard rules can generally be used to block the following events, though specific rules might be more restrictive:

- All Events
- Clicks
- Installs
- Opens
- Web Session Starts
- Reinstalls
- Commerce Event
- Custom Event

Standard Fraud Rules can also be filtered so that they only apply to a specific subset of your traffic. For example, you might want to set up separate Conversion Time rules for iOS and Android, a Geo Conflict rule that applies only to specific campaigns, or a Device Conflict rule that only applies to certain especially-risky countries. All of this (and much more) is possible with filters.

The following filters are generally available, though again specific rules might be more restrictive. If they are, this is specifically called out in the individual rule's section below.

- Ad Name
- Ad Partner
- Ad Partner (3p)
- Ad ID
- Ad Set ID
- Ad Set Name
- Agency ID
- Agency Name
- Brand
- Campaign
- Campaign ID
- Channel
- Creative Name
- Country
- Customer Ad Name
- Customer Ad Set Name
- Customer Campaign
- Customer Event Alias
- Customer Keyword
- Customer Placement
- Customer Secondary Publisher
- Customer Sub Site Name
- Device Type
- Environment
- Feature
- First Event For User
- Geo Country Name
- Geo DMA Code
- Keyword
- Last Attributed Touch ID
- Last Attributed Touch Type
- Model
- Name
- Operating System
- Placement
- Platform
- Reengagement Activity Attributed
- Region
- Secondary Publisher
- Stage
- Sub Site Name
- Tags
- Custom

### Click Injection

When a malicious app or SDK on a user's Android device tries to insert a fake ad click between when a legitimate app is downloaded and when it is first opened (thus taking unearned credit for that install).

**Fraud Name:** CLICK\_INJECTION  
**Events:** The Click Injection rule can **only** be used to block INSTALL events.  
**Filters:** All filters are available for the Click Injection rule.  
**Notes:** The Click Injection rule only works for Android devices because it relies on the secondsFromLastAttributedTouchToStoreInstallBegin field (which is only available for installs via Google Play).

Based on Branch's internal studies, we recommend setting the range for blocking to -126 to -6 seconds (the defaults for this rule). Every app is different, however, and the optimal values for your app may be different from these. When in doubt the defaults are a good starting point - but discuss with your team or your Branch CSM to be extra sure.

### Geo Conflict

The click and the install occur in different countries, as inferred from their respective IP addresses. This can occasionally happen with real users, but much more often indicates that the click or install was simulated.

**Fraud Name:** GEO\_CONFLICT  
**Events:** The Geo Conflict rule can block any event.  
**Filters:** Only the following filters are available for the Geo Conflict rule:

- Country: Country as inferred from OS preference.
- Geo Country Code: Country as inferred from IP address.

**Notes:** If you do business in a region of the world where there are many countries close together there is more risk of false positives from this rule. For example, a user on the border of France and Germany might legitimately click in one country and convert in the other, especially if you use Geo Country Code (which is based on IP). If this applies to your business, consider adding additional filters or disabling this rule entirely. Start by analyzing your traffic - if you work with a Branch CSM, consider discussing this with them.

### Conversion Time

Very short click-to-install times are suspicious - this is typically caused by faked clicks taking attribution credit for real installs. We recommend blocking CTI times below 30 seconds, but you can configure it to be up to 60 seconds. On the Branch Fraud Dashboard, you can see CTI time distribution by ad partner to determine if this threshold seems to be working.

**Fraud Name:** CONVERSION\_TIME  
**Events:** The Conversion Time rule can block any event.  
**Filters:** All filters are available for the Conversion Time rule.

### Device Conflict

The device information on the click and the install are different. A real user clicks and installs on the same device, so this is highly suspicious.

**Fraud Name:** DEVICE\_CONFLICT  
**Events:** The Device Conflict rule can block any event.  
**Filters:** Only the following filters are available for the Device Conflict rule:

- Brand
- Model
- OS

## Custom Rules

Custom rules block events based on any attribute(s) that Branch stores at the event level.



Custom rules can be used to block the following events:

- All Events
- Clicks
- Installs
- Opens
- Web Session Starts
- Reinstalls
- Commerce Event
- Custom Event

### Event-level Characteristics

We can block on any attribute stored at the event level.

**Fraud Name:** CUSTOM

Example:

- **Device Pattern:** For example, “OS + Country + Model”. It’s common for device farms to use the same devices over and over, making it easy to pick out specific device characteristics to block.

::: info Fraud Rules Consisting only of NOT clauses
If your fraud rule consists **only** of NOT clauses (like NOT userData.geoCountryCode:"US" AND NOT userData.os:"ANDROID") please add at least one positive constraint, such as "AND Name Exists" as well.
:::

The following filters are available:

- Ad Name
- Ad Partner
- Ad Partner (3p)
- Ad ID
- Ad Set ID
- Ad Set Name
- Agency ID
- Agency Name
- Brand
- Campaign
- Campaign ID
- Channel
- Creative Name
- Country
- Customer Ad Name
- Customer Ad Set Name
- Customer Campaign
- Customer Event Alias
- Customer Keyword
- Customer Placement
- Customer Secondary Publisher
- Customer Sub Site Name
- Device Type
- Environment
- Feature
- First Event For User
- Geo Country Name
- Geo DMA Code
- Keyword
- Last Attributed Touch ID
- Last Attributed Touch Type
- Model
- Name
- Operating System
- Placement
- Platform
- Reengagement Activity Attributed
- Region
- Secondary Publisher
- Stage
- Sub Site Name
- Tags
- Custom

## Once Ever Rules

Once Ever Rules cap events that should only occur once per user.

For example, perhaps it should only be possible for a given user to register once, but fraudsters are sending many fake registration events per user in the hopes of getting paid out for those conversions. A Once Ever Rule on the Registration event will prevent this.



Once Ever rules can be used to block the following events:

- Installs
- Opens
- Purchases
- Complete Registrations

**Fraud Name:** ONCE*EVER\_CAPPED*\_

## Threshold Rules

::: info Recommendation
Branch recommends enabling the following thresholds:

- Low Conversion Rate (CTI) Android
- Low Conversion Rate (CTI) iOS
:::

Threshold Rules block events for a group when it violates a threshold.



Threshold rules can be used to block the following events:

- All Events
- Clicks
- Installs
- Opens
- Web Session Starts
- Reinstalls
- Commerce Event
- Custom Event

::: tip Threshold Logic
Threshold rules require the following inputs:

- Minimum number of events you want to allow before rule is applied.

  - Example: "Only apply the threshold rule to sub-publishers driving at least 30 installs." This ensures that results are more statistically-significant.
- Ratio of fraudulent indications to overall number of events before the rule is applied.

  - Example: "Block sub-publishers with a conversion rate from click to install of less than 0.1%."

The threshold must be met across a 24hr period for it to be applied.

Once the threshold has been met, the rule will be applied to all subsequent events by that sub-publisher for the following **14 days**.
:::

### Low Conversion Rate (CTI) Android

The ratio of clicks to installs by sub publisher is suspiciously low for Android.

### Low Conversion Rate (CTI) iOS

The ratio of clicks to installs by sub publisher is suspiciously low for iOS.

### Young Persona Rate High

The ratio of installs coming from young personas to the total installs by sub-publisher is high. This is an indicator that an unusually high percentage of the Installs that sub-publisher is driving are devices Branch has never seen before.

::: info Adding New Threshold Rules
New types of threshold rules will be added over time. If you need a specific threshold rule for your business, please contact [Support](submit-a-ticket.md) to request a new type of threshold rule to be built.
:::

## Helpful Tips

#### Exempting Partners

If you want to exempt a partner (ex. Facebook or Google Adwords) from a Standard or Custom fraud rule, you can add a filter for Ad Partner (3p), change the "equals" to "does not equal" and then add the partner's 3P value (ex. `a_google_adwords`, `a_facebook`) in the final box then click **Save**.

You can find the Ad Partner's 3p value in the partner settings of the [Partner Management page](https://dashboard.branch.io/ads/partner-management).

Once a partner is exempted from the rule, they will not be flagged for that rule moving forward from when you made the change. Fraud rules are not retroactive so historical data will not be updated.


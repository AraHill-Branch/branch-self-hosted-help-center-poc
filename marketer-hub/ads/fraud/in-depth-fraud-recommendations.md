---
title: "In-Depth Fraud & Recommendations"
slug: in-depth-fraud-recommendations
---

## Overview

Branch covers the following Attribution Fraud types: Attribution Hijacking and Fake activity.  
 Attribution Hijacking could be mainly due to Click Spamming or Click Injection. With this guide, we'll dive deep into the different fraud rules and recommendations when enabling rules.

## Click Spamming

Click spamming is a very common tactic that some publishers/sub-publishers like to employ. The purpose behind click spamming is to steal attribution from traffic that would otherwise be attributed as *"Organic"*.

There are some telltale patterns you can look for to see which publishers/sub-publishers are click spamming:

- An abnormally high number of clicks in comparison to other partners running traffic on the app.
- A timing pattern that looks more like "ad views" than actual clicks. Longer than expected click to install time. The majority of click spamming installs occur after 3 hours.
- Partner rotating sub-publishers regularly and using thousands to hundreds of thousands of sub-publisher groupings.

#### Protection Against Click Spamming

There are some strategies to protect your app from click spamming attacks:

| Strategy | Details/Recommendations |
| --- | --- |
| Identify the normal click-to-conversion rate for your app | If a sub-publisher source is sending **more than 10X clicks** to maintain a similar number of conversions, this is often an indicator that the timing relationship between the click and conversion is also unnatural and there is attribution hijacking by the source (ad partner/sub-publisher). |
| Monitor your daily click volumes | Campaigns with **more than 1,000,000 clicks per day** should be scrutinized. The 1,000,000 clicks/day mark crosses over to where we commonly see unnatural timing relationships between the clicks and conversion, indicating that these clicks are not truly driving incremental conversions. |
| Let your partners know that you want them to use limited sub-publisher groupings | Networks using **fewer than 200 sub-publisher groupings** and using a **consistent core of performing sources** allows for more granular, specific recommendations to be made by Branch. For these cases, Branch can recommend the portion of sources underperforming that is still statistically relevant. Networks cycling a majority of sources daily will be measured at the network/app level. |

### Recommendation

Block installs if the click-to-install threshold is not met. In the Fraud Manager, Activate the Low Conversion CTI Android and Low Conversion CTI iOS threshold rules.

- Create a Threshold Rule and select either **Low Conversion Rate (CTI) - Android** or **Low Conversion Rate (CTI) - iOS**
- Fill in the metrics.

  - **We recommend a minimum of 10,000 clicks and a threshold ratio of .0009 (which is .09%), however, you can make the rule more or less strict based on your app's needs.**



More details on enabling these rules can be found [here](fraud-rules.md).

Click spamming goes hand in hand with Click Injection. Oftentimes, both of these fraud methods are done by fraudsters in an attempt to hide click spamming patterns and it is one of the reasons that higher CTI is not a valid reason (or excuse) to allow click spamming to continue. Please keep in mind that click injection occurs on Android due to the allowance of listeners which is not permitted on iOS.

## Click Injection

The main indicator for click injection is a negative click to store install lag time. The best defense against Click Injection is enabling the **Click Injection Fraud Rule**.

### Recommendation

- Create a Standard Rule of Click Injection
- Blocks installs
- Click on the Toggle on the left and then Save to enable the rule with default settings.

  - We recommend setting the range for blocking to -126 to -6 seconds



::: tip Click Injection Defaults
Note: The defaults for the Click Injection time rule are based on Branch's internal studies. Every app is different, however, and the optimal values for your app may be different from these. When in doubt the defaults are a good starting point - but discuss with your team or your Branch Account Manager to be extra sure.
:::

More details on enabling these rules can be found [here](fraud-rules.md).

## Once Ever Rules

Once Ever Rules are not exactly *fraud rules*. Moreover, they are a way to ensure that we will only record an event once. Installs, by definition, are unique and will only be counted once per device per app, but events are a little different and can be counted multiple times. That said, there are often times when you may only want an event to be counted once, like Registration or First Purchase. In these instances, it is a good idea to set up a once ever rule in the Fraud Manager of the Branch Dashboard. If a Once Ever rule is enabled on your app for a specific event, like First Purchase, we will only record a First Purchase if it is the first event of its kind and all others will be blocked.

### Recommendation

- Create a Once Ever Rule
- Block an event you want

Note: The rule will only affect events moving forward from when you have implemented the rule and historical data will not be affected.



More details on enabling these rules can be found [here](fraud-rules.md).

## Fake Installs/Events

Branch’s Fraud Protection solution covers the following fake activity:

- SDK Spoofing
- Device Reset Fraud
- Device/Click Farms

Fake installs and events are a real problem that many apps face. In this type of fraud, sub-publishers will send in installs and events that are either from fake devices or emulators and attempt to pass the devices off as actual, real devices. Branch's solution to this type of fraud is to combat it from multiple angles. We take this approach because fraudsters rarely only ever attempt only one type of fraud. We have the following rules available on Branch Dashboard to combat fake activity: Suspicious Conversion Time, Geo Conflict, Device Conflict, Suspicious Device, and Young Persona/Device ID Reset Rule.

### Recommendation

#### Suspicious Device Rule

The Suspicious Device Standard Fraud Rule works to identify devices that are fake or emulated which was created using fraud analysis across hundreds of apps that identified patterns that are prevalent in fake or emulated devices that are not frequent in real devices.

If you are interested in having this rule applied to your app, please reach out to your Branch Account Manager for eligibility requirements, and they can request the rule be added on the backend by engineering.

#### Suspicious Conversion Time

You can enable the Suspicious Conversion Time rule under the Standard Rule Card in the Fraud Manager. An easy way to see the analytics for a specific rule is to click the "See Analytics" button located at the bottom of the Suspicious Conversion Time Rule card.

- Create a Conversion Time Standard Rule
- Block all or specific events
- We recommend blocking CTI times below 10 seconds, but you can configure the rule to block up to 60 seconds.



#### Suspicious Device Reset (Android)

This rule is for Android only and looks for patterns that have abnormally high rates of new devices. The rule will be enabled by default once created. This rule cannot be modified from the UI. If modifications are needed please reach out to Support and we can work with you to modify the rule.

- Create a Standard Rule
- Select Young Persona Rate High - Android
- Select all or specific events
- We recommend to input 1000 events and .9 ratio



The Suspicious Device Rule, in addition to the Low Conversion Rate - Android, Low Conversion Rate - IOS, Suspicious Conversion Time, and Suspicious Device Reset - Android rules mentioned above, will offer your app the best protection from fraudsters who are attempting to inundate your app with fake traffic.

## Geo Conflict

Geo Conflict is a Standard Rule in Branch’s Fraud Manager. This rule will block an install or event where the country of that conversion differs from the country where the click occurred. For example, if the click occurred in Canada but the install or event occurred in Bermuda, the conversion will be marked as suspicious and blocked.

Setting up this rule for installs and events is recommended but there are some nuances to the set up. The rule is automatically added to your Branch Fraud Manager under the Standard Rules card and is set up for Installs only. You only need to turn the toggle to green in order to enable it.

### Recommendation

- Create a Standard Rule for Geo Conflict type
- Select all or specific events. You can choose from user\_lifecycle\_event (i.e. registration and similar events), custom\_event (any custom events you have set up), content\_event (i.e. view\_item, search), and commerce\_event (i.e. purchase, first purchase).
- Either `country` and/or `geo country code` for specifying the conflict



Once saved, you will see two Geo Conflict rules under the Standard Rules card in the Fraud Manager. One will be for installs and the other will be for the specified event type.

## Device Conflict

The Device Conflict rule is located under the Standard Rule card in the Fraud Manager. This rule will block conversions where the device information on the click and the install are different.

As a standard rule, Device Conflict is added automatically to your Branch Fraud Manager in a disabled state. You can enable the rule by using the toggle located on the right-hand side of the card.  
 This rule is customizable by OS (i.e. iOS, Android) , Brand (i.e. Samsung, Xiaomi, etc.) , and Model (i.e. Galaxy 10, 12 Pro, etc.) or you can choose to use all three. Depending on the filters you have chosen, if there is a difference between the device on click and conversion, the conversion will be flagged as suspicious and then blocked.

### Recommendation

- Create a Standard Rule
- Select Device Conflict
- Select `os`, `model`, or `brand` for the rule.



## Best Practices

#### Limited Partner Permissions

It is a best practice not to allow partners access to secret or sensitive data in the Branch dashboard. It is a good idea to periodically go through your partner's permissions and ensure that the permissions set are still accurate and allow only for the data you would like to share with your partners.

#### Sub-Publisher

If a sub-publisher has been flagged for fraudulent activity in high amounts (over 15%), reach out to your partner and have a conversation with them about that sub-publisher. If fraud totals are over 20% it is recommended that you advise your partner that you do not wish that sub-publisher to continue running traffic to your app. Partners want to drive high-quality traffic to your app, and they may need your input to do that effectively.

#### Click, Install, and Event Totals

There are many legitimate reasons that your app may see a large increase in clicks, installs, and events (i.e. increased spending or a special sale) but absent these, you should not have any surprises. If you do see an increase in clicks, installs, or spending, it is best practice to investigate them. When in doubt, reach out to your Branch Account Manager for help!
---
title: "Answering the Google Play Store Privacy Questions"
slug: answering-the-google-play-store-privacy-questions
---



::: info New Safety Section Timeline
Google has informed developers that all Google Play Store submissions with the new safety section information, **must be approved by April 2022**.

We encourage you to submit your information early so you can get review feedback and make any necessary changes before you are no longer able to make new app updates.
:::

## Overview

As part of the [Google Play Store Developer submission process](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en#what_users_will_see&timeline&collection&sharing&collection_handling&families&independent_security_review&types&data_purposes&understand_format&export_to&import_from&SDK_format&zippy=%2Cdata-collection%2Cwhat-users-will-see%2Ctimeline-information%2Cdata-sharing%2Cdata-handling%2Cother-app-and-data-disclosures%2Ccommitted-to-follow-the-families-policy-available-soon-to-applicable-apps%2Cindependent-security-review-optional-feature-available-soon%2Cdata-types%2Cpurposes%2Cunderstand-the-csv-format%2Cexport-to-a-csv-file%2Cimport-from-a-csv-file%2Coptional-format-for-sdks), developers are required to fill out Google’s updated Data Safety section in the Google Play Console. When completing the Safety Section portion of your developer application, you are required to provide information about your app’s data collection and privacy practices, including the practices of third-party partners like Branch whose SDK code you integrate into your app.

After February 2022, “No information available” will be shown by Google in the Data Safety section for apps that have not submitted information in the Google Play Console for review and for apps that have submitted information but the submission was rejected.

Without an approval in the Data Safety section, your new app submission or app update may be rejected.

## Answering the Google Play Store Safety Section Questions

You must select answers from the options presented in Google Play Store. Please keep in mind:

- Branch’s SDKs are fully configurable by you, both in the data we collect on your behalf and how you use that data. Accordingly, you should identify all possible data collections and uses, even if not outlined here or even if certain data will be collected and used only in limited situations.
- Your answers should follow the [Google Play Store Safety Section Review Guidelines](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en#what_users_will_see&timeline&collection&sharing&collection_handling&families&independent_security_review&types&data_purposes&understand_format&export_to&import_from&SDK_format&zippy=%2Cdata-collection%2Cwhat-users-will-see%2Ctimeline-information%2Cdata-sharing%2Cdata-handling%2Cother-app-and-data-disclosures%2Ccommitted-to-follow-the-families-policy-available-soon-to-applicable-apps%2Cindependent-security-review-optional-feature-available-soon%2Cdata-types%2Cpurposes%2Cunderstand-the-csv-format%2Cexport-to-a-csv-file%2Cimport-from-a-csv-file%2Coptional-format-for-sdks) and any applicable laws.
- We encourage you to consult with your legal counsel if you have questions about compliance with applicable laws or how your use of Branch implicates applicable laws.
- You are solely responsible for keeping your responses accurate and up to date. If your practices change, update your responses in Google Play Store.

## What You Need To Disclose

- Any of the required user data types that are collected and/or shared
- Any user data sent off the user’s device by libraries or SDKs used in your app, regardless of whether this information is transmitted to you (the developer) or a third party
- Any user data transferred from your server to a third party or transferred to another third-party app on the same device
- Any user data collected or transferred through a webview which can be opened from your app, unless users are navigating the open web

**\*Note: you can learn more about each of these types of data use during the application submission process.**

## Sample Answers for Google’s Data Safety Section for Branch SDKs

### Data Collection and Security

| Question | Answer |
| --- | --- |
| Does your app collect any user data that is sent off the user's device? | **YES** (as part of your use of the Branch Services, the Branch SDK will pass the data listed below, as further disclosed in the [Branch Privacy Policy](https://branch.io/policies/#privacy)) |
| Is this data encrypted in transit? | **YES** |
| Can users request to delete this data? | **YES** |

### Data Types Collected by Branch's SDKs

::: info Prominent Disclosure and Consent
In addition to reviewing the information below, you are also responsible for ensuring your continued compliance with [Google’s Prominent Disclosure and Consent Requirements](https://support.google.com/googleplay/android-developer/answer/11150561?hl=en).
:::

You’ll need to confirm the types of data that you and/or your third-party partners including Branch collect from your app before answering the questions in Google Play Store.

Branch has provided a list of data types below that our services collect as further disclosed in our [Privacy Policy](https://branch.io/policies/#privacy). However, you will need to compare them to your custom configuration of the Branch SDKs and the data collection practices in your app to confirm whether your answers are accurate. Please also refer to [Best Practices On How to Avoid Sending Branch PII](best-practices-to-avoid-sending-pii-to-branch.md).

| Data Type | Collected? |
| --- | --- |
| Location | - Approximate Location: **NO** - Precise Location: **NO** |
| Personal Information | - Name: **NO** - Email Address: **NO** - Personal Identifiers: **NO** - Address: **NO** - Phone Number: **NO** - Race and Ethnicity: **NO** - Political or Religious Beliefs: **NO** - Sexual Orientation: **NO** - Other Personal Information: **NO** |
| Financial Information | - Credit/Debit Card/Bank Number: **NO** - Purchase History: **NO** - Credit Information: **NO** - Other Financial Information: **NO** |
| Health and Fitness | - Health Information: **NO** - Fitness Information: **NO** |
| Messages | - Emails: **NO** - SMS or MMS: **NO** - Other in-app messages: **NO** - Photos or Videos: **NO** |
| Audio Files | - Voice or Sound Recordings: **NO** - Music Files: **NO** - Other Audio Files: **NO** |
| Files and Docs | **NO** |
| Calendar | **NO** |
| Contacts | **NO** |
| App Activity | - Page Views and Taps in App: **YES** (**OPTIONAL** - You can use Branch's SDK privacy controls to prevent data collection by default until the end-user opted in) - In-App Search History: **NO** - Installed Apps: **NO** - Other User-Generated Content: **OPTIONAL**, if we are measuring in-app purchases for you for instance - Other Actions: **OPTIONAL**, Branch can collect this data on your behalf (i.e. clicks, installs, purchases) |
| Web Browsing History | **YES** (**OPTIONAL**) |
| App Info and Performance | - Crash Logs: **NO** - Diagnostics: **NO** - Other App Performance Data: **NO** |
| Device or Other Identifiers | **YES** (**OPTIONAL**) |
| Other Data | **YES** (**OPTIONAL** - *Branch collects this data on your behalf (e.g. engagement data and device metadata features such as screen size and operating system version*) |

### Data Usage and Handling by Branch's SDKs

You will need to have a clear understanding of how each data type is used by you and your third-party partners including Branch. Branch provides deep linking and attribution analytics services. Depending on the type of data being collected, you may be prompted to provide more information about Branch SDKs will use and handle your data:

| Question | Answer |
| --- | --- |
| Is data Collected and/or Shared | **YES** to both |
| Is data “processed ephemerally”? | **NO** (see Play Store Safety Section for definition) |
| Is the collection of data necessary to the use of the app or can users choose whether data is collected? | Users can choose to turn off this data collection (See: [*Restricting End User Data Processing*](honoring-opt-out-of-processing-requests.md)) |
| Why is the user data collected? | - App Functionality: **YES** - Analytics: **YES** - Developer Communications: **NO** - Fraud Prevention, Security, or Compliance: **NO** - Advertising or Marketing: **YES** - (Product) Personalization: **YES** - Account Management: **NO** |

## Privacy Links

You will have the ability to add links on your product page to your app’s privacy policy and your privacy choices documentation.

To learn more about Branch’s privacy practices and end user options, please see Branch’s Privacy Policy [accessible here](https://branch.io/policies/#privacy).
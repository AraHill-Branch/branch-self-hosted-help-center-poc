---
title: "Answering the App Store Connect Privacy Questions"
slug: answering-the-app-store-connect-privacy-questions
---

As part of the [App Store Connect submission process](https://developer.apple.com/support/app-privacy-on-the-app-store/), you will need to fill out Apple’s Privacy Practices Questionnaire where you will provide information about your app’s privacy practices, including the practices of third-party partners like Branch whose SDK code you integrate into your app.

## Answering the App Store Connect Privacy Questions

You must select answers from the options presented in App Store Connect. Please keep in mind:

- Branch’s SDKs are fully configurable by you, both in the data we collect on your behalf and how you use that data. Accordingly, you should **identify all possible data collections and uses**, even if not outlined here or even if certain data will be collected and used only in limited situations.
- Your answers should follow the [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) and any applicable laws.
- You are solely responsible for keeping your responses accurate and up to date. If your practices change, update your responses in App Store Connect.

## Data Collection by Branch’s SDKs

You’ll need to confirm the types of data that you and/or your third-party partners including Branch collect from your app before answering the questions in App Store Connect.

Branch has provided a list of data types below that our services collect as further disclosed in our [Privacy Policy](https://legal.branch.io/#branchio-privacypolicy). However, you will need to compare them to your custom configuration of the Branch SDKs and the data collection practices in your app to confirm whether your answers are accurate. Please also refer to [Best Practices On How to Avoid Sending Branch PII](best-practices-to-avoid-sending-pii-to-branch.md).

1. Contact Info: No
2. Health & Fitness: No
3. Financial Information: No
4. Location: No
5. Sensitive Information: No
6. Social Information: No
7. Contacts: No
8. User Content: No
9. Browsing History: Yes, Branch collects this data on your behalf. Apple broadly defines "browsing history" to include any information about content a user has viewed outside of your app, which is covered by Branch's cross-channel insights. Branch does not and cannot read users' web browsing history.
10. Search History: No
11. Identifiers: Yes, Branch collects this data on your behalf
12. Purchases: Optional, Branch can collect this data on your behalf
13. Usage Data: Optional, Branch can collect this data on your behalf
14. Diagnostics: No
15. Other Data: Yes; Branch collects this data on your behalf (*e.g. device metadata features such as screen size and operating system version*)

## Data Use by Branch’s SDKs

You will need to have a clear understanding of how each data type is used by you and your third-party partners including Branch. Branch provides deep linking and attribution analytics services.

1. Third-Party Advertising: No
2. Developer’s Advertising: Yes
3. Analytics: Yes
4. Product Personalization: Yes
5. App Functionality: Yes
6. Other Purposes: None

## Data Linked to the User

You’ll need to identify whether each data type is linked to a user’s account, device, or identity by you and/or your third-party partners. Data collected from an app is usually linked to the user’s account, device, or identity, unless specific privacy protections are put in place before collection to de-identify or anonymize it.

Please note, in **using** our services, Branch may provide the ability for you to associate the data it collects on your behalf with the resettable cookie and advertising identifiers. What associations the customer is capable of making (e.g. to a customer account or an identifiable individual) is unique to the customer and at its own discretion.

## Tracking

When it comes to user data, Apple has a specific definition of “Tracking” (see their [User Privacy and Data Use](https://developer.apple.com/app-store/user-privacy-and-data-use/) page for more information). You’ll need to understand whether you and/or your third-party partners including Branch use data from your app to track users and, if so, which data is used for this purpose.

Branch collects user data to provide deep linking and attribution analytics services for app downloads and installs. Depending on your custom configuration of the Branch SDKs and the data collection practices in your app, some of these services may require disclosure under Apple's definition of “Tracking.”

While you are solely responsible for keeping your responses accurate and up to date, Branch's understanding of Apple's policy is as follows:

- If you are using the Branch platform for the purposes of device-level paid ad attribution (this is typically the case if your app displays the AppTrackingTransparency prompt), then data collected by Branch may be used for Tracking under Apple's definition.
- If you are using the Branch platform solely for deep linking and/or measurement of owned and organic channels such as email and web-to-app (this is typically the case if your app does *not* display the AppTrackingTransparency prompt), then by default data collected by Branch will not be used for Tracking under Apple's definition.

**Please note:** beginning with iOS 14.5, if you indicate in your responses that you use collected data for the purposes of Tracking, it appears that Apple's reviewers expect to see the AppTrackingTransparency prompt implemented in your app.

## Privacy Links

You will have the ability to add links on your product page to your app’s privacy policy and your privacy choices documentation.

To learn more about Branch’s privacy practices and end user options, please see Branch’s Privacy Policy [accessible here](https://legal.branch.io/#branchio-privacypolicy).
---
title: "iOS 17 Privacy Changes"
slug: ios-17-privacy-changes
---

This year, Apple announced the upcoming release of iOS 17 and gave the industry insight into the privacy regulations packaged into that release. In response, Branch is proactively implementing updates to our platform to align with the new privacy regulations.

### Privacy Manifest File Creation

Branch now supports Privacy Manifest files, an essential addition for App Store submissions.

Branch's own iOS SDK Privacy Manifest [file](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Framework/PrivacyInfo.xcprivacy) includes:

- The declaration of `NSPrivacyTrackingDomains` to meet Apple's requirements.
- A list of `NSPrivacyAccessedAPITypes` with valid use reasons.
- Details on the data that the Branch iOS SDK collects, referred to as `NSPrivacyCollectedDataTypes`.

**Note**: If you are collecting and passing info to the Branch iOS SDK, you need to declare that in your own Privacy Manifest file in your app, since Branch cannot see the data being passed. This includes things like hashed identifiers and other sensitive information.

### SDK and Backend Updates

Branch has updated the iOS SDK as well as our backend to adhere to iOS 17 privacy policies.

Updates include:

- Changes to support compliance and flexibility for tracking and measurement.
- The creation of dedicated domains for network requests:

  - A dedicated tracking domain (api-safetrack.branch.io), designed for ads measurement, is declared in the privacy manifest. Branch will only use this domain when users have opted in to App Tracking Transparency (ATT).
  - A dedicated non-tracking domain (api3.branch.io) used by Branch for API requests related to non-ads measurement and deep linking. Notably, there’s no requirement to declare this domain in the privacy manifest, since traffic through it doesn’t contribute to “tracking” (ads measurement).

### SDK Signing

Starting with iOS 17, Branch will sign the iOS SDK to support user privacy. This aligns with Apple's requirements for Spring 2024 compliance.
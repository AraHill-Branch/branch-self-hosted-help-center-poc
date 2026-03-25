---
title: "iOS 17 Privacy Overview"
slug: ios-17-privacy-overview
---

## iOS 17 Privacy Glossary

| Term | Definition |
| --- | --- |
| **Privacy Manifests** | Standardized files that outline the privacy practices of an app or third-party framework (SDK). |
| **Privacy Report** | An auto-generated reference doc, based on the details contained in all relevant Privacy Manifest files, designed to make it easier to fill out the Privacy Nutrition Label questionnaire during App Store submission. |
| **SDK Signing** | A way for app developers to be confident that the third-party SDKs they use (such as Branch) are the original, validated versions and have not been tampered with. |
| **Privacy-impacting SDKs** | A list of SDKs that Apple judges to have particularly high impact on user privacy. Any SDK on this list will be *required* to include a Privacy Manifest file, and be signed by the original developer (these steps are also recommended but not required for SDKs that are not on the list). |
| **Required Reason APIs** | A limited selection of iOS functionality that could potentially be used for fingerprinting, for which an "allowed reason" for usage must be declared in the Privacy Manifest file. (Note that "API" in this context means things like accessing disk space, not service APIs the way we typically think of them in the world of mobile marketing) |
| **Tracking Domains** | Internet domains that an app or SDK connects to that engage in "tracking." These must be declared in the Privacy Manifest file, and network requests to these domains will fail until the user gives ATT consent. |
| **Domain Profiler in Instruments** | Tooling in Xcode that developers can use to compare an app's network requests against a list of internet domains the OS believes to be capable of "profiling" across multiple apps and websites. |
| **Link Tracking Protection and Safari Private Browsing Improvements** | New functionality in Messages, Mail, and Safari Private Browsing to strip URL query parameters used to track users across websites, and block various other forms of cross-site tracking. |
| **SKAdNetwork 5.0** | The new version will support re-engagement attribution (app opens). |

## Timelines



## Branch Support

### Privacy Manifest File Creation

Branch now supports Privacy Manifest files, an essential addition for App Store submissions.

Branch's own iOS SDK Privacy Manifest [file](https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/blob/master/Sources/Resources/PrivacyInfo.xcprivacy) includes:

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

## Additional Resources

- [Dev Docs] [iOS SDK Overview](ios-sdk-overview.md)
- [Changelog] [iOS 17 Privacy Changes](ios-17-privacy-changes.md)
- [Blog] [The Dark Horse of WWDC 2023: Privacy Policies Finally Get Real](https://www.branch.io/resources/blog/the-dark-horse-of-wwdc-2023-privacy-policies-finally-get-real/)
- [Blog] [Navigating iOS 17’s Privacy Landscape: The Road Ahead for App Developers and Advertisers](https://www.branch.io/resources/blog/navigating-ios-17s-privacy-landscape-the-road-ahead-for-app-developers-and-advertisers/)
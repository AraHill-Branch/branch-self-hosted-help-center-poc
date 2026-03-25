---
title: "iOS SDK Overview"
slug: ios-sdk-overview
---

### SDK Stats

**Open Source Github Repo**: <https://github.com/BranchMetrics/ios-branch-deep-linking>

**SDK Size**: ~220kb (with all Branch features enabled)

**Speed**: Median 80ms to 250ms

**Minimum XCode Version**: 15.0+

**Minimum OS version**: iOS 12+

### iOS Demo App

**Want to take our technology for a test drive before implementing it?**

[DOWNLOAD BRANCH MONSTER FACTORY](https://apps.apple.com/us/app/branch-monster-factory/id917737838)

**Want to dive into the code directly?**

[VIEW BRANCH MONSTER FACTORY GITHUB](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-iOS)

### Basic Integration

**Integrating the Branch iOS SDK is required for the following features:**

- Ads
- Email
- Journeys

[INTEGRATE THE BRANCH SDK](ios-basic-integration.md)

### Advanced Features

**After completing the basic integration, you can implement the following features:**

- Create content reference
- Create deep link
- Share deep link
- Read deep link
- Navigate to content
- Display content
- Track content
- Handle push notifications
- Handle links in your own app

[IMPLEMENT ADVANCED FEATURES](ios-advanced-features.md)

### Testing

**Test your Branch integration before your app goes live.**

[TEST THE INTEGRATION](ios-testing.md)

### Troubleshooting

**Running into issues? Browse our troubleshooting section to find a solution.**

[SEARCH SOLUTIONS](ios-troubleshooting.md)

### Version History

**View past versions of the Branch SDK for iOS including changes.**

[VIEW VERSION HISTORY](ios-version-history.md)

### Full Reference

**The information presented here serves as a reference manual for our iOS SDK.**

[VIEW FULL REFERENCE](ios-full-reference.md)

## FAQ

<details>
<summary>Why is iOS Redirect not working when I have Universal Links enabled?</summary>

Taking into understanding that your app's Branch SDK integration is set up just fine and Universal Links are enabled, this seems to be an issue where the AASA files are not getting downloaded in the device.

There is a known universal bug for Apple where devices for iOS version 11.x+ , the AASA files do not get fetched and thus causing the Universal Links to fail.

To troubleshoot, try the following:

1. Follow the steps outlined in this guide to [validate if your AASA file successfully downloaded](https://help.branch.io/developers-hub/docs/ios-troubleshooting).
2. If the issue persists, check on the following:

   1. Uninstall the app from the device
   2. Restart the device
   3. Reinstall app

      *It may take 2-3 tries for this to work. Normally, the Apple OS looks into retrying to fetch the AASA file at some time interval but the workaround might help for a test condition.*
3. Inside the app, check if the AASA files were downloaded successfully or not. To do this:

   1. Copy the link into your notes app.
   2. Long-press the link till a dropdown appears. If the dropdown shows 'Open link', then Universal Links are not working for that device. If the link shows 'Open in app name', the configuration is working fine.

</details>

<details>
<summary>Why are email deep links working on Android but not on iOS?</summary>

Branch deep links in emails do not work for iOS, since Branch uses Universal Links property to launch the app. As the Universal Links work on link domains, the mailer links wrap the Branch link into a click tracking domain, and hence the final URL changes. When you click the mailer link, it redirects to Branch link on the web as the Universal Links will not work with the new domain.

For such use cases, we have [Branch Email](https://help.branch.io/v1/docs/branch-universal-email) where we have partnered with different [Email Service Providers (ESPs)](https://help.branch.io/v1/docs/email-partners-list) to support direct app open, deep linking and attribution.

</details>

<details>
<summary>What is the minimum SDK version required to get ATT opt-in and opt-out data?</summary>

iOS SDK Version 1.39.1 and above is required.

</details>

<details>
<summary>When is the AASA file fetched once I update the AASA file?</summary>

Usually, the apple-app-site-association file is checked when the app is first installed and then rechecked during any later app updates from the App Store. So if you add an additional path to the file, it would be detected when the next update app is released but likely not before. Updating the app will usually re-cache the AASA file.

</details>
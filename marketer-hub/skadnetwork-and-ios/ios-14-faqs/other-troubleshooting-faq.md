---
title: "Other Troubleshooting FAQ"
slug: other-troubleshooting-faq
---

<details>
<summary>Troubleshooting steps for deep links on iOS 14</summary>

1. If you are running into issues with universal linking on iOS 14:
2. Make sure you are on the latest version of iOS 14+
3. Use our [AASA Validator tool](https://branch.io/resources/aasa-validator/) and check your AASA file for any strange inconsistencies
4. If you are unsure that the AASA file is downloading onto the device
5. Note that on iOS 14, AASA files will be delivered via Apple's CDN, which is different from how AASA files are currently downloaded. Check that the customer has a strong internet connection, or wait a few minutes for the AASA to download on the device (though the CDN should supposedly help with latency issues)
6. Check `swcd` and see if any [errors are returned](ios-troubleshooting.md) in the console. If it says CDN was blocked (404/403) then something may not be correct on the device.
7. ​Apple [states](https://developer.apple.com/documentation/safariservices/supporting_associated_domains) that, starting with macOS 11 and iOS 14, apps no longer send requests for apple-app-site-association files directly to your web server. Instead, they send these requests to an Apple-managed content delivery network (CDN) dedicated to associated domains. While you're developing your app, if your web server is unreachable from the public internet, you can use the alternate mode feature to bypass the CDN and connect directly to your private domain. You enable an alternate mode by adding a query string to your associated domain's entitlement as follows:  
   `<service>:<fully qualified domain>?mode=<alternate mode>`

</details>
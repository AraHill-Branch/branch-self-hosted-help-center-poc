---
title: "Safari Error: Safari cannot open this page because address is invalid"
slug: safari-error-safari-cannot-open-this-page-because-address-is-invalid
---

This Safari error (“Safari cannot open this page because address is invalid”) is almost always because of a caching error.

## Troubleshoot

Try the following troubleshooting steps to resolve the error.

### Quick fixes

Try the following device-level fixes before moving on to configuration changes:

- **Clear Safari cache**: Go to **Settings** > **Safari** > **Clear History and Website Data** to clear your cache in Safari. This forces Safari to re-evaluate its stored redirects.
- **Use Private Browsing**: Open a Private Browsing window in Safari to test. Safari’s Private Browsing ignores existing caching and behaviors.
- **Wait and retry**: Sometimes, the issue is a delay in Apple's services propagating the app's installation status. Wait for 5-10 minutes after an install/uninstall cycle before testing again.

### Configuration fix

If device-level fixes don’t resolve the error, try the following configuration fix:

#### Verify your URI scheme is correctly configured

The error can also happen if there's a mismatch between the URI scheme defined in your app and the one entered in the Branch Dashboard.

1. **Check your app's** `Info.plist`**:** Find the `URL types` entry and confirm the exact string used in `URL Schemes`. It's case-sensitive.
2. **Check your Branch Dashboard:** Navigate to **Configuration** > **Link Settings** > **URI Scheme** and ensure the value there exactly matches the one from your `Info.plist`. A single typo will cause failure.
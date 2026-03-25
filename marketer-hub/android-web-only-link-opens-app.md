---
title: "[Android] Web Link Opens App"
slug: android-web-only-link-opens-app
---

### For Customers with Standard Branch Domain: (*your-brand*.app.link)

1. Debug the link by adding `?debug=1` to the end of the link.
2. Check if the link data has `$web_only : true`; if it doesn’t, edit the link and add `$web_only` in the Link Data.
3. The created link should contain **-web** in the link (branch-web.app.link/e/ra8U77ukTbb); if it doesn’t, please submit a [ticket](submit-a-ticket.md).

### For Customers with Custom Subdomain

1. Debug the link by adding `?debug=1` to the end of the link.
2. Check if the link data has `$web_only : true`; if it doesn’t, edit the link and add `$web_only` in the Link Data.
3. If this exists and the link still opens the app, check if **app links are enabled** see below:



6. If app links are enabled, the app will always open on Android.
7. Execute [this](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android/blob/master/app/src/main/java/io/branch/branchster/SplashActivity.java#L43) code before the deep linking logic to open the web URL in Chrome or a webview. If you don’t want to add the code, disable app links for Android. Branch will be able to open the app via [URI schemes](https://branch.io/glossary/uri-schemes/).
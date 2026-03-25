---
title: "React Native Expo Integration"
slug: react-native-expo-integration
---

## Overview

This guide outlines how to integrate the [Branch React Native SDK](https://www.npmjs.com/package/react-native-branch) into an Expo-based app using the `@config-plugins/react-native-branch` [plugin](https://www.npmjs.com/package/@config-plugins/react-native-branch).

::: warning Warning
Branch supports apps built with Expo. However, the plugin is not shipped within the SDK. Please note that the plugin is **community-maintained**, and Branch may not be able to troubleshoot or fix plugin-dependent issues.
:::

This guide covers an Expo-managed workflow. If you need full native control, see the [React Native Basic Integration](react-native-basic-integration.md) guide.

## Before you begin

Before you begin this integration, make sure you:

- Have an Expo-managed or prebuild workflow using Expo SDK 54 or higher (run `npx expo install expo` to install or update)
- Understand which Branch products you are implementing:

  - Attribution and deep linking
  - Paid ads
  - Other advanced features

You will also need:

- Your Branch Key (Live or Test)

  - [Branch Keys in legacy Branch](https://help.branch.io/account-hub/docs/profile-settings)
  - [Branch Keys in new Branch](https://help.branch.io/docs/credentials-new)
- Your Branch link domains
- Confirmation whether SKAdNetwork support is required for your configuration

## Set up Branch in your Expo app

### 1. Configure Branch

Configure Branch for your application:

- [iOS Branch configuration steps](#)
- [Android Branch configuration steps](#)

Make sure to configure your default link settings as part of the setup process.

### 2. Install Branch

Install the [Branch React Native SDK](https://www.npmjs.com/package/react-native-branch) into your app.

```
npx expo install react-native-branch
```

### 3. Add plugin

Add the [plugin](https://www.npmjs.com/package/@config-plugins/react-native-branch) to your app.

```
npm install @config-plugins/react-native-branch
```

If you run into version issues, visit the [Troubleshooting](react-native-expo-integration.md#plugin-version-errors) section.

### 4. Configure plugin

Set environment variables using [EAS](https://docs.expo.dev/eas/environment-variables/).

If you don’t have an `app.config.js` or `app.config.ts` in your project, start by manually creating one. Then, add the following code:

```
export default {
  plugins: [
    [
      '@config-plugins/react-native-branch',
      {
        apiKey: process.env.BRANCH_API_KEY, // Required
        iosUniversalLinkDomains: [
          process.env.BRANCH_DOMAIN_LINK,
          process.env.BRANCH_DOMAIN_LINK_ALT,
        ],
      },
    ],
  ],
  ios: {
    associatedDomains: [
      `applinks:${process.env.BRANCH_DOMAIN_LINK}`,
      `applinks:${process.env.BRANCH_DOMAIN_LINK_ALT}`,
    ],
  },
  android: {
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        category: ["BROWSABLE", "DEFAULT"],
        data: [
          { scheme: 'https', host: `${process.env.BRANCH_DOMAIN_LINK}` },
          { scheme: 'https', host: `${process.env.BRANCH_DOMAIN_LINK_ALT}` },
        ],
      },
    ],
  },
}
```

If your build is failing in local development after configuring the plugin, see the [Troubleshooting](react-native-expo-integration.md#build-fails-without-branchapikey-in-local-development) section.

#### iosUniversalLinkDomains

The `iosUniversalLinkDomains` option registers your Branch domains as iOS associated domains for Universal Links. Include both your primary and alternate (`-alternate`) link domains if your app uses both.

This is separate from `ios.associatedDomains`, which establishes a secure association between your domains and your app.

Universal Links requires both `iosUniversalLinkDomains` and `ios.associatedDomains` to work.

### 5. Subscribe to deep link data

The plugin handles native Branch initialization automatically. For details on native Branch initialization, see the [React Native Basic Integration](react-native-basic-integration.md) guide.

To listen for deep link data, subscribe in your app's entry point:

```
import branch from 'react-native-branch'

branch.subscribe(({ error, params }) => {
  if (error) {
    console.error('Branch error:', error)
    return
  }

  console.log('Branch params:', params)
})
```

### 6. (Optional) Set up paid ads

If you're using Branch for paid ad attribution, additional setup is required.

See the following guides to set up and test your paid ads implementation:

- [Enable SKAdNetwork](enable-skadnetwork.md)
- [Test Ads Campaign Setup](testing-ads-campaign-setup.md)

### 7. Validate integration

Before testing on device, use the [Link Validator](link-validator.md) in Branch to confirm your links are configured correctly and preview the expected user flow across different platforms and click sources.

Then validate your integration using the three scenarios below. In each case, your `subscribe` callback should receive and log the link data.

1. **Test Universal Link opening:** Open a Branch Link from Safari (iOS) and Chrome (Android). The app should open directly without extra dialogs or browser redirects.
2. **Test cold-start deep link behavior:** Force quit the app, then open a Branch Link. The app should launch and take you to your content.
3. **Test background resume behavior:** With the app backgrounded, tap a Branch Link. The app should resume and take you to your content.

For additional validation and testing, use the following guides:

**iOS**

- [iOS Validation](ios-basic-integration.md#8-validate-integration)
- [iOS Testing](ios-testing.md)

**Android**

- [Android Validation](android-basic-integration.md#8-validate-integration)
- [Android Testing](android-testing.md)

## Next steps

Once you’ve integrated Branch into your Expo app, you can use any of the features documented in the [React Native Full Reference](https://help.branch.io/developer-hub/docs/react-native-full-reference) guide, including creating Branch Links, tracking Branch Events, and handling Branch Universal Objects.

## Troubleshooting

For general iOS and Android troubleshooting suggestions, use the following guides:

- [iOS Troubleshooting](ios-troubleshooting.md)
- [Android Troubleshooting](android-troubleshooting.md)

#### Plugin version errors

If running `npm install @config-plugins/react-native-branch` results in version errors, try the following command instead:

```
npm install @config-plugins/react-native-branch --legacy-peer-deps
```

#### Build fails without BRANCH\_API\_KEY in local development

If `BRANCH_API_KEY` is not set in your environment, the plugin will fail the build, even if you're not testing Branch functionality. To avoid this, conditionally load the plugin only for production builds:

```
export default {
  plugins: IS_DEV
    ? [...plugins, ...devPlugins]
    : [...plugins, ...prodPlugins],
}
```

Place the `@config-plugins/react-native-branch` plugin inside `prodPlugins`.

#### Prebuild fails

If prebuild fails after adding the `@config-plugins/react-native-branch` plugin, try running a clean prebuild:

```
npx expo prebuild --clean
```

#### Unable to use both Test and Live Branch Keys

The plugin only accepts one API key.

Workaround options:

- Use separate builds for Test and Live
- Use only your Branch Live Key across all your environments
- Implement custom built-time logic

#### Deep links do not open in the app

If your deep links are not properly opening your app:

- Verify [associatedDomains (iOS)](react-native-expo-integration.md#4-configure-plugin)
- Verify [intentFilters (Android)](react-native-expo-integration.md#4-configure-plugin)
- Confirm [domain configuration](basic-link-configuration.md#5-link-domain) in Branch
- Confirm [AASA file](ios-testing.md) is accessible

#### SKAdNetwork attribution is unclear

If your SKAdNetwork attribution data is not showing up or doesn’t look correct in Branch:

- Confirm SKAdNetwork IDs are registered

- Validate Branch reporting
- Test install flow from paid campaign

For SKAdNetwork setup and validation, see our [Enable SKAdNetwork](enable-skadnetwork.md) guide.

#### Branch analytics fields are empty after removing Firebase

If you migrated away from the Firebase SDK and Branch analytics fields like `$~campaign` are unpopulated, you may need to explicitly install `expo-tracking-transparency`. On Android, this library was previously bundled with Firebase in Expo environments.

`npx expo install expo-tracking-transparency`

Also confirm that your Proguard `-keep` rules are correctly configured for the Branch React Native SDK.
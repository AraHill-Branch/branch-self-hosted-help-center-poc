---
title: "Add Multiple Custom Domains"
slug: add-multiple-custom-domains
---

You can now configure and use **unlimited custom domains** for your links if you have Branch Activation.

This update gives you the flexibility to manage multiple brands, streamline rebranding efforts, and create distinct user journeys for your web and app traffic.

To learn how to implement multiple custom domains, read our [Basic Link Configuration](basic-link-configuration.md#use-your-own-domain) article.

## What's new

- **Unlimited custom domains:** Configure as many custom domains as you need within the dashboard. The process for adding a new domain remains the same.
- **Select your domain during link creation:** When creating a link in the Dashboard, you can now select your desired domain from a drop-down menu.
- **Default API domain:** For automated link creation, the API will use your default custom domain unless a different one is specified in the call.
- **Enhanced flexibility for Activation Essentials:** If you have the Activation Essentials package, you can now use your `app.link` domain in addition to any configured custom domains.

## Use cases and benefits

This enhancement allows you to:

- **Manage multiple brands:** Seamlessly manage link creation for different brands, business lines, or campaigns, each with its own unique domain.
- **Execute smooth rebrands:** Transition to a new brand domain without disrupting existing links or workflows.
- **Separate web and app experiences:** Dedicate specific domains for web-only traffic and others for app deep linking. This allows you to ensure web users are always directed to your mobile site and app users get the optimal deep linking experience.

## Implementation options for Activation

These options only apply if you have Branch Activation and have the ability to add multiple custom domains. For more information, read our [Basic Link Configuration](basic-link-configuration.md) article.

::: info Note
You must complete the steps in the custom subdomain implementation instructions in our [Basic Link Configuration](https://help.branch.io/docs/basic-link-configuration#use-a-custom-subdomain) article for each custom domain that you add.
:::

**Option 1: Single domain for web and app**

Use this approach to have a single custom domain to handle links that point to both web pages and in-app locations.

- **How it works**: This configuration relies on Universal Links (iOS) and Android App Links to prioritize opening the app. If a user has your app and clicks a web link, the link will open in an in-app webview.
- **Requirements**: Your apps must have the *at least* the following SDK versions to support this option:

  - iOS SDK ≥ 3.12.0
  - Android SDK ≥ 5.18.0
- **Pro:** You can change a link's destination between a web page and an app view at any time without needing to generate a new link or update a QR code.
- **Con**: Requires having updated SDK versions to ensure a consistent user experience for all link types.

**Option 2: Separate domains**

Use this approach to have separate dedicated domains for web links and app links, ensuring a clear separation of user experiences.

- **How it works**: You configure at least two domains:

  - **Web domain**: A domain designated for web links. Links using this domain will never open the app and will always direct users to their mobile browser.
  - **App domain**: A separate domain (for example, your default app.link domain or another custom domain) used exclusively for deep linking.
- **Requirements**: No SDK update is required to implement this strategy, as the web domain does not interact with the SDK. However, you must integrate the Branch SDK if you want to deep link to locations in your app with app links.
- **Pro**: This method provides a predictable user experience by avoiding the in-app webview and does not require an SDK update to create web links.
- **Con**: A link's behavior is fixed to its domain. To switch a link's destination from a web page to an app view (or vice-versa), you must create an entirely new link using the appropriate domain.
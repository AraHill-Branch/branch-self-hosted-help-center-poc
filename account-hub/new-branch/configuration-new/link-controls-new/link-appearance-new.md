---
title: "Link Appearance (New)"
slug: link-appearance-new
---

## Overview

This article explains how to configure your link settings in Branch. The **Link Controls** page allows you to manage link domains, customize link appearance, and configure routing rules for different platforms and devices.

To access these settings, go to **Configuration > Link Controls** in Branch.

The **Link Controls** page contains two tabs:

- **Link Appearance** - Configure your link domains, social media previews, and QR code styling.
- **Link Routing Rules** - Configure where users are redirected based on their platform and device.

The **Link Appearance** tab contains settings for how your links look and which domains they use.

### Link domains

Use custom domains to brand your short links. This section displays your default domain, custom domains, and Branch-provided deep linking domains.

#### Default domain

The default domain is used for all new links created in your Branch app. To change your default domain:

1. Select **Change Default Domain**.
2. Select a domain from the **Available Domains** dropdown.
3. Select **Save changes**.

#### Custom domains

You can add custom domains to brand your Branch Links with your own domain name.

To add a custom domain:

1. Select **Add A Custom Domain**.
2. Enter your custom domain in the field provided.
3. Select **Save Domain**.

To remove a custom domain, select the delete icon next to the domain you want to remove.

::: info Note
The ability to add multiple custom domains is only available in some Branch packages.
:::

#### Deep linking domains

These are your Branch-provided deep linking domains. Ask your app developer to configure Universal Links and Android App Linking for these domains.

Branch provides you with a primary deep linking domain and an alternate domain. To change your Branch deep linking subdomain:

1. Select **Change Branchbeta.link Domain**.
2. Enter your new subdomain in the field provided.
3. Select **Confirm Change**.

::: warning Caution
Changing a subdomain will result in all links currently using that subdomain not redirecting properly. Make sure to update your mobile app to use the new subdomain after making this change.
:::

### Link preview

Configure how your link will look by default when shared on social platforms. You can customize this per individual link during link creation.

To configure the default link preview:

1. Select **Configure** in the Link Preview section.
2. Enter a **Title** for your link preview.
3. Enter a **Description** for your link preview.
4. Add a thumbnail image by uploading a file or entering an image URL.
5. Select **Save Changes**.

::: info Note
These settings will be used as defaults for new links. You can still customize individual link previews when creating links.
:::

### QR code

Configure your default QR code design. This will apply to all short links created in Branch or via the QR Code API. You can also customize each individual QR code during creation.

To configure the default QR code design:

1. Select **Configure** in the QR Code section.
2. Select your styles:

   - **Choose a pattern** - Select from available QR code pattern styles
   - **Choose a finder** - Select the style for the corner finder patterns
   - **Choose a shape** - Select square or circular modules
   - **Add a border** - Toggle to add a border around your QR code
3. Select your colors:

   - Choose from preset colors or enter custom hex values
   - **Code Color** - The color of the QR code modules
   - **Finder Color** - The color of the corner finder patterns
   - **Background Color** - The background color of the QR code
4. Optionally add a logo by uploading a file or entering an image URL.
5. Select **Save Changes**.
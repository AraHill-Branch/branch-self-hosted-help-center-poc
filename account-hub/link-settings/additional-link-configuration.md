---
title: "Additional Link Configuration"
slug: additional-link-configuration
---

## Desktop app default link behavior

1. In the Branch Dashboard, navigate to [**App Settings**](https://branch.dashboard.branch.io/configuration/general) → **General** tab → **Desktop Redirects** section.
2. For **Default Desktop**, select either:  
    a. Branch-hosted QR Code Landing Page or  
    b. Custom Landing Page
3. For **Mac Desktop**, enter:  
    a. Mac URI Scheme  
    b. Mac App Store URL
4. For **Windows Desktop**, enter:  
    a. Windows URI Scheme  
    b. Windows Store URL  
    c. Windows Package Family Name

::: info Note
If the app is not installed when the link is clicked, we will fall back to the Desktop or Default URL, in that order.
:::



## Advanced mobile redirects

The settings in this section allow you to specify different destination URLs or app store listings for users accessing your content on various mobile devices and platforms like Amazon Fire, iPad, Android tablets, and even within WeChat. This ensures users are directed to the most appropriate app or web experience for their device.

### Amazon Fire default link behavior

1. In the Branch Dashboard, navigate to [**App Settings**](https://branch.dashboard.branch.io/configuration/general) → **General** tab → **Advanced Mobile Redirects** section.
2. In the **Fire Redirects** section, enter your Amazon Fire URL. If you have a different package for the Amazon Store than the Plat Store on Fire devices, specify the Amazon Fire URL using the `p=package` [parameter](https://developer.amazon.com/docs/reports-promo/deeplink-to-the-amazon-client.html).

### iPad redirect link behavior

1. On the [Configuration](https://dashboard.branch.io/configuration) page, in the [General](https://dashboard.branch.io/configuration/general) tab, navigate to the **Advanced Mobile Redirects** section.
2. In the **iPad Redirects** section, if you have a different App Store ID for your iPad app or would prefer to fall back to a different URL on iPad tablets, please specify either URL here.

### Android tablet redirect link behavior

1. On the [Configuration](https://dashboard.branch.io/configuration) page, in the [General](https://dashboard.branch.io/configuration/general) tab, navigate to the **Advanced Mobile Redirects** section.
2. In the **Android Redirects** section, if you have a different Play Store package for your tablet apps or would prefer to fall back to a different URL on Android tablets, please specify either URL here.

### WeChat redirect link behavior

1. On the [Configuration](https://dashboard.branch.io/configuration) page, in the [General](https://dashboard.branch.io/configuration/general) tab, navigate to the **Advanced Mobile Redirects** section.
2. Because WeChat does not support deep linking out of the app on iOS or Android, if you choose to fall back to a custom URL, you can enter it here.
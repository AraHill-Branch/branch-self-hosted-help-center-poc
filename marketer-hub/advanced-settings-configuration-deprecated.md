---
title: "Advanced Settings & Change Your Link Domain"
slug: advanced-settings-configuration-deprecated
---

## Link domain

To see your app’s default link domain and alternate link domain, navigate to the [General tab](https://dashboard.branch.io/configuration/general) of the App Settingspage of the Branch Dashboard.

When you first create your account, you will be assigned a unique domain for all of your Branch Links.

![](/img/0f142b5-Link_Domain.png "Link Domain.png")

### Change link domain

::: warning Caution
Before changing your Branch link domain, it is important to understand all behavior changes that occur when you do so. This will help ensure you do not run into any unwanted experiences for your users clicking your Branch Links.
:::

| Change | Example | Behavior |
| --- | --- | --- |
| `app.link` to `app.link` | `abcdef.app.link` → `mycompany.app.link` | - Your old `app.link` URLs will redirect to the **LINK NOT FOUND** page. - Your old `app.link` URLs will fail to open your mobile app. - Your new `app.link` URLs will not open your app until you update your code to utilize the new link domain ([iOS](ios-basic-integration.md) / [Android](android-basic-integration.md)). - If you are already using your original/old `app.link` URLs in the wild and need them to keep working, it is recommended to explore [Using Your Own Domain](advanced-settings-configuration.md#using-your-own-domain) instead. |
| `app.link` to Custom Domain | `mycompany.app.link` → `app.mycompany.com` | - Your old `app.link` URLs will still work. - Your new Custom Domain URLs will not open your app until you update your code to utilize the new link domain ([iOS](ios-basic-integration.md) / [Android](android-basic-integration.md)). - [Creating Long Links Details](creating-a-deep-link.md) |
| Custom Domain to Custom Domain | `app.mycompany.com` → `mycompany.app` | - Your old Custom Domain URLs will fail to deep link. - Your new Custom Domain URLs will not open your app until you update your code to utilize the new link domain ([iOS](ios-basic-integration.md) / [Android](android-basic-integration.md)). |
| Legacy `bnc.lt` to `app.link` or Custom Domain | `bnc.lt` → `mycompany.app.link`  `bnc.lt/branch` → `app.mycompany.com` | - Both your `bnc.lt` and `app.link`/Custom Domain deep links will work. - Your new `app.link`/Custom Domain URLs will not open your app until you update your code to utilize the new link domain ([iOS](ios-basic-integration.md) / [Android](android-basic-integration.md)). |

### Change app.link subdomain

::: warning Caution
Changing your `app.link` subdomain can only be performed **once** for your Branch app.
:::

You have the ability to change your `app.link` subdomain for your Branch Links to better match your brand. It is recommended to set your `app.link` subdomain to be the name of your app, in case you have multiple mobile apps under your brand.

To customize your `app.link` subdomain:

1. Review and understand [what it means to change your domain](advanced-settings-configuration.md#change-link-domain).
2. Click the **Change My** `app.link` **Subdomain** button.
3. Input your new preferred `app.link` subdomain. You can only set it to a subdomain that is not already taken by another Branch app.
4. Update your mobile app to use the new `app.link` subdomain.

### Use your own domain

You have the ability to use your own custom domain to be used for your Branch Links. Branch supports the use of a custom subdomain or a custom root domain for you to be able to set your Branch Links closer to your branding preferences.

![](/img/8d1e0a7-Custom_Domain.png "Custom Domain.png")

::: danger Warning
Do not use your main website domain for your Branch Links.
:::

::: warning Caution
- Whenever you change the NS or CNAME records of your domain, you are making Branch the authoritative registrar of your domain. This will grant Branch control of your domain and you will lose access to that custom subdomain or custom root domain. The web page will become blank, and the control of the domain will change to Branch
- Branch will use the domain to route all deep linked traffic.
- Branch will host your AASA file and SSL certifications.
- If you have content on your custom root domain, Branch recommends using an unused custom subdomain.
:::

| Limitation | Details |
| --- | --- |
| Android App Links & Web Limitations | Android App Links together on custom subdomains and custom root domains currently do not support Branch's web-only link functionality. Using the `$web_only` parameter on Branch Links that only open the web even if the app is installed. Because of this limitation, **Android App Links will force the app to open even when using the** `$web_only` **parameter**. |
| Web | If you have Activation, you can use a custom domain for Web Short Links. For other packages, **you must use the assigned default link alias**. |

#### Use a custom subdomain

If your enterprise is highly restrictive of the domains that you utilize and wants to ensure that your Branch domain matches the rest of your relevant subdomains, you can utilize a custom subdomain, for example `link.yourbrand.com` .

To set a custom subdomain:

1. Review and understand [what it means to change your link domain](advanced-settings-configuration.md#change-link-domain).
2. Update the DNS CNAME of your custom subdomain to point to `custom.bnc.lt` . If using AWS Route 53, do this in the Registered Domain tab, not in Hosted Zones.
3. Use the [CAA Lookup Tool](https://www.entrust.com/resources/certificate-solutions/tools/caa-lookup) to see if you need to update your `CAA` records of your custom subdomain to include `letsencrypt.org`.
4. Click the **Use My Own Domain** button.
5. Input your custom subdomain (without the `www` ) and click **Confirm**.
6. Update your mobile app to use the new custom subdomain.

#### Use a custom root domain

If your enterprise requires you to establish an entirely separate domain for your Branch domain, you can use a custom root domain, for example `yourbrand-link.com`. This is only recommended if your company is not open to `app.link` or a custom subdomain option.

To set a custom root domain:

1. Review and understand [what it means to change your link domain](advanced-settings-configuration.md#change-link-domain).
2. Update the `NS` records of your custom root domain using the following nameservers:

   - `ns-1581.awsdns-05.co.uk`
   - `ns-234.awsdns-29.com`
   - `ns-1059.awsdns-04.org`
   - `ns-843.awsdns-41.net`
3. Use the [CAA Lookup Tool](https://www.entrust.com/resources/certificate-solutions/tools/caa-lookup) to see if you need to update your `CAA` records of your custom subdomain to include `letsencrypt.org`.
4. Click the **Use My Own Domain** button.
5. Input your custom root domain (without the `www`) and click **Confirm**.
6. Update your mobile app to use the new custom subdomain.

## Advanced settings

On the [Configuration Screen](https://branch.dashboard.branch.io/configuration/general) of the Branch Dashboard, you can change your advanced link settings

### URI Scheme Deep Link

This selector allows you to control how and when Branch uses URI schemes to open your app when Universal Links and Android App Links fail. See browser specifics in the docs [here](creating-a-deep-link.md#expected-link-behavior).

| Deep Link Mode | Description |
| --- | --- |
| Conservative | Conservative mode will never use URI schemes if there is a risk of error messages. |
| Intelligent | Intelligent mode is **recommended** and uses Branch data to safely use URI schemes everywhere, with the slight risk of error messages in certain browsers if the app is uninstalled. |
| Aggressive | Aggressive will force URI schemes everywhere, causing users without the app to see error messages in some browsers. |

### Redirect Allowlist

With Branch, you have the ability to set a specific allowlist of domains that you can allow your Branch Links to redirect to (set to disabled by default). With the Redirect Allowlist, you can limit Branch Link redirection to specific web domains or URI schemes across your Branch platform. List each of the domains you want to limit redirection to. We also support a “\*” for wildcard subdomains.

![](../../../assets/media/images/31c6a125-a4f2-4b11-859a-4db25717335a "Redirect Allowlist.PNG")

For example, if your allowlist includes “branch.io”, “\*.branch.io”, and “myapp://”, your deep links can only redirect to domains like branch.io, dashboard.branch.io, or myapp://.

It is recommended that you include the app store domains that are relevant to the way users download your app. For example: “play.google.com” and “apps.apple.com”

### Match Type

Setting Match Type determines the matching methodology Branch uses for your Links and App. Selecting **Unique** means that Branch will only make a deep link through install match if there is a single, unique outstanding footprint. For example, if you and your twin both have iPhone 5s with the same OS/version, etc, and click different links for the same app, then open the app up at the same time, we won’t deep link when Unique is selected. You probably don’t want this as it’s mostly for very special circumstances.

### Local Currency

Set the local currency of your Branch Dashboard if it is not USD. By setting your local currency, you can analyze marketing spend (cost) and revenue in your local currency. This also allows direct cost data comparison with ad partners who report their spending in a currency other than USD.

![](../../../assets/media/images/b8fb9108-ceca-4070-8270-acaa6a25d870 "Local Currency.PNG")

A field called **Local Currency** will be available on the Dashboard showing the currency configured in your [Ads Analytics](paid-ads-analytics.md) and [Unified Analytics](unified-analytics.md).

Note: The currency can only be set once through the Branch Dashboard to avoid some potential issues:  
Historical data does not switch to the new local currency but would be labeled as such. As a result, the data prior to the currency change may show as inaccurate.  
When changing the currency type, your cost data for the previous 7 days will be updated and may cause inaccuracies.

### Other Settings

| Setting | Default | Description |
| --- | --- | --- |
| Use UTM tags for analytics (for [Long Links](creating-a-deep-link.md#long-links)) | Disabled | If you enable this, Branch will automatically set channel, feature, campaign, tags, and keywords based on UTM parameters. This only applies to Long Links, not links generated through the Dashboard, API, or SDKs. |
| Analytics mapping with UTM | Enabled | When redirecting to a web URL, Branch automatically passes through any values from the following Branch link analytics tags as UTM parameters [~campaign -> utm\_campaign, ~channel -> utm\_source, ~feature -> utm\_medium]. If these UTM parameters are already detected on the URLs being redirected to, Branch will not overwrite them. |
| Enable Link Scraping | Disabled | Please note that this setting does **not** apply to Branch Links made using the Dashboard **or** API-generated links. By default, Branch Links will scrape the original web URL for meta tags, and Branch Links made via API will scrape `$original_url`, `$fallback_url`, and `$desktop_url` for meta tags, in that order. |
| Enable retrieving Last Attributed Touch Data via SDKs | Disabled | Allow retrieving last attributed touch data from the client. |
| Enable China Features | Disabled | China Features include the ability to collect IMEI on non-Google Android devices. |

### Best Practices

For changing the Link Domain for both of your LIVE and TEST Branch apps, the best practice is to change your LIVE app first and then add *test* somewhere in the new domain name for the TEST app.

Notice, the LIVE and TEST apps cannot use the same customized Link Domain. For example, the LIVE app of *Branch Monster Factory* uses `branchster.app.link` for its LIVE app and `branchster.test-app.link` for its TEST app.
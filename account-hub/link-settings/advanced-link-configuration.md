---
title: "Advanced link configuration"
slug: advanced-link-configuration
---

In the [General tab](https://dashboard.branch.io/configuration/general) of the App Settings page in Branch, you can change your advanced link settings.



## URI scheme deep link mode

This selector allows you to control how and when Branch uses URI schemes to open your app when Universal Links and Android App Links fail. See the browser specifics in [Expected link behavior](creating-a-deep-link.md#expected-link-behavior).

| Deep Link Mode | Description |
| --- | --- |
| Conservative | Conservative mode never uses URI schemes if there is a risk of error messages. |
| Intelligent | Intelligent mode is **recommended** and uses Branch data to safely use URI schemes everywhere, with the slight risk of error messages in certain browsers if the app is uninstalled. |
| Aggressive | Aggressive forces URI schemes everywhere, causing users without the app to see error messages in some browsers. |

## Redirect allowlist

With Branch, you have the ability to set a specific allowlist of domains that you can allow your Branch Links to redirect to (set to disabled by default). With the Redirect Allowlist, you can limit Branch Link redirection to specific web domains or URI schemes across your Branch platform. List each of the domains you want to limit redirection to. We also support a “\*” for wildcard subdomains.



For example, if your allowlist includes `branch.io`, `*.branch.io`, and `myapp://`, your deep links can only redirect to domains like `branch.io`, `dashboard.branch.io`, or `myapp://`.

It is recommended that you include the app store domains that are relevant to the way users download your app. For example: `play.google.com` and `apps.apple.com` .

## Match type

Setting Match Type determines the matching methodology Branch uses for your Links and App. Selecting **Unique** means that Branch only makes a deep link through install match if there is a single, unique outstanding footprint. For example, if you and your twin both have iPhone 5s with the same OS/version, etc, and select different links for the same app, then open the app up at the same time, we won’t deep link when Unique is selected. You probably don’t want this as it’s mostly for very special circumstances.

## Local currency

::: danger Warning
Please note that in the **legacy** Branch experience, local currency settings are found under Configure → App Settings → General, as detailed here.

However in the **new** version of Branch, currency settings live under Configuration → [General](general-page.md).
:::

Set the local currency in Branch if it is not USD. By setting your local currency, you can analyze marketing spend (cost) and revenue in your local currency. This also allows direct cost data comparison with ad partners who report their spending in a currency other than USD.



A field called **Local Currency** is available in Branch showing the currency configured in your [Ads Analytics](paid-ads-analytics.md) and [Unified Analytics](unified-analytics.md).

Note: The currency can only be set once through Branch to avoid some potential issues:  
Historical data does not switch to the new local currency but would be labeled as such. As a result, the data prior to the currency change may show as inaccurate.  
When changing the currency type, your cost data for the previous seven days is updated and may cause inaccuracies.

## Other settings

| Setting | Default | Description |
| --- | --- | --- |
| Use UTM tags for analytics (for [Long Links](creating-a-deep-link.md#long-links)) | Disabled | If enabled, Branch will automatically set channel, feature, campaign, tags, and keywords based on UTM parameters. This only applies to Long Links, not links generated through Branch, the API, or SDKs. |
| Analytics mapping with UTM | Enabled | When redirecting to a web URL, Branch automatically passes through any values from the following Branch Link analytics tags as UTM parameters [~campaign -> utm\_campaign, ~channel -> utm\_source, ~feature -> utm\_medium]. If these UTM parameters are already detected on the URLs being redirected to, Branch will not overwrite them. |
| Enable Link Scraping | Disabled | This setting controls whether Branch scrapes the original web URL for Open Graph (OG) meta tags at the time of the click.   - **Applies to**: Dynamic links and third-party links (for example, Email or Ads). - **Does not apply to**: Standard Short Links created in Branch or through the API (these are scraped immediately upon creation).   
::: info Note
Enabling this ensures social link previews (for example, for iMessage or Slack) populate correctly for dynamic content. To minimize traffic to your servers, scrape results are cached for 24 hours.
:::
 |
| Enable retrieving Last Attributed Touch Data via SDKs | Disabled | Allows the SDK to request the last known attribution data after the initial launch event. Use this to implement post-onboarding or deferred deep linking. It lets you retrieve routing data after a user signs up or signs in, rather than having to manually cache the data from the app's first open. |
| Enable China Features | Disabled | China Features include the ability to collect IMEI on non-Google Android devices. |

## Best practices

For changing the Link Domain for both of your LIVE and TEST Branch apps, the best practice is to change your LIVE app first and then add *test* somewhere in the new domain name for the TEST app.

Also please note that the **LIVE and TEST apps cannot use the same customized Link Domain**. For example, the LIVE app of *Branch Monster Factory* uses `monster-factory.app.link` for its LIVE app and `monster-factory.test-app.link` for its TEST app.
---
title: "Facebook Ads FAQ"
slug: facebook-ads-faq
---

The most frequently asked questions about Facebook ads.

<details>
<summary>What is Facebook MMP?</summary>

The acronym MMP is used to mean either the broad category of Facebook Mobile Marketing Partners, or more narrowly to mean Mobile Measurement Partners. The latter is a special subset of Facebook partners that have access to device-level attribution data. Branch has been vetted by Facebook and joined this group of partners in order to provide both granular analytics and true cross-channel reporting. We help you measure which installs, opens and conversion events should be attributed to Facebook ad campaigns versus other marketing efforts.

</details>

<details>
<summary>How does Branch attribute events to Facebook ads?</summary>

Facebook is a self-attributing network. This means that Facebook claims credit for installs and other events. This differs from some ad networks, which send a stream of impressions and clicks that Branch then matches to events. Branch then compares these claims against other ad networks, as well as traffic coming from email, your website, and other sources, choosing the most recent click to get credit.

The Branch SDK already helps you track installs and other events. When you enable the Facebook MMP integration, Branch sends events and advertising IDs to Facebook. Facebook then reports whether devices previously viewed or clicked a Facebook ad, including helpful information such as campaign, ad set, and ad. As stated above, Branch then dedupes these claims against other claims for attribution.

</details>

<details>
<summary>Do I need the Facebook SDK in order for Branch to attribute installs, opens, and other events back to Facebook?</summary>

No, the Branch SDK collects adequate information in order to attribute events back to Facebook ads.

</details>

<details>
<summary>How can I use deep links in Facebook ads?</summary>

Make sure you [set up the integration with Facebook MMP](https://help.branch.io/v1/docs/facebook-app-install-ads#enable-facebook-as-an-ad-partner-for-measurement) in Branch. Then navigate to the [Facebook page under Partner management](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings) and select **Create Facebook Link**.

Longer instructions can be found in the guides linked to from the [Facebook overview](https://help.branch.io/v1/docs/facebook-ads-overview) page. For example, see [this section of the App Installs guide](https://help.branch.io/v1/docs/facebook-app-install-ads#create-an-ad-link-for-deep-linking).

</details>

<details>
<summary>How can I attribute conversion events to Facebook ads?</summary>

First, make sure you have [set up the integration with Facebook MMP](https://help.branch.io/v1/docs/facebook-app-install-ads#enable-facebook-as-an-ad-partner-for-measurement) in Branch. Second, [set up tracking for Standard Events](https://help.branch.io/developers-hub/docs/track-branch-events#standard-events). We will automatically attribute events to Facebook ads.

Facebook will not accept custom event names over 40 characters or those that start with a hyphen, and will only accept letters, numbers, hyphens, spaces, and underscores. Branch will automatically truncate event names over 40 characters and may further sanitize your event names to help ensure they pass validation. For example:

- **Event name entered**: This & Is & A \* Bad Event That's So SO SOOOOOO Long
- **Sanitized by Branch to**: This Is A  *Bad Event That*s So SO S

There are advanced options for tracking events, which you can read more about [here](https://help.branch.io/v1/docs/facebook-faq-and-advanced-options#facebook-mmp-event-options).

</details>

<details>
<summary>What are the permissions you ask for as part of the onboarding process, and why?</summary>

| Permissions (OAuth scopes) | Why |
| --- | --- |
| `ads_read` | Pulling marketing insights data (e.g. impressions, clicks, cost) to present in Branch.    Also used for pulling creative name and id, etc., to provide richer analytics for installs, opens and other events. |
| `ads_management` | Required to upload/create audiences. |

</details>

<details>
<summary>What is each piece of information needed during the onboarding process, and why?</summary>

| Identifier | Why |
| --- | --- |
| Ad account | Pulling marketing insights data (e.g. impressions, clicks, cost) to present on the Branch Dashboard. |
| Facebook App ID | Sending installs, opens and other events to Facebook in order to see whether they were driven by a Facebook ad campaign. |
| Facebook App Secret (Optional) | Used to create an app access token for deferred deep linking. The secret is not stored anywhere. |

</details>

<details>
<summary>Why can’t I see the ad account I want to use?</summary>

Please try logging out and logging back in on Facebook. Note the email address that you use. If you still do not see ad accounts, please visit [business.facebook.com](http://business.facebook.com) and ensure that you use the same email address / Facebook account.

</details>

<details>
<summary>Does Branch provide view-through (impression) attribution for Facebook?</summary>

Branch is able to provide device-level view-through attribution for installs only, for up to 24 hours from impression to install. This is what is available via the MMP API that Facebook has exposed. It's also possible that if other app events (such as opens) occur shortly after an install, we can attribute those back to the same impression/view.

Facebook does not allow us to use impression trackers. Facebook will only provide impression data for certain app events via MMP API. Thus, we will not be able to track the large majority of web conversions attributed to a Facebook impression. This is specifically not allowed by Facebook. There unfortunately aren't any workarounds to this.

</details>

<details>
<summary>Why is Facebook no longer enabled?</summary>

We've hidden the old Facebook setup flow. Please choose "Connect with Facebook" and follow the guide to [set up the integration with Facebook MMP](https://help.branch.io/v1/docs/facebook-app-install-ads#enable-facebook-as-an-ad-partner-for-measurement).

</details>

<details>
<summary>What happens to campaigns in which I'm using deep links?</summary>

We still highly recommend you use links in ads. [Studies have shown](https://branch.io/resources/#case-studies) that when you deep link your users, they have a better experience and retention is higher.

When you put a Branch link in a Facebook ad, we still return this link to your app, so that users can be deep linked. Deep linking functions exactly as it did before.

</details>

<details>
<summary>Do I need to remove deep links from my Facebook ads?</summary>

No. We recommend you use deep links in your Facebook ads.

</details>

<details>
<summary>Does this new Facebook MMP functionality cover web campaigns?</summary>

Generally, no. Facebook MMP allows us to measure Facebook app install and app engagement ads. However, in some cases, we are able to attribute web events that occur after an app install/engagement ad back to that ad. This is because we can link together web and app user identifiers as part of our People-Based Attribution product.

</details>

<details>
<summary>Why does the data on Facebook and the data on Branch not line up?</summary>

Please see [Sources of Discrepancies between Facebook and Branch](https://help.branch.io/faq/docs/sources-of-discrepancies-between-facebook-and-branch).

</details>

<details>
<summary>How can I change the authentication user ID for Facebook/Google Ads integration on Branch?</summary>

To change the user authentication access for Facebook/Google ads in Branch:

1. Re-authenticate the integration from your Branch dashboard via the account you want the access for.
2. If the changes are not reflected, disable and re-enable the integration which would require inserting the initial details required.

</details>

<details>
<summary>When I change a campaign name on Facebook, will that apply in Branch immediately or when an engagement on the ad starts?</summary>

After changing the campaign name on Facebook, all new conversions from that campaign will get reflected under the new campaign name in Branch. However, any previously recorded conversions from the same campaign would still show under the old campaign name.

</details>

### Advanced options FAQs

<details>
<summary>What are the Facebook MMP event options?</summary>

Branch + Facebook MMP allows you to attribute events back to your Facebook ad campaigns. Branch sends events to Facebook, along with metadata including advertising ID. Facebook then returns info on the ad that the user last viewed or clicked, if any. Branch then surfaces this on our Dashboard, and conditionally\* makes this data available in our [Data Feeds](https://help.branch.io/v1/docs/data-feeds-overview) product.

Partners have several options when it comes to sending events to Facebook.

You must have signed the [Data Use Terms for Advanced Mobile App Measurement](https://www.facebook.com/ads/manage/advanced_mobile_measurement/app_based_tos/).

</details>

<details>
<summary>How do I track installs with Facebook?</summary>

Branch sends all installs to Facebook. Facebook de-duplicates installs on their end. If you have the Facebook SDK and/or another MMP, these also send installs to Facebook's backend. This will not result in duplicate installs, since Facebook de-dupes them.

</details>

<details>
<summary>How can I track reinstalls and opens with Facebook?</summary>

Facebook does not de-duplicate custom app events on their backend. So if you have the Facebook SDK integrated or another MMP tracking app opens, choose the first option below.

When tracking reinstalls and opens, you have three options:

1. *use Branch name (branch\_open)*: This allows us to get attribution data from Facebook, but without it counting as an app open. Use this option if you have the Facebook SDK integrated or are testing with another MMP. Since the Facebook SDK or other MMP is already sending fb\_mobile\_activate\_app, you do not want Branch to send this a second time. (Default)
2. *use Facebook name (fb\_mobile\_activate\_app)*: Branch will send the exact event used by Facebook for tracking app opens. Use this option if you do not have the Facebook SDK and you are not tracking opens with another MMP, and you would like Branch to help Facebook record opens.
3. *disable*: Use this option if you do not want Branch attributing opens at all. In some cases, we may still be able to attribute opens based on previously retrieved attribution data from Facebook. But we will not send any opens to Facebook in order to get attribution data back.

</details>

<details>
<summary>How do I track other conversion events with Facebook?</summary>

Facebook does not de-duplicate custom app events on their backend. If you are tracking conversion events with the Facebook SDK or another MMP, choose option 1 below.

It's possible to track app events using only Branch. You can [track the events](https://help.branch.io/developers-hub/docs/track-branch-events) with Branch once, and then we send them to Facebook as well as other analytics systems. Use the [v2/event logging methods outlined here](https://help.branch.io/v1/docs/facebook-faq-and-advanced-options).

When tracking add to cart, purchase, and other Facebook app events, you have 3 options:

1. **use Branch name**: This allows us to get attribution data from Facebook, but without it counting as a purchase, add to cart, etc. Use this option if you have the Facebook SDK integrated or are testing with another MMP, and you already track app events via one of those two methods. Since the Facebook SDK or other MMP is already sending events to Facebook, you do not want Branch to send these a second time. (Default)
2. **use Facebook name**: Branch will send the exact event used by Facebook for tracking app events. Use this option if you are not already tracking app events with the Facebook SDK or another MMP, and you would like Branch to help Facebook record these events.
3. **disable**: Use this option if you do not want Branch attributing these conversion events. In some cases, we may still be able to attribute these conversion events based on previously retrieved attribution data from Facebook. But we will not send any conversion events to Facebook in order to get attribution data back.

</details>

<details>
<summary>How do I track custom events with Facebook?</summary>

In addition to tracking installs and Facebook app events (see [Tracking other conversion events](track-custom-events-with-facebook.md) above), you can also have Branch attribute custom events. To do so, we must send those events to Facebook.

When tracking custom events that have no equivalent [Facebook App Event](track-other-conversion-events-with-facebook.md), you have 2 options:

1. *enable*: Branch will send custom events to Facebook. this allows us to get attribution data from Facebook. (default)
2. *disable*: Use this option if you do not want Branch attributing custom events. In some cases, we may still be able to attribute these custom events based on previously retrieved attribution data from Facebook. But we will not send any custom events to Facebook in order to get attribution data back.

</details>

<details>
<summary>How do I migrate from the existing Facebook integration to MMP?</summary>

You can no longer see the previous Facebook onboarding flow that required you to copy-paste your Facebook app secret. Please use the **Authenticate with Facebook** option instead.

If you have been using our integration with Facebook prior to February 14, 2018, then we highly recommend that you upgrade to our new integration that includes MMP.

We are now certified by Facebook as a Mobile Measurement Partner! Branch can now help you attribute installs, opens, and conversion events to Facebook like never before.

This integration includes full support for Facebook, Instagram, and the Audience Network. We also automatically pull in impressions and clicks from Facebook and surface those alongside your clicks on Branch Links. The deep linking experience your users love is still supported.

Instructions on how to get set up with Facebook MMP are [here](facebook-app-install-ads.md#enable-facebook-as-an-ad-partner-for-measurement). Note that this will replace your existing credentials on our backend. Instead of copy-pasting your Facebook app secret into the Branch Dashboard, you can now simply click through the normal Facebook login flow.

Branch will now automatically surface Facebook campaign, ad set, and ad information on the Branch Dashboard's visualizations! This isn't limited to [Ads Analytics](https://dashboard.branch.io/ads/analytics) -- it also includes cross-channel analytics such as [Source Analytics](https://dashboard.branch.io/sources).

</details>

<details>
<summary>What are the sources of discrepancies between Facebook and Branch?</summary>

When using Branch as your Facebook MMP, you may notice some data discrepancies between the Branch dashboard and the Facebook dashboard if not configured correctly. We have highlighted several sources of discrepancies if they are present after you have onboarded with Facebook on the Branch dashboard.

There are many reasons why you may see different numbers on Facebook and Branch. Please note that we have one system for tracking impressions and clicks (via the Facebook Insights API) and a different system for tracking installs, reinstalls, opens and conversion events (via a private Facebook API). When trying to figure out differences, it's best to pick one event at a time (e.g. clicks or installs) and focus on causes of discrepancies there.

The first two sections below covers common causes of discrepancies: attribution windows and timezones. The following sections then provide more steps on diagnosing and troubleshooting specific problems.

- [Attribution Windows and Facebook](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=What%20are%20the%20Facebook%20attribution%20windows%3F)
- [Timezones and Facebook](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=How%20do%20I%20handle%20Facebook%20timezones%20with%20Branch%3F)

##### Other common issues

- [Issue with iOS 10+ and Limit Ad Tracking](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=Why%20did%20I%20run%20into%20an%20issue%20with%20iOS%2010%2B%20and%20Limit%20Ad%20Tracking%3F)
- [Facebook campaigns attributing to deep links](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=How%20do%20I%20attribute%20Facebook%20campaigns%20to%20deep%20links%3F)
- [Installs Counted as Reinstalls, Opens on Branch](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=Why%20are%20installs%20counted%20as%20reinstalls%20and%20opens%20in%20Branch%3F)
- [Don't Use](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=Why%20shouldn%E2%80%99t%20I%20use%20%E2%80%98setDebug%E2%80%99%20with%20Facebook%3F) `setDebug`
- [Renaming campaigns, ad sets, and ads](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=How%20do%20I%20rename%20campaigns%2C%20ads%20sets%2C%20and%20ads%3F)
- [Discrepancies with Impressions and Clicks](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=How%20do%20I%20handle%20discrepancies%20with%20impressions%20and%20clicks%20with%20Facebook%3F)
- [Discrepancies with Installs, Opens and Conversion Events](https://help.branch.io/marketer-hub/docs/facebook-ads-faq#:~:text=How%20do%20I%20handle%20discrepancies%20with%20installs%2C%20opens%2C%20and%20conversion%20events%20with%20Facebook%3F)

</details>

<details>
<summary>What are the Facebook attribution windows?</summary>

##### Attribution Windows and Facebook

An attribution window is the maximum amount of time between an initial action (click or impression) and a conversion event (install or open) for which you attribute that conversion event as occurring *because of* that initial action.

Example with 3 day view attribution window: If a user views your ad and 2 days later installs your app, that install would be attributed to that ad view. However if the user views your ad and 4 days later installs the app, that install would be considered an organic install and would NOT be attributed to that ad view. You can read more in our documentation [here](branch-attribution-logic-settings.md#attribution-settings).

If one of your attribution windows on the Branch dashboard is different than the corresponding window on the Facebook dashboard, the data between the two will not align. You can mitigate this by changing one of more of your attribution windows on the Branch dashboard, or changing your Facebook dashboard for the given ad account.

There are four Branch attribution windows, and two Facebook attribution windows. This chart shows which Facebook window name each Branch window name corresponds to:

| Branch window name | Facebook window name |
| --- | --- |
| Click to install | Click Window |
| Click to session start | Click Window |
| Click to conversion event | Click Window |
| Impression to install | View Window |
| Impression to session start | View Window |
| Impression to conversion event | View Window |

*Change your Facebook attribution windows*

In order to update your Facebook Attribution window for a particular ad account, you can go to <https://business.facebook.com/ads/manager/account_settings/information>. Choose the account in the dropdown in the upper-left corner. As long as you're an admin on that account, you should see a section 'Attribution' at the top-right, and an ability to edit the Click or View window or both.

*Change your Branch attribution windows*

Alternatively or in addition, you could update any of your four Branch attribution windows. To do so go to the [Link Settings](https://dashboard.branch.io/link-settings) section of the Branch dashboard, and scroll down to the 'Attribution Windows' section and expand it. Alter any of the four windows listed in the chart above to match the corresponding Facebook window, and then save at the bottom of the page.

*Reporting based on time of impression or time of conversion*

Facebook and Branch may report the same install as occurring on different days, if the impression is on one day but the install is on another day.

Background:

Facebook by defaults reports installs based on the day that the impression occurred. They also allow you to see reports based on the day that the install occurred.

Branch always reports installs based on the date of install, never the date of impression.

Let's illustrate this with a scenario:

User views an ad on April 1, clicks it, then installs the app on April 2.

By default, Facebook reports the install as occurring on April 1. However, when pulling data from the insights API, you can specify option action\_report\_time=conversion. This causes Facebook to report that the install occurred on April 2.

Branch will always report the install as having occurred on April 2.

</details>

<details>
<summary>How do I handle Facebook timezones with Branch?</summary>

Please make sure the timezone is the same for your Facebook ad account and your Branch account.

You can see the timezone used by your Branch account [here](https://dashboard.branch.io/account-settings/app).

You can see the timezone used by your Facebook ad account [here](https://www.facebook.com/ads/manager/account_settings/information/). If you are using multiple ad accounts with Branch, be sure to align the timezones of each of them.

If you are unable to align all timezones, you may notice some data on the Branch Dashboard does not line up exactly with data on the Facebook Dashboard. However, data will not be lost, but merely shifted between days. Summing figures over longer periods of time should greatly diminish the effect of having inconsistent time zones.

</details>

<details>
<summary>Why did I run into an issue with iOS 10+ and Limit Ad Tracking?</summary>

In iOS 10, Apple broke the ability for app developers to collect the `IDFA` if the user had enabled `Limit Ad Tracking`. In this case, Branch and Facebook cannot compare notes to see who drove the install. This will account for about 15% discrepancy in counts across both platforms, where Branch's tracked installs will be lower.

</details>

<details>
<summary>Why don’t I see installs attributed to ad partners like Facebook and Google when recording Android and iOS installs?</summary>

For deterministic attribution with a 100% match guarantee, device identifiers (AAID and IDFA) are a must.

If you see absolutely 0 install data coming through from your ad-partner integration, it's possible that you're not collecting Google Advertising ID (GAID/AAID) on Android or IDFA on iOS.

- iOS: Add the AdSupport.framework.
- Android: Add Google Play Services so that we can collect GAID.

</details>

<details>
<summary>How do I attribute Facebook campaigns to deep links?</summary>

Facebook has a dedicated endpoint for deep linking in app install campaign types that is not used for attribution. Branch will not attribute to links received from that endpoint, and instead, uses the official MMP endpoint for attribution. However, we've seen that some Facebook ad formats, including Video Ads and Re-engagement Ads, do trigger true link clicks and therefore can cause attribution conflicts.

To use links for deep linking without attributing to the link, please append `%24deeplink_no_attribution=true` to the link. If this parameter is used, then Branch will not attribute to that link and will instead use the MMP response in all cases.

</details>

<details>
<summary>Why are installs counted as reinstalls and opens in Branch?</summary>

One discrepancy root cause we've seen before is the scenario where Branch will classify an install as a reinstall or open. We remember the history of a particular user via their IDFA or Google Advertising ID (in addition to using a few other methods) and will detect whether the user is actually a new user or a returning user who had previously uninstalled your app. Facebook has a different mechanism that is limited to 180 days. Branch in some cases has detected reinstalls that occurred more than a year later.

</details>

<details>
<summary>Why shouldn’t I use ‘setDebug’ with Facebook?</summary>

Facebook ads are incompatible with [debug mode](ios-testing.md#simulate-an-install), as this prevents us from sending the correct hardware ID to Facebook.

Please make sure the debug method is not included in your production app OR set to false - `Branch.setDebug(false)` - as doing so still enables debug mode.

</details>

<details>
<summary>How do I rename campaigns, ads sets, and ads?</summary>

If you rename a campaign, ad set, ad, or creative on the Facebook dashboard, then it can result in weird discrepancies between Branch and Facebook. If you change the campaign name, for example, Branch will nearly immediately start tracking all new installs (and other events) using the new campaign name. However, we will not reclassify existing events as having the new campaign name.

Rest assured, however, that we are treating the data properly. Though we do not expose it on our Dashboard as of early 2018, we also track data by campaign id, ad set id, ad id, and creative id. These do not change with a rename. You can view this data using and of our [Data Feeds](https://help.branch.io/v1/docs/data-feeds-overview) products.

</details>

<details>
<summary>How do I handle discrepancies with impressions and clicks with Facebook?</summary>

Please be aware that Branch receives **Link Clicks** from Facebook via API. This click count differs from the click count found in Facebook which includes other sources of clicks.

#### 1. I don't see any clicks or installs on the Branch Dashboard

First, be sure you've set up the Facebook integration! Work through [these steps](facebook-app-install-ads.md#enable-facebook-as-an-ad-partner-for-measurement) and ensure you reach the bottom. You should have at least one ad account enabled, and a Facebook app id listed.

Second, make sure you're running ads that are resulting in installs, reinstalls, or opens. Once you see installs, you should shortly start seeing clicks. For more, see the next FAQ item.

If you're unable to see installs, reinstalls, or opens on the Branch Dashboard, skip down to the section below: [I don't see any installs, reinstalls or opens on the Branch Dashboard](facebook-faq-and-advanced-options.md#1-i-dont-see-any-clicks-or-installs-on-the-branch-dashboard).

#### 2. I see installs on the Facebook Dashboard, but no clicks

Branch will only show impressions and clicks for campaigns that have installs, reinstalls, or opens. If you have campaigns that have not resulted in these app-based outcomes, we will hide them. This is to prevent massively inflating analytics on the Branch Dashboard with data that is not relevant.

If you turned on the integration within the last hour, then you may need to refresh the Branch Dashboard to see clicks. We automatically start a background job to pull in impressions and clicks from Facebook the first time you visit the [Ads Analytics](https://dashboard.branch.io/ads/analytics) page after enabling Facebook.

#### 3. I see clicks on the Branch Dashboard, but the numbers look different from what I see on the Facebook Dashboard.

*If you are looking at impressions/clicks for the current day:*

If the numbers line up pretty closely between Branch and Facebook, then it's possible the Facebook numbers are slightly more recent. The Facebook Insights API refreshes every 15 minutes. Branch tries to pull updated numbers as often as possible.

If the numbers do not line up closely, but you recently started a new campaign, it may be that Branch has not yet pulled in data for that campaign. The numbers should line up much more closely within an hour.

*If you are looking at impressions/clicks for a past day:*

When you initially enable the Facebook integration, then visit the [Ads Analytics](https://dashboard.branch.io/ads/analytics) page, Branch will start fetching impressions and clicks for the most recent several days. If you go back beyond 7 days, we may not have impressions and click data.

</details>

<details>
<summary>How do I handle discrepancies with installs, opens, and conversion events with Facebook?</summary>

#### 1. I don't see any installs, reinstalls or opens on the Branch Dashboard

First, be sure you've set up the Facebook integration! Work through [these steps](https://help.branch.io/using-branch/docs/facebook-app-install-ads#setup) and ensure you reach the bottom. You should have at least one ad account enabled, and a Facebook app id listed.

Second, make sure you're running ads that are resulting in installs, reinstalls, or opens.

Third, on the Facebook Dashboard, locate a campaign with installs, reinstalls, or opens. Determine the ad account id for which you are running an app campaign. Then navigate to the [Facebook page under Partner Management](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings) and make sure that ad account id is listed as part of the completed signup process.

Fourth, make sure you have installs, reinstalls, or opens that have occurred after you enabled the Branch + Facebook integration. We cannot pull historical device-level data, as that's not how the Facebook APIs are architected. You should enable Branch + Facebook, wait for new installs to occur, then check the [Ads Analytics](https://dashboard.branch.io/ads/analytics) page.

#### 2. I see installs, reinstalls or opens on the Branch Dashboard, but the numbers look different from what I see on the Facebook Dashboard

If you've made it this far, the integration between Branch + Facebook is at least somewhat functional! Time to identify why numbers are not lining up.

Try comparing (1) just installs, and (2) just for one campaign. On the Branch [Ads Analytics](https://dashboard.branch.io/ads/analytics) page, you can view data for just one campaign by choosing "Add Filter", selecting "campaign" from the first dropdown, and the individual campaign name from the second dropdown. Again, try to get numbers to line up between Facebook and Branch just for installs on one campaign.

First, make sure the attribution windows line up between Facebook and Branch. You can read more on this [above](facebook-faq-and-advanced-options.md#section-attribution-windows).

Second, make sure the timezones line up between Facebook and Branch. You can read more on this [above](facebook-faq-and-advanced-options.md#section-timezones).

Note that attribution windows are not applied to events that occurred in the past. So if you have a 30-day attribution window for click-to-install on Branch, and a 7-day window for clicks on Facebook, once you change the Branch click-to-install attribution window to 7 days, it will not automatically update historical numbers. Instead, you'll need to wait for new installs to occur under the stricter 7-day Branch click-to-install attribution window. The next day you should be able to come back and look at just the current day's install numbers, and they should line up more closely.

In some rare cases, we've seen partners running multiple Facebook campaigns with the same name. In this case, the Branch Dashboard will combine stats for all of these campaigns under the same name. We still retain this data separately on our backend, as there are different Facebook campaign ids. While we do not expose this on the Branch Dashboard, you can pull statistics by campaign id via the [Query API](query-api.md).

#### 3. I don't see any conversion events on the Branch Dashboard

Be sure you are tracking v2/events - [learn more from our v2/event docs](track-branch-events.md).

Be sure you are opting to send conversion events to Facebook - learn more from the section [Facebook MMP event options](facebook-faq-and-advanced-options.md#section-facebook-mmp-event-options) above.

Be reasonably confident that users coming from Facebook ads are completing conversion events. If you have, for example, only a small percentage of users completing purchases, and only a small percentage of users downloading your app from Facebook, it's possible that there is no overlap between users making purchases and users coming from Facebook.

#### 4. I see conversion events on the Branch Dashboard, but the numbers look different from what I see on the Facebook Dashboard

We have not encountered any issues here so far. Please see [I see installs, reinstalls or opens on the Branch Dashboard, but the numbers look different from what I see on the Facebook Dashboard](facebook-faq-and-advanced-options.md#section-1-i-dont-see-any-installs-reinstalls-or-opens-on-the-branch-dashboard) for steps to follow, and for information to send to us if we need to debug together.

**No IP Allowlists**

Because Branch has a large distribution of API servers that will be making requests to Facebook on behalf of your app, you cannot have an IP allowlist in your [Facebook advanced settings](https://developers.facebook.com/apps/390736167768543/settings/advanced/) and still have this integration work. Please remove any IPs from this setting if they are present.

</details>

<details>
<summary>How do I configure deep linking on my Instagram bio?</summary>

Instagram's app has its own built-in web view and does not support Universal Links with deep linking.

To work around this limitation, links must have deepviews or something similar enabled with a call-to-action link/button that has a Universal Link behind it.

This way, clicking a link from the app feed will open a webview containing the deepview page, and the user can then click the link/button to launch the app.

</details>

<details>
<summary>How do I attribute mobile app events to non-mobile ad objectives?</summary>

If you would like to set up a campaign that is **not** for app installs, traffic, or conversions but you would still like to capture app events, please follow the steps below:

1. Log in to your Meta advertiser account.
2. Navigate to the [Ads Manager](https://www.facebook.com/business/tools/ads-manager).
3. Click **Create Campaign**.
4. Continue through setup. On the **Adverts** tab, make sure the **App events** checkbox is selected and your app is properly linked.

   

</details>
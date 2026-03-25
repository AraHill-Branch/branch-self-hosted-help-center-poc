---
title: "Facebook & iOS 14 FAQ"
slug: facebook-ios-faq
---

<details>
<summary>What are Facebook’s plans for iOS 14 changes?</summary>

For the latest on Facebook's iOS 14 plans, please see [this page](facebook-ios-14.md).

</details>

<details>
<summary>Does Facebook require a separate ad account for iOS 14 campaigns?</summary>

No, a separate ad account is not required for iOS 14 campaigns on Facebook. Facebook initially communicated that a separate account would be required for iOS 14 campaigns, but later reversed this guidance.

</details>

<details>
<summary>Will Facebook pass SKAdNetwork data back to MMPs (including Branch)?</summary>

Facebook will not be forwarding individual SKAdNetwork Postbacks to MMPs. However, aggregate SKAN data will be passed back via Facebook’s Ads Insights API. See [What is the difference between networks forwarding individual SKAN postbacks to Branch, rather than providing data via an API? Is one option better?](what-is-the-difference-between-networks-forwarding-individual-skan-postbacks-to-branch-rather-than-providing-data-via-an-api-is-one-option-better.md) and [Is Facebook planning to share SKAN conversion values with MMPs?](is-facebook-planning-to-share-skan-conversion-values-with-mmps.md) for more details.

Facebook has recently provided a spec to MMPs (including Branch) for pulling this data, and more details about that integration can be found in our FAQ here: [https://help.branch.io/faq/docs/how-do-we-set-up-the-facebook-skan-integration-with-branch](how-do-we-set-up-the-facebook-skan-integration-with-branch.md).

</details>

<details>
<summary>Can Branch Links still be used in Facebook web campaigns?</summary>

If an advertiser is running a web-based Facebook campaign using a Branch tracking link, we believe this should remain unaffected (provided that the advertiser app receives user opt-in via the ATT framework for any in-app measurement).

</details>

<details>
<summary>We have the Facebook SDK and Facebook is saying that we should use their SDK to make the SKAdNetwork calls. Is this required?</summary>

No. While the Facebook SDK is one option advertisers can use to implement the SKAN methods necessary for Facebook's iOS 14 campaign measurement, apps can continue to use another third party (including the Branch SDK) for that functionality.

In particular, you should only use one method to call update conversion value, as making dual calls can get messy. While Facebook [offers functionality within the Facebook Events Manager](https://www.facebook.com/business/help/670955636925518) to map conversion value events, Branch provides equivalent functionality via an API endpoint that advertisers provide to Facebook for syncing a Conversion Bit Schema, with the advantage that the mapping from Branch can easily be used by networks aside from Facebook.

</details>

<details>
<summary>We have both Facebook and Branch SDKs integrated. Which should we use for SKAdNetwork?</summary>

If you work with multiple ad networks, we would recommend using the Branch SDK for the SKAdNetwork calls. To read more about the issues with using multiple methods to integrate SKAdNetwork, read this FAQ item: [What happens if the advertiser app integrates multiple SDKs that all support SKAdNetwork?](what-happens-if-the-advertiser-app-integrates-multiple-sdks-that-all-support-skadnetwork.md)

While you can use the Facebook SDK, or any other SDK that supports SKAdNetwork, doing so would mean you won’t be able to configure the conversion values in Branch, and therefore Branch won’t be able to decode the Postbacks for other ad partners for you. Though the postbacks themselves will still be available to all networks, this means that Branch won’t be able to tell other ad partners that conversion value 15=sign up event, for example. Instead, other ad partners will just receive the conversion value itself.

In other words, while Facebook [offers functionality within the Facebook Events Manager](https://www.facebook.com/business/help/670955636925518) to map SKAN events to conversion values, Branch provides equivalent functionality via an API endpoint that advertisers provide to Facebook for syncing a Conversion Bit Schema, with the advantage that the mapping from Branch can easily be used by networks aside from Facebook.

The SKAdNetwork calls themselves can be handled via Facebook SDK, any other SDK that supports it, the Branch SDK, or even natively, but using Branch to make these calls simplifies the process for all ad networks that you run campaigns with, rather than just one.

</details>

<details>
<summary>Why does Facebook recommend not updating SKAdNetwork conversion-values after 24 hours?</summary>

Facebook has informed MMPs that they don’t want to have any calls to `updateConversionValue()` beyond 24 hours post-install. This is because Facebook's ads delivery system assumes the SKAdNetwork postback will arrive no later 3 days after the ad is shown, and they prefer to get as much information from day 1 as opposed to extending the timer.

While this is an *optional* best practice and comes with obvious tradeoffs, you may want to take it into account when designing your conversion-value strategy if Facebook campaigns are a primary source for you.

Beginning with iOS SDK v1.39.0, we have updated our SDK defaults to reflect this 24-hour window. If you would like to customize the SDK's conversion value timeout, you can read more here: [How do I change the Branch SDK's default conversion-value update window?](how-do-i-change-the-branch-sdks-default-conversion-value-update-window.md)

</details>

<details>
<summary>Will Facebook show the ATT prompt and provide device-level data for users that opt in?</summary>

Facebook will show the AppTrackingTransparency prompt (this is a change from their initial stance in 2020), and their existing MMP API endpoint will continue to return device-level data *in addition* to SKAdNetwork if the user opts in on both ends.

</details>

<details>
<summary>What event names will Facebook receive from Branch via the Conversion Bit Schema API?</summary>

Branch will provide the event mapped in Event Config under Partner Management. This means there are two mappings in play:

1. The Branch event → SKAdNetwork conversion value mapping provided in the SKAdNetwork configuration tool.
2. The Branch event → Facebook event name mapping provided in Event Config under Partner Management.

For example, if the Branch event `PURCHASE` is mapped to SKAN conversion value `10` and to `fb_mobile_purchase` in the Branch dashboard, we will provide a mapping of `conversion-value 10 → fb_mobile_purchase` to Facebook via the Conversion Bit Schema API.

</details>

<details>
<summary>Does a user have to opt in to ATT via both the Facebook and Instagram apps?</summary>

Facebook has communicated that for a user to be considered opted-in for device level ad data, the user must opt in to ATT on both Facebook and Instagram (if both are installed on the device).

This means if the user has both the Facebook and Instagram apps installed, and opts in via ATT with the Facebook app, but not the Instagram app, Facebook will consider that user opted out, and will not respond to device-level conversion requests via the MMP API endpoint.

</details>

<details>
<summary>What changes is Facebook making to web campaign measurement?</summary>

In addition to the changes Facebook is implementing for app install campaigns on iOS 14, they have also [announced updates for their web campaign measurement](https://developers.facebook.com/blog/post/2020/12/16/preparing-partners-ios-14-mobile-web-advertising) (specifically, ads shown in the Facebook mobile app on iOS 14 that lead to a website).

While we don't currently believe Facebook's web campaigns changes will impact a typical advertiser's use of Branch (see [Can Branch links still be used in Facebook web campaigns?](can-branch-links-still-be-used-in-facebook-web-campaigns.md) and [Will Branch support PCM or AEM?](will-branch-support-pcm-or-aem.md) for more details), we recognize that many customers also use Facebook for web campaigns outside of Branch. To help, we're sharing some of the information we've seen:

[*Collected from a Facebook communication shared on Twitter*](https://twitter.com/danielpearson/status/1364384307867885572?s=20)

**What we know:**

- This is an industry-wide shift for the digital advertising ecosystem though different companies are approaching it differently
- Facebook will be adopting Apple's prompt as we have no real choice but to
- We will be issuing a pre-prompt notification and are currently in public testing here
- Opt out users will go through FB's AEM (Aggregated Event Measurement). The data we receive will be different for opt-out versus other users but for consistency many features will be impacted across the board, outlining some of the big ones:

  - Attribution will change, since for opt out users Apple is provide data that is restricted, delayed, and aggregated; 28-click, 28-day view, and 7-day view attribution will no longer be available
  - Historical data for these windows will still be available but through the Ads Insights API
  - AEM only supports 1-day click attribution window currently.
  - 1-day click data will be modeled to estimate conversions from iOS users; Landing Page View will also use statistical modeling
  - 7-day click and 1-day view data will be partial and not be modeled at this time
- Conversion events will be reported at the time of conversion, not the time of impression
- The new default for Ads Manager is 7-day click attribution after enforcement from the current default of 7-day click 1-day view; All existing ad set settings will be maintained, but new ad sets will be on 7-day click unless you change it
- All web advertisers are restricted to using only 8 events for optimization
- If an advertiser wants to optimize for value, this would take up 4
- 1-day view and 7-day click will have partial data as it will not include opted out users
- Conversion tracking by age, gender, region and placement will be unavailable
- Targeting using 1st party data like age, gender, geo, etc. will not be impacted
- Users who opt-out will not be able to be added to custom audiences and exclusions
- Upper funnel campaigns and Brand Lift tracking will be mostly unimpacted including Lead Ads, Video View Ads, etc.

**What we think we know, but will need to test:**

- Bid cap will likely be the bidding tactic many advertisers lean on
- We may need to think about setting bids for a week, rather than a day
- Due to signal loss and less signal we may need to broaden audiences or we may need to do more targeting depending on optimization power
- Due to lowered conversion volume with a shorter optimization window we may need to segment less  
   (have less ad sets)

**What we don't know:**

- The exact timeline of when this will happen, "early Spring" is still all we have
- Opt-out rates, these will likely never be shared
- How much performance will be impacted, highly likely to vary by advertiser
- How products like value optimization and cost cap will function in the world
- The impact on audiences like Lookalikes and Value-Based Lookalikes and Custom Audiences
- What learning phase means in the new world
- How to quantify the additional value beyond what we can see in the limited new view

</details>

<details>
<summary>How do we set up the Facebook SKAN Conversion Bit Schema integration with Branch?</summary>

To sync SKAdNetwork conversion value mappings with Facebook for campaign optimization, Branch provides an API endpoint that customers may paste into the Facebook Ads Manager UI.

The API endpoint follows this format, and can only be called by Facebook's services:

```
https://api2.branch.io/v1/partners/a_facebook/conversion-value-mappings?app_id={itunes_id}
```

**Note:** the `{itunes_id}` parameter must be replaced with the respective iTunes ID for your app (**not** your Branch app ID). Your iTunes ID is the series of numbers at the end of your app's App Store page URL.

For example: `https://apps.apple.com/us/app/branch-monster-factory/id917737838` would have an endpoint URL of `https://api2.branch.io/v1/partners/a_facebook/conversion-value-mappings?app_id=917737838`

## Instructions for adding Conversion Bit Schema API endpoint to Facebook

1. Visit the *Ads → Partner Management → Facebook* page in the Branch dashboard.  
    Note: Conversion Value URL will only be visible for customers that have opted in to Branch SDK support on the SKAdNetwork Configurations dashboard

   
2. Copy and paste the URL.
3. Go to Facebook Ads Manager and navigate to Events Manager.

   *[Image: 090d2a4-Screen_Shot_2021-02-19_at_12.36.51_PM.png]*.png)
4. Go to "Settings" highlighted in the screenshot above and select "Set Up Events" under Configure App Events for SKAdNetwork

   *[Image: b23ecd9-Screen_Shot_2021-02-19_at_12.37.14_PM.png]*.png)
5. Select "Import from Partner App"
6. Copy and paste the URL and hit "Connect"

   

The Conversion Bit Schema sync functionality is intended to support customers who are using the Branch SDK for SKAdNetwork support.

If you are:

- **Using the Facebook SDK for SKAdNetwork.** You should not use this endpoint. Facebook will automatically pull in their own `conversion-value` schema.
- **Calling SKAN methods natively in your app**. You *may* be able to use this endpoint:

  - Option 1: Facebook provides functionality within the Facebook Events Manager to specify your conversion value mapping. See [this Facebook guide](https://www.facebook.com/business/help/670955636925518) for more info. **This is the recommended option if you are calling SKAN methods natively,** and in this case, you should not use the endpoint.
  - Option 2: If your custom conversion value mapping exactly matches Branch SDK functionality (1 in-app event is mapped directly to 1 SKAN `conversion-value` value) *and* you have properly entered this by using custom SKAN event labels in Branch's dashboard mapping tool, you can use the endpoint above. However, the endpoint will **not** work as expected if you are using a more complex custom conversion value strategy, such as revenue buckets or event counts.

</details>

<details>
<summary>Is Facebook planning to share SKAN conversion values with MMPs?</summary>

Unlike many networks, Facebook does not forward raw SKAdNetwork Postbacks to MMPs (see [What is the difference between networks forwarding individual SKAN postbacks to Branch, rather than providing data via an API? Is one option better?](what-is-the-difference-between-networks-forwarding-individual-skan-postbacks-to-branch-rather-than-providing-data-via-an-api-is-one-option-better.md) for more details). Instead, SKAN data is available via the Facebook Insights API.

Currently, this API only shares SKAN installs aggregated on a campaign level of detail. Further dimensions (including `conversion-value` data) are not available, though Facebook is hoping to build out additional support in future.

</details>

<details>
<summary>Is Facebook’s maximum of 8 conversion events only for web campaigns, or also for SKAdNetwork?</summary>

The limit of 8 conversion events is part of Facebook's Aggregated Event Management (AEM) standard, and only applies to web campaigns. See [this Facebook documentation page](https://www.facebook.com/business/help/126789292407737?id=428636648170202) for more information.

</details>

<details>
<summary>We’re trying to import our conversion schema for a new Facebook app, but the option is not available in Facebook</summary>

As of April 7, 2021, Facebook has provided the following guidance about this issue:

> The option is currently not available to apps that have not passed any events back to Facebook. In order for a client to set up their conversion schema using the import from partner app / MMP path they must have previously passed events to Facebook using an MMP SDK. We realize this is a blocker for new apps or apps that have not previously passed events to Facebook, and we are working to resolve this issue. In the meantime, clients can either (1) start passing events to FB using the MMP SDK as soon as possible, or (2) start passing events to Facebook using the Facebook SDK or App Events API and use one of the other flows to setup their conversion schema.”

</details>

<details>
<summary>We get a connection error when entering our Branch conversion schema URL on the Facebook dashboard</summary>

If you receive the following error when pasting the Branch conversion schema URL:

*[Image: d04a715-Image_2021-04-13_at_17.50.41.jpg]*.jpg)

Please ensure the following:

- You must have your app enabled for SKAdNetwork via the Branch dashboard (see [this page](enable-skadnetwork-via-branch-sdk.md) for more).
- You must have at least one conversion value mapped using the Branch dashboard (otherwise Facebook will just get an empty response from Branch's API).

</details>

<details>
<summary>I don’t see the Facebook conversion value schema endpoint in my Branch dashboard. Why not?</summary>

In order for Branch's conversion value schema endpoint to appear, you must have your app enabled for SKAdNetwork via the Branch dashboard (see [this page](enable-skadnetwork-via-branch-sdk.md) for more).

</details>
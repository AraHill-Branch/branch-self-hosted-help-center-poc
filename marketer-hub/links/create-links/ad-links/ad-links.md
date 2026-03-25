---
title: "Create Ad Links"
slug: ad-links
---

## Overview

A Branch Link is the vehicle that ensures seamless user experiences while also providing you with full attribution and analytics across email, referrals, paid advertising, social, organic search, and desktop-to-mobile.

If you are running paid advertising campaigns, you'll want to create a Branch Ad Link so we can accurately attribute resulting app conversions to the appropriate advertising partner. Branch Ad Links support deferred deep linking, Android App Links, and iOS Universal Links, as well as web and app conversions.

## Create an Ad Link

As all Branch Ad Links are uniquely built to a specific advertising partner, you can only create an Ad Link for enabled ad partners. To create a Branch Ad Link:

### 1. Select Ad Format

1. Navigate to [LinkHub](https://branch.dashboard.branch.io/quick-links/manager) in the Branch Dashboard. Click the **+** **Create Link** button on the upper right-hand corner, then select **Ad Link**.

2. For **Link Type**, select one of the following ad formats:

- App Only

  - **App Install or Engagement**
- Cross-Platform Display

  - **Display Link**
  - **Search Link**

3. Click **Continue**

::: info Note
For App Install or App Engagement campaigns, you'll want to select the App Only format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select Cross-Platform Search or Cross-Platform Display.
:::

### 2. Define Ad Link domain and ad partner

In the **Define** section, complete the following:

1. Name your link.
2. Select the ad partner that the link is for.
3. Click **Configure Options** when you are done.

::: warning Caution
Branch Ad Links all use the domain `app.link` for the URL, regardless of whether you have a custom domain registered with your account. This is because the user will not see the URL and it allows for fewer redirects.
:::

### 3. Configuring Options

In the **Configure Options** section, please provide the following:

1. Define your **Link Alias**. Note that this cannot be changed after you create the Ad Link!
2. Provide any of the following if applicable:

<details>
<summary>Analytics Tags</summary>

It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. Channels generally correspond to ad networks, and Campaigns correspond to marketing initiatives that you're launching. For example: Channel: "YouTube", Campaign: "Summer 2017 Shoe Discounts."

</details>

<details>
<summary>Redirects</summary>

The Redirect tab allows you to override your default redirects - as set in Link Settings - and direct users to specific locations if the app is not installs.

- **Default Redirect** - Set at the account level within Link Settings. Typically set to the relevant mobile stores
- **Web URL** - Send users to a specific web page if they don’t have to the app to avoid any unexpected flow to the app store
- Deepview - Send users to a specific Deepviewkm you may have created under the Web to App > Deepview section. Copy the key and paste it into the text box. Useful if you want to present the user with a preview of the content before taking them directly to the app store. Should not be set for Desktop option.

  Note: If you want to always **force the app to open**, even if it risks showing an error message when the app is not installed, make sure the **URI Scheme Deep Link Mode** in your **Link Settings** is set to `Aggressive`. By changing this setting, Branch will force open the app for all users.

</details>

<details>
<summary>Link Data</summary>

The Link Data tab allows you to include additional data to your links to be used not only for contextual deep linking, but for passing additional attributes you or your ad partner may require.

To add additional data - i.e. key-value pairs - to your Ad Link:

1. Click **+More Data**.
2. Input the parameter name in the **Key** field and its corresponding value or macro in the **Value** field.

   - If you wish to **Force Open the App**, even if it risks showing an error message when the app is not installed, add `uri_redirect_mode` in the **Key** field and `2` in the **Value** field. By adding this key-value pair, only those who click on this link will have the app forced open regardless.

</details>

3. Click **Create Link Now** when you're done. You'll then be brought to the last phase of creating a link - **Validate & Share**.

.png "configure_options.png")

### 4. Validate & Share

#### Validate

Once you've created your Ad link, we will automatically validate its settings to make sure your link works as you expect.

If we recognize an issue with your ad link, you will see an error message with what needs to be fixed before sharing your link. Click on the error message to go back and fix the offending setting. Once no issues exist, you should only see green checks next to your links settings.

.png "Validation.png")

#### Share

We provide you with a Branch Link for both clicks and impressions. Simply copy and paste the links in the tracking section of your campaign tool or email to your Ad Partner's account manager.

You can also text yourself (or someone else) the link by providing a phone number and clicking Send.

## FAQ

<details>
<summary>How are Short Links different from Ad Links?</summary>

#### Functionality

Functionally, Short Links and Ad Links work the same -- they both attribute in the same fashion (outside of the iOS ATT restrictions -- Short Links are “owned” links so these can still attribute downstream data) and route users in the same way to the destinations set up on the links.

[Ad Links](https://help.branch.io/v1/docs/ad-links) are primarily designed for working with ad partners, so they’ll include a $3p value that designates the specific ad partner, and for integrated partners, they’ll include a much longer URL string that includes macros for the partner to pass through dynamic values like campaign name, etc. Additionally, Ad Links will automatically implement ATT-compliant behavior on iOS. [This is not the case for Short Links](https://help.branch.io/faq/docs/how-do-we-configure-a-non-ads-link-to-use-branchs-att-compliant-behavior).

[Short Links](https://help.branch.io/v1/docs/create-quick-links) are for “owned” placements (non-paid-ads use cases in general) and cases where the link may be visible, and Ad Links are designed for paid ads where users aren’t expected to see the link itself as well as where dynamic data is expected to be passed.

For a list of what Branch Link to use for a specific use case, see below:

| Branch Link | Use Cases |
| --- | --- |
| Short Link | - Quick QR Code generator (via Branch Dashboard). - Custom Vanity/Alias Link. ex. `branchster.app.link/discount2022``df` |
| Ad Link | Ad Partner Campaign. ex. Facebook Ad Link: `https://branchster.app.link/J9g9yuoTPqb?%243p=a_facebook&%24deeplink_no_attribution=true` |

#### Access

Branch Ad Link creation is included in our Performance Essentials [product tier](https://help.branch.io/docs/products), while access to the [Short Links API](https://help.branch.io/v1-api/apidocs/quick-links-api) is limited to Engagement Pro customers.

</details>

<details>
<summary>Can I create a QR code for Ad Links?</summary>

QR Codes are currently only supported for Short Links.

Ad Links are dynamic links with macros, which are filled in by the ad network.

The macros change dynamically depending on the campaign, so one QR code cannot be generated for the Ad Links with macros.

</details>

<details>
<summary>Why am I seeing the following error: “The link is not formatted properly”?</summary>

The Ad Link that you generate in Branch is a tracking link that needs to be provided to your ad partner, who will then use this link to create ad campaigns.

You are seeing an error when directly clicking on this link as this will not have values for the Parameters on the link. You can test this link by adding the parameters to the ad link manually.

For example, if the platform is iOS, remove AAID parameter from the link and append the device ID value for IDFA as: '%24idfa=xxxxxx'. Similarly, for Android, remove the IDFA parameter from the link and append the device id value for AAID.

</details>
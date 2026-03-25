---
title: "Create App Links (New)"
slug: create-app-links-new
---

## Overview

App links are Branch Links that take your users to app destinations. There are five primary methods you can use to create app links:

- [Method 1: Create app Short Links in Branch](create-app-links-new.md#method-1-create-short-links-in-branch)
- [Method 2: Create bulk app Short Links in Branch](create-app-links-new.md#method-2-create-bulk-short-links-in-branch)
- [Method 3: Create Short Links in the Branch Slack app](create-app-links-new.md#method-3-create-short-links-in-the-branch-slack-app)
- [Method 4: Create app links through the Deep Linking API](create-app-links-new.md#method-4-create-app-links-through-the-deep-linking-api)
- [Method 5: Create Short Links using Ivy](create-app-links-new.md#method-5-create-short-links-with-ivy)

### How Branch Links work

App links are deep links that take users to specific pages in your app. Web links are web-only Short Links that work everywhere. Web and app links look the same (yourbrand.com/slug or yourbrand.app.link/slug) depending on if you choose to use a custom domain or a Branch-provided app.link domain.

#### Expected behavior for web links

If your end user does **not** have your app installed, or if you don’t have an app, the link will open in their default web browser. If they do have your app downloaded, the link will open in your app through an in-app web view.

Read our [Create Web Links](create-web-links.md) article to learn more about app links.

#### Expected behavior for app links

If your end user has your app installed, the App Link will deep link to the specific app page you’ve chosen. If they do **not** have your app installed, they will taken to the redirect destination for non-app users which can be configured as a web page, a Branch Deepview, or the app store listing to download the app.

## Before you begin

You can set up a custom domain in Branch or you can use the Branch-provided app.link domain. If you want in-app web views to work, you must have the latest version of the Branch SDK installed.

### Set up a custom domain (optional)

You can set up a custom domain (for example, `link.yourbrand.com`) in Branch. Read our [Advanced Settings & Changing Link Domain](advanced-settings-configuration.md) article to learn how.  
  
After you set up your custom domain, you can use it to create branded web Short Links.

### Set up app integration

You must have the latest version of the Branch SDK (latest update May 15, 2025) installed for app links to work.

Read the following articles to learn more:

- [Branch SDK Overview](https://help.branch.io/developers-hub/docs/native-sdks-overview)
- [Branch iOS SDK Overview](https://help.branch.io/developers-hub/docs/ios-sdk-overview)
- [Branch Android SDK Overview](https://help.branch.io/developers-hub/docs/android-sdk-overview)

## Create app links

### Method 1: Create Short Links in Branch

::: info Note
The information in this section is relevant to the Activation product. If you want information about app Short Link creation for the Engagement product, read our [Legacy Short Link Creation](legacy-link-creation.md) article.
:::

You can create individual Short Links in Branch.

::: tip Tip
You can quickly access the **Create Short Links** page by entering [deeplink.new](https://deeplink.new) in your browser.
:::

#### Step 1: Start creating link

Complete the following steps to start creating a link:

1. In Branch, select the **Create** button in the top-right corner of the page.
2. Select **Link**.
3. Select **Short Link**. The **Create Short Link** page will open.

#### Step 2: Define your app Short Link

Complete the following steps to define your link:

1. Enter your link title in the **Link Title** text field. We recommend standardizing your link names to make them easily searchable.
2. Select **App**.
3. (Optional) Enter a long URL that you want to shorten in the **Original Web URL** text field. This is where your Short Link will redirect to as a fallback.
4. (Optional) Select the domain that you want this link to use from the **Link Domain** drop-down menu.
5. (Optional) Enter a custom link alias (slug/back-half) in the Link Alias text field. You won’t be able to change this once you select **Create Link**.

#### Step 3: Add analytics tags (optional)

Add analytics tags to your link to sort and compare performance with your other links.

You can add analytics tags in two ways in the **Analytics Tags** section:

- Use the drop-downs to select analytics tags that you’ve used in the last 30 days.
- Enter new analytics tags in the text fields and select **Create [ANALYTICS TAG]** to create a new tag.

<details>
<summary>Expand to view available tags</summary>

You can add the following analytics tags to your link:

- **Feature**: Should describe the action or product where this link is placed. For UTM, this is typically utm\_medium.
- **Channel**: Should describe the platform or source from which you are expecting users to click this link. For UTM, this is typically utm\_source.
- **Campaign**: This can very, but it should describe the theme of the link. For UTM, this is typically utm\_campaign.
- **Tags**: Tags are a free-form list of meaningful labels that can be used as filters in the Short Links table. Use them to keep your analytics organized.

</details>

::: info Note
For a tag from a previous Short Link to appear in the drop-down list, the previously created Short Link must be published with at least one click on it.
:::

#### Step 4: Add redirects (optional)

To add custom redirects, select the drop-down menu for the platform you want to change and choose a new path.

Add information about what should happen if you app is not installed when the user clicks on the link. We can take the users to the app store, open a web page, or open a [Deepview](deepviews-index.md).

Links you create will automatically inherit redirects on iOS, Android, and Desktop based on [default settings](configure-default-link-behaviors.md) applied to your account.

You can override those defaults and direct users to specific locations if the app is not installed by adding them in the **Redirects** section.

<details>
<summary>Expand to view available redirects</summary>

You can add the following redirects to your link:

- **Default Redirect**: Set at the account level in your **Link Settings**. This is typically set to the relevant mobile stores.
- **Web URL**: Send users to a specific web page if they don’t have your app to avoid an unexpected flow to the app store.
- **Deepview**: Send users to a specific Deepview you created in the Branch Dashboard. Copy the Deepview key and paste it into this text box. This is useful if you want to present the user with a preview of the content before taking them directly to the app store, but should not be set for the Desktop option.

</details>

#### Step 5: Add link data (optional)

Add any custom link settings, custom analytics tags, or custom redirect logic. You can view [custom data options](https://help.branch.io/docs/creating-a-deep-link#custom-data) and [advanced analytics tag options](https://help.branch.io/docs/creating-a-deep-link#keys-for-reporting-analytics) in our Deep Link Reference article.

::: tip Tip
You can type directly into the text field to add link data.
:::

#### Step 6: Customize QR code (optional)

Customize the QR code for this link by selecting the pencil icon above the **QR Preview** section. Learn more in our [Customize QR Codes](qr-codes-builder.md) article.

Select **Done** to save your customizations.

::: info Note
Switching between app and web-only routing may change the link URL depending on your package and domain configuration. If this link will be used in print, finalize your routing strategy before distribution. See [Create QR Codes](https://help.branch.io/marketer-hub/docs/create-qr-codes) for details.
:::

#### Step 7: Customize link preview (optional)

Customize the link preview for this link by selecting the pencil icon above the **Link Preview** section. You can customize the title, description, and background image. This is what your link will look like on social media platforms, messaging apps, and anywhere that supports link previews.

Select **Done** to save your customizations.

#### Step 8: Finish creating your link

Select **Create Link** to finish creating your link.

### Method 2: Create bulk Short Links in Branch

You can create app Short Links in bulk in Branch.

Complete the following steps to create web Short Links in bulk:

1. In Branch, select **Links**.
2. Select **Create Bulk Links** in the top-right corner.
3. Select **Short Links**.
4. Select whether you want to create your Short Links with an existing template or a CSV. You can download a sample CSV to get started by selecting **Via CSV Upload** > **sample CSV file**.
5. Add the relevant information for your links. Open the accordion below to view more information about link information.

   **Expand to view available fields**

   | **Required?** | **Field** | **Description** |
   | --- | --- | --- |
   | **Yes** | **Link Title** | **Link title is the name of the Short Link that will be displayed and be searchable in the Short Links table. Try making it descriptive and memorable for you and your team.** |
   | **No** | **Link Alias** | **Link alias (link slug) is the part of the link after the domain. For example, in “branch.app.link/example”, “example” is the alias. The alias should ideally describe the landing page of the link. This can't be edited once the link has been created. If this field is left blank, Branch will generate a unique link hash for you.** |
   | **Yes** | **Feature** | **Feature should describe the action or product where this link is placed.In the UTM world, this is typically utm\_medium.** |
   | **Yes** | **Channel** | **Channel should describe the platform or source from which you are expecting users to click this link. In the UTM world, this is typically utm\_source.** |
   | **Yes** | **Campaign (utm\_campaign)** | **Campaign varies from company to company, but it should describe the theme of the link. In the UTM world, this is typically utm\_campaign.** |
   | **Yes** | **Original Web URL** | **Branch can fetch and fill data for a link from a page on your website, including open graph tags and other metadata. You'll see this metadata appear in the optional sections later in this creator. This helps reduce the number of steps for you to create a well-configured link.** |
   | **Yes** | **Custom Key: $canonical\_url** | **N/A** |
   | **No** | **Tags** | **Tags are a free-form list of meaningful labels that can be used as filters in the Short Links table. Use them to keep your analytics organized.** |
   | **No** | **Social Media Title** | **Title that will appear in this link’s social media preview.** |
   | **No** | **Social Media Description** | **Description that will appear in this link’s social media preview.** |
   | **No** | **Social Media Image URL** | **Note that your image may be cropped and aligned differently depending on the social platform.** |
   | **No** | **iOS Default Redirect** | **Can’t be changed when creating links in bulk.** |
   | **No** | **Android Default Redirect** | **Can’t be changed when creating links in bulk.** |
   | **No** | **Desktop Default Redirect** | **Can’t be changed when creating links in bulk.** |
   | **No** | **Web Only** | **Column edit is restricted as per the Link Template settings. To change the setting please edit the Link Template.** |
6. Select **Create Links** or **Publish Bulk Links** depending on which method you chose.

### Method 3: Create Short Links in the Branch Slack App

You can create app Short Links using the Branch Slack App. Read our [Branch Slack App](branch-slack-app.md) article to learn more.

### Method 4: Create app links through the Deep Linking API

The [Deep Linking API](https://help.branch.io/apidocs/deep-linking-api) is included in [Engagement Essentials](https://help.branch.io/docs/packaging#engagement-essentials-tier) and [Activation Essentials](https://help.branch.io/docs/packaging#activation-essentials-tier). You can use it to create both web and app Short Links.

### Method 5: Create Short Links with Ivy

You can use Ivy, Branch’s AI, to create Short Links in Branch.

::: warning Caution
Check your link before you publish it. AI can make mistakes.
:::

Complete the following steps to start creating a link with Ivy:

1. In Branch, select **Campaigns** > **Links** from the navigation menu.
2. Select the **Create** button.
3. Select **Short Link**. The **Create Link** page will open.
4. Start entering your prompt in the **Ask Ivy** text box at the top of the page.

#### Prompt Ivy

You will use prompts to create links with Ivy.

Use the following guidelines to help you create effective prompts:

- **Be specific and descriptive**: Ivy works best when you’re specific about the type of link you want to create.
- **Tell Ivy what you don’t want**: Ivy uses your past links to help create your new links. This means it may include data options and tags from previous links. If you don’t want a specific tag that you know you’ve used, tell it to exclude it in your prompt.

#### Example prompts

Use the following example prompts to start creating links with Ivy:

- “Create a link for an email campaign promoting our new Fast running shoes. App users should be sent to /products/fast-running-shoes. Non-app users should go to the website URL: [shoes.com/running-shoes/fast](http://shoes.com/running-shoes/aurora)”
- “I have a campaign about our Winter Collection on Facebook. Send app users to /collections/winter. If a user doesn't have the app, I want them to be redirected to download it”
- “I'm running a 24-hour flash sale via SMS for our top customers. I need a link that will deep link iOS users to /sales/flash-sale and Android users to /promotion/flash-sale”
- “Create a web link for my new campaign that leads to the following destination: [https://examples.com/alias](https://examples.com/alias.”)”
- “Create an app link that leads to the following app destination: <https://example.com/alias.> Apply my most-used analytics tags to the link.”

## View and manage links

You can use the **Links** page to manage and view your Short Links. Learn more in our [Links Page](linkhub.md) article.

You can also view Web Short Links on the **Overview** page in Branch on the **All Data** and **Short Links** tabs.

## Analyze link performance

#### Links page

On the Links page, you can view how many clicks your links have received. Select the **Clicks** column in the table to sort by most clicks or least clicks. You can learn more in our [Links Page](links-page.md) article.

#### Overview page

On the **Overview** page, use the **Summary** or **Sources** tabs to view relevant analytics for your links. Read our [Overview Page](branch-summary-page.md) article to learn more about comparing and filtering results.

## Additional resources

Check out our [Deep Link Reference](creating-a-deep-link.md), [Links Page](links-page.md), and [Link Validator](link-validator.md) articles to continue learning about app links.

## FAQs

<details>
<summary>Why are some Short Link thumbnails not shown in WhatsApp?</summary>

The most common issue with Short Links not rendering thumbnail previews in WhatsApp is the image file size being too large. Although Facebook supports the display of Open Graph images [up to 8 MB](https://developers.facebook.com/docs/sharing/webmasters/images/#images-in-link-shares) in size, their WhatsApp product appears to have different, undocumented size limitations. We've seen that WhatsApp generally displays thumbnail previews for images up to 300 KB.

If your image file is larger than 300 KB, try reducing the image file size by adjusting your image dimensions or compression settings.

</details>

<details>
<summary>Can I see the stats for links created using the API or SDK in Branch?</summary>

Viewing Individual Link level stats for API/SDK created links is currently not available. Aggregate Stats can be observed in Branch by filtering with link analytics tags.

</details>

<details>
<summary>Why aren’t my Short Links showing up in Branch?</summary>

The Short Links section in Branch shows links that were generated in Branch. API/SDK-generated links are not visible in Branch.

If the Short Link you are looking for does not appear in Branch, it’s possible that the link wasn’t fetched in the first search. You will have to click on “Load More” at the bottom of the page, you should then be able to see the link pop up if it still exists.

</details>

<details>
<summary>Why is my Short Link redirection not working as expected?</summary>

If the Short Link redirection is not working as expected, we recommend trying to debug the link first to see if it is set up correctly.

1. To debug a Short Link, you can go to **Short Link** > **Select a link** and click on the ellipses, then click **Debug**.
2. On the Debug page, check the **Link Details** and the **Link Routing Debugger** section.

You can also debug a link by adding debug=1 at the end of the link as a query parameter. For example: [https://branchster.app.link/share-with-friends7\*\*?debug=1](https://branchster.app.link/share-with-friends7**?debug=1)

</details>

<details>
<summary>How can I create a Short Link for Snapchat?</summary>

Snap won't let you attach redirecting links to stories. The following workaround disables the redirects until you get the link attached, and then re-enables them after you create your story.

1. Create your Short Link to be attached to your Snap story.
2. On the Configure Options section, do the following:

   1. Add the key $always\_deeplink, and the value of false in the **Deep Linking** tab.
   2. Enable a Deepview on the iOS platform in the **Redirects** tab.
3. Attach this link to your Snap story.
4. Come back and edit the Short Link to:

   1. Delete the $always\_deeplink key/value from the **Deep Linking** tab.
   2. Remove the Deepview on iOS in the **Redirects** tab.

</details>

<details>
<summary>Does a Branch-generated QR code have an expiration date?</summary>

No, QR codes do not have an expiration date. The QR code has a Short Link behind it. As long as the Short Link is active, the QR code will continue to work. Short Links will always be active if not deleted or archived. However, if you change the link domain (\*\*\*.[app.link](http://app.link)) of your Branch app, all Short Links and the QR codes created with the old domain will stop working.

</details>

<details>
<summary>Why do I have to click on 'Load More' to find my link when searching Short Links?</summary>

The dashboard only loads the last 500 Short Links. If the link that you are searching for is not part of these 500 links, click 'Load More' in order to continue searching.

You can also load the Short Link directly, by going to the following URL with the corresponding Short Link ID appended to the end.

https://dashboard.branch.io/quick-links/qlc/config/[Short Link ID]

</details>

<details>
<summary>Are the number of 'Opens' included in the number of 'Installs' reported in Branch?</summary>

Opens are not included in installs. If a user who already has the app clicks on the link and opens the app, it is counted as an open. If the app is not installed, the user is taken to the app/play store to install the app. The first time they open the app after the install is counted as an install.

</details>

<details>
<summary>Can updating the Social Media Descriptors affect an app’s ranking in app store searches?</summary>

Updating the Social Media descriptors will only change the Image and description associated with the link, will not have any impact on the app's search ranking.

These values will be updated next time the link is scrapped by the respective platform.

</details>

<details>
<summary>Does Branch over-write UTM parameters if they are already detected in a link?</summary>

When you use Branch links for redirecting users to a web URL, Branch automatically passes through any values from the following Branch link analytics tags as UTM parameters [~campaign -> utm\_campaign, ~channel -> utm\_source, ~feature -> utm\_medium]. However, If these UTM parameters are already detected on the URLs being redirected to, Branch will not overwrite them unless you have disabled the 'Analytics mapping with UTM' setting on your Branch dashboard, which is already enabled by default

To view this setting, navigate to **Configuration** > **Advanced Settings** in Branch.

</details>

<details>
<summary>How long does it take for new images to appear on social media preview once updated?</summary>

Branch will update the link 'og' parameters immediately after it is updated. However how the social media descriptors show up on a platform are controlled by the platform. Different platforms handle these links in different ways, the platform might scrape the link everytime it is shared and the image might get refreshed immediately. However in most cases the link is not scraped regularly hence you might see a time lag before the image is updated for the link. If you are sharing on Facebook owned platforms you can manually scrape the link by visiting <https://developers.facebook.com/tools/debug/>

Please note that the `$og_image_url` social preview feature is reserved for paid Branch accounts with a dedicated contract. If you do not have a paid Branch account, you will not see this feature in Branch.

</details>

<details>
<summary>Why am I unable to find my link in the Short Links Section?</summary>

Branch only shows you the last 500 Short Links created. You can access the next 500 Short Links by clicking on **Load More** at the end of the list.

Alternatively you can directly open the Short Link by navigating to the Short Link appended by the following parameters on a browser where you are signed in to Branch.

- To edit the link append ?edit=1
- To view stats append ?stats=1
- To debug the link append ?debug=1

For example, if you want to edit <https://example.app.link/testlink>, try opening <https://example.app.link/testlink?edit=1>.

</details>

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
<summary>Expand to view available fields</summary>

| **Required?** | **Field** | **Description** |
| --- | --- | --- |
| **Yes** | **Link Title** | **Link title is the name of the Short Link that will be displayed and be searchable in the Short Links table. Try making it descriptive and memorable for you and your team.** |
| **No** | **Link Alias** | **Link alias (link slug) is the part of the link after the domain. For example, in “branch.app.link/example”, “example” is the alias. The alias should ideally describe the landing page of the link. This can't be edited once the link has been created. If this field is left blank, Branch will generate a unique link hash for you.** |
| **Yes** | **Feature** | **Feature should describe the action or product where this link is placed.In the UTM world, this is typically utm\_medium.** |
| **Yes** | **Channel** | **Channel should describe the platform or source from which you are expecting users to click this link. In the UTM world, this is typically utm\_source.** |
| **Yes** | **Campaign (utm\_campaign)** | **Campaign varies from company to company, but it should describe the theme of the link. In the UTM world, this is typically utm\_campaign.** |
| **Yes** | **Original Web URL** | **Branch can fetch and fill data for a link from a page on your website, including open graph tags and other metadata. You'll see this metadata appear in the optional sections later in this creator. This helps reduce the number of steps for you to create a well-configured link.** |
| **Yes** | **Custom Key: $canonical\_url** | **N/A** |
| **No** | **Tags** | **Tags are a free-form list of meaningful labels that can be used as filters in the Short Links table. Use them to keep your analytics organized.** |
| **No** | **Social Media Title** | **Title that will appear in this link’s social media preview.** |
| **No** | **Social Media Description** | **Description that will appear in this link’s social media preview.** |
| **No** | **Social Media Image URL** | **Note that your image may be cropped and aligned differently depending on the social platform.** |
| **No** | **iOS Default Redirect** | **Can’t be changed when creating links in bulk.** |
| **No** | **Android Default Redirect** | **Can’t be changed when creating links in bulk.** |
| **No** | **Desktop Default Redirect** | **Can’t be changed when creating links in bulk.** |
| **No** | **Web Only** | **Column edit is restricted as per the Link Template settings. To change the setting please edit the Link Template.** |

</details>
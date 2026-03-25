---
title: "Create Quick Links"
slug: create-quick-links
---

Branch can be used in your social media channels, blog posts, influencer networks, etc.

You can create Short Links on the fly and add custom redirections, analytics information, and social media tags.

## Create a Short Link

### Options for creating a Short Link

There are a few ways for you to create a Branch Short Link:

- Direct access via the [Branch Dashboard](https://dashboard.branch.io/quick-links/qlc/define).
- Link creation via [web extension](create-quick-links.md#creating-quick-links-via-branch-web-extension-or-slack).
- Link creation via [Slack](branch-slack-app.md#1-add-the-branch-to-your-slack-workspace).
- [Bulk Short Link creation](create-quick-links.md#bulk-create-quick-links).

::: tip Tip
Easily access Short Link creation by entering [**deeplink.new**](https://deeplink.new/) in your browser.
:::

### 1. Name your link

Start by naming your link and creating an alias. Make the link title easy to remember for you and your team, as it will be displayed in the Short Links table.

If if you want to expedite your Short Link creation process, you can apply a [Link Template](link-templates.md) to auto-apply reusable attributes to the link. Doing so will fill in specific fields set by the selected Link Template.

1. In the **Link Title** field, provide a descriptive and memorable name.
2. In the **Link Alias** field, provide an alias or link slug that ideally describes the landing page of the link.

   
::: danger Warning
The link alias can’t be edited once the link has been created. If this field is left blank, Branch will generate a unique link hash for you.
:::

3. **OPTIONAL:** In the **Original Web URL** field, provide the original link to your landing page. Doing so allows Branch to fetch and fill data for a link from a page on your website, including open graph tags and other metadata. You’ll see this metadata appear in the optional sections later in this creator. This helps reduce the number of steps for you to create a well-configured link.
4. Click **Save & Continue**.

### 2. Add analytics tags (optional)

Set tags on links in order to view performance on them in the Branch Dashboard.

We recommend adding analytics tags that can be used to filter and compare the performance of various links.

<details>
<summary>Available tags</summary>

**Feature** - Feature should describe the action or product where this link is placed. In the UTM world, this is typically `utm_medium`.

**Channel** - Channel should describe the platform or source from which you are expecting users to click this link. In the UTM world, this is typically `utm_source`.

**Campaign** - Campaign varies from company to company, but it should describe the theme of the link. In the UTM world, this is typically `utm_campaign`.

**Tags** - Tags are a free-form list of meaningful labels that can be used as filters in the Short Links table. Use them to keep your analytics organized.

</details>

::: tip Tip
If you are trying to add a tag from a previously created Short Link, for it to appear in the drop-down list, the previously created Short Link must be published with a click on it.
:::

To add analytics tags using the drop-downs:

1. Select pre-populated tags you've previously used in the last 30 days, OR
2. Create a new tag by typing in a new tag and click **Create**.
3. Click **Save & Continue**.

.png "Screen Shot 2020-07-24 at 10.20.05 AM.png")

### 3. Add redirects (optional)

Redirects tell Branch what to do if the app is not installed when the user clicks on the link. We can take the user to the app store, open a web page, or open a Deepview.

Links you create will automatically inherit redirects on iOS, Android, and Desktop per the default settings applied at your account level.

Here you have the ability to override those defaults and direct users to specific locations if the app is not installed.

<details>
<summary>Available redirects</summary>

**Default Redirect** - Set at the account level within Link Settings. Typically set to the relevant mobile stores.

**Web URL** - Send users to a specific web page if they don’t have to the app to avoid any unexpected flow to the app store.

**Deepview** - Send users to a specific Deepview you may have created within the Branch dashboard. Copy the key and paste it into the text box. This is useful if you want to present the user with a preview of the content before taking them directly to the app store, but should not be set for the Desktop option.

</details>

To override your default redirects:

1. Using the drop-downs for the respective platforms, select the location you want users redirected to.
2. Click **Save & Continue**.

.png "Screen Shot 2020-07-24 at 10.41.01 AM.png")

::: warning Caution
Use the **Web-Only Link** option if you are choosing a page that should always be opened in the browser. Examples include T&C pages and policy pages. We recommend keeping this unchecked if you have an in-app deep link.

This option always force opens the web browser on iOS. However, on Android, it still opens the app if Android App Links are enabled for your domain. This means, web-only links will always open the app on Android.
:::

### 4. Add link data (optional)

Add the data that you want to be passed to your app via this link. This data is also used to configure link functions like routing, attribution windows, etc. All keys and values are case-sensitive.

Keys are passed as identifiers in Link Data. Think of key as the "Name" identifier of a person named John. In "Name: John", "Name" is the key.

Values are the information corresponding to keys. Think of value as the "John" value of a person named John. In "Name: John", "John" is the value.

To add link data:

1. Click the **Add Key/Value Pair** button.
2. Using the **Key** drop-down menu, select the key for which you want to pass a value.
3. Using the **Value** drop-down menu, select the value for the key you selected.
4. Click **Save & Continue**.

.png "Screen Shot 2020-08-04 at 8.29.20 AM.png")

### 5. Add social media tags (optional)

When a link is shared on social media platforms, it generally shows a preview of title, description, and image. Note that your image may be cropped and aligned differently depending on the social platform.

To add social media tags provide the following information:

1. **Title**
2. **Description**
3. **Image URL**

   1. This will be automatically populated from OG Tags included on the redirection URL.
   2. To upload a different image, click the **Upload Image** tab and select the appropriate file.
4. Click **Save Link**.

.png "Screen Shot 2020-08-04 at 8.41.27 AM.png")

### 6. Validate and share

1. In the **Validation** section, address any errors if they exist.
2. In the **Preview** section you can:

   1. Copy the link.
   2. Download the link embedded in a QR code (available in a JPEG or SVG file).
   3. Text the link to any number you provide.
3. Click **Close**.

.png "Screen Shot 2020-08-04 at 8.53.57 AM.png")

## Create Short Links via Branch web extension or Slack

#### Overview

Using Branch's web extension for Short Link creation enables you to quickly create links for any of your social marketing purposes without having to log into your Branch Dashboard. These links can be used in your social media channels, blog posts, influencer networks, etc. **They cannot, however, be used to create links for Ads, Email, or Journeys**.

#### Prerequisites

- Download the Extension:

  - [Chrome](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf?hl=en-US)
- Download the [Branch Slack App](https://api2.branch.io/v1/slack-app/install)
- Creating links via the Branch Link Creator web extension requires you have deep link data hosted in your website source code. Read our article on [Deep Links](creating-a-deep-link.md).

#### 1. One-time setup: provide your Branch Key

Before you can create a link, you must authenticate by providing your Branch Key.

1. In the **Add Branch Key** modal, input your **Branch Key**. Learn how to find your Branch key [here](create-quick-links.md).
2. Click Save Key.

::: info Note
If you need to change your Branch Key, click on the extension, and click **Change Key**.
:::

#### 2. Define your link

You can define your link with the following:

1. Branch automatically retrieves and applies the metadata hosted in your website code to your Short Link. The following metadata is defined and/or can be edited.

   1. **General**

      1. Link Name
      2. Link Alias
   2. **Analytics Tags**

      1. Channel
      2. Campaign
      3. Feature
2. **Web-only Link** - If you have a page that should be opened in the browser, use this option. Some examples are T&C pages, Policy pages, etc. We recommend if you have a deep link in-app, keep it unchecked.
3. **If App Not Installed** - Always redirect to mobile web.
4. Click **Create Link**.

#### 3. Download / share / copy link

Once created, you have several options to disseminate your link:

- Copy
- [Web Extension Only] Generate QR code (available as JPEG and SVG)

## Bulk create Short Links

To create Short Links in bulk:

1. Navigate to the [**Manager tab**](https://branch.dashboard.branch.io/quick-links/manager) in LinkHub in the Branch Dashboard.
2. Click the **Create Bulk Links** button.
3. Add the following for each Short Link:

   1. campaign
   2. channel
   3. feature
   4. stage
   5. tags
   6. alias
   7. data
   8. $marketing\_title
   9. $og\_description
   10. $fallback\_url
   11. $desktop\_url
4. Click **Create Links**.

## More Short Link view options

The [Short Links page](https://branch.dashboard.branch.io/quick-links/manager?v=latest) in the Branch Dashboard has a limit of 1,000 and only shows those Short Links created in the last 6 months. However, there are a few ways to view the data associated with these links.

**Option 1**: Append query parameters to the Branch Link

- To view the link data of any Branch link, you can simply append `?debug=true` to it for the link data.
- To view the click/install/opens stats, you can append `?stats=true`.
- To edit Short Links or download an associated QR code, you can simply append `?edit=true`.

Examples:  
<https://example.app.link/ashfiashf?debug=true>

<https://example.app.link/jasofjaosg?stats=true>

<https://example.app.link/ashfiashf?edit=true>

**Option 2**: HTTP API

Use our `v1/url/ endpoint` in our HTTP API to view any of the deep link data associated with any Branch link. The CURL request could be of the form: `curl -XGET 'https://api.branch.io/v1/url?url=https://example.app.link/ashfiashf&branch_key=key_live_mUasfsafas1pgdS9FWoB4xceexFdxiF13`
---
title: "Enable Deepviews"
slug: enable-deepviews
---

## Before you begin

### Permissions

In order to enable Deepviews, you require [specific permissions](add-manage-users-roles-permissions-access.md) to your Branch app:

| Permission | Description | Access |
| --- | --- | --- |
| App-Level Settings | Settings or features that can impact functionality app-wide. | Edit or Admin Access Level |

## 1. Navigate to the Deepviews tab

Log into Branc . From the **Configuration** page, navigate to the [Deepview Manager tab](https://dashboard.branch.io/configuration/deepview-manager).

## 2. Enable Deepviews

Branch will automatically generate several Deepviews for you based on what settings you have set in the [Configuration page](https://dashboard.branch.io/configuration/general). Deepviews are configured separately for visitors on each platform: iOS, Android, Desktop. There's a tab for each platform and pre-built templates that you can customize. Review the templates, for the ones you want to customize toggle the **Enable** slider.

Branch offers several different templates for you to use, duplicate, and customize for your specific brand. The core layout of the pre-built templates allows you to showcase high-level information about your app. You have the following elements to configure:

- App Image
- App Name
- Deepview Title
- Deepview Description
- Call-to-Action Text

::: info Note
We recommend utilizing QR Codes as much as possible, and you can utilize Branch's Desktop QR Code Deepview to drive users to your app.
:::

## 3. Create a custom Deepview

You can also create a Custom Deepview to be more specific with different attributes of the Deepview. There are 2 ways to create a custom template:

- Find a default template and click on the `...` and then click **Duplicate**.
- Alternatively, scroll to the bottom of the Deepview page, and click **+ New Deepview**.

Note: Unlike the prebuilt template, custom Deepview templates are shared between all platforms (iOS, Android, and desktop), and cannot be deleted after creation.

::: warning Special Characters
Using special characters like `+` for the name/key of the Deepview will break the URL. Avoid using special characters.
:::

![](/img/7a8f727-basic-editor-deepviews.png "basic-editor-deepviews.png")

There are several properties that you can edit the Deepview using the different tabs:

### Basic

Displays your new template, and allows you to modify the default fallback OG tags used if none are specified for a link.

### HTML and CSS Editor

The **Editor** tab allows you to edit the raw HTML and CSS for your template. The rendered template will update as you modify the HTML and CSS.

Select **Save** when you are done editing your Deepview.

## Using your Deepviews

You can configure your Branch Links to use Deepviews when the user clicks on the link.

#### Short Links redirects

When creating a Branch [Short Link](create-quick-links.md), you can set a specific Deepview to show when users click on links without the app installed. Simply select **Deepview** for the platform, and the enabled Deepview of your choice in the dropdown.

![](../../../assets/media/images/3138f4ee-fbfd-4fb5-b049-7cd6c6b8fc5e "Short Link Deepview.PNG")

#### Branch Link data

Additionally, you can show a Deepview by setting the redirect through the link data. Whatever mechanism you are using to create your [Branch Link](creating-a-deep-link.md), you can add the following key/value pairs:

| Key | Usage | Example |
| --- | --- | --- |
| `$ios_deepview` | The key of the Deepview template to use for iOS. | `branch_default` |
| `$android_deepview` | The key of the Deepview template to use for Android. | `branch_default` |
| `$desktop_deepview` | The key of the Deepview template to use for the Desktop. | `branch_qr_code_default` |

## FAQs

<details>
<summary>Can I change the app icon that appears in social media posts?</summary>

**In Legacy Branch**

You can upload a new icon in the **Social Media Preview** of section on the **Configuration** [page](https://dashboard.branch.io/configuration/general).

Please note that this feature is reserved for paid Branch accounts with a dedicated contract. If you do not have a paid Branch account, you will not see this feature in the Branch Dashboard.  
  
**In New Branch**

You can upload a new icon by going to **Configuration** > **Link Controls** > **Link Appearance** > **Link Preview**. Select **Configure** to change your icon.

</details>

<details>
<summary>Can I edit a Deepview template?</summary>

No, you cannot edit a template. However, you can duplicate a template, and then customize the template.

</details>

<details>
<summary>Can I add Javascript to my custom Deepview template?</summary>

No. Before rendering the template, we sanitize the markup of Javascript for security reasons. This includes script tags and event attributes on tags.

</details>

<details>
<summary>Can I customize the favicon of the Deepview domain?</summary>

On the Branch Dashboard, navigate to the **Configuration** section to Edit your **Deepview**.

In the **Desktop DeepView Editor,** include the below code snippet along with your image URL -

`<link rel="icon" type="image/png" href="https://example.com/favicon.png" />`

Save the changes and you should see your favicon now for Desktop Deepviews.

</details>
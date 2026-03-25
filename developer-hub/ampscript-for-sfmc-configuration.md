---
title: "AMPscript for SFMC Configuration"
slug: ampscript-for-sfmc-configuration
---

## Overview

Salesforce Marketing Cloud allows email marketing teams to create and deploy beautiful templates to send to your customers. Branch integrates with Salesforce Marketing Cloud to enhance the user experience and attribution for your email marketing campaigns. Additionally, you can set up AMPscripts to enhance how you use Branch Links in your email templates in order to drive your users from email links to your app where they are already logged in and reduce the time to conversion.

## Prerequisites

In order to use AMPscript for Branch Email, you need to have completed the following:

1. [Salesforce Marketing Cloud Integration.](salesforce-marketing-cloud-web-default.md)

## Configure AMPscript

::: warning Domain Usage
Only use the `app.link` subdomain assigned to your app as the branch\_base\_url. Do not use custom subdomains or root domains.
:::

Using Salesforce's AMPscript, add a new Content Area in Salesforce that converts web links in your email templates into Branch Links.

1. Work with your Branch account manager to modify the following Salesforce AMPscript snippet, replaced `DOMAIN-HERE` with your Branch base domain (i.e. example.app.link)

```
%%[ VAR @deeplink, @branch_base_url SET @branch_base_url = "https://DOMAIN-HERE/3p?%243p=e_et" SET @deeplink = CONCAT(@branch_base_url, CONCAT("&%24original_url=", URLEncode(@link_to_be_wrapped, 1, 1))) ]%%
```

2. In Salesforce Marketing Cloud, click on **Email Studio** and then **Email**

   ![1338](/img/7f1bc00-Email_Studio.png "Email Studio.png")
3. This will take you to the landing page for the email section. Click on **Content** in the menu bar to navigate to the Content section:

   ![1343](/img/34abe93-Content.png "Content.png")
4. In the Content section, you will see a list of folders on the left side. Right click on the **My Contents** folder and choose **Create Folder** in the content builder menu:

   ![1360](/img/1232c6b-Create_Folder.png "Create Folder.png")
5. Name the folder "Branch":

   ![1830](/img/1badcfe-Folder.png "Folder.png")
6. Once the folder is created, in the upper right side, click on **Create** button, then click **Content Blocks** and finally click **Free Form**:

   ![2094](/img/93df5b5-Content_Blocks.png "Content Blocks.png")
7. On the **Free Form** screen, paste in the snippet you previously generated:

   ![2094](/img/1484abc-Free_Form.png "Free Form.png")
8. Click **Save**.
9. In the **Create Free Form** window that appears, enter `deeplink` in the text field named Content Name. Click on Save after you enter the text:

   ![2094](/img/a909fd3-Content_Name.png "Content Name.png")
10. You will now be back at your list of folders in the Content section with the file **deeplink** listed:  
     You have now successfully created the deep linking AMPscript.

::: info Code Snippet
The snippet below will follow this format. The code below also has a placeholder for `@branch_base_url`. Replace it with yours.
:::

```
%%[ VAR @deeplink, @branch_base_url SET @branch_base_url = "BASE URL FROM BRANCH" SET @deeplink = CONCAT(@branch_base_url, CONCAT("&%243p=e_et&%24original_url=", URLEncode(@link_to_be_wrapped, 1, 1))) ]%%
```

## Add Branch Links with AMPscript

Once you have completed configuring your AMPscript, you can now convert individual links in your existing email templates into Branch Links. You will need to do this for all links in your email template that you want to convert to Branch Links.

For example, if you want to convert the link below into a Branch Link:

```
<a href="https://branch.io/product/1234/"> I want it! </a>
```

This is what the link will look like in the email template **after** you add the AMPscript to convert it into a Branch Link:

```
%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/" ContentBlockByName("My Contents\branch\deeplink") ]%%
<a href="%%=RedirectTo(@deeplink)=%%">Example link</a>
```

The process to convert links into Branch Links using AMPscript is as follows (this flow converts the links in a separate document, and then pastes them back into your final template):

1. Log in to Salesforce Marketing Cloud
2. Click on **Email Studio** and then a sub-menu will appear. Click on **Email** in the dropdown menu:

   ![868](/img/8ca3e20-Email_Studio_2.png "Email Studio 2.png")
3. This will take you to the landing page for the Email section. Click on Content in the menu bar to navigate to the Content section:

   ![1070](/img/b38fedf-Content_2.png "Content 2.png")
4. Navigate to your folder containing your emails and open an existing email. Make sure the email is in HTML layout as shown below:

   ![612](/img/5cd7cd9-Campaign_Assocation.png "Campaign Assocation.png")
5. Choose a link that you want to convert to a Branch deep link. Copy the text right after the `href=` in your email template, and paste it into a separate document. In the example, it is:

   `"https://branch.io/product/1234/"`
6. Add `%%[ SET @link_to_be_wrapped =`  before the link in your separate document. In the example, this is now:

   `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/"`
7. Add `ContentBlockByName("My Contents\branch\deeplink"")]%%` after the link:

   `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/"ContentBlockByName("My Contents\branch\deeplink"")]%%`
8. From the original link in your template, copy the text from and including `<a` until the `href=`. Add it to the text after `%%` in the last step. Please include the `<a` but not the `href=`:

   `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/" ContentBlockByName("My Contents\branch\deeplink"") ]%% <a style="_any css can be added here_"`
9. Add `href="%%=RedirectTo(@deeplink)=%%"` to the end:

   `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/" ContentBlockByName("My Contents\branch\deeplink"") ]%% <a style="_any css can be added here_" href="%%=RedirectTo(@deeplink)=%%"`
10. From the original link in your template, copy the end of the tag, the link text, and the closing tag (`>I want it!` in the example) and add it to the end:

    `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/" ContentBlockByName("My Contents\branch\deeplink"") ]%% <a style="_any css can be added here_" href="%%=RedirectTo(@deeplink)=%%">I want it!</a>`
11. Copy your final result from the separate document back into your email template, replacing everything inside and including the `<a></a>` tags in the template.
12. Repeat this for all your links in your email template that you want to convert to Branch deep links.

::: info Link Conversion Summary
Wherever you use `<a>` tags in your email templates, replace those with AMPscript to convert the web URLs into Branch Links. The AMPscript references the [Content Area](ampscript-for-salesforce-marketing-cloud.md#add-a-new-content-area-for-easy-deep-linking) setup earlier.

```
%%[SET @link_to_be_wrapped = "ADD YOUR LINK HERE" ContentBlockByName("My Contents\branch\deeplink"")]%%
click="">
```

For example,  
**Before:**  
`<a href="https://branch.io/product/1234">Example link</a>`  
**After:**  
`%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234" ContentBlockByName("My Contents\branch\deeplink") ]%%`  
`<a href="%%=RedirectTo(@deeplink)=%%">Example link</a>`
:::

After you convert links into Branch Links in your email templates, you must also add Salesforce's link attribute `mc-deep-link="true"` to your link tags to ensure the app opens in iOS:

```
<a mc-deep-link="true" href="https://my.app.link/3p?$3p=e_et&$original_url=..." > Open App </a>
```

::: warning Content Area Folder
Make sure your `deeplink` Content Area [is in the right folder](ampscript-for-salesforce-marketing-cloud.md#add-a-new-content-area-for-easy-deep-linking). Either change the folder to "My Contents" or change the path used by "ContentBlockByName" in the Branch script.
:::
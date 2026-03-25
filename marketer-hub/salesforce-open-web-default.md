---
title: "Salesforce - Open Web Default"
slug: salesforce-open-web-default
---

## Overview

![image](/img/862df35-f5633ba-salesforce-open-web.png)

Meet Email Studio. Reach your customers with the world’s #1 email marketing platform. Build smarter email — from basic marketing campaigns to sophisticated 1-to-1 messages.

## 1. Complete Branch Email Prerequisites

::: info DEVELOPER MAY BE REQUIRED
The following Branch Email prerequisite includes providing URI schemes and other components that may require a developer:

- [**Add Deep Link Routing & Required Redirects**](https://dashboard.branch.io/configuration/general)
:::

::: warning DEVELOPER REQUIRED
The following Branch Email prerequisites involve app code changes:

- [**Implement the Branch SDK**](native-sdks-overview.md)
- [**Enable Universal Linking**](ios-universal-links.md)
- [**Add Your ESP’s CTD to Your Associated Domains Entitlement**](ios-basic-integration.md#section-configure-associated-domains)
- [**Add Handle Web-Only Content App Code**](ios-advanced-features.md#section-handle-links-for-web-only-content)
- [**Add Return YES to continueUserActivity**](ios-advanced-features.md#section-return-yes-to-continueuseractivity)
:::

## 2. Configure Salesforce

::: warning Enable web-only default tagging in your Salesforce Account
Work with your Salesforce and Branch Account Managers to enable web-only default tagging for your Salesforce BU, by providing your Salesforce account MID(s). Once enabled, all emails sent from those MIDs will click wrap every link with a click tracking domain using a `/u` path, which prevents the app from opening in iOS (*Emails that have already been sent before enabling will open the app because they will not have* `/u` *in the path*).

If you run Journey Builder / Triggered Sends, you must do one of the following to ensure the web-only tagging is applied to those emails:

- Republish the journey triggered sends via Email Studio Triggered Send dashboard
- Update the email activities in Journey Builder
- Create a new journey version
:::

**Secure your Salesforce Click Tracking Domain**

If your click tracking domain is not secure (i.e., secure domains will start with `https://`), you will need to purchase an SSL SKU from your Salesforce Account Manager.

**NOTE**: Please keep in mind Salesforce can take 4-6 weeks to process SSL certificate requests.

**Configure your AASA file in Salesforce Marketing Cloud**

Your Salesforce account must be configured to correctly handle Universal Links. Configure the settings in Deep Linking under the Send Management section in Email Studio. Ensure you're in the account corresponding to the correct click tracking domain.

![image](/img/1559434914239-og_image.png)

1. Enter the AppID value
2. Check the "Exclude Profile" and "Unsub Center" checkboxes to force links to these items to open in the browser and not the app, if desired.
3. Click "Save" to save the configuration.
4. Let Salesforce and Branch know that you've finished this step and your Technical Account Manager will verify that everything looks good.

## 3. Enable the Integration

To enable the integration:

1. In the left-hand navigation, click **Email**.
2. On the Email overview page, click the **Manager** tab at the top.
3. Find your ESP and click **Enable**.

   ![1428](/img/d00db86-salesforce-open-web-enable.gif "salesforce-open-web-enable.gif")

::: info
Branch automatically detects any global link settings you have already provided during the initial setup of your Branch account as outlined above.

If you have not set up your [global link settings and redirect preferences](configure-default-link-behaviors.md), you will be prompted to do so at this time.
:::

## 4. Provide Click Tracking Domain

Click tracking domains allow you to track engagement on email opens and link clicks.

If you're unsure what your click tracking domain (CTD) is, take a look at one of your recently sent emails. If you hover over the link or right-click/copy the link address, you will see that the domain of the link in the email does not match the URL in your HTML. This domain is your click tracking domain used by your ESP to provide you click reporting.

The Salesforce v1 Open Web Default integration requires you provide the following:

- **Click Tracking Domain** - The domain you use with Salesforce for links in emails

::: warning
Remove `http://` or `https://` when adding your click tracking domain in the Branch dashboard
:::

![2394](/img/fa15312-Screen_Shot_2020-11-13_at_1.02.21_PM.png "Screen Shot 2020-11-13 at 1.02.21 PM.png")

**KEEP IN MIND**

- You can enable the integration with multiple CTD if needed, but you cannot add the same CTD to multiple Branch dashboards or ESP integrations.

::: tip
Before you click **NEXT** and proceed to the **Validate & Test** section, please complete the following section as it’s required for passing integration validation.
:::

## 5. Validate the Integration

Once the SSL certificates and AASA file (iOS only) have been generated, you can proceed to reviewing the validation tests, fix any issues and then test the integration.

Branch automatically validates the following:

- iOS SDK is integrated (required)
- Android SDK is integrated (required)
- Deep linking is setup (required)
- Click Tracking Domain is setup (required)
- AASA file is valid (required)
- SSL is correctly setup (required)
- CNAME points to thirdparty.bnc.lt (case-by-case requirement)
- Universal Linking is setup (required)
- Hosted deep link data (optional)
- App Events being tracked (optional)
- Android App Links (optional)

![679](/img/fe7d7f2-setup-verification(1).png "setup-verification.png")

::: warning Common Validation Issues
**CNAME Does Not Point to Branch**

As this integration requires the CNAME to point to Salesforce, you will always get this error. You can safely ignore.

---

**SSL Not Correctly Set Up**

If you are having issues with the SSL certificate validating, the culprit is generally the fact that your click tracking domain already has SSL set up and there are restrictions that prevent a 3rd party from submitting a Certificate Signing Request on your behalf.

**AASA File is Invalid**

Luckily the easiest issue to fix as the main reason for this error is the fact that it depends on the SSL being set up correctly. By addressing the SSL error, the AASA file error should resolve itself simultaneously.
:::

## 6. Test the Integration

Once the validation process is complete, you can test the integration by generating a test link. The test link generated by Branch is unique in that it’s already converted to a Branch Link for you and allows you to test without creating an email template in your ESP. In reality, this conversion happens behind the scenes once a user clicks on your normal email template link.

To generate a test link:

1. In the **Validate & Test** section, input a URL from your website.
2. Click **Get Test Link**.
3. Once the Test Link is generated, you can share it via:
4. Copy to clipboard
5. SMS
6. Email

   ![698](/img/55bd2ed-test-link(1).gif "test-link.gif")

Once you’ve generated your test link, click the link on your mobile device; don’t forget to make sure your mobile device already has the app installed!

## 7. Generating Branch Links for Email

::: warning Domain Usage
Only use the app.link subdomain assigned to your app as the `branch_base_url`. Do not use custom subdomains or root domains.
:::

**1. Use Salesforce AMPscript to convert links**

Using Salesforce's AMPscript, we'll add a new Content Area in Salesforce that converts web links in your email templates into Branch Links.

1. Work with your Branch account manager to modify the following Salesforce AMPscript snippet, replacing `DOMAIN-HERE` with your Branch base domain (i.e., example.app.link):

   ```
   %%[ VAR @deeplink, @branch_base_url SET @branch_base_url = "https://DOMAIN-HERE/3p?%243p=e_et" SET @deeplink = CONCAT(@branch_base_url, CONCAT("&%24original_url=", URLEncode(@link_to_be_wrapped, 1, 1))) ]%%
   ```
2. After logging into Salesforce Marketing Cloud, click on **Email Studio** and then a sub-menu will appear. Click on **Email** in the dropdown menu:

   ![1338](/img/35b669e-Screen_Shot_2020-12-11_at_9.34.42_AM.png "Screen Shot 2020-12-11 at 9.34.42 AM.png")
3. This will take you to the landing page for the Email section. Click on **Content** in the menu bar to navigate to the Content section:

   ![1343](/img/31c4790-content.png "content.png")
4. In the Content section, you will see a list of folders on the left side. Right click on the **My Contents** folder and choose **Create Folder** in the content builder menu:

   ![1360](/img/2c61e0b-Screen_Shot_2020-12-11_at_9.35.50_AM.png "Screen Shot 2020-12-11 at 9.35.50 AM.png")
5. Name the folder `Branch`:

   ![1830](/img/4fda49a-Screen_Shot_2020-12-11_at_9.36.09_AM.png "Screen Shot 2020-12-11 at 9.36.09 AM.png")
6. Once the folder is created, in the upper right side, click on **Create** button, then click **Content Blocks** and finally click **Free Form**:

   ![2094](/img/fddd66a-Screen_Shot_2020-12-11_at_9.36.55_AM.png "Screen Shot 2020-12-11 at 9.36.55 AM.png")
7. On the **Free Form** screen, paste in the snippet you previouisly generated:

   ![2094](/img/e15d9a0-Screen_Shot_2020-12-11_at_9.38.50_AM.png "Screen Shot 2020-12-11 at 9.38.50 AM.png")
8. Click **Save**.
9. In the **Create Free Form** window that appears, enter `deeplink` in the text field named Content Name. Click on **Save** after you enter the text:

   ![2094](/img/60c7f68-Screen_Shot_2020-12-11_at_9.39.04_AM.png "Screen Shot 2020-12-11 at 9.39.04 AM.png")
10. You will now be back at your list of folders in the Content section with the file **deeplink** listed:

You have now successfully created the deep linking AMPscript.

::: info Code snippet
The snippet below will follow this format. The code below also has a placeholder for `@branch_base_url`. Replace it with yours.
:::

```
%%[ VAR @deeplink, @branch_base_url SET @branch_base_url = "BASE URL FROM BRANCH" SET @deeplink = CONCAT(@branch_base_url, CONCAT("&%24original_url=", URLEncode(@link_to_be_wrapped, 1, 1))) ]%%
```

**Configure your Salesforce email templates**

This section covers how to convert individual links in your existing email templates into Branch deep links. You will need to do this for all links in your email template that you want to convert to Branch deep links.

For example, if you decide to convert the link below into a Branch Link:

```
<a href="https://branch.io/product/1234/"> I want it! </a>
```

This is what the link will look like in the email template, **after** you added the AMPscript to convert it into a Branch Link:

```
%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/" ContentAreaByName("My Contents\branch\deeplink") ]%%
<a href="%%=RedirectTo(@deeplink)=%%">Example link</a>
```

The process to convert links into Branch Links using AMPscript is as follows (this flow converts the links in a separate document, and then pastes them back into your final template):

1. Log in to Salesforce Marketing Cloud
2. Click on **Email Studio** and then a sub-menu will appear. Click on **Email** in the dropdown menu.
3. This will take you to the landing page for the Email section. Click on **Content** in the menu bar to navigate to the Content section.
4. Navigate to your folder containing your emails and open an existing email. Make sure the email is in HTML layout.
5. Choose a link that you want to convert to a Branch deep link. Copy the text right after the `href=` in your email template, and paste it into a separate document. In the example, it is:

   `"https://branch.io/product/1234/"`
6. Add `%%[ SET @link_to_be_wrapped =`  before the link in your separate document. In the example, this is now:

   `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/"`
7. Add `ContentAreaByName("My Contents\branch\deeplink"")]%%` after the link:

   `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/"ContentAreaByName("My Contents\branch\deeplink"")]%%`
8. From the original link in your template, copy the text from and including `<a` until the `href=`. Add it to the text after `%%` in the last step. Please include the `<a` but not the `href=`:

   `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/" ContentAreaByName("My Contents\branch\deeplink"") ]%% <a style="_any css can be added here_"`
9. Add `href="%%=RedirectTo(@deeplink)=%%"` to the end:

   `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/" ContentAreaByName("My Contents\branch\deeplink"") ]%% <a style="_any css can be added here_"href="%%=RedirectTo(@deeplink)=%%" href="%%=RedirectTo(@deeplink)=%%"`
10. From the original link in your template, copy the end of the tag, the link text, and the closing tag (`>I want it!` in the example) and add it to the end:

    `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234/" ContentAreaByName("My Contents\branch\deeplink"") ]%% <a style="_any css can be added here_" href="%%=RedirectTo(@deeplink)=%%">I want it!</a>`
11. Copy your final result from the separate document back into your email template, replacing everything inside and including the `<a></a>` tags in the template.
12. Repeat this for all your links in your email template that you want to convert to Branch deep links.

::: info Link Conversion Summary
Wherever you use `<a>` tags in your email templates, replace those with AMPscript to convert the web URLs into Branch Links. The AMPscript references the [Content Area](#add-a-new-content-area-for-easy-deep-linking) setup earlier.

```
%%[SET @link_to_be_wrapped = "ADD YOUR LINK HERE" ContentAreaByName("My Contents\branch\deeplink"")]%%
<a href="%%=RedirectTo(@deeplink)=%%">Click Me</a>
```

For example,  
**Before:**  
`<a href="https://branch.io/product/1234">Example link</a>`  
**After:**  
`%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234" ContentAreaByName("My Contents\branch\deeplink") ]%%`

`<a href="%%=RedirectTo(@deeplink)=%%">Example link</a>`
:::

After you convert links into Branch Links in your email templates, you must also add Salesforce's link attribute `mc-deep-link="true"` to your link tags to ensure the app opens in iOS:

```
<a mc-deep-link="true" href="https://my.app.link/3p?$3p=e_et&$original_url=..." > Open App </a>
```

::: warning Content Area Folder
Make sure your `deeplink` Content Area is in the right folder. Either change the folder to "My Contents" or change the path used by "ContentAreaByName" in the Branch script.
:::

**2. Use Branch Short Links**

Add `"$3p":"e_et"` to the deep link data of any links you use in email to ensure Universal Link and click tracking works as expected. Then add any other deep link keys you need for your specific deep link use cases.

After you insert Branch Links into your email templates, you must also add Salesforce's link attribute `mc-deep-link="true"` to your link tags to ensure the app opens in iOS:

```
<a mc-deep-link="true" href="https://my.app.link/3p?$3p=e_et&$original_url=..." > Open App </a>
```

## Advanced

**[Optional] Tracking web links using Branch Links**

This integration will not let you track web links with Branch out-of-the-box as that will be done through Salesforce. There are a couple of workarounds to track web links if there is a need to track web links. These Branch Links will open the web -- not the app.

**Methods for creating Branch web tracking links:**

<details>
<summary>Method 1: Modified Branch Short Link</summary>

1. In the Branch Dashboard, create a [Short Link](https://branch.dashboard.branch.io/quick-links).
2. Add campaign tag for tracking.
3. In the Deep Linking tab, add **has\_app = false** and **$web\_only = true** to the link data.

   ![1942](/img/c1e59b9-sfdc-web-default(1).png "sfdc-web-default.png")
4. In the Redirects tab, set the web redirects for fallbacks. Select web URL for Android, iOS, and Desktop, and add the URL you want to redirect to.
5. After the link is created, add `_webonly` to the app.link domain.  
    \* Ex: If the link created is `https://branchster.app.link/weblinktest`, convert it to `https://branchster_webonly.app.link/weblinktest`.

</details>

<details>
<summary>Method 2: Branch Long Link</summary>

- Start with your app.link domain, and add `_webonly` to it.

  - Ex: If your app.link domain is `https://branchster.app.link`, convert it to `https://branchster_webonly.app.link`
- Add **has\_app = false** and **$web\_only=true** as query parameters.

  - Ex: `https://branchster_webonly.app.link?has_app=false&$web_only=true`
- Add **~campaign** tag to the link.

  - Ex: `https://branchster_webonly.app.link/?has_app=false&$web_only=true&~campaign=email-test-cam`
- Add the URI encoded web redirect link as **$fallback\_url**.  
   \* Ex: `https://branchster_webonly.app.link/?has_app=false&$web_only=true&~campaign=email-test-cam&$fallback_url=https%3A%2F%2Fwww.myweblink.com%2F`

</details>

**Analytics on the Branch Dashboard**

To see how the email campaigns have performed and break it down into campaigns, it is very essential to tag those links with the ~campaign tag. This will help dedupe the numbers and hence see the downstream events. You can add the campaign tag in any comparisons and filters in any Dashboard views.
---
title: "Oracle Responsys Configuration"
slug: oracle-responsys-configuration
---

## 1328

## Overview

Design and launch contextually relevant digital marketing campaigns to reach every consumer. Oracle Responsys helps you manage, personalize, and orchestrate interactions across all channels to deliver timely, helpful messages in the moments that matter—all without code, complex technical training, or reliance on other experts.

## How does it work?



1. User clicks on a link in an email from their mobile mail client (Gmail, Apple Mail, etc.)
2. If the user has the app installed and the link has a corresponding screen in the app, the app will open and deep link the user to the right content.

   - Ex. Product detail page, category shopping page, etc.
3. If the user does not have the app installed or the link only corresponds to a screen on the web, the user is routed to the website using their default mobile web browser.

   - Ex. Unsubscribe link, privacy policy, etc.

## Prerequisites

::: info Required Roles
Branch's Branch Email requires the following roles involved in order to enable:

- Developers
- CRM/Email Team
- Oracle Responsys Account Manager / Support Team
:::

In order to enable Responsys, you must first:

1. Have admin access to your [Branch Dashboard](https://dashboard.branch.io/).
2. Have Branch's Engagement [product](packaging.md) enabled for your Branch Account.
3. Implement the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - Set Up Deep Link Routing. How your mobile app routes to in-app content will determine how you will create and tag your Branch Links.

     - [Build custom routing inside the routing callback](in-app-routing.md#option-1-build-custom-routing-inside-the-routing-callback)
     - [Let Branch use your existing deep link routing](in-app-routing.md#option-2-let-branch-use-your-existing-deep-link-routing)
   - [Track events](track-branch-events.md)
4. Review our [Email Overview](email-overview.md) and [Basic Email Integration Guide](email-integration-guide.md) to understand the feature and our integrations.
5. Obtain or set up your Responsys **Click Tracking Domain** (CTD). Reach out to your Responsys account manager for assistance on this.

   - A Click Tracking Domain allows you to track engagement on email opoens and link clicks.
   - Your Responsys CTD must be `https` i.e. it needs to have a secure SSL certificate to meet Apple's apple-app-site-association (AASA) file requirements.

## Enable Oracle Responsys

### 1. Connect Oracle Responsys Service in Branch

In the Branch Dashboard in Email → [Manager tab](https://dashboard.branch.io/email/manager), find **Oracle Responsys** and click **Enable**

*[Image: 1428]*.gif "3b8ad86-oracle-responsys-enable.gif")

#### Input Click Tracking Domain

Additionally, Responsys hosts the AASA file for your click tracking domain. You can provide your **Responsys account manager's email** for Branch to send the AASA file.

Input your Responsys CTD into the domain field and click the **Save** button.

- **Do not** include `https://` when adding your CTD.



::: warning Click Tracking Domain
- Never add the same CTD to both your **Live** and **Test** Branch environments.
- You can enable the integration with multiple CTDs, if needed, but you **cannot** add the same CTD to multiple Branch Dashboards or ESP integrations.
:::

#### Host AASA File

Responsys will be the provider that hosts the AASA file. For this, reach out to your Oracle Account Manager or Support team to open a Support Request (SR) ticket to host the AASA file on the CTD.

Once you've entered your CTD, you should be able to see what your AASA file looks like to send to Oracle by clicking the **View AASA** hyperlink below the **Save** button.

AASA Hosting Requirements:

- Served over HTTPS
- Uses `application/json` MIME type
- Does not have an appended `.json` to the apple-app-site-association file name
- Has a size not exceeding 123 Kb (a requirement in iOS 9.3.1+)

Example AASA File:

```
{
    "applinks": {
        "apps": [],
        "details": [
            {
                "appID": "TJV89Z7327.com.branch.enterprise.mobileapp",
                "paths": [
                    "/pub/acc*",
                    "acc*"
                ]
            },
            {
                "appID": "U33TFKH78H.com.branch.mobileapp",
                "paths": [
                    "/pub/acc*",
                    "acc*"
                ]
            }
        ]
    }
}
```

::: tip Verify
Use Branch's [AASA Validator](https://branch.io/resources/aasa-validator/) to verify that Oracle is hosting your AASA file correctly on your CTD.
:::

### 2. Configure your App

#### Add your Responsys CTD to your Associated Domains

For your iOS App, you must add the CTD to the Associated Domains. Additional details can be found [here](ios-basic-integration.md#8-add-esp-ctd-universal-email).

.png "Associated Domains.png")

#### Add Handle Web-Only Content App Code

If you have links to content that exist only on the web and not in the app (for example, a temporary marketing webpage that isn't in the app), then this code snippet will ensure all links that have not had deep linking script applied will open in a browser. Details can be found [here](ios-advanced-features.md#section-handle-links-for-web-only-content).

#### Return `YES` to `continueUserActivity`

Additionally, you will need to add the CTD to your iOS app's info.plist file. Additional details can be found [here](ios-advanced-features.md#return-yes-to-continueuseractivity).

.png "branch-universal-link-domain.png")

### 3. Create Branch Links for your Emails

Before you start sending your email campaigns, you need to determine what flow you want the user to experience and flag your email links accordingly.

You will need to replace the web URLs in your email templates with Branch Links. There are a few different ways you can create Branch Links. Choose **one** of the following methods based on your current email marketing workflows:

| Method | Description | Recommendation |
| --- | --- | --- |
| Spreadsheet Formula Converter | Use a spreadsheet that contains a list of all of your email URLs used in your Responsys Link Tables to create a Branch [Long Link](creating-a-deep-link.md#long-links) that replaces your Link Table URLs. | Recommended if you are already using a spreadsheet to configure your email URLs for the Responsys Link Tables. |
| Script Upload | Create and upload a code snippet macro to programmatically create a Branch Link from an existing web link. Email Message Designer is required on your Responsys account. | Recommended if you are comfortable with setting up, configuring, and using scripts for Responsys Link Tables. |

#### Spreadsheet Formula Converter

This method assumes you are already using a spreadsheet to configure your email URLs. For this, you will create a Branch Link using a formula to convert a URL using the`CONCATENATE` method.

::: info Query Parameters
The formula will be using query parameters to programmatically convert your email URLs into Branch Link Links while utilizing any other key/value pairs for analytics tracking and deep linking. You will need to identify the following:

- The original web URL to convert
- The deep linking mechanism used by your mobile app
- Any analytics paremeters you want to use for tracking (ex. campaign name)
:::

```
=CONCATENATE(
	"https://{BRANCH_LINK_DOMAIN}.app.link/3p?%243p=e_rs&%24original_url=", {CELL_CONTAINING_WEB_URL},"&%24deeplink_path=", ENCODEURL({CELL_CONTAINING_URI_CELL}),
	“&~campaign=”, ENCODEURL({CAMPAIGN_NAME_CELL}),
	“&~channel=Email",
  "&~feature=", ENCODEURL({FEATURE_NAME_CELL})
)
```

| Parameter | Description |
| --- | --- |
| `{BRANCH_LINK_DOMAIN}` | Replace with your Branch Link Domain found [here](https://dashboard.branch.io/configuration/general). |
| `{CELL_CONTAINING_WEB_URL}` | Replace with the cell in your spreadsheet that has the original web URL. |
| `{CELL_CONTAINING_URI_CELL}` | Replace with the cell in your spreadsheet that indicates the URI scheme used by your app to determine deep linked routing screen navigation.  - Note: ⚠️ Do not include `"&%24deeplink_path=", ENCODEURL({CELL_CONTAINING_URI_CELL})` if your app is routing using web URLs. Only use for routing via URI schemes. |
| `{CAMPAIGN_NAME_CELL}` | Replace with the cell in your spreadsheet that indicates the name of the email campaign. |
| `{FEATURE_NAME_CELL}` | Replace with the cell in your spreadsheet that indicates the name of the feature (ex. app screen name). |

The final output should be a Branch Long Link that you use in your Responsys Link Tables. Add that Branch Link to the  **LINK\_URL, IOS\_LINK\_URL, and ANDROID\_LINK\_URL** fields of the Responsys Link Table



#### Script Upload

In this step, we'll upload a script that makes it very easy to create deep links in your emails. Please remember that this will require an EMD (Email Message Designer) enabled account.

1. Work with your Branch account manager to modify the following code snippet, replacing `DOMAIN-HERE` with your Branch base domain:

```
<#macro deeplink link_to_be_wrapped><#assign branch_base_url="https://DOMAIN-HERE/3p?%243p=e_rs"><#assign final_link=branch_base_url + "&%24original_url=" + link_to_be_wrapped?url("ISO-8859-1")><a href="${final_link}"><#nested></a></#macro> <#macro tracked_deeplink link_to_be_wrapped><#assign branch_base_url="https://DOMAIN-HERE/3p?%243p=e_rs"><#assign deeplink=branch_base_url + "&%24original_url=" + link_to_be_wrapped?url("ISO-8859-1")></#macro>
```

2. Log in to your Responsys account.
3. In the Responsys Dashboard, open your Content Library. You can also access it via the Shortcuts screen on the main page:

   
4. Once you are in the Content Manager, you’ll see a list of folders where content is stored. Under **All Content**, create a new folder named `Branch_SDK`:

   
5. Select the **Branch\_SDK** folder and then click **Create Document**:

   
6. In the Create Document window:

   - Enter `branch-sdk` in the “Document Name” field.
   - In the **Content Box**, delete all the text.
   - Paste the snippet you copied in **1**.
   - Click Save.

     

You have now successfully created the deep linking script. Your file structure should look as follows:



**Configure your Responsys email templates**

This code is referred to as the "Branch script" - this script will convert your web URLs to deep links.

The Responsys integration requires you to add email template code in two places.

1. At the top of an email template
2. Immediately before a hyperlink

Copy the following snippet, and using the “Source” view, paste the snippet directly under the `<html>` tag for every template you plan to add deep linking to.

```
<#include "cms://contentlibrary/Branch_SDK/branch-sdk.htm">
```

**Configuring the Responsys Link Table**

For the Branch SDK to generate Branch Links in the email or the 3P links while redirections, the Link Tracking table for the email template should contain the following two LINK NAME with the `${deeplink}` as the **LINK URL**.



*For creating tracked links, ensure that* ***‘Track Link’*** *is set to* ***ON****. Tracked links will be generated under the Responsys Click Tracking Domain and will then redirect to a Branch 3p link (the link added as the base URL in the Branch\_SDK.htm file.*

**Create deep links**

Wherever you are using `<a>` tags in your email templates, replace those with `<@deeplink>` tags, or add `<@tracked_deeplink />` for web URLs that you would like to deep link.

Here's how it looks with Link Tracking disabled.

*Before:*  
`<a href="https://branch.io">Example link</a>`

*After:*  
`<@deeplink "https://branch.io">Example link</@deeplink>`

With link tracking enabled, you can still use Branch Links in emails.

*Before:*  
`<a href="https://branch.io/product/1234">Example link</a>`

*After:*  
`<@tracked_deeplink "https://branch.io/product/1234" /> <a href="${clickthrough('TEST_TRACKED_DEEPLINK' , 'deeplink=' + deeplink)}">Example link</a>`



### 4. Handle Web-Only Content

In some cases you may have content on web that isn’t in the app - for example, a temporary Mother’s Day promotion or an unsubscribe button. You can designate links to only open on web if you use the Responsys Link Table feature. There are three URL fields in the link table when creating a new link: `LINK_URL`, `IOS_LINK_URL`, and `ANDROID_LINK_URL`. If you only enter the link in the `LINK_URL` field, the path of the final click-wrapped url will begin with `/pub/cc`. However, if you also input the same link in `IOS_LINK_URL`, then the path of the final click-wrapped url will begin with `pub/acc`. You should set up your AASA file to allow only the path `/pub/acc*` in order to not launch the app from web-only links.



### 5. View Analytics

Once completed and email campaigns are launched, you're ready to view data in the [Branch Dashboard](https://branch.dashboard.branch.io/email/activity).



## Troubleshooting and Extra Features

#### Styling

If you include style tags within your `<a>` tags, you’ll need to separate those out into a separate div inside the `<@deeplink>` tag. If you use tracked links with `<a>` tags, those will work fine.

Style Tags within your anchor tags like so:

Before:

```
<a href="https://branch.io/" style="color:#000001;text-decoration:none;">Branch Website</a>
```

After:

```
<@deeplink "https://branch.io/"><div style="color:#000001;text-decoration:none;">Branch Website</div></@deeplink>
```

#### Launch Failed Error

You’ll see this error if you haven’t included the `<#import >` snippet in your template.

```
Launch Failed: Launch failed: Template /contentlibrary/branch test campaign/My Default Template.htm caused an execution error: on line 183, column 92 in cms://contentlibrary/branch test campaign/Content.htm: deeplink is not a user-defined directive. It is a freemarker.template.SimpleScalar
```

#### Using dynamic data from profile extension tables

The `<@deeplink >` and `<@tracked_deeplink />` tags even work with dynamic links injected via RPL.

```
<@deeplink "${latestProduct.url}">${latestProduct.name}</@deeplink>
```

#### Dynamic Query Parameters

Certain links in the Responsys Link Table use dynamic variables as query parameters.  
 Ex. ....com/?key=${VALUE}  
 In some cases, the value parameter will require additional URI encoding in order for the final URL to be a valid link.
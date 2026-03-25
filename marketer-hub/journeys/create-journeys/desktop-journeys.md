---
title: "Journeys: Desktop Banners"
slug: desktop-journeys
---

## Overview

Journeys: Desktop Banners allow you to easily create beautiful views that direct users of your brand to your mobile app when viewing your website on a desktop. Similar to Branch's web-to-app Journeys, Journeys: Desktop Banners can be configured based on specific targeting criteria, scheduling, and more! Users will be greeted with a customized interstitial on your website with a QR code that they can use to scan with their mobile device to get to your app.



## Prerequisites

To implement Journeys: Desktop Banners, you need to have completed the following:

- Integrate the [Branch SDK](native-sdks-overview.md) into your app and configure deep link routing and attribution before implementing Journeys.

  - Journeys uses your alternate domain for iOS Universal Links and Android App Links. Make sure you include your `xxxx-alternate.app.link` domain in your Associated Domains. If you use a custom domain or subdomain for your Branch Links, you should instead add entries for `applinks:[mycustomdomainorsubdomain]` and `XXXX-alternate.app.link`.
- Add the latest version of the [Branch Web SDK](web-sdk-overview.md) to your site.

## 1. Select Audience

Start by clicking the blue **Create** button on the top right of any page on the Branch Dashboard then select **Journey** or by clicking **Create a New Journey** when on the Journeys page.

Customize the audience that will see your Journey by completing the following fields:

1. **Name Your Journey**: This name is how your Journey will appear in the dashboard view (it will never display to your users). Try to stick to a naming convention so that you can easily find Journeys later. For example Date - Template - OS - Target.
2. **What campaign is it part of?**: Campaign will automatically populate to match the Name of the Journey.
3. **What channel is it part of?**: Channel is not commonly used but will help you analyze your Journey’s later.
4. **Select the audience you want to target**: Desktop
5. **This Journey will show if user**: Using the following options add additional user targeting filters.

   | Filter | Description |
   | --- | --- |
   | Is located | Use this filter to target (or exclude) users viewing your website in different regions. You can target by country, state/province, or even by city. |
   | Is viewing a page url | You can define which subsets of your website the Journey will appear in. For example, maybe you have a page `yoursite.com/settings` and `yoursite.com/products/1234`. You could fill in products here so only users visiting a URL with that substring present would see the Journey. |
   | Came directly from a url | You can target a user based on the last touchpoint before they entered your website. For example, if you want to target users that found you through Google Search, you can select “whose domain matches” and fill in “google.com”. |

::: info Tips on Filtering
- Using multiple filters creates an “and” condition. Meaning, this Journey will only show if all of the conditions are true.
- You may add additional options for each filter

  - ex. Adding different URLs for the exactly matching clause.
- For URL filters, multiple URL entries creates an “or” condition. In other words, the journey will show if a user is visiting either URL A or B.
- If your web page ends with a "?", the question mark character will be treated as an optional expression quantifier for the **"viewing a page URL starting with"** filter. For example, when you set "yoursite.com/?" for this filter, the Journey will appear on "yoursite.com/?", "yoursite.com/settings" or "yoursite.com/".
- For certain filters (ex. *is viewing page url exactly matching...*), you can paste multiple values by clicking the **Edit All** button. This will effectively make that filter meet OR condition.

You can also view examples audience suggestions [here](example-journeys.md).
:::

6. Click **Save and Continue** when you're ready to move on to the next phase.



## 2. Configure Creative

In this phase, you will design the creative your audience will see, or add multiple view variations to A/B test the experience across your audience. To do this:

1. **Add Variation**: This feature allows you to run A/B test by designing multiple templates and assigning a percentage (total must equal to 100%) of your audience to each one to compare Journey performance. This will allow for rapid iteration as you track performance data. Click the **Add Variation +** button to add a new Journey banner/interstitial, and use the percentage fields to control the ratio of your audience that will see each variation.

.png)

2. Click **Select Creative** to start designing your banner/interstitial. You will be taken to the Templates page to select a template. Click the **Use** button on the template you want to work with.

### WYSIWYG

You must first name your creative in the **View Name** field. Try to stick to a naming convention so that you can easily find it later. Branch uses a *What You See Is What You Get* (WYSIWYG) editor to make customization easy. In the preview window, you can click the element you would like to customize (Title, Description, [Background Image](journeys-image-recommendations.md), etc.).



#### Editing QR Code

Click on the QR code in the WYSIWYG Editor to configure how the QR code looks for your Journeys. You can adjust the following elements of the QR code:

- Finder Style
- Code Pattern
- Color (Code, Background, and Finder)
- Center Logo



### Advanced UI Editor

For more detailed tweaks, use the **CSS Editor, HTML Editor, and Page Placement** tabs to customize your creative to match your brand guidelines.

::: info Advanced UI Configuration
We have a detailed guide on advanced UI configuration [here](advanced-journeys-ui-html-css.md).
:::



### Configuration

You can add additional tags and deep linking data on the **Configuration** tab.

- Tags: Additional tags you can add to your Journeys campaign to be used for reporting on the Branch Dashboard or exports.
- Deep Link Data: These are key/value pairs that will appear in your mobile app that can be used for things like deep linking, tracking, etc.

::: info Advanced Journeys Configuration
We have a detailed guide on utilizing deep link data [here](advanced-journeys-configuration.md).
:::

### Dismissal Settings

You can adjust the Journeys behavior when the creative is dismissed on the **Dismissal Settings** tab.

| Customization | Description |
| --- | --- |
| Dismissal Behavior | Choose what happens when a user dismisses a Journey.  “Close Journey” will simply cause the Journey to close upon being dismissed;  “Redirect to a web page” will cause the Journey to close and redirect to the webpage of your choice. |
| Dismissal Period | Use the dropdown to choose how long the Journey should be dismissed for.  Next, decide whether dismissing this Journey should cause only this Journey or all Journeys to be dismissed for the chosen period. |

Click **Save & Close** when you’re done customizing your creative.

You will be brought to the Configure Creatives step. You will see the name of the creative you created. You can create and edit another variation, or click **Save and Continue**.

## 3. Validate & Test

In the**Validate & Test** section, you should have green checkmarks that indicate if everything is set up properly. If you see any errors, go back to that step to complete the configuration. You can access a list of the errors and what they mean under [Troubleshooting](troubleshoot-journey-app-banners.md).

If you have multiple variations, you can preview them by using the dropdown menu.

### Scheduling

When you’re ready to start running your Journey, click the **Schedule** button. A **Schedule** box will appear, where you can configure the following:

- Start/Stop Time and Date
- Repeat Settings (Daily/Weekly)
- Time Zone

.png "Screen Shot 2021-07-12 at 10.49.21 AM.png")

If you’re ready to start running your Journey now, click **Start Journey**. Otherwise, click **Save & Close** to come back and start it later.
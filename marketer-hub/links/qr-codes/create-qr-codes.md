---
title: "Create QR Codes"
slug: create-qr-codes
---

::: info Attention
Explore Branch’s new linking experience for [Web Links](https://help.branch.io/docs/create-web-links-1#view-and-manage-links) and [App Links](https://help.branch.io/docs/create-app-links-new), which offer deep linking, flexible configuration, and link analysis across multiple platforms.
:::

## Overview

Within the Branch Dashboard, you can create, customize, and manage all of your QR Codes.

These QR Codes, powered by Branch Links, allow you to round out your marketing efforts to drive more users from places offline/in-person, video advertisements, and more!

## Before you begin

### Access

Access to QR Codes requires a premium plan. Please contact our [Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.

#### Permissions

To access the QR Codes [page](https://branch.dashboard.branch.io/qr-codes/manager) in the Branch Dashboard, which includes the **Manager** and **Analytics** tabs, the following must be true:

- For **App-Level Settings**, you have **View** permissions
- For **Link-Level Settings**, you have **View** permissions
- Under **Feature Filters**, you must have **Restrict link creation and editing to templates** disabled
- You are **not** an agency user

To manage and update your team's access settings, go to the **Teams** [tab](https://branch.dashboard.branch.io/account-settings/team) on the **Account Settings** page.

### Redirection behavior for printed QR codes

Changing a QR code's redirection between app linking and web-only (or vice versa) can change the underlying link URL. If the URL changes, any previously printed QR codes will no longer point to the updated destination.

How this behaves depends on your package:

- **Engagement (Legacy):** Toggling between app and web-only changes the link domain (for example., `mybrand.app.link` → `mybrand-web.app.link`), requiring a reprint.
- **Activation:** By default, the URL will not change when toggling. However, if you have configured separate web vs. app routing domains, the link may change, requiring a reprint.

Finalize your redirection strategy before printing.

## QR Code Creation

The steps below outline how to create a Branch QR Code. They walk you through the different layers of information you can add to your Branch QR Code to make it easier to analyze, look like your brand, and more.

### 1. Create QR Code

In the Branch Dashboard, navigate to the **Manger** [tab](https://dashboard.branch.io/qr-codes/manager) of the **QR Codes** [section](https://dashboard.branch.io/qr-codes/), then click the **+ Create QR Code** button.



### 2. Define QR Code

You must define your Branch QR Code with a **Title** and an **Original Web URL**.

Enter the values for these fields in their respective boxes.

It is recommended that you use a title that is descriptive of your campaign.



Click **Create QR Code Now** to generate your Branch QR Code or **Save & Continue** to configure your Branch QR Code further.

### 3. Add Analytics Tags

Similar to [Branch Short Links](create-quick-links.md), you can add your **Analytics Tags** here.

It is recommended that you add proper analytics tags to your Branch QR Codes to better analyze your campaign performance.



Click **Create QR Code Now** to generate your Branch QR Code or click **Save & Continue** to configure your Branch QR Code further.

### 4. Configure Redirects

In the **Redirects** section, you can determine what happens if the user scans the Branch QR Code and doesn't have your app installed.

You can configure the behavior to route the user to the app store, a webpage, or a [Branch Deepview](deepviews.md).



Click **Create QR Code Now** to generate your Branch QR Code or click **Save & Continue** to configure your Branch QR Code further.

### 5. Add Link Data

The **Link Data** section is for adding additional information about your Branch Link to your Branch QR Code.

These **Key** and **Value** pairs will be passed to the user's app session and can be used for additional analytics or deep linking.



Click **Create QR Code Now** to generate your Branch QR Code or click **Save & Continue** to configure your Branch QR Code further.

### 6. Customize QR Code

Finally, you can customize your QR code. In the **Customize** section, you can edit the **Finder Style**, **Code Pattern**, **Colors**, and **Center Logo**.



Click **Create QR Code Now** to generate your Branch QR Code.

### 7. Download QR Code

Once complete, you can download your Branch QR Code as a PNG, JPEG, or SVG.



#### File Format Best Practices

Branch QR Codes are designed to be high resolution - any file format you download will give you a Branch QR Code with a resolution of **300 pixels per inch** and an image size of **1667 x 1667 pixels**.

However, each file format (PNG, JPEG, and SVG) has its different use cases and benefits. Which one you should use depends on how you plan to use your Branch QR Code.

- **PNG**: Recommended for most general use cases. Larger file size. Not transparent.
- **JPEG**: Recommended for most general use cases. This includes digital content and printed materials. Not transparent.
- **SVG**: Recommended when being able to resize the image without losing quality is essential. This could include high-quality print materials (posters, flyers, large banners) or certain websites. Transparent background.
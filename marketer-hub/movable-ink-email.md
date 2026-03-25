---
title: "Movable Ink - Email"
slug: movable-ink-email
---

## Overview

This guide will walk you through how to setup your email campaigns with [**Movable Ink**](https://movableink.com) using Branch's Email feature to automatically convert your email links into **multi-platform deep links**.

Branch allows you to automatically convert your email links into multi-platform deep links that take users directly to content in the app on mobile devices, while still maintaining the same web experience for desktop and mobile users without the app.

When a link is clicked by a user without the app, it will route that user to the original web URL (including on desktop). When a link is clicked by a user with your app, it will direct that user into the relevant in-app content regardless of platform or email client.

::: warning Movable Ink Link Format
Please make sure that you are using web URLs on the Movable Ink platform rather than URI schema.
:::

## Setup Email Link

### Configure Your ESP

You can use Movable Ink personalization links with any ESP, so before we start to configure Movable Ink, please find your ESP in this list - [Email Partners List](email-partners-list.md) - and follow the integration guide to make sure that you have configured and enabled the integration.

### Setup Link Behavior

Once you have completed the ESP configuration, you can start adding Movable Ink links to the email body.

1. Please check this checkbox to tell Movable Ink that you are using Branch. Then Movable Ink can automatically append all required parameters.

![](/img/bfc0818-NSC-EnableBranchDeepLinking-290620-2045.pdf_2020-07-10_19-01-10.png "NSC-EnableBranchDeepLinking-290620-2045.pdf 2020-07-10 19-01-10.png")

2. Once enabled, you will see the option to **Copy Branch URL**. This will copy creative tags for email and mobile channels.

![](/img/845203b-small-Movable_Ink_Copy_Branch.png)

3. At the end of the Branch Link, make sure to append the `?deep_link=true` query parameter to the end of the URL.
4. Take the URL from step 3 (with the appended query parameter) and add it in the Moveable Ink UI to generate a new Moveable Ink link.
5. Append the `follow_redirect=true` query parameter to the end of the generated Moveable Ink link from step 4. This should be added as a [normal query parameter](personalization.md#required-redirect-parameter).
6. Take the URL from step 5 and add it to the Iterable email template.

### QA Testing for Movable Ink

To test tracking, take the finalized Branch URL that is placed within your email template and click the URL.

After the URL is clicked, you’ll check to make sure the clicks are recorded within the Movable Ink campaign dashboard.

![](/img/eb357a3-movable-ink-email2.png "movable-ink-email2.png")

If clicks are recording, then the setup is successful!
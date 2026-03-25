---
title: "Movable Ink - In-App Messages"
slug: movable-ink-in-app-messages
---

## Overview

This guide will walk you through how to setup your personalized campaigns with [**Movable Ink**](https://movableink.com) using Branch to automatically convert your links into **multi-platform deep links**

::: warning DEVELOPER REQUIRED
The following Push Notification prerequisites involve app code changes:

[Implement the Branch SDK](native-sdks-overview.md)  
[Enable Universal Linking](ios-universal-links.md)  
[Implement Push Notification support](push-notifications.md)
:::

## Setup Message Link

::: warning Movable Ink link format
Please make sure that you are using web URLs on the Movable Ink platform rather than URI schema.
:::

To create a message link, you must merge the **Branch domain** and **Movable Ink link**.

You can enable the Branch integration on the Movable Ink dashboard by updating your account settings on the Technical Account Setup page, just specify your deep linking provider domain. Clients with Branch for mobile must provide their unique Branch subdomain to further streamline the integration.



Once enabled, you will see the option, `Copy Branch URL`, as a split action button to copy creative tags for email and mobile channels.



### QA Testing For Movable Ink

To test the tracking you’ll take the finalized Branch URL that is placed within your email template and click the URL. After the URL is clicked, check to make sure the clicks are recorded within the Movable Ink campaign dashboard:



If clicks are recording then the setup is successful.
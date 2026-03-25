---
title: "GTM Overview"
slug: google-tag-manager
---

## Overview

Using Google Tag Manager (GTM) gives you a way to trigger actions that update your data in Branch.

These actions include logging events and setting user identities. To do this, GTM calls various Branch functions included in your SDK integration.

Which functions are called and when depends on how you configure your tags and triggers in GTM.

## Guides

To learn more about using GTM with Branch, visit our guides:

[Web](gtm-web.md)

[iOS](gtm-ios.md)

[Android](gtm-android.md)

## FAQs

> **Do I need to create multiple tags in GTM?**
>
> You may need to create multiple tags in GTM if you want to track more than one type of Branch Event. Each type of event you want to track will have a different tag.

> **Do I need to create multiple custom classes extending** `GoogleTagManager` **in my code?**
>
> No, you will create one custom class. All the tags you create in GTM will reference the same class path.

> **If I am already using a custom class for** `GoogleTagManager`**, can I use the same one for Branch?**
>
> Yes. You can leverage your existing custom class to track Branch Events. However you may decide you want to use a separate class code readability, maintainability, and debugging.

> **How do I detect which event to trigger from the** `execute()` **callback within my custom class?**
>
> You can pass a variable denoting the event type. This way, you can trigger Standard and Custom Branch Events accordingly in the `execute()` function's callback.
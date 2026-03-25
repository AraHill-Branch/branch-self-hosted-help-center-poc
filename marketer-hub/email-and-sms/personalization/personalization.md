---
title: "Personalization Overview"
slug: personalization
---

## Overview

Using Branch's Email offering allows you to automatically convert your email links into multi-platform deep links that take users directly to content in-app content on mobile devices, while still maintaining the same web experience for desktop users as well as mobile users without the app.

In conjunction with this, you can use third party - like [MovableInk](https://movableink.com/) and [Liveclicker](https://www.liveclicker.com/) - services to create personalized visual experiences that are based on relevant data and are unique for each and every one of your customers.

## Required Redirect Parameter

As these highly-personalized experiences require an additional redirect through the third party service, Branch requires an additional parameter appended to the URL you use in your Branch Email template. This parameter ensures Branch deep links your users to the personalized content you've created through the third party service.

For any Branch Email link that originates from a third party service such as MovableInk and Liveclicker, you must append the following parameter:

`$follow_redirect=true`

::: warning URL Encoding
Please URL encode all `$` symbols before appending the redirect parameter. URL encoding `$` returns `%24`.
:::

**Example URL + Redirect Parameter**

`https://cbsn.ws/2KW0dnE?%24follow_redirect=true`

::: info Things to Keep in Mind
Follow the normal ESP configurations in the `<a>` tags; e.g. if your ESP requires `%24deep_link=true` as a query param to “branchify”, add it in addition to `%24follow_redirect`.
:::

Deep link flagging is still required with your ESP. Check out the "Flag your deep links" section for your Branch Email ESP.
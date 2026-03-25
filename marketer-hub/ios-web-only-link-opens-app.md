---
title: "[iOS] Web Link Opens App"
slug: ios-web-only-link-opens-app
---

::: info Note
This only applies if you have an Engagement package *without* Activation.
:::

A web link should always open the browser directly instead of the app. A web only link should contain “**/e**” in the domain: **branch.app.link/e/ra8U77ukTbb**. *(This too applies if you have a custom subdomain.)* If the link does not contain /e, it will always open the app on iOS. If there is no /e in the link, edit the link in Branch.

1. Add `$web_only : true` in the link data.

   *[Image: 628]*
2. Save the link and you should see /e in the link.
3. Click the link directly and it should open the web instead of the app.
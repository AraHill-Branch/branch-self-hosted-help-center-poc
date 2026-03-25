---
title: "Add Custom Partners"
slug: adding-custom-partners
---

::: info Attention
Explore Branch’s new linking experience for [Web Links](https://help.branch.io/docs/create-web-links-1#view-and-manage-links) and [App Links](https://help.branch.io/docs/create-app-links-new), which offer deep linking, flexible configuration, and link analysis across multiple platforms!
:::

## Overview

If you’re running an internal campaign or working with a new partner that does not have an official Branch integration, then you can manually set up the partner in Branch. Plus, first-time Branch users can find it helpful to create a custom test partner for the purposes of implementing the SDK or testing attribution initially.

Partners can fill out this [web form](https://branchmetrics.typeform.com/to/P9vQks?_branch_match_id=791705225390101698) to become an integrated partner.

## Adding a Custom Partner

To manually add a custom partner in your Branch dashboard:

1. In the left-hand navigation, under **Channels & Links**, click on **Ads** and then **Partner Management**.
2. On the **Partner Management** page, click **+ Add Custom Partner** on the bottom left.
3. In the **Add New Custom Partner** modal, provide a clearly identifiable name.
4. Click **Save and Enable**.

![](/img/a78472b-Add_Custom_Partner.png "custom-partner.png")

## Additional Setup

To continue setting up your new custom partner, you can set up postback URLs and attribution windows. These are links used to measure ad displays and notify your partner of conversions, respectively.

### Postback Configuration

1. Click the **Add New Postback** button at the bottom of the screen.
2. A modal will appear with Branch default events, as well as any commerce or custom events you've set up. Select an event, enter a postback URL if you're asked to, and click **Save**. This will be the event that triggers your new postback.

![](/img/f5c4720-add-new-postback-modal1.png "add-new-postback-modal1.png")

::: info Advanced Postback Configuration
For more information on Configuring Advanced Postbacks, view our guide [here](advanced-postback-configuration.md).
:::

### Attribution Windows

You can edit your attribution windows at the partner level, if your partner requires it. This is recommended when you enable networks like Facebook and Google, who may have different windows for installs. With this, you can preserve your Account Level Attribution Windows, as well.

![](/img/98f0b4d-anaw_clear.png "anaw_clear.png")
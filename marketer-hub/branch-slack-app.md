---
title: "Branch Slack App"
slug: branch-slack-app
---



## Overview

Use the Branch Slack App to quickly and easily generate Branch Links within your Slack workspace. As with all Branch Links created, you'll have the power to deep link users to your mobile app while gaining valuable measurement on your link performance through the Branch Dashboard.

## Before you begin

To start using the Branch Slack App, you must:

1. Create a [Branch Dashboard](https://dashboard.branch.io/) and obtain your **Branch Key** from your [Account Settings](https://dashboard.branch.io/account-settings/profile).
2. Have a [Slack workspace](https://slack.com/get-started#/createnew).

## Creating links with the Branch Slack App

### Step 1: Add the Branch to your Slack Workspace

Add Branch to your Slack workspace by going to [branch.link/slack](https://branch.link/slack).



### 2. Configure the Slack App with your Branch credentials

Once you’ve added the Branch Slack App to your workspace, you must add the **Branch Key** obtained from the ["Before you begin" step](branch-slack-app.md#prerequisites) of this article.

.gif "Enter Branch Key.gif")

### 3. Create your link

You can now create links using the `/link` command. Here you'll be able to set specific configurations for your Branch Link like **Analytics Tags** and **Deeplink Data**. For additional details on these configurations, view our [Deep Link Reference](creating-a-deep-link.md).

The Branch Slack App will then output your Branch Link for you to send out.

.gif "Create Link Details.gif")

::: tip Tip
To create links faster, you can supply the `/link` command with the following arguments:

- `url`: The original web URL for your Branch Link. In cases where there isn't a mobile app page for your link, the users' web browsers will open to this link.
- `alias`: Also known as a link slug, an alias will help your link be more readable and easy to find later on. If this is left blank, Branch will generate a unique link hash for you.
:::

## Validate your link

If you would like to debug your link, you can use Branch's [Link Validator](link-debugger.md). You can quickly access this by adding `?debug=1` at the end of your Branch Link. Here you can also edit your link.

.gif "Link Debugger.gif")
---
title: "Link Debugger"
slug: link-debugger-deprecated
---

## Overview

Link Debugger allows you to see detailed information about your Branch Link. You will be able to see the click behavior of your Branch Link through and see all of the key/value pairs behind the link to help with any troubleshooting you might have with Branch Links.

## Prerequisites

In order to access the Link Debugger, you need **VIEW** access on the [**Link-Level Settings** Permissions](add-manage-users-roles-permissions-access.md) on your Branch Dashboard account.

## Accessing Link Debugger

There are a couple of different ways to access the Link Debugger on a given Branch Link.

### Short Links

Link Debugger can be accessed on Short Links through the [Branch Dashboard's Short Links Manager](https://dashboard.branch.io/quick-links/manager). Here you will find your Short Links, and with each Short Link you can access the Link Debugger using the **Debug** option



### URL Parameter

You can also access the Link Debugger on *any* existing Branch Link by adding the `debug=1` query parameter on your Branch Link. For example:

- Branch Link: `https://branch.app.link/link123`
- Link Debugger for Branch Link: `https://branch.app.link/link123?debug=1`

## Link Routing Debugger

A useful troubleshooting feature is the **Link Routing Debugger** section. The tool allows you to better understand how your link will route users across different browsers and operating systems.

In this section, you can get the step-by-step behavior of your Branch Link by selecting an OS and click location. From there, the Link Routing Debugger will outline the *click redirect outcome* depending on if the app is installed at the time of click or not.



## Link Details

You can also get granular information about your Branch Link by viewing the **Link Details** section.

With the Link Details section, you have the ability to view all of the respective key/value pairs attached to your Branch Link. These keys vary from analytics tags like *campaign, channel, & feature* to functional keys like *$deeplink\_path & $canonical\_url*.

In the *link data* key, you'll also see useful tooltips next to each key that defines it. This can be useful for developers and marketing teams to determine what other data may be tied to the Branch Link.


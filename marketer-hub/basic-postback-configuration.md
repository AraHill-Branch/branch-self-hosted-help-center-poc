---
title: "Basic Postback Configuration"
slug: basic-postback-configuration
---

## Overview

When Branch measures a conversion (install or other event), it determines which ad network or partner is responsible for generating the action, then attributes credit to the proper partner accordingly. Branch notifies partners of these events via Postbacks which are turned on when you enable any Ads integrated partner.

Branch’s postback system is highly customizable; set up postbacks for specific events, as well as specific subsections of events, filtered by link data, user data or event properties.

Ads partners support pre-defined postback templates to simplify the generation of the proper postback URL. If they require any additional information (such as an event-specific Goal ID), Branch displays empty fields for you to input that information that are automatically appended to the postback URL.

## Add postbacks

Basic postbacks are automatically activated for events like **INSTALL** and **PURCHASE** when you enable your ad partner. You can then add additional postbacks, for example, if you wanted to add postbacks for custom events that are specific to your app like **Account Created**.

To add a postback:

1. Under **Partner Management**, select the partner for whom you want to add/edit their postback.
2. Click on the **Postback Config** tab on said partner’s page.
3. Click the **Add New Postback** button at the bottom of the screen.
4. A modal will appear with Branch default events, as well as any commerce (reserved events like **PURCHASE**) or custom events you've set up.
5. Click **Save**.

![885](/img/0603855-Add_New_Postbacks.gif "Add New Postbacks.gif")

In some cases, you will also be prompted to enter a **Postback URL**. This means that Branch does not already have a pre-configured postback template for that partner and you need to provide a valid URL for your partner. You can get this URL from the ad partner.

## Disable postbacks

To disable any postback currently enabled for an ad partner:

1. Under **Partner Management**, select the partner for whom you want to disable the postback(s).
2. Click on the **Postback Config** tab on said partner’s page.
3. Uncheck the box in the **Enable** column for the postback you want to disable.
4. Click **Save**.

![885](/img/0e73ff5-Disable_Postbacks.gif "Disable Postbacks.gif")

::: warning Warning
Branch runs weekly jobs to disable all non-functioning postbacks.

Any postback that has failed consistently over the last 7 days - throwing only 400/500 errors - will be automatically disabled.
:::

## Delete postbacks

To delete any postback currently added for an ad partner:

1. Under **Partner Management**, select the partner for whom you want to delete postback(s) for.
2. Click on the **Postback Config** tab on said partner’s page.
3. Click the three dots icon to the right of the postback and click **Delete Postback**.
4. Click **Save**.

![](/img/24998ab-Delete_Postbacks.gif "Delete Postbacks.gif")

## Sending all events

::: warning Warning
As this setting will send **All Events** - with the name and customer event alias listed in this row, whether attributed to this partner or not - we recommend using caution when/if enabling, especially if you have enabled agencies to access your account.
:::

If you want to send **All Events** you can enable this setting by checking the box on the **All Events** column on a per postback basis. When checked, all events will be sent regardless of attribution. Otherwise, the postback will only fire for events attributed to the ad partner.

![](/img/c8fd7e7-Send_All_Events.png "Send All Events.png")

## Reset postbacks

There may be times when you need to reset a partner's settings; i.e. when a partner updates their postback templates or when perhaps you've made a mistake during partner setup. Resetting a partner's settings allows you to re-enable the partner integration with the correct information to accurately measure and attribute conversion.

::: warning Warning
Resetting partner settings will:

- Disable the ad partner.
- Clear out all of your saved credentials and postbacks that are already set up.
- Return the ad partner to its basic configuration.
:::

To reset a specific partner's postbacks:

1. Click on the **Account Settings** tab of the partner in question.
2. Click the **Reset All Settings** button in the right-hand corner.

![](/img/image-1744990776470.png "Reset Postbacks.png")

## Allowlist postback IP addresses

If required by your setup, allowlist the following postback server IP addresses for security purposes:

|  |  |
| --- | --- |
| - 52.43.119.253/32  - 100.21.145.61/32 - 35.160.5.60/32 - 35.163.128.27/32 - 54.241.169.87/32 - 44.229.177.148/32 - 35.167.148.222/32 - 44.231.103.124/32 - 44.237.121.167/32 - 44.238.95.201/32 - 52.52.236.153/32 | - 44.247.175.42/32 - 44.247.58.38/32 - 52.33.75.0/32 - 52.34.127.49/32 - 54.177.16.103/32 - 54.213.17.93/32 - 184.169.196.16/32 - 35.161.135.86/32 - 44.230.175.24/32 - 52.27.172.117/32 - 35.160.133.187/32 |

### Optional: Configure AWS security group

**If you have an AWS account** you use for webhooks, you will need to create a security group, as well as a series of inbound rules associated with that security group.

Note that this example **does not include** the entire list of IP addresses you need to make rules for. Find those [above](basic-postback-configuration.md#allowlist-postback-ip-addresses).

![AWS security group details showing inbound rules and IP allowlist configurations for postbacks.](/img/Branch_IP_Allowlist_SG_Example.png)

### Optional: Configure GCP firewall policy

**If you have an GCP account** you use for webhooks, you will need to create a firewall policy, as well as a series of firewall rules associated with that policy.

Note that this example **does not include** the entire list of IP addresses you need to make rules for. Find those [above](basic-postback-configuration.md#allowlist-postback-ip-addresses).

![GCP firewall policy details showing various rules and their configurations for postbacks.](/img/Branch_IP_Allowlist_GCPFWRules_Example.png)
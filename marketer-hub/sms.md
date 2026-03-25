---
title: "SMS"
slug: sms
---



## Overview

SMS continues to be a reliable channel to acquire/engage your users into your platform where they receive the best possible experience with your brand. Typical campaigns are effective, but they can be difficult to properly track.

Branch can be used to help power your SMS campaigns through the use of Branch Links.

### SMS Use Cases

- Programmatic Branch Link creation for sending through your SMS provider
- Drive users from Desktop Web to app via SMS
- Re-engage current users on new product launches, sales, etc.
- Attribute downstream app events to SMS campaigns

## How does it work?

1. User receives an SMS
2. App opens  
    -The user may be routed to the App/Play Store if they don't already have your app installed
3. User is deep-linked into specific app content
4. Events (ex. purchases, sign-ups, etc.) are attributed back to SMS campaign



## Access

Access to Branch Deep Links and the Deep Linking API requires a premium plan. Please [contact our Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.

## Integration Guide

::: warning Developer Required
Developers knowledgeable with APIs, Web, and Mobile Development may be required.
:::

#### 1. Capture the users' phone number

This can be in the form of an input/text field on your website, through a mailing list/database, etc.

#### 2. Create & Configure your Branch Link

Branch Link creation options:

- [Short Link](create-quick-links.md)

  - Ideal for one-off campaigns
- [Deep Linking API](deep-linking-api.md)

  - Ideal if you are looking to programmatically generate Branch Links at scale
- [Mobile SDKs](native-sdks-overview.md)
- [Web SDK](web-sdk-overview.md)
- [Chrome Extension](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf)

Additional information on configuring your Branch Link can be found [here](creating-a-deep-link.md).

#### 3. Include the generated Branch Link in the SMS sent to the user by your SMS service provider

SMS Service Providers:

- [Twilio](https://www.twilio.com/messaging/sms)
- [Salesforce Marketing Cloud](https://www.salesforce.com/products/marketing-cloud/overview/)
- [Clickatell](https://www.clickatell.com/)
- [ClickSend](https://www.clicksend.com/us/)
- [BurstSMS](https://www.burstsms.com/)
---
title: "Stitch"
slug: stitch
---

## Stitch Webhooks

*[Image: 533]*.png "header2-1-1587756104876.png")

This guide will walk you through how to send your Branch data to [**Stitch**](https://www.stitchdata.com/) using Branch Webhooks. Enabling this integration will result in automatically forwarding Branch events to Stitch.

::: info Replication, Schema, Webhook URLs, & Security
For additional information on Replication, Schema, Webhook URLs, & Security, please follow [Stitch's documentation](https://www.stitchdata.com/docs/integrations/webhooks/branch).
:::

## Setup

### Prerequisites

- This guide requires you to have integrated the (Branch SDK)[https://help.branch.io/developers-hub/docs] in your mobile apps.
- You also need to be a Stitch customer

### 1. Add Branch as a Stitch data source

1. [Sign into your Stitch account.](https://app.stitchdata.com/)
2. On the Stitch Dashboard page, click the **Add Integration** button.
3. Click the **Branch** icon.
4. Enter a name for the integration. This is the name that will display on the Stitch Dashboard for the integration; it’ll also be used to create the schema in your destination. For example, the name “Stitch Branch” would create a schema called stitch\_branch in the destination. **Note**: Schema names cannot be changed after you save the integration.
5. Click **Save Integration**.

### 2. Generate a Branch Webhook URL

Once Stitch has successfully saved and created the Branch integration, you’ll be redirected to a page that displays your Branch webhook URL and token (which is blurred in the image below):

*[Image: 625]*

Click the **Copy** button to copy it.

**Note that this particular URL won’t display in Stitch again once you click Continue**. Think of this URL like you would your login or API credentials - **keep it secret, keep it safe**. You can, however, [generate another URL](https://www.stitchdata.com/docs/integrations/webhooks/branch#webhook-urls-security) should you need it.

Once you’ve copied your webhook URL, click **Continue** to wrap things up in Stitch.

### 3. Set up webhooks in Branch

1. Log in to the [Branch Dashboard](https://branch.dashboard.branch.io/).
2. Navigate to [Webhooks](https://branch.dashboard.branch.io/data-feeds/webhooks/) in Data Feeds.
3. Add a new webhook
4. In the window that displays:

   - Paste your Stitch-generated webhook URL in the URL field.
   - Leave the method (POST) as-is.
   - Set the notification frequency using the drop-down menu. You can choose to receive a webhook for every single event occurrence or only for the first time that event is triggered for a unique user.  
      -Set the [event trigger](https://dev.branch.io/getting-started/webhooks/guide/#event-trigger) using the drop-down menu.
5. When finished, click the Add webhook button.
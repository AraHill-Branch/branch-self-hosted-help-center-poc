---
title: "Advanced Postback Configuration"
slug: advanced-postback-configuration
---

## Overview

After enabling basic configurations for your ad network Postbacks, you may want to make more advanced edits to the configuration depending on your specific use case and what types of data you want to filter for your postback. In most cases, the default postback URL generated from your selections is sufficient to provide postback notification to interested parties. But sometimes you may need/want to edit or remove a parameter from the postback URL(s) or append a macro expression/variable to include additional information.

::: info Note
For [basic postback configuration instructions](https://help.branch.io/docs/basic-postback-configuration) or [information on testing postbacks](https://help.branch.io/docs/testing-postbacks), please visit Marketer Hub.
:::

#### Advanced Postback Configuration Examples:

| Goal | Reason(s) | Solution |
| --- | --- | --- |
| Send your ad partner the actual items that the end-user adds to their cart. | 1. Ad partner can optimize campaigns based off of those items. 2. The basic **Add to Cart** postback template does not include this information. | [Add Macros](advanced-postback-configuration.md#addingediting-macros) for **Content Items**: `${(content_items[0].$product_name)!}` as the value to an *ad-partner-provided* query parameter key in the postback URL. |
| Only send the **INSTALL** postback for specific agencies. | Only specific agency-run campaigns should be sending installs to the ad partner. | [Add a Filters](advanced-postback-configuration.md#adding-filters) to the **INSTALL** postback template to specify which agency IDs to filter for. |
| Only send a **PURCHASE** postback for a specific coupon. | Because you have many different coupon codes, you only want to send one type. | [Add a Custom Filter](advanced-postback-configuration.md#custom-filters) to the **PURCHASE** postback template to specify which coupon string is applied to a given **PURCHASE** event to filter for. |

## Adding/Editing Macros

Postback macros are key/value pairs appended to a postback URL as query parameters. With it, ad partners will receive specific data points about the postback to help optimize campaigns. To view all available macros, view our guide on Postback Macros & Functions [here](postback-macros-functions.md).

### Add Pre-built Macros

You can select a postback URL key from a pre-built list. Once you add your key, the postback macro will be auto-filled. To add a pre-built macro:

1. Under **Partner Management**, select the partner for whom you want to add/edit their postback.
2. Hover on the three dots icon to the right of the postback and click **Advanced Edit**.
3. An **Edit Postback** modal will pop up and you can add pre-built macros in the **Add Pre-built Macros** section. Click the **+ Add Pre-built Macro** button.
4. Click **Save** after you finish making macro edits.

![](/img/9e79463-Add_Pre-built_Macros.png "Add Pre-built Macros.png")

### Free Form Edit

If you want to have full control of your postback macros, you can make direct edits through a free-form field. To make a free form edit to a postback URL:

1. Under **Partner Management**, select the partner for whom you want to add/edit their postback.
2. Hover on the three dots icon to the right of the postback and click **Advanced Edit**.
3. An **Edit Postback** modal will pop up and you can make edits to the **Free Form Edit** field by adding/editing/removing the key-value pairs necessary.

   - You must include an `&` character before each key-value pair you append.
4. Click **Save** after you finish adding your desired macros.

![](/img/5f9c22b-Free_Form_Edit.png "Free Form Edit.png")

### Custom Macros

You can also create any custom macro for your postback URL with any key-value pair. To add a custom macro:

1. Under **Partner Management**, select the partner for whom you want to add/edit their postback.
2. Hover on the three dots icon to the right of the postback and click **Advanced Edit**.
3. An **Edit Postback** modal will pop up and you can add custom macros to the **Add Custom Macros** section. Click the **+ Add Custom Macro** button.
4. Click **Save** after you finish adding your desired macros.

![](/img/e2d7877-Custom_Macros.png "Custom Macros.png")

## Adding Filters

In order to add a filter, you need to update the postback template:

1. Under **Partner Management**, select the partner for whom you want to add/edit their postback.
2. Hover on the three dots icon to the right of the postback and click **Advanced Edit**.
3. An **Edit postback** modal will pop up
4. Go to the **Filters** tab. Click the **+ Add New Filter** button.

   - Edit your filter **Comparitor** and **Value(s)**
5. Click **Save** to apply the filter.

![](/img/dbc55bb-Add_Filters.png "Add Filters.png")

### Custom Filters

Custom filters allow you to leverage a wide variety of data points like link data, user data, and event data. Format and spelling are crucial to making sure custom filters work properly, so make sure you've taken a look at the data format.

Creating a custom filter is similar to adding a standard filter. You must select **Custom** when adding a filter.

1. Type in the key that you'd like to filter on

   - You can find all of the keys here. Depending on the key you are filtering on, it may be part of the top-level data (ex. `timestamp` or it may be nested (ex. `event_data.coupon`)
2. Set the filter logic (**equals** or **not equals**)
3. Set the input values.

![](/img/e6ce6d1-Custom_Filters.png "Custom Filters.png")

## Using HTTP POST Method

By default, Branch sends postbacks via the HTTP `GET` method. You can, however, choose to have the postback sent via the HTTP `POST` method instead.

To change the HTTP method to POST:

1. Under **Partner Management**, select the partner for whom you want to add/edit their postback.
2. Hover on the three dots icon to the right of the postback and click **Advanced Edit**.
3. An **Edit postback** modal will pop up
4. Go to the **Filters** tab.
5. In the **Postback Details** section, change the HTTP method from **GET** to **POST**.
6. In the **Headers** tab, click the **+ Add New Header** button to add new headers.
7. In the **Body** tab, add any other [Freemarker expressions](postback-macros-functions.md) you'd like.
8. In the **Filters** tab, add any filters you'd like.
9. Click **Save**.

![](/img/e8d99e8-HTTP_POST_Method.png "HTTP POST Method.png")
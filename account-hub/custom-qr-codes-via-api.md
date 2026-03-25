---
title: "Custom QR Codes via API"
slug: custom-qr-codes-via-api
---

## **Overview**

Branch has updated the [Quick Link (Short Link) API](https://help.branch.io/apidocs/quick-links-api) to support QR code customization during link creation. Previously, links created with the API generated a standard black-and-white QR code by default. With this update, developers can programmatically apply branding and design settings to the QR codes associated with their Short Links.

This update streamlines the workflow for creating branded assets at scale. You can now generate deep links and their corresponding branded QR codes in a single API call, removing the need to manually customize QR codes in Branch after link creation.

## **How it works**

When creating a link, you can include the `qr_code_settings` object in the request. This object accepts the same styling parameters as the [QR Code API](https://help.branch.io/apidocs/qr-code-api).

When you create a Short Link with `qr_code_settings`, both the Short Link and its customized QR code are generated instantly and appear in Branch.

### **Example API request**

```
curl -XPOST https://api2.branch.io/v1/url \
  -H "Content-Type: application/json" \
  -d '{
  "branch_key": "key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt",
  "channel": "facebook",
  "feature": "onboarding",
  "campaign": "new product",
  "type": 2,
  "data": {
    "$marketing_title": "My QR Code via API",
    "$desktop_url": "http://www.example.com"
  },
  "qr_code_settings": {
    "code_pattern": 1,
    "finder_pattern": 2,
    "finder_pattern_color": "#D94280",
    "frame_style": 1,
    "code_shape": 1,
    "code_color": "#D94280"
  }
}'
```

::: info Note
In the API call, you must specify `type=2` to customize a QR code.
:::

## **Availability**

This feature is available to customers with [Engagement Pro](products.md#engagement), or those with access to both the Quick Link (Short Link) API and QR Codes API.

All users with access can view and download the customized QR codes in Branch.

The ability to edit QR codes created with an API depends on which Branch interface you currently have:

- **Activation Essentials or New Branch**: Users can edit the QR code design directly within Branch after creation.
- **Legacy Branch**: The QR code design is read-only in legacy Branch. To edit the design, you must update the link via the API or delete and create it again.

::: info Note
This feature is not available in the Deep Linking API.
:::
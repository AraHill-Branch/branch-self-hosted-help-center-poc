---
title: "QR Code API"
slug: qr-code-api
---

# QR Code API

## Overview

The QR Code API is an HTTP API that can be used for creating custom QR Codes programmatically. Every QR Code will contain a unique Branch link which you can deep link and track analytics with.

## Packaging

Access to the QR Code API requires a premium plan. Please [contact our Sales team](https://branch.io/contact-sales/) to learn more about pricing and availability.

## Authentication

For calls to the QR Code API, you will need your Branch Key.

### Legacy Branch

To retrieve your Branch Key in the legacy Branch experience:

1. Navigate to the **Account → Settings → Profile** tab.
2. Use the **copy icon** to copy your Branch Key.

### New Branch

To retrieve your Branch Key in the new Branch experience:

1. Navigate to the **Configuration → Security & Access → Credentials** tab.
2. Use the **copy icon** to copy your Branch Key.

Visit our [Credentials guide](/account-hub/new-branch/configuration-new/security-and-access-new/credentials-new) to learn more about managing your Branch credentials.

## Endpoint

```
POST /v2/qr-code
Content-Type: application/json
```

## Rate limits

- 25 requests per second
- 100 requests per minute
- 1000 requests per hour

## Sample request

```bash
curl --request POST \
  --url https://api2.branch.io/v2/qr-code \
  --header 'accept: image/*' \
  --header 'content-type: application/json' \
  --data '
  {
    "qr_code_settings": {
      "code_pattern": 1,
      "finder_pattern": 1,
      "image_format": "png",
      "center_logo_url": "https://cdn.branch.io/branch-assets/1598575682753-og_image.png",
      "width": 300,
      "margin": 1,
      "code_color": "#000000",
      "background_color": "#FFFFFF",
      "finder_pattern_color": "#000000",
      "finder_eye_color": "#000000"
    },
    "branch_key": "key_live_xxxx"
  }
  ' \
  --output qr_code.png
```

::: tip Image output
The output of this cURL request is binary image data. Pipe it to a file (like `qr_code.png`) as shown in the `--output` flag above.
:::

## Full reference

For the complete list of parameters, request/response schemas, and an interactive Try-it panel, see the [Create QR Code endpoint reference](./operations/createQRCode).

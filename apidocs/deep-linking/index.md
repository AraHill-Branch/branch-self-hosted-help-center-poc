---
title: "Deep Linking API"
slug: deep-linking-api
---

# Deep Linking API

::: warning Placeholder spec
This is a minimal POC spec used to prove that the API docs pipeline scales to multiple APIs. Replace `openapi.yaml` with the full Branch Deep Linking API spec before treating this as real documentation.
:::

## Overview

The Deep Linking API lets you create and manage Branch deep links programmatically. Every link created by this API is a fully-featured Branch link — it can be shared, tracked, and will open the app (or fall back to the appropriate platform destination) when clicked.

## Authentication

For calls to the Deep Linking API, you will need your Branch Key. See [the QR Code API overview](/apidocs/qr-code/#authentication) for instructions on retrieving it.

## Endpoint

```
POST /v1/url
Content-Type: application/json
```

## Full reference

For the complete parameter reference and an interactive Try-it panel, see the [Create Deep Link endpoint reference](./operations/createDeepLink).

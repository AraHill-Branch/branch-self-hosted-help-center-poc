---
title: "Conversion Value Mapping Partner API"
slug: conversion-value-mapping-partner-api
---

## Overview

If you have opted-in to use [SKAdNetwork with Branch](https://help.branch.io/using-branch/docs/enable-skadnetwork), the Branch SDK will call the two necessary Apple methods for SKAdNetwork to enable postbacks to ad partners on your behalf. Conversion values are mapped with your highest value conversion events sent to Branch via the SDK. These mappings are accessed by ad networks for reporting through Branch's SKAdNetwork Partner API.

For this, we will utilize a JSON Web Token (JWT), an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

## Prerequisites

In order to start using Branch's SKAdNetwork Partner API, you need the following:

1. IT/Developer resources for generating access tokens and making API calls.
2. [Enabled SKAdNetwork via Branch SDK](https://help.branch.io/using-branch/docs/enable-skadnetwork).
3. Ad Partner that is fetching the conversion value mappings using Partner API is enabled for your Branch account.

   1. Contact [Branch Support](submit-a-ticket.md).

## Share Client Credentials Ad Partner

### 1. Request Ad Partner Public Key

Create a public key that Branch will use to share the encrypted API credentials for the Ad Partner

1. Generate a public key using GPG:

   ```
   gpg --gen-key
   ```
2. Export the public key:

   ```
   gpg --armor --output file-enc-pubkey.txt --export '{{key_uid}}'
   ```
3. Send the `file-enc-pub.txt` and `key_uid` to [Branch Support](submit-a-ticket.md).

### 2. Decrypt Credentials

After providing the Public Key to Branch support, they will create and encrypt an API Credentials file that will be sent to you. Once you have the credentials, decrypt it using gpg:

```
gpg --output api-creds.txt --decrypt api-creds.txt.gpg
```

### 3. Generate JWT Access Token

Using the credentials from decrypting, generate an access token for Branch SKAdNetwork Partner API with daily validity:

```
curl -X POST \
  https://branchmetrics.onelogin.com/oidc/2/token \
  -H 'Authorization: Basic <base64 encoded client_id:client_secret>' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&resource=https://auth.branch.io/services/partners-api&scope=https://api.branch.io/auth/scopes/{PARTNER_3P}/conversion_value_mappings.read'
```

## 4. Call the Branch Conversion Value Mapping Partner API

Now you can call the Branch Conversion Value Mappings API with the provided access token:

```
curl -X GET \
  'http://api2.branch.io/v3/partners/<partner_3P>/conversion-value-mappings?app_id=<iTunesId>' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}'
```

Please note that the `/v3/partners/` endpoint will work for SKAN 4.0 as well as SKAN 3.0 and below.
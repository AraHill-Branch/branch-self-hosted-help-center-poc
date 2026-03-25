---
title: "Configure SSO With Google"
slug: configure-sso-with-google
---

## Introduction

This guide provides step-by-step instructions for setting up Single Sign-On (SSO) with Branch using **Google** as your Identity Provider (IdP).

This guide will:

1. Help you get your configuration details from Branch.
2. Show you how to create and configure a SAML 2.0 application in Google Workspace.
3. Link you back to the main [Configure SSO guide](configure-sso.md) to complete the setup.

## Configure SSO

To configure SSO, you’ll need to get your unique URLs from Branch, configure Google, and then finish the setup in Branch.

### Before you begin

Before you begin, ensure you have:

- Admin access to your Branch account.
- Admin access to the Google Admin console.
- SSO enabled for your Branch account.

  - Access to SSO requires a Branch plan. Please visit our [Pricing](https://www.branch.io/pricing/) page or [contact our Sales team](https://branchdocs.app.link/e/sso-sign-up) to learn more about pricing and availability.

### Step 1: Get configuration details from Branch

This step is different depending on whether you are on the [legacy](branch-dashboard-overview.md) or [new](new-branch-overview.md) Branch experience. The rest of the steps remain the same between the two platforms.

### Step 2: Configure Google SAML

In a different tab, log in to your Google Admin console to create the Branch application.

1. In Google Admin, navigate to **Apps** → **Web and mobile apps**.
2. Select **Add app** → **Add custom SAML app**.
3. On the App details page, enter an app name (e.g., "Branch") and optionally add a description or upload an app icon. Select **Continue**.



### Step 3: Download Google IdP details

On the **Google Identity Provider details** page in Google Admin, there is configuration information that you'll need for Branch.

Keep this page open - you'll need to copy the **SSO URL** and download the **Certificate** in the next step.



### Step 4: Configure connection in Branch

Before completing the Google configuration, you need to provide Google's IdP details to Branch.

1. Go back to your Branch **Configure Custom SAML** browser tab (from Step 1).
2. On the **Configure connection** page, select **Manual**.
3. Copy the **SSO URL** from Google (from Step 3) and paste it into Branch's **Single Sign-On Login URL** field.
4. Select **Download Certificate** in Google's setup page to download the certificate file.
5. Upload this certificate file to Branch's **Signing Certificate** field.
6. Keep the Branch tab open - you'll complete the connection after finishing the Google setup.

### Step 5: Configure service provider details in Google

Return to the Google Admin console to complete the SAML app configuration.

1. On the **Service provider details** page, fill in the fields using the values from the Branch tab you kept open from Step 1:

   1. ACS URL: Paste the **Single Sign-On URL** from Branch.
   2. Entity ID: Paste the **Service Provider Entity ID** from Branch.
   3. Start URL (optional): Leave blank.
   4. Signed response: Leave unchecked.
2. Configure the **Name ID** settings:

   1. Name ID format: Set to **UNSPECIFIED**
   2. Name ID: Set to **Basic Information > Primary email**
3. Select **Continue**.

### Step 6: Map attributes in Google

Branch requires three attributes to be sent in the SAML response to provision and identify users.

::: danger Warning
To set up a successful mapping, you must use the attribute names `firstName`, `lastName`, and `email` exactly as they are capitalized and spelled here. Do not use URN or OID formats.
:::

| **Google Directory attributes** | **App attributes** |
| --- | --- |
| Primary email | `email` |
| First name | `firstName` |
| Last name | `lastName` |

1. On Google’s Attribute mapping page, use **Add mapping** to add each attribute from the table above.
2. Make sure you enter the app attribute names exactly as spelled and cased here: `email`, `firstName`, `lastName`
3. Select **Finish** to save your Google Workspace application.

### Step 7: Test SSO

Use [step 2.4](configure-sso.md#step-24-test-sso) from our main SSO guide to test the connection between Google and Branch.

## More information

For more complete information about configuring SSO for Branch, visit our [Configure SSO (General SAML) guide](configure-sso.md).
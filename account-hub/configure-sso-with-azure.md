---
title: "Configure SSO With Azure"
slug: configure-sso-with-azure
---

## Introduction

This guide provides step-by-step instructions for setting up Single Sign-On (SSO) with Branch using **Microsoft Entra ID** (formerly Azure Active Directory) as your Identity Provider (IdP).

This guide will:

1. Help you get your configuration details from Branch.
2. Show you how to create and configure a SAML 2.0 application in Microsoft Entra ID.
3. Link you back to the main [Configure SSO guide](configure-sso.md) to complete the setup.

## Configure SSO

To configure SSO, you’ll need to get your unique URLs from Branch, configure Microsoft Entra ID, and then finish the setup in Branch.

### Before you begin

Before you begin, ensure you have:

- Admin access to your Branch account.
- Admin access to your Azure portal and the Microsoft Entra ID service.
- SSO enabled for your Branch account.

  - Access to SSO requires a Branch plan. Please visit our [Pricing](https://www.branch.io/pricing/) page or [contact our Sales team](https://branchdocs.app.link/e/sso-sign-up) to learn more about pricing and availability.

### Step 1: Get configuration details from Branch

This step is different depending on whether you are on the [legacy](branch-dashboard-overview.md) or [new](new-branch-overview.md) Branch experience. The rest of the steps remain the same between the two platforms.

### Step 2: Create a custom SAML app in Azure

Now, log in to the Azure portal to create the Branch enterprise application.

1. In the Azure portal, navigate to **Microsoft Entra ID → Enterprise applications**.
2. Select **New application**.
3. Select **Create your own application**.
4. Enter an application name (e.g., “Branch SSO”) and select the option to **Integrate any other application you don’t find in the gallery (Non-gallery)**.
5. Select **Create**.

   

### Step 3: Configure SSO settings in Azure

Within your new enterprise application in Azure, configure the SAML settings.

1. Navigate to **Single sign-on** in the left menu.
2. On the **Select a single sign-on method** page, select the **SAML** tile.
3. In the **Basic SAML Configuration** section, select **Edit**.  
   
4. Fill in the fields using the values from the Branch tab you kept open from [step 1](configure-sso-with-azure.md#step-1-get-configuration-details-from-branch):

   1. Identifier (Entity ID): Paste the `Service Provider Entity ID` from Branch.
   2. Reply URL (Assertion Consumer Service URL): Paste the `Single Sign-On URL` from Branch.
5. Select **Save**.  
   

### Step 4: Map attributes in Azure

Branch requires three attributes to be sent in the SAML response to provision and identify users.

::: danger Warning
To set up a successful mapping, you must use the attribute names `firstName`, `lastName`, and `email` exactly as they are capitalized and spelled here. Do not use URN or OID formats.
:::

1. In the **Attributes & Claims** section, select **Edit**.
2. Delete any default claims that are not required (you can keep the default unique user identifier claim).
3. Add the following three attributes by selecting **Add new claim** for each:

   | **Claim Name** | **Value** |
   | --- | --- |
   | `email` | user.mail |
   | `firstName` | user.givenname |
   | `lastName` | user.surname |
4. For each attribute:

   1. Enter the **Name** exactly as shown above (case-sensitive).
   2. Set the **Namespace** to blank (leave empty).
   3. Select **Attribute** as the **Source**.
   4. Select the corresponding **Source attribute** from the table above.

   

### Step 5: Get federation metadata from Azure

Branch needs your Microsoft Entra ID federation metadata to complete the connection.

1. In the **SAML Certificates** section of your Azure SAML configuration, locate the **App Federation Metadata Url**.
2. Copy this URL so you have it ready for the next step.  
   

::: info Note
Below the **SAML Certificates** section in Azure, you will see a section called **Set up Branch SSO**. This is for manual setup using individual values.  
  
Using the **App Federal Metadata Url** instead is the automatic and recommended setup.
:::

### Step 6: Complete connection in Branch

Now you’ll provide Microsoft Entra ID’s metadata to Branch and test the connection.

1. Go back to your Branch **Configure Custom SAML** browser tab.
2. Complete [step 2.3 in our main guide](configure-sso.md#step-23-configure-connection). Paste the **App Federation Metadata Url** from Azure into the **Metadata URL** field in Branch.
3. Select **Create Connection**.

### Step 7: Test SSO

Use [step 2.4](configure-sso.md#step-24-test-sso) from our main SSO guide to test the connection between Microsoft Entra ID and Branch.

## More information

For more complete information about configuring SSO for Branch, visit our [Configure SSO (General SAML) guide](configure-sso.md).
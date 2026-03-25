---
title: "Configure SSO With Okta"
slug: configure-sso-with-okta
---

## Introduction

This guide provides step-by-step instructions for setting up Single Sign-On (SSO) with Branch using **Okta** as your Identity Provider (IdP).

This guide will:

1. Help you get your configuration details from Branch.
2. Show you how to create and configure a SAML 2.0 application in Okta.
3. Link you back to the main [Configure SSO guide](configure-sso.md) to complete the setup.

## Configure SSO

To configure SSO, you’ll need to get your unique URLs from Branch, configure Okta, and then finish the setup in Branch.

### Before you begin

Before you begin, ensure you have:

- Admin access to your Branch account.
- Admin access to your Okta account.
- SSO enabled for your account.

  - Access to SSO requires a Branch plan. Please visit our [Pricing](https://www.branch.io/pricing/) page or [contact our Sales team](https://branchdocs.app.link/e/sso-sign-up) to learn more about pricing and availability.

### Step 1: Get configuration details from Branch

This step is different depending on whether you are on the [legacy](branch-dashboard-overview.md) or [new](new-branch-overview.md) Branch experience. The rest of the steps remain the same between the two platforms.

### Step 2: Configure Okta SAML

Now, log in to your Okta admin dashboard to create the Branch application.

1. In Okta, navigation to **Applications** → **Applications** and select **Create App Integration**.

   2. Select **SAML 2.0** as the sign-on method and click **Next**.  
   ![Creating a new app integration in Okta to use with Branch for SSO.](/img/95bf6603-26c8-4a36-a7df-6ecdac39b44a.png)

3. On the **General Settings** page, enter an app name (e.g., “Branch”) and click **Next**.
4. On the **Configure SAML** page, in the **General** section, fill in the fields using the values from the Branch tab you kept open from step 1.

   3. Single sign-on URI: Paste the `Single Sign-On URL`from Branch.
   4. Audience URI (SP Entity ID): Paste the `Service Provider Entity ID` from Branch.
5. In the same section, configure the following Okta settings:

   3. Name ID format: Set to `EmailAddress`
   4. Application username: Set to `Email`  
      ![Configuration settings for SAML integration in Okta for Branch.](/img/0becd7b1-570e-4c6f-8d83-19a13ecd530b(1).png)

### Step 3: Map attributes in Okta

Branch requires three attributes to be sent in the SAML response to provision and identify users.

::: danger Warning
To set up a successful mapping, you must use the attribute names `firstName`, `lastName`, and `email` exactly as they are capitalized and spelled here. Do not use URN or OID formats.
:::

| **Name** | **Value (Example)** |
| --- | --- |
| `firstName` | `user.firstName` |
| `lastName` | `user.lastName` |
| `email` | `user.email` |

1. Still on Okta’s **Configure SAML** screen, scroll down to the **Attribute Statements (Optional)** section.
2. Add the following three attributes and corresponding values. Make sure you enter the names *exactly* as spelled and cased here.![Okta Admin Console displaying user attribute statements and group settings options.](/img/image-1762902179912.png)

3. Select **Next** and then **Finish** to save your Okta application.

### Step 4: Complete connection in Branch

Your Okta application is now configured. The final step is to provide Okta’s metadata to Branch and test the connection.

1. In your new Okta application, go to the **Sign On** tab.
2. Find the **SAML setup instructions** and select **View SAML setup instructions**.
3. A new page will open with your metadata. Copy the **Identity Provider Single Sign-On URL** or the **Metadata URL**.
4. Go back to your Branch **Configure Custom SAML** browser tab.
5. Complete step [2.3](https://help.branch.io/docs/configure-sso#:~:text=Step%202.3%3A%20Configure%20connection) in our main guide. Paste your Okta **Metadata URL** (recommended) or manually enter the **Single Sign-On URL** and upload the **Signing Certificate** (also found on the Okta setup instructions page).

### Step 5: Test SSO

Test and enable your connection using step [2.4](configure-sso.md#step-24-test-sso) in our main guide.

## More information

For more complete information about configuring SSO for Branch, visit our [Configure SSO (General SAML) guide](configure-sso.md).
---
title: "Configure SSO (General SAML)"
slug: configure-sso
---

## Overview

Branch uses Auth0 to enable single sign-on (SSO), which allows you to manage your team's access to the Branch Dashboard through your identity provider (IdP).

Using SSO makes it easier to add or remove Branch users, and improves their login experience.

## Configure SSO

To configure SSO, you'll need to set up Branch in your IdP and enter your IdP information in the Branch Dashboard.

### Before you begin

Before you begin, ensure you have:

- Admin access to your Branch account.
- Admin access to your organization's IdP (e.g., Okta, Azure AD) account.
- SSO enabled for your Branch account.

  - Access to SSO requires a Branch plan. Please visit our [Pricing](https://www.branch.io/pricing/) page or [contact our Sales team](https://branchdocs.app.link/e/sso-sign-up) to learn more about pricing and availability.

::: info Note
Please follow the steps below whether you’re setting up SSO for the first time or you’re an existing customer using Branch SSO and migrating.
:::

### Step 1: Select identity provider

This step is different depending on whether you are on the [legacy](branch-dashboard-overview.md) or [new](new-branch-overview.md) Branch experience. The rest of the steps remain the same between the two platforms.

### Step 2: Configure custom SAML



#### Step 2.1: Create application

1. Copy the unique values that get populated for **Single Sign-On URL** and **Service Provider Identity ID** and use them to create a generic SAML application in your Identity Provider.

   1. Single Sign-On URL:

      1. Endpoint users are redirected to for initiating single sign-on, enabling users to access multiple applications.
      2. Also known as: Assertion Consumer Service URL, Callback URL.
   2. Service Provider Entity ID:

      1. Unique identifier for service provider.
      2. Also known as: Audience URI.

   When creating the application in your IdP, you may also need to specify an **Application URL (also called SP URL)**. Use <https://dashboard.branch.io> for this field.

   This is the URL where users will access Branch to log in.
2. Click **Next**.

#### Step 2.2: Map attributes

Set up attribute mapping to ensure user information syncs correctly between your identity provider and Branch.

::: danger Warning
To set up a successful mapping, you must use the values listed here **exactly as they are capitalized and spelled** in this article.
:::

**Required attributes**:

Configure your IdP to send the following three attributes in the SAML response:

- `email`
- `firstName`
- `lastName`

**Important configuration notes**:

- Use simple string attribute names, as shown above.
- Do **not** use URN or OID formats.
- Including `NameFormat` for attributes is optional and can be omitted.

  - If your IdP requires `NameFormat`, use the value `urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified`.

**Example SAML AttributeStatement**:

```
<AttributeStatement>
  <Attribute Name="email">
    <AttributeValue>user@example.com</AttributeValue>
  </Attribute>
  <Attribute Name="firstName">
    <AttributeValue>John</AttributeValue>
  </Attribute>
  <Attribute Name="lastName">
    <AttributeValue>Doe</AttributeValue>
  </Attribute>
</AttributeStatement>
```

#### Step 2.3: Configure connection

1. Configure a connection between your IdP and Branch. You have two options for this:

   1. Automatic: Provide the **Metadata URL** to your IdP. This URL needs to be publicly accessible and ensures your IdP provides important information like login URL and certificate, OR
   2. Manual: Configure the **Single Sign-On URL** and upload a **Signing Certificate** manually.
2. Whether you choose automatic or manual connection configuration, you have the option to set the **Advanced Settings** to configure request signing if required by your IdP:

   1. Check the **Sign Request** checkbox.
   2. When enabled, the SAML authentication request will be signed. Download the certificate and upload it to your IdP to validate the signature.
   3. Select an option for **Sign Request Algorithm** (RSA-SHA256 recommended).
   4. Select an option for **Sign Request Algorithm Digest** (SHA256 recommended).
   5. Select an option for **Request Protocol Binding** (HTTP-Post recommended).  
        
      *[Image: Branch settings for SAML authentication request signing and algorithm selection options displayed.]*.png)
3. Click **Create Connection**. You will see an alert modal letting you know that doing this will enable SSO access to Branch.
4. Click **Proceed.**

#### Step 2.4: Test SSO

**Note**: A successful run of this test confirms that Auth0 can receive the SAML response and that your URL, audience ID, and certificate are configured correctly. However, it does not verify [attribute mapping](configure-sso-with-auth0.md#step-23-attribute-mapping). After testing, review the displayed user information to confirm your IdP is passing the correct email, first name, and last name attributes.

1. Click **Test Connection**. This will cause the Branch configuration page to enter “listening mode”.
2. In the new tab, log in using your IdP.
3. Return and note the “Testing complete!” confirmation message.
4. Important: Select **Enable SSO** to activate SSO. Without this step, the SSO configuration will **not** take effect.
5. You can now close the new tab.

## Email domain configuration

Branch's SSO uses email domains to determine which users can authenticate through your SSO connection.

**Existing SSO customers migrating from legacy SSO**

Previously configured email domains carry over from your current SSO setup.

::: warning Caution
Adding a new SSO email domain: Before adding an email domain that wasn't in your legacy SSO setup, first complete the migration to Auth0 SSO. Once the Auth0 SSO setup is complete, you can add the new email domain to enable authentication for users across both domains.  
  
**If this process is not followed correctly, SSO functionality may not behave as expected**.
:::

**New SSO customers (as of August 2025)**

Branch uses the email domain of the user setting up SSO.

If you are running into restrictions related to the list of email domains that can be configured for your setup, please contact Support at [support@branch.io](mailto:support@branch.io) (include your name and app ID) to update the values in the list.

## Use SSO

Once your SSO connection is configured and enabled, your team can access Branch through your IdP.

### Branch Dashboard access

Users with email addresses matching your configured domains will be automatically redirected to your IdP when accessing Branch at [https://app.branch.io](https://app.branch.io**). This is the URL users should use to access Branch with SSO.

::: warning Caution
As part of the Auth0 SSO migration, **all vanity URLs** **(e.g.,** `mycompany.dashboard.branch.io`**)** **will be discontinued** by December 31, 2025.

Action required: Make sure you IdP configurations uses `https://app.branch.io`. Legacy vanity URLs will work temporarily during migration but will be fully retired.
:::

After successful authentication, they'll be logged into Branch.

### User management

Manage users through your IdP.

Users with email addresses matching your configured domains will automatically authenticate through SSO when accessing Branch.

### Modify settings

Click **Configure SSO** in your Branch Dashboard SSO settings to modify your SSO configuration.

Previously configured values (login URL, certificate, domains) remain populated for easy editing.

### Connection status

Your SSO configuration page displays the current connection status and configured email domains after successful setup.

## Troubleshooting

**Connection issues**

- Verify your identity provider metadata URL is accessible.
- If you uploaded a [signing certificate](configure-sso-with-auth0.md#configure-connection), make sure it is valid and properly formatted.
- Check that your [attribute mappings](configure-sso.md#step-23-map-attributes) match your IdP configuration.

**User access issues**

- Confirm user email domains match your configured [email domains list](configure-sso-with-auth0.md#email-domain-configuration).
- Verify that users are assigned to the appropriate application in your IdP.
- Check that [required attributes](configure-sso.md#step-23-map-attributes) are being passed.

---

## FAQ

<details>
<summary>What is the purpose of using Auth0 for Branch?</summary>

Auth0 enables single sign-on (SSO) for managing team access to the Branch Dashboard through an identity provider (IdP).

</details>

<details>
<summary>I already have Branch SSO set up. Do I use this same guide to migrate to Auth0?</summary>

Yes, existing Branch SSO users should follow the same steps in this guide to migrate to the new Auth0 system.

</details>

<details>
<summary>What do I need to configure SSO for Branch?</summary>

You need admin access to your Branch account and your organization's IdP, as well as SSO enabled for your account.  
  
SSO requires a premium plan. Please [contact the Sales team](https://branchdocs.app.link/e/sso-sign-up) for pricing and availability.

</details>

<details>
<summary>How can I test the SSO connection after configuration?</summary>

You can test the connection by clicking **Test Connection** on the Branch configuration page and logging in using your IdP.

</details>

<details>
<summary>What should I do if users are having access issues?</summary>

For users having access issues, check that:

- User email domains match your configured [email domains list](configure-sso-with-auth0.md#email-domain-configuration).
- Users are assigned to the appropriate application in your IdP.
- [Required attributes](configure-sso.md#step-23-map-attributes) are being passed.

</details>

<details>
<summary>Does Branch support just-in-time/SCIM/auto account provisioning?</summary>

Not currently. One user can belong to multiple Branch apps, so admins must decide which users on their claimed email domain should have access to which apps in Branch at this time. Admins will need to manually assign Branch accounts to individuals before they can sign in for the first time.

</details>

::: info Note
When creating the application in your IdP, you may also need to specify an **Application URL (also called SP URL)**. Use <https://dashboard.branch.io> for this field.

This is the URL where users will access Branch to log in.
:::
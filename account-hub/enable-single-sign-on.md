---
title: "Enable Single Sign On"
slug: enable-single-sign-on
---

::: danger Warning
Branch now uses Auth0 to provide a more secure Single Sign-On (SSO) experience.

To take advantage of these improvements, you will need to migrate your existing SSO configuration using the new process.

Please see the [Configure SSO With Auth0](configure-sso-with-auth0.md) guide for complete instructions.

**Migration is required before January 2026**, when this current SSO method will be **deprecated**.
:::

## Overview

Branch offers Security Assertion Markup Language (SAML) / Single Sign-on (SSO) support for Branch Dashboard. This allows you to use your identity provider (IdP) to centralize access to various services for your team and leverage existing directory systems and security groups.

## Prerequisites

1. The IdP you are using supports SAML (ex. Okta, OneLogin, Microsoft Azure AD, etc.)
2. Your company's IT department ready to configure SAML that knows your company's email domains
3. [Admin Access Level](add-manage-users-roles-permissions-access.md) to your Branch account

## Enable SSO

### 1. Add Branch to your Identity Provider

Add Branch to your IdP - Add the following SAML attribute mappings:

| SAML Attribute | Field it Should Map to in Your IdP |
| --- | --- |
| `email` | User's email address |
| `firstName` | User's first name |
| `lastName` | User's last name |

Here is some initial information that your IdP might ask for:

| IdP Field | Value |
| --- | --- |
| Platform | Web |
| Sign-on method | SAML 2.0 |
| Application name | Branch |
| Logo | [Download here](https://www.branch.io/brand/#kit) |
| ACS URL | `https://<subdomain>.dashboard.branch.io/sso/callback` |
| Entity ID or Audience URI | `https://<subdomain>.dashboard.branch.io` |
| SP Metadata | None |

::: warning SSO Name ID Format
Branch only supports SSO Name ID Formats, basic or unspecified.
:::

Once this is complete, your IdP will provide you with details that you'll need to add to the Branch Dashboard to enable SSO.

### 2. Add Your IdP Details Back to Branch

In the Branch Dashboard navigate to **Account Settings > SSO tab**. If you're already logged into the Branch Dashboard, you can click [here](https://dashboard.branch.io/account-settings/sso) to go there directly. Enable SSO by toggling **Enable SAML/SSO**.

![](/img/c709b5f-Enable_SAML.png)

Next, add the following information:

| Field | Description |
| --- | --- |
| Email Domains | Provided by your company (likely IT);.Team members on the email domains used to be able to log in via SAML/SSO |
| Branded Login Domain | Provided by your company (likely IT). Where your users will be able to log in to Branch. Typically your company name.  Lowercase letters, numbers, underscores, and dashes only. |
| Identity provider Entity ID | Provided by your IdP. The URL of your IdP (SAML 2.0). |
| Identity provider SSO URL | Provided by your IdP. The SAML endpoint from your identity provider. |
| Public x509 certificate | Provided by your IdP. Copy/paste this from your IdP from when you added Branch. |

Click **Save**.

![](/img/83c1094-SSO_Configuration.png)

### 3. Add Users to Branch in Your IdP

Give the appropriate users access to Branch in your identity provider. When you add users to Branch via your IdP, you will also have to add them to the team for the appropriate apps in the Branch Dashboard. You can do this on the [Account Settings > Team](https://dashboard.branch.io/account-settings/team) page for each app that you want the user to have access to.

::: danger Users on Branch But Not Your IdP
Single Sign-On (SSO) authentication is applied according to the user's email domain. For team members under your email domain listed in the Branch Dashboard, access must be granted via your Identity Provider (IdP). If these users are not authorized in the IdP, they will be unable to access the Branch Dashboard once SSO is activated.

Users with email domains not associated with your organization will continue to use the standard login procedure.
:::

SSO is now enabled and users will have to login via your branded subdomain. When users on your claimed email domain(s) try to log in, reset their password, or sign up the regular way via <https://dashboard.branch.io>, they will be redirected to your branded subdomain and your IdP login page.

## FAQ

- [Does Branch support just-in-time or SCIM account provisioning?](does-branch-support-just-in-time-or-scim-account-provisioning.md)
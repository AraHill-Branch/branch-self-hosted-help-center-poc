---
title: "Credentials (New)"
slug: credentials-new
---

## Overview

The Credentials tab of the Security & Access page is where you manage authentication credentials for your Branch account.

You can access this page by navigating to **Configuration > Security & Access >** [**Credentials**](https://branchdocs.app.link/security-access-credentials) in Branch.

::: danger Don't see this page yet?
The Security & Access page is part of the [new Branch](new-branch-overview.md) experience. This page is being rolled out to customers in phases through 2026. While you're waiting for access, you can explore this article to familiarize yourself with the new functionality.
:::

## Credential types

The **Credentials** section displays the authentication credentials needed to access Branch APIs and integrate with external systems. These credentials are essential for programmatic access to your Branch data and for implementing Branch SDKs in your applications.

Branch provides three types of credentials for different use cases:

### Branch Key

Your Branch Key is a public key used to identify your app. You can think of this as your app's ID card. You'll need it to initialize [Branch SDKs](branch-sdks.md) and for basic authentication across [Branch APIs](https://help.branch.io/apidocs).

Your Branch Key is designed to be used in client-side code and apps, so developers can safely store it in places like GitHub.

### Branch Secret

Your Branch Secret is your app's **private** authentication credential. This credential is only visible to admins, and it authenticates your app securely for operations like server-side API calls and validating webhook signatures.

::: warning Caution
Your Branch Secret should only be used in secure, server-side environments. Never include your Branch Secret in client-side code, mobile apps, or any publicly accessible locations.
:::

### Access Token

Your Access Token is a unique identifier assigned specifically to you. Each user will have their own Access Token, as long as they have the correct [permissions](user-accounts-and-permissions.md). The Access Token is used to verify your specific permissions within an organization.

It's primarily used for extracting data from certain [APIs](https://help.branch.io/apidocs/apis-overview) that require additional authentication.

::: warning Caution
Your Access Token should only be used in secure, server-side environments. Never include your Access Token in client-side code, mobile apps, or any publicly accessible locations.
:::

## View and copy credentials

By default, credential values are masked for security. To view and copy your credentials:

1. Navigate to **Configuration > Security & Access >** [**Credentials**](https://branchdocs.app.link/security-access-credentials).
2. Select the **copy icon** next to any credential to copy its value to your clipboard.

## Reset credentials

If you suspect a credential has been compromised or need to rotate credentials for security purposes, you can reset any credential using the **Reset** button.

::: warning Caution
Resetting a credential will immediately invalidate the old value. Any integrations, applications, or scripts using the old credential will stop working until you update them with the new value. Plan your credential rotations carefully to avoid service disruptions.
:::

To reset a credential:

1. Select the **Reset** button next to the credential you want to reset.
2. Confirm the reset action when prompted.
3. Copy the new credential value and update all systems that use it.

## Best practices

Follow these best practices when working with Branch credentials:

- **Store credentials securely**: Developers should use environment variables or secure credential management systems rather than hardcoding credentials in your codebase.
- **Limit credential access**: Only share credentials with team members who require them for their work.
- **Rotate regularly**: Consider resetting credentials periodically as part of your security hygiene.
- **Monitor usage**: Keep track of where credentials are used so you can update them quickly if needed.
- **Use appropriate credentials**: Always use the Branch Key for client-side implementations and reserve the Branch Secret for server-side operations.
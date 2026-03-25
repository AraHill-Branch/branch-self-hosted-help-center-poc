---
title: "Improved Single Sign-On (SSO) Experience"
slug: improved-single-sign-on-sso-experience
---

## Overview

Branch has upgraded our single sign-on (SSO) infrastructure by migrating to Auth0, an industry-leading identity management platform.

This change enhances security, improves reliability, and provides a better user experience during login.

## Migration deadline: January 2026

**Important**: If you currently use Branch SSO, you must migrate to the new Auth0-based system by January 2026. Your existing SSO integration will continue working until then, giving you time to plan your migration.

## What’s changing?

We've built a completely new SSO system using Auth0 to enhance security and streamline user management.

- **Migration required for new experience**: To take advantage of the improved experience, enterprise customers with an existing Branch SSO integration must migrate to the new Auth0-based system.
- **New configuration page**: A new Auth0 configuration page is now available in the Branch Dashboard to guide you through the setup/migration process.
- **No impact to current login methods**: Your existing SSO integration will continue to function without interruption (**until January 2026**) as you plan your migration. Also, customers not using SSO can continue to log in with a username and password.
- **No downtime**: The migration process is designed to be seamless, with no system downtime.

## Benefits

This upgrade offers several key benefits:

- **Improved user experience**: The new integration enables access to our redesigned and more intuitive user interface.
- **Simplified user management**: Easily provision and deprovision your Branch user accounts.
- **Trusted and secure**: Auth0 is a trusted, industry-leading vendor for authentication and authorization.

## Who can access the new system?

The new Auth0 SSO is available now for all enterprise customers, including:

- Current SSO users who need to migrate.
- Enterprise customers who want to start using SSO.
- New enterprise customers setting up SSO.

::: info Note
Branch SSO is not available for self-serve customers.
:::

## Learn more

To get started with Auth0, please see our new guide: [Configure SSO With Auth0](configure-sso-with-auth0.md). These same steps also apply to customers using our legacy SSO offering with an IdP like Okta.
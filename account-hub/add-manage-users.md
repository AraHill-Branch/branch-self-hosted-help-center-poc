---
title: "Add & Manage Users"
slug: add-manage-users
---

::: danger Warning
This article outlines the legacy Team tab, which is part of the [legacy Branch](branch-dashboard-overview.md) experience and is slated for deprecation.

In the [new](new-branch-overview.md) Branch platform, you can find team information by navigating to **Configuration → Security & Access →** [**Team**](https://branchdocs.app.link/security-access-team). See more information about the new Team tab in our [guide](team.md).
:::

## Add Users to Branch Dashboard

1. In the Branch Dashboard, go to the [Settings](https://branch.dashboard.branch.io/account-settings/profile) page under the Account section of the navigation bar, and click to the [Team](https://dashboard.branch.io/account-settings/team) tab.
2. Click **Add App Team Member**.
3. Enter the email address of the user you wish to add.
4. Click **Search User**.

   
5. If the user does not already exist, you will be prompted to complete the following fields:  
    a. First Name  
    b. Last Name  
    c. [Access Level](entity-views-access-controls-overview.md#access-levels), your options are:

   1. **Admin**
   2. **Team Member**
   3. **Full Read**
   4. **Limited Read**
   5. **User Coordinator**
   6. **Custom** - If you choose Custom, you will have to define each access level you wish to grant that user. Your options are:  
       a. **Link-level Settings** - Settings or features that can impact functionality for single links.  
       b. **Channel-level Settings** - Settings or features that can impact functionality across a marketing channel.  
       c. **App-level Settings** - Settings or features that can impact functionality app-wide.  
       d. **Aggregate Data** - Summary data that contains no granular data.  
       e. **Sensitive Data** - Data that can contain user-identifying, payment-related, or secret information.  
       f. **Fraud Settings & Data** - Settings or data associated with fraud detection and prevention.
6. Click **Invite** when you're done.  
    a. If you are adding a user to your [Organization View](entity-views-access-controls-overview.md#organization-view), select one of the follow and click **Save**:

   - All apps that inherit from the organization
   - All apps



## Manage Users

::: info Note
Branch team members are not authorized to complete the following actions on your behalf. Your admin users must complete user management tasks.
:::

### Modifying Existing Team Member

To modify an existing team member:

1. Find the team member you want to modify and click the `...` button in the Actions column for that user.
2. To edit the Organization Team member, select **Edit.**
3. Click **Save**.



::: danger Warning
If you are using the [legacy version of Branch](branch-dashboard-overview.md) and need to change the email address associated with your account, please contact [Support](https://support.branch.io/hc/en-us/requests/new).  
  
To learn about the new Branch experience and the features rolling out in 2026, visit our [New Branch Overview](new-branch-overview.md) guide.
:::

### Resend Invitation to Join

To resend the invitation to join the account:

1. Find the Organization Team member you want to modify and click the `...` button in the **Actions** column for that user.
2. Click **Resend Invite**.

### Delete Team Member

1. Find the team member you want to delete and click the `...` button in the **Actions** column for that user.
2. Click **Delete**.
3. In the **Are you sure you want to delete?** modal, click **Yes, Delete**.

### Request Additional Permissions

As a non-Admin user, you may not be able to access/use certain sections of the Branch dashboard. If you’d like more access, please contact an Admin user on your account to ask for more permissions.

If you need further assistance, feel free to reach out to [integrations@branch.io](mailto:integrations@branch.io).
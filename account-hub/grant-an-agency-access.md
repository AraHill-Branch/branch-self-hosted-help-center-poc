---
title: "Grant an Agency Access"
slug: grant-an-agency-access
---

We allow you to grant agencies access to your account. Agencies have their own [entity view](entity-views-access-controls-overview.md#agency-view), which limits them to what they can see/do within the Branch dashboard. This guide will walk you through how to add agencies to your account and configure access levels. Note that the following steps also apply to granting Ad Partner access.

## Grant an Agency Access to Your Account

1. Go to the [Account Settings](https://dashboard.branch.io/account-settings/agencies) page in the dashboard, and click to the [Agencies](https://dashboard.branch.io/account-settings/agencies) tab. If you do not see your agency, please ask your agency to fill out the [Branch Partner Form](https://branchmetrics.typeform.com/to/XXkMePO9).
2. Click **Add New Agency**.
3. Complete the following fields:

   - **Agency Name**: Search and select the Agency you wish to add.
   - **Access Level**: Select the level of access you wish to grant the agency. By default, **custom** will be selected. Reference [Roles](add-manage-users-roles-permissions-access.md#roles) to understand the various access levels.

     - Note: You may grant an agency the access level **No Access**. This access level allows you to define specific agency users that can access your account. See [below](add-agency-to-your-account.md#faqs-on-agency-access) for further instructions on managing individual agency user permissions.
   - **Permissions**: While permissions are auto-populated based on the **Access Level** you've chosen, you can change any of the [**Permissions**](add-manage-users-roles-permissions-access.md#access-levels) as you see fit.
   - **Export**: If you wish to allow the agency to export data, you will need to grant access to both Sensitive Data and Export.
   - **Data Filters**: Define the data filter permissions you wish for the agency to have access to. You'll have the following options:

     - **Only show agency-tagged data**: When toggled on, agency users can only view data - i.e. events, engagement groups - tagged with their Agency ID. This will be enabled by default.
     - **Restrict access to revenue data**: Agency can view revenue data if sensitive data is granted.
     - **Only show data from specific ad networks**: When toggled on, agency users can only view events from a specific list of ad networks.

       - If you selected an agency that is also an ad network, this field should auto-populate with the ad network.
       - LIMITATION: If the number of one specific event in the latest 7 days is zero, the event will not be shown as an option in the ADD/REMOVE COLUMNS in the EVENTS section on the dashboard.
     - **Only show data from specific locations**: When toggled on, agency users can only view events that have taken place in a specific list of countries.

::: info Data Filters for Ad Partners
If you're working with an Ad Partner in a paid advertising campaign and would like to grant dashboard access, the following Data Filters are recommended:

- **Only show agency-tagged data**: Toggled off.
- **Restrict access to revenue data**: If desired.
- **Only show data from specific ad networks**: Toggled on, and select the specific ad network(s) to show data for.
- **Only show data from specific locations**: If desired.
:::

4. When you're done, click **Invite**.

   ![708](/img/d200215-Screen_Shot_2022-03-09_at_11.04.30_AM.png "Screen Shot 2022-03-09 at 11.04.30 AM.png")

## Default Agency Access Level Restrictions

Due to the nature of allowing third parties access to your data - as well as what data you don't want them to access - when an Agency team member is in App view, they will not be able to access certain aspects of the Branch account regardless of the access levels applied to the user.

- Agency users cannot add/remove team members to/from their customers’ dashboards.
- Agency users are not allowed to reset app keys or delete apps.
- Agency users are not allowed to add/remove agency access.
- Agency users are allowed to create apps in the Organization view, but not stand-alone apps in the App view.

  - This means agencies don’t actually “own” apps; rather they’ll just be able to manage the apps of others.
- Agency users do not have access to the Billing and SSO sections of their customers’ dashboards.

## FAQs

<details>
<summary>How can I manage individual agency users’ access levels?</summary>

We understand you might not want to grant all agency users access to your account, but rather grant specific agency users access with a specific permission set. To do this:

1. When following the steps to [grant an agency access](https://help.branch.io/v1/docs/add-agency-to-your-account#grant-an-agency-access-to-your-account), for **Access Levels** select \*No Access.
2. After granting the Agency access to your account, the agency will have to accept their invite. After they accept you can continue to follow this process.
3. Once the agency has accepted their invite, go back to the Agency tab. Find the agency you added and click on the name of the agency.
4. Here you will see all of the agency users associated with that agency. Find the user you wish to grant access to your account.
5. In the **Action** column, click on the **...** and click **Edit**.
6. Reference our guide on [access levels](https://help.branch.io/v1/docs/add-manage-users-roles-permissions-access#access-levels) to understand the various permission sets.
7. Click **Save**.

</details>

<details>
<summary>How do I grant agencies the ability to export data?</summary>

If you wish to allow the agency to export data, you will need to grant access to *both* **Sensitive Data** and **Export**. [See here for more information about how to manage Agency access](https://help.branch.io/v1/docs/add-agency-to-your-account).

</details>

<details>
<summary>Why can’t I see User Management buttons on the team management page?</summary>

User Management is only possible from the Live App in Branch. If you are on the Test Mode you will not see User Management buttons next to the Users on your Team Management page. Switch to Live mode to make changes to Users.

</details>

<details>
<summary>Do agency users have access to organic data?</summary>

When you view data through an Agency Dashboard you will only be able to see the data from ad partners that have been made visible to you.

Data from other ad partners and organic data will not be available.

</details>
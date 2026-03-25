---
title: "Entity Views, Roles & Access Levels Overview"
slug: entity-views-roles-access-levels-overview
---

There are 3 main ingredients to the Branch permissions systems: Entities, Access Levels, and Roles.

Entity views control which assets a user is able to view information for. There are 3 different Entity Views: Organization View, App View, and Agency View.

Users are also allocated Access Levels. Access Levels grant different powers to read, edit, and/or export in the Branch products. There are 7 different Access Levels: Link Level Access, Channel Level Access, App Level Access, Aggregate Data, Sensitive Data, Export Data, and Fraud.

"Roles" are predefined bundles of different Access Levels which can be quickly assigned to specific users. A Branch customer can also customize roles for their particular needs. The default Roles available are Admin, Team Member, Full Read, Limited Read, and User Coordinator.

This article will explain how Entity Views work. For more information on Access Levels and Roles, see the dedicated article here.

## Entity view

Entity View is a variety of controls to restrict specific sets of users/agencies to a particular view of your apps' data. There are 3 view types:

### App view

- The "App" view of a Branch account is the standard level of entity access and can include access to the entire Branch dashboard for that app, based on access levels and access role type. All accounts include the App view and any user regardless of access role type can access it (to varying degrees).

::: info All members have access to App view
All team members have access to the App view; which additional entity view - Organization and/or Agency - a team member has access to depends entirely upon which view that team member was created within.

Example: An Agency team member added within the Organization view will also inherit access to the Organization view in addition to the App view and the Agency view. If that same Agency team member were instead added within the App view, said Agency team member would only be able to access the App view and the Agency view.
:::

### Organization view

- The "Organization" view of a Branch account is intended for Branch accounts with a portfolio of distinctly managed apps tied to a single organizational entity. This allows companies to manage separate teams associated with their distinct apps and maintain autonomy. Organization team members can switch between the Organization view and the App view at any time.
- The Organization view is for managing account-level functionality; e.g. managing organization team members and access. Toggle to the App view to access the majority of your day-to-day needs for creating links and viewing reporting.\*\*

### Agency view

- The "Agency" view of a Branch account is another additional level of entity access and is intended for Branch accounts that work with agencies - both full AORs and limited - that buy media on their behalf. Agency view allows the Agency to manage its own team within Branch. Agency team members can switch between the Agency view and the App view at any time.
- The Agency view is for managing account-level functionality; e.g. managing agency team members and access. Toggle to the [App view](entity-views-access-controls-overview.md#section-app-view) to access the majority of your day-to-day needs for creating links and viewing reporting.

::: warning Agency invite required
For any Agency to access a customer Branch account, an invitation from an Admin user at the Organization or App entity level of access is required. All Agency Admins on the agency account will receive an invitation email, and any of those Agency Admins can accept the invitation on behalf of their agency. Use the following resources on managing Agency permissions:

- [How to invite Agencies to your account](add-agency-to-your-account.md)
- [How to add/manage agency team users](adding-managing-agency-users.md)
:::

::: info Disabled functionality
Any restricted functionality - either due to default Agency restrictions or selected access levels - in Branch will be (1) grayed out, (2) not selectable, (3) include a pop up modal informing the user about restricted access. [See more around restricted functionality for agencies here.](add-agency-to-your-account.md#section-default-agency-access-level-restrictions)
:::

### Combining views

All team members have access to an App view. Which additional entity view - Organization and/or Agency - a team member has access to depends entirely upon which view that team member was created within.

- Example:  
   An Agency team member added within the Organization view will also inherit access to the Organization view in addition to the [App entity view](entity-views-access-controls-overview.md) and the Agency view.  
   If that same Agency team member were instead added within the App view, said Agency team member would only be able to access the App view and the Agency view.
- Access Examples:

  - When a user is added to an Organization, they will gain access to the [App entity view](entity-views-access-controls-overview.md) of all apps within the Organization.
  - When an agency is invited to join an [App entity view](entity-views-access-controls-overview.md), all members of the Agency will gain access to the [App entity view](entity-views-access-controls-overview.md#section-app-view).
  - When an agency is invited to join an Organization View, all members of the agency will gain access to the [App entity view](entity-views-access-controls-overview.md#section-app-view) of all apps within the Organization.

## Roles & access levels

In addition to [Entity Views](entity-views-access-controls-overview.md#section-view-access), each user will have a defined set of access levels (permissions) defined by their role.

### Roles

"Roles" are pre-defined bundles of different Access Levels which can be quickly assigned to specific users.

- Admin
- Team Member
- Full Read
- Limited Read
- Custom - Used to define specific permission sets to a user.
- User Coordinator

### Access levels

Access Levels grant different powers to read, edit, and/or export in the Branch products.

- [Link Level Access](add-manage-users-roles-permissions-access.md#section-access-levels)
- [Channel Level Access](add-manage-users-roles-permissions-access.md#section-access-levels)
- [App Level Access](add-manage-users-roles-permissions-access.md#section-access-levels)
- [Aggregate Data](add-manage-users-roles-permissions-access.md#section-access-levels)
- [Sensitive Data](add-manage-users-roles-permissions-access.md#section-access-levels)
- [Fraud](add-manage-users-roles-permissions-access.md#section-access-levels)
- [Engagement Builder](add-manage-users-roles-permissions-access.md#section-access-levels)
- [Export Data](add-manage-users-roles-permissions-access.md#section-access-levels)
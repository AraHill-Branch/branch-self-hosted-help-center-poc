---
title: "Default Access Levels, Users Roles & Permissions"
slug: default-access-levels-users-roles-permissions
---

There are 3 main ingredients to the Branch permissions systems: Entities, Access Levels and Roles.

## Roles

Branch’s permission system allows you to control access with a high degree of precision. We support an exceptional level of customization of permissions. However, in most cases, you will be able to configure user access very simply. A users ultimate level of access is usually determined by two key factors:

1. Their Role a.k.a. "Access Level"
2. Their Entity (which will determine whether they can access data belonging to an [App](entity-views-access-controls-overview.md#section-app-view), [Organization](entity-views-access-controls-overview.md#section-organization-view) or shared with an [Agency](entity-views-access-controls-overview.md#section-agency-view))

This article covers Roles/Access Levels. For more information on Entity Views, see this [dedicated article](entity-views-access-controls-overview.md).

You can assign a user a set Role to determine their levels of access and control. We offer 4 template Roles: Admin, Team Member, Full Read, Limited Read, and User Coordinator. You can also create your own custom role. Each role comes with a bundle of Permissions (explained later) which will affect how the user may view, edit, and export data.

At a high level, this is how the different roles/access levels are recommended to be used:

| Role/Access Level | Main Permissions Granted | Best Used For |
| --- | --- | --- |
| Admin | - Add/remove other users - Edit permissions for all users - Configure access for ad networks, integrations with other platforms, and testing systems - Ability to export all data, including sensitive data such as device IDs and log level information | - Account administrators - Trusted individuals who need to be able to export sensitive data such as device IDs and log-level events - Experts charged with fine-tuning Branch’s fraud prevention system - Data engineers charged with setting up data integrations & feeds |
| Team Member | - Includes Edit access for Postbacks, ad partners, and configuration settings for Branch features such as Journeys, Email and Deep Views. - Includes control of attribution windows for ad partners | - Technically proficient team members charged with setting up and maintaining the Branch SDK, configuring ad partners, and maintaining integrations with ad partners. |
| Full Read | - View-only access on aggregate data, such as dashboards showing trends in clicks, installs and user growth - View-only access to settings and configuration pages, allowing users to see things such as attribution window and postback settings but not change them | - Analysts who need access to trend data for reporting purposes - Agency partners and other third parties who you may want to share settings information with, especially for de-bugging purposes, but do not intend to empower to directly make changes to the system themselves |
| Limited Read | - View-only access on aggregate data, such as dashboards showing trends in clicks, installs and user growth | - Analysts who need access to trend data for reporting purposes |
| User Coordinator | - The ability to add or remove other users from the account | - Designed for large teams who frequently have changes in team membership. The User Coordinator has no direct access to data from the rest of the product, but can handle team logistics, inviting new and removing users and agency team members and altering specific user permissions. Best used in combination with other steps such as implementing SSO on an account. (Note: The User Coordinator cannot be an agency member). |

Under the hood, each of the four default Roles/Access Levels is defined by a number of different Permissions. Understanding Permissions will be important if you decide you need to create Custom roles. Review the section below to understand Permissions.

## Access Levels

Every feature in Branch is associated with a combination of “Permissions”. To see, edit, or export data from a feature, a user needs to have been granted all of the Permissions associated with that feature. For example, there is a Permission that relates to “exporting” and another which relates to “sensitive data”, such as device IDs. If a user wants to be able to export device IDs from our Custom Exports feature, they would need to have both of these Permissions enabled on their individual user profile.

There are 7 different Permissions which an individual user can be assigned. These will determine whether a user can view, edit, and/or export data for specific elements within the Branch Dashboard. Most Permissions can be granted as either “View” or “Edit”.

- **Link Level**: Settings or features that can impact functionality for single links require this Access Level. This is mostly related to the Ad Links and Short Links configuration pages. Link Level is available as either a “View only” or “Edit”.
- **Channel Level**: Settings or features that can impact functionality across a marketing channel, such as paid advertising, or across entire Branch features which an app is using, such as Journeys, Text Me The App or Deep Views, require this Access Level. Channel Level is required to access ad partner management settings, and postback configurations, which can be used to send log-level data to ad partners. Channel Level is available as either a “View only” or “Edit”.
- **App Level**: Settings or features that can impact functionality app-wide require this Access Level. For example, this includes the Billing, single sign on (SSO), and API settings for an individual app. App Level is available as either a “View only” or “Edit”.
- **Aggregate Data**: Mostly used for reporting. With the Aggregate Data Access Level, a user will be able to see summary information such as clicks, installs and other events over time. Aggregate Data does not contain granular information, such as device IDs or log level events.
- **Sensitive Data**: Branch reserves a special control for data that can contain user-identifying, payment-related, or secret information. This enables you to impose stricter controls over actions such as the export of Device IDs, which may require different handling for privacy and security reasons.
- **Fraud Settings & Data**: Branch’s advanced Fraud rules are calibrated to detect and block fraud before you are billed for fraudulent installs by bad actors. Changes to these rules will increase or decrease your tolerance for potential fraud, and should be handled with due care. The Fraud Settings & Data Access Level is available as either a “View only” or “Edit”.
- **Engagement Builder**: Branch's Engagement feature is designed to help marketers conduct precision retargeting and re-engagement campaigns to drive even higher return on advertising spend. Using our simple yet precise rule system, clients can easily segment users into engagement groups based on their past purchases, advertising exposure, and in-app behavior. The Engagement Builder is available as either a “View only” or “Edit”.
- **Export**: Allows users to export data from pages they can view. The Export Access Level is frequently needed in combination with either Aggregate Data or Sensitive Data to move data from the system.

## How Roles and Access Levels Are Related

Under the hood, each of the four default Roles/Access Levels is defined by a number of different Permissions. The table below shows the Permissions assigned to each role by default.

| Role/Access Level | App Level | Channel Level | Link Level | Aggregate Data | Sensitive Data | Fraud Settings & Data | Engagement Builder | Export |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Admin** | Edit | Edit | Edit | View | View | Edit | Edit | Yes |
| **Team Member** | View | Edit | Edit | View |  |  | Edit |  |
| **Full Read** | View | View | View | View |  |  | View |  |
| **Limited Read** |  |  |  | View |  |  |  |  |
| User Coordinator |  |  |  |  |  |  |  |  |

\*\*If a box is blank, the user does not have access to see/edit the information, data, or have the option to export.

## Which Features Does A Role Gain Access To?

Every feature in Branch requires different Permissions to interact with it. The below table shows the required Permissions needed for each Feature. For Example, to access the Summary page a user must have the Aggregate Data Permissions. You can also see whether a user with a default Role (Admin, Team Member, Full Read, or Limited Read) is entitled to View or Edit that feature. In the case of the Summary page, you can see that because all Roles come with the Aggregate Data Access Level, all Roles have View access to the Summary Page.

| Page | Required Permissions | Default Profiles for Viewing | Default Profiles for Editing |
| --- | --- | --- | --- |
| Summary | Aggregate Data | All |  |
| Ads - Analytics | Aggregate Data | All |  |
| Ads - Partner Management | Channel Level | Admin,  Team Member,  Full Read | Admin,  Team Member |
| Ads - Links | Link Level, Channel Level | Admin,  Team Member,  Full Read | Admin,  Team Member |
| Ads - Fraud | Aggregate Data,  Fraud Settings & Data | Admin | Admin |
| Journeys - Activity | Aggregate Data,  Channel Level | Admin,  Team Member,  Full Read | Admin,  Team Member |
| Journeys - Manager | Channel Level,  Aggregate Data | Admin,  Team Member,  Full Read | Admin,  Team Member |
| Journeys - Cohorts | Channel Level,  Aggregate Data | Admin,  Team Member,  Full Read | Admin,  Team Member |
| QR Code - Manager | App Level,  Link Level  Must have "Restrict link creation and editing to templates" disabled | Admin, Team Member, Full Read | Admin, Team Member |
| QR Code - Analytics | App Level,  Link Level  Must have "Restrict link creation and editing to templates" disabled | Admin, Team Member, Full Read | Admin, Team Member |
| Email - Activity | Aggregate Data | All |  |
| Email - Cohorts | Aggregate Data | All |  |
| Email - Manager | Channel Level | Admin,  Team Member,  Full Read | Admin,  Team Member |
| Short Links | Link Level, Aggregate Data | Admin,  Team Member,  Full Read | Admin,  Team Member |
| Referrals **This has been deprecated** | Aggregate Data | All | Admin |
| Sources | Aggregate Data | All |  |
| Engagement | Engagement BuilderSensitive Data &  Export required for exporting engagement groups. | Admin,  Team Member,  Full Read | Admin, Team Member |
| Data Feeds - Manager | Channel Level | Admin,  Team Member,  Full Read | Admin,  Team Member |
| Data Feeds - Data Integrations | Channel Level, Sensitive Data | Admin | Admin |
| Data Feeds - Webhooks | Channel Level, Sensitive Data | Admin | Admin |
| Data Export/CSV Exports | Sensitive Data,  Export | Admin | Admin |
| Daily Exports | Sensitive Data,  Export | Admin | Admin |
| Custom Exports | Sensitive Data,  Export | Admin | Admin |
| Custom Export API via Account Settings | App Level | All |  |
| Configuration - General | App Level | Admin,  Team Member,  Full Read | Admin |
| Configuration - Attribution | App Level | Admin,  Team Member,  Full Read | Admin |
| Configuration - Deepviews | App Level,  Channel Level | Admin,  Team Member,  Full Read | Admin |
| Configuration - Desktop SMS | App Level,  Channel Level | Admin,  Team Member,  Full Read | Admin |
| Account Settings - Profile | App Level | Admin,  Team Member,  Full Read | Admin |
| Account Settings - User | None | All | All |
| Account Settings - Billing | App Level | Admin,  Team Member,  Full Read | Admin |
| Account Settings - Team | App Level,  Sensitive Data | Admin, User Coordinator\* | Admin, User Coordinator\* |
| Account Settings - Agencies | App Level,  Sensitive Data | Admin | Admin |
| Account Settings - SSO | App Level | Admin,  Team Member,  Full Read | Admin |
| Integration Status | Link Level | Admin,  Team Member,  Full Read |  |
| Test Devices | App Level | Admin,  Team Member,  Full Read | Admin |
| Liveview | Sensitive Data | Admin | Admin |

*Note: User Coordinators have access to Account Settings - Team and Account Settings - Agencies, without gaining access to any other features which are controlled by App Level or Sensitive Data permissions.*
---
title: "Manage Account Profile"
slug: profile-settings
---

## Overview

The Profile tab on the Account Settings page is where you find your Branch key and secret, app name, app ID, and timezone.

::: danger Warning
The Profile tab is part of the [legacy Branch](branch-dashboard-overview.md) experience and is slated for deprecation.  
  
In the [new version](new-branch-overview.md) of Branch:

- App name, app ID, app logo (social media preview), timezone, and currency settings live on the [General page](general-new.md).
- Branch Key, Branch Secret, and Access Token live on the Security and Access page, in the [Credentials tab](credentials-new.md).
:::

## Branch Key and Secret

In this section, you can access and copy your Branch Keys. Your keys are specific to an app. If you don't see this option on your view that means you are in [Organization View](entity-views-access-controls-overview.md#organization-view). Select the menu dropdown to toggle to [App View](entity-views-access-controls-overview.md#app-view). You will only be able to see your Secret Key if you are an admin.

::: tip Required Permissions
You'll need Admin access to see this page.
:::

### Reset Branch Key and Secret

If you need to reset your Branch Key/Secret, you will need to be an Admin, or have edit access for App-Level or Organization Level settings. If you have the necessary permissions, you can reset your key by:

1. Go to the **Account Settings** page and click the [Profile tab](https://dashboard.branch.io/account-settings/profile).
2. Here you can copy and/or reset your Branch Key and Secret. By resetting your Key/Secret, we automatically generate a new Key/Secret.



## App Name and ID & Organization Name and ID

Under the **About Your App**, you can access:

- **Organization / App Name** - This is provided by you, and can be changed.
- **Organization / App ID** - This is assigned by Branch and cannot be changed.



## Dashboard Analytics Time Zone

The dashboard's time zone ensures that data in the Branch dashboard is always presented consistently, no matter where in the world you may be when viewing your data. International teams can settle upon a fixed time zone and see Branch data in that time zone.

The time zone setting also allows you to import data from third parties, like Facebook and Google, and ensure that Branch data matches up with external sources.

### Setting Or Changing Timezone

::: danger Warning: Data Discrepancies When Changing Your Time Zone Settings
Branch allows you to change your time zone. Changing your time zone will take effect after a page refresh, and will set your dashboard to use your new time zone. We do not recommend changing the time zone unless you have to as it can cause discrepancies between previously exported data and the data in your dashboard.
:::

1. Go to the [Account Settings](https://branch.dashboard.branch.io/account-settings/profile) page. On the profile tab, find the section **Time Zone**.
2. Select your time zone from the dropdown.
3. Click **Save Settings**.
4. Refresh your browser to see the time zone change take effect.



## Delete App from Branch Dashboard

Navigate to [Account Settings](https://dashboard.branch.io/account-settings/profile), on the [Profile](https://dashboard.branch.io/account-settings/profile) tab, click **Delete Your App**, and follow the prompts to complete this action. This will be a permanent change. Note the following actions will apply once you delete your Branch app:

- We delete the dashboard user data of the original app creator associated with that particular app. They can still log in to other apps.
- Your links will show a 404.
- All requests to our API (via the SDK), will return a server error.
- Attribution and analytics information will no longer be tracked.
- All data feed systems will stop sending data (such as webhooks and data integrations).
- All Active Subscriptions for the app will be Cancelled.

## FAQs

<details>
<summary>Why am I not able to see my app in Branch?</summary>

If you are unable to see a Branch app that you previously had access to in the Branch app selector, try the following troubleshooting steps:

1. If this app is un-named it will not show up on the App selector. You can however search for this app using the App ID on the App selector. This will show up as 'Unnamed App' when searched with the App ID.
2. Make sure you still have access to this app. Check with an Admin of the app to confirm you are still part of the App team in Branch.

</details>

<details>
<summary>Is there a limit on the number of apps a user can create?</summary>

Yes, a user account can create a maximum of 100 Branch apps in Branch. If you have a requirement to create more apps, please reach out to us with a description of your use case for creating these apps and our team will review and increase the limit if applicable.

</details>

<details>
<summary>How do I find my Branch App ID?</summary>

You can find your Branch App ID by logging on to your Branch [Dashboard](https://dashboard.branch.io/account-settings/profile).

Navigate to **Settings** → **Profile** → **About your app** to find the App ID associated with the Branch App.

If you have an Agency account with Branch, please make sure you select the right advertiser app from the App selection drop-down before navigating to the Account Settings page.

</details>

<details>
<summary>Why can’t I log in to Branch?</summary>

You should have received an invitation email to log into the Branch Dashboard. If you already have an account registered to your email address, you can also try filling out the [password reset form](https://dashboard.branch.io/reset).

**Note**: Check both your inbox and spam folder for any invitation or password reset links.

</details>
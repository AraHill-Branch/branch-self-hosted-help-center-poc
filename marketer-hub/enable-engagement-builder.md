---
title: "Enable Engagement Builder"
slug: enable-engagement-builder
---

## Overview

By enabling Engagement Builder, Branch will be able to surface specific audiences to be used for re-engagement campaigns.

Please note that any use of imported user data to create Engagement Groups may be subject to certain limitations and restrictions imposed by those respective platforms from which the data was sourced. If you use the Engagement Builder feature, we recommend that you review the agreements you have in place with your partners to ensure you understand and can abide by, any limitations and restrictions from those platforms regarding the use of any data you import.

## Prerequisites

In order to enable Engagement Builder, you need to have completed the following:

1. Created a Branch Dashboard.
2. Enabled Ads **and** Engagement Builder for your Branch account.

   - Enterprise clients should contact their account manager to schedule deployment
3. Implemented the Branch SDK into your mobile app ([iOS](ios-sdk-overview.md) | [Android](android-sdk-overview.md))

   - [Track events](track-branch-events.md)
4. Logged into the Branch Dashboard with the [Engagement Builder Permission enabled](add-manage-users-roles-permissions-access.md).

## Enable Engagement Builder

### 1. Create an Engagement Group

In the Branch Dashboard, navigate to the [Engagement Builder screen](https://dashboard.branch.io/engagement), and click the blue **New Group** button.

![888](../../../assets/media/images/ecd29833-ecc4-4717-b5fc-e67fae79bad0 "Create Group.PNG")

### 2. Define Rules

Rules allow you to select users based on past behaviors and established attributes. Rules can be combined by using **AND** logic.

#### Select Target Platforms

![1692](/img/cd217d4-Screen_Shot_2020-07-22_at_9.16.03_AM.png "Screen Shot 2020-07-22 at 9.16.03 AM.png")

#### Select App Version

![](/img/18583b3-App_Version_Engagement_Builder.png)

#### Select Target Countries

![1692](/img/a646cef-Screen_Shot_2020-07-22_at_9.18.43_AM.png "Screen Shot 2020-07-22 at 9.18.43 AM.png")

You can select multiple from the drop-down. By default, **No country restrictions** is selected.

#### Select User Group Rules

| Category | Rules |
| --- | --- |
| In-App Behavior | - Active App Users - Complete Event - Recently Installed App - Lapsed App Users |
| Monetization | - Abandoned Cart - Purchasers - Revenue |
| Advertising Exposure | - Advertising Partner - Clicked Adverts - Clicked Emails - Interacted with Journey - Organically Acquired - Viewed Adverts |

#### Select Timeframe

| Timeframe | Options |
| --- | --- |
| In the last | - 1 Day (yesterday) - 7 Days - 30 Days - 60 Days - 90 Days - 180 Days - Exactly X Days - Quarter to date - Month to date |
| Between dates | - Start Date & End Date |

Engagement Builder stores up to 6 months of historical data

#### Select Frequency

| Frequency | Options |
| --- | --- |
| More than or equal to X times | 1 to 100 Integer |
| Less than or equal to X times | 1 to 100 Integer |
| Exactly X times | 1 to 100 Integer |
| Between X and Y times | 1 to 100 Integer |

![1692](/img/dc5da2d-Screen_Shot_2020-07-22_at_9.23.54_AM.png "Screen Shot 2020-07-22 at 9.23.54 AM.png")

Once rules are defined, click **Save & Go To Next Step**.

### 3. Choose Permissions (OPTIONAL)

You can share access to this engagement group with agencies and ad partners working on this account.

To share access with third parties connected to your account, click the **Select partner** dropdown, and **Add** the agency and/or ad partner.

![2158](/img/7962c4e-Screen_Shot_2020-07-22_at_9.31.44_AM.png "Screen Shot 2020-07-22 at 9.31.44 AM.png")

To be able to view, edit or download the engagement group, they will need [relevant permissions](add-manage-users-roles-permissions-access.md#access-levels) enabled on their account.

### 4. Connect Engagement Group to an Ad Partner

Using the **Select Ad Partner** dropdown, select Facebook or Google Adwords, and use the **Select Ad Account** to find your ad account.

![996](/img/f1b5925-Select_Ad.png "Select Ad.png")

You can continue to use the **AND** logic to add both Facebook and Google Adwords.

#### Facebook

::: info Custom Audience Terms
To upload the data to Facebook, please agree to the [Facebook Custom Audience Terms](https://developers.facebook.com/docs/marketing-api/audiences/reference/custom-audience-terms-of-service/) at `https://business.facebook.com/ads/manage/customaudiences/tos/?act=<>`
:::

For Facebook, you must do the following **if you already had Facebook integrated with Branch**:

1. Navigate to your [Facebook Settings in the Branch Dashboard](https://dashboard.branch.io/ads/partner-management/a_facebook?tab=settings)
2. Hover over the cog icon, and click **Reauthenticate**

   - **Note:** This will cause a slight discrepancy in the Branch Dashboard as it reestablishes its connection to Facebook.

![1046](../../../assets/media/images/dc751fb3-6443-4ff4-8fcb-edcaacd1b129 "Facebook Reauth.PNG")

#### Google Adwords

For Google Adwords, you must do the following:

1. Reach out to your Google Ads account manager to enable and use [Customer Match](https://support.google.com/google-ads/answer/6379332?hl=en).
2. Agree to the additional permissions (if applicable) when prompted before being able to integrate your engagement group with Google.

### 5. Select Scheduling

Choose how often your engagement group should update. “One-time” creates an export file just once, while daily will automatically refresh the segment based on users that start or stop meeting your criteria.

To choose how often your engagement group is updated:

1. Select either **One-time** or **Refresh Daily**.

- **One-time** - The engagement group is generated once, and not scheduled to refresh.
- **Refresh Daily** - The engagement group is re-generated every 24 hours.

2. Once done defining the rule, click **Save & Go To Next Step**.

![2166](/img/536f1c0-Screen_Shot_2020-07-22_at_9.53.18_AM.png "Screen Shot 2020-07-22 at 9.53.18 AM.png")

You can have up to 10 engagement groups set to actively generate engagement group data.

### 6. Set Engagement Group Name

Name your Engagement group and provide a description to help remind you and any members of your team why you created it.

![2166](/img/c88058d-Screen_Shot_2020-07-22_at_10.25.01_AM.png "Screen Shot 2020-07-22 at 10.25.01 AM.png")

### 7. Confirm Your Engagement Group

Click **Save & Build Engagement Group** once you've reviewed your settings. If you find something doesn't look quite right, you can use the left hand navigation to go back and make changes to any step.

![2166](/img/8422754-Screen_Shot_2020-07-22_at_10.34.27_AM.png "Screen Shot 2020-07-22 at 10.34.27 AM.png")
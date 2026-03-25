---
title: "Ads Advanced Configurations"
slug: ads-advanced-configuration
---

::: info Attention
Explore Branch’s new linking experience for [Web Links](https://help.branch.io/docs/create-web-links-1#view-and-manage-links) and [App Links](https://help.branch.io/docs/create-app-links-new), which offer deep linking, flexible configuration, and link analysis across multiple platforms!
:::

::: warning Ads Integration Guide
Please refer to our [Ads Basics](ad-partner-integration-guide.md) guide before using any the advanced options below.
:::

## Setup

### View-Through Attribution (VTA) with Impression Pixels

View-through attribution allows you to track installs, session starts and conversion events back to an ad impression, even if the ad was never clicked on.

Our view-through attribution logic is currently as follows for any given event:

- If there's a click within a valid attribution window, give credit to the click.
- If there's no click within a valid attribution window, give credit to the last impression that was within a valid attribution window.

To create an impression tracking link for non-SAN networks, simply [create an ad link](ad-partner-integration-guide.md#4-create-ad-link), and grab the impression link from the final step of link creation. SAN networks support VTA without any additional links.

### Testing with setDebug

When integrating the SDKs, it's often useful to use setDebug to verify that your app is able to communicate with Branch servers, and is receiving deep link data. However, our upstream systems don't register test events sent using setDebug, so events will not appear in Liveview or Analytics, nor will they fire Postbacks. You should disable setDebug when looking at Liveview or testing postbacks.

### Server to Server Ad Links

If you have a server to server integration you must provide specific requirements for attribution. Make sure to append the following mandatory key-values into tracking ad links to ensure they are not rejected or blocked:

- **Server to Server Parameter**: Add server-to-server click macro URL parameter at the end of your link, so we know it's a server to server link:

  - `%24s2s=true`
- **Device ID Macro Value**: Pass user Advertising Identifier via click macro URL parameter:

  - `%24idfa={IDFA}` for iOS devices
  - `%24aaid={AAID}` for Android devices
- **IP address**: Pass user IP information in the header OR click macro URL parameter to override on click:

  - HTTP header `x-ip-override: {IP_ADDRESS}`
  - Click macro URL parameter: `device_ip={IP_ADDRESS}`
- **User Agent**: Pass User Agent information in the header OR click macro URL parameter to override on click:

  - HTTP header `User-Agent: {USER_AGENT}`
  - Click macro URL parameter: `user_agent={USER_AGENT}`

::: warning Update Partner-specific URL macros
Please make sure that you are using your macros instead of {IDFA}. {AAID}, {IP\_ADDRESS}, {USER\_AGENT}
:::

### Adding/Enabling More Postbacks

Basic postbacks are automatically activated for events like *Install* and *Purchase* when you enable your ad partner. You can then add additional postbacks, for example, if you wanted to add postbacks for custom events that are specific to your app like *Account Created*.

To add a postback:

1. Under **Partner Management**, select the partner for whom you want to add/edit their postback.
2. Click on the **Postback Config** tab on said partner’s page.
3. Click the **Add New Postback** button at the bottom of the screen.
4. A modal will appear with Branch default events, as well as any commerce (reserved events like *PURCHASE)* or custom events you've set up. Select an event, enter a postback URL if you're asked to, and click **Save**. This will be the event that triggers your new postback.

   1. NOTE: If Branch does not already have a postback template for a partner, please provide a valid URL for your partner.

   ![](/img/1f15326-postback-add.gif "postback-add.gif")

### Sending All Events

If you want to send **All Events** - whether attributed to this partner or not - you can enable this setting by checking the **All Events** box on a per postback basis.

::: warning Privacy Implications
As this setting will send **All Events** - with the name and customer event alias listed in this row, whether attributed to this partner or not - we recommend using caution when/if enabling, especially if you have enabled agencies to access your account.
:::

![](/img/d34d771-all-events.png "all-events.png")

### Editing Templates

In most cases, the default postback URL generated from your selections is sufficient to provide postback notification to interested parties.

But sometimes you may need/want to edit or remove a parameter from the postback URL, or append a macro expression/variable to include additional information.

::: tip Example
You want to send your partner the actual items a user adds to their cart so they can optimize based off those items. Their current **Add to Cart** postback template does not include this information. Therefore, you need to add [Content Items](postback-macros-functions.md#content-items-data) macros to their URL. To do so, you’ll first need to get the correct field from the partner in which to pass this data; e.g. `cart_items`. Finally, you’d append `&cart_item=${(content_items[0].$product_name)!}` to the postback template.
:::

Please refer to [Postback Macros & Functions](postback-macros-functions.md) when looking to append additional macros.

To edit the postback template:

1. Under **Partner Management**, select the partner for whom you want to add/edit their postback.
2. Click on the **Postback Config** tab on said partner’s page.
3. In the **Postback URL** field, add/edit/remove the key-value pairs necessary.

   1. You must include a `&` before each key-value pairs you append.
4. Click **Save**.
5. Alternatively, hover on the three dots icon to the right of the postback and click **Advanced Edit**.
6. In the **Send a Webhook to** field, add/edit/remove the key-value pairs necessary.

   1. You must include a `&` before each key-value pairs you append.
7. Click **Save**.

::: tip Reset Postbacks
We all make mistakes from time to time. If you need to reset your postbacks and your credentials, navigate to the **Account Settings** tab and look for the **Reset all settings** button. Be careful though! This will disable the ad partner, clear out all credentials and postbacks that you've set up, and return the ad partner to its basic configuration. You can then start afresh.
:::

## Granting Agency Access

### Granting Ad Partner Access

To grant an Ad Partner access to your App's data, you need to add them as an `agency` in your Branch account. Doing so gives said ad partner access to your app; based on the permissions you define.

1. Go to **Account Settings** and click on the **Agencies** tab.
2. On the **Agencies** tab, click the **Add New Agency** button.
3. In the **Add New Agency** modal:

   1. Select the Agency name from the drop-down.
   2. Select the appropriate level of access.

      - **Admin** - Edit access to all settings and export access to all data.
      - **Team Member** - Edit access to channels and links, read-only access to app settings, and access to aggregate data.
      - **Full Read** - Read-only access to all settings and access to aggregate data.
      - **Limited Read** - Access to aggregate data only.
      - **Custom** - Customize settings and data access.
      - **No Access** - no dashboard access.
   3. Click "Invite".
   4. All Agency Admins on the agency account will receive an invitation email, and any of those Agency Admins can accept the invitation on behalf of their agency.

::: warning Granting agencies Sensitive Data & App-Level Settings permissions
Agencies with Sensitive Data & App-Level Settings permissions to an Org or App will have access to that Org/App's API keys, which can be used to access Branch's [HTTP](https://help.branch.io/apidocs/deep-linking-api) and [Data Export](https://help.branch.io/apidocs/daily-exports-api) APIs. Agency data filters (e.g. Only Show Agency-tagged Data) will not apply to data accessed via the Daily Export API, so we recommend against granting agencies these permissions and providing them with API keys.
:::

### Defining Permissions

Each access level - as defined above - comes with predefined permissions which you can edit if you choose.

::: tip Modifying Permissions
If you want to modify a predefined access level, click the pencil icon to (de)select the available options.
:::

- **Link-level Settings** - Settings or features that can impact functionality for single links.
- **Channel-level Settings** - Settings or features that can impact functionality across a marketing channel.
- **App-level Settings** - Settings or features that can impact functionality app-wide.
- **Aggregate Data** - Summary data that contains no granular data.
- **Sensitive Data** - Data that can contain user-identifying, payment-related, or secret information.

#### Additional Data Filters

During the process of granting an agency access to your Branch account, you can also impose limitations around what data is available to the agency at any given time.

::: warning Filter to Only Show Data from Specific Ad Networks
When giving an ad partner access to your Branch account, please make sure you toggle the **Only Show Data from Specific Ad Networks** to on and select the ad partner you are giving access to.
:::

- **Only Show Agency-tagged Data** - When toggled on, agency users can only see events tagged with their Agency ID.
- **Restrict Access to Revenue Data** - When toggled on, agency users cannot view revenue data.
- **Only Show Data from Specific Ad Networks** - When toggled on, agency users can only view events from a specific list of ad networks.
- **Only Show Data from Specific Locations** - When toggled on, agency users can only view events that have taken place in a specific list of countries.

::: warning Agency Invitation
Once you've defined the appropriate levels of access for your Agency, you must **Invite** them to access the Branch dashboard. Only Organization Admins can invite an Agency to access the Branch dashboard.
:::

## Tracking Link Parameters

Branch Tracking links allow tracking many parameters about the performance of your ad campaigns and individual ads. You can see each partner's specific link Parameters under the **Link Parameters** tab:

![](/img/2f8c5ab-link-parameters.png "link-parameters.png")

Additional parameters for advanced analysis may be added to the link after the '?' or '&' character, to trace extra information.

::: tip Example Tracking Link with Additional Parameters
Example Branch link including additional parameters to pass Agency and Sub Publisher information:`https://tracking.app.link?$3p=a_partner&~agency_id=1234&~agency=myAgency&~secondary_publisher=best_publisher`
:::

The following parameters are available to use within the pre-generated tracking link:

### Campaign Information

| Branch Parameter | Description |
| --- | --- |
| `~agency` | Agency name |
| `~agency_id` | [Agency ID](https://help.branch.io/partners-portal/docs/manage-agency-user-profile) |
| `~secondary_publisher` | Sub Publisher |
| `~campaign` | Campaign name |
| `~campaign_id` | Campaign ID |
| `~channel` | Channel |
| `~feature` | Feature |
| `~stage` | Stage |
| `~tags` | Tags |
| `~creative_name` | Creative name |
| `~creative_id` | Creative ID |
| `~ad_set_name` | Ad set name |
| `~ad_set_id` | Ad set ID |
| `~ad_name` | Ad unit name |
| `~ad_id` | Ad unit ID |
| `~banner_dimensions` | Banner Dimension |
| `~placement` | Placement |
| `~keyword_id` | Keyword ID |
| `~keyword_text` | Keyword Text |

#### Device Information

| Branch Parameter | Description |
| --- | --- |
| `%24aaid` | Google AAID |
| `%24idfa` | Apple IDFA |

### Spend Calculation

::: info Cost Data Availability
Cost data passed via these macros is available in exports but is not visible in the Branch dashboard.
:::

| Branch Parameter | Description |
| --- | --- |
| `~cost_model` | Cost Model; e.g. CPI, eCPC |
| `~cost` | Cost; e.g. 10.00 |
| `~cost_currency` | Cost Currency; e.g. USD |

## Attribution Windows

### Changing Attribution Windows

Attribution windows can be specified at the global account level or on a per link basis with the link level window taking priority. See the below instructions for setup.

For customer experience and data accuracy, please do not set your deep linking window longer than the other attribution windows.

### Account Level Attribution Windows

You can edit your attribution windows under Link Settings > Attribution Windows.

![](/img/1fda3c9-attribution-windows.png "attribution-windows.png")

Learn more about account level attribution windows in [People-Based Attribution](branch-attribution-logic-settings.md).

### Ad Network Attribution Windows

You can edit your attribution windows at the ad network level if your ad network requires it. This is recommended when you enable networks like Facebook and Google, which may have different windows for installs. With this, you can preserve your Account Level Attribution Windows, as well.

![](/img/90d323e-anaw_clear.png "anaw_clear.png")

### Link Level Attribution Windows

To set attribution windows on a link level, you can append the following parameters to your generated Branch link.

| Key | Example Link |
| --- | --- |
| `$click_install_window_days` | <https://branchster.app.link/hpNVE52gxE?$click_install_window_days=3> |
| `$click_session_start_window_days` | <https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=7> |
| `$click_conversion_window_days` | <https://branchster.app.link/hpNVE52gxE?$click_conversion_window_days=30> |
| `$impression_install_window_days` | <https://branchster.app.link/hpNVE52gxE?$impression_install_window_days=3> |
| `$impression_session_start_window_days` | <https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=1> |
| `$impression_conversion_window_days` | <https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=7> |

::: warning Link Level Attribution Support for Standard Branch Links
As of July 2017, link level attribution window setting is only available on standard Branch Links. Special Branch Links such as the ones used for Google's Universal App Campaign or Play Store links with Branch link id parameters are currently not supported.
:::

### View your data

The [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard shows the performance of your ad campaigns *across both web and app*. You can view performance over time, including purchase and other custom events.

Events are attributed using Branch's unified last-click attribution model. This means that Branch will attribute to the last click across channels, and across platforms.

For example, if a customer clicks a Branch email link, and then clicks an ad, installs the app and purchases an item, Branch will attribute the install and the purchase to the last clicked ad link.

If the customer then goes on to purchase an item on web within the attribution window, Branch will also attribute the web purchase to the same ad link, connecting the web and app actions taken by a single user for a more accurate view of your marketing channels and customer behavior.

![](/img/0921870-install-by-secondary-pub.png "install-by-secondary-pub.png")

You can read more about [Branch's Attribution logic here](branch-attribution-logic-settings.md).
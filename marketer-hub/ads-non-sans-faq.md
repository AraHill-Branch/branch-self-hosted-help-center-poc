---
title: "Ads (non-SANs) FAQ"
slug: ads-non-sans-faq
---

The most frequently asked questions about ads.

<details>
<summary>How do I reset my ad partner’s settings?</summary>

There may be times when you need to reset a partner's settings; i.e. when a partner updates their postback templates or when perhaps you've made a mistake during partner setup. Resetting a partner's settings allows you to re-enable the partner integration with the correct information to accurately measure and attribute conversion.

By resetting your partner settings, this will:

- Disable the ad partner
- Clear out all of your saved credentials and Postbacks that are already setup
- Return the ad partner to its basic configuration

To reset your ad partner's settings:

1. Find your partner on the [Partner Management](https://dashboard.branch.io/ads/partner-management) page.
2. Click on the **Account Settings** tab for your partner.
3. Click the **Reset All Settings** button.

</details>

<details>
<summary>How do I sign up as a Branch partner to run campaigns for my advertisers?</summary>

To sign up as a partner with Branch, use our [Partner Management Form](https://branchmetrics.typeform.com/to/XXkMePO9).

Our Business Development team will reach out to you to take this forward and work with you to get you onboarded.

</details>

<details>
<summary>Why can’t my Ad Partner access Branch?</summary>

Enabling the Ad Partner Integration through **Ads > Partner Management** tab on the Dashboard, does not provide the Ad Partner access to the Dashboard.

In order to grant the Ad Partner access to your dashboard, please follow the guide no how to [Grant an Agency Access](add-agency-to-your-account.md).

</details>

<details>
<summary>Does re-authenticating an Ad Partner disrupt/break the existing campaigns?</summary>

The re-authentication process refreshes the API integration for the concerned partner and will reflect any changes being made (ex. adding new ad accounts, any changes for event mapping/attribution windows/timezones, etc). This process takes around 24 hours to complete before the populated information reflects any changes.

Your campaign information and associated information will NOT be lost in the process.

</details>

<details>
<summary>Why does clicking on an Ad Link with macros/parameteres redirect to a Branch error page?</summary>

Macros like &#123;&#123;campaign&#125;&#125; are seen on Ad Links. When these ad links are added as click trackers in the actual ad by the ad network they are filled in by the actual value by the Ad Network itself. Clicking on these Ad Links with macros will not work since certain browsers do not accept brackets &#123;&#123;--&#125;&#125;. You can replace the macro with a test value and click on the link.

Example:

Test Ad Link: <https://branchster.app.link/1DPD90PV2cb?%243p=a_digital_turbine&%24aaid=[AAID]&~campaign=[CAMPAIGN_NAME]&~campaign_id=[CAMPAIGN_ID]&~click_id=[ClickID]&~secondary_publisher=[SITE_NAME]>

Notice the macro looks a little different here, it depends on the Ad Network on what type of macros they support. But the above link can be converted to the following for testing purposes:

<https://branchster.app.link/1DPD90PV2cb?%243p=a_digital_turbine&%24aaid=11111111-2222-3333-4444-55555555&~campaign=test_campaign&~campaign_id=1234&~click_id=abcd123&~secondary_publisher=test_secondary_publisher>

Clicking on the above link will not throw the error.

Moreover, certain macros on the Ad Link may result in different behavior depending on the value being used to test. When troubleshooting your Ad Link, sure that you are using valid test values for each macro. Macros in particular that are prone to causing errors due to format are IDs like aaid, idfa, etc.

</details>

<details>
<summary>How can I add more macros to Ad Links?</summary>

The macros added on the Ad Links are a way for the Ad Network to forward the data to Branch. Branch can add any macro to the ad link if the Ad Network can support filling in of those macros.

Example:

If the link today looks like: <https://branchster.app.link/1DPD90PV2cb?%243p=a_digital_turbine&%24aaid=[AAID]&~campaign=[CAMPAIGN_NAME]&~campaign_id=[CAMPAIGN_ID]&~click_id=[ClickID]&~secondary_publisher=[SITE_NAME]>

And, you or the Ad Network wants to add another macro for creative\_name, you can map it to one of the existing analytics labels on Branch listed here. Then, the link would look like: <https://branchster.app.link/1DPD90PV2cb?%243p=a_digital_turbine&%24aaid=[AAID]&~campaign=[CAMPAIGN_NAME]&~campaign_id=[CAMPAIGN_ID]&~click_id=[ClickID]&~secondary_publisher=[SITE_NAME]&~creative_name=[CREATIVE_NAME]>

[CREATIVE\_NAME] is the macro that the Ad Network should send us and we can map it to one of the existing labels as mentioned above, but also map it to any custom parameter, such as:

<https://branchster.app.link/1DPD90PV2cb?%243p=a_digital_turbine&%24aaid=[AAID]&~campaign=[CAMPAIGN_NAME]&~campaign_id=[CAMPAIGN_ID]&~click_id=[ClickID]&~secondary_publisher=[SITE_NAME]&creativename=[CREATIVE_NAME]>

</details>

<details>
<summary>Why are the ads macros/parameters not visible in Branch?</summary>

The analytics labels that can be viewed on the dashboard are listed [here](https://help.branch.io/v1/docs/creating-a-deep-link). Any other custom macros that are added on the Ad Links will be visible in the exports via [Daily Export API](https://help.branch.io/v1-api/apidocs/daily-exports-api) or [Custom Exports API](https://help.branch.io/v1-api/apidocs/custom-exports-api) in the `last_attributed_touch_data_custom_fields` column.

</details>
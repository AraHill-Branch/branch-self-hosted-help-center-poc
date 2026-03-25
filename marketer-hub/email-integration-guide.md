---
title: "Email Integration Guide"
slug: email-integration-guide
---

This guide covers how to configure and test Branch Email in your dashboard and ESP.

## Before you begin

Branch Email requires technical prerequisites to be completed by your development team before you can configure the integration.

Your developers must implement the Branch SDK, enable Universal Links, configure Associated Domains, and set up deep link routing in your app.

See our [developer documentation](https://help.branch.io/developer-hub/docs/email-integration-for-developers) for implementation details.

## Enable the integration

To enable the integration:

1. In the left-hand navigation, click **Email**.
2. On the Email overview page, click the **Manager** tab at the top.
3. Find your ESP and click **Enable**.

::: info Note
Branch automatically detects any global link settings you have already provided during the initial setup of your Branch account as outlined above.

If you have not set up your [global link settings and redirect preferences](basic-link-configuration.md), you will be prompted to do so at this time.
:::

## Provide click tracking domain

Click tracking domains allow you to track engagement on email opens and link clicks.

If you're unsure what your click tracking domain (CTD) is, take a look at one of your recently sent emails. If you hover over the link or right-click/copy the link address, you will see that the domain of the link in the email does not match the URL in your HTML. This domain is your click tracking domain used by your ESP to provide you click reporting.

Alternatively, use the button below to find your ESP's documentation on how to find your click tracking domain. If no documentation is available, we provide a link on how to contact the support team for your ESP.

::: warning Caution
Leave off `http://` and `https://` when adding your click tracking domain in the Branch Dashboard.
:::

*[Image: 2412]*

::: warning Caution
Before you click **NEXT** and proceed to the **Validate & Test** section, please complete the DNS CNAME configuration step, as it's required for passing integration validation. Your development or IT team will need to [configure DNS settings](https://help.branch.io/developer-hub/docs/email-integration-for-developers).
:::

<details>
<summary>Expand for ESP CTD list</summary>

- [Adestra](https://uplandsoftware.com/adestra/contact/)
- [Adobe Campaign Classic](adobe-campaign-classic.md)
- [Adobe Campaign Standard](adobe-campaign-standard.md)
- [Airship](https://support.airship.com/hc/en-us/requests/new)
- [Amazon Simple Email Service](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-custom-open-click-domains.html)
- [Betaout](https://bluecorehelp.zendesk.com/hc/en-us/requests/new)
- [Bluecore](https://bluecorehelp.zendesk.com/hc/en-us/requests/new)
- [Blueshift](mailto:hello@blueshift.com)
- [Braze + Mailjet](https://app.mailjet.com/support/how-to-validate-an-entire-sending-domain,214.htm)
- [Braze + SendGrid](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/)
- [Braze + SparkPost](https://www.sparkpost.com/docs/tech-resources/enabling-multiple-custom-tracking-domains/)
- [Campaign Monitor](https://help.campaignmonitor.com/custom-domain-names#set-up-a-custom-domain)
- [Cheetah Digital Marketing Suite](https://www.cheetahdigital.com/about-us/contact-us)
- [CleverTap + Amazon SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-custom-open-click-domains.html)
- [CleverTap + Mailgun](https://help.mailgun.com/hc/en-us/articles/202052074-How-do-I-verify-my-domain-)
- [CleverTap + Mandrill](https://mandrill.zendesk.com/hc/en-us/articles/205582387-How-to-Set-up-Sending-Domains)
- [CleverTap + SendGrid](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/)
- [CMercury](https://cmercury.com/contact-us/)
- [Cordial](https://cordial.com/contact-us/)
- [Customer.io](https://customer.io/contact/)
- [Emarsys](https://emarsys.com/contact-us/)
- [Epsilon](https://us.epsilon.com/data-driven-marketing-solutions-contact-us)
- [ExpertSender](https://help.expertsender.com/contact-us?contact_query=Please%20enter%20your%20question)
- [Hootsuite](https://hootsuite.com/about/contact-us)
- [IBM Watson Campaign Automation](https://www.ibm.com/contact/us/en/?lnk=flg-cont-usen)
- [Iterable Legacy](https://support.iterable.com/hc/en-us/articles/115002651226-Setting-Up-Mail-Domains#trackingdomains)
- [Iterable](https://support.iterable.com/hc/en-us/articles/115002651226-Setting-Up-Mail-Domains#trackingdomains)
- [Kahuna](kahuna.md)
- [Klaviyo](https://help.klaviyo.com/hc/en-us/articles/360001550572-Setting-Up-Dedicated-Click-Tracking)
- [Leanplum](https://docs.leanplum.com/docs/setup-email-messaging)
- [Mailgun](https://help.mailgun.com/hc/en-us/articles/202052074-How-do-I-verify-my-domain-)
- [Mailjet](https://app.mailjet.com/support/how-to-validate-an-entire-sending-domain,214.htm)
- [MailUp](https://www.mailup.com/contacts/customers-support-request/)
- [Mandrill](https://mandrill.zendesk.com/hc/en-us/articles/205582387-How-to-Set-up-Sending-Domains)
- [Marketo](https://docs.marketo.com/display/public/DOCS/Setup+Steps)
- [Message Gears](https://support.messagegears.com/hc/en-us/articles/236281188-Whitelabeling-and-Dedicated-IPs#customtrackingdomain)
- [MoEngage](https://help.moengage.com/hc/en-us/articles/360059172811-Configure-Email-Channel#01GKF31727RMVX3BVK4EMTCZGB)
- [Optimove](https://optimove.com/contact)
- [Oracle Bronto](https://helpdocs.bronto.com/bmp/task/t_bmp_home_data_exchange_link_tracking_set_up.html)
- [Oracle Eloqua](https://support.oracle.com/portal/)
- [Oracle Responsys](https://support.oracle.com/portal/)
- [Pepipost](https://pepipost.com/contact/)
- [PostUp](mailto:postup-support@uplandsoftware.com)
- [Rapid Mail](https://www.rapidmail.com/contact)
- [Sailthru v1](https://getstarted.sailthru.com/account/management/settings/#Setup_8211_Domains)
- [Sailthru v2](https://getstarted.sailthru.com/account/management/settings/#Setup_8211_Domains)
- [Salesforce v1 Open Web](salesforce-open-web-default.md)
- [Salesforce v1 Open App](salesforce-open-app-default.md)
- [Salesforce v2](salesforce-v2-legacy.md)
- [Salesforce v3](salesforce-v3-legacy.md)
- [Selligent Marketing Cloud](https://www.selligent.com/services/support-services)
- [Selligent Message Studio](https://www.selligent.com/services/support-services)
- [Sender](mailto:support@sender.net)
- [SendGrid](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/)
- [Smartech](mailto:sales@netcoresmartech.com)
- [SocialFlow](mailto:support@socialflow.com)
- [SparkPost](https://support.sparkpost.com/docs/tech-resources/enabling-multiple-custom-tracking-domains)
- [Vero](https://www.getvero.com/contact-us/)
- [WhatCounts](https://www.yesmarketing.com/contact)
- [Yes Marketing](https://www.yesmarketing.com/contact)
- [Yiye Technology](http://www.easeye.com.cn/)

</details>

### Important considerations

- You can enable the integration with multiple CTD if needed, but you cannot add the same CTD to multiple Branch dashboards or ESP integrations.
- In some ESP integrations, you will also be required to add a "data domain" the ESP uses to collect click data.

  - The ESP selected will dictate whether this field appears or not - if the field does not appear, you're not required to add it.
  - Confirm the data domain with your ESP's account manager.
- In some ESP integrations, you will also be required to send them the AASA file Branch generates by providing your ESP's contact email.

  - The ESP selected will dictate whether this field appears or not - if the field does not appear, you're not required to add it.

## DNS CNAME configuration

::: warning Caution
If you ever remove your click tracking domain from Branch or disable the email integration, you must also delete the corresponding CNAME record from your DNS configuration. Leaving a CNAME record pointing to Branch after the domain has been removed from your Branch account creates a dangling DNS entry that could be claimed by an unauthorized party, posing a subdomain takeover security risk.
:::

Most ESP integrations require updating the DNS record for your click tracking domain to include a CNAME record that points to Branch's domain. Your development or IT team will need to complete this step. See our [developer documentation](https://help.branch.io/developer-hub/docs/email-integration-for-developers) for implementation details.

## Test the integration

Once the validation process is complete, you can test the integration by generating a test link. The test link generated by Branch is unique in that it's already converted to a Branch Link for you and allows you to test without creating an email template in your ESP. In reality, this conversion happens behind the scenes once a user clicks on your normal email template link.

To generate a test link:

1. In the **Validate & Test** section, input a URL from your website.
2. Click **Get Test Link**.
3. Once the test link is generated, you can share it via:

   1. Copy to clipboard
   2. SMS
   3. Email

      

Once you've generated your test link, click the link on your mobile device.

::: tip Tip
Make sure your mobile device already has the app installed!
:::

## Send emails with flagged links

Before you start setting up your email campaigns, you need to determine what flow you want the user to experience and flag your email link accordingly.

Most ESPs support the following user flows:

- **Deep linking users to in-app content**

  - Added to your links as a URL query parameter:  
    `<a href="links.example.com?$deep_link=true" >Link to your app!</a>`
  - Added to the HTML:  
    `<a href="http://example.com" deeplink="true">Link to your app!</a>`
- **Linking users to web-only content**

  - Added to your links as a URL query parameter:  
    `<a href="links.example.com?$web_only=true" >Link to your app!</a>`

<details>
<summary>Expand for required link flags for each ESP</summary>

| ESP name | ESP required link flags |
| --- | --- |
| Adestra | - **Deep linking users to in-app content**: add `$deep_link=true` to you links as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Adobe Campaign Classic | [**See Dedicated Adobe Campaign Classic Guide**](adobe-campaign-classic.md#section-using-universal-email) |
| Adobe Campaign Standard | [**See Dedicated Adobe Campaign Standard Guide**](adobe-campaign-standard.md#section-using-universal-email) |
| Airship | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Amazon Simple Email Service | - **Deep linking users to in-app content**: add `$deep_link=true` to your links as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Betaout | - **Deep linking users to in-app content**: add `$deep_link=true` to your links as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Bluecore | - **Deep linking users to in-app content via UI Editor**: select the **Deep Link** checkbox - **Deep linking users to in-app content via HTML Editor**: add `universal="true"` to the HTML   ⚠️If you are using dynamic links in email, contact Bluecore team to enable link scraping.⚠️ |
| Blueshift | - **Deep linking users to web-only content**: add `web-only="true"` to your HTML code |
| Braze + Mailjet | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Braze + SendGrid | - **Deep linking users to in-app content**: add `universal="true"` to the HTML |
| Braze + SparkPost | - **Deep linking users to in-app content**: add `data-msys-sublink="uni"` to the HTML |
| Braze + SparkPost (query parameter method) | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Campaign Monitor | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Cheetah Digital Marketing Suite | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| CleverTap + Amazon SES | [**See Dedicated Clevertap + Amazon SES Guide**](clevertap.md#amazon-ses) |
| CleverTap + Mailgun | [**See Dedicated Clevertap + Mailgun Guide**](clevertap.md#mailgun) |
| CleverTap + Mandrill | [**See Dedicated Clevertap + Mandrill Guide**](clevertap.md#mandrill) |
| CleverTap + SendGrid | [**See Dedicated Clevertap + Sendgrid Guide**](clevertap.md#sendgrid) |
| CMercury | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Cordial | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Customer.io | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Emarsys | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Epsilon | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| ExpertSender | - **Deep linking users to in-app content**: add `$deep_link=true`to your links as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Hootsuite | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| IBM Watson Campaign Automation | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Iterable v1 (legacy) | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Iterable v2 | - [***Automatic Link Recognition: requires setting up iOS Universal links in your Iterable account.***](https://support.iterable.com/hc/en-us/articles/360035496511-iOS-Universal-Links-Setup-#setup) |
| Kahuna | - **Deep linking users to in-app content**: add `kahuna_branch_deep_link=true` as a query parameter |
| Klaviyo | - **Deep linking users to in-app content**: add `universal="true"` to the HTML |
| Leanplum | - **Deep linking users to in-app content**: add `universal="true"` to the HTML |
| Mailgun | - **Deep linking users to in-app content**: add `deeplink="true"` to the HTML |
| Mailjet | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| MailUp | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Mandrill | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Marketo | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Message Gears | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter **AND** add `mobile="true"` to the HTML - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| MoEngage | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Optimove | - **Deep linking users to in-app content**: add `universal="true"` to the HTML |
| Oracle Bronto | - **Deep linking users to in-app content**: add `deeplink="true"` to the HTML |
| Oracle Eloqua | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Oracle Responsys | [**See Dedicated Oracle Responsys Guide**](oracle-responsys.md) |
| Pepipost | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| PostUp | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Rapid Mail | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Sailthru v1 | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Sailthru v2 | - **Linking users to web-only content**: add `&noapp=true` to your links as a query parameter. [***Requires enabling web-only tagging for your Sailthru account.***](https://getstarted.sailthru.com/account/management/apple-ios-app-universal-links/#Enable_Opening_Links_in_the_Native_Browser) |
| Salesforce Open Web Default | [**See Dedicated Salesforce Open Web Default Guide**](salesforce-open-web-default.md#section-options-for-generating-branch-links-for-email) |
| Salesforce Open App Default | [**See Dedicated Salesforce Open App Default Guide**](salesforce-open-app-default.md#section-options-for-generating-branch-links-for-email) |
| Salesforce Legacy v2 | [**See Dedicated Salesforce Legacy v2 Guide**](salesforce-v2-legacy.md) |
| Salesforce Legacy v3 | [**See Dedicated Salesforce Legacy v3 Guide**](salesforce-v3-legacy.md) |
| Selligent Marketing Cloud | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Selligent Message Studio | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Sender | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| SendGrid | - **Deep linking users to in-app content**: add `universal="true"` to the HTML |
| Smartech | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| SocialFlow | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Vero | - **Deep linking users to in-app content**: add `universal="true"` to the HTML |
| WhatCounts | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Yes Marketing | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |
| Yiye Technology | - **Deep linking users to in-app content**: add `$deep_link=true` as a query parameter - **Linking users to web-only content**: add `$web_only=true` to your links as a query parameter |

</details>

## FAQs

<details>
<summary>Why is there an additional Safelink redirect on top of my Click Tracking Domain?</summary>

While testing your Branch Email integration, you may see an additional wrapping around your email links. Platforms like Outlook will add an additional redirect for security purposes.

For example - you might see <https://safelinks.protection.outlook.com/> before a 302 Redirect to the Click Tracking Domain.

*Fix: Send and open the email to a non-Outlook email address*

</details>

<details>
<summary>How can I request a new Email partner?</summary>

Have your Email Service Provider (ESP) Account Manager fill out the [Branch Partner Profile form](https://branch.link/partner-management-form).

</details>

<details>
<summary>How can I send additional data to my ESP?</summary>

Branch's Branch Email integration will automatically send click tracking analytics to ESPs. Some ESPs have formal data integrations with Branch to send additional data like installs.

Please refer to [Branch's Data Integrations Partner List](https://help.branch.io/v1/docs/data-integration-partners) to see if your ESP supports this.

</details>
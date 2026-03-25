---
title: "Email Integration for Developers"
slug: email-integration-for-developers
---

This guide covers the technical prerequisites and implementation details for integrating Branch Email. Marketers should refer to our Email integration guide for marketers for dashboard configuration and campaign setup.

## Email integration prerequisites

Before your marketing team can configure Branch Email in the dashboard, you must complete the following technical prerequisites in your app and infrastructure.

1. [Add deep link routing & required redirects](https://dashboard.branch.io/configuration/general).
2. [Implement the Branch SDK](native-sdks-overview.md).
3. [Enable Universal Linking](ios-universal-links.md).
4. [Add your ESP's CTD to your Associated Domains Entitlement](ios-basic-integration.md#3-configure-associated-domains).

   1. Verify it is valid using our [AASA file Validator](https://branch.io/resources/aasa-validator).
5. [Add handle web-only content app code](ios-advanced-features.md#web-only-content).
6. [Add return YES to continueUserActivity](ios-full-reference.md#continueuseractivity).

## DNS CNAME configuration

The majority of ESP integrations require updating the DNS record for your click tracking domain (CTD) to include a CNAME (alias) record that points to Branch's `thirdparty.bnc.lt` domain.

Please follow your web hosting provider's instructions on how to configure your DNS CNAME. Here are a few common provider's instructions for reference:

- [AWS](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html)
- [GoDaddy](https://www.godaddy.com/help/change-a-cname-record-19237)
- [CloudFlare DNS](https://support.cloudflare.com/hc/en-us/articles/360020615111-Configuring-a-CNAME-setup)

### Important CNAME information

- The Branch Dashboard must be enabled & reflect the CTD **after** you add the CNAME.
- If the CTD already has SSL setup, confirm if your security credentials allow a 3rd party to submit a CSR on behalf of the domain. If not, contact Branch's Support team to coordinate providing an SSL certificate manually to Branch.
- Once the CNAME is added, Branch auto-generates an SSL certificate and AASA file for your click tracking domain. It may take up to an hour to resolve SSL errors once you change the CNAME. During this time, link redirects on the click tracking domain will redirect to the **Default URL** you provided in the **General Configuration** section of your account.
- If you are making this change to a live domain with active email click traffic, schedule the CNAME change to occur during an off-hours time with low click traffic.

## Integration validation

Once the SSL certificates and AASA file (iOS only) have been generated, you can proceed to reviewing the validation tests and fixing any issues.

Branch automatically validates the following:

- iOS SDK is integrated (**required**)
- Android SDK is integrated (**required**)
- Deep linking is setup (**required**)
- Click Tracking Domain is setup (**required**)
- AASA file is valid (**required**) - Use our AASA File Validator: <https://branch.io/resources/aasa-validator/>
- SSL is correctly setup (**required**)
- CNAME points to thirdparty.bnc.lt (**case-by-case** requirement)
- Universal Linking is setup (**required**)
- Hosted deep link data (optional)
- App Events being tracked (optional)
- Android App Links (optional)

### Common validation issues

#### CNAME does not point to Branch

Pointing your DNS CNAME to Branch is a vital step of the integration process.

Please make sure to:

Log into your DNS provider's console and add the CNAME record as described above.

Wait at least 60 minutes after you've added the CNAME record so that it has time to propagate and Branch can create the resulting SSL certificates and AASA files (for iOS apps only).

#### SSL not correctly set up

If you are having issues with the SSL certificate validating, the culprit is generally the fact that your click tracking domain already has SSL set up and there are restrictions that prevent a 3rd party from submitting a Certificate Signing Request on your behalf.

#### AASA file is invalid

The main reason for this error is the fact that it depends on the SSL being set up correctly. By addressing the SSL error, the AASA file error should resolve itself simultaneously.

## How to open emails in Android to support web-only use case

There are 2 options to support the web-only use case in Android to open a Branch Email link:

1. Remove the CTD from the manifest file, this will let all the links coming from the email to open as web\_only. In cases where the apps need to open after clicking the Branch Link, URI scheme would serve that use case.

2. If you want to use applinks and still have the email links open web\_only, then add the following code in the Android app to support the web\_only logic.

```
@Override
public void onStart() {
    super.onStart();
    Branch.getInstance().initSession(new Branch.BranchReferralInitListener() {
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {
            if (error == null) {
                //logic to handle webonly routing
                String webOnlyParam = referringParams.optString("$web_only");
                if(!webOnlyParam.isEmpty()) {
                    if(webOnlyParam.contentEquals("true")) {
                        String url = referringParams.optString("$canonical_url");
                        if(!url.isEmpty()) {
                            Intent i = new Intent(Intent.ACTION_VIEW);
                            i.setData(Uri.parse(url));
                            startActivity(i);
                        } else {
                            Log.i("Tag","missing $canonical_url");
                        }
                    }
                } else {
                    //Logic to handle routing in app
                }
            }
        }
    }, this.getIntent().getData(), this);
}
```

## FAQs

<details>
<summary>What do the Email validation errors/warnings mean and how can I fix them?</summary>

Here's the explanation and fix for all the validation errors:

1. **iOS SDK is not integrated**: This error is thrown when the Branch SDK has not been integrated into the iOS app.  
   *Fix: You need to set up the iOS SDK as our official documentation.*
2. **iOS SDK is integrated but is not the latest version. This may affect email functionality.**: This warning is thrown when the Branch SDK version on iOS is lower than the latest version.  
   *Fix: Update the Branch iOS SDK*
3. **Android SDK is not integrated**: This error is thrown when the Branch SDK has not been integrated into the Android app.  
   *Fix: You need to set up the Android SDK as our official documentation.*
4. **Android SDK is integrated but is not the latest version. This may affect email functionality.**: This warning is thrown when the Branch SDK version on Android is lower than the latest version.  
   *Fix: Update the Branch Android SDK*
5. **Deep linking is not set up for email**: The following are all the possible settings you can configure for deep linking with email. To understand each of the settings you can read our documentation [here](branch-universal-email.md).
6. **Click tracking domain is not set**: For Branch Links to be generated, you would need to provide the domain of the link that would be used in the email template. To understand how to find your ESP's click tracking domain, you can read our documentation [here](universal-email-integration-guide.md).
7. **AASA is invalid**: If you have not set up the Universal Links in the app, you'll get this error. This is mandatory for Deep Linked Emails to work on iOS.  
   *Fix: You can setup Universal Link by following our documentation* [*here*](ios-universal-links.md)*.*
8. **CNAME points to thirdparty.bnc.lt:** For Branch to host your AASA file and generate SSL certificates on the link domain for the email, you are required to CNAME the domain to thirdparty.bnc.lt. Before making this change, please make sure your setup requires this as some ESP have an option to upload the AASA at their end. Please verify this step in the documentation for your ESP [here](universal-email-integration-guide.md#4-point-dns-cname-to-branch).
9. **SSL is not correctly set up**: Once you setup the email domain on the Branch dashboard and CNAME as per the step 6, we would provide an SSL certificate to host your AASA file over HTTPS. Please contact [support@branch.io](mailto:support@branch.io) if you find the SSL certificate is not issued. This step is only required if error 8 is valid for your ESP.
10. **Deep link data is hosted on your website**: We recommend using the Hosted Meta Data on the web pages for deep linking. This helps in auto-generating the link data for emails in the Branch Links. To learn about hosting metadata for Branch, you can follow our documentation [here](web-advanced-features.md).
11. **Revenue or custom events are tracked**: This is a recommend in-app setup to track the revenue and the custom events which can be attributed to the Branch Link generated in the emails.
12. **Universal/App Links are not configured**: We strongly recommend setting up the Universal Links for iOS and App Links for Android to launch the app directly from the emails.

</details>

<details>
<summary>Why do all my links redirect to https://branch.io when I add CNAME to them?</summary>

Once the CNAME is added, Branch auto-generates an SSL certificate and AASA file for your click tracking domain. It may take up to an hour to resolve SSL errors once you change the CNAME. During this time, link redirects on the click tracking domain will redirect to <https://branch.io>.

If you are making this change to a live domain with active email click traffic, schedule the CNAME change to occur during off-hours with low click traffic.

</details>
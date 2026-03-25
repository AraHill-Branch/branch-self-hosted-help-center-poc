---
title: "View Through Attribution Testing"
slug: view-through-attribution-testing
---

## Overview

View-through attribution(VTA) allows you to track installs, session starts and conversion events back to an ad impression, even if the ad was never clicked on. It’s important to understand the difference between View-through attribution(VTA) and Click-through attribution(CTA):

- VTA: The event attributed after a user VIEWED an ad within specified period of time
- CTA: The event attributed after a user CLICKED on ad within specified period of time

Be aware that events are attributed using Branch's unified last-click attribution model. This means that Branch view-through attribution logic works as follows for any given event:

- If there's a click within a valid attribution window, give credit to the click.
- If there's no click within a valid attribution window, give credit to the last impression that was within a valid attribution window.

Currently, view through attribution is supported for Self Attributing Networks (SANs), such as Facebook and Google, and non-SAN networks with server to server impression link support. Note: Branch doesn't support server to server impressions without device IDs.

To create an impression tracking link for non-SAN networks, simply create an ad link, and grab the impression link from the final step of link creation. SAN networks support VTA without any additional links.

As a part of our Ad Partners VTA verification process it’s essential to confirm that our integration works as expected and we deliver the best user experience. Because of that we want to guarantee the highest quality of Ad Partnership integrations and verify VTA verification process.

::: info
For proper view through attribution, make sure the impression pixel returned by Branch's dashboard has an `%24idfa` OR `%24aaid` macro values. If you just want to count impressions, without attribution, these macros are not needed. The impression event has to drive conversion within the default Partner setting 1 day(24hrs) lookback window period.
:::

## Impression Tracking URL Testing

1. Get the Impression link from the final step of link creation on Branch Dashboard.
2. Add our tracking link to your system to generate **ClickID** and other **parameters** specified in the Branch **Impression Link URL**.
3. Ensure that Impression URL has a Device ID (`%24idfa=` OR `%24aaid=`) macro populated e.g. `idfa=AEBE52E7-03EE-455A-B3C4-E57283966239`:

   `https://impression.link/impression?branch_key=key_live_ljOlMvJZ565wI6bVcOuPYagjwsoHp4MX&%243p=a_partner_name&%24idfa=AEBE52E7-03EE-455A-B3C4-E57283966239&~ad_set_id=[ad_set_id]&~branch_ad_format=App%20Only&~channel=Ogury&~click_id=1234567890&~feature=paid%20advertising](https://impression.link/impression?branch_key=key_live_ljOlMvJZ565wI6bVcOuPYagjwsoHp4MX&%243p=a_partner_name&%24idfa=AEBE52E7-03EE-455A-B3C4-E57283966239&~ad_set_id=[ad_set_id]&~branch_ad_format=App%20Only&~channel=Ogury&~click_id=1234567890&~feature=paid%20advertising)`
4. Click on that tracking URL with filled macro parameters on your mobile phone.
5. You'll be redirected to the 1x1 pixel web page to ensure view-through is tracked.
6. Navigate to the Google/Apple Store to install the Branch test application **Branch Monster Factory**.

   - iOS: <https://apps.apple.com/us/app/branch-monster-factory/id917737838?mt=8>
   - Android: <https://play.google.com/store/apps/details?id=io.branch.branchster>
7. Open an app so that Branch attribute view through to install event.

Please refer to the following screenshots below based on Android and iOS platforms.

**Android**

*[Image: 1658]*

**iOS**

*[Image: 1648]*
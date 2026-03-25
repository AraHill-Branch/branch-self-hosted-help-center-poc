---
title: "SingleTap Advanced Configuration"
slug: singletap-advanced
---

[SingleTap by Digital Turbine](https://www.digitalturbine.com/) simplifies app advertising, recommendation, delivery and tracking. Maximize revenue, increase user engagement and save cost.

::: tip Tip
For basic SingleTap configuration, visit our [Marketer Hub guide](singletap-configuration.md).
:::

## Journeys with SingleTap

If you are running paid advertising campaigns, you'll want to create a Branch Ad Link so we can accurately attribute resulting app conversions to the appropriate advertising partner.

These steps show you how to set up Branch Links that can be used in SingleTap Journeys with Digital Turbine and track resulting conversions

::: danger Requirements
This method requires version 2.56.1 of the Branch Web SDK.
:::

1. Add the following snippet to any mobile web page where you’d like to show a SingleTap enabled Journey.

   ```
   <script>
                   (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent".split(" "), 0);
                   var options = { no_journeys: true };
                   branch.init('BRANCH_LIVE_KEY_GOES_HERE', options);

                   if (navigator.userAgent.match(/Android/i))
                   {
                   branch.link({
                   campaign: 'My Journey Name',
                   channel: 'mobile_web',
                   feature: 'journeys',
                   data: {
                   '$3p': 'a_digital_turbine'
                   }
                   }, function(err, link) {
                   var singleTapLink = 'https://delivers.dtignite.com/example?&dvURL=' + encodeURI(link)
                   branch.setBranchViewData({
                   data: {
                   '$journeys_cta': singleTapLink
                   }
                   });
                   branch.track('pageview');
                   });
                   }
                   </script>
   ```
2. Replace `BRANCH_LIVE_KEY_GOES_HERE` with your Branch API key, and `https://delivers.dtignite.com/example` with your Digital Turbine SingleTap URL.

::: info Enable Deep Linking
To enable deep linking, add the necessary parameters to the ‘data’ json in the snippet. These parameters will depend on your Branch implementation.

Typical examples would be:

`'$canonical_url': window.location`  
`'$deeplink_path'`: `property/listing/12345`
:::

::: warning
T**o avoid split analytics data:**

The “campaign” value in the snippet should be set to the name of the Journey that will be displayed on the page.  
The “channel” value in the snippet should be set to the channel value of the Journey that will be displayed on the page.  
The “feature” value in the snippet should always be “journeys”.
:::
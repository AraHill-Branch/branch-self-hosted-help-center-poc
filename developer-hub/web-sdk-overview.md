---
title: "Web SDK Overview"
slug: web-sdk-overview
---

## Overview

Unlock the industry's most powerful deep linking and attribution functionality using the Branch Web SDK.

#### Why use the Branch Web SDK?

The Branch Web SDK has a number of benefits, including:

- Attribution capabilities that help determine whether a last touch event led to a conversion.
- Comprehensive event data that you can view in the Branch Dashboard and utilize to help drive ad campaign optimization.
- Access to Branch Journeys, a feature that helps move users from the web to your app. Journeys requires a premium plan. Please [contact our Sales team](https://www.branch.io/contact-sales/) for pricing and availability.

## SDK Stats

**SDK Size**: 50kb

**Speed**: Median 80ms to 250ms

#### GitHub

[Branch Web SDK GitHub Repository](https://github.com/BranchMetrics/web-branch-deep-linking-attribution/releases)

## Basic Integration

For steps on how to integrate the Branch Web SDK and validate your integration, visit our Basic Integration [guide](web-basic-integration.md).

## Feature Implementation

To start integrating Branch Web SDK features, visit our Advanced Features [guide](web-advanced-features.md).

## Testing and Troubleshooting

To validate your Branch Web SDK integration, visit our Testing [guide](web-testing.md).

If you run into issues with your integration, check out our Troubleshooting [guide](web-troubleshooting.md).

## Full Reference

To see the public methods made available by the Branch Web SDK, visit our Full Reference [guide](web-full-reference.md).

## FAQ

<details>
<summary>Does the Web SDK script run in an iframe?</summary>

Yes, as long as the URL of the main page is the same as the URL of the iframe (for example, if the iframe source is loaded from the same domain).

</details>

<details>
<summary>How do I integrate the Web SDK in a Wordpress site?</summary>

This implementation actually depends on the customization your WordPress template allows. Branch does not have a direct WordPress integration so you would need to inject JS code in the tag.

You can add the following code in the `<>` tag:

```
<script>
// load Branch
(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(" "), 0);
// init Branch
branch.init('key_live_YOUR_KEY_GOES_HERE');
</script>
```

Once you are able to add the above code to the tag, you should be able to use Branch Web SDK functions.

</details>
---
title: "Journeys FAQs"
slug: journeys-faqs
---

The most frequently asked questions about Journeys.

### Google PageSpeed Insights & SEO FAQs

<details>
<summary>How do I reduce Cumulative Layout Shift (CLS)?</summary>

### Reducing Cumulative Layout Shift (CLS)

Cumulative Layout Shift (CLS) is part of [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) that measures the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page. The CLS score will vary based on the web page setup, the type of banner/interstitial, and page placement.

Google recommends reserving space for banners along with a placeholder option when the actual banner is not shown. Alternatively, this can be managed by using the CSS transform property in the Journeys editor.

Below are guidelines for reducing any negative contribution related to Journeys:

1. Set the Page Placement of the banner/interstitial to the "Customize Container (iFrame)" option

![954](/img/2f25336-Screen_Shot_2021-07-07_at_9.40.20_AM(1).png "Screen Shot 2021-07-07 at 9.40.20 AM.png")

2. Change the CSS based on the type of banner/interstitial:

| Banner Type | Changes Needed | Example |
| --- | --- | --- |
| Inline banners of type - Full Page Interstitial Banner / Partial Interstitial/ Top Banner | - Add `body { transform: translate(0, );="">`   - Change value of top for `#branch-banner-iframe { top: -;="">`  Please note the value of top is negative. | `#branch-banner-iframe { top: -456px; left: 0; right: 0; border: 0; height: 100vh; z-index: 99999; box-shadow: 0 0 5px rgba(0, 0, 0, .35); width: 1px; min-width: 100%; position: absolute; } body { transform: translate(0, 456px); }` |
| Sticky banners of type - Full Page Interstitial Banner / Partial Interstitial/ Top Banner | - Add `body > * { transform: translate(0, );="">`   - Change value of top for `#branch-banner-iframe { top: -;="">`  Please note the value of top is negative. | `#branch-banner-iframe { top: -76px; left: 0; right: 0; border: 0; height: 100vh; z-index: 99999; box-shadow: 0 0 5px rgba(0, 0, 0, .35); width: 1px; min-width: 100%; position: absolute; } body > * { transform: translate(0, 76px); }` |

For additional details on CLS and Google's PageSpeed Insights tool visit the following pages:

- [Cumulative Layout Shift](https://web.dev/cls/)
- [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about?hl=en-US&utm_source=PSI&utm_medium=incoming-link&utm_campaign=PSI)
- [Optimizing CLS](https://web.dev/optimize-cls/)

</details>

<details>
<summary>Do Branch Journeys get flagged by Google as a poor CX and hurt SEO?</summary>

We've observed in the past that there can be an impact when there's a full-page banner present on pages where a user is directly referred from Google, and, in the past, we've advised against having these full takeover banners directly on these pages (via filtering traffic coming directly from Google on the Journeys setup or having a higher priority small banner targeted specifically for Search traffic). We've got details on handling targeting for this [here](example-journeys.md#seo-friendly).

There may be plans in the future to start using web vitals on all pages to adjust SEO scoring. The data for this would be collected from users who have opted into data sharing for optimization that use the Chrome mobile browser. The primary score we see impacted by Journeys is **CLS, or Cumulative Layout Shift**.

Here are [some tips on reducing the CLS score](reducing-cumulative-layout-shift-cls.md) here that may be helpful if you're looking to minimize any potential impact from this. As of yet we haven't seen or heard of actual significant impact to SEO based on these scores, but it definitely doesn't hurt to optimize somewhat just in case, especially if it doesn't affect the UX of your current banners much.

Additionally, please see our blog post on [How to Get the Most Out of Journeys](https://blog.branch.io/how-to-get-the-most-out-of-journeys-advanced-use-cases-part-1/).

</details>

### Customize Journeys FAQs

<details>
<summary>Can I add two lines of text to my Journeys?</summary>

You can add a second line of text to your Journey either before or after by adding it to the CSS element:

**Before**

`branch-banner .branch-banner-description::before { display: block; content: 'Chat with other Fans'; }`

**After**

`#branch-banner .branch-banner-description::after { display: block; content: 'Watch in Dark Mode'; }`

</details>

<details>
<summary>Can I use a custom font for Journeys?</summary>

1. Go to Google Fonts and select a font. Find the embed URL for the font you selected.
2. Add to CSS EDITOR in your Journey template. For example:  
    @import url('<https://fonts.googleapis.com/css2?family=Roboto&display=swap')>;

**Note**: The trailing semicolon on @import line is important. It's always good to have a fallback web font in case the google font fails to load.

</details>

<details>
<summary>Can I localize the text of my Journeys?</summary>

### Client-side

You can easily customize the Journey text dynamically client-side using setBranchViewData and by reading the browser's language.

```
var lang_code;
if (navigator.languages && navigator.languages.length > 0) {
    lang_code = navigator.languages[0];
} else if (navigator.language) {
    lang_code = navigator.language; // Change Journeys text if language is Spanish (ES) if (lang_code == 'es')
} 
{
    branch.setBranchViewData({
        data: {
            "$journeys_title": 'Mi App',
            "$journeys_description": 'Mi descripción',
            "$journeys_button_get_has_app": 'Abrir',
            "$journeys_button_get_no_app": 'Ver',
        }
    });
}
```

</details>

<details>
<summary>Can I prevent a Journey from showing with Javascript?</summary>

You can prevent Journeys from showing on a certain page by inserting no\_journeys with the value of true into the options during initialization.

```
<script type="text/javascript"> // load the Branch SDK file branch.init('BRANCH_KEY', { 'no_journeys': true } ); </script>
```

</details>

<details>
<summary>Can I close a Journey programmatically?</summary>

Journeys include a close button the user can click, but you may want to close the Journey with a timeout, or via some other user interaction with your web app.  
 In this case, closing the Journey is very simple by calling:

```
javascript branch.closeJourney(function(err) { console.log(err); });
```

</details>

<details>
<summary>Can I trigger a Journey to show?</summary>

If you block or programmatically close a Journey via one of the calls above, then you can trigger a Journey to show by firing the following event:

```
Javascript branch.track('pageview');
```

**Note**: If a user has closed a Journey in the past, then firing the aforementioned event will not override a user's preference.

</details>

<details>
<summary>Is there a way to disable Journeys animations?</summary>

You can disable Journeys animations on a page by setting two flags - disable\_entry\_animation and disable\_exit\_animation - when you’re calling either init() or track() with Branch’s Web SDK.

Journeys animations can be disabled in order to reduce the amount of time it takes to load a Journey on a page. They can also be disabled in order to improve Journeys UX on single-page web apps, where Journeys animations can be jarring. When switching between multiple Journeys on a single-page web app, remember to use setBranchViewData() to change the link behind the CTA.

To disable animations during initialization, insert disable\_entry\_animation and/or disable\_exit\_animation, with values of true, into the options:

```
javascript branch.init(‘BRANCH_KEY’, { ‘disable_entry_animation’ : true, ‘disable_exit_animation’ : true } );
```

To disable animations using track(), insert disable\_entry\_animation and/or disable\_exit\_animation, with values of true, into the event metadata:

```
javascript branch.track( ‘pageview’, {}, { ‘disable_entry_animation’ : true, ‘disable_exit_animation’ : true } )
```

</details>

<details>
<summary>Is there a way to set up a listener function to listen to events?</summary>

You can easily listen to Journeys lifecycle events by registering listener functions like so:

javascript var listener = function(event, data) { console.log(event, data); } // Specify an event to listen for branch.addListener('willShowJourney', listener); // Listen for all events branch.addListener(listener);

| Listener Name | Description |
| --- | --- |
| willShowJourney | Journey is about to be shown |
| didShowJourney | Journey's entrance animation has completed and it is being shown to the user |
| willNotShowJourney | Journey will not be shown and no other events will be emitted |
| didClickJourneyCTA | User clicked on Journey's CTA button |
| didClickJourneyClose | User clicked on Journey's close button |
| willCloseJourney | Journey close animation has started |
| didCloseJourney | Journey's close animation has completed and it is no longer visible to the user |

</details>

<details>
<summary>What are the limitations of has\_app?</summary>

Several pieces of Journeys functionality rely on Branch’s understanding of whether an end-user has a customer’s app installed (indicated in Branch’s system using the has\_app flag). For example, the CTA text on a Journey will only switch from “install” to “open” if Branch believes the app is installed on that user’s device.

Unfortunately, Branch does not - and cannot - know with 100% accuracy whether a given user actually has the app installed, since the operating systems (e.g. iOS, Android) do not make this information available to developers. We’ve developed our own methods for gleaning this information and while our methods are quite accurate, there are nevertheless opportunities for both false positives and false negatives. While these limitations shouldn’t discourage you from using features that rely on “has\_app”, keep them in mind when designing your Journeys.

Several complicating factors are:

- **Install vs. Open**: If a user installs an app but doesn’t open it, we won’t know that they have the app installed.
- **Uninstalls**: We won’t necessarily know if a user uninstalls an app, which could result in a false positive.
- **Apple’s Intelligent Tracking Prevention**: As a result of ITP, we’re less accurate on Safari on iOS than on all other browsers.
- **Time to update**: Latency in our system occasionally means that for a given user, in the moments (or minutes) following an install, Journeys may not know that the install has occurred.

</details>

<details>
<summary>How do I force a Journey to auto-open the app for users that have it installed?</summary>

You can use Journeys to auto-open the app for users who have it installed by selecting the CTA in the template editor:

While the auto-open setting in the template editor will work on iOS Chrome and Android, there are some specific cases to be aware of:

- The Web SDK’s auto-open can cause unexpected user experiences if used on web pages inside webviews in your own app, so it’s best to avoid that if possible.
- Auto-open will only work on Android Chrome from a link click; redirecting from a manually inserted URL will not auto-open the app.
- Because auto-open is powered by URI schemes and these can lead to error messages on iOS Safari for users without your app, this is not enabled on iOS by default.

  If you would like the app to open automatically on iOS Safari as well, you'll need to use a setting called `$uri_redirect_mode`. Since Branch has a massive pool of cookies tied to device identifiers, we know if your app is installed when the user clicks a link. We use this intelligence to determine when to use URI schemes. You can reach out to Support to enable this behavior across all your links, or set it just for Journeys in the web SDK:

```
<script type="text/javascript">
// load the Branch web lib
(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="build.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode".split(" "), 0);
// init Branch and pass in your preference to open the app
branch.init('BRANCH_KEY');
// Trigger your Journeys banner to use the correct redirect mode
branch.setBranchViewData({
        '$uri_redirect_mode': 1
});
</script>
```

Or, set it for individual templates by adding deep link data `$uri_redirect_mode:1`:

Read our [blog](https://blog.branch.io/making-uri-schemes-great-again-uri_redirect_mode/) to learn more about the challenges of URI schemes on iOS and the URI redirect mode feature.

</details>

<details>
<summary>Can I pass link data to my Journeys banners so that when the app opens using the Journey, the SDK can read the data?</summary>

Yes, this is possible, you can configure the link data and pass it to the link in the banner CTA using the setBranchViewData() function from the web SDK, please refer to the below link for more information on the same:

[Web Advanced Features](web-advanced-features.md#create-journeys-banner)

</details>

<details>
<summary>How is A/B testing assigned out to users’ devices?</summary>

Branch converts the user's browser fingerprint id (or a random id if not available) to a number between 1 and 100, and that number is used to pick a banner.

For example, if you have 2 banners (banner A given 20% weight and banner B given 80%) and the converted number Branch comes up with for the user is 15, then Branch would show the user banner A. This is because 15 is between 1 and 20. If the converted number is 55, then Branch would show banner B, because 55 is between 20 and 100.

</details>

### Schedule Journeys FAQs

<details>
<summary>When does a Journey become active or stopped?</summary>

There can be up to a 5-minute delay between a scheduled time and your Journey becoming active or stopped.

</details>

<details>
<summary>How do I set an end date for a Journey with a recurring schedule?</summary>

This is not supported by scheduling at this time. To do this, set a start and stop time for your Journey and add your repeat rules. When you want the Journey to stop for good, stop it from the action menu or go to Edit Schedule > Delete.

</details>

<details>
<summary>How do I set a delay time for a Journey banner to be displayed?</summary>

A Journey can be delayed by logging a Pageview after a certain amount of time has elapsed in the Web SDK.

```
setTimeout(function () {
branch.closeJourney(function (err, data) {
if (err) {
console.log(err, data);
} else {
setTimeout(function () {
/*
This key/value pair is entirely arbitrary.
Its only purpose is to be found by a condition specified in the Branch dashboard.
*/
branch.track('pageview', {
'delay': '10'
});
}, 1000);
}
});
}, 10000);
```

</details>

### Referring link data FAQs

<details>
<summary>Is there a way to preserve or discard referring link data?</summary>

By default, when users arrive on a page running Journeys via a Branch Link and `make_new_link` is not set to `true`, then any interaction with the Journey (click/install/re-open) will be attributed to the referring Branch Link, rather than to the Journey. If `make_new_link` is set to `true`, the same events will be attributed to the Journey, instead.

This can help you collect data on how the referring links are contributing to app growth/engagement, even when users aren’t installing from those links directly. For example, if a user clicked a Branch Link on Facebook, landed on your website, and installed from a Journey, this would allow you to attribute the install to the link on Facebook. If the original link was also configured to deep link into your app, that deep link would be preserved, too.

Branch will pass the referring link into Journeys by default. In order to discard referring link data, include the `make_new_link` flag, with a value of `true`, into the options during initialization:

```
branch.init( 'BRANCH_KEY',
    {
        'make_new_link' : true
    }
);
```

</details>

### Journeys analytics FAQs

<details>
<summary>Is there a way where I can view the analytics of Journeys created through the Web SDK?</summary>

For Journeys created through the Web SDK ~branch\_feature defaults to "journeys". You can view the analytics by filtering Sources where feature equals journeys.

</details>

### Troubleshooting FAQs

<details>
<summary>Why does the “Has the app” installed filter not work in test mode?</summary>

The filter 'Has the app install = true' helps show the Journeys banner to only the user who already has the app installed.

In order to determine whether a user has the app installed, we use a flag called 'has\_app'. When the value of this flag is true, the above filter will show the Journeys banner to the user and will deep link into the app.

However, in order for this to work correctly, you need to be using the same Branch Keys in both your web page and your mobile application.

If you are using a test key in a staging environment, then the app installed in your device should also be using the same key as well.

Further, in test mode, we do not store real device identifiers in our database; due to this, the value of the 'has\_app' flag is not set correctly in test mode.

Therefore, in order to properly test the functioning of this filter, we recommend creating a Journeys banner on your live account.

</details>

<details>
<summary>Why is my metadata filter not working on my webpage? The metadata is set as “abc”:”123”.</summary>

Currently, we only support string key - value metadata pairs for the Journeys filter, and therefore, you will have to modify it as - `"abc":"123"`.

</details>

<details>
<summary>Why does my Journey still show “Get” after app install?</summary>

Currently, when a user downloads an app by clicking a Journeys CTA button, our system will not update the user's has\_app flag to true (indicating that the user has the app installed, until there is a "strong match" created).

In order for a strong match to be created, a user can:

1. Go back to the page with the Journey
2. Re-click the CTA button and get directly deep-linked into the app (which creates a strong match)

Our system will take about 5 - 10 mins to learn that the user has the app installed. After that period, when the same user refreshes the page with the Journey, the CTA text should change from "GET" to "Open".

Also, when the app is frequently re-installed on the device, the flag that Branch uses to determine whether the app is installed on the device, has\_app, goes in a faulty state.

**To force reset the has\_app variable to change the Journey's banner CTA from 'Download' to 'Open', please follow these steps:**

1. Click on the Download button - this should redirect to the Play or App Store
2. Install the app
3. Return to the web page with the Journeys banner, which should still display the Download button
4. Tap on the Download button again - the app should open (once you update the entitlements file to include -alternate.app.link) and data specified in the Journeys configuration should be available to the app
5. Close and then re-open the web page with the Journeys banner - the banner should now have an "Open" button
6. Tap on the "Open" button

*It might take some time for the CTA button to update. It could be up to 30 minutes during peak hours.*

</details>

<details>
<summary>How can I check/retrieve the Branch Link behind any given banner?</summary>

Load your Chrome desktop browser, enable developer tools by pressing ctrl+option+i, ensure the mobile view is selected, and then load the webpage with the banner. In the network tab of the developer tools, filter all requests by “branch” and inspect the “[https://api2.branch.io/v1/pageview”](https://api2.branch.io/v1/pageview%E2%80%9D) request. In the network response, search for “app.link” and you’ll find a reference to the actual link that was embedded behind the button (you can then copy this link and append “?debug=1” to inspect its data)

</details>
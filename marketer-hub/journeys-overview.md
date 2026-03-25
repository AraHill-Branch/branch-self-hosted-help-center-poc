---
title: "Journeys Overview"
slug: journeys-overview
---

![](/img/e7f2b38-journeys-examples.png "journeys-examples.png")

Converting your mobile web visitors into native app users is one of the most effective and efficient acquisition channels available, and Branch's Journeys App Banners platform makes this easy with the following features:

- **Customizable presentation.** Because design and dev resources can be scarce, we have created a "what you see is what you get" designer to put customization of any number of designs, from a smart banner to an interstitial, in your own hands.
- **Powerful targeting rules.** Not all of your web visitors are the same, so they shouldn’t be treated that way. Want to show your Journey only to visitors without your app installed? All iOS users from Japan? Android users who have visited your website twice AND purchased something with your app? The possibilities are infinite.
- **AMP-compatible.** You can convert mobile search traffic to your app by showing [Journeys on AMP pages](journeys-via-amp.md).
- **Run A/B tests.** Design multiple campaign versions to see which drives the most business impact.
- **Optimized user experience.** High engagement, affinity, and purchase power come from a personalized, successful user experience. On a click, if installed, your app will open and users can be routed directly to the content they expect. If not, the App/Play store will open and users can still be shown that content after installing.
- **Comprehensive analytics.** Get insight into user interaction with your Journeys and measure the downstream performance and retention of every Journeys campaign so that you can optimize and report back business value.

### How does it work?

![](/img/c87013e-Journeys_Flow.png "Journeys Flow.png")

1. User lands on your mobile website and sees a banner or full-page interstitial promoting the mobile app.
2. User clicks the call to action to install or open the mobile app.

   - If the user already has the app installed, the app will open.
   - If the user does not have the app installed, the user is directed to the App/Play Store to download the app.
3. Once in the app, user can get deep linked into in-app content that they might have been viewing on mobile web.

## Access

Access to Journeys requires a premium plan. Please [contact our Sales team](https://www.branch.io/contact-sales/) to learn more about pricing and availability.

## Compliances & Limitations

### GDPR

In order to help our customers comply with [GDPR](https://branch.io/gdpr/?_gl=1*3cfwyh*_ga*MTM3OTcwNTU1OC4xNjkzNTg5NjI0*_ga_KSDD8Y11CT*MTY5ODg1MDI5OC4xNS4xLjE2OTg4NzA4OTcuNjAuMC4w), and other laws that restrict data collection from certain users, we’ve updated our Web SDK with a [Do Not Track mode](https://help.branch.io/developers-hub/docs/web-advanced-features#disable-tracking).

This way, if a user indicates that they want to remain private on your website, or if you otherwise determine that a particular user should not be tracked, you can continue to make use of the Branch Web SDK (e.g. for creating Branch Links) while not tracking that user. This setting can also be enabled across all users for a particular link, or across your Branch Links.

If you enable that mode, you can still display some Journeys to your users. Whether or not a Journey will display for users in Do Not Track mode depends on the targeting criteria you’ve defined for that Journey. If the Journey uses any of the following audience filters, it **will not display** for users in Do Not Track mode. Otherwise, the Journey will display.

- Has completed event
- Has visited web
- Has visited the app
- Has clicked on email
- Has clicked on ad
- Has the app installed

If a Journey does display for a user in Do Not Track mode, any analytics related to the Journey’s display or the user’s interactions with that Journey will not be published in the Branch Dashboard.

### Accessibility

Branch now provides information about how Journeys works for people with disabilities to make it easier for our customers to comply with accessibility standards. Branch follows industry standards for accessibility and obtained a VPAT for Journeys. The Voluntary Product Accessibility Template (VPAT) is a standardized form developed in partnership by the Information Technology Industry Council (ITI) and the U.S. General Services Administration (GSA) to document a product’s conformance with key regulations of Section 508 of the Rehabilitation Act.

Industry guidelines including the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) help make content more accessible to individuals with a wide range of disabilities, contributing to a more inclusive Web for everyone. Furthermore, accessible websites often drive better user satisfaction, search engine optimization (SEO), and wider reach.

Branch aims to design our products with accessibility in mind. For this upgrade, the Branch team added over 50 visual and cognitive-related improvements to Journeys creatives within the HTML. We offer a Journeys VPAT for customers to review our conformance with WCAG guidelines to help assess their needs.

### iOS 17

There is an iOS 17 Safari configuration that blocks Branch's Web SDK from initializing. This occurs because it is built on top of DuckDuckGo’s Ad Tracking Protections, which is the Advanced Tracking and Fingerprinting Protection, which by default is only enabled on Private Browsing, but you can disable that for all Browsing or enable it for all Browsing.
---
title: "Ads SANs FAQ"
slug: ads-sans-faq
---

The most frequently asked questions about self-attributing networks (SANs).

<details>
<summary>How can I prevent sending specific events to Self-Attributing Networks like Facebook and Google?</summary>

For self-attributing networks, you can visit the Ad Partner's page from the Partner Management section of the branch dashboard and navigate to "Events Config". Branch will send any event that is enabled on this page to the Ad Partner for attribution and campaign optimization. Any event(s) that you do not want sent to the partner can be deleted from this list and Branch will no longer send the event to the partner.

Please note that any change made to the Event Config will need you to re-authenticate your Facebook Integration.

</details>

<details>
<summary>How do I set up impression tracking?</summary>

By enabling impression-based attribution, especially with our programmatic partners, we can increase the volume of positive install signals being fed into the platform, which in turn enables more rapid machine learning and optimization

**For SAN partners**, most already claim based on view-through activity; you would just need to make sure that these partners’ impression attribution windows are non-zero, as if they’re zeroed out we will not respect these impression-based claims.

**For non-SAN partners**, the attribution window aspect applies to them as well, but in addition, you’ll need to either supply the partner with an impression link or use this in the appropriate field when setting up campaigns on their dashboard. When you create a [Branch Ad Link](/v1/docs/ad-links) in Branch , you’ll get the corresponding impression link along with it on the confirmation page (starting with the domain “impression.link”).

Beyond double-checking partners’ attribution windows and supplying your dedicated Branch Team in non-SAN cases, there’s no additional setup required here.

</details>

<details>
<summary>Why am I getting a “Multiple Provider IDs” error when trying to use X (Twitter) as an Ad partner?</summary>

You can see this error if you try to connect multiple MMPs to your Twitter account. If you have already removed your existing MMP from Twitter and still see the error, you will have to reach out to Twitter support purge 'app\_event\_provider\_configurations' before authenticating with Branch.

</details>
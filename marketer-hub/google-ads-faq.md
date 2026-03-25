---
title: "Google Ads FAQ"
slug: google-ads-faq
---

The most frequently asked questions about Google Ads.

<details>
<summary>Why am I unable to see Google Ad Set and Ad Set ID in Analytics?</summary>

The ad dimensions, for example, ad name and ad set name are not supported for the Google AdWords UAC campaigns.

This is since Ad Set Name is not among the supported variables passed to Branch via Google AdWords for such campaigns. You can only see the ad group ID for non-UAC campaigns on conversions.

Branch doc - [Common Sources of SAN Reporting Discrepancies](common-sources-of-san-reporting-discrepancies.md#available-reporting-filters)

</details>

<details>
<summary>Why do Google Ads get disapproved destination mismatch using Branch Links?</summary>

Google has a destination mismatch policy, which indicates that the final url should not have any redirect when a user click on a Google ad. You can refer to a Google doc here: <https://support.google.com/adspolicy/answer/6368661?hl=en>

While Branch Links will always redirect user before taking them to the destination, they get disapproved if used in the final URL section of their ads, hence it is recommended to use the Branch Link in the tracking template URL instead which allows for parallel tracking and does not break attribution for web based campaigns.

More on parallel tracking and general FAQ related to Google ads can be found here: [Google Ads](google-ads.md#general-faqs)

</details>

<details>
<summary>Will adding custom parameter ~customer\_ad\_set\_name or ~customer\_ad\_name to the Branch Ad Link result in including the ad group name in Branch Dashboard?</summary>

For data coming through our SAN connector, this is a limitation based on what Google provides--you can find the full mapping [here](google-ads-data-reporting.md), but Branch only showing ‘ad set id’ is due to Google only providing the ‘ad set id’ to us for this value. For this SAN-based data, there’s no way to tweak what reporting labels are being used.

However, for any activity that is coming through Branch Links instead of using the SAN connector (as some search traffic maybe), you can also opt to use ‘~ad\_set\_name’ rather than a ‘~customer\_x value’. If ‘~ad\_set\_name’ is not already in use by your team, there would be no conflict presented from this solution, and it would keep your data values more closely paired with the ~ad\_set\_id value Branch is already getting.

</details>
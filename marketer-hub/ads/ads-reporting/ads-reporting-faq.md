---
title: "Ads Reporting FAQ"
slug: ads-reporting-faq
---

The most frequently asked questions about ads reporting.

<details>
<summary>What does “deeplink\_no\_attribution=true” mean? Should I change it to false for attribution to work?</summary>

This flag is used to disable deep link attribution thus allowing us to do normal SAN attribution. SAN partners like Google AdWords/Facebook integration are different from conventional non-SAN partners, where we send conversion data to SAN partners and they will claim the install/events according to their conversion logic and respond to us via API. Branch then analyzes the data from all the partners and attributes the same install/event based on last-touch attribution logic. You will see less data in Branch as we show only attributed data for a SAN partner than the respective SAN dashboard.

</details>

<details>
<summary>What is the difference between Day 0 and Day 1?</summary>

Day 0 is the day on the install, and Day 1 is the following day, and so on.

Branch tracks install as the first open of the app. The second open on the same day is coined as OPEN, which is taken into consideration for the cohort retention report. That is why it does not show as 100%. The other days will be considered the first open on that particular day.

</details>

<details>
<summary>Why am I unable to view stats for links created through the API?</summary>

Individually checking stats for API/SDK created links is currently not possible. As a workaround, if you have appended custom analytical labels or tags to the link data, you can view the analytics on the [Sources](https://dashboard.branch.io/sources) page with the corresponding tag added as a filter.

</details>

<details>
<summary>Where is the complete list of country names and country code values?</summary>

Branch does not maintain the Country Name and Country Code list, we use MaxMind for geo-lookup from IP. You can enter an IP [here](https://www.maxmind.com/en/home) to see how MaxMind will interpret this and which country it will associate the IP with. The country codes will be in ISO-3166-2 format.

</details>

<details>
<summary>Are my ad campaign installs only drive by clicks?</summary>

On campaigns with Impression links enabled you will also see installs that are driven by Impressions. Include the Impressions column on Branch Analytics with clicks to see the complete picture.

</details>

<details>
<summary>How can I pull postback logs?</summary>

You can use the Custom Exports [section](https://branch.dashboard.branch.io/custom-exports) of the Branch Dashboard to pull postback logs.

### Configuration

Configure the export in the following way:

**Topic**: Postback Records

**Columns**: Choose all columns starting with `webhook`

**Filters**: You can apply the `webhook` filter for `Webhook Partner Key` equals `di_adobe_analytics` (if you wish to pull the data from a Data Integration Partner like adobe).

Or `Webhook Partner Key` equals `a_inmobi` (If you wish to pull the data from an Ad Partner like Inmobi).

The 3p value `a_inmobi` can be found in the Partner Management section of the Ad Partner as the "Partner Identifier" value.

### Access

Access to the Custom Exports feature is included in our Engagement and Performance [products](packaging.md).

</details>
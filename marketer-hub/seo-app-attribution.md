---
title: "SEO and AIO App Attribution"
slug: seo-app-attribution
---

## Overview

SEO + AIO App Attribution tracks and attributes organic traffic from search engines and AI chat agents. When users arrive from Google, Bing, ChatGPT, Claude, Gemini, Copilot, or Perplexity, Branch identifies the source and attributes the session correctly.

This feature shows which content drove each visit and organizes traffic in dedicated channels ("organic search" for search engines and "organic chat agent" for AI chat agents) giving you a complete view of how users discover your app.

## How it works

### SEO

1. **User clicks a result from a search engine**  
   The user clicks a link from a supported search engine (Google, Bing, Yahoo, Naver, Daum, DuckDuckGo, etc.) that points to your top-level domain.
2. **Links are indexed by the search engine**  
   Your site content has already been crawled and indexed by search engines, so those URLs appear in search results.
3. **Branch collects specific signals on app open**  
   When your app opens from that domain using Universal Links / App Links, the Branch SDK receives the necessary referrer and device context.
4. **Branch simulates a click**  
   Branch creates a synthetic click in the background using those signals.
5. **Branch attributes the user to Organic Search**  
   The resulting install, open, or event is attributed with:

   - `~feature` = "organic search"
   - `~channel` = search engine name
   - `~organic_search_url` = originating URL

### AIO

1. **User clicks a link from an AI chat agent**  
   The user clicks a link from a supported AI chat agent (ChatGPT, Claude, Gemini, Copilot, Perplexity) that points to your top-level domain.
2. **Link opens in browser or webview**  
   The AI agent opens your link, typically with UTM parameters (like `utm_source=chatgpt`) or an identifiable referrer.
3. **Branch collects specific signals on app open**  
   When your app opens from that domain using Universal Links / App Links, the Branch SDK receives the URL, UTM parameters, and referrer information.
4. **Branch simulates a click**  
   Branch creates a synthetic click in the background using those signals.
5. **Branch attributes the user to "organic chat agent"**  
   The resulting install, open, or event is attributed with:

   - `~feature` = "organic chat agent"
   - `~channel` = AI chat agent name
   - `~organic_search_url` = originating URL

Branch identifies each AI chat agent by checking UTM parameters (like `utm_source=chatgpt`) and referrer domains (like `chatgpt.com`, `gemini.google.com`, `perplexity.ai`).

## Before you begin

To enable SEO + AIO App Attribution, you must complete the following tasks:

1. Create a Branch account.
2. Enable SEO App Attribution for your Branch account. Contact your Branch account manager or visit <https://branch.io/pricing.>

   
::: info Note
AIO uses the same provisioning switch as SEO. Once SEO App Attribution is enabled for your app, AIO attribution will automatically be available.
:::

3. Work with your development team to implement the Branch SDK and configure Universal Links and App Links. See our [developer documentation](https://help.branch.io/developer-hub/docs/seo-aio-implementation) for implementation details.

## Set up SEO + AIO App Attribution

Your development team will need to configure the technical requirements for SEO + AIO App Attribution. See our [developer documentation](https://help.branch.io/developer-hub/docs/seo-aio-implementation) for implementation details.

Once the technical setup is complete, you can configure your SEO domains directly in Branch.

::: danger Warning
Please note that this article explains the [legacy Branch experience](branch-dashboard-overview.md) of adding SEO and AIO domains, which is slated for deprecation.  
  
In the [new version of Branch](new-branch-overview.md), SEO and AIO domains are added under Configuration → Attribution.
:::

### Enter SEO domains

1. Select **SEO** under the **Analysis** section in Branch.
2. On the **SEO** **Configuration** page, enter your domains.
3. List each of the domains you want to enable SEO + AIO Attribution for.

Wildcard characters are not supported, so you must specify the exact domain, like "[www.branch.io](https://www.branch.io/)".

Include the URL scheme and host (for example, `https://www.branch.io`).

**These domains are used for both:**

- SEO App Attribution (organic search traffic)
- AIO App Attribution (traffic from AI chat agents that surface URLs under these domains)

## View analytics

Once complete, you can view your SEO + AIO App Attribution analytics in multiple places:

### Branch Analysis dashboards

Navigate to [Analysis](analysis-dashboards.md) in Branch. Use the [Classic Suite - SEO Analytics](https://help.branch.io/docs/analysis-dashboards#dashboards) default dashboard to view both SEO and AIO analytics.

Use filters to:

- Break down traffic by channel (search engines and AI chat agents)
- Analyze installs, opens, purchases, and other events from both SEO and AIO

### Legacy reporting experience

Navigate to [SEO Analytics](https://dashboard.branch.io/seo/analytics) in Branch. Here you can measure **Trends** and **Performance** through charts and tables.

*[Image: SEO Chart]*.png)

*[Image: SEO Table]*.png)

::: info Note
SEO + AIO App Attribution has the same reporting capabilities as Branch's Ads product. For a detailed overview of ad analytics and how to customize them, view our [guide](paid-ads-analytics.md).
:::

### Access the originating URL

You can access the originating URL through Branch's Dashboard Reports or Exports (through the [Dashboard Custom Exports](dashboard-custom-exports.md) or through the [Custom Exports API](buildexportrequest.md)).

- For Dashboard Reports, add the `Organic Search URL` column to the events table.
- For Dashboard Custom Exports, include the `Organic Search URL` column when configuring your export.
- For Custom Exports API, export the `last_attributed_touch_data_tilde_organic_search_url` field.

For AI chat agent sessions, this field corresponds to the URL that the AI agent surfaced and that the user clicked, allowing you to see which piece of content the AI agent used to drive app engagement.

## Analytic tags

Branch surfaces SEO and AIO traffic in Branch and the [Data APIs](https://help.branch.io/apidocs#data-apis) using the following analytic tags.

### ~feature

| Tag | Value | Example | Data API field |
| --- | --- | --- | --- |
| `~feature` | organic search | organic search | `last_attributed_touch_data_tilde_feature` |
| `~feature` | organic chat agent | organic chat agent | `last_attributed_touch_data_tilde_feature` |

### ~channel

For SEO App Attribution, `~channel` is the search engine name:

- Google
- Bing
- Yahoo
- Naver
- Ask
- DuckDuckGo
- Yandex
- Daum

For AIO App Attribution, `~channel` is the AI chat agent name:

- ChatGPT
- Claude
- Gemini
- Copilot
- Perplexity

| Tag | Value type | Example | Data API field |
| --- | --- | --- | --- |
| `~channel` | Search engine name | Google | `last_attributed_touch_data_tilde_channel` |
| `~channel` | AI chat agent name | ChatGPT | `last_attributed_touch_data_tilde_channel` |

### ~organic\_search\_url

This tag provides the originating URL that led to the app session, whether surfaced via search engine or AI chat agent.

| Tag | Value | Example | Data API field |
| --- | --- | --- | --- |
| `~organic_search_url` | Originating URL | https://example.com/category/section | `last_attributed_touch_data_tilde_organic_search_url` |

Use this value to identify the exact piece of content (page, article, product detail, etc.) that drove the app conversion.

## Testing and troubleshooting

::: info Note
If you don't see AIO data in Branch, you may need to clear your browser cache. Bookmarks and saved queries from before AIO was released are cached and may not load the new data. Try clearing your browser's cache to resolve this issue.

You can also try [resetting the page state](https://help.branch.io/docs/branch-summary-page#resetting).
:::

### Basic testing

To verify that SEO + AIO App Attribution is working:

1. Find a URL from your configured domains that appears in search results or could be surfaced by an AI chat agent.
2. Click the link from a search engine or AI chat agent.
3. Verify that your app opens (this confirms Universal Links / App Links are working).
4. Check your Branch dashboard to confirm the session is attributed correctly with the appropriate `~feature` and `~channel` values.

If your app does not open or attribution is not working correctly, work with your development team to troubleshoot. See our [developer documentation](https://help.branch.io/developer-hub/docs/seo-aio-implementation) for detailed troubleshooting steps.
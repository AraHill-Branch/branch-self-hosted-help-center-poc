---
title: "AIO App Attribution"
slug: aio-app-attribution
---

## Overview

AIO (AI Optimization) App Attribution tracks and attributes traffic from AI chat agents, including ChatGPT, Claude, Gemini, Copilot, and Perplexity. When users arrive from these AI assistants, Branch identifies the source and attributes the session correctly. AIO shows which content drove each visit and organizes AI traffic in a dedicated "organic chat agent" channel, giving you a complete view of how users discover your app.

::: info Note
This feature is a part of SEO App Attribution. If you’ve already configured that feature, you’ll receive insights for AIO App Attribution.
:::

## How AIO Attribution works

1. **User clicks a link from an AI chat agent**  
   A user asks ChatGPT, Claude, Gemini, Copilot, or Perplexity a question, and the agent shares a link to your site.
2. **Link opens in browser or webview**  
   The AI agent opens your link, typically with UTM parameters (like `utm_source=chatgpt`) or an identifiable referrer.
3. **Branch captures the referrer data**  
   When your app opens via Universal Links or App Links, the Branch SDK collects the URL, UTM parameters, and referrer information.
4. **Branch attributes the session to the AI agent**  
   The install, open, or event is attributed as:

   - `~feature` = "organic chat agent"
   - `~channel` = ChatGPT | Claude | Gemini | Copilot | Perplexity
   - `~organic_search_url` = the original URL the agent shared

Branch identifies each AI agent by checking UTM parameters (like `utm_source=chatgpt`) and referrer domains (like `chatgpt.com`, `gemini.google.com`, `perplexity.ai`).

## Set up AIO App Attribution

::: info Note
AIO App Attribution uses the same setup process as SEO App Attribution. If you’ve already set up SEO App Attribution, you don’t need to set up AIO separately.
:::

To set up AIO App Attribution, follow the integration instructions in our [SEO App Attribution](https://help.branch.io/docs/seo-app-attribution#integration-guide) article.

## View analytics

You can view AIO App Attribution analytics in the [legacy reporting experience](seo-app-attribution.md#6-view-analytics) and the new Branch [Analysis](analysis-dashboards.md) reporting tool. Additionally, AIO traffic can be viewed through our [Data APIs](https://help.branch.io/apidocs#data-apis).

### Branch Analysis Dashboards

In the new Branch experience, use the [Classic Suite - SEO Analytics](https://help.branch.io/docs/analysis-dashboards#dashboards) default dashboard to view both SEO and AIO analytics.

You can then use filters to:

- Break down traffic by channel (search engines and AI assistants)
- Analyze installs, opens, purchases, and other events from both SEO and AIO

### Legacy reporting experience

View AIO analytics in the SEO section of legacy Branch. You can learn more in our [SEO App Attribution](seo-app-attribution.md#6-view-analytics) article.

### Analytics tags

Branch uses these analytic tags for AIO traffic:

#### ~feature

| Tag | Value | Data API Field |
| --- | --- | --- |
| `~feature` | organic chat agent | `last_attributed_touch_data_tilde_feature` |

#### ~channel

The AI chat agent name:

- ChatGPT
- Claude
- Gemini
- Copilot
- Perplexity

| Tag | Value | Example | Data API Field |
| --- | --- | --- | --- |
| `~channel` | AI chat agent name | ChatGPT | `last_attributed_touch_data_tilde_channel` |

#### ~organic\_search\_url

The URL the AI agent shared.

| Tag | Value | Example | Data API field |
| --- | --- | --- | --- |
| `~organic_search_url` | Organic search URL | https://example.com/category/section | `last_attributed_touch_data_tilde_organic_search_url` |

You can use this value to identify the exact piece of content (page, article, product detail, etc.) that drove the app conversion.

## FAQs

<details>
<summary>Do I need to set up AIO separately from SEO App Attribution?</summary>

No. AIO App Attribution uses the same setup as SEO App Attribution. If you've already configured SEO App Attribution, AIO is automatically enabled and you'll start seeing AI chat agent traffic attributed without any additional setup.

</details>
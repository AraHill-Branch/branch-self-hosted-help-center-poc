---
title: "AIO App Attribution"
slug: ai-optimization-aio
---

Branch now attributes traffic from AI chat assistants like ChatGPT, Claude, Perplexity, and more.

Branch has updated [SEO App Attribution](seo-app-attribution.md) to include **AIO (AI Optimization)**. This update expands Branch's organic reporting capabilities to capture and attribute traffic from the growing number of AI chat agents used for content discovery.

Users are increasingly turning to AI assistants to answer questions and find products. When these assistants surface a direct link to your website, the session often appears as generic or unattributed organic traffic. AIO solves this by identifying and attributing traffic from AI chat agents.

## What is AIO App Attribution?

AIO App Attribution is an extension of the Branch SEO App Attribution feature. It allows the Branch SDK to identify when a user opens your app or website with a deep link that originates from a supported AI chat agent.

By recognizing specific referrer signals and UTM parameters used by these platforms, Branch can now attribute these sessions to the specific AI agent that drove the visit, rather than lumping them in with standard organic search or direct traffic.

### Supported AI agents

With this release, we are introducing specific channel detection for the following major AI chat agents:

- ChatGPT
- Gemini
- Claude
- Copilot
- Perplexity

## How it impacts reporting

This update unifies organic discovery reporting. In Branch, you will now see "Organic Chat Agent" alongside "Organic Search" within the same Analytics views. There are other benefits as well:

- **Granular attribution:** You can distinguish between users who found you through a traditional search engine (for example, Google, Bing) and those who found you through an AI assistant (for example, ChatGPT).
- **Content visibility:** Just as with SEO, AIO attribution captures the `~organic_search_url`, allowing you to see exactly which piece of content the AI agent surfaced to drive the conversion.
- **Data consistency:** Traffic from AI agents is categorized under the `~feature` tag "organic chat agent," keeping your data organized and distinct from traditional SEO traffic.

This feature is designed to ensure your analytics reflect the reality of modern search behavior, giving you a complete picture of how users are discovering your app today.

## What's next?

#### If you already have SEO App Attribution set up

AIO is now active automatically. View your AI chat agent traffic in Branch.

::: info Note
If you don't see AIO data in Branch, you may need to clear your browser cache. Bookmarks and saved queries from before AIO was released are cached and may not load the new data. Try clearing your browser's cache to resolve this issue.
:::

#### If you don’t have SEO App Attribution set up

Learn how to set up SEO and AIO App Attribution in our [SEO + AIO App Attribution](https://help.branch.io/docs/seo-app-attribution) article.
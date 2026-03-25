---
title: "Create Links With Ivy (New)"
slug: create-links-with-ivy-new
---

You can use Ivy, Branch's AI, to create Short Links in Branch.

::: warning Caution
Check your link before you publish it. AI can make mistakes.
:::

Complete the following steps to start creating a link with Ivy:

1. In Branch, select **Campaigns** > **Links.**
2. Select the **Create** button.
3. Select **Short Link**. The **Create Link** page will open.
4. Enter your prompt in the **Ask Ivy** text box at the top of the page.

## Prompt components

An Ivy prompt is a natural-language instruction that tells Branch what kind of link to create. The most effective prompts include the following components:

- **Campaign and channel**: The campaign the link is for and the channel the user is originating from (e.g., email, SMS, push notification, Facebook).
- **Objective**: The goal of the link, such as engagement, acquisition, or conversion.
- **Destination**: Where app users should land (define the in-app path) and where non-app users should go (define a URL or specify app store redirect).
- **Extras**: Any additional settings such as coupon codes, custom field values, content metadata, platform-specific routing, or social media previews.

Not every prompt needs all four components. If there are no extras, you can leave that part out. However, always include a campaign, channel, objective, and at least one destination.

## Write effective prompts

Use the following guidelines to help you write prompts that give Ivy the information it needs to build the right link:

- **Be specific and descriptive**: Ivy works best when you are specific about the type of link you want to create. Include the campaign name, the channel, and exact destination paths rather than vague terms like "homepage" or "the website."
- **Define destinations explicitly**: Always specify where app users should land and where non-app users should go. Use exact paths for in-app destinations (e.g., /products/winter-jacket) and full URLs for web fallbacks (e.g., https://example.com/products/winter-jacket). If you want non-app users redirected to download the app, say so directly.
- **State your objective**: Tell Ivy what the link should achieve. For example, start with "Create a conversion link…" or "Create an engagement link…" so Ivy can configure the link correctly for your goal.
- **Include extras when they apply**: If your campaign uses coupon codes, custom fields, or content metadata, include them in the prompt. Ivy will apply them to the link configuration. If you leave them out, they won't be added.
- **Tell Ivy what you don't want**: Ivy uses your past links to help create your new links. This means it may include data options and tags from previous links. If you don't want a specific tag that you know you've used, tell Ivy to exclude it in your prompt.

## Good prompts vs. bad prompts

The following examples compare vague prompts with prompts that give Ivy the right level of detail. Use these as a reference when writing your own prompts.

#### Fall campaign

**Bad prompt**: "Create a link for our Fall 2026 campaign and coupon on Facebook. Send app users to /shop/items. Non-app users to the website."

- Leaves out the coupon code, so Ivy won't apply it.
- Uses a vague fallback ("the website") without specifying the URL.
- Doesn't include an objective for the campaign.

**Good prompt**: "Create a conversion link for our Fall 2026 campaign on Facebook. App users should be sent to /shop/items. Non-app users should go to https://monster-site.github.io/shop/items.html. 10OFF is the coupon code."

- Campaign and channel: Fall 2026, Facebook
- Objective: Conversion
- Destination: /shop/items and full web URL
- Extras: Coupon code (10OFF)

#### Winter collection

**Bad prompt**: "Make a link for our Winter Collection that takes people to their profile."

- Doesn't state the channel — is this link for a push notification, SMS, or a social site?
- No clear destination defined.
- Doesn't include an objective for the campaign.

**Good prompt**: "Make a push notification link for an engagement campaign about our Winter Collection. Send users to /collections/winter profile page to select their favorite colors."

- Campaign and channel: Winter Collection, Push Notification
- Objective: Engagement
- Destination: /collections/winter

#### SMS flash sale

**Bad prompt**: "Spin up links for the DXR promo and push it through SMS."

- Uses internal shorthand ("DXR promo") that Ivy can't interpret.
- Doesn't specify what the campaign is about or who it targets.

**Good prompt**: "I'm running a 24-hour flash sale via SMS. iOS users should deep link to /sales/flash-sale, Android users to /promotion/flash-sale. Others go to the app store."

- Campaign and channel: 24-hour flash sale, SMS
- Objective: Conversion (flash sale)
- Destination: iOS /sales/flash-sale, Android /promotion/flash-sale, others to app store

## Refine your prompts

If Ivy's output doesn't match what you need, you can refine your prompt or follow up with additional instructions.

**Add detail**: If the result is missing something, add more information to your prompt. For example, instead of saying "Send users to the rewards page," specify the platform behavior: "App users should go to the rewards page, desktop users to the weekly deals page."

**Use follow-up prompts**: After Ivy creates a link, you can ask follow-up questions or make adjustments. For example:

- "Show me the analytics tags you applied."
- "Change the fallback URL to https://example.com/sale."
- "Add coupon code SAVE20 to this link."

## Common mistakes

Avoid the following mistakes when writing Ivy prompts:

- **Using vague destinations**: Terms like "homepage" or "the website" don't tell Ivy whether you mean an in-app screen or a web URL. Always specify the full path or URL.
- **Omitting the channel**: Ivy needs to know where the link will be shared (email, SMS, push, social) to configure it correctly.
- **Leaving out the objective**: Without an objective, Ivy can't determine whether the link is meant for engagement, acquisition, or conversion.
- **Using internal shorthand or jargon**: Ivy can't interpret abbreviations or project codenames that aren't part of your Branch configuration. Use plain, descriptive language.
- **Forgetting platform-specific needs**: If your link needs to behave differently on iOS, Android, or desktop, mention each platform and its destination explicitly.

## Best practices

- **Use simple, action-based language**: Start your prompt with what you want Ivy to do, such as "Create a QR code for an in-store sign" or "Create a conversion link for our Spring campaign."
- **Lean on templates**: Ivy can reference existing templates to stay aligned with your team's ideal link setup. If your team uses a standard configuration, mention it in your prompt.
- **Always test your links**: Even with Ivy's automation, review the link's routing, fallbacks, and analytics tags before publishing.
- **Share prompts with your team**: Ivy makes link creation accessible to teammates of all skill levels. Sharing example prompts helps maintain consistency and data quality across your organization.
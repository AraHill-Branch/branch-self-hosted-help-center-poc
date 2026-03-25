---
title: "Link Validator"
slug: link-validator
---

## Overview

Given all the different variables at play in a deep linking scenario, from click location (Safari, Instagram, Facebook, TikTok, etc.) to operating system, it’s difficult to know what an end-user will actually see when they click your deep link.

To help you navigate this, Branch has the **Link Validator** tool within the Dashboard. This tool helps you test the links you create, so you can feel confident about what your users will see when they click on your deep links.

The Link Validator tool helps you determine what the expected outcome should be when your customers start using your links, giving you something to test against once your links are actually out in the wild.

## Link Types

Please note that the Link Validator only accepts the following link types:

- Branch [Short Links](create-quick-links.md) created within the Branch Dashboard.
- Branch Links created using one of our link-generating APIs:

  - [Short Links API](quick-links-api.md)
  - [Deep Linking API](deep-linking-api.md)

## Usage

The Link Validator is made to be a user-friendly way of seeing how your link will behave based on who your customer is and where they are clicking the link from.

To try the Link Validator tool:

1. Go to the [Branch Dashboard](https://dashboard.branch.io/quick-links/validator) and use the left-side navigation bar to click on **LinkHub**, which is in the **Campaigns** section.
2. Click the **Link** **Validator** tab on the **LinkHub** page.
3. Copy the URL for one of your Branch Links, making sure it is of the appropriate [type](link-validator.md#link-types).
4. Paste the URL of the Branch Link into the validation box, and click the **Validate** button.

The first section that appears when you validate the link is a small overview module summarizing details about the link. It contains the link itself, the name of the link, who created it, when they created it, and how it was created. Using the icons, you can also copy the link, edit the link, or view analytics for the link.

![](/img/image(79).png)

The next section lets you lets you see where users go when they click your link. In this section, you will need to set the user's iOS, where they were clicking from, and where they have the app installed.

![](/img/image(80).png)

Once you select options for these three variables, an image will appear that depicts your user's flow.

In the example above, the values selected were **iOS**, **Facebook**, and **Installed**. The resulting diagram shows that a user would be taken from Facebook to a Branch Deepview while the app is loading, then to the app itself.

Test various scenarios until you are sure you're seeing the behavior you expect.

The final section is the **Analytics Tags** section, which is where the analytics tags associated with the link are laid out plainly, alongside what each tag means.

![](/img/image(81).png)
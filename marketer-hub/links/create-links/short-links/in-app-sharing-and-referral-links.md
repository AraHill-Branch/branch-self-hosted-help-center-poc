---
title: "Create In-App Sharing and Referral Links"
slug: in-app-sharing-and-referral-links
---

Share links from the app to encourage installations and incentivize users for sharing. Branch enables you to trace connections to identify which users are bringing in others, and which shared materials are leading to the most installs and re-engagements.

## Create a BranchUniversalObject

A BranchUniversalObject (BUO) represents a unique piece of content, such as an article, video, or item for sale. Full code snippets for setting them up can be found here: [iOS](ios-full-reference.md#branch-universal-object), [Android](android-full-reference.md).

- Set a unique `canonicalIdentifier` for each piece of content.
- `canonicalUrl` should reflect the content’s web URL equivalent

## Set the link’s properties

- Set redirect url in `$desktop_url` (mobile users will be sent to the platform-specific app store)
- Set `feature` = “referrals”
- [Optional] Customize link appearance by setting OG tags, though they will default to tags found in the web page set in `$desktop_url`
- [Optional] Set unique promo code in a key to reward the referred user

Next, **be sure to set the user ID of the referring user in a key such as** `referringUserID`**.** Then when a user clicks that link and opens the app, you can inspect `referringUserID` and connect the dots between referring and referred user. **This is the fundamental piece required for you to measure which users are referring other users, and to reward them accordingly.**

## Create the Branch Link

Lastly, create the shortened Branch Link to be shared. Full code snippets on creating a Short Link using a BranchUniversalObject can be found here: [iOS](ios-full-reference.md), [Android](android-full-reference.md).

## Use webhooks to be notified when shares drive conversions

Customers with access to Branch's Advanced Data Feeds product can set up [webhooks](webhooks.md) to be notified of installs and conversions in real time.

- Filter for INSTALL (or conversion) events attributed to a **feature = “referrals”**
- The webhook can include the unique promo code and user ID (`referringUserID`) from the link you set up
- After validating the promo code and `referringUserID`, you can reward the referring and/or referred user. You can manage credits in house or use a third-party system.
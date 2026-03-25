---
title: "General SEO Compatibility"
slug: general-seo-compatibility
---

## Overview

Branch has invested a lot of time and effort to ensure that we only help with SEO and search rankings while delivering our value. We've very thoughtfully designed how we treat Google and other search engine bots that crawl links to ensure that SEO juice is properly passed on to your website domain and not ours.

## Branch Redirects Don’t Affect SEO or Rankings

Commonly, you'll want to put Branch Links on social and other public platforms to get the benefit of Branch's deep linking and attribution. You might configure your Branch link to send your users to the website when the app is not installed by using `$fallback\_url` or one of the platform fallbacks like `$desktop\_url` or `$ios\_url`.

There's no need to worry about SEO in this case. Branch uses HTTP 307 redirects to fallback to your website when the app is not installed and a Google representative has [commented publicly](http://searchengineland.com/google-no-pagerank-dilution-using-301-302-30x-redirects-anymore-254608) that these do not harm SEO or rankings.

## Best Practices for Using Branch to Enhance SEO

If you're not using using `$fallback_url` or one of the platform fallbacks like `$desktop_url` or `$ios_url` to redirect users, you can still configure your Branch Links to contribute SEO juice to a website. You merely need to configure the `$canonical_url` field of the link to the web URL you'd like us to send to search engine bots. This doesn't affect redirect behavior but does affect SEO.

This can be set via the native libraries while using the BUO as shown below. For other platforms, you can see the appropriate code in the following docs.

```
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] 
initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.canonicalUrl = @"https://example.com/item/12345";
```

```
let branchUniversalObject: BranchUniversalObject = 
BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.canonicalUrl = "https://example.com/item/12345"
```

```
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setCanonicalUrl("https://example.com/item/12345")
```

## Journeys Banners and Other Web Integrations

The other common concern is around Branch's web products such as [Journeys banners](journeys-overview.md) or the [web library](help.branch.io/developers-hub/docs/web-sdk-overview). After deploying your banners to the wild, you can check your Branch-integrated site using Google's [Page Speed analyzer.](https://developers.google.com/speed/pagespeed/) You'll be pleased to know that Branch is fully optimized.

You'll find that all assets such as images and text are compressed and optimized for page loads speed. Plus, our static assets are cached in our CDN to deliver fast load times globally. We won't be a hindrance to your site performance.
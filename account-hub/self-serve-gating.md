---
title: "Self-Serve Update"
slug: self-serve-gating
---

In March of 2023, Branch introduced self-serve usage for newly created apps that included Branch linking and Ads for free under **10K MAUs** when you enter a credit card. Today, Branch is limiting access to creating Branch Links and certain Dashboard pages/configurations until a credit card is entered for a new Branch app.

## Dashboard Links & Reporting

In the Branch Dashboard, unless a credit card is entered, the following features will be locked:

| [Ad Links](ad-links.md) | [Short Links](create-quick-links.md) | [Summary](branch-summary-page.md) |
| --- | --- | --- |
| Create Ad Links | Create Short Links | View Summary Analytics |
| Manage Ad Links | Manage Short Links | - |

Accessing a Dashboard feature without a credit card entered for that Branch app will result in the following prompt:



---

## Dynamic Link Redirection

Adding [redirection query parameters](creating-a-deep-link.md) to dynamic links (Short or Long Links) is disabled.

| Link Type | Example |
| --- | --- |
| Short Link | `https://example.app.link/fzmLEhobLD?$ios_url=https%3A%2F%2Fbranch.io%2F` |
| Long Link | `https://example.app.link/?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F` |

---

## Branch Redirects Configuration

For Branch [Redirects Configuration](configure-default-link-behaviors.md), unless a credit card is entered, the following settings are disabled:

- Default URL Redirect
- Android Redirects
- iOS Redirects
- Desktop Default
- MacOS Redirect
- Windows Redirect
- Amazon Fire Redirects
- iPad Redirects
- Android Tablet Redirects
- WeChat Redirects



---

## SDKs & APIs

All SDKs and specific APIs will be limited in their ability to create links and update Branch App configurations:

| [SDKs](native-sdks-overview.md) | [Deep Linking API](deep-linking-api.md) | [App API](app-api.md) |
| --- | --- | --- |
| All Link Create methods | All Link Create requests | Update config request |

Making a call to any of the above methods/requests without a credit card entered for that Branch app will result in the following error response:

```
{
  "error": {
    "message": "Access denied",
    "code": 403
  }
}
```
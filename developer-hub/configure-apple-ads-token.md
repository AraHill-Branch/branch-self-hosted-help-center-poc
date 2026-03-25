---
title: "Configure Apple Ads Token"
slug: configure-apple-ads-token
---

## Prerequisites

To enable Apple Ads, you first need to:

1. Create a [Branch Dashboard](https://dashboard.branch.io/).
2. Enable Ads for your Branch account. Contact your Branch account manager or visit <https://branch.io/pricing>.
3. Have a mobile developer prepared to implement the Apple Ads token.
4. Have admin access to your Apple Ads account.

## Configure token

You have to choose **one** of the following options for retrieving the Apple Ads Token to get started with enabling Apple Ads with Branch:

- via SDK **or**
- via Server-to-Server (S2S)

::: info Note
For either methods, be sure to import the `AdServices` Framework to leverage the Apple Ads Attribution API.
:::

### Configure token via SDK

Implement the latest version of the [Branch iOS SDK](ios-basic-integration.md).

[](ios-basic-integration.md)

The Branch SDK will automatically retrieve a token on your behalf. Branch servers will use that token to call the Apple Ads Attribution API.

### Configure token via server-to-server

For S2S integrations, you will need to retrieve the [new token](https://developer.apple.com/documentation/adservices/aaattribution?language=objc) and send it to Branch on the install as `apple_attribution_token`. This is necessary only if you are integrating Branch through an S2S connection.

1. Import `AdServices.framework`
2. Request attribution token. This should be available from Apple within 50ms.

::: code-group

```swift [Swift]
func appleAttributionToken() -> String? {
                    if #available(iOS 14.3, *) {
                    return try? AAAttribution.attributionToken()
                    }
                    return nil
                    }
```

```objectivec [Obj-C]
+ (NSString *)appleAttributionToken {
                    #if !TARGET_OS_TV
                    if (@available(iOS 14.3, *)) {
                    NSError *error;
                    NSString *appleAttributionToken = [AAAttribution attributionTokenWithError:&error];
                    if (!error) {
                    return appleAttributionToken;
                    }
                    }
                    #endif
                    return nil;
                    }
```

:::

3. The token has a 24-hour time-to-live, so send it to Branch within that time to use it for attribution.

## Complete Apple Ads setup

To finish enabling Apple Ads, please visit our dedicated guide in [Marketer Hub](enable-apple-ads.md#2-connect-apple-ads-in-branch).
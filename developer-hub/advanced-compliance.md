---
title: "Advanced Compliance"
slug: advanced-compliance
---

## Overview

Advanced Compliance helps companies in healthcare or other highly regulated industries benefit from Branch's comprehensive set of mobile measurement tools, without sacrificing user privacy.

With Advanced Compliance, your data is sent to an isolated network endpoint, which hashes and anonymizes PII as soon as it is received.

Privacy in the mobile marketing ecosystem is ever changing, and Branch strives to support all of your mobile linking and measurement needs as the landscape continues to evolve.

### Advanced Compliance Features

The [Advanced Compliance add-on](packaging.md#advanced-compliance) gives you access to the following:

- **Advanced Privacy-Preserving Attribution**: Supports safe and proper attribution when handling data related to protected health information (PHI).
- **Advanced Security Gateway**: A separate data architecture, including an isolated network with custom traffic routing, strong authentication, and multiple levels of encryption.
- **Protected API Endpoint**: Your data flows through a protected and isolated environment, in which sensitive data is locked and subsequently available only where strictly necessary for specific business needs.

## Compatibility

Advanced Compliance is capable of supporting both [Engagement](packaging.md#engagement-product) and [Performance](packaging.md#performance-product) customers. It may be included as an add-on to either product.

Advanced Compliance is also compatible with [Advanced Data Feeds](packaging.md#advanced-data-feeds), which is an add-on as well.

### Engagement

Engagement is fully compatible with Advanced Compliance. This includes features like:

- Linking
- Journeys
- Email Integrations
- QR Codes
- Organic Attribution

### Performance

Performance features that are compatible with Advanced Compliance include:

- Ad Partner Integrations
- Paid Attribution
- **\***Fraud Defense
- ROI Hub
- Household Measurement

Please note that Engagement Builder, a feature in the Performance product, **is not compatible** with Advanced Compliance.

**\***Also, fraud rules included as part of our [fraud feature](packaging.md#performance-essentials-tier) will not behave accurately if they leverage PII to work. For example, if a fraud rule based on IP address is created, it may not work as expected.

[Third Party Integrations](third-party-integrations-and-pii.md): Customers should consult with their Legal team and review third party terms before enabling integrations for Advanced Compliance. Some integrations require certain data fields (e.g., IP address, IDFA) to function properly. You are responsible for your data once you enable an integration and direct Branch to send your data (which may include data regulated by HIPAA), outside of Branch services to a third party.

### Advanced Data Feeds

The Advanced Data Feeds add-on works alongside Advanced Compliance to bring you powerful reporting capabilities using:

- Data Integrations (this **does not include** server-to-server integrations for inbound data)
- Data Exports
- Custom Webhooks

## Enable Advanced Compliance

Once you have added Advanced Compliance as an add-on to your Branch Account, you can use the steps below to enable it.

### 1. Configure Branch SDK

Configure your Branch SDK to use the following API endpoint: `https://protected-api.branch.io`

#### SDK Version Requirements

| Platform | Minimum Version | Full Reference |
| --- | --- | --- |
| [Android](android-full-reference.md#setapiurl) | v5.9.0 | Use the `setAPIUrl()` [method](android-full-reference.md#setapiurl). |
| [iOS](ios-full-reference.md#setapiurl) | v3.2.0 | Use the `setAPIUrl()` [method](ios-full-reference.md#setapiurl). |
| [Web](web-full-reference.md#setapiurlurl) | v.2.82.0 | Use the `setAPIUrl()` [method](web-full-reference.md#setapiurl). Make sure to call it **before** `init()`. |
| [React Native](react-native.md) | v6.2.0 | Use your `branch.json` [file](react-native-advanced-features.md#set-branch-api-url) to set the API endpoint. |

#### Example Implementations

::: code-group

```java [Java]
//Inside LauncherActivity

@Override
protected void onStart() {
	super.onStart();

Branch.setAPIUrl("https://protected-api.branch.io");

	Branch.sessionBuilder(this).withCallback(new Branch.BranchUniversalReferralInitListener() {
		@Override
		public void onInitFinished(BranchUniversalObject branchUniversalObject, LinkProperties linkProperties, BranchError error) {
			if (error != null) {
				Log.e("BranchSDK_Tester", "branch init failed. Caused by -" + error.getMessage());
			} else {
				Log.i("BranchSDK_Tester", "branch init complete!");
				if (branchUniversalObject != null) {
					Log.i("BranchSDK_Tester", "title " + branchUniversalObject.getTitle());
					Log.i("BranchSDK_Tester", "CanonicalIdentifier " + branchUniversalObject.getCanonicalIdentifier());
					Log.i("BranchSDK_Tester", "metadata " + branchUniversalObject.getContentMetadata().convertToJson());
				}

				if (linkProperties != null) {
					Log.i("BranchSDK_Tester", "Channel " + linkProperties.getChannel());
					Log.i("BranchSDK_Tester", "control params " + linkProperties.getControlParams());
				}
			}
		}
	}).withData(this.getIntent().getData()).init();
}
```

```kotlin [Kotlin]
//Inside LauncherActivity

// Always initialize Branch in `onStart()` - see warnings below for details
override fun onStart() {
	super.onStart()
  
  Branch.setAPIUrl("https://protected-api.branch.io")
  
	Branch.sessionBuilder(this).withCallback { branchUniversalObject, linkProperties, error ->
		if (error != null) {
			Log.e("BranchSDK_Tester", "branch init failed. Caused by -" + error.message)
		} else {
			Log.i("BranchSDK_Tester", "branch init complete!")
			if (branchUniversalObject != null) {
				Log.i("BranchSDK_Tester", "title " + branchUniversalObject.title)
				Log.i("BranchSDK_Tester", "CanonicalIdentifier " + branchUniversalObject.canonicalIdentifier)
				Log.i("BranchSDK_Tester", "metadata " + branchUniversalObject.contentMetadata.convertToJson())
			}
			if (linkProperties != null) {
				Log.i("BranchSDK_Tester", "Channel " + linkProperties.channel)
				Log.i("BranchSDK_Tester", "control params " + linkProperties.controlParams)
			}
		}
	}.withData(this.intent.data).init()
}
```

```swift [Swift]
//insides AppDelegate  

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
	// Override point for customization after application launch
    Branch.setAPIURL("https://protected-api.branch.io")

	// This version of `initSession` includes the source UIScene in the callback
	BranchScene.shared().initSession(launchOptions: launchOptions, registerDeepLinkHandler: { (params, error, scene) in
		
	})
	return true
}
```

```objectivec [Objective-C]
//inside AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
   [Branch setAPIURL:@"https://protected-api.branch.io"];
  
    [[BranchScene shared] initSessionWithLaunchOptions:launchOptions registerDeepLinkHandler:^(NSDictionary * _Nullable params, NSError * _Nullable error, UIScene * _Nullable scene) {
        
    }];

    return YES;
}
```

```xml [Web - HTML]
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <script>
      // load Branch
      (function(b, r, a, n, c, h, _, s, d, k) {
        if (!b[n] || !b[n]._q) {
          for (; s < _.length;) c(h, _[s++]);
          d = r.createElement(a);
          d.async = 1;
          d.src = "https://cdn.branch.io/branch-latest.min.js";
          k = r.getElementsByTagName(a)[0];
          k.parentNode.insertBefore(d, k);
          b[n] = h
        }
      })(window, document, "script", "branch", function(b, r) {
        b[r] = function() {
          b._q.push([r, arguments])
        }
      }, {
        _q: [],
        _v: 1
      }, "addListener banner closeBanner closeJourney data deepview deepviewCta first init link logout removeListener setBranchViewData setIdentity track trackCommerceEvent logEvent disableTracking getBrowserFingerprintId crossPlatformIds lastAttributedTouchData setAPIResponseCallback qrCode setRequestMetaData setAPIUrl getAPIUrl setDMAParamsForEEA".split(" "), 0);
      // Set API URL after loading Branch
      branch.setAPIUrl('https://protected-api.branch.io');
      // init Branch
      branch.init('key_live_YOUR_KEY_GOES_HERE');
    </script>
  </head>
  <body></body>
</html>
```

:::

### 2. Configure Branch Link Domain



At this time, only `app.link` subdomains and custom root domains are supported.

#### Subdomains

If you are only using the default `app.link` subdomain, no additional actions in this step are required.

Configure specific subdomains on `app.link` **before** enabling Advanced Compliance.

#### Custom Domains

Configure custom domains in the Branch Dashboard using our [guide](advanced-settings-configuration.md), then get in touch with Branch for next steps.

Custom subdomains are **not** supported.

### 3. Configure Single Sign-On (Optional)

This step is **optional, but highly recommended**.

Single Sign-On (SSO) helps to control team member access and to prevent unidentified apps from being created in your account.

To enable SSO, follow the steps in our [guide](enable-single-sign-on.md).

## FAQ

1. **What happens to my users using an older version of my app?**  
    For users who have not updated their app version to include the use of the protected endpoint, all data sent to Branch will be excluded from Advanced Compliance.
2. **If I use a custom root domain, what happens to my** `app.link` **URLs?**  
    The `app.link` domain will continue to work, but newer links will be created using the custom root domain by default.
3. **Which Branch SDKs can be used with Advanced Compliance?**  
    We currently support using Advanced Compliance alongside the Branch iOS, Android, Web, and React Native SDKs.
4. **How do I know Advanced Compliance is secure?**  
    Our Advanced Compliance data architecture includes an isolated network with custom traffic routing, strong authentication, and multiple levels of encryption. Data will flow through a protected and isolated environment in which customer data is locked and subsequently available only where strictly necessary.
5. **How does HIPAA relate to Branch?**  
    While Branch is not a “Covered Entity” under HIPAA regulations, HIPAA compliance relies on the safe handling of data by Business Associates as well. When Covered Entities expect their partners to process PHI in order to help meet their HIPAA compliance needs, Branch can assist in the role of a Business Associate and will provide a Business Associate Agreement (“BAA”).
6. **What is PHI?**  
    Protected Health Information refers to any health related information combined with an identifier for a particular individual.
7. **What data does Branch process?**  
    Branch, as a business associate, processes certain identifying data points (IDFA, I.P. Address, Device I.D., or other unique identifiers) on behalf of a "Covered Entity" customer in accordance with the BAA signed by both parties.
8. **Can I use Branch with other marketing tools and ad networks?**  
    Through a sophisticated encryption and decryption process, Advanced Compliance supports integrations with ad networks and other marketing tools, as well as custom webhooks to internal systems.  
    You are responsible for the configuration of your service and should review third party requirements before enabling any third party integration and directing Branch to send your data to a third party.
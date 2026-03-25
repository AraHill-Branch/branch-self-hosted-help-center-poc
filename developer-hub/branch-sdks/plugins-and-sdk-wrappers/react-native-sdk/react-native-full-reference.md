---
title: "React Native Full Reference"
slug: react-native-full-reference
---

::: info GitHub
To see more information about these methods, visit the Branch React Native SDK GitHub [repository](https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts).
:::

## createBranchUniversalObject

A `BranchUniversalObject` instance represents a unique piece of content, such as an article, video, or item for sale.

See our [guide](create-branch-objects-and-events.md#buo-best-practices) on best practices for creating Branch Universal Objects.

| Method | Description |
| --- | --- |
| `createBranchUniversalObject: (identifier: string, options: BranchUniversalObjectOptions) => Promise<BranchUniversalObject>` | Create a `BranchUniversalObject` instance. |

| Argument | Type | Description |
| --- | --- | --- |
| `identifier` | `string` | The unique name for the Branch Universal Object. |
| `options` | `BranchUniversalObjectOptions` | An object describing the properties of the Branch Universal Object. Visit the SDK GitHub repo for more [details](https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts). |

| Returns |
| --- |
| A promise that resolves to an instance of a `BranchUniversalObject` with your specified properties. |

##### Example Usage

```
import branch from 'react-native-branch'

        let buo = await branch.createBranchUniversalObject('content/12345', {
        title: 'My Content Title',
        contentDescription: 'My Content Description',
        contentMetadata: {
        customMetadata: {
        key1: 'value1'
        }
        }
        })
```

---

## generateShortUrl

| Method | Description |
| --- | --- |
| `generateShortUrl: (linkProperties?: BranchLinkProperties, controlParams?: BranchLinkControlParams) => Promise<{ url: string }>;` | Create a Branch Deep Link URL with encapsulated data. Create a short URL for a specific `BranchUniversalObject` instance, and associate a `LinkProperties` object with it. |

| Argument | Type | Description |
| --- | --- | --- |
| `linkProperties` | `BranchLinkProperties` | The [link properties](https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts) to associate with the URL. `export interface BranchLinkProperties { alias?: string; campaign?: string; feature?: string; channel?: string; stage?: string; tags?: string[]; }` |
| `controlParams` | `BranchLinkControlParams` | Additional [link params](https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts). Can include a `custom` field. `export interface BranchLinkControlParams { $fallback_url?: string; $desktop_url?: string; $ios_url?: string; $ipad_url?: string; $android_url?: string; $samsung_url?: string; }` |

| Returns |
| --- |
| A promise that resolves to a short URL with your specified link properties and parameters. |

##### Example Usage

```
import branch from 'react-native-branch'

        let buo = await branch.createBranchUniversalObject('content/12345', {
        title: 'My Content Title',
        contentDescription: 'My Content Description',
        contentMetadata: {
        customMetadata: {
        key1: 'value1'
        }
        }
        })

        let linkProperties = {
        feature: 'sharing',
        channel: 'facebook',
        campaign: 'content 123 launch'
        }

        let controlParams = {
        $desktop_url: 'https://example.com/home',
        custom: 'data'
        }

        let {url} = await buo.generateShortUrl(linkProperties, controlParams)
```

---

## getLatestReferringParams

Retrieve data from a Branch Deep Link.

This method is essentially a synchronous method that retrieves the latest referring link parameters stored by the native SDK. However, React Native does not support synchronous calls to native code from JavaScript, so the method returns a promise. You must `await` the response or use `then` to receive the result.

However, this is only a restriction of React Native. The purpose of `getLatestReferringParams` is to retrieve those parameters one time. The promise will only return one result. It will not continue to return results when links are opened or wait for a link to be opened. This method is not intended to notify the app when a link has been opened.

Best practice for this method is to receive the data from the `listener` (to prevent a race condition).

Returns Branch Deep Link [properties](create-branch-objects-and-events.md#deep-link-data-structure).

| Method | Description |
| --- | --- |
| `getLatestReferringParams: (synchronous?: boolean) => Promise<BranchParams>` | Returns the parameters associated with the link that referred the session. |

| Argument | Type | Description |
| --- | --- | --- |
| `synchronous` | `boolean` | Set to `true` to allow deferred promise resolution. |

| Returns |
| --- |
| A promise that resolves to a `BranchParams` object. |

##### Example Usage

```
import branch from 'react-native-branch'

        // Listener
        branch.subscribe({
        onOpenStart: ({
        uri,
        cachedInitialEvent
        }) => {
        console.log(
        'subscribe onOpenStart, will open ' +
        uri +
        ' cachedInitialEvent is ' +
        cachedInitialEvent,
        );
        },
        onOpenComplete: ({
        error,
        params,
        uri
        }) => {
        if (error) {
        console.error(
        'subscribe onOpenComplete, Error from opening uri: ' +
        uri +
        ' error: ' +
        error,
        );
        return;
        }
        else if (params) {
        if (!params['+clicked_branch_link']) {
        if (params['+non_branch_link']) {
        console.log('non_branch_link: ' + uri);
        // Route based on non-Branch links
        return;
        }
        } else {
        // Handle params
        let deepLinkPath = params.$deeplink_path as string;
        let canonicalUrl = params.$canonical_url as string;
        // Route based on Branch link data
        return
        }
        }
        },
        });

        let latestParams = await branch.getLatestReferringParams() // Params from last open
```

---

## getFirstReferringParams

Retrieve data from a Branch Deep Link.

This method is essentially a synchronous method that retrieves the latest referring link parameters stored by the native SDK. However, React Native does not support synchronous calls to native code from JavaScript, so the method returns a promise. You must `await` the response or use `then` to receive the result.

Best practice for this method is to receive the data from the `listener` (to prevent a race condition).

Returns Branch Deep Link [properties](create-branch-objects-and-events.md#deep-link-data-structure).

| Method | Description |
| --- | --- |
| `getFirstReferringParams: () => Promise<BranchParams>` | Returns the parameters associated with the link that referred the user. This is only set once, when the user is first referred by a link. Think of this as the user referral parameters. |

| Returns |
| --- |
| A promise that resolves to a `BranchParams` object. |

##### Example Usage

```
import branch from 'react-native-branch'

        // Listener
        branch.subscribe({
        onOpenStart: ({
        uri,
        cachedInitialEvent
        }) => {
        console.log(
        'subscribe onOpenStart, will open ' +
        uri +
        ' cachedInitialEvent is ' +
        cachedInitialEvent,
        );
        },
        onOpenComplete: ({
        error,
        params,
        uri
        }) => {
        if (error) {
        console.error(
        'subscribe onOpenComplete, Error from opening uri: ' +
        uri +
        ' error: ' +
        error,
        );
        return;
        }
        else if (params) {
        if (!params['+clicked_branch_link']) {
        if (params['+non_branch_link']) {
        console.log('non_branch_link: ' + uri);
        // Route based on non-Branch links
        return;
        }
        } else {
        // Handle params
        let deepLinkPath = params.$deeplink_path as string;
        let canonicalUrl = params.$canonical_url as string;
        // Route based on Branch link data
        return
        }
        }
        },
        });

        let installParams = await branch.getFirstReferringParams() // Params from original install
```

---

## getBranchQRCode

| Method | Description |
| --- | --- |
| `getBranchQRCode: (settings: BranchQRCodeSettings, branchUniversalObject: BranchUniversalObjectOptions, linkProperties: BranchLinkProperties, controlParams: BranchLinkControlParams) => Promise<string>;` | Create a Branch QR Code and customize the settings. |

| Argument | Type | Description |
| --- | --- | --- |
| `settings` | `BranchQRCodeSettings` | The settings for the QR code, such as color and width. |
| `branchUniversalObject` | `BranchUniversalObjectOptions` | An object describing the content associated with the QR code. |
| `linkProperties` | `BranchLinkProperties` | The [link properties](https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts) for the link associated with the QR code. `export interface BranchLinkProperties { alias?: string; campaign?: string; feature?: string; channel?: string; stage?: string; tags?: string[]; }` |
| `controlParams` | `BranchLinkControlParams` | Additional [link params](https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts) . Can include a `custom` field. `export interface BranchLinkControlParams { $fallback_url?: string; $desktop_url?: string; $ios_url?: string; $ipad_url?: string; $android_url?: string; $samsung_url?: string; }` |

| Returns |
| --- |
| A promise that resolves to a string representing the QR code. |

##### Example Usage

```
import branch from 'react-native-branch'

        var qrCodeSettings = {
        width: 500,
        codeColor: "#3b2016",
        backgroundColor: "#a8e689",
        centerLogo: "https://cdn.branch.io/branch-assets/159857dsads5682753-og_image.png",
        margin: 1,
        imageFormat: "PNG"
        };

        var buoOptions = {
        title: "A Test Title",
        contentDescription: "A test content desc",
        contentMetadata: {
        price: "200",
        productName: "QR Code Scanner",
        customMetadata: { "someKey": "someValue", "anotherKey": "anotherValue" }
        }
        };

        var lp = {
        feature: "qrCode",
        tags: ["test", "working"],
        channel: "facebook",
        campaign: "posters"
        };

        var controlParams = {
        $desktop_url: "https://www.desktop.com",
        $fallback_url: "https://www.fallback.com"
        };

        try {
        var result = await branch.getBranchQRCode(qrCodeSettings, buoOptions, lp, controlParams);
        }
        catch (err) {
        console.log('QR Code Err: ', err);
        }
```

---

## setIdentity

This method may be helpful if you have your own user IDs for customers, or you want referral and event data to persist across platforms or uninstall/reinstall. Using this method can make it easier to know when users access your service from different devices.

You can validate that an identity has been set using the [Branch Dashboard](https://dashboard.branch.io/liveview/identities?_gl=1*rjmdzn*_ga*MTE0ODc2MjU5OC4xNjc5MzM4OTI0*_ga_KSDD8Y11CT*MTcxNDA2MDQxNi41MjcuMS4xNzE0MDc3MDc4LjQ4LjAuMA..).

**Warning**: Do not use this method to send PII to Branch.

| Method | Description |
| --- | --- |
| `setIdentity: (identity: string) => void;` | Identifies the current user to the Branch API by supplying a unique identifier as a string value. |

| Argument | Type | Description |
| --- | --- | --- |
| `identity` | `string` | A string value containing the unique identifier of the user. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.setIdentity('theUserId')
        branch.logout()
```

---

## setAnonID

| Method | Description |
| --- | --- |
| `setODMInfo: (odmInfo: string, firstOpenTimestamp: number) => void;` | Sets a custom Meta `anon_id` for the current user. The Meta `anon_id` is a GUID generated by the Branch iOS SDK for Meta AEM. Learn more [here](https://help.branch.io/marketer-hub/docs/meta-aggregated-event-measurement). |

| Argument | Type | Description |
| --- | --- | --- |
| `anonID` | `string` | The custom Meta `anon_id` to set for the user. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.setAnonID(“your-anon-id”)
```

---

## logEvent

By default, the Branch React Native SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box).

To log other Branch Events:

1. Create a `BranchUniversalObject` instance.
2. Create a `BranchEventParams` instance.
3. Use `new BranchEvent` to create a Branch Event with the newly created `BranchUniversalObject` and `BranchEventParams` instances
4. Use the `logEvent()` method.

Learn more about tracking events with the Branch React Native SDK in our Advanced Features [guide](react-native-advanced-features.md#event-tracking).

| Method | Description |
| --- | --- |
| `logEvent: () => Promise<null>` | Log an event to Branch for tracking and analytics. |

| Returns |
| --- |
| A promise that resolves to `null`. |

##### Example Usage

```
import branch from 'react-native-branch'

        let buo = await branch.createBranchUniversalObject(
        "item/12345",
        {
        canonicalUrl: "https://branch.io/item/12345",
        title: "My Item Title",
        contentMetadata: {
        quantity: 1,
        price: 23.20,
        sku: "1994320302",
        productName: "my_product_name1",
        productBrand: "my_prod_Brand1",
        customMetadata: {
        custom_key1: "custom_value1",
        custom_key2: "custom_value2"
        }
        }
        }
        )

        let params = {
        transaction_id: "tras_Id_1232343434",
        currency: "USD",
        revenue: 180.2,
        shipping: 10.5,
        tax: 13.5,
        coupon: "promo-1234",
        affiliation: "high_fi",
        description: "Preferred purchase",
        purchase_loc: "Palo Alto",
        store_pickup: "unavailable",
        customData: {
        "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
        "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
        }
        }

        let event = new BranchEvent(BranchEvent.Purchase, [buo], params)
        event.logEvent()
```

---

## openURL

| Method | Description |
| --- | --- |
| `openURL: (url: string, options?: { newActivity?: boolean }) => void;` | Deep link into your own app from within the app itself. **Warning**: Handling a new Branch Deep Link in your app will clear the current session data and a new referred "open" will be attributed. |

| Argument | Type | Description |
| --- | --- | --- |
| `url` | `string` | The URL to deep link to. |
| `options` | `{ newActivity?: boolean }` | If `true`, Branch will allow Android to finish the current activity before opening the link. This results in a new activity window. Ignored on iOS. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.openURL("https://example.app.link/u3fzDwyyjF")

        // Finish the Android current activity before opening the link
        // Results in a new activity window
        // Ignored on iOS
        branch.openURL("https://example.app.link/u3fzDwyyjF", {newActivity: true})
```

---

## subscribe

| Method | Description |
| --- | --- |
| Method: `subscribe: BranchSubscribe;` Related interface: `interface BranchSubscribeOptions {onOpenComplete: BranchSubscribeCallback; onOpenStart?:(event: BranchOpenStartEvent) => void;}` | Receive a notification whenever a link is opened, including at app launch. There is no need to call `getLatestReferringParams()` at app launch to check for an initial link. Use `subscribe()` to handle all link opens. |

| Argument | Type | Description |
| --- | --- | --- |
| `onOpenComplete` | `BranchSubscribeCallback` | The callback to this method will return any initial link that launched the app and all subsequent link opens. Related to: `interface BranchSubscriptionEventBase { params: BranchParams | undefined; error: string | null | undefined; uri: string | undefined; }` |
| `onOpenStart` | `event: BranchOpenStartEvent` | Related to: `export interface BranchOpenStartEvent { uri: string; cachedInitialEvent?: boolean; }` |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.subscribe({
        onOpenStart: ({
        uri,
        cachedInitialEvent
        }) => {
        console.log(
        'subscribe onOpenStart, will open ' +
        uri +
        ' cachedInitialEvent is ' +
        cachedInitialEvent,
        );
        },
        onOpenComplete: ({
        error,
        params,
        uri
        }) => {
        if (error) {
        console.error(
        'subscribe onOpenComplete, Error from opening uri: ' +
        uri +
        ' error: ' +
        error,
        );
        return;
        }
        else if (params) {
        if (!params['+clicked_branch_link']) {
        if (params['+non_branch_link']) {
        console.log('non_branch_link: ' + uri);
        // Route based on non-Branch links
        return;
        }
        } else {
        // Handle params
        let deepLinkPath = params.$deeplink_path as string;
        let canonicalUrl = params.$canonical_url as string;
        // Route based on Branch link data
        return
        }
        }
        },
        });
```

---

## setRequestMetadata

Some third-party Data Integration Partners require setting certain identifiers before initializing Branch.

To do this:

1. [Add](react-native-advanced-features.md#defer-initialization-for-plugin-runtime) `deferInitForPluginRuntime` to your `branch.json` file.
2. Use the `setRequestMetadata()` method to set your identifiers.

| Method | Description |
| --- | --- |
| `setRequestMetadata: (key: string, value: string) => void;` | Set identifiers before initializing Branch. |

| Argument | Type | Description |
| --- | --- | --- |
| `key` | `string` | The key for the particular identifier. |
| `value` | `string` | The value for the particular identifier. |

##### Example Usage

```
import branch from 'react-native-branch'

        // Call `setRequestMetadata` before `subscribe`
        branch.setRequestMetadata('$analytics_visitor_id', '000001')

        branch.subscribe({ error, params } => {
        // ...
        })
```

Learn more in our React Native Advanced Features [guide](react-native-advanced-features.md#set-initialization-metadata).

---

## openURL

| Method | Description |
| --- | --- |
| `openURL: (url: string, options?: { newActivity?: boolean }) => void;` | Send push notification data to Branch. |

| Argument | Type | Description |
| --- | --- | --- |
| `url` | `string` | The Branch Link to send with the push notification payload data. |
| `options` | `newActivity?: boolean` | If set to `true`, finish the current Android activity before opening the link. Results in a new activity window. Ignored on iOS. |

##### Example Usage

```
import branch from 'react-native-branch'

        let data = {
        "aps": {
        "alert": "Push notification with a Branch deep link",
        "badge": "1"
        },
        "branch": "https://example.app.link/u3fzDwyyjF"
        }

        branch.openURL(data["branch"],{newActivity: true})
```

---

## disableTracking

| Method | Description |
| --- | --- |
| `disableTracking: (disable: boolean) => void;` | Method to change the tracking state. If disabled, the Branch React Native SDK will not track any user data or state. The SDK will not send any network calls, except for deep linking, when tracking is disabled. |

| Argument | Type | Description |
| --- | --- | --- |
| `disable` | `boolean` | When set to `true`, tracking is disabled. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.disableTracking(true)
```

---

## isTrackingDisabled

| Method | Description |
| --- | --- |
| `isTrackingDisabled: () => Promise<boolean>` | Checks to see whether tracking is disabled. |

| Returns |
| --- |
| A promise that resolves to whether tracking is disabled. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.isTrackingDisabled()
```

---

## logout

| Method | Description |
| --- | --- |
| `logout: () => void;` | Call this method if you know that a different person is about to use the app. For example, if you allow users to log out and let their friends use the app, you should call `logout()` to notify Branch to create a new user for this device. This will clear the first and latest params, and a new session is created. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.logout()
```

---

## addFacebookPartnerParameter

| Method | Description |
| --- | --- |
| `addFacebookPartnerParameter: (name: string, value: string) => void;` | Add a Partner Parameter for Facebook. This allows you to pass additional hashed information to the SDK for [Facebook Advanced Matching](pass-hashed-information-for-facebook-advanced-matching.md). Once set, this parameter is attached to INSTALL, OPEN, and other events until they are cleared or the app restarts. |

| Argument | Type | Description |
| --- | --- | --- |
| `name` | `string` | Partner Parameter key name. See Facebook's documentation for details on valid parameters. |
| `value` | `string` | Partner Parameter value. See Facebook's documentation for details on valid parameters. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.addFacebookPartnerParameter("key","value")
```

---

## addSnapPartnerParameter

| Method | Description |
| --- | --- |
| `addSnapPartnerParameter: (name: string, value: string) => void;` | Add a Partner Parameter for Snap. |

| Argument | Type | Description |
| --- | --- | --- |
| `name` | `string` | Partner Parameter key name. See Snap's documentation for details on valid parameters. |
| `value` | `string` | Partner Parameter value. See Snap's documentation for details on valid parameters. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.addSnapPartnerParameter("key","value")
```

---

## clearPartnerParameters

| Method | Description |
| --- | --- |
| `clearPartnerParameters: () => void;` | Clear all Partner Parameters that were previously set. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.clearPartnerParameters("key","value")
```

---

## handleATTAuthorizationStatus

| Method | Description |
| --- | --- |
| `handleATTAuthorizationStatus: (ATTAuthorizationStatus: ATTAuthorizationStatus) => void;` | Pass the AppTrackingTransparency authorization status to Branch to measure ATT prompt performance. |

| Argument | Type | Description |
| --- | --- | --- |
| `ATTAuthorizationStatus` | `ATTAuthorizationStatus` | The AppTrackingTransparency authorization status.  Can be:  - "authorized"  - "denied"  - "undetermined"  - "restricted" |

##### Example Usage

```
import branch from 'react-native-branch'

        // Retrieve ATT authorization status
        // ...

        // Pass ATT authorization status to Branch
        let ATTAuthorizationStatus = "restricted"
        branch.handleATTAuthorizationStatus(ATTAuthorizationStatus)
```

---

## lastAttributedTouchData

| Method | Description |
| --- | --- |
| `lastAttributedTouchData: (attributionWindow?: number) => Promise<BranchParams>` | Gets the available last attributed touch data. |

| Argument | Type | Description |
| --- | --- | --- |
| `attributionWindow` | `number` | The attribution window to look at, in days. |

| Returns |
| --- |
| A promise that resolves to a `BranchParams` object. |

##### Example Usage

```
import branch from 'react-native-branch'

        const attributionWindow = 365;

        // `latData` is an object
        branch.lastAttributedTouchData(attributionWindow, (latData) => {
        // ...
        });
```

---

## setPreInstallCampaign

| Method | Description |
| --- | --- |
| `setPreInstallCampaign: (campaign: string) => void;` | Add the pre-install campaign name. |

| Argument | Type | Description |
| --- | --- | --- |
| `campaign` | `string` | The pre-install campaign name. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.setPreinstallCampaign("My Pre-Install Campaign")
```

---

## setPreInstallPartner

| Method | Description |
| --- | --- |
| `setPreInstallPartner: (partner: string) => void;` | Add the pre-install partner name. |

| Argument | Type | Description |
| --- | --- | --- |
| `partner` | `string` | The pre-install partner name. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.setPreInstallPartner("My Pre-Install Partner")
```

---

## setDMAParamsForEEA

::: warning Warning: Omitted by Default
Please note that the 3 consent parameters related to `setDMAParamsForEEA` are all omitted by default.

**Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.**

Making a successful `setDMAParamsForEEA()` call requires that all 3 parameters be set.
:::

| Method | Description |
| --- | --- |
| `setDMAParamsForEEA: (eeaRegion: boolean, adPersonalizationConsent: boolean, adUserDataUsageConsent: boolean) => void;` | Sets the value of parameters required by Google Conversion APIs for DMA Compliance in the EEA region. |

| Argument | Type | Description |
| --- | --- | --- |
| `eeaRegion` | `boolean` | Set to `true` if user is **included** in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA. Set to `false` if user is considered **excluded** from European Union regulations. |
| `adPersonalizationConsent` | `boolean` | Set to `true` if user has **granted** consent for ads personalization. Set to `false` if user has **denied** consent for ads personalization. |
| `adUserDataUsageConsent` | `boolean` | Set to `true` if user has **granted** consent for 3P transmission of user-level data for ads. Set to `false` is user has **denied** consent for 3P transmission of user-level data for ads. |

##### Example Usage

```
import branch from 'react-native-branch'

        // Example for an EEA resident who has denied both ad personalization and data usage consent
        branch.setDMAParamsForEEA(true,false,false)

        // Example for an EEA resident who has consented to ad personalization but denied data usage consent
        branch.setDMAParamsForEEA(true,true,false)

        // Example for an EEA resident who has denied ad personalization but granted data usage consent
        branch.setDMAParamsForEEA(true,false,true)
```

---

## setSDKWaitTimeforThirdPartyAPIs

| Method | Description |
| --- | --- |
| `setSDKWaitTimeForThirdPartyAPIs: (waitTime: number) => void;` | Configure SDK wait duration for third-party API responses (ODM info and Apple Attribution Token). |

| Argument | Type | Description |
| --- | --- | --- |
| `waitTime` | `number` | Number of seconds SDK will wait for third party APIs to finish. Default is 0.5 seconds (500ms). |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.setSDKWaitTimeForThirdPartyAPIs(3)
```

---

## setODMInfo

| Method | Description |
| --- | --- |
| `setODMInfo: (odmInfo: string, firstOpenTimestamp: number) => void;` | Pass ODM info to the Branch iOS SDK. |

| Argument | Type | Description |
| --- | --- | --- |
| `odmInfo` | `string` | The ODM event data (or aggregate conversion info) for the current app instance. |
| `firstOpenTimestamp` | `number` | The date and time when the app was first opened after installation. This timestamp is used for conversion attribution timing and should match the value passed to Google’s `setFirstLaunchTime` method. |

##### Example Usage

```
import branch from 'react-native-branch'

        branch.setODMInfo("odminfo", Date.now())
```
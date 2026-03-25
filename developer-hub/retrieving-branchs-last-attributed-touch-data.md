---
title: "Retrieve Branch's Last Attributed Touch Data"
slug: retrieving-branchs-last-attributed-touch-data
---

### Overview

Branch includes SDK methods to allow retrieval of our last attributed touch data (LATD) from the client. This results in an asynchronous call being made to Branch’s servers with LATD data returned when possible.

Last attributed touch data contains the information associated with that user's last viewed impression or clicked link.

### Access

Please note that access to last attributed touch data is part of our [Performance](packaging.md#performance-essentials-tier) product.

### Fields Returned

By using the LATD SDK querying, the following fields will be returned to the client:

- last\_attributed\_touch\_data\_tilde\_id
- last\_attributed\_touch\_data\_tilde\_campaign
- last\_attributed\_touch\_data\_tilde\_campaign\_id
- last\_attributed\_touch\_data\_tilde\_campaign\_type
- last\_attributed\_touch\_data\_tilde\_customer\_campaign
- last\_attributed\_touch\_data\_tilde\_channel
- last\_attributed\_touch\_data\_tilde\_feature
- last\_attributed\_touch\_data\_tilde\_stage
- last\_attributed\_touch\_data\_tilde\_tags
- last\_attributed\_touch\_data\_tilde\_advertising\_partner\_name
- last\_attributed\_touch\_data\_tilde\_advertising\_partner\_id
- last\_attributed\_touch\_data\_tilde\_secondary\_publisher
- last\_attributed\_touch\_data\_tilde\_secondary\_publisher\_id
- last\_attributed\_touch\_data\_tilde\_customer\_secondary\_publisher
- last\_attributed\_touch\_data\_tilde\_creative\_name
- last\_attributed\_touch\_data\_tilde\_creative\_id
- last\_attributed\_touch\_data\_tilde\_ad\_set\_name
- last\_attributed\_touch\_data\_tilde\_ad\_set\_id
- last\_attributed\_touch\_data\_tilde\_customer\_ad\_set\_name
- last\_attributed\_touch\_data\_tilde\_ad\_name
- last\_attributed\_touch\_data\_tilde\_ad\_id
- last\_attributed\_touch\_data\_tilde\_customer\_ad\_name
- last\_attributed\_touch\_data\_tilde\_keyword
- last\_attributed\_touch\_data\_tilde\_keyword\_id
- last\_attributed\_touch\_data\_tilde\_customer\_keyword
- last\_attributed\_touch\_data\_tilde\_sub\_site\_name
- last\_attributed\_touch\_data\_tilde\_customer\_sub\_site\_name
- last\_attributed\_touch\_data\_tilde\_branch\_ad\_format
- last\_attributed\_touch\_data\_tilde\_technology\_partner
- last\_attributed\_touch\_data\_tilde\_banner\_dimensions
- last\_attributed\_touch\_data\_tilde\_placement
- last\_attributed\_touch\_data\_tilde\_placement\_id
- last\_attributed\_touch\_data\_tilde\_customer\_placement
- last\_attributed\_touch\_data\_tilde\_agency
- last\_attributed\_touch\_data\_tilde\_agency\_id
- last\_attributed\_touch\_data\_tilde\_optimization\_model
- last\_attributed\_touch\_data\_tilde\_secondary\_ad\_format
- last\_attributed\_touch\_data\_tilde\_external\_touch\_id
- last\_attributed\_touch\_data\_tilde\_journey\_id
- last\_attributed\_touch\_data\_tilde\_journey\_name
- last\_attributed\_touch\_data\_tilde\_view\_id
- last\_attributed\_touch\_data\_tilde\_view\_name
- last\_attributed\_touch\_data\_plus\_referring\_domain
- last\_attributed\_touch\_data\_plus\_current\_feature
- last\_attributed\_touch\_data\_plus\_via\_features
- last\_attributed\_touch\_data\_dollar\_3p
- last\_attributed\_touch\_data\_dollar\_fb\_data\_terms\_not\_signed
- last\_attributed\_touch\_data\_plus\_web\_format
- last\_attributed\_touch\_data\_plus\_touch\_id
- last\_attributed\_touch\_data\_custom\_fields

### Enabling LATD Feature

Before you can receive Branch last attributed touch data client-side, you need to enable this functionality in your Branch dashboard. This functionality is disabled by default.

To enable LATD:

1. In the left-hand navigation, click on **Link Settings**.
2. On the **Link Settings** page, scroll down and expand **Advanced Settings**.
3. Within the **Advanced Settings** section, check the box next to **Enable retrieving Last Attributed Touch Data via SDKs**.
4. Once checked, scroll down to the bottom of the page and click **Save**.

   

### Required SDK Methods

::: warning LATD for Self-Attributing Networks
This endpoint reads last attributed touch data from our Persona store. If you invoke it immediately after session start, it may not contain the most recent attribution data. Requests to self-attributing networks (SANs) like Facebook and Google are processed asynchronously and take time to finish.
:::

### Android

::: info Attribution Window Logic

::: info Attribution Window Logic

::: info Attribution Window Logic
When calling the LATD method, you can also provide a value for the `attributionWindow` you want applied to the data. If you do not provide a value within the SDK, Branch will use the attribution window setting value in your Branch dashboard.
:::

:::

:::

```
// init the LATD call from inside the session initialization callback
Branch.getInstance().getLastAttributedTouchData(
    new BranchLastAttributedTouchDataListener() {
        @Override
        public void onDataFetched(JSONObject jsonObject, BranchError error) {
             // read the data from the jsonObject
        }
    }, attributionWindow);
```

### iOS

When calling the LATD method, you can also provide a value for the `attributionWindow` you want applied to the data. If you do not provide a value within the SDK, Branch will use the attribution window setting value in your Branch dashboard.

::: code-group

```objectivec [Objective-C]
[[Branch getInstance] lastAttributedTouchDataWithAttributionWindow:0 completion:^(BranchLastAttributedTouchData * _Nullable latd, NSError * _Nullable error) {
// access the data through latd.lastAttributedTouchJSON;
}];
```

```swift [Swift]
Branch.getInstance().lastAttributedTouchData(withAttributionWindow: 0) { latd, error in
// access the data through latd?.lastAttributedTouchJSON
}
```

:::

### Web

::: info Attribution Window Logic
When calling the LATD method, you can also provide a value for the `attribution_window` you want applied to the data. If you do not provide a value within the SDK, Branch will use the attribution window setting value in your Branch dashboard.
:::

```
branch.lastAttributedTouchData(
    attribution_window,
    callback (err, data)
);
```

### React Native

When calling the LATD method, you can also provide a value for the `attributionWindow` you want applied to the data. If you do not provide a value within the SDK, Branch will use the attribution window setting value in your Branch dashboard.

```
const attributionWindow = 365;
const latData = await branch.lastAttributedTouchData(attributionWindow);
// latData is an Object
```
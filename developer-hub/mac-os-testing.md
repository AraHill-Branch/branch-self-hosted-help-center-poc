---
title: "macOS Testing"
slug: mac-os-testing
---

### Test Deep Link

- Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)
- Run your macOS app from Xcode
- Create a test webpage with the test link.

```
<html>
<body>
<a href="https://yourdeeplink">link<a>
</body>
</html>
```

- Open this test webpage in any browser and click the test link.
- Allow the browser to open your app. The permission dialog varies from browser to browser.
- Delete your debug app.

You can locate your debug app in Xcode under `Products` and `Show in Finder`

![452](/img/6de5e58-showApp.png "showApp.png")

### Enable Logging

- Add before `Branch.sharedInstance.start(with: config)`
- Remove before releasing to production

::: code-group

```swift [Swift]
Branch.loggingIsEnabled = true
```

```objectivec [Objective-C]
Branch.loggingEnabled = YES;
```

:::

### Use Test Key

To use the Branch `test key` instead of the `live key`, initialize the `BranchConfiguration` with the `test key`.

- The `test key` of the app must match the `test key` of your deep link
- Switch back to the `live key` before releasing to production

::: code-group

```swift [Swift]
BranchConfiguration *configuration = [[BranchConfiguration alloc] initWithKey:@"key_test"];
```

```objectivec [Objective-C]
let config = BranchConfiguration(key: "key_test")
```

:::
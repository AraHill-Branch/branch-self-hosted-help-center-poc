---
title: "Adobe Launch Android SDK"
slug: adobe-launch-android-sdk
---

Add the power of Branch Deep Linking and Attribution to your Adobe Marketing Cloud app. With Branch's Linking platform, mobile developers and marketers can grow their mobile business with world class Deep Links and Attribution.

::: danger Google Play Services version 17+
A major Google Play Services change made in June 2019 has caused Branch's Android SDK (and various other cross-platform SDKs, e.g. Unity) to stop collecting Android AID.

To ensure Branch Deep Linking and Attribution continue to work, you must follow Google's update instructions [here](https://developers.google.com/android/guides/releases#june_17_2019).

If you are running Google Play Services versions below 17, no update is necessary.
:::

### Features

1. All events tracked with the Adobe SDK will automatically be sent to Branch without any extra work.
2. All core Branch functionality is accessible.
3. The SDK will automatically pick up the Adobe IDs.

### Requirements

- Android API level 16 or higher
- Adobe Core Platform

::: tip Branch SDK not Required
As the Adobe Branch extension is a wrapper that auto includes a sub-dependency for the Branch SDK, you do not need to - nor do we recommend to - implement the Branch SDK separately in your app.
:::

### Example Apps

An example app can be found in the AdobeBranchExtension-Android repository, in the `AdobeBranchExample`  
 project.

- [AdobeBranchExample Project](https://github.com/BranchMetrics/AdobeBranchExtension-Android/tree/master/AdobeBranchExample)
- [AdobeBranchExtension-Android Repository](https://github.com/BranchMetrics/AdobeBranchExtension-Android)

### Installation & Usage

::: danger
Note that the Adobe Experience Platform (AEP) SDK and AdobeMobileLibrary cannot coexist in the same project.
:::

Here's a brief outline of how to use the AdobeBranchExtension in your app:

1. Configure your Branch [Dashboard](https://branch.dashboard.branch.io/account-settings/app) and retrieve your Branch API Key.
2. For application integration, follow the instructions as described in the Branch Android SDK Basic Integration [guide](android-basic-integration.md) (ignore sections "Load Branch" and "Initialize Branch"). Make sure to update your app's manifest file with the Branch domains, app URI scheme and your Branch Key.
3. In the Adobe dashboard, activate Branch and add your Branch Key to your app's configuration:

   
4. Add the AdobeBranchExtension to your app's build.gradle.  
   `implementation 'io.branch.sdk.android:adobebranchextension:2.+'`
5. Register the Branch `AdobeBranchExtension` with `MobileCore` in `configureWithAppID`:

::: code-group

```java [Java]
public class DemoApplication extends Application {
	private static final String ADOBE_APP_ID = "YOUR_APP_ID";

	@Override
	public void onCreate() {
		super.onCreate();

		MobileCore.setApplication(this);
		MobileCore.configureWithAppID(ADOBE_APP_ID);
		MobileCore.setLogLevel(LoggingMode.ERROR);
		
		List<Class<? extends Extension>> extensions = new ArrayList<>();
		extensions.add(AdobeBranchExtension.EXTENSION);
		//Add other Adobe Extensions
		extensions.add(UserProfile.EXTENSION);
		extensions.add(Analytics.EXTENSION);
		extensions.add(Identity.EXTENSION);
		extensions.add(Lifecycle.EXTENSION);
		extensions.add(Signal.EXTENSION);
		MobileCore.registerExtensions(extensions, o -> {
			Log.d("Debug", "AEP Mobile SDK is initialized");
		});
	}
}
```

```kotlin [Kotlin]
class DemoApplication : Application() {
	companion object {
		private const val ADOBE_APP_ID = "YOUR_APP_ID"
	}

	override fun onCreate() {
		super.onCreate()

		MobileCore.setApplication(this)
		MobileCore.configureWithAppID(ADOBE_APP_ID)
		MobileCore.setLogLevel(LoggingMode.ERROR)

		val extensions = listOf(AdobeBranchExtension.EXTENSION, Identity.EXTENSION, Signal.EXTENSION, Lifecycle.EXTENSION, UserProfile.EXTENSION, Assurance.EXTENSION)

		MobileCore.registerExtensions(extensions) {
			android.util.Log.d("Debug", "AEP Mobile SDK is initialized")
		}
	}
}
```

:::

6. Initialize Branch session and register `BranchReferralInitListener` in your launcher activity's `onStart` method.

::: code-group

```java [Java]
AdobeBranch.initSession(new Branch.BranchReferralInitListener() {
  @Override
    public void onInitFinished(JSONObject referringParams, BranchError error) {
    try {
      // Retrieve Deep Link params and route to content appropriately
      if (referringParams.has("+clicked_branch_link") && referringParams.getBoolean("+clicked_branch_link")) {
        // Handle your Branch Deep Link routing in the callback
      }
    } catch (JSONException e) {
      // referringParams property doesn't exist
    }
  }
}, getIntent().getData(), this);
```

```kotlin [Kotlin]
AdobeBranch.initSession(object : Branch.BranchReferralInitListener {
	override fun onInitFinished(referringParams: JSONObject?, error: BranchError?) {
		try {
			// Retrieve Deep Link params and route to content appropriately
			referringParams?.let {
				if (it.has("+clicked_branch_link") && it.getBoolean("+clicked_branch_link")) {
					// Handle your Branch Deep Link routing in the callback
				}
			}
		} catch (e: JSONException) {
			// referringParams property doesn't exist
		}
  }
}, intent.data, this)
```

:::

For best practices related to routing, visit Branch's Deep Link Routing [guide](https://help.branch.io/).

By default, `AdobeBranch` will delay session initialization by 750 milliseconds in order to wait for Adobe Launch to initialize and to collect Adobe IDs from it. If you do not wish to delay session initialization, pass in 0 as the delay parameter in the method below:

::: code-group

```java [Java]
AdobeBranch.initSession(Branch.BranchReferralInitListener callback, Uri data, Activity activity, int delay);
```

```kotlin [Kotlin]
AdobeBranch.initSession(callback, intent.data, this, 0)
```

:::

### Implementing Branch Features

Once you've added the AdobeBranchExtension and Branch, you can always use Branch features directly (with the exception of `getAutoInstance`, `initSession`, `reInitSession`, `sessionBuilder` methods). You can learn about using the Branch features here, in the Branch documentation for [Android.](android-sdk-overview.md)

##### Call `reInitSession`

An example of how to call the `reInitSession` method:

```
@Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        this.setIntent(intent);
        AdobeBranch.reInitSession(this, branchInitSessionCallback);
    }
```

### Register an Event Allow List

Selectively track certain events within Branch by registering an allow list :

::: code-group

```java [Java]
List<AdobeBranch.EventTypeSource> apiAllowList = new ArrayList<>();
apiAllowList.add(new AdobeBranch.EventTypeSource("com.adobe.eventType.generic.track", "com.adobe.eventSource.requestContent"));
apiAllowList.add(new AdobeBranch.EventTypeSource("io.branch.eventType.generic.track", "io.branch.eventSource.requestContent"));

AdobeBranch.registerAdobeBranchEvents(apiAllowList);
```

```kotlin [Kotlin]
val apiAllowList = mutableListOf(
	AdobeBranch.EventTypeSource("com.adobe.eventType.generic.track", "com.adobe.eventSource.requestContent"),
	AdobeBranch.EventTypeSource("io.branch.eventType.generic.track", "io.branch.eventSource.requestContent")
)

AdobeBranch.registerAdobeBranchEvents(apiAllowList)
```

:::

Note that all Adobe Events are processed by default. To optionally track events with custom names you can register an allow list.

##### Additional Allow List Configuration Implementation Notes:

- Allow list configuration must happen after Adobe initialization has completed.
- An empty allow list will not listen for any events.
- A null allow list (default) will listen for all Adobe Events.
- A non-empty allow list will listen for only those events that are in the list.

### Disable Event Sharing between Adobe/Branch

To disable Event Sharing between Adobe and Branch (empty allow list), add the following code:

::: code-group

```java [Java]
// Disable event sharing by creating an empty allowlist 
List<AdobeBranch.EventTypeSource> apiAllowList = new ArrayList<>();
apiAllowList.add(new AdobeBranch.EventTypeSource("", ""));
AdobeBranch.registerAdobeBranchEvents(apiAllowList);
```

```kotlin [Kotlin]
// Disable event sharing by creating an empty allow list 
val apiAllowList = mutableListOf(AdobeBranch.EventTypeSource("", ""))
AdobeBranch.registerAdobeBranchEvents(apiAllowList)
```

:::

### Automatic: Track Action and State

When you track actions and states in Adobe Launch, the action and state messages are sent to Branch too and shown on the Branch Dashboard. This allows you to track the effectiveness of Branch Deep Link campaigns and viral sharing in your app's actions.

If the `trackAction()` function is used to track Adobe Events, custom events will come under "Analytics Track" on the Branch Dashboard. If the `dispatchEvent()` function is used to track Adobe Events, custom events will appear under custom names on the Branch Dashboard.

::: code-group

```java [Java]
private void doPurchase(View view) {
		Long timestamp = System.currentTimeMillis()/1000;

		Map<String, String> eventData = new HashMap<>();
		eventData.put(AdobeBranch.KEY_AFFILIATION, "Branch Metrics Company Store");
		eventData.put(AdobeBranch.KEY_COUPON, "SATURDAY NIGHT SPECIAL");
		eventData.put(AdobeBranch.KEY_CURRENCY, "USD");
		eventData.put(AdobeBranch.KEY_DESCRIPTION, mSwagModel.getDescription());
		eventData.put(AdobeBranch.KEY_REVENUE, String.valueOf(mSwagModel.getPrice()));
		eventData.put(AdobeBranch.KEY_SHIPPING, "0.99");
		eventData.put(AdobeBranch.KEY_TAX, String.valueOf(mSwagModel.getPrice() * 0.077));
		eventData.put(AdobeBranch.KEY_TRANSACTION_ID, UUID.randomUUID().toString());

		eventData.put("category", "Arts & Entertainment");
		eventData.put("product_id", String.valueOf(mSwagModel.getId()));
		eventData.put("sku", "sku-be-doo");
		eventData.put("timestamp", timestamp.toString());

		eventData.put("custom1", "Custom Data 1");
		eventData.put("custom2", "Custom Data 2");

		// dispatch the analytics event
		MobileCore.trackAction("PURCHASE", eventData);
}
```

```kotlin [Kotlin]
private fun doPurchase(view: View) {
	val timestamp = (System.currentTimeMillis() / 1000).toString()

	val eventData = mutableMapOf(
		AdobeBranch.KEY_AFFILIATION to "Branch Metrics Company Store",
		AdobeBranch.KEY_COUPON to "SATURDAY NIGHT SPECIAL",
		AdobeBranch.KEY_CURRENCY to "USD",
		AdobeBranch.KEY_DESCRIPTION to mSwagModel.description,
		AdobeBranch.KEY_REVENUE to mSwagModel.price.toString(),
		AdobeBranch.KEY_SHIPPING to "0.99",
		AdobeBranch.KEY_TAX to (mSwagModel.price * 0.077).toString(),
		AdobeBranch.KEY_TRANSACTION_ID to UUID.randomUUID().toString(),
		"category" to "Arts & Entertainment",
		"product_id" to mSwagModel.id.toString(),
		"sku" to "sku-be-doo",
		"timestamp" to timestamp,
		"custom1" to "Custom Data 1",
		"custom2" to "Custom Data 2"
	)

	// Dispatch the analytics event
	MobileCore.trackAction("PURCHASE", eventData)
}
```

:::

### Define an Allow List of Event Names

::: warning Conflict
You can either define an **allow** list **or** an **exclusion** list of events but **you can't define both**. If you don't configure any, all events will send to Branch, which is not ideal.
:::

::: code-group

```java [Java]
// Define the allow list of the event names
AdobeBranchExtension.configureEventAllowList(Arrays.asList("VIEW"));
```

```kotlin [Kotlin]
// Define the allow list of the event names
AdobeBranchExtension.configureEventAllowList(listOf("VIEW"))
```

:::

### Define an Exclusion List of Event Names

::: warning Conflict
You can either define an **exclusion** list **or** an **allow** list of events but **you can't define both**. If you don't configure any, all events will send to Branch, which is not ideal.
:::

::: code-group

```java [Java]
// Define the exclusion list of the event names
AdobeBranchExtension.configureEventExclusionList(Arrays.asList("VIEW"));
```

```kotlin [Kotlin]
// Define the exclusion list of the event names
AdobeBranchExtension.configureEventExclusionList(listOf("VIEW"))
```

:::

### Register the AdobeBranchExtension

Once the allow or exclusion event names list has been configured, the `AdobeBranchExtension` needs to be registered.

::: code-group

```java [Java]
// Register the AdobeBranchExtension
List<Class<? extends Extension>> extensions = new ArrayList<>();
extensions.add(AdobeBranchExtension.EXTENSION);
MobileCore.registerExtensions(extensions, o -> {
    PrefHelper.Debug("AEP Mobile SDK is initialized");
});
```

```kotlin [Kotlin]
// Register the AdobeBranchExtension
val extensions = listOf(AdobeBranchExtension.EXTENSION)
MobileCore.registerExtensions(extensions) {
    android.util.Log.d("Debug", "AEP Mobile SDK is initialized")
}
```

:::
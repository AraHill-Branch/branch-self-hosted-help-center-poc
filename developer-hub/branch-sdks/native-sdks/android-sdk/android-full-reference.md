---
title: "Android Full Reference"
slug: android-full-reference
---

### getInstance

| Method | Description |
| --- | --- |
| `synchronized public static Branch getInstance()` | Singleton method to return the pre-initialized object of the type `Branch`. Make sure your app is instantiating `BranchApp` before calling this method, or that you have created an instance of Branch already by calling `getAutoInstance(this.applicationContext)`. |

| Returns |
| --- |
| An initialized singleton `Branch` object instance. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance();
```

```kotlin [Kotlin]
Branch.getInstance()
```

:::

---

### getAutoInstance

| Method | Description |
| --- | --- |
| `synchronized public static Branch getAutoInstance(@NonNull Context context)` | Singleton method to return the pre-initialized, or newly initialize and return, a singleton object of the type `Branch`. Use this whenever you need to call a method directly on the `Branch` object. |
| `public static Branch getAutoInstance(@NonNull Context context, @NonNull String branchKey)` | Singleton method to return the pre-initialized, or newly initialize and return, a singleton object of the type `Branch`. Includes `branchKey` param. Use this whenever you need to call a method directly on the `Branch` object. |

| Argument | Type | Description |
| --- | --- | --- |
| `context` | `Context` | The `Context` object associated with this call. |
| `branchKey` | `String` | Your Branch Key as a string value. |

| Returns |
| --- |
| An initialized `Branch` object, either fetched from a pre-initialized instance within the singleton class, or a newly instantiated object where one was not already requested during the current app lifecycle. |

##### Example Usage

::: code-group

```java [Java]
protected static final String branchKey = "branch_key_here";

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();

		// Branch object initialization
		Branch.getAutoInstance(this.getApplicationContext, branchKey);
	}
}
```

```kotlin [Kotlin]
const val branchKey: String = "branch_key_here"
class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()
    
		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext, branchKey)
	}
}
```

:::

---

### setBranchRemoteInterface

::: warning Warning

::: warning Warning
This method is not currently recommended.
:::

:::

By default, the Branch Android SDK uses Java's `javax.net.ssl.HttpsURLConnection` for network requests. There are known issues with that interface and typically applications use third-party networking libraries, such as OkHttp, to customize their networking.

The Branch Android SDK provides an interface called `BranchRemoteInterface` to apply your networking customization to how Branch handles network requests.

| Method | Description |
| --- | --- |
| `public void setBranchRemoteInterface(BranchRemoteInterface remoteInterface)` | Sets a custom `BranchRemoteInterface` object for handling RESTful requests. Call this for implementing a custom network layer for handling communication between the Branch Android SDK and remote Branch server. |

| Argument | Type | Description |
| --- | --- | --- |
| `remoteInterface` | `BranchRemoteInterface` | A instance of the `BranchRemoteInterface` class. If null is passed, the Branch Android SDK will use its default. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setBranchRemoteInterface(@NonNull BranchRemoteInterface remoteInterface);
```

```kotlin [Kotlin]
Branch.getInstance().setBranchRemoteInterface(remoteInterface: BranchRemoteInterface)
```

:::

---

### getBranchRemoteInterface

This method is not currently recommended.

| Method | Description |
| --- | --- |
| `public BranchRemoteInterface getBranchRemoteInterface()` | Returns the `BranchRemoteInterface` object currently handling RESTful requests. |

| Returns |
| --- |
| A `BranchRemoteInterface` object. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().getBranchRemoteInterface();
```

```kotlin [Kotlin]
Branch.getInstance().getBranchRemoteInterface()
```

:::

---

### enableTestMode

| Method | Description |
| --- | --- |
| `public static void enableTestMode()` | Enables test mode for the Branch Android SDK. This will use your Branch Test Key(s). This is same as setting `io.branch.sdk.TestMode` to `True` in your `AndroidManifest.xml` file. **Note**: As of Branch Android SDK v5.0.1, the `enableTestMode()` method has changed. It still uses your Branch Test Key, but it will not log or randomize the device IDs. If you wish to enable logging, please use the `enableLogging()` method. If you wish to simulate installs, please see add a [test device](add-test-devices.md), then [reset](add-test-devices.md#section-resetting-your-test-device-data) your test device's data. |

##### Example Usage

::: code-group

```java [Java]
Branch.enableTestMode();
```

```kotlin [Kotlin]
Branch.enableTestMode()
```

:::

---

### disableTestMode

| Method | Description |
| --- | --- |
| `public static void disableTestMode()` | Disables test mode for the Branch Android SDK. |

##### Example Usage

::: code-group

```java [Java]
Branch.disableTestMode();
```

```kotlin [Kotlin]
Branch.disableTestMode()
```

:::

---

### disableAdNetworkCallouts

| Method | Description |
| --- | --- |
| `public void disableAdNetworkCallouts(boolean disabled)` | Disable (or re-enable) ad network callouts. This setting is persistent. |

| Argument | Type | Description |
| --- | --- | --- |
| `disabled` | `Boolean` | When set to `true`, ad network callouts are disabled. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().disableAdNetworkCallouts(true);
```

```kotlin [Kotlin]
Branch branch = Branch.getInstance()

branch.disableAdNetworkCallouts(true)
```

:::

---

### expectDelayedSessionInitialization

Branch expects session initialization to be started in the `LauncherActivity.onStart()` method. If session initialization has not been started/completed by the time **any** Activity resumes, Branch will auto-initialize. This allows Branch to keep an accurate count of all app sessions, including instances when the app is launched from a recent apps list and the first visible Activity is not `LauncherActivity`.

In certain scenarios, users may need to delay session initialization (e.g. to asynchronously retrieve some data that needs to be passed to Branch prior to session initialization). In those cases, use the `expectDelayedSessionInitialization()` method to temporarily disable auto self-initialization. Once the user initializes the session themselves, the flag will be reset and auto session initialization will be re-enabled.

| Method | Description |
| --- | --- |
| `public static void expectDelayedSessionInitialization(boolean expectDelayedInit)` | Temporarily disables auto session initialization until user initializes themselves. |

| Argument | Type | Description |
| --- | --- | --- |
| `expectDelayedInit` | `Boolean` | A boolean to set the expectation flag.. |

##### Example Usage

::: code-group

```java [Java]
// `expectDelayedSessionInitialization()` must be called before establishing the Branch singleton within your application class `onCreate()` method

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();

		// Delay session initialization 
		Branch.expectDelayedSessionInitialization();

		// Branch object initialization
		Branch.getAutoInstance(this.getApplicationContext);
	}
}
```

```kotlin [Kotlin]
// `expectDelayedSessionInitialization()` must be called before establishing the Branch singleton within your application class `onCreate()` method

class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()

		// Delay session initialization 
		Branch.expectDelayedSessionInitialization()

		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext)
	}
}
```

:::

---

### setAPIUrl

| Method | Description |
| --- | --- |
| `public static void setAPIUrl(String url)` | Sets a custom base URL for all calls to the Branch API. Requires HTTPS. |

| Argument | Type | Description |
| --- | --- | --- |
| `url` | `String` | The base URL that the Branch API uses. |

##### Example Usage

::: code-group

```java [Java]
Branch.setAPIUrl("https://example.com");
```

```kotlin [Kotlin]
Branch.setAPIUrl("https://example.com")
```

:::

---

### setCDNBaseUrl

| Method | Description |
| --- | --- |
| `public static void setCDNBaseUrl(String url)` | Sets a custom CDN base URL. |

| Argument | Type | Description |
| --- | --- | --- |
| `url` | `String` | The base URL for CDN endpoints. |

##### Example Usage

::: code-group

```java [Java]
Branch.setCDNBaseUrl("https://example.com");
```

```kotlin [Kotlin]
Branch.setCDNBaseUrl("https://example.com")
```

:::

---

### disableTracking (deprecated)

| Method | Description |
| --- | --- |
| `public void disableTracking(boolean disableTracking)` | Method to change the tracking state. If disabled, the Branch Android SDK will not track any user data or state. The SDK will not send any network calls, except for deep linking, when tracking is disabled. |

| Argument | Type | Description |
| --- | --- | --- |
| `disableTracking` | `Boolean` | When set to `true`, tracking is disabled. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().disableTracking(true);
```

```kotlin [Kotlin]
Branch.getInstance().disableTracking(true)
```

:::

---

### isTrackingDisabled (deprecated)

| Method | Description |
| --- | --- |
| `public boolean isTrackingDisabled()` | Checks to see whether tracking is disabled. |

| Returns |
| --- |
| A boolean whose value is `true` if tracking is disabled. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().isTrackingDisabled();
```

```kotlin [Kotlin]
Branch.getInstance().isTrackingDisabled()
```

:::

---

### setNetworkTimeout

| Method | Description |
| --- | --- |
| `public void setNetworkTimeout(int timeout)` | Sets the duration in milliseconds that the system should wait for a response before timing out any Branch API. Default is 5500 ms. |

| Argument | Type | Description |
| --- | --- | --- |
| `timeout` | `Int` | An integer value specifying the number of milliseconds to wait before considering the request to have timed out. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setNetworkTimeout(8000);
```

```kotlin [Kotlin]
Branch.getInstance().setNetworkTimeout(8000)
```

:::

---

### setNetworkConnectTimeout

| Method | Description |
| --- | --- |
| `public void setNetworkConnectTimeout(int connectTimeout)` | Sets the duration in milliseconds that the system should wait for initializing a network request. |

| Argument | Type | Description |
| --- | --- | --- |
| `connectTimeout` | `Int` | An integer value specifying the number of milliseconds to wait before considering the initialization to have timed out. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setNetworkConnectTimeout(6000);
```

```kotlin [Kotlin]
Branch.getInstance().setNetworkConnectTimeout(6000)
```

:::

---

### setNoConnectionRetryMax

| Method | Description |
| --- | --- |
| `public void setNoConnectionRetryMax(int retryMax)` | In cases of persistent no internet connection or offline modes, set a maximum number of attempts for the Branch request to be tried. Default is 3. |

| Argument | Type | Description |
| --- | --- | --- |
| `retryMax` | `Int` | An integer greater than 0 representing the number of retries to attempt. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setNoConnectionRetryMax(3);
```

```kotlin [Kotlin]
Branch.getInstance().setNoConnectionRetryMax(3)
```

:::

---

### setReferrerGclidValidForWindow

| Method | Description |
| --- | --- |
| `public void setReferrerGclidValidForWindow(long window)` | Sets the window for the referrer GCLID field. The GCLID will be persisted locally from the time it is set + window in milliseconds. Thereafter, it will be deleted. |

| Argument | Type | Description |
| --- | --- | --- |
| `window` | `Long` | A value of type long, specifying the number of milliseconds to wait before deleting the locally persisted GCLID value. Minimum is 0 milliseconds, maximum is 3 years. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setReferrerGclidValidForWindow(604800L);
```

```kotlin [Kotlin]
Branch.getInstance().setReferrerGclidValidForWindow(604800)
```

:::

---

### setLimitFacebookTracking

| Method | Description |
| --- | --- |
| `public void setLimitFacebookTracking(boolean isLimitFacebookTracking)` | Enables or disables app tracking with Branch or any other third parties that Branch uses internally. |

| Argument | Type | Description |
| --- | --- | --- |
| `isLimitFacebookTracking` | `Boolean` | Set to `true` to limit app tracking. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setLimitFacebookTracking(true);
```

```kotlin [Kotlin]
Branch.getInstance().setLimitFacebookTracking(true)
```

:::

---

### setDMAParamsForEEA

::: warning
**Warning:** `NULL` **by Default**

Please note that the 3 parameters passed to `setDMAParamsForEEA()` are all `NULL` by default.

**Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.**
:::

| Method | Description |
| --- | --- |
| `public void setDMAParamsForEEA(boolean eeaRegion, boolean adPersonalizationConsent, boolean adUserDataUsageConsent)` | Sets the value of parameters required by Google Conversion APIs for DMA Compliance in the EEA region. |

| Argument | Type | Description |
| --- | --- | --- |
| `eeaRegion` | `Boolean` | Set to `true` if user is **included** in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA.   Set to `false` if user is considered **excluded** from European Union regulations. |
| `adPersonalizationConsent` | `Boolean` | Set to `true` if user has **granted** consent for ads personalization.   Set to `false` if user has **denied** consent for ads personalization. |
| `adUserDataUsageConsent` | `Boolean` | Set to `true` if user has **granted** consent for 3P transmission of user-level data for ads.   Set to `false` is user has **denied** consent for 3P transmission of user-level data for ads. |

##### Example Usage

::: code-group

```java [Java]
// Example for an EEA resident who has denied both ad personalization and data usage consent
Branch.getInstance.setDMAParamsForEEA(true,false,false);
```

```kotlin [Kotlin]
// Example for an EEA resident who has denied both ad personalization and data usage consent
Branch.getInstance.setDMAParamsForEEA(true,false,false)
```

:::

::: code-group

```java [Java]
// Example for an EEA resident who has consented to ad personalization but denied data usage consent
Branch.getInstance.setDMAParamsForEEA(true,true,false);
```

```kotlin [Kotlin]
// Example for an EEA resident who has consented to ad personalization but denied data usage consent
Branch.getInstance.setDMAParamsForEEA(true,true,false)
```

:::

::: code-group

```java [Java]
// Example for an EEA resident who has denied ad personalization but granted data usage consent
Branch.getInstance.setDMAParamsForEEA(true,false,true);
```

```kotlin [Kotlin]
// Example for an EEA resident who has denied ad personalization but granted data usage consent
Branch.getInstance.setDMAParamsForEEA(true,false,true)
```

:::

Read more about the `setDMAParamsForEEA()` method and Google DMA compliance in Android Advanced Features [guide](android-advanced-features.md#google-dma-compliance).

---

### setRequestMetadata

| Method | Description |
| --- | --- |
| `public void setRequestMetadata(@NonNull String key, @NonNull String value)` | Add additional metadata in the form of key-value pairs to every network request that is made by the Branch Android SDK. This metadata can be used for analytics, troubleshooting, or to enhance the data set sent with requests. |

| Argument | Type | Description |
| --- | --- | --- |
| `key` | `String` | The key in the key-value pair. |
| `value` | `String` | The value in the key-value pair. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setRequestMetadata("$analytics_visitor_id", "000001");
```

```kotlin [Kotlin]
Branch.getInstance().setRequestMetadata("\$analytics_visitor_id", "000001")
```

:::

---

### addInstallMetadata

| Method | Description |
| --- | --- |
| `public Branch addInstallMetadata(@NonNull String key, @NonNull String value)` | Tag an install with a custom attribute. Add any key-value pairs that qualify or distinguish an install here. |

| Argument | Type | Description |
| --- | --- | --- |
| `key` | `String` | The key in the key-value pair. |
| `value` | `String` | The value in the key-value pair. |

##### Example Usage

::: code-group

```java [Java]
// Call this method before the `onStart()` method of the first activity

protected static final String branchKey = "branch_key_here";

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();

		// Branch object initialization
		Branch.getAutoInstance(this.getApplicationContext, branchKey);
    
		// Suggestion: call `addInstallMetadata()` right after object initialization
		Branch.getInstance().addInstallMetadata("install_attribute_name", "install_attribute_value");
	}
}
```

```kotlin [Kotlin]
// Call this method before the `onStart()` method of the first activity

class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()
		
		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext)
    
		// Suggestion: call `addInstallMetadata()` right after object initialization
		Branch.getInstance().addInstallMetadata("install_attribute_name", "install_attribute_value")
	}
}
```

:::

---

### setPreinstallCampaign

| Method | Description |
| --- | --- |
| `public Branch setPreinstallCampaign(@NonNull String preInstallCampaign)` | Wrapper method to add the pre-install campaign name. |

| Argument | Type | Description |
| --- | --- | --- |
| `preInstallCampaign` | `String` | The pre-install campaign. |

| Returns |
| --- |
| An initialized singleton Branch object instance with the pre-install campaign set. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setPreinstallCampaign("My Pre-Install Campaign");
```

```kotlin [Kotlin]
Branch.getInstance().setPreinstallCampaign("My Pre-Install Campaign")
```

:::

---

### setPreinstallPartner

| Method | Description |
| --- | --- |
| `public Branch setPreinstallPartner(@NonNull String preInstallPartner)` | Wrapper method to add the pre-install partner name. |

| Argument | Type | Description |
| --- | --- | --- |
| `preInstallPartner` | `String` | The pre-install partner. |

| Returns |
| --- |
| An initialized singleton Branch object instance with the pre-install partner set. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().setPreinstallCampaign("My Pre-Install Partner");
```

```kotlin [Kotlin]
Branch.getInstance().setPreinstallCampaign("My Pre-Install Partner")
```

:::

---

### setReferringLinkAttributionForPreinstalledAppsEnabled

| Method | Description |
| --- | --- |
| `public static void setReferringLinkAttributionForPreinstalledAppsEnabled()` | By default, Branch prioritizes pre-install attribution on pre-installed apps. This method enables referring URL attribution for pre-installed apps instead. |

##### Example Usage

::: code-group

```java [Java]
protected static final String branchKey = "branch_key_here";

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();

		// Enable referring URL attribution prior to initialization
		Branch.setReferringLinkAttributionForPreinstalledAppsEnabled();
    
		// Branch object initialization
		Branch.getAutoInstance(this.getApplicationContext, branchKey);
	}
}
```

```kotlin [Kotlin]
class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()
    
		// Enable referring URL attribution prior to initialization
		Branch.setReferringLinkAttributionForPreinstalledAppsEnabled()
		
		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext)
	}
}
```

:::

---

### isReferringLinkAttributionForPreinstalledAppsEnabled

| Method | Description |
| --- | --- |
| `public static boolean isReferringLinkAttributionForPreinstalledAppsEnabled()` | Returns whether referring URL attribution for pre-installed apps is enabled. |

| Returns |
| --- |
| A boolean whose value is `true` when the referring URL attribution for pre-installed apps is enabled. |

##### Example Usage

::: code-group

```java [Java]
Branch.isReferringLinkAttributionForPreinstalledAppsEnabled();
```

```kotlin [Kotlin]
Branch.isReferringLinkAttributionForPreinstalledAppsEnabled()
```

:::

---

### setIsUserAgentSync

| Method | Description |
| --- | --- |
| `public static void setIsUserAgentSync(boolean sync)` | Configures the behavior of the Branch Android SDK related to the synchronization of the user agent string. |

| Argument | Type | Description |
| --- | --- | --- |
| `sync` | `Boolean` | When set to `true`, the Branch Android SDK is instructed to synchronize and cache the user agent string immediately. This is done synchronously and must be executed on the main thread due to Android's threading model. |

##### Example Usage

::: code-group

```java [Java]
Branch.setIsUserAgentSync(true);
```

```kotlin [Kotlin]
Branch.setIsUserAgentSync(true)
```

:::

---

### addWhiteListedScheme

| Method | Description |
| --- | --- |
| `public Branch addWhiteListedScheme(String urlWhiteListPattern)` | The Branch Android SDK collects URLs from incoming intents for better attribution. The SDK extensively check for any sensitive data in the URL and skips it if found. However, the `addWhiteListedScheme()` method tells the SDK to collect only URLs that have a particular form. This method allows the application to specify a regular expression to use when determining whether to collect a URL. If the allowlist is not empty, the SDK will collect only the URLs that match the allowlist. |

| Argument | Type | Description |
| --- | --- | --- |
| `urlWhiteListPattern` | `String` | A regular expression in string format that filters which URLs are collected. |

| Returns |
| --- |
| A `Branch` instance for successful method calls. |

##### Example Usage

::: code-group

```java [Java]
protected static final String branchKey = "branch_key_here";

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();
    
		// Branch object initialization
		Branch.getAutoInstance(this.getApplicationContext, branchKey);
    
		// `addWhiteListedScheme()` should be called immediately after Branch object initialization
		Branch.getInstance().addWhiteListedScheme("{my-domain}");
	}
}
```

```kotlin [Kotlin]
class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()
		
		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext)
    
		// `addWhiteListedScheme()` should be called immediately after Branch object initialization
		Branch.getInstance().addWhiteListedScheme("{my-domain}")
	}
}
```

:::

---

### setWhiteListedSchemes

| Method | Description |
| --- | --- |
| `public Branch setWhiteListedSchemes(List>>` | The Branch Android SDK collects URLs from incoming intents for better attribution. The SDK extensively checks for any sensitive data in the URL and skips it if found. However, the `setWhiteListedSchemes()` method tells the SDK to collect only URLs that have a particular form. This method allows the application to specify a set of regular expressions to use when determining whether to collect a URL. If the allowlist is not empty, the SDK will collect only the URLs that match the allowlist. |

| Argument | Type | Description |
| --- | --- | --- |
| A regular expression in string format that filters which URLs are collected. | `List<String>` | A list of of regular expressions in string format that filter which URLs are collected. |

| Returns |
| --- |
| A `Branch` instance for successful method calls. |

##### Example Usage

::: code-group

```java [Java]
protected static final String branchKey = "branch_key_here";

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();
    
		// Branch object initialization
		Branch.getAutoInstance(this.getApplicationContext, branchKey);
    
		// `addWhiteListedScheme()` should be called immediately after Branch object initialization
		Branch.getInstance().setWhiteListedSchemes("{my-domain}", "^app-link");
	}
}
```

```kotlin [Kotlin]
class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()
		
		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext)
    
		// `addWhiteListedScheme()` should be called immediately after Branch object initialization
		Branch.getInstance().setWhiteListedSchemes("{my-domain}", "^app-link")
	}
}
```

:::

---

### addUriHostsToSkip

| Method | Description |
| --- | --- |
| `public Branch addUriHostsToSkip(String urlSkipPattern)` | The Branch Android SDK collects URLs from incoming intents for better attribution. The SDK extensively check for any sensitive data in the URL and skips it if found. This method allows applications specify SDK to skip any additional URL patterns to be skipped. |

| Argument | Type | Description |
| --- | --- | --- |
| `urlSkipPattern` | `String` | A URL pattern that the Branch Android SDK should skip when collecting data. |

| Returns |
| --- |
| A `Branch` instance for successful method calls. |

##### Example Usage

::: code-group

```java [Java]
protected static final String branchKey = "branch_key_here";

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();
    
		// Branch object initialization
		Branch.getAutoInstance(this.getApplicationContext, branchKey);
    
		// `addUriHostsToSkip()` should be called immediately after Branch object initialization
		Branch.getInstance().addUriHostsToSkip("{my-uri-host}");
	}
}
```

```kotlin [Kotlin]
class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()
		
		// Branch object initialization
		Branch.getAutoInstance(this.applicationContext)
    
		// `addUriHostsToSkip()` should be called immediately after Branch object initialization
		Branch.getInstance().addUriHostsToSkip("{my-uri-host}")
	}
}
```

:::

---

### setIdentity

This method may be helpful if you have your own user IDs for customers, or you want referral and event data to persist across platforms or uninstall/reinstall. Using this method can make it easier to know when users access your service from different devices.

**Warning**: Do not use this method to send PII to Branch. Read more about the `setIdentity()` method and PII in our Android Advanced Features [guide](android-advanced-features.md#set-user-identity).

| Method | Description |
| --- | --- |
| `public void setIdentity(@NonNull String userId)` | Identifies the current user to the Branch API by supplying a unique identifier as a string value. No callback. |
| `public void setIdentity(@NonNull String userId, @Nullable BranchReferralInitListener callback)` | Identifies the current user to the Branch API by supplying a unique identifier as a string value. Includes a callback. |

| Argument | Type | Description |
| --- | --- | --- |
| `userId` | `String` | A string value containing the unique identifier of the user. Should not exceed 127 characters. |
| `callback` | `BranchReferralInitListener` | A `BranchReferralInitListener` callback instance that will return the data associated with the user ID being assigned, if available. |

##### Example Usage

::: code-group

```java [Java]
Branch branch = Branch.getAutoInstance(this.getApplicationContext);

public void onClick(View v) {
	branch.setIdentity("unique_user_id", new BranchReferralInitListener() {
		@Override
		public void onInitFinished(JSONObject referringParams, BranchError error) {
			Log.i("Test", "install params = " + referringParams.toString());
		}
	});
}
```

```kotlin [Kotlin]
Branch branch = Branch.getAutoInstance(this.applicationContext)
branch.setIdentity("unique_user_id", new BranchReferralInitListener())
```

:::

---

### getLastAttributedTouchData

| Method | Description |
| --- | --- |
| `public void getLastAttributedTouchData(@NonNull BranchLastAttributedTouchDataListener callback)` | Gets the available last attributed touch data. The attribution window is set to the value last saved via `PreferenceHelper.setLATDAttributionWindow()`. If no value has been saved, Branch defaults to a 30 day attribution window (SDK sends `-1` to request the default from the server). |

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `BranchLastAttributedTouchDataListener` | An instance of `io.branch.referral.ServerRequestGetLATD.BranchLastAttributedTouchDataListener` to callback with last attributed touch data. |

##### Example Usage

::: code-group

```java [Java]
Branch branch = Branch.getInstance();

branch.getLastAttributedTouchData(new ServerRequestGetLATD.BranchLastAttributedTouchDataListener() {
	@Override
	public void onDataFetched(JSONObject jsonObject, BranchError error) {
		if (error == null) {
			promise.resolve(convertJsonToMap(jsonObject));
		} else {
			promise.reject(GENERIC_ERROR, error.getMessage());
		}
	}
}, 80);
```

```kotlin [Kotlin]
val branch = Branch.getInstance()

branch.getLastAttributedTouchData({ jsonObject, error ->
	if (error == null) {
		promise.resolve(convertJsonToMap(jsonObject))
	} else {
		promise.reject(GENERIC_ERROR, error.message)
	}
}, 80)
```

:::

---

### isUserIdentified

| Method | Description |
| --- | --- |
| `public boolean isUserIdentified()` | Indicates whether or not this user has a unique ID specified for them. Note that this is independent of installs. If you call `setIdentity()`, the device will have that identity associated with the user until logout is called. This includes persisting through uninstalls, as Branch tracks device ID. |

| Returns |
| --- |
| A boolean value that is `true` only if the user already has a unique ID set in the system. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().isUserIdentified();
```

```kotlin [Kotlin]
Branch.getInstance().isUserIdentified()
```

:::

---

### logout

| Method | Description |
| --- | --- |
| `public void logout()` | Call this method if you know that a different person is about to use the app. For example, if you allow users to log out and let their friends use the app, you should call `logout()` to notify Branch to create a new user for this device. This will clear the first and latest params, and a new session is created. |
| `public void logout(LogoutStatusListener callback)` | Call this method if you know that a different person is about to use the app. For example, if you allow users to log out and let their friends use the app, you should call `logout()` to notify Branch to create a new user for this device. This will clear the first and latest params, and a new session is created. Includes a callback. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().logout();
```

```kotlin [Kotlin]
Branch.getInstance().logout()
```

:::

##### Example Usage with Callback

::: code-group

```java [Java]
Branch.getInstance().logout(new Branch.LogoutStatusListener() {
	@Override
 	public void onLogoutFinished(boolean loggedOut, BranchError error) {
		Log.e("Tester", "onLogoutFinished " + loggedOut + " errorMessage " + error);
	}
});
```

```kotlin [Kotlin]
Branch.getInstance().logout { loggedOut, error ->
    Log.e("Tester", "onLogoutFinished $loggedOut errorMessage ${error?.message}")
}
```

:::

---

### getFirstReferringParams

| Method | Description |
| --- | --- |
| `public JSONObject getFirstReferringParams()` | Returns the parameters associated with the link that referred the user. This is only set once, when the user is first referred by a link. Think of this as the user referral parameters. It is also only set if `isReferrable` is equal to `true`, which by default is only true on a fresh install (not upgrade or reinstall). This will change on `setIdentity()` (if the user already exists from a previous device) and `logout()`. |

| Returns |
| --- |
| A `JSONObject` instance containing the install-time parameters as configured locally. |

##### Example Usage

::: code-group

```java [Java]
public static String getFirstReferringBranchUniversalObject() {
	BranchUniversalObject branchUniversalObject = null;
	Branch branchInstance = Branch.getInstance();
  
	if (branchInstance != null && branchInstance.getFirstReferringParams() != null) {
		JSONObject firstParam = branchInstance.getFirstReferringParams();
		try {
			if (firstParam.has("+clicked_branch_link") && firstParam.getBoolean("+clicked_branch_link")) {
				branchUniversalObject = BranchUniversalObject.createInstance(firstParam);
			}
		} catch (Exception ignore) {
		}
	}
  
	return _jsonObjectFromBranchUniversalObject(branchUniversalObject).toString();
}
```

```kotlin [Kotlin]
fun getFirstReferringBUO(): String {
	val branch = Branch.getInstance()
	val firstParams = branch?.getFirstReferringParams()

	val buo = if (firstParams?.has("+clicked_branch_link") == true && firstParams.getBoolean("+clicked_branch_link")) {
		BranchUniversalObject.createInstance(firstParams)
	} else {
		// Handle error
	}

	return buo.toString()
}
```

:::

---

### getFirstReferringParamsSync

| Method | Description |
| --- | --- |
| `public JSONObject getFirstReferringParamsSync()` | **Note**: This function must be called from a non-UI thread! If Branch has no install link data and this function is called, it will return data upon initializing, or until `LATCH_WAIT_UNTIL`. It is also only set if `isReferrable` is equal to `true`, which by default is only true on a fresh install (not upgrade or reinstall). This will change on `setIdentity()` (if the user already exists from a previous device) and `logout()`. |

| Returns |
| --- |
| A `JSONObject` instance containing the install-time parameters as configured locally. |

##### Example Usage

::: code-group

```java [Java]
public static String getFirstReferringBranchUniversalObject() {
	BranchUniversalObject branchUniversalObject = null;
	Branch branchInstance = Branch.getInstance();
  
	if (branchInstance != null && branchInstance.getFirstReferringParamsSync() != null) {
		JSONObject firstParam = branchInstance.getFirstReferringParamsSync();
		try {
			if (firstParam.has("+clicked_branch_link") && firstParam.getBoolean("+clicked_branch_link")) {
				branchUniversalObject = BranchUniversalObject.createInstance(firstParam);
			}
		} catch (Exception ignore) {
		}
	}
  
	return _jsonObjectFromBranchUniversalObject(branchUniversalObject).toString();
}
```

```kotlin [Kotlin]
fun getFirstReferringBUO(): String {
	val branch = Branch.getInstance()
	val firstParams = branch?.getFirstReferringParamsSync()

	val buo = if (firstParams?.has("+clicked_branch_link") == true && firstParams.getBoolean("+clicked_branch_link")) {
		BranchUniversalObject.createInstance(firstParams)
	} else {
		// Handle error
	}

	return buo.toString()
}
```

:::

---

### getLatestReferringParams

| Method | Description |
| --- | --- |
| `public JSONObject getLatestReferringParams()` | Returns the parameters associated with the link that referred the session. If a user clicks a link, and then opens the app, `initSession()` will return the parameters of the link, then set them as the latest parameters to be retrieved by this method. By default, sessions persist for the duration of time that the app is in focus. For example, if you minimize the app, these parameters will be cleared when `closeSession()` is called. |

| Returns |
| --- |
| A `JSONObject` instance containing the latest referring parameters as configured locally. |

##### Example Usage

::: code-group

```java [Java]
private void readDeepLinkData() {
	JSONObject sessionParams = Branch.getInstance().getLatestReferringParams();
  
	try {
		String sessionParamsString = sessionParams.toString(2);
    updateDisplay(sessionParamsString);
  } catch (JSONException e) {
    e.printStackTrace();
  }
}
```

```kotlin [Kotlin]
private fun readDeepLinkData() {
	val params = Branch.getInstance().latestReferringParams()

	try {
		val paramsStr = params.toString(2)
		updateDisplay(paramsStr)
	} catch (e: JSONException) {
		e.printStackTrace()
	}
}
```

:::

---

### getLatestReferringParamsSync

| Method | Description |
| --- | --- |
| `public JSONObject getLatestReferringParamsSync()` | **Note**: This function must be called from a non-UI thread! If Branch has not been initialized and this method is called, it will return data upon initialization, or until `LATCH_WAIT_UNTIL`. Returns the parameters associated with the link that referred the session. If a user clicks a link, and then opens the app, `initSession()` will return the parameters of the link, then set them as the latest parameters to be retrieved by this method. |

| Returns |
| --- |
| A `JSONObject` instance containing the latest referring parameters as configured locally. |

::: code-group

```java [Java]
private void readDeepLinkData() {
	JSONObject sessionParams = Branch.getInstance().getLatestReferringParamsSync();
  
	try {
		String sessionParamsString = sessionParams.toString(2);
    updateDisplay(sessionParamsString);
  } catch (JSONException e) {
    e.printStackTrace();
  }
}
```

```kotlin [Kotlin]
private fun readDeepLinkData() {
	val params = Branch.getInstance().latestReferringParamsSync()

	try {
		val paramsStr = params.toString(2)
		updateDisplay(paramsStr)
	} catch (e: JSONException) {
		e.printStackTrace()
	}
}
```

:::

---

### addFacebookPartnerParameterWithName

| Method | Description |
| --- | --- |
| `public void addFacebookPartnerParameterWithName(@NonNull String key, @NonNull String value)` | Add a Partner Parameter for Facebook. This allows you to pass additional hashed information to the SDK for [Facebook Advanced Matching](pass-hashed-information-for-facebook-advanced-matching.md) Once set, this parameter is attached to INSTALL, OPEN, and other events until they are cleared or the app restarts. |

| Argument | Type | Description |
| --- | --- | --- |
| `key` | `String` | Partner Parameter key name. See Facebook's documentation for details on valid parameters. |
| `value` | `String` | Partner Parameter value. See Facebook's documentation for details on valid parameters. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().addFacebookPartnerParameterWithName("key", "value");
```

```kotlin [Kotlin]
Branch.getInstance().addFacebookPartnerParameterWithName("key", "value")
```

:::

---

### addSnapPartnerParameterWithName

| Method | Description |
| --- | --- |
| `public void addSnapPartnerParameterWithName(@NonNull String key, @NonNull String value)` | Add a Partner Parameter for Snap. |

| Argument | Type | Description |
| --- | --- | --- |
| `key` | `String` | Partner Parameter key name. See Snap's documentation for details on valid parameters. |
| `value` | `String` | Partner Parameter value. See Snap's documentation for details on valid parameters. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().addSnapPartnerParameterWithName("key", "value");
```

```kotlin [Kotlin]
Branch.getInstance().addSnapPartnerParameterWithName("key", "value")
```

:::

---

### clearPartnerParameters

| Method | Description |
| --- | --- |
| `public void clearPartnerParameters()` | Clear all Partner Parameters that were previously set. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().clearPartnerParameters();
```

```kotlin [Kotlin]
Branch.getInstance().clearPartnerParameters()
```

:::

---

### getTrackingController

| Method | Description |
| --- | --- |
| `public TrackingController getTrackingController()` | Get the `TrackingController` instance being used. The `TrackingController` instance handles user data and determines if tracking is enabled or not. |

| Returns |
| --- |
| The instance of `TrackingController` being used. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().getTrackingController();
```

```kotlin [Kotlin]
Branch.getInstance().getTrackingController()
```

:::

---

### getDeviceInfo

| Method | Description |
| --- | --- |
| `public DeviceInfo getDeviceInfo()` | Get information about the device. |

| Returns |
| --- |
| An instance of `DeviceInfo`. The `DeviceInfo` class handles device parameters during Branch server requests. It is responsible for capturing device info, and updating server requests with that info. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().getDeviceInfo();
```

```kotlin [Kotlin]
Branch.getInstance().getDeviceInfo()
```

:::

---

### notifyNetworkAvailable

| Method | Description |
| --- | --- |
| `public void notifyNetworkAvailable()` | Notify Branch when a network is available to process the next request in the queue. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().notifyNetworkAvailable();
```

```kotlin [Kotlin]
Branch.getInstance().notifyNetworkAvailable()
```

:::

---

### enableLogging

| Method | Description |
| --- | --- |
| `public static void enableLogging()` | Enable sending debug messages for logging purposes. **Important**: Branch recommends that you use this method with your Branch Test Key and that you remove the method call before releasing to production. |

| Argument | Type | Description |
| --- | --- | --- |
| `level` | `BranchLogger.BranchLogLevel` | The desired minimum log level to be displayed. Can be ERROR, WARN, INFO, DEBUG, or VERBOSE. |
| `iBranchLogging` | `IBranchLoggingCallbacks` | An instance of `IBranchLoggingCallbacks` to directly receive all log messages from the SDK. |

##### Example Usage

::: code-group

```java [Java]
package com.example.android;

import android.app.Application;
import io.branch.referral.Branch;

public class CustomApplicationClass extends Application {
	@Override
	public void onCreate() {
		super.onCreate();

		// Branch logging for debugging
		Branch.enableLogging();

    // Adjust the desired log level (Android SDK versions v5.12.0+ only)
    Branch.enableLogging(BranchLogger.BranchLogLevel.VERBOSE);
		
    // Create a custom callback to forward log messages to
    IBranchLoggingCallbacks loggingCallbacks = new IBranchLoggingCallbacks() {
        @Override
        public void onBranchLog(String logMessage, String severityConstantName) {
            // Handle the log messages  
            Log.v( "CustomTag", logMessage);
        }
    };
    Branch.enableLogging(loggingCallbacks);
    
		// Branch object initialization
		Branch.getAutoInstance(this);
	}
}
```

```kotlin [Kotlin]
package com.example.android

import android.app.Application
import io.branch.referral.Branch

class CustomApplicationClass : Application() {
	override fun onCreate() {
		super.onCreate()

		// Branch logging for debugging
		Branch.enableLogging()
    
    // Adjust the desired log level (Android SDK versions v5.12.0+ only)
    Branch.enableLogging(BranchLogger.BranchLogLevel.VERBOSE)

    // Create a custom callback to forward log messages to
    val loggingCallbacks = IBranchLoggingCallbacks { logMessage, severityConstantName -> 
          // Handle the log messages  
        Log.v("CustomTag", logMessage)
    }
    Branch.enableLogging(loggingCallbacks)

		// Branch object initialization
		Branch.getAutoInstance(this)
	}
}
```

:::

---

### disableLogging

| Method | Description |
| --- | --- |
| `public static void disableLogging()` | Disable sending debug messages. |

##### Example Usage

::: code-group

```java [Java]
Branch.disableLogging();
```

```kotlin [Kotlin]
Branch.disableLogging()
```

:::

---

### registerView

| Method | Description |
| --- | --- |
| `public void registerView(BranchUniversalObject branchUniversalObject, BranchUniversalObject.RegisterViewStatusListener callback)` | Log a `BRANCH_STANDARD_EVENT.VIEW_ITEM` event. |

| Argument | Type | Description |
| --- | --- | --- |
| `branchUniversalObject` | `BranchUniversalObject` | The Branch Universal Object instance [associated](create-branch-objects-and-events.md#branch-event) with the `BRANCH_STANDARD_EVENT.VIEW_ITEM` event. |
| `callback` | `BranchUniversalObject.RegisterViewStatusListener` | An instance of `RegisterViewStatusListener` to listen to results of the operation. |

##### Example Usage

::: code-group

```java [Java]
val buo = BranchUniversalObject().setCanonicalIdentifier("content/12345")
buo.registerView { registered, error ->
	// Implementation here
}
```

```kotlin [Kotlin]
BranchUniversalObject buo = new BranchUniversalObject().setCanonicalIdentifier("content/12345");
buo.registerView((registered, error) -> {
	// Implementation here    
});
```

:::

---

### sessionBuilder

Learn more about using `sessionBuilder()` and initializing Branch in our Android Basic Integration [guide](android-basic-integration.md).

| Method | Description |
| --- | --- |
| `public static InitSessionBuilder sessionBuilder(Activity activity)` | Create a Branch session builder. Add configuration variables with the available methods in the returned `InitSessionBuilder` class instance. **Note**: Must call `init()` or `reInit()` after, otherwise `sessionBuilder()` has no effect. |

| Argument | Type | Description |
| --- | --- | --- |
| `activity` | `Activity` | The calling `Activity` for context. |

| Returns |
| --- |
| An instance of `InitSessionBuilder`. |

##### Example Usage

::: code-group

```java [Java]
// In LauncherActivity.java
package com.example.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import org.json.JSONObject;

import io.branch.indexing.BranchUniversalObject;
import io.branch.referral.Branch;
import io.branch.referral.BranchError;
import io.branch.referral.util.LinkProperties;

public class LauncherActivity extends AppCompatActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_launcher);
	}

	@Override
	protected void onStart() {
		super.onStart();
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

	@Override
	public void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		this.setIntent(intent);
		if (intent != null && intent.hasExtra("branch_force_new_session") && intent.getBooleanExtra("branch_force_new_session",false)) {
			Branch.sessionBuilder(this).withCallback(new BranchReferralInitListener() {
				@Override
				public void onInitFinished(JSONObject referringParams, BranchError error) {
					if (error != null) {
						Log.e("BranchSDK_Tester", error.getMessage());
					} else if (referringParams != null) {
						Log.i("BranchSDK_Tester", referringParams.toString());
					}
				}
			}).reInit();
		}
	}
}
```

```kotlin [Kotlin]
package com.example.android

import io.branch.indexing.BranchUniversalObject
import io.branch.referral.Branch
import io.branch.referral.BranchError
import io.branch.referral.util.LinkProperties

import android.util.Log;
import org.json.JSONObject;

override fun onStart() {
	super.onStart()
	Branch.sessionBuilder(this).withCallback { referringParams, error ->
		if (error == null) {
			// Option 1: log data
			Log.i("BRANCH SDK", referringParams.toString())

			// Option 2: save data to be used later
			val preferences = getSharedPreferences(
				"MyPreferences",
				 MODE_PRIVATE
			)
			preferences.edit().putString("branchData", referringParams.toString()).apply()

			// Option 3: navigate to page
			val intent = Intent(this@MainActivity, OtherActivity::class.java)
			startActivity(intent)

			// Option 4: display data
			Toast.makeText(this@MainActivity, referringParams.toString(), Toast.LENGTH_LONG).show()
		} else {
			Log.i("BRANCH SDK", error.message)
		}
	}.withData(this.intent.data).init()
}

override fun onNewIntent(intent: Intent?) {
	super.onNewIntent(intent)
	this.setIntent(intent);
	if (intent != null && intent.hasExtra("branch_force_new_session") && intent.getBooleanExtra("branch_force_new_session",false)) {
		Branch.sessionBuilder(this).withCallback { referringParams, error ->
			if (error != null) {
				Log.e("BranchSDK_Tester", error.message)
			} else if (referringParams != null) {
				Log.i("BranchSDK_Tester", referringParams.toString())
			}
		}.reInit()
	}
}
```

:::

---

### logEventWithPurchase

Learn more about relaying app store subscriptions and in-app purchases to Branch [here](relay-subscriptions-and-in-app-purchases.md).

| Method | Description |
| --- | --- |
| `public void logEventWithPurchase(@NonNull Context context, @NonNull Purchase purchase)` | Log a Branch Event for every app store subscription or in-app purchase event, without needing to create and populate a Branch Universal Object instance. |

| Argument | Type | Description |
| --- | --- | --- |
| `context` | `Context` | The relevant `Context` object. |
| `purchase` | `Purchase` | A `Purchase` object, retrieved from the Google Play Developer API. |

##### Example Usage

::: code-group

```java [Java]
Branch.getInstance().logEventWithPurchase(MainActivity.this, (Purchase) purchase);
```

```kotlin [Kotlin]
Branch.getInstance().logEventWithPurchase(this, purchase)
```

:::

---

### addContentItems

| Method | Description |
| --- | --- |
| `public BranchEvent addContentItems(BranchUniversalObject... contentItems)` | Associate specific `BranchUniversalObject` instances with an event. **Must be a** `BRANCH_STANDARD_EVENT`. |
| `public BranchEvent addContentItems(List>>` | Associate specific `BranchUniversalObject` instances with an event. **Must be a** `BRANCH_STANDARD_EVENT`. |

| Argument | Type | Description |
| --- | --- | --- |
| `contentItems` | `BranchUniversalObject...` or `List<BranchUniversalObject>` | The `BranchUniversalObject` instances associated with this event. |

| Returns |
| --- |
| The `BranchEvent` object which the `BranchUniversalObject` instance was added to, useful for chaining builder methods. |

##### Example Usage

::: code-group

```java [Java]
// Create a Branch Universal Object to associate with an event
BranchUniversalObject buo = new BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
  .setTitle("My Content Title")
  .setContentDescription("My Content Description")
  .setContentImageUrl("https://lorempixel.com/400/400")
  .setContentMetadata(new ContentMetadata().addCustomMetadata("key1", "value1"));

// Create a `BRANCH_STANDARD_EVENT`, in this case `ADD_TO_CART`
new BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
  .setCustomerEventAlias("my_custom_alias")
  .setDescription("Customer added item to cart")
  .setSearchQuery("Test Search query")
  .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
  .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
  .addContentItems(buo) // Add a populated BranchUniversalObject to the event
```

```kotlin [Kotlin]
// Create a Branch Universal Object to associate with an event
val buo = BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
  .setTitle("My Content Title")
  .setContentDescription("My Content Description")
  .setContentImageUrl("https://lorempixel.com/400/400")
  .setContentMetadata(ContentMetadata().addCustomMetadata("key1", "value1"))

// Create a `BRANCH_STANDARD_EVENT`, in this case `ADD_TO_CART`
BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
  .setCustomerEventAlias("my_custom_alias")
  .setDescription("Customer added item to cart")
  .setSearchQuery("Test Search query")
  .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
  .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
  .addContentItems(buo) // Add a populated `BranchUniversalObject` to the event
```

:::

---

### logEvent

| Method | Description |
| --- | --- |
| `public boolean logEvent(Context context)` | Log a `BranchEvent` to Branch for tracking and analytics. |
| `public boolean logEvent(Context context, final BranchLogEventCallback callback)` | Log a `BranchEvent` to Branch for tracking and analytics. This method provides a callback once the event is logged. |

| Argument | Type | Description |
| --- | --- | --- |
| `context` | `Context` | Current context. |
| `callback` | `BranchLogEventCallback` | Callback returned when event is logged. |

| Returns |
| --- |
| A boolean that is `true` if the Branch Event was successfully logged. |

##### Example Usage

::: code-group

```java [Java]
// Create a `BranchUniversalObject` (optional)
BranchUniversalObject buo = new BranchUniversalObject().setCanonicalIdentifier("content/12345");

// Create a `BRANCH_STANDARD_EVENT`, in this case `ADD_TO_CART`
new BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
  .setCustomerEventAlias("my_custom_alias")
  .setDescription("Customer added item to cart")
  .setSearchQuery("Test Search query")
  .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
  .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
  .addContentItems(buo) // Associate `BranchUniversalObject` with event
  .logEvent(this.getApplicationContext); // Log the event
```

```kotlin [Kotlin]
// Create a `BranchUniversalObject` (optional)
val buo = BranchUniversalObject().setCanonicalIdentifier("content/12345")

// Create a `BRANCH_STANDARD_EVENT`, in this case `ADD_TO_CART`
BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
  .setCustomerEventAlias("my_custom_alias")
  .setDescription("Customer added item to cart")
  .setSearchQuery("Test Search query")
  .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
  .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
  .addContentItems(buo) // Associate `BranchUniversalObject` with event
  .logEvent(this.applicationContext) // Log the event
```

:::

##### Example Usage With Callback

::: code-group

```java [Java]
// Create a `BranchUniversalObject` (optional)
BranchUniversalObject buo = new BranchUniversalObject().setCanonicalIdentifier("content/12345");

// Create a `BRANCH_STANDARD_EVENT`, in this case `ADD_TO_CART`
new BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
  .setCustomerEventAlias("my_custom_alias")
  .setDescription("Customer added item to cart")
  .setSearchQuery("Test Search query")
  .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
  .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
  .addContentItems(buo) // Associate `BranchUniversalObject` with event
  .logEvent(MainActivity.this, new BranchEvent.BranchLogEventCallback() {
		@Override
    public void onSuccess(int responseCode) {
      Toast.makeText(getApplicationContext(), "Sent Branch Commerce Event: " + responseCode, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onFailure(Exception e) {
      Log.d("BranchSDK_Tester", e.toString());
      Toast.makeText(getApplicationContext(), "Error sending Branch Commerce Event: " + e.toString(), Toast.LENGTH_SHORT).show();
    }
	});
```

```kotlin [Kotlin]
// Create a `BranchUniversalObject` (optional)
val buo = BranchUniversalObject().setCanonicalIdentifier("content/12345")

// Create a `BRANCH_STANDARD_EVENT`, in this case `ADD_TO_CART`
BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART).apply {
  setCustomerEventAlias("my_custom_alias")
  setDescription("Customer added item to cart")
  setSearchQuery("Test Search query")
  addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
  addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
  addContentItems(buo) // Associate `BranchUniversalObject` with event
  logEvent(MainActivity.this, object : BranchEvent.BranchLogEventCallback {
    override fun onSuccess(responseCode: Int) {
      Toast.makeText(applicationContext, "Sent Branch Commerce Event: $responseCode", Toast.LENGTH_SHORT).show()
    }

    override fun onFailure(e: Exception) {
      Log.d("BranchSDK_Tester", e.toString())
      Toast.makeText(applicationContext, "Error sending Branch Commerce Event: ${e.toString()}", Toast.LENGTH_SHORT).show()
    }
  })
}
```

:::

---

### registerView

| Method | Description |
| --- | --- |
| `public void registerView()` | Mark the content referred to by this object as "viewed". This increments the view count of the content referred to by this object. |
| `public void registerView(@Nullable RegisterViewStatusListener callback)` | Mark the content referred to by this object as "viewed". This increments the view count of the content referred to by this object. This method provides a callback once the view is registered. |

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `RegisterViewStatusListener` | Callback returned when view is registered. |

##### Example Usage

::: code-group

```java [Java]
// Create a Branch Universal Object
BranchUniversalObject buo = new BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
  
// Increment view count for the Branch Universal Object
buo.registerView();
```

```kotlin [Kotlin]
// Create a Branch Universal Object
val buo = BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")

// Increment view count for the Branch Universal Object
buo.registerView()
```

:::

---

### getShortUrl

| Method | Description |
| --- | --- |
| `public String getShortUrl(@NonNull Context context, @NonNull LinkProperties linkProperties)` | Create a short URL for a specific `BranchUniversalObject` instance and associate a `LinkProperties` object with it. This function runs synchronously. |
| `public String getShortUrl(@NonNull Context context, @NonNull LinkProperties linkProperties, boolean defaultToLongUrl)` | Create a short URL for a specific `BranchUniversalObject` instance and associate a `LinkProperties` object with it. This function runs synchronously. |

| Argument | Type | Description |
| --- | --- | --- |
| `context` | `Context` | The current context. |
| `linkProperties` | `LinkProperties` | The `LinkProperties` to associate with the URL. |
| `defaultToLongUrl` | `boolean` | Specifies if a long URL should be returned in the case of a link creation error. If set to false, null is returned if link creation fails. |

| Returns |
| --- |
| The short URL generated for the `BranchUniversalObject` content. By default, null is returned if link creation fails. |

##### Example Usage

::: code-group

```java [Java]
// Create a Branch Universal Object
BranchUniversalObject buo = new BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
 
// Create a Link Properties instance
LinkProperties lp = new LinkProperties()
	.setChannel("facebook")
	.setFeature("sharing")
	.setCampaign("content 123 launch")
	.setStage("new user")
	.addControlParameter("$desktop_url", "https://example.com/home")
	.addControlParameter("custom", "data")
	.addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));
  
// Generate a short URL for the Branch Universal Object
String url = buo.getShortUrl(this.getApplicationContext, lp);
```

```kotlin [Kotlin]
// Create a Branch Universal Object
val buo = BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
  
// Create a Link Properties instance
val lp = LinkProperties()
	.setChannel("facebook")
	.setFeature("sharing")
	.setCampaign("content 123 launch")
	.setStage("new user")
	.addControlParameter("$desktop_url", "http://example.com/home")
	.addControlParameter("custom", "data")
	.addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()))

// Generate a short URL for the Branch Universal Object
buo.getShortUrl(this.applicationContext, lp)
```

:::

##### Example Usage With Long URL Fallback

::: code-group

```java [Java]
// Create a Branch Universal Object
BranchUniversalObject buo = new BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
 
// Create a Link Properties instance
LinkProperties lp = new LinkProperties()
	.setChannel("facebook")
	.setFeature("sharing")
	.setCampaign("content 123 launch")
	.setStage("new user")
	.addControlParameter("$desktop_url", "https://example.com/home")
	.addControlParameter("custom", "data")
	.addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));
  
// Generate a short URL for the Branch Universal Object
String url = buo.getShortUrl(this.getApplicationContext, new LinkProperties(), true);
```

```kotlin [Kotlin]
// Create a Branch Universal Object
val buo = BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
  
// Create a Link Properties instance
val lp = LinkProperties()
	.setChannel("facebook")
	.setFeature("sharing")
	.setCampaign("content 123 launch")
	.setStage("new user")
	.addControlParameter("$desktop_url", "http://example.com/home")
	.addControlParameter("custom", "data")
	.addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()))

// Generate a short URL for the Branch Universal Object
buo.getShortUrl(this.applicationContext, lp, true)
```

:::

---

### share

| Method | Description |
| --- | --- |
| `public void share(@NonNull Activity activity, @NonNull BranchUniversalObject buo, @NonNull LinkProperties linkProperties, @Nullable BranchNativeLinkShareListener callback, String title, String subject)` | Show the user a Native Sharesheet. Can specify the Branch Universal Object, Branch Link Properties, title and subject of dialog. Includes a callback. |

| Argument | Type | Description |
| --- | --- | --- |
| `activity` | `Activity` | The relevant Activity. |
| `buo` | `BranchUniversalObject` | The `BranchUniversalObject` object for generating the Branch Link. |
| `linkProperties` | `LinkProperties` | The Branch Link Properties object to associate with the Branch Link. |
| `callback` | `Branch.BranchNativeLinkShareListener` | Callback. |
| `title` | `String` | A String object for setting title in native chooser dialog. |
| `subject` | `String` | A String object for setting subject in native chooser dialog. |

##### Example Usage

::: code-group

```java [Java]
private void  shareBranchLink(){
        // Create a Branch Universal Object
        BranchUniversalObject buo = new BranchUniversalObject()
                .setCanonicalIdentifier("content/12345");
        // Create a Link Properties instance
        LinkProperties lp = new LinkProperties()
                .setChannel("facebook")
                .setFeature("sharing")
                .setCampaign("content 123 launch")
                .setStage("new user")
                .addControlParameter("$desktop_url", "https://example.com/home")
                .addControlParameter("custom", "data")
                .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));
        
        // Show Sharesheet
       Branch.getInstance().share(MainActivity.this, branchUniversalObject, lp, new Branch.BranchNativeLinkShareListener() {
                    @Override
                    public void onLinkShareResponse(String sharedLink, BranchError error) {}
                    @Override
                    public void onChannelSelected(String channelName) { }
                },
                "Sharing Branch Short URL",
                "Using Native Chooser Dialog");
    }
```

```kotlin [Kotlin]
@RequiresApi(Build.VERSION_CODES.LOLLIPOP_MR1)
    private fun shareBranchLink(@NonNull activity:Activity ) {

        // Create a Branch Universal Object
        val buo = BranchUniversalObject()
            .setCanonicalIdentifier("content/12345")

        // Create a Link Properties instance
        val lp = LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")

            // `$deeplink_path` routes users to a specific Activity
            .addControlParameter("\$deeplink_path", "color block page")

            // You can set the `blockColor` parameter to `Blue`, `Yellow`, `Red`, `Green` or `White` to modify the color block page.
            .addControlParameter("blockColor", "Green")

            .addControlParameter("\$desktop_url", "https://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Calendar.getInstance().timeInMillis.toString())

        Branch.getInstance().share(
            this@MainActivity,
            buo,
            lp,
            object : BranchNativeLinkShareListener {
                override fun onLinkShareResponse(sharedLink: String, error: BranchError) {}
                override fun onChannelSelected(channelName: String) { }
            },
            "Sharing Branch Short URL",
            "Using Native Chooser Dialog"
        )
    }
```

:::

**Note**: If you are using the `BranchNativeLinkShareListener` object when calling the `share()` method, make sure to add the `SharingBroadcastReceiver` class to your `AndroidManifest.xml` file:

```
<receiver android:name="io.branch.receivers.SharingBroadcastReceiver" android:exported="true">
           <intent-filter>
               <action android:name="EXTRA_CHOSEN_COMPONENT" />
           </intent-filter>
</receiver>
```

---

### showShareSheet (deprecated)

| Method | Description |
| --- | --- |
| `public void showShareSheet(@NonNull Activity activity, @NonNull LinkProperties linkProperties, @NonNull ShareSheetStyle style, @Nullable Branch.BranchLinkShareListener callback)` | Show the user a Sharesheet. Can specify the link properties and style. Includes a callback. |
| `public void showShareSheet(@NonNull Activity activity, @NonNull LinkProperties linkProperties, @NonNull ShareSheetStyle style, @Nullable Branch.BranchLinkShareListener callback, Branch.IChannelProperties channelProperties)` | Show the user a Sharesheet. Can specific the link properties and style, as well as the channel properties. Includes a callback. |

| Argument | Type | Description |
| --- | --- | --- |
| `activity` | `Activity` | The relevant Activity. |
| `linkProperties` | `LinkProperties` | The Branch Link Properties object to associate with the Branch Link. |
| `style` | `ShareSheetStyle` | A `ShareSheetStyle` object describing your Sharesheet styles. |
| `callback` | `Branch.BranchLinkShareListener` | Callback. |

##### Example Usage

::: code-group

```java [Java]
// Create a Branch Universal Object
val buo = BranchUniversalObject()
  .setCanonicalIdentifier("content/12345")
  
// Create a Link Properties instance
LinkProperties lp = new LinkProperties()
	.setChannel("facebook")
	.setFeature("sharing")
	.setCampaign("content 123 launch")
	.setStage("new user")
	.addControlParameter("$desktop_url", "https://example.com/home")
	.addControlParameter("custom", "data")
	.addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));

// Create an object to store Sharesheet styles
ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
	.setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
	.setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
	.addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
	.addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
	.setAsFullWidthStyle(true)
	.setSharingTitle("Share With");

// Show Sharesheet based on user behavior
buo.showShareSheet(this,lp,shareSheetStyle,new Branch.ExtendedBranchLinkShareListener() {
  	@Override
    public void onShareLinkDialogLaunched() {
    }
    @Override
    public void onShareLinkDialogDismissed() {
    }
    @Override
    public void onLinkShareResponse(String sharedLink, String sharedChannel, BranchError error) {
    }
    @Override
    public void onChannelSelected(String channelName) {
    }
    @Override
    public boolean onChannelSelected(String channelName, BranchUniversalObject buo, LinkProperties linkProperties) {
        return false;
    }
});
```

```kotlin [Kotlin]
private fun shareBranchLink() {
    
	// Create a Branch Universal Object
  val buo = BranchUniversalObject()
		.setCanonicalIdentifier("content/12345")
  
  // Create a Link Properties instance
  val lp = LinkProperties()
		.setChannel("facebook")
		.setFeature("sharing")
		.setCampaign("content 123 launch")
		.setStage("new user")

		// `$deeplink_path` routes users to a specific Activity
		.addControlParameter("\$deeplink_path", "color block page")

		// You can set the `blockColor` parameter to `Blue`, `Yellow`, `Red`, `Green` or `White` to modify the color block page.
		.addControlParameter("blockColor", "Green")

		.addControlParameter("\$desktop_url", "https://example.com/home")
		.addControlParameter("custom", "data")
		.addControlParameter("custom_random", Calendar.getInstance().timeInMillis.toString())

	// Create an object to store Sharesheet styles
  val ss = ShareSheetStyle(this@MainActivity, "Check this out!", "This stuff is awesome: ")
		.setCopyUrlStyle(resources.getDrawable(androidx.appcompat.R.drawable.abc_ic_menu_copy_mtrl_am_alpha), "Copy", "Added to clipboard")
		.setMoreOptionStyle(resources.getDrawable(androidx.appcompat.R.drawable.abc_ic_search_api_material), "Show more")
		.addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
		.addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
		.addPreferredSharingOption(SharingHelper.SHARE_WITH.MESSAGE)
		.addPreferredSharingOption(SharingHelper.SHARE_WITH.HANGOUT)
		.setAsFullWidthStyle(true)
		.setSharingTitle("Share With")

	// Show Sharesheet based on user behavior
  buo.showShareSheet(this, lp, ss, object : Branch.BranchLinkShareListener {
		override fun onShareLinkDialogLaunched() {}
		override fun onShareLinkDialogDismissed() {}
		override fun onLinkShareResponse(sharedLink: String?, sharedChannel: String?, error: BranchError?) {}
		override fun onChannelSelected(channelName: String) {}
	})
}
```

:::

---

### getReferredBranchUniversalObject

| Method | Description |
| --- | --- |
| `public static BranchUniversalObject getReferredBranchUniversalObject()` | Get the `BranchUniversalObject` associated with the latest deep linking. This should retrieve the exact object used for creating the deep link. Call this function after initializing a Branch session. |

| Returns |
| --- |
| The `BranchUniversalObject` associated with the latest Branch Deep Link, or `null` if the session was not started by a Branch Deep Link click. |

##### Example Usage

::: code-group

```java [Java]
BranchUniversalObject buo = new BranchUniversalObject().setCanonicalIdentifier("content/12345");
buo.getReferredBranchUniversalObject();
```

```kotlin [Kotlin]
val buo = BranchUniversalObject().setCanonicalIdentifier("content/12345")
  
buo.getReferredBranchUniversalObject()
```

:::

---

### getQRCodeAsData

| Method | Description |
| --- | --- |
| `public void getQRCodeAsData(@NonNull Context context, @NonNull BranchUniversalObject branchUniversalObject, @NonNull LinkProperties linkProperties, @NonNull final BranchQRCodeDataHandler callback) throws IOException` | Get your Branch QR Code as data. |

| Argument | Type | Description |
| --- | --- | --- |
| `context` | `Context` | Current context. |
| `branchUniversalObject` | `BranchUniversalObject` | The Branch Universal Object associated with the Branch QR Code. |
| `linkProperties` | `LinkProperties` | The Link Properties instance associated with the Branch QR Code. |
| `callback` | `BranchQRCodeDataHandler` | Callback. |

##### Example Usage

::: code-group

```java [Java]
// Create a `BranchQRCode` object and set the optional properties
BranchQRCode qrCode = new BranchQRCode()
	.setCodeColor("#a4c639")
  .setBackgroundColor(Color.WHITE)
 	.setMargin(1)
	.setWidth(512)
	.setImageFormat(BranchQRCode.BranchImageFormat.PNG)
	.setCenterLogo("https://cdn.branch.io/branch-assets/1598575682753-og_image.png");

// Create a Branch Universal Object
BranchUniversalObject buo = new BranchUniversalObject()
	.setCanonicalIdentifier("content/12345")
	.setTitle("My QR Code");

// Create a `LinkProperties` instance
LinkProperties lp = new LinkProperties()
	.setChannel("facebook")
	.setFeature("qrCode")
	.setCampaign("content 123 launch");

// Access your Branch QR Code
qrCode.getQRCodeAsData(this.getApplicationContext, buo, lp, new BranchQRCode.BranchQRCodeDataHandler() {
	@Override
	public void onSuccess(Bitmap qrCodeData) {
		// Do something with Branch QR Code
	}

	@Override
	public void onFailure(Exception e) {
		Log.d("Failed to get QR code", String.valueOf(e));
	}
});
```

```kotlin [Kotlin]
// Create a `BranchQRCode` object and set the optional properties
val qrCode = BranchQRCode()
	.setCodeColor("#a4c639")
	.setBackgroundColor(Color.WHITE)
	.setMargin(1)
	.setWidth(512)
	.setImageFormat(BranchQRCode.BranchImageFormat.JPEG)
	.setCenterLogo("https://cdn.branch.io/branch-assets/1598575682753-og_image.png")
  
// Create a Branch Universal Object
val buo = BranchUniversalObject()
	.setCanonicalIdentifier("content/12345")
	.setTitle("My Content Title")
	.setContentDescription("My Content Description")
	.setContentImageUrl("https://lorempixel.com/400/400")

// Create a `LinkProperties` instance
val lp = LinkProperties()
	.setChannel("facebook")
	.setFeature("sharing")
	.setCampaign("content 123 launch")
	.setStage("new user")
  
// Access your Branch QR Code
qrCode.getQRCodeAsData(this.applicationContext, buo, lp, object : BranchQRCodeDataHandler<Any?> {
	override fun onSuccess(p0: ByteArray?) {
		// Do something with Branch QR Code here
}

	override fun onFailure(e: Exception) {
		Log.d("Failed to get QR code", e.toString())
	}
})
```

:::

---

### getQRCodeAsImage

| Method | Description |
| --- | --- |
| `public void getQRCodeAsImage(@NonNull Activity activity, @NonNull BranchUniversalObject branchUniversalObject, @NonNull LinkProperties linkProperties, @NonNull final BranchQRCodeImageHandler callback) throws IOException` | Get your Branch QR Code as an image. |

| Argument | Type | Description |
| --- | --- | --- |
| `activity` | `Activity` | The relevant Activity. |
| `branchUniversalObject` | `BranchUniversalObject` | The Branch Universal Object associated with the Branch QR Code. |
| `linkProperties` | `LinkProperties` | The Link Properties instance associated with the Branch QR Code. |
| `callback` | `BranchQRCodeImageHandler` | Callback. |

##### Example Usage

::: code-group

```java [Java]
// Create a `BranchQRCode` object and set the optional properties
BranchQRCode qrCode = new BranchQRCode() //All QR code settings are optional
	.setCodeColor("#a4c639")
  .setBackgroundColor(Color.WHITE)
 	.setMargin(1)
	.setWidth(512)
	.setImageFormat(BranchQRCode.BranchImageFormat.PNG)
	.setCenterLogo("https://cdn.branch.io/branch-assets/1598575682753-og_image.png");

// Create a Branch Universal Object
BranchUniversalObject buo = new BranchUniversalObject()
	.setCanonicalIdentifier("content/12345")
	.setTitle("My QR Code");

// Create a `LinkProperties` instance
LinkProperties lp = new LinkProperties()
	.setChannel("facebook")
	.setFeature("qrCode")
	.setCampaign("content 123 launch");

// Access your Branch QR Code
qrCode.getQRCodeAsImage(MainActivity.this, buo, lp, new BranchQRCode.BranchQRCodeImageHandler() {
	@Override
	public void onSuccess(Bitmap qrCodeImage) {
		// Do something with Branch QR Code
	}

	@Override
	public void onFailure(Exception e) {
		Log.d("Failed to get QR code", String.valueOf(e));
	}
});
```

```kotlin [Kotlin]
// Create a `BranchQRCode` object and set the optional properties
val qrCode = BranchQRCode()
	.setCodeColor("#a4c639")
	.setBackgroundColor(Color.WHITE)
	.setMargin(1)
	.setWidth(512)
	.setImageFormat(BranchQRCode.BranchImageFormat.JPEG)
	.setCenterLogo("https://cdn.branch.io/branch-assets/1598575682753-og_image.png")
  
// Create a Branch Universal Object
val buo = BranchUniversalObject()
	.setCanonicalIdentifier("content/12345")
	.setTitle("My Content Title")
	.setContentDescription("My Content Description")
	.setContentImageUrl("https://lorempixel.com/400/400")

// Create a `LinkProperties` instance
val lp = LinkProperties()
	.setChannel("facebook")
	.setFeature("sharing")
	.setCampaign("content 123 launch")
	.setStage("new user")
  
// Access your Branch QR Code
qrCode.getQRCodeAsImage(this@MainActivity, buo, lp, object : BranchQRCodeImageHandler<Any?> {
	override fun onSuccess(qrCodeImage: Bitmap) {
		// Do something with Branch QR Code here
	}

	override fun onFailure(e: Exception) {
		Log.d("Failed to get QR code", e.toString())
	}
})
```

:::

---

### setFBAppID

| Method | Description |
| --- | --- |
| `public static void setFBAppID(String fbAppID)` | Set your app's Facebook App ID, which is used for fetching the Meta Install Referrer. |

| Argument | Type | Description |
| --- | --- | --- |
| `fbAppID` | `String` | Your app's Facebook App ID. |

##### Example Usage

::: code-group

```java [Java]
        Branch.setFBAppID("123456789");
```

```kotlin [Kotlin]
        Branch.setFBAppID("123456789")
```

:::

---

### useEUEndpoint

| Method | Description |
| --- | --- |
| `public static void useEUEndpoint()` | Send requests to EU endpoints. This feature must also be enabled on the server side, otherwise the server will drop requests. Contact your account manager for details. |

##### Example Usage

::: code-group

```java [Java]
Branch.useEUEndpoint();
```

```kotlin [Kotlin]
Branch.useEUEndpoint()
```

:::

---

### setConsumerProtectionAttributionLevel

| Method | Description |
| --- | --- |
| `public void setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel level)` | Set the Consumer Protection Preference level. |
| `public void setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel level, @Nullable TrackingStateCallback callback)` | Set the Consumer Protection Preference level, with an optional callback. |

| Argument | Type | Description |
| --- | --- | --- |
| `level` | `BranchAttributionLevel` | The Consumer Protection Preference level to set for the user, based on the consent they have granted you. |
| `callback` | `TrackingStateCallback` | Callback. |

| Consumer Preference Level | Description | Value to Pass |
| --- | --- | --- |
| Full Attribution | This is the **default** level. This level includes advertising IDs and device IDs, as well as other data. | `FULL` |
| Privacy Attribution | This level does not include advertising IDs, but does include data from privacy frameworks like SKAN and Privacy Sandbox. | `REDUCED` |
| Analytics Only | This level includes device IDs, but does not include data from privacy frameworks. | `MINIMAL` |
| No Attribution | This level only includes deterministic deep linking. Appropriate for users that fall under GDPR or CCPA regulations. | `NONE` |

##### Example Usage

::: code-group

```java [Java]
// Set consumer preference level to "No Attribution"
Branch.getInstance().setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel.NONE);
```

```kotlin [Kotlin]
// Set consumer preference level to "Analytics Only"
Branch.getInstance().setConsumerProtectionAttributionLevel(Defines.BranchAttributionLevel.MINIMAL)
```

:::

To learn more about setting Consumer Protection Preference levels, visit our [guide](consumer-protection-preferences.md).
---
title: "Android Advanced Features"
slug: android-advanced-features
---

## Overview

The Branch Android SDK exposes a set of methods specifically made for Android apps, which you can call using Kotlin or Java.

## Prerequisites

Before you get started implementing the features on this page, you first need to:

1. Create a [Branch Dashboard](https://dashboard.branch.io).
2. [Integrate](android-basic-integration.md) the Branch Android SDK into your mobile app.
3. [Validate](android-basic-integration.md#8-validate-integration) your Branch Android SDK integration.

## Generate Signing Certificate

A signing certificate is required to use Android App Links with Branch.

To generate and use a signing certificate:

1. Navigate to your keystore file.
2. Run `keytool -list -v -keystore my-release-key.keystore` in the same directory as your keystore file.
3. This will generate a value that will look like `AA:00:BB:11:CC:22.....`
4. Copy the value and add it to Branch:

   - **New Branch**: Go to **Configuration** > **Link Controls** > **Link Routing Rules.** Then find **Mobile Routing** > **Android.** Paste the SHA256 Cert Fingerprint value under **SHA256 Cert Fingerprints**.
   - **Legacy Branch**: Go to the [Configuration page](https://branch.dashboard.branch.io/configuration/general) and paste the value in the SHA256 Cert Fingerprints field under the Android section.

## Set Initialization Metadata

Some third-party [Data Integration Partners](data-integration-partners.md) require setting certain identifiers before initializing the Branch Android SDK.

Do this using the `setRequestMetadata()` method.

::: code-group

```java [Java]
Branch.getInstance().setRequestMetadata("$analytics_visitor_id", "000001");
```

```kotlin [Kotlin]
Branch.getInstance().setRequestMetadata("\$analytics_visitor_id", "000001")
```

:::

## Delay Branch Initialization

There are certain cases when you may want to delay the initialization of a Branch session. An example would be making an async call to retrieve data that needs to be passed to Branch as request metadata.

**Warning**: When you try to do this, you may run into an error that reads `SDK already initialized`. This happens because Branch is self-initializing the session when the Activity enters a `RESUMED` state. To avoid this, manually disable auto session initialization and initialize the session yourself after the async call finishes.

**Note**: The `expectDelayedSessionInitialization()` method must be called before establishing the Branch singleton within your application class's `onCreate()`.

::: code-group

```java [Java]
package com.example.android;

                    import android.app.Application;
                    import io.branch.referral.Branch;

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
package com.example.android

                    import android.app.Application
                    import io.branch.referral.Branch

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

## Use `bnc.lt` or Custom Domain

To use `bnc.lt`, add the following block to your `AndroidManifest.xml` file:

```
<activity android:name="com.yourapp.your_activity">
        <!-- App Link your activity to Branch links-->
        <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="bnc.lt" />
        <data android:scheme="http" android:host="bnc.lt" />
        </intent-filter>
        </activity>
```

To use a custom domain, add the following block to your `AndroidManifest.xml` file:

```
<activity android:name="com.yourapp.your_activity">
        <!-- App Link your activity to Branch links -->
        <!-- Update with your own app name, which should match Branch Dashboard settings -->
        <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="<YOUR.APP.COM>" />
        <data android:scheme="http" android:host="<YOUR.APP.COM>" />
        </intent-filter>
        </activity>
```

## General Deep Linking

Branch Deep Links point to specific content that exists inside your app.

If a user clicks a Branch Deep Link and they have your app installed, the Branch Deep Link will take them directly to your app and the specific content featured in your ad.

If the user does not have your app installed, they will be routed to the fallback URL you specified in your Branch Dashboard.

#### Deep Link Prerequisites

Before you can create a Branch Deep Link, you first need to:

1. Create a `BranchUniversalObject` [instance](create-branch-objects-and-events.md#branch-universal-object) that will represent a unique piece of content:

::: code-group

```java [Java]
BranchUniversalObject buo = new BranchUniversalObject()
                    .setCanonicalIdentifier("content/12345")
                    .setTitle("My Content Title")
                    .setContentDescription("My Content Description")
                    .setContentImageUrl("https://lorempixel.com/400/400")
                    .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                    .setLocalIndexMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                    .setContentMetadata(new ContentMetadata().addCustomMetadata("key1", "value1"));
```

```kotlin [Kotlin]
val buo: BranchUniversalObject = BranchUniversalObject()
                    .setCanonicalIdentifier("content/12345")
                    .setTitle("My Content Title")
                    .setContentDescription("My Content Description")
                    .setContentImageUrl("https://lorempixel.com/400/400")
                    .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                    .setLocalIndexMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                    .setContentMetadata(ContentMetadata().addCustomMetadata("key1", "value1"))
```

:::

2. Create a BranchLinkProperties [instance](creating-a-deep-link.md#configure-deep-links) that will contain info about the URL associated with the content:

::: code-group

```java [Java]
LinkProperties lp = new LinkProperties()
                    .setChannel("facebook")
                    .setFeature("sharing")
                    .setCampaign("content 123 launch")
                    .setStage("new user")
                    .addControlParameter("$desktop_url", "https://example.com/home")
                    .addControlParameter("custom", "data")
                    .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));
```

```kotlin [Kotlin]
val lp: LinkProperties = LinkProperties()
                    .setChannel("facebook")
                    .setFeature("sharing")
                    .setCampaign("content 123 launch")
                    .setStage("new user")
                    .addControlParameter("\$desktop_url", "https://example.com/home")
                    .addControlParameter("custom", "data")
                    .addControlParameter("custom_random", Calendar.getInstance().timeInMillis.toString())
```

:::

#### Create Deep Links

Once you have a `BranchUniversalObject` and a `BranchLinkProperties` instance, you can use the `getShortUrl()` method to create a Branch Deep Link.

::: code-group

```java [Java]
BranchUniversalObject buo = new BranchUniversalObject().setCanonicalIdentifier("content/12345");
                    LinkProperties lp = new LinkProperties().setCampaign("content 123 launch");

                    // Generate a short URL for the Branch Universal Object
                    String url = buo.getShortUrl(this.getApplicationContext, lp);
```

```kotlin [Kotlin]
BranchUniversalObject buo = new BranchUniversalObject().setCanonicalIdentifier(“content/12345”)
                    LinkProperties lp = new LinkProperties().setCampaign("content 123 launch")

                    // Generate a short URL for the Branch Universal Object
                    String url = buo.getShortUrl(this.applicationContext, lp)
```

:::

  

For more about the `getShortUrl()` method, visit the Android Full Reference [guide](android-full-reference.md#getshorturl).

#### Read Deep Links

You can read a Branch Deep Link to retrieve data from it. This must happen **after** Branch initialization.

The best practice is to get the data from the listener, since this will prevent a possible race condition.

::: code-group

```java [Java]
// Listener within Main Activity's `onStart`
                    Branch.sessionBuilder(this).withCallback(new Branch.BranchReferralInitListener() {
                    @Override
                    public void onInitFinished(JSONObject referringParams, BranchError error) {
                    if (error == null) {
                    Log.i("BRANCH SDK", referringParams.toString());
                    } else {
                    Log.i("BRANCH SDK", error.getMessage());
                    }
                    }
                    }).withData(this.getIntent().getData()).init();

                    // Latest params
                    JSONObject sessionParams = Branch.getInstance().getLatestReferringParams();
```

```kotlin [Kotlin]
// Listener within MainActivity's `onStart`
                    Branch.sessionBuilder(this).withCallback(object : BranchReferralInitListener {
                    override fun onInitFinished(referringParams: JSONObject?, error: BranchError?) {
                    if (error == null) {
                    Log.i("BRANCH SDK", referringParams.toString())
                    } else {
                    Log.e("BRANCH SDK", error.message)
                    }
                    }
                    }).withData(this.intent.data).init()

                    // Latest params
                    val sessionParams = Branch.getInstance().latestReferringParams()
```

:::

The `getLatestReferringParams()` [method](android-full-reference.md#getlatestreferringparams) returns [Branch Deep Link properties](creating-a-deep-link.md#configure-deep-links).

#### Navigate to Content

Using data you've retrieved from a Branch Deep Link, you can navigate the user to specific content. Alternatively, you can log data, display data, or save data to be used later.

::: code-group

```java [Java]
// Within Main Activity's `onStart`
                    Branch.sessionBuilder(this).withCallback(new Branch.BranchReferralInitListener() {
                    @Override
                    public void onInitFinished(JSONObject referringParams, BranchError error) {
                    if (error == null) {
                    // Option 1: log data
                    Log.i("BRANCH SDK", referringParams.toString());

                    // Option 2: save data to be used later
                    SharedPreferences preferences = MainActivity.this.getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
                    preferences.edit().putString("branchData", referringParams.toString()).apply();

                    // Option 3: navigate to page
                    Intent intent = new Intent(MainActivity.this, OtherActivity.class);
                    startActivity(intent);

                    // Option 4: display data
                    Toast.makeText(MainActivity.this, referringParams.toString(), Toast.LENGTH_LONG).show();
                    } else {
                    Log.i("BRANCH SDK", error.getMessage());
                    }
                    }
                    }).withData(this.getIntent().getData()).init();
```

```kotlin [Kotlin]
// Within Main Activity's `onStart`
                    Branch.sessionBuilder(this).withCallback { referringParams, error ->
                    if (error == null) {
                    // Option 1: log data
                    Log.i("BRANCH SDK", referringParams.toString())

                    // Option 2: save data to be used later
                    val preferences = getSharedPreferences(
                    "MyPreferences",
                    MODE_PRIVATE)
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
```

:::

#### Deep Link Routing

**Warning**: This approach is **not** recommended. Branch recommends using the methods in the "Navigate to Content" [section](android-advanced-features.md#navigate-to-content) instead.

You can add the code below to your `AndroidManifest.xml` file to load a specific URI Scheme path:

```
<meta-data android:name="io.branch.sdk.auto_link_path" android:value="content/123/, another/path/, another/path/*" />
```

#### Deep Link Routing in App

##### WebView

Branch Deep Links within the `WebView` will route internally within your app, while other content will continue to route externally.

To launch Branch Deep Links with `WebView`:

::: code-group

```java [Java]
@Override
                    protected void onCreate(Bundle savedInstanceState) {
                    super.onCreate(savedInstanceState);
                    setContentView(R.layout.activity_main);
                    WebView webView = (WebView) findViewById(R.id.webView);
                    webView.setWebViewClient(new BranchWebViewController(YOUR_DOMAIN, MainActivity.class)); //YOUR_DOMAIN example: appname.app.link
                    webView.loadUrl(URL_TO_LOAD);
                    }

                    public class BranchWebViewController extends WebViewClient {

                    private String myDomain_;
                    private Class activityToLaunch_;

                    BranchWebViewController(@NonNull String myDomain, Class activityToLaunch) {
                    myDomain_ = myDomain;
                    activityToLaunch_ = activityToLaunch;
                    }

                    @Override
                    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    String url = request.getUrl().toString();

                    if (url.contains(myDomain_)) {
                    Intent i = new Intent(view.getContext(), activityToLaunch_);
                    i.putExtra("branch", url);
                    i.putExtra("branch_force_new_session", true);
                    startActivity(i);
                    //finish(); if launching same activity
                    } else {
                    view.loadUrl(url);
                    }

                    return true;
```

```kotlin [Kotlin]
override fun onCreate(savedInstanceState: Bundle?) {
                    super.onCreate(savedInstanceState)
                    setContentView(R.layout.activity_main)
                    val webView = findViewById(R.id.webView) as WebView
                    webView!!.webViewClient = BranchWebViewController("appname.app.link", MainActivity2::class.java)
                    webView!!.loadUrl(URL_TO_LOAD)
                    }

                    inner class BranchWebViewController internal constructor(private val myDomain_: String, private val activityToLaunch_: Class<*>) : WebViewClient() {

                    override fun onLoadResource(view: WebView, url: String) {
                    super.onLoadResource(view, url)
                    }

                    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val url = request.url.toString()

                    if (url.contains(myDomain_)) {
                    val i = Intent(view.context, activityToLaunch_)
                    i.putExtra("branch", url)
                    i.putExtra("branch_force_new_session", true)
                    //finish(); if launching same activity
                    startActivity(i)
                    } else {
                    view.loadUrl(url)
                    }

                    return true
                    }
                    }
```

:::

##### Chrome Tabs

Launch Branch Deep Links with Chrome Tabs:

::: code-group

```java [Java]
CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
                    CustomTabsIntent customTabsIntent = builder.build();
                    customTabsIntent.intent.putExtra("branch", BRANCH_LINK_TO_LOAD);
                    customTabsIntent.intent.putExtra("branch_force_new_session", true);
                    customTabsIntent.launchUrl(MainActivity.this, Uri.parse(BRANCH_LINK_TO_LOAD));
                    //finish(); if launching same activity
```

```kotlin [Kotlin]
val builder = CustomTabsIntent.Builder()
                    val customTabsIntent = builder.build()
                    customTabsIntent.intent.putExtra("branch", BRANCH_LINK_TO_LOAD)
                    customTabsIntent.intent.putExtra("branch_force_new_session", true)
                    customTabsIntent.launchUrl(this@MainActivity2, Uri.parse(BRANCH_LINK_TO_LOAD))
                    //finish() if launching same activity
```

:::

#### Deep Link Activity Finished Notification

To be notified when a Branch Deep Link activity finishes, add the following to your `AndroidManifest.xml` file:

```
<meta-data android:name="io.branch.sdk.auto_link_request_code" android:value="@integer/AutoDeeplinkRequestCode" />
```

Also, add the following to your app:

::: code-group

```java [Java]
@Override
                    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
                    super.onActivityResult(requestCode, resultCode, data);

                    // Checking if the previous activity is launched on Branch auto deep link
                    if(requestCode == getResources().getInteger(R.integer.AutoDeeplinkRequestCode)){
                    // Decide where to navigate when an auto deep linked activity finishes
                    // For example, navigate to HomeActivity or a SignUp Activity
                    Intent i = new Intent(getApplicationContext(), CreditHistoryActivity.class);
                    startActivity(i);
                    }
                    }
```

```kotlin [Kotlin]
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
                    super.onActivityResult(requestCode, resultCode, data)

                    // Checking if the previous activity is launched on Branch auto deep link
                    if (requestCode == resources.getInteger(R.integer.AutoDeeplinkRequestCode)) {
                    // Decide where to navigate when an auto deep linked activity finishes
                    // For example, navigate to HomeActivity or a SignUp Activity
                    val i = Intent(applicationContext, CreditHistoryActivity::class.java)
                    startActivity(i)
                    }
                    }
```

:::

## Event Tracking

#### General Event Tracking

By default, the Branch Android SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box).

You can also use the `BranchEvent` class to [track special user actions or application-specific events](track-branch-events.md). For example, you can track when a user adds an item to a shopping cart or searches for a keyword.

In short, a `BranchEvent` instance corresponds to an in-app event that you want to log with Branch.

You can use a `BranchUniversalObject` (BUO) [instance](create-branch-objects-and-events.md) to populate the `contentItems` field of the `BranchEvent` [class](create-branch-objects-and-events.md#branch-event). This is how you associate BUO data with a specific event.

Learn more about [tracking events](track-branch-events.md) and the `logEvent()` [method](android-full-reference.md#logevent) in our respective guides.

#### Content Tracking

To track how many times a piece of content is viewed, use the `addContentItems()` and `logEvent()` methods together.

::: code-group

```java [Java]
new BranchEvent(BRANCH_STANDARD_EVENT.VIEW_ITEM).addContentItems(buo).logEvent(this.getApplicationContext);
```

```kotlin [Kotlin]
BranchEvent(BRANCH_STANDARD_EVENT.VIEW_ITEM).addContentItems(buo).logEvent(this.applicationContext)
```

:::

## Sharing

#### Android Native Sharesheet

Use the `share()` method to create a Branch Deep Link that has Android Native Sharesheet behavior associated with it.

::: code-group

```java [Java]
 private void shareBranchLink(){
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

Learn more about `share()` in our Android Full Reference [guide](android-full-reference.md#share).

## Handle Links in Your Own App

Use the code below to deep link into your own app from within the app itself. This is done by launching a Chrome intent.

**Note**: Handling a new Branch Deep Link in your app will clear the current session data and a new referred `OPEN` will be attributed.

**Note**: Linking to the *currently open activity* or an *activity that is in the backstack and partially visible* must be handled via `sessionBuilder()...reInit()`.

::: code-group

```java [Java]
Intent intent = new Intent(this, ActivityToLaunch.class);

                    // Replace with your own link URL
                    intent.putExtra("branch","https://xxxx.app.link/testlink");

                    intent.putExtra("branch_force_new_session",true);
                    startActivity(intent);
```

```kotlin [Kotlin]
val intent = Intent(this, ActivityToLaunch::class.java)

                    // Replace with your own link URL
                    intent.putExtra("branch", "https://xxxx.app.link/testlink")

                    intent.putExtra("branch_force_new_session", true)
                    startActivity(intent)
```

:::

## Push Notifications

Handle push notifications by adding a Branch Deep Link to your result intent.

::: code-group

```java [Java]
Intent resultIntent = new Intent(this, TargetActivity.class);
                    resultIntent.putExtra("branch","https://xxxx.app.link/testlink");
                    resultIntent.putExtra("branch_force_new_session",true);
                    PendingIntent resultPendingIntent = PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT);
```

```kotlin [Kotlin]
val resultIntent = Intent(this, TargetClass::class.java)
                    resultIntent.putExtra("branch", "https://xxxx.app.link/testlink")
                    resultIntent.putExtra("branch_force_new_session", true)
                    val resultPendingIntent = PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT)
```

:::

To handle situations where `TargetActivity` is in the foreground when a push notification is clicked, don't forget to call `sessionBuilder()...reInit()` from `onNewIntent` inside `TargetActivity`.

::: code-group

```java [Java]
@Override
                    protected void onNewIntent(Intent intent) {
                    super.onNewIntent(intent);
                    setIntent(intent);

                    // If activity is in foreground (or in backstack but partially visible) launching the same
                    // activity will skip `onStart` (handle this case with `reInitSession`)
                    if (intent != null &&
                    intent.hasExtra("branch_force_new_session") &&
                    intent.getBooleanExtra("branch_force_new_session")) {
                    Branch.sessionBuilder(this).withCallback(branchReferralInitListener).reInit();
                    }
                    }
```

```kotlin [Kotlin]
override fun onNewIntent(intent: Intent) {
                    super.onNewIntent(intent)
                    this.intent = intent

                    // Branch reinit (in case Activity is already visible when Branch Link is clicked)
                    // Will re-initialize only if `branch_force_new_session=true` intent extra is set
                    Branch.sessionBuilder(this).withCallback(branchListener).reInit()
                    }
```

:::

## QR Codes

To use a Branch QR Code, first create a `BranchQRCode` object. Fill out relevant properties for that object, then use `getQRCodeAsImage()` or `getQRCodeAsData()` to retrieve and use the Branch QR Code.

::: code-group

```java [Java]
BranchQRCode qrCode = new BranchQRCode() //All QR code settings are optional
                    .setCodeColor("#a4c639")
                    .setBackgroundColor(Color.WHITE)
                    .setMargin(1)
                    .setWidth(512)
                    .setImageFormat(BranchQRCode.BranchImageFormat.PNG)
                    .setCenterLogo("https://cdn.branch.io/branch-assets/1598575682753-og_image.png");

                    BranchUniversalObject buo = new BranchUniversalObject()
                    .setCanonicalIdentifier("content/12345")
                    .setTitle("My QR Code");

                    LinkProperties lp = new LinkProperties()
                    .setChannel("facebook")
                    .setFeature("qrCode")
                    .setCampaign("content 123 launch");

                    qrCode.getQRCodeAsImage(MainActivity.this, buo, lp, new BranchQRCode.BranchQRCodeImageHandler() {
                    @Override
                    public void onSuccess(Bitmap qrCodeImage) {
                    // Do something with the QR code here
                    }

                    @Override
                    public void onFailure(Exception e) {
                    Log.d("Failed to get QR code", String.valueOf(e));
                    }
                    });
```

```kotlin [Kotlin]
val qrCode = BranchQRCode()
                    .setCodeColor("#a4c639")
                    .setBackgroundColor(Color.WHITE)
                    .setMargin(1)
                    .setWidth(512)
                    .setImageFormat(BranchQRCode.BranchImageFormat.JPEG)
                    .setCenterLogo("https://cdn.branch.io/branch-assets/1598575682753-og_image.png")

                    val buo = BranchUniversalObject()
                    .setCanonicalIdentifier("content/12345")
                    .setTitle("My Content Title")
                    .setContentDescription("My Content Description")
                    .setContentImageUrl("https://lorempixel.com/400/400")

                    val lp = LinkProperties()
                    .setChannel("facebook")
                    .setFeature("sharing")
                    .setCampaign("content 123 launch")
                    .setStage("new user")

                    qrCode.getQRCodeAsImage(this@MainActivity, buo, lp, object : BranchQRCodeImageHandler<Any?> {
                    override fun onSuccess(qrCodeImage: Bitmap) {
                    // Do something with your QR code here
                    }

                    override fun onFailure(e: Exception) {
                    Log.d("Failed to get QR code", e.toString())
                    }
                    })
```

:::

Learn more about getting your Branch QR Code as an [image](android-full-reference.md#getqrcodeasimage) or as [data](android-full-reference.md#getqrcodeasdata) in our Android Full Reference [guide](android-full-reference.md).

#### Access

Basic Branch QR Codes are included in the free tier of the Branch Growth Platform.

For more advanced QR Code capabilities, see our Engagement Pro [package](packaging.md), which includes access to the [QR Code API](qr-code-api.md)  as well as the ability to create custom QR Codes in the Branch Dashboard.

## User Data

#### Google DMA Compliance

In response to the European Union's enactment of the Digital Markets Act (DMA), the Branch Android SDK includes the `setDMAParamsForEEA()` method to help you pass consent information from your user to Google.

The `setDMAParamsForEEA()` method takes 3 parameters:

| Parameter Name | Type | Description | When `true` | When `false` |
| --- | --- | --- | --- | --- |
| `eeaRegion` | Boolean | Whether European regulations, including the DMA, apply to this user and conversion. | User is **included** in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA. | User is considered **excluded** from European Union regulations. |
| `adPersonalizationConsent` | Boolean | Whether end user has granted or denied ads personalization consent. | User has **granted** consent for ads personalization. | User has **denied** consent for ads personalization. |
| `adUserDataUsageConsent` | Boolean | Whether end user has granted or denied consent for 3P transmission of user level data for ads. | User has **granted** consent for 3P transmission of user-level data for ads. | User has **denied** consent for 3P transmission of user-level data for ads. |

##### Default Behavior

When `eeaRegion` is set to `true`, the parameters `adPersonalizationConsent` and `adUserDataUsageConsent` **must also be set**.

When parameters are successfully set using `setDMAParamsForEEA()`, they will be sent along with every future request to the following Branch endpoints:

- `/v1/install`
- `/v1/open`
- `/v2/event`

::: warning
**Warning:** `NULL` **by Default**

Please note that the 3 parameters passed to `setDMAParamsForEEA()` are all `NULL` by default.

**Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.**
:::

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

#### Set User Identity

An "identity" is a unique alias attributed to a specific user in the Branch system.

Some scenarios which could leverage the `setIdentity()` function:

1. You have your own user IDs that you want to see reflected in the Branch system.
2. You want referral and event data to persist across platforms so you can see how your users access your service from different devices.
3. You want referral and event data to persist across uninstall/reinstall events.

::: warning Sending PII
Be sure to not send any PII through the `setIdentity()` method. For additional details, please view our guide on [Best Practices to Avoid Sending PII to Branch](best-practices-to-avoid-sending-pii-to-branch.md).
:::

To confirm that user identities are being set as expected, use the [Overview](https://dashboard.branch.io/liveview) section of the Branch Dashboard.

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

                    Branch.getInstance().logout();
```

```kotlin [Kotlin]
Branch branch = Branch.getAutoInstance(this.applicationContext)

                    branch.setIdentity("unique_user_id",
                    BranchReferralInitListener { referringParams, error ->
                    Log.i(
                    "Test",
                    "Install params = " + referringParams.toString()
                    )
                    })

                    Branch.getInstance().logout()
```

:::

Learn more about the `setIdentity` [method](android-full-reference.md#setidentity) in our Android Full Reference guide.

#### Attribution Through Install Listener

It is possible to pass the `link_click_id` from Google Play to Branch. This will increase attribution and deferred deep linking accuracy.

By default, Branch waits 1.5 seconds for Google Play analytics. You can change this based on your needs.

To use this approach, add the following to your application class before the `getAutoInstance()` [method](android-basic-integration.md#5-load-branch):

::: code-group

```java [Java]
Branch.setPlayStoreReferrerCheckTimeout(5000);
```

```kotlin [Kotlin]
Branch.setPlayStoreReferrerCheckTimeout(5_000)
```

:::

To test this setup, run the following command:

```
adb shell am broadcast -a com.android.vending.INSTALL_REFERRER -n io.branch.androidexampledemo/io.branch.referral.InstallListener --es "referrer" "link_click_id=123"
```
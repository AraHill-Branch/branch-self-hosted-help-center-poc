import{_ as a,o as s,c as e,ae as p}from"./chunks/framework.B6gjLfeO.js";const u=JSON.parse('{"title":"Capacitor","description":"","frontmatter":{"title":"Capacitor","slug":"capacitor"},"headers":[],"relativePath":"developer-hub/capacitor.md","filePath":"developer-hub/capacitor.md"}'),t={name:"developer-hub/capacitor.md"};function i(l,n,o,r,c,d){return s(),e("div",null,[...n[0]||(n[0]=[p(`<h2 id="install-branch" tabindex="-1">Install Branch <a class="header-anchor" href="#install-branch" aria-label="Permalink to &quot;Install Branch&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install capacitor-branch-deep-links</span></span></code></pre></div><h2 id="configure-branch" tabindex="-1">Configure Branch <a class="header-anchor" href="#configure-branch" aria-label="Permalink to &quot;Configure Branch&quot;">​</a></h2><ul><li><p>Complete your Branch configuration:</p><ul><li><strong>New Branch</strong>: In the left-hand navigation, go to <strong>Configuration</strong> and click on <strong>Link Controls</strong>. Navigate to the <strong>Link Routing Rules</strong> tab to configure your app settings.</li><li><strong>Legacy Branch</strong>: Navigate to the <a href="https://branch.dashboard.branch.io/configuration/general" target="_blank" rel="noreferrer">Configuration page</a>.</li></ul></li></ul><h2 id="configure-app" tabindex="-1">Configure App <a class="header-anchor" href="#configure-app" aria-label="Permalink to &quot;Configure App&quot;">​</a></h2><h3 id="android" tabindex="-1">Android <a class="header-anchor" href="#android" aria-label="Permalink to &quot;Android&quot;">​</a></h3><ul><li>If your app is in the Google Play Store, update <code>build.gradle</code> with the necessary dependencies:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apply plugin: &#39;com.android.application&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        android {</span></span>
<span class="line"><span>        defaultConfig {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        + multiDexEnabled true</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        dependencies {</span></span>
<span class="line"><span>        + implementation(&quot;com.google.android.gms:play-services-ads-identifier:18.0.1&quot;) // AAID</span></span>
<span class="line"><span>        + implementation &#39;androidx.multidex:multidex:2.0.1&#39; // Only required if your minSDKVersion is 20 or lower</span></span>
<span class="line"><span>        }</span></span></code></pre></div><ul><li>Update <code>src/main/res/values/strings.xml</code> with your configuration:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&#39;1.0&#39; encoding=&#39;utf-8&#39;?&gt;</span></span>
<span class="line"><span>        &lt;resources&gt;</span></span>
<span class="line"><span>        &lt;!-- ... -&gt;</span></span>
<span class="line"><span>        + &lt;string name=&quot;applink_host&quot;&gt;example.app.link&lt;/string&gt;</span></span>
<span class="line"><span>        + &lt;string name=&quot;applink_host_alternate&quot;&gt;example-alternate.app.link&lt;/string&gt;</span></span>
<span class="line"><span>        + &lt;string name=&quot;deeplink_scheme&quot;&gt;example&lt;/string&gt;</span></span>
<span class="line"><span>        + &lt;string name=&quot;branch_key&quot;&gt;key_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&lt;/string&gt;</span></span>
<span class="line"><span>        + &lt;string name=&quot;branch_test_key&quot;&gt;key_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&lt;/string&gt;</span></span>
<span class="line"><span>        + &lt;bool name=&quot;branch_test_mode&quot;&gt;false&lt;/bool&gt;</span></span>
<span class="line"><span>        + &lt;!-- set above to &quot;true&quot; to use test key --&gt;</span></span>
<span class="line"><span>        &lt;/resources&gt;</span></span></code></pre></div><ul><li>Register the plugin in your Activity and set the request metadata <code>MainActivity.java</code>:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package com.example;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        + import android.content.Intent;</span></span>
<span class="line"><span>        import android.os.Bundle;</span></span>
<span class="line"><span>        + import co.boundstate.BranchDeepLinks;</span></span>
<span class="line"><span>        import com.getcapacitor.BridgeActivity;</span></span>
<span class="line"><span>        import com.getcapacitor.Plugin;</span></span>
<span class="line"><span>        import java.util.ArrayList;</span></span>
<span class="line"><span>        + import io.branch.referral.Branch;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public class MainActivity extends BridgeActivity {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void onCreate(Bundle savedInstanceState) {</span></span>
<span class="line"><span>        super.onCreate(savedInstanceState);</span></span>
<span class="line"><span>        + Branch.getInstance().setRequestMetadata(&quot;insert_user_id&quot;, &quot;value&quot;); // if you need to append partner metadata before initializing Branch</span></span>
<span class="line"><span>        + registerPlugin(BranchDeepLinks.class);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        + @Override</span></span>
<span class="line"><span>        + protected void onNewIntent(Intent intent) {</span></span>
<span class="line"><span>        + this.setIntent(intent);</span></span>
<span class="line"><span>        + super.onNewIntent(intent);</span></span>
<span class="line"><span>        + }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><ul><li>Add a <code>CustomApplicationClass.java</code> file to your project with the following content:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+ package com.example;</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        + import android.content.Context;</span></span>
<span class="line"><span>        + import android.os.UserManager;</span></span>
<span class="line"><span>        + import androidx.multidex.MultiDex;</span></span>
<span class="line"><span>        + import androidx.multidex.MultiDexApplication;</span></span>
<span class="line"><span>        + import static android.os.Build.VERSION.SDK_INT;</span></span>
<span class="line"><span>        + import io.branch.referral.Branch;</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        + public class CustomApplicationClass extends MultiDexApplication {</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        + @Override</span></span>
<span class="line"><span>        + public void onCreate() {</span></span>
<span class="line"><span>        + super.onCreate();</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        + // Branch logging for debugging</span></span>
<span class="line"><span>        + Branch.enableLogging();</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        + if (SDK_INT &gt;= 24) {</span></span>
<span class="line"><span>        + UserManager um = getApplicationContext().getSystemService(UserManager.class);</span></span>
<span class="line"><span>        + if (um == null || !um.isUserUnlocked()) return;</span></span>
<span class="line"><span>        + }</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        + // Branch object initialization</span></span>
<span class="line"><span>        + Branch.getAutoInstance(this);</span></span>
<span class="line"><span>        + }</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        + @Override</span></span>
<span class="line"><span>        + protected void attachBaseContext(Context base) {</span></span>
<span class="line"><span>        + super.attachBaseContext(base);</span></span>
<span class="line"><span>        + MultiDex.install(this);</span></span>
<span class="line"><span>        + }</span></span>
<span class="line"><span>        + }</span></span></code></pre></div><ul><li>Update your <code>AndroidManifest.xml</code> as follows:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span></span>
<span class="line"><span>        &lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;</span></span>
<span class="line"><span>        package=&quot;com.example&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;</span></span>
<span class="line"><span>        &lt;uses-permission android:name=&quot;com.google.android.gms.permission.AD_ID&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;application</span></span>
<span class="line"><span>        + android:name=&quot;.CustomApplicationClass&quot;</span></span>
<span class="line"><span>        android:allowBackup=&quot;true&quot;</span></span>
<span class="line"><span>        android:icon=&quot;@mipmap/ic_launcher&quot;</span></span>
<span class="line"><span>        android:label=&quot;@string/app_name&quot;</span></span>
<span class="line"><span>        android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;</span></span>
<span class="line"><span>        android:supportsRtl=&quot;true&quot;</span></span>
<span class="line"><span>        android:theme=&quot;@style/AppTheme&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- ... --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;activity</span></span>
<span class="line"><span>        android:configChanges=&quot;orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode&quot;</span></span>
<span class="line"><span>        android:name=&quot;com.example.MainActivity&quot;</span></span>
<span class="line"><span>        android:label=&quot;@string/title_activity_main&quot;</span></span>
<span class="line"><span>        android:theme=&quot;@style/AppTheme.NoActionBarLaunch&quot;</span></span>
<span class="line"><span>        android:launchMode=&quot;singleTask&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        + &lt;intent-filter&gt;</span></span>
<span class="line"><span>        + &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;/intent-filter&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        + &lt;!-- BEGIN BRANCH --&gt;</span></span>
<span class="line"><span>        + &lt;intent-filter android:autoVerify=&quot;true&quot;&gt;</span></span>
<span class="line"><span>        + &lt;action android:name=&quot;android.intent.action.VIEW&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;category android:name=&quot;android.intent.category.DEFAULT&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;category android:name=&quot;android.intent.category.BROWSABLE&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;data</span></span>
<span class="line"><span>        + android:scheme=&quot;http&quot;</span></span>
<span class="line"><span>        + android:host=&quot;@string/applink_host&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;data</span></span>
<span class="line"><span>        + android:scheme=&quot;https&quot;</span></span>
<span class="line"><span>        + android:host=&quot;@string/applink_host&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;data</span></span>
<span class="line"><span>        + android:scheme=&quot;http&quot;</span></span>
<span class="line"><span>        + android:host=&quot;@string/applink_host_alternate&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;data</span></span>
<span class="line"><span>        + android:scheme=&quot;https&quot;</span></span>
<span class="line"><span>        + android:host=&quot;@string/applink_host_alternate&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;/intent-filter&gt;</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        &lt;intent-filter&gt;</span></span>
<span class="line"><span>        &lt;action android:name=&quot;android.intent.action.VIEW&quot; /&gt;</span></span>
<span class="line"><span>        &lt;category android:name=&quot;android.intent.category.DEFAULT&quot; /&gt;</span></span>
<span class="line"><span>        &lt;category android:name=&quot;android.intent.category.BROWSABLE&quot; /&gt;</span></span>
<span class="line"><span>        - &lt;data android:scheme=&quot;@string/custom_url_scheme&quot;/&gt;</span></span>
<span class="line"><span>        + &lt;data android:scheme=&quot;@string/deeplink_scheme&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/intent-filter&gt;</span></span>
<span class="line"><span>        + &lt;!-- END BRANCH --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/activity&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        + &lt;!-- BEGIN BRANCH --&gt;</span></span>
<span class="line"><span>        + &lt;!-- Branch init --&gt;</span></span>
<span class="line"><span>        + &lt;meta-data android:name=&quot;io.branch.sdk.BranchKey&quot; android:value=&quot;@string/branch_key&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;meta-data android:name=&quot;io.branch.sdk.BranchKey.test&quot; android:value=&quot;@string/branch_test_key&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;meta-data android:name=&quot;io.branch.sdk.TestMode&quot; android:value=&quot;@bool/branch_test_mode&quot; /&gt;</span></span>
<span class="line"><span>        + &lt;!-- END BRANCH --&gt;</span></span>
<span class="line"><span>        +</span></span>
<span class="line"><span>        &lt;!-- ... --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/application&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- ... --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/manifest&gt;</span></span></code></pre></div><h3 id="ios" tabindex="-1">iOS <a class="header-anchor" href="#ios" aria-label="Permalink to &quot;iOS&quot;">​</a></h3><div class="info custom-block"><p class="custom-block-title">iOS 14 Implementation</p><p>In order to give you full control over the user experience, the Branch SDK will not trigger the IDFA permission modal.</p><p>However, we will still collect and use IDFAs when available if you do choose to trigger the modal.</p><p><a href="./sdk-faqs.html">Learn More</a></p></div><ol><li><a href="./ios-basic-integration.html#2-configure-bundle-identifier">Configure Bundle Identifier</a></li><li><a href="./ios-basic-integration.html#3-configure-associated-domains">Configure Associated Domains</a></li><li><a href="./ios-basic-integration.html#4-configure-infoplist">Configure Info.plist</a></li><li>Update the project:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npx cap update ios</span></span></code></pre></div><ol start="5"><li>Make the following changes to your <code>AppDelegate.swift</code> file:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import UIKit</span></span>
<span class="line"><span>        import Capacitor</span></span>
<span class="line"><span>        +import BranchSDK</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @UIApplicationMain</span></span>
<span class="line"><span>        class AppDelegate: UIResponder, UIApplicationDelegate {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var window: UIWindow?</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -&gt; Bool {</span></span>
<span class="line"><span>        // Override point for customization after application launch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        + Branch.setUseTestBranchKey(true) // If you are using the TEST key</span></span>
<span class="line"><span>        + Branch.getInstance().enableLogging() // If you want to enable logging</span></span>
<span class="line"><span>        + Branch.getInstance().setRequestMetadataKey(&quot;insert_user_id&quot;, value: &quot;value&quot;) // If you need to append partner metadata before initializing Branch</span></span>
<span class="line"><span>        + Branch.getInstance().initSession(launchOptions: launchOptions)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func applicationWillResignActive(_ application: UIApplication) {</span></span>
<span class="line"><span>        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.</span></span>
<span class="line"><span>        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func applicationDidEnterBackground(_ application: UIApplication) {</span></span>
<span class="line"><span>        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.</span></span>
<span class="line"><span>        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func applicationWillEnterForeground(_ application: UIApplication) {</span></span>
<span class="line"><span>        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func applicationDidBecomeActive(_ application: UIApplication) {</span></span>
<span class="line"><span>        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func applicationWillTerminate(_ application: UIApplication) {</span></span>
<span class="line"><span>        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -&gt; Bool {</span></span>
<span class="line"><span>        // Called when the app was launched with a url. Feel free to add additional processing here,</span></span>
<span class="line"><span>        // but if you want the App API to support tracking app url opens, make sure to keep this call</span></span>
<span class="line"><span>        + Branch.getInstance().application(app, open: url, options: options)</span></span>
<span class="line"><span>        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -&gt; Void) -&gt; Bool {</span></span>
<span class="line"><span>        // Called when the app was launched with an activity, including Universal Links.</span></span>
<span class="line"><span>        // Feel free to add additional processing here, but if you want the App API to support</span></span>
<span class="line"><span>        // tracking app url opens, make sure to keep this call</span></span>
<span class="line"><span>        + Branch.getInstance().continue(userActivity)</span></span>
<span class="line"><span>        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if statusBarRect.contains(touchPoint) {</span></span>
<span class="line"><span>        NotificationCenter.default.post(name: .capacitorStatusBarTapped, object: nil)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        + func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -&gt; Void) {</span></span>
<span class="line"><span>        + Branch.getInstance().handlePushNotification(userInfo)</span></span>
<span class="line"><span>        + }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span></code></pre></div><h2 id="initialize-branch" tabindex="-1">Initialize Branch <a class="header-anchor" href="#initialize-branch" aria-label="Permalink to &quot;Initialize Branch&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+ import { BranchDeepLinks, BranchInitEvent } from &#39;capacitor-branch-deep-links&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Component({</span></span>
<span class="line"><span>        selector: &#39;app-root&#39;,</span></span>
<span class="line"><span>        templateUrl: &#39;app.component.html&#39;,</span></span>
<span class="line"><span>        styleUrls: [&#39;app.component.scss&#39;]</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>        export class AppComponent {</span></span>
<span class="line"><span>        constructor(</span></span>
<span class="line"><span>        private platform: Platform,</span></span>
<span class="line"><span>        private splashScreen: SplashScreen,</span></span>
<span class="line"><span>        private statusBar: StatusBar</span></span>
<span class="line"><span>        ) {</span></span>
<span class="line"><span>        this.initializeApp();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        initializeApp() {</span></span>
<span class="line"><span>        this.platform.ready().then(() =&gt; {</span></span>
<span class="line"><span>        this.statusBar.styleDefault();</span></span>
<span class="line"><span>        this.splashScreen.hide();</span></span>
<span class="line"><span>        + BranchDeepLinks.addListener(&#39;init&#39;, (event: BranchInitEvent) =&gt; {</span></span>
<span class="line"><span>        + // Retrieve deeplink keys from &#39;referringParams&#39; and evaluate the values to determine where to route the user</span></span>
<span class="line"><span>        + // Check &#39;+clicked_branch_link&#39; before deciding whether to use your Branch routing logic</span></span>
<span class="line"><span>        + console.log(event.referringParams);</span></span>
<span class="line"><span>        + });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        + BranchDeepLinks.addListener(&#39;initError&#39;, (error: any) =&gt; {</span></span>
<span class="line"><span>        + console.error(error);</span></span>
<span class="line"><span>        + });</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h2 id="implement-features" tabindex="-1">Implement features <a class="header-anchor" href="#implement-features" aria-label="Permalink to &quot;Implement features&quot;">​</a></h2><h3 id="configure-pre-initialization-settings" tabindex="-1">Configure pre-initialization settings <a class="header-anchor" href="#configure-pre-initialization-settings" aria-label="Permalink to &quot;Configure pre-initialization settings&quot;">​</a></h3><p>The following methods must be called <strong>before</strong> Branch SDK initialization to set data correctly</p><h4 id="setsdkwaittimeforthirdpartyapis" tabindex="-1">setSDKWaitTimeForThirdPartyAPIs() <a class="header-anchor" href="#setsdkwaittimeforthirdpartyapis" aria-label="Permalink to &quot;setSDKWaitTimeForThirdPartyAPIs()&quot;">​</a></h4><p>Configures how long the SDK waits for third-party API responses (ODM info and Apple Attribution Token)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { BranchDeepLinks } from &#39;capacitor-branch-deep-links&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BranchDeepLinks.setSDKWaitTimeForThirdPartyAPIs(3);</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>waitTime</code></td><td><code>number</code></td><td>Number of seconds SDK will wait for third party APIs to finish. Default is 0.5 seconds (500ms).</td></tr></tbody></table><h4 id="setodminfo" tabindex="-1">setODMInfo() <a class="header-anchor" href="#setodminfo" aria-label="Permalink to &quot;setODMInfo()&quot;">​</a></h4><p>Passes ODM info to the Branch iOS SDK.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { BranchDeepLinks } from &#39;capacitor-branch-deep-links&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BranchDeepLinks.setODMInfo(&quot;odmInfo&quot;, Date.now());</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>odmInfo</code></td><td><code>String</code></td><td>The ODM event data (or aggregate conversion info) for the current app instance.</td></tr><tr><td><code>firstOpenTimestamp</code></td><td><code>Number</code></td><td>The date and time when the app was first opened after installation. This timestamp is used for conversion attribution timing and should match the value passed to Google&#39;s <code>setFirstLaunchTime</code> method.</td></tr></tbody></table><h4 id="setanonid" tabindex="-1">setAnonID() <a class="header-anchor" href="#setanonid" aria-label="Permalink to &quot;setAnonID()&quot;">​</a></h4><p>Sets a custom Meta anon_id for the current user. The Meta anon_id is a GUID generated by the Branch iOS SDK for Meta AEM.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { BranchDeepLinks } from &#39;capacitor-branch-deep-links&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BranchDeepLinks.setAnonID(&quot;your-anon-id&quot;);</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>anonID</code></td><td><code>String</code></td><td>The custom Meta anon_id to set for the user.</td></tr></tbody></table><h3 id="create-deep-link" tabindex="-1">Create Deep Link <a class="header-anchor" href="#create-deep-link" aria-label="Permalink to &quot;Create Deep Link&quot;">​</a></h3><ul><li>Creates a deep link URL with encapsulated data</li><li>Uses <a href="./creating-a-deep-link.html">Deep Link Properties</a></li><li>Validate with the <a href="https://dashboard.branch.io/liveview/links" target="_blank" rel="noreferrer">Branch Dashboard</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// optional fields</span></span>
<span class="line"><span>        var analytics = {</span></span>
<span class="line"><span>        channel: &#39;facebook&#39;,</span></span>
<span class="line"><span>        feature: &#39;onboarding&#39;,</span></span>
<span class="line"><span>        campaign: &#39;content 123 launch&#39;,</span></span>
<span class="line"><span>        stage: &#39;new user&#39;,</span></span>
<span class="line"><span>        tags: [&#39;one&#39;, &#39;two&#39;, &#39;three&#39;]</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // optional fields</span></span>
<span class="line"><span>        var properties = {</span></span>
<span class="line"><span>        $desktop_url: &#39;http://www.example.com/desktop&#39;,</span></span>
<span class="line"><span>        $android_url: &#39;http://www.example.com/android&#39;,</span></span>
<span class="line"><span>        $ios_url: &#39;http://www.example.com/ios&#39;,</span></span>
<span class="line"><span>        $ipad_url: &#39;http://www.example.com/ipad&#39;,</span></span>
<span class="line"><span>        $match_duration: 2000,</span></span>
<span class="line"><span>        custom_string: &#39;data&#39;,</span></span>
<span class="line"><span>        custom_integer: String(Date.now()), // Custom integers must be converted to a string</span></span>
<span class="line"><span>        custom_boolean: true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BranchDeepLinks.generateShortUrl({ analytics, properties }).then(function (res) {</span></span>
<span class="line"><span>        alert(&#39;Response: &#39; + JSON.stringify(res.url))</span></span>
<span class="line"><span>        }).catch(function (err) {</span></span>
<span class="line"><span>        alert(&#39;Error: &#39; + JSON.stringify(err))</span></span>
<span class="line"><span>        })</span></span></code></pre></div><h3 id="share-deep-link" tabindex="-1">Share Deep Link <a class="header-anchor" href="#share-deep-link" aria-label="Permalink to &quot;Share Deep Link&quot;">​</a></h3><ul><li>Will generate a Branch deep link and tag it with the channel the user selects</li><li>Uses <a href="./creating-a-deep-link.html">Deep Link Properties</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// optional fields</span></span>
<span class="line"><span>        var analytics = {</span></span>
<span class="line"><span>        channel: &#39;facebook&#39;,</span></span>
<span class="line"><span>        feature: &#39;onboarding&#39;,</span></span>
<span class="line"><span>        campaign: &#39;content 123 launch&#39;,</span></span>
<span class="line"><span>        stage: &#39;new user&#39;,</span></span>
<span class="line"><span>        tags: [&#39;one&#39;, &#39;two&#39;, &#39;three&#39;]</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // optional fields</span></span>
<span class="line"><span>        var properties = {</span></span>
<span class="line"><span>        $desktop_url: &#39;http://www.example.com/desktop&#39;,</span></span>
<span class="line"><span>        custom_string: &#39;data&#39;,</span></span>
<span class="line"><span>        custom_integer: String(Date.now()), // Custom integers must be converted to a string</span></span>
<span class="line"><span>        custom_boolean: true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var shareText = &#39;Check out this link&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // share sheet</span></span>
<span class="line"><span>        BranchDeepLinks.showShareSheet({ analytics, properties, shareText })</span></span></code></pre></div><h3 id="nativelinktm-deferred-deep-linking-ios-only" tabindex="-1">NativeLink™ Deferred Deep Linking (iOS Only) <a class="header-anchor" href="#nativelinktm-deferred-deep-linking-ios-only" aria-label="Permalink to &quot;NativeLink™ Deferred Deep Linking (iOS Only)&quot;">​</a></h3><ul><li>Use iOS pasteboard to enable deferred deep linking via Branch NativeLink™</li></ul><div class="warning custom-block"><p class="custom-block-title">Prerequisites</p><p><strong>Make sure the underlying iOS SDK Version is v1.39.4+</strong></p><p>To use this feature you must:</p><ul><li><p><a href="./configure-default-link-behaviors.html#3-ios-default-link-behavior">Enable NativeLink™ Deep Linking</a> in the Branch Dashboard:</p><ul><li><strong>New Branch</strong>: In the left-hand navigation, go to <strong>Configuration</strong> and click on <strong>Link Controls</strong>. Navigate to the <strong>Link Routing Rules</strong> tab, then find the <strong>Mobile Routing</strong> section and select <strong>iOS</strong>.</li><li><strong>Legacy Branch</strong>: Navigate to the <a href="https://dashboard.branch.io/configuration/general" target="_blank" rel="noreferrer">Configuration page</a> and find the iOS section.</li></ul><p><strong>or</strong></p></li><li><p>Manually configure your Branch Link to use <a href="./creating-a-deep-link.html#deep-linking">$ios_nativelink</a></p></li></ul></div><p>Implement one of the <a href="./ios-advanced-features.html#options-for-implementation">pasteboard opt-in options</a> in the native iOS SDK code.</p><p>Please note that deferred deep linking is part of our <a href="https://help.branch.io/docs/products#engagement" target="_blank" rel="noreferrer">Engagement package</a>.</p><h3 id="create-qr-code" tabindex="-1">Create QR Code <a class="header-anchor" href="#create-qr-code" aria-label="Permalink to &quot;Create QR Code&quot;">​</a></h3><ul><li>Set your Qr Code Settings</li><li>Set your Analytics and Link Properties</li><li>Use getBranchQRCode() to create a QR code.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Optional fields</span></span>
<span class="line"><span>        var analytics = {</span></span>
<span class="line"><span>        channel: &#39;facebook&#39;,</span></span>
<span class="line"><span>        feature: &#39;onboarding&#39;,</span></span>
<span class="line"><span>        campaign: &#39;content 123 launch&#39;,</span></span>
<span class="line"><span>        stage: &#39;new user&#39;,</span></span>
<span class="line"><span>        tags: [&#39;one&#39;, &#39;two&#39;, &#39;three&#39;]</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Optional fields</span></span>
<span class="line"><span>        var properties = {</span></span>
<span class="line"><span>        $desktop_url: &#39;http://www.example.com/desktop&#39;,</span></span>
<span class="line"><span>        $android_url: &#39;http://www.example.com/android&#39;,</span></span>
<span class="line"><span>        $ios_url: &#39;http://www.example.com/ios&#39;,</span></span>
<span class="line"><span>        $ipad_url: &#39;http://www.example.com/ipad&#39;,</span></span>
<span class="line"><span>        $match_duration: 2000,</span></span>
<span class="line"><span>        custom_string: &#39;data&#39;,</span></span>
<span class="line"><span>        custom_integer: String(Date.now()), // Custom integers must be converted to a string</span></span>
<span class="line"><span>        custom_boolean: true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var settings = {</span></span>
<span class="line"><span>        width: 2000,</span></span>
<span class="line"><span>        codeColor: &quot;#3b2016&quot;,</span></span>
<span class="line"><span>        backgroundColor: &quot;#c79200&quot;,</span></span>
<span class="line"><span>        centerLogo: &quot;https://cdn.britannica.com/95/156695-131-FF89C9FA/oak-tree.jpg&quot;,</span></span>
<span class="line"><span>        margin: 3,</span></span>
<span class="line"><span>        imageFormat: &quot;PNG&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BranchDeepLinks.getBranchQRCode({analytics, properties, settings}).then((res) =&gt; {</span></span>
<span class="line"><span>        this.picToView = &quot;data:image/png;base64,&quot; + res.qrCode;</span></span>
<span class="line"><span>        }).catch(function (err) {</span></span>
<span class="line"><span>        alert(&#39;Error getting QR code: &#39; + JSON.stringify(err) + err)</span></span>
<span class="line"><span>        })</span></span></code></pre></div><h4 id="access" tabindex="-1">Access <a class="header-anchor" href="#access" aria-label="Permalink to &quot;Access&quot;">​</a></h4><p>Basic Branch QR Codes are included in the free tier of the Branch Growth Platform.</p><p>For more advanced QR Code capabilities, see our Engagement Pro <a href="./packaging.html">package</a>, which includes access to the <a href="./qr-code-api.html">QR Code API</a> as well as the ability to create custom QR Codes in the Branch Dashboard.</p><h3 id="track-users" tabindex="-1">Track Users <a class="header-anchor" href="#track-users" aria-label="Permalink to &quot;Track Users&quot;">​</a></h3><ul><li>Sets the identity of a user (ID, UUID, etc) for events, deep links, and referrals</li><li>Validate with the <a href="https://dashboard.branch.io/liveview/identities" target="_blank" rel="noreferrer">Branch Dashboard</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var newIdentity = &#39;123456&#39;</span></span>
<span class="line"><span>        BranchDeepLinks.setIdentity({ newIdentity: newIdentity }).then(function (res) {</span></span>
<span class="line"><span>        alert(&#39;Response: &#39; + JSON.stringify(res.referringParams))</span></span>
<span class="line"><span>        }).catch(function (err) {</span></span>
<span class="line"><span>        alert(&#39;Error: &#39; + JSON.stringify(err))</span></span>
<span class="line"><span>        })</span></span></code></pre></div><ul><li>Remove the identity of a user</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BranchDeepLinks.logout().then(function (res) {</span></span>
<span class="line"><span>        alert(&#39;Response: &#39; + JSON.stringify(res.logged_out))</span></span>
<span class="line"><span>        }).catch(function (err) {</span></span>
<span class="line"><span>        alert(&#39;Error: &#39; + JSON.stringify(err))</span></span>
<span class="line"><span>        })</span></span></code></pre></div><h3 id="track-events" tabindex="-1">Track Events <a class="header-anchor" href="#track-events" aria-label="Permalink to &quot;Track Events&quot;">​</a></h3><ul><li>Registers a custom event</li><li>Events named <code>open</code>, <code>close</code>, <code>install</code>, and <code>referred session</code> are Branch restricted</li><li>Best to <a href="./capacitor.html#section-track-users">Track users</a> before <a href="./capacitor.html#section-track-events">Track events</a> to associate a custom event to a user</li><li>Validate with the <a href="https://dashboard.branch.io/liveview/events" target="_blank" rel="noreferrer">Branch Dashboard</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var eventName = &#39;my_event&#39;</span></span>
<span class="line"><span>        var metaData = {</span></span>
<span class="line"><span>        customData: {</span></span>
<span class="line"><span>        &#39;custom_dictionary&#39;: &#39;123&#39;,</span></span>
<span class="line"><span>        &#39;anything&#39;: &#39;everything&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BranchDeepLinks.sendBranchEvent({ eventName, metaData })</span></span></code></pre></div><h3 id="track-commerce" tabindex="-1">Track Commerce <a class="header-anchor" href="#track-commerce" aria-label="Permalink to &quot;Track Commerce&quot;">​</a></h3><ul><li>Registers a custom commerce event</li><li>Validate with the <a href="https://dashboard.branch.io/liveview/commerce" target="_blank" rel="noreferrer">Branch Dashboard</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// get a list of all Branch standard events</span></span>
<span class="line"><span>        BranchDeepLinks.getStandardEvents().then(function (res) {</span></span>
<span class="line"><span>        alert(&#39;Response: &#39; + JSON.stringify(res.branch_standard_events))</span></span>
<span class="line"><span>        }).catch(function (err) {</span></span>
<span class="line"><span>        alert(&#39;Error: &#39; + JSON.stringify(err))</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var eventName = &#39;ADD_TO_CART&#39;</span></span>
<span class="line"><span>        var metaData = {</span></span>
<span class="line"><span>        customerEventAlias: &#39;alias name for event&#39;,</span></span>
<span class="line"><span>        transactionID: &#39;1234455&#39;,</span></span>
<span class="line"><span>        currency: &#39;USD&#39;,</span></span>
<span class="line"><span>        revenue: 1.5,</span></span>
<span class="line"><span>        shipping: 10.2,</span></span>
<span class="line"><span>        tax: 12.3,</span></span>
<span class="line"><span>        coupon: &#39;test_coupon&#39;,</span></span>
<span class="line"><span>        affiliation: &#39;test_affiliation&#39;,</span></span>
<span class="line"><span>        description: &#39;Test add to cart event&#39;,</span></span>
<span class="line"><span>        searchQuery: &#39;test keyword&#39;,</span></span>
<span class="line"><span>        customData: {</span></span>
<span class="line"><span>        &quot;Custom_Event_Property_Key1&quot;: &quot;Custom_Event_Property_val1&quot;,</span></span>
<span class="line"><span>        &quot;Custom_Event_Property_Key2&quot;: &quot;Custom_Event_Property_val2&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BranchDeepLinks.sendBranchEvent({ eventName, metaData })</span></span></code></pre></div><h3 id="disable-tracking" tabindex="-1">Disable Tracking <a class="header-anchor" href="#disable-tracking" aria-label="Permalink to &quot;Disable Tracking&quot;">​</a></h3><p>If you need to comply with a user&#39;s request to not be tracked for GDPR purposes, or otherwise determine that a user should not be tracked, utilize this field to prevent Branch from sending network requests. This setting can also be enabled across all users for a particular link, or across your Branch Links.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BranchDeepLinks.disableTracking().then(function (res) {</span></span>
<span class="line"><span>        alert(&#39;Response: &#39; + JSON.stringify(res.is_enabled))</span></span>
<span class="line"><span>        }).catch(function (err) {</span></span>
<span class="line"><span>        alert(&#39;Error: &#39; + JSON.stringify(err))</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var isEnabled = true</span></span>
<span class="line"><span>        BranchDeepLinks.disableTracking({ isEnabled }).then(function (res) {</span></span>
<span class="line"><span>        alert(&#39;Response: &#39; + JSON.stringify(res.is_enabled))</span></span>
<span class="line"><span>        }).catch(function (err) {</span></span>
<span class="line"><span>        alert(&#39;Error: &#39; + JSON.stringify(err))</span></span>
<span class="line"><span>        })</span></span></code></pre></div>`,70)])])}const g=a(t,[["render",i]]);export{u as __pageData,g as default};

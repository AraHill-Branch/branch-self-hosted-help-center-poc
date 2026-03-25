import{_ as a,o as s,c as e,ae as p}from"./chunks/framework.B6gjLfeO.js";const u=JSON.parse('{"title":"Xamarin Configuration","description":"","frontmatter":{"title":"Xamarin Configuration","slug":"xamarin-configuration"},"headers":[],"relativePath":"developer-hub/xamarin-configuration.md","filePath":"developer-hub/xamarin-configuration.md"}'),i={name:"developer-hub/xamarin-configuration.md"};function t(l,n,o,r,c,d){return s(),e("div",null,[...n[0]||(n[0]=[p(`<h2 id="ios" tabindex="-1">iOS <a class="header-anchor" href="#ios" aria-label="Permalink to &quot;iOS&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">iOS 14 Implementation</p><p>In order to give you full control over the user experience, the Branch SDK will not trigger the IDFA permission modal.</p><p>However, we will still collect and use IDFAs when available if you do choose to trigger the modal.</p></div><div class="danger custom-block"><p class="custom-block-title">Inconsistent Universal links behavior on iOS 11.2</p><p>After updating a device to iOS 11.2, we found that the app&#39;s AASA file is no longer downloaded reliably onto your user’s device after an app install. As a result, clicking on Universal links will no longer open the app consistently. You can set <a href="./creating-a-deep-link.html#section-redirections">forced uri redirect mode</a> on your Branch Links to open the app with URI schemes.</p></div><h3 id="_1-configure-branch" tabindex="-1">1. Configure Branch <a class="header-anchor" href="#_1-configure-branch" aria-label="Permalink to &quot;1. Configure Branch&quot;">​</a></h3><p>Start by <a href="./ios-basic-integration.html#1-configure-branch-dashboard">configuring</a> the iOS settings of your Xamarin application in Branch:</p><h3 id="_2-install-branch-nuget-package" tabindex="-1">2. Install Branch NuGet Package <a class="header-anchor" href="#_2-install-branch-nuget-package" aria-label="Permalink to &quot;2. Install Branch NuGet Package&quot;">​</a></h3><p><strong>IMPORTANT</strong>: Xamarin applications should use versions 8.1.2 or lower of the <code>Branch-Xamarin-Linking-SDK</code> <a href="https://www.nuget.org/packages/Branch-Xamarin-Linking-SDK" target="_blank" rel="noreferrer">NuGet package</a> - versions 9.0.0+ are for MAUI applications.</p><p>The package must be added to each of the Xamarin projects that will use Branch methods.</p><p>To add the Branch NuGet package to a project:</p><ol><li>Right-click on each project and select <strong>Add → Add NuGet Packages</strong>.</li><li>Find the <code>Branch-Xamarin-Linking-SDK</code> package and add it to the project. Make sure you are using version 8.1.2 or lower for a Xamarin application.</li></ol><h3 id="_3-configure-app" tabindex="-1">3. Configure App <a class="header-anchor" href="#_3-configure-app" aria-label="Permalink to &quot;3. Configure App&quot;">​</a></h3><h4 id="create-an-apple-device-provisioning-profile-for-the-app" tabindex="-1">Create an Apple Device Provisioning Profile for the App <a class="header-anchor" href="#create-an-apple-device-provisioning-profile-for-the-app" aria-label="Permalink to &quot;Create an Apple Device Provisioning Profile for the App&quot;">​</a></h4><h4 id="configure-the-xamarin-project-s-info-plist-file" tabindex="-1">Configure the Xamarin Project&#39;s Info.plist File <a class="header-anchor" href="#configure-the-xamarin-project-s-info-plist-file" aria-label="Permalink to &quot;Configure the Xamarin Project&#39;s Info.plist File&quot;">​</a></h4><ol><li>Open the <code>Info.plist</code> file.</li><li>Enter the app&#39;s Bundle Identifier from the <a href="https://developer.apple.com/account/ios/identifier/bundle" target="_blank" rel="noreferrer">Apple Developer Portal</a> in the <strong>Bundle Identifier</strong> field. <strong>IMPORTANT</strong>: This field will automatically be populated with an all-lowercase value by Xamarin. The value is in fact case-sensitive and must match the value in the <a href="https://developer.apple.com/account/ios/identifier/bundle" target="_blank" rel="noreferrer">Apple Developer Portal</a> precisely.</li><li>Click on the <strong>Advanced</strong> tab.</li><li>In the <strong>URL Types</strong> section, click the <strong>Add URL Type</strong> button:<br><strong>Identifier</strong>: Branch Scheme<br><strong>URL Schemes</strong>: The app&#39;s URI Scheme, for example <code>testiosapp</code><br><strong>Role</strong>: Editor</li></ol><h4 id="configure-the-xamarin-project-s-associated-domains-entitlement" tabindex="-1">Configure the Xamarin Project&#39;s Associated Domains Entitlement <a class="header-anchor" href="#configure-the-xamarin-project-s-associated-domains-entitlement" aria-label="Permalink to &quot;Configure the Xamarin Project&#39;s Associated Domains Entitlement&quot;">​</a></h4><ol><li>Open the <code>Entitlements.plist</code> file and browse to the <strong>Associated Domains</strong> section.</li><li>Create entries for both the app&#39;s link domain and its alternate link domain. The entries for the <code>TestBed-Xamarin</code> app would be:<br><code>applinks:testiosapp.app.link</code><br><code>applinks:testiosapp-alternate.app.link</code></li></ol><h4 id="update-the-project-s-signing-identity-and-provisioning-profile" tabindex="-1">Update the Project&#39;s Signing Identity and Provisioning Profile <a class="header-anchor" href="#update-the-project-s-signing-identity-and-provisioning-profile" aria-label="Permalink to &quot;Update the Project&#39;s Signing Identity and Provisioning Profile&quot;">​</a></h4><ol><li>Right-click on the iOS project and select <strong>Options</strong>.</li><li>Select <strong>iOS Bundle Signing</strong>.</li><li>Set the <strong>Signing Identity</strong> and <strong>Provisioning Profile</strong> values to the values used when deploying the Provisioning Profile to the device.</li></ol><h3 id="_4-initialize-branch" tabindex="-1">4. Initialize Branch <a class="header-anchor" href="#_4-initialize-branch" aria-label="Permalink to &quot;4. Initialize Branch&quot;">​</a></h3><p>Branch initialization occurs within the <code>FinishedLaunching</code> method of the <code>AppDelegate.cs</code> file. Branch calls are also required in the <code>OpenUrl</code>, <code>ContinueUserActivity</code>, and <code>ReceiveRemoteNotification</code> methods to ensure that Branch link information is handled properly whenever the app becomes active.</p><p>Whenever the app becomes active, the Branch SDK will reach out to the Branch backend to retrieve any available link parameters. If the app becomes active due to a click on a Branch link, the link data will be returned in the <code>InitSessionComplete</code> method. This is where any Branch Deep Link routing logic should reside. Any error in retrieving Branch link data from the backend will be returned in the <code>SessionRequestError</code> method.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// AppDelegate.cs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        using Foundation;</span></span>
<span class="line"><span>        using UIKit;</span></span>
<span class="line"><span>        using BranchXamarinSDK;</span></span>
<span class="line"><span>        using BranchXamarinSDK.iOS;</span></span>
<span class="line"><span>        using System;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        namespace TestiOSApp.iOS</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        [Register(&quot;AppDelegate&quot;)]</span></span>
<span class="line"><span>        public class AppDelegate : UIApplicationDelegate, IBranchBUOSessionInterface</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public override UIWindow Window</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        get;</span></span>
<span class="line"><span>        set;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override bool FinishedLaunching(UIApplication application, NSDictionary launchOptions)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        // Debug mode - set to &#39;false&#39; before releasing to production</span></span>
<span class="line"><span>        BranchIOS.Debug = true;</span></span>
<span class="line"><span>        BranchIOS.Init(&quot;key_live_&lt;YOUR-GUID-HERE&gt;&quot;, launchOptions, this);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Called when the app is opened via URI scheme</span></span>
<span class="line"><span>        public override bool OpenUrl(UIApplication application, NSUrl url, string sourceApplication, NSObject annotation)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        return BranchIOS.getInstance().OpenUrl(url);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Called when the app is opened from a Universal Link</span></span>
<span class="line"><span>        public override bool ContinueUserActivity(UIApplication application, NSUserActivity userActivity,</span></span>
<span class="line"><span>        UIApplicationRestorationHandler completionHandler)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        return BranchIOS.getInstance().ContinueUserActivity(userActivity);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Called when the app receives a push notification</span></span>
<span class="line"><span>        public override void ReceivedRemoteNotification(UIApplication application, NSDictionary userInfo)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        BranchIOS.getInstance().HandlePushNotification(userInfo);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Called when the Branch initialization is completed</span></span>
<span class="line"><span>        // Put Branch Deep Link logic in this method</span></span>
<span class="line"><span>        public void InitSessionComplete(BranchUniversalObject buo, BranchLinkProperties blp)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        NSObject[] keys = {</span></span>
<span class="line"><span>        NSObject.FromObject(&quot;+is_first_session&quot;)</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        NSObject[] values = { NSObject.FromObject(0) };</span></span>
<span class="line"><span>        if (buo.metadata.ContainsKey(&quot;+is_first_session&quot;))</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        values[0] = NSObject.FromObject(buo.metadata[&quot;+is_first_session&quot;]);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        NSDictionary nsData = NSDictionary.FromObjectsAndKeys(values, keys);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Called when there is an error initializing Branch</span></span>
<span class="line"><span>        public void SessionRequestError(BranchError error)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        Console.WriteLine(&quot;Branch error: &quot; + error.ErrorCode);</span></span>
<span class="line"><span>        Console.WriteLine(error.ErrorMessage);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h4 id="create-a-class-for-branch-session-handling" tabindex="-1">Create a Class for Branch Session Handling <a class="header-anchor" href="#create-a-class-for-branch-session-handling" aria-label="Permalink to &quot;Create a Class for Branch Session Handling&quot;">​</a></h4><p>Branch initializes asynchronously, with Branch link parameters being returned following a network call to Branch. If initialization is successful, the <code>InitSessionComplete</code> method will be invoked. If initialization is unsuccessful, the <code>SessionRequestError</code> method will be invoked. Branch Deep Link routing logic should be located in the <code>InitSessionComplete</code> method.</p><ol><li>Right-click on the C# project and select <strong>Add → New File</strong>.</li><li>Select <strong>General</strong>, then <strong>Empty Class</strong>.</li><li>Rename the file to <code>TestXamarinFormsApp.cs</code>.</li><li>Add the following code:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using BranchXamarinSDK;</span></span>
<span class="line"><span>        using System.Collections.Generic;</span></span>
<span class="line"><span>        using System.ComponentModel;</span></span>
<span class="line"><span>        using Xamarin.Forms;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TextXamarinFormsApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestXamarinFormsApp</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public class TestXamarinFormsApp : Application, IBranchSessionInterface</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public TestXamarinFormsApp()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #region IBranchSessionInterface implementation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void InitSessionComplete(Dictionary&lt;string, object&gt; data)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void CloseSessionComplete()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void SessionRequestError(BranchError error)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #endregion</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h4 id="create-a-class-for-handling-link-data" tabindex="-1">Create a Class for Handling Link Data <a class="header-anchor" href="#create-a-class-for-handling-link-data" aria-label="Permalink to &quot;Create a Class for Handling Link Data&quot;">​</a></h4><p>Branch stores link data in an object referred to as the <a href="./create-branch-objects-and-events.html#branch-universal-object">Branch Universal Object</a>, or BUO.</p><ol><li>Right-click on the C# project and select <strong>Add → New File</strong>.</li><li>Select <strong>General → Empty Class</strong>.</li><li>Rename the file to <code>TestXamarinFormsAppBUO.cs</code>.</li><li>Add the following code:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using BranchXamarinSDK;</span></span>
<span class="line"><span>        using System.Collections.Generic;</span></span>
<span class="line"><span>        using System.ComponentModel;</span></span>
<span class="line"><span>        using Xamarin.Forms;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TextXamarinFormsApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestXamarinFormsApp</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public class TestXamarinFormsAppBUO : Application, IBranchBUOSessionInterface</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public TestXamarinFormsAppBUO()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #region IBranchBUOSessionInterface implementation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void InitSessionComplete(BranchUniversalObject buo, BranchLinkProperties blp)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void SessionRequestError(BranchError error)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #endregion</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h4 id="add-branch-calls-to-the-appdelegate" tabindex="-1">Add Branch Calls to the AppDelegate <a class="header-anchor" href="#add-branch-calls-to-the-appdelegate" aria-label="Permalink to &quot;Add Branch Calls to the AppDelegate&quot;">​</a></h4><p>To ensure that the Branch SDK initializes when the app starts and can retrieve link parameters whenever the app becomes active, Branch initialization occurs within the <code>FinishedLaunching</code> method of the <code>AppDelegate.cs</code> file. Branch calls are also required in the <code>OpenUrl</code>, <code>ContinueUserActivity</code>, and <code>ReceiveRemoteNotification</code> methods to ensure that Branch link information is handled properly whenever the app becomes active. The <code>AppDelegate.cs</code> file should look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>        using System.Collections.Generic;</span></span>
<span class="line"><span>        using System.Linq;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        using Foundation;</span></span>
<span class="line"><span>        using UIKit;</span></span>
<span class="line"><span>        using BranchXamarinSDK;</span></span>
<span class="line"><span>        using TestXamarinFormsApp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TextXamarinFormsApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestXamarinFormsApp.iOS</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        [Register(&quot;AppDelegate&quot;)]</span></span>
<span class="line"><span>        public partial class AppDelegate : global::Xamarin.Forms.Platform.iOS.FormsApplicationDelegate</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public override bool FinishedLaunching(UIApplication app, NSDictionary options)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        global::Xamarin.Forms.Forms.Init();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Debug mode - set to &#39;false&#39; before releasing to production</span></span>
<span class="line"><span>        BranchIOS.Debug = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        TestXamarinFormsAppBUO appBUO = new TestXamarinFormsAppBUO();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Find your key_live value on the Account Settings page of the Branch Dashboard</span></span>
<span class="line"><span>        BranchIOS.Init(&quot;key_live_&lt;YOUR-GUID-HERE&gt;&quot;, options, appBUO);</span></span>
<span class="line"><span>        LoadApplication(appBUO);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return base.FinishedLaunching(app, options);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Called when the app is opened via URI scheme</span></span>
<span class="line"><span>        public override bool OpenUrl(UIApplication application, NSUrl url, string sourceApplication, NSObject annotation)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        return BranchIOS.getInstance().OpenUrl(url);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Called when the app is opened from a Universal Link</span></span>
<span class="line"><span>        public override bool ContinueUserActivity(UIApplication application, NSUserActivity userActivity, UIApplicationRestorationHandler completionHandler)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        return BranchIOS.getInstance().ContinueUserActivity(userActivity);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Called when the app receives a push notification</span></span>
<span class="line"><span>        public override void ReceivedRemoteNotification(UIApplication application, NSDictionary userInfo)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        BranchIOS.getInstance().HandlePushNotification(userInfo);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h2 id="android" tabindex="-1">Android <a class="header-anchor" href="#android" aria-label="Permalink to &quot;Android&quot;">​</a></h2><div class="danger custom-block"><p class="custom-block-title">Google Play Services version 17+</p><p>If you reference Google Play Services version 17 or higher, you <strong>MUST</strong> complete Google&#39;s update instructions <a href="https://developers.google.com/android/guides/releases#june_17_2019" target="_blank" rel="noreferrer">here</a>.</p><p>Due to a major Google Play Services change made in June 2019, not completing the update steps will cause Branch&#39;s Android SDK (and various other cross-platform SDKs, e.g. Unity) to stop collecting Android AID which we use to ensure accurate deep linking and attribution.</p><p>If you are running Google Play Services versions below 17, no update is necessary.</p></div><h3 id="_1-configure-branch-1" tabindex="-1">1. Configure Branch <a class="header-anchor" href="#_1-configure-branch-1" aria-label="Permalink to &quot;1. Configure Branch&quot;">​</a></h3><p>Start by <a href="./android-basic-integration.html">configuring</a> the Android settings of your Xamarin application in Branch.</p><h3 id="_2-install-branch-nuget-package-1" tabindex="-1">2. Install Branch NuGet Package <a class="header-anchor" href="#_2-install-branch-nuget-package-1" aria-label="Permalink to &quot;2. Install Branch NuGet Package&quot;">​</a></h3><div class="warning custom-block"><p class="custom-block-title">Google Advertising Identifier (GAID)</p><p>Branch Xamarin SDK 8.0.0+ requires the <code>Xamarin.GooglePlayServices.AdsIdentifier</code> NuGet package to obtain the advertising id.</p><p>Note that version 117.0.1.5 does not work properly on Visual Studio for Mac 2019, use 117.0.1.3 instead.</p></div><p><strong>IMPORTANT</strong>: Xamarin applications should use versions 8.1.2 or lower of the <code>Branch-Xamarin-Linking-SDK</code> <a href="https://www.nuget.org/packages/Branch-Xamarin-Linking-SDK" target="_blank" rel="noreferrer">NuGet package</a> - higher versions are for MAUI applications.</p><p>The package must be added to each of the Xamarin projects that will use Branch methods.</p><p>To add the Branch NuGet package to a project:</p><ol><li>Right-click on each project and select <strong>Add → Add NuGet Packages</strong>.</li><li>Find the <code>Branch-Xamarin-Linking-SDK</code> package and add it to the project. Make sure you are using version 8.1.2 or lower for a Xamarin application.</li></ol><h3 id="_3-configure-app-1" tabindex="-1">3. Configure App <a class="header-anchor" href="#_3-configure-app-1" aria-label="Permalink to &quot;3. Configure App&quot;">​</a></h3><h4 id="ensure-android-project-is-not-using-shared-mono-runtime" tabindex="-1">Ensure Android Project Is Not Using Shared Mono Runtime <a class="header-anchor" href="#ensure-android-project-is-not-using-shared-mono-runtime" aria-label="Permalink to &quot;Ensure Android Project Is Not Using Shared Mono Runtime&quot;">​</a></h4><ol><li>Right-click on the Android project and select <strong>Options</strong>.</li><li>Select <strong>Android Build</strong>.</li><li>On the <strong>General</strong> tab, un-check <strong>Use Shared Mono Runtime</strong>.</li></ol><h4 id="add-app-capabilities-in-manifest-file" tabindex="-1">Add App Capabilities in Manifest File <a class="header-anchor" href="#add-app-capabilities-in-manifest-file" aria-label="Permalink to &quot;Add App Capabilities in Manifest File&quot;">​</a></h4><p>In the <code>Required permissions</code> section of <code>AndroidManifest.xml</code>, configure the following permissions:</p><ul><li><code>AccessNetworkState</code></li><li><code>Internet</code></li></ul><p>Additional reading on the Android manifest:</p><ul><li><a href="https://developer.xamarin.com/guides/android/advanced_topics/working_with_androidmanifest.xml/" target="_blank" rel="noreferrer">Working with android manifest.xml</a></li><li><a href="https://developer.xamarin.com/recipes/android/general/projects/add_permissions_to_android_manifest/" target="_blank" rel="noreferrer">Add permissions to android manifest</a></li></ul><h4 id="add-app-s-branch-key" tabindex="-1">Add App&#39;s Branch Key <a class="header-anchor" href="#add-app-s-branch-key" aria-label="Permalink to &quot;Add App&#39;s Branch Key&quot;">​</a></h4><p>Add the app&#39;s Branch key to the Android project&#39;s <code>Strings.xml</code> file which lives in <code>Resources/values/</code>. This file contains values that can be accessed by the app&#39;s Application class.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span></span>
<span class="line"><span>        &lt;resources&gt;</span></span>
<span class="line"><span>        &lt;string name=&quot;app_name&quot;&gt;TestXamarinFormsApp&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;string name=&quot;branch_key&quot;&gt;key_live_liAnF8k7gZUEZv76Rt9a4bffAzlC5zVW&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;/resources&gt;</span></span></code></pre></div><h3 id="_4a-initialize-branch-without-xamarin-forms" tabindex="-1">4a. Initialize Branch Without Xamarin.Forms <a class="header-anchor" href="#_4a-initialize-branch-without-xamarin-forms" aria-label="Permalink to &quot;4a. Initialize Branch Without Xamarin.Forms&quot;">​</a></h3><p>You can initialize Branch with or without the Xamarin.Forms framework.</p><p>To initialize <strong>without</strong> the framework:</p><ol><li>Right-click on the .Droid project and select <strong>Add → New File</strong>.</li><li>Select <strong>General → Empty File</strong>.</li><li>Name the file <code>Application.cs</code>.</li><li>Add the following code:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>        using Android.App;</span></span>
<span class="line"><span>        using Android.Content;</span></span>
<span class="line"><span>        using Android.Runtime;</span></span>
<span class="line"><span>        using BranchXamarinSDK;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TestAndroidApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestAndroidApp.Droid</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        [Application(AllowBackup = true, Icon = &quot;@mipmap/icon&quot;, Label = &quot;@string/app_name&quot;)]</span></span>
<span class="line"><span>        [MetaData(&quot;io.branch.sdk.auto_link_disable&quot;, Value = &quot;false&quot;)]</span></span>
<span class="line"><span>        [MetaData(&quot;io.branch.sdk.TestMode&quot;, Value = &quot;true&quot;)]</span></span>
<span class="line"><span>        [MetaData(&quot;io.branch.sdk.BranchKey&quot;, Value = &quot;@string/branch_key&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public class TestAndroidApp : Application</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public TestAndroidApp(IntPtr javaReference, JniHandleOwnership transfer) : base(javaReference, transfer)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override void OnCreate()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnCreate();</span></span>
<span class="line"><span>        BranchAndroid.GetAutoInstance(this.ApplicationContext);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody><tr><td><code>io.branch.sdk.TestMode</code></td><td>Setting this parameter to <code>true</code> enables Debug Mode, which causes simple uninstall/reinstalls of the app to trigger Install events. Be sure to disable this before deploying to production. Note that enabling Debug Mode on iOS also forces the app to use the Branch test key if this key has been added to the project. Apps running with a test key will be unable to receive data from Branch Deep Links created with the live key.</td></tr><tr><td><code>io.branch.sdk.BranchKey</code></td><td>The app&#39;s Branch key. Both a live key and a test key can be added to the <code>Strings.xml</code> file. When test mode is enabled, the app will automatically use the test key if one has been specified.</td></tr></tbody></table><h5 id="create-an-activity-to-handle-branch-events" tabindex="-1">Create an Activity to Handle Branch Events <a class="header-anchor" href="#create-an-activity-to-handle-branch-events" aria-label="Permalink to &quot;Create an Activity to Handle Branch Events&quot;">​</a></h5><ol><li>Right-click on the .Droid project and select <strong>Add → New File</strong>.</li><li>Select <strong>Android →Activity</strong>.</li><li>Rename the file <code>BranchActivity.cs</code>.</li><li>Add the following code:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>        using System.Collections.Generic;</span></span>
<span class="line"><span>        using System.Linq;</span></span>
<span class="line"><span>        using System.Text;</span></span>
<span class="line"><span>        using Newtonsoft.Json;</span></span>
<span class="line"><span>        using BranchXamarinSDK;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        using Android.App;</span></span>
<span class="line"><span>        using Android.Content;</span></span>
<span class="line"><span>        using Android.OS;</span></span>
<span class="line"><span>        using Android.Runtime;</span></span>
<span class="line"><span>        using Android.Views;</span></span>
<span class="line"><span>        using Android.Widget;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TestAndroidApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestAndroidApp.Droid</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        [Activity(Label = &quot;BranchActivity&quot;)]</span></span>
<span class="line"><span>        public class BranchActivity : Activity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        private string logString = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        protected override void OnCreate(Bundle savedInstanceState)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnCreate(savedInstanceState);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        LogMessage(&quot;Branch initialization completed: &quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Dictionary&lt;string, object&gt; data = JsonConvert.DeserializeObject&lt;Dictionary&lt;string, object&gt;&gt;(Intent.GetStringExtra(&quot;BranchData&quot;));</span></span>
<span class="line"><span>        foreach (var key in data.Keys)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        LogMessage(key + &quot; : &quot; + data[key].ToString());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #region Utils</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        void LogMessage(string message)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        Console.WriteLine(message);</span></span>
<span class="line"><span>        logString += DateTime.Now.ToLongTimeString() + &quot;&gt; &quot; + message + &quot;\\n&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #endregion</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h5 id="create-an-activity-to-handle-branch-errors" tabindex="-1">Create an Activity to Handle Branch Errors <a class="header-anchor" href="#create-an-activity-to-handle-branch-errors" aria-label="Permalink to &quot;Create an Activity to Handle Branch Errors&quot;">​</a></h5><ol><li>Right-click on the .Droid project and select <strong>Add → New File</strong>.</li><li>Select <strong>Android → Activity</strong>.</li><li>Rename the file <code>BranchErrorActivity.cs</code>.</li><li>Add the following code:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>        using System.Collections.Generic;</span></span>
<span class="line"><span>        using System.Linq;</span></span>
<span class="line"><span>        using System.Text;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        using Android.App;</span></span>
<span class="line"><span>        using Android.Content;</span></span>
<span class="line"><span>        using Android.OS;</span></span>
<span class="line"><span>        using Android.Runtime;</span></span>
<span class="line"><span>        using Android.Views;</span></span>
<span class="line"><span>        using Android.Widget;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TestAndroidApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestAndroidApp.Droid</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        [Activity(Label = &quot;BranchErrorActivity&quot;)]</span></span>
<span class="line"><span>        public class BranchErrorActivity : Activity</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        private string logString = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        protected override void OnCreate(Bundle savedInstanceState)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnCreate(savedInstanceState);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        LogMessage(&quot;Branch initialization failed&quot;);</span></span>
<span class="line"><span>        LogMessage(&quot;Error code: &quot; + Intent.Extras.GetInt(&quot;ErrorCode&quot;).ToString());</span></span>
<span class="line"><span>        LogMessage(Intent.Extras.GetString(&quot;ErrorMessage&quot;));</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #region Utils</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        void LogMessage(string message)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        Console.WriteLine(message);</span></span>
<span class="line"><span>        logString += DateTime.Now.ToLongTimeString() + &quot;&gt; &quot; + message + &quot;\\n&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #endregion</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h5 id="initialize-branch-and-configure-branch-session-management" tabindex="-1">Initialize Branch and Configure Branch Session Management <a class="header-anchor" href="#initialize-branch-and-configure-branch-session-management" aria-label="Permalink to &quot;Initialize Branch and Configure Branch Session Management&quot;">​</a></h5><p>Branch must be initialized in the <code>OnCreate</code> method of either the <code>Application</code> class or the first Activity launched by the app. The <code>OnNewIntent</code> method must be added to retrieve the latest link identifier when the app becomes active due to a Branch Deep Link click.</p><p>If initialization is successful, the <code>InitSessionComplete</code> method will be invoked. If initialization is unsuccessful, the <code>SessionRequestError</code> method will be invoked. Branch Deep Link routing logic should be located in the <code>InitSessionComplete</code> method.</p><p>In the code example below the following Branch initialization and session management steps have been added to <code>MainActivity.cs</code>:</p><ol><li>An Activity to respond to the app&#39;s URI Scheme is created and launched in <code>singleTask</code> mode.</li><li>The <code>OnCreate</code> method is overwritten and initializes the Branch SDK.</li><li>The <code>OnNewIntent</code> method is overwritten.</li><li>An <code>InitSessionComplete</code> method is added for processing Branch Deep Link information. This is where Deep Link routing logic should live.</li><li>A <code>SessionRequestError</code> method is added to handle situations where Branch fails to initialize.</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using Android.App;</span></span>
<span class="line"><span>        using Android.Widget;</span></span>
<span class="line"><span>        using Android.OS;</span></span>
<span class="line"><span>        using BranchXamarinSDK;</span></span>
<span class="line"><span>        using System;</span></span>
<span class="line"><span>        using System.Collections.Generic;</span></span>
<span class="line"><span>        using Android.Content;</span></span>
<span class="line"><span>        using Newtonsoft.Json;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TestAndroidApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestAndroidApp.Droid</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        [Activity(Label = &quot;TestAndroidApp&quot;, MainLauncher = true, Icon = &quot;@mipmap/icon&quot;, LaunchMode = Android.Content.PM.LaunchMode.SingleTask)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [IntentFilter(new[] { &quot;android.intent.action.VIEW&quot; },</span></span>
<span class="line"><span>        Categories = new[] { &quot;android.intent.category.DEFAULT&quot;, &quot;android.intent.category.BROWSABLE&quot; },</span></span>
<span class="line"><span>        DataScheme = &quot;testandroidapp&quot;,</span></span>
<span class="line"><span>        DataHost = &quot;open&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [IntentFilter(new[] { &quot;android.intent.action.VIEW&quot; },</span></span>
<span class="line"><span>        Categories = new[] { &quot;android.intent.category.DEFAULT&quot;, &quot;android.intent.category.BROWSABLE&quot; },</span></span>
<span class="line"><span>        DataScheme = &quot;https&quot;,</span></span>
<span class="line"><span>        DataHost = &quot;testandroidapp.app.link&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [IntentFilter(new[] { &quot;android.intent.action.VIEW&quot; },</span></span>
<span class="line"><span>        Categories = new[] { &quot;android.intent.category.DEFAULT&quot;, &quot;android.intent.category.BROWSABLE&quot; },</span></span>
<span class="line"><span>        DataScheme = &quot;https&quot;,</span></span>
<span class="line"><span>        DataHost = &quot;testandroidapp-alternate.app.link&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public class MainActivity : Activity, IBranchSessionInterface</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        protected override void OnCreate(Bundle savedInstanceState)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnCreate(savedInstanceState);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BranchAndroid.Init(this, Resources.GetString(Resource.String.branch_key), this);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Ensure we get the updated link identifier when the app becomes active</span></span>
<span class="line"><span>        // due to a Branch link click after having been in the background</span></span>
<span class="line"><span>        protected override void OnNewIntent(Intent intent)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        this.Intent = intent;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void InitSessionComplete(Dictionary&lt;string, object&gt; data)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        //Handle custom logic based on deep link data in InitSessionComplete</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //View all the link data in the console</span></span>
<span class="line"><span>        Console.WriteLine(&quot;My Link Data: &quot; + JsonConvert.SerializeObject(data));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    //Preferred method: use BranchActivity created previously to handle the link data</span></span>
<span class="line"><span>        //Will need to update BranchActivity with desired custom logic, to open the correct page in the app</span></span>
<span class="line"><span>        var intent = new Intent(this, typeof(BranchActivity));</span></span>
<span class="line"><span>        intent.PutExtra(&quot;BranchData&quot;, JsonConvert.SerializeObject(data));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        StartActivity(intent);var intent = new Intent</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void SessionRequestError(BranchError error)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        Console.WriteLine(&quot;Branch session initialization error: &quot; + error.ErrorCode);</span></span>
<span class="line"><span>        Console.WriteLine(error.ErrorMessage);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var intent = new Intent(this, typeof(BranchErrorActivity));</span></span>
<span class="line"><span>        intent.PutExtra(&quot;ErrorCode&quot;, error.ErrorCode);</span></span>
<span class="line"><span>        intent.PutExtra(&quot;ErrorMessage&quot;, error.ErrorMessage);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        StartActivity(intent);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h3 id="_4b-initialize-branch-with-xamarin-forms" tabindex="-1">4b. Initialize Branch With Xamarin.Forms <a class="header-anchor" href="#_4b-initialize-branch-with-xamarin-forms" aria-label="Permalink to &quot;4b. Initialize Branch With Xamarin.Forms&quot;">​</a></h3><p>You can initialize Branch with or without the Xamarin.Forms framework.</p><p>To initialize <strong>with</strong> the framework:</p><h5 id="create-a-class-for-branch-session-handling-1" tabindex="-1">Create a Class for Branch Session Handling <a class="header-anchor" href="#create-a-class-for-branch-session-handling-1" aria-label="Permalink to &quot;Create a Class for Branch Session Handling&quot;">​</a></h5><p>Branch initializes asynchronously, with Branch link parameters being returned following a network call to Branch. If initialization is successful, the <code>InitSessionComplete</code> method will be invoked. If initialization is unsuccessful, the <code>SessionRequestError</code> method will be invoked. Branch Deep Link routing logic should be located in the <code>InitSessionComplete</code> method.</p><ol><li>Right-click on the C# project and select <strong>Add → New File</strong>.</li><li>Select <strong>General → Empty Class</strong>.</li><li>Rename the file <code>TestXamarinFormsApp.cs</code>.</li><li>Add the following code:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using BranchXamarinSDK;</span></span>
<span class="line"><span>        using System.Collections.Generic;</span></span>
<span class="line"><span>        using System.ComponentModel;</span></span>
<span class="line"><span>        using Xamarin.Forms;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TestXamarinFormsApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestXamarinFormsApp</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public class TestXamarinFormsApp : Application, IBranchSessionInterface</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public TestXamarinFormsApp()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #region IBranchSessionInterface implementation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void InitSessionComplete(Dictionary&lt;string, object&gt; data)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void SessionRequestError(BranchError error)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #endregion</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h5 id="create-a-class-for-handling-link-data-1" tabindex="-1">Create a Class for Handling Link Data <a class="header-anchor" href="#create-a-class-for-handling-link-data-1" aria-label="Permalink to &quot;Create a Class for Handling Link Data&quot;">​</a></h5><p>Branch stores link data in an object referred to as the <a href="./create-branch-objects-and-events.html#branch-universal-object">Branch Universal Object</a>, or BUO.</p><ol><li>Right-click on the C# project and select <strong>Add → New File</strong>.</li><li>Select <strong>General →Empty Class</strong>.</li><li>Rename the file <code>TestXamarinFormsAppBUO.cs</code>.</li><li>Add the following code:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using BranchXamarinSDK;</span></span>
<span class="line"><span>        using System.Collections.Generic;</span></span>
<span class="line"><span>        using System.ComponentModel;</span></span>
<span class="line"><span>        using Xamarin.Forms;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TestXamarinFormsApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestXamarinFormsApp</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public class TestXamarinFormsAppBUO : Application, IBranchBUOSessionInterface</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public TestXamarinFormsAppBUO()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #region IBranchBUOSessionInterface implementation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void InitSessionComplete(BranchUniversalObject buo, BranchLinkProperties blp)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void SessionRequestError(BranchError error)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #endregion</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h5 id="configure-application-class" tabindex="-1">Configure Application Class <a class="header-anchor" href="#configure-application-class" aria-label="Permalink to &quot;Configure Application Class&quot;">​</a></h5><p>Within the .Droid project&#39;s <code>Application</code> class:</p><ol><li>Set the Branch SDK&#39;s initialization parameters.</li><li>Override the <code>OnCreate()</code> method so it calls the <code>BranchAndroid.GetAutoInstance</code> method.</li></ol><p>If an <code>Application</code> class does not already exist for the project, create one:</p><ol><li>Right-click on the .Droid project and select <strong>Add →New File</strong>.</li><li>Select <strong>General → Empty Class</strong>.</li><li>Name the file the same name as your app, for example <code>TestXamarinFormsApp</code>.</li><li>Add the following code:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using System;</span></span>
<span class="line"><span>        using Android.App;</span></span>
<span class="line"><span>        using Android.Content;</span></span>
<span class="line"><span>        using Android.Runtime;</span></span>
<span class="line"><span>        using BranchXamarinSDK;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TestXamarinFormsApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestXamarinFormsApp.Droid</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [Application (AllowBackup = true, Icon = &quot;@drawable/icon&quot;, Label = &quot;@string/app_name&quot;)]</span></span>
<span class="line"><span>        [MetaData(&quot;io.branch.sdk.auto_link_disable&quot;, Value = &quot;false&quot;)]</span></span>
<span class="line"><span>        [MetaData(&quot;io.branch.sdk.TestMode&quot;, Value = &quot;true&quot;)]</span></span>
<span class="line"><span>        [MetaData(&quot;io.branch.sdk.BranchKey&quot;, Value = &quot;@string/branch_key&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public class App : Application</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public App(IntPtr javaReference, JniHandleOwnership transfer) : base(javaReference, transfer)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override void OnCreate()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnCreate();</span></span>
<span class="line"><span>        BranchAndroid.GetAutoInstance(this.ApplicationContext);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody><tr><td><code>io.branch.sdk.TestMode</code></td><td>Setting this parameter to <code>true</code> enables Debug Mode, which causes simple uninstall/reinstalls of the app to trigger Install events. Be sure to disable this before deploying to production. Note that enabling Debug Mode on Android also forces the app to use the Branch test key if this key has been added to the project. Apps running with a test key will be unable to receive data from Branch Deep Links created with the live key.</td></tr><tr><td><code>io.branch.sdk.BranchKey</code></td><td>The app&#39;s Branch key. Both a live key and a test key can be added to the <code>Strings.xml</code> file. When test mode is enabled, the app will automatically use the test key if one has been specified.</td></tr></tbody></table><h5 id="initialize-branch" tabindex="-1"><strong>Initialize Branch</strong> <a class="header-anchor" href="#initialize-branch" aria-label="Permalink to &quot;**Initialize Branch**&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using System;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        using Android.App;</span></span>
<span class="line"><span>        using Android.Content;</span></span>
<span class="line"><span>        using Android.Content.PM;</span></span>
<span class="line"><span>        using Android.Runtime;</span></span>
<span class="line"><span>        using Android.Views;</span></span>
<span class="line"><span>        using Android.Widget;</span></span>
<span class="line"><span>        using Android.OS;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        using BranchXamarinSDK;</span></span>
<span class="line"><span>        using TestXamarinFormsApp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Replace \`TestXamarinFormsApp\` with actual name of your app</span></span>
<span class="line"><span>        namespace TestXamarinFormsApp.Droid</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        [Activity(Label = &quot;TestXamarinFormsApp.Droid&quot;, LaunchMode = LaunchMode.SingleTask, Icon = &quot;@drawable/icon&quot;, Theme = &quot;@style/MyTheme&quot;, MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [IntentFilter(new[] { &quot;android.intent.action.VIEW&quot; },</span></span>
<span class="line"><span>        Categories = new[] { &quot;android.intent.category.DEFAULT&quot;, &quot;android.intent.category.BROWSABLE&quot; },</span></span>
<span class="line"><span>        DataScheme = &quot;testxamarinformsapp&quot;,</span></span>
<span class="line"><span>        DataHost = &quot;open&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [IntentFilter(new[] { &quot;android.intent.action.VIEW&quot; },</span></span>
<span class="line"><span>        Categories = new[] { &quot;android.intent.category.DEFAULT&quot;, &quot;android.intent.category.BROWSABLE&quot; },</span></span>
<span class="line"><span>        DataScheme = &quot;https&quot;,</span></span>
<span class="line"><span>        DataHost = &quot;testxamarinformsapp.app.link&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        protected override void OnCreate(Bundle savedInstanceState)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnCreate(savedInstanceState);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        global::Xamarin.Forms.Forms.Init(this, savedInstanceState);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        TestXamarinFormsAppBUO linkData = new TestXamarinFormsAppBUO();</span></span>
<span class="line"><span>        BranchAndroid.Init(this, GetString(Resource.String.branch_key), linkData);</span></span>
<span class="line"><span>        LoadApplication(linkData);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        protected override void OnNewIntent(Intent intent)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        this.Intent = intent;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h2 id="troubleshoot" tabindex="-1">Troubleshoot <a class="header-anchor" href="#troubleshoot" aria-label="Permalink to &quot;Troubleshoot&quot;">​</a></h2><h4 id="ios-1" tabindex="-1">iOS <a class="header-anchor" href="#ios-1" aria-label="Permalink to &quot;iOS&quot;">​</a></h4><h6 id="deep-link-testing" tabindex="-1">Deep Link Testing <a class="header-anchor" href="#deep-link-testing" aria-label="Permalink to &quot;Deep Link Testing&quot;">​</a></h6><p>To test whether your app is properly configured to support Branch Deep Links:</p><h6 id="nuget-package-failures" tabindex="-1">NuGet Package Failures <a class="header-anchor" href="#nuget-package-failures" aria-label="Permalink to &quot;NuGet Package Failures&quot;">​</a></h6><p>Adding required NuGet packages to the C# project may fail if the project has not been configured to use PCL 4.5 - Profile78. To solve this:</p><ol><li>Right-click on the project name and select <strong>Options</strong>.</li><li>Browse the menu to <strong>Build → General</strong>.</li><li>Change the <strong>Current Profile</strong> to <strong>PCL 4.5 - Profile78</strong> and try again.</li></ol><h6 id="provisioning-profile-failures" tabindex="-1">Provisioning Profile Failures <a class="header-anchor" href="#provisioning-profile-failures" aria-label="Permalink to &quot;Provisioning Profile Failures&quot;">​</a></h6><p>Xamarin automatically populates the Bundle Identifier field in the <code>Info.plist</code> file with an all-lowercase value derived from the app&#39;s name. This value is in fact case-sensitive and must match the value in the Apple Developer Portal precisely. The default Xamarin configuration may work when there are no entitlements configured, and then suddenly begin failing after entitlements have been added.</p><p>This issue can be resolved by ensuring that the Bundle Identifier in the <code>Info.plist</code> matches the Bundle Identifier shown on the Apple Developer Portal. To make this change:</p><ol><li>Open the <code>Info.plist</code> file.</li><li>Enter the app&#39;s Bundle Identifier from the Apple Developer Portal in the Bundle Identifier field.</li></ol><h4 id="android-1" tabindex="-1">Android <a class="header-anchor" href="#android-1" aria-label="Permalink to &quot;Android&quot;">​</a></h4><h6 id="deep-link-testing-1" tabindex="-1">Deep Link Testing <a class="header-anchor" href="#deep-link-testing-1" aria-label="Permalink to &quot;Deep Link Testing&quot;">​</a></h6><p>To test whether your app is properly configured to support Branch Deep Links:</p><h6 id="linking-errors-during-build" tabindex="-1">Linking Errors During Build <a class="header-anchor" href="#linking-errors-during-build" aria-label="Permalink to &quot;Linking Errors During Build&quot;">​</a></h6><p>The <code>Newtonsoft.Json</code> NuGet package is automatically added to a project when the <code>Branch-Xamarin-Linking-SDK</code> package is added. There is a known issue with this package that results in linking errors when building a project:</p><p><em>error XA0009: Error while loading assembly: /Users/david/Projects/TestXamarinFormsApp/Droid/obj/Debug/android/assets/mscorlib.dll</em></p><p>To resolve this issue:</p><ol><li>Right-click on the project and select <strong>Options</strong>.</li><li>Go to <strong>Android Build</strong> and select the <strong>Linker</strong> tab.</li><li>Select <strong>Release</strong>.</li><li>Go to the <strong>Ignore Assemblies</strong> box.</li><li>Add <strong>System.Core</strong> to the assemblies.</li><li>Rebuild the app.</li></ol><h2 id="faqs" tabindex="-1">FAQs <a class="header-anchor" href="#faqs" aria-label="Permalink to &quot;FAQs&quot;">​</a></h2><details><summary>Why am I receiving the error “Value can not be null error in Xamarin SDK”?</summary><p>The error usually comes when you are using &quot;IBranchBUOSessionInterface&quot; in our Xamarin SDK. This is currently a bug and the workaround available right now is to use &quot;IBranchSessionInterface&quot; only which is the non-BUO method.</p></details>`,113)])])}const g=a(i,[["render",t]]);export{u as __pageData,g as default};

import{_ as a,o as n,c as i,ae as t}from"./chunks/framework.B6gjLfeO.js";const g=JSON.parse('{"title":"MAUI Configuration","description":"","frontmatter":{"title":"MAUI Configuration","slug":"maui-configuration"},"headers":[],"relativePath":"developer-hub/maui-configuration.md","filePath":"developer-hub/maui-configuration.md"}'),e={name:"developer-hub/maui-configuration.md"};function p(l,s,o,r,c,h){return n(),i("div",null,[...s[0]||(s[0]=[t(`<h2 id="_1-set-target-platforms" tabindex="-1">1. Set Target Platforms <a class="header-anchor" href="#_1-set-target-platforms" aria-label="Permalink to &quot;1. Set Target Platforms&quot;">​</a></h2><p>Update your project&#39;s target platforms:</p><ol><li>Open Visual Studio and right-click on your project, then select <strong>Properties → Build → Target Platforms</strong>.</li><li>Check the <strong>Enable targeting the Android platform</strong> box and make sure the <strong>Target .NET Runtime</strong> is set to <strong>.NET 7.0</strong> - also confirm you have the appropriate <strong>Target Android version</strong> and <strong>Minimum Android version</strong> set.</li><li>Check the <strong>Enable targeting the iOS platform</strong> box and make sure the <strong>Target .NET Runtime</strong> is set to <strong>.NET 7.0</strong> - also confirm you have the appropriate <strong>Target iOS version</strong> and <strong>Minimum iOS version</strong> set.</li></ol><h2 id="_2-install-branch-nuget-package" tabindex="-1">2. Install Branch NuGet Package <a class="header-anchor" href="#_2-install-branch-nuget-package" aria-label="Permalink to &quot;2. Install Branch NuGet Package&quot;">​</a></h2><p><strong>IMPORTANT</strong>: MAUI applications should use versions 9.0.0 or higher of the <code>Branch-Xamarin-Linking-SDK</code> <a href="https://www.nuget.org/packages/Branch-Xamarin-Linking-SDK" target="_blank" rel="noreferrer">NuGet package</a> - lower versions are for Xamarin applications.</p><p>To add the Branch NuGet package to your project:</p><ol><li>Right-click on your project and select <strong>Add → Add NuGet Packages</strong>.</li><li>Find the <code>Branch-Xamarin-Linking-SDK</code> package and add it to the project. Make sure you are using version 9.0.0 or higher for a Xamarin application.</li></ol><h2 id="_3-configure-app" tabindex="-1">3. Configure App <a class="header-anchor" href="#_3-configure-app" aria-label="Permalink to &quot;3. Configure App&quot;">​</a></h2><h3 id="ios" tabindex="-1">iOS <a class="header-anchor" href="#ios" aria-label="Permalink to &quot;iOS&quot;">​</a></h3><h4 id="_1-configure-branch" tabindex="-1">1. Configure Branch <a class="header-anchor" href="#_1-configure-branch" aria-label="Permalink to &quot;1. Configure Branch&quot;">​</a></h4><p>Now that you have completed the general project setup requirements in Visual Studio, <a href="./ios-basic-integration.html#1-configure-branch-dashboard">configure</a> the iOS settings of your MAUI application in Branch:</p><h4 id="_2-update-info-plist-file" tabindex="-1">2. Update <code>Info.plist</code> File <a class="header-anchor" href="#_2-update-info-plist-file" aria-label="Permalink to &quot;2. Update \`Info.plist\` File&quot;">​</a></h4><ol><li>Navigate to <strong>Project/Platforms/iOS/Info.plist</strong>, then right-click on the file and select <strong>Open With</strong>. Choose the editor you would like to use.</li><li>Update your <code>Info.plist</code> file so it has the <code>CFBundleIdentifier</code> and <code>CFBundleURLTypes</code> keys, as shown in this sample file:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>        &lt;!DOCTYPE plist PUBLIC &quot;-//Apple//DTD PLIST 1.0//EN&quot; &quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;&gt;</span></span>
<span class="line"><span>        &lt;plist version=&quot;1.0&quot;&gt;</span></span>
<span class="line"><span>        &lt;dict&gt;</span></span>
<span class="line"><span>        &lt;key&gt;LSRequiresIPhoneOS&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;true/&gt;</span></span>
<span class="line"><span>        &lt;key&gt;UIDeviceFamily&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>        &lt;integer&gt;1&lt;/integer&gt;</span></span>
<span class="line"><span>        &lt;integer&gt;2&lt;/integer&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>        &lt;key&gt;UIRequiredDeviceCapabilities&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>        &lt;string&gt;arm64&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>        &lt;key&gt;UISupportedInterfaceOrientations&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>        &lt;string&gt;UIInterfaceOrientationPortrait&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;string&gt;UIInterfaceOrientationLandscapeLeft&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;string&gt;UIInterfaceOrientationLandscapeRight&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>        &lt;key&gt;UISupportedInterfaceOrientations~ipad&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>        &lt;string&gt;UIInterfaceOrientationPortrait&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;string&gt;UIInterfaceOrientationPortraitUpsideDown&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;string&gt;UIInterfaceOrientationLandscapeLeft&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;string&gt;UIInterfaceOrientationLandscapeRight&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>        &lt;key&gt;XSAppIconAssets&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;string&gt;Assets.xcassets/appicon.appiconset&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;key&gt;CFBundleIdentifier&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;string&gt;io.Branch.MyMauiApp&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;key&gt;CFBundleURLTypes&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>        &lt;dict&gt;</span></span>
<span class="line"><span>        &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>        &lt;string&gt;MyMauiApp&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>        &lt;/dict&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>        &lt;/dict&gt;</span></span>
<span class="line"><span>        &lt;/plist&gt;</span></span></code></pre></div><h4 id="_3-add-associated-domains-in-entitlements-plist" tabindex="-1">3. Add Associated Domains in <code>Entitlements.plist</code> <a class="header-anchor" href="#_3-add-associated-domains-in-entitlements-plist" aria-label="Permalink to &quot;3. Add Associated Domains in \`Entitlements.plist\`&quot;">​</a></h4><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-hcs8V" id="tab-R7WONzQ" checked><label data-title="New Branch" for="tab-R7WONzQ">New Branch</label><input type="radio" name="group-hcs8V" id="tab-ZW1Mgat"><label data-title="Legacy Branch" for="tab-ZW1Mgat">Legacy Branch</label></div><div class="blocks"><div class="language-xml vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;?</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xml</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.0&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> encoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UTF-8&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">?&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;!</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DOCTYPE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> plist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PUBLIC &quot;-//Apple//DTD PLIST 1.0//EN&quot; &quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">plist</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;com.apple.developer.associated-domains&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;applinks:h06h3.app.link&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;applinks:h06h3-alternate.app.link&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">plist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;?</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xml</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.0&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> encoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UTF-8&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">?&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;!</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DOCTYPE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> plist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PUBLIC &quot;-//Apple//DTD PLIST 1.0//EN&quot; &quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">plist</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;com.apple.developer.associated-domains&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;applinks:h06h3.app.link&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;applinks:h06h3-alternate.app.link&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">plist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></div></div><h4 id="_4-configure-bundle-signing" tabindex="-1">4. Configure Bundle Signing <a class="header-anchor" href="#_4-configure-bundle-signing" aria-label="Permalink to &quot;4. Configure Bundle Signing&quot;">​</a></h4><ol><li>Make sure that your Apple Developer Account is associated with your solution. To do this, go to <strong>Tools → Preferences</strong> and <a href="https://learn.microsoft.com/en-us/dotnet/maui/ios/apple-account-management?tabs=vs#add-an-apple-developer-account" target="_blank" rel="noreferrer">sign in to your account</a>.</li><li>Right-click on your project, then navigate to <strong>Properties</strong>. Open the <strong>Bundle Signing</strong> section under <strong>iOS</strong>.</li><li>In the <strong>Custom Entitlements</strong> field, add the path to the <code>Entitlements.plist</code> file you <a href="./maui-configuration.html#add-associated-domains-in-entitlementsplist">created</a>.</li><li>Make sure the appropriate options are selected for <strong>Signing Identity</strong> and <strong>Provisioning Profile</strong>.</li></ol><h4 id="_5-update-appdelegate-cs-file" tabindex="-1">5. Update <code>AppDelegate.cs</code> File <a class="header-anchor" href="#_5-update-appdelegate-cs-file" aria-label="Permalink to &quot;5. Update \`AppDelegate.cs\` File&quot;">​</a></h4><p>Use the following sample file to update your <code>AppDelegate.cs</code> file to initialize Branch and turn on logging. Import the Branch SDK at the top of the file and replace <code>key_live_&lt;YOUR-GUID-HERE&gt;</code> with your Branch key:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using BranchSDK;</span></span>
<span class="line"><span>        using Foundation;</span></span>
<span class="line"><span>        using UIKit;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        namespace MyMauiApp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [Register(&quot;AppDelegate&quot;)]</span></span>
<span class="line"><span>        public class AppDelegate : MauiUIApplicationDelegate, IBranchSessionInterface</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        protected override MauiApp CreateMauiApp() =&gt; MyMauiApp.MauiProgram.CreateMauiApp();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override bool FinishedLaunching(UIApplication application, NSDictionary launchOptions)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        Branch.EnableLogging = true;</span></span>
<span class="line"><span>        BranchIOS.Init(&quot;key_live_&lt;YOUR-GUIDE-HERE&gt;&quot;, launchOptions, this);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return base.FinishedLaunching(application, launchOptions);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Handle URI opens</span></span>
<span class="line"><span>        public override bool OpenUrl(UIApplication application, NSUrl url, NSDictionary options)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        return BranchIOS.getInstance().OpenUrl(url);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Handle Universal Links</span></span>
<span class="line"><span>        public override bool ContinueUserActivity(UIApplication application, NSUserActivity userActivity, UIApplicationRestorationHandler completionHandler)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        return BranchIOS.getInstance().ContinueUserActivity(userActivity);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void InitSessionComplete(Dictionary&lt;string, object&gt; data)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        LogMessage(&quot;InitSessionComplete: &quot;);</span></span>
<span class="line"><span>        foreach (var key in data.Keys)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        LogMessage(key + &quot; : &quot; + data[key].ToString());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void SessionRequestError(BranchError error)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        LogMessage(&quot;SessionRequestError: &quot;);</span></span>
<span class="line"><span>        LogMessage(&quot;Error Message: &quot; + error.ErrorMessage);</span></span>
<span class="line"><span>        LogMessage(&quot;Error Code: &quot; + error.ErrorCode);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        void LogMessage(string message)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        Console.WriteLine(message);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h3 id="android" tabindex="-1">Android <a class="header-anchor" href="#android" aria-label="Permalink to &quot;Android&quot;">​</a></h3><h4 id="_1-configure-branch-1" tabindex="-1">1. Configure Branch <a class="header-anchor" href="#_1-configure-branch-1" aria-label="Permalink to &quot;1. Configure Branch&quot;">​</a></h4><p>Now that you have completed the general project setup requirements in Visual Studio, <a href="./android-basic-integration.html#configure-branch-dashboard">configure</a> the Android settings of your MAUI application in Branch:</p><h4 id="_2-update-androidmanifest-xml-file" tabindex="-1">2. Update <code>AndroidManifest.xml</code> File <a class="header-anchor" href="#_2-update-androidmanifest-xml-file" aria-label="Permalink to &quot;2. Update \`AndroidManifest.xml\` File&quot;">​</a></h4><p>Although you have already set the minimum and target Android versions in your project&#39;s properties, you also need to do this in the <code>AndroidManifest.xml</code> file. You also need to set your Branch key in the file:</p><ol><li>Navigate to <strong>Project/Platforms/Android/AndroidManifest.xml</strong>, then right-click on the file and select <strong>Open With</strong>. Choose the editor you would like to use.</li><li>Use the following sample code to update your <code>AndroidManifest.xml</code> file. Add a <code>&lt;meta-data&gt;</code> field for your Branch key and a <code>&lt;uses-sdk&gt;</code> field for your minimum/target version values:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span></span>
<span class="line"><span>        &lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot; package=&quot;io.Branch.MyMauiApp&quot; android:versionCode=&quot;1&quot; android:versionName=&quot;1.0&quot;&gt;</span></span>
<span class="line"><span>        &lt;application android:allowBackup=&quot;true&quot; android:icon=&quot;@mipmap/appicon&quot; android:supportsRtl=&quot;true&quot; android:label=&quot;MyMauiApp&quot;&gt;</span></span>
<span class="line"><span>        &lt;meta-data android:name=&quot;io.branch.sdk.BranchKey&quot; android:value=&quot;@string/branch_key&quot; /&gt;</span></span>
<span class="line"><span>        &lt;/application&gt;</span></span>
<span class="line"><span>        &lt;uses-permission android:name=&quot;android.permission.ACCESS_NETWORK_STATE&quot; /&gt;</span></span>
<span class="line"><span>        &lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;</span></span>
<span class="line"><span>        &lt;uses-sdk android:minSdkVersion=&quot;21&quot; android:targetSdkVersion=&quot;33&quot; /&gt;</span></span>
<span class="line"><span>        &lt;/manifest&gt;</span></span></code></pre></div><h4 id="_3-add-strings-xml-file" tabindex="-1">3. Add <code>strings.xml</code> File <a class="header-anchor" href="#_3-add-strings-xml-file" aria-label="Permalink to &quot;3. Add \`strings.xml\` File&quot;">​</a></h4><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-FYGwh" id="tab-RI7rgEd" checked><label data-title="New Branch" for="tab-RI7rgEd">New Branch</label><input type="radio" name="group-FYGwh" id="tab-w3hpaN0"><label data-title="Legacy Branch" for="tab-w3hpaN0">Legacy Branch</label></div><div class="blocks"><div class="language-xml vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;?</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xml</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.0&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> encoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UTF-8&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ?&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;branch_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;key_live_YOUR-GUID-HERE&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;?</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">xml</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.0&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> encoding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UTF-8&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ?&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;branch_key&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;key_live_YOUR-GUID-HERE&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                            &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></div></div><h4 id="_4-update-mainactivity-cs-file" tabindex="-1">4. Update <code>MainActivity.cs</code> File <a class="header-anchor" href="#_4-update-mainactivity-cs-file" aria-label="Permalink to &quot;4. Update \`MainActivity.cs\` File&quot;">​</a></h4><p>Use the following sample code to update the <code>MainActivity</code> class in your <code>MainActivity.cs</code> file. Give the <code>Activity</code> a name, set a <code>LaunchMode</code>, implement <code>IBranchSessionInterface</code>, and replace <code>key_live_YOUR-GUID-HERE</code> with your Branch key:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using Android.App;</span></span>
<span class="line"><span>        using Android.Content.PM;</span></span>
<span class="line"><span>        using Android.OS;</span></span>
<span class="line"><span>        using BranchSDK;</span></span>
<span class="line"><span>        using Android.Content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        namespace MyMauiApp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [IntentFilter(new[] { &quot;android.intent.action.VIEW&quot; },</span></span>
<span class="line"><span>        Categories = new[] { &quot;android.intent.category.DEFAULT&quot;, &quot;android.intent.category.BROWSABLE&quot; },</span></span>
<span class="line"><span>        DataScheme = &quot;MyMauiApp&quot;,</span></span>
<span class="line"><span>        DataHost = &quot;open&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [IntentFilter(new[] { &quot;android.intent.action.VIEW&quot; },</span></span>
<span class="line"><span>        Categories = new[] { &quot;android.intent.category.DEFAULT&quot;, &quot;android.intent.category.BROWSABLE&quot; },</span></span>
<span class="line"><span>        DataScheme = &quot;https&quot;,</span></span>
<span class="line"><span>        DataHost = &quot;MyMauiApp.app.link&quot;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        /*</span></span>
<span class="line"><span>        * Update the Activity</span></span>
<span class="line"><span>        *</span></span>
<span class="line"><span>        * Add a \`Name\` so this Activity can be located by name</span></span>
<span class="line"><span>        * Set the \`LaunchMode\` (\`SingleTop\` or \`SingleTask\` is recommended)</span></span>
<span class="line"><span>        *</span></span>
<span class="line"><span>        * Implement \`IBranchSessionInterface\` to get Branch payloads</span></span>
<span class="line"><span>        *</span></span>
<span class="line"><span>        */</span></span>
<span class="line"><span>        [Activity(Name = &quot;io.Branch.MyMauiApp.MainActivity&quot;, Theme = &quot;@style/Maui.SplashTheme&quot;, MainLauncher = true, LaunchMode = LaunchMode.SingleTop, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize | ConfigChanges.Density)]</span></span>
<span class="line"><span>        public class MainActivity : MauiAppCompatActivity, IBranchSessionInterface</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        protected override void OnCreate(Bundle savedInstanceState)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnCreate(saavedInstanceState);</span></span>
<span class="line"><span>        BranchAndroid.Init(this, &quot;key_live_&lt;YOUR-GUID-HERE&gt;&quot;, this);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        protected override void OnNewIntent(Intent intent)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnNewIntent(intent);</span></span>
<span class="line"><span>        intent.PutExtra(&quot;branch_force_new_session&quot;, true);</span></span>
<span class="line"><span>        Intent = intent;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void InitSessionComplete(Dictionary&lt;string, object&gt; data)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        if (data == null)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        LogMessage(&quot; InitSessionComplete with data: null&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        var dataString = string.Join(&quot;, &quot;, data.Select(kvp =&gt; $&quot;{kvp.Key}: {kvp.Value?.ToString() ?? &quot;null&quot;}&quot;));</span></span>
<span class="line"><span>        LogMessage($&quot;InitSessionComplete with data: {dataString}&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public void SessionRequestError(BranchError error)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        LogMessage(&quot;SessionRequestError: &quot;);</span></span>
<span class="line"><span>        LogMessage(&quot;Error Message: &quot; + error.ErrorMessage);</span></span>
<span class="line"><span>        LogMessage(&quot;Error Code: &quot; + error.ErrorCode);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        void LogMessage(string message)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        Console.WriteLine(message);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h4 id="_5-update-mainapplication-cs-file" tabindex="-1">5. Update <code>MainApplication.cs</code> File <a class="header-anchor" href="#_5-update-mainapplication-cs-file" aria-label="Permalink to &quot;5. Update \`MainApplication.cs\` File&quot;">​</a></h4><p>Use the following sample code to add Branch initialization and logging to your <code>MainApplication.cs</code> file:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using Android.App;</span></span>
<span class="line"><span>        using Android.Runtime;</span></span>
<span class="line"><span>        using BranchSDK;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        namespace MyMauiApp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [Application]</span></span>
<span class="line"><span>        public class MainApplication : MauiApplication</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        public MainApplication(IntPtr handle, JniHandleOwnership ownership)</span></span>
<span class="line"><span>        : base(handle, ownership)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public override void OnCreate()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        base.OnCreate();</span></span>
<span class="line"><span>        Branch.EnableLogging = true;</span></span>
<span class="line"><span>        BranchAndroid.GetAutoInstance(ApplicationContext);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        protected override MauiApp CreateMauiApp() =&gt; MauiProgram.CreateMauiApp();</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h2 id="_4-send-branch-events" tabindex="-1">4. Send Branch Events <a class="header-anchor" href="#_4-send-branch-events" aria-label="Permalink to &quot;4. Send Branch Events&quot;">​</a></h2><p>To start sending Branch Events, update your <code>MainPage.xaml.cs</code> code to use the Branch <code>SendEvent()</code> method:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using BranchSDK;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        namespace MyMauiApp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public partial class MainPage : ContentPage</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        int count = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public MainPage()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        InitializeComponent();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        private void OnCounterClicked(object sender, EventArgs e)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        count++;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (count == 1)</span></span>
<span class="line"><span>        CounterBtn.Text = $&quot;Clicked {count} time&quot;;</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>        CounterBtn.Text = $&quot;Clicked {count} times&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        SemanticScreenReader.Announce(CounterBtn.Text);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Send Branch Test Event</span></span>
<span class="line"><span>        SendEvent();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        void SendEvent()</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        BranchEvent branchEvent = new BranchEvent(BranchEventType.PURCHASE);</span></span>
<span class="line"><span>        branchEvent.SetAlias(&quot;new_user_purchase&quot;);</span></span>
<span class="line"><span>        branchEvent.SetRevenue((float)1.5);</span></span>
<span class="line"><span>        branchEvent.SetShipping((float)10.5);</span></span>
<span class="line"><span>        branchEvent.SetCurrency(BranchCurrencyType.USD);</span></span>
<span class="line"><span>        branchEvent.SetTax((float)12.3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        BranchUniversalObject buo1 = new BranchUniversalObject();</span></span>
<span class="line"><span>        buo1.canonicalIdentifier = &quot;id12345&quot;;</span></span>
<span class="line"><span>        buo1.title = &quot;id12345 title&quot;;</span></span>
<span class="line"><span>        buo1.contentDescription = &quot;ITEM 1&quot;;</span></span>
<span class="line"><span>        BranchUniversalObject buo2 = new BranchUniversalObject();</span></span>
<span class="line"><span>        buo2.canonicalIdentifier = &quot;id12345&quot;;</span></span>
<span class="line"><span>        buo2.title = &quot;id12345 title&quot;;</span></span>
<span class="line"><span>        buo2.contentDescription = &quot;ITEM 2&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        List&lt;BranchUniversalObject&gt; list = new List&lt;BranchUniversalObject&gt;();</span></span>
<span class="line"><span>        list.Add(buo1);</span></span>
<span class="line"><span>        list.Add(buo2);</span></span>
<span class="line"><span>        branchEvent.AddContentItems(list);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Branch.GetInstance().SendEvent(branchEvent);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div><p>You can now create <a href="./create-branch-objects-and-events.html#branch-universal-object">Branch Universal Objects</a> and log various types of <a href="./dotnet-feature-implementation.html#event-tracking">Branch Events</a>.</p><h2 id="_5-test" tabindex="-1">5. Test <a class="header-anchor" href="#_5-test" aria-label="Permalink to &quot;5. Test&quot;">​</a></h2><p>Test that your application is sending Branch Events as expected:</p><h2 id="_6-troubleshoot" tabindex="-1">6. Troubleshoot <a class="header-anchor" href="#_6-troubleshoot" aria-label="Permalink to &quot;6. Troubleshoot&quot;">​</a></h2><h4 id="maui-sample-application" tabindex="-1">MAUI Sample Application <a class="header-anchor" href="#maui-sample-application" aria-label="Permalink to &quot;MAUI Sample Application&quot;">​</a></h4><p><strong>Full application</strong>: <a href="https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber" target="_blank" rel="noreferrer">https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber</a></p><p><strong>iOS configuration</strong>: <a href="https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber/Platforms/iOS" target="_blank" rel="noreferrer">https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber/Platforms/iOS</a></p><p><strong>Android configuration</strong>: <a href="https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber/Platforms/Android" target="_blank" rel="noreferrer">https://github.com/BranchMetrics/xamarin-branch-deep-linking-attribution/tree/master/Timber/Platforms/Android</a></p><h4 id="visual-studio" tabindex="-1">Visual Studio <a class="header-anchor" href="#visual-studio" aria-label="Permalink to &quot;Visual Studio&quot;">​</a></h4><ul><li>Visual Studio aggressively caches build products, so make sure your build folder has no errors.</li><li>Confirm you are using the correct Branch NuGet package. MAUI applications <strong>should use versions 9.0.0 or higher</strong> of the <code>Branch-Xamarin-Linking-SDK</code> NuGet package (lower versions are for Xamarin applications).</li></ul><h4 id="ios-1" tabindex="-1">iOS <a class="header-anchor" href="#ios-1" aria-label="Permalink to &quot;iOS&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Issue</th><th>Solution</th></tr></thead><tbody><tr><td>Universal links do not work</td><td>Your <code>Entitlements.plist</code> file is likely not set up correctly. Check the format, that it is included in Visual Studio, and the Apple account logged-in and associated with the project can manage signing.</td></tr><tr><td>Integrity verification error</td><td>Causes app install to fail and means that the logged-in Apple Developer account does not have permission to sign for the app. Either switch accounts or request access from your organization.</td></tr></tbody></table><h4 id="android-1" tabindex="-1">Android <a class="header-anchor" href="#android-1" aria-label="Permalink to &quot;Android&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Issue</th><th>Solution</th></tr></thead><tbody><tr><td>&quot;Unable to find BranchAndroid&quot;</td><td>Use a .NET 7 test app because .NET 6 is unreliable about resolving it’s Android dependencies.</td></tr><tr><td>Minimum version error</td><td>Make sure you have set an appropriate minimum version in both <strong>Project → Properties → Target Platforms</strong> as well as your <code>AndroidManifest.xml</code> file.</td></tr><tr><td>JIN exception at runtime</td><td>Within <code>MainApplication.cs</code>, the <code>BranchAndroid.GetAutoInstance(ApplicationContext)</code> function fails with a JNI error. This can occur due to a missing Branch key. Set the key both programmatically and within the <code>AndroidManifest.xml</code> file.</td></tr><tr><td>&quot;Mismatch between instruction set variant of device&quot;</td><td>App fails to run on device and error appears in logcat. To fix this, make sure you are using release builds for devices, not debug builds.</td></tr><tr><td>&quot;Installation of the app failed&quot;</td><td>Make sure you are using debug builds for simulators, not release builds.</td></tr></tbody></table>`,53)])])}const u=a(e,[["render",p]]);export{g as __pageData,u as default};

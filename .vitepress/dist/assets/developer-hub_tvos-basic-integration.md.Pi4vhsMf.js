import{_ as a,o as s,c as e,ae as p}from"./chunks/framework.B6gjLfeO.js";const u=JSON.parse('{"title":"tvOS Basic Integration","description":"","frontmatter":{"title":"tvOS Basic Integration","slug":"tvos-basic-integration"},"headers":[],"relativePath":"developer-hub/tvos-basic-integration.md","filePath":"developer-hub/tvos-basic-integration.md"}'),i={name:"developer-hub/tvos-basic-integration.md"};function t(o,n,l,r,c,d){return s(),e("div",null,[...n[0]||(n[0]=[p(`<div class="tip custom-block"><p class="custom-block-title">SDK Stats</p><p><strong>Open Source Github Repo</strong>: <a href="https://github.com/BranchMetrics/ios-branch-deep-linking" target="_blank" rel="noreferrer">https://github.com/BranchMetrics/ios-branch-deep-linking</a></p><p><strong>SDK Size</strong>: ~220kb (with all Branch features enabled)</p><p><strong>Speed</strong>: Median 80ms to 250ms</p><p><strong>Minimum XCode Version</strong>: 12+</p><p><strong>Minimum OS version</strong>: iOS 9+</p></div><div class="info custom-block"><p class="custom-block-title">iOS 14 Implementation</p><p>In order to give you full control over the user experience, the Branch SDK will not trigger the IDFA permission modal.</p><p>However, we will still collect and use IDFAs when available if you do choose to trigger the modal.</p><p><a href="./ios-14-faqs.html#apptrackingtransparency">LEARN MORE</a></p></div><h2 id="configure-branch" tabindex="-1">Configure Branch <a class="header-anchor" href="#configure-branch" aria-label="Permalink to &quot;Configure Branch&quot;">​</a></h2><p>tvOS uses the same Universal Links as iOS. It does not support redirect to URI scheme or web.</p><ul><li><p><a href="./configure-default-link-behaviors.html">Configure the default link settings</a> for your app</p></li><li><p>Make sure <code>I have an iOS app</code> and <code>Enable Universal Links</code> are selected:</p><ul><li><strong>New Branch</strong>: In the left-hand navigation, go to <strong>Configuration</strong> and click on <strong>Link Controls</strong>. Navigate to the <strong>Link Routing Rules</strong> tab and find the <strong>Mobile Routing</strong> section.</li><li><strong>Legacy Branch</strong>: Navigate to the <a href="https://branch.dashboard.branch.io/configuration/general" target="_blank" rel="noreferrer">Configuration page</a> and find the iOS section.</li></ul></li></ul><p><em>[Image: 1590]</em></p><h2 id="configure-bundle-identifier" tabindex="-1">Configure Bundle Identifier <a class="header-anchor" href="#configure-bundle-identifier" aria-label="Permalink to &quot;Configure Bundle Identifier&quot;">​</a></h2><ul><li><p>Make sure Bundle Id matches the info in Branch:</p><ul><li><strong>New Branch</strong>: In the left-hand navigation, go to <strong>Configuration</strong> and select <strong>Link Controls</strong>. Navigate to the <strong>Link Routing Rules</strong> tab, then find the <strong>Mobile Routing</strong> section and select <strong>iOS</strong>.</li><li><strong>Legacy Branch</strong>: Navigate to the <a href="https://dashboard.branch.io/settings/link" target="_blank" rel="noreferrer">Link Settings page</a>.</li></ul></li></ul><p><em>[Image: 1912]</em></p><p>Branch assumes you use the same bundle id for all Apple platforms. If you use different bundle ids, you can set the bundle id to a consistent value when initializing the Branch SDK.</p><h2 id="configure-associated-domains" tabindex="-1">Configure Associated Domains <a class="header-anchor" href="#configure-associated-domains" aria-label="Permalink to &quot;Configure Associated Domains&quot;">​</a></h2><ul><li><p>In the Xcode <code>Signing &amp; Capabilities</code> tab, add <code>Associated Domains</code></p></li><li><p>Add your link domains from Branch:</p><ul><li><strong>New Branch</strong>: In the left-hand navigation, go to <strong>Configuration</strong> and select <strong>Link Controls</strong>. Find your link domains in the <strong>Link Routing Rules</strong> tab.</li><li><strong>Legacy Branch</strong>: Navigate to the <a href="https://dashboard.branch.io/settings/link" target="_blank" rel="noreferrer">Link Settings page</a> to find your link domains.</li></ul></li><li><p><code>-alternate</code> is needed for Universal Linking with the <a href="./web-sdk-overview.html">Web SDK</a> inside your Website</p></li><li><p><code>test-</code> is needed if you need use a test key</p></li><li><p>If you use a <a href="https://help.branch.io" target="_blank" rel="noreferrer">custom link domain</a>, you will need to include your old link domain, your <code>-alternate</code> link domain, and your new link domain</p></li></ul><p><em>[Image: 1918]</em></p><h2 id="configure-info-plist" tabindex="-1">Configure Info.plist <a class="header-anchor" href="#configure-info-plist" aria-label="Permalink to &quot;Configure Info.plist&quot;">​</a></h2><ul><li><p>Add Branch values:</p><ul><li><p><strong>New Branch</strong>: In the left-hand navigation, go to <strong>Configuration</strong> and select <strong>Keys &amp; Domain</strong> to find your Branch key and link domain.</p><ul><li>Add <code>branch_universal_link_domains</code> with your live key domain</li><li>Add <code>branch_key</code> with your current Branch key</li><li>Add your URI scheme as <code>URL Types</code> -&gt; <code>Item 0</code> -&gt; <code>URL Schemes</code></li></ul></li><li><p><strong>Legacy Branch</strong>: Navigate to the <a href="https://dashboard.branch.io/account-settings/app" target="_blank" rel="noreferrer">Account Settings page</a> to find your Branch key and link domain.</p><ul><li>Add <code>branch_universal_link_domains</code> with your live key domain</li><li>Add <code>branch_key</code> with your current Branch key</li><li>Add your URI scheme as <code>URL Types</code> -&gt; <code>Item 0</code> -&gt; <code>URL Schemes</code></li></ul></li></ul></li></ul><p><em>[Image: 1716]</em></p><h2 id="confirm-app-prefix" tabindex="-1">Confirm App Prefix <a class="header-anchor" href="#confirm-app-prefix" aria-label="Permalink to &quot;Confirm App Prefix&quot;">​</a></h2><ul><li>From your <a href="https://developer.apple.com/account/ios/identifier/bundle" target="_blank" rel="noreferrer">Apple Developer Account</a></li></ul><p><em>[Image: 1984]</em></p><h2 id="install-branch" tabindex="-1">Install Branch <a class="header-anchor" href="#install-branch" aria-label="Permalink to &quot;Install Branch&quot;">​</a></h2><h3 id="option-1" tabindex="-1">Option 1 <a class="header-anchor" href="#option-1" aria-label="Permalink to &quot;Option 1&quot;">​</a></h3><p><a href="https://cocoapods.org/" target="_blank" rel="noreferrer">CocoaPods</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>platform :tvos, &#39;9.0&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        target &#39;APP_NAME&#39; do</span></span>
<span class="line"><span>        # if swift</span></span>
<span class="line"><span>        use_frameworks!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        pod &#39;Branch&#39;</span></span>
<span class="line"><span>        end</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pod install &amp;&amp; pod update</span></span></code></pre></div><h3 id="option-2" tabindex="-1">Option 2 <a class="header-anchor" href="#option-2" aria-label="Permalink to &quot;Option 2&quot;">​</a></h3><div class="warning custom-block"><p class="custom-block-title">Carthage 0.36.x does not include support for xcframeworks</p><p>Carthage support for xcframeworks is not included in the 0.36.x release. You can install Carthage from source to gain access to the <code>--use-xcframeworks</code> option.</p><p><a href="https://github.com/Carthage/Carthage#installing-carthage" target="_blank" rel="noreferrer">Carthage install instructions</a></p></div><p><a href="https://github.com/Carthage/Carthage" target="_blank" rel="noreferrer">Carthage</a></p><p>Branch iOS SDK now supports xcframework and requires the <code>--use-xcframeworks</code> option.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>github &quot;BranchMetrics/ios-branch-deep-linking&quot;</span></span></code></pre></div><ul><li>Import the <code>Branch.xcframework</code> into <strong>Linked Frameworks</strong></li><li>Import <code>AdSupport</code> and <code>CoreServices</code> into <strong>Linked Frameworks</strong></li></ul><h3 id="option-3" tabindex="-1">Option 3 <a class="header-anchor" href="#option-3" aria-label="Permalink to &quot;Option 3&quot;">​</a></h3><p>From the 0.37.0 release, the Branch iOS SDK <a href="https://github.com/BranchMetrics/ios-branch-deep-linking-attribution/releases" target="_blank" rel="noreferrer">github releases page</a> includes a prebuilt xcframework in <code>Branch.zip</code> and a checksum.</p><ul><li>Drag and drop <code>Branch.xcframework</code> into *Embedded Binaries <strong>(select</strong> Copy items if needed**)</li><li>Import <code>AdSupport</code> and <code>CoreServices</code>, into <strong>Linked Frameworks</strong></li></ul><p><em>[Image: 2092]</em></p><h2 id="initialize-branch" tabindex="-1">Initialize Branch <a class="header-anchor" href="#initialize-branch" aria-label="Permalink to &quot;Initialize Branch&quot;">​</a></h2><p>In your app&#39;s AppDelegate</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import UIKit</span></span>
<span class="line"><span>        import Branch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @UIApplicationMain</span></span>
<span class="line"><span>        class AppDelegate: UIResponder, UIApplicationDelegate {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var window: UIWindow?</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -&gt; Bool {</span></span>
<span class="line"><span>        // if you are using the TEST key</span></span>
<span class="line"><span>        Branch.setUseTestBranchKey(true)</span></span>
<span class="line"><span>        // listener for Branch Deep Link data</span></span>
<span class="line"><span>        Branch.getInstance().initSession(launchOptions: launchOptions, andRegisterDeepLinkHandler: { (params, error) in</span></span>
<span class="line"><span>        // do stuff with deep link data (nav to page, display content, etc)</span></span>
<span class="line"><span>        print(params as? [String: AnyObject] ?? {})</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -&gt; Bool {</span></span>
<span class="line"><span>        Branch.getInstance().application(app, open: url, options: options)</span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -&gt; Void) -&gt; Bool {</span></span>
<span class="line"><span>        // handler for Universal Links</span></span>
<span class="line"><span>        Branch.getInstance().continue(userActivity)</span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -&gt; Void) {</span></span>
<span class="line"><span>        // handler for Push Notifications</span></span>
<span class="line"><span>        Branch.getInstance().handlePushNotification(userInfo)</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h2 id="app-to-app-linking-on-tvos" tabindex="-1">App to App linking on tvOS <a class="header-anchor" href="#app-to-app-linking-on-tvos" aria-label="Permalink to &quot;App to App linking on tvOS&quot;">​</a></h2><p>tvOS does not have a web browser or a web view. We workaround this limitation by App to App programmatic linking.</p><p>For this section, &quot;ad partner app&quot; refers to the tvOS app that wishes to link your Branch enabled tvOS app, the &quot;target app&quot;. The ad partner app does not need to be Branch enabled.</p><p>App to App linking is implemented in the ad partner app.</p><ul><li>Add the <code>AdSupport</code> framework. This is used to obtain the device IDFA.</li><li>Enable the ad partner app to query for your tvOS app by adding your URI scheme to the Info.plist. See <a href="https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl" target="_blank" rel="noreferrer">canOpenURL</a></li></ul><p><em>[Image: 2782]</em></p><p>The following code demonstrates how to link from the ad partner app to the target app.</p><ul><li>The target app&#39;s Branch Link has the device IDFA appended to it as a query parameter.</li><li>We query for the target app using canOpenURL. Note, canOpenURL is checking the URI scheme, while Branch Links are Universal Links.</li><li>If we detect the app, we attempt to open it with the Branch Link. If we do not detect the app or we fail to open it with the Branch Link, we fallback to sending a click to the Branch server then opening the app store.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// This example opens the target app using a Branch Link. This does get Branch parameters and deferred deeplink data.</span></span>
<span class="line"><span>        @IBAction func testBranchLink() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Since tvOS only supports app to app linking, we simply pass the advertising identifier as a query parameter</span></span>
<span class="line"><span>        // Also added the adpartner parameter just to indicate where this came from, not strictly necessary</span></span>
<span class="line"><span>        let branchLink = &quot;https://bnctestbed.app.link/cCWdYYokQ6?$os=tv_os&amp;$idfa=&quot; + self.checkIdfa()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        guard let url = URL(string: branchLink) else { return }</span></span>
<span class="line"><span>        guard let uriScheme = URL(string:&quot;branchtest://&quot;) else { return }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        self.openURL(url: url, uriScheme: uriScheme)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func checkIdfa() -&gt; String {</span></span>
<span class="line"><span>        return ASIdentifierManager.shared().advertisingIdentifier.uuidString</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // We assume the uri scheme is for the same app as the universal link url</span></span>
<span class="line"><span>        func openURL(url:URL, uriScheme:URL) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // canOpenURL can only check URI schemes listed in the Info.plist. It cannot check Universal Links.</span></span>
<span class="line"><span>        // https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl</span></span>
<span class="line"><span>        if (UIApplication.shared.canOpenURL(uriScheme)) {</span></span>
<span class="line"><span>        if #available(tvOS 10.0, *) {</span></span>
<span class="line"><span>        UIApplication.shared.open(url, options: [:]) { (success) in</span></span>
<span class="line"><span>        if (success == false) {</span></span>
<span class="line"><span>        self.clickBranchLink(url: url)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>        let success = UIApplication.shared.openURL(url)</span></span>
<span class="line"><span>        if (success == false) {</span></span>
<span class="line"><span>        self.clickBranchLink(url: url)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>        self.clickBranchLink(url: url)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        func clickBranchLink(url:URL) {</span></span>
<span class="line"><span>        URLSession.shared.dataTask(with: url) { (data, response, error) in</span></span>
<span class="line"><span>        DispatchQueue.main.async {</span></span>
<span class="line"><span>        self.openAppStore()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }.resume()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // directly open the app store if we&#39;re unable to detect the app</span></span>
<span class="line"><span>        func openAppStore() {</span></span>
<span class="line"><span>        guard let url = URL(string:&quot;https://apps.apple.com/us/app/branch-monster-factory/id917737838?mt=8&quot;) else { return }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if #available(tvOS 10.0, *) {</span></span>
<span class="line"><span>        UIApplication.shared.open(url, options: [:]) { (success) in</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>        UIApplication.shared.openURL(url)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span></code></pre></div>`,46)])])}const g=a(i,[["render",t]]);export{u as __pageData,g as default};

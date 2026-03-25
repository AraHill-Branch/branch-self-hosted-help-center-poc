import{_ as e,o as n,c as t,ae as s}from"./chunks/framework.B6gjLfeO.js";const u=JSON.parse('{"title":"React Native Full Reference","description":"","frontmatter":{"title":"React Native Full Reference","slug":"react-native-full-reference"},"headers":[],"relativePath":"developer-hub/react-native-full-reference.md","filePath":"developer-hub/react-native-full-reference.md"}'),r={name:"developer-hub/react-native-full-reference.md"};function p(i,a,o,l,d,c){return n(),t("div",null,[...a[0]||(a[0]=[s(`<div class="info custom-block"><p class="custom-block-title">GitHub</p><p>To see more information about these methods, visit the Branch React Native SDK GitHub <a href="https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts" target="_blank" rel="noreferrer">repository</a>.</p></div><h2 id="createbranchuniversalobject" tabindex="-1">createBranchUniversalObject <a class="header-anchor" href="#createbranchuniversalobject" aria-label="Permalink to &quot;createBranchUniversalObject&quot;">​</a></h2><p>A <code>BranchUniversalObject</code> instance represents a unique piece of content, such as an article, video, or item for sale.</p><p>See our <a href="./create-branch-objects-and-events.html#buo-best-practices">guide</a> on best practices for creating Branch Universal Objects.</p><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>createBranchUniversalObject: (identifier: string, options: BranchUniversalObjectOptions) =&gt; Promise&lt;BranchUniversalObject&gt;</code></td><td>Create a <code>BranchUniversalObject</code> instance.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>identifier</code></td><td><code>string</code></td><td>The unique name for the Branch Universal Object.</td></tr><tr><td><code>options</code></td><td><code>BranchUniversalObjectOptions</code></td><td>An object describing the properties of the Branch Universal Object. Visit the SDK GitHub repo for more <a href="https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts" target="_blank" rel="noreferrer">details</a>.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Returns</th></tr></thead><tbody><tr><td>A promise that resolves to an instance of a <code>BranchUniversalObject</code> with your specified properties.</td></tr></tbody></table><h5 id="example-usage" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let buo = await branch.createBranchUniversalObject(&#39;content/12345&#39;, {</span></span>
<span class="line"><span>        title: &#39;My Content Title&#39;,</span></span>
<span class="line"><span>        contentDescription: &#39;My Content Description&#39;,</span></span>
<span class="line"><span>        contentMetadata: {</span></span>
<span class="line"><span>        customMetadata: {</span></span>
<span class="line"><span>        key1: &#39;value1&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        })</span></span></code></pre></div><hr><h2 id="generateshorturl" tabindex="-1">generateShortUrl <a class="header-anchor" href="#generateshorturl" aria-label="Permalink to &quot;generateShortUrl&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>generateShortUrl: (linkProperties?: BranchLinkProperties, controlParams?: BranchLinkControlParams) =&gt; Promise&lt;{ url: string }&gt;;</code></td><td>Create a Branch Deep Link URL with encapsulated data. Create a short URL for a specific <code>BranchUniversalObject</code> instance, and associate a <code>LinkProperties</code> object with it.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>linkProperties</code></td><td><code>BranchLinkProperties</code></td><td>The <a href="https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts" target="_blank" rel="noreferrer">link properties</a> to associate with the URL. <code>export interface BranchLinkProperties { alias?: string; campaign?: string; feature?: string; channel?: string; stage?: string; tags?: string[]; }</code></td></tr><tr><td><code>controlParams</code></td><td><code>BranchLinkControlParams</code></td><td>Additional <a href="https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts" target="_blank" rel="noreferrer">link params</a>. Can include a <code>custom</code> field. <code>export interface BranchLinkControlParams { $fallback_url?: string; $desktop_url?: string; $ios_url?: string; $ipad_url?: string; $android_url?: string; $samsung_url?: string; }</code></td></tr></tbody></table><table tabindex="0"><thead><tr><th>Returns</th></tr></thead><tbody><tr><td>A promise that resolves to a short URL with your specified link properties and parameters.</td></tr></tbody></table><h5 id="example-usage-1" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-1" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let buo = await branch.createBranchUniversalObject(&#39;content/12345&#39;, {</span></span>
<span class="line"><span>        title: &#39;My Content Title&#39;,</span></span>
<span class="line"><span>        contentDescription: &#39;My Content Description&#39;,</span></span>
<span class="line"><span>        contentMetadata: {</span></span>
<span class="line"><span>        customMetadata: {</span></span>
<span class="line"><span>        key1: &#39;value1&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let linkProperties = {</span></span>
<span class="line"><span>        feature: &#39;sharing&#39;,</span></span>
<span class="line"><span>        channel: &#39;facebook&#39;,</span></span>
<span class="line"><span>        campaign: &#39;content 123 launch&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let controlParams = {</span></span>
<span class="line"><span>        $desktop_url: &#39;https://example.com/home&#39;,</span></span>
<span class="line"><span>        custom: &#39;data&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let {url} = await buo.generateShortUrl(linkProperties, controlParams)</span></span></code></pre></div><hr><h2 id="getlatestreferringparams" tabindex="-1">getLatestReferringParams <a class="header-anchor" href="#getlatestreferringparams" aria-label="Permalink to &quot;getLatestReferringParams&quot;">​</a></h2><p>Retrieve data from a Branch Deep Link.</p><p>This method is essentially a synchronous method that retrieves the latest referring link parameters stored by the native SDK. However, React Native does not support synchronous calls to native code from JavaScript, so the method returns a promise. You must <code>await</code> the response or use <code>then</code> to receive the result.</p><p>However, this is only a restriction of React Native. The purpose of <code>getLatestReferringParams</code> is to retrieve those parameters one time. The promise will only return one result. It will not continue to return results when links are opened or wait for a link to be opened. This method is not intended to notify the app when a link has been opened.</p><p>Best practice for this method is to receive the data from the <code>listener</code> (to prevent a race condition).</p><p>Returns Branch Deep Link <a href="./create-branch-objects-and-events.html#deep-link-data-structure">properties</a>.</p><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>getLatestReferringParams: (synchronous?: boolean) =&gt; Promise&lt;BranchParams&gt;</code></td><td>Returns the parameters associated with the link that referred the session.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>synchronous</code></td><td><code>boolean</code></td><td>Set to <code>true</code> to allow deferred promise resolution.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Returns</th></tr></thead><tbody><tr><td>A promise that resolves to a <code>BranchParams</code> object.</td></tr></tbody></table><h5 id="example-usage-2" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-2" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Listener</span></span>
<span class="line"><span>        branch.subscribe({</span></span>
<span class="line"><span>        onOpenStart: ({</span></span>
<span class="line"><span>        uri,</span></span>
<span class="line"><span>        cachedInitialEvent</span></span>
<span class="line"><span>        }) =&gt; {</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>        &#39;subscribe onOpenStart, will open &#39; +</span></span>
<span class="line"><span>        uri +</span></span>
<span class="line"><span>        &#39; cachedInitialEvent is &#39; +</span></span>
<span class="line"><span>        cachedInitialEvent,</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        onOpenComplete: ({</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        params,</span></span>
<span class="line"><span>        uri</span></span>
<span class="line"><span>        }) =&gt; {</span></span>
<span class="line"><span>        if (error) {</span></span>
<span class="line"><span>        console.error(</span></span>
<span class="line"><span>        &#39;subscribe onOpenComplete, Error from opening uri: &#39; +</span></span>
<span class="line"><span>        uri +</span></span>
<span class="line"><span>        &#39; error: &#39; +</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else if (params) {</span></span>
<span class="line"><span>        if (!params[&#39;+clicked_branch_link&#39;]) {</span></span>
<span class="line"><span>        if (params[&#39;+non_branch_link&#39;]) {</span></span>
<span class="line"><span>        console.log(&#39;non_branch_link: &#39; + uri);</span></span>
<span class="line"><span>        // Route based on non-Branch links</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>        // Handle params</span></span>
<span class="line"><span>        let deepLinkPath = params.$deeplink_path as string;</span></span>
<span class="line"><span>        let canonicalUrl = params.$canonical_url as string;</span></span>
<span class="line"><span>        // Route based on Branch link data</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let latestParams = await branch.getLatestReferringParams() // Params from last open</span></span></code></pre></div><hr><h2 id="getfirstreferringparams" tabindex="-1">getFirstReferringParams <a class="header-anchor" href="#getfirstreferringparams" aria-label="Permalink to &quot;getFirstReferringParams&quot;">​</a></h2><p>Retrieve data from a Branch Deep Link.</p><p>This method is essentially a synchronous method that retrieves the latest referring link parameters stored by the native SDK. However, React Native does not support synchronous calls to native code from JavaScript, so the method returns a promise. You must <code>await</code> the response or use <code>then</code> to receive the result.</p><p>Best practice for this method is to receive the data from the <code>listener</code> (to prevent a race condition).</p><p>Returns Branch Deep Link <a href="./create-branch-objects-and-events.html#deep-link-data-structure">properties</a>.</p><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>getFirstReferringParams: () =&gt; Promise&lt;BranchParams&gt;</code></td><td>Returns the parameters associated with the link that referred the user. This is only set once, when the user is first referred by a link. Think of this as the user referral parameters.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Returns</th></tr></thead><tbody><tr><td>A promise that resolves to a <code>BranchParams</code> object.</td></tr></tbody></table><h5 id="example-usage-3" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-3" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Listener</span></span>
<span class="line"><span>        branch.subscribe({</span></span>
<span class="line"><span>        onOpenStart: ({</span></span>
<span class="line"><span>        uri,</span></span>
<span class="line"><span>        cachedInitialEvent</span></span>
<span class="line"><span>        }) =&gt; {</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>        &#39;subscribe onOpenStart, will open &#39; +</span></span>
<span class="line"><span>        uri +</span></span>
<span class="line"><span>        &#39; cachedInitialEvent is &#39; +</span></span>
<span class="line"><span>        cachedInitialEvent,</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        onOpenComplete: ({</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        params,</span></span>
<span class="line"><span>        uri</span></span>
<span class="line"><span>        }) =&gt; {</span></span>
<span class="line"><span>        if (error) {</span></span>
<span class="line"><span>        console.error(</span></span>
<span class="line"><span>        &#39;subscribe onOpenComplete, Error from opening uri: &#39; +</span></span>
<span class="line"><span>        uri +</span></span>
<span class="line"><span>        &#39; error: &#39; +</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else if (params) {</span></span>
<span class="line"><span>        if (!params[&#39;+clicked_branch_link&#39;]) {</span></span>
<span class="line"><span>        if (params[&#39;+non_branch_link&#39;]) {</span></span>
<span class="line"><span>        console.log(&#39;non_branch_link: &#39; + uri);</span></span>
<span class="line"><span>        // Route based on non-Branch links</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>        // Handle params</span></span>
<span class="line"><span>        let deepLinkPath = params.$deeplink_path as string;</span></span>
<span class="line"><span>        let canonicalUrl = params.$canonical_url as string;</span></span>
<span class="line"><span>        // Route based on Branch link data</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let installParams = await branch.getFirstReferringParams() // Params from original install</span></span></code></pre></div><hr><h2 id="getbranchqrcode" tabindex="-1">getBranchQRCode <a class="header-anchor" href="#getbranchqrcode" aria-label="Permalink to &quot;getBranchQRCode&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>getBranchQRCode: (settings: BranchQRCodeSettings, branchUniversalObject: BranchUniversalObjectOptions, linkProperties: BranchLinkProperties, controlParams: BranchLinkControlParams) =&gt; Promise&lt;string&gt;;</code></td><td>Create a Branch QR Code and customize the settings.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>settings</code></td><td><code>BranchQRCodeSettings</code></td><td>The settings for the QR code, such as color and width.</td></tr><tr><td><code>branchUniversalObject</code></td><td><code>BranchUniversalObjectOptions</code></td><td>An object describing the content associated with the QR code.</td></tr><tr><td><code>linkProperties</code></td><td><code>BranchLinkProperties</code></td><td>The <a href="https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts" target="_blank" rel="noreferrer">link properties</a> for the link associated with the QR code. <code>export interface BranchLinkProperties { alias?: string; campaign?: string; feature?: string; channel?: string; stage?: string; tags?: string[]; }</code></td></tr><tr><td><code>controlParams</code></td><td><code>BranchLinkControlParams</code></td><td>Additional <a href="https://github.com/BranchMetrics/react-native-branch-deep-linking-attribution/blob/master/src/index.d.ts" target="_blank" rel="noreferrer">link params</a> . Can include a <code>custom</code> field. <code>export interface BranchLinkControlParams { $fallback_url?: string; $desktop_url?: string; $ios_url?: string; $ipad_url?: string; $android_url?: string; $samsung_url?: string; }</code></td></tr></tbody></table><table tabindex="0"><thead><tr><th>Returns</th></tr></thead><tbody><tr><td>A promise that resolves to a string representing the QR code.</td></tr></tbody></table><h5 id="example-usage-4" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-4" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var qrCodeSettings = {</span></span>
<span class="line"><span>        width: 500,</span></span>
<span class="line"><span>        codeColor: &quot;#3b2016&quot;,</span></span>
<span class="line"><span>        backgroundColor: &quot;#a8e689&quot;,</span></span>
<span class="line"><span>        centerLogo: &quot;https://cdn.branch.io/branch-assets/159857dsads5682753-og_image.png&quot;,</span></span>
<span class="line"><span>        margin: 1,</span></span>
<span class="line"><span>        imageFormat: &quot;PNG&quot;</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var buoOptions = {</span></span>
<span class="line"><span>        title: &quot;A Test Title&quot;,</span></span>
<span class="line"><span>        contentDescription: &quot;A test content desc&quot;,</span></span>
<span class="line"><span>        contentMetadata: {</span></span>
<span class="line"><span>        price: &quot;200&quot;,</span></span>
<span class="line"><span>        productName: &quot;QR Code Scanner&quot;,</span></span>
<span class="line"><span>        customMetadata: { &quot;someKey&quot;: &quot;someValue&quot;, &quot;anotherKey&quot;: &quot;anotherValue&quot; }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var lp = {</span></span>
<span class="line"><span>        feature: &quot;qrCode&quot;,</span></span>
<span class="line"><span>        tags: [&quot;test&quot;, &quot;working&quot;],</span></span>
<span class="line"><span>        channel: &quot;facebook&quot;,</span></span>
<span class="line"><span>        campaign: &quot;posters&quot;</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var controlParams = {</span></span>
<span class="line"><span>        $desktop_url: &quot;https://www.desktop.com&quot;,</span></span>
<span class="line"><span>        $fallback_url: &quot;https://www.fallback.com&quot;</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>        var result = await branch.getBranchQRCode(qrCodeSettings, buoOptions, lp, controlParams);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        catch (err) {</span></span>
<span class="line"><span>        console.log(&#39;QR Code Err: &#39;, err);</span></span>
<span class="line"><span>        }</span></span></code></pre></div><hr><h2 id="setidentity" tabindex="-1">setIdentity <a class="header-anchor" href="#setidentity" aria-label="Permalink to &quot;setIdentity&quot;">​</a></h2><p>This method may be helpful if you have your own user IDs for customers, or you want referral and event data to persist across platforms or uninstall/reinstall. Using this method can make it easier to know when users access your service from different devices.</p><p>You can validate that an identity has been set using the <a href="https://dashboard.branch.io/liveview/identities?_gl=1*rjmdzn*_ga*MTE0ODc2MjU5OC4xNjc5MzM4OTI0*_ga_KSDD8Y11CT*MTcxNDA2MDQxNi41MjcuMS4xNzE0MDc3MDc4LjQ4LjAuMA.." target="_blank" rel="noreferrer">Branch Dashboard</a>.</p><p><strong>Warning</strong>: Do not use this method to send PII to Branch.</p><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>setIdentity: (identity: string) =&gt; void;</code></td><td>Identifies the current user to the Branch API by supplying a unique identifier as a string value.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>identity</code></td><td><code>string</code></td><td>A string value containing the unique identifier of the user.</td></tr></tbody></table><h5 id="example-usage-5" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-5" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.setIdentity(&#39;theUserId&#39;)</span></span>
<span class="line"><span>        branch.logout()</span></span></code></pre></div><hr><h2 id="setanonid" tabindex="-1">setAnonID <a class="header-anchor" href="#setanonid" aria-label="Permalink to &quot;setAnonID&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>setODMInfo: (odmInfo: string, firstOpenTimestamp: number) =&gt; void;</code></td><td>Sets a custom Meta <code>anon_id</code> for the current user. The Meta <code>anon_id</code> is a GUID generated by the Branch iOS SDK for Meta AEM. Learn more <a href="https://help.branch.io/marketer-hub/docs/meta-aggregated-event-measurement" target="_blank" rel="noreferrer">here</a>.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>anonID</code></td><td><code>string</code></td><td>The custom Meta <code>anon_id</code> to set for the user.</td></tr></tbody></table><h5 id="example-usage-6" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-6" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.setAnonID(“your-anon-id”)</span></span></code></pre></div><hr><h2 id="logevent" tabindex="-1">logEvent <a class="header-anchor" href="#logevent" aria-label="Permalink to &quot;logEvent&quot;">​</a></h2><p>By default, the Branch React Native SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box).</p><p>To log other Branch Events:</p><ol><li>Create a <code>BranchUniversalObject</code> instance.</li><li>Create a <code>BranchEventParams</code> instance.</li><li>Use <code>new BranchEvent</code> to create a Branch Event with the newly created <code>BranchUniversalObject</code> and <code>BranchEventParams</code> instances</li><li>Use the <code>logEvent()</code> method.</li></ol><p>Learn more about tracking events with the Branch React Native SDK in our Advanced Features <a href="./react-native-advanced-features.html#event-tracking">guide</a>.</p><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>logEvent: () =&gt; Promise&lt;null&gt;</code></td><td>Log an event to Branch for tracking and analytics.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Returns</th></tr></thead><tbody><tr><td>A promise that resolves to <code>null</code>.</td></tr></tbody></table><h5 id="example-usage-7" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-7" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let buo = await branch.createBranchUniversalObject(</span></span>
<span class="line"><span>        &quot;item/12345&quot;,</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        canonicalUrl: &quot;https://branch.io/item/12345&quot;,</span></span>
<span class="line"><span>        title: &quot;My Item Title&quot;,</span></span>
<span class="line"><span>        contentMetadata: {</span></span>
<span class="line"><span>        quantity: 1,</span></span>
<span class="line"><span>        price: 23.20,</span></span>
<span class="line"><span>        sku: &quot;1994320302&quot;,</span></span>
<span class="line"><span>        productName: &quot;my_product_name1&quot;,</span></span>
<span class="line"><span>        productBrand: &quot;my_prod_Brand1&quot;,</span></span>
<span class="line"><span>        customMetadata: {</span></span>
<span class="line"><span>        custom_key1: &quot;custom_value1&quot;,</span></span>
<span class="line"><span>        custom_key2: &quot;custom_value2&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let params = {</span></span>
<span class="line"><span>        transaction_id: &quot;tras_Id_1232343434&quot;,</span></span>
<span class="line"><span>        currency: &quot;USD&quot;,</span></span>
<span class="line"><span>        revenue: 180.2,</span></span>
<span class="line"><span>        shipping: 10.5,</span></span>
<span class="line"><span>        tax: 13.5,</span></span>
<span class="line"><span>        coupon: &quot;promo-1234&quot;,</span></span>
<span class="line"><span>        affiliation: &quot;high_fi&quot;,</span></span>
<span class="line"><span>        description: &quot;Preferred purchase&quot;,</span></span>
<span class="line"><span>        purchase_loc: &quot;Palo Alto&quot;,</span></span>
<span class="line"><span>        store_pickup: &quot;unavailable&quot;,</span></span>
<span class="line"><span>        customData: {</span></span>
<span class="line"><span>        &quot;Custom_Event_Property_Key1&quot;: &quot;Custom_Event_Property_val1&quot;,</span></span>
<span class="line"><span>        &quot;Custom_Event_Property_Key2&quot;: &quot;Custom_Event_Property_val2&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let event = new BranchEvent(BranchEvent.Purchase, [buo], params)</span></span>
<span class="line"><span>        event.logEvent()</span></span></code></pre></div><hr><h2 id="openurl" tabindex="-1">openURL <a class="header-anchor" href="#openurl" aria-label="Permalink to &quot;openURL&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>openURL: (url: string, options?: { newActivity?: boolean }) =&gt; void;</code></td><td>Deep link into your own app from within the app itself. <strong>Warning</strong>: Handling a new Branch Deep Link in your app will clear the current session data and a new referred &quot;open&quot; will be attributed.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>url</code></td><td><code>string</code></td><td>The URL to deep link to.</td></tr><tr><td><code>options</code></td><td><code>{ newActivity?: boolean }</code></td><td>If <code>true</code>, Branch will allow Android to finish the current activity before opening the link. This results in a new activity window. Ignored on iOS.</td></tr></tbody></table><h5 id="example-usage-8" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-8" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.openURL(&quot;https://example.app.link/u3fzDwyyjF&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Finish the Android current activity before opening the link</span></span>
<span class="line"><span>        // Results in a new activity window</span></span>
<span class="line"><span>        // Ignored on iOS</span></span>
<span class="line"><span>        branch.openURL(&quot;https://example.app.link/u3fzDwyyjF&quot;, {newActivity: true})</span></span></code></pre></div><hr><h2 id="subscribe" tabindex="-1">subscribe <a class="header-anchor" href="#subscribe" aria-label="Permalink to &quot;subscribe&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td>Method: <code>subscribe: BranchSubscribe;</code> Related interface: <code>interface BranchSubscribeOptions {onOpenComplete: BranchSubscribeCallback; onOpenStart?:(event: BranchOpenStartEvent) =&gt; void;}</code></td><td>Receive a notification whenever a link is opened, including at app launch. There is no need to call <code>getLatestReferringParams()</code> at app launch to check for an initial link. Use <code>subscribe()</code> to handle all link opens.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>onOpenComplete</code></td><td><code>BranchSubscribeCallback</code></td><td>The callback to this method will return any initial link that launched the app and all subsequent link opens. Related to: \`interface BranchSubscriptionEventBase { params: BranchParams</td></tr><tr><td><code>onOpenStart</code></td><td><code>event: BranchOpenStartEvent</code></td><td>Related to: <code>export interface BranchOpenStartEvent { uri: string; cachedInitialEvent?: boolean; }</code></td></tr></tbody></table><h5 id="example-usage-9" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-9" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.subscribe({</span></span>
<span class="line"><span>        onOpenStart: ({</span></span>
<span class="line"><span>        uri,</span></span>
<span class="line"><span>        cachedInitialEvent</span></span>
<span class="line"><span>        }) =&gt; {</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>        &#39;subscribe onOpenStart, will open &#39; +</span></span>
<span class="line"><span>        uri +</span></span>
<span class="line"><span>        &#39; cachedInitialEvent is &#39; +</span></span>
<span class="line"><span>        cachedInitialEvent,</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        onOpenComplete: ({</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        params,</span></span>
<span class="line"><span>        uri</span></span>
<span class="line"><span>        }) =&gt; {</span></span>
<span class="line"><span>        if (error) {</span></span>
<span class="line"><span>        console.error(</span></span>
<span class="line"><span>        &#39;subscribe onOpenComplete, Error from opening uri: &#39; +</span></span>
<span class="line"><span>        uri +</span></span>
<span class="line"><span>        &#39; error: &#39; +</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else if (params) {</span></span>
<span class="line"><span>        if (!params[&#39;+clicked_branch_link&#39;]) {</span></span>
<span class="line"><span>        if (params[&#39;+non_branch_link&#39;]) {</span></span>
<span class="line"><span>        console.log(&#39;non_branch_link: &#39; + uri);</span></span>
<span class="line"><span>        // Route based on non-Branch links</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>        // Handle params</span></span>
<span class="line"><span>        let deepLinkPath = params.$deeplink_path as string;</span></span>
<span class="line"><span>        let canonicalUrl = params.$canonical_url as string;</span></span>
<span class="line"><span>        // Route based on Branch link data</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        });</span></span></code></pre></div><hr><h2 id="setrequestmetadata" tabindex="-1">setRequestMetadata <a class="header-anchor" href="#setrequestmetadata" aria-label="Permalink to &quot;setRequestMetadata&quot;">​</a></h2><p>Some third-party Data Integration Partners require setting certain identifiers before initializing Branch.</p><p>To do this:</p><ol><li><a href="./react-native-advanced-features.html#defer-initialization-for-plugin-runtime">Add</a> <code>deferInitForPluginRuntime</code> to your <code>branch.json</code> file.</li><li>Use the <code>setRequestMetadata()</code> method to set your identifiers.</li></ol><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>setRequestMetadata: (key: string, value: string) =&gt; void;</code></td><td>Set identifiers before initializing Branch.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>key</code></td><td><code>string</code></td><td>The key for the particular identifier.</td></tr><tr><td><code>value</code></td><td><code>string</code></td><td>The value for the particular identifier.</td></tr></tbody></table><h5 id="example-usage-10" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-10" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Call \`setRequestMetadata\` before \`subscribe\`</span></span>
<span class="line"><span>        branch.setRequestMetadata(&#39;$analytics_visitor_id&#39;, &#39;000001&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.subscribe({ error, params } =&gt; {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        })</span></span></code></pre></div><p>Learn more in our React Native Advanced Features <a href="./react-native-advanced-features.html#set-initialization-metadata">guide</a>.</p><hr><h2 id="openurl-1" tabindex="-1">openURL <a class="header-anchor" href="#openurl-1" aria-label="Permalink to &quot;openURL&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>openURL: (url: string, options?: { newActivity?: boolean }) =&gt; void;</code></td><td>Send push notification data to Branch.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>url</code></td><td><code>string</code></td><td>The Branch Link to send with the push notification payload data.</td></tr><tr><td><code>options</code></td><td><code>newActivity?: boolean</code></td><td>If set to <code>true</code>, finish the current Android activity before opening the link. Results in a new activity window. Ignored on iOS.</td></tr></tbody></table><h5 id="example-usage-11" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-11" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let data = {</span></span>
<span class="line"><span>        &quot;aps&quot;: {</span></span>
<span class="line"><span>        &quot;alert&quot;: &quot;Push notification with a Branch deep link&quot;,</span></span>
<span class="line"><span>        &quot;badge&quot;: &quot;1&quot;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        &quot;branch&quot;: &quot;https://example.app.link/u3fzDwyyjF&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.openURL(data[&quot;branch&quot;],{newActivity: true})</span></span></code></pre></div><hr><h2 id="disabletracking" tabindex="-1">disableTracking <a class="header-anchor" href="#disabletracking" aria-label="Permalink to &quot;disableTracking&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>disableTracking: (disable: boolean) =&gt; void;</code></td><td>Method to change the tracking state. If disabled, the Branch React Native SDK will not track any user data or state. The SDK will not send any network calls, except for deep linking, when tracking is disabled.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>disable</code></td><td><code>boolean</code></td><td>When set to <code>true</code>, tracking is disabled.</td></tr></tbody></table><h5 id="example-usage-12" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-12" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.disableTracking(true)</span></span></code></pre></div><hr><h2 id="istrackingdisabled" tabindex="-1">isTrackingDisabled <a class="header-anchor" href="#istrackingdisabled" aria-label="Permalink to &quot;isTrackingDisabled&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>isTrackingDisabled: () =&gt; Promise&lt;boolean&gt;</code></td><td>Checks to see whether tracking is disabled.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Returns</th></tr></thead><tbody><tr><td>A promise that resolves to whether tracking is disabled.</td></tr></tbody></table><h5 id="example-usage-13" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-13" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.isTrackingDisabled()</span></span></code></pre></div><hr><h2 id="logout" tabindex="-1">logout <a class="header-anchor" href="#logout" aria-label="Permalink to &quot;logout&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>logout: () =&gt; void;</code></td><td>Call this method if you know that a different person is about to use the app. For example, if you allow users to log out and let their friends use the app, you should call <code>logout()</code> to notify Branch to create a new user for this device. This will clear the first and latest params, and a new session is created.</td></tr></tbody></table><h5 id="example-usage-14" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-14" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.logout()</span></span></code></pre></div><hr><h2 id="addfacebookpartnerparameter" tabindex="-1">addFacebookPartnerParameter <a class="header-anchor" href="#addfacebookpartnerparameter" aria-label="Permalink to &quot;addFacebookPartnerParameter&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>addFacebookPartnerParameter: (name: string, value: string) =&gt; void;</code></td><td>Add a Partner Parameter for Facebook. This allows you to pass additional hashed information to the SDK for <a href="./pass-hashed-information-for-facebook-advanced-matching.html">Facebook Advanced Matching</a>. Once set, this parameter is attached to INSTALL, OPEN, and other events until they are cleared or the app restarts.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>name</code></td><td><code>string</code></td><td>Partner Parameter key name. See Facebook&#39;s documentation for details on valid parameters.</td></tr><tr><td><code>value</code></td><td><code>string</code></td><td>Partner Parameter value. See Facebook&#39;s documentation for details on valid parameters.</td></tr></tbody></table><h5 id="example-usage-15" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-15" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.addFacebookPartnerParameter(&quot;key&quot;,&quot;value&quot;)</span></span></code></pre></div><hr><h2 id="addsnappartnerparameter" tabindex="-1">addSnapPartnerParameter <a class="header-anchor" href="#addsnappartnerparameter" aria-label="Permalink to &quot;addSnapPartnerParameter&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>addSnapPartnerParameter: (name: string, value: string) =&gt; void;</code></td><td>Add a Partner Parameter for Snap.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>name</code></td><td><code>string</code></td><td>Partner Parameter key name. See Snap&#39;s documentation for details on valid parameters.</td></tr><tr><td><code>value</code></td><td><code>string</code></td><td>Partner Parameter value. See Snap&#39;s documentation for details on valid parameters.</td></tr></tbody></table><h5 id="example-usage-16" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-16" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.addSnapPartnerParameter(&quot;key&quot;,&quot;value&quot;)</span></span></code></pre></div><hr><h2 id="clearpartnerparameters" tabindex="-1">clearPartnerParameters <a class="header-anchor" href="#clearpartnerparameters" aria-label="Permalink to &quot;clearPartnerParameters&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>clearPartnerParameters: () =&gt; void;</code></td><td>Clear all Partner Parameters that were previously set.</td></tr></tbody></table><h5 id="example-usage-17" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-17" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.clearPartnerParameters(&quot;key&quot;,&quot;value&quot;)</span></span></code></pre></div><hr><h2 id="handleattauthorizationstatus" tabindex="-1">handleATTAuthorizationStatus <a class="header-anchor" href="#handleattauthorizationstatus" aria-label="Permalink to &quot;handleATTAuthorizationStatus&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>handleATTAuthorizationStatus: (ATTAuthorizationStatus: ATTAuthorizationStatus) =&gt; void;</code></td><td>Pass the AppTrackingTransparency authorization status to Branch to measure ATT prompt performance.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>ATTAuthorizationStatus</code></td><td><code>ATTAuthorizationStatus</code></td><td>The AppTrackingTransparency authorization status. Can be: - &quot;authorized&quot; - &quot;denied&quot; - &quot;undetermined&quot; - &quot;restricted&quot;</td></tr></tbody></table><h5 id="example-usage-18" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-18" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Retrieve ATT authorization status</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Pass ATT authorization status to Branch</span></span>
<span class="line"><span>        let ATTAuthorizationStatus = &quot;restricted&quot;</span></span>
<span class="line"><span>        branch.handleATTAuthorizationStatus(ATTAuthorizationStatus)</span></span></code></pre></div><hr><h2 id="lastattributedtouchdata" tabindex="-1">lastAttributedTouchData <a class="header-anchor" href="#lastattributedtouchdata" aria-label="Permalink to &quot;lastAttributedTouchData&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>lastAttributedTouchData: (attributionWindow?: number) =&gt; Promise&lt;BranchParams&gt;</code></td><td>Gets the available last attributed touch data.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>attributionWindow</code></td><td><code>number</code></td><td>The attribution window to look at, in days.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Returns</th></tr></thead><tbody><tr><td>A promise that resolves to a <code>BranchParams</code> object.</td></tr></tbody></table><h5 id="example-usage-19" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-19" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        const attributionWindow = 365;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // \`latData\` is an object</span></span>
<span class="line"><span>        branch.lastAttributedTouchData(attributionWindow, (latData) =&gt; {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>        });</span></span></code></pre></div><hr><h2 id="setpreinstallcampaign" tabindex="-1">setPreInstallCampaign <a class="header-anchor" href="#setpreinstallcampaign" aria-label="Permalink to &quot;setPreInstallCampaign&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>setPreInstallCampaign: (campaign: string) =&gt; void;</code></td><td>Add the pre-install campaign name.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>campaign</code></td><td><code>string</code></td><td>The pre-install campaign name.</td></tr></tbody></table><h5 id="example-usage-20" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-20" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.setPreinstallCampaign(&quot;My Pre-Install Campaign&quot;)</span></span></code></pre></div><hr><h2 id="setpreinstallpartner" tabindex="-1">setPreInstallPartner <a class="header-anchor" href="#setpreinstallpartner" aria-label="Permalink to &quot;setPreInstallPartner&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>setPreInstallPartner: (partner: string) =&gt; void;</code></td><td>Add the pre-install partner name.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>partner</code></td><td><code>string</code></td><td>The pre-install partner name.</td></tr></tbody></table><h5 id="example-usage-21" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-21" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.setPreInstallPartner(&quot;My Pre-Install Partner&quot;)</span></span></code></pre></div><hr><h2 id="setdmaparamsforeea" tabindex="-1">setDMAParamsForEEA <a class="header-anchor" href="#setdmaparamsforeea" aria-label="Permalink to &quot;setDMAParamsForEEA&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">Warning: Omitted by Default</p><p>Please note that the 3 consent parameters related to <code>setDMAParamsForEEA</code> are all omitted by default.</p><p><strong>Failure to include user consent signals may result in attribution or campaign performance degradation. For additional information, please reach out to your Google AM.</strong></p><p>Making a successful <code>setDMAParamsForEEA()</code> call requires that all 3 parameters be set.</p></div><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>setDMAParamsForEEA: (eeaRegion: boolean, adPersonalizationConsent: boolean, adUserDataUsageConsent: boolean) =&gt; void;</code></td><td>Sets the value of parameters required by Google Conversion APIs for DMA Compliance in the EEA region.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>eeaRegion</code></td><td><code>boolean</code></td><td>Set to <code>true</code> if user is <strong>included</strong> in European Union regulations. For example, if the user is located within the EEA, they are within the scope of DMA. Set to <code>false</code> if user is considered <strong>excluded</strong> from European Union regulations.</td></tr><tr><td><code>adPersonalizationConsent</code></td><td><code>boolean</code></td><td>Set to <code>true</code> if user has <strong>granted</strong> consent for ads personalization. Set to <code>false</code> if user has <strong>denied</strong> consent for ads personalization.</td></tr><tr><td><code>adUserDataUsageConsent</code></td><td><code>boolean</code></td><td>Set to <code>true</code> if user has <strong>granted</strong> consent for 3P transmission of user-level data for ads. Set to <code>false</code> is user has <strong>denied</strong> consent for 3P transmission of user-level data for ads.</td></tr></tbody></table><h5 id="example-usage-22" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-22" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Example for an EEA resident who has denied both ad personalization and data usage consent</span></span>
<span class="line"><span>        branch.setDMAParamsForEEA(true,false,false)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Example for an EEA resident who has consented to ad personalization but denied data usage consent</span></span>
<span class="line"><span>        branch.setDMAParamsForEEA(true,true,false)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Example for an EEA resident who has denied ad personalization but granted data usage consent</span></span>
<span class="line"><span>        branch.setDMAParamsForEEA(true,false,true)</span></span></code></pre></div><hr><h2 id="setsdkwaittimeforthirdpartyapis" tabindex="-1">setSDKWaitTimeforThirdPartyAPIs <a class="header-anchor" href="#setsdkwaittimeforthirdpartyapis" aria-label="Permalink to &quot;setSDKWaitTimeforThirdPartyAPIs&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>setSDKWaitTimeForThirdPartyAPIs: (waitTime: number) =&gt; void;</code></td><td>Configure SDK wait duration for third-party API responses (ODM info and Apple Attribution Token).</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>waitTime</code></td><td><code>number</code></td><td>Number of seconds SDK will wait for third party APIs to finish. Default is 0.5 seconds (500ms).</td></tr></tbody></table><h5 id="example-usage-23" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-23" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.setSDKWaitTimeForThirdPartyAPIs(3)</span></span></code></pre></div><hr><h2 id="setodminfo" tabindex="-1">setODMInfo <a class="header-anchor" href="#setodminfo" aria-label="Permalink to &quot;setODMInfo&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>setODMInfo: (odmInfo: string, firstOpenTimestamp: number) =&gt; void;</code></td><td>Pass ODM info to the Branch iOS SDK.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>odmInfo</code></td><td><code>string</code></td><td>The ODM event data (or aggregate conversion info) for the current app instance.</td></tr><tr><td><code>firstOpenTimestamp</code></td><td><code>number</code></td><td>The date and time when the app was first opened after installation. This timestamp is used for conversion attribution timing and should match the value passed to Google’s <code>setFirstLaunchTime</code> method.</td></tr></tbody></table><h5 id="example-usage-24" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-24" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;react-native-branch&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        branch.setODMInfo(&quot;odminfo&quot;, Date.now())</span></span></code></pre></div>`,176)])])}const b=e(r,[["render",p]]);export{u as __pageData,b as default};

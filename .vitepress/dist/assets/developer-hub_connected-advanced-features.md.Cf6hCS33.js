import{_ as n,o as s,c as e,ae as t}from"./chunks/framework.B6gjLfeO.js";const u=JSON.parse('{"title":"Connected Advanced Features","description":"","frontmatter":{"title":"Connected Advanced Features","slug":"connected-advanced-features"},"headers":[],"relativePath":"developer-hub/connected-advanced-features.md","filePath":"developer-hub/connected-advanced-features.md"}'),i={name:"developer-hub/connected-advanced-features.md"};function p(l,a,o,c,r,d){return s(),e("div",null,[...a[0]||(a[0]=[t(`<h3 id="initialize-branch-features" tabindex="-1">Initialize Branch features <a class="header-anchor" href="#initialize-branch-features" aria-label="Permalink to &quot;Initialize Branch features&quot;">​</a></h3><ul><li>Loads Branch into your app</li><li>Uses <a href="./connected-troubleshooting.html#section-branch-init-options">Branch init options</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const options = {</span></span>
<span class="line"><span>    advertising_ids: {</span></span>
<span class="line"><span>        SAMSUNG_IFA: &#39;xxxxx&#39;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    branch_match_id: &#39;xxxxx&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>branch.init(&#39;key_live_YOUR_KEY_GOES_HERE&#39;, options, function (err, data) {</span></span>
<span class="line"><span>    console.log(err, data);</span></span>
<span class="line"><span>});</span></span></code></pre></div><ul><li>Returns the following inside the <code>data</code> object</li></ul><table tabindex="0"><thead><tr><th>Key</th><th>Value</th><th>Type</th></tr></thead><tbody><tr><td>data_parsed</td><td>If the user was referred from a link, and the link has associated data, the data is passed in here.</td><td><code>object</code></td></tr><tr><td>has_app</td><td>Does the user have the mobile app installed already, using Branch&#39;s persona data.</td><td><code>bool</code></td></tr><tr><td>identity</td><td>Unique string that identifies the user, if set from <code>setIdentity</code></td><td><code>string</code></td></tr><tr><td>referring_link</td><td>The referring link clicked, if available.</td><td><code>string</code></td></tr><tr><td>referring_identity</td><td>If the user was referred from a link, and the link was created by a user with an identity, that identity is here.</td><td><code>string</code></td></tr></tbody></table><h3 id="create-deep-link" tabindex="-1">Create Deep Link <a class="header-anchor" href="#create-deep-link" aria-label="Permalink to &quot;Create Deep Link&quot;">​</a></h3><ul><li>Creates a deep link URL with encapsulated data</li><li>Uses <a href="./creating-a-deep-link.html">Deep Link Properties</a></li><li>Validate with the <a href="https://dashboard.branch.io/liveview/links" target="_blank" rel="noreferrer">Branch Dashboard</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const linkData = {</span></span>
<span class="line"><span>  campaign: &#39;content 123&#39;,</span></span>
<span class="line"><span>  channel: &#39;facebook&#39;,</span></span>
<span class="line"><span>  feature: &#39;dashboard&#39;,</span></span>
<span class="line"><span>  stage: &#39;new user&#39;,</span></span>
<span class="line"><span>  tags: [ &#39;tag1&#39;, &#39;tag2&#39;, &#39;tag3&#39; ],</span></span>
<span class="line"><span>  alias: &#39;&#39;,</span></span>
<span class="line"><span>  data: {</span></span>
<span class="line"><span>    &#39;custom_bool&#39;: true,</span></span>
<span class="line"><span>    &#39;custom_int&#39;: Date.now(),</span></span>
<span class="line"><span>    &#39;custom_string&#39;: &#39;hello&#39;,</span></span>
<span class="line"><span>    &#39;$og_title&#39;: &#39;Title&#39;,</span></span>
<span class="line"><span>    &#39;$og_description&#39;: &#39;Description&#39;,</span></span>
<span class="line"><span>    &#39;$og_image_url&#39;:&#39;http://lorempixel.com/400/400&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>branch.link(linkData, function(err, link) {</span></span>
<span class="line"><span>  console.log(link);</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="share-deep-link" tabindex="-1">Share Deep Link <a class="header-anchor" href="#share-deep-link" aria-label="Permalink to &quot;Share Deep Link&quot;">​</a></h3><ul><li>Will generate a Branch deep link and tag it with the channel the user selects</li><li>Uses <a href="./creating-a-deep-link.html">Deep Link Properties</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- shareable elements --&gt;</span></span>
<span class="line"><span>&lt;button id=&quot;button&quot;&gt;deep link&lt;/button&gt;</span></span>
<span class="line"><span>&lt;a id=&quot;anchor&quot; href=&quot;#&quot;&gt;deep link&lt;/a&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const linkData = {</span></span>
<span class="line"><span>  campaign: &#39;content 123&#39;,</span></span>
<span class="line"><span>  channel: &#39;facebook&#39;,</span></span>
<span class="line"><span>  feature: &#39;dashboard&#39;,</span></span>
<span class="line"><span>  stage: &#39;new user&#39;,</span></span>
<span class="line"><span>  tags: [ &#39;tag1&#39;, &#39;tag2&#39;, &#39;tag3&#39; ],</span></span>
<span class="line"><span>  alias: &#39;&#39;,</span></span>
<span class="line"><span>  data: {</span></span>
<span class="line"><span>    &#39;custom_bool&#39;: true,</span></span>
<span class="line"><span>    &#39;custom_int&#39;: Date.now(),</span></span>
<span class="line"><span>    &#39;custom_string&#39;: &#39;hello&#39;,</span></span>
<span class="line"><span>    &#39;$og_title&#39;: &#39;Title&#39;,</span></span>
<span class="line"><span>    &#39;$og_description&#39;: &#39;Description&#39;,</span></span>
<span class="line"><span>    &#39;$og_image_url&#39;:&#39;http://lorempixel.com/400/400&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>branch.link(linkData, function(err, link) {</span></span>
<span class="line"><span>  // bind elements</span></span>
<span class="line"><span>  document.getElementById(&#39;button&#39;).onclick = function() {</span></span>
<span class="line"><span>    window.open(link || err);</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  document.getElementById(&#39;anchor&#39;).href = link || err;</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="read-deep-link" tabindex="-1">Read Deep Link <a class="header-anchor" href="#read-deep-link" aria-label="Permalink to &quot;Read Deep Link&quot;">​</a></h3><ul><li>Retrieve Branch data from a deep link</li><li>Best practice to receive data from the <code>listener</code> (to prevent a race condition)</li><li>Validate with <a href="./connected-troubleshooting.html#section-testing-read-deep-link">Testing read deep link</a></li><li>Listener</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const options = {</span></span>
<span class="line"><span>    advertising_ids: {</span></span>
<span class="line"><span>        SAMSUNG_IFA: &#39;xxxxx&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>branch.init(&#39;key_live_YOUR_KEY_GOES_HERE&#39;, options, function(err, data) {</span></span>
<span class="line"><span>  console.log(err, data);</span></span>
<span class="line"><span>});</span></span></code></pre></div><ul><li>Latest data</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>branch.data(function(err, data) {</span></span>
<span class="line"><span>  console.log(err, data);</span></span>
<span class="line"><span>});</span></span></code></pre></div><ul><li>First data</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>branch.first(function(err, data) {</span></span>
<span class="line"><span>  console.log(err, data);</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="create-a-qr-code" tabindex="-1">Create a QR Code <a class="header-anchor" href="#create-a-qr-code" aria-label="Permalink to &quot;Create a QR Code&quot;">​</a></h3><ul><li>Generates a custom QR Code with a unique Branch Link which you can deep link and track analytics with.</li><li>Uses <a href="./qr-code-api.html#qr_code_settings">QR Code Settings (1st parameter)</a></li><li>Uses <a href="./creating-a-deep-link.html">Deep Link Properties (2nd parameter)</a></li><li>Callback is a <code>qrCode</code> object which contains a <code>rawBuffer</code> or a <code>base64()</code> function which base 64 encodes the raw buffer so that you can use to display the image directly</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const qrCodeSettings = {</span></span>
<span class="line"><span>    &quot;code_color&quot;:&quot;#000000&quot;,</span></span>
<span class="line"><span>    &quot;background_color&quot;: &quot;#FFFFFF&quot;,</span></span>
<span class="line"><span>    &quot;margin&quot;: 5,</span></span>
<span class="line"><span>    &quot;width&quot;: 1000,</span></span>
<span class="line"><span>    &quot;image_format&quot;: &quot;png&quot;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const qrCodeLinkData = {</span></span>
<span class="line"><span>    tags: [ &#39;tag1&#39;, &#39;tag2&#39; ],</span></span>
<span class="line"><span>    channel: &#39;sample app&#39;,</span></span>
<span class="line"><span>    feature: &#39;create link&#39;,</span></span>
<span class="line"><span>    stage: &#39;created link&#39;,</span></span>
<span class="line"><span>    data: {</span></span>
<span class="line"><span>        mydata: &#39;bar&#39;,</span></span>
<span class="line"><span>        &#39;$desktop_url&#39;: &#39;https://cdn.branch.io/example.html&#39;,</span></span>
<span class="line"><span>        &#39;$og_title&#39;: &#39;Branch Metrics&#39;,</span></span>
<span class="line"><span>        &#39;$og_description&#39;: &#39;Branch Metrics&#39;,</span></span>
<span class="line"><span>        &#39;$og_image_url&#39;: &#39;http://branch.io/img/logo_icon_white.png&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>branch.qrCode(qrCodeLinkData, qrCodeSettings, function(err, qrCode) {</span></span>
<span class="line"><span>    // qrCode.rawBuffer is the raw buffer</span></span>
<span class="line"><span>    // qrCode.base64() is the encoded </span></span>
<span class="line"><span>    //</span></span>
<span class="line"><span>    // Example img tag:</span></span>
<span class="line"><span>    // </span></span>
<span class="line"><span>});</span></span></code></pre></div><h4 id="access" tabindex="-1">Access <a class="header-anchor" href="#access" aria-label="Permalink to &quot;Access&quot;">​</a></h4><p>Basic Branch QR Codes are included in the free tier of the Branch Growth Platform.</p><p>For more advanced QR Code capabilities, see our Engagement Pro <a href="./packaging.html">package</a>, which includes access to the <a href="./qr-code-api.html">QR Code API</a> as well as the ability to create custom QR Codes in the Branch Dashboard.</p><h3 id="setting-a-custom-deeplink-path-when-canonical-url-doesn-t-match-app-path-taxonomy" tabindex="-1">Setting a custom Deeplink Path when Canonical URL doesn&#39;t match App path taxonomy <a class="header-anchor" href="#setting-a-custom-deeplink-path-when-canonical-url-doesn-t-match-app-path-taxonomy" aria-label="Permalink to &quot;Setting a custom Deeplink Path when Canonical URL doesn&#39;t match App path taxonomy&quot;">​</a></h3><ul><li>Branch automatically pulls meta tags for your convenience. If Canonical Url is set as a meta tag, it will default this as the Branch <code>$deeplink_path</code>. You can override this by setting <code>$deeplink_path</code> to the path your app url taxonomy uses to deeplink.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;meta name=&quot;branch:deeplink:$deeplink_path&quot; content=&quot;recipes/456789&quot; /&gt;</span></span>
<span class="line"><span>const options = {</span></span>
<span class="line"><span>    advertising_ids: {</span></span>
<span class="line"><span>        SAMSUNG_IFA: &#39;xxxxx&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>branch.init(&#39;BRANCH_KEY&#39;, options, function(err, data) {</span></span>
<span class="line"><span>  if (document.querySelectorAll(&quot;meta[name=&#39;branch:deeplink:$deeplink_path&#39;]&quot;).length &gt; 0) {</span></span>
<span class="line"><span>    var meta = document.querySelector(&quot;meta[name=&#39;branch:deeplink:$deeplink_path&#39;]&quot;).getAttribute(&quot;content&quot;);</span></span>
<span class="line"><span>    branch.setBranchViewData({</span></span>
<span class="line"><span>      data:{</span></span>
<span class="line"><span>        &#39;$deeplink_path&#39;:meta&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>For more information on the branch:deeplink:Keys you can use to customize your meta tags, please reference <a href="./deep-link-data-options.html">this table</a>.</p><h4 id="troubleshooting" tabindex="-1">Troubleshooting <a class="header-anchor" href="#troubleshooting" aria-label="Permalink to &quot;Troubleshooting&quot;">​</a></h4><ul><li>If you have <a href="https://developers.facebook.com/docs/applinks" target="_blank" rel="noreferrer">Facebook App Links metatags</a> on your site and working with your app, then you can skip these instructions. Branch will automatically fetch App Links tags and add them to your deep link data.</li><li>Do not use Google Tag Manager (GTM) to insert your content metatags. GTM requires JavaScript to load on the page, and the Branch Link data scraper does not support JavaScript execution.</li><li>If you need to allowlist the postback server IP addresses for security purposes, they are listed <a href="./basic-postback-configuration.html#section-whitelist-postback-server-ip-addresses">here</a>.</li></ul><h3 id="track-users" tabindex="-1">Track Users <a class="header-anchor" href="#track-users" aria-label="Permalink to &quot;Track Users&quot;">​</a></h3><div class="warning custom-block"><p class="custom-block-title">Sending PII</p><p>Be sure to not send any PII through this method. For additional details, please view our guide on <a href="./best-practices-to-avoid-sending-pii-to-branch.html">Best Practices to Avoid Sending PII to Branch</a></p></div><ul><li>Sets the identity of a user (ID, UUID, etc) for events, deep links, and referrals</li><li>Validate with the <a href="https://dashboard.branch.io/liveview/identities" target="_blank" rel="noreferrer">Branch Dashboard</a></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>branch.setIdentity(&#39;123456&#39;);</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>branch.setIdentity(&#39;123456&#39;, function (err, data) {</span></span>
<span class="line"><span>  console.log(err, data);</span></span>
<span class="line"><span>});</span></span></code></pre></div><ul><li>Removes the identity of a user</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>branch.logout();</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>branch.logout(function(err, data) {</span></span>
<span class="line"><span>console.log(err, data);</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="track-events" tabindex="-1">Track Events <a class="header-anchor" href="#track-events" aria-label="Permalink to &quot;Track Events&quot;">​</a></h3><p>By default, the Branch SDK tracks clicks, opens, installs, reinstalls and impressions automatically (out-of-the-box).</p><p>Please refer to our <a href="./track-branch-events.html">Event Tracking Docs</a> for more information and examples:</p><ul><li><a href="./track-branch-events.html#track-commerce-events">Track Commerce Events</a></li><li><a href="./track-branch-events.html#track-content-events">Track Content Events</a></li><li><a href="./track-branch-events.html#track-lifecycle-events">Track Lifecycle Events</a></li><li><a href="./track-branch-events.html#track-custom-events">Track Custom Events</a></li></ul><h3 id="enable-disable-user-tracking" tabindex="-1">Enable / Disable User Tracking <a class="header-anchor" href="#enable-disable-user-tracking" aria-label="Permalink to &quot;Enable / Disable User Tracking&quot;">​</a></h3><p>In order to help our customers comply with GDPR and other laws that restrict data collection from certain users, we’ve updated our Connected SDK with a Do Not Track mode. This way, if a user indicates that they want to remain private on your app, or if you otherwise determine that a particular user should not be tracked, you can continue to make use of the Branch Connected SDK (e.g. for creating Branch Links) while not tracking that user. This state is persistent, meaning that it’s saved for the user across sessions for the app. This setting can also be enabled across all users for a particular link, or across your Branch Links.</p><ul><li>To enable Do Not Track Mode during initialization, include the <code>tracking_disabled</code> flag, with a value of <code>true</code>, into the options during initialization:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const options = {</span></span>
<span class="line"><span>    ‘tracking_disabled’ : true</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>branch.init(&#39;key_live_YOUR_KEY_GOES_HERE&#39;, options, function (err, data) {</span></span>
<span class="line"><span>    console.log(err, data);</span></span>
<span class="line"><span>});</span></span></code></pre></div><ul><li>To enable Do Not Track Mode following initialization, call <code>disableTracking(true)</code>. If you call <code>disableTracking()</code> with no argument, it will default to <code>disableTracking(true)</code>. Use <code>disableTracking(false)</code> to resume tracking.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const options = {</span></span>
<span class="line"><span>    advertising_ids: {</span></span>
<span class="line"><span>        SAMSUNG_IFA: &#39;xxxxx&#39;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>branch.init(&#39;key_live_YOUR_KEY_GOES_HERE&#39;, options, function (err, data) {</span></span>
<span class="line"><span>    console.log(err, data);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>branch.disableTracking(true);</span></span></code></pre></div>`,49)])])}const g=n(i,[["render",p]]);export{u as __pageData,g as default};

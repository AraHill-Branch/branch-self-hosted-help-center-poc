import{_ as n,o as s,c as e,ae as t}from"./chunks/framework.B6gjLfeO.js";const h=JSON.parse('{"title":"Roku Full Reference","description":"","frontmatter":{"title":"Roku Full Reference","slug":"sdk-roku-full-reference"},"headers":[],"relativePath":"developer-hub/sdk-roku-full-reference.md","filePath":"developer-hub/sdk-roku-full-reference.md"}'),p={name:"developer-hub/sdk-roku-full-reference.md"};function l(i,a,o,c,d,r){return s(),e("div",null,[...a[0]||(a[0]=[t(`<h3 id="initsession" tabindex="-1">initSession <a class="header-anchor" href="#initsession" aria-label="Permalink to &quot;initSession&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>initSession: function(inputArgs = {}, callbackFunc = &quot;&quot;) as void</code></td><td>Initializes your Branch session.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>inputArgs</code></td><td><code>Object</code></td><td>Input arguments. Typically <code>m.global.launchArgs</code></td></tr><tr><td><code>callbackFunc</code></td><td><code>String</code></td><td>Name of the callback function for initialization.</td></tr></tbody></table><h4 id="example-usage" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub init()</span></span>
<span class="line"><span>    &#39; Other init Configs...&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Create Instance&#39;</span></span>
<span class="line"><span>  m.branchSdkObj = CreateBranchSdkForSceneGraphApp()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>    ShowMessageDialog(&quot;Failed to initialize Branch SDK!&quot;)</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Initialize Branch&#39;</span></span>
<span class="line"><span>    m.branchSdkObj.initSession(m.global.launchArgs, &quot;OnInitSessionCallbackFunc&quot;)</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    &#39; Other init Configs...&#39;</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function OnInitSessionCallbackFunc(event as object) as void</span></span>
<span class="line"><span>    data = event.GetData()</span></span>
<span class="line"><span>  print &quot;OnInitSessionCallbackFunc: &quot; data</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  if (data &lt;&gt; invalid) then</span></span>
<span class="line"><span>    m.lSessionApiResultDetails.text = FormatJson(data)</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    m.lSessionApiResultDetails.text = &quot;initSession API response received!&quot;</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  message = &quot;API Succeeded!&quot;</span></span>
<span class="line"><span>  if (data.error &lt;&gt; invalid)</span></span>
<span class="line"><span>    message = &quot;API Error!&quot;</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    ShowMessageDialog(&quot;initSession&quot; + &quot; &quot; + message)</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span>end function</span></span></code></pre></div><h3 id="setpreinstalldata" tabindex="-1">setPreinstallData <a class="header-anchor" href="#setpreinstalldata" aria-label="Permalink to &quot;setPreinstallData&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1033" target="_blank" rel="noreferrer">setPreinstallData: function(campaign = &quot;&quot;, partner = &quot;&quot;) as void</a></td><td>If your app is preinstalled on Roku devices, for builds distributed to Roku, use this method to set configuration settings for your Branch session to attribute the pre-install to a specific partner.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>campaign</code></td><td><code>String</code></td><td>Name of the campaign.</td></tr><tr><td><code>partner</code></td><td><code>String</code></td><td>Name of the partner. This will typically be a <code>$3p</code> value. Reach out to your Branch account manager to retrieve the <code>$3p</code> value.</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub init()</span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Create Instance&#39;</span></span>
<span class="line"><span>    m.branchSdkObj = CreateBranchSdkForSceneGraphApp()</span></span>
<span class="line"><span>    if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>        ShowMessageDialog(&quot;Failed to initialize Branch SDK!&quot;)</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        print &quot;MainScene : setPreinstallData&quot;</span></span>
<span class="line"><span>        &#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>        m.branchSdkObj.setPreinstallData(&quot;MyCampaign&quot;, &quot;MyPartner&quot;)</span></span>
<span class="line"><span>        InitSession_Clicked()</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span>end sub</span></span></code></pre></div><h3 id="handleinput" tabindex="-1">handleInput <a class="header-anchor" href="#handleinput" aria-label="Permalink to &quot;handleInput&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>handleInput: function(inputArgs = {}, callbackFunc = &quot;&quot;) as void</code></td><td>Handles an input to retrieve deep linking data</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>inputArgs</code></td><td><code>Object</code></td><td>Input arguments. Typically <code>m.global.launchArgs</code>.</td></tr><tr><td><code>callbackFunc</code></td><td><code>String</code></td><td>Name of the callback function for initialization.</td></tr></tbody></table><h4 id="example-usage-1" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-1" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub HandleInput_Clicked()</span></span>
<span class="line"><span>    if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>        ShowMessageDialog(&quot;Branch SDK is not initialized!&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print &quot;Calling Branch HandleInput API&quot;</span></span>
<span class="line"><span>    print &quot;m.global.launchArgs : &quot; m.global.launchArgs</span></span>
<span class="line"><span>    if (m.global.launchArgs &lt;&gt; invalid) then</span></span>
<span class="line"><span>        &#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>        m.branchSdkObj.handleInput(m.global.launchArgs, &quot;OnHandleInputCallbackFunc&quot;)</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        ShowMessageDialog(&quot;Please provide deepLinking arguments!&quot;)</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>function OnHandleInputCallbackFunc(event as object) as void</span></span>
<span class="line"><span>    data = event.GetData()</span></span>
<span class="line"><span>    print &quot;OnHandleInputCallbackFunc: &quot; data</span></span>
<span class="line"><span>    m.global.launchArgs = invalid</span></span>
<span class="line"><span>    message = &quot;API Succeeded!&quot;</span></span>
<span class="line"><span>    if (data.error &lt;&gt; invalid)</span></span>
<span class="line"><span>        message = &quot;API Error!&quot;</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span>    ShowMessageDialog(&quot;handleInput&quot; + &quot; &quot; + message)</span></span>
<span class="line"><span>end function</span></span></code></pre></div><h3 id="logevent" tabindex="-1">logEvent <a class="header-anchor" href="#logevent" aria-label="Permalink to &quot;logEvent&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1061" target="_blank" rel="noreferrer">logEvent: function(name = &quot;&quot;, customer_event_alias = &quot;&quot;, transaction_id = &quot;&quot;, currency = &quot;&quot;, revenue = &quot;&quot;, callbackField = &quot;&quot;, callbackFunc = &quot;&quot;) as void</a></td><td>Tracks an event or conversion like PURCHASE or VIEW_STREAM.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>name</code></td><td><code>String</code></td><td>Name of the event. List of compatible events can be found <a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L57" target="_blank" rel="noreferrer">here</a>.</td></tr><tr><td><code>customer_event_alias</code></td><td><code>String</code></td><td>The alias of your event.</td></tr><tr><td><code>transaction_id</code></td><td><code>String</code></td><td>The ID of of your event.</td></tr><tr><td><code>currency</code></td><td><code>String</code></td><td>The currency value of your event. List of compatible events can be found <a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L85" target="_blank" rel="noreferrer">here</a>.</td></tr><tr><td><code>revenue</code></td><td><code>String</code></td><td>The revenue of your event.</td></tr><tr><td><code>callbackFunc</code></td><td><code>String</code></td><td>Name of the callback function for your event.</td></tr></tbody></table><h4 id="example-usage-2" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-2" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub LogEventPurchase_Clicked()</span></span>
<span class="line"><span>    if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>        ShowMessageDialog(&quot;Branch SDK is not initialized!&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print &quot;Calling Branch LogEvent Standard API&quot;</span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>    m.branchSdkObj.logEvent(BranchSdkConstants().EVENT_TYPE.PURCHASE, &quot;My First Purchase as customer_event_alias&quot;, &quot;transaction_id&quot;, &quot;INR&quot;, 99.99, &quot;OnLogEventPurchaseCallbackFunc&quot;)</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function OnLogEventPurchaseCallbackFunc(event as object) as void</span></span>
<span class="line"><span>    data = event.GetData()</span></span>
<span class="line"><span>    print &quot;OnLogEventPurchaseCallbackFunc: &quot; data</span></span>
<span class="line"><span>    message = &quot;API Succeeded!&quot;</span></span>
<span class="line"><span>    if (data.error &lt;&gt; invalid)</span></span>
<span class="line"><span>        message = &quot;API Error!&quot;</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span>    ShowMessageDialog(&quot;logEvent Purchase&quot; + &quot; &quot; + message)</span></span>
<span class="line"><span>end function</span></span></code></pre></div><h3 id="disabletracking" tabindex="-1">disableTracking <a class="header-anchor" href="#disabletracking" aria-label="Permalink to &quot;disableTracking&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1128" target="_blank" rel="noreferrer">disableTracking: function(isDisable as boolean) as void</a></td><td>If you need to comply with a user&#39;s request to not be tracked for GDPR purposes, or otherwise determine that a user should not be tracked, utilize this field to prevent Branch from sending network requests.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>isDisable</code></td><td><code>boolean</code></td><td>Set to <code>true</code> to disable tracking. Set to <code>false</code> to enable tracking.</td></tr></tbody></table><h4 id="example-usage-3" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-3" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub init()</span></span>
<span class="line"><span>    m.bTracking.observeField(&quot;buttonSelected&quot;, &quot;Tracking_Clicked&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#39; m.bInitSession.setFocus(true)&#39;</span></span>
<span class="line"><span>    m.bSetIdentity.setFocus(true)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Create Instance&#39;</span></span>
<span class="line"><span>    m.branchSdkObj = CreateBranchSdkForSceneGraphApp()</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sub Tracking_Clicked()</span></span>
<span class="line"><span>    if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>        ShowMessageDialog(&quot;Branch SDK is not initialized!&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print &quot;Calling Branch Tracking API&quot;</span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>    m.branchSdkObj.disableTracking(m.IsTracking)</span></span>
<span class="line"><span>    m.IsTracking = not m.IsTracking</span></span>
<span class="line"><span>    SetTrackingButtonText()</span></span>
<span class="line"><span>end sub</span></span></code></pre></div><h3 id="setidentity" tabindex="-1">setIdentity <a class="header-anchor" href="#setidentity" aria-label="Permalink to &quot;setIdentity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1135" target="_blank" rel="noreferrer">setIdentity: function(developer_identity = &quot;&quot;, callbackFunc = &quot;&quot;) as void</a></td><td>Sets the identity of the user. Typically performed when the user logs in.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>developer_identity</code></td><td><code>String</code></td><td>The ID of the user logging in.</td></tr><tr><td><code>callbackFunc</code></td><td><code>String</code></td><td>Name of the callback function for setting identity.</td></tr></tbody></table><h4 id="example-usage-4" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-4" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub init()</span></span>
<span class="line"><span>    m.bSetIdentity.observeField(&quot;buttonSelected&quot;, &quot;SetIdentity_Clicked&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#39; m.bInitSession.setFocus(true)&#39;</span></span>
<span class="line"><span>    m.bSetIdentity.setFocus(true)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Create Instance&#39;</span></span>
<span class="line"><span>    m.branchSdkObj = CreateBranchSdkForSceneGraphApp()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    SetTrackingButtonText()</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sub SetIdentity_Clicked()</span></span>
<span class="line"><span>    if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>        ShowMessageDialog(&quot;Branch SDK is not initialized!&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print &quot;Calling Branch SetIdentity API&quot;</span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>    m.branchSdkObj.setIdentity(&quot;User123&quot;, &quot;OnSetIdentityCallbackFunc&quot;)</span></span>
<span class="line"><span>end sub</span></span></code></pre></div><h3 id="logout" tabindex="-1">logout <a class="header-anchor" href="#logout" aria-label="Permalink to &quot;logout&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/827986a1b5630c6b3923de4a2aa3ccc217416a35/source/libs/BranchSdkLibrary.brs#L1143" target="_blank" rel="noreferrer">logout: function(callbackFunc = &quot;&quot;) as void</a></td><td>Removes the identity set from <code>setIdentity</code>. Typically used when the user logs out.</td></tr></tbody></table><table tabindex="0"><thead><tr><th>Argument</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>callbackFunc</code></td><td><code>String</code></td><td>Name of the callback function for removing identity.</td></tr></tbody></table><h4 id="example-usage-5" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage-5" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub init()</span></span>
<span class="line"><span>    m.bLogout.observeField(&quot;buttonSelected&quot;, &quot;Logout_Clicked&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#39; m.bInitSession.setFocus(true)&#39;</span></span>
<span class="line"><span>    m.bSetIdentity.setFocus(true)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Create Instance&#39;</span></span>
<span class="line"><span>    m.branchSdkObj = CreateBranchSdkForSceneGraphApp()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    SetTrackingButtonText()</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sub Logout_Clicked()</span></span>
<span class="line"><span>    if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>        ShowMessageDialog(&quot;Branch SDK is not initialized!&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print &quot;Calling Branch Logout API&quot;</span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>    m.branchSdkObj.logout(&quot;OnLogoutCallbackFunc&quot;)</span></span>
<span class="line"><span>end sub</span></span></code></pre></div>`,34)])])}const b=n(p,[["render",l]]);export{h as __pageData,b as default};

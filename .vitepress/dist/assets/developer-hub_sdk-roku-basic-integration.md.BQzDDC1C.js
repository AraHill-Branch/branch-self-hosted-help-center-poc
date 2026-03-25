import{_ as a,o as s,c as e,ae as t}from"./chunks/framework.B6gjLfeO.js";const h=JSON.parse('{"title":"Roku Basic Integration","description":"","frontmatter":{"title":"Roku Basic Integration","slug":"sdk-roku-basic-integration"},"headers":[],"relativePath":"developer-hub/sdk-roku-basic-integration.md","filePath":"developer-hub/sdk-roku-basic-integration.md"}'),p={name:"developer-hub/sdk-roku-basic-integration.md"};function i(l,n,o,r,c,d){return s(),e("div",null,[...n[0]||(n[0]=[t(`<h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><p>In order to implement the Branch SDK into your Roku app, you need to have/complete the following:</p><ol><li><p>Create a <a href="https://dashboard.branch.io/" target="_blank" rel="noreferrer">Branch Dashboard</a>.</p><ul><li>Obtain your <a href="https://dashboard.branch.io/account-settings/profile" target="_blank" rel="noreferrer">Branch Key</a>.</li></ul></li><li><p>Create a <a href="https://my.roku.com/account" target="_blank" rel="noreferrer">Roku Account</a>.</p><ul><li>Purchase a <a href="https://www.roku.com/en-gb/products/players" target="_blank" rel="noreferrer">Roku TV or Streaming Device</a></li><li>Enroll in <a href="https://developer.roku.com/en-gb/enrollment/standard" target="_blank" rel="noreferrer">Roku&#39;s Developer Program</a></li></ul></li></ol><h2 id="_1-set-up-development-environment" tabindex="-1">1. Set Up Development Environment <a class="header-anchor" href="#_1-set-up-development-environment" aria-label="Permalink to &quot;1. Set Up Development Environment&quot;">​</a></h2><p>The first step you should take is to set up your development environment for Roku.</p><ul><li><p>Enable Developer Mode on your Roku Device</p></li><li><p>Get your device&#39;s IP Address and set a pasword</p></li><li><p>Use the local IP address in your browser to access the developer workstation</p><ul><li>Log in using the credentials you set</li></ul></li></ul><p>For a detailed guide on this, visit Roku&#39;s Developer Docs <a href="https://developer.roku.com/docs/developer-program/getting-started/developer-setup.md" target="_blank" rel="noreferrer">here</a>.</p><p><em>[Image: 794]</em></p><h2 id="_2-install-branch" tabindex="-1">2. Install Branch <a class="header-anchor" href="#_2-install-branch" aria-label="Permalink to &quot;2. Install Branch&quot;">​</a></h2><p>You must download the Branch Roku SDK and retrieve the following library files:</p><ul><li><a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/master/source/libs/BranchSdkLibrary.brs" target="_blank" rel="noreferrer">BranchSdkLibrary.brs</a></li><li><a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/master/components/tasks/BranchSdkTask.xml" target="_blank" rel="noreferrer">BranchSdkTask.xml</a></li><li><a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/master/components/tasks/BranchSdkTask.brs" target="_blank" rel="noreferrer">BranchSdkTask.brs</a></li></ul><ol><li>Create a new folder called <code>tasks</code> in the <code>components</code> folder of your application.</li><li>Copy both the <code>BranchSdkTask.xml</code> and <code>BranchSdkTask.brs</code> files into your project&#39;s new tasks folder.</li><li>Create a new folder called <code>libs</code> in the <code>source</code> folder of your application.</li><li>Copy the <code>BranchSdkLibrary.brs</code> file from the Branch repo into your project&#39;s new libs folder</li></ol><p>In the end, your application&#39;s folder structure should look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> └──  components</span></span>
<span class="line"><span> │   └── tasks</span></span>
<span class="line"><span> │       └──  BranchSdkTask.brs</span></span>
<span class="line"><span> │       └── BranchSdkTask.xml</span></span>
<span class="line"><span> └── source</span></span>
<span class="line"><span>       └── libs</span></span>
<span class="line"><span>           └── BranchSdkLibrary.brs</span></span></code></pre></div><h2 id="_3-configure-branch" tabindex="-1">3. Configure Branch <a class="header-anchor" href="#_3-configure-branch" aria-label="Permalink to &quot;3. Configure Branch&quot;">​</a></h2><p>In the <code>Main.brs</code> file of your project (the entry point of the SceneGraph application). add <code>ConfigureBranchSdk(screen)</code> using your an <code>roSGScreen</code> object.</p><p>Be sure to use your Branch Key obtained from the steps in the “Prerequisites” section of this article.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub Main(args as dynamic)</span></span>
<span class="line"><span>	screen = CreateObject(&quot;roSGScreen&quot;)</span></span>
<span class="line"><span>	&#39; Set Branch SDK configurations&#39;</span></span>
<span class="line"><span>	ConfigureBranchSdk(screen)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&#39; Other screen configs below&#39;</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span>          </span></span>
<span class="line"><span>sub ConfigureBranchSdk(screen as dynamic)</span></span>
<span class="line"><span>    options = {}</span></span>
<span class="line"><span>    options.branchKey = &quot;key_live_XXXX&quot;</span></span>
<span class="line"><span>    options.logLevel = BranchSdkConstants().LOG_LEVEL.DEBUG</span></span>
<span class="line"><span>    options.environment = BranchSdkConstants().ENVIRONMENT.PRODUCTION</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#39; Set Branch SDK configuration parameter as required&#39;</span></span>
<span class="line"><span>    screen.getGlobalNode().addFields({branchSdkConfig: options})</span></span>
<span class="line"><span>end sub</span></span></code></pre></div><p>You can view an example <code>Main.brs</code> <a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/master/source/Main.brs" target="_blank" rel="noreferrer">here</a>.</p><h2 id="_4-initialize-branch" tabindex="-1">4. Initialize Branch <a class="header-anchor" href="#_4-initialize-branch" aria-label="Permalink to &quot;4. Initialize Branch&quot;">​</a></h2><h3 id="_4-1-add-the-branch-sdk-script" tabindex="-1">4.1 Add the Branch SDK Script <a class="header-anchor" href="#_4-1-add-the-branch-sdk-script" aria-label="Permalink to &quot;4.1 Add the Branch SDK Script&quot;">​</a></h3><p>Open your main <code>Scene</code> file (ex. <code>MainScene.xml</code>) in your <code>components</code> folder, and add a new script file path for <code>BranchSdkLibrary.brs</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;</span></span>
<span class="line"><span>&lt;component name=&quot;MainScene&quot; extends=&quot;Scene&quot;&gt;</span></span>
<span class="line"><span>	&lt;script type=&quot;text/brightscript&quot; uri=&quot;pkg:/components/MainScene.brs&quot;/&gt;</span></span>
<span class="line"><span>	&lt;!-- Replace with correct path if necessary --&gt;</span></span>
<span class="line"><span>	&lt;script type=&quot;text/brightscript&quot; uri=&quot;pkg:/source/libs/BranchSdkLibrary.brs&quot;/&gt;</span></span>
<span class="line"><span>	&lt;!-- Other Scripts Below --&gt;</span></span>
<span class="line"><span>&lt;/component&gt;</span></span></code></pre></div><p>You can view an example <code>MainScene.xml</code> <a href="https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/MainScene.xml" target="_blank" rel="noreferrer">here</a>.</p><h3 id="_4-2-create-initialize-the-branch-instance" tabindex="-1">4.2 Create &amp; Initialize the Branch Instance <a class="header-anchor" href="#_4-2-create-initialize-the-branch-instance" aria-label="Permalink to &quot;4.2 Create &amp; Initialize the Branch Instance&quot;">​</a></h3><p>Next, open your main <code>Scene&#39;s</code> <code>.brs</code> file (ex. <code>MainScene.brs</code>), and create &amp; initialize the Branch instance inside <code>sub init()</code> with a callback. This will initialise an app open event.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub init()</span></span>
<span class="line"><span>  &#39; Other init Configs...&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &#39; BRANCH SDK INTEGRATION - Create Instance&#39;</span></span>
<span class="line"><span>  m.branchSdkObj = CreateBranchSdkForSceneGraphApp()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>    ShowMessageDialog(&quot;Failed to initialize Branch SDK!&quot;)</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Initialize Branch&#39;</span></span>
<span class="line"><span>    m.branchSdkObj.initSession(m.global.launchArgs, &quot;OnInitSessionCallbackFunc&quot;)</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  &#39; Other init Configs...&#39;</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function OnInitSessionCallbackFunc(event as object) as void</span></span>
<span class="line"><span>  data = event.GetData()</span></span>
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
<span class="line"><span>    print &quot;Branch initSession details: &quot; + message</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span>end function</span></span></code></pre></div><p>You can view an example <code>MainScene.brs</code> <a href="https://github.com/BranchMetrics/branch-roku-sdk/blob/master/components/MainScene.brs" target="_blank" rel="noreferrer">here</a>.</p><h2 id="_5-configure-deep-linking" tabindex="-1">5. Configure Deep Linking <a class="header-anchor" href="#_5-configure-deep-linking" aria-label="Permalink to &quot;5. Configure Deep Linking&quot;">​</a></h2><p>When your Branch session is initialized, you&#39;ll want to configure your deep linking routing logic through a new <code>sub</code> method and handled through a callback function.</p><p>There are two primary ways in which links can trigger the Roku app to respond <code>/launch/{channel}</code> and <code>/input</code>. Here are curls that indicate the format of these links, which you can modify and use for testing:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-sEoBT" id="tab-Lf3pCdt" checked><label data-title="/launch/{channel}" for="tab-Lf3pCdt">/launch/{channel}</label><input type="radio" name="group-sEoBT" id="tab-kc60oJ6"><label data-title="/input" for="tab-kc60oJ6">/input</label></div><div class="blocks"><div class="language-custom vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">custom</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>curl -d &#39;&#39; &#39;http://ROKU_LOCAL_IP:8060/launch/dev?contentId=1234&amp;mediaType=movie&#39;</span></span></code></pre></div><div class="language-custom vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">custom</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>curl -d &#39;&#39; &#39;http://ROKU_LOCAL_IP:8060/input?contentId=1234&amp;mediaType=movie&#39;</span></span></code></pre></div></div></div><p>In both cases, please send up the data (<code>contentId</code>, <code>mediaType</code>, and any other query parameters) to Branch through the <code>handleInput(...)</code> method.</p><div class="info custom-block"><p class="custom-block-title">Deep Linking Format</p><p>For proper deep linking, please make sure that you are using a correct format, ex. <code>contentId=1234&amp;mediaType=movie</code></p></div><p>For a detailed guide on deep link routing please refer to Roku&#39;s dev docs on <a href="https://developer.roku.com/en-gb/docs/developer-program/discovery/implementing-deep-linking.md" target="_blank" rel="noreferrer">deep linking</a>.</p><p>Roku also provides a useful deep link <a href="http://devtools.web.roku.com/DeepLinkingTester/" target="_blank" rel="noreferrer">testing tool</a>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub init()</span></span>
<span class="line"><span>  &#39; After Branch is initialized...&#39;</span></span>
<span class="line"><span>  HandleInput_Clicked()</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sub HandleInput_Clicked()</span></span>
<span class="line"><span>  if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>    print &quot;Branch SDK is not initialized!&quot;</span></span>
<span class="line"><span>    return</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  print &quot;Calling Branch HandleInput API&quot;</span></span>
<span class="line"><span>  print &quot;m.global.launchArgs : &quot; m.global.launchArgs</span></span>
<span class="line"><span>  if (m.global.launchArgs &lt;&gt; invalid) then</span></span>
<span class="line"><span>    &#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>    m.branchSdkObj.handleInput(m.global.launchArgs, &quot;OnHandleInputCallbackFunc&quot;)</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    print &quot;Please provide deep linking arguments!&quot;</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span>end sub</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>function OnHandleInputCallbackFunc(event as object) as void</span></span>
<span class="line"><span>  data = event.GetData()</span></span>
<span class="line"><span>  print &quot;OnHandleInputCallbackFunc: &quot; data</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  m.global.launchArgs = invalid</span></span>
<span class="line"><span>  message = &quot;API Succeeded!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (data.error &lt;&gt; invalid)</span></span>
<span class="line"><span>    message = &quot;API Error!&quot;</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span>    print &quot;handleInput: &quot; + message</span></span>
<span class="line"><span>end function</span></span></code></pre></div><h2 id="_6-track-events" tabindex="-1">6. Track Events <a class="header-anchor" href="#_6-track-events" aria-label="Permalink to &quot;6. Track Events&quot;">​</a></h2><p>You will want to start tracking events in order for Branch to attribute conversions made on your application to campaigns.</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-JA6nv" id="tab-6UTNtZK" checked><label data-title="Time Spent Viewing &amp; View Video" for="tab-6UTNtZK">Time Spent Viewing &amp; View Video</label><input type="radio" name="group-JA6nv" id="tab-dcc_1Gj"><label data-title="Track Purchase event" for="tab-dcc_1Gj">Track Purchase event</label><input type="radio" name="group-JA6nv" id="tab-aoNNhaB"><label data-title="Track Custom Event" for="tab-aoNNhaB">Track Custom Event</label></div><div class="blocks"><div class="language-custom vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">custom</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function onKeyEvent(key as String, press as Boolean) as Boolean</span></span>
<span class="line"><span>  if press then</span></span>
<span class="line"><span>    if key = &quot;play&quot; then</span></span>
<span class="line"><span>      tmr = timer.start()</span></span>
<span class="line"><span>      m.branchSdkObj.logEvent(&quot;Video Stream&quot;, &quot;Mandalorian-S2-EP5&quot;, &quot;&quot;, &quot;&quot;, 0, &quot;OnLogEventVideoView&quot;)</span></span>
<span class="line"><span>      if key = &quot;back&quot; then</span></span>
<span class="line"><span>        timeSpentViewingMin = tmr.stop().toMin()</span></span>
<span class="line"><span>        m.branchSdkObj.logEvent(&quot;TSV(MIN)&quot;, &quot;Mandalorian-S2-EP5&quot;, &quot;&quot;, &quot;&quot;, timeSpentViewingMin, &quot;OnLogEventTSVMin&quot;)</span></span>
<span class="line"><span>      end if</span></span>
<span class="line"><span>    end if</span></span>
<span class="line"><span>  end if</span></span>
<span class="line"><span>end function</span></span></code></pre></div><div class="language-custom vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">custom</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub LogEventPurchase_Clicked()</span></span>
<span class="line"><span>	if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>		ShowMessageDialog(&quot;Branch SDK is not initialized!&quot;)</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	end if</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	print &quot;Calling Branch LogEvent Standard API&quot;</span></span>
<span class="line"><span>	&#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>	m.branchSdkObj.logEvent(BranchSdkConstants().EVENT_TYPE.PURCHASE, &quot;My First Purchase as customer_event_alias&quot;, &quot;transaction_id&quot;, &quot;INR&quot;, 99.99, &quot;OnLogEventPurchaseCallbackFunc&quot;)</span></span>
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
<span class="line"><span>end function</span></span></code></pre></div><div class="language-custom vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">custom</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sub LogEventCustom_Clicked()</span></span>
<span class="line"><span>	if (m.branchSdkObj = invalid) then</span></span>
<span class="line"><span>		ShowMessageDialog(&quot;Branch SDK is not initialized!&quot;)</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	end if</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	print &quot;Calling Branch LogEvent Custom API&quot;</span></span>
<span class="line"><span>	&#39; BRANCH SDK INTEGRATION - Call API&#39;</span></span>
<span class="line"><span>	m.branchSdkObj.logEvent(&quot;Custom Event Name&quot;, &quot;Custom Event Customer_event_alias&quot;, &quot;transaction_id&quot;, &quot;INR&quot;, 1199.99, &quot;OnLogEventCustomCallbackFunc&quot;)</span></span>
<span class="line"><span>end sub</span></span></code></pre></div></div></div><p>Be sure to follow the <a href="./track-branch-events.html"><strong>event tracking guide</strong></a> to determine which events you can track.</p><h2 id="_7-verify-data-in-branch" tabindex="-1">7. Verify Data in Branch <a class="header-anchor" href="#_7-verify-data-in-branch" aria-label="Permalink to &quot;7. Verify Data in Branch&quot;">​</a></h2><p>Once the above steps are complete, you are now ready to verify that conversions are being sent to Branch. To verify data is being sent to Branch <a href="https://dashboard.branch.io/liveview/events" target="_blank" rel="noreferrer">Branch Dashboard&#39;s Liveview</a> and apply the following filter:</p><table tabindex="0"><thead><tr><th>Filter</th><th>Operator</th><th>Value</th></tr></thead><tbody><tr><td>os</td><td>equals</td><td>ROKU</td></tr></tbody></table><p><em>[Image: 922]</em></p><p>Additionally, you will see conversions within the Branch Dashboard reports.</p><p><em>[Image: 1027]</em></p>`,47)])])}const b=a(p,[["render",i]]);export{h as __pageData,b as default};

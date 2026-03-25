import{_ as a,o as s,c as e,ae as t}from"./chunks/framework.B6gjLfeO.js";const u=JSON.parse('{"title":"Connected Basic Integration","description":"","frontmatter":{"title":"Connected Basic Integration","slug":"connected-basic-integration"},"headers":[],"relativePath":"developer-hub/connected-basic-integration.md","filePath":"developer-hub/connected-basic-integration.md"}'),i={name:"developer-hub/connected-basic-integration.md"};function p(l,n,c,o,r,d){return s(),e("div",null,[...n[0]||(n[0]=[t(`<div class="tip custom-block"><p class="custom-block-title">SDK Stats</p><p><strong>Github Repository is Private until General Availability</strong><br><strong>SDK Size</strong>: 33kb<br><strong>Speed</strong>: Median 80ms to 250ms</p></div><h2 id="minimum-requirements" tabindex="-1">Minimum Requirements <a class="header-anchor" href="#minimum-requirements" aria-label="Permalink to &quot;Minimum Requirements&quot;">​</a></h2><p>The Branch Connected SDK requires native browser Javascript and has <strong>only</strong> been tested in Tizen and WebOS with sessionStorage capability. No 3rd party libraries are needed to make use of the SDK as is it 100% native Javascript.</p><h2 id="initialize-branch" tabindex="-1">Initialize Branch <a class="header-anchor" href="#initialize-branch" aria-label="Permalink to &quot;Initialize Branch&quot;">​</a></h2><h2 id="npm-recommended" tabindex="-1">NPM (Recommended) <a class="header-anchor" href="#npm-recommended" aria-label="Permalink to &quot;NPM (Recommended)&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install branch-connected-sdk</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import branch from &#39;branch-connected-sdk&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Pass the device&#39;s advertising id through &#39;options&#39; with the corresponding key (https://help.branch.io/developers-hub/docs/connected-basic-integration#advertising-id-index)</span></span>
<span class="line"><span>const options = {</span></span>
<span class="line"><span>    advertising_ids: {</span></span>
<span class="line"><span>        SAMSUNG_IFA: &#39;xxxxx&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// init Branch </span></span>
<span class="line"><span>branch.init(&#39;key_live_YOUR_KEY_GOES_HERE&#39;, options);</span></span></code></pre></div><ul><li>Change <code>key_live_YOUR_KEY_GOES_HERE</code> to match your <a href="https://dashboard.branch.io/account-settings/app" target="_blank" rel="noreferrer">Branch Dashboard</a></li><li>If you&#39;d like to use a specific version of the SDK, point to <code>npm install branch-connected-sdk@x.xx.x</code> or update your <code>package.json</code> and rerun <code>npm install</code></li></ul><h2 id="script" tabindex="-1">Script <a class="header-anchor" href="#script" aria-label="Permalink to &quot;Script&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!doctype html&gt;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;&lt;/title&gt;</span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        // load Branch</span></span>
<span class="line"><span>        (function (b, r, a, n, c, h, _, s, d, k) {</span></span>
<span class="line"><span>            if (!b[n] || !b[n]._q) {</span></span>
<span class="line"><span>                for (; s &lt; _.length;) c(h, _[s++]);</span></span>
<span class="line"><span>                d = r.createElement(a);</span></span>
<span class="line"><span>                d.async = 1;</span></span>
<span class="line"><span>                d.src = &quot;https://cdn.branch.io/branch-connected.min.js&quot;;</span></span>
<span class="line"><span>                k = r.getElementsByTagName(a)[0];</span></span>
<span class="line"><span>                k.parentNode.insertBefore(d, k);</span></span>
<span class="line"><span>                b[n] = h</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        })(window, document, &quot;script&quot;, &quot;branch&quot;, function (b, r) {</span></span>
<span class="line"><span>                b[r] = function () {</span></span>
<span class="line"><span>                    b._q.push([r, arguments])</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }, {</span></span>
<span class="line"><span>                _q: [],</span></span>
<span class="line"><span>                _v: 1</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            &quot;data first init link logout setIdentity track logEvent disableTracking qrCode&quot;</span></span>
<span class="line"><span>            .split(&quot; &quot;), 0);</span></span>
<span class="line"><span>        // Pass the device&#39;s advertising id through &#39;options&#39; with the corresponding key (https://help.branch.io/developers-hub/docs/connected-basic-integration#advertising-id-index)</span></span>
<span class="line"><span>        const options = {</span></span>
<span class="line"><span>            advertising_ids: {</span></span>
<span class="line"><span>                SAMSUNG_IFA: &#39;xxxxx&#39;,</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>        // init Branch </span></span>
<span class="line"><span>        branch.init(&#39;key_live_YOUR_KEY_GOES_HERE&#39;, options);</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><ul><li>Change <code>key_live_YOUR_KEY_GOES_HERE</code> to match your <a href="https://dashboard.branch.io/account-settings/app" target="_blank" rel="noreferrer">Branch Dashboard</a></li></ul><h2 id="advertising-id-index" tabindex="-1">Advertising ID Index <a class="header-anchor" href="#advertising-id-index" aria-label="Permalink to &quot;Advertising ID Index&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Device</th><th>Key</th></tr></thead><tbody><tr><td>Samsung</td><td>SAMSUNG_IFA</td></tr><tr><td>LG</td><td>LG_IFA</td></tr><tr><td>Panasonic</td><td>PANASONIC_IFA</td></tr><tr><td>Playstation</td><td>PLAYSTATION_IFA</td></tr><tr><td>Xbox</td><td>XBOX_MSAI</td></tr><tr><td>Roku</td><td>ROKU_RIDA</td></tr></tbody></table>`,13)])])}const b=a(i,[["render",p]]);export{u as __pageData,b as default};

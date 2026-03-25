---
title: "Implement Content Security Protocol (CSP)"
slug: implement-content-security-protocol-csp
---

## Background

Branch takes customer’s privacy and security very seriously. The following document provides recommendations to enable our customers to implement Content Security Policy (CSP) in conjunction with the Branch webSDK into their websites.

## How does CSP work

Content Security Policy (CSP) is a computer security standard that provides an added layer of protection against Cross-Site Scripting (XSS), clickjacking, and other code injection attacks that rely on executing malicious content in the context of a trusted web page. By using suitable CSP directives in HTTP response headers, you can selectively specify which data sources should be permitted in your web application.

### Add CSP in HTTP response headers on Server Side

Any server side programming environment should allow you to send back a custom HTTP response header.Here’s an example of adding CSP headers to an Apache web server

Added to the httpd.conf or .htaccess file, this will set a default policy to allow only content from the origin.

```
Header set Content-Security-Policy "default-src 'self';"
```

Please refer to <https://content-security-policy.com/> for different servers configuration.

### Add CSP through `<meta>` tag under HTML Page

CSP directive could be added on page level by using `<meta>` tag. Here is an example to add a CSP policy in your HTML page

```
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

Both methods are widely adopted in the web. If your website is a single page application or you only want to apply the CSP to a specific page, adding CSP via <meta> header could be a better option as it is fast and easy to implement and change.

## Integrate the Branch Web SDK in conjunction with CSP policy

For customers having CSP policy implemented in its website or planning to add CSP policy when integrating Branch webSDK, here are some options and recommendations that we recommend.

### Wrap Branch related code into a local javascript file

If customers want to wrap and store the branch related JavaScript codes into a javascript file under the server where the website is hosted, they could use the `script-src 'self'` policy as ‘self’ matches the current origin and JavaScript files loaded from the same origin will be allowed..

```
Content-Security-Policy: script-src 'self' https://cdn.branch.io https://app.link;
```

Here is an example about adding a proper CSP policy with <meta> tag when integrating Branch webSDK using local javascript files. In the following script, the **branch.js** file is stored locally and `&lt;meta http-equiv="Content-Security-Policy" content="script-src 'self' https://cdn.branch.io https://app.link>` defines the CSP policy.

```
<!doctype html>
<html><head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' https://cdn.branch.io https://app.link">
  <title>Branch Demo</title>
  <script src="branch.js"></script>
</head><body>Branch Journey Demo</body>
</html>
```

### `Use in-line branch related javascript codes`

Some customers prefer to use [inline javascript](https://www.geeksforgeeks.org/how-does-inline-javascript-work-with-html/) code when integrating with branchWebSDK. For example, our demo page [https://cdn.branch.io/example.html](https://cdn.us.document360.io/082e8be0-ad38-4650-9062-689a75e517a2/Images/Documentation/example(3).html) is using the inline script when calling functions defined in branchWebSDK.

There are two widely used options, using ***hashes*** or **nonces** to allow the executions of inline javascript codes securely when using CSP policy

#### Option 1: Using CSP hashes policy for inline script security

Using a hash is one way to allow the execution of inline scripts in a Content Security Policy. It's simply a white list and when the browser sees that original script block it'll hash it, compare it with the CSP and then run it if it matches. Basically, the client hashes the inline javascript code and get a SHA256 hash and added it under the CSP policy

```
Content-Security-Policy: script-src 'sha256-Ci5HNPYwBSR4VHU9hJh95ZFVy6fOb+k1oj6ZuaHln/g=' https://cdn.branch.io https://app.link;
```

Here is an example of using CSP hashes when using inline Javascript

<https://codepen.io/BranchWebSDK/pen/RwRqLmv>

In the code, we define the CSP hashes through the <meta> tag

```
…..
<meta http-equiv="Content-Security-Policy" content="script-src  'sha256-Ci5HNPYwBSR4VHU9hJh95ZFVy6fOb+k1oj6ZuaHln/g=' https://cdn.branch.io https://app.link">
  <title>BranchWebSDK Demo</title>
  <script>
    // load Branch
(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";
……
</script>
```

The SHA256 hashes are generated based on the inline JavaScript code. The easiest way to generate it is to just open the developer tools console of your browsers and it will output what the expected hash of your script was in the console error message. Below is a screenshot of how browser console generate the CSP hashes for you.

*[Image: 2418]*

#### Option 2: Using CSP nonce policy for inline script security

The biggest challenge for using hashes is that the hash has to be regenerated when you change your scripts. It means, if your inline JavaScript codes are dynamic, this hash method will not be useful for you. CSP nonce provides another way to handle it.

A nonce is a pseudo-random "number used once". Rather than white listing a precise script block like the hash does, a nonce allows you to white list the entire script block regardless of what's in there.

```
Content-Security-Policy: script-src 'nonce-4AEemGb0xJptoIGFP3Nd' https://cdn.branch.io https://app.link;
```

Here is an example of <https://codepen.io/BranchWebSDK/pen/LYZBqao> using nonce in CSP policy. In the codes, It consists of both a `<meta>` header with CSP policy defined and an attribute on the script tag

```
<head>
  <meta http-equiv="Content-Security-Policy" content="script-src  'nonce-4AEemGb0xJptoIGFP3Nd' https://cdn.branch.io https://app.link">
  <title>BranchWebSDK Demo</title>
  <script nonce="4AEemGb0xJptoIGFP3Nd">
    // load Branch
(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r)
……
 </script>
```

::: info Note
The nonce should be generated per request, and it should be random.
:::

In the above provided example, we explicitly added `script-src` because some javascript files are loaded from these two domains when executing the branch webSDK
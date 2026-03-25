---
title: "Supporting SKAN + Device-level in Parallel"
slug: supporting-skan-device-level-in-parallel
---

## Overview

Branch will continue to provide device-level attribution wherever this is in line with the spirit and letter of Apple’s updated privacy policies, with an eye toward data minimization and user privacy. In order to do so, we ask that our network partners review this spec and ensure they’re sending all required data to Branch using the outlined formats and macros. The intent here is to enable you to use SKAdNetwork *in parallel* with device-level attribution (where allowed).

This allows us to provide additional data like accurate click counts and device-level attribution (where allowed, i.e. when the user has consented via the AppTrackingTransparency framework), as well as to power deep linking for ads clickers.

## Things That Do Not Change

- **Web Inventory**  
   If you’re running inventory on web that utilizes a Branch tracking link, no changes are required. Branch will continue to perform attribution as before, assuming the destination app gets consent via the AppTrackingTransparency prompt. If the user isn't prompted or declines consent, Branch will not do attribution to the paid ads link click, though deep linking will continue to work as before.
- **Campaign Data**  
   You should continue to send campaign data and any other metadata you’re already sending today. This includes all the standard parameters like ~campaign, ~ad\_set\_name, ~ad\_name, etc.
- **IDFA**  
  *If* IDFA is available, you should send IDFA just like you did pre-iOS14.5 (using the $idfa macro). Branch will use IDFA to do deterministic device-level attribution. Make sure you still send correct device metadata (i.e. user-agent, IP, etc) regardless, though! We use this data for other important things like fraud detection and to properly tag the click with metadata like Brand and Model.

## Things That Do Change

Only minimal changes should be required for attribution to work smoothly.

There are three key steps to follow:

1. Make sure you’re sending all required data.
2. If you’re passing us clicks server-to-server, make sure you’re sending device metadata, not server metadata, and that it’s in the right format.
3. If you support SKAdNetwork in parallel with device-level attribution, make sure you’re firing a click to Branch in parallel with the SKAdNetwork request. We support both client-side and server-side ingestion of these clicks.

The following parameters are required:

- IP Address
- User Agent
- Also required, but inferred from user-agent (contact Branch if you can’t send user-agent and instead need to send these parameters explicitly)

  - OS
  - OS Version
  - Model
  - Brand

In addition to the basic metadata above (which is required for Branch to be able to do Predictive Modeling post-iOS14), you can optionally send Branch the following as link data parameter for more accurate modeling:

- Local IP

::: warning Send Device Metadata
Make sure you send **device** metadata, not server metadata. For example, sending a server-to-server click with the server’s IP can cause matching to **FAIL** and can break e.g. deep linking. You **must** send the **device’s** IP, user-agent, etc. We’ll continue to reiterate this throughout this doc because it’s extremely important.
:::

::: info Supporting SKAdNetwork and Device-level Attribution Together
If you plan to support SKAdNetwork and device-level attribution via IDFA or Predictive Modeling together, please read through the documentation in the [Using SKAdNetwork and Device-level Attribution](predictive-modeling-ad-network-click-spec.md#using-skadnetwork-and-predictive-modeling-together) section below.
:::

## Metadata Detail

## IP Address

*String. Required.*  
 The external IP address of the clicking device.

::: danger
- **DO NOT** send server IP. Client-side Branch Links see device IPs automatically - but if you're sending us events server-to-server you must make sure you're sending us the device IP (rather than the server IP) using the link macro or header methods below.
- Make sure any IP macro you use is being properly populated at the time of click. If we receive something like `device_ip=$(IP)` various important workflows will fail, e.g. deep linking, country detection, and others.
:::

### Passing IP to Branch

- **Query Param**: device\_ip={IP\_ADDRESS}
- **Header**: X-IP-Override: {IP\_ADDRESS}

### Formatting

- **IPV4**: format is x.x.x.x, where x is a decimal value between 0 and 255. Here are some valid examples:

  - 190.128.100.37
  - 112.79.51.87
  - 111.65.45.208
- **IPV6**: format is y:y:y:y:y:y:y:y where y is any hexadecimal value between 0 and FFFF. May or may not contain leading zeros, so all of these are valid:

  - `2001:db8:3333:4444:5555:6666:7777:8888`
- `2001:db8:3333:4444:CCCC:DDDD:EEEE:FFFF`
- `2001:db8::1234:5678`
- `2001:0db8:0001:0000:0000:0ab9:C0A8:0102`
- `2001:db8:1::ab9:C0A8:102`

#### Examples

- Link Query Param:

  - `https://branch.app.link/abc123?device_ip=1.2.3.4`
- Header:

  - `GET https://branch.app.link/abc123`
  - `X-IP-Override: 1.2.3.4`

## User Agent

*String. Required.*

The user-agent of the clicking device.

::: danger
- **DO NOT** send server user-agent! Client-side Branch Links see user-agents automatically - but if you're sending us clicks server-to-server you must make sure you're sending us the device user-agent (rather than the server user-agent) using the link macro or header methods below.
- It's extremely important that you send the correct user-agent as we infer a lot of other important metadata from it - like OS, OS Version, Brand, Model, etc.
:::

### Passing User Agent to Branch

- Generally, Branch will collect user-agent automatically if you're using Branch Links. If you're sending clicks server-to-server you must use one of the methods below.

  - **Branch Link Query Param**: user\_agent={USER\_AGENT} (Note: Make sure to URL-encode the value)
  - **Header**: User-Agent: {USER\_AGENT} (Note: Do **not** URL-encode the value)

Send in raw, unmodified form, URL-encoded if sending on a click URL.

#### Examples

- Original user-agent

  - Mozilla/5.0 (iPhone; CPU iPhone OS 13\_5\_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1
- URL  
  `https://branch.app.link/abc123?user_agent=Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2013_5_1%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Version%2F13.1.1%20Mobile%2F15E148%20Safari%2F604.1`
- Header

  - GET <https://branch.app.link/abc123>
  - User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13\_5\_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1

## Local IP Address

*String. Optional.*  
 The local IP address of the clicking device. This is the LAN IP address of the device, assuming it's available.

### Passing Local IP to Branch

- **Query Param**: local\_ip={LOCAL\_IP\_ADDRESS}

### Formatting

Same as formatting for regular device IP address. See the [IP Address Formatting](predictive-modeling-ad-network-click-spec.md#ip-address) section above for more information.

#### Examples

- Link Query Param:

  - `https://branch.app.link/abc123?local_ip=5.6.7.8`

## Complete Examples

#### Link Parameter Method

```
https://branch.app.link/abc123?user_agent=Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2013_5_1%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Version%2F13.1.1%20Mobile%2F15E148%20Safari%2F604.1&device_ip=1.2.3.4&local_ip=5.6.7.8
```

#### Header Method

```
GET https://branch.app.link/abc123?local_ip=5.6.7.8	
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1
X-IP-Override: 1.2.3.4
```

## Using SKAdNetwork and Device-level Attribution Together

Supporting SKAdNetwork and device-level attribution/deep linking together is straightforward. Basically, you’ll send Branch a click in parallel with the loadProduct request for SKAdNetwork. There are two ways to do this:

1. **Server-side**: Send Branch a click request from your server. Pass us all the necessary data for attribution on the click request.
2. **Client-side**: Open a hidden Webview and click a real Branch link that’s set not to open the App Store. This redirects through our app.link domain and allows us to capture the (limited) data we need for attribution directly.

In either case, all of the required and optional fields outlined above stay required/optional - the method used to send them to Branch doesn’t matter.

## Server-Side

The server-side click flow is outlined here:



You have 3 tasks when a user taps your ad:

1. Register the click, along with all the required device metadata above plus any campaign data.
2. In parallel:

   1. Proceed with the SKAdNetwork flow (i.e. loadProduct() and so on).
   2. Send the click to Branch server-to-server. This works just like a regular client-side Branch link, but with the addition of the `$s2s=true` query string that tells Branch it’s a server-side click request.

## Client-Side

The client-side click flow is outlined below. Note that most partners supporting both SKAN and PREM will use the server-to-server method above, so this is mostly included for completeness.



You have four tasks when a user taps your ad:

1. Open a hidden webview.
2. Click the Branch link corresponding to that ad. This is just like the Branch Links you use today, with one addition: you **must** include `$web_only=true` as an additional query parameter to prevent the link from opening the App Store directly, which would prevent you from finishing the SKAdNetwork flow.
3. Close the hidden webview.
4. Proceed with the SKAdNetwork flow (i.e. loadProduct() and so on).
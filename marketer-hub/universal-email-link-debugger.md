---
title: "Email Link Debugger"
slug: universal-email-link-debugger
---

## Overview

Branch includes several internal mechanisms to ensure all of our links are functioning as expected. To help give you better insight into possible issues with your email links, we've provided an external-facing debug tool to help you understand what is going on under the hood with your UE links.

::: info ESP Debugging
This tool is used to debug issues generating from your ESP; i.e. Branch is receiving an error from the ESP, resulting in a non-functioning email link.
:::

## How It Works

1. Retrieve the email link that is causing issues.
2. In the address bar of your browser:

   1. Copy and paste the UE link,
   2. Append `$debug=true` to the end of the link.
3. Hit **Enter/Return** to load the link in the browser.
4. View the results on the resulting **Branch ESP Debugger** page.



## Interpret the Results

**Original Email Link**

The email link you are debugging by appending `$debug=true` and viewing in your browser.

**ESP Route/Proxy**

The server for the ESP associated with the link.

**ESP Response Status Code**

The status code sent by the ESP in response to Branch's ping to their servers. Please refer to the ESP's documentation for definitions of their status codes to gain further insight into why the link failed.

**Branch Generated Location**

The resulting link Branch generates to route users according to your pre-selected routing options in the Branch Dashboard.

If the request failed, we will show the fallback URL users were sent to instead.

**ESP Debug cURL Request**

The actual cURL request Branch sends to the ESP in order to serve the link.
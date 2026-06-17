---
aside: false
outline: false
pageClass: api-operation-page
title: "Delete Deep Link - Deep Linking API"
---

# Delete Deep Link

<ApiOperation operationId="deleteDeepLink" />

<div class="api-search-only">

Deep Linking API deleteDeepLink Delete Deep Link This endpoint is used to delete existing deep link.

**Note:** This endpoint requires both **App-Level** and **Sensitive Data** permissions. 
You must pass an Access Token (API key) to use the DELETE method. Otherwise you may see an Unauthorized User error. See the Deep Linking API Overview's Authentication 
section for details.
 Deep Linking API Access-Token header The Branch Access Token of the originating app obtained in your [Account Settings](https://help.branch.io/using-branch/docs/profile-settings)
 api_app_xxxx url query The deep link url against which the details are to be fetched.
 https://example.app.link/abCdEf123  app_id query The Branch app_id against the associate deep link url
 Success. url Deleted URL. deleted Deletion status. Bad request — typically an invalid or missing credential or parameter. error Rate limit exceeded — reduce request frequency and retry. error

</div>

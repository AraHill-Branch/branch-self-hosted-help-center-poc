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
 https://example.app.link/{UNIQUE_PATH_HERE}  app_id query The Branch app_id against the associate deep link url
 Ok url Deleted URL. deleted Deletion status. Authentication Failed error Rate Limit Reached error

</div>

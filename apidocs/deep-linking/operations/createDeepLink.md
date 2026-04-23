---
aside: false
outline: false
pageClass: api-operation-page
title: "Create Deep Link - Deep Linking API"
---

# Create Deep Link

<ApiOperation operationId="createDeepLink" />

<div class="api-search-only">

Deep Linking API createDeepLink Create Deep Link Create a Branch deep link programmatically. The returned URL is a
short link that routes users to the configured destination based on
their platform and whether the app is installed.
 branch_key The Branch key of the originating app. channel Marketing channel associated with this link (e.g. `email`, `sms`, `facebook`). feature Feature name associated with this link (e.g. `referrals`, `sharing`). campaign Campaign name associated with this link. alias Custom alias for the short link path. Must be unique per Branch domain. data Arbitrary key/value data embedded behind the link; accessible as session parameters from the SDK. $deeplink_path data.$deeplink_path In-app deep link path. The Branch SDK routes to this path on open. $fallback_url data.$fallback_url Fallback URL used when the app isn't installed. $desktop_url data.$desktop_url Redirect URL for desktop clicks. $og_title data.$og_title Open Graph title shown when the link is shared on social. $og_description data.$og_description Open Graph description shown when the link is shared on social. $og_image_url data.$og_image_url Open Graph image URL. Link created url The generated Branch short link. Invalid request error message error.message code error.code

</div>

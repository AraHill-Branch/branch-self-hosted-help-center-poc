---
title: "Audio Media Support on Links"
slug: audio-media-support-on-links
---

Branch Links now support the open graph (OG) protocol for users sharing **audio content** with the ability to play music/audio directly 🎵

## Overview

On Branch Link creation, Branch will automatically scrape the original web URL for such content like title, description, image, etc. Now audio (`og:audio`) will be able to be scraped. For example, if the content you want to share is a track link (<https://open.spotify.com/track/2aSFLiDPreOVP6KHiWk4lF>), simply set that URL:

- Via Short Links - Original Web URL
- Via SDK/APi/Dynamic - Set `$original_url` or `$fallback_url` parameter

as the original URL.

Here's what it looks like to do it via Short Links:

![](/img/a143ce5-Audio_On_Links.png)

Here's what your Branch Link will look like when the OG tags are scraped:

![](/img/d9d635a-Audio_On_Link_Message.png)

::: tip
Ready to learn more about how customizable and powerful Branch Links are? View our guide here: [Create Deep Links](creating-a-deep-link.md)
:::